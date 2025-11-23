/**
 * Action Commands
 * Commands that trigger actions: apply, theme, exit
 */

import React from 'react';
import { defineCommand } from '../registry';
import type { TerminalTheme } from '../../types';

/**
 * APPLY - Start a conversation about working together
 */
export const applyCommand = defineCommand({
  name: 'apply',
  aliases: ['./apply.sh', 'join'],
  description: 'Start a conversation',
  category: 'action',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <span className="text-terminal-green">
          Initiating application protocol...
        </span>
      ),
    });

    // Open the application modal after a brief delay
    if (ctx.openApplication) {
      ctx.setTimeout(() => {
        ctx.openApplication?.();
      }, 500);
    } else {
      // Fallback if modal not available
      ctx.addOutput({
        type: 'output',
        content: (
          <a
            href="mailto:future-colleagues@switchup.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary text-terminal-green"
          >
            Click here to email future-colleagues@switchup.tech
          </a>
        ),
      });
    }

    return { handled: true };
  },
});

/**
 * THEME - Theme switching
 */
export const themeCommand = defineCommand({
  name: 'theme',
  description: 'Switch visual theme (matrix/cyberpunk/light/default)',
  usage: 'theme [name]',
  examples: ['theme', 'theme matrix', 'theme cyberpunk', 'theme light', 'theme default'],
  category: 'theme',

  handler: (parsed, ctx) => {
    const themeName = parsed.args[0]?.toLowerCase();

    // No argument - show available themes
    if (!themeName) {
      ctx.addOutput({
        type: 'output',
        content: (
          <div className="space-y-2">
            <div className="text-primary font-bold">Available Themes:</div>
            <div className="space-y-1 text-sm">
              <div className="text-secondary">
                • <span className="text-terminal-green">theme matrix</span> - Matrix-inspired green glow + CRT effect
              </div>
              <div className="text-secondary">
                • <span className="text-terminal-green">theme cyberpunk</span> - Magenta/purple futuristic aesthetic
              </div>
              <div className="text-secondary">
                • <span className="text-terminal-green">theme light</span> - Light mode (accessibility)
              </div>
              <div className="text-secondary">
                • <span className="text-terminal-green">theme default</span> - Terminal green classic
              </div>
            </div>
          </div>
        ),
      });
      return { handled: true };
    }

    // Validate theme name
    const validThemes: TerminalTheme[] = ['matrix', 'cyberpunk', 'light', 'default'];
    if (!validThemes.includes(themeName as TerminalTheme)) {
      ctx.addOutput({
        type: 'error',
        content: `Unknown theme: ${themeName}. Available: ${validThemes.join(', ')}`,
      });
      return { handled: true };
    }

    // Apply theme
    const crtEnabled = themeName === 'matrix';

    if (ctx.onThemeChange) {
      ctx.onThemeChange(themeName as TerminalTheme, crtEnabled);
    }

    ctx.addOutput({
      type: 'output',
      content: (
        <div className="text-terminal-green">
          Theme switched to: <span className="text-primary font-bold">{themeName.toUpperCase()}</span>
          {crtEnabled && <span className="text-muted text-xs ml-2">(CRT mode enabled)</span>}
        </div>
      ),
    });

    return { handled: true };
  },
});

/**
 * EXIT - Shutdown sequence
 */
export const exitCommand = defineCommand({
  name: 'exit',
  aliases: ['quit', 'logout', 'bye'],
  description: 'Exit terminal',
  category: 'action',

  handler: (_parsed, ctx) => {
    // Don't exit if quiz is active (quiz handles its own exit)
    if (ctx.quiz?.isActive) {
      return { handled: false }; // Let quiz handle exit
    }

    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-2">
          <div className="text-red-400 font-bold">INITIATING SHUTDOWN SEQUENCE...</div>
          <div className="text-muted text-xs">Disconnecting neural links...</div>
          <div className="text-muted text-xs">Saving session state...</div>
          <div className="text-amber-500 text-xs">Warning: Unsaved explorations will be lost.</div>
          <div className="text-terminal-green mt-2">See you on the inside.</div>
        </div>
      ),
    });

    // Trigger parent shutdown after delay
    if (ctx.onExit) {
      ctx.setTimeout(() => {
        ctx.onExit?.();
      }, 2000);
    }

    return { handled: true, preventHistoryUpdate: true };
  },
});
