import React, { useState } from 'react';
import { Check, Copy, FileCode2 } from 'lucide-react';
import { PrimaryButton, RelatedTools, SecondaryButton, ToolNoteCard, ToolPageShell } from '../../components/ToolLayout';

export const JSONFormatter = () => {
  const [input, setInput] = useState('{\n  "hello": "world"\n}');
  const [output, setOutput] = useState('{\n  "hello": "world"\n}');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (formatError) {
      console.error(formatError);
      setError('Invalid JSON. Please check commas, quotes, and brackets.');
    }
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <ToolPageShell
      eyebrow="utility"
      title="JSON Formatter"
      description="Paste raw JSON, format it, and validate it in one step."
      aside={
        <>
          <ToolNoteCard title="Use it for">
            API payloads, config files, and quick validation before you paste JSON into another tool or service.
          </ToolNoteCard>
          <RelatedTools
            items={[
              { label: 'Base64', to: '/tools/base64' },
              { label: 'URL Encode / Decode', to: '/tools/url-encode-decode' },
              { label: 'UUID Generator', to: '/tools/uuid-generator' },
            ]}
          />
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-[var(--muted)]">
          Input
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={16}
            className="field-textarea mt-2 font-mono text-sm"
          />
        </label>
        <label className="text-sm text-[var(--muted)]">
          Output
          <textarea
            value={output}
            readOnly
            rows={16}
            className="field-textarea mt-2 font-mono text-sm"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <PrimaryButton onClick={formatJson}>
          <FileCode2 className="h-4 w-4" />
          Format JSON
        </PrimaryButton>
        <SecondaryButton onClick={copyOutput}>
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied' : 'Copy output'}
        </SecondaryButton>
      </div>

      {error && <p className="mt-4 text-sm text-[#cf6d54]">{error}</p>}
    </ToolPageShell>
  );
};
