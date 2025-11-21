
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database, TrendingUp, GitPullRequest, Server, User, Zap,
    ArrowRight, Check, AlertTriangle, ShieldCheck,
    Terminal, Activity, Layers, Cpu, Globe, Lock,
    ChevronRight, ChevronDown, Folder, FileText, Layout,
    Box, Hexagon, Grid, Disc, Heart, Palette, PlayCircle,
    Code, MessageSquare, BookOpen, Monitor, PaintBucket,
    Workflow, Brain, Hammer, Shield, Network
} from 'lucide-react';

// --- Types ---

type ItemType = 'domain' | 'doc';

interface ProblemSpace {
    id: string;
    title: string;
    subtitle: string;
    problem: string;
    outcome: string;
    intermediate: {
        role: string;
        description: string;
        activities: string[];
    };
    target: {
        role: string;
        description: string;
        activities: string[];
    };
    prerequisites: string[];
}

interface ExplorerItem {
    id: string;
    type: ItemType;
    title: string;
    icon: any;
    color: string;
    spaces?: ProblemSpace[]; // Only for domains
    content?: React.ReactNode; // Only for docs
}

// --- Content Components ---

const AnatomyContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="mb-6">
            <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                <Network size={20} /> The System Anatomy
            </h3>
            <p className="text-sm text-secondary">
                A spatial view of the architecture. We move from a "Monolith" to a biological system composed of a <strong>Brain</strong>, a <strong>Spine</strong>, and <strong>Limbs</strong>.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {/* The Brain */}
            <div className="md:col-span-3 p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><GitPullRequest size={120} /></div>
                <h3 className="text-xl font-bold text-amber-400 mb-2 flex items-center gap-2">
                    <GitPullRequest size={20} /> The Brain (/case)
                </h3>
                <p className="text-sm text-secondary mb-4 max-w-2xl">
                    The centralized <strong>Process Orchestrator</strong>. It is the "Chief Executive" that understands the complete story of a business goal. It directs the Limbs and updates the Spine.
                </p>
                <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-amber-500/20 text-[10px] font-mono text-amber-300 border border-amber-500/30">STRATEGY</span>
                    <span className="px-2 py-1 rounded bg-amber-500/20 text-[10px] font-mono text-amber-300 border border-amber-500/30">ORCHESTRATION</span>
                </div>
            </div>

            {/* The Spine */}
            <div className="md:col-span-1 p-6 rounded-xl bg-blue-500/10 border border-blue-500/30 relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute bottom-0 right-0 p-4 opacity-10"><Database size={80} /></div>
                <div>
                    <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
                        <Database size={18} /> The Spine (/lifecycle)
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed">
                        The <strong>System of Record</strong> and Guardian of Truth. It exposes atomic "Business Intents" and guarantees consistency. It calls no one; everyone calls it.
                    </p>
                </div>
                <div className="mt-4">
                    <span className="px-2 py-1 rounded bg-blue-500/20 text-[10px] font-mono text-blue-300 border border-blue-500/30">TRUTH</span>
                </div>
            </div>

            {/* The Limbs */}
            <div className="md:col-span-2 p-6 rounded-xl bg-purple-500/10 border border-purple-500/30 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 p-4 opacity-10"><Grid size={100} /></div>
                <h3 className="text-lg font-bold text-purple-400 mb-2 flex items-center gap-2">
                    <Grid size={18} /> The Limbs (Capabilities)
                </h3>
                <p className="text-xs text-secondary mb-4">
                    Specialized <strong>Expert Domains</strong> (/provider, /service, /offer, /optimisation, /growth). They provide stateless "tools" and capabilities. They never orchestrate; they only execute.
                </p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded bg-black/20 border border-purple-500/20 text-[10px] font-mono text-purple-300 flex items-center gap-2">
                        <Server size={10} /> /provider
                    </div>
                    <div className="p-2 rounded bg-black/20 border border-purple-500/20 text-[10px] font-mono text-purple-300 flex items-center gap-2">
                        <User size={10} /> /service
                    </div>
                    <div className="p-2 rounded bg-black/20 border border-purple-500/20 text-[10px] font-mono text-purple-300 flex items-center gap-2">
                        <Database size={10} /> /offer
                    </div>
                    <div className="p-2 rounded bg-black/20 border border-purple-500/20 text-[10px] font-mono text-purple-300 flex items-center gap-2">
                        <TrendingUp size={10} /> /optimisation
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const HierarchyContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="mb-6">
            <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                <Layers size={20} /> The Hierarchy of Abstraction
            </h3>
            <p className="text-sm text-secondary">
                A unified view of how <strong>Domain-Driven Design</strong> (Philosophy) maps to <strong>Capabilities</strong> (Tools) and <strong>Intents</strong> (Safety). This hierarchy creates the "Cognitive Stack" for our AI agents.
            </p>
        </div>

        {/* Level 3: Strategy */}
        <div className="relative pl-8 border-l-2 border-amber-500/30 pb-8">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-black shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            <div className="p-5 rounded-xl bg-amber-950/10 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="text-lg font-bold text-amber-400">Level 3: Strategic Playbooks</h4>
                        <div className="text-xs font-mono text-amber-300/70">THE ZONING LAWS</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-amber-500/20 text-[10px] font-mono text-amber-300 border border-amber-500/30">STRATEGY</span>
                </div>
                <p className="text-sm text-secondary mb-4">
                    <strong>"Known, successful solutions."</strong> High-level, end-to-end business processes (e.g., <code>handle-price-increase</code>).
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded border border-amber-500/10">
                        <div className="text-[10px] font-mono text-muted uppercase mb-1">DDD Concept</div>
                        <div className="text-xs text-amber-200">Bounded Contexts & Orchestration</div>
                    </div>
                    <div className="bg-black/20 p-3 rounded border border-amber-500/10">
                        <div className="text-[10px] font-mono text-muted uppercase mb-1">AI Role</div>
                        <div className="text-xs text-amber-200">"The Planner"</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Level 2: Tactics */}
        <div className="relative pl-8 border-l-2 border-purple-500/30 pb-8">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-black shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            <div className="p-5 rounded-xl bg-purple-950/10 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="text-lg font-bold text-purple-400">Level 2: Business Capabilities</h4>
                        <div className="text-xs font-mono text-purple-300/70">THE APPLIANCES</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-purple-500/20 text-[10px] font-mono text-purple-300 border border-purple-500/30">TACTICS</span>
                </div>
                <p className="text-sm text-secondary mb-4">
                    <strong>"The Workshop Toolbox."</strong> Specialized sub-routines (e.g., <code>generate-recommendation</code>).
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded border border-purple-500/10">
                        <div className="text-[10px] font-mono text-muted uppercase mb-1">DDD Concept</div>
                        <div className="text-xs text-purple-200">Domain Services & Aggregates</div>
                    </div>
                    <div className="bg-black/20 p-3 rounded border border-purple-500/10">
                        <div className="text-[10px] font-mono text-muted uppercase mb-1">AI Role</div>
                        <div className="text-xs text-purple-200">"The Tool User"</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Level 1: Ops */}
        <div className="relative pl-8 border-l-2 border-blue-500/30">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-black shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <div className="p-5 rounded-xl bg-blue-950/10 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="text-lg font-bold text-blue-400">Level 1: Atomic Intents</h4>
                        <div className="text-xs font-mono text-blue-300/70">THE KNIFE CUTS</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-blue-500/20 text-[10px] font-mono text-blue-300 border border-blue-500/30">OPS</span>
                </div>
                <p className="text-sm text-secondary mb-4">
                    <strong>"The System of Record."</strong> Granular, immutable verbs (e.g., <code>ConfirmActivation</code>).
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded border border-blue-500/10">
                        <div className="text-[10px] font-mono text-muted uppercase mb-1">DDD Concept</div>
                        <div className="text-xs text-blue-200">Command Handlers & Events</div>
                    </div>
                    <div className="bg-black/20 p-3 rounded border border-blue-500/10">
                        <div className="text-[10px] font-mono text-muted uppercase mb-1">AI Role</div>
                        <div className="text-xs text-blue-200">"The Safe Operator"</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const EvolutionContent = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center gap-2">
                <Brain size={20} /> Purpose-Built for Agentic AI
            </h3>
            <p className="text-sm text-secondary">
                Why this architecture enables AI to function as a "Senior Architect" rather than a "Junior Coder".
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className="p-5 rounded-xl bg-red-950/10 border border-red-900/30 opacity-70">
                <h4 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
                    <AlertTriangle size={16} /> Traditional Architecture
                </h4>
                <ul className="space-y-3">
                    <li className="text-xs text-secondary flex gap-2">
                        <span className="text-red-500">✖</span>
                        <span>AI sees "Disconnected LEGOs" (technical endpoints like <code>GET /contracts/123</code>).</span>
                    </li>
                    <li className="text-xs text-secondary flex gap-2">
                        <span className="text-red-500">✖</span>
                        <span>AI must "be a developer" and chain complex calls.</span>
                    </li>
                    <li className="text-xs text-secondary flex gap-2">
                        <span className="text-red-500">✖</span>
                        <span>Dangerous <code>PATCH</code> requests can break state.</span>
                    </li>
                </ul>
            </div>

            {/* The New Way */}
            <div className="p-5 rounded-xl bg-green-950/10 border border-green-500/30">
                <h4 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                    <Check size={16} /> SwitchUp NextGen
                </h4>
                <ul className="space-y-3">
                    <li className="text-xs text-secondary flex gap-2">
                        <span className="text-green-500">✔</span>
                        <span>AI sees "Business Tools" (e.g., <code>generate-recommendation</code>).</span>
                    </li>
                    <li className="text-xs text-secondary flex gap-2">
                        <span className="text-green-500">✔</span>
                        <span>AI acts as "Supervisor", composing capabilities.</span>
                    </li>
                    <li className="text-xs text-secondary flex gap-2">
                        <span className="text-green-500">✔</span>
                        <span><strong>Architecturally Impossible</strong> to break state via Intents.</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="p-5 rounded-xl bg-surface border border-default">
            <h4 className="text-sm font-mono text-muted uppercase tracking-wider mb-4 text-center">The AI Toolbox</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded bg-black/20 border border-amber-500/20">
                    <div className="text-amber-400 font-bold text-lg mb-1">1. Strategy</div>
                    <div className="text-[10px] text-muted">Playbooks</div>
                </div>
                <div className="p-3 rounded bg-black/20 border border-purple-500/20">
                    <div className="text-purple-400 font-bold text-lg mb-1">2. Tactics</div>
                    <div className="text-[10px] text-muted">Capabilities</div>
                </div>
                <div className="p-3 rounded bg-black/20 border border-blue-500/20">
                    <div className="text-blue-400 font-bold text-lg mb-1">3. Ops</div>
                    <div className="text-[10px] text-muted">Intents</div>
                </div>
            </div>
            <p className="text-xs text-center text-secondary mt-4 italic">
                "The AI is not solving problems from first principles. It is composing powerful, existing business capabilities."
            </p>
        </div>
    </div>
);

const WalkthroughContent = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <div className="mb-4">
            <h3 className="text-xl font-bold text-primary mb-1">Practical Example</h3>
            <p className="text-sm text-muted">"Ensuring Jane Doe is on the Best Deal"</p>
        </div>

        <div className="relative border-l-2 border-default ml-4 space-y-8">
            {/* Act 1 */}
            <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-black shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                <h4 className="text-sm font-bold text-amber-400 mb-1">Act I: The Director Calls</h4>
                <p className="text-xs text-secondary mb-2">
                    The <strong>/case</strong> domain (Brain) wakes up. It needs to check a contract.
                </p>
                <div className="bg-black/30 p-3 rounded border border-default/50 font-mono text-[10px] text-muted">
                    <span className="text-amber-400">Orchestrator:</span> "Get details for C123."<br />
                    <span className="text-blue-400">Lifecycle:</span> "Here is the contract."<br />
                    <span className="text-purple-400">Optimisation:</span> "Switching saves $200/yr."
                </div>
            </div>

            {/* Act 2 */}
            <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-black shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                <h4 className="text-sm font-bold text-purple-400 mb-1">Act II: The Decision</h4>
                <p className="text-xs text-secondary mb-2">
                    The Orchestrator decides to proceed. It needs to notify the user.
                </p>
                <div className="bg-black/30 p-3 rounded border border-default/50 font-mono text-[10px] text-muted">
                    <span className="text-amber-400">Orchestrator:</span> "Dispatch notification."<br />
                    <span className="text-purple-400">Service:</span> "Email sent to Jane."
                </div>
            </div>

            {/* Act 3 */}
            <div className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-black shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                <h4 className="text-sm font-bold text-blue-400 mb-1">Act III: The Commitment</h4>
                <p className="text-xs text-secondary mb-2">
                    The Orchestrator must update the state. It uses a <strong>Business Intent</strong>.
                </p>
                <div className="bg-blue-950/10 p-3 rounded border border-blue-500/30 font-mono text-[10px]">
                    <div className="text-blue-300 mb-1">COMMAND: /lifecycle/apply-transition</div>
                    <div className="text-blue-500/70">
                        {`{
  "contract_id": "C123",
  "new_status": "AWAITING_USER",
  "reason": "PROPOSAL_SENT"
}`}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Data ---

const DATA: ExplorerItem[] = [
    {
        id: 'anatomy',
        type: 'doc',
        title: 'System Anatomy',
        icon: Network,
        color: 'cyan',
        content: <AnatomyContent />
    },
    {
        id: 'hierarchy',
        type: 'doc',
        title: 'The Hierarchy',
        icon: Layers,
        color: 'orange',
        content: <HierarchyContent />
    },
    {
        id: 'evolution',
        type: 'doc',
        title: 'Agentic Evolution',
        icon: Brain,
        color: 'green',
        content: <EvolutionContent />
    },
    {
        id: 'walkthrough',
        type: 'doc',
        title: 'System Walkthrough',
        icon: PlayCircle,
        color: 'blue',
        content: <WalkthroughContent />
    },
    {
        id: 'offer',
        type: 'domain',
        title: 'Offer Domain',
        icon: Database,
        color: 'blue',
        spaces: [
            {
                id: 'modelling',
                title: 'Offer Modelling',
                subtitle: 'Universal Service Ontology',
                problem: 'Lack of a unified, flexible data model forces inconsistent representations of complex offers across markets (Energy, Telco, Insurance).',
                outcome: 'A unified, extensible Offer Data Model ontology serves as the canonical language for representing all service agreements.',
                intermediate: {
                    role: 'Offer Admin as Operator',
                    description: 'Humans translate domain knowledge into predefined model components using specialized configuration tools.',
                    activities: [
                        'Translate domain knowledge manually',
                        'Configure Blueprints & Policies',
                        'Bridge gaps for new domains'
                    ]
                },
                target: {
                    role: 'Offer Admin as Supervisor',
                    description: 'Generative AI models analyze diverse examples and propose schema extensions. Humans validate and refine.',
                    activities: [
                        'AI analyzes docs & web pages',
                        'AI proposes schema extensions',
                        'Humans validate AI models'
                    ]
                },
                prerequisites: ['Core extensible data modeling framework', 'AI model governance', 'Visualization tools']
            },
            {
                id: 'normalisation',
                title: 'Offer Normalisation',
                subtitle: 'Semantic Translation',
                problem: 'Significant manual effort and high error rates in transforming inconsistent offer data from numerous external sources.',
                outcome: 'All ingested external offer data is reliably interpreted and transformed into the canonical internal model.',
                intermediate: {
                    role: 'Offer Admin as Operator',
                    description: 'Admins maintain brittle, source-specific transformation rules that require frequent manual adjustment.',
                    activities: [
                        'Maintain mapping rules',
                        'Write parsing scripts',
                        'Manually adjust for source changes'
                    ]
                },
                target: {
                    role: 'Offer Admin as Supervisor',
                    description: 'Adaptive AI systems perform dynamic semantic interpretation with minimal explicit rules, learning from examples.',
                    activities: [
                        'AI interprets diverse formats',
                        'AI learns translation patterns',
                        'Humans provide correction feedback'
                    ]
                },
                prerequisites: ['Robust data validation', 'Advanced AI interpretation models', 'Efficient feedback loops']
            },
            {
                id: 'matching',
                title: 'Offer Matching',
                subtitle: 'Identity Disambiguation',
                problem: 'Incoming offer data lacks stable identifiers, making it difficult to link to the correct canonical offer definition.',
                outcome: 'Every external offer instance is automatically and accurately linked to its unique canonical internal definition.',
                intermediate: {
                    role: 'Offer Admin as Operator',
                    description: 'Systems rely on configurable heuristics. Humans manually resolve low-confidence or conflicting matches.',
                    activities: [
                        'Configure matching heuristics',
                        'Manually resolve conflicts',
                        'Investigate low-confidence matches'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'AI agents employ multi-modal reasoning to achieve near-perfect automated identity resolution.',
                    activities: [
                        'AI analyzes multi-modal context',
                        'AI resolves identities automatically',
                        'Humans judge novel edge cases'
                    ]
                },
                prerequisites: ['Rich metadata catalog', 'Entity resolution AI', 'Continuous learning loop']
            }
        ]
    },
    {
        id: 'optimisation',
        type: 'domain',
        title: 'Optimisation Domain',
        icon: TrendingUp,
        color: 'purple',
        spaces: [
            {
                id: 'selection',
                title: 'Optimal Offer Selection',
                subtitle: 'Core Savings Calculation',
                problem: 'Current logic relies on simplistic cost ranking, failing to identify the truly optimal offer for a user\'s complex needs.',
                outcome: 'Every recommendation represents the maximum long-term value proposition, considering financial and non-financial factors.',
                intermediate: {
                    role: 'Optimisation Admin as Operator',
                    description: 'Humans define explicit scoring functions and rule sets based on simplified models of user utility.',
                    activities: [
                        'Define scoring formulas',
                        'Manually rank offers',
                        'Update static cost rules'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'Advanced engines perform comprehensive long-term value calculations, synthesizing financial projections with user utility.',
                    activities: [
                        'AI calculates long-term value',
                        'AI models user utility',
                        'Humans refine scoring models'
                    ]
                },
                prerequisites: ['Robust cost engine', 'User preference modeling', 'High-performance computation']
            },
            {
                id: 'decision',
                title: 'Switch Decision Assessment',
                subtitle: 'Go/No-Go Evaluation',
                problem: 'Determining whether switching is genuinely beneficial requires complex calculations that are often oversimplified.',
                outcome: 'Every proposed switch receives a rapid, definitive evaluation against configurable business rules and savings thresholds.',
                intermediate: {
                    role: 'Optimisation Admin as Operator',
                    description: 'Static business rules and simplified cost comparison logic manually configured and updated.',
                    activities: [
                        'Configure static rules',
                        'Maintain threshold values',
                        'Update logic for market changes'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'Stateless evaluation functions perform consistent assessments using sophisticated value calculations.',
                    activities: [
                        'AI executes complex assessments',
                        'Humans define strategic rules',
                        'Humans monitor decision quality'
                    ]
                },
                prerequisites: ['Flexible business rules engine', 'Audit trail', 'Clear success criteria']
            }
        ]
    },
    {
        id: 'case',
        type: 'domain',
        title: 'Case Domain',
        icon: GitPullRequest,
        color: 'amber',
        spaces: [
            {
                id: 'monitoring',
                title: 'Event Monitoring',
                subtitle: 'State Signal Detection',
                problem: 'Detecting critical events relies on manual review or brittle keyword rules, leading to delays and missed events.',
                outcome: 'The true state and all significant lifecycle events for every contract are inferred in near real-time.',
                intermediate: {
                    role: 'Case Admin as Operator',
                    description: 'Systems employ pattern matching and basic classification. Significant manual review of unclassified items.',
                    activities: [
                        'Define keyword rules',
                        'Manually review unclassified items',
                        'Update patterns for new events'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'Advanced AI models analyze communication streams holistically, inferring subtle state changes and predicting future events.',
                    activities: [
                        'AI infers semantic state',
                        'AI predicts future events',
                        'Humans investigate anomalies'
                    ]
                },
                prerequisites: ['Unified stream ingestion', 'Temporal reasoning AI', 'Complex event detection']
            },
            {
                id: 'orchestration',
                title: 'Workflow Orchestration',
                subtitle: 'Process Synthesis',
                problem: 'Managing complex processes is rigid. Existing tools lack flexibility to handle exceptions or adapt execution.',
                outcome: 'Business processes achieve goals through dynamically synthesized and optimized execution plans.',
                intermediate: {
                    role: 'Case Admin as Operator',
                    description: 'Humans explicitly model workflows as static sequences. Exception handling is pre-defined and manual.',
                    activities: [
                        'Design static workflows',
                        'Manually handle exceptions',
                        'Redesign flows for new cases'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'AI planning agents decompose goals into task sequences, dynamically orchestrating resources and replanning for exceptions.',
                    activities: [
                        'AI decomposes high-level goals',
                        'AI dynamically selects resources',
                        'AI replans for exceptions'
                    ]
                },
                prerequisites: ['Goal definition language', 'AI planning framework', 'Real-time feedback loop']
            },
            {
                id: 'tasks',
                title: 'Task Management',
                subtitle: 'Work Allocation',
                problem: 'Volume and diversity of tasks overwhelm manual assignment, leading to delays and inefficient use of time.',
                outcome: 'Every task is routed to and executed by the optimal actor (human or AI) dynamically.',
                intermediate: {
                    role: 'Case Admin as Operator',
                    description: 'Static rules assign predefined task types. Admins manage queue prioritization manually.',
                    activities: [
                        'Configure assignment rules',
                        'Manually prioritize queues',
                        'Reassign stuck tasks'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'AI orchestration dynamically assesses task requirements and predicts optimal assignment, automating feasible tasks.',
                    activities: [
                        'AI assesses task complexity',
                        'AI predicts optimal actor',
                        'AI automates feasible tasks'
                    ]
                },
                prerequisites: ['Centralized task tracking', 'Actor capability mapping', 'Advanced scheduling engine']
            }
        ]
    },
    {
        id: 'provider',
        type: 'domain',
        title: 'Provider Domain',
        icon: Server,
        color: 'red',
        spaces: [
            {
                id: 'config',
                title: 'Provider Configuration',
                subtitle: 'Knowledge Synthesis',
                problem: 'Maintaining accurate understanding of thousands of providers is difficult due to scattered, undocumented information.',
                outcome: 'A dynamic, self-updating internal knowledge graph serves as a high-fidelity digital twin of the provider ecosystem.',
                intermediate: {
                    role: 'Provider Admin as Operator',
                    description: 'Humans manually gather intelligence and configure provider attributes. Updates are reactive.',
                    activities: [
                        'Manually gather intelligence',
                        'Configure provider rules',
                        'Reactively fix outdated info'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'AI agents monitor sources (portals, logs) and autonomously propose validated updates to the knowledge graph.',
                    activities: [
                        'AI monitors external sources',
                        'AI infers provider changes',
                        'Humans approve knowledge updates'
                    ]
                },
                prerequisites: ['Knowledge graph framework', 'Web monitoring agents', 'Change detection pipelines']
            },
            {
                id: 'automation',
                title: 'API/Bot Automation',
                subtitle: 'Interface Negotiation',
                problem: 'Automating interactions is hampered by unstable portals and lack of APIs, resulting in brittle scripts.',
                outcome: 'Critical interactions are reliably automated, demonstrating self-adaptation to interface changes.',
                intermediate: {
                    role: 'Bot Admin as Operator',
                    description: 'Developers maintain specific API clients and scripts, updating them semi-manually when they break.',
                    activities: [
                        'Write specific API clients',
                        'Debug broken scripts',
                        'Manually rewrite for changes'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'Adaptive AI agents autonomously navigate interfaces, detecting changes and attempting automated repair.',
                    activities: [
                        'AI navigates visual UIs',
                        'AI detects interface changes',
                        'AI self-heals scripts'
                    ]
                },
                prerequisites: ['Visual UI understanding', 'Automated script repair', 'Secure execution env']
            },
            {
                id: 'extraction',
                title: 'Data Extraction',
                subtitle: 'Knowledge Distillation',
                problem: 'Critical data is buried in unstructured text, requiring inefficient manual entry or brittle templates.',
                outcome: 'Essential information in unstructured communications is automatically extracted and structured with high fidelity.',
                intermediate: {
                    role: 'Extraction Admin as Operator',
                    description: 'Systems rely on manually crafted rules and partial LLM usage. Humans validate and correct data.',
                    activities: [
                        'Craft extraction rules',
                        'Manually validate data',
                        'Correct extraction errors'
                    ]
                },
                target: {
                    role: 'Extraction Admin as Supervisor',
                    description: 'AI applies constantly adapting extractions. Humans focus on defining goals and validating anomalies.',
                    activities: [
                        'AI detects recurring patterns',
                        'AI adapts to new formats',
                        'Humans define extraction goals'
                    ]
                },
                prerequisites: ['Extraction-specialized LLMs', 'Target schema definition', 'Validation feedback system']
            }
        ]
    },
    {
        id: 'service',
        type: 'domain',
        title: 'Service Domain',
        icon: User,
        color: 'pink',
        spaces: [
            {
                id: 'self-service',
                title: 'Self-Servicing',
                subtitle: 'Seamless Agency',
                problem: 'Users lack direct channels to manage routine tasks, forcing them to contact support agents.',
                outcome: 'Users achieve goals effortlessly through proactive, intuitive self-service interfaces.',
                intermediate: {
                    role: 'Service Admin as Operator',
                    description: 'A portal offers forms for a limited set of explicitly implemented common tasks.',
                    activities: [
                        'Build static forms',
                        'Link to backend processes',
                        'Handle non-standard requests manually'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'AI-driven interfaces understand intent, generate interaction flows, and execute backend actions.',
                    activities: [
                        'AI understands natural language',
                        'AI generates interaction flows',
                        'AI executes backend actions'
                    ]
                },
                prerequisites: ['Conversational AI', 'Dynamic UI generation', 'Deep context integration']
            },
            {
                id: 'interactions',
                title: 'Service Interactions',
                subtitle: 'Cognitive Augmentation',
                problem: 'Support colleagues spend time on repetitive inquiries and routine tasks, limiting availability for complex issues.',
                outcome: 'Human colleagues, amplified by AI, resolve complex issues with speed and empathy.',
                intermediate: {
                    role: 'Service Admin as Operator',
                    description: 'AI provides information and suggestions. Users interact with chatbots for basic topics.',
                    activities: [
                        'Review AI suggestions',
                        'Handle escalated chats',
                        'Manually search knowledge base'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'AI "copilot" analyzes context, automates tasks, and summarizes cases. Humans focus on relationships.',
                    activities: [
                        'AI analyzes conversation context',
                        'AI automates backend tasks',
                        'Humans focus on empathy & judgment'
                    ]
                },
                prerequisites: ['Real-time conversation analysis', 'Response suggestion', 'Omni-channel platform']
            }
        ]
    },
    {
        id: 'growth',
        type: 'domain',
        title: 'Growth Domain',
        icon: Zap,
        color: 'green',
        spaces: [
            {
                id: 'guidance',
                title: 'Expert Guidance',
                subtitle: 'Generative Authority',
                problem: 'Creating a comprehensive knowledge base requires prohibitive manual research and content creation effort.',
                outcome: 'SwitchUp is the indispensable, AI-powered knowledge resource for consumers.',
                intermediate: {
                    role: 'Growth Admin as Operator',
                    description: 'Human experts manually research and instruct AI for content creation.',
                    activities: [
                        'Manually research topics',
                        'Instruct AI for drafts',
                        'Edit and publish content'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'AI monitors markets and drafts content. Human experts review and add strategic insights.',
                    activities: [
                        'AI monitors market trends',
                        'AI drafts data-rich content',
                        'Humans add strategic insight'
                    ]
                },
                prerequisites: ['High-quality data streams', 'Generative AI models', 'Collaborative content platform']
            },
            {
                id: 'onboarding',
                title: 'User Onboarding',
                subtitle: 'Conversion Synthesis',
                problem: 'Static onboarding fails to address diverse user concerns, leading to drop-off.',
                outcome: 'Onboarding adapts fluidly to each user, maximizing conversion rates.',
                intermediate: {
                    role: 'Growth Admin as Operator',
                    description: 'Humans design and A/B test variations of static onboarding funnels.',
                    activities: [
                        'Design funnel variations',
                        'Run A/B tests',
                        'Analyze aggregate data'
                    ]
                },
                target: {
                    role: 'Admin as Supervisor',
                    description: 'AI agents manage end-to-end onboarding, personalizing content and steps in real-time.',
                    activities: [
                        'AI personalizes journey steps',
                        'AI optimizes via reinforcement learning',
                        'Humans define conversion goals'
                    ]
                },
                prerequisites: ['Real-time behavior tracking', 'Dynamic personalization', 'Reinforcement learning']
            }
        ]
    }
];

// --- Components ---

export const ProblemSpaces = () => {
    const [selectedItemId, setSelectedItemId] = useState<string>(DATA[0].id);
    const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'intermediate' | 'target'>('intermediate');

    const activeItem = DATA.find(d => d.id === selectedItemId) || DATA[0];

    // Determine active space safely
    const activeSpace = activeItem.type === 'domain' && activeItem.spaces
        ? (activeItem.spaces.find(s => s.id === selectedSpaceId) || activeItem.spaces[0])
        : null;

    // Handle Item Click
    const handleItemClick = (itemId: string) => {
        if (selectedItemId === itemId) return;
        setSelectedItemId(itemId);

        const item = DATA.find(d => d.id === itemId);
        if (item?.type === 'domain' && item.spaces) {
            setSelectedSpaceId(item.spaces[0].id);
            setViewMode('intermediate');
        } else {
            setSelectedSpaceId(null);
        }
    };

    return (
        <div className="border border-default rounded-xl bg-black/40 overflow-hidden shadow-2xl">
            {/* Window Header */}
            <div className="h-8 bg-surface border-b border-default flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex-1 text-center">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-widest">System_Architecture_Explorer.exe</span>
                </div>
                <div className="w-12" />
            </div>

            <div className="grid lg:grid-cols-12 h-[650px]">
                {/* 1. Left Sidebar: System Explorer */}
                <div className="lg:col-span-3 border-r border-default bg-surface/10 flex flex-col">
                    <div className="p-3 border-b border-default/50">
                        <h3 className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-2">
                            <Layout size={12} /> Explorer
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {DATA.map((item) => {
                            const isActive = selectedItemId === item.id;
                            return (
                                <div key={item.id} className="space-y-1">
                                    {/* Item Header */}
                                    <button
                                        onClick={() => handleItemClick(item.id)}
                                        className={`
                                            w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-bold transition-all
                                            ${isActive
                                                ? `bg-surface text-primary border border-${item.color}-500/30`
                                                : 'text-muted hover:text-secondary hover:bg-surface/20 border border-transparent'
                                            }
                                        `}
                                    >
                                        {item.type === 'domain' ? (
                                            isActive ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                                        ) : (
                                            <Disc size={14} className={isActive ? `text-${item.color}-400` : ''} />
                                        )}

                                        {item.type === 'domain' && (
                                            <item.icon size={14} className={isActive ? `text-${item.color}-400` : ''} />
                                        )}

                                        {item.title}
                                    </button>

                                    {/* Sub-items (Problem Spaces) for Domains */}
                                    <AnimatePresence>
                                        {isActive && item.type === 'domain' && item.spaces && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden ml-4 pl-2 border-l border-default/30 space-y-1"
                                            >
                                                {item.spaces.map((space) => {
                                                    const isSpaceActive = selectedSpaceId === space.id;
                                                    return (
                                                        <button
                                                            key={space.id}
                                                            onClick={() => setSelectedSpaceId(space.id)}
                                                            className={`
                                                                w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono text-left transition-all
                                                                ${isSpaceActive
                                                                    ? `bg-${item.color}-500/10 text-${item.color}-400`
                                                                    : 'text-muted hover:text-secondary'
                                                                }
                                                            `}
                                                        >
                                                            <FileText size={12} className={isSpaceActive ? 'opacity-100' : 'opacity-50'} />
                                                            {space.title}
                                                        </button>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Main Content Area */}
                <div className="lg:col-span-9 flex flex-col bg-black/20">
                    {/* Breadcrumbs */}
                    <div className="h-10 border-b border-default flex items-center px-6 gap-2 text-xs font-mono text-muted">
                        <span className="flex items-center gap-1">
                            {activeItem.type === 'domain' ? <Folder size={12} /> : <FileText size={12} />}
                            {activeItem.title}
                        </span>
                        {activeSpace && (
                            <>
                                <ChevronRight size={12} />
                                <span className="flex items-center gap-1 text-primary">
                                    <FileText size={12} /> {activeSpace.title}
                                </span>
                            </>
                        )}
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {/* Case 1: Documentation View (Overview / Architecture) */}
                            {activeItem.type === 'doc' && (
                                <motion.div
                                    key={activeItem.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-primary mb-1">{activeItem.title}</h2>
                                        <p className="text-sm font-mono text-muted uppercase tracking-wider">System Documentation</p>
                                    </div>
                                    {activeItem.content}
                                </motion.div>
                            )}

                            {/* Case 2: Domain Problem Space View */}
                            {activeItem.type === 'domain' && activeSpace && (
                                <motion.div
                                    key={activeSpace.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full flex flex-col gap-6"
                                >
                                    {/* Header Section */}
                                    <div>
                                        <h2 className="text-2xl font-bold text-primary mb-1">{activeSpace.title}</h2>
                                        <p className="text-sm font-mono text-muted uppercase tracking-wider">{activeSpace.subtitle}</p>
                                    </div>

                                    {/* Problem & Outcome Grid */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="p-5 border border-red-900/30 bg-red-950/5 rounded-xl relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                            <h3 className="text-xs font-mono text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <AlertTriangle size={14} /> Problem Definition
                                            </h3>
                                            <p className="text-secondary text-sm leading-relaxed">
                                                {activeSpace.problem}
                                            </p>
                                        </div>
                                        <div className="p-5 border border-green-900/30 bg-green-950/5 rounded-xl relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                            <h3 className="text-xs font-mono text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <ShieldCheck size={14} /> Intended Outcome
                                            </h3>
                                            <p className="text-secondary text-sm leading-relaxed">
                                                {activeSpace.outcome}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Operational Shift Visualization */}
                                    <div className="flex-1 border border-default rounded-xl bg-surface/10 overflow-hidden flex flex-col shadow-inner">
                                        {/* Toggle Header */}
                                        <div className="p-4 border-b border-default bg-black/20 flex justify-center">
                                            <div className="flex items-center gap-0 bg-surface-dark p-1 rounded-lg border border-default relative">
                                                {/* Animated Background Slider */}
                                                <motion.div
                                                    className={`absolute top-1 bottom-1 rounded w-[180px] ${viewMode === 'intermediate' ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-green-500/20 border border-green-500/30'}`}
                                                    animate={{ x: viewMode === 'intermediate' ? 0 : 212 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />

                                                <button
                                                    onClick={() => setViewMode('intermediate')}
                                                    className={`relative z-10 px-6 py-2 rounded text-xs font-mono transition-all w-[180px] flex items-center justify-center gap-2 ${viewMode === 'intermediate' ? 'text-blue-400' : 'text-muted hover:text-secondary'
                                                        }`}
                                                >
                                                    <Activity size={14} /> INTERMEDIATE
                                                </button>

                                                <ArrowRight size={14} className="text-muted mx-2" />

                                                <button
                                                    onClick={() => setViewMode('target')}
                                                    className={`relative z-10 px-6 py-2 rounded text-xs font-mono transition-all w-[180px] flex items-center justify-center gap-2 ${viewMode === 'target' ? 'text-green-400' : 'text-muted hover:text-secondary'
                                                        }`}
                                                >
                                                    <Zap size={14} /> TARGET STATE
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content Body */}
                                        <div className="p-8 flex-1 flex flex-col justify-center relative">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={viewMode}
                                                    initial={{ opacity: 0, x: viewMode === 'target' ? 20 : -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: viewMode === 'target' ? -20 : 20 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="space-y-8"
                                                >
                                                    <div>
                                                        <div className={`text-sm font-bold mb-2 uppercase tracking-wider ${viewMode === 'intermediate' ? 'text-blue-400' : 'text-green-400'}`}>
                                                            {viewMode === 'intermediate' ? activeSpace.intermediate.role : activeSpace.target.role}
                                                        </div>
                                                        <p className="text-xl text-primary leading-relaxed font-light">
                                                            {viewMode === 'intermediate' ? activeSpace.intermediate.description : activeSpace.target.description}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <div className="text-xs font-mono text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                                                            <Layers size={12} /> Key Activities
                                                        </div>
                                                        <div className="grid md:grid-cols-3 gap-4">
                                                            {(viewMode === 'intermediate' ? activeSpace.intermediate.activities : activeSpace.target.activities).map((activity, i) => (
                                                                <div key={i} className="p-4 rounded-lg bg-black/40 border border-default/50 flex items-start gap-3 hover:border-default transition-colors">
                                                                    {viewMode === 'intermediate' ? (
                                                                        <Activity size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                                                    ) : (
                                                                        <Zap size={16} className="text-green-500 shrink-0 mt-0.5" />
                                                                    )}
                                                                    <span className="text-sm text-secondary leading-snug">{activity}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* Prerequisites Footer */}
                                    <div className="mt-auto pt-4 border-t border-default/30 flex items-center gap-4 overflow-x-auto">
                                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider shrink-0 flex items-center gap-2">
                                            <Cpu size={12} /> Technical Prerequisites:
                                        </span>
                                        {activeSpace.prerequisites.map((req, i) => (
                                            <div key={i} className="px-2 py-1 rounded bg-surface-dark border border-default/50 text-[10px] font-mono text-secondary whitespace-nowrap">
                                                {req}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};
