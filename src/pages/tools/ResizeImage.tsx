import React, { useState } from 'react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';
import { ArrowDownToLine, Loader2, Scaling } from 'lucide-react';

export const ResizeImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(1200);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1));
    setResult(null);
  };

  const resizeImage = async () => {
    if (!files.length) return;

    setProcessing(true);

    try {
      const file = files[0];
      const image = new Image();
      const sourceUrl = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('Failed to load image'));
        image.src = sourceUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Canvas context unavailable');
      }

      context.drawImage(image, 0, 0, width, height);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((generatedBlob) => {
          if (!generatedBlob) {
            reject(new Error('Resize failed'));
            return;
          }
          resolve(generatedBlob);
        }, file.type || 'image/png');
      });

      URL.revokeObjectURL(sourceUrl);
      setResult(blob);
    } catch (error) {
      console.error('Resize failed', error);
      alert('Unable to resize this image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">image</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Resize Image</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Set a target width and height, then export the resized image.</p>

        <div className="mt-6">
          <FilePicker onFilesSelected={handleFiles} accept="image/*" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-[var(--muted)]">
            Width
            <input
              type="number"
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
              className="mt-2 w-full rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none"
            />
          </label>
          <label className="text-sm text-[var(--muted)]">
            Height
            <input
              type="number"
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
              className="mt-2 w-full rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none"
            />
          </label>
        </div>

        <button
          onClick={resizeImage}
          disabled={processing || !files.length}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scaling className="h-4 w-4" />}
          Resize image
        </button>

        {result && (
          <div className="mt-6 rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4">
            <p className="text-sm text-[var(--fg-soft)]">Resized image is ready.</p>
            <button
              onClick={() => downloadFile(result, 'yutools-resized-image.png')}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)]"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Download image
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
