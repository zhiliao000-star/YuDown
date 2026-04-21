import React, { useState } from 'react';
import ImageTracer from 'imagetracerjs';
import { ArrowDownToLine, Loader2, Orbit } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';

export const PNGToSVG = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [svg, setSvg] = useState('');
  const [processing, setProcessing] = useState(false);

  const convert = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const url = URL.createObjectURL(files[0]);
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('Image failed'));
        image.src = url;
      });
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      context.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      const result = await new Promise<string>((resolve) => {
        ImageTracer.imageToSVG(dataUrl, (svgString: string) => resolve(svgString));
      });
      setSvg(result);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Unable to trace this PNG.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">image</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">PNG to SVG</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Trace a bitmap image into a simple SVG path result.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1))} accept="image/png" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <button onClick={convert} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Orbit className="h-4 w-4" />}
          Trace SVG
        </button>
        {svg && (
          <>
            <textarea readOnly value={svg} rows={12} className="mt-5 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 text-sm text-[var(--fg)] outline-none" />
            <a href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`} download="yutools-traced.svg" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
              <ArrowDownToLine className="h-4 w-4" />
              Download SVG
            </a>
          </>
        )}
      </section>
    </main>
  );
};
