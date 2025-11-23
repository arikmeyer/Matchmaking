/**
 * Navigation Commands
 * pwd, cd, ls, cat - filesystem navigation commands
 */

import React from 'react';
import { defineCommand } from '../registry';

/**
 * PWD - Print Working Directory
 */
export const pwdCommand = defineCommand({
  name: 'pwd',
  description: 'Print current working directory',
  category: 'navigation',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: ctx.currentDirectory,
    });
    return { handled: true };
  },
});

/**
 * CD - Change Directory
 */
export const cdCommand = defineCommand({
  name: 'cd',
  description: 'Change current directory',
  usage: 'cd [directory]',
  examples: ['cd', 'cd ..', 'cd flows', 'cd ~/docs', 'cd -'],
  category: 'navigation',

  handler: (parsed, ctx) => {
    const target = parsed.args[0] || '~';

    // Handle cd - (go to previous directory)
    if (target === '-') {
      ctx.addOutput({
        type: 'output',
        content: ctx.previousDirectory,
      });
      ctx.setCurrentDirectory(ctx.previousDirectory);
      return { handled: true };
    }

    // Resolve the path
    const newPath = resolvePath(ctx.currentDirectory, target);

    // Validate the path exists in our virtual filesystem
    if (!isValidPath(newPath)) {
      ctx.addOutput({
        type: 'error',
        content: `cd: ${target}: No such file or directory`,
      });
      return { handled: true };
    }

    // Check if it's a directory
    if (!isDirectory(newPath)) {
      ctx.addOutput({
        type: 'error',
        content: `cd: ${target}: Not a directory`,
      });
      return { handled: true };
    }

    // Update directory (no output on success - standard Unix behavior)
    ctx.setCurrentDirectory(newPath);
    return { handled: true };
  },
});

/**
 * LS - List Directory
 * Shows the enhanced codebase structure
 */
export const lsCommand = defineCommand({
  name: 'ls',
  aliases: ['dir', 'll'],
  description: 'List directory contents',
  usage: 'ls [directory]',
  category: 'navigation',

  handler: (parsed, ctx) => {
    const target = parsed.args[0] || ctx.currentDirectory;
    const path = resolvePath(ctx.currentDirectory, target);

    // Get directory listing based on current path
    const listing = getDirectoryListing(path);

    if (!listing) {
      ctx.addOutput({
        type: 'error',
        content: `ls: ${target}: No such file or directory`,
      });
      return { handled: true };
    }

    ctx.addOutput({
      type: 'output',
      content: listing,
    });

    return { handled: true };
  },
});

/**
 * CAT - View File Contents
 */
export const catCommand = defineCommand({
  name: 'cat',
  aliases: ['type', 'more', 'less'],
  description: 'View file contents',
  usage: 'cat <file>',
  examples: ['cat README.md', 'cat flows/eon-bot.ts'],
  category: 'navigation',

  handler: (parsed, ctx) => {
    const target = parsed.args[0];

    if (!target) {
      ctx.addOutput({
        type: 'error',
        content: 'cat: missing file operand',
      });
      return { handled: true };
    }

    const path = resolvePath(ctx.currentDirectory, target);
    const content = getFileContent(path);

    if (content === null) {
      ctx.addOutput({
        type: 'error',
        content: `cat: ${target}: No such file or directory`,
      });
      return { handled: true };
    }

    if (content === 'DIRECTORY') {
      ctx.addOutput({
        type: 'error',
        content: `cat: ${target}: Is a directory`,
      });
      return { handled: true };
    }

    ctx.addOutput({
      type: 'output',
      content: (
        <pre className="whitespace-pre-wrap font-mono text-sm text-secondary">
          {content}
        </pre>
      ),
    });

    return { handled: true };
  },
});

// ============================================================================
// Virtual Filesystem Helpers
// ============================================================================

const HOME_DIR = '/home/explorer/switchup';

/**
 * Valid paths in our virtual filesystem
 */
const VALID_PATHS = new Set([
  '/',
  '/home',
  '/home/explorer',
  '/home/explorer/switchup',
  HOME_DIR,
  `${HOME_DIR}/flows`,
  `${HOME_DIR}/core`,
  `${HOME_DIR}/monitoring`,
  `${HOME_DIR}/docs`,
]);

/**
 * Directories (as opposed to files)
 */
const DIRECTORIES = new Set([
  '/',
  '/home',
  '/home/explorer',
  '/home/explorer/switchup',
  HOME_DIR,
  `${HOME_DIR}/flows`,
  `${HOME_DIR}/core`,
  `${HOME_DIR}/monitoring`,
  `${HOME_DIR}/docs`,
]);

/**
 * Resolve a path relative to current directory
 */
function resolvePath(current: string, input: string): string {
  // Handle home shortcut
  if (input === '~' || input === '') {
    return HOME_DIR;
  }
  if (input.startsWith('~/')) {
    return HOME_DIR + input.slice(1);
  }

  // Handle absolute path
  if (input.startsWith('/')) {
    return normalizePath(input);
  }

  // Handle relative path
  const combined = current + '/' + input;
  return normalizePath(combined);
}

/**
 * Normalize a path (resolve .., ., remove double slashes)
 */
function normalizePath(path: string): string {
  const parts = path.split('/').filter(Boolean);
  const result: string[] = [];

  for (const part of parts) {
    if (part === '..') {
      result.pop();
    } else if (part !== '.') {
      result.push(part);
    }
  }

  return '/' + result.join('/');
}

/**
 * Check if a path exists
 */
function isValidPath(path: string): boolean {
  // Check exact match first
  if (VALID_PATHS.has(path)) return true;

  // Check if it's a file in a valid directory
  const files = Object.keys(FILE_CONTENTS);
  return files.some((f) => f === path || f.startsWith(path + '/'));
}

/**
 * Check if a path is a directory
 */
function isDirectory(path: string): boolean {
  return DIRECTORIES.has(path);
}

/**
 * Get file content, or null if not found, or 'DIRECTORY' if it's a directory
 */
function getFileContent(path: string): string | null {
  if (DIRECTORIES.has(path)) {
    return 'DIRECTORY';
  }
  return FILE_CONTENTS[path] || null;
}

/**
 * File contents for cat command
 */
const FILE_CONTENTS: Record<string, string> = {
  [`${HOME_DIR}/README.md`]: `# Welcome, Explorer

We're building a Subscription Operating System.
You're exploring whether we'd be a good match. (We're doing the same.)

## Quick Start
- Run \`mission\` to understand WHY / HOW / WHAT
- Run \`architecture\` or \`puzzle\` to see what we're building
- Run \`warts\` to see our honest self-portrait
- Run \`culture\` for mutual discovery (not a test)
- Run \`apply\` if something clicks

## WHY: Marktfairänderung (Market Fairness Transformation)
Why is loyalty punished, not rewarded? We believe markets can be
transformed toward fairness – through technology that shifts power
back to consumers.

## HOW: Freundschaftsprinzip (Friendship Principle)
What would a good friend do? A good friend recommends what's best
for you – even if they don't earn anything.

## WHAT: Never Overcharged Again
Not a switching service. An operating system that monitors, detects,
acts, and protects. Continuously. So you can forget about them.

Questions? future-colleagues@switchup.tech`,

  [`${HOME_DIR}/package.json`]: `{
  "name": "@switchup/core",
  "version": "2.0.0",
  "description": "The Universal Adapter for subscriptions",
  "main": "dist/index.js",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "playwright test",
    "lint": "eslint . --ext .ts,.tsx"
  },
  "dependencies": {
    "react": "^19.0.0",
    "typescript": "^5.6.0",
    "@neondatabase/serverless": "^0.9.0"
  },
  "engines": {
    "node": ">=20.0.0"
  },
  "author": "Switchup Engineering <future-colleagues@switchup.tech>",
  "license": "PROPRIETARY"
}`,

  [`${HOME_DIR}/apply.sh`]: `#!/bin/bash
# Application Script v2.0

echo "Initiating application sequence..."
echo ""
echo "To apply, email: future-colleagues@switchup.tech"
echo ""
echo "Include:"
echo "  - What excites you about Switchup"
echo "  - A project you're proud of"
echo "  - Your GitHub/portfolio (optional but nice)"
echo ""
echo "We read every message. No AI screening."
echo "Real humans, real conversations."
echo ""
echo "See you on the other side."`,

  [`${HOME_DIR}/flows/eon-bot.ts`]: `// Provider portal integration
// When providers don't have APIs, we build our own access

import { Playwright } from 'playwright';
import { Windmill } from '@windmill/sdk';

export async function connectToProvider(credentials: Credentials) {
  // Many providers use multi-step auth with dynamic tokens
  // We reverse-engineer their flows and make them reliable

  const browser = await Playwright.chromium.launch();
  // ... battle-tested automation code

  // The bet: Self-healing scripts
  // Playwright captures failures → AI analyzes → suggests fixes
  // We're experimenting with autonomous repair. It's working.
}

// Designed for 100+ provider portals. Run 'apply' to help build it`,

  [`${HOME_DIR}/flows/subscription-switch.ts`]: `// Core subscription switching flow
// This is what we do all day

import { WindmillFlow } from '@windmill/sdk';
import { UniversalAdapter } from '../core/adapter';

export const switchSubscription = new WindmillFlow({
  name: 'subscription-switch',
  description: 'Orchestrates end-to-end subscription switching',

  steps: [
    // Step 1: Validate the switch request
    async (ctx) => {
      const { fromProvider, toProvider, userId } = ctx.input;
      await validateProviders(fromProvider, toProvider);
      await checkUserEligibility(userId);
    },

    // Step 2: Fetch current subscription details
    async (ctx) => {
      const adapter = new UniversalAdapter(ctx.input.fromProvider);
      ctx.currentSubscription = await adapter.fetchDetails();
    },

    // Step 3: Generate switching instructions
    async (ctx) => {
      // AI-powered matching to find best new plan
      const match = await findBestMatch(ctx.currentSubscription);
      ctx.recommendation = match;
    },

    // Step 4: Execute the switch
    async (ctx) => {
      // This is where the magic happens
      // One API call, regardless of provider complexity
      await executeSwitch(ctx);
    }
  ]
});

// Want to work on this? Run 'apply'`,

  [`${HOME_DIR}/flows/telco-adapter.ts`]: `// Telco Adapter - WIP
// Status: Your playground

import { ProviderConfig } from '../core/adapter';

export const TELCO_CONFIG: ProviderConfig = {
  id: 'telco-de',
  name: 'German Telecom Providers',
  category: 'telecom',
  apiType: 'mixed', // Some REST, some scraping

  // Challenge: Telco providers are even worse than energy
  // - Longer contract lock-ins
  // - More complex plan structures
  // - Porting numbers is a bureaucratic nightmare

  // Your mission (should you choose to accept it):
  // Make this work as seamlessly as our energy vertical
};

// This file is waiting for you. Run 'apply'`,

  [`${HOME_DIR}/core/universal-adapter.ts`]: `// The Universal Adapter - heart of our system

export class UniversalAdapter {
  private provider: Provider;
  private config: ProviderConfig;

  constructor(providerId: string) {
    this.config = loadProviderConfig(providerId);
    this.provider = createProvider(this.config);
  }

  // One interface, any provider
  async fetchDetails(): Promise<SubscriptionDetails> {
    const raw = await this.provider.fetch();
    return this.config.transformers.planToUniversal(raw);
  }

  async initiateSwitch(params: SwitchParams): Promise<SwitchResult> {
    // Handle the complexity so users don't have to
    const validated = await this.validateSwitch(params);
    const prepared = await this.prepareSwitch(validated);
    return await this.executeSwitch(prepared);
  }

  // The hard part: handling edge cases
  // - Provider APIs go down
  // - Data formats change without notice
  // - Rate limits vary wildly
  // - Some "APIs" are actually screen scraping
  //
  // We make it all look the same to our clients.
  // That's the value we provide.
}

// Status: NEEDS WORK (this is your job)
// Run 'mission' for context`,

  [`${HOME_DIR}/core/matching.ts`]: `// AI-powered subscription matching

import { Gemini } from '@google/generative-ai';
import { Langfuse } from 'langfuse';

// We use AI where it adds real value:
// - Understanding user preferences from natural language
// - Matching complex plan features across domains
// - Predicting satisfaction with recommendations

export async function findBestMatch(
  currentSubscription: SubscriptionDetails,
  userPreferences?: string
): Promise<MatchResult> {

  // Track everything for continuous improvement
  const trace = langfuse.trace({ name: 'subscription-match' });

  const analysis = await gemini.generate({
    prompt: buildMatchingPrompt(currentSubscription, userPreferences),
    temperature: 0.3, // We want consistency
  });

  trace.score({ name: 'confidence', value: analysis.confidence });

  return {
    recommendations: analysis.matches,
    reasoning: analysis.explanation,
    confidence: analysis.confidence
  };
}

// The bet: AI craft matters
// We experiment with prompting techniques, share what works.
// Langfuse gives us observability into every decision.`,

  [`${HOME_DIR}/monitoring/langfuse-traces.ts`]: `// We believe in radical observability

import { Langfuse } from 'langfuse';

// Every AI call is traced
// Every decision is logged
// Every outcome is measured

export const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
});

// Why this matters:
// - Debug AI behavior in production
// - Identify prompt improvements
// - Measure actual business impact
// - Build trust with users

// The bet: AI craft matters
// - Prompting techniques, sub-agent architectures, context patterns
// - When someone discovers what works (or fails), we share it
// - We track everything to learn faster

// "If you can't measure it, you can't improve it"
// We take this seriously.`,

  [`${HOME_DIR}/monitoring/alerting.ts`]: `// Alerting configuration
// Because 3am pages are no fun

import { SlackWebhook } from '@slack/webhook';

export const alertConfig = {
  channels: {
    critical: '#alerts-critical',
    warnings: '#alerts-warnings',
    aiOps: '#ai-observability',
  },

  thresholds: {
    errorRate: 0.05,      // 5% error rate triggers alert
    latencyP95: 5000,     // 5s p95 latency
    aiConfidence: 0.7,    // Low confidence AI decisions
  },

  // We're a small team - smart alerting matters
  // No alert fatigue, only actionable notifications
};`,

  [`${HOME_DIR}/docs/culture.md`]: `# Team Setup at Switchup

## Small by Design
We choose to stay smallish – a closely knit team of talented people
who trust each other deeply. No silos. No politics. High context.

## Problem Space Ownership
You don't hand off tickets. You own problem spaces end-to-end.
Not "I'm a developer" but "I own this domain."
From grasping the problem to shipping solutions to measuring impact.

## You as AI Orchestrator
Each of us acts as an AI orchestrator for our problem spaces.
Your job is to direct AI capabilities toward solving problems.
AI executes at scale. You provide judgment and direction.

## Our Beliefs

### Small Team Belief
A small team can flip entire markets – if energy is channeled
correctly. AI changes the math. What once required hundreds
can now be done by a focused few.

### Learning Belief
Build to learn, not to prove we're right. Everything is a
hypothesis until the data says otherwise. Fast loops. Share
what works AND what fails. Change direction when evidence
says we're wrong.

### AI Trust Gradient
- Level 1: AI as Tool (human decides, AI executes)
- Level 2: AI as Assistant (AI suggests, human approves)
- Level 3: AI as Copilot (AI handles routine, humans handle exceptions)
- Level 4: AI as Colleague (future – we're experimenting)

Curious if we'd click? Run 'culture' for mutual discovery.`,

  [`${HOME_DIR}/docs/architecture.md`]: `# Switchup Architecture

## Three-Layer Model

┌─────────────────────────────────────────────────────┐
│         PROCESS ORCHESTRATOR (/case)                │
│   Coordinates the story. Runs Flows & Playbooks.    │
│   ⚡ Golden Rule: ONLY layer that orchestrates      │
└─────────────────────┬───────────────────────────────┘
                      │ coordinates
                      ▼
┌─────────────────────────────────────────────────────┐
│           CAPABILITY DOMAINS                         │
│  /offer     - Models the market                     │
│  /optimisation - Finds best choices                 │
│  /provider  - Talks to provider APIs                │
│  /service   - User communication                    │
│  /growth    - Acquires users                        │
│   ⚡ Golden Rule: Never orchestrate. Specialize.    │
└─────────────────────┬───────────────────────────────┘
                      │ queries for truth
                      ▼
┌─────────────────────────────────────────────────────┐
│      SYSTEM OF RECORD (/lifecycle)                  │
│  Contracts, Users, Tasks. Single source of truth.   │
│  Validates operations. Enforces business rules.     │
│   ⚡ Golden Rule: Calls NO ONE. Everyone calls it.  │
└─────────────────────────────────────────────────────┘

## Why This Architecture?

This separation enables progressive AI autonomy:
- AI can orchestrate while constrained by golden rules
- Safe operations through the System of Record
- Well-defined tools through Capability Domains
- Business rules encoded in operations, not scattered

## Domain-Driven Design

Each domain owns its vocabulary. "Contract" in /lifecycle
is different from "Contract" in /provider.
Bounded contexts prevent chaos from leaking across boundaries.`,

  [`${HOME_DIR}/docs/failures.md`]: `# Things That Didn't Work
(And what we learned)

## 1. The GraphQL Experiment (Q2 2024)
**What we tried:** Migrate to GraphQL for flexibility
**What happened:** Over-engineering for our use case
**Lesson:** REST is fine. Don't fix what ain't broke.

## 2. The Microservices Phase (Q1 2024)
**What we tried:** Split into 12 microservices
**What happened:** Debugging became a nightmare
**Lesson:** Monolith first. Split when you feel the pain.

## 3. The Self-Hosted Kubernetes (Q4 2023)
**What we tried:** Full K8s cluster for "scalability"
**What happened:** 80% of time on infra, 20% on product
**Lesson:** Use managed services. Focus on the product.

## 4. The "Perfect API" (Q3 2023)
**What we tried:** Design the perfect provider API spec
**What happened:** Real providers don't follow specs
**Lesson:** Embrace the mess. Build adapters.

---

We share this because:
- Failures are learning opportunities
- Transparency builds trust
- You'll make different mistakes, and that's okay`,

  [`${HOME_DIR}/.env`]: `# Nice try!

# But seriously, we don't commit secrets.
# Ask us about our security practices when we chat.

DATABASE_URL=postgresql://[REDACTED]
API_KEY=[REDACTED]
SECRET_SAUCE=[DEFINITELY_REDACTED]

# Run 'stack' to see what we actually use`,
};

/**
 * Get directory listing for ls command
 */
function getDirectoryListing(path: string): React.ReactNode | null {
  if (!isValidPath(path) && !DIRECTORIES.has(path)) {
    return null;
  }

  // If it's a file (not a directory), just show the filename
  if (isValidPath(path) && !isDirectory(path)) {
    const filename = path.split('/').pop() || path;
    return (
      <div className="font-mono text-sm text-primary">
        {filename}
      </div>
    );
  }

  // For now, return the enhanced listing for the main directory
  // This can be extended to show different listings per directory
  if (path === HOME_DIR || path === `${HOME_DIR}/`) {
    return (
      <div className="font-mono text-sm space-y-1">
        <div className="text-muted mb-2">total 14 files (problem spaces expanding daily)</div>
        <div className="text-muted">drwxr-xr-x  .git/                    (experiments in progress)</div>
        <div className="text-secondary">-rw-r--r--  README.md                2.3kb   "WHY / HOW / WHAT"</div>
        <div className="text-secondary">-rw-r--r--  package.json             1.8kb   Dependencies & scripts</div>
        <div className="text-terminal-green">-rwxr-xr-x  apply.sh                 127b    Your future starts here</div>
        <div className="text-muted mt-2">drwxr-xr-x  flows/</div>
        <div className="text-secondary pl-4">-rw-r--r--  eon-bot.ts               4.2kb   Provider portal automation</div>
        <div className="text-secondary pl-4">-rw-r--r--  subscription-switch.ts   3.2kb   Core switching flow</div>
        <div className="text-muted pl-4">-rw-r--r--  telco-adapter.ts         2.8kb   WIP: Your playground</div>
        <div className="text-muted mt-2">drwxr-xr-x  core/</div>
        <div className="text-section-problem pl-4">-rw-r--r--  universal-adapter.ts     BROKEN  This is your job</div>
        <div className="text-secondary pl-4">-rw-r--r--  matching.ts              2.9kb   AI-powered matching</div>
        <div className="text-muted mt-2">drwxr-xr-x  monitoring/</div>
        <div className="text-secondary pl-4">-rw-r--r--  langfuse-traces.ts       1.6kb   LLM observability</div>
        <div className="text-secondary pl-4">-rw-r--r--  alerting.ts              892b    Smart alerting</div>
        <div className="text-muted mt-2">drwxr-xr-x  docs/</div>
        <div className="text-secondary pl-4">-rw-r--r--  architecture.md          3.1kb   Three-layer model</div>
        <div className="text-secondary pl-4">-rw-r--r--  culture.md               2.4kb   Team setup & beliefs</div>
        <div className="text-secondary pl-4">-rw-r--r--  failures.md              3.8kb   Things that didn't work</div>
        <div className="text-muted mt-2">-rw-r--r--  .env                       REDACTED (nice try)</div>
        <div className="text-muted text-xs mt-2">
          Hint: Try <span className="text-terminal-green">cat README.md</span> or <span className="text-terminal-green">cat docs/architecture.md</span>
        </div>
      </div>
    );
  }

  // Subdirectory listings
  if (path === `${HOME_DIR}/flows`) {
    return (
      <div className="font-mono text-sm space-y-1">
        <div className="text-muted mb-2">total 3 files</div>
        <div className="text-secondary">-rw-r--r--  eon-bot.ts               4.2kb   Provider portal automation</div>
        <div className="text-secondary">-rw-r--r--  subscription-switch.ts   3.2kb   Core switching flow</div>
        <div className="text-muted">-rw-r--r--  telco-adapter.ts         2.8kb   WIP: Your playground</div>
      </div>
    );
  }

  if (path === `${HOME_DIR}/core`) {
    return (
      <div className="font-mono text-sm space-y-1">
        <div className="text-muted mb-2">total 2 files</div>
        <div className="text-section-problem">-rw-r--r--  universal-adapter.ts   BROKEN  This is your job</div>
        <div className="text-secondary">-rw-r--r--  matching.ts            2.9kb   AI-powered matching</div>
      </div>
    );
  }

  if (path === `${HOME_DIR}/monitoring`) {
    return (
      <div className="font-mono text-sm space-y-1">
        <div className="text-muted mb-2">total 2 files</div>
        <div className="text-secondary">-rw-r--r--  langfuse-traces.ts   1.6kb   LLM observability</div>
        <div className="text-secondary">-rw-r--r--  alerting.ts          892b    Slack webhooks</div>
      </div>
    );
  }

  if (path === `${HOME_DIR}/docs`) {
    return (
      <div className="font-mono text-sm space-y-1">
        <div className="text-muted mb-2">total 3 files</div>
        <div className="text-secondary">-rw-r--r--  architecture.md   3.1kb   Three-layer model</div>
        <div className="text-secondary">-rw-r--r--  culture.md        2.4kb   Team setup & beliefs</div>
        <div className="text-secondary">-rw-r--r--  failures.md       3.8kb   Things that didn't work</div>
      </div>
    );
  }

  // Generic empty directory
  return (
    <div className="font-mono text-sm text-muted">
      total 0
    </div>
  );
}

/**
 * Get path completions for tab completion
 * Returns array of matching paths/files
 */
export function getPathCompletions(currentDirectory: string, partial: string): string[] {
  // Resolve the partial path to get the directory we're completing in
  let basePath: string;
  let prefix: string;

  if (!partial) {
    // No partial - list current directory contents
    basePath = currentDirectory;
    prefix = '';
  } else if (partial.endsWith('/')) {
    // Partial ends with / - list that directory's contents
    basePath = resolvePath(currentDirectory, partial);
    prefix = partial;
  } else {
    // Partial is incomplete - find parent directory and filter
    const lastSlash = partial.lastIndexOf('/');
    if (lastSlash === -1) {
      // No slash - completing in current directory
      basePath = currentDirectory;
      prefix = '';
    } else {
      // Has slash - complete in that directory
      basePath = resolvePath(currentDirectory, partial.slice(0, lastSlash + 1));
      prefix = partial.slice(0, lastSlash + 1);
    }
  }

  // Get the partial filename to match
  const partialName = partial.slice(prefix.length).toLowerCase();

  // Collect all items in basePath
  const completions: string[] = [];

  // Add directories
  for (const dir of DIRECTORIES) {
    if (dir.startsWith(basePath + '/') && !dir.slice(basePath.length + 1).includes('/')) {
      const name = dir.slice(basePath.length + 1);
      if (name.toLowerCase().startsWith(partialName)) {
        completions.push(prefix + name + '/');
      }
    }
  }

  // Add files
  for (const filePath of Object.keys(FILE_CONTENTS)) {
    if (filePath.startsWith(basePath + '/') && !filePath.slice(basePath.length + 1).includes('/')) {
      const name = filePath.slice(basePath.length + 1);
      if (name.toLowerCase().startsWith(partialName)) {
        completions.push(prefix + name);
      }
    }
  }

  return completions.sort();
}

// Export path helpers for use by other commands
export { resolvePath, isValidPath, isDirectory, HOME_DIR };
