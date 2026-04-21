import React, { useState } from 'react';
import { ArrowDownToLine, Crop, Loader2 } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';

export const CropImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const cropImage = async () => {
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
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      context.drawImage(image, x, y, width, height, 0, 0, width, height);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((generatedBlob) => (generatedBlob ? resolve(generatedBlob) : reject(new Error('Crop failed'))), files[0].type || 'image/png');
      });
      URL.revokeObjectURL(url);
      setResult(blob);
    } catch (error) {
      console.error(error);
      alert('Unable to crop this image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">image</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Crop Image</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Crop an image by entering the start point and output size in pixels.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1))} accept="image/*" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <input value={x} onChange={(event) => setX(Number(event.target.value))} type="number" placeholder="X" className="rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
          <input value={y} onChange={(event) => setY(Number(event.target.value))} type="number" placeholder="Y" className="rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
          <input value={width} onChange={(event) => setWidth(Number(event.target.value))} type="number" placeholder="Width" className="rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
          <input value={height} onChange={(event) => setHeight(Number(event.target.value))} type="number" placeholder="Height" className="rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
        </div>
        <button onClick={cropImage} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Crop className="h-4 w-4" />}
          Crop image
        </button>
        {result && (
          <button onClick={() => downloadFile(result, 'yutools-cropped-image.png')} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
            <ArrowDownToLine className="h-4 w-4" />
            Download image
          </button>
        )}
      </section>
    </main>
  );
};
