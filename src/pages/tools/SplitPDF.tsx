import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { ArrowDownToLine, Scissors, Loader2 } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';
import { parsePageList } from '../../lib/pdf';

export const SplitPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [range, setRange] = useState('1');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const splitPdf = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const file = files[0];
      const bytes = await file.arrayBuffer();
      const source = await PDFDocument.load(bytes);
      const output = await PDFDocument.create();
      const selectedPages = parsePageList(range, source.getPageCount()).map((page) => page - 1);
      const copiedPages = await output.copyPages(source, selectedPages);
      copiedPages.forEach((page) => output.addPage(page));
      const outputBytes = await output.save();
      setResult(new Blob([outputBytes], { type: 'application/pdf' }));
    } catch (error) {
      console.error(error);
      alert('Unable to split this PDF.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">pdf</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Split PDF</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Extract selected pages into a new PDF. Use page numbers like `1,3,5-8`.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1).filter((file) => file.type === 'application/pdf'))} accept="application/pdf" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <label className="mt-5 block text-sm text-[var(--muted)]">
          Page range
          <input value={range} onChange={(event) => setRange(event.target.value)} className="mt-2 w-full rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
        </label>
        <button onClick={splitPdf} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scissors className="h-4 w-4" />}
          Extract pages
        </button>
        {result && (
          <button onClick={() => downloadFile(result, 'yutools-split.pdf')} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
            <ArrowDownToLine className="h-4 w-4" />
            Download PDF
          </button>
        )}
      </section>
    </main>
  );
};
