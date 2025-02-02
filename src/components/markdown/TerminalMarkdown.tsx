import React, { useState, useRef, useCallback, useEffect } from 'react';
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import rehype2react from "rehype-react";
import * as jsxRuntime from 'react/jsx-runtime';
import type { Options } from 'rehype-react';
import type { Root } from 'hast';
import { useColorMode } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import IconCopy from '@theme/Icon/Copy';
import IconSuccess from '@theme/Icon/Success';
import clsx from 'clsx';
import { Highlight, themes } from 'prism-react-renderer';
import { usePrismTheme } from '@docusaurus/theme-common';

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
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | undefined>(undefined);
  const prismTheme = usePrismTheme();

  // Extract code content from children
  const getCodeContent = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map(child => getCodeContent(child)).join('');
    }
    if (React.isValidElement(children)) {
      if (children.props.children) {
        return getCodeContent(children.props.children);
      }
      if (typeof children.props.value === 'string') {
        return children.props.value;
      }
    }
    return '';
  };

  const code = getCodeContent(children);

  const handleCopyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      copyTimeout.current = window.setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy code to clipboard:', err);
    }
  }, [code]);

  useEffect(() => {
    return () => {
      if (copyTimeout.current) {
        clearTimeout(copyTimeout.current);
      }
    };
  }, []);

  // If no code content, return empty pre
  if (!code.trim()) {
    return <pre className="my-4 rounded-md overflow-hidden" />;
  }

  // Get language from className if provided (e.g. language-javascript)
  const languageFromClass = className?.match(/language-(\w+)/)?.[1];
  const codeLanguage = language || languageFromClass || 'text';

  return (
    <div className="my-4 rounded-md overflow-hidden relative group">
      <div className="bg-[#2d2d2d] dark:bg-[#1e1e1e] px-4 py-2 text-xs text-green-400 border-b border-[#424242] flex justify-between items-center">
        <span>{codeLanguage}</span>
        <button
          type="button"
          aria-label={translate({
            id: 'theme.CodeBlock.copyButtonAriaLabel',
            message: 'Copy code to clipboard',
            description: 'The ARIA label for copy code blocks button',
          })}
          className={clsx(
            'w-8 h-8 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity',
            'bg-[#2d2d2d] dark:bg-[#1e1e1e] hover:bg-[#3d3d3d] dark:hover:bg-[#2e2e2e]',
            'border border-[#424242] text-gray-400 hover:text-white'
          )}
          onClick={handleCopyCode}>
          {isCopied ? (
            <IconSuccess className="h-4 w-4" />
          ) : (
            <IconCopy className="h-4 w-4" />
          )}
        </button>
      </div>
      <Highlight
        theme={prismTheme}
        code={code.trim()}
        language={codeLanguage}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={clsx('m-0 p-4 overflow-x-auto', className)} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
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


