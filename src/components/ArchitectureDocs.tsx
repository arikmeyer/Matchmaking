/**
 * Architecture Documentation Components
 * Content components for the System Architecture Explorer doc pages.
 *
 * These present our architectural hypotheses and experiments - framed as
 * questions we're exploring, not certainties we've proven.
 */

import { motion } from 'framer-motion';
import {
    Database, TrendingUp, GitPullRequest, Server, User,
    HelpCircle, Layers, Brain, Users, Bot,
    ArrowRight, Lightbulb, Target, Shield, Zap,
    Globe, Heart, AlertTriangle, Sparkles
} from 'lucide-react';

/**
 * Core Challenge - The operational scalability problem
 */
export const ChallengeContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            Each subscription we manage is like a <strong>game of puzzle</strong>—and we're playing hundreds of thousands of these games simultaneously.
        </p>

        {/* The Puzzle Metaphor */}
        <div className="p-6 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">The Puzzle Game</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-sm text-secondary">
                        Over the lifecycle of a subscription, <strong>events arrive like puzzle pieces</strong>: a price increase notification, a contract renewal, a provider policy change, a user request.
                    </p>
                    <p className="text-sm text-secondary">
                        For each piece, we face a <strong>dual challenge</strong>:
                    </p>
                    <div className="space-y-2">
                        <div className="p-3 rounded bg-nested border border-border">
                            <div className="text-xs font-medium text-primary">1. Identify the piece</div>
                            <div className="text-[10px] text-secondary">What IS this? A price increase? A cancellation? Marketing noise?</div>
                        </div>
                        <div className="p-3 rounded bg-nested border border-border">
                            <div className="text-xs font-medium text-primary">2. Run the right workflow</div>
                            <div className="text-[10px] text-secondary">Extract data, compare options, calculate the best action, notify the user, execute.</div>
                        </div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-nested-deep border border-border">
                        <div className="text-xs font-mono text-muted mb-2">CURRENT SCALE</div>
                        <div className="text-2xl font-bold text-primary">100k+</div>
                        <div className="text-[10px] text-secondary">concurrent puzzle games</div>
                    </div>
                    <div className="p-4 rounded-lg bg-nested-deep border border-border">
                        <div className="text-xs font-mono text-muted mb-2">THE AMBITION</div>
                        <div className="text-2xl font-bold text-primary">Millions</div>
                        <div className="text-[10px] text-secondary">played simultaneously, reliably</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Concrete Example */}
        <div className="p-6 rounded-xl bg-section-process border border-section-process">
            <h4 className="text-sm font-bold text-section-focus mb-4">Example: A Price Increase Arrives</h4>
            <p className="text-xs text-secondary mb-4">
                An email lands. Somewhere in the text is a price increase notification. Here's what needs to happen:
            </p>
            <div className="flex flex-wrap gap-2 items-center text-[10px]">
                <div className="px-2 py-1 rounded bg-nested-deep border border-border text-primary">Identify event</div>
                <ArrowRight size={12} className="text-muted" />
                <div className="px-2 py-1 rounded bg-nested-deep border border-border text-primary">Extract price data</div>
                <ArrowRight size={12} className="text-muted" />
                <div className="px-2 py-1 rounded bg-nested-deep border border-border text-primary">Fetch available offers</div>
                <ArrowRight size={12} className="text-muted" />
                <div className="px-2 py-1 rounded bg-nested-deep border border-border text-primary">Compare against new price</div>
                <ArrowRight size={12} className="text-muted" />
                <div className="px-2 py-1 rounded bg-nested-deep border border-border text-primary">Factor user preferences</div>
                <ArrowRight size={12} className="text-muted" />
                <div className="px-2 py-1 rounded bg-nested-deep border border-border text-primary">Calculate best action</div>
                <ArrowRight size={12} className="text-muted" />
                <div className="px-2 py-1 rounded bg-nested-deep border border-border text-primary">Notify user</div>
                <ArrowRight size={12} className="text-muted" />
                <div className="px-2 py-1 rounded bg-nested-deep border border-border text-primary">Initiate optimisation</div>
            </div>
            <p className="text-[10px] text-muted mt-4 italic">
                Now imagine this workflow running correctly for thousands of price increases arriving every day, each with different formats, providers, and user contexts.
            </p>
        </div>

        {/* Why This Is Hard */}
        <div className="p-6 rounded-xl bg-section-problem border border-section-problem">
            <h4 className="text-sm font-bold text-section-problem mb-4 flex items-center gap-2">
                <HelpCircle size={16} /> Why This Is Uniquely Hard
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-1">Unstructured Data at the Core</div>
                    <div className="text-[10px] text-secondary">The puzzle pieces arrive as emails, PDFs, portal screenshots—not clean API responses. Messy human communication, not structured data.</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-1">Every Game Has Different Rules</div>
                    <div className="text-[10px] text-secondary">Each provider has quirks. Each user has preferences. What's "optimal" depends on context that changes constantly.</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-1">Pieces Arrive Unpredictably</div>
                    <div className="text-[10px] text-secondary">You can't batch-process puzzle games. Events arrive when they arrive—price increases at month-end, renewals on anniversaries.</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-1">Errors Compound</div>
                    <div className="text-[10px] text-secondary">Misidentify one piece, run the wrong workflow—the user gets bad advice. At scale, small error rates become large problems.</div>
                </div>
            </div>
        </div>

        {/* The Human Goal */}
        <div className="p-6 rounded-xl bg-section-success border border-section-success">
            <h4 className="text-sm font-bold text-section-success mb-4 flex items-center gap-2">
                <Users size={16} /> The Human Goal
            </h4>
            <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                    <p className="text-sm text-secondary">
                        Our service colleagues shouldn't be <strong>puzzle processors</strong>—they should be <strong>relationship builders</strong>.
                    </p>
                    <p className="text-xs text-secondary">
                        The repetitive work of identifying events and executing workflows is exactly what should be automated. Humans excel at what machines can't do: empathy, complex judgment, building trust.
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border text-center">
                    <div className="text-xs font-mono text-section-success mb-2">THE PURPOSE</div>
                    <p className="text-sm text-primary italic">
                        "Free our colleagues to focus on what matters most: building trust-based relationships with our users—for life."
                    </p>
                </div>
            </div>
        </div>

        {/* The Hypothesis */}
        <div className="p-6 rounded-xl bg-section-planning border border-section-planning">
            <h4 className="text-sm font-bold text-section-planning mb-4 flex items-center gap-2">
                <Lightbulb size={16} /> Our Hypothesis
            </h4>
            <div className="space-y-4">
                <p className="text-sm text-secondary">
                    We believe <strong>AI can play the puzzle games</strong>—identifying events in unstructured data, orchestrating the right workflows—while humans supervise and handle what machines can't.
                </p>
                <p className="text-sm text-secondary">
                    This is why <strong>architecture matters</strong>. The system needs to be structured so AI can operate safely at scale: clear boundaries, constrained operations, human oversight where it counts.
                </p>
                <p className="text-xs text-muted italic">
                    We don't know if this works yet. That's why we're building to learn—measuring outcomes, expanding scope gradually, always keeping humans in the loop.
                </p>
            </div>
        </div>
    </div>
);

/**
 * Target State - The vision of a subscription operating system and market transformation
 */
export const TargetStateContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            Our vision: a <strong>Subscription Operating System</strong> that protects users at the micro level—and transforms markets at the macro level.
        </p>

        {/* The OS Concept */}
        <div className="p-6 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">The Subscription Operating System</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-sm text-secondary">
                        Not a switching service. Not an app. An <strong>operating system</strong> for all your subscriptions—running quietly in the background, managing complexity so you don't have to.
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-secondary">
                            <Globe size={14} className="text-secondary shrink-0" />
                            <span><strong className="text-primary">Provider-agnostic:</strong> Works with any provider, anywhere</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-secondary">
                            <Layers size={14} className="text-secondary shrink-0" />
                            <span><strong className="text-primary">Market-agnostic:</strong> Energy, telco, insurance, streaming—all subscriptions</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-secondary">
                            <Zap size={14} className="text-secondary shrink-0" />
                            <span><strong className="text-primary">Autonomous:</strong> Acts on your behalf within the bounds you set</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-xs font-mono text-muted mb-3">USER EXPERIENCE</div>
                    <div className="space-y-2 text-[10px] text-secondary">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-current text-secondary"></div>
                            <span>Notifies you when it matters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-current text-secondary"></div>
                            <span>Quiet when it doesn't</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-current text-secondary"></div>
                            <span>Takes action automatically</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-current text-secondary"></div>
                            <span>Reports back on what it did</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Micro Level */}
        <div className="p-6 rounded-xl bg-section-success border border-section-success">
            <h4 className="text-sm font-bold text-section-success mb-4 flex items-center gap-2">
                <Shield size={16} /> Micro Level: The User Promise
            </h4>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-nested-deep border border-border text-center">
                    <div className="text-2xl mb-2">🛡️</div>
                    <div className="text-sm font-medium text-primary mb-1">Never Overcharged</div>
                    <div className="text-[10px] text-secondary">Price increases detected and addressed before they hurt you</div>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border text-center">
                    <div className="text-2xl mb-2">⚖️</div>
                    <div className="text-sm font-medium text-primary mb-1">Always Treated Fairly</div>
                    <div className="text-[10px] text-secondary">Loyalty penalties eliminated, best rates maintained continuously</div>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border text-center">
                    <div className="text-2xl mb-2">🧘</div>
                    <div className="text-sm font-medium text-primary mb-1">Peace of Mind</div>
                    <div className="text-[10px] text-secondary">Subscriptions managed, complexity handled, noise reduced</div>
                </div>
            </div>
            <div className="p-3 rounded bg-nested border border-border">
                <p className="text-xs text-secondary text-center italic">
                    "You set the goals and constraints. The OS handles the rest—optimizing continuously, acting when needed, always on your side."
                </p>
            </div>
        </div>

        {/* Macro Level - The Dysfunction */}
        <div className="p-6 rounded-xl bg-section-problem border border-section-problem">
            <h4 className="text-sm font-bold text-section-problem mb-4 flex items-center gap-2">
                <AlertTriangle size={16} /> Macro Level: The Market Dysfunction
            </h4>
            <p className="text-sm text-secondary mb-4">
                Today's subscription markets are built on a perverse incentive: <strong>providers profit from customer inattention</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-nested-deep border border-border h-full">
                    <div className="text-xs font-mono text-section-problem mb-3">THE LAZINESS BET</div>
                    <ul className="space-y-2 text-[10px] text-secondary">
                        <li className="flex gap-2">
                            <span className="text-section-problem">•</span>
                            Price increases that slip by unnoticed
                        </li>
                        <li className="flex gap-2">
                            <span className="text-section-problem">•</span>
                            Auto-renewals at inflated rates
                        </li>
                        <li className="flex gap-2">
                            <span className="text-section-problem">•</span>
                            Loyalty penalties for staying customers
                        </li>
                        <li className="flex gap-2">
                            <span className="text-section-problem">•</span>
                            Complexity designed to discourage switching
                        </li>
                    </ul>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border h-full flex flex-col justify-between">
                    <div className="text-center mb-3">
                        <div className="text-xs font-mono text-muted uppercase">Current Equilibrium</div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div className="text-center flex-1">
                            <div className="text-sm font-medium text-section-problem">Provider Wins</div>
                            <div className="text-[10px] text-secondary">when you don't pay attention</div>
                        </div>
                        <div className="text-section-process/50">⟷</div>
                        <div className="text-center flex-1">
                            <div className="text-sm font-medium text-section-problem">You Lose</div>
                            <div className="text-[10px] text-secondary">by being busy with life</div>
                        </div>
                    </div>
                    <div className="text-center mt-3 text-[10px] text-muted italic">
                        A market where exploitation is rewarded
                    </div>
                </div>
            </div>
        </div>

        {/* The Transformation */}
        <div className="p-6 rounded-xl bg-section-focus border border-section-focus">
            <h4 className="text-sm font-bold text-section-focus mb-4 flex items-center gap-2">
                <Heart size={16} /> The Transformation: Marktfairänderung
            </h4>
            <div className="space-y-4 mb-6">
                <p className="text-sm text-secondary">
                    When millions of users have an operating system watching their subscriptions, the <strong>laziness bet stops working</strong>.
                </p>
                <p className="text-sm text-secondary">
                    Providers can no longer profit from inattention. They must compete on <strong>actual value</strong>—better service, better prices, genuine loyalty rewards.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-nested border border-border h-full">
                    <div className="flex items-start gap-3">
                        <Sparkles size={16} className="text-section-focus mt-0.5 shrink-0" />
                        <div>
                            <div className="text-xs font-medium text-primary mb-2">The Ripple Effect</div>
                            <p className="text-[10px] text-secondary leading-relaxed">
                                Individual empowerment creates collective change. When customers can't be exploited through inattention, the entire market must adapt. Fair treatment becomes the winning strategy—not because providers become altruistic, but because the game has changed.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border h-full flex flex-col justify-between">
                    <div className="text-center mb-3">
                        <div className="text-xs font-mono text-muted uppercase">Transformed Equilibrium</div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <div className="text-center flex-1">
                            <div className="text-sm font-medium text-section-success">Provider Wins</div>
                            <div className="text-[10px] text-secondary">by offering real value</div>
                        </div>
                        <div className="text-green-500/50">⟷</div>
                        <div className="text-center flex-1">
                            <div className="text-sm font-medium text-section-success">You Win</div>
                            <div className="text-[10px] text-secondary">by having an OS on your side</div>
                        </div>
                    </div>
                    <div className="text-center mt-3 text-[10px] text-section-success/70 italic">
                        A market where fairness is rewarded
                    </div>
                </div>
            </div>
        </div>

        {/* The Belief */}
        <div className="p-6 rounded-xl bg-section-planning border border-section-planning">
            <h4 className="text-sm font-bold text-section-planning mb-4 flex items-center gap-2">
                <Lightbulb size={16} /> Our Belief
            </h4>
            <div className="space-y-4">
                <p className="text-sm text-secondary">
                    We believe <strong>markets can be transformed toward fairness</strong>—not through regulation alone, but through technology that shifts the power balance back to consumers.
                </p>
                <p className="text-sm text-secondary">
                    A subscription operating system, running for millions of users, creates a new reality: one where paying attention is no longer required to be treated fairly.
                </p>
                <div className="p-4 rounded-lg bg-nested-deep border border-border text-center">
                    <p className="text-sm text-primary italic">
                        "We're not just building a service. We're building infrastructure for fair markets."
                    </p>
                </div>
                <p className="text-xs text-muted italic text-center">
                    This is a big bet. We don't know if we can achieve it. But we believe it's worth pursuing.
                </p>
            </div>
        </div>
    </div>
);

/**
 * System Anatomy - Brain/Spine/Limbs architecture visualization
 * Reframed as a hypothesis about separation of concerns
 */
export const AnatomyContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            Our hypothesis for organizing complexity: separate <strong>decision-making</strong> from <strong>truth-keeping</strong> from <strong>specialized capabilities</strong>.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {/* The Brain - Context & Orchestration (Updated) */}
            <div className="md:col-span-3 p-6 rounded-xl bg-section-focus border border-section-focus relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><GitPullRequest size={120} /></div>
                <h3 className="text-xl font-bold text-section-focus mb-2 flex items-center gap-2">
                    <GitPullRequest size={20} /> The Brain
                </h3>
                <p className="text-sm text-secondary mb-4 max-w-2xl">
                    <strong>Understands context, decides what should happen.</strong> The Brain knows the user's history, their goals, what's been tried. It orchestrates work without doing the work itself.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-nested text-[10px] font-mono text-section-focus border border-border">CONTEXT</span>
                    <span className="px-2 py-1 rounded bg-nested text-[10px] font-mono text-section-focus border border-border">ORCHESTRATION</span>
                    <span className="px-2 py-1 rounded bg-nested text-[10px] font-mono text-section-focus border border-border">DECISIONS</span>
                </div>
                <div className="mt-4 p-3 rounded bg-nested border border-border">
                    <div className="text-[10px] font-mono text-muted uppercase mb-1">Why This Matters for AI</div>
                    <div className="text-xs text-secondary">An AI orchestrator can reason at this level: "Given this user's situation, what should we do?" It doesn't need to know HOW things work, just WHAT to request.</div>
                </div>
            </div>

            {/* The Spine */}
            <div className="md:col-span-1 p-6 rounded-xl bg-section-planning border border-section-planning relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute bottom-0 right-0 p-4 opacity-10"><Database size={80} /></div>
                <div>
                    <h3 className="text-lg font-bold text-section-planning mb-2 flex items-center gap-2">
                        <Database size={18} /> The Spine
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed mb-3">
                        <strong>Guarantees consistency.</strong> The Spine doesn't make decisions—it executes atomic state changes that are always valid. Business rules live here.
                    </p>
                    <div className="p-2 rounded bg-nested border border-border">
                        <div className="text-[10px] font-mono text-muted uppercase mb-1">Safety Guarantee</div>
                        <div className="text-[10px] text-secondary">Even a buggy orchestrator can't corrupt state—the Spine enforces invariants.</div>
                    </div>
                </div>
                <div className="mt-4">
                    <span className="px-2 py-1 rounded bg-nested text-[10px] font-mono text-section-planning border border-border">TRUTH</span>
                </div>
            </div>

            {/* The Limbs */}
            <div className="md:col-span-2 p-6 rounded-xl bg-section-process border border-section-process relative overflow-hidden">
                <div className="absolute bottom-0 right-0 p-4 opacity-10"><Layers size={100} /></div>
                <h3 className="text-lg font-bold text-section-focus mb-2 flex items-center gap-2">
                    <Layers size={18} /> The Limbs
                </h3>
                <p className="text-xs text-secondary mb-4">
                    The flexible domain logic that adapts to different markets and providers.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-2 rounded bg-nested border border-border text-[10px] font-mono text-section-focus flex items-center gap-2">
                        <Server size={10} /> Provider Intelligence
                    </div>
                    <div className="p-2 rounded bg-nested border border-border text-[10px] font-mono text-section-focus flex items-center gap-2">
                        <User size={10} /> Communication
                    </div>
                    <div className="p-2 rounded bg-nested border border-border text-[10px] font-mono text-section-focus flex items-center gap-2">
                        <Database size={10} /> Offer Analysis
                    </div>
                    <div className="p-2 rounded bg-nested border border-border text-[10px] font-mono text-section-focus flex items-center gap-2">
                        <TrendingUp size={10} /> Optimisation
                    </div>
                </div>
                <div className="p-2 rounded bg-nested border border-border">
                    <div className="text-[10px] font-mono text-muted uppercase mb-1">Design Principle</div>
                    <div className="text-[10px] text-secondary">Each limb is a "tool" with a clear contract. This makes them safe for AI to call—bounded scope, predictable behavior.</div>
                </div>
            </div>
        </div>

        {/* The Bet */}
        <div className="p-4 rounded-lg bg-surface border border-default">
            <div className="text-xs font-mono text-muted uppercase mb-2">The Architectural Bet</div>
            <p className="text-sm text-secondary">
                This separation lets us experiment with AI at different levels. An AI can orchestrate (Brain) while being constrained to safe operations (Spine) using well-defined tools (Limbs). If we're right, this enables progressive autonomy. If we're wrong, the separation still makes the system easier to understand and maintain.
            </p>
        </div>
    </div>
);

/**
 * Domains - Why we chose Domain-Driven Design (simplified explanation)
 */
export const DomainsContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            Our bet on how to manage complexity: organize code around <strong>business concepts</strong>, not technical layers.
        </p>

        {/* The Problem DDD Solves */}
        <div className="p-6 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">The Complexity Problem</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <HelpCircle size={16} className="text-section-problem mt-1 shrink-0" />
                        <div>
                            <div className="text-sm font-medium text-primary">Traditional Systems Become Tangles</div>
                            <div className="text-xs text-secondary">When everything can call everything, changes ripple unpredictably. A "simple fix" breaks something across the codebase.</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <HelpCircle size={16} className="text-section-focus mt-1 shrink-0" />
                        <div>
                            <div className="text-sm font-medium text-primary">Technical Layers Don't Match Business Reality</div>
                            <div className="text-xs text-secondary">Organizing by "controllers, services, repositories" doesn't help when you need to understand "how do we handle a price increase?"</div>
                        </div>
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-xs font-mono text-muted uppercase mb-2">DDD Insight</div>
                    <p className="text-sm text-primary">
                        Draw boundaries around concepts that <strong>change together</strong> and <strong>mean the same thing</strong>.
                    </p>
                </div>
            </div>
        </div>

        {/* Our Domains */}
        <div className="p-6 rounded-xl bg-section-process border border-section-process">
            <h4 className="text-sm font-bold text-section-focus mb-4">Our Domain Boundaries</h4>
            <p className="text-xs text-secondary mb-4">
                Each domain is a self-contained world with its own language and rules. When provider APIs change, only the Provider domain needs to adapt. When we add a new market, the Offer domain extends—others stay unchanged.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-sm font-medium text-section-planning mb-1">Offer</div>
                    <div className="text-[10px] text-secondary">What services exist, how they're structured, what they cost</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-sm font-medium text-section-focus mb-1">Optimisation</div>
                    <div className="text-[10px] text-secondary">Finding the best option, calculating savings, making recommendations</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-sm font-medium text-section-focus mb-1">Case</div>
                    <div className="text-[10px] text-secondary">The journey of a contract—from discovery through switching to monitoring</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-sm font-medium text-section-problem mb-1">Provider</div>
                    <div className="text-[10px] text-secondary">How to interact with external companies—their rules, portals, quirks</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-sm font-medium text-section-process mb-1">Service</div>
                    <div className="text-[10px] text-secondary">How we communicate with users—support, notifications, self-service</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-sm font-medium text-section-success mb-1">Growth</div>
                    <div className="text-[10px] text-secondary">Acquiring and onboarding users, content, conversion</div>
                </div>
            </div>
        </div>

        {/* Why This Matters for AI */}
        <div className="p-6 rounded-xl bg-section-planning border border-section-planning">
            <h4 className="text-sm font-bold text-section-planning mb-4 flex items-center gap-2">
                <Bot size={16} /> Why This Matters for AI Collaboration
            </h4>
            <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <ArrowRight size={14} className="text-section-planning mt-1 shrink-0" />
                    <div className="text-xs text-secondary">
                        <strong className="text-primary">Clear boundaries = clear tool groups.</strong> An AI working on optimisation doesn't need to understand provider integrations—it just calls the tools it needs.
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <ArrowRight size={14} className="text-section-planning mt-1 shrink-0" />
                    <div className="text-xs text-secondary">
                        <strong className="text-primary">Shared language = better prompts.</strong> When the code uses the same words as the business ("Case", "Offer", "Switch"), AI can reason about them more naturally.
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <ArrowRight size={14} className="text-section-planning mt-1 shrink-0" />
                    <div className="text-xs text-secondary">
                        <strong className="text-primary">Bounded contexts = bounded risk.</strong> AI errors in one domain can't cascade to corrupt another.
                    </div>
                </div>
            </div>
        </div>
    </div>
);

/**
 * Agent Evolution - Our hypothesis for AI collaboration
 * Framed as experiments we're running, not proven solutions
 */
export const EvolutionContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            We believe AI can help scale operations—but we're experimenting to find out how, and where it breaks down.
        </p>

        {/* The Trust Gradient */}
        <div className="p-6 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">The Trust Gradient</h4>
            <p className="text-xs text-secondary mb-4">
                We think about AI autonomy as a spectrum. Moving along it requires <strong>evidence</strong>, not just ambition.
            </p>
            <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 rounded bg-nested border border-border">
                    <div className="w-16 text-center">
                        <div className="text-xs font-mono text-section-success">Level 1</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-primary">AI as Tool</div>
                        <div className="text-[10px] text-secondary">Human decides what to do, AI helps execute. Example: AI drafts an email, human reviews and sends.</div>
                    </div>
                    <div className="px-2 py-1 rounded bg-nested-deep text-[10px] font-mono text-section-success border border-border">PROVEN</div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded bg-nested border border-border">
                    <div className="w-16 text-center">
                        <div className="text-xs font-mono text-section-success">Level 2</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-primary">AI as Assistant</div>
                        <div className="text-[10px] text-secondary">AI suggests actions, human approves each one. Example: AI recommends "switch to provider X", human confirms.</div>
                    </div>
                    <div className="px-2 py-1 rounded bg-nested-deep text-[10px] font-mono text-section-focus border border-border">TESTING</div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded bg-nested border border-border">
                    <div className="w-16 text-center">
                        <div className="text-xs font-mono text-section-success">Level 3</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-primary">AI as Copilot</div>
                        <div className="text-[10px] text-secondary">AI handles routine cases end-to-end, humans handle exceptions. Example: AI processes standard switches, escalates edge cases.</div>
                    </div>
                    <div className="px-2 py-1 rounded bg-nested-deep text-[10px] font-mono text-section-planning border border-border">HYPOTHESIS</div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded bg-nested border border-border">
                    <div className="w-16 text-center">
                        <div className="text-xs font-mono text-section-success">Level 4</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-primary">AI as Colleague</div>
                        <div className="text-[10px] text-secondary">AI operates autonomously within defined boundaries. Humans set goals and constraints, review outcomes periodically.</div>
                    </div>
                    <div className="px-2 py-1 rounded bg-nested-deep text-[10px] font-mono text-section-focus border border-border">FUTURE?</div>
                </div>
            </div>
        </div>

        {/* Key Insight */}
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-section-problem border border-section-problem">
                <h4 className="text-sm font-bold text-section-problem mb-3">The Danger of Raw APIs</h4>
                <p className="text-xs text-secondary mb-3">
                    If you give AI access to generic REST endpoints (<code>PATCH /contract/123</code>), it <em>can</em> do anything—which means it <em>might</em> do anything wrong.
                </p>
                <ul className="space-y-2 text-xs text-secondary">
                    <li className="flex gap-2">
                        <span className="text-section-problem">•</span>
                        AI might update fields that shouldn't change together
                    </li>
                    <li className="flex gap-2">
                        <span className="text-section-problem">•</span>
                        AI might skip business validations encoded elsewhere
                    </li>
                    <li className="flex gap-2">
                        <span className="text-section-problem">•</span>
                        AI might create states that "never happen" in normal use
                    </li>
                </ul>
            </div>

            <div className="p-5 rounded-xl bg-section-success border border-section-success">
                <h4 className="text-sm font-bold text-section-success mb-3">Our Bet: Business Tools</h4>
                <p className="text-xs text-secondary mb-3">
                    Instead of raw APIs, we expose <strong>business operations</strong> that encode our rules. AI calls <code>initiate-switch</code>, not <code>PATCH status</code>.
                </p>
                <ul className="space-y-2 text-xs text-secondary">
                    <li className="flex gap-2">
                        <span className="text-section-success">•</span>
                        Each operation has clear preconditions and effects
                    </li>
                    <li className="flex gap-2">
                        <span className="text-section-success">•</span>
                        Business rules are enforced by the operation itself
                    </li>
                    <li className="flex gap-2">
                        <span className="text-section-success">•</span>
                        AI can't create invalid states—only the allowed outcomes
                    </li>
                </ul>
            </div>
        </div>

        {/* What We're Learning */}
        <div className="p-6 rounded-xl bg-section-focus border border-section-focus">
            <h4 className="text-sm font-bold text-section-focus mb-4 flex items-center gap-2">
                <HelpCircle size={16} /> Open Questions We're Exploring
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-xs text-primary font-medium mb-1">Where does AI judgment fail?</div>
                        <div className="text-[10px] text-secondary">We're cataloging cases where AI recommendations were wrong. What patterns emerge?</div>
                    </div>
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-xs text-primary font-medium mb-1">How do we measure "trust"?</div>
                        <div className="text-[10px] text-secondary">Accuracy rates? Human override frequency? Customer satisfaction? We're still figuring this out.</div>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-xs text-primary font-medium mb-1">What's the right human-AI handoff?</div>
                        <div className="text-[10px] text-secondary">When should AI escalate? How much context does the human need? How do we avoid alert fatigue?</div>
                    </div>
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-xs text-primary font-medium mb-1">How do we maintain human expertise?</div>
                        <div className="text-[10px] text-secondary">If AI handles routine cases, do humans lose the skills to handle complex ones? How do we prevent skill atrophy?</div>
                    </div>
                </div>
            </div>
        </div>

        {/* The Mindset */}
        <div className="p-4 rounded-lg bg-surface border border-default text-center">
            <p className="text-sm text-secondary italic">
                "We're not trying to replace human judgment. We're trying to amplify it—giving experts leverage to handle more, while preserving the nuance that makes them valuable."
            </p>
            <p className="text-xs text-muted mt-2">
                This is an experiment. We're building to learn.
            </p>
        </div>
    </div>
);

/**
 * Philosophy - Our core beliefs about markets, work, and impact
 */
export const PhilosophyContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            The beliefs that drive how we build, organize, and measure success. Hypotheses we're betting on.
        </p>

        {/* The Market Belief */}
        <div className="p-6 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">The Market Belief</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-sm text-secondary">
                        We believe <strong>markets can be transformed toward fairness</strong>—not through regulation alone, but through technology that shifts power back to consumers.
                    </p>
                    <p className="text-xs text-secondary">
                        Today's subscription markets reward providers who exploit customer inattention. We're building the infrastructure to flip that equation. When users have a system watching out for them, the laziness bet stops working.
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-xs font-mono text-section-focus mb-3">MARKTFAIRÄNDERUNG</div>
                    <p className="text-sm text-primary italic mb-3">
                        "Market fairness transformation"
                    </p>
                    <p className="text-[10px] text-secondary">
                        Individual empowerment creates collective change. If we succeed, providers must compete on actual value—not on customers forgetting to cancel.
                    </p>
                </div>
            </div>
        </div>

        {/* The Small Team Belief */}
        <div className="p-6 rounded-xl bg-section-planning border border-section-planning">
            <h4 className="text-sm font-bold text-section-planning mb-4 flex items-center gap-2">
                <Users size={16} /> The Small Team Belief
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <p className="text-sm text-secondary">
                        We believe a <strong>small, high-trust team can have outsized impact</strong>—able to flip entire markets if energy is channeled correctly.
                    </p>
                    <p className="text-xs text-secondary">
                        Not "we're small and growing." We <em>choose</em> to stay small. Closely knit. High context. Fast decisions. Every person matters.
                    </p>
                </div>
                <div className="space-y-2">
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-xs text-primary font-medium mb-1">Why Small Wins</div>
                        <div className="text-[10px] text-secondary">Less coordination overhead. Shared context. Trust over process. Everyone sees the whole picture and can act on it.</div>
                    </div>
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-xs text-primary font-medium mb-1">The Multiplier</div>
                        <div className="text-[10px] text-secondary">AI changes the equation. A small team with the right tools and the right focus can accomplish what used to require hundreds.</div>
                    </div>
                </div>
            </div>
        </div>

        {/* The Learning Belief */}
        <div className="p-6 rounded-xl bg-section-success border border-section-success">
            <h4 className="text-sm font-bold text-section-success mb-4 flex items-center gap-2">
                <Target size={16} /> The Learning Belief
            </h4>
            <div className="space-y-4">
                <p className="text-sm text-secondary">
                    We believe in <strong>building to learn, not building to prove we're right</strong>. Everything is a hypothesis until the data says otherwise.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-nested-deep border border-border">
                        <div className="text-sm font-medium text-primary mb-2">Fast Loops</div>
                        <div className="text-[10px] text-secondary">
                            Ship quickly. Measure outcomes. Learn. Adjust. The faster we cycle, the faster we converge on what actually works.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-nested-deep border border-border">
                        <div className="text-sm font-medium text-primary mb-2">Share Everything</div>
                        <div className="text-[10px] text-secondary">
                            Best practices AND things that didn't work. Failures aren't shameful—they're the fuel for learning. Hiding mistakes prevents the team from improving.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-nested-deep border border-border">
                        <div className="text-sm font-medium text-primary mb-2">Change Direction</div>
                        <div className="text-[10px] text-secondary">
                            When evidence says we're wrong, we pivot. No ego attached to ideas. The goal is to find what works, not to be right.
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* The Inspiration Belief */}
        <div className="p-6 rounded-xl bg-section-process border border-section-process">
            <h4 className="text-sm font-bold text-section-focus mb-4 flex items-center gap-2">
                <Sparkles size={16} /> The Inspiration Belief
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <p className="text-xs text-secondary leading-relaxed mb-4">
                        We believe that the best work happens when people are inspired, not managed.
                    </p>
                    <p className="text-xs text-secondary leading-relaxed">
                        In a high-trust environment, we don't need rigid processes. We need clear goals and the freedom to chase them.
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-xs font-mono text-section-focus mb-2">THE ENVIRONMENT</div>
                    <div className="space-y-1 text-[10px] text-secondary">
                        <div className="flex items-center gap-2">
                            <span className="text-section-focus">•</span>
                            <span>Complex domain rules</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-section-focus">•</span>
                            <span>Multiple integrations</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-section-focus">•</span>
                            <span>High reliability needs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-section-focus">•</span>
                            <span>Frequent changes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* The Bet */}
        <div className="p-4 rounded-lg bg-surface border border-default text-center">
            <p className="text-sm text-secondary italic">
                "A small team of talented people, learning fast, channeling their energy correctly—can flip entire markets."
            </p>
            <p className="text-xs text-muted mt-2">
                This is our bet. We don't know if we're right. But we're committed to finding out.
            </p>
        </div>
    </div>
);

/**
 * Team Setup - Problem space ownership and the new shape of work
 */
export const TeamSetupContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            A small, closely knit team where each person owns problem spaces end-to-end—orchestrating AI to achieve outcomes.
        </p>

        {/* Small by Design */}
        <div className="p-6 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">Small by Design</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-sm text-secondary">
                        We're not a small team that's "scaling up." We <strong>choose to stay small</strong>—a closely knit group of highly talented individuals who trust each other deeply.
                    </p>
                    <p className="text-xs text-secondary">
                        Small means everyone knows everything. No information silos. No coordination overhead. No politics. Just people who trust each other, moving fast toward a shared goal.
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-xs font-mono text-section-planning mb-3">THE HYPOTHESIS</div>
                    <p className="text-sm text-primary italic mb-3">
                        A small team can flip entire markets—if energy is channeled correctly.
                    </p>
                    <p className="text-[10px] text-secondary">
                        AI changes the math. What once required hundreds can now be accomplished by a focused few with the right tools and the right mindset.
                    </p>
                </div>
            </div>
        </div>

        {/* Problem Space Ownership */}
        <div className="p-6 rounded-xl bg-section-process border border-section-process">
            <h4 className="text-sm font-bold text-section-focus mb-4 flex items-center gap-2">
                <Layers size={16} /> Problem Space Ownership
            </h4>
            <div className="space-y-4">
                <p className="text-xs text-secondary leading-relaxed">
                    We don't hand off tickets. We own problems.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="p-3 rounded bg-nested border border-border">
                            <div className="text-xs text-primary font-medium mb-1">Not "I'm a Developer" or "I'm an Analyst"</div>
                            <div className="text-[10px] text-secondary">You own a problem space. You're responsible for understanding it deeply, defining what success looks like, and making it happen—using whatever tools and skills that requires.</div>
                        </div>
                        <div className="p-3 rounded bg-nested border border-border">
                            <div className="text-xs text-primary font-medium mb-1">End-to-End Means End-to-End</div>
                            <div className="text-[10px] text-secondary">From grasping the problem to shipping solutions to measuring impact. No handoffs. No "that's someone else's job." You own the outcome.</div>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-nested-deep border border-border flex flex-col justify-center">
                        <div className="text-center">
                            <div className="text-xs font-mono text-muted uppercase mb-2">Each Person Owns</div>
                            <div className="text-2xl font-bold text-section-focus mb-1">1+ Problem Spaces</div>
                            <div className="text-[10px] text-secondary">Complete responsibility. Complete authority.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* AI Orchestrator */}
        <div className="p-6 rounded-xl bg-section-focus border border-section-focus">
            <h4 className="text-sm font-bold text-section-focus mb-4 flex items-center gap-2">
                <Bot size={16} /> You as AI Orchestrator
            </h4>
            <div className="space-y-4">
                <p className="text-sm text-secondary">
                    In this model, each of us acts as an <strong>AI orchestrator</strong> for our problem spaces. Your job is to direct AI capabilities toward solving problems—not to do everything yourself.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-nested-deep border border-border">
                        <div className="text-xs font-mono text-section-focus mb-2">YOUR JOB</div>
                        <ul className="space-y-2 text-[10px] text-secondary">
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Understand the problem deeply
                            </li>
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Define clear, measurable outcomes
                            </li>
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Identify and evaluate solution paths
                            </li>
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Direct AI to execute effectively
                            </li>
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Verify results and iterate
                            </li>
                        </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-nested-deep border border-border">
                        <div className="text-xs font-mono text-section-focus mb-2">AI'S JOB</div>
                        <ul className="space-y-2 text-[10px] text-secondary">
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Execute at scale and speed
                            </li>
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Handle repetitive operations
                            </li>
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Process unstructured data
                            </li>
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Draft, analyze, synthesize
                            </li>
                            <li className="flex gap-2">
                                <span className="text-section-focus">•</span>
                                Surface patterns and anomalies
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* Meta Skills */}
        <div className="p-6 rounded-xl bg-section-success border border-section-success">
            <h4 className="text-sm font-bold text-section-success mb-4 flex items-center gap-2">
                <Brain size={16} /> The Meta Skills
            </h4>
            <div className="space-y-4">
                <p className="text-sm text-secondary">
                    This model requires <strong>new skills—particularly meta skills</strong>. The ability to think clearly about problems matters more than the ability to execute any specific task.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-sm font-medium text-section-success mb-1">Problem Grasping</div>
                        <div className="text-[10px] text-secondary">Quickly understanding the essence of a problem. What's actually going on? What matters?</div>
                    </div>
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-sm font-medium text-section-success mb-1">Outcome Definition</div>
                        <div className="text-[10px] text-secondary">Articulating what success looks like. Clear, measurable, achievable. The target AI aims for.</div>
                    </div>
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-sm font-medium text-section-success mb-1">Path Identification</div>
                        <div className="text-[10px] text-secondary">Seeing multiple routes to the goal. Creative problem-solving. Knowing what options exist.</div>
                    </div>
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-sm font-medium text-section-success mb-1">Path Evaluation</div>
                        <div className="text-[10px] text-secondary">Judging which approach is best. Trade-offs. Risks. Second-order effects. Choosing wisely.</div>
                    </div>
                </div>
                <div className="p-3 rounded bg-nested border border-border mt-4">
                    <p className="text-xs text-secondary text-center italic">
                        "The skill isn't doing the work—it's knowing what work needs to be done and directing AI to do it well."
                    </p>
                </div>
            </div>
        </div>

        {/* Learning Loops */}
        <div className="p-6 rounded-xl bg-section-planning border border-section-planning">
            <h4 className="text-sm font-bold text-section-planning mb-4 flex items-center gap-2">
                <ArrowRight size={16} /> Learning Loops
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <p className="text-sm text-secondary">
                        We operate in <strong>fast, experiment-based loops</strong> that facilitate rapid learning. Ship quickly. Measure. Learn. Adjust. Repeat.
                    </p>
                    <p className="text-xs text-secondary">
                        This only works in a mutually inspiring environment where we share best practices—<em>including things that didn't work</em>. Failures aren't shameful. They're part of experimenting.
                    </p>
                </div>
                <div className="space-y-2">
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-xs text-primary font-medium mb-1">Share What Worked</div>
                        <div className="text-[10px] text-secondary">Patterns, tools, approaches that succeeded. Make it easy for others to replicate.</div>
                    </div>
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-xs text-primary font-medium mb-1">Share What Didn't Work</div>
                        <div className="text-[10px] text-secondary">Failed experiments are data. Share them openly so others don't repeat mistakes.</div>
                    </div>
                    <div className="p-3 rounded bg-nested border border-border">
                        <div className="text-xs text-primary font-medium mb-1">Inspire Each Other</div>
                        <div className="text-[10px] text-secondary">Curiosity about each other's work. Excitement when someone figures something out. We make each other better.</div>
                    </div>
                </div>
            </div>
        </div>

        {/* The Invitation */}
        <div className="p-4 rounded-lg bg-surface border border-default text-center">
            <p className="text-sm text-secondary italic">
                "This is a new way of working. We're figuring it out as we go. If you're excited by end-to-end ownership, AI orchestration, and the challenge of flipping markets with a small team—we should talk."
            </p>
            <p className="text-xs text-muted mt-2">
                We're looking for people who want to shape what this becomes.
            </p>
        </div>
    </div>
);

/**
 * Role Convergence - The dissolving barriers between Product, Engineering, and Design
 */
export const RoleConvergenceContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            The boundaries between traditional roles are dissolving. We're experimenting with what comes next.
        </p>

        {/* The Narrative with Venn Diagram */}
        <div className="p-6 rounded-xl bg-section-planning border border-section-planning">
            <div className="space-y-6">
                <p className="text-lg text-secondary leading-relaxed">
                    The barriers between <span className="text-section-planning">Product</span>, <span className="text-section-success">Engineering</span>, and <span className="text-section-problem">Design</span> are dissolving.
                </p>

                {/* The Venn Diagram */}
                <div className="relative h-[450px] flex items-center justify-center">
                    <div className="relative w-full max-w-2xl h-[430px] flex items-center justify-center">
                        {/* Product Circle (Top) */}
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border flex items-start justify-center pt-7 z-10 backdrop-blur-[2px]"
                            style={{
                                backgroundColor: 'var(--venn-product-bg)',
                                borderColor: 'var(--venn-product-border)',
                                mixBlendMode: 'var(--venn-blend)' as any
                            }}
                        >
                            <span
                                className="text-xs font-mono font-bold uppercase tracking-widest drop-shadow-md"
                                style={{ color: 'var(--venn-product-text)' }}
                            >
                                Product
                            </span>
                        </motion.div>

                        {/* Engineering Circle (Bottom Left) */}
                        <motion.div
                            initial={{ x: -30, y: 30, opacity: 0 }}
                            whileInView={{ x: 0, y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                            className="absolute bottom-4 left-1/2 -translate-x-[75%] w-64 h-64 rounded-full border flex items-end justify-start pb-12 pl-12 z-10 backdrop-blur-[2px]"
                            style={{
                                backgroundColor: 'var(--venn-eng-bg)',
                                borderColor: 'var(--venn-eng-border)',
                                mixBlendMode: 'var(--venn-blend)' as any
                            }}
                        >
                            <span
                                className="text-xs font-mono font-bold uppercase tracking-widest drop-shadow-md"
                                style={{ color: 'var(--venn-eng-text)' }}
                            >
                                Engineering
                            </span>
                        </motion.div>

                        {/* Design Circle (Bottom Right) */}
                        <motion.div
                            initial={{ x: 30, y: 30, opacity: 0 }}
                            whileInView={{ x: 0, y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="absolute bottom-4 left-1/2 -translate-x-[25%] w-64 h-64 rounded-full border flex items-end justify-end pb-12 pr-14 z-10 backdrop-blur-[2px]"
                            style={{
                                backgroundColor: 'var(--venn-design-bg)',
                                borderColor: 'var(--venn-design-border)',
                                mixBlendMode: 'var(--venn-blend)' as any
                            }}
                        >
                            <span
                                className="text-xs font-mono font-bold uppercase tracking-widest drop-shadow-md"
                                style={{ color: 'var(--venn-design-text)' }}
                            >
                                Design
                            </span>
                        </motion.div>

                        {/* Center Intersection (PRODUCT ENGINEERING) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center"
                        >
                            <div className="flex flex-col items-center leading-tight">
                                <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest drop-shadow-md">Product</span>
                                <span className="text-xs font-mono font-bold text-primary uppercase tracking-widest drop-shadow-md">Engineering</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-muted leading-relaxed">
                        As <a href="https://ashtom.github.io/developers-reinvented" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-terminal-green underline decoration-border underline-offset-4 transition-colors">Thomas Dohmke (GitHub CEO)</a> predicts, the rise of AI shifts the engineer's role from syntax to semantics. The bottleneck is no longer <em>"how to build"</em>, but <em>"what to build"</em> and <em>"why"</em>.
                    </p>
                    <p className="text-sm text-muted leading-relaxed">
                        We are actively experimenting with this new operating model. We seek <strong className="text-primary">Product Engineers</strong> who define the 'What', design the 'How', and orchestrate the 'Execution' via AI agents.
                    </p>
                </div>

                {/* Status */}
                <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-section-success">STATUS: ACTIVE_EXPERIMENTATION</span>
                    </div>
                </div>
            </div>
        </div>

        {/* What This Means */}
        <div className="p-6 rounded-xl bg-section-process border border-section-process">
            <h4 className="text-sm font-bold text-section-focus mb-4 flex items-center gap-2">
                <Sparkles size={16} /> What This Means in Practice
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-sm font-medium text-section-planning mb-2">Define the 'What'</div>
                    <div className="text-[10px] text-secondary">
                        Understand user problems deeply. Translate needs into clear requirements. Own the product vision for your space.
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-sm font-medium text-section-problem mb-2">Design the 'How'</div>
                    <div className="text-[10px] text-secondary">
                        Shape the user experience. Make technical decisions with empathy. Create solutions that feel right.
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-sm font-medium text-section-success mb-2">Orchestrate the 'Execution'</div>
                    <div className="text-[10px] text-secondary">
                        Direct AI to build. Verify quality. Iterate rapidly. Ship outcomes, not just code.
                    </div>
                </div>
            </div>
        </div>

        {/* The Invitation */}
        <div className="p-4 rounded-lg bg-surface border border-default text-center">
            <p className="text-sm text-secondary italic">
                "We don't know exactly what this role becomes. We're discovering it together. If you want to help define the future of product engineering—let's talk."
            </p>
        </div>
    </div>
);

