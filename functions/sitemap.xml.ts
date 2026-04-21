import { type PagesFunction } from '@cloudflare/functions';

export const onRequest: PagesFunction = async () => {
  const tools = [
    '',
    '/about',
    '/tools/compress-image',
    '/tools/jpg-to-pdf',
    '/tools/qr-code-generator',
    '/tools/resize-image',
    '/tools/merge-pdf',
    '/tools/image-converter'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${tools.map(tool => `  <url>
    <loc>https://yutools.com${tool}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${tool === '' || tool === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
