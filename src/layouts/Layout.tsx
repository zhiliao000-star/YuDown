import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Command, LayoutGrid } from 'lucide-react';
import { cn } from '../lib/utils';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-2.5 text-gray-900 transition hover:opacity-80">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white shadow-sm">
            <LayoutGrid className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-[17px] font-black tracking-tight">YuTools</span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden sm:flex items-center gap-6">
            {[
              ['pdf tools', '/tools'],
              ['image tools', '/tools?category=Image'],
              ['all tools', '/tools'],
            ].map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                className={({ isActive }) =>
                  cn(
                    'text-[15px] font-bold uppercase tracking-wide transition-colors',
                    isActive
                      ? 'text-red-500'
                      : 'text-gray-600 hover:text-gray-900'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2.5 text-gray-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white">
              <LayoutGrid className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="text-[17px] font-black tracking-tight">YuTools</span>
          </Link>
          <p className="mt-4 text-[15px] leading-relaxed text-gray-500 font-medium">
            Every tool you need to work with PDFs, Images, and more in one place. 100% Free.
          </p>
        </div>
        <div className="flex flex-wrap gap-16 text-[15px] text-gray-500">
          <div className="flex flex-col gap-4">
            <span className="font-bold text-gray-900 uppercase tracking-widest text-xs">Solutions</span>
            <Link to="/tools" className="hover:text-red-500 font-medium transition-colors">All tools</Link>
            <Link to="/tools/jpg-to-pdf" className="hover:text-red-500 font-medium transition-colors">JPG to PDF</Link>
            <Link to="/tools/compress-image" className="hover:text-red-500 font-medium transition-colors">Compress Image</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold text-gray-900 uppercase tracking-widest text-xs">Company</span>
            <Link to="/about" className="hover:text-red-500 font-medium transition-colors">About Us</Link>
            <Link to="/privacy" className="hover:text-red-500 font-medium transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200/60 py-6">
        <div className="mx-auto w-full max-w-[1200px] px-4 text-[13px] font-medium text-gray-400 sm:px-6">
          © {new Date().getFullYear()} YuTools. Local-first when possible.
        </div>
      </div>
    </footer>
  );
};
