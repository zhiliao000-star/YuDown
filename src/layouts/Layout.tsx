import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Settings, Tool, Github, Menu, X, Hammer } from 'lucide-react';
import { cn } from '../lib/utils';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-12">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-950 dark:text-slate-50">
          <Hammer className="h-6 w-6 text-blue-600 dark:text-blue-500" aria-hidden="true" />
          <span className="tracking-tight">YuTools</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/tools" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-500", isActive ? "text-blue-600 dark:text-blue-500 font-semibold" : "text-slate-600 dark:text-slate-400")}>Tools</NavLink>
          <NavLink to="/about" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-500", isActive ? "text-blue-600 dark:text-blue-500 font-semibold" : "text-slate-600 dark:text-slate-400")}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => cn("text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-500", isActive ? "text-blue-600 dark:text-blue-500 font-semibold" : "text-slate-600 dark:text-slate-400")}>Contact</NavLink>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-400">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <nav className="flex flex-col gap-4">
            <Link to="/tools" className="text-sm font-medium text-slate-700 dark:text-slate-300" onClick={() => setIsOpen(false)}>All Tools</Link>
            <Link to="/about" className="text-sm font-medium text-slate-700 dark:text-slate-300" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="text-sm font-medium text-slate-700 dark:text-slate-300" onClick={() => setIsOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 sm:px-12 md:flex-row md:justify-between">
        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Hammer className="h-6 w-6 text-blue-600" />
            <span>YuTools</span>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Free high-quality utility tools for everyday file tasks. Secure, fast, and stays in your browser.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">Tools</h3>
            <Link to="/tools/merge-pdf" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Merge PDF</Link>
            <Link to="/tools/compress-image" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Compress Image</Link>
            <Link to="/tools/qr-code-generator" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">QR Generator</Link>
          </div>
          <div className="flex flex-col gap-4">
             <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">Company</h3>
             <Link to="/about" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">About</Link>
             <Link to="/privacy" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Privacy</Link>
             <Link to="/terms" className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500">Terms</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-slate-200 px-6 py-8 sm:px-12 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} YuTools. Created with privacy in mind.
        </p>
      </div>
    </footer>
  );
};
