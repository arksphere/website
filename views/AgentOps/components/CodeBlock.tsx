import React from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, filename }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-[#0d1117] border border-dark-border my-4 font-mono text-sm">
      {filename && (
        <div className="bg-dark-border/30 px-4 py-2 text-xs text-slate-400 border-b border-dark-border flex items-center justify-between">
            <span>{filename}</span>
            <span className="text-brand-500">{language}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-slate-300 leading-6">
        <code>{code}</code>
      </pre>
    </div>
  );
};