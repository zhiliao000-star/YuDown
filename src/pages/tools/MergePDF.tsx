import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileList, FilePicker } from '../../components/UploadControls';
import { ToolPageShell, PrimaryButton, RelatedTools } from '../../components/ToolLayout';
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
      // In a real app we'd use a toast instead of an alert.
      alert('Unable to merge these PDFs. Please try different files.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageShell
      eyebrow="pdf"
      title="Merge PDF"
      description="Combine multiple PDF files into one document in your browser."
      aside={
        <RelatedTools
          items={[
            { label: 'Split PDF', to: '/tools/split-pdf' },
            { label: 'Compress PDF', to: '/tools/compress-pdf' },
            { label: 'JPG to PDF', to: '/tools/jpg-to-pdf' },
          ]}
        />
      }
    >
      <div className="mt-6">
        <FilePicker onFilesSelected={handleFiles} accept="application/pdf" />
        <FileList files={files} onRemove={removeFile} />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <PrimaryButton
          onClick={mergeFiles}
          disabled={processing || files.length < 2}
        >
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Combine className="h-4 w-4" />}
          Merge files
        </PrimaryButton>
        <p className="text-xs text-[var(--muted)]">Add at least two PDFs. Files merge in the visible order.</p>
      </div>

      {mergedPdf && (
        <div className="mt-6 rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4">
          <p className="text-sm text-[var(--fg-soft)]">Merged PDF is ready.</p>
          <button
            onClick={() => downloadFile(mergedPdf, 'yutools-merged.pdf')}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-4 py-2 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)]"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      )}
    </ToolPageShell>
  );
};
