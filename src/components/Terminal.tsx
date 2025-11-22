/**
 * Terminal - Unified interactive terminal component
 *
 * A single terminal component used for both hero terminal and decision terminal.
 * All logic is shared via useTerminalCore hook. Differences are configured via props.
 */

import React, { useEffect, useRef, ReactNode } from 'react';
import { TerminalWindow, ContextAwareInput, ContextAwareClickArea } from './TerminalWindow';
import { TerminalOutput } from './TerminalOutput';
import { useTerminalCore, type TerminalLine } from '../hooks/useTerminalCore';
import { HOME_DIR } from '../commands';

export interface TerminalProps {
  /** Window title */
  title?: string;
  /** Content height in normal mode */
  height?: string;
  /** Initial lines to display */
  initialLines?: TerminalLine[];
  /** Enable path completion for cd/cat/ls */
  enablePathCompletion?: boolean;
  /** Enable advanced keyboard shortcuts (Ctrl+U/K/A/E/W) */
  enableAdvancedShortcuts?: boolean;

  // Callbacks
  onApply?: () => void;
  onExit?: () => void;
  onThemeChange?: (theme: 'default' | 'matrix' | 'cyberpunk' | 'light', crtMode: boolean) => void;
  onMinimizedChange?: (isMinimized: boolean) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  onShowExitConfirm?: () => void;

  // Quiz support (optional)
  quiz?: {
    start: () => void;
    submitAnswer: (answer: 'a' | 'b') => void;
    resetQuiz: () => void;
    currentQuestion: { q: string; a: string; b: string; correct: 'a' | 'b'; feedback_pass: string; feedback_fail: string } | null;
    state: { currentQuestionIndex: number; score: number; isComplete: boolean };
  };
  renderQuizResults?: (score: number) => ReactNode;

  // Custom apply handler (e.g., for progress bar animation)
  customApplyHandler?: (addLine: (content: string | ReactNode, type: TerminalLine['type']) => void, lineId: () => string) => boolean;

  // Window customization
  minimizedContent?: ReactNode;
  exitDialogTitle?: string;
  exitDialogDescription?: ReactNode;
  headerRightContent?: ReactNode;

  // Whether terminal input is disabled
  disabled?: boolean;

  // Prompt customization
  promptPrefix?: string;

  // Show directory in prompt
  showDirectoryInPrompt?: boolean;
}

export function Terminal({
  title = 'terminal',
  height = '400px',
  initialLines = [],
  enablePathCompletion = false,
  enableAdvancedShortcuts = false,
  onApply,
  onExit,
  onThemeChange,
  onMinimizedChange,
  onFullscreenChange,
  onShowExitConfirm,
  quiz,
  renderQuizResults,
  customApplyHandler,
  minimizedContent,
  exitDialogTitle = 'Close this terminal?',
  exitDialogDescription,
  headerRightContent,
  disabled = false,
  promptPrefix = 'switchup',
  showDirectoryInPrompt = false,
}: TerminalProps) {
  // Track window state internally
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  // Use the unified terminal core hook
  const terminal = useTerminalCore({
    initialLines,
    enablePathCompletion,
    enableAdvancedShortcuts,
    onApply,
    onExit,
    onThemeChange,
    quiz,
    renderQuizResults,
    customApplyHandler,
    disabled,
    isMinimized,
    isFullscreen,
    focusDelay: 350,
  });

  // Handle minimize state change
  const handleMinimizedChange = (minimized: boolean) => {
    setIsMinimized(minimized);
    onMinimizedChange?.(minimized);
  };

  // Handle fullscreen state change
  const handleFullscreenChange = (fullscreen: boolean) => {
    setIsFullscreen(fullscreen);
    onFullscreenChange?.(fullscreen);
  };

  // Handle close button - show exit confirm or trigger onExit
  const handleClose = () => {
    if (onShowExitConfirm) {
      onShowExitConfirm();
    } else if (onExit) {
      onExit();
    }
  };

  // Build prompt string
  const getPrompt = () => {
    if (showDirectoryInPrompt && terminal.currentDirectory !== HOME_DIR) {
      const relativePath = terminal.currentDirectory.replace(HOME_DIR, '').replace(/^\//, '');
      return `${promptPrefix}/${relativePath}`;
    }
    return promptPrefix;
  };

  // Terminal content - shared between normal and fullscreen modes
  const renderContent = (isFullscreenMode: boolean) => (
    <ContextAwareClickArea
      getClickHandler={terminal.getClickToFocusHandler}
      disabled={disabled}
      className={`p-6 flex flex-col cursor-text ${isFullscreenMode ? 'flex-1 min-h-0' : ''}`}
      style={!isFullscreenMode && height !== 'auto' ? { height } : undefined}
    >
      {/* Output area - using shared TerminalOutput component */}
      <TerminalOutput
        lines={terminal.lines}
        scrollRef={terminal.scrollRef}
        animated
      />

      {/* Input area */}
      <form onSubmit={terminal.handleSubmit} className="mt-2 flex items-center gap-2 border-t border-default pt-2">
        <span className="text-blue-500">{getPrompt()}</span>
        <span className="text-green-500"> {'>'}</span>
        <ContextAwareInput
          getInputRef={terminal.getInputRef}
          type="text"
          value={terminal.input}
          onChange={(e) => terminal.setInput(e.target.value)}
          onKeyDown={(e) => terminal.handleKeyDown(e, isFullscreenMode)}
          disabled={disabled}
          className="terminal-input w-full"
          placeholder="Type a command or 'help'..."
          aria-label="Terminal command input"
        />
      </form>
    </ContextAwareClickArea>
  );

  return (
    <TerminalWindow
      title={title}
      height={height}
      fullscreenHeight={fullscreenHeight}
      minimizedContent={minimizedContent}
      onClose={handleClose}
      onMinimizedChange={handleMinimizedChange}
      onFullscreenChange={handleFullscreenChange}
      exitDialogTitle={exitDialogTitle}
      exitDialogDescription={exitDialogDescription}
      headerRightContent={headerRightContent}
    >
      {renderContent(false)}
    </TerminalWindow>
  );
}

// Helper functions for line styling
function getLineClassName(type: TerminalLine['type']): string {
  switch (type) {
    case 'input':
    case 'command':
      return 'text-primary';
    case 'error':
      return 'text-red-400';
    case 'system':
      return 'text-blue-400 italic';
    case 'success':
      return 'text-green-500';
    case 'progress':
      return 'text-green-500';
    default:
      return 'text-secondary';
  }
}

function getLinePrefix(type: TerminalLine['type']): ReactNode {
  switch (type) {
    case 'input':
      return <span className="text-green-500 mr-2">➜</span>;
    case 'command':
      return null; // Commands from DecisionTerminal use "> " prefix in content
    case 'error':
      return <span className="text-red-500 mr-2">✗</span>;
    case 'system':
      return <span className="text-blue-500 mr-2">ℹ</span>;
    default:
      return null;
  }
}

export default Terminal;
