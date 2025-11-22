/**
 * useCommandExecutor Hook
 *
 * Provides a clean interface for executing terminal commands.
 * Handles command parsing, registry lookup, and context management.
 */

import { useCallback, useRef, useEffect } from 'react';
import { commandRegistry } from './registry';
import { parseCommand, commandNotFound } from './parser';
import { initializeCommands } from './index';
import { HOME_DIR } from './definitions';
import type {
  CommandContext,
  CommandOutput,
  CommandResult,
  TerminalLine,
} from '../types';

/**
 * Configuration for the command executor
 */
export interface UseCommandExecutorConfig {
  /** Current terminal history */
  history: TerminalLine[];
  /** Function to update history */
  setHistory: React.Dispatch<React.SetStateAction<TerminalLine[]>>;
  /** Current directory state */
  currentDirectory: string;
  /** Function to update current directory */
  setCurrentDirectory: (path: string) => void;
  /** Theme change callback */
  onThemeChange?: (
    theme: 'default' | 'matrix' | 'cyberpunk' | 'light',
    crtMode: boolean
  ) => void;
  /** Exit callback */
  onExit?: () => void;
  /** Open application modal callback */
  openApplication?: () => void;
  /** Previous directory for cd - */
  previousDirectory?: string;
  /** Quiz controls */
  quiz?: {
    start: () => void;
    isActive: boolean;
  };
}

/**
 * Return type for the hook
 */
export interface UseCommandExecutorReturn {
  /** Execute a command from raw input */
  execute: (input: string) => Promise<CommandResult>;
  /** Get the command registry for introspection */
  registry: typeof commandRegistry;
  /** Current directory */
  currentDirectory: string;
  /** Home directory constant */
  homeDirectory: string;
}

/**
 * Hook for executing terminal commands
 *
 * @example
 * ```tsx
 * const { execute, currentDirectory } = useCommandExecutor({
 *   history,
 *   setHistory,
 *   currentDirectory,
 *   setCurrentDirectory,
 *   onThemeChange,
 *   onExit,
 * });
 *
 * const handleSubmit = async (input: string) => {
 *   const result = await execute(input);
 *   if (!result.handled) {
 *     // Command not found, handle legacy commands or show error
 *   }
 * };
 * ```
 */
export function useCommandExecutor(
  config: UseCommandExecutorConfig
): UseCommandExecutorReturn {
  const {
    history,
    setHistory,
    currentDirectory,
    setCurrentDirectory,
    onThemeChange,
    onExit,
    openApplication,
    previousDirectory = currentDirectory,
    quiz,
  } = config;

  // Track timeouts for cleanup
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // Initialize commands on first render
  useEffect(() => {
    initializeCommands();
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, []);

  /**
   * Add a single output line to history
   */
  const addOutput = useCallback(
    (output: CommandOutput) => {
      setHistory((prev) => [
        ...prev,
        {
          type: output.type,
          content: output.content,
        },
      ]);
    },
    [setHistory]
  );

  /**
   * Add multiple output lines to history
   */
  const addOutputs = useCallback(
    (outputs: CommandOutput[]) => {
      setHistory((prev) => [
        ...prev,
        ...outputs.map((output) => ({
          type: output.type,
          content: output.content,
        })),
      ]);
    },
    [setHistory]
  );

  /**
   * Clear terminal history
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  /**
   * Set a timeout that will be cleaned up on unmount
   */
  const setTimeoutSafe = useCallback((callback: () => void, ms: number) => {
    const timeout = setTimeout(() => {
      timeoutsRef.current.delete(timeout);
      callback();
    }, ms);
    timeoutsRef.current.add(timeout);
  }, []);

  /**
   * Execute a command
   */
  const execute = useCallback(
    async (input: string): Promise<CommandResult> => {
      const trimmed = input.trim();
      if (!trimmed) {
        return { handled: false };
      }

      // Parse the input
      const parsed = parseCommand(trimmed);

      if (!parsed.command) {
        return { handled: false };
      }

      // Look up the command
      const command = commandRegistry.get(parsed.command);

      // Also check for multi-word commands (like "hire me")
      const multiWordCommand = commandRegistry.get(trimmed.toLowerCase());

      const finalCommand = command || multiWordCommand;

      if (!finalCommand) {
        // Command not found - return unhandled so caller can try legacy handlers
        return { handled: false };
      }

      // Build the context
      const context: CommandContext = {
        addOutput,
        addOutputs,
        clearHistory,
        history,
        currentDirectory,
        previousDirectory,
        setCurrentDirectory,
        onThemeChange,
        onExit,
        openApplication,
        quiz: quiz || {
          start: () => {},
          isActive: false,
        },
        setTimeout: setTimeoutSafe,
      };

      // Execute the command
      try {
        const result = await finalCommand.handler(parsed, context);
        return result;
      } catch (error) {
        console.error(`Error executing command "${parsed.command}":`, error);
        addOutput({
          type: 'error',
          content: `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
        return { handled: true };
      }
    },
    [
      addOutput,
      addOutputs,
      clearHistory,
      history,
      currentDirectory,
      previousDirectory,
      setCurrentDirectory,
      onThemeChange,
      onExit,
      openApplication,
      quiz,
      setTimeoutSafe,
    ]
  );

  return {
    execute,
    registry: commandRegistry,
    currentDirectory,
    homeDirectory: HOME_DIR,
  };
}

/**
 * Get the display prompt based on current directory
 */
export function getPromptDisplay(currentDirectory: string): string {
  // Get path relative to home directory
  const displayPath = currentDirectory.replace(HOME_DIR, '').replace(/^\//, '');
  // Show path only when not in home directory
  if (!displayPath) {
    return `switchup >`;
  }
  return `switchup/${displayPath} >`;
}
