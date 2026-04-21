import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import {
  ArrowRight,
  Binary,
  FileArchive,
  FileCode2,
  FileStack,
  Filter,
  Image as ImageIcon,
  Minimize2,
  QrCode,
  Search,
  WandSparkles,
} from 'lucide-react';
import { Header, Footer } from './layouts/Layout';
import { CompressImage } from './pages/tools/CompressImage';
import { JPGToPDF } from './pages/tools/JPGToPDF';
import { QRCodeGenerator } from './pages/tools/QRCodeGenerator';
import { cn } from './lib/utils';

type ToolCategory = 'All' | 'PDF' | 'Image' | 'Utility';

type ToolItem = {
  name: string;
  path: string;
  description: string;
  category: Exclude<ToolCategory, 'All'>;
  icon: React.ComponentType<{ className?: string }>;
  available?: boolean;
};

const TOOL_ITEMS: ToolItem[] = [
  {
    name: 'JPG to PDF',
    path: '/tools/jpg-to-pdf',
    description: 'Combine JPG or PNG images into one PDF.',
    category: 'PDF',
    icon: FileStack,
    available: true,
  },
  {
    name: 'Merge PDF',
    path: '/tools/merge-pdf',
    description: 'Join multiple PDF files in sequence.',
    category: 'PDF',
    icon: FileArchive,
    available: false,
  },
  {
    name: 'Compress Image',
    path: '/tools/compress-image',
    description: 'Shrink image size while preserving quality.',
    category: 'Image',
    icon: Minimize2,
    available: true,
  },
  {
    name: 'Resize Image',
    path: '/tools/resize-image',
    description: 'Change width and height quickly.',
    category: 'Image',
    icon: ImageIcon,
    available: false,
  },
  {
    name: 'QR Code',
    path: '/tools/qr-code-generator',
    description: 'Generate static QR codes instantly.',
    category: 'Utility',
    icon: QrCode,
    available: true,
  },
  {
    name: 'JSON Formatter',
    path: '/tools/json-formatter',
    description: 'Format and validate JSON snippets.',
    category: 'Utility',
    icon: FileCode2,
    available: false,
  },
  {
    name: 'Image Converter',
    path: '/tools/image-converter',
    description: 'Convert between JPG, PNG, WebP.',
    category: 'Image',
    icon: WandSparkles,
    available: false,
  },
  {
    name: 'Base64',
    path: '/tools/base64',
    description: 'Encode or decode Base64 text.',
    category: 'Utility',
    icon: Binary,
    available: false,
  },
];

const QUICK_LAUNCH = ['JPG to PDF', 'Merge PDF', 'Compress Image', 'QR Code', 'JSON Formatter'];

const filterTools = (query: string, category: ToolCategory) => {
  const q = query.trim().toLowerCase();

  return TOOL_ITEMS.filter((tool) => {
    const categoryMatch = category === 'All' || tool.category === category;
    const queryMatch =
      q.length === 0 ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q);

    return categoryMatch && queryMatch;
  });
};

const ToolCard = ({ tool }: { tool: ToolItem }) => {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-2)] text-[var(--accent)]">
          <tool.icon className="h-4 w-4" />
        </span>
        <span className="text-[11px] uppercase tracking-wide text-[var(--muted)]">{tool.category}</span>
      </div>
      <h3 className="mt-3 text-sm font-semibold text-[var(--fg)]">{tool.name}</h3>
      <p className="mt-1 text-xs text-[var(--muted)]">{tool.description}</p>
      <div className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--accent)]">
        <span>{tool.available ? 'Open tool' : 'Planned'}</span>
        <ArrowRight className="h-3 w-3" />
      </div>
    </>
  );

  if (!tool.available) {
    return <div className="tool-card opacity-60">{content}</div>;
  }

  return (
    <Link to={tool.path} className="tool-card">
      {content}
    </Link>
  );
};

const Launcher = ({ compact = false }: { compact?: boolean }) => {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<ToolCategory>('All');
  const inputRef = React.useRef<HTMLInputElement>(null);

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

  const tools = filterTools(query, category);

  return (
    <section className={cn('mx-auto w-full max-w-[920px]', compact ? 'mt-4' : 'mt-6')}>
      <div className="panel">
        {!compact && (
          <>
            <h1 className="text-balance text-[22px] font-semibold leading-tight text-[var(--fg)] sm:text-[28px]">
              Fast browser-based tools for files, images, and quick tasks.
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Pick a tool, drop your file, and finish in seconds. No account and minimal friction.
            </p>
          </>
        )}

        <div className={cn(compact ? 'mt-0' : 'mt-5')}>
          <label htmlFor="tool-search" className="sr-only">
            Search tools
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" />
            <input
              id="tool-search"
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools..."
              className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-10 pr-20 text-sm text-[var(--fg)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[var(--border)] bg-[var(--surface-2)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">
              /
            </span>
          </div>
        </div>

        {!compact && (
          <div className="mt-3 flex flex-wrap gap-2">
            {QUICK_LAUNCH.map((label) => {
              const tool = TOOL_ITEMS.find((item) => item.name === label);
              if (!tool) return null;
              return tool.available ? (
                <Link key={label} to={tool.path} className="chip">
                  {label}
                </Link>
              ) : (
                <span key={label} className="chip opacity-60">
                  {label}
                </span>
              );
            })}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-[var(--muted)]">
            <Filter className="h-3.5 w-3.5" />
            Category
          </span>
          {(['All', 'PDF', 'Image', 'Utility'] as ToolCategory[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setCategory(tab)}
              className={cn('chip', category === tab && 'chip-active')}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.path} tool={tool} />
          ))}
        </div>

        {tools.length === 0 && (
          <div className="mt-4 rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-6 text-center text-sm text-[var(--muted)]">
            No tools matched your search.
          </div>
        )}
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 pb-8 pt-6 sm:px-5">
      <Launcher />

      <div className="trust-strip mt-4">Runs in your browser when possible. No signup.</div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="panel p-4">
          <h2 className="text-sm font-semibold text-[var(--fg)]">How it works</h2>
          <ol className="mt-2 space-y-1.5 text-xs text-[var(--muted)]">
            <li>1. Search and open a tool.</li>
            <li>2. Drop your file or input text.</li>
            <li>3. Process instantly in your browser.</li>
            <li>4. Download or copy the result.</li>
          </ol>
        </article>
        <article className="panel p-4">
          <h2 className="text-sm font-semibold text-[var(--fg)]">FAQ</h2>
          <div className="mt-2 space-y-2 text-xs text-[var(--muted)]">
            <p><span className="text-[var(--fg)]">Is it private?</span> Most tools run locally, so files stay on your device.</p>
            <p><span className="text-[var(--fg)]">Do I need an account?</span> No. Open the tool and start immediately.</p>
            <p><span className="text-[var(--fg)]">Mobile support?</span> Yes, recent iOS and Android browsers work.</p>
          </div>
        </article>
      </section>
    </main>
  );
};

const ToolsPage = () => {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 pb-8 pt-6 sm:px-5">
      <div className="mb-3">
        <h1 className="text-lg font-semibold text-[var(--fg)]">All tools</h1>
        <p className="text-sm text-[var(--muted)]">Find and launch a task without scrolling through marketing content.</p>
      </div>
      <Launcher compact />
    </main>
  );
};

const AboutPage = () => (
  <main className="mx-auto w-full max-w-[920px] px-4 pb-8 pt-6 sm:px-5">
    <section className="panel p-5">
      <h1 className="text-lg font-semibold text-[var(--fg)]">About YuTools</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        YuTools is a compact utility workspace for everyday file and text tasks. The product is designed for speed,
        privacy, and direct interaction instead of marketing-heavy pages.
      </p>
    </section>
  </main>
);

const PrivacyPage = () => (
  <main className="mx-auto w-full max-w-[920px] px-4 pb-8 pt-6 sm:px-5">
    <section className="panel p-5">
      <h1 className="text-lg font-semibold text-[var(--fg)]">Privacy</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        YuTools prefers browser-side processing. For supported tools, files stay on your device and are not uploaded.
      </p>
    </section>
  </main>
);

const App = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/tools/compress-image" element={<CompressImage />} />
          <Route path="/tools/jpg-to-pdf" element={<JPGToPDF />} />
          <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
          <Route path="/tools/*" element={<ToolsPage />} />
          <Route
            path="*"
            element={
              <main className="mx-auto w-full max-w-[920px] px-4 pb-8 pt-6 sm:px-5">
                <div className="panel p-6 text-center">
                  <h1 className="text-lg font-semibold text-[var(--fg)]">Page not found</h1>
                  <Link to="/tools" className="mt-3 inline-flex text-sm text-[var(--accent)] hover:opacity-90">
                    Back to tools
                  </Link>
                </div>
              </main>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
