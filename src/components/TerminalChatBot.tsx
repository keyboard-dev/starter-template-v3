import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Rnd } from 'react-rnd';
import TerminalLogo from '../../static/svgs/terminallogo.svg';
import TerminalExpand from '../../static/svgs/terminalexpand.svg';
import TerminalClose from '../../static/svgs/terminalclose.svg';

// Debounce helper
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

interface Message {
  content: string;
  type: 'user' | 'bot';
}

interface TerminalChatBotProps {
  initialHeight?: number;
  minHeight?: number;
  maxHeight?: number;
}

export function TerminalChatBot({
  initialHeight = 300,
  minHeight = 200,
  maxHeight = window.innerHeight * 0.8,
}: TerminalChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { content: 'Booting up chat...', type: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [height, setHeight] = useState(initialHeight);
  const [isVisible, setIsVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateHeight = useCallback(
    debounce((newHeight: number) => {
      setHeight(newHeight);
    }, 10),
    []
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { content: input, type: 'user' }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { content: 'Bot response...', type: 'bot' }]);
    }, 1000);
    setInput('');
  };

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  const showTerminal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(true);
  };

  const hideTerminal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <>
      {!isVisible ? (
        <div 
          className="fixed bottom-0 left-0 right-0 bg-[#323233] border-t border-[#424242] cursor-pointer z-[1000]"
          onClick={showTerminal}
        >
          <div className="flex items-center justify-between px-4 py-1">
            <div className="flex items-center">
              <div className="text-sm text-gray-400">DOCS DEV CHAT BOT</div>
            </div>
            <div className="flex space-x-2">
            <TerminalLogo className="w-4 h-4 mr-2" />
              <TerminalExpand onClick={toggleVisibility} className="w-4 h-4 cursor-pointer hover:opacity-80" />
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 z-[1000]" style={{ height: height }}>
          <Rnd
            default={{
              x: 0,
              y: 0,
              width: '100%',
              height: initialHeight,
            }}
            size={{ width: '100%', height: height }}
            position={{ x: 0, y: 0 }}
            minHeight={minHeight}
            maxHeight={maxHeight}
            enableResizing={{ top: true }}
            disableDragging={true}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0
            }}
            onResize={(e, direction, ref) => {
              const newHeight = parseInt(ref.style.height);
              setHeight(newHeight);
            }}
            onResizeStop={(e, direction, ref) => {
              const newHeight = parseInt(ref.style.height);
              setHeight(newHeight);
            }}
          >
            <div className="flex flex-col h-full bg-[#1e1e1e] text-white font-mono">
              {/* Terminal Header */}
              <div 
                className="flex items-center justify-between px-4 py-1 bg-[#323233] border-b border-[#424242]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center">
                  <div className="text-sm text-gray-400">DOCS DEV CHAT BOT</div>
                </div>
                <div className="flex space-x-2">
                    <TerminalLogo className="w-4 h-4 mr-2" />
                  <TerminalClose onClick={hideTerminal} className="w-4 h-4 cursor-pointer hover:opacity-80" />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2" onClick={(e) => e.stopPropagation()}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${
                      message.type === 'user' ? 'text-blue-400' : 'text-green-400'
                    }`}
                  >
                    {message.type === 'user' ? '> ' : ''}
                    {message.content}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-[#424242]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">{'>'}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none border-none text-white"
                    placeholder="Enter your message..."
                    autoFocus
                  />
                </div>
              </form>
            </div>
          </Rnd>
        </div>
      )}
    </>
  );
}
