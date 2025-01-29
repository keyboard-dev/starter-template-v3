import React, { useState } from 'react';
import { TerminalChatBot } from './TerminalChatBot';
import ChatBox from './ChatBox';
import DocChat from './DocChat';

type ChatMode = 'terminal' | 'normal';

export function ChatManager() {
  const [currentMode, setCurrentMode] = useState<ChatMode>('terminal');

  const handleModeChange = (mode: ChatMode) => {
    setCurrentMode(mode);
  };

  return (
    <>
      {/* Only show TerminalChatBot in terminal mode */}
      {currentMode === 'terminal' && (
        <TerminalChatBot onModeChange={handleModeChange} />
      )}

      {/* Only show other chat components in normal mode */}
      {currentMode === 'normal' && (
        <>
          <ChatBox messages={[]} onSendMessage={() => {}} />
          <DocChat />
        </>
      )}
    </>
  );
} 