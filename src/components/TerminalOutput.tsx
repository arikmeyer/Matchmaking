/**
 * TerminalOutput - Unified terminal output display component
 * Handles scroll container, line rendering, and optional animations.
 * Used by both InteractiveTerminal and DecisionTerminal.
 */

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TerminalLine } from '../hooks/useTerminalCore';

export interface TerminalOutputProps {
  /** Lines to display */
  lines: TerminalLine[];
  /** Ref for scroll container (from useTerminalCore) */
  scrollRef: React.RefObject<HTMLDivElement | null>;
  /** Additional classes for the scroll container */
  className?: string;
  /** Enable entry animations for new lines */
  animated?: boolean;
  /** Space between lines */
  spacing?: 'tight' | 'normal';
}

/**
 * Get CSS class for a line based on its type.
 * Unified styling across all terminals.
 */
const getLineClassName = (line: TerminalLine): string => {
  switch (line.type) {
    case 'input':
    case 'command':
      return 'text-primary';
    case 'error':
      return 'text-red-400';
    case 'system':
      return 'text-muted italic';
    case 'success':
      return 'text-terminal-green';
    case 'output':
      return 'text-secondary';
    case 'progress':
      return 'text-terminal-green';
    default:
      return 'text-secondary';
  }
};

/**
 * Get prefix icon for a line based on its type.
 */
const getLinePrefix = (line: TerminalLine): ReactNode => {
  switch (line.type) {
    case 'input':
      return <span className="text-terminal-green mr-2">➜</span>;
    case 'error':
      return <span className="text-red-500 mr-2">✗</span>;
    default:
      return null;
  }
};

/**
 * Render a single line's content with prefix.
 */
const renderLineContent = (line: TerminalLine): ReactNode => (
  <>
    {getLinePrefix(line)}
    {line.content}
  </>
);

/**
 * TerminalOutput component.
 *
 * Provides a scrollable output area with:
 * - Correct flex/overflow CSS for scroll behavior
 * - Unified line type styling
 * - Optional entry animations
 * - Accessibility attributes
 *
 * @example
 * ```tsx
 * const terminal = useTerminalCore({ ... });
 *
 * <TerminalOutput
 *   lines={terminal.lines}
 *   scrollRef={terminal.scrollRef}
 *   animated
 * />
 * ```
 */
export const TerminalOutput: React.FC<TerminalOutputProps> = ({
  lines,
  scrollRef,
  className = '',
  animated = false,
  spacing = 'normal',
}) => {
  const spacingClass = spacing === 'tight' ? 'space-y-1' : 'space-y-2';

  return (
    <div
      ref={scrollRef}
      className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-hide break-words ${spacingClass} ${className}`}
      role="log"
      aria-live="polite"
      aria-label="Terminal output"
    >
      {animated ? (
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className={getLineClassName(line)}
            >
              {renderLineContent(line)}
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        lines.map((line) => (
          <div key={line.id} className={getLineClassName(line)}>
            {renderLineContent(line)}
          </div>
        ))
      )}
    </div>
  );
};

export default TerminalOutput;
