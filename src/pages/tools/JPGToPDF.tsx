import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileType, Loader2 } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';
import { PrimaryButton, RelatedTools, SecondaryButton, ToolNoteCard, ToolPageShell } from '../../components/ToolLayout';
import { downloadFile } from '../../lib/utils';

export const JPGToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState<Blob | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles.filter((file) => file.type.startsWith('image/'))]);
    setComplete(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const convertToPDF = async () => {
    if (!files.length) return;
    setProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const file of files) {
        const imageBytes = await file.arrayBuffer();
        const image =
          file.type === 'image/png'
            ? await pdfDoc.embedPng(imageBytes)
            : await pdfDoc.embedJpg(imageBytes);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
      const pdfBytes = await pdfDoc.save();
      setComplete(new Blob([pdfBytes], { type: 'application/pdf' }));
    } catch (error) {
      console.error('PDF conversion failed', error);
      alert('Something went wrong during PDF generation.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageShell
      eyebrow="pdf"
      title="JPG to PDF"
      description="Turn JPG and PNG images into one clean PDF. Add multiple images and export them in a single pass."
      aside={
        <>
          <ToolNoteCard title="How it works">
            Add image files, review their order, then export them into one PDF. Processing stays in your browser.
          </ToolNoteCard>
          <RelatedTools
            items={[
              { label: 'Merge PDF', to: '/tools/merge-pdf' },
              { label: 'Compress Image', to: '/tools/compress-image' },
              { label: 'PDF to JPG', to: '/tools/pdf-to-jpg' },
            ]}
          />
        </>
      }
    >
      <FilePicker onFilesSelected={handleFiles} accept="image/jpeg,image/png" />
      <FileList files={files} onRemove={removeFile} />

      {!complete && files.length > 0 && (
        <div className="mt-5">
          <PrimaryButton onClick={convertToPDF} disabled={processing} className="w-full sm:w-auto">
            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileType className="h-4 w-4" />}
            Convert {files.length} {files.length === 1 ? 'image' : 'images'}
          </PrimaryButton>
        </div>
      )}

      {complete && (
        <div className="mt-6 rounded-[24px] border border-[var(--border-soft)] bg-white/70 p-5">
          <p className="text-sm font-medium text-[var(--fg)]">PDF ready</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Your images have been packed into one document.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <PrimaryButton onClick={() => downloadFile(complete, 'yutools-converted.pdf')}>Download PDF</PrimaryButton>
            <SecondaryButton onClick={() => { setFiles([]); setComplete(null); }}>Start over</SecondaryButton>
          </div>
        </div>
      )}
    </ToolPageShell>
  );
};
