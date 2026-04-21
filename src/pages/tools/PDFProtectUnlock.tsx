import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';

export const PDFProtectUnlock = () => {
  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel p-5 sm:p-6">
        <p className="eyebrow">pdf</p>
        <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)]">PDF Protect / Unlock</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">This one is added to the tool library, but browser-side support is still limited.</p>
        <div className="mt-6 rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-soft)] p-5">
          <div className="inline-flex items-center gap-2 text-[var(--fg-soft)]"><Lock className="h-4 w-4" /> Password-protected PDF encryption and unlocking need a dedicated PDF security engine.</div>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            I wired the route and surface now so it shows up with the rest of the tools. The next step would be adding a specialized library or a worker-backed implementation that can safely handle encrypted PDFs in-browser.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--muted)]"><ShieldAlert className="h-4 w-4" /> Current version is informational, not a full unlocker yet.</div>
        </div>
      </section>
    </main>
  );
};
