import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import {
  ArrowUpRight,
  Binary,
  FileArchive,
  FileCode2,
  FileStack,
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
    description: 'Turn a batch of images into one clean PDF.',
    category: 'PDF',
    icon: FileStack,
    available: true,
  },
  {
    name: 'Merge PDF',
    path: '/tools/merge-pdf',
    description: 'Join PDFs in the order you choose.',
    category: 'PDF',
    icon: FileArchive,
    available: false,
  },
  {
    name: 'Compress Image',
    path: '/tools/compress-image',
    description: 'Reduce file size without needless noise.',
    category: 'Image',
    icon: Minimize2,
    available: true,
  },
  {
    name: 'Resize Image',
    path: '/tools/resize-image',
    description: 'Change image dimensions with precision.',
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
    description: 'Convert between JPG, PNG, and WebP.',
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

const QUICK_LAUNCH = ['JPG to PDF', 'Compress Image', 'QR Code'];

const filterTools = (query: string, category: ToolCategory) => {
  const q = query.trim().toLowerCase();

  return TOOL_ITEMS.filter((tool) => {
    const matchesCategory = category === 'All' || tool.category === category;
    const matchesQuery =
      q.length === 0 ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });
};

const ToolCard = ({ tool }: { tool: ToolItem }) => {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="tool-icon">
          <tool.icon className="h-4 w-4" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted-dim)]">{tool.category}</span>
      </div>
      <h3 className="mt-4 text-sm font-medium text-[var(--fg)]">{tool.name}</h3>
      <p className="mt-1.5 text-xs leading-5 text-[var(--muted)]">{tool.description}</p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-[var(--fg-soft)]">
        <span>{tool.available ? 'Open' : 'Soon'}</span>
        <ArrowUpRight className="h-3 w-3" />
      </div>
    </>
  );

  if (!tool.available) {
    return <div className="tool-card opacity-50">{content}</div>;
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
    <section className={cn('mx-auto w-full max-w-[920px]', compact ? 'mt-4' : 'mt-8')}>
      <div className={cn('relative', !compact && 'fade-up')}>
        {!compact && (
          <>
            <div className="hero-orb" />
            <div className="hero-orb-right" />
          </>
        )}
        {!compact && (
          <div className="max-w-[640px]">
            <p className="eyebrow">quiet utility workspace</p>
            <h1 className="mt-3 text-balance text-[28px] font-semibold leading-[1.05] text-[var(--fg)] sm:text-[38px]">
              Gentle tools for files, images, and quick tasks.
            </h1>
            <p className="mt-3 max-w-[560px] text-sm leading-6 text-[var(--muted)]">
              Search, open, and finish the task with as little friction as possible.
            </p>
          </div>
        )}

        <div className={cn('relative', compact ? 'mt-0' : 'mt-8')}>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-dim)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools"
            className="search-bar"
          />
          <span className="search-hint">/</span>
        </div>

        {!compact && (
          <div className="mt-5 flex flex-wrap gap-2">
            {QUICK_LAUNCH.map((label) => {
              const tool = TOOL_ITEMS.find((item) => item.name === label);
              if (!tool) return null;

              return (
                <Link key={label} to={tool.path} className="quick-chip">
                  {label}
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {(['All', 'PDF', 'Image', 'Utility'] as ToolCategory[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setCategory(tab)}
              className={cn('filter-chip', category === tab && 'filter-chip-active')}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.path} tool={tool} />
          ))}
        </div>

        {tools.length === 0 && (
          <div className="empty-state mt-5">No tools matched your search.</div>
        )}
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 pb-10 pt-6 sm:px-5">
      <Launcher />

      <div className="trust-strip mt-4">
        Runs in your browser when possible. Quiet by default. No signup.
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <article className="panel panel-subtle fade-up p-5">
          <p className="eyebrow">workflow</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-sm text-[var(--fg-soft)]">Find</p>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">Search by task, not by marketing category.</p>
            </div>
            <div>
              <p className="text-sm text-[var(--fg-soft)]">Run</p>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">Open the tool and act immediately.</p>
            </div>
            <div>
              <p className="text-sm text-[var(--fg-soft)]">Leave</p>
              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">Download the result and move on.</p>
            </div>
          </div>
        </article>

        <article className="panel panel-subtle fade-up p-5">
          <p className="eyebrow">notes</p>
          <div className="mt-3 space-y-2 text-xs leading-5 text-[var(--muted)]">
            <p><span className="text-[var(--fg-soft)]">Privacy:</span> most supported tasks stay local.</p>
            <p><span className="text-[var(--fg-soft)]">Works fast:</span> the interface stays compact and direct.</p>
            <p><span className="text-[var(--fg-soft)]">Best used:</span> when you need one utility, right now.</p>
          </div>
        </article>
      </section>
    </main>
  );
};

const ToolsPage = () => {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 pb-10 pt-6 sm:px-5">
      <div className="mx-auto max-w-[920px]">
        <p className="eyebrow">tool library</p>
        <h1 className="mt-2 text-[22px] font-semibold text-[var(--fg)]">Choose a tool and start.</h1>
      </div>
      <Launcher compact />
    </main>
  );
};

const AboutPage = () => (
  <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
    <section className="panel panel-subtle p-6">
      <p className="eyebrow">about</p>
      <h1 className="mt-2 text-[22px] font-semibold text-[var(--fg)]">Built to feel calm, direct, and useful.</h1>
      <p className="mt-3 max-w-[680px] text-sm leading-6 text-[var(--muted)]">
        YuTools is a compact collection of browser utilities for files, images, and quick technical tasks. The goal is
        to remove friction, not add brand noise.
      </p>
    </section>
  </main>
);

const PrivacyPage = () => (
  <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
    <section className="panel panel-subtle p-6">
      <p className="eyebrow">privacy</p>
      <h1 className="mt-2 text-[22px] font-semibold text-[var(--fg)]">Local-first whenever the tool allows it.</h1>
      <p className="mt-3 max-w-[680px] text-sm leading-6 text-[var(--muted)]">
        For supported tools, files are processed in your browser and never uploaded. YuTools aims for minimal handling,
        minimal retention, and minimal friction.
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
              <main className="mx-auto w-full max-w-[920px] px-4 pb-10 pt-6 sm:px-5">
                <div className="panel panel-subtle p-6 text-center">
                  <h1 className="text-lg font-semibold text-[var(--fg)]">Page not found</h1>
                  <Link to="/tools" className="mt-3 inline-flex text-sm text-[var(--fg-soft)] hover:text-[var(--fg)]">
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
