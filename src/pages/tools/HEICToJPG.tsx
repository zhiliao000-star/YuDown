import React, { useState } from 'react';
import heic2any from 'heic2any';
import { ArrowDownToLine, ImagePlus, Loader2 } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';

export const HEICToJPG = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const convert = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const converted = await heic2any({ blob: files[0], toType: 'image/jpeg' });
      const blob = Array.isArray(converted) ? converted[0] : converted;
      setResult(blob);
    } catch (error) {
      console.error(error);
      alert('Unable to convert this HEIC file.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">image</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">HEIC to JPG</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Convert HEIC photos into standard JPG files.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1))} accept=".heic,image/heic" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <button onClick={convert} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          Convert to JPG
        </button>
        {result && (
          <button onClick={() => downloadFile(result, 'yutools-heic-converted.jpg')} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
            <ArrowDownToLine className="h-4 w-4" />
            Download JPG
          </button>
        )}
      </section>
    </main>
  );
};
