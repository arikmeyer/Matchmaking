/**
 * Business Commands
 * Core Switchup content: philosophy, architecture, team, stack
 * Tone: Clever, honest, tongue-in-cheek. Mutual matchmaking, not one-sided evaluation.
 */

import React from 'react';
import { defineCommand } from '../registry';

// ============================================================================
// PHILOSOPHY (The Soul)
// ============================================================================

/**
 * WHY - Marktfairänderung
 */
export const whyCommand = defineCommand({
  name: 'why',
  description: 'WHY we exist: Marktfairänderung',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">WHY :: MARKTFAIRÄNDERUNG</div>
          <div className="text-muted text-xs italic">(German. Roughly: "market fairness transformation")</div>

          <div className="text-secondary">
            Why is loyalty punished, not rewarded?
          </div>

          <div className="space-y-2 text-muted text-xs">
            <p>Today's subscription markets are designed to exploit inattention.</p>
            <p>Price increases slip through. Auto-renewals at inflated rates. Complexity engineered to discourage switching.</p>
            <p>Providers don't compete on value. They compete on who can be forgotten the longest.</p>
          </div>

          <div className="text-terminal-green text-xs mt-2">
            We believe this can change.
          </div>

          <div className="text-muted text-xs">
            When millions have a system watching their subscriptions, the "laziness bet" stops working.
            Providers must compete on actual value. Fair treatment becomes the winning strategy.
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Big claim? Yes. Naive? Maybe. Worth pursuing? We think so.<br />
            Run <span className="text-terminal-green">how</span> to see how we approach this. Run <span className="text-terminal-green">what</span> to see what we're building.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * HOW - Freundschaftsprinzip
 */
export const howCommand = defineCommand({
  name: 'how',
  description: 'HOW we operate: Freundschaftsprinzip',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">HOW :: FREUNDSCHAFTSPRINZIP</div>
          <div className="text-muted text-xs italic">(German. "The friendship principle")</div>

          <div className="text-secondary">
            What would a good friend do?
          </div>

          <div className="space-y-2 text-muted text-xs">
            <p>A typical company: "Here's what earns us the most commission."</p>
            <p>A good friend: "Here's what's best for you – even if we earn nothing."</p>
          </div>

          <div className="text-muted text-xs mt-2">
            This question guides every decision. Product features. Business model. How we talk to users.
          </div>

          <div className="text-section-focus text-xs mt-2">
            It's harder than it sounds.
          </div>

          <div className="text-muted text-xs">
            Sometimes the "friend" answer conflicts with short-term revenue.
            We're trying to build a company where that's okay.
            Still figuring out how to make it sustainable.
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Run <span className="text-terminal-green">why</span> to see why we care. Run <span className="text-terminal-green">what</span> to see what we're building.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * WHAT - Subscription Operating System
 */
export const whatCommand = defineCommand({
  name: 'what',
  description: 'WHAT we\'re building: Subscription Operating System',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">WHAT :: SUBSCRIPTION OPERATING SYSTEM</div>
          <div className="text-muted text-xs italic">(Not a comparison site. Not a switching service. An operating system.)</div>

          <div className="text-secondary">
            Never overcharged again.
          </div>

          <div className="space-y-2 text-muted text-xs">
            <p>You have subscriptions. Energy, internet, insurance, streaming, whatever.</p>
            <p>You don't want to think about them. But someone should be watching.</p>
            <p>That's us. We monitor → detect → act → protect. Continuously.</p>
          </div>

          <div className="text-primary font-bold text-xs mt-3">THE PUZZLE GAME</div>
          <div className="text-muted text-xs">
            Each subscription is a puzzle game we play on your behalf.<br />
            Events arrive like puzzle pieces: price increases, renewals, policy changes.<br />
            For each piece: identify it, run the right workflow, take the best action.<br />
            <span className="text-secondary">We're playing hundreds of thousands of these games simultaneously.</span>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Run <span className="text-terminal-green">puzzle</span> to understand the problem deeper.
            Run <span className="text-terminal-green">architecture</span> to see how we're building this.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * MISSION - Combined philosophy overview (alias for discoverability)
 */
export const missionCommand = defineCommand({
  name: 'mission',
  aliases: ['philosophy', 'vision', 'about'],
  description: 'Our philosophy: WHY / HOW / WHAT',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">PHILOSOPHY :: WHY / HOW / WHAT</div>
          <div className="text-muted text-xs italic mb-2">(We start with WHY – it's the reason we exist)</div>

          <div>
            <div className="text-primary font-bold">WHY: Marktfairänderung</div>
            <div className="pl-4 text-secondary text-xs">Markets should reward value, not exploit inattention.</div>
            <div className="pl-4 text-muted text-xs">Run <span className="text-terminal-green">why</span> for the full story.</div>
          </div>

          <div>
            <div className="text-primary font-bold">HOW: Freundschaftsprinzip</div>
            <div className="pl-4 text-secondary text-xs">What would a good friend do?</div>
            <div className="pl-4 text-muted text-xs">Run <span className="text-terminal-green">how</span> for the full story.</div>
          </div>

          <div>
            <div className="text-primary font-bold">WHAT: Subscription Operating System</div>
            <div className="pl-4 text-secondary text-xs">Never overcharged again.</div>
            <div className="pl-4 text-muted text-xs">Run <span className="text-terminal-green">what</span> for the full story.</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Yes, we use German words. We're based in Germany. Deal with it.<br />
            Run <span className="text-terminal-green">beliefs</span> to see what we think is true (but might be wrong).
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

// ============================================================================
// BELIEFS & TEAM (The Heart)
// ============================================================================

/**
 * BELIEFS - Our four beliefs
 */
export const beliefsCommand = defineCommand({
  name: 'beliefs',
  description: 'What we think is true (but might be wrong)',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">BELIEFS :: THINGS WE HOLD TRUE</div>
          <div className="text-muted text-xs italic mb-2">(Until evidence says otherwise. We change our minds.)</div>

          <div>
            <div className="text-primary font-bold">1. MARKET BELIEF</div>
            <div className="pl-4 text-secondary text-xs">Markets CAN be transformed. The "laziness bet" doesn't have to win.</div>
            <div className="pl-4 text-muted text-xs">Technology can shift power back to consumers. Not through regulation. Through capability.</div>
          </div>

          <div>
            <div className="text-primary font-bold">2. SMALL TEAM BELIEF</div>
            <div className="pl-4 text-secondary text-xs">AI changes the math. What once took hundreds can be done by a focused few.</div>
            <div className="pl-4 text-muted text-xs">We choose to stay small. Not because we can't grow. Because we don't want to.</div>
            <div className="pl-4 text-muted text-xs">Small = high trust, no politics.</div>
          </div>

          <div>
            <div className="text-primary font-bold">3. LEARNING BELIEF</div>
            <div className="pl-4 text-secondary text-xs">Build to learn, not to prove we're right.</div>
            <div className="pl-4 text-muted text-xs">Everything is a hypothesis until the data disagrees.</div>
            <div className="pl-4 text-muted text-xs">Share what works AND what fails spectacularly. Both are valuable.</div>
          </div>

          <div>
            <div className="text-primary font-bold">4. INSPIRATION BELIEF</div>
            <div className="pl-4 text-secondary text-xs">Work should matter. Life's too short for "just a job."</div>
            <div className="pl-4 text-muted text-xs">We're not building the next ad platform. We're trying to make markets fairer.</div>
            <div className="pl-4 text-muted text-xs">That either resonates with you or it doesn't. Both are fine.</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            These beliefs might be wrong. We're open to being convinced otherwise.<br />
            Run <span className="text-terminal-green">warts</span> to see what we're NOT good at.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * TEAM - How we're organized
 */
export const teamCommand = defineCommand({
  name: 'team',
  aliases: ['setup', 'org'],
  description: 'How we work: Small by design',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">TEAM :: SMALL BY DESIGN</div>
          <div className="text-muted text-xs italic mb-2">(Not "lean startup." Just... smallish. With conscious focus on problem space owners that have high impact.)</div>

          <div>
            <div className="text-secondary font-bold">PROBLEM SPACE OWNERSHIP</div>
            <div className="pl-4 text-muted text-xs">You don't hand off tickets. You own problem spaces end-to-end.</div>
            <div className="pl-4 text-muted text-xs">Not "I'm a developer" but "I own this problem domain."</div>
            <div className="pl-4 text-muted text-xs">From grasping the problem → shipping solutions → measuring impact.</div>
          </div>

          <div>
            <div className="text-secondary font-bold">YOU AS AI ORCHESTRATOR</div>
            <div className="pl-4 text-muted text-xs">Each of us acts as an AI orchestrator for our problem spaces.</div>
            <div className="pl-4 text-muted text-xs">Your job: understand deeply, define outcomes, direct AI to execute, verify results.</div>
            <div className="pl-4 text-muted text-xs">AI's job: execute at scale, handle repetition, process chaos.</div>
          </div>

          <div>
            <div className="text-secondary font-bold">META SKILLS {">"} TECHNICAL SKILLS</div>
            <div className="pl-4 text-muted text-xs">• Problem grasping: quickly understand what's actually going on</div>
            <div className="pl-4 text-muted text-xs">• Outcome definition: articulate what success looks like</div>
            <div className="pl-4 text-muted text-xs">• Path evaluation: see multiple routes, choose wisely</div>
            <div className="pl-4 text-muted text-xs">Technical skills matter, but understanding how to solve a problem domain holistically matters most.</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Run <span className="text-terminal-green">evolution</span> to see how we think about AI collaboration.
            Run <span className="text-terminal-green">warts</span> to see the downsides of working this way.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * EVOLUTION - AI Trust Gradient
 */
export const evolutionCommand = defineCommand({
  name: 'evolution',
  aliases: ['ai', 'trust', 'gradient'],
  description: 'How AI collaboration evolves: Trust Gradient',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">EVOLUTION :: AI TRUST GRADIENT</div>
          <div className="text-muted text-xs italic mb-2">(How we think human-AI collaboration changes over time)</div>

          <div className="space-y-2">
            <div>
              <div className="text-muted font-bold">Level 1: AI as Tool</div>
              <div className="pl-4 text-muted text-xs">Human decides everything. AI executes instructions.</div>
              <div className="pl-4 text-muted text-xs italic">"Write me a function that does X."</div>
            </div>

            <div>
              <div className="text-secondary font-bold">Level 2: AI as Assistant</div>
              <div className="pl-4 text-muted text-xs">AI suggests. Human approves.</div>
              <div className="pl-4 text-muted text-xs italic">"What's the best way to solve this?"</div>
            </div>

            <div>
              <div className="text-primary font-bold">Level 3: AI as Copilot ← We're mostly here</div>
              <div className="pl-4 text-muted text-xs">AI handles routine. Humans handle exceptions.</div>
              <div className="pl-4 text-muted text-xs italic">"Monitor this, escalate if something looks wrong."</div>
            </div>

            <div>
              <div className="text-primary font-bold">Level 4: AI as Colleague ← Experimenting</div>
              <div className="pl-4 text-muted text-xs">AI owns problem spaces. Humans provide judgment and direction.</div>
              <div className="pl-4 text-muted text-xs italic">"Here's the goal. Figure out how to get there."</div>
            </div>
          </div>

          <div className="text-muted text-xs mt-3">
            We're somewhere between 2 and 3. Experimenting with 4.<br />
            This either excites you or terrifies you. Both are valid responses.
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            We talk to AI models more than humans some days. That's either your jam or a red flag.<br />
            Run <span className="text-terminal-green">stack</span> to see what we're actually using.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * WARTS - Honest self-portrait
 */
export const wartsCommand = defineCommand({
  name: 'warts',
  aliases: ['honest', 'downsides', 'cons'],
  description: 'Things we\'re still figuring out (honest self-portrait)',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">WARTS :: HONEST SELF-PORTRAIT</div>
          <div className="text-muted text-xs italic mb-2">(Because you're evaluating us too. Here's the real story.)</div>

          <div className="space-y-2 text-muted text-xs">
            <div>
              <span className="text-muted">▸</span> <span className="text-secondary">We're small.</span> Sometimes that means agile. Sometimes it means "wait, who owns this again?"
            </div>

            <div>
              <span className="text-muted">▸</span> <span className="text-secondary">We change our minds.</span> When evidence says we should. If you need stability and certainty, we're probably not it.
            </div>

            <div>
              <span className="text-muted">▸</span> <span className="text-secondary">We use AI for everything.</span> Like, everything. Some people find this exciting. Others find it unsettling. Know which one you are.
            </div>

            <div>
              <span className="text-muted">▸</span> <span className="text-secondary">Small teams move fast.</span> Nobody will tap your shoulder when you're stuck. You need to ask. Loudly. Proactive communication is non-negotiable.
            </div>

            <div>
              <span className="text-muted">▸</span> <span className="text-secondary">No PMs. No detailed specs.</span> You'll define your own problems. That's either freedom or terror.
            </div>

            <div>
              <span className="text-muted">▸</span> <span className="text-secondary">We're building hypotheses.</span> Not proven systems. Most of what we believe might be wrong.
            </div>

          </div>

          <div className="text-secondary text-xs mt-3">
            Still here? Interesting.
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            This isn't reverse psychology. These are real trade-offs.<br />
            Run <span className="text-terminal-green">match</span> to explore if we're right for each other.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

// ============================================================================
// ARCHITECTURE (The Brain)
// ============================================================================

/**
 * PUZZLE - The problem we're solving
 */
export const puzzleCommand = defineCommand({
  name: 'puzzle',
  aliases: ['problem', 'challenge'],
  description: 'The problem: Subscriptions as puzzle games',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">PUZZLE :: THE PROBLEM WE'RE SOLVING</div>
          <div className="text-muted text-xs italic mb-2">(Why this is hard. Why we find it interesting.)</div>

          <div>
            <div className="text-secondary font-bold">THE PUZZLE GAME METAPHOR</div>
            <div className="pl-4 text-muted text-xs">Each subscription is a puzzle game we play on behalf of a user.</div>
            <div className="pl-4 text-muted text-xs">Events arrive like puzzle pieces: price changes, renewals, policy updates, provider communications.</div>
            <div className="pl-4 text-muted text-xs">For each piece: identify what it is, determine the right response, execute the best action.</div>
          </div>

          <div>
            <div className="text-secondary font-bold">THE SCALE CHALLENGE</div>
            <div className="pl-4 text-muted text-xs">We're playing hundreds of thousands of these games simultaneously.</div>
            <div className="pl-4 text-muted text-xs">Each game has different rules (providers), different states (user situations), different timelines.</div>
            <div className="pl-4 text-muted text-xs">A human could play one game well. We need to play all of them.</div>
          </div>

          <div>
            <div className="text-secondary font-bold">THE CHAOS PROBLEM</div>
            <div className="pl-4 text-muted text-xs">Provider data is unstructured. PDFs, emails, portal scraping, API responses (when we're lucky).</div>
            <div className="pl-4 text-muted text-xs">Formats change without warning. "APIs" are sometimes fax machines. Yes, really.</div>
            <div className="pl-4 text-muted text-xs">Making sense of chaos at scale is the core technical challenge.</div>
          </div>

          <div>
            <div className="text-secondary font-bold">WHY AI MATTERS</div>
            <div className="pl-4 text-muted text-xs">This is fundamentally an AI problem. Not because it's trendy.</div>
            <div className="pl-4 text-muted text-xs">Because making sense of unstructured data at scale is what AI is good at.</div>
            <div className="pl-4 text-muted text-xs">We're not adding AI to a product. AI IS the product.</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Run <span className="text-terminal-green">architecture</span> to see our hypothesis for solving this.
            Run <span className="text-terminal-green">domains</span> to see the specific problem spaces.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * ARCHITECTURE - Three-layer model
 */
export const architectureCommand = defineCommand({
  name: 'architecture',
  aliases: ['arch', 'system', 'layers'],
  description: 'Our hypothesis: Three-layer architecture',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">ARCHITECTURE :: THREE-LAYER MODEL</div>
          <div className="text-muted text-xs italic mb-2">(Our hypothesis for organizing complexity. Challenge it.)</div>

          <div>
            <div className="text-primary font-bold">LAYER 1: Process Orchestrator (/case)</div>
            <div className="pl-4 text-secondary text-xs">Coordinates the story without doing specialized work.</div>
            <div className="pl-4 text-muted text-xs">Runs Flows and Playbooks. Knows the narrative, not the details.</div>
            <div className="pl-4 text-muted text-xs">Golden rule: ONLY layer allowed to coordinate across domains.</div>
          </div>

          <div>
            <div className="text-primary font-bold">LAYER 2: Capability Domains</div>
            <div className="pl-4 text-secondary text-xs">Stateless. Specialized. Independent. Each owns one thing well.</div>
            <div className="pl-4 text-muted text-xs">
              /offer (market models) · /optimisation (best choices) · /provider (external APIs)<br />
              /service (user communication) · /growth (user acquisition)
            </div>
            <div className="pl-4 text-muted text-xs">Golden rule: Never orchestrate. Only specialize.</div>
          </div>

          <div>
            <div className="text-primary font-bold">LAYER 3: System of Record (/lifecycle)</div>
            <div className="pl-4 text-secondary text-xs">Single source of truth. Contracts, Users, Tasks.</div>
            <div className="pl-4 text-muted text-xs">Validates operations. Enforces business rules. The arbiter of reality.</div>
            <div className="pl-4 text-muted text-xs">Golden rule: Calls NO ONE. Everyone calls it for the truth.</div>
          </div>

          <div>
            <div className="text-primary font-bold">WHY THIS SEPARATION?</div>
            <div className="pl-4 text-muted text-xs">Enables progressive AI autonomy:</div>
            <div className="pl-4 text-muted text-xs">• AI can orchestrate (Layer 1) while constrained by golden rules</div>
            <div className="pl-4 text-muted text-xs">• Safe operations through System of Record (Layer 3)</div>
            <div className="pl-4 text-muted text-xs">• Well-defined tools through Capability Domains (Layer 2)</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            This is a hypothesis, not gospel. We're building to learn if it works.<br />
            Run <span className="text-terminal-green">domains</span> to explore the 21 problem spaces across 7 domains.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * DOMAINS - The 7 domains overview
 */
export const domainsCommand = defineCommand({
  name: 'domains',
  aliases: ['ddd', 'bounded'],
  description: 'The 7 domains and 21 problem spaces',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">DOMAINS :: 7 DOMAINS, 21 PROBLEM SPACES</div>
          <div className="text-muted text-xs italic mb-2">(Domain-Driven Design. Each domain owns its vocabulary.)</div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <div>
              <span className="text-terminal-green font-bold">/case</span>
              <span className="text-muted"> (Orchestrator)</span>
              <div className="pl-4 text-muted">Event Monitoring · Workflow Orchestration · Task Management</div>
            </div>

            <div>
              <span className="text-terminal-green font-bold">/offer</span>
              <span className="text-muted"> (Capability)</span>
              <div className="pl-4 text-muted">Offer Modelling · Normalisation · Matching</div>
            </div>

            <div>
              <span className="text-terminal-green font-bold">/optimisation</span>
              <span className="text-muted"> (Capability)</span>
              <div className="pl-4 text-muted">Optimal Offer Selection · Switch Decision Assessment</div>
            </div>

            <div>
              <span className="text-terminal-green font-bold">/provider</span>
              <span className="text-muted"> (Capability)</span>
              <div className="pl-4 text-muted">Provider Configuration · API/Bot Automation · Data Extraction</div>
            </div>

            <div>
              <span className="text-terminal-green font-bold">/service</span>
              <span className="text-muted"> (Capability)</span>
              <div className="pl-4 text-muted">Self-Servicing · Service Interactions</div>
            </div>

            <div>
              <span className="text-terminal-green font-bold">/growth</span>
              <span className="text-muted"> (Capability)</span>
              <div className="pl-4 text-muted">Expert Guidance · User Onboarding</div>
            </div>

            <div>
              <span className="text-terminal-green font-bold">/lifecycle</span>
              <span className="text-muted"> (System of Record)</span>
              <div className="pl-4 text-muted">State Integrity · Business Intent Catalog · Temporal Projections</div>
            </div>
          </div>

          <div className="text-muted text-xs mt-3">
            <span className="text-secondary">Bounded Contexts:</span> "Contract" in /lifecycle ≠ "Contract" in /provider.<br />
            Each domain owns its vocabulary. Context prevents chaos from leaking.
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Explore these in detail in the System Architecture Explorer (the other window).<br />
            Run <span className="text-terminal-green">architecture</span> to see how these layers connect.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

// Keep challenges as an alias pointing to architecture for backwards compatibility
export const challengesCommand = defineCommand({
  name: 'challenges',
  description: 'Alias for architecture (backwards compatibility)',
  category: 'info',
  hidden: true,

  handler: (parsed, ctx) => {
    // Just call architecture
    return architectureCommand.handler(parsed, ctx);
  },
});

/**
 * ROLE - Role Convergence / Product Engineering
 */
export const roleCommand = defineCommand({
  name: 'role',
  aliases: ['convergence', 'product-engineer', 'pe'],
  description: 'Role Convergence: Product Engineering',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">ROLE :: PRODUCT ENGINEERING</div>
          <div className="text-muted text-xs italic mb-2">(The barriers are dissolving. We're figuring out what comes next.)</div>

          <div className="text-secondary text-xs">
            Traditional silos: Product • Engineering • Design
          </div>

          <div className="text-muted text-xs mt-2">
            As AI shifts the bottleneck from "how to build" to "what to build" – these roles converge.
          </div>

          <div className="mt-3 p-3 border border-default rounded">
            <div className="text-center text-primary font-bold mb-2">PRODUCT ENGINEERING</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="text-primary font-bold">Define 'What'</div>
                <div className="text-muted text-[10px]">Own the vision</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold">Design 'How'</div>
                <div className="text-muted text-[10px]">Shape experience</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold">Orchestrate</div>
                <div className="text-muted text-[10px]">Direct AI to build</div>
              </div>
            </div>
          </div>

          <div className="text-muted text-xs mt-3">
            STATUS: ACTIVE_EXPERIMENTATION
          </div>

          <div className="text-muted text-xs">
            We don't know exactly what this role becomes. We're discovering it together.
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            Run <span className="text-terminal-green">team</span> to see how we organize.
            Run <span className="text-terminal-green">evolution</span> to see how AI collaboration works.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

// ============================================================================
// TOOLS (The Hands)
// ============================================================================

/**
 * STACK - Tech stack with engineering bets
 */
export const stackCommand = defineCommand({
  name: 'stack',
  aliases: ['tech', 'techstack', 'bets'],
  description: 'Engineering bets: What we use and why',
  category: 'info',

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">STACK :: ENGINEERING BETS</div>
          <div className="text-muted text-xs italic mb-2">("Can I challenge this?" – Yes. Always. That's the point.)</div>

          <div>
            <div className="text-primary font-bold">[CORE] Windmill.dev</div>
            <div className="pl-4 text-secondary text-xs">Workflow engine. Portal integrations, service classification, order automation.</div>
            <div className="pl-4 text-muted text-xs">Bet: Self-hostable + script-based = no vendor lock-in. Open question: organizing hundreds of flows?</div>
          </div>

          <div>
            <div className="text-primary font-bold">[CORE] TypeScript + ZOD</div>
            <div className="pl-4 text-secondary text-xs">Schema-driven development. Every provider response validated at runtime.</div>
            <div className="pl-4 text-muted text-xs">Bet: TypeScript catches compile errors, ZOD catches runtime chaos from providers.</div>
          </div>

          <div>
            <div className="text-primary font-bold">[CORE] Playwright</div>
            <div className="pl-4 text-secondary text-xs">Browser automation. For when providers don't have APIs (most of them).</div>
            <div className="pl-4 text-muted text-xs">Bet: AI self-healing scripts. Playwright fails → AI analyzes → generates fix → commits for review.</div>
          </div>

          <div>
            <div className="text-primary font-bold">[CORE] Multi-Model AI</div>
            <div className="pl-4 text-secondary text-xs">Gemini, Claude, specialized sub-agents, Langfuse for observability.</div>
            <div className="pl-4 text-muted text-xs">Bet: AI craft matters. Prompting techniques, context engineering, agent architectures.</div>
          </div>

          <div>
            <div className="text-secondary font-bold">[EXPLORING] Neon DB</div>
            <div className="pl-4 text-secondary text-xs">Serverless Postgres. Branch-per-feature for schema evolution.</div>
            <div className="pl-4 text-muted text-xs">Bet: Test schema changes like git branches. Still validating this approach.</div>
          </div>

          <div>
            <div className="text-secondary font-bold">[EXPLORING] Vision Pipeline</div>
            <div className="pl-4 text-secondary text-xs">Vision models extracting structured data from provider PDFs.</div>
            <div className="pl-4 text-muted text-xs">Bet: Custom schemas per doc type vs. generic? Exploring hybrid approaches.</div>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2">
            <span className="text-primary">[CORE]</span> = battle-tested.{' '}
            <span className="text-secondary">[EXPLORING]</span> = hypothesis under investigation.<br />
            Run <span className="text-terminal-green">evolution</span> to see how we think about AI collaboration.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});
