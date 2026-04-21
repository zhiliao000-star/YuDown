const COBALT_API_URL = 'https://api.cobalt.tools/';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { url, format, quality } = normalizeBody(req.body);

    if (!isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Please provide a valid YouTube URL.' });
    }

    if (!['mp3', 'mp4'].includes(format)) {
      return res.status(400).json({ error: 'Format must be mp3 or mp4.' });
    }

    if (!['1080', '720', '480'].includes(quality)) {
      return res.status(400).json({ error: 'Quality must be 1080, 720, or 480.' });
    }

    const cobaltResponse = await fetch(COBALT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        url,
        downloadMode: format === 'mp3' ? 'audio' : 'auto',
        audioFormat: 'mp3',
        videoQuality: quality,
      }),
    });

    const payload = await cobaltResponse.json().catch(() => ({}));

    if (!cobaltResponse.ok) {
      return res.status(cobaltResponse.status).json({
        error: readProviderError(payload),
      });
    }

    if (typeof payload?.url !== 'string' || !payload.url) {
      return res.status(502).json({
        error: 'The upstream service did not return a usable download URL.',
      });
    }

    return res.status(200).json({
      url: payload.url,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Unexpected server error.',
    });
  }
}

function normalizeBody(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body && typeof body === 'object' ? body : {};
}

function isValidYouTubeUrl(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const lower = value.toLowerCase();
  return lower.includes('youtube.com') || lower.includes('youtu.be');
}

function readProviderError(payload) {
  if (typeof payload?.error === 'string') {
    return payload.error;
  }

  if (typeof payload?.error?.code === 'string') {
    return `Upstream error: ${payload.error.code}.`;
  }

  if (typeof payload?.text === 'string') {
    return payload.text;
  }

  return 'This video could not be processed. It may be unavailable, restricted, or unsupported.';
}
