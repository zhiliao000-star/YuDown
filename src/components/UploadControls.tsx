import React, { useCallback, useState } from 'react';
import { File as FileIcon, Upload, X } from 'lucide-react';
import { cn, formatBytes } from '../lib/utils';

interface FilePickerProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export const FilePicker: React.FC<FilePickerProps> = ({ onFilesSelected, accept, multiple = true }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragActive(true);
    if (e.type === 'dragleave') setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (e.dataTransfer.files?.length) {
        onFilesSelected(Array.from(e.dataTransfer.files));
      }
    },
    [onFilesSelected]
  );

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        'relative rounded-[28px] border border-dashed p-8 text-center transition-all',
        'border-[rgba(201,156,132,0.2)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,247,242,0.88))]',
        'shadow-[0_18px_38px_rgba(188,140,108,0.08)] hover:border-[rgba(207,132,95,0.32)] hover:shadow-[0_22px_44px_rgba(188,140,108,0.12)]',
        isDragActive && 'border-[var(--accent-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(255,244,236,0.96))]'
      )}
    >
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => e.target.files && onFilesSelected(Array.from(e.target.files))}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[20px] border border-[rgba(206,155,128,0.18)] bg-[linear-gradient(180deg,#fffdfb,#fff4ec)] text-[var(--accent-strong)] shadow-[0_10px_22px_rgba(191,141,111,0.12)]">
        <Upload className="h-4 w-4" />
      </div>
      <p className="mt-4 text-[15px] font-semibold text-[var(--fg)]">Drop files here or click to upload</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{multiple ? 'Multiple files supported' : 'Single file mode'}</p>
    </div>
  );
};

export const FileList: React.FC<{ files: File[]; onRemove: (index: number) => void }> = ({ files, onRemove }) => {
  if (!files.length) return null;

  return (
    <ul className="mt-4 space-y-2">
      {files.map((file, index) => (
        <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded-[18px] border border-[var(--border-soft)] bg-white/80 px-3 py-2 shadow-[var(--shadow-soft)]">
          <div className="min-w-0 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-[14px] bg-[var(--surface-soft)] text-[var(--muted)]">
              <FileIcon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-[var(--fg)]">{file.name}</p>
              <p className="text-[11px] text-[var(--muted)]">{formatBytes(file.size)}</p>
            </div>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--muted)] transition hover:bg-[var(--surface-3)] hover:text-[var(--fg)]"
            title="Remove"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </li>
      ))}
    </ul>
  );
};
