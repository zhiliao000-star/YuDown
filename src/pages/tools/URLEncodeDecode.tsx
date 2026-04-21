import React, { useState } from 'react';
import { Link2, RotateCcw } from 'lucide-react';

export const URLEncodeDecode = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">utility</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">URL Encode / Decode</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Encode query strings safely or decode them back into readable text.</p>
        <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={8} className="mt-6 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 text-sm text-[var(--fg)] outline-none" />
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={() => setOutput(encodeURIComponent(input))} className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)]">
            <Link2 className="h-4 w-4" />
            Encode
          </button>
          <button onClick={() => setOutput(decodeURIComponent(input))} className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-transparent px-5 py-3 text-sm text-[var(--fg-soft)]">
            <RotateCcw className="h-4 w-4" />
            Decode
          </button>
        </div>
        <textarea value={output} readOnly rows={8} className="mt-5 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 text-sm text-[var(--fg)] outline-none" />
      </section>
    </main>
  );
};
