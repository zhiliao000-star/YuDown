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
import { AddPageNumbersToPDF } from './pages/tools/AddPageNumbersToPDF';
import { Base64Tool } from './pages/tools/Base64Tool';
import { BlurRedactImage } from './pages/tools/BlurRedactImage';
import { CompressPDF } from './pages/tools/CompressPDF';
import { CompressImage } from './pages/tools/CompressImage';
import { CropImage } from './pages/tools/CropImage';
import { HEICToJPG } from './pages/tools/HEICToJPG';
import { ImageConverter } from './pages/tools/ImageConverter';
import { JSONFormatter } from './pages/tools/JSONFormatter';
import { JPGToPDF } from './pages/tools/JPGToPDF';
import { MergePDF } from './pages/tools/MergePDF';
import { OCRPDF } from './pages/tools/OCRPDF';
import { PDFProtectUnlock } from './pages/tools/PDFProtectUnlock';
import { PDFToJPG } from './pages/tools/PDFToJPG';
import { PNGToSVG } from './pages/tools/PNGToSVG';
import { QRCodeScanner } from './pages/tools/QRCodeScanner';
import { QRCodeGenerator } from './pages/tools/QRCodeGenerator';
import { ReorderPDFPages } from './pages/tools/ReorderPDFPages';
import { ResizeImage } from './pages/tools/ResizeImage';
import { RotatePDF } from './pages/tools/RotatePDF';
import { ScreenshotToText } from './pages/tools/ScreenshotToText';
import { SplitPDF } from './pages/tools/SplitPDF';
import { SVGToPNG } from './pages/tools/SVGToPNG';
import { TimestampConverter } from './pages/tools/TimestampConverter';
import { URLEncodeDecode } from './pages/tools/URLEncodeDecode';
import { UUIDGenerator } from './pages/tools/UUIDGenerator';
import { WatermarkImage } from './pages/tools/WatermarkImage';
import { WordCounter } from './pages/tools/WordCounter';
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
    name: 'Split PDF',
    path: '/tools/split-pdf',
    description: 'Extract selected pages into a new PDF.',
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
    available: true,
  },
  {
    name: 'Compress PDF',
    path: '/tools/compress-pdf',
    description: 'Optimize and resave a PDF file.',
    category: 'PDF',
    icon: FileArchive,
    available: true,
  },
  {
    name: 'PDF to JPG',
    path: '/tools/pdf-to-jpg',
    description: 'Render a PDF page as a JPG image.',
    category: 'PDF',
    icon: FileArchive,
    available: true,
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
    name: 'HEIC to JPG',
    path: '/tools/heic-to-jpg',
    description: 'Convert HEIC photos into JPG.',
    category: 'Image',
    icon: ImageIcon,
    available: true,
  },
  {
    name: 'Resize Image',
    path: '/tools/resize-image',
    description: 'Change image dimensions with precision.',
    category: 'Image',
    icon: ImageIcon,
    available: true,
  },
  {
    name: 'Crop Image',
    path: '/tools/crop-image',
    description: 'Crop an image using pixel coordinates.',
    category: 'Image',
    icon: ImageIcon,
    available: true,
  },
  {
    name: 'Watermark Image',
    path: '/tools/watermark-image',
    description: 'Add a text watermark to an image.',
    category: 'Image',
    icon: ImageIcon,
    available: true,
  },
  {
    name: 'Blur / Redact Image',
    path: '/tools/blur-redact-image',
    description: 'Hide sensitive areas with blur or black boxes.',
    category: 'Image',
    icon: ImageIcon,
    available: true,
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
    name: 'QR Code Scanner',
    path: '/tools/qr-code-scanner',
    description: 'Read QR code data from an image.',
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
    available: true,
  },
  {
    name: 'URL Encode / Decode',
    path: '/tools/url-encode-decode',
    description: 'Encode and decode URL strings.',
    category: 'Utility',
    icon: FileCode2,
    available: true,
  },
  {
    name: 'Word Counter',
    path: '/tools/word-counter',
    description: 'Count words, characters, and paragraphs.',
    category: 'Utility',
    icon: FileCode2,
    available: true,
  },
  {
    name: 'UUID Generator',
    path: '/tools/uuid-generator',
    description: 'Generate UUID v4 values.',
    category: 'Utility',
    icon: Binary,
    available: true,
  },
  {
    name: 'Timestamp Converter',
    path: '/tools/timestamp-converter',
    description: 'Convert Unix timestamps and dates.',
    category: 'Utility',
    icon: Binary,
    available: true,
  },
  {
    name: 'Image Converter',
    path: '/tools/image-converter',
    description: 'Convert between JPG, PNG, and WebP.',
    category: 'Image',
    icon: WandSparkles,
    available: true,
  },
  {
    name: 'SVG to PNG',
    path: '/tools/svg-to-png',
    description: 'Render pasted SVG markup as PNG.',
    category: 'Image',
    icon: WandSparkles,
    available: true,
  },
  {
    name: 'PNG to SVG',
    path: '/tools/png-to-svg',
    description: 'Trace a PNG image into SVG paths.',
    category: 'Image',
    icon: WandSparkles,
    available: true,
  },
  {
    name: 'Base64',
    path: '/tools/base64',
    description: 'Encode or decode Base64 text.',
    category: 'Utility',
    icon: Binary,
    available: true,
  },
  {
    name: 'Rotate PDF',
    path: '/tools/rotate-pdf',
    description: 'Rotate all PDF pages by a fixed angle.',
    category: 'PDF',
    icon: FileArchive,
    available: true,
  },
  {
    name: 'Reorder PDF Pages',
    path: '/tools/reorder-pdf-pages',
    description: 'Rebuild a PDF in a custom page order.',
    category: 'PDF',
    icon: FileArchive,
    available: true,
  },
  {
    name: 'Add Page Numbers to PDF',
    path: '/tools/add-page-numbers-to-pdf',
    description: 'Stamp page numbers into a PDF.',
    category: 'PDF',
    icon: FileArchive,
    available: true,
  },
  {
    name: 'PDF Protect / Unlock',
    path: '/tools/pdf-protect-unlock',
    description: 'Security workflow status and next step.',
    category: 'PDF',
    icon: FileArchive,
    available: true,
  },
  {
    name: 'OCR PDF',
    path: '/tools/ocr-pdf',
    description: 'Extract text from the first PDF page.',
    category: 'PDF',
    icon: FileArchive,
    available: true,
  },
  {
    name: 'Screenshot to Text',
    path: '/tools/screenshot-to-text',
    description: 'Run OCR on a screenshot image.',
    category: 'Utility',
    icon: FileCode2,
    available: true,
  },
];

const QUICK_LAUNCH = ['JPG to PDF', 'Merge PDF', 'Compress Image', 'PDF to JPG', 'QR Code', 'JSON Formatter'];

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
          <Route path="/tools/split-pdf" element={<SplitPDF />} />
          <Route path="/tools/merge-pdf" element={<MergePDF />} />
          <Route path="/tools/compress-pdf" element={<CompressPDF />} />
          <Route path="/tools/pdf-to-jpg" element={<PDFToJPG />} />
          <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
          <Route path="/tools/qr-code-scanner" element={<QRCodeScanner />} />
          <Route path="/tools/resize-image" element={<ResizeImage />} />
          <Route path="/tools/heic-to-jpg" element={<HEICToJPG />} />
          <Route path="/tools/crop-image" element={<CropImage />} />
          <Route path="/tools/watermark-image" element={<WatermarkImage />} />
          <Route path="/tools/blur-redact-image" element={<BlurRedactImage />} />
          <Route path="/tools/json-formatter" element={<JSONFormatter />} />
          <Route path="/tools/url-encode-decode" element={<URLEncodeDecode />} />
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/uuid-generator" element={<UUIDGenerator />} />
          <Route path="/tools/timestamp-converter" element={<TimestampConverter />} />
          <Route path="/tools/screenshot-to-text" element={<ScreenshotToText />} />
          <Route path="/tools/image-converter" element={<ImageConverter />} />
          <Route path="/tools/svg-to-png" element={<SVGToPNG />} />
          <Route path="/tools/png-to-svg" element={<PNGToSVG />} />
          <Route path="/tools/base64" element={<Base64Tool />} />
          <Route path="/tools/rotate-pdf" element={<RotatePDF />} />
          <Route path="/tools/reorder-pdf-pages" element={<ReorderPDFPages />} />
          <Route path="/tools/add-page-numbers-to-pdf" element={<AddPageNumbersToPDF />} />
          <Route path="/tools/pdf-protect-unlock" element={<PDFProtectUnlock />} />
          <Route path="/tools/ocr-pdf" element={<OCRPDF />} />
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
