# YuDown

YuDown is a minimalist YouTube downloader built for Vercel with a static `index.html` frontend and a free serverless proxy at `api/download.js`.

## Architecture

- Frontend: static HTML, CSS, and vanilla JavaScript
- Backend: Vercel Serverless Function (`api/download.js`)
- Upstream download provider: configurable cobalt instance

## Why this approach

As of April 21, 2026, older `ytdl-core` forks are a weak default for a fresh deployment. The `@distube/ytdl-core` repository is archived and explicitly says it will no longer be maintained. By contrast, cobalt.tools is still live and publicly documents browser-driven downloading flows and community processing instances.

This project therefore uses a lightweight Vercel function to validate input and forward requests to a cobalt-compatible instance, which is a better fit for Vercel Hobby.

Important: as of April 21, 2026, the hosted `api.cobalt.tools` instance documents bot protection and authentication requirements for third-party API usage. In practice, it may return `error.api.auth.jwt.missing` unless you use an authorized instance or your own deployment.

## Files

- [index.html](/Users/zhiliao000/Documents/YuDown/index.html)
- [api/download.js](/Users/zhiliao000/Documents/YuDown/api/download.js)
- [vercel.json](/Users/zhiliao000/Documents/YuDown/vercel.json)

## Local usage

Install:

```bash
npm install
```

Create the static build:

```bash
npm run build
```

That writes the frontend to `dist/index.html`.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project into Vercel.
3. Keep the framework preset as `Other`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variables if you are using your own cobalt instance:

```text
COBALT_API_URL=https://your-cobalt-instance.example/
COBALT_API_KEY=optional-api-key
```

7. Deploy.

Vercel will serve:

- the static frontend from `dist/`
- the serverless endpoint from `api/download.js`

## Request flow

1. User pastes a YouTube link.
2. Frontend sends `POST /api/download` with:

```json
{
  "url": "https://www.youtube.com/watch?v=example",
  "format": "mp3",
  "quality": "1080"
}
```

3. The Vercel function forwards that to cobalt.tools as:

```json
{
  "url": "https://www.youtube.com/watch?v=example",
  "downloadMode": "audio",
  "audioFormat": "mp3",
  "videoQuality": "1080"
}
```

4. The API responds with a direct file URL.
5. The browser triggers the download through an anchor element.

## Notes

- No paid APIs are used.
- This is intended to stay compatible with Vercel's free Hobby tier.
- URL validation is basic and only checks for `youtube.com` or `youtu.be`.
- Some videos may still fail because of upstream restrictions, private content, provider-side changes, or cobalt instance authentication rules.

## Sources

- [distubejs/ytdl-core on GitHub](https://github.com/distubejs/ytdl-core)
- [cobalt.tools](https://cobalt.tools/)
- [cobalt tools community page](https://cobalt.tools/about/community)
- [cobalt tools instances page](https://cobalt.tools/settings/instances)
