import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';
import { ArrowDownToLine, Combine, Loader2 } from 'lucide-react';

export const MergePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [mergedPdf, setMergedPdf] = useState<Blob | null>(null);

  const handleFiles = (newFiles: File[]) => {
    const pdfFiles = newFiles.filter((file) => file.type === 'application/pdf');
    setFiles((prev) => [...prev, ...pdfFiles]);
    setMergedPdf(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const mergeFiles = async () => {
    if (files.length < 2) return;

    setProcessing(true);

    try {
      const output = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const source = await PDFDocument.load(bytes);
        const pages = await output.copyPages(source, source.getPageIndices());
        pages.forEach((page) => output.addPage(page));
      }

      const mergedBytes = await output.save();
      setMergedPdf(new Blob([mergedBytes], { type: 'application/pdf' }));
    } catch (error) {
      console.error('Merge failed', error);
      alert('Unable to merge these PDFs. Please try different files.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">pdf</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Merge PDF</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Combine multiple PDF files into one document in your browser.</p>

        <div className="mt-6">
          <FilePicker onFilesSelected={handleFiles} accept="application/pdf" />
          <FileList files={files} onRemove={removeFile} />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={mergeFiles}
            disabled={processing || files.length < 2}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Combine className="h-4 w-4" />}
            Merge files
          </button>
          <p className="text-xs text-[var(--muted)]">Add at least two PDFs. Files merge in the visible order.</p>
        </div>

        {mergedPdf && (
          <div className="mt-6 rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4">
            <p className="text-sm text-[var(--fg-soft)]">Merged PDF is ready.</p>
            <button
              onClick={() => downloadFile(mergedPdf, 'yutools-merged.pdf')}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)]"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
