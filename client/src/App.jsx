import { useState } from 'react';

const qualityOptions = [
  { value: '720p', label: '720p' },
  { value: '1080p', label: '1080p' },
  { value: 'best', label: 'Best available' },
];

export default function App() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [quality, setQuality] = useState('best');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('Idle');
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const canSubmit = url.trim().length > 0 && !isDownloading;

  async function handleDownload(event) {
    event.preventDefault();
    setIsDownloading(true);
    setProgress(0);
    setLogs([]);
    setError('');
    setStatus('Connecting to server...');

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          Accept: 'text/event-stream',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          format,
          quality,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'The server could not start the download.');
      }

      if (!response.body) {
        throw new Error('Streaming is not supported in this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          const parsed = parseEvent(part);
          if (!parsed) {
            continue;
          }

          if (parsed.event === 'progress') {
            setStatus('Downloading...');
            setLogs((current) => [...current.slice(-79), parsed.data.line]);
            if (typeof parsed.data.percent === 'number') {
              setProgress(Math.max(progressClamp(parsed.data.percent), 2));
            }
          }

          if (parsed.event === 'status') {
            setStatus(parsed.data.message);
          }

          if (parsed.event === 'error') {
            throw new Error(parsed.data.message);
          }

          if (parsed.event === 'complete') {
            setProgress(100);
            setStatus('Download ready');
            window.location.href = parsed.data.downloadUrl;
          }
        }
      }
    } catch (downloadError) {
      setError(downloadError.message || 'Something went wrong.');
      setStatus('Failed');
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <section className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-soft backdrop-blur-xl">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),transparent_30%,transparent_70%,rgba(52,211,153,0.08))]" />
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-cyan-200">
                YuDown
              </p>
              <h1 className="max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Pull clean MP3 or MP4 downloads straight from YouTube.
              </h1>
              <p className="max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
                Paste a public YouTube URL, choose the format you want, and watch live progress while the server runs
                <span className="mx-1 text-cyan-300">yt-dlp</span>
                for you.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleDownload}>
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">YouTube URL</span>
                <input
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Format</span>
                  <select
                    value={format}
                    onChange={(event) => setFormat(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option value="mp3">MP3</option>
                    <option value="mp4">MP4</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Quality</span>
                  <select
                    value={quality}
                    onChange={(event) => setQuality(event.target.value)}
                    disabled={format !== 'mp4'}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-50 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    {qualityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex min-w-40 items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                {isDownloading ? 'Working...' : 'Download'}
              </button>
            </form>

            {error ? (
              <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            ) : null}
          </div>

          <aside className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Live activity</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{status}</p>
              </div>
              <p className="text-sm font-semibold text-cyan-300">{Math.round(progress)}%</p>
            </div>

            <div className="mb-5 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-300 transition-all duration-300"
                style={{ width: `${progressClamp(progress)}%` }}
              />
            </div>

            <div className="h-72 overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-slate-300">
              {logs.length ? (
                logs.map((line, index) => (
                  <div key={`${line}-${index}`} className="border-b border-white/5 pb-1 last:border-b-0">
                    {line}
                  </div>
                ))
              ) : (
                <div className="text-slate-500">Progress output from yt-dlp will appear here.</div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function parseEvent(chunk) {
  const lines = chunk.split('\n');
  let event = 'message';
  let dataLine = '';

  for (const line of lines) {
    if (line.startsWith('event:')) {
      event = line.slice(6).trim();
    }

    if (line.startsWith('data:')) {
      dataLine += line.slice(5).trim();
    }
  }

  if (!dataLine) {
    return null;
  }

  try {
    return {
      event,
      data: JSON.parse(dataLine),
    };
  } catch {
    return null;
  }
}

function progressClamp(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}
