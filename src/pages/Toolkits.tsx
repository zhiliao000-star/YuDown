import React from 'react';
import { Search, MessageSquareText, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

type ToolkitCategory = 'All Toolkits' | 'Driver Tools';

type ToolkitItem = {
  slug: string;
  title: string;
  description: string;
  category: Exclude<ToolkitCategory, 'All Toolkits'>;
  icon: React.ComponentType<{ className?: string }>;
};

const TOOLKIT_CATEGORIES: ToolkitCategory[] = [
  'All Toolkits',
  'Driver Tools',
];

const TOOLKITS: ToolkitItem[] = [
  {
    slug: 'driver-english-pack',
    title: 'Driver English Pack',
    description: 'Ready-to-send English messages for Uber, Lyft, airport pickup, luggage, tolls, waiting, and address changes.',
    category: 'Driver Tools',
    icon: MessageSquareText,
  },
];

const useDocumentMeta = () => {
  React.useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionTag?.content;

    document.title = 'Practical Toolkits | YuTools';

    if (descriptionTag) {
      descriptionTag.content = 'Downloadable guides, templates, checklists, and ready-to-use packs for real-life tasks.';
    }

    return () => {
      document.title = previousTitle;

      if (descriptionTag && previousDescription !== undefined) {
        descriptionTag.content = previousDescription;
      }
    };
  }, []);
};

const filterToolkits = (query: string, category: ToolkitCategory) => {
  const searchTerm = query.trim().toLowerCase();

  return TOOLKITS.filter((toolkit) => {
    const matchesCategory = category === 'All Toolkits' || toolkit.category === category;
    const matchesSearch =
      searchTerm.length === 0 ||
      toolkit.title.toLowerCase().includes(searchTerm) ||
      toolkit.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });
};

const ToolkitCard = ({ toolkit, index }: { toolkit: ToolkitItem; index: number }) => {
  const Icon = toolkit.icon;

  return (
    <Link
      to={`/toolkits/${toolkit.slug}`}
      className={cn(
        'tool-card group p-6 sm:p-7 block',
        'animate-in fade-in slide-in-from-bottom-4',
        'hover:shadow-lg hover:border-gray-300'
      )}
      style={{ animationDelay: `${index * 35}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff1f0] text-[#e5322d] ring-1 ring-[#f8c7c4]">
          <Icon className="h-7 w-7" strokeWidth={1.8} />
        </div>
        <span className="shrink-0 rounded-full bg-[#fff1f0] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#c82b27]">
          Coming Soon
        </span>
      </div>

      <h2 className="mt-6 text-[22px] font-black leading-tight text-gray-900 transition-colors duration-200 group-hover:text-[#e5322d]">
        {toolkit.title}
      </h2>

      <p className="mt-3 text-[15px] leading-relaxed text-gray-500">
        {toolkit.description}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-600">
          {toolkit.category}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#e5322d] group-hover:gap-2 transition-all">
          View Toolkit
          <LinkIcon className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
};

export const ToolkitsPage: React.FC = () => {
  useDocumentMeta();
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<ToolkitCategory>('All Toolkits');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const deferredQuery = React.useDeferredValue(query);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredToolkits = filterToolkits(deferredQuery, category);

  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 pb-10 pt-6 sm:px-5">
      <section className="panel panel-subtle p-6 md:p-8">
        <div className="max-w-3xl">
          <p className="eyebrow">toolkit library</p>
          <h1 className="mt-2 text-[34px] font-black leading-tight text-[var(--fg)] sm:text-[48px]">
            Practical toolkits for real-life work.
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[var(--muted)] sm:text-[17px]">
            Downloadable guides, templates, checklists, and ready-to-use packs you can keep, print, or use on your phone.
          </p>
        </div>

        <div className="relative mt-8 max-w-2xl">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for toolkits..."
            className="search-bar"
          />
          <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {TOOLKIT_CATEGORIES.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => setCategory(pill)}
              className={cn('filter-chip', category === pill && 'filter-chip-active')}
            >
              {pill}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 sm:mt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredToolkits.map((toolkit, index) => (
            <ToolkitCard key={toolkit.slug} toolkit={toolkit} index={index} />
          ))}
        </div>

        {filteredToolkits.length === 0 && (
          <div className="empty-state mt-6 text-base font-medium">
            No toolkits found.
          </div>
        )}
      </section>
    </main>
  );
};