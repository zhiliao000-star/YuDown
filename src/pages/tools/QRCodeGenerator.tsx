import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Clipboard, Download, QrCode } from 'lucide-react';
import { PrimaryButton, RelatedTools, SecondaryButton, ToolNoteCard, ToolPageShell } from '../../components/ToolLayout';

export const QRCodeGenerator = () => {
  const [text, setText] = useState('https://yutools.com');
  const [qrUrl, setQrUrl] = useState('');
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);
  const [color, setColor] = useState('#201817');
  const [bgColor, setBgColor] = useState('#ffffff');

  const generateQRCode = async (inputText: string = text) => {
    if (!inputText) return;
    try {
      const url = await QRCode.toDataURL(inputText, {
        width: size,
        margin,
        color: { dark: color, light: bgColor },
      });
      setQrUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const timer = window.setTimeout(() => generateQRCode(), 220);
    return () => window.clearTimeout(timer);
  }, [text, size, margin, color, bgColor]);

  return (
    <ToolPageShell
      eyebrow="utility"
      title="QR Code Generator"
      description="Create clean QR codes for URLs or text, then download the image immediately."
      aside={
        <>
          <ToolNoteCard title="Best for">
            Static links, menus, event check-ins, and fast one-off sharing. The QR image is generated in your browser.
          </ToolNoteCard>
          <RelatedTools
            items={[
              { label: 'QR Code Scanner', to: '/tools/qr-code-scanner' },
              { label: 'URL Encode / Decode', to: '/tools/url-encode-decode' },
              { label: 'Screenshot to Text', to: '/tools/screenshot-to-text' },
            ]}
          />
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-[24px] border border-[var(--border-soft)] bg-white/70 p-5">
          <label className="text-sm text-[var(--muted)]">
            URL or text
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={5}
              className="mt-2 w-full rounded-[18px] border border-[var(--border-soft)] bg-white px-4 py-4 text-[var(--fg)] outline-none"
            />
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[var(--muted)]">
              Size
              <input type="number" value={size} onChange={(event) => setSize(Number(event.target.value))} className="mt-2 w-full rounded-[18px] border border-[var(--border-soft)] bg-white px-4 py-3 text-[var(--fg)] outline-none" />
            </label>
            <label className="text-sm text-[var(--muted)]">
              Margin
              <input type="number" value={margin} onChange={(event) => setMargin(Number(event.target.value))} className="mt-2 w-full rounded-[18px] border border-[var(--border-soft)] bg-white px-4 py-3 text-[var(--fg)] outline-none" />
            </label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-[var(--muted)]">
              Foreground
              <input type="color" value={color} onChange={(event) => setColor(event.target.value)} className="mt-2 h-11 w-full rounded-[18px] border border-[var(--border-soft)] bg-white px-2 py-2" />
            </label>
            <label className="text-sm text-[var(--muted)]">
              Background
              <input type="color" value={bgColor} onChange={(event) => setBgColor(event.target.value)} className="mt-2 h-11 w-full rounded-[18px] border border-[var(--border-soft)] bg-white px-2 py-2" />
            </label>
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--border-soft)] bg-white/80 p-5 text-center shadow-[var(--shadow-soft)]">
          {qrUrl ? (
            <>
              <img src={qrUrl} alt="QR Code" className="mx-auto rounded-[20px] border border-[var(--border-soft)] bg-white p-4" />
              <div className="mt-4 flex flex-col gap-3">
                <a href={qrUrl} download="qrcode-yutools.png" className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--accent-strong)] px-5 py-3 text-sm font-semibold text-white">
                  <Download className="h-4 w-4" />
                  Download PNG
                </a>
                <SecondaryButton onClick={() => navigator.clipboard.writeText(text)}>
                  <Clipboard className="h-4 w-4" />
                  Copy content
                </SecondaryButton>
              </div>
            </>
          ) : (
            <div className="flex min-h-[280px] items-center justify-center rounded-[20px] border border-dashed border-[var(--border-soft)] bg-white/60">
              <QrCode className="h-12 w-12 text-[var(--muted-dim)]" />
            </div>
          )}
        </div>
      </div>
    </ToolPageShell>
  );
};
