import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';

const app = express();
const PORT = process.env.PORT || 3001;
const TEMP_DIR = '/tmp/tuberip';
const FILE_TTL_MS = 15 * 60 * 1000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const activeFiles = new Map();

await ensureTempDir();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);
app.use(express.json());

const downloadLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many download requests. Please wait a minute and try again.',
  },
});

app.get('/api/health', async (_req, res) => {
  const ytDlpInstalled = await checkDependency('yt-dlp', ['--version']);
  res.json({
    ok: true,
    ytDlpInstalled,
    tempDir: TEMP_DIR,
  });
});

app.post('/api/download', downloadLimiter, async (req, res) => {
  const validation = validateRequest(req.body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { url, format, quality } = validation.data;
  const jobId = randomUUID();
  const outputTemplate = path.join(TEMP_DIR, `${jobId}.%(ext)s`);

  setupSseHeaders(res);
  sendEvent(res, 'status', {
    message: 'Preparing download...',
  });

  const args = buildYtDlpArgs({ url, format, quality, outputTemplate });
  const child = spawn('yt-dlp', args, {
    env: process.env,
  });

  let settled = false;
  let filePath = null;
  let logBuffer = '';

  const onAbort = () => {
    child.kill('SIGTERM');
  };

  req.on('close', onAbort);

  child.stdout.on('data', (chunk) => {
    const text = chunk.toString();
    logBuffer += text;
    sendProgressLines(res, text);
  });

  child.stderr.on('data', (chunk) => {
    const text = chunk.toString();
    logBuffer += text;
    sendProgressLines(res, text, true);
  });

  child.on('error', (error) => {
    if (settled) {
      return;
    }

    settled = true;
    req.off('close', onAbort);
    sendEvent(res, 'error', {
      message: `Failed to start yt-dlp: ${error.message}`,
    });
    res.end();
  });

  child.on('close', async (code) => {
    if (settled) {
      return;
    }

    settled = true;
    req.off('close', onAbort);

    if (code !== 0) {
      sendEvent(res, 'error', {
        message: mapYtDlpError(logBuffer),
      });
      return res.end();
    }

    try {
      filePath = await findOutputFile(jobId);

      if (!filePath) {
        sendEvent(res, 'error', {
          message: 'Download completed, but the output file could not be found.',
        });
        return res.end();
      }

      const stat = await fsp.stat(filePath);
      const id = path.basename(filePath);

      scheduleFileCleanup(id, filePath);
      activeFiles.set(id, {
        path: filePath,
        size: stat.size,
        createdAt: Date.now(),
      });

      sendEvent(res, 'complete', {
        downloadUrl: `/api/file/${encodeURIComponent(id)}`,
        fileName: id,
        size: stat.size,
      });
      return res.end();
    } catch (error) {
      sendEvent(res, 'error', {
        message: `Download finished, but serving failed: ${error.message}`,
      });
      return res.end();
    }
  });
});

app.get('/api/file/:id', async (req, res) => {
  const fileId = req.params.id;
  const record = activeFiles.get(fileId);

  if (!record) {
    return res.status(404).json({
      error: 'File not found or expired.',
    });
  }

  try {
    await fsp.access(record.path, fs.constants.R_OK);
  } catch {
    activeFiles.delete(fileId);
    return res.status(404).json({
      error: 'File is no longer available.',
    });
  }

  res.download(record.path, fileId, async (error) => {
    await cleanupFile(fileId, record.path);

    if (error && !res.headersSent) {
      res.status(500).json({
        error: 'Download failed while sending the file.',
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`YuDown server listening on port ${PORT}`);
});

function validateRequest(body) {
  const url = typeof body?.url === 'string' ? body.url.trim() : '';
  const format = typeof body?.format === 'string' ? body.format.trim().toLowerCase() : '';
  const quality = typeof body?.quality === 'string' ? body.quality.trim().toLowerCase() : 'best';

  if (!url) {
    return {
      valid: false,
      error: 'Please paste a YouTube URL.',
    };
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return {
      valid: false,
      error: 'That does not look like a valid URL.',
    };
  }

  const allowedHosts = new Set([
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'youtu.be',
  ]);

  if (!allowedHosts.has(parsedUrl.hostname)) {
    return {
      valid: false,
      error: 'Please use a valid YouTube video URL.',
    };
  }

  if (!['mp3', 'mp4'].includes(format)) {
    return {
      valid: false,
      error: 'Please choose MP3 or MP4.',
    };
  }

  if (!['720p', '1080p', 'best'].includes(quality)) {
    return {
      valid: false,
      error: 'Please choose a valid quality option.',
    };
  }

  return {
    valid: true,
    data: {
      url,
      format,
      quality,
    },
  };
}

function buildYtDlpArgs({ url, format, quality, outputTemplate }) {
  const args = [
    '--newline',
    '--no-playlist',
    '-o',
    outputTemplate,
  ];

  if (format === 'mp3') {
    args.push(
      '--extract-audio',
      '--audio-format',
      'mp3',
    );
  } else {
    const qualityFormat = getVideoFormatSelector(quality);
    args.push(
      '-f',
      qualityFormat,
      '--merge-output-format',
      'mp4',
    );
  }

  args.push(url);
  return args;
}

function getVideoFormatSelector(quality) {
  if (quality === '720p') {
    return 'bestvideo[height<=720]+bestaudio/best[height<=720]/best';
  }

  if (quality === '1080p') {
    return 'bestvideo[height<=1080]+bestaudio/best[height<=1080]/best';
  }

  return 'bestvideo+bestaudio/best';
}

function setupSseHeaders(res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
}

function sendEvent(res, event, payload) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function sendProgressLines(res, text, isError = false) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    const percentMatch = line.match(/(\d+(?:\.\d+)?)%/);
    sendEvent(res, 'progress', {
      line,
      percent: percentMatch ? Number(percentMatch[1]) : null,
      level: isError ? 'stderr' : 'stdout',
    });
  }
}

function mapYtDlpError(output) {
  const text = output.toLowerCase();

  if (text.includes('private video')) {
    return 'This video is private and cannot be downloaded.';
  }

  if (text.includes('sign in to confirm your age')) {
    return 'This video is age-restricted and cannot be downloaded without sign-in.';
  }

  if (text.includes('video unavailable')) {
    return 'This video is unavailable.';
  }

  if (text.includes('unsupported url')) {
    return 'This URL is not supported by yt-dlp.';
  }

  return 'Download failed. Please confirm the URL is public and try again.';
}

async function ensureTempDir() {
  await fsp.mkdir(TEMP_DIR, { recursive: true });
}

async function findOutputFile(jobId) {
  const files = await fsp.readdir(TEMP_DIR);
  const match = files.find((file) => file.startsWith(`${jobId}.`));
  return match ? path.join(TEMP_DIR, match) : null;
}

function scheduleFileCleanup(fileId, filePath) {
  setTimeout(() => {
    cleanupFile(fileId, filePath).catch(() => {});
  }, FILE_TTL_MS).unref?.();
}

async function cleanupFile(fileId, filePath) {
  activeFiles.delete(fileId);

  try {
    await fsp.unlink(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Failed to remove temp file ${filePath}:`, error.message);
    }
  }
}

async function checkDependency(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      stdio: 'ignore',
    });

    child.on('error', () => resolve(false));
    child.on('close', (code) => resolve(code === 0));
  });
}
