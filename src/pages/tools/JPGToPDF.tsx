import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { FilePicker, FileList } from '../../components/UploadControls';
import { downloadFile } from '../../lib/utils';
import { AdSlot } from '../../components/AdSlot';
import { ArrowBigRight, FileCheck, FileType, Loader2, Plus, Trash2 } from 'lucide-react';

export const JPGToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState<Blob | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles.filter(f => f.type.startsWith('image/'))]);
    setComplete(null);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertToPDF = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const file of files) {
        const imageBytes = await file.arrayBuffer();
        let image;
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(imageBytes);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(imageBytes);
        } else {
          continue; // Skip unsupported formats
        }
        
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      setComplete(pdfBlob);
    } catch (error) {
       console.error('PDF conversion failed', error);
       alert('Something went wrong during PDF generation.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">
          Convert JPG to PDF
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Turn your JPG and PNG images into a clean PDF document. 
          Combine multiple images into one file effortlessly.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        {!complete ? (
          <>
            <FilePicker onFilesSelected={handleFiles} accept="image/jpeg,image/png" />
            <FileList files={files} onRemove={removeFile} />

            {files.length > 0 && (
              <div className="mt-8">
                <button
                  onClick={convertToPDF}
                  disabled={processing}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-8 py-4 font-bold text-white transition-all hover:bg-red-700 disabled:bg-slate-400"
                >
                  {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Convert {files.length} {files.length === 1 ? 'Image' : 'Images'} to PDF</>}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <FileType className="h-10 w-10" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-50">PDF is ready</h2>
            <p className="mt-2 text-slate-500">Your images have been converted into a single PDF document.</p>
            <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
               <button
                  onClick={() => downloadFile(complete, 'YuTools-converted.pdf')}
                  className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-8 py-4 font-bold text-white transition-all hover:bg-red-700"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => { setFiles([]); setComplete(null); }}
                  className="rounded-lg border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                >
                   Start Over
                </button>
            </div>
          </div>
        )}
      </div>

      <AdSlot type="Sidebar" className="mt-12 hidden lg:block" />

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">How it works</h2>
          <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-400">
             <li className="flex gap-3">
               <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">1</span>
               <span>Select or drag images into the box.</span>
             </li>
             <li className="flex gap-3">
               <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">2</span>
               <span>Review your files and remove any unwanted images.</span>
             </li>
             <li className="flex gap-3">
               <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">3</span>
               <span>Click 'Convert to PDF' and our browser-side engine will generate the file.</span>
             </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Privacy first</h2>
          <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed">
            At <strong>YuTools</strong>, we understand that your documents are private. 
            All image to PDF conversion happens locally within your web browser. 
            This means your personal photos, identity documents, and receipts are <strong>never sent to a server</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
