/**
 * useTerminalCore - Unified terminal logic hook
 * Contains ALL shared logic for interactive terminals.
 * Both InteractiveTerminal and DecisionTerminal use this hook.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  commandRegistry,
  parseCommand,
  initializeCommands,
  getPathCompletions,
  findSimilarCommands,
  HOME_DIR,
} from '../commands';
import type { CommandContext, CommandOutput } from '../types';
import { useTerminalFocus } from './useTerminalFocus';
import { useTerminalKeyboard } from './useTerminalKeyboard';
import { useTheme } from './useTheme';

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'command' | 'success' | 'progress';
  content: string | ReactNode;
}

export interface UseTerminalCoreOptions {
  /** Initial lines to display */
  initialLines?: TerminalLine[];
  /** Enable path completion for cd/cat/ls commands */
  enablePathCompletion?: boolean;
  /** Enable advanced keyboard shortcuts (Ctrl+U/K/A/E/W) */
  enableAdvancedShortcuts?: boolean;
  /** Called when apply command is executed */
  onApply?: () => void;
  /** Called when exit command is executed */
  onExit?: () => void;
  /** Quiz controller (for quiz-enabled terminals) */
  quiz?: {
    start: () => void;
    submitAnswer: (answer: 'a' | 'b') => void;
    resetQuiz: () => void;
    currentQuestion: { q: string; a: string; b: string; correct: 'a' | 'b'; feedback_pass: string; feedback_fail: string } | null;
    state: { currentQuestionIndex: number; score: number; isComplete: boolean };
  };
  /** Render quiz results (passed in since it depends on QUIZ_QUESTIONS from constants) */
  renderQuizResults?: (score: number) => ReactNode;
  /** Custom apply handler (e.g., progress bar animation) - return true if handled */
  customApplyHandler?: (addLine: (content: string | ReactNode, type: TerminalLine['type']) => void, lineId: () => string) => boolean;
  /** Whether terminal is disabled (e.g., during loading phase) */
  disabled?: boolean;
  /** Window state for focus management */
  isMinimized?: boolean;
  isFullscreen?: boolean;
  /** Focus delay for useTerminalFocus */
  focusDelay?: number;
}

export interface UseTerminalCoreReturn {
  // State
  lines: TerminalLine[];
  setLines: React.Dispatch<React.SetStateAction<TerminalLine[]>>;
  input: string;
  setInput: (value: string) => void;
  currentDirectory: string;

  // Refs
  scrollRef: React.RefObject<HTMLDivElement | null>;
  getInputRef: (isFullscreen: boolean) => React.RefObject<HTMLInputElement | null>;
  getClickToFocusHandler: (isFullscreen: boolean) => () => void;

  // Handlers
  handleSubmit: (e: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, isFullscreenMode: boolean) => void;
  addLine: (content: string | ReactNode, type?: TerminalLine['type']) => void;
  clearLines: () => void;

  // Quiz state (if quiz is enabled)
  quizStarted: boolean;
}

/**
 * Unified terminal logic hook.
 * Handles command execution, tab completion, keyboard shortcuts, history navigation.
 */
export function useTerminalCore(options: UseTerminalCoreOptions = {}): UseTerminalCoreReturn {
  const {
    initialLines = [],
    enablePathCompletion = false,
    enableAdvancedShortcuts = false,
    onApply,
    onExit,
    quiz,
    renderQuizResults,
    customApplyHandler,
    disabled = false,
    isMinimized = false,
    isFullscreen = false,
    focusDelay = 350,
  } = options;

  // Use shared theme hook - theme changes work automatically in all terminals
  const { changeTheme } = useTheme();

  // Core state
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [quizStarted, setQuizStarted] = useState(false);

  // Directory state (for path completion)
  const [currentDirectory, setCurrentDirectory] = useState(HOME_DIR);
  const [previousDirectory, setPreviousDirectory] = useState(HOME_DIR);

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const commandTimersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const quizTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus management via shared hook
  const { getInputRef, getClickToFocusHandler } = useTerminalFocus({
    isMinimized,
    isFullscreen,
    disabled,
    focusDelay,
  });

  // Ref to track latest quiz prop (avoids stale closure in setTimeout)
  const quizRef = useRef(quiz);
  useEffect(() => {
    quizRef.current = quiz;
  }, [quiz]);

  // Generate unique line IDs
  const lineId = useCallback(() => `line-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, []);

  // Add a single line
  const addLine = useCallback((content: string | ReactNode, type: TerminalLine['type'] = 'output') => {
    setLines(prev => [...prev, { id: lineId(), content, type }]);
  }, [lineId]);

  // Clear all lines
  const clearLines = useCallback(() => {
    setLines([]);
    setInput('');
    setHistoryIndex(-1);
  }, []);

  // Directory change wrapper (tracks previous for `cd -`)
  const changeDirectory = useCallback((newDir: string) => {
    if (newDir !== currentDirectory) {
      setPreviousDirectory(currentDirectory);
      setCurrentDirectory(newDir);
    }
  }, [currentDirectory]);

  // Shared keyboard handler for common shortcuts
  const handleKeyboard = useTerminalKeyboard({
    setInput,
    setHistoryIndex,
    clearOutput: clearLines,
    commandHistory,
    historyIndex,
  });

  // Initialize command registry on mount
  useEffect(() => {
    initializeCommands();
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
      commandTimersRef.current.forEach(t => clearTimeout(t));
      commandTimersRef.current.clear();
    };
  }, []);

  // Auto-scroll to bottom when lines change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [lines]);

  // Command submission handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;

    let processedInput = input.trim();

    // Handle !! (bang-bang) - repeat last command
    let bangBangExpansion: TerminalLine | null = null;
    if (processedInput === '!!') {
      const actualCommands = commandHistory.filter(cmd => !cmd.startsWith('!!'));
      const lastCommand = actualCommands[actualCommands.length - 1];
      if (lastCommand) {
        processedInput = lastCommand;
        bangBangExpansion = { id: lineId(), type: 'system', content: `!! → ${lastCommand}` };
      } else {
        setLines(prev => [...prev,
          { id: lineId(), type: 'system', content: '!!' },
          { id: lineId(), type: 'error', content: 'No command in history' }
        ]);
        setInput('');
        setHistoryIndex(-1);
        return;
      }
    }

    const cmd = processedInput.toLowerCase();

    // Build newHistory with input line
    const newHistory: TerminalLine[] = bangBangExpansion
      ? [...lines, bangBangExpansion, { id: lineId(), type: 'input', content: processedInput }]
      : [...lines, { id: lineId(), type: 'input', content: input }];

    // Add to command history
    setCommandHistory(prev => [...prev, processedInput]);
    setHistoryIndex(-1);
    setInput('');

    // QUIZ MODE handling (if quiz is active)
    if (quiz && quizStarted && !quiz.state.isComplete) {
      if (cmd === 'exit' || cmd === 'quit') {
        quiz.resetQuiz();
        setQuizStarted(false);
        newHistory.push({ id: lineId(), type: 'output', content: 'Quiz terminated.' });
        setLines(newHistory);
        return;
      }

      if (cmd === 'a' || cmd === 'b') {
        const answer = cmd as 'a' | 'b';
        const currentQuestion = quiz.currentQuestion;
        const currentIndex = quiz.state.currentQuestionIndex;

        if (currentQuestion) {
          const isCorrect = answer === currentQuestion.correct;
          quiz.submitAnswer(answer);

          newHistory.push({
            id: lineId(),
            type: 'output',
            content: isCorrect
              ? <span className="text-terminal-green">{currentQuestion.feedback_pass}</span>
              : <span className="text-section-focus">{currentQuestion.feedback_fail}</span>
          });

          // Show next question or results
          if (quizTimerRef.current) clearTimeout(quizTimerRef.current);

          quizTimerRef.current = setTimeout(() => {
            // Use ref to get CURRENT quiz state (avoids stale closure)
            const currentQuiz = quizRef.current;
            if (!currentQuiz) return;

            const nextIndex = currentIndex + 1;
            // Check if there are more questions using CURRENT state
            if (!currentQuiz.state.isComplete && currentQuiz.currentQuestion) {
              const nextQ = currentQuiz.currentQuestion;
              setLines(prev => [...prev, {
                id: lineId(),
                type: 'output',
                content: (
                  <div className="mt-2">
                    <div className="text-primary font-bold">Q{nextIndex + 1}: {nextQ.q}</div>
                    <div className="pl-4 text-secondary">A) {nextQ.a}</div>
                    <div className="pl-4 text-secondary">B) {nextQ.b}</div>
                  </div>
                )
              }]);
            } else if (renderQuizResults) {
              // Quiz complete - use CURRENT score
              const finalScore = currentQuiz.state.score;
              setQuizStarted(false);
              setLines(prev => [...prev, {
                id: lineId(),
                type: 'output',
                content: renderQuizResults(finalScore)
              }]);
            }
          }, 500);

          setLines(newHistory);
          return;
        }
      }

      // Invalid quiz input
      newHistory.push({
        id: lineId(),
        type: 'error',
        content: `Invalid input: "${cmd}". Answer with 'a' or 'b', or type 'exit' to quit.`,
      });
      setLines(newHistory);
      return;
    }

    // Special handling for 'apply' with custom handler
    if (cmd === 'apply' && customApplyHandler) {
      if (customApplyHandler(addLine, lineId)) {
        setLines(newHistory);
        return;
      }
    }

    // Special handling for 'clear'
    if (cmd === 'clear') {
      clearLines();
      return;
    }

    // Build command context
    const commandContext: CommandContext = {
      addOutput: (output: CommandOutput) => {
        newHistory.push({ id: lineId(), type: output.type, content: output.content });
      },
      addOutputs: (outputs: CommandOutput[]) => {
        outputs.forEach(output => {
          newHistory.push({ id: lineId(), type: output.type, content: output.content });
        });
      },
      clearHistory: clearLines,
      history: lines.map(l => ({ type: l.type, content: l.content })),
      currentDirectory,
      previousDirectory,
      setCurrentDirectory: changeDirectory,
      onThemeChange: changeTheme,
      onExit,
      openApplication: onApply,
      quiz: quiz ? {
        start: () => {
          quiz.resetQuiz();
          setQuizStarted(true);
        },
        isActive: quizStarted,
      } : { start: () => {}, isActive: false },
      setTimeout: (callback: () => void, ms: number) => {
        const timer = setTimeout(() => {
          commandTimersRef.current.delete(timer);
          callback();
        }, ms);
        commandTimersRef.current.add(timer);
      },
    };

    // Parse and execute command
    const parsed = parseCommand(input);
    const command = commandRegistry.get(parsed.command) || commandRegistry.get(cmd);

    if (command) {
      // Show alias hint if user typed an alias
      const usedAlias = parsed.command.toLowerCase() !== command.name.toLowerCase();
      if (usedAlias && command.aliases?.some(a => a.toLowerCase() === parsed.command.toLowerCase())) {
        newHistory.push({
          id: lineId(),
          type: 'system',
          content: <span className="text-muted text-xs italic">→ {parsed.command} is an alias for '{command.name}'</span>,
        });
      }

      try {
        const result = command.handler(parsed, commandContext);

        const handleResult = (res: { preventHistoryUpdate?: boolean }) => {
          if (!res.preventHistoryUpdate) {
            setLines(newHistory);
          }
        };

        const handleError = (err: unknown) => {
          newHistory.push({
            id: lineId(),
            type: 'error',
            content: `Error executing command: ${err instanceof Error ? err.message : 'Unknown error'}`,
          });
          setLines(newHistory);
        };

        if (result instanceof Promise) {
          result.then(handleResult).catch(handleError);
        } else {
          handleResult(result);
        }
      } catch (err) {
        newHistory.push({
          id: lineId(),
          type: 'error',
          content: `Error executing command: ${err instanceof Error ? err.message : 'Unknown error'}`,
        });
        setLines(newHistory);
      }
      return;
    }

    // Command not found - try to suggest similar commands
    const allCommands = commandRegistry.getAll();
    const allNames: string[] = [];
    allCommands.forEach(c => {
      allNames.push(c.name);
      if (c.aliases) allNames.push(...c.aliases);
    });

    const suggestions = findSimilarCommands(cmd, allNames, 2);

    if (suggestions.length > 0) {
      newHistory.push({
        id: lineId(),
        type: 'error',
        content: (
          <span>
            Command not found: <span className="text-section-focus">{cmd}</span>.{' '}
            Did you mean <span className="text-terminal-green">{suggestions[0]}</span>?
            {suggestions.length > 1 && (
              <span className="text-muted"> (or: {suggestions.slice(1, 3).join(', ')})</span>
            )}
          </span>
        ),
      });
    } else {
      newHistory.push({
        id: lineId(),
        type: 'error',
        content: `Command not found: ${cmd}. Type "help" for available commands.`,
      });
    }

    setLines(newHistory);
  }, [
    input, disabled, commandHistory, lines, lineId, quiz, quizStarted,
    renderQuizResults, customApplyHandler, clearLines, currentDirectory,
    previousDirectory, changeDirectory, changeTheme, onExit, onApply, addLine
  ]);

  // Keyboard handler with optional advanced shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, isFullscreenMode: boolean) => {
    // Handle common shortcuts (ArrowUp/Down, Ctrl+L/C)
    if (handleKeyboard(e)) return;

    // Tab - autocomplete command or path
    if (e.key === 'Tab') {
      e.preventDefault();
      const trimmedInput = input.trim();
      const lowerInput = trimmedInput.toLowerCase();

      // Path completion (if enabled and command starts with path command)
      if (enablePathCompletion) {
        const pathCommands = ['cd ', 'cat ', 'ls ', 'more ', 'less ', 'type '];
        const matchingPathCmd = pathCommands.find(cmd => lowerInput.startsWith(cmd));

        if (matchingPathCmd) {
          const pathPart = trimmedInput.length > matchingPathCmd.length
            ? trimmedInput.slice(matchingPathCmd.length)
            : '';
          const completions = getPathCompletions(currentDirectory, pathPart);

          if (completions.length === 0) {
            addLine(`No paths matching '${pathPart}'`, 'system');
          } else if (completions.length === 1) {
            setInput(matchingPathCmd + completions[0]);
          } else {
            addLine(`Paths: ${completions.slice(0, 10).join('  ')}${completions.length > 10 ? '...' : ''}`, 'system');
            const commonPrefix = completions.reduce((prefix, name) => {
              while (prefix && !name.startsWith(prefix)) {
                prefix = prefix.slice(0, -1);
              }
              return prefix;
            }, completions[0]);
            if (commonPrefix.length > pathPart.length) {
              setInput(matchingPathCmd + commonPrefix);
            }
          }
          return;
        }
      }

      // Command completion
      if (trimmedInput) {
        const allCommands = commandRegistry.getAll();
        const allNames: string[] = [];
        allCommands.forEach(cmd => {
          if (!cmd.hidden) {
            allNames.push(cmd.name);
            if (cmd.aliases) allNames.push(...cmd.aliases);
          }
        });
        const matches = allNames.filter(name => name.startsWith(lowerInput));

        if (matches.length === 0) {
          addLine(`No commands matching '${trimmedInput}'`, 'system');
        } else if (matches.length === 1) {
          setInput(matches[0]);
        } else {
          addLine(`Matches: ${matches.slice(0, 10).join(', ')}${matches.length > 10 ? '...' : ''}`, 'system');
          const commonPrefix = matches.reduce((prefix, name) => {
            while (prefix && !name.startsWith(prefix)) {
              prefix = prefix.slice(0, -1);
            }
            return prefix;
          }, matches[0]);
          if (commonPrefix.length > lowerInput.length) {
            setInput(commonPrefix);
          }
        }
      } else {
        // Empty input - show common commands hint
        const commonCmds = ['help', 'stack', 'mission', 'challenges', 'ls', 'apply'];
        addLine(`Common commands: ${commonCmds.join(', ')}`, 'system');
      }
      return;
    }

    // Advanced shortcuts (if enabled)
    if (enableAdvancedShortcuts) {
      const inputEl = getInputRef(isFullscreenMode).current;

      // Ctrl+U - clear line before cursor
      if (e.key === 'u' && e.ctrlKey) {
        e.preventDefault();
        const cursorPos = inputEl?.selectionStart || 0;
        setInput(input.slice(cursorPos));
        setTimeout(() => inputEl?.setSelectionRange(0, 0), 0);
        return;
      }

      // Ctrl+K - clear line after cursor
      if (e.key === 'k' && e.ctrlKey) {
        e.preventDefault();
        const cursorPos = inputEl?.selectionStart || input.length;
        setInput(input.slice(0, cursorPos));
        return;
      }

      // Ctrl+A - move cursor to start
      if (e.key === 'a' && e.ctrlKey) {
        e.preventDefault();
        inputEl?.setSelectionRange(0, 0);
        return;
      }

      // Ctrl+E - move cursor to end
      if (e.key === 'e' && e.ctrlKey) {
        e.preventDefault();
        inputEl?.setSelectionRange(input.length, input.length);
        return;
      }

      // Ctrl+W - delete word before cursor
      if (e.key === 'w' && e.ctrlKey) {
        e.preventDefault();
        const cursorPos = inputEl?.selectionStart || input.length;
        const beforeCursor = input.slice(0, cursorPos);
        const afterCursor = input.slice(cursorPos);
        const trimmed = beforeCursor.trimEnd();
        const lastSpace = trimmed.lastIndexOf(' ');
        const newBefore = lastSpace === -1 ? '' : beforeCursor.slice(0, lastSpace + 1);
        setInput(newBefore + afterCursor);
        setTimeout(() => inputEl?.setSelectionRange(newBefore.length, newBefore.length), 0);
        return;
      }

      // Ctrl+D - exit (only when input is empty)
      if (e.key === 'd' && e.ctrlKey && !input && onExit) {
        e.preventDefault();
        onExit();
        return;
      }
    }
  }, [
    handleKeyboard, input, enablePathCompletion, enableAdvancedShortcuts,
    currentDirectory, addLine, getInputRef, onExit
  ]);

  // Return object - functions are already stable via useCallback
  // Note: lines, input, currentDirectory, quizStarted are reactive values that change
  // Consumers should access them via terminal.lines etc., not put terminal in useEffect deps
  return {
    lines,
    setLines,
    input,
    setInput,
    currentDirectory,
    scrollRef,
    getInputRef,
    getClickToFocusHandler,
    handleSubmit,
    handleKeyDown,
    addLine,
    clearLines,
    quizStarted,
  };
}
