import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    <main className="mx-auto w-full max-w-[1100px] px-4 pb-10 pt-6 sm:px-5">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="panel p-5 sm:p-6">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-2 text-[24px] font-semibold text-[var(--fg)] sm:text-[30px]">{title}</h1>
          <p className="mt-2 max-w-[680px] text-sm leading-6 text-[var(--muted)]">{description}</p>
          <div className="mt-6">{children}</div>
        </section>
        <aside className="space-y-4">{aside}</aside>
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
    <div className="panel panel-subtle p-5">
      <p className="text-sm font-semibold text-[var(--fg)]">{title}</p>
      <div className="mt-2 text-sm leading-6 text-[var(--muted)]">{children}</div>
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
        'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-strong)]',
        'bg-[var(--accent-strong)] px-5 py-3 text-sm font-semibold text-white transition',
        'hover:translate-y-[-1px] hover:shadow-[var(--shadow-soft)] disabled:cursor-not-allowed disabled:opacity-50',
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
        'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-soft)]',
        'bg-white/70 px-5 py-3 text-sm font-medium text-[var(--fg-soft)] transition hover:bg-white',
        className
      )}
    />
  );
};

export const RelatedTools = ({ items }: { items: Array<{ label: string; to: string }> }) => {
  return (
    <ToolNoteCard title="Related tools">
      <div className="space-y-2">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="flex items-center justify-between rounded-[18px] border border-[var(--border-soft)] bg-white/70 px-4 py-3 transition hover:bg-white">
            <span>{item.label}</span>
            <ArrowRight className="h-4 w-4 text-[var(--muted)]" />
          </Link>
        ))}
      </div>
    </ToolNoteCard>
  );
};
