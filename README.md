# YuDown

YuDown is a minimal dark-themed web app for downloading YouTube videos as MP3 or MP4 using `yt-dlp`.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Download engine: `yt-dlp`

## Project Structure

```text
/client   React frontend
/server   Express backend
```

## Requirements

- Node.js 18+
- Python 3
- `yt-dlp`
- `ffmpeg` for MP3 extraction and some video remuxing tasks

## Install yt-dlp

Recommended:

```bash
python3 -m pip install -U yt-dlp
```

Or on macOS with Homebrew:

```bash
brew install yt-dlp ffmpeg
```

Verify:

```bash
yt-dlp --version
ffmpeg -version
```

## Setup

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

## Development

Start the API:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173` by default.
Backend runs on `http://localhost:3001` by default.

## Production

Build the frontend:

```bash
cd client
npm run build
```

Start the server:

```bash
cd ../server
npm start
```

## API

### `GET /api/health`

Returns service status and whether `yt-dlp` is available.

### `POST /api/download`

Accepts JSON:

```json
{
  "url": "https://www.youtube.com/watch?v=...",
  "format": "mp3",
  "quality": "1080p"
}
```

Response is Server-Sent Events. Progress events stream while `yt-dlp` runs. When complete, the server emits a final event containing a `downloadUrl` that the browser can use to fetch the generated file.

### `GET /api/file/:id`

Downloads the generated file once it is ready.

## Notes

- Temporary files are stored in `/tmp/tuberip/`
- Rate limiting is set to `5 requests/minute per IP`
- Downloaded temp files are deleted after the browser finishes downloading them
- If cleanup after transfer fails, a fallback timer removes stale files automatically
