import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MoonStar, Wrench } from 'lucide-react';
import { cn } from '../lib/utils';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[color:var(--bg-overlay)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-[1100px] items-center justify-between px-4 sm:px-5">
        <Link to="/" className="inline-flex items-center gap-2.5 text-sm font-medium tracking-[0.02em] text-[var(--fg)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-[var(--surface-raised)] shadow-[var(--shadow-soft)]">
            <Wrench className="h-3.5 w-3.5 text-[var(--accent-soft)]" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">YuTools</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 rounded-full border border-[var(--border-soft)] bg-[var(--surface)]/90 px-1.5 py-1 shadow-[var(--shadow-soft)]">
            {[
              ['Tools', '/tools'],
              ['About', '/about'],
              ['Privacy', '/privacy'],
            ].map(([label, href]) => (
              <NavLink
                key={href}
                to={href}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3 py-1.5 text-[11px] transition-colors',
                    isActive
                      ? 'bg-[var(--surface-raised)] text-[var(--fg)]'
                      : 'text-[var(--muted)] hover:text-[var(--fg-soft)]'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-3 py-1.5 text-[11px] text-[var(--muted)] shadow-[var(--shadow-soft)] sm:inline-flex">
            <MoonStar className="h-3.5 w-3.5 text-[var(--accent-soft)]" />
            Night mode
          </span>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[var(--border-soft)]">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 py-8 sm:px-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-medium text-[var(--fg)]">YuTools</p>
          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
            Quiet browser utilities for files, images, and small technical tasks.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
          <Link to="/tools" className="hover:text-[var(--fg-soft)]">All tools</Link>
          <Link to="/tools/jpg-to-pdf" className="hover:text-[var(--fg-soft)]">JPG to PDF</Link>
          <Link to="/tools/compress-image" className="hover:text-[var(--fg-soft)]">Compress Image</Link>
          <Link to="/tools/qr-code-generator" className="hover:text-[var(--fg-soft)]">QR Code</Link>
          <Link to="/privacy" className="hover:text-[var(--fg-soft)]">Privacy</Link>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1100px] px-4 pb-8 text-[11px] text-[var(--muted-dim)] sm:px-5">
        © {new Date().getFullYear()} YuTools. Local-first when possible.
      </div>
    </footer>
  );
};
