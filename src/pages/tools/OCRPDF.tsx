import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { FileList, FilePicker } from '../../components/UploadControls';
import { loadPdfJs } from '../../lib/pdf';
import { Loader2, ScanText } from 'lucide-react';

export const OCRPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [text, setText] = useState('');

  const runOcr = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const pdfjs = await loadPdfJs();
      const pdf = await pdfjs.getDocument({ data: await files[0].arrayBuffer() }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      await page.render({ canvasContext: context, viewport }).promise;
      const result = await Tesseract.recognize(canvas.toDataURL('image/png'), 'eng');
      setText(result.data.text.trim());
    } catch (error) {
      console.error(error);
      alert('Unable to OCR this PDF.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">ocr</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">OCR PDF</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Extract text from the first page of a PDF using OCR in the browser.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1).filter((file) => file.type === 'application/pdf'))} accept="application/pdf" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <button onClick={runOcr} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanText className="h-4 w-4" />}
          Extract text
        </button>
        <textarea readOnly value={text} rows={10} className="mt-5 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 text-sm text-[var(--fg)] outline-none" />
      </section>
    </main>
  );
};
