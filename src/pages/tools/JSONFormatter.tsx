import React, { useState } from 'react';
import { Check, Copy, FileCode2 } from 'lucide-react';

export const JSONFormatter = () => {
  const [input, setInput] = useState('{\n  "hello": "world"\n}');
  const [output, setOutput] = useState('{\n  "hello": "world"\n}');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (formatError) {
      console.error(formatError);
      setError('Invalid JSON. Please check commas, quotes, and brackets.');
    }
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">utility</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">JSON Formatter</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Paste raw JSON, format it, and validate it in one step.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-[var(--muted)]">
            Input
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={16}
              className="mt-2 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 font-mono text-sm text-[var(--fg)] outline-none"
            />
          </label>
          <label className="text-sm text-[var(--muted)]">
            Output
            <textarea
              value={output}
              readOnly
              rows={16}
              className="mt-2 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 font-mono text-sm text-[var(--fg)] outline-none"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={formatJson}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)] transition hover:border-[var(--accent-soft)]"
          >
            <FileCode2 className="h-4 w-4" />
            Format JSON
          </button>
          <button
            onClick={copyOutput}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-transparent px-5 py-3 text-sm text-[var(--fg-soft)] transition hover:border-[var(--border-strong)]"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy output'}
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-[#ffb9aa]">{error}</p>}
      </section>
    </main>
  );
};
