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
    Globe, Heart, AlertTriangle, Sparkles, Clock, Eye
} from 'lucide-react';

/**
 * Core Challenge - The operational scalability problem
 */
export const ChallengeContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            Each subscription we manage is like a <strong>game of puzzle</strong> – and we're playing hundreds of thousands of these games simultaneously.
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
                    <div className="text-[10px] text-secondary">The puzzle pieces arrive as emails, PDFs, portal screenshots – not clean API responses. Messy human communication, not structured data.</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-1">Every Game Has Different Rules</div>
                    <div className="text-[10px] text-secondary">Each provider has quirks. Each user has preferences. What's "optimal" depends on context that changes constantly.</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-1">Pieces Arrive Unpredictably</div>
                    <div className="text-[10px] text-secondary">You can't batch-process puzzle games. Events arrive when they arrive – price increases at month-end, renewals on anniversaries.</div>
                </div>
                <div className="p-3 rounded bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-1">Errors Compound</div>
                    <div className="text-[10px] text-secondary">Misidentify one piece, run the wrong workflow – the user gets bad advice. At scale, small error rates become large problems.</div>
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
                        Our service colleagues shouldn't be <strong>puzzle processors</strong> – they should be <strong>relationship builders</strong>.
                    </p>
                    <p className="text-xs text-secondary">
                        The repetitive work of identifying events and executing workflows is exactly what should be automated. Humans excel at what machines can't do: empathy, complex judgment, building trust.
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border text-center">
                    <div className="text-xs font-mono text-section-success mb-2">THE PURPOSE</div>
                    <p className="text-sm text-primary italic">
                        "Free our colleagues to focus on what matters most: building trust-based relationships with our users – for life."
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
                    We believe <strong>AI can play the puzzle games</strong> – identifying events in unstructured data, orchestrating the right workflows – while humans supervise and handle what machines can't.
                </p>
                <p className="text-sm text-secondary">
                    This is why <strong>architecture matters</strong>. The system needs to be structured so AI can operate safely at scale: clear boundaries, constrained operations, human oversight where it counts.
                </p>
                <p className="text-xs text-muted italic">
                    We don't know if this works yet. That's why we're building to learn – measuring outcomes, expanding scope gradually, always keeping humans in the loop.
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
            Our vision: a <strong>Subscription Operating System</strong> that protects users at the micro level – and transforms markets at the macro level.
        </p>

        {/* The OS Concept */}
        <div className="p-6 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">The Subscription Operating System</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-sm text-secondary">
                        Not a switching service. Not an app. An <strong>operating system</strong> for all your subscriptions – running quietly in the background, managing complexity so you don't have to.
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-secondary">
                            <Globe size={14} className="text-secondary shrink-0" />
                            <span><strong className="text-primary">Provider-agnostic:</strong> Works with any provider, anywhere</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-secondary">
                            <Layers size={14} className="text-secondary shrink-0" />
                            <span><strong className="text-primary">Market-agnostic:</strong> Energy, telco, insurance, streaming – all subscriptions</span>
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
                    "You set the goals and constraints. The OS handles the rest – optimizing continuously, acting when needed, always on your side."
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
                    Providers can no longer profit from inattention. They must compete on <strong>actual value</strong> – better service, better prices, genuine loyalty rewards.
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-nested border border-border h-full">
                    <div className="flex items-start gap-3">
                        <Sparkles size={16} className="text-section-focus mt-0.5 shrink-0" />
                        <div>
                            <div className="text-xs font-medium text-primary mb-2">The Ripple Effect</div>
                            <p className="text-[10px] text-secondary leading-relaxed">
                                Individual empowerment creates collective change. When customers can't be exploited through inattention, the entire market must adapt. Fair treatment becomes the winning strategy – not because providers become altruistic, but because the game has changed.
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
                        <div className="text-terminal-green/50">⟷</div>
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
                    We believe <strong>markets can be transformed toward fairness</strong> – not through regulation alone, but through technology that shifts the power balance back to consumers.
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
 * System Overview - Process Orchestrator / Capability Domains / System of Record
 * Visualizes the three-layer architecture with vertical flow
 */
export const SystemOverviewContent = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            Our hypothesis for organizing complexity: separate <strong>process orchestration</strong> from <strong>specialized capabilities</strong> from <strong>state authority</strong>.
        </p>

        {/* Vertical Flow Architecture */}
        <div className="space-y-3">
            {/* Layer 1: Process Orchestrator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-5 rounded-xl bg-section-focus border border-section-focus relative overflow-hidden"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-section-focus flex items-center gap-2">
                            <GitPullRequest size={18} /> Process Orchestrator
                        </h3>
                        <span className="text-[10px] font-mono text-muted bg-nested px-2 py-0.5 rounded border border-border">/case</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="px-2 py-0.5 rounded bg-nested text-[9px] font-mono text-section-focus border border-border">FLOWS</span>
                        <span className="px-2 py-0.5 rounded bg-nested text-[9px] font-mono text-section-focus border border-border">PLAYBOOKS</span>
                    </div>
                </div>
                <p className="text-xs text-secondary mb-3">
                    Coordinates the story without doing specialized work. Runs Flows that orchestrate across domains.
                </p>
                {/* Golden Rule */}
                <div className="p-2.5 rounded-lg bg-section-focus/10 border border-section-focus/30">
                    <p className="text-xs text-section-focus font-medium text-center">
                        ✦ The <strong>only</strong> layer allowed to coordinate across multiple domains ✦
                    </p>
                </div>
            </motion.div>

            {/* Flow: Orchestrator coordinates Capabilities */}
            <div className="flex items-center justify-center py-1">
                <div className="flex items-center gap-3">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-mono text-muted uppercase tracking-wider mb-1">coordinates</span>
                        <div className="flex gap-4">
                            <ArrowRight size={12} className="text-muted rotate-[135deg]" />
                            <ArrowRight size={12} className="text-muted rotate-90" />
                            <ArrowRight size={12} className="text-muted rotate-[45deg]" />
                        </div>
                    </div>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent"></div>
                </div>
            </div>

            {/* Layer 2: Capability Domains - GREEN */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-5 rounded-xl bg-section-success border border-section-success relative overflow-hidden"
            >
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-section-success flex items-center gap-2">
                        <Layers size={18} /> Capability Domains
                    </h3>
                    <span className="text-[9px] font-mono text-muted">stateless • specialized • independent</span>
                </div>

                {/* Domain Grid - All capabilities are GREEN */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
                    <div className="p-2 rounded bg-nested border border-border hover:border-section-success/50 transition-colors">
                        <Database size={14} className="mx-auto mb-1 text-section-success" />
                        <div className="text-[10px] font-mono text-primary text-center">/offer</div>
                        <div className="text-[8px] text-muted text-center leading-tight mt-1">Models the market</div>
                    </div>
                    <div className="p-2 rounded bg-nested border border-border hover:border-section-success/50 transition-colors">
                        <TrendingUp size={14} className="mx-auto mb-1 text-section-success" />
                        <div className="text-[10px] font-mono text-primary text-center">/optimisation</div>
                        <div className="text-[8px] text-muted text-center leading-tight mt-1">Finds best choices</div>
                    </div>
                    <div className="p-2 rounded bg-nested border border-border hover:border-section-success/50 transition-colors">
                        <Server size={14} className="mx-auto mb-1 text-section-success" />
                        <div className="text-[10px] font-mono text-primary text-center">/provider</div>
                        <div className="text-[8px] text-muted text-center leading-tight mt-1">Talks to provider APIs</div>
                    </div>
                    <div className="p-2 rounded bg-nested border border-border hover:border-section-success/50 transition-colors">
                        <User size={14} className="mx-auto mb-1 text-section-success" />
                        <div className="text-[10px] font-mono text-primary text-center">/service</div>
                        <div className="text-[8px] text-muted text-center leading-tight mt-1">User communication</div>
                    </div>
                    <div className="p-2 rounded bg-nested border border-border hover:border-section-success/50 transition-colors">
                        <Zap size={14} className="mx-auto mb-1 text-section-success" />
                        <div className="text-[10px] font-mono text-primary text-center">/growth</div>
                        <div className="text-[8px] text-muted text-center leading-tight mt-1">Acquires users</div>
                    </div>
                </div>

                {/* Golden Rule */}
                <div className="p-2.5 rounded-lg bg-section-success/30 border border-section-success/50">
                    <p className="text-xs text-section-success font-medium text-center">
                        ✦ <strong>Never</strong> orchestrate. Only specialize. ✦
                    </p>
                </div>
            </motion.div>

            {/* Flow: All layers query System of Record */}
            <div className="py-2">
                <div className="flex items-center justify-center">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-border"></div>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-4 mb-1">
                                <ArrowRight size={10} className="text-muted rotate-[135deg]" />
                                <ArrowRight size={10} className="text-muted rotate-[110deg]" />
                                <ArrowRight size={10} className="text-muted rotate-90" />
                                <ArrowRight size={10} className="text-muted rotate-[70deg]" />
                                <ArrowRight size={10} className="text-muted rotate-[45deg]" />
                            </div>
                            <span className="text-[9px] font-mono text-muted uppercase tracking-wider">all layers query for truth</span>
                        </div>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-border"></div>
                    </div>
                </div>
            </div>

            {/* Layer 3: System of Record (Foundation) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-5 rounded-xl bg-section-planning border-2 border-section-planning relative overflow-hidden"
            >
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-section-planning flex items-center gap-2">
                            <Database size={18} /> System of Record
                        </h3>
                        <span className="text-[10px] font-mono text-muted bg-nested px-2 py-0.5 rounded border border-border">/lifecycle</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-section-planning/20 text-[9px] font-mono text-section-planning border border-section-planning/50">FOUNDATION</span>
                </div>
                <p className="text-xs text-secondary mb-3">
                    Single source of truth. Validates operations, enforces business rules, provides temporal projections.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2 py-0.5 rounded bg-nested text-[9px] font-mono text-section-planning border border-border">TRUTH</span>
                    <span className="px-2 py-0.5 rounded bg-nested text-[9px] font-mono text-section-planning border border-border">VALIDATION</span>
                    <span className="px-2 py-0.5 rounded bg-nested text-[9px] font-mono text-section-planning border border-border">PROJECTIONS</span>
                    <span className="px-2 py-0.5 rounded bg-nested text-[9px] font-mono text-section-planning border border-border">BUSINESS RULES</span>
                </div>
                {/* Golden Rule */}
                <div className="p-2.5 rounded-lg bg-section-planning/10 border border-section-planning/30">
                    <p className="text-xs text-section-planning font-medium text-center">
                        ✦ Calls <strong>no one</strong>. Everyone calls it for the truth. ✦
                    </p>
                </div>
            </motion.div>
        </div>

        {/* Detailed Example Flow */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="p-5 rounded-xl bg-surface border border-default"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono text-muted uppercase tracking-wider">Example Flow: Handling a Price Increase</div>
                <div className="flex gap-2 text-[8px]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-section-focus"></span> Orchestrator</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-section-success"></span> Capability</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-section-planning"></span> Record</span>
                </div>
            </div>

            {/* Flow Timeline */}
            <div className="space-y-3">
                {/* Time Marker: Day 0 */}
                <div className="flex items-center gap-3 pb-2">
                    <div className="px-2.5 py-1 rounded-full bg-section-focus/20 border border-section-focus/50">
                        <span className="text-[9px] font-mono font-bold text-section-focus tracking-wider">DAY 0</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-section-focus/30 to-transparent"></div>
                </div>

                {/* Step 1: Trigger */}
                <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-section-problem/20 border border-section-problem/50 flex items-center justify-center text-[9px] font-mono text-section-problem">1</div>
                        <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-3">
                        <div className="text-[10px] font-medium text-section-problem mb-1">TRIGGER: Email Arrives</div>
                        <div className="text-[9px] text-muted">Inbound provider email detected by ingestion system</div>
                    </div>
                </div>

                {/* Step 2: Extract */}
                <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-section-focus/20 border border-section-focus/50 flex items-center justify-center text-[9px] font-mono text-section-focus">2</div>
                        <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-3">
                        <div className="text-[10px] font-medium text-primary mb-1">EXTRACT: Parse Price Data</div>
                        <div className="flex items-center gap-2 text-[9px] mb-1">
                            <span className="text-section-focus">Orchestrator</span>
                            <span className="text-muted">→</span>
                            <span className="px-1.5 py-0.5 rounded bg-section-success/10 text-section-success border border-section-success/30">/provider</span>
                            <span className="text-muted italic">"Extract price increase data"</span>
                        </div>
                        <div className="text-[8px] text-muted font-mono">returns: {`{ old: €89, new: €109, effective: 2024-03-01 }`}</div>
                    </div>
                </div>

                {/* Step 3: Query Context */}
                <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-section-planning/20 border border-section-planning/50 flex items-center justify-center text-[9px] font-mono text-section-planning">3</div>
                        <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-3">
                        <div className="text-[10px] font-medium text-primary mb-1">QUERY: Get Context</div>
                        <div className="flex items-center gap-2 text-[9px] mb-1">
                            <span className="text-section-focus">Orchestrator</span>
                            <span className="text-muted">→</span>
                            <span className="px-1.5 py-0.5 rounded bg-section-planning/10 text-section-planning border border-section-planning/30">/lifecycle</span>
                            <span className="text-muted italic">"Get contract & user preferences"</span>
                        </div>
                        <div className="text-[8px] text-muted font-mono">returns: {`{ contract_id, preferences: { max_price: €95, green_only: true } }`}</div>
                    </div>
                </div>

                {/* Step 4: Find Alternatives */}
                <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-section-focus/20 border border-section-focus/50 flex items-center justify-center text-[9px] font-mono text-section-focus">4</div>
                        <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-3">
                        <div className="text-[10px] font-medium text-primary mb-1">SCAN: Find Alternatives</div>
                        <div className="flex items-center gap-2 text-[9px] mb-1">
                            <span className="text-section-focus">Orchestrator</span>
                            <span className="text-muted">→</span>
                            <span className="px-1.5 py-0.5 rounded bg-section-success/10 text-section-success border border-section-success/30">/offer</span>
                            <span className="text-muted italic">"What's available in the market?"</span>
                        </div>
                        <div className="text-[8px] text-muted font-mono">returns: {`[ { provider: "GreenPower", price: €79 }, { provider: "EcoEnergy", price: €82 }, ... ]`}</div>
                    </div>
                </div>

                {/* Step 5: Optimize */}
                <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-section-focus/20 border border-section-focus/50 flex items-center justify-center text-[9px] font-mono text-section-focus">5</div>
                        <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-3">
                        <div className="text-[10px] font-medium text-primary mb-1">OPTIMIZE: Determine Best Action</div>
                        <div className="flex items-center gap-2 text-[9px] mb-1">
                            <span className="text-section-focus">Orchestrator</span>
                            <span className="text-muted">→</span>
                            <span className="px-1.5 py-0.5 rounded bg-section-success/10 text-section-success border border-section-success/30">/optimisation</span>
                            <span className="text-muted italic">"What's the best course of action?"</span>
                        </div>
                        <div className="text-[8px] text-muted font-mono">returns: {`{ action: "switch", target: "GreenPower", savings: €30/mo, confidence: 0.94 }`}</div>
                    </div>
                </div>

                {/* Step 6: Record Analysis */}
                <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-section-planning/20 border border-section-planning/50 flex items-center justify-center text-[9px] font-mono text-section-planning">6</div>
                        <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-3">
                        <div className="text-[10px] font-medium text-section-planning mb-1">RECORD: Store Analysis</div>
                        <div className="flex items-center gap-2 text-[9px]">
                            <span className="text-section-focus">Orchestrator</span>
                            <span className="text-muted">→</span>
                            <span className="px-1.5 py-0.5 rounded bg-section-planning/10 text-section-planning border border-section-planning/30">/lifecycle</span>
                            <span className="font-mono text-section-planning">RecordPriceIncreaseAnalysis</span>
                        </div>
                    </div>
                </div>

                {/* Step 7: Notify User */}
                <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-section-focus/20 border border-section-focus/50 flex items-center justify-center text-[9px] font-mono text-section-focus">7</div>
                        <div className="w-px h-full bg-border"></div>
                    </div>
                    <div className="flex-1 pb-3">
                        <div className="text-[10px] font-medium text-primary mb-1">NOTIFY: Inform User</div>
                        <div className="flex items-center gap-2 text-[9px] mb-1">
                            <span className="text-section-focus">Orchestrator</span>
                            <span className="text-muted">→</span>
                            <span className="px-1.5 py-0.5 rounded bg-section-success/10 text-section-success border border-section-success/30">/service</span>
                            <span className="text-muted italic">"Notify user of recommendation"</span>
                        </div>
                        <div className="flex items-center gap-2 text-[9px]">
                            <span className="text-section-focus">Orchestrator</span>
                            <span className="text-muted">→</span>
                            <span className="px-1.5 py-0.5 rounded bg-section-planning/10 text-section-planning border border-section-planning/30">/lifecycle</span>
                            <span className="font-mono text-section-planning">RecordUserNotified</span>
                        </div>
                    </div>
                </div>

                {/* Time Marker: 7 Days Later */}
                <div className="flex items-center gap-3 py-2 mt-1">
                    <div className="px-2.5 py-1 rounded-full bg-section-success/20 border border-section-success/50">
                        <span className="text-[9px] font-mono font-bold text-section-success tracking-wider">7 DAYS LATER</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-section-success/30 to-transparent"></div>
                    <span className="text-[8px] text-muted italic">User had time to override</span>
                </div>

                {/* Step 8: Auto-Optimization */}
                <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-section-success/20 border border-section-success/50 flex items-center justify-center text-[9px] font-mono text-section-success">8</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-[10px] font-medium text-section-success mb-1">AUTO-EXECUTE: Optimization</div>
                        <div className="p-2 rounded bg-nested border border-border text-[9px] space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-muted">if</span>
                                <span className="font-mono text-secondary">no_user_response</span>
                                <span className="text-muted">AND</span>
                                <span className="font-mono text-secondary">savings &gt; threshold</span>
                            </div>
                            <div className="flex items-center gap-2 pl-3">
                                <span className="text-section-focus">Orchestrator</span>
                                <span className="text-muted">→</span>
                                <span className="px-1.5 py-0.5 rounded bg-section-success/10 text-section-success border border-section-success/30">/provider</span>
                                <span className="text-muted italic">"Execute switch to GreenPower"</span>
                            </div>
                            <div className="flex items-center gap-2 pl-3">
                                <span className="text-section-focus">Orchestrator</span>
                                <span className="text-muted">→</span>
                                <span className="px-1.5 py-0.5 rounded bg-section-planning/10 text-section-planning border border-section-planning/30">/lifecycle</span>
                                <span className="font-mono text-section-planning">RecordOptimisationExecuted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="mt-4 pt-3 border-t border-border">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[9px]">
                    <span className="text-muted">Total capability calls: 6</span>
                    <span className="text-muted">State changes recorded: 4</span>
                    <span className="text-muted">User saves €473/year automatically</span>
                </div>
            </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-6 rounded-xl bg-surface border border-default"
        >
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">Key Insights: Why This Architecture Works</h4>

            <div className="grid md:grid-cols-3 gap-4">
                {/* Safety Guarantee 1 */}
                <div className="p-5 rounded-xl bg-nested-deep border border-border">
                    <h5 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Shield size={16} /> Guardrails
                    </h5>
                    <p className="text-xs text-secondary leading-relaxed">
                        Every state change passes through the System of Record. Business rules are enforced at one place, not scattered across services.
                    </p>
                </div>

                {/* Safety Guarantee 2 */}
                <div className="p-5 rounded-xl bg-nested-deep border border-border">
                    <h5 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Clock size={16} /> Human Override
                    </h5>
                    <p className="text-xs text-secondary leading-relaxed">
                        The 7-day window isn't arbitrary. It's a designed safety buffer where users can review, modify, or cancel any automated decision.
                    </p>
                </div>

                {/* Safety Guarantee 3 */}
                <div className="p-5 rounded-xl bg-nested-deep border border-border">
                    <h5 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                        <Eye size={16} /> Full Auditability
                    </h5>
                    <p className="text-xs text-secondary leading-relaxed">
                        Every decision, recommendation, and action is recorded with timestamp and rationale. Complete traceability from trigger to execution.
                    </p>
                </div>
            </div>

            {/* The Bet */}
            <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-secondary text-center">
                    <span className="text-primary font-medium">The Architectural Bet:</span> This separation enables progressive AI autonomy. An AI can orchestrate while being constrained by golden rules – safe operations through the System of Record, well-defined tools through Capability Domains.
                </p>
            </div>
        </motion.div>
    </div>
);

/**
 * Domains - Domain-Driven Design principles and bounded contexts
 */
export const DomainsContent = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            Draw boundaries around concepts that <strong>change together</strong> and <strong>mean the same thing</strong>. This is our bet on managing complexity.
        </p>

        {/* The Problem → Solution */}
        <div className="grid md:grid-cols-2 gap-4">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-xl bg-section-problem border border-section-problem"
            >
                <h5 className="text-sm font-bold text-section-problem mb-3">Without Boundaries</h5>
                <div className="space-y-2">
                    <div className="flex items-start gap-2">
                        <span className="text-section-problem text-xs">✗</span>
                        <span className="text-xs text-secondary">Everything can call everything</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-section-problem text-xs">✗</span>
                        <span className="text-xs text-secondary">Changes ripple unpredictably</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-section-problem text-xs">✗</span>
                        <span className="text-xs text-secondary">"Contract" means different things in different places</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-5 rounded-xl bg-section-success border border-section-success"
            >
                <h5 className="text-sm font-bold text-section-success mb-3">With Bounded Contexts</h5>
                <div className="space-y-2">
                    <div className="flex items-start gap-2">
                        <span className="text-section-success text-xs">✓</span>
                        <span className="text-xs text-secondary">Domains communicate through defined interfaces</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-section-success text-xs">✓</span>
                        <span className="text-xs text-secondary">Changes stay contained within boundaries</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-section-success text-xs">✓</span>
                        <span className="text-xs text-secondary">Each domain owns its vocabulary</span>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Our Bounded Contexts */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="p-5 rounded-xl bg-surface border border-default"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono text-muted uppercase tracking-wider">Our Bounded Contexts</div>
                <span className="text-[8px] text-muted italic">Each context owns its data and rules</span>
            </div>

            {/* System of Record - Foundation */}
            <div className="mb-4 p-4 rounded-lg bg-section-planning border border-section-planning">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Database size={14} className="text-section-planning" />
                        <span className="text-sm font-bold text-section-planning">/lifecycle</span>
                    </div>
                    <span className="text-[9px] font-mono text-primary bg-nested px-2 py-0.5 rounded border border-border">SYSTEM OF RECORD</span>
                </div>
                <div className="text-[10px] text-secondary">
                    <strong className="text-primary">Owns:</strong> Contracts, Users, Tasks, all core business state
                </div>
            </div>

            {/* Capability Domains Grid - All GREEN */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                <div className="p-2.5 rounded bg-section-success border border-section-success">
                    <Database size={12} className="text-section-success mb-1" />
                    <div className="text-[10px] font-mono text-section-success">/offer</div>
                    <div className="text-[8px] text-secondary leading-tight mt-1">Owns: Market data, pricing, tariffs</div>
                </div>
                <div className="p-2.5 rounded bg-section-success border border-section-success">
                    <TrendingUp size={12} className="text-section-success mb-1" />
                    <div className="text-[10px] font-mono text-section-success">/optimisation</div>
                    <div className="text-[8px] text-secondary leading-tight mt-1">Owns: Algorithms, recommendations</div>
                </div>
                <div className="p-2.5 rounded bg-section-success border border-section-success">
                    <Server size={12} className="text-section-success mb-1" />
                    <div className="text-[10px] font-mono text-section-success">/provider</div>
                    <div className="text-[8px] text-secondary leading-tight mt-1">Owns: API integrations, provider rules</div>
                </div>
                <div className="p-2.5 rounded bg-section-success border border-section-success">
                    <User size={12} className="text-section-success mb-1" />
                    <div className="text-[10px] font-mono text-section-success">/service</div>
                    <div className="text-[8px] text-secondary leading-tight mt-1">Owns: Messaging, notifications</div>
                </div>
                <div className="p-2.5 rounded bg-section-success border border-section-success">
                    <Zap size={12} className="text-section-success mb-1" />
                    <div className="text-[10px] font-mono text-section-success">/growth</div>
                    <div className="text-[8px] text-secondary leading-tight mt-1">Owns: Acquisition, onboarding</div>
                </div>
            </div>

            {/* Note about Case - Orchestrator = AMBER */}
            <div className="p-3 rounded bg-section-focus border border-section-focus text-center">
                <span className="text-xs text-secondary">
                    <strong className="text-section-focus">/case</strong> orchestrates across these contexts but doesn't own domain data – it coordinates the story.
                </span>
            </div>
        </motion.div>

        {/* Three DDD Principles */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-4"
        >
            {/* Ubiquitous Language */}
            <div className="p-5 rounded-xl bg-nested-deep border border-border">
                <h5 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <Globe size={16} /> Ubiquitous Language
                </h5>
                <p className="text-xs text-secondary leading-relaxed mb-4">
                    Code speaks the same language as the business. No translation needed.
                </p>
                <div className="space-y-2 text-[10px] font-mono">
                    <div className="flex justify-between">
                        <span className="text-muted">Business says:</span>
                        <span className="text-primary">"Price Increase"</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted">Code says:</span>
                        <span className="text-primary">PriceIncreaseDetected</span>
                    </div>
                </div>
            </div>

            {/* Bounded Contexts */}
            <div className="p-5 rounded-xl bg-nested-deep border border-border">
                <h5 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <Layers size={16} /> Bounded Contexts
                </h5>
                <p className="text-xs text-secondary leading-relaxed mb-4">
                    Each domain owns its definitions. "Contract" in /lifecycle ≠ "Contract" in /provider.
                </p>
                <div className="space-y-2 text-[10px] font-mono">
                    <div className="flex justify-between">
                        <span className="text-section-planning">/lifecycle:</span>
                        <span className="text-primary">Our record of truth</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-section-success">/provider:</span>
                        <span className="text-primary">Their API response</span>
                    </div>
                </div>
            </div>

            {/* Anti-Corruption Layer */}
            <div className="p-5 rounded-xl bg-nested-deep border border-border">
                <h5 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <Shield size={16} /> Anti-Corruption Layer
                </h5>
                <p className="text-xs text-secondary leading-relaxed mb-4">
                    External chaos stays external. Provider quirks don't leak into our model.
                </p>
                <div className="space-y-2 text-[10px] font-mono">
                    <div className="flex justify-between">
                        <span className="text-muted">Vattenfall API:</span>
                        <span className="text-primary">XML mess</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted">Our domain:</span>
                        <span className="text-primary">Clean model</span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Why This Matters for AI */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="p-6 rounded-xl bg-surface border border-default"
        >
            <h4 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                <Bot size={16} /> Why This Matters for AI
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-2">Clear Boundaries = Clear Tools</div>
                    <div className="text-xs text-secondary">AI gets domain-specific tool groups. No confusion about which capabilities to use.</div>
                </div>
                <div className="p-4 rounded-lg bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-2">Shared Language = Better Prompts</div>
                    <div className="text-xs text-secondary">When code matches business terms, AI reasoning becomes more natural and accurate.</div>
                </div>
                <div className="p-4 rounded-lg bg-nested border border-border">
                    <div className="text-xs font-medium text-primary mb-2">Bounded Risk = Safe Experimentation</div>
                    <div className="text-xs text-secondary">AI errors in /optimisation can't corrupt /lifecycle. Golden rules enforce isolation.</div>
                </div>
            </div>
        </motion.div>
    </div>
);

/**
 * Agent Evolution - Our hypothesis for AI collaboration
 * Framed as experiments we're running, not proven solutions
 */
export const EvolutionContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            We believe AI can help scale operations – but we're experimenting to find out how, and where it breaks down.
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
                    <div className="px-2 py-1 rounded bg-nested-deep text-[10px] font-mono text-primary border border-border">PROVEN</div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded bg-nested border border-border">
                    <div className="w-16 text-center">
                        <div className="text-xs font-mono text-section-success">Level 2</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-primary">AI as Assistant</div>
                        <div className="text-[10px] text-secondary">AI suggests actions, human approves each one. Example: AI recommends "switch to provider X", human confirms.</div>
                    </div>
                    <div className="px-2 py-1 rounded bg-nested-deep text-[10px] font-mono text-primary border border-border">TESTING</div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded bg-nested border border-border">
                    <div className="w-16 text-center">
                        <div className="text-xs font-mono text-section-success">Level 3</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-primary">AI as Copilot</div>
                        <div className="text-[10px] text-secondary">AI handles routine cases end-to-end, humans handle exceptions. Example: AI processes standard switches, escalates edge cases.</div>
                    </div>
                    <div className="px-2 py-1 rounded bg-nested-deep text-[10px] font-mono text-primary border border-border">HYPOTHESIS</div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded bg-nested border border-border">
                    <div className="w-16 text-center">
                        <div className="text-xs font-mono text-section-success">Level 4</div>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-primary">AI as Colleague</div>
                        <div className="text-[10px] text-secondary">AI operates autonomously within defined boundaries. Humans set goals and constraints, review outcomes periodically.</div>
                    </div>
                    <div className="px-2 py-1 rounded bg-nested-deep text-[10px] font-mono text-primary border border-border">FUTURE?</div>
                </div>
            </div>
        </div>

        {/* Key Insight */}
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-section-problem border border-section-problem">
                <h4 className="text-sm font-bold text-section-problem mb-3">The Danger of Raw APIs</h4>
                <p className="text-xs text-secondary mb-3">
                    If you give AI access to generic REST endpoints (<code>PATCH /contract/123</code>), it <em>can</em> do anything – which means it <em>might</em> do anything wrong.
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
                        AI can't create invalid states – only the allowed outcomes
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
                "We're not trying to replace human judgment. We're trying to amplify it – giving experts leverage to handle more, while preserving the nuance that makes them valuable."
            </p>
            <p className="text-xs text-muted mt-2">
                This is an experiment. We're building to learn.
            </p>
        </div>
    </div>
);

/**
 * Philosophy - Our WHY/HOW/WHAT (Simon Sinek's Golden Circle)
 * WHY: Fairness / HOW: Friendship Principle / WHAT: Subscription Guard
 */
export const PhilosophyContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        {/* Intro */}
        <div className="space-y-4">
            <p className="text-sm text-secondary">
                Most companies start with <em>what</em> they do. Inspired by Simon Sinek, we consciously start with <strong>why</strong>. After all, it's the reason why we exist.
            </p>
        </div>

        {/* WHY: Fairness */}
        <div className="p-6 rounded-xl bg-section-focus border border-section-focus relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-nested border border-border">
                    <Heart size={20} className="text-section-focus" />
                </div>
                <div>
                    <div className="text-xs font-mono text-muted uppercase tracking-wider">WHY</div>
                    <h3 className="text-xl font-bold text-section-focus">Fairness</h3>
                </div>
            </div>

            {/* The Core Message */}
            <div className="text-center py-8">
                <p className="text-xs font-mono text-section-focus uppercase tracking-widest mb-4">Marktfairänderung</p>
                <p className="text-2xl md:text-3xl font-light text-primary leading-tight max-w-2xl mx-auto">
                    Why is <span className="font-bold text-section-focus">loyalty punished</span>, not rewarded?
                </p>
            </div>

            {/* The Ripple */}
            <div className="border-t border-border/50 pt-6 mt-2">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
                    <div>
                        <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">For each user</p>
                        <p className="text-sm text-primary">We ensure you are treated fairly</p>
                    </div>
                    <span className="text-muted hidden md:block">→</span>
                    <div>
                        <p className="text-xs font-mono text-section-focus uppercase tracking-wider mb-2">For markets</p>
                        <p className="text-sm text-primary font-medium">Flipping markets towards fairness</p>
                    </div>
                </div>
                <p className="text-center text-xs text-muted mt-6 max-w-lg mx-auto">
                    When millions have a system watching their subscriptions, the "laziness bet" stops working. Providers must compete on actual value.
                </p>
            </div>
        </div>

        {/* HOW: Friendship Principle */}
        <div className="p-6 rounded-xl bg-section-success border border-section-success relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-nested border border-border">
                    <Users size={20} className="text-section-success" />
                </div>
                <div>
                    <div className="text-xs font-mono text-muted uppercase tracking-wider">HOW</div>
                    <h3 className="text-xl font-bold text-section-success">Friendship Principle</h3>
                </div>
            </div>

            {/* The Central Question */}
            <div className="text-center py-8">
                <p className="text-xs font-mono text-section-success uppercase tracking-widest mb-4">Freundschaftsprinzip</p>
                <p className="text-2xl md:text-3xl font-light text-primary leading-tight max-w-xl mx-auto">
                    What would a <span className="font-bold text-section-success">good friend</span> do?
                </p>
            </div>

            {/* The Contrast */}
            <div className="border-t border-border/50 pt-6 mt-2">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-right">
                        <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">A typical company says</p>
                        <p className="text-sm text-secondary italic">"Here's what earns us the most commission."</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-xs font-mono text-section-success uppercase tracking-wider mb-2">A good friend says</p>
                        <p className="text-sm text-primary italic">"Here's what's best for you – even if we don't earn anything."</p>
                    </div>
                </div>
                <p className="text-center text-xs text-muted mt-6 max-w-lg mx-auto">
                    Are we perfect? No. But this question guides the decisions we make.
                </p>
            </div>
        </div>

        {/* WHAT: Subscription Guard */}
        <div className="p-6 rounded-xl bg-section-problem border border-section-problem relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-nested border border-border">
                    <Shield size={20} className="text-section-problem" />
                </div>
                <div>
                    <div className="text-xs font-mono text-muted uppercase tracking-wider">WHAT</div>
                    <h3 className="text-xl font-bold text-section-problem">Subscription Guard</h3>
                </div>
            </div>

            {/* The Promise - Hero Statement */}
            <div className="text-center py-6 mb-6">
                <p className="text-xs font-mono text-section-problem uppercase tracking-widest mb-4">Tarifaufpasser</p>
                <p className="text-2xl md:text-3xl font-light text-primary leading-tight max-w-xl mx-auto">
                    Never <span className="font-bold text-section-problem">overcharged</span> again.
                </p>
            </div>

            {/* The Shift */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-4 border-t border-b border-border/50">
                <div className="text-center">
                    <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Not this</p>
                    <p className="text-sm text-secondary">One-time switch</p>
                </div>
                <ArrowRight size={20} className="text-section-problem rotate-90 md:rotate-0" />
                <div className="text-center">
                    <p className="text-xs font-mono text-section-problem uppercase tracking-wider mb-1">This</p>
                    <p className="text-sm text-primary font-medium">Continuous protection</p>
                </div>
            </div>

            {/* The Cycle - Simple Flow */}
            <div className="mt-6">
                <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm flex-wrap">
                    <span className="text-secondary">We</span>
                    <span className="px-3 py-1.5 rounded-full bg-nested border border-border text-primary font-medium">monitor</span>
                    <span className="text-muted">→</span>
                    <span className="px-3 py-1.5 rounded-full bg-nested border border-border text-primary font-medium">detect</span>
                    <span className="text-muted">→</span>
                    <span className="px-3 py-1.5 rounded-full bg-nested border border-border text-primary font-medium">act</span>
                    <span className="text-muted">→</span>
                    <span className="px-3 py-1.5 rounded-full bg-section-problem/20 border border-section-problem text-section-problem font-medium">protect</span>
                    <span className="text-muted hidden md:inline">↻</span>
                </div>
                <p className="text-center text-xs text-muted mt-4">
                    Your subscriptions, managed over time – so you can forget about them.
                </p>
            </div>
        </div>

        {/* The Connection */}
        <div className="p-4 rounded-lg bg-surface border border-default">
            <div className="flex items-center gap-4 justify-center text-sm">
                <span className="px-3 py-1 rounded bg-section-focus/20 text-section-focus font-medium">WHY</span>
                <ArrowRight size={16} className="text-muted" />
                <span className="px-3 py-1 rounded bg-section-success/20 text-section-success font-medium">HOW</span>
                <ArrowRight size={16} className="text-muted" />
                <span className="px-3 py-1 rounded bg-section-problem/20 text-section-problem font-medium">WHAT</span>
            </div>
            <p className="text-xs text-muted text-center mt-3 italic">
                Fairness drives us. Friendship guides us. Subscription Guard is how we deliver.
            </p>
        </div>
    </div>
);

/**
 * Beliefs - Our core beliefs about team, learning, and work
 */
export const BeliefsContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-secondary">
            The beliefs that shape how we work as a team, how we learn, and how we create impact. Hypotheses we're betting on.
        </p>

        {/* The Market Belief */}
        <div className="p-6 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">The Market Belief</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-sm text-secondary">
                        We believe <strong>markets can be transformed toward fairness</strong> – not through regulation alone, but through technology that shifts power back to consumers.
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
                        Individual empowerment creates collective change. If we succeed, providers must compete on actual value – not on customers forgetting to cancel.
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
                        We believe a <strong>small, high-trust team can have outsized impact</strong> – able to flip entire markets if energy is channeled correctly.
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
                            Best practices AND things that didn't work. Failures aren't shameful – they're the fuel for learning. Hiding mistakes prevents the team from improving.
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
                "A small team of talented people, learning fast, channeling their energy correctly – can flip entire markets."
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
            A small, closely knit team where each person owns problem spaces end-to-end – orchestrating AI to achieve outcomes.
        </p>

        {/* Small by Design */}
        <div className="p-6 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4">Small by Design</h4>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <p className="text-sm text-secondary">
                        We're not a small team that's "scaling up." We <strong>choose to stay small</strong> – a closely knit group of highly talented individuals who trust each other deeply.
                    </p>
                    <p className="text-xs text-secondary">
                        Small means everyone knows everything. No information silos. No coordination overhead. No politics. Just people who trust each other, moving fast toward a shared goal.
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-xs font-mono text-section-planning mb-3">THE HYPOTHESIS</div>
                    <p className="text-sm text-primary italic mb-3">
                        A small team can flip entire markets – if energy is channeled correctly.
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
                            <div className="text-[10px] text-secondary">You own a problem space. You're responsible for understanding it deeply, defining what success looks like, and making it happen – using whatever tools and skills that requires.</div>
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
                    In this model, each of us acts as an <strong>AI orchestrator</strong> for our problem spaces. Your job is to direct AI capabilities toward solving problems – not to do everything yourself.
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
                    This model requires <strong>new skills – particularly meta skills</strong>. The ability to think clearly about problems matters more than the ability to execute any specific task.
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
                        "The skill isn't doing the work – it's knowing what work needs to be done and directing AI to do it well."
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
                        This only works in a mutually inspiring environment where we share best practices – <em>including things that didn't work</em>. Failures aren't shameful. They're part of experimenting.
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
                "This is a new way of working. We're figuring it out as we go. If you're excited by end-to-end ownership, AI orchestration, and the challenge of flipping markets with a small team – we should talk."
            </p>
            <p className="text-xs text-muted mt-2">
                If this resonates, maybe we should explore whether we'd enjoy building together.
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
                    <div className="text-sm font-medium text-primary mb-2">Define the 'What'</div>
                    <div className="text-[10px] text-secondary">
                        Understand user problems deeply. Translate needs into clear requirements. Own the product vision for your space.
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-sm font-medium text-primary mb-2">Design the 'How'</div>
                    <div className="text-[10px] text-secondary">
                        Shape the user experience. Make technical decisions with empathy. Create solutions that feel right.
                    </div>
                </div>
                <div className="p-4 rounded-lg bg-nested-deep border border-border">
                    <div className="text-sm font-medium text-primary mb-2">Orchestrate the 'Execution'</div>
                    <div className="text-[10px] text-secondary">
                        Direct AI to build. Verify quality. Iterate rapidly. Ship outcomes, not just code.
                    </div>
                </div>
            </div>
        </div>

        {/* The Invitation */}
        <div className="p-4 rounded-lg bg-surface border border-default text-center">
            <p className="text-sm text-secondary italic">
                "We don't know exactly what this role becomes. We're discovering it together. If you want to help define the future of product engineering – let's talk."
            </p>
        </div>
    </div>
);

