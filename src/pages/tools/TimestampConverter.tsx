import React, { useState } from 'react';
import { Clock3 } from 'lucide-react';

export const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));

  const parsedTimestamp = Number(timestamp);
  const dateFromTimestamp = Number.isFinite(parsedTimestamp) ? new Date(parsedTimestamp * 1000).toISOString() : 'Invalid timestamp';
  const unixFromDate = Math.floor(new Date(dateInput).getTime() / 1000);

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">utility</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">Timestamp Converter</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Convert between Unix timestamps and readable dates.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4">
            <p className="text-xs text-[var(--muted)]">Unix timestamp</p>
            <input value={timestamp} onChange={(event) => setTimestamp(event.target.value)} className="mt-2 w-full bg-transparent text-lg text-[var(--fg)] outline-none" />
            <p className="mt-3 text-sm text-[var(--fg-soft)]">{dateFromTimestamp}</p>
          </div>
          <div className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-raised)] p-4">
            <p className="text-xs text-[var(--muted)]">Date</p>
            <input type="datetime-local" value={dateInput} onChange={(event) => setDateInput(event.target.value)} className="mt-2 w-full bg-transparent text-lg text-[var(--fg)] outline-none" />
            <p className="mt-3 text-sm text-[var(--fg-soft)]">{unixFromDate}</p>
          </div>
        </div>
        <div className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--muted)]"><Clock3 className="h-4 w-4" /> Local browser time conversion.</div>
      </section>
    </main>
  );
};
