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
  USER: 'candidate',
  HOME: '/home/candidate',
  PWD: '/home/candidate/switchup',
  SHELL: '/bin/bash',
  TERM: 'xterm-256color',
  LANG: 'en_US.UTF-8',

  // Company values as env vars
  COMPANY: 'Switchup',
  MISSION: 'The Universal Adapter for subscriptions',
  TEAM_SIZE: 'Small but mighty',
  STAGE: 'Series A',
  LOCATION: 'Remote-first (EU timezone friendly)',

  // Tech stack
  TECH_STACK: 'React,TypeScript,Neon,Windmill,Langfuse',
  NODE_VERSION: '20.x',
  DATABASE: 'PostgreSQL (Neon)',

  // Culture
  CULTURE: 'High ownership, low ego',
  MEETINGS: 'Minimal',
  DOCS: 'Extensive',
  DEPLOY_FREQUENCY: 'Multiple times daily',

  // Easter egg hints
  PATH: '/usr/local/bin:/usr/bin:/bin:/home/candidate/.cargo/bin',
  SECRET_COMMAND: 'Try running "konami" or "42"',
  HIRING_STATUS: 'ACTIVELY_RECRUITING',
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
        <pre className="whitespace-pre-wrap font-mono text-sm text-terminal-green">
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
 * Full detailed output matching original implementation
 */
export const whoamiCommand = defineCommand({
  name: 'whoami',
  description: 'Your profile + permissions',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="font-mono text-sm space-y-2">
          <div className="text-secondary">USER: guest@switchup.tech</div>
          <div className="text-secondary">ROLE: Potential Product Engineer</div>
          <div className="text-secondary">STATUS: Evaluating cultural fit...</div>
          <div className="text-muted text-xs">SESSION_START: {new Date().toISOString()}</div>

          <div className="mt-3 border-t border-default pt-2">
            <div className="text-primary font-bold mb-1">PERMISSIONS:</div>
            <div className="pl-4 text-terminal-green">✓ Read job description</div>
            <div className="pl-4 text-terminal-green">✓ Explore tech stack</div>
            <div className="pl-4 text-terminal-green">✓ Run culture diagnostic</div>
            <div className="pl-4 text-terminal-green">✓ Challenge our bets</div>
            <div className="pl-4 text-red-400">✗ Access production</div>
            <div className="pl-4 text-red-400">✗ Merge to main</div>
          </div>

          <div className="mt-3 border-t border-default pt-2">
            <div className="text-primary font-bold mb-1">MATCH PROFILE:</div>
            <div className="pl-4 text-secondary mb-2">Core traits we're looking for:</div>

            <div className="pl-4 text-secondary text-xs font-bold mt-2">1. Deep Engineering + Builder DNA</div>
            <div className="pl-6 text-muted text-xs">You've seen failures. You learn from them. Others learn from you.</div>

            <div className="pl-4 text-secondary text-xs font-bold mt-2">2. AI Mastery (The Multiplier)</div>
            <div className="pl-6 text-muted text-xs">You're genuinely excited about AI as a force multiplier, not a buzzword.</div>
            <div className="pl-6 text-muted text-xs">You know how to engineer the right context for AI, design agent workflows, debug LLM failures.</div>
            <div className="pl-6 text-muted text-xs">You experiment with new models in your spare time because you can't help yourself.</div>

            <div className="pl-4 text-secondary text-xs font-bold mt-2">3. Positive Can-Do Mindset</div>
            <div className="pl-6 text-muted text-xs">"How can we make this work?" not "Why this won't work."</div>
            <div className="pl-6 text-muted text-xs">Blockers are puzzles to solve, not excuses to wait.</div>

            <div className="pl-4 text-secondary text-xs font-bold mt-2">4. Mission-Driven Impact</div>
            <div className="pl-6 text-muted text-xs">You care deeply about making a real difference in people's lives.</div>
            <div className="pl-6 text-muted text-xs">Our North Star: Building lifelong relationships with our users.</div>
            <div className="pl-6 text-muted text-xs">Current stat: Near-zero churn (despite our product's imperfections).</div>

            <div className="pl-4 text-red-400 mt-3 mb-2">Not a match if you're:</div>
            <div className="pl-6 text-muted text-xs">• Someone who needs detailed specs</div>
            <div className="pl-6 text-muted text-xs">• A "that's not my job" person</div>
            <div className="pl-6 text-muted text-xs">• Skeptical of AI or treating it as hype</div>
            <div className="pl-6 text-muted text-xs">• Optimizing for resume bullets over growth & learning</div>

            <div className="pl-4 text-secondary mt-3 mb-1 text-xs font-bold">You might be our person if:</div>
            <div className="pl-6 text-muted text-xs mt-1">✓ You've "gone rogue" to ship value at a previous job</div>
            <div className="pl-6 text-muted text-xs mt-1">✓ You've reverse-engineered a vendor's undocumented API</div>
            <div className="pl-6 text-muted text-xs mt-1">✓ You care more about impact than code purity</div>
            <div className="pl-6 text-muted text-xs mt-1">✓ You're building AI side projects because it's genuinely fun</div>
            <div className="pl-6 text-muted text-xs mt-1">✓ You want to wake up knowing your work matters to real people</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Run 'culture' to see if we're a match. (Spoiler: It's harder than LeetCode, but more fun.)
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
      content: ` ${currentTime} up ${days} days, 47 providers, load average: high-growth, seeking-talent, building-future`,
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
      content: 'switchup-recruitment-terminal',
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
