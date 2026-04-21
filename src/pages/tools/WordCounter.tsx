import React, { useState } from 'react';

export const WordCounter = () => {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">utility</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Word Counter</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Paste text and get a quick count for words, characters, and paragraphs.</p>
        <textarea value={text} onChange={(event) => setText(event.target.value)} rows={14} className="mt-6 w-full rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] px-4 py-4 text-sm text-[var(--fg)] outline-none" />
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="panel panel-subtle p-4"><p className="text-xs text-[var(--muted)]">Words</p><p className="mt-1 text-2xl text-[var(--fg)]">{words}</p></div>
          <div className="panel panel-subtle p-4"><p className="text-xs text-[var(--muted)]">Characters</p><p className="mt-1 text-2xl text-[var(--fg)]">{chars}</p></div>
          <div className="panel panel-subtle p-4"><p className="text-xs text-[var(--muted)]">Paragraphs</p><p className="mt-1 text-2xl text-[var(--fg)]">{paragraphs}</p></div>
        </div>
      </section>
    </main>
  );
};
