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
        'relative rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface-2)] p-6 text-center transition-colors',
        'hover:border-[var(--accent)]/60',
        isDragActive && 'border-[var(--accent)] bg-[var(--surface-3)]'
      )}
    >
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => e.target.files && onFilesSelected(Array.from(e.target.files))}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]">
        <Upload className="h-4 w-4" />
      </div>
      <p className="mt-3 text-sm font-medium text-[var(--fg)]">Drop files here or click to upload</p>
      <p className="mt-1 text-xs text-[var(--muted)]">{multiple ? 'Multiple files supported' : 'Single file mode'}</p>
    </div>
  );
};

export const FileList: React.FC<{ files: File[]; onRemove: (index: number) => void }> = ({ files, onRemove }) => {
  if (!files.length) return null;

  return (
    <ul className="mt-4 space-y-2">
      {files.map((file, index) => (
        <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
          <div className="min-w-0 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--surface-3)] text-[var(--muted)]">
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
