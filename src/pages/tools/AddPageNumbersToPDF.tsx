import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { ArrowDownToLine, Hash, Loader2 } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';

export const AddPageNumbersToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const addNumbers = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(await files[0].arrayBuffer());
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      pages.forEach((page, index) => {
        const { width } = page.getSize();
        page.drawText(`${index + 1}`, {
          x: width - 44,
          y: 20,
          size: 11,
          font,
          color: rgb(0.25, 0.25, 0.25),
        });
      });
      const bytes = await pdf.save();
      setResult(new Blob([bytes], { type: 'application/pdf' }));
    } catch (error) {
      console.error(error);
      alert('Unable to add page numbers.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">pdf</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Add Page Numbers to PDF</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Stamp page numbers into the lower-right corner of each page.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1).filter((file) => file.type === 'application/pdf'))} accept="application/pdf" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <button onClick={addNumbers} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Hash className="h-4 w-4" />}
          Add numbers
        </button>
        {result && (
          <button onClick={() => downloadFile(result, 'yutools-page-numbers.pdf')} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
            <ArrowDownToLine className="h-4 w-4" />
            Download PDF
          </button>
        )}
      </section>
    </main>
  );
};
