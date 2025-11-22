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
 * Primary commands to show in help (in display order)
 * These match the original help output + navigation basics
 */
const PRIMARY_COMMANDS = [
  'help',
  'stack',
  'mission',
  'challenges',
  'culture',
  'ls',
  'cat',
  'cd',
  'pwd',
  'whoami',
  'env',
  'theme',
  'apply',
  'feedback',
  'clear',
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

    // Show all commands including hidden ones
    if (showAll) {
      const allCommands = commandRegistry.getAll();
      const grouped = allCommands.reduce((acc, cmd) => {
        const cat = cmd.category || 'other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(cmd);
        return acc;
      }, {} as Record<string, typeof allCommands>);

      ctx.addOutput({
        type: 'output',
        content: (
          <div className="space-y-3 font-mono text-sm">
            <div className="text-primary font-bold">All Commands ({allCommands.length} total):</div>
            {Object.entries(grouped).sort(([a], [b]) => {
              const orderA = CATEGORY_CONFIG[a as CommandCategory]?.order ?? 50;
              const orderB = CATEGORY_CONFIG[b as CommandCategory]?.order ?? 50;
              return orderA - orderB;
            }).map(([category, cmds]) => (
              <div key={category} className="space-y-1">
                <div className="text-secondary font-bold text-xs uppercase tracking-wider">
                  {CATEGORY_CONFIG[category as CommandCategory]?.label || category}
                </div>
                <div className="grid grid-cols-[120px_1fr] gap-1 pl-2">
                  {cmds.map((cmd) => (
                    <React.Fragment key={cmd.name}>
                      <span className={cmd.hidden ? 'text-amber-500' : 'text-terminal-green'}>{cmd.name}</span>
                      <span className="text-muted">{cmd.description}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-muted text-xs border-t border-default pt-2">
              <span className="text-amber-500">●</span> Hidden commands (easter eggs)
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
              Unknown command: <span className="text-amber-400">{specificCommand}</span>.{' '}
              Did you mean <span className="text-terminal-green">{suggestions[0]}</span>?
            </span>
          ) : (
            `Unknown command: ${specificCommand}. Run 'help' to see available commands.`
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

    // Show primary commands in a flat list matching original style
    const commands = PRIMARY_COMMANDS
      .map((name) => commandRegistry.get(name))
      .filter((cmd): cmd is NonNullable<typeof cmd> => cmd !== undefined);

    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3">
          <div className="text-primary font-bold">Available Commands:</div>
          <div className="grid grid-cols-[120px_1fr] gap-2 text-secondary">
            {commands.map((cmd) => (
              <React.Fragment key={cmd.name}>
                <span className="text-terminal-green">{cmd.name}</span>
                <span>{cmd.description}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="text-muted text-xs mt-3 border-t border-default pt-2 space-y-2">
            <div className="font-bold text-secondary">Keyboard Shortcuts:</div>
            <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-1">
              <span className="text-terminal-green">Tab</span>
              <span>Autocomplete command</span>
              <span className="text-terminal-green">↑/↓</span>
              <span>Navigate command history</span>
              <span className="text-terminal-green">Ctrl+L</span>
              <span>Clear terminal</span>
              <span className="text-terminal-green">Ctrl+C</span>
              <span>Cancel input</span>
              <span className="text-terminal-green">Ctrl+U</span>
              <span>Clear line before cursor</span>
              <span className="text-terminal-green">Ctrl+K</span>
              <span>Clear line after cursor</span>
              <span className="text-terminal-green">Ctrl+A</span>
              <span>Move cursor to start</span>
              <span className="text-terminal-green">Ctrl+E</span>
              <span>Move cursor to end</span>
              <span className="text-terminal-green">Ctrl+W</span>
              <span>Delete word before cursor</span>
              <span className="text-terminal-green">Ctrl+D</span>
              <span>Exit (when empty)</span>
              <span className="text-terminal-green">!!</span>
              <span>Repeat last command</span>
              <span className="text-terminal-green">cd -</span>
              <span>Go to previous directory</span>
            </div>
            <div className="mt-2 italic">Hint: There are hidden commands. Explore.</div>
          </div>
        </div>
      ),
    });

    return { handled: true };
  },
});
