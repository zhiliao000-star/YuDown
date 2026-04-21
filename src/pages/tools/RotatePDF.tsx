import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { ArrowDownToLine, Loader2, RotateCw } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';

export const RotatePDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [angle, setAngle] = useState(90);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob | null>(null);

  const rotate = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(await files[0].arrayBuffer());
      pdf.getPages().forEach((page) => page.setRotation(degrees(angle)));
      const bytes = await pdf.save();
      setResult(new Blob([bytes], { type: 'application/pdf' }));
    } catch (error) {
      console.error(error);
      alert('Unable to rotate this PDF.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">pdf</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Rotate PDF</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Rotate every page in the document by 90, 180, or 270 degrees.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1).filter((file) => file.type === 'application/pdf'))} accept="application/pdf" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <select value={angle} onChange={(event) => setAngle(Number(event.target.value))} className="mt-5 w-full rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none">
          <option value={90}>90°</option>
          <option value={180}>180°</option>
          <option value={270}>270°</option>
        </select>
        <button onClick={rotate} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCw className="h-4 w-4" />}
          Rotate PDF
        </button>
        {result && (
          <button onClick={() => downloadFile(result, 'yutools-rotated.pdf')} className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
            <ArrowDownToLine className="h-4 w-4" />
            Download PDF
          </button>
        )}
      </section>
    </main>
  );
};
