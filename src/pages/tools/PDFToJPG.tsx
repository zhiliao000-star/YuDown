import React, { useState } from 'react';
import { ArrowDownToLine, FileImage, Loader2 } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { loadPdfJs } from '../../lib/pdf';

export const PDFToJPG = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [page, setPage] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [pageCount, setPageCount] = useState(1);

  const renderPage = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const pdfjs = await loadPdfJs();
      const bytes = await files[0].arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      setPageCount(pdf.numPages);
      const selectedPage = await pdf.getPage(Math.min(page, pdf.numPages));
      const viewport = selectedPage.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      await selectedPage.render({ canvasContext: context, viewport }).promise;
      setImageUrl(canvas.toDataURL('image/jpeg', 0.92));
    } catch (error) {
      console.error(error);
      alert('Unable to render this PDF page.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">pdf</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">PDF to JPG</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Render a PDF page as JPG. Choose a page and export it as an image.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={(newFiles) => setFiles(newFiles.slice(0, 1).filter((file) => file.type === 'application/pdf'))} accept="application/pdf" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <label className="mt-5 block text-sm text-[var(--muted)]">
          Page number
          <input type="number" min={1} max={pageCount} value={page} onChange={(event) => setPage(Number(event.target.value))} className="mt-2 w-full rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3 text-[var(--fg)] outline-none" />
        </label>
        <button onClick={renderPage} disabled={processing || !files.length} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)] disabled:opacity-50">
          {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileImage className="h-4 w-4" />}
          Render JPG
        </button>
        {imageUrl && (
          <div className="mt-6">
            <img src={imageUrl} alt="Converted PDF page" className="rounded-[20px] border border-[var(--border-soft)]" />
            <a href={imageUrl} download="yutools-pdf-page.jpg" className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--fg)]">
              <ArrowDownToLine className="h-4 w-4" />
              Download JPG
            </a>
          </div>
        )}
      </section>
    </main>
  );
};
