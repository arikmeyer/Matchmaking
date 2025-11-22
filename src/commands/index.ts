/**
 * Commands Module
 *
 * This module provides a clean, extensible command system for the terminal.
 *
 * ## Architecture
 *
 * - **Registry**: Central storage for command definitions
 * - **Parser**: Converts raw input into structured command data
 * - **Definitions**: Individual command implementations
 * - **Executor**: Hook that ties everything together
 *
 * ## Adding a New Command
 *
 * 1. Create a new command definition:
 * ```typescript
 * // src/commands/definitions/my-command.tsx
 * import { defineCommand } from '../registry';
 *
 * export const myCommand = defineCommand({
 *   name: 'mycommand',
 *   aliases: ['mc', 'mycmd'],
 *   description: 'Does something cool',
 *   category: 'info',
 *   hidden: false, // Set to true for easter eggs
 *
 *   handler: (parsed, ctx) => {
 *     ctx.addOutput({
 *       type: 'output',
 *       content: 'Hello from my command!',
 *     });
 *     return { handled: true };
 *   },
 * });
 * ```
 *
 * 2. Export from definitions/index.ts
 * 3. Add to ALL_COMMANDS array
 * 4. Done! The command is automatically available.
 *
 * ## Command Categories
 *
 * - `navigation`: cd, ls, pwd, cat
 * - `info`: help, whoami, stack, mission
 * - `action`: apply, clear, exit
 * - `theme`: theme commands
 * - `quiz`: culture/quiz commands
 * - `system`: echo, date, env, history
 * - `easter-egg`: hidden fun commands
 * - `dev`: git, npm, etc.
 */

// Registry
export {
  commandRegistry,
  createCommandRegistry,
  defineCommand,
  registerCommand,
} from './registry';

// Parser
export {
  parseCommand,
  joinArgs,
  hasFlag,
  getFlagValue,
  getFirstArg,
  commandMatches,
  commandNotFound,
  findSimilarCommands,
} from './parser';

// All command definitions
export { ALL_COMMANDS, HOME_DIR, ENV_VARIABLES, getPathCompletions } from './definitions';

// Executor hook
export {
  useCommandExecutor,
  getPromptDisplay,
  type UseCommandExecutorConfig,
  type UseCommandExecutorReturn,
} from './useCommandExecutor';

// Re-export types for convenience
export type {
  ParsedCommand,
  CommandOutput,
  CommandContext,
  CommandResult,
  CommandHandler,
  CommandDefinition,
  CommandCategory,
  CommandRegistry,
} from '../types';

/**
 * Initialize the command registry with all built-in commands
 *
 * Call this once at app startup to register all commands.
 * Safe to call multiple times - subsequent calls are no-ops.
 */
import { commandRegistry } from './registry';
import { ALL_COMMANDS } from './definitions';

let commandsInitialized = false;

export function initializeCommands(): void {
  if (commandsInitialized) return;
  commandsInitialized = true;
  commandRegistry.registerAll(ALL_COMMANDS);
}

/**
 * Execute a command by name
 *
 * This is a convenience function for simple use cases.
 * For full control, use the registry and parser directly.
 */
import { parseCommand } from './parser';
import type { CommandContext, CommandResult } from '../types';

export async function executeCommand(
  input: string,
  context: CommandContext
): Promise<CommandResult> {
  const parsed = parseCommand(input);

  if (!parsed.command) {
    return { handled: false };
  }

  const command = commandRegistry.get(parsed.command);

  if (!command) {
    return { handled: false };
  }

  return command.handler(parsed, context);
}
