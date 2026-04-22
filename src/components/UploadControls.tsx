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
        'relative flex flex-col items-center justify-center p-12 transition-all w-full'
      )}
    >
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => e.target.files && onFilesSelected(Array.from(e.target.files))}
        className="absolute inset-0 cursor-pointer opacity-0 z-20"
      />
      
      <div className="relative flex items-center justify-center">
        <div className={cn(
          "flex items-center justify-center rounded-xl bg-[#e5322d] text-white px-10 py-5 text-[28px] font-semibold tracking-wide transition-transform hover:scale-105 shadow-[0_8px_20px_rgba(229,50,45,0.4)] hover:shadow-[0_12px_28px_rgba(229,50,45,0.5)] z-10 w-full sm:w-auto min-w-[280px]",
          isDragActive && "scale-105"
        )}>
          Select files
        </div>
      </div>
      
      <p className="mt-4 text-[14px] text-gray-500 font-medium">or drop files here</p>
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
