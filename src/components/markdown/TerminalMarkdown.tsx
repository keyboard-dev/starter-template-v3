import React from 'react';
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";
import * as jsxRuntime from 'react/jsx-runtime';
import type { Options } from 'rehype-react';
import type { Root } from 'hast';

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
  language?: string;
}

interface CalloutProps {
  type?: 'info' | 'warning' | 'error';
  children: React.ReactNode;
}

interface TableProps {
  children: React.ReactNode;
}

interface BasicComponentProps {
  children: React.ReactNode;
}

interface LinkProps extends BasicComponentProps {
  href?: string;
}

interface ImageProps {
  src?: string;
  alt?: string;
}

// Custom Components
const CustomCodeBlock: React.FC<CodeBlockProps> = ({ className, children, language }) => {
  return (
    <div className="my-4 rounded-md overflow-hidden">
      <div className="bg-[#2d2d2d] px-4 py-2 text-xs text-green-400 border-b border-[#424242]">
        {language || 'plaintext'}
      </div>
      <pre className="bg-[#1e1e1e] p-4 overflow-x-auto">
        <code className={`language-${language} font-mono text-sm`}>
          {children}
        </code>
      </pre>
    </div>
  );
};

const CustomCallout: React.FC<CalloutProps> = ({ type = 'info', children }) => {
  const styles = {
    info: 'bg-blue-900/20 border-blue-500',
    warning: 'bg-yellow-900/20 border-yellow-500',
    error: 'bg-red-900/20 border-red-500',
  };

  return (
    <div className={`my-4 p-4 border-l-4 ${styles[type]}`}>
      {children}
    </div>
  );
};

const CustomTable: React.FC<TableProps> = ({ children }) => (
  <div className="my-4 overflow-x-auto">
    <table className="min-w-full border border-[#424242]">
      {children}
    </table>
  </div>
);

// Terminal-styled basic elements
const components: Partial<Options['components']> = {
  pre: CustomCodeBlock as any,
  'custom-callout': CustomCallout as any,
  table: CustomTable as any,
  h1: ({ children }: BasicComponentProps) => (
    <h1 className="text-xl font-bold my-4 text-white">{children}</h1>
  ),
  h2: ({ children }: BasicComponentProps) => (
    <h2 className="text-lg font-bold my-3 text-white">{children}</h2>
  ),
  ul: ({ children }: BasicComponentProps) => (
    <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
  ),
  li: ({ children }: BasicComponentProps) => (
    <li className="text-gray-300">{children}</li>
  ),
  a: ({ href, children }: LinkProps) => (
    <a 
      href={href}
      className="text-blue-400 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }: ImageProps) => (
    <div className="my-4">
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full rounded-md border border-[#424242]" 
      />
      {alt && (
        <p className="text-sm text-gray-400 mt-1 text-center">{alt}</p>
      )}
    </div>
  ),
  blockquote: ({ children }: BasicComponentProps) => (
    <blockquote className="border-l-4 border-[#424242] pl-4 my-4 text-gray-400 italic">
      {children}
    </blockquote>
  ),
};

// Create a properly typed options object for rehype-react
const rehypeReactOptions: Options = {
  createElement: React.createElement,
  Fragment: React.Fragment,
  jsx: jsxRuntime.jsx,
  jsxs: jsxRuntime.jsxs,
  components: components,
};

// Create and export the processor with proper typing
export const terminalProcessor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, rehypeReactOptions);

// Convenience wrapper component
interface TerminalMarkdownProps {
  content: string;
  className?: string;
}

export const TerminalMarkdown: React.FC<TerminalMarkdownProps> = ({ content, className = '' }) => {
  return (
    <div className={`terminal-markdown ${className}`}>
      {terminalProcessor.processSync(content).result}
    </div>
  );
};

// Export the styles


