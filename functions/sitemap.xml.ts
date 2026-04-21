import { type PagesFunction } from '@cloudflare/functions';

export const onRequest: PagesFunction = async () => {
  const baseUrl = 'https://yutools.qzz.io';
  const routes = [
    '/',
    '/tools',
    '/about',
    '/privacy',
    '/tools/jpg-to-pdf',
    '/tools/split-pdf',
    '/tools/merge-pdf',
    '/tools/compress-pdf',
    '/tools/pdf-to-jpg',
    '/tools/compress-image',
    '/tools/heic-to-jpg',
    '/tools/resize-image',
    '/tools/crop-image',
    '/tools/watermark-image',
    '/tools/blur-redact-image',
    '/tools/qr-code-generator',
    '/tools/qr-code-scanner',
    '/tools/json-formatter',
    '/tools/url-encode-decode',
    '/tools/word-counter',
    '/tools/uuid-generator',
    '/tools/timestamp-converter',
    '/tools/screenshot-to-text',
    '/tools/image-converter',
    '/tools/svg-to-png',
    '/tools/png-to-svg',
    '/tools/base64',
    '/tools/rotate-pdf',
    '/tools/reorder-pdf-pages',
    '/tools/add-page-numbers-to-pdf',
    '/tools/pdf-protect-unlock',
    '/tools/ocr-pdf',
  ];

  const today = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : route === '/tools' ? '0.9' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
