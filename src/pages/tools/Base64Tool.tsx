import React, { useState } from 'react';
import { Copy, FileDigit, RotateCcw } from 'lucide-react';

export const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const encode = () => {
    try {
      setOutput(window.btoa(unescape(encodeURIComponent(input))));
    } catch (error) {
      console.error(error);
      alert('Unable to encode this text.');
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(escape(window.atob(input))));
    } catch (error) {
      console.error(error);
      alert('Unable to decode this Base64 string.');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">utility</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Base64 Encode / Decode</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Convert plain text to Base64 or decode Base64 back into readable text.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-[var(--muted)]">
            Input
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={14}
              className="mt-2 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 text-sm text-[var(--fg)] outline-none"
            />
          </label>
          <label className="text-sm text-[var(--muted)]">
            Output
            <textarea
              value={output}
              readOnly
              rows={14}
              className="mt-2 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 text-sm text-[var(--fg)] outline-none"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={encode}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)]"
          >
            <FileDigit className="h-4 w-4" />
            Encode
          </button>
          <button
            onClick={decode}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-transparent px-5 py-3 text-sm text-[var(--fg-soft)] transition hover:border-[var(--border-strong)]"
          >
            <Copy className="h-4 w-4" />
            Decode
          </button>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-transparent px-5 py-3 text-sm text-[var(--fg-soft)] transition hover:border-[var(--border-strong)]"
          >
            <RotateCcw className="h-4 w-4" />
            Clear
          </button>
        </div>
      </section>
    </main>
  );
};
