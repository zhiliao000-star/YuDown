import React, { useState } from 'react';
import { ArrowDownToLine, FileImage, Loader2 } from 'lucide-react';

export const SVGToPNG = () => {
  const [svg, setSvg] = useState('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="240" height="240" rx="36" fill="#ffb57c"/><circle cx="120" cy="120" r="56" fill="#ffffff"/></svg>');
  const [pngUrl, setPngUrl] = useState('');
  const [processing, setProcessing] = useState(false);

  const convert = async () => {
    setProcessing(true);
    try {
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('SVG failed'));
        image.src = url;
      });
      const canvas = document.createElement('canvas');
      canvas.width = image.width || 240;
      canvas.height = image.height || 240;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      context.drawImage(image, 0, 0);
      setPngUrl(canvas.toDataURL('image/png'));
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Unable to convert this SVG.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">image</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">SVG to PNG</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Paste SVG markup and render it as a PNG image.</p>
        <textarea value={svg} onChange={(event) => setSvg(event.target.value)} rows={12} className="mt-6 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 text-sm text-[var(--fg)] outline-none" />
        <button onClick={convert} disabled={processing} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)]">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileImage className="h-4 w-4" />}
          Convert to PNG
        </button>
        {pngUrl && (
          <a href={pngUrl} download="yutools-svg.png" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
            <ArrowDownToLine className="h-4 w-4" />
            Download PNG
          </a>
        )}
      </section>
    </main>
  );
};
