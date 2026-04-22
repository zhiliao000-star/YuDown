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
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6">
      <div className="mb-8 flex items-center gap-2 text-sm text-[var(--muted)]">
        <Link to="/tools" className="hover:text-[var(--accent-strong)] transition-colors">Tools</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[var(--fg)]">{eyebrow}</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-[720px] text-base leading-relaxed text-[var(--muted)]">{description}</p>
          <div className="mt-8">
            <div className="panel bg-white p-6 shadow-sm border-[var(--border-soft)]">
               {children}
            </div>
          </div>
        </section>
        <aside className="space-y-6">
          {aside}
        </aside>
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
