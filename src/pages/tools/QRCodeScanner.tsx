import React, { useState } from 'react';
import jsQR from 'jsqr';
import { QrCode, ScanSearch } from 'lucide-react';
import { FileList, FilePicker } from '../../components/UploadControls';

export const QRCodeScanner = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState('');

  const scan = async (newFiles: File[]) => {
    const file = newFiles[0];
    setFiles(file ? [file] : []);
    setResult('');
    if (!file) return;

    const image = new Image();
    const url = URL.createObjectURL(file);

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error('Image failed'));
      image.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.drawImage(image, 0, 0);
    const data = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(data.data, canvas.width, canvas.height);
    setResult(code?.data || 'No QR code found.');
    URL.revokeObjectURL(url);
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">utility</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">QR Code Scanner</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Upload an image and extract the QR code content.</p>
        <div className="mt-6">
          <FilePicker onFilesSelected={scan} accept="image/*" multiple={false} />
          <FileList files={files} onRemove={() => setFiles([])} />
        </div>
        <div className="mt-5 rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-4">
          <div className="inline-flex items-center gap-2 text-sm text-[var(--fg-soft)]">
            {result ? <ScanSearch className="h-4 w-4" /> : <QrCode className="h-4 w-4" />}
            {result || 'Scan result will appear here.'}
          </div>
        </div>
      </section>
    </main>
  );
};
