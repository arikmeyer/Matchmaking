/**
 * Command System Types
 * Centralized type definitions for the terminal command system
 */

import type { ReactNode } from 'react';

/**
 * Parsed command input
 */
export interface ParsedCommand {
  /** The base command (lowercase, trimmed) */
  command: string;
  /** Command arguments (space-separated, respecting quotes) */
  args: string[];
  /** Raw input string */
  raw: string;
  /** Flags extracted from args (e.g., -a, --verbose) */
  flags: Record<string, string | boolean>;
}

/**
 * Output line to add to terminal history
 */
export interface CommandOutput {
  type: 'output' | 'system' | 'error';
  content: ReactNode;
}

/**
 * Context passed to command handlers
 */
export interface CommandContext {
  /** Add a line to terminal history */
  addOutput: (output: CommandOutput) => void;
  /** Add multiple lines to terminal history */
  addOutputs: (outputs: CommandOutput[]) => void;
  /** Clear terminal history */
  clearHistory: () => void;
  /** Current terminal history */
  history: Array<{ type: string; content: ReactNode }>;
  /** Current working directory (for filesystem commands) */
  currentDirectory: string;
  /** Previous working directory (for cd -) */
  previousDirectory: string;
  /** Set current working directory */
  setCurrentDirectory: (path: string) => void;
  /** Theme change callback */
  onThemeChange?: (theme: 'default' | 'matrix' | 'cyberpunk' | 'light', crtMode: boolean) => void;
  /** Exit callback */
  onExit?: () => void;
  /** Open application modal callback */
  openApplication?: () => void;
  /** Quiz state and controls */
  quiz: {
    start: () => void;
    isActive: boolean;
  };
  /** Set a timeout that will be cleaned up on unmount */
  setTimeout: (callback: () => void, ms: number) => void;
}

/**
 * Result of executing a command
 */
export interface CommandResult {
  /** Whether the command was handled */
  handled: boolean;
  /** Whether to prevent default history update (command handles it) */
  preventHistoryUpdate?: boolean;
  /** Whether to clear input after command */
  clearInput?: boolean;
}

/**
 * Command handler function signature
 */
export type CommandHandler = (
  parsed: ParsedCommand,
  context: CommandContext
) => CommandResult | Promise<CommandResult>;

/**
 * Command definition
 */
export interface CommandDefinition {
  /** Primary command name */
  name: string;
  /** Alternative names/aliases for this command */
  aliases?: string[];
  /** Short description for help text */
  description: string;
  /** Detailed usage information */
  usage?: string;
  /** Example usages */
  examples?: string[];
  /** Whether this command is hidden from help */
  hidden?: boolean;
  /** Category for grouping in help (e.g., 'navigation', 'info', 'action') */
  category?: CommandCategory;
  /** The handler function */
  handler: CommandHandler;
}

/**
 * Command categories for organization
 */
export type CommandCategory =
  | 'navigation'    // cd, ls, pwd, cat
  | 'info'          // help, whoami, stack, mission
  | 'action'        // apply, clear, exit
  | 'theme'         // theme commands
  | 'quiz'          // culture/quiz commands
  | 'system'        // echo, date, env, history
  | 'easter-egg'    // hidden fun commands
  | 'dev';          // git, npm, etc.

/**
 * Command registry interface
 */
export interface CommandRegistry {
  /** Register a single command */
  register: (command: CommandDefinition) => void;
  /** Register multiple commands */
  registerAll: (commands: CommandDefinition[]) => void;
  /** Get a command by name or alias */
  get: (nameOrAlias: string) => CommandDefinition | undefined;
  /** Get all registered commands */
  getAll: () => CommandDefinition[];
  /** Get commands by category */
  getByCategory: (category: CommandCategory) => CommandDefinition[];
  /** Get all visible (non-hidden) commands */
  getVisible: () => CommandDefinition[];
  /** Check if a command exists */
  has: (nameOrAlias: string) => boolean;
}
