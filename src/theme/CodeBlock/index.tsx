import React, { useState } from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import type {WrapperProps} from '@docusaurus/types';
import { Button } from '@site/src/components/ui/button';
import { Card } from '@site/src/components/ui/card';
import { IconWand, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useColorMode } from '@docusaurus/theme-common';

type Props = WrapperProps<typeof CodeBlockType>;

export default function CodeBlockWrapper(props: Props): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [alteredCode, setAlteredCode] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('Please suggest improvements or alternatives for this code');
  const { colorMode } = useColorMode();

  const buttonStyle = {
    backgroundColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    border: colorMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    color: colorMode === 'dark' ? '#FFFFFF' : '#000000',
  };

  const popupStyle = {
    backgroundColor: colorMode === 'dark' ? '#1a1a1a' : '#FFFFFF',
    border: colorMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.30), 0px 12px 24px 0px rgba(0, 0, 0, 0.20)',
  };

  const textareaStyle = {
    backgroundColor: colorMode === 'dark' ? '#0A0A0A' : '#FFFFFF',
    border: colorMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    color: colorMode === 'dark' ? '#FFFFFF' : '#000000',
  };

  const alterCode = async () => {
    const token = localStorage.getItem("github_token");
    if (!token) {
      alert("Please sign in to use the code alteration feature");
      return;
    }

    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("X-GitHub-Token", token);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        messages: [
          {
            role: "user",
            content: `${customPrompt}: ${props.children}`,
          },
        ],
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect,
      };

      const data = await fetch("http://localhost:3000/copilot/chat/completions", requestOptions);
      const aiData = await data.json();
      setAlteredCode(aiData.choices[0].message.content);
    } catch (error) {
      console.error("Code alteration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="pb-16">
        <CodeBlock {...props} />
      </div>
      <div className="absolute bottom-4 right-4 z-10">
        <div className="relative flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={alterCode}
              disabled={loading}
              type="button"
              style={buttonStyle}
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity h-10 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
              <IconWand className="w-4 h-4" />
              <span>{loading ? "Analyzing Code..." : "Suggest Improvements"}</span>
            </button>
            <button
              onClick={() => setShowPrompt(!showPrompt)}
              type="button"
              style={buttonStyle}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:opacity-80 transition-opacity h-10 w-10 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
              {showPrompt ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="w-4 h-4" />}
            </button>
          </div>
          {showPrompt && (
            <div className="absolute right-0 bottom-full mb-2 w-[300px] z-50">
              <div style={popupStyle} className="flex flex-col gap-2 p-4 rounded-lg">
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Enter your custom prompt..."
                  style={textareaStyle}
                  className="w-full p-2 text-sm rounded-md resize-y min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500">
                  Enter your custom prompt above. The code will be appended to the end of your prompt.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {alteredCode && (
        <div style={popupStyle} className="mt-4 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Suggested Improvements</h3>
          <pre className="whitespace-pre-wrap">{alteredCode}</pre>
        </div>
      )}
    </div>
  );
}
