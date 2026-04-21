import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun, Wrench } from 'lucide-react';
import { cn } from '../lib/utils';

const STORAGE_KEY = 'yutools-theme';

type Theme = 'dark' | 'light';

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
};

export const Header: React.FC = () => {
  const [theme, setTheme] = React.useState<Theme>('dark');

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      applyTheme(stored);
      return;
    }

    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedTheme: Theme = preferredDark ? 'dark' : 'light';
    setTheme(resolvedTheme);
    applyTheme(resolvedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/92 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1100px] items-center justify-between px-4 sm:px-5">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--fg)]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-2)] text-[var(--accent)]">
            <Wrench className="h-3.5 w-3.5" />
          </span>
          <span>YuTools</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1">
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
                    'rounded-md px-2.5 py-1 text-xs transition-colors',
                    isActive
                      ? 'bg-[var(--surface-3)] text-[var(--fg)]'
                      : 'text-[var(--muted)] hover:text-[var(--fg)]'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={toggleTheme}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition hover:text-[var(--fg)]"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="mt-14 border-t border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 py-8 sm:px-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--fg)]">YuTools</p>
          <p className="mt-1 max-w-md text-xs text-[var(--muted)]">Compact browser utilities for files, images, and quick technical tasks.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs text-[var(--muted)]">
          <Link to="/tools" className="hover:text-[var(--fg)]">All tools</Link>
          <Link to="/about" className="hover:text-[var(--fg)]">About</Link>
          <Link to="/tools/jpg-to-pdf" className="hover:text-[var(--fg)]">JPG to PDF</Link>
          <Link to="/privacy" className="hover:text-[var(--fg)]">Privacy</Link>
          <Link to="/tools/compress-image" className="hover:text-[var(--fg)]">Compress Image</Link>
          <Link to="/tools/qr-code-generator" className="hover:text-[var(--fg)]">QR Code</Link>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1100px] px-4 pb-8 text-[11px] text-[var(--muted)] sm:px-5">
        © {new Date().getFullYear()} YuTools. Runs locally where possible.
      </div>
    </footer>
  );
};
