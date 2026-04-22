import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const ToolPageShell = ({
  eyebrow,
  title,
  description,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) => {
  return (
    <main className="mx-auto w-full max-w-[900px] px-4 py-20 sm:px-6">
      <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-[40px] font-bold tracking-tight text-gray-900 sm:text-[52px]">{title}</h1>
        <p className="mt-4 max-w-[700px] text-[20px] font-medium text-gray-500">{description}</p>
        
        <div className="mt-12 w-full max-w-2xl flex flex-col items-center">
           {children}
        </div>
      </div>
    </main>
  );
};

export const ToolNoteCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="panel bg-[var(--surface-soft)] border-[var(--border-soft)] p-5">
      <h3 className="text-sm font-semibold text-[var(--fg)]">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-[var(--muted)] space-y-2">{children}</div>
    </div>
  );
};

export const PrimaryButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md border border-transparent',
        'bg-[#111827] px-6 py-2.5 text-sm font-medium text-white transition-all duration-200',
        'hover:bg-[#1f2937] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-strong)] focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    />
  );
};

export const SecondaryButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-strong)]',
        'bg-white px-6 py-2.5 text-sm font-medium text-[var(--fg)] transition-all duration-200',
        'hover:bg-[var(--surface-soft)] hover:text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-[var(--border-strong)] focus:ring-offset-1',
        className
      )}
    />
  );
};

export const RelatedTools = ({ items }: { items: Array<{ label: string; to: string }> }) => {
  return (
    <ToolNoteCard title="Related Tools">
      <div className="mt-2 flex flex-col gap-1">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="group flex items-center justify-between rounded-md px-3 py-2.5 text-[var(--muted)] transition-colors hover:bg-white hover:text-[var(--fg)]">
            <span className="font-medium">{item.label}</span>
            <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </ToolNoteCard>
  );
};
