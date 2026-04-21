import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Check, Loader2, Settings2 } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { PrimaryButton, RelatedTools, SecondaryButton, ToolNoteCard, ToolPageShell } from '../../components/ToolLayout';
import { downloadFile, formatBytes } from '../../lib/utils';

export const CompressImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = useState(1920);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; originalSize: number; compressedSize: number } | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1));
    setResult(null);
  };

  const handleCompress = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const file = files[0];
      const compressedBlob = await imageCompression(file, {
        maxSizeMB: quality,
        maxWidthOrHeight,
        useWebWorker: true,
        initialQuality: quality,
      });
      setResult({
        blob: compressedBlob,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
      });
    } catch (error) {
      console.error('Compression failed', error);
      alert('Compression failed. Please try another image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageShell
      eyebrow="image"
      title="Compress Image"
      description="Reduce image file size with a quick browser-side pass. Adjust quality and export the lighter result."
      aside={
        <>
          <ToolNoteCard title="Compression notes">
            Lower quality values create smaller files. The max dimension setting helps reduce large photo exports.
          </ToolNoteCard>
          <RelatedTools
            items={[
              { label: 'Resize Image', to: '/tools/resize-image' },
              { label: 'Image Converter', to: '/tools/image-converter' },
              { label: 'Watermark Image', to: '/tools/watermark-image' },
            ]}
          />
        </>
      }
    >
      <FilePicker onFilesSelected={handleFiles} accept="image/*" multiple={false} />
      <FileList files={files} onRemove={() => setFiles([])} />

      {files.length > 0 && !result && (
        <div className="mt-5 rounded-[24px] border border-[var(--border-soft)] bg-white/70 p-5">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--fg)]">
            <Settings2 className="h-4 w-4" />
            Compression settings
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[var(--muted)]">
              Quality: {Math.round(quality * 100)}%
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(event) => setQuality(Number(event.target.value))}
                className="mt-2 w-full"
              />
            </label>
            <label className="text-sm text-[var(--muted)]">
              Max width / height
              <input
                type="number"
                value={maxWidthOrHeight}
                onChange={(event) => setMaxWidthOrHeight(Number(event.target.value))}
                className="mt-2 w-full rounded-[18px] border border-[var(--border-soft)] bg-white px-4 py-3 text-[var(--fg)] outline-none"
              />
            </label>
          </div>
          <PrimaryButton onClick={handleCompress} disabled={processing} className="mt-5 w-full sm:w-auto">
            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Compress image'}
          </PrimaryButton>
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-[24px] border border-[var(--border-soft)] bg-white/70 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--fg)]">
                <Check className="h-4 w-4 text-[var(--accent-strong)]" />
                Compression complete
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Reduced by {Math.round((1 - result.compressedSize / result.originalSize) * 100)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--muted-dim)] line-through">{formatBytes(result.originalSize)}</p>
              <p className="text-lg font-semibold text-[var(--fg)]">{formatBytes(result.compressedSize)}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => downloadFile(result.blob, 'compressed-yutools.jpg')}>Download image</PrimaryButton>
            <SecondaryButton onClick={() => { setFiles([]); setResult(null); }}>New file</SecondaryButton>
          </div>
        </div>
      )}
    </ToolPageShell>
  );
};
