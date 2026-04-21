import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ArrowDownToLine, Loader2, Shrink } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile, formatBytes } from '../../lib/utils';

export const CompressPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const compressPdf = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const bytes = await files[0].arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const outputBytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
      setResult(new Blob([outputBytes], { type: 'application/pdf' }));
    } catch (error) {
      console.error(error);
      alert('Unable to optimize this PDF.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">pdf</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Compress PDF</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Optimize the PDF structure in-browser. Works best on PDFs with inefficient object streams.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1).filter((file) => file.type === 'application/pdf'))} accept="application/pdf" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <button onClick={compressPdf} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shrink className="h-4 w-4" />}
          Optimize PDF
        </button>
        {result && (
          <div className="mt-5 rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4">
            <p className="text-sm text-[var(--fg-soft)]">Optimized file size: {formatBytes(result.size)}</p>
            <button onClick={() => downloadFile(result, 'yutools-compressed.pdf')} className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
              <ArrowDownToLine className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
