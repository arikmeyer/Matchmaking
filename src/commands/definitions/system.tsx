/**
 * System Commands
 * echo, date, history, env, clear, whoami
 */

import React from 'react';
import { defineCommand } from '../registry';
import { joinArgs } from '../parser';

/**
 * Environment variables for the virtual system
 */
const ENV_VARIABLES: Record<string, string> = {
  USER: 'explorer',
  HOME: '/home/explorer',
  PWD: '/home/explorer/switchup',
  SHELL: '/bin/bash',
  TERM: 'xterm-256color',
  LANG: 'en_US.UTF-8',

  // Philosophy (WHY/HOW/WHAT)
  COMPANY: 'Switchup',
  WHY: 'Marktfairänderung (Market Fairness Transformation)',
  HOW: 'Freundschaftsprinzip (What would a good friend do?)',
  WHAT: 'Subscription Operating System',
  TEAM_SIZE: 'Small by design (high trust, no silos)',
  LOCATION: 'Berlin HQ @ Maybachufer (flexible setup)',

  // Tech stack (CORE + EXPLORING)
  TECH_STACK: 'Windmill,TypeScript+ZOD,Playwright,Gemini,Claude,Langfuse',
  DATABASE: 'Neon (EXPLORING)',
  NODE_VERSION: '20.x',

  // Culture
  CULTURE: 'Problem space ownership, build to learn',
  ROLE_MODEL: 'AI Orchestrator (you direct AI, AI executes)',
  MEETINGS: 'Minimal',
  DEPLOY_FREQUENCY: 'Multiple times daily',

  // Easter egg hints
  PATH: '/usr/local/bin:/usr/bin:/bin:/home/explorer/.cargo/bin',
  SECRET_COMMAND: 'Try running "konami" or "42"',
  MATCHMAKING_MODE: 'MUTUAL_DISCOVERY',
};

/**
 * ECHO - Print text
 */
export const echoCommand = defineCommand({
  name: 'echo',
  description: 'Print text to terminal',
  usage: 'echo [text]',
  examples: ['echo Hello', 'echo $USER', 'echo $COMPANY'],
  category: 'system',

  handler: (parsed, ctx) => {
    let text = joinArgs(parsed.args);

    // Expand environment variables
    text = text.replace(/\$(\w+)/g, (_match, varName) => {
      return ENV_VARIABLES[varName] || `$${varName}`;
    });

    ctx.addOutput({
      type: 'output',
      content: text || '',
    });

    return { handled: true };
  },
});

/**
 * DATE - Show current date/time
 */
export const dateCommand = defineCommand({
  name: 'date',
  description: 'Display current date and time',
  category: 'system',

  handler: (_parsed, ctx) => {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      year: 'numeric',
    });

    ctx.addOutput({
      type: 'output',
      content: `${formatted}`,
    });

    return { handled: true };
  },
});

/**
 * HISTORY - Show command history
 */
export const historyCommand = defineCommand({
  name: 'history',
  description: 'Show command history',
  category: 'system',

  handler: (_parsed, ctx) => {
    const commandHistory = ctx.history
      .filter((line) => line.type === 'input')
      .map((line, idx) => `  ${String(idx + 1).padStart(4)}  ${line.content}`);

    if (commandHistory.length === 0) {
      ctx.addOutput({
        type: 'output',
        content: 'No commands in history',
      });
    } else {
      ctx.addOutput({
        type: 'output',
        content: (
          <div className="space-y-2">
            <pre className="font-mono text-sm text-secondary">
              {commandHistory.join('\n')}
            </pre>
            <div className="text-muted text-xs border-t border-default pt-2">
              Tip: Use <span className="text-terminal-green">!!</span> to repeat the last command,
              or <span className="text-terminal-green">↑/↓</span> arrows to navigate history.
            </div>
          </div>
        ),
      });
    }

    return { handled: true };
  },
});

/**
 * ENV - Show environment variables
 */
export const envCommand = defineCommand({
  name: 'env',
  aliases: ['printenv'],
  description: 'Display environment variables',
  category: 'system',

  handler: (_parsed, ctx) => {
    const envOutput = Object.entries(ENV_VARIABLES)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    ctx.addOutput({
      type: 'output',
      content: (
        <pre className="whitespace-pre-wrap break-all font-mono text-sm text-terminal-green">
          {envOutput}
        </pre>
      ),
    });

    return { handled: true };
  },
});

/**
 * CLEAR - Clear terminal history
 */
export const clearCommand = defineCommand({
  name: 'clear',
  aliases: ['cls'],
  description: 'Clear terminal history',
  category: 'system',

  handler: (_parsed, ctx) => {
    ctx.clearHistory();
    return { handled: true, preventHistoryUpdate: true };
  },
});

/**
 * WHOAMI - Show current user info
 * Mutual matchmaking framing - you're evaluating us too
 */
export const whoamiCommand = defineCommand({
  name: 'whoami',
  description: 'Your explorer profile',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="font-mono text-sm space-y-2">
          <div className="text-cyan-400 font-bold border-b border-default pb-1">WHOAMI :: EXPLORER PROFILE</div>
          <div className="text-muted text-xs italic mb-2">(We're both figuring out if this makes sense. No pressure.)</div>

          <div className="space-y-1">
            <div className="text-secondary">USER: explorer@switchup.tech</div>
            <div className="text-secondary">ROLE: Potential Problem Space Owner</div>
            <div className="text-secondary">MODE: Mutual Discovery</div>
            <div className="text-muted text-xs">SESSION: {new Date().toISOString()}</div>
          </div>

          <div className="mt-3 border-t border-default pt-2">
            <div className="text-cyan-400 font-bold mb-1">WHAT YOU'RE EXPLORING:</div>
            <div className="pl-4 text-terminal-green text-xs">✓ Our architecture (is this sane?)</div>
            <div className="pl-4 text-terminal-green text-xs">✓ Our bets (would you make the same ones?)</div>
            <div className="pl-4 text-terminal-green text-xs">✓ Our warts (we have them, see 'warts')</div>
            <div className="pl-4 text-terminal-green text-xs">✓ Our team (would you enjoy working with us?)</div>
          </div>

          <div className="mt-3 border-t border-default pt-2">
            <div className="text-cyan-400 font-bold mb-1">WHAT WE'RE EXPLORING:</div>
            <div className="pl-4 text-amber-400 text-xs">◇ Your meta skills (how you think)</div>
            <div className="pl-4 text-amber-400 text-xs">◇ Your AI craft (how you work with AI)</div>
            <div className="pl-4 text-amber-400 text-xs">◇ Your builder DNA (how you ship)</div>
            <div className="pl-4 text-amber-400 text-xs">◇ Your mission resonance (does our "why" matter to you?)</div>
          </div>

          <div className="mt-3 border-t border-default pt-2">
            <div className="text-cyan-400 font-bold mb-1">MUTUAL FIT SIGNALS:</div>

            <div className="pl-4 text-secondary text-xs font-bold mt-2">You might love it here if:</div>
            <div className="pl-6 text-muted text-xs">• You already tinker with AI outside of work</div>
            <div className="pl-6 text-muted text-xs">• "That's not my job" makes you cringe</div>
            <div className="pl-6 text-muted text-xs">• You'd rather own outcomes than execute tasks</div>
            <div className="pl-6 text-muted text-xs">• Small team agility sounds exciting, not scary</div>

            <div className="pl-4 text-secondary text-xs font-bold mt-2">You might not love it here if:</div>
            <div className="pl-6 text-muted text-xs">• You prefer detailed specs before starting</div>
            <div className="pl-6 text-muted text-xs">• AI feels like hype to you (we're all-in)</div>
            <div className="pl-6 text-muted text-xs">• You optimize for resume polish over learning</div>
            <div className="pl-6 text-muted text-xs">• "Move fast" sounds exhausting, not energizing</div>
          </div>

          <div className="mt-3 border-t border-default pt-2 text-muted text-xs">
            <span className="text-cyan-400">Explore:</span> 'mission' 'team' 'warts' 'culture' – then decide if you want to 'apply'
          </div>
        </div>
      ),
    });

    return { handled: true };
  },
});

/**
 * UPTIME - Show system uptime
 */
export const uptimeCommand = defineCommand({
  name: 'uptime',
  description: 'Show system uptime',
  category: 'system',
  hidden: true,

  handler: (_parsed, ctx) => {
    // Calculate days since "founding"
    const foundingDate = new Date('2023-01-01');
    const now = new Date();
    const days = Math.floor(
      (now.getTime() - foundingDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const currentTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    ctx.addOutput({
      type: 'output',
      content: ` ${currentTime} up ${days} days, 7 domains, 21 problem spaces, load average: building-to-learn, exploring-together, transforming-markets`,
    });

    return { handled: true };
  },
});

/**
 * HOSTNAME - Show system hostname
 */
export const hostnameCommand = defineCommand({
  name: 'hostname',
  description: 'Show system hostname',
  category: 'system',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: 'switchup-matchmaking-terminal',
    });
    return { handled: true };
  },
});

/**
 * UNAME - Show system information
 */
export const unameCommand = defineCommand({
  name: 'uname',
  description: 'Show system information',
  category: 'system',
  hidden: true,

  handler: (parsed, ctx) => {
    const showAll = parsed.flags['a'] || parsed.flags['all'];

    if (showAll) {
      ctx.addOutput({
        type: 'output',
        content:
          'SwitchupOS 2024.1 switchup-terminal 6.5.0-switchup #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
      });
    } else {
      ctx.addOutput({
        type: 'output',
        content: 'SwitchupOS',
      });
    }

    return { handled: true };
  },
});

// Export ENV_VARIABLES for use by other modules
export { ENV_VARIABLES };
