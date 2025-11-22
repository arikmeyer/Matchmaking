/**
 * Command Registry
 * Central registration and lookup system for terminal commands
 */

import type {
  CommandDefinition,
  CommandRegistry,
  CommandCategory,
} from '../types';

/**
 * Create a new command registry instance
 */
export function createCommandRegistry(): CommandRegistry {
  // Store commands by their primary name
  const commands = new Map<string, CommandDefinition>();
  // Store alias -> primary name mappings
  const aliases = new Map<string, string>();

  const registry: CommandRegistry = {
    register(command: CommandDefinition): void {
      // Validate command
      if (!command.name) {
        throw new Error('Command must have a name');
      }
      if (!command.handler) {
        throw new Error(`Command "${command.name}" must have a handler`);
      }

      const normalizedName = command.name.toLowerCase();

      // Check for duplicate primary name
      if (commands.has(normalizedName)) {
        console.warn(`Command "${normalizedName}" is being overwritten`);
      }

      // Register the command
      commands.set(normalizedName, command);

      // Register aliases
      if (command.aliases) {
        for (const alias of command.aliases) {
          const normalizedAlias = alias.toLowerCase();
          if (aliases.has(normalizedAlias) || commands.has(normalizedAlias)) {
            console.warn(
              `Alias "${normalizedAlias}" for command "${normalizedName}" conflicts with existing command/alias`
            );
          }
          aliases.set(normalizedAlias, normalizedName);
        }
      }
    },

    registerAll(commandList: CommandDefinition[]): void {
      for (const command of commandList) {
        registry.register(command);
      }
    },

    get(nameOrAlias: string): CommandDefinition | undefined {
      const normalized = nameOrAlias.toLowerCase();

      // Try direct lookup first
      if (commands.has(normalized)) {
        return commands.get(normalized);
      }

      // Try alias lookup
      const primaryName = aliases.get(normalized);
      if (primaryName) {
        return commands.get(primaryName);
      }

      return undefined;
    },

    getAll(): CommandDefinition[] {
      return Array.from(commands.values());
    },

    getByCategory(category: CommandCategory): CommandDefinition[] {
      return Array.from(commands.values()).filter(
        (cmd) => cmd.category === category
      );
    },

    getVisible(): CommandDefinition[] {
      return Array.from(commands.values()).filter((cmd) => !cmd.hidden);
    },

    has(nameOrAlias: string): boolean {
      const normalized = nameOrAlias.toLowerCase();
      return commands.has(normalized) || aliases.has(normalized);
    },
  };

  return registry;
}

/**
 * Global command registry singleton
 * Commands register themselves here on import
 */
export const commandRegistry = createCommandRegistry();

/**
 * Helper to define a command with type safety
 */
export function defineCommand(definition: CommandDefinition): CommandDefinition {
  return definition;
}

/**
 * Decorator-style helper to register a command immediately
 */
export function registerCommand(definition: CommandDefinition): CommandDefinition {
  commandRegistry.register(definition);
  return definition;
}
