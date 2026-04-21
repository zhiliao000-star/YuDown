import React, { useState } from 'react';
import heic2any from 'heic2any';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';
import { ArrowDownToLine, Loader2, RefreshCcw } from 'lucide-react';

type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp';

const extensionMap: Record<OutputFormat, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

export const ImageConverter = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<OutputFormat>('image/png');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1));
    setResult(null);
  };

  const convertImage = async () => {
    if (!files.length) return;
    setProcessing(true);

    try {
      const file = files[0];
      let imageBlob: Blob;

      if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
        const converted = await heic2any({ blob: file, toType: format });
        imageBlob = Array.isArray(converted) ? converted[0] : converted;
      } else {
        const image = new Image();
        const url = URL.createObjectURL(file);

        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve();
          image.onerror = () => reject(new Error('Failed to load image'));
          image.src = url;
        });

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error('Canvas context unavailable');
        }

        context.drawImage(image, 0, 0);

        imageBlob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((generatedBlob) => {
            if (!generatedBlob) {
              reject(new Error('Conversion failed'));
              return;
            }
            resolve(generatedBlob);
          }, format, 0.92);
        });

        URL.revokeObjectURL(url);
      }

      setResult(imageBlob);
    } catch (error) {
      console.error('Image conversion failed', error);
      alert('Unable to convert this image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">image</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Image Converter</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Convert images between PNG, JPG, WebP, and HEIC input.</p>

        <div className="mt-6">
          <FilePicker onFilesSelected={handleFiles} accept="image/*,.heic" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>

        <label className="mt-5 block text-sm text-[var(--muted)]">
          Output format
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value as OutputFormat)}
            className="mt-2 w-full rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none"
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPG</option>
            <option value="image/webp">WebP</option>
          </select>
        </label>

        <button
          onClick={convertImage}
          disabled={processing || !files.length}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          Convert image
        </button>

        {result && (
          <div className="mt-6 rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4">
            <p className="text-sm text-[var(--fg-soft)]">Converted image is ready.</p>
            <button
              onClick={() => downloadFile(result, `yutools-converted.${extensionMap[format]}`)}
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
