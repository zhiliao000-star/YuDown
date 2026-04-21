import React, { useState } from 'react';
import { ArrowDownToLine, Loader2, Shield } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';

export const BlurRedactImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [x, setX] = useState(80);
  const [y, setY] = useState(80);
  const [width, setWidth] = useState(280);
  const [height, setHeight] = useState(100);
  const [mode, setMode] = useState<'blur' | 'redact'>('redact');
  const [result, setResult] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);

  const apply = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const image = new Image();
      const url = URL.createObjectURL(files[0]);
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
      if (mode === 'redact') {
        context.fillStyle = '#000000';
        context.fillRect(x, y, width, height);
      } else {
        context.filter = 'blur(14px)';
        context.drawImage(canvas, x, y, width, height, x, y, width, height);
        context.filter = 'none';
      }
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((generatedBlob) => (generatedBlob ? resolve(generatedBlob) : reject(new Error('Blur failed'))), files[0].type || 'image/png');
      });
      URL.revokeObjectURL(url);
      setResult(blob);
    } catch (error) {
      console.error(error);
      alert('Unable to edit this image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">image</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Blur / Redact Image</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Apply a blur or solid black box over a rectangular region.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1))} accept="image/*" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <select value={mode} onChange={(event) => setMode(event.target.value as 'blur' | 'redact')} className="rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none">
            <option value="redact">Redact</option>
            <option value="blur">Blur</option>
          </select>
          <input value={x} onChange={(event) => setX(Number(event.target.value))} type="number" placeholder="X" className="rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
          <input value={y} onChange={(event) => setY(Number(event.target.value))} type="number" placeholder="Y" className="rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
          <input value={width} onChange={(event) => setWidth(Number(event.target.value))} type="number" placeholder="Width" className="rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
          <input value={height} onChange={(event) => setHeight(Number(event.target.value))} type="number" placeholder="Height" className="rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
        </div>
        <button onClick={apply} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
          Apply
        </button>
        {result && (
          <button onClick={() => downloadFile(result, 'yutools-redacted-image.png')} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
            <ArrowDownToLine className="h-4 w-4" />
            Download image
          </button>
        )}
      </section>
    </main>
  );
};
