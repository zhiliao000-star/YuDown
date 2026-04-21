import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { FilePicker, FileList } from '../../components/UploadControls';
import { downloadFile, formatBytes } from '../../lib/utils';
import { AdSlot } from '../../components/AdSlot';
import { ArrowDown, Check, Loader2, Minus, Plus, Settings } from 'lucide-react';

export const CompressImage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = useState(1920);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; originalSize: number; compressedSize: number; url: string } | null>(null);

  const handleFiles = (newFiles: File[]) => {
    setFiles(newFiles.slice(0, 1)); // Single file for now
    setResult(null);
  };

  const handleCompress = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      const file = files[0];
      const options = {
        maxSizeMB: quality, // Simplification
        maxWidthOrHeight,
        useWebWorker: true,
        initialQuality: quality
      };

      const compressedBlob = await imageCompression(file, options);
      const url = URL.createObjectURL(compressedBlob);
      setResult({
        blob: compressedBlob,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        url
      });
    } catch (error) {
      console.error('Compression failed', error);
      alert('Compression failed. Please try another image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">
          Compress Image Online
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Reduce image file size while maintaining high quality. 
          JPG, PNG, and WebP supported. Stays in your browser.
        </p>
      </div>

      <AdSlot type="TopBanner" />

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <FilePicker onFilesSelected={handleFiles} accept="image/*" multiple={false} />
        <FileList files={files} onRemove={() => setFiles([])} />

        {files.length > 0 && !result && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
                <Settings className="h-4 w-4" />
                <span>Compression Settings</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">Quality: {Math.round(quality * 100)}%</span>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.0" 
                    step="0.1" 
                    value={quality} 
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="h-2 w-32 cursor-pointer bg-slate-200 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCompress}
              disabled={processing}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 font-bold text-white transition-all hover:bg-blue-700 disabled:bg-slate-400"
            >
              {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Compress Image'}
            </button>
          </div>
        )}

        {result && (
          <div className="mt-12 rounded-xl bg-slate-50 p-6 dark:bg-slate-900/50">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Check className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-50">Compression Complete</h3>
                  <p className="text-sm text-slate-500">
                    Your image is ready. Reduced by {Math.round((1 - result.compressedSize / result.originalSize) * 100)}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 line-through">{formatBytes(result.originalSize)}</p>
                <p className="text-lg font-bold text-slate-900 dark:text-slate-50">{formatBytes(result.compressedSize)}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => downloadFile(result.blob, 'compressed-yutools.jpg')}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-all hover:bg-blue-700"
              >
                Download Compressed Image
              </button>
              <button
                 onClick={() => { setFiles([]); setResult(null); }}
                 className="flex-1 rounded-lg border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition-all hover:bg-slate-50"
              >
                Upload New Image
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-20 prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold">How to compress images for free</h2>
        <ol className="mt-6 space-y-4 text-slate-600 dark:text-slate-400">
          <li><strong>Upload your image:</strong> Drag and drop your JPG, PNG, or WebP file into the box above.</li>
          <li><strong>Adjust quality:</strong> Move the quality slider. Lower quality results in smaller files.</li>
          <li><strong>Click 'Compress':</strong> We process your image directly in your browser using high-quality algorithms.</li>
          <li><strong>Download:</strong> Your privacy is safe—nothing is uploaded to our servers.</li>
        </ol>

        <AdSlot type="InContent" />

        <h3 className="mt-12 text-2xl font-bold">Frequently Asked Questions</h3>
        <div className="mt-6 space-y-6">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-50">Is my image data private?</p>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Yes! YuTools uses browser-side compression. Your files are never uploaded to our servers, keeping your sensitive data private.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-50">Does it work on mobile?</p>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Absolutely. YuTools is mobile-friendly and works within any modern mobile browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
