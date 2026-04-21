import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ArrowDownToLine, ArrowUpDown, Loader2 } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';
import { parsePageList } from '../../lib/pdf';

export const ReorderPDFPages = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [order, setOrder] = useState('1');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const reorder = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const source = await PDFDocument.load(await files[0].arrayBuffer());
      const pageOrder = parsePageList(order, source.getPageCount()).map((page) => page - 1);
      const output = await PDFDocument.create();
      const pages = await output.copyPages(source, pageOrder);
      pages.forEach((page) => output.addPage(page));
      const bytes = await output.save();
      setResult(new Blob([bytes], { type: 'application/pdf' }));
    } catch (error) {
      console.error(error);
      alert('Unable to reorder these pages.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">pdf</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Reorder PDF Pages</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Enter a new page order like `2,1,3,4` to rebuild the document.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1).filter((file) => file.type === 'application/pdf'))} accept="application/pdf" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <input value={order} onChange={(event) => setOrder(event.target.value)} className="mt-5 w-full rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
        <button onClick={reorder} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpDown className="h-4 w-4" />}
          Reorder pages
        </button>
        {result && (
          <button onClick={() => downloadFile(result, 'yutools-reordered.pdf')} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
            <ArrowDownToLine className="h-4 w-4" />
            Download PDF
          </button>
        )}
      </section>
    </main>
  );
};
