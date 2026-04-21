# YuTools

YuTools is a free, SEO-friendly, utility website built with Vite, React, and TypeScript. All tools process files locally in the browser to ensure maximum privacy and speed.

## Core Features
- **Local processing**: No files are uploaded to our servers.
- **Vite performance**: Fast load times and high Lighthouse scores.
- **Cloudflare ready**: Optimized for Cloudflare Pages with Functions support.
- **SEO Optimized**: Clean meta tags, descriptive slugs, and an auto-generated sitemap.
- **Ad Support**: Design-friendly ad slot placeholders.

## Tools (v1)
- JPG to PDF
- Merge PDF
- Compress Image
- Resize Image
- HEIC to JPG
- WebP/PNG/JPG Converter
- QR Code Generator
- JSON Formatter

## Tech Stack
- **Framework**: [React](https://react.dev/) / [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Libraries**:
  - `pdf-lib`: PDF generation and merging
  - `browser-image-compression`: Client-side image optimization
  - `qrcode`: QR code generation
  - `heic2any`: HEIC to JPEG conversion

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## Deployment to Cloudflare Pages

### Option 1: Git Integration (Recommended)
1. Push this repository to GitHub/GitLab.
2. Connect your repository to Cloudflare Pages.
3. Use the following settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**:
     - `VITE_SHOW_ADS`: set to `true` if you want to enable ad placeholders

### Option 2: Wrangler (Manual)
```bash
npm run build
npm run deploy:pages
```

## Project Structure
- `/src/components`: Reusable UI components and ad slots.
- `/src/pages`: Individual tool pages and guides.
- `/src/lib`: Utilities and processing logic.
- `/functions`: Cloudflare Pages Functions (sitemap.xml, robots.txt).
- `/public`: Static assets.

## License
MIT
