import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Command, Box } from 'lucide-react';
import { cn } from '../lib/utils';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[var(--fg)] transition hover:opacity-80">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--fg)]">
            <Box className="h-4 w-4 text-white" />
          </span>
          <span className="text-base font-bold tracking-tight">YuTools</span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center gap-6">
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
                    'text-sm font-medium transition-colors',
                    isActive
                      ? 'text-[var(--accent-strong)]'
                      : 'text-[var(--muted)] hover:text-[var(--fg)]'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2 border-l border-[var(--border-soft)] pl-6">
            <span className="hidden items-center gap-1.5 rounded-md border border-[var(--border-soft)] bg-[var(--surface-soft)] px-2 py-1 text-[12px] font-medium text-[var(--muted)] sm:inline-flex">
              <Command className="h-3 w-3" />
              Ctrl+K
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[var(--border-soft)] bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Link to="/" className="inline-flex items-center gap-2 text-[var(--fg)]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[var(--fg)]">
              <Box className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="text-sm font-bold">YuTools</span>
          </Link>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            A comprehensive suite of browser utilities for files, images, and technical tasks.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 text-sm text-[var(--muted)]">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[var(--fg)]">Tools</span>
            <Link to="/tools" className="hover:text-[var(--accent-strong)] transition-colors">All tools</Link>
            <Link to="/tools/jpg-to-pdf" className="hover:text-[var(--accent-strong)] transition-colors">JPG to PDF</Link>
            <Link to="/tools/compress-image" className="hover:text-[var(--accent-strong)] transition-colors">Compress Image</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[var(--fg)]">Legal</span>
            <Link to="/privacy" className="hover:text-[var(--accent-strong)] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[var(--accent-strong)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border-soft)] py-6">
        <div className="mx-auto w-full max-w-[1200px] px-4 text-xs text-[var(--muted-dim)] sm:px-6">
          © {new Date().getFullYear()} YuTools. Local-first when possible.
        </div>
      </div>
    </footer>
  );
};
