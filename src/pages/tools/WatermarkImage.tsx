import React, { useState } from 'react';
import { ArrowDownToLine, Loader2, Stamp } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';

export const WatermarkImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState('YuTools');
  const [result, setResult] = useState<Blob | null>(null);
  const [processing, setProcessing] = useState(false);

  const applyWatermark = async () => {
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
      context.fillStyle = 'rgba(255,255,255,0.72)';
      context.font = `${Math.max(24, Math.floor(image.width / 18))}px sans-serif`;
      context.textAlign = 'right';
      context.fillText(text, image.width - 36, image.height - 36);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((generatedBlob) => (generatedBlob ? resolve(generatedBlob) : reject(new Error('Watermark failed'))), files[0].type || 'image/png');
      });
      URL.revokeObjectURL(url);
      setResult(blob);
    } catch (error) {
      console.error(error);
      alert('Unable to watermark this image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">image</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Watermark Image</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Add a simple text watermark to the lower-right corner of an image.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1))} accept="image/*" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <input value={text} onChange={(event) => setText(event.target.value)} className="mt-5 w-full rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
        <button onClick={applyWatermark} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Stamp className="h-4 w-4" />}
          Add watermark
        </button>
        {result && (
          <button onClick={() => downloadFile(result, 'yutools-watermarked-image.png')} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
            <ArrowDownToLine className="h-4 w-4" />
            Download image
          </button>
        )}
      </section>
    </main>
  );
};
