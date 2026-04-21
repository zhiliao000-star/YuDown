import React, { useState } from 'react';
import { Copy, RefreshCcw } from 'lucide-react';

export const UUIDGenerator = () => {
  const [values, setValues] = useState<string[]>(Array.from({ length: 5 }, () => crypto.randomUUID()));

  const regenerate = () => {
    setValues(Array.from({ length: 5 }, () => crypto.randomUUID()));
  };

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">utility</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">UUID Generator</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Generate fresh UUID v4 values instantly.</p>
        <div className="mt-6 space-y-3">
          {values.map((value) => (
            <div key={value} className="flex items-center justify-between rounded-[18px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-3">
              <code className="text-sm text-[var(--fg)]">{value}</code>
              <button onClick={() => navigator.clipboard.writeText(value)} className="text-[var(--fg-soft)]"><Copy className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={regenerate} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-[var(--fg)]">
          <RefreshCcw className="h-4 w-4" />
          Generate again
        </button>
      </section>
    </main>
  );
};
