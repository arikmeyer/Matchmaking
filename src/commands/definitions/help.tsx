/**
 * Help Command
 * Displays available commands and usage information
 */

import React from 'react';
import { defineCommand } from '../registry';
import { commandRegistry } from '../registry';
import { findSimilarCommands } from '../parser';
import type { CommandCategory } from '../../types';

/**
 * Category display configuration
 */
const CATEGORY_CONFIG: Record<CommandCategory, { label: string; order: number }> = {
  info: { label: 'Information', order: 1 },
  navigation: { label: 'Navigation', order: 2 },
  system: { label: 'System', order: 3 },
  action: { label: 'Actions', order: 4 },
  theme: { label: 'Appearance', order: 5 },
  quiz: { label: 'Interactive', order: 6 },
  dev: { label: 'Development', order: 7 },
  'easter-egg': { label: 'Hidden', order: 99 }, // Never shown
};

/**
 * Command groups for terminal-native help display
 * Structure inspired by git help / npm help - lowercase section labels, indented commands
 */
const HELP_SECTIONS = [
  {
    label: 'philosophy',
    commands: ['mission', 'why', 'how', 'what'],
  },
  {
    label: 'architecture',
    commands: ['puzzle', 'architecture', 'domains'],
  },
  {
    label: 'team',
    commands: ['beliefs', 'team', 'role', 'evolution', 'warts'],
  },
  {
    label: 'tools',
    commands: ['stack'],
  },
  {
    label: 'matchmaking',
    commands: ['whoami', 'culture', 'apply', 'feedback'],
  },
  {
    label: 'navigation',
    commands: ['ls', 'cd', 'cat', 'pwd'],
  },
  {
    label: 'terminal',
    commands: ['help', 'history', 'clear', 'theme', 'exit'],
  },
];

export const helpCommand = defineCommand({
  name: 'help',
  aliases: ['?', 'commands'],
  description: 'Show available commands',
  usage: 'help [command | --all]',
  examples: ['help', 'help stack', 'help theme', 'help --all'],
  category: 'info',

  handler: (parsed, ctx) => {
    const specificCommand = parsed.args[0];
    const showAll = parsed.flags['all'] || parsed.flags['a'] || specificCommand === '--all';

    // Show all visible commands (excludes hidden easter eggs)
    if (showAll) {
      const visibleCommands = commandRegistry.getAll().filter(cmd => !cmd.hidden);
      const grouped = visibleCommands.reduce((acc, cmd) => {
        const cat = cmd.category || 'other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(cmd);
        return acc;
      }, {} as Record<string, typeof visibleCommands>);

      ctx.addOutput({
        type: 'output',
        content: (
          <div className="space-y-3 font-mono text-sm">
            <div className="text-primary font-bold">All Commands:</div>
            {Object.entries(grouped).sort(([a], [b]) => {
              const orderA = CATEGORY_CONFIG[a as CommandCategory]?.order ?? 50;
              const orderB = CATEGORY_CONFIG[b as CommandCategory]?.order ?? 50;
              return orderA - orderB;
            }).map(([category, cmds]) => (
              <div key={category} className="space-y-1">
                <div className="text-muted text-xs uppercase tracking-wider">
                  {CATEGORY_CONFIG[category as CommandCategory]?.label || category}
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-2 pl-2">
                  {cmds.map((cmd) => (
                    <React.Fragment key={cmd.name}>
                      <span className="text-terminal-green">{cmd.name}</span>
                      <span className="text-muted">{cmd.description}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick tips */}
            <div className="text-muted text-xs pt-2 border-t border-default">
              <span className="text-terminal-green">Tab</span> autocomplete · <span className="text-terminal-green">↑/↓</span> history · <span className="text-terminal-green">⌘⇧F</span> fullscreen · <span className="text-terminal-green">Ctrl+L</span> clear
            </div>
          </div>
        ),
      });
      return { handled: true };
    }

    if (specificCommand) {
      // Show help for specific command
      const cmd = commandRegistry.get(specificCommand);

      if (!cmd) {
        // Try to suggest similar commands
        const allCommands = commandRegistry.getAll();
        const allNames: string[] = [];
        allCommands.forEach(c => {
          allNames.push(c.name);
          if (c.aliases) allNames.push(...c.aliases);
        });
        const suggestions = findSimilarCommands(specificCommand, allNames, 2);

        ctx.addOutput({
          type: 'error',
          content: suggestions.length > 0 ? (
            <span>
              Unknown command: <span className="text-primary">{specificCommand}</span>.{' '}
              Did you mean <span className="text-terminal-green">{suggestions[0]}</span>?
            </span>
          ) : (
            <span>
              Unknown command: {specificCommand}. Run <span className="text-terminal-green">help</span> to see available commands.
            </span>
          ),
        });
        return { handled: true };
      }

      ctx.addOutput({
        type: 'output',
        content: (
          <div className="space-y-2 font-mono text-sm">
            <div className="text-primary font-bold border-b border-default pb-1">
              {cmd.name.toUpperCase()}
              {cmd.aliases && cmd.aliases.length > 0 && (
                <span className="text-muted text-xs ml-2">
                  (aliases: {cmd.aliases.join(', ')})
                </span>
              )}
            </div>
            <div className="text-secondary">{cmd.description}</div>
            {cmd.usage && (
              <div className="mt-2">
                <span className="text-muted">Usage: </span>
                <span className="text-terminal-green">{cmd.usage}</span>
              </div>
            )}
            {cmd.examples && cmd.examples.length > 0 && (
              <div className="mt-2">
                <div className="text-muted">Examples:</div>
                {cmd.examples.map((ex, i) => (
                  <div key={i} className="pl-4 text-terminal-green">
                    $ {ex}
                  </div>
                ))}
              </div>
            )}
          </div>
        ),
      });

      return { handled: true };
    }

    // Show grouped commands with terminal-native section labels
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-2 font-mono text-sm">
          <div className="text-muted text-xs mb-3">
            Start with <span className="text-terminal-green">mission</span> or <span className="text-terminal-green">whoami</span>. Dig deeper from there.
          </div>

          {/* Sectioned commands - terminal-native style */}
          {HELP_SECTIONS.map((section) => (
            <div key={section.label} className="space-y-0.5">
              <div className="text-muted text-xs uppercase">{section.label}</div>
              <div className="pl-2">
                {section.commands
                  .map((name) => commandRegistry.get(name))
                  .filter((cmd): cmd is NonNullable<typeof cmd> => cmd !== undefined)
                  .map((cmd) => (
                    <div key={cmd.name} className="grid grid-cols-[120px_1fr] gap-2">
                      <span className="text-terminal-green">{cmd.name}</span>
                      <span className="text-muted">{cmd.description}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Quick tips */}
          <div className="text-muted text-xs pt-2 border-t border-default">
            <span className="text-terminal-green">Tab</span> autocomplete · <span className="text-terminal-green">↑/↓</span> history · <span className="text-terminal-green">⌘⇧F</span> window · <span className="text-terminal-green">help --all</span>
          </div>
        </div>
      ),
    });

    return { handled: true };
  },
});
