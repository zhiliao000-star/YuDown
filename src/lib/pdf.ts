export async function loadPdfJs() {
  const pdfjs = await import('pdfjs-dist');
  const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  return pdfjs;
}

export function parsePageList(input: string, pageCount: number) {
  const values = input
    .split(',')
    .flatMap((part) => {
      const trimmed = part.trim();
      if (!trimmed) return [];

      if (trimmed.includes('-')) {
        const [startRaw, endRaw] = trimmed.split('-');
        const start = Number(startRaw);
        const end = Number(endRaw);
        if (!Number.isFinite(start) || !Number.isFinite(end)) return [];
        const rangeStart = Math.max(1, Math.min(start, end));
        const rangeEnd = Math.min(pageCount, Math.max(start, end));
        return Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => rangeStart + index);
      }

      const page = Number(trimmed);
      return Number.isFinite(page) ? [page] : [];
    })
    .filter((page) => page >= 1 && page <= pageCount);

  return Array.from(new Set(values));
}
