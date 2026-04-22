import React, { Suspense, lazy, useDeferredValue } from 'react';
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
import { cn } from './lib/utils';

const JPGToPDF = lazy(() => import('./pages/tools/JPGToPDF').then((module) => ({ default: module.JPGToPDF })));
const SplitPDF = lazy(() => import('./pages/tools/SplitPDF').then((module) => ({ default: module.SplitPDF })));
const MergePDF = lazy(() => import('./pages/tools/MergePDF').then((module) => ({ default: module.MergePDF })));
const CompressPDF = lazy(() => import('./pages/tools/CompressPDF').then((module) => ({ default: module.CompressPDF })));
const PDFToJPG = lazy(() => import('./pages/tools/PDFToJPG').then((module) => ({ default: module.PDFToJPG })));
const CompressImage = lazy(() => import('./pages/tools/CompressImage').then((module) => ({ default: module.CompressImage })));
const HEICToJPG = lazy(() => import('./pages/tools/HEICToJPG').then((module) => ({ default: module.HEICToJPG })));
const ResizeImage = lazy(() => import('./pages/tools/ResizeImage').then((module) => ({ default: module.ResizeImage })));
const CropImage = lazy(() => import('./pages/tools/CropImage').then((module) => ({ default: module.CropImage })));
const WatermarkImage = lazy(() => import('./pages/tools/WatermarkImage').then((module) => ({ default: module.WatermarkImage })));
const BlurRedactImage = lazy(() => import('./pages/tools/BlurRedactImage').then((module) => ({ default: module.BlurRedactImage })));
const QRCodeGenerator = lazy(() => import('./pages/tools/QRCodeGenerator').then((module) => ({ default: module.QRCodeGenerator })));
const QRCodeScanner = lazy(() => import('./pages/tools/QRCodeScanner').then((module) => ({ default: module.QRCodeScanner })));
const JSONFormatter = lazy(() => import('./pages/tools/JSONFormatter').then((module) => ({ default: module.JSONFormatter })));
const URLEncodeDecode = lazy(() => import('./pages/tools/URLEncodeDecode').then((module) => ({ default: module.URLEncodeDecode })));
const WordCounter = lazy(() => import('./pages/tools/WordCounter').then((module) => ({ default: module.WordCounter })));
const UUIDGenerator = lazy(() => import('./pages/tools/UUIDGenerator').then((module) => ({ default: module.UUIDGenerator })));
const TimestampConverter = lazy(() => import('./pages/tools/TimestampConverter').then((module) => ({ default: module.TimestampConverter })));
const ScreenshotToText = lazy(() => import('./pages/tools/ScreenshotToText').then((module) => ({ default: module.ScreenshotToText })));
const ImageConverter = lazy(() => import('./pages/tools/ImageConverter').then((module) => ({ default: module.ImageConverter })));
const SVGToPNG = lazy(() => import('./pages/tools/SVGToPNG').then((module) => ({ default: module.SVGToPNG })));
const PNGToSVG = lazy(() => import('./pages/tools/PNGToSVG').then((module) => ({ default: module.PNGToSVG })));
const Base64Tool = lazy(() => import('./pages/tools/Base64Tool').then((module) => ({ default: module.Base64Tool })));
const RotatePDF = lazy(() => import('./pages/tools/RotatePDF').then((module) => ({ default: module.RotatePDF })));
const ReorderPDFPages = lazy(() => import('./pages/tools/ReorderPDFPages').then((module) => ({ default: module.ReorderPDFPages })));
const AddPageNumbersToPDF = lazy(() => import('./pages/tools/AddPageNumbersToPDF').then((module) => ({ default: module.AddPageNumbersToPDF })));
const PDFProtectUnlock = lazy(() => import('./pages/tools/PDFProtectUnlock').then((module) => ({ default: module.PDFProtectUnlock })));
const OCRPDF = lazy(() => import('./pages/tools/OCRPDF').then((module) => ({ default: module.OCRPDF })));

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

const WelcomePageLazy = lazy(() => import('./pages/Welcome').then((module) => ({ default: module.WelcomePage })));

const RouteLoading = () => (
  <main className="mx-auto w-full max-w-[1100px] px-4 pb-10 pt-6 sm:px-5">
    <div className="panel fade-up-soft p-6">
      <div className="h-3 w-24 rounded-full bg-white/70" />
      <div className="mt-4 h-9 w-56 rounded-full bg-white/70" />
      <div className="mt-3 h-4 w-full max-w-[520px] rounded-full bg-white/60" />
      <div className="mt-8 h-[320px] rounded-[28px] border border-[var(--border-soft)] bg-white/55" />
    </div>
  </main>
);

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

const ToolCard = ({ tool, index }: { tool: ToolItem; index: number }) => {
  const isPDF = tool.category === 'PDF';
  const isImage = tool.category === 'Image';
  const isUtility = tool.category === 'Utility';

  const categoryColorClass = isPDF 
    ? 'text-[#e5322d] group-hover:bg-[#e5322d]' 
    : isImage 
      ? 'text-[#008de1] group-hover:bg-[#008de1]' 
      : 'text-[#4caf50] group-hover:bg-[#4caf50]';

  return (
    <Link to={tool.path} className={cn(
      "group flex flex-col items-center text-center bg-white rounded-xl p-8 border border-gray-200 transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-bottom-4 shadow-sm",
      "hover:border-transparent hover:shadow-xl",
      categoryColorClass
    )} style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'both' }}>
      
      <div className="mb-4">
         <tool.icon className={cn(
            "h-12 w-12 transition-colors duration-200", 
            "group-hover:text-white"
          )} strokeWidth={1.5} />
      </div>

      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-200 leading-tight">
        {tool.name}
      </h3>
      
      <p className="mt-3 text-[15px] font-medium text-gray-500 group-hover:text-white/90 transition-colors duration-200 leading-relaxed">
        {tool.description}
      </p>
    </Link>
  );
};

const Launcher = ({ compact = false }: { compact?: boolean }) => {
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<ToolCategory>('All');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const deferredQuery = useDeferredValue(query);

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

  const tools = filterTools(deferredQuery, category);

  return (
    <section className={cn('mx-auto w-full max-w-[1400px]', compact ? 'mt-4' : 'mt-16')}>
      <div className={cn('relative max-w-4xl mx-auto', !compact && 'text-center')}>
        {!compact && (
          <div className="mb-14">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-[56px] leading-[1.1]">
              Every tool you need to work with files in one place
            </h1>
            <p className="mt-8 text-[22px] text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
              Every tool you need to use PDFs, images, and dev tools, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, and more.
            </p>
          </div>
        )}

        <div className={cn('relative max-w-3xl mx-auto', compact ? 'mt-0' : 'mt-8')}>
           <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for tools..."
            className="h-[72px] w-full rounded-full border border-gray-200 bg-white pl-8 pr-6 text-xl font-medium text-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] outline-none transition-all placeholder:text-gray-400 focus:border-[#e5322d] focus:ring-4 focus:ring-[#e5322d]/10"
          />
          <Search className="pointer-events-none absolute right-8 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="mt-16 sm:mt-24 px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {tools.map((tool, index) => (
            <ToolCard key={tool.path} tool={tool} index={index} />
          ))}
        </div>

        {tools.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center text-xl font-medium text-gray-500">
            No tools matched your search for "{query}".
          </div>
        )}
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <WelcomePageLazy />
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
        <Suspense fallback={<RouteLoading />}>
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
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default App;
