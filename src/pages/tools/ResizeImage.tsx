import React, { useState } from 'react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { PrimaryButton, RelatedTools, SecondaryButton, ToolNoteCard, ToolPageShell } from '../../components/ToolLayout';
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
    <ToolPageShell
      eyebrow="image"
      title="Resize Image"
      description="Set a target width and height, then export the resized image."
      aside={
        <>
          <ToolNoteCard title="Tip">
            Use exact pixel sizes for social posts, thumbnails, and banners. The original format is preserved.
          </ToolNoteCard>
          <RelatedTools
            items={[
              { label: 'Compress Image', to: '/tools/compress-image' },
              { label: 'Crop Image', to: '/tools/crop-image' },
              { label: 'Image Converter', to: '/tools/image-converter' },
            ]}
          />
        </>
      }
    >
      <FilePicker onFilesSelected={handleFiles} accept="image/*" multiple={false} />
      <FileList files={files} onRemove={() => setFiles([])} />

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-[var(--muted)]">
          Width
          <input
            type="number"
            value={width}
            onChange={(event) => setWidth(Number(event.target.value))}
            className="field-input mt-2"
          />
        </label>
        <label className="text-sm text-[var(--muted)]">
          Height
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(Number(event.target.value))}
            className="field-input mt-2"
          />
        </label>
      </div>

      <PrimaryButton onClick={resizeImage} disabled={processing || !files.length} className="mt-5">
        {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scaling className="h-4 w-4" />}
        Resize image
      </PrimaryButton>

      {result && (
        <div className="result-card mt-6">
          <p className="text-sm text-[var(--fg-soft)]">Resized image is ready.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => downloadFile(result, 'yutools-resized-image.png')}>
              <ArrowDownToLine className="h-4 w-4" />
              Download image
            </PrimaryButton>
            <SecondaryButton onClick={() => { setFiles([]); setResult(null); }}>
              Resize another image
            </SecondaryButton>
          </div>
        </div>
      )}
    </ToolPageShell>
  );
};
