import React, { useCallback, useState } from 'react';
import { Upload, X, File as FileIcon } from 'lucide-react';
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
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  }, [onFilesSelected]);

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "relative mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center transition-colors hover:border-blue-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-blue-500/50",
        isDragActive && "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
      )}
    >
      <input
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => e.target.files && onFilesSelected(Array.from(e.target.files))}
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
      />
      <div className="flex shrink-0 items-center justify-center rounded-full bg-blue-100 p-4 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
        <Upload className="h-8 w-8" />
      </div>
      <div className="mt-4">
        <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Click to upload or drag and drop
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {multiple ? 'Select multiple files' : 'Select a file'}
        </p>
      </div>
    </div>
  );
};

export const FileList: React.FC<{ files: File[]; onRemove: (index: number) => void }> = ({ files, onRemove }) => {
  if (files.length === 0) return null;
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {files.map((file, i) => (
        <li key={i} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="shrink-0 rounded-md bg-blue-50 p-2 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
              <FileIcon size={20} />
            </div>
            <div className="truncate">
              <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{file.name}</p>
              <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
            </div>
          </div>
          <button
            onClick={() => onRemove(i)}
            className="flex shrink-0 items-center justify-center rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Remove file"
          >
            <X size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
};
