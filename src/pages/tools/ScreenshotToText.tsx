import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { FileList, FilePicker } from '../../components/UploadControls';
import { Loader2, ScanText, Copy } from 'lucide-react';

export const ScreenshotToText = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [text, setText] = useState('');

  const runOcr = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const result = await Tesseract.recognize(files[0], 'eng');
      setText(result.data.text.trim());
    } catch (error) {
      console.error(error);
      alert('OCR failed on this image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">ocr</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Screenshot to Text</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Extract text from a screenshot using browser-side OCR.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1))} accept="image/*" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <button onClick={runOcr} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanText className="h-4 w-4" />}
          Extract text
        </button>
        <textarea value={text} readOnly rows={10} className="mt-5 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 text-sm text-[var(--fg)] outline-none" />
        {text && (
          <button onClick={() => navigator.clipboard.writeText(text)} className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-transparent px-4 py-2 text-sm text-[var(--fg-soft)]">
            <Copy className="h-4 w-4" />
            Copy text
          </button>
        )}
      </section>
    </main>
  );
};
