import React, {useCallback, useState, useRef, useEffect} from 'react';
import clsx from 'clsx';
import copy from 'copy-text-to-clipboard';
import {translate} from '@docusaurus/Translate';
import type {Props} from '@theme/CodeBlock/CopyButton';
import IconCopy from '@theme/Icon/Copy';
import IconSuccess from '@theme/Icon/Success';
import { Button } from '@site/src/components/ui/button';
import { Input } from '@site/src/components/ui/input';
import { IconWand } from '@tabler/icons-react';
import { cn } from '@site/src/utils';
import { useColorMode } from '@docusaurus/theme-common';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@site/src/components/ui/dialog';

import styles from './styles.module.css';

const StyledInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <Input {...props} ref={ref} />
));

StyledInput.displayName = 'StyledInput';



export default function CopyButton({code, className}: Props): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [rewrittenCode, setRewrittenCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const copyTimeout = useRef<number | undefined>(undefined);

  const { colorMode } = useColorMode();
  const contentStyle = {
    backgroundColor: colorMode === 'dark' ? '#0A0A0A' : 'white',
    border: colorMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.30), 0px 12px 24px 0px rgba(0, 0, 0, 0.20)',
    maxHeight: '425px', 
    overflowY: 'scroll'
  };

  const handleCopyCode = useCallback(() => {
    copy(code);
    setIsCopied(true);
    copyTimeout.current = window.setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [code]);

  const handleRewriteCode = async () => {
    const token = localStorage.getItem("github_token");
    if (!token) {
      alert("Please sign in to use the code rewrite feature");
      return;
    }

    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("X-GitHub-Token", token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        messages: [
          {
            role: "user",
            content: `${prompt} Here is the code to rewrite: ${code}`,
          },
        ],
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect,
      };

      let data = await fetch("http://localhost:3000/copilot/chat/completions", requestOptions);
      let aiData = await data.json();
      setRewrittenCode(aiData.choices[0].message.content);
      setIsLoading(false);
    } catch (error) {
      console.error("Code rewrite error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);

  return (
    <div className="flex gap-2">
      <button
        type="button"
        aria-label={
          isCopied
            ? translate({
                id: 'theme.CodeBlock.copied',
                message: 'Copied',
                description: 'The copied button label on code blocks',
              })
            : translate({
                id: 'theme.CodeBlock.copyButtonAriaLabel',
                message: 'Copy code to clipboard',
                description: 'The ARIA label for copy code blocks button',
              })
        }
        title={translate({
          id: 'theme.CodeBlock.copy',
          message: 'Copy',
          description: 'The copy button label on code blocks',
        })}
        className={clsx(
          'clean-btn',
          className,
          styles.copyButton,
          isCopied && styles.copyButtonCopied,
        )}
        onClick={handleCopyCode}>
        <span className={styles.copyButtonIcons} aria-hidden="true">
          <IconCopy className={styles.copyButtonIcon} />
          <IconSuccess className={styles.copyButtonSuccessIcon} />
        </span>
      </button>

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Rewrite code with AI"
            title="Rewrite code with AI"
            className={clsx(
              'clean-btn',
              className,
              styles.copyButton,
            )}>
            <span className={styles.copyButtonIcons} aria-hidden="true">
              <IconWand className={styles.copyButtonIcon} />
            </span>
          </button>
        </DialogTrigger>
        <DialogContent style={contentStyle} className="sm:max-w-[425px]">
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg">
              Rewrite Code with AI
            </DialogTitle>
            <DialogDescription className="text-sm">
              Enter your instructions for how you want the code to be rewritten
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <StyledInput
              type="text"
              placeholder="e.g. Make this code more efficient"
              value={prompt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
            />

            {rewrittenCode && (
              <div className="mt-2">
                <h4 className="mb-2 font-medium">Rewritten Code:</h4>
                <button
        type="button"
        aria-label={
          isCopied
            ? translate({
                id: 'theme.CodeBlock.copied',
                message: 'Copied',
                description: 'The copied button label on code blocks',
              })
            : translate({
                id: 'theme.CodeBlock.copyButtonAriaLabel',
                message: 'Copy code to clipboard',
                description: 'The ARIA label for copy code blocks button',
              })
        }
        title={translate({
          id: 'theme.CodeBlock.copy',
          message: 'Copy',
          description: 'The copy button label on code blocks',
        })}
        className={clsx(
          'clean-btn',
          className,
          styles.copyButton,
          isCopied && styles.copyButtonCopied,
        )}
        onClick={handleCopyCode}>
        <span className={styles.copyButtonIcons} aria-hidden="true">
          <IconCopy className={styles.copyButtonIcon} />
          <IconSuccess className={styles.copyButtonSuccessIcon} />
        </span>
      </button>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto max-w-full whitespace-pre-wrap break-words">
                  <code className="text-sm">{rewrittenCode}</code>
                </pre>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Close"]')?.click()}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={handleRewriteCode}
              disabled={isLoading || !prompt}
            >
              {isLoading ? 'Rewriting...' : 'Rewrite Code'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
