/**
 * Business Commands
 * Core Switchup-specific commands: stack, mission, challenges
 */

import React from 'react';
import { defineCommand } from '../registry';

/**
 * STACK - Tech stack with engineering bets
 */
export const stackCommand = defineCommand({
  name: 'stack',
  aliases: ['tech', 'techstack'],
  description: 'Show tech stack + engineering bets',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">TECH_STACK_V2 :: ENGINEERING BETS</div>
          <div className="text-muted text-xs italic mb-2">"Can I challenge this?" — Yes. Always. That's the point.</div>

          <div>
            <div className="text-primary font-bold">[ORCHESTRATION] Windmill.dev</div>
            <div className="pl-4 text-secondary">Why: Self-hostable, TypeScript-native, built-in secrets</div>
            <div className="pl-4 text-muted text-xs">Alternative: Temporal (beautiful architecture, but we're not Google)</div>
            <div className="pl-4 text-muted text-xs">Current: 247 flows, 12k executions/day</div>
            <div className="pl-4 text-muted text-xs mt-1">Fun fact: We've contributed 3 PRs back to Windmill. Open source is a two-way street.</div>
          </div>

          <div>
            <div className="text-primary font-bold">[DATABASE] Neon (Postgres)</div>
            <div className="pl-4 text-secondary">Why: Serverless Postgres with branching (test schema changes like git!)</div>
            <div className="pl-4 text-muted text-xs">Alternative: Supabase (we needed more control over connection pooling)</div>
            <div className="pl-4 text-muted text-xs">Current: 8ms p95 latency, auto-scales to zero (saving €€€ at 3am)</div>
            <div className="pl-4 text-muted text-xs mt-1">"But why not just Postgres?" — Valid question. Let's argue about it.</div>
          </div>

          <div>
            <div className="text-primary font-bold">[BROWSER] Playwright</div>
            <div className="pl-4 text-secondary">Why: Multi-browser, network interception, stealth mode (shhh)</div>
            <div className="pl-4 text-muted text-xs">Alternative: Puppeteer (we love you, but Microsoft won this round)</div>
            <div className="pl-4 text-muted text-xs">Current: 150+ provider logins/day (yes, we pretend to be users)</div>
            <div className="pl-4 text-muted text-xs mt-1">Challenge: E.ON changed their login flow. We reverse-engineered it in 4 hours.</div>
          </div>

          <div>
            <div className="text-primary font-bold">[INTELLIGENCE] Gemini 3 Ultra / Claude Code</div>
            <div className="pl-4 text-secondary">Why: 1M token context (entire codebases), multi-modal (PDF/Fax parsing)</div>
            <div className="pl-4 text-muted text-xs">Alternative: GPT-4 (rate limits killed us during batch processing)</div>
            <div className="pl-4 text-muted text-xs">Current: 5k docs/day, 99.2% accuracy (better than most humans)</div>
            <div className="pl-4 text-muted text-xs mt-1">We use AI to write code. Yes, really. Claude Code + sub-agents = 3x velocity.</div>
          </div>

          <div>
            <div className="text-primary font-bold">[OBSERVABILITY] Langfuse</div>
            <div className="pl-4 text-secondary">Why: LLM-native tracing, cost tracking, prompt versioning</div>
            <div className="pl-4 text-muted text-xs">Alternative: LangSmith (vendor lock-in scared us)</div>
            <div className="pl-4 text-muted text-xs">Current: 200k LLM calls/week, €2.3k/month spend (we track every penny)</div>
            <div className="pl-4 text-muted text-xs mt-1">Our admins A/B test prompts. Non-technical people debugging AI. Wild.</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            This stack was chosen for <span className="text-primary">velocity</span>, not popularity.<br />
            <span className="text-muted">We optimize for "can we ship this week?" not "will this be on HackerNews?"</span>
          </div>
        </div>
      ),
    });

    return { handled: true };
  },
});

/**
 * MISSION - Company mission and vision
 */
export const missionCommand = defineCommand({
  name: 'mission',
  aliases: ['vision', 'about'],
  description: 'Our vision for the Universal Adapter',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">MISSION :: THE UNIVERSAL ADAPTER</div>
          <div className="text-muted text-xs italic">(aka "Why we exist and why you should care")</div>

          <div>
            <div className="text-primary font-bold">PROBLEM:</div>
            <div className="pl-4 text-muted">Switching subscriptions = 45-90 day bureaucratic nightmares.</div>
            <div className="pl-4 text-muted">Lost paperwork, manual headaches, user frustration.</div>
            <div className="pl-4 text-muted text-xs mt-1">Real user quote: "I'd rather stay with my expensive provider than deal with this again."</div>
          </div>

          <div>
            <div className="text-primary font-bold">ROOT CAUSE:</div>
            <div className="pl-4 text-muted">Every provider = different API, process, legacy system (fax machines in 2025, yes really).</div>
            <div className="pl-4 text-muted">No one has built the abstraction layer. Until now.</div>
            <div className="pl-4 text-muted text-xs mt-1">Fun fact: We reverse-engineered E.ON's portal because their API docs were... creative fiction.</div>
          </div>

          <div>
            <div className="text-primary font-bold">OUR VISION:</div>
            <div className="pl-4 text-muted">Build the "Stripe for Subscriptions".</div>
            <div className="pl-4 text-muted">Universal Adapter: ANY subscription, ANY user, ANY market.</div>
            <div className="pl-4 text-muted text-xs mt-1">ONE codebase. ZERO hardcoded provider logic. Pure abstraction bliss.</div>
          </div>

          <div>
            <div className="text-primary font-bold">CURRENT STATE:</div>
            <div className="pl-4 text-terminal-green">✓ Energy (DE): 15k switches/mo, 7-day avg (down from 45)</div>
            <div className="pl-4 text-terminal-green">✓ E.ON Bot: 98% success (reverse-engineered, battle-tested)</div>
            <div className="pl-4 text-amber-500">⚠ Telco (DE): Pilot, launching Q1 (this is your job)</div>
            <div className="pl-4 text-muted">⏳ Insurance: Scoping (dragons lurk here)</div>
            <div className="pl-4 text-muted">⏳ International: UK energy research (Brexit made this... interesting)</div>
          </div>

          <div>
            <div className="text-primary font-bold">NEXT MILESTONE:</div>
            <div className="pl-4 text-muted">Ship "Vertical-Agnostic" core (Energy + Telco in same system).</div>
            <div className="pl-4 text-muted">Don't build 10 separate bots.</div>
            <div className="pl-4 text-secondary">Build the system that generates the bots.</div>
            <div className="pl-4 text-muted text-xs mt-2">(Meta-engineering. Your favorite kind, right?)</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Honest take: This is hard. We don't have all the answers.<br />
            But we're figuring it out, and we want you in the room when we do.
          </div>
        </div>
      ),
    });

    return { handled: true };
  },
});

/**
 * CHALLENGES - Architectural challenges
 */
export const challengesCommand = defineCommand({
  name: 'challenges',
  aliases: ['problems', 'architecture'],
  description: 'Core architectural problems to solve',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">ARCHITECTURAL CHALLENGES</div>
          <div className="text-muted text-xs italic mb-2">"Your job interview starts here. These are real problems we're solving."</div>

          <div>
            <div className="text-terminal-green font-bold">1. The Universal Adapter</div>
            <div className="pl-4 text-secondary">Moving from "Energy in Germany" to "Any Subscription Across Countries".</div>
            <div className="pl-4 text-muted text-xs">How do we abstract provider logic so the core system is truly agnostic?</div>
            <div className="pl-4 text-muted text-xs">Current approach: Config-driven adapters. Is there a better way?</div>
          </div>

          <div>
            <div className="text-terminal-green font-bold">2. Configurable vs. Robust</div>
            <div className="pl-4 text-secondary">Launch new markets in weeks, not months.</div>
            <div className="pl-4 text-muted text-xs">Challenge: High configurability often means fragility.</div>
            <div className="pl-4 text-muted text-xs">Question: How do we build a system that non-engineers can configure?</div>
          </div>

          <div>
            <div className="text-terminal-green font-bold">3. AI Reliability at Scale</div>
            <div className="pl-4 text-secondary">We process 5k docs/day with 99.2% accuracy.</div>
            <div className="pl-4 text-muted text-xs">But 0.8% of 5k = 40 errors/day that need human review.</div>
            <div className="pl-4 text-muted text-xs">How do we get to 99.9%? Or design systems that gracefully handle errors?</div>
          </div>

          <div>
            <div className="text-terminal-green font-bold">4. Provider API Hell</div>
            <div className="pl-4 text-secondary">Some providers have REST APIs. Some have SOAP. Some have... fax machines.</div>
            <div className="pl-4 text-muted text-xs">E.ON changed their login flow. We reverse-engineered it in 4 hours.</div>
            <div className="pl-4 text-muted text-xs">Question: How do we make this maintainable as we scale to 100+ providers?</div>
          </div>

          <div>
            <div className="text-terminal-green font-bold">5. State Machine Complexity</div>
            <div className="pl-4 text-secondary">A subscription switch can take 7-90 days with dozens of states.</div>
            <div className="pl-4 text-muted text-xs">User cancels. Provider rejects. Documents expire. Deadlines shift.</div>
            <div className="pl-4 text-muted text-xs">How do we model this without spaghetti code?</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Want to solve these with us? Run <span className="text-primary">apply</span><br />
            <span className="text-muted">Spoiler: We don't have all the answers. That's the fun part.</span>
          </div>
        </div>
      ),
    });

    return { handled: true };
  },
});
