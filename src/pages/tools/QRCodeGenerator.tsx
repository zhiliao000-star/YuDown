import React, { useState } from 'react';
import QRCode from 'qrcode';
import { AdSlot } from '../../components/AdSlot';
import { Download, QrCode, Type, Link as LinkIcon, Share2, Clipboard } from 'lucide-react';

export const QRCodeGenerator = () => {
  const [text, setText] = useState('https://yutools.com');
  const [qrUrl, setQrUrl] = useState('');
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [generating, setGenerating] = useState(false);

  const generateQRCode = async (inputText: string = text) => {
    if (!inputText) return;
    setGenerating(true);
    try {
      const url = await QRCode.toDataURL(inputText, {
        width: size,
        margin: margin,
        color: {
          dark: color,
          light: bgColor
        }
      });
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => generateQRCode(), 300);
    return () => clearTimeout(timer);
  }, [text, size, margin, color, bgColor]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">
          QR Code Generator
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Create high-quality, customizable QR codes for free. 
          Use URLs, text, Wi-Fi, or more. Download as PNG or SVG.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Enter URL or Text</label>
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500"
                placeholder="https://example.com"
              />
              <div className="absolute top-4 right-4 text-slate-300 dark:text-slate-700">
                 {text.length > 0 ? <LinkIcon size={20} /> : <Type size={20} />}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Size (px)</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Margin</label>
              <input
                type="number"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value))}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Foreground Color</label>
              <div className="flex items-center gap-3">
                 <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-10 overflow-hidden rounded-md border-0 bg-transparent ring-1 ring-slate-200 dark:ring-slate-700" />
                 <span className="text-sm font-mono">{color}</span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Background Color</label>
              <div className="flex items-center gap-3">
                 <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-10 w-10 overflow-hidden rounded-md border-0 bg-transparent ring-1 ring-slate-200 dark:ring-slate-700" />
                 <span className="text-sm font-mono">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center shadow-inner lg:max-w-xs dark:border-slate-800 dark:bg-slate-900/40">
           {qrUrl ? (
              <div className="group relative flex flex-col items-center">
                <img src={qrUrl} alt="QR Code" className="max-w-full rounded-lg bg-white p-4 shadow-sm" />
                <div className="mt-8 flex w-full flex-col gap-3">
                  <a
                    href={qrUrl}
                    download="qrcode-yutools.png"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/40"
                  >
                    <Download className="h-4 w-4" />
                    Download PNG
                  </a>
                  <button
                    onClick={() => {
                        navigator.clipboard.writeText(text);
                        alert('Link copied to clipboard');
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-slate-700 ring-1 ring-slate-200 transition-all hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700"
                  >
                     <Clipboard className="h-4 w-4" />
                     Copy Link
                  </button>
                </div>
              </div>
           ) : (
             <div className="flex h-64 w-64 items-center justify-center rounded-lg bg-white p-4 opacity-50 dark:bg-slate-950">
               <QrCode size={48} className="text-slate-400" />
             </div>
           )}
           <p className="mt-6 text-xs text-slate-500">
             Your QR codes never expire and have no scan limits. 
             Created in your browser.
           </p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
           <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
             <h3 className="font-semibold text-slate-900 dark:text-slate-50">Is this QR code generator free?</h3>
             <p className="mt-2 text-slate-600 dark:text-slate-400">Yes, it's 100% free with no hidden scan limits or expirations. You can generate unlimited QR codes for personal and commercial use.</p>
           </div>
           <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
             <h3 className="font-semibold text-slate-900 dark:text-slate-50">Do the QR codes expire?</h3>
             <p className="mt-2 text-slate-600 dark:text-slate-400">No. These are static QR codes, which means they will work forever as long as the content embedded in them is valid.</p>
           </div>
        </div>
      </div>
    </div>
  );
};
