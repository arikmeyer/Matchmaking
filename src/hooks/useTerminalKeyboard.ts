import { useCallback } from 'react';

export interface TerminalKeyboardHandlers {
  setInput: (value: string | ((prev: string) => string)) => void;
  setHistoryIndex: (value: number | ((prev: number) => number)) => void;
  clearOutput: () => void;
  commandHistory: string[];
  historyIndex: number;
}

/**
 * Creates standard terminal keyboard handlers for common shortcuts.
 * Returns a handler function that processes keyboard events and returns
 * whether the event was handled (to prevent default behavior).
 *
 * Handled shortcuts:
 * - ArrowUp: Navigate to previous command in history
 * - ArrowDown: Navigate to next command in history
 * - Ctrl+L: Clear terminal output
 * - Ctrl+C: Cancel current input
 *
 * Usage:
 * ```tsx
 * const handleKeyboard = useTerminalKeyboard({
 *   setInput,
 *   setHistoryIndex,
 *   clearOutput: () => setHistory([]),
 *   commandHistory,
 *   historyIndex,
 * });
 *
 * // In onKeyDown:
 * if (handleKeyboard(e)) return;
 * // ...handle terminal-specific shortcuts
 * ```
 */
export function useTerminalKeyboard({
  setInput,
  setHistoryIndex,
  clearOutput,
  commandHistory,
  historyIndex,
}: TerminalKeyboardHandlers) {
  return useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): boolean => {
      // Arrow up - navigate to previous command in history
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
        }
        return true;
      }

      // Arrow down - navigate to next command in history
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
        }
        return true;
      }

      // Ctrl+L - clear terminal output
      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        clearOutput();
        return true;
      }

      // Ctrl+C - cancel current input
      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        setInput('');
        setHistoryIndex(-1);
        return true;
      }

      return false;
    },
    [setInput, setHistoryIndex, clearOutput, commandHistory, historyIndex]
  );
}
