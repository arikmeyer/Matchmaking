
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Globe, Shield, Zap, Activity, Command, ChevronRight, Lock, Search, Play, Pause, RotateCcw, Check, AlertTriangle, X, Server, Database, Code, Network, BookOpen, ArrowRight, MessageSquare, FileText, Monitor, Eye, XCircle, CheckCircle } from 'lucide-react';

// --- TYPES ---
type LogEntry = {
    id: string;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS' | 'SYSTEM';
    message: string;
};

type StackItem = {
    category: string;
    tool: string;
    rationale: string;
    specs: string[];
    status: 'ONLINE' | 'SCALING' | 'OPTIMIZED';
    icon: React.ElementType;
};

type Decision = {
    id: string;
    title: string;
    context: string;
    tradeoff: string;
};

type TerminalLine = {
    type: 'input' | 'output' | 'system';
    content: React.ReactNode;
};

// --- DATA ---
const LOG_MESSAGES = [
    { level: 'SYSTEM', message: 'Booting Switchup_OS kernel v2.4.0...' },
    { level: 'INFO', message: 'Scanning 12,403 inboxes for hidden price hikes...' },
    { level: 'WARN', message: 'E.ON portal DOM change detected. Initiating self-healing script v4.2.' },
    { level: 'SUCCESS', message: 'Intercepted price increase for User #9921. Auto-switched to "Green Energy 24". Saved €320/yr.' },
    { level: 'INFO', message: 'Agent [Switch-AI-01] negotiating with Telekom chatbot... [Attempt 3/5]' },
    { level: 'SUCCESS', message: 'Telekom chatbot conceded. Bandwidth upgrade approved.' },
    { level: 'WARN', message: 'Legacy infrastructure detected: Provider requires FAX. Spooling virtual fax modem...' },
    { level: 'INFO', message: 'Analyzing sentiment of support email from "Stadtwerke München". Tone: Passive-Aggressive.' },
    { level: 'SYSTEM', message: 'Deploying "Universal Adapter" schema update to Neon branch "feat/telco-expansion".' },
    { level: 'WARN', message: 'Detected "Dark Pattern" in cancellation flow (Button hidden in footer). Bypassing...' },
    { level: 'SUCCESS', message: 'Migrated 500 households from overpriced base plan in 200ms.' },
    { level: 'INFO', message: 'Re-calibrating LLM prompt for "German Bureaucracy" tone matching.' },
    { level: 'WARN', message: 'Competitor API rate limit hit. Switching to rotating proxy pool.' },
    { level: 'INFO', message: 'Parsing 50GB of PDF invoices. OCR Confidence: 99.9%.' },
    { level: 'SYSTEM', message: 'Scaling Windmill workers to handle "End of Month" load spike.' },
    { level: 'WARN', message: 'Vattenfall API timeout (500ms). Retrying with exponential backoff...' },
    { level: 'INFO', message: 'Detecting "Fake Green Energy" tariff. Filtering from recommendation engine.' },
    { level: 'SUCCESS', message: 'Trust Level increased to 98% for Provider "Octopus Energy".' },
    { level: 'INFO', message: 'Training new "Negotiator" model on 50k successful support chats.' },
    { level: 'WARN', message: 'Anomaly detected: 1und1 offering 0€ contract. Flagging for manual review.' },
    { level: 'SYSTEM', message: 'Garbage collecting 1.2TB of temp PDF artifacts.' },
    { level: 'SUCCESS', message: 'Bot [Switch-AI-07] successfully navigated 2FA challenge via SMS hook.' },
    { level: 'INFO', message: 'Calculating "Fairness Score" for 200 new energy tariffs.' },
    { level: 'SYSTEM', message: 'Hot-patching "Universal Adapter" for new Vodafone API version.' },
    { level: 'SUCCESS', message: 'Reduced customer support load by 40% via proactive notification.' },
    { level: 'INFO', message: 'Simulating 10,000 concurrent sign-ups for load testing.' },
    { level: 'WARN', message: 'Provider "Stromia" declared insolvency. Triggering Fairbraucherschutz sister organisation to step.' },
    { level: 'SUCCESS', message: 'Emergency switch complete. 15,000 users protected from outage.' },
    { level: 'INFO', message: 'Optimizing Postgres query plan for "Contract History" table.' },
    { level: 'SYSTEM', message: 'Deploying to edge: Frankfurt, Berlin, Munich.' },
    { level: 'WARN', message: 'Detected 150ms latency spike in "Check24" scraper. Investigating...' },
    { level: 'SUCCESS', message: 'Found 12 "Zombie Subscriptions" for User #5501. Cancellation queued.' },
    { level: 'INFO', message: 'Generating monthly savings report for 150k users.' },
    { level: 'SYSTEM', message: 'Backup complete. 50TB encrypted data stored in cold storage.' },
    { level: 'SUCCESS', message: 'Legacy container active. Contract successfully terminated.' },
    { level: 'INFO', message: 'Analyzing "Terms & Conditions" change for 50 providers. Diffing legal text...' },
    { level: 'WARN', message: 'Hidden fee detected in footnote 12, section C. Alerting users.' },
    { level: 'SUCCESS', message: 'User #8821 feedback: "You guys are magic." forwarded to #general.' },
    { level: 'SYSTEM', message: 'Switchup_OS uptime: 99.999%. Systems nominal.' },
    { level: 'INFO', message: 'Scanning for "Loyalty Penalties" in 500,000 existing contracts.' },
    { level: 'SUCCESS', message: 'Identified €1.2M in potential savings for "Sleeping" customers.' },
    { level: 'INFO', message: 'Deploying new "Bill Shock" predictor model v3.1.' },
    { level: 'SUCCESS', message: 'Prevented 500 accidental auto-renewals this hour.' },
    { level: 'SYSTEM', message: 'Syncing "Universal Adapter" definitions with regulatory database.' },
    { level: 'INFO', message: 'Analyzing user spending patterns: "Netflix" subscription unused for 6 months.' },
    { level: 'SUCCESS', message: 'User #3301 approved cancellation of unused gym membership via API.' },
    { level: 'WARN', message: 'Detected phishing attempt in user inbox pretending to be "DHL". Quarantined.' },
    { level: 'SUCCESS', message: 'Automated 99.5% of "Address Change" requests today.' },
    { level: 'SYSTEM', message: 'Scaling "Document Understanding" cluster to 500 nodes.' },
    { level: 'WARN', message: 'Provider "Vattenfall" changed login flow. Captcha difficulty increased.' },
    { level: 'SUCCESS', message: 'Captcha solver updated. Success rate restored to 99.9%.' },
    { level: 'INFO', message: 'Monitoring "Gas Price Brake" legislation changes in real-time.' },
    { level: 'SUCCESS', message: 'Applied "Price Brake" refund to 12,000 eligible contracts automatically.' },
    { level: 'INFO', message: 'Detecting "Bundled" contracts (Internet + TV). Decoupling analysis...' },
    { level: 'WARN', message: 'User #7712 attempting to switch to "Scam Energy Ltd". Intervention triggered.' },
    { level: 'SUCCESS', message: 'User #7712 redirected to "Trusted Provider". Crisis averted.' },
    { level: 'SYSTEM', message: 'Re-indexing "Tariff Knowledge Graph". 5 million nodes.' },
    { level: 'INFO', message: 'Predicting "Churn Risk" for Provider X based on support wait times.' },
    { level: 'SUCCESS', message: 'Negotiated "Retention Offer" for User #9912. -20% monthly fee.' },
    { level: 'INFO', message: 'Parsing handwritten meter reading from User #4021. AI Confidence: 95%.' },
    { level: 'WARN', message: 'Detected duplicate billing from "Telekom". Initiating dispute protocol.' },
    { level: 'SUCCESS', message: 'Dispute resolved. Credit note of €45.00 generated.' },
    { level: 'SYSTEM', message: 'Switchup_OS entering "High Efficiency" mode for night batch processing.' },
    { level: 'SYSTEM', message: 'Coffee machine API: "Bean Hopper Empty". Alerting Office Manager.' },
    { level: 'SUCCESS', message: 'User #4002 cancellation processed. Reason: "Moving to Mars". Contract paused.' },
    { level: 'WARN', message: 'User #10293 uploaded a photo of a cat instead of an invoice. Asking nicely for retry.' },
    { level: 'WARN', message: 'Provider portal requires "Internet Explorer 6". Spooling legacy container...' },
    { level: 'WARN', message: 'Provider "O2" API returning 418 I\'m a teapot. Retrying...' },
    { level: 'INFO', message: 'Coffee machine needs descaling. Notifying Office Manager.' },
    { level: 'WARN', message: 'Developer forgot to mock API. Sending real request to production... Just kidding.' },
    { level: 'SYSTEM', message: 'Recruiting more engineers. Apply now via terminal.' },
    { level: 'INFO', message: 'AI Agent [Switch-AI-02] is bored. Reading Wikipedia.' },
    { level: 'SUCCESS', message: 'Successfully ignored 500 spam emails about "SEO Optimization".' },
    { level: 'WARN', message: 'Detected excessive usage of "console.log". Cleaning up...' },
    { level: 'INFO', message: 'User #1337 asked for "The Answer to Life". Returning 42.' },
    { level: 'SYSTEM', message: 'Updating "Swag Store" inventory. Hoodies are low.' },
    { level: 'WARN', message: 'Pizza delivery detected at front desk. Pausing deployment.' },
    { level: 'SUCCESS', message: 'Found a missing semicolon in legacy code. Crisis averted.' },
    { level: 'INFO', message: 'Optimizing office playlist. Removing "Baby Shark".' },
    { level: 'SYSTEM', message: 'Checking if it is Friday... Result: false. Keep coding.' }
];

const TECH_STACK: StackItem[] = [
    {
        category: 'Workflow Engine',
        tool: 'Windmill.dev',
        rationale: 'Orchestrating 100M+ workflow instances. Gives Ops team a low-code UI while Engineers write raw TypeScript. The backbone of our automation.',
        specs: ['Executions: 12M/mo', 'P99 Latency: 45ms', 'Error Rate: 0.01%'],
        status: 'SCALING',
        icon: Network
    },
    {
        category: 'Serverless Database',
        tool: 'Neon DB',
        rationale: 'Database branching allows us to treat schema like code. Instant rollbacks, isolated test environments, and zero-downtime migrations.',
        specs: ['Active Branches: 84', 'Time-to-Restore: <1s', 'Storage: 4.2TB'],
        status: 'ONLINE',
        icon: Database
    },
    {
        category: 'Browser Automation',
        tool: 'Playwright',
        rationale: 'Self-healing RPA scripts that navigate legacy portals. Handles captchas, 2FA, and DOM changes automatically.',
        specs: ['Daily Sessions: 50k', 'Captcha Solve Rate: 99.8%', 'Parallel Workers: 250'],
        status: 'OPTIMIZED',
        icon: Terminal
    },
    {
        category: 'Type Safety',
        tool: 'TypeScript',
        rationale: 'Strict typing across the entire stack. Shared types between DB, Backend, and Frontend. If it compiles, it works.',
        specs: ['Coverage: 100%', 'Strict Null Checks: ON', 'Shared Interfaces: 450+'],
        status: 'ONLINE',
        icon: Code
    },
    {
        category: 'Intelligence Layer',
        tool: 'Gemini 3',
        rationale: 'Our primary reasoning engine. Handling complex negotiations, sentiment analysis, and unstructured data extraction with massive context windows.',
        specs: ['Model: Gemini 3 Ultra', 'Context: 1M Tokens', 'Reasoning: Advanced'],
        status: 'ONLINE',
        icon: Cpu
    },
    {
        category: 'Document Engine',
        tool: 'Vision Pipeline',
        rationale: 'Ingesting thousands of heterogeneous PDF contracts daily. Converting unstructured layouts, scans, and faxes into structured JSON data.',
        specs: ['Throughput: 5k pages/min', 'Accuracy: 99.9%', 'Formats: PDF/IMG/FAX'],
        status: 'OPTIMIZED',
        icon: FileText
    }
];

const DECISIONS: Decision[] = [
    {
        id: 'd1',
        title: 'Domain-Driven Design: Provider & Market Agnostic Architecture',
        context: 'Challenge: Scale from "Energy in Germany" to "any subscription globally". We needed a data model that works for Vattenfall, E.ON, Telekom, Netflix—anything. The alternative was spaghetti code with if/else statements for every provider.',
        tradeoff: 'We chose DDD with a "Universal Adapter" core. Yes, it adds boilerplate. But it means our domain logic stays clean while provider adapters handle the chaos of rate limits, authentication flows, and undocumented API quirks. Trade-off: More upfront complexity, but exponential scalability. Open question: How do we keep adapters maintainable as we hit 100+ providers?'
    },
    {
        id: 'd2',
        title: 'Windmill.dev: Workflow Engine vs. Building Our Own',
        context: 'We run hundreds of millions of workflow instances per year. Initially considered: (a) Custom queue system with BullMQ, (b) Temporal (beautiful but heavyweight), (c) Windmill (TypeScript-native, self-hostable). The decision: Can we afford NOT to own this infrastructure?',
        tradeoff: 'We chose Windmill. Why? Self-hostable means no vendor lock-in. TypeScript-native means our team can read/debug flows. Built-in observability means we spent zero time building admin dashboards. The cost? We\'re betting on an open-source tool. If it fails, we migrate. But the 6 months we saved not building workflow infrastructure let us ship 3 major features instead. Open question: At what scale do we need to fork or replace?'
    },
    {
        id: 'd3',
        title: 'AI-Augmented Support: Trust Over Pure Automation',
        context: 'Pure AI chatbots hallucinate. Pure human support doesn\'t scale. We serve hundreds of thousands of households—each relationship is built on trust. A wrong cancellation could cost someone €500. How do we scale without breaking trust?',
        tradeoff: 'We built an "AI drafts, human approves" workflow. AI agents handle 80% of the grunt work (parsing emails, drafting responses, filling forms). Humans review and sign off. We use Langfuse to trace every LLM "thought chain," optimizing for accuracy AND cost. Trade-off: Not as fast as pure automation, but we keep the trust. Open question: Can we train humans to spot AI errors faster, or do we need confidence thresholds?'
    },
    {
        id: 'd4',
        title: 'Neon DB Branching: Test Schema Changes Like Git',
        context: 'Database migrations are scary. One wrong ALTER TABLE and production is down. We needed a way to test schema changes in isolation, especially as we onboard new markets (telco, streaming, etc.) with different data models.',
        tradeoff: 'We chose Neon for its branching feature. Create a branch, test the migration, merge if it works. Costs more than vanilla Postgres, but the safety net is worth it. Real win: Junior engineers can experiment fearlessly. Trade-off: Slightly higher cost, massive reduction in "oh shit" moments. Open question: Do we eventually self-host branching logic on raw Postgres?'
    },
    {
        id: 'd5',
        title: 'Playwright + Self-Healing Bots: RPA at Scale',
        context: 'Energy providers don\'t have APIs. We scrape 100+ provider portals daily. DOM changes break bots weekly. We tried: (1) Manual fixes (doesn\'t scale), (2) Hiring a bot team (expensive), (3) Self-healing bots with AI.',
        tradeoff: 'We built self-healing scripts: Playwright captures screenshots, Claude analyzes failures, generates fixes, commits them for review. Not fully automated yet—humans still approve patches. But it cut bot maintenance time by 60%. Trade-off: Upfront engineering effort to build the healing pipeline. Open question: Can we reach 90% auto-heal rate, or is human oversight always needed?'
    },
    {
        id: 'd6',
        title: 'Configurability vs. Robustness: The Eternal Struggle',
        context: 'Every market has quirks. German energy contracts have different cancellation rules than telco. We need workflows that are flexible enough to handle edge cases, but robust enough not to break. How configurable is too configurable?',
        tradeoff: 'We created a "configuration layer" on top of workflows: JSON-driven rules that non-engineers can edit (cancellation windows, notification templates, escalation paths). But we lock down core logic in TypeScript to prevent config drift. Trade-off: Engineers own the engine, ops owns the knobs. Still iterating: Where\'s the line between "config" and "code"?'
    }
];

// --- COMPONENTS ---

const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => (
    <span className={`relative inline-block group hover:text-green-400 transition-colors cursor-default ${className}`}>
        <span className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-red-500 opacity-0 group-hover:opacity-70 animate-pulse">{text}</span>
        <span className="relative z-10">{text}</span>
        <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[1px] text-blue-500 opacity-0 group-hover:opacity-70 animate-pulse delay-75">{text}</span>
    </span>
);

const SectionHeader = ({ title, icon: Icon }: { title: string, icon?: React.ElementType }) => (
    <div className="flex items-center gap-3 mb-8 border-b border-neutral-800 pb-2">
        {Icon && <Icon className="text-green-500" size={20} />}
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase">{title}</h2>
    </div>
);

// --- BOOT SEQUENCE COMPONENT ---
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const bootText = [
        "INITIALIZING SWITCHUP_KERNEL...",
        "LOADING MODULES: [AI_AGENT, WORKFLOW_ENGINE, DOM_PARSER]",
        "CONNECTING TO NEON_DB [MAIN BRANCH]... SUCCESS",
        "VERIFYING USER_AGENTS... OK",
        "CHECKING SYSTEM INTEGRITY... 100%",
        "MOUNTING VIRTUAL FILESYSTEM...",
        "STARTING INTERFACE SERVICE...",
        "WELCOME, ARCHITECT OF THE FUTURE."
    ];

    useEffect(() => {
        const timeouts: ReturnType<typeof setTimeout>[] = [];
        let delay = 0;

        bootText.forEach((line, index) => {
            delay += Math.random() * 300 + 100;
            const id = setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (index === bootText.length - 1) {
                    // Show password prompt after welcome message
                    setTimeout(() => setShowPassword(true), 800);
                }
            }, delay);
            timeouts.push(id);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'SwitchMeUp') {
            setLines(prev => [...prev, `[PASSWORD] ${'*'.repeat(password.length)}`, 'ACCESS GRANTED.']);
            setTimeout(onComplete, 600);
        } else {
            setError(true);
            setPassword('');
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="fixed inset-0 bg-black z-[100] font-mono text-green-500 p-8 text-sm md:text-base overflow-hidden flex flex-col justify-end pb-20">
            {lines.map((line, i) => (
                <div key={i} className="mb-1">{`> ${line} `}</div>
            ))}

            {showPassword && (
                <form onSubmit={handlePasswordSubmit} className="mt-4">
                    <div className="mb-2">
                        <span className="text-amber-500">&gt; AUTHENTICATION REQUIRED</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={error ? 'text-red-500' : ''}>PASSWORD:</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border-none outline-none text-green-500 flex-1 placeholder:text-green-900"
                            placeholder="Enter access code..."
                            autoFocus
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 mt-2 animate-pulse">
                            &gt; ACCESS DENIED. TRY AGAIN.
                        </div>
                    )}
                </form>
            )}

            {!showPassword && <div className="animate-pulse mt-2">_</div>}
        </div>
    );
};

// --- VIDEO MODAL COMPONENT ---
const VideoModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl bg-[#0a0a0a] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl relative">
                <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                    <span className="text-xs text-neutral-400 flex items-center gap-2">
                        <Play size={12} className="text-green-500" />
                        EON_BOT_REVERSE_ENGINEERING.mp4
                    </span>
                    <button onClick={onClose} className="text-neutral-500 hover:text-white">
                        <X size={18} />
                    </button>
                </div>
                <div className="aspect-video bg-black flex items-center justify-center relative group">
                    {/* Placeholder for actual video */}
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-full border-2 border-neutral-700 flex items-center justify-center mx-auto">
                            <Play size={24} className="text-neutral-500 ml-1" />
                        </div>
                        <p className="text-neutral-500 font-mono text-sm">
                            [VIDEO SOURCE NOT FOUND IN PREVIEW] <br />
                            In production, this plays the E.ON bot debugging session. <br />
                            Showing how we reverse-engineered the private API to save users €300/yr.
                        </p>
                    </div>

                    {/* Fake controls */}
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent flex items-center px-4 gap-4">
                        <Play size={16} className="text-white" />
                        <div className="h-1 bg-neutral-700 flex-1 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-green-500" />
                        </div>
                        <span className="text-xs text-neutral-400 font-mono">04:20 / 12:45</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- APPLICATION MODAL COMPONENT ---
const ApplicationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [step, setStep] = useState<'INIT' | 'ROLE_SELECT' | 'GENERATING' | 'COMPLETE'>('INIT');
    const [role, setRole] = useState<string | null>(null);
    const [lines, setLines] = useState<string[]>([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (isOpen && step === 'INIT') {
            setLines([]);
            const initSequence = [
                "ESTABLISHING SECURE CONNECTION...",
                "HANDSHAKE COMPLETE.",
                "ACCESSING RECRUITMENT PROTOCOL v9.0...",
                "PLEASE IDENTIFY YOUR CORE FUNCTION:"
            ];
            let delay = 0;
            initSequence.forEach((line, i) => {
                delay += 400;
                setTimeout(() => {
                    setLines(prev => [...prev, line]);
                    if (i === initSequence.length - 1) setStep('ROLE_SELECT');
                }, delay);
            });
        }
    }, [isOpen, step]);

    const handleRoleSelect = (selectedRole: string) => {
        setRole(selectedRole);
        setStep('GENERATING');
        setLines(prev => [...prev, `> SELECTED ROLE: ${selectedRole} `, "GENERATING UNIQUE SESSION TOKEN...", "ENCRYPTING PAYLOAD..."]);

        setTimeout(() => {
            setToken(`SWUP - ${Math.random().toString(36).substr(2, 9).toUpperCase()} `);
            setStep('COMPLETE');
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 font-mono">
            <div className="w-full max-w-2xl bg-black border border-green-500/50 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.2)] overflow-hidden flex flex-col h-[60vh]">
                <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                    <span className="text-xs text-green-500 flex items-center gap-2 animate-pulse">
                        <Lock size={12} />
                        SECURE_CHANNEL_ESTABLISHED
                    </span>
                    <button onClick={onClose} className="text-neutral-500 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-8 flex-1 overflow-y-auto space-y-4 text-sm md:text-base">
                    {lines.map((line, i) => (
                        <div key={i} className="text-green-500">{`> ${line} `}</div>
                    ))}

                    {step === 'ROLE_SELECT' && (
                        <div className="grid gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <button
                                onClick={() => handleRoleSelect('SYSTEM_ARCHITECT')}
                                className="text-left p-4 border border-neutral-800 hover:border-green-500 hover:bg-green-500/10 transition-all group"
                            >
                                <span className="text-white font-bold block mb-1 group-hover:text-green-400">[A] SYSTEM & DATA ARCHITECT</span>
                                <span className="text-neutral-500 text-xs">I like the idea of architecting provider- and market-agnostic data models and operationally scalable systems.</span>
                            </button>
                            <button
                                onClick={() => handleRoleSelect('PRODUCT_ENGINEER')}
                                className="text-left p-4 border border-neutral-800 hover:border-green-500 hover:bg-green-500/10 transition-all group"
                            >
                                <span className="text-white font-bold block mb-1 group-hover:text-green-400">[B] PRODUCT_ENGINEER</span>
                                <span className="text-neutral-500 text-xs">I like owning problem spaces end-to-end and building high-impact solutions.</span>
                            </button>
                        </div>
                    )}

                    {step === 'COMPLETE' && (
                        <div className="mt-8 p-6 border border-green-500/30 bg-green-500/5 rounded text-center space-y-6 animate-in zoom-in duration-300">
                            <div>
                                <div className="text-neutral-400 text-xs mb-2">SESSION TOKEN GENERATED</div>
                                <div className="text-3xl md:text-4xl font-black text-white tracking-widest select-all cursor-pointer hover:text-green-400 transition-colors">
                                    {token}
                                </div>
                            </div>
                            <div className="text-neutral-300 text-sm leading-relaxed">
                                <p className="mb-4">Access granted. To finalize your application:</p>
                                <ol className="text-left list-decimal list-inside space-y-2 text-neutral-400 max-w-md mx-auto">
                                    <li>Email <a href={`mailto:future-colleagues@switchup.tech?subject=Application:${role}[${token}]`} className="text-white underline hover:text-green-400">future-colleagues@switchup.tech</a></li>
                                    <li>Include your GitHub or LinkedIn.</li>
                                    <li>Share any thoughts or ideas you may have.</li>
                                </ol>
                            </div>
                            <button
                                onClick={() => window.location.href = `mailto:future-colleagues@switchup.tech?subject=Application:${role}[${token}]`}
                                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded transition-colors w-full"
                            >
                                OPEN_MAIL_CLIENT()
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- INTERACTIVE TERMINAL COMPONENT ---
const InteractiveTerminal = ({ onExit }: { onExit?: () => void }) => {
    const [history, setHistory] = useState<TerminalLine[]>([
        { type: 'system', content: 'Welcome, Architect of the Future.' }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);
    const [quizActive, setQuizActive] = useState(false);
    const [quizStep, setQuizStep] = useState(0);
    const [quizScore, setQuizScore] = useState(0);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        const newHistory = [...history, { type: 'input', content: input } as TerminalLine];

        // QUIZ LOGIC
        if (quizActive) {
            if (cmd === 'exit' || cmd === 'quit') {
                setQuizActive(false);
                setQuizStep(0);
                setQuizScore(0);
                newHistory.push({ type: 'output', content: 'Quiz terminated.' });
            } else {
                const QUESTIONS = [
                    {
                        q: "You need to migrate 500 legacy integration files. The AI model gets it 80% right but hallucinates on edge cases.",
                        a: "Trust but verify. Review every change to ensure correctness.",
                        b: "Automate the reviewer. Build a secondary 'Linter Agent' to catch the hallucinations, then run the migration again.",
                        correct: 'b',
                        feedback_pass: "MATCH. Don't just write code. Build the system that writes the code.",
                        feedback_fail: "MISMATCH. Manual review scales linearly. We need exponential leverage."
                    },
                    {
                        q: "The Roadmap says 'Build Feature X'. You discover 'X' won't solve the user's actual problem, but 'Y' (which is harder) will.",
                        a: "Build 'X' to deliver on the roadmap promise. Consistency and predictability are key.",
                        b: "Kill 'Feature X'. Write a one-pager on why we should build 'Y' and pivot immediately.",
                        correct: 'b',
                        feedback_pass: "MATCH. You are the Product Owner. The roadmap is a hypothesis, not a law.",
                        feedback_fail: "MISMATCH. We don't hire you to execute tickets. We hire you to solve problems."
                    },
                    {
                        q: "We are launching a new vertical (Telco) that conflicts with our current data model (Energy).",
                        a: "Spin up a separate 'Telco Service' to keep the 'Energy Core' clean and move fast.",
                        b: "Refactor the Core to be 'Vertical-Agnostic', even if it delays the launch by a month.",
                        correct: 'b',
                        feedback_pass: "MATCH. We are building the 'Universal Adapter', not a collection of consulting projects.",
                        feedback_fail: "MISMATCH. Short-term speed that creates long-term fragmentation is not our way."
                    },
                    {
                        q: "A critical 3rd-party API is undocumented and returns cryptic errors. Support isn't responding.",
                        a: "Flag it as a blocker. Work on the next prioritized task until we get documentation.",
                        b: "Reverse engineer the network traffic, trial-and-error the payload, and write the docs yourself.",
                        correct: 'b',
                        feedback_pass: "MATCH. The API is the truth. Documentation is just a hint.",
                        feedback_fail: "MISMATCH. 'Blocked' is a state of mind. There is always a way."
                    },
                    {
                        q: "You are using an AI coding assistant, but it keeps generating subtle bugs in a complex module.",
                        a: "Stop using it for this task. It's faster to just write it manually than to debug the AI.",
                        b: "Pause. Refactor the context you are feeding it. Create a 'Planner' sub-agent to guide the 'Coder'.",
                        correct: 'b',
                        feedback_pass: "MATCH. If the AI fails, it's a prompting/context failure. Fix the inputs.",
                        feedback_fail: "MISMATCH. Blaming the tool doesn't scale. Mastering the tool does."
                    },
                    {
                        q: "You shipped a new onboarding flow. How do you define success?",
                        a: "Zero errors in production. The flow completed without exceptions.",
                        b: "User activation increased by 30%. I know because I built the dashboard first.",
                        correct: 'b',
                        feedback_pass: "MATCH. Code that works but doesn't move metrics is just expensive art.",
                        feedback_fail: "MISMATCH. Technical excellence is necessary but not sufficient. We need business impact."
                    },
                    {
                        q: "You discovered a better way to handle authentication. What do you do?",
                        a: "Implement it in my domain. Others will notice and ask me about it later.",
                        b: "Write a short doc, demo it in standup, and help others migrate their flows.",
                        correct: 'b',
                        feedback_pass: "MATCH. Knowledge hoarding creates silos. We win by cross-pollinating insights.",
                        feedback_fail: "MISMATCH. Individual excellence is good. Multiplying the team's capability is better."
                    },
                    {
                        q: "You have an unproven hypothesis about automating a manual process. It might not work.",
                        a: "Spec it out fully. Build a robust solution that handles all edge cases from day one.",
                        b: "Build a 4-hour prototype that handles the happy path. Test with real users tomorrow.",
                        correct: 'b',
                        feedback_pass: "MATCH. Learn fast, fail cheap. Certainty comes from iteration, not planning.",
                        feedback_fail: "MISMATCH. Over-engineering unvalidated ideas is waste. We need experimental velocity."
                    },
                    {
                        q: "The founder asks you to 'automate contract extraction'. What do you do first?",
                        a: "Research OCR libraries and start a proof-of-concept with the most popular one.",
                        b: "Ask: 'What decision does this enable?' and 'What happens if we get it wrong?'",
                        correct: 'b',
                        feedback_pass: "MATCH. The best code is code you don't write. Understand 'why' before 'how'.",
                        feedback_fail: "MISMATCH. Execution without context creates solutions searching for problems."
                    },
                    {
                        q: "You see an opportunity to automate a painful manual process, but it's not on any roadmap.",
                        a: "Propose it as a project for next quarter. Wait for prioritization and approval.",
                        b: "Block out Friday afternoon. Ship a working prototype. Show the team Monday morning.",
                        correct: 'b',
                        feedback_pass: "MATCH. Product Engineers at SwitchUp create leverage, they don't wait for permission.",
                        feedback_fail: "MISMATCH. Initiative and ownership are core to our DNA. We need people who 'go rogue' to create value."
                    }
                ];

                const currentQuestion = QUESTIONS[quizStep];

                // Check Answer
                const isCorrect = cmd === currentQuestion.correct;
                const nextScore = isCorrect ? quizScore + 1 : quizScore;

                newHistory.push({
                    type: 'output',
                    content: isCorrect
                        ? <span className="text-green-500">{currentQuestion.feedback_pass}</span>
                        : <span className="text-amber-500">{currentQuestion.feedback_fail}</span>
                });

                if (quizStep < QUESTIONS.length - 1) {
                    // Next Question
                    setQuizStep(prev => prev + 1);
                    setQuizScore(nextScore);

                    setTimeout(() => {
                        const nextQ = QUESTIONS[quizStep + 1];
                        setHistory(prev => [...prev, {
                            type: 'output',
                            content: (
                                <div className="mt-2">
                                    <div className="text-white font-bold">Q{quizStep + 2}: {nextQ.q}</div>
                                    <div className="pl-4 text-neutral-400">A) {nextQ.a}</div>
                                    <div className="pl-4 text-neutral-400">B) {nextQ.b}</div>
                                </div>
                            )
                        }]);
                    }, 500);
                } else {
                    // Finish Quiz
                    const finalScore = nextScore;
                    setQuizActive(false);
                    setQuizStep(0);
                    setQuizScore(0);

                    setTimeout(() => {
                        setHistory(prev => [...prev, {
                            type: 'output',
                            content: (
                                <div className="mt-4 p-4 border border-neutral-700 rounded bg-neutral-900/80">
                                    <div className="text-white font-bold mb-2 text-lg">DIAGNOSTIC COMPLETE</div>
                                    <div className="font-mono mb-4">SCORE: {finalScore}/{QUESTIONS.length}</div>

                                    {finalScore >= 8 ? (
                                        <div className="space-y-2">
                                            <div className="text-green-400 font-bold">&gt;&gt; COMPATIBILITY CONFIRMED ({Math.round((finalScore / QUESTIONS.length) * 100)}%)</div>
                                            <div className="text-neutral-300">You have the mindset we're looking for.</div>
                                            <div className="text-neutral-500 text-xs">Initiating application sequence...</div>
                                            <div className="mt-2 p-2 bg-green-900/20 border border-green-500/30 rounded text-green-300">
                                                Run <span className="text-white font-bold">apply</span> to claim your spot.
                                            </div>
                                        </div>
                                    ) : finalScore >= 6 ? (
                                        <div className="space-y-2">
                                            <div className="text-amber-400 font-bold">&gt;&gt; MIXED SIGNALS DETECTED</div>
                                            <div className="text-neutral-300">You have some of the traits we value, but there are gaps.</div>
                                            <div className="text-neutral-400">Consider whether full ownership of ambiguous problem spaces excites or exhausts you.</div>
                                            <div className="text-neutral-500 text-sm mt-2">If you're energized by that challenge, let's talk anyway. Run <span className="text-white">apply</span>.</div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="text-red-400 font-bold">&gt;&gt; LOW ALIGNMENT DETECTED</div>
                                            <div className="text-neutral-300">Based on these answers, Switchup likely won't make you happy.</div>
                                            <div className="text-neutral-400">You might thrive in an environment with:</div>
                                            <div className="text-neutral-500 text-sm pl-4">• Clear product specs and roadmaps</div>
                                            <div className="text-neutral-500 text-sm pl-4">• Defined scope and predictable deliverables</div>
                                            <div className="text-neutral-500 text-sm pl-4">• Separation between 'building' and 'deciding what to build'</div>
                                            <div className="text-amber-500 text-xs mt-3">That's a valid choice. Different people thrive in different environments.</div>
                                        </div>
                                    )}
                                </div>
                            )
                        }]);
                    }, 500);
                }
            }
            setHistory(newHistory);
            setInput('');
            return;
        }

        // STANDARD COMMANDS
        switch (cmd) {
            case 'help':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="space-y-3">
                            <div className="text-white font-bold">Available Commands:</div>
                            <div className="grid grid-cols-[120px_1fr] gap-2 text-neutral-400">
                                <span className="text-green-500">stack</span> <span>Show tech stack + engineering decisions</span>
                                <span className="text-green-500">mission</span> <span>Our vision for the Universal Adapter</span>
                                <span className="text-green-500">challenges</span> <span>Core architectural problems to solve</span>
                                <span className="text-green-500">culture</span> <span>10-question fit diagnostic (profound)</span>
                                <span className="text-green-500">ls</span> <span>Explore the codebase structure</span>
                                <span className="text-green-500">whoami</span> <span>Your profile + permissions</span>
                                <span className="text-green-500">sudo</span> <span>Try it (you'll see)</span>
                                <span className="text-green-500">apply</span> <span>Start your application</span>
                                <span className="text-green-500">clear</span> <span>Clear terminal history</span>
                            </div>
                            <div className="text-neutral-600 text-xs mt-3 border-t border-neutral-800 pt-2">
                                Hint: There are hidden commands. Explore.
                            </div>
                        </div>
                    )
                });
                break;
            case 'challenges':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="space-y-2">
                            <div className="text-white font-bold border-b border-neutral-700 pb-1">ARCHITECTURAL CHALLENGES</div>
                            <div>
                                <span className="text-green-500">1. The Universal Adapter:</span> <br />
                                <span className="text-neutral-400">Moving from "Energy in Germany" to "Any Subscription Globally". How do we abstract provider logic so the core system is agnostic?</span>
                            </div>
                            <div>
                                <span className="text-green-500">2. Configurable vs. Robust:</span> <br />
                                <span className="text-neutral-400">We need to launch new markets in weeks, not months. How do we build a system that is highly configurable but doesn't break under edge cases?</span>
                            </div>
                        </div>
                    )
                });
                break;
            case 'culture':
            case 'quiz':
                setQuizActive(true);
                setQuizStep(0);
                setQuizScore(0);
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="space-y-2">
                            <div className="text-green-400 font-bold">INITIALIZING CULTURE FIT DIAGNOSTIC...</div>
                            <div>Answer A or B. Type "exit" to quit.</div>
                            <div className="mt-4">
                                <div className="text-white font-bold">Q1: A provider API changes without documentation, breaking the bot.</div>
                                <div className="pl-4 text-neutral-400">A) File a ticket with the provider and wait for a fix.</div>
                                <div className="pl-4 text-neutral-400">B) Reverse engineer the new response and patch the adapter immediately.</div>
                            </div>
                        </div>
                    )
                });
                break;
            case 'stack':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="space-y-3 font-mono text-sm">
                            <div className="text-white font-bold border-b border-neutral-700 pb-1">TECH_STACK_V2 :: ENGINEERING DECISIONS</div>
                            <div className="text-neutral-500 text-xs italic mb-2">"Can I challenge this?" — Yes. Always. That's the point.</div>

                            <div>
                                <div className="text-green-400">[ORCHESTRATION] Windmill.dev</div>
                                <div className="pl-4 text-neutral-400">Why: Self-hostable, TypeScript-native, built-in secrets</div>
                                <div className="pl-4 text-neutral-500 text-xs">Alternative: Temporal (beautiful architecture, but we're not Google)</div>
                                <div className="pl-4 text-amber-300 text-xs">Current: 247 flows, 12k executions/day</div>
                                <div className="pl-4 text-neutral-600 text-xs mt-1">Fun fact: We've contributed 3 PRs back to Windmill. Open source is a two-way street.</div>
                            </div>

                            <div>
                                <div className="text-green-400">[DATABASE] Neon (Postgres)</div>
                                <div className="pl-4 text-neutral-400">Why: Serverless Postgres with branching (test schema changes like git!)</div>
                                <div className="pl-4 text-neutral-500 text-xs">Alternative: Supabase (we needed more control over connection pooling)</div>
                                <div className="pl-4 text-amber-300 text-xs">Current: 8ms p95 latency, auto-scales to zero (saving €€€ at 3am)</div>
                                <div className="pl-4 text-purple-400 text-xs mt-1">"But why not just Postgres?" — Valid question. Let's argue about it.</div>
                            </div>

                            <div>
                                <div className="text-green-400">[BROWSER] Playwright</div>
                                <div className="pl-4 text-neutral-400">Why: Multi-browser, network interception, stealth mode (shhh)</div>
                                <div className="pl-4 text-neutral-500 text-xs">Alternative: Puppeteer (we love you, but Microsoft won this round)</div>
                                <div className="pl-4 text-amber-300 text-xs">Current: 150+ provider logins/day (yes, we pretend to be users)</div>
                                <div className="pl-4 text-red-300 text-xs mt-1">Challenge: E.ON changed their login flow. We reverse-engineered it in 4 hours.</div>
                            </div>

                            <div>
                                <div className="text-green-400">[INTELLIGENCE] Gemini 3 Ultra / Claude Code</div>
                                <div className="pl-4 text-neutral-400">Why: 1M token context (entire codebases), multi-modal (PDF/Fax parsing)</div>
                                <div className="pl-4 text-neutral-500 text-xs">Alternative: GPT-4 (rate limits killed us during batch processing)</div>
                                <div className="pl-4 text-amber-300 text-xs">Current: 5k docs/day, 99.2% accuracy (better than most humans)</div>
                                <div className="pl-4 text-blue-300 text-xs mt-1">We use AI to write code. Yes, really. Claude Code + sub-agents = 3x velocity.</div>
                            </div>

                            <div>
                                <div className="text-green-400">[OBSERVABILITY] Langfuse</div>
                                <div className="pl-4 text-neutral-400">Why: LLM-native tracing, cost tracking, prompt versioning</div>
                                <div className="pl-4 text-neutral-500 text-xs">Alternative: LangSmith (vendor lock-in scared us)</div>
                                <div className="pl-4 text-amber-300 text-xs">Current: 200k LLM calls/week, €2.3k/month spend (we track every penny)</div>
                                <div className="pl-4 text-neutral-600 text-xs mt-1">Our admins A/B test prompts. Non-technical people debugging AI. Wild.</div>
                            </div>

                            <div className="text-neutral-600 text-xs mt-3 border-t border-neutral-800 pt-2">
                                This stack was chosen for <span className="text-white">velocity</span>, not popularity.<br />
                                <span className="text-neutral-500">We optimize for "can we ship this week?" not "will this be on HackerNews?"</span>
                            </div>
                        </div>
                    )
                });
                break;
            case 'mission':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="space-y-3 font-mono text-sm">
                            <div className="text-white font-bold border-b border-neutral-700 pb-1">MISSION :: THE UNIVERSAL ADAPTER</div>
                            <div className="text-neutral-500 text-xs italic">(aka "Why we exist and why you should care")</div>

                            <div>
                                <div className="text-red-400 font-bold">PROBLEM:</div>
                                <div className="pl-4 text-neutral-400">Switching subscriptions = 45-90 day bureaucratic nightmares.</div>
                                <div className="pl-4 text-neutral-400">Lost paperwork, manual headaches, user frustration.</div>
                                <div className="pl-4 text-red-300 text-xs mt-1">Real user quote: "I'd rather stay with my expensive provider than deal with this again."</div>
                            </div>

                            <div>
                                <div className="text-amber-400 font-bold">ROOT CAUSE:</div>
                                <div className="pl-4 text-neutral-400">Every provider = different API, process, legacy system (fax machines in 2025, yes really).</div>
                                <div className="pl-4 text-neutral-400">No one has built the abstraction layer. Until now.</div>
                                <div className="pl-4 text-amber-300 text-xs mt-1">Fun fact: We reverse-engineered E.ON's portal because their API docs were... creative fiction.</div>
                            </div>

                            <div>
                                <div className="text-green-400 font-bold">OUR VISION:</div>
                                <div className="pl-4 text-neutral-400">Build the "Stripe for Subscriptions".</div>
                                <div className="pl-4 text-neutral-400">Universal Adapter: ANY subscription, ANY user, ANY market.</div>
                                <div className="pl-4 text-green-300 text-xs mt-1">ONE codebase. ZERO hardcoded provider logic. Pure abstraction bliss.</div>
                            </div>

                            <div>
                                <div className="text-blue-400 font-bold">CURRENT STATE:</div>
                                <div className="pl-4 text-green-500">✓ Energy (DE): 15k switches/mo, 7-day avg (down from 45)</div>
                                <div className="pl-4 text-green-500">✓ E.ON Bot: 98% success (reverse-engineered, battle-tested)</div>
                                <div className="pl-4 text-amber-500">⚠ Telco (DE): Pilot, launching Q1 (this is your job)</div>
                                <div className="pl-4 text-neutral-500">⏳ Insurance: Scoping (dragons lurk here)</div>
                                <div className="pl-4 text-neutral-500">⏳ International: UK energy research (Brexit made this... interesting)</div>
                            </div>

                            <div>
                                <div className="text-purple-400 font-bold">NEXT MILESTONE:</div>
                                <div className="pl-4 text-neutral-400">Ship "Vertical-Agnostic" core (Energy + Telco in same system).</div>
                                <div className="pl-4 text-neutral-400">Don't build 10 separate bots.</div>
                                <div className="pl-4 text-white">Build the <span className="text-green-400">system that generates the bots</span>.</div>
                                <div className="pl-4 text-neutral-600 text-xs mt-2">(Meta-engineering. Your favorite kind, right?)</div>
                            </div>

                            <div className="text-neutral-600 text-xs mt-3 border-t border-neutral-800 pt-2">
                                <span className="text-amber-500">Honest take:</span> This is hard. We don't have all the answers.<br />
                                <span className="text-neutral-500">But we're figuring it out, and we want you in the room when we do.</span>
                            </div>
                        </div>
                    )
                });
                break;
            case 'ls':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="font-mono text-sm space-y-1">
                            <div className="text-neutral-500 mb-2">total 47 files (and counting)</div>
                            <div className="text-blue-400">drwxr-xr-x  .git/                    (3 months of commits, some regrettable)</div>
                            <div className="text-white">-rw-r--r--  README.md                2.3kb   "How to ship your first flow"</div>
                            <div className="text-white">-rw-r--r--  job-description.md       8.1kb   You are here 👋</div>
                            <div className="text-green-400">-rwxr-xr-x  apply.sh                 127b    Your future starts here</div>
                            <div className="text-blue-400 mt-2">drwxr-xr-x  flows/</div>
                            <div className="text-neutral-400 pl-4">-rw-r--r--  eon-bot.ts             4.2kb   The legendary reverse-eng (ask us about this)</div>
                            <div className="text-neutral-400 pl-4">-rw-r--r--  telco-adapter.ts       2.8kb   WIP: Universal pattern v1 (your playground)</div>
                            <div className="text-neutral-400 pl-4">-rw-r--r--  doc-parser.ts          3.1kb   Gemini + Vision pipeline (99.2% accuracy!)</div>
                            <div className="text-neutral-400 pl-4">-rw-r--r--  fax-handler.ts         1.9kb   Yes, fax. In 2025. Don't @ us.</div>
                            <div className="text-blue-400 mt-2">drwxr-xr-x  core/</div>
                            <div className="text-red-400 pl-4">-rw-r--r--  universal-adapter.ts   BROKEN  This is your job (seriously)</div>
                            <div className="text-neutral-600 pl-4 text-xs"># TODO: Make this work for Energy + Telco without if/else hell</div>
                            <div className="text-blue-400 mt-2">drwxr-xr-x  monitoring/</div>
                            <div className="text-neutral-400 pl-4">-rw-r--r--  langfuse-traces.ts     1.4kb   LLM observability (we debug AI like code)</div>
                            <div className="text-neutral-400 pl-4">-rw-r--r--  alerting.ts            892b    Slack webhooks (3am pings, yay!)</div>
                            <div className="text-neutral-600 mt-2">-rw-r--r--  .env                     REDACTED (nice try)</div>
                            <div className="text-neutral-500">-rw-r--r--  docker-compose.yml       1.1kb   Local dev setup</div>
                            <div className="text-neutral-500">-rw-r--r--  package.json             2.9kb   23 deps (we keep it light)</div>
                            <div className="text-blue-400 mt-2">drwxr-xr-x  docs/</div>
                            <div className="text-neutral-400 pl-4">-rw-r--r--  decisions.md           5.2kb   Our architectural decision log</div>
                            <div className="text-neutral-400 pl-4">-rw-r--r--  failures.md            3.8kb   Things that didn't work</div>
                        </div>
                    )
                });
                break;
            case 'whoami':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="font-mono text-sm space-y-2">
                            <div className="text-green-400">USER: guest@switchup.tech</div>
                            <div className="text-amber-400">ROLE: Potential Product Engineer (soon-to-be legend?)</div>
                            <div className="text-blue-400">STATUS: Evaluating cultural fit...</div>
                            <div className="text-neutral-500 text-xs">SESSION_START: {new Date().toISOString()}</div>

                            <div className="mt-3 border-t border-neutral-800 pt-2">
                                <div className="text-white font-bold mb-1">PERMISSIONS:</div>
                                <div className="pl-4 text-green-500">✓ Read job description (you've earned it)</div>
                                <div className="pl-4 text-green-500">✓ Explore tech stack (dig deep, we dare you)</div>
                                <div className="pl-4 text-green-500">✓ Run culture diagnostic (prepare to be challenged)</div>
                                <div className="pl-4 text-green-500">✓ Challenge our decisions (we love to be inspired)</div>
                                <div className="pl-4 text-red-400">✗ Access production (requires: employee_status + 2FA + trust_level_9000)</div>
                                <div className="pl-4 text-red-400">✗ Merge to main (requires: passed code review + sacrifice to the CI gods)</div>
                            </div>

                            <div className="mt-3 border-t border-neutral-800 pt-2">
                                <div className="text-white font-bold mb-1">MATCH PROFILE:</div>
                                <div className="pl-4 text-neutral-400 mb-2">Core traits we're looking for:</div>

                                <div className="pl-4 text-green-400 text-xs font-bold mt-2">1. Deep Engineering + Builder DNA</div>
                                <div className="pl-6 text-neutral-500 text-xs">You've seen failures. You learn from them. Others learn from you.</div>

                                <div className="pl-4 text-green-400 text-xs font-bold mt-2">2. AI Mastery (The Multiplier)</div>
                                <div className="pl-6 text-neutral-500 text-xs">You're genuinely excited about AI as a force multiplier, not a buzzword.</div>
                                <div className="pl-6 text-neutral-500 text-xs">You know how to engineer the right context for AI, design agent workflows, debug LLM failures.</div>
                                <div className="pl-6 text-neutral-500 text-xs">You experiment with new models in your spare time because you can't help yourself.</div>

                                <div className="pl-4 text-green-400 text-xs font-bold mt-2">3. Positive Can-Do Mindset</div>
                                <div className="pl-6 text-neutral-500 text-xs">"How can we make this work?" not "Why this won't work."</div>
                                <div className="pl-6 text-neutral-500 text-xs">Blockers are puzzles to solve, not excuses to wait.</div>

                                <div className="pl-4 text-green-400 text-xs font-bold mt-2">4. Mission-Driven Impact</div>
                                <div className="pl-6 text-neutral-500 text-xs">You care deeply about making a real difference in people's lives.</div>
                                <div className="pl-6 text-neutral-500 text-xs">Our North Star: Building lifelong relationships with our users.</div>
                                <div className="pl-6 text-neutral-500 text-xs">Current stat: Near-zero churn (despite our product's imperfections).</div>
                                <div className="pl-6 text-neutral-500 text-xs">That's the magic. Building something that truly matters and might flip an entire (dysfunctional) market.</div>

                                <div className="pl-4 text-red-400 mt-3 mb-2">Not a match if you're:</div>
                                <div className="pl-6 text-neutral-500 text-xs">• Someone who needs detailed specs</div>
                                <div className="pl-6 text-neutral-500 text-xs">• A "that's not my job" person</div>
                                <div className="pl-6 text-neutral-500 text-xs">• Skeptical of AI or treating it as hype</div>
                                <div className="pl-6 text-neutral-500 text-xs">• Optimizing for resume bullets over growth & learning</div>

                                <div className="pl-4 text-white mt-3 mb-1 text-xs font-bold">You might be our person if:</div>
                                <div className="pl-6 text-green-300 text-xs mt-1">
                                    ✓ You've "gone rogue" to ship value at a previous job
                                </div>
                                <div className="pl-6 text-amber-300 text-xs mt-1">
                                    ✓ You've reverse-engineered a vendor's undocumented API
                                </div>
                                <div className="pl-6 text-purple-300 text-xs mt-1">
                                    ✓ You care more about impact than code purity
                                </div>
                                <div className="pl-6 text-blue-300 text-xs mt-1">
                                    ✓ You're building AI side projects because it's genuinely fun
                                </div>
                                <div className="pl-6 text-pink-300 text-xs mt-1">
                                    ✓ You want to wake up knowing your work matters to real people
                                </div>
                            </div>

                            <div className="text-neutral-600 text-xs mt-3 border-t border-neutral-800 pt-2">
                                Run 'culture' to see if we're a match. (Spoiler: It's harder than LeetCode, but more fun.)
                            </div>
                        </div>
                    )
                });
                break;
            case 'sudo':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="font-mono text-sm space-y-2">
                            <div className="text-neutral-500">[sudo] password for guest:</div>
                            <div className="text-red-500 font-bold">Permission denied. (Did you really think that would work?)</div>

                            <div className="mt-2 text-neutral-400">You need to be hired first. Three paths:</div>
                            <div className="pl-4 text-green-400">1. Run './apply.sh' (email us directly, old school)</div>
                            <div className="pl-4 text-green-400">2. Click 'Initialize Application' (fancy modal, same result)</div>
                            <div className="pl-4 text-green-400">3. Keep exploring, find easter eggs, impress us</div>

                            <div className="mt-2 text-purple-400 text-xs">
                                <span className="text-white">Protip:</span> We actually read every application. No AI screening here (ironic, we know).
                            </div>
                        </div>
                    )
                });
                break;
            case 'apply':
            case './apply.sh':
                newHistory.push({
                    type: 'output',
                    content: (
                        <span className="text-green-400">
                            Initiating application protocol... <br />
                            <a href="mailto:future-colleagues@switchup.tech" className="underline hover:text-white">Click here to email future-colleagues@switchup.tech</a>
                        </span>
                    )
                });
                break;
            case 'konami':
            case 'up up down down left right left right b a':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="text-green-400 space-y-2">
                            <div>🎮 Achievement Unlocked: "Konami Commander"</div>
                            <div className="text-xs text-neutral-500">You know the classics. We like that.</div>
                            <div className="text-amber-400 mt-2">+30 Culture Fit Points</div>
                        </div>
                    )
                });
                break;
            case 'health':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="text-amber-600">
                            🏥 Experimenting... <br />
                            <span className="text-neutral-400">Fun fact: We not only experiment with our ways of working, but also with innovative approaches to supporting health.</span>
                        </div>
                    )
                });
                break;
            case 'salary':
            case 'matrix':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="text-green-500 font-bold animate-pulse">
                            Wake up, Neo... <br />
                            The subscription matrix has you. <br />
                            Follow the white terminal prompt.
                        </div>
                    )
                });
                break;
            case 'hire me':
            case 'hireme':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="text-green-400 space-y-2">
                            <div>🚀 Confidence detected. We like it.</div>
                            <div className="text-neutral-400">Run <span className="text-white">apply</span> to make it official.</div>
                        </div>
                    )
                });
                break;
            case 'exit':
                if (!quizActive) {
                    // Trigger shutdown sequence
                    newHistory.push({
                        type: 'output',
                        content: (
                            <div className="space-y-2">
                                <div className="text-red-400 font-bold">INITIATING SHUTDOWN SEQUENCE...</div>
                                <div className="text-neutral-500 text-xs">Disconnecting neural links...</div>
                                <div className="text-neutral-500 text-xs">Saving session state...</div>
                                <div className="text-amber-500 text-xs">Warning: Unsaved applications will be lost.</div>
                                <div className="text-green-400 mt-2">See you on the inside. 🚀</div>
                            </div>
                        )
                    });
                    setHistory(newHistory);
                    setInput('');

                    // Trigger parent shutdown after a delay
                    setTimeout(() => {
                        if (onExit) onExit();
                    }, 2000);
                    return;
                }
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            default:
                newHistory.push({ type: 'output', content: `Command not found: ${cmd}. Try "help".` });
        }

        setHistory(newHistory);
        setInput('');
    };

    useEffect(() => {
        // Only scroll the container, not the whole page
        if (bottomRef.current?.parentElement) {
            bottomRef.current.parentElement.scrollTop = bottomRef.current.parentElement.scrollHeight;
        }
    }, [history]);

    return (
        <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl font-mono text-sm relative">
            {/* Window Header (macOS style) */}
            <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <span className="text-neutral-500 text-xs">zsh - future@switchup.tech</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 h-[600px] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-neutral-700">
                    {history.map((line, i) => (
                        <div key={i} className={`${line.type === 'input' ? 'text-white' : 'text-neutral-400'} `}>
                            {line.type === 'input' && <span className="text-green-500 mr-2">➜</span>}
                            {line.content}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <form onSubmit={handleCommand} className="mt-2 flex items-center gap-2 border-t border-neutral-800 pt-2">
                    <span className="text-green-500">➜</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none text-white w-full placeholder:text-neutral-700"
                        placeholder="Type a command..."
                    // Removed autoFocus to prevent page jump on load
                    />
                </form>
            </div>
        </div>
    );
};

export default function SwitchupOperatingSystem() {
    const [booted, setBooted] = useState(() => {
        // If system was shut down, skip boot sequence
        if (typeof window !== 'undefined') {
            return localStorage.getItem('switchup_shutdown') === 'true';
        }
        return false;
    });
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [activeDecision, setActiveDecision] = useState<string | null>(null);
    const [videoOpen, setVideoOpen] = useState(false);
    const [applicationOpen, setApplicationOpen] = useState(false);
    const [crtMode, setCrtMode] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);
    const [shutdownActive, setShutdownActive] = useState(() => {
        // Check if system was previously shut down
        if (typeof window !== 'undefined') {
            return localStorage.getItem('switchup_shutdown') === 'true';
        }
        return false;
    });
    const [shutdownPhase, setShutdownPhase] = useState(() => {
        // If already shut down, skip to final phase
        if (typeof window !== 'undefined' && localStorage.getItem('switchup_shutdown') === 'true') {
            return 7;
        }
        return 0;
    });
    const logsEndRef = useRef<HTMLDivElement>(null);
    const logsContainerRef = useRef<HTMLDivElement>(null);

    // Handle shutdown sequence
    const handleShutdown = () => {
        setShutdownActive(true);
        localStorage.setItem('switchup_shutdown', 'true');

        const shutdownMessages = [
            "Terminating AI agents...",
            "Closing provider connections...",
            "Archiving workflow state...",
            "Shutting down Windmill engine...",
            "Disconnecting from Neon DB...",
            "Powering down systems...",
            "Goodbye. 👋"
        ];

        shutdownMessages.forEach((msg, i) => {
            setTimeout(() => {
                setShutdownPhase(i + 1);
            }, i * 400);
        });
    };

    // Handle reboot
    const handleReboot = () => {
        localStorage.removeItem('switchup_shutdown');
        window.location.reload();
    };

    // Easter egg: Console messages for developers
    useEffect(() => {
        console.log('%c👋 Hey there, curious developer!', 'color: #22c55e; font-size: 20px; font-weight: bold;');
        console.log('%cWe see you peeking under the hood. That\'s exactly what we\'re looking for.', 'color: #a3a3a3; font-size: 14px;');
        console.log('%c💼 Interested? Run: console.log(\'apply\') or email future-colleagues@switchup.tech', 'color: #22c55e; font-size: 12px;');
        console.log('%c🎮 Try typing "konami" in the terminal...', 'color: #737373; font-size: 10px; font-style: italic;');
    }, []);

    // Visit tracking easter egg
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Get visit data
        const visitData = localStorage.getItem('switchup_visits');
        let visits = visitData ? JSON.parse(visitData) : { count: 0, days: [] };

        // Get today's date (YYYY-MM-DD format)
        const today = new Date().toISOString().split('T')[0];

        // Increment visit count
        visits.count += 1;

        // Track unique days
        if (!visits.days.includes(today)) {
            visits.days.push(today);
        }

        // Save updated data
        localStorage.setItem('switchup_visits', JSON.stringify(visits));

        const totalVisits = visits.count;
        const uniqueDays = visits.days.length;

        // Show easter eggs based on milestones
        setTimeout(() => {
            if (totalVisits === 1) {
                // First visit - normal welcome
                return;
            }

            if (totalVisits === 3) {
                console.log('%c🎯 Visit #3', 'color: #22c55e; font-size: 14px; font-weight: bold;');
                console.log('%c"Oh hey, it\'s you again!"', 'color: #a3a3a3; font-size: 12px;');
                console.log('%c— Our backend logs, probably', 'color: #737373; font-size: 10px; font-style: italic;');
            }

            if (totalVisits === 5) {
                console.log('%c🔥 Visit #5', 'color: #f97316; font-size: 16px; font-weight: bold;');
                console.log('%cAt this point you\'ve spent more time here than some of our interns.', 'color: #a3a3a3; font-size: 12px;');
                console.log('%cWe should probably put you on payroll.', 'color: #22c55e; font-size: 11px;');
                console.log('%c(Kidding. Unless...? 👀)', 'color: #737373; font-size: 10px; font-style: italic;');
            }

            if (totalVisits === 10) {
                console.log('%c⚡ Visit #10', 'color: #eab308; font-size: 18px; font-weight: bold;');
                console.log('%cTEN. TIMES.', 'color: #a3a3a3; font-size: 12px;');
                console.log('%cYou know what happens after the 10th coffee date?', 'color: #737373; font-size: 11px;');
                console.log('%cYou make it official. → future-colleagues@switchup.tech', 'color: #22c55e; font-size: 12px; font-weight: bold;');
            }

            if (uniqueDays === 3) {
                console.log('%c📅 Day #3', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
                console.log('%cThree different days. You\'re not just curious anymore.', 'color: #a3a3a3; font-size: 12px;');
                console.log('%cYou\'re doing reconnaissance. We respect that.', 'color: #737373; font-size: 11px; font-style: italic;');
                console.log('%c(Our stack is in the terminal. Type "stack" to see our tech choices.)', 'color: #525252; font-size: 10px;');
            }

            if (uniqueDays === 5) {
                console.log('%c🌙 Day #5', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
                console.log('%cFive days. You\'re basically part of the team\'s daily standup at this point.', 'color: #a3a3a3; font-size: 12px;');
                console.log('%cExcept you don\'t get the free coffee. Yet. ☕', 'color: #737373; font-size: 11px; font-style: italic;');
            }

            if (uniqueDays === 7) {
                console.log('%c🌟 A FULL WEEK', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
                console.log('%cSeven. Days. In. A. Row.', 'color: #a3a3a3; font-size: 14px;');
                console.log('%cThat\'s the kind of obsessive dedication we build products with.', 'color: #22c55e; font-size: 13px;');
                console.log('%cNo joke: Email us. This is literally what we look for.', 'color: #ef4444; font-size: 12px; background: #1a1a1a; padding: 6px;');
                console.log('%c→ future-colleagues@switchup.tech', 'color: #22c55e; font-size: 12px; font-weight: bold;');
            }

            if (totalVisits === 15 && uniqueDays < 3) {
                console.log('%c🔄 Visit #15 (in one day?!)', 'color: #ec4899; font-size: 16px; font-weight: bold;');
                console.log('%cEither our page is REALLY good, or you\'re debugging something.', 'color: #a3a3a3; font-size: 12px;');
                console.log('%cEither way: Hi! Want to debug things with us full-time?', 'color: #22c55e; font-size: 12px;');
            }

            if (totalVisits >= 20) {
                console.log('%c🚀 ACHIEVEMENT UNLOCKED', 'color: #ec4899; font-size: 24px; font-weight: bold;');
                console.log('%c"Persistent Legend"', 'color: #a3a3a3; font-size: 16px; font-style: italic;');
                console.log(`%c${totalVisits} visits across ${uniqueDays} days. That\'s not browsing. That\'s commitment.`, 'color: #d1d5db; font-size: 13px;');
                console.log('%c', ''); // spacing
                console.log('%cHere\'s the thing:', 'color: #a3a3a3; font-size: 12px;');
                console.log('%cWe track this because persistence is our #1 hiring signal.', 'color: #22c55e; font-size: 12px;');
                console.log('%cYou just proved you have it. Now prove you can build.', 'color: #22c55e; font-size: 12px;');
                console.log('%c', ''); // spacing
                console.log('%c📧 future-colleagues@switchup.tech', 'color: #ef4444; font-size: 15px; background: #1a1a1a; padding: 8px; font-weight: bold;');
                console.log('%cSubject: "I visited your site ${totalVisits} times. Now can we talk?"', 'color: #737373; font-size: 11px; font-style: italic;');
            }

            // Special console styling for multi-day visitors
            if (uniqueDays >= 3 && totalVisits >= 5 && totalVisits < 20) {
                console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #404040;');
                console.log(`%c📊 Your persistence stats: ${totalVisits} visits • ${uniqueDays} unique days`, 'color: #737373; font-size: 11px;');
                console.log('%c(We\'re impressed, by the way.)', 'color: #525252; font-size: 10px; font-style: italic;');
            }
        }, 1500);
    }, []);

    // Shutdown screen console message
    useEffect(() => {
        if (!shutdownActive) return;

        // Simple message when shutdown screen is active
        const hasShownMessage = sessionStorage.getItem('shutdown_console_hint');

        if (!hasShownMessage) {
            // Delay to avoid duplicate with initial console logs
            setTimeout(() => {
                console.clear();
                console.log('%c🔒 SYSTEM OFFLINE', 'color: #ef4444; font-size: 24px; font-weight: bold;');
                console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #404040;');
                console.log('%c🕵️ Trying to restore the system?', 'color: #a3a3a3; font-size: 14px;');
                console.log('%cWe like the initiative. Run this:', 'color: #737373; font-size: 12px;');
                console.log('%c  localStorage.removeItem("switchup_shutdown");%c\n%c  window.location.reload();',
                    'color: #22c55e; font-size: 13px; background: #1a1a1a; padding: 4px 8px; border-radius: 3px;',
                    '',
                    'color: #22c55e; font-size: 13px; background: #1a1a1a; padding: 4px 8px; border-radius: 3px;'
                );
                console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #404040;');
                console.log('%cOr wait ~25 seconds for the "reboot" link. Patience is a virtue... 😉', 'color: #737373; font-size: 10px; font-style: italic;');

                sessionStorage.setItem('shutdown_console_hint', 'true');
            }, 500);
        }
    }, [shutdownActive]);

    // Easter egg: Logo click counter
    const handleLogoClick = () => {
        const newCount = logoClicks + 1;
        setLogoClicks(newCount);

        if (newCount === 5) {
            console.log('%c🎉 Achievement Unlocked: "Click Enthusiast"', 'color: #fbbf24; font-size: 16px; font-weight: bold;');
            console.log('%cYou found the click counter! Keep exploring...', 'color: #a3a3a3;');
        } else if (newCount === 10) {
            alert('🚀 Easter Egg Found! You\'re persistent. We like that. Check the console.');
            console.log('%c🏆 ULTRA ACHIEVEMENT: "The Persistent One"', 'color: #22c55e; font-size: 20px; font-weight: bold;');
            console.log('%cSeriously though, if you\'re this thorough, you should apply.', 'color: #22c55e; font-size: 14px;');
        }
    };

    // Simulate live terminal logs
    useEffect(() => {
        if (!booted) return;

        const interval = setInterval(() => {
            const randomLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
            setLogs(prev => {
                const newLogs = [...prev, {
                    id: Math.random().toString(36),
                    timestamp: new Date().toISOString().split('T')[1].split('.')[0],
                    level: randomLog.level as any,
                    message: randomLog.message
                }];
                return newLogs.slice(-12); // Keep last 12 logs
            });
        }, 2000); // Slower log speed
        return () => clearInterval(interval);
    }, [booted]);

    useEffect(() => {
        if (logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
        }
    }, [logs]);

    if (!booted && !shutdownActive) {
        return <BootSequence onComplete={() => setBooted(true)} />;
    }

    // If shutdown is active, show only the shutdown screen
    if (shutdownActive) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-mono">
                {shutdownPhase < 7 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                    >
                        <div className="text-red-400 text-2xl font-bold mb-8">SYSTEM SHUTDOWN IN PROGRESS</div>
                        <div className="space-y-2 text-neutral-400">
                            {shutdownPhase >= 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <X className="text-red-500" size={16} />
                                    <span>Terminating AI agents...</span>
                                </motion.div>
                            )}
                            {shutdownPhase >= 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <X className="text-red-500" size={16} />
                                    <span>Closing provider connections...</span>
                                </motion.div>
                            )}
                            {shutdownPhase >= 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <X className="text-red-500" size={16} />
                                    <span>Archiving workflow state...</span>
                                </motion.div>
                            )}
                            {shutdownPhase >= 4 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <X className="text-red-500" size={16} />
                                    <span>Shutting down Windmill engine...</span>
                                </motion.div>
                            )}
                            {shutdownPhase >= 5 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <X className="text-red-500" size={16} />
                                    <span>Disconnecting from Neon DB...</span>
                                </motion.div>
                            )}
                            {shutdownPhase >= 6 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <X className="text-red-500" size={16} />
                                    <span>Powering down systems...</span>
                                </motion.div>
                            )}
                        </div>
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-neutral-600 text-sm mt-8"
                        >
                            ████████████████████
                        </motion.div>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center space-y-8"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-white text-3xl font-bold mb-2">SYSTEM OFFLINE</div>
                                <div className="text-neutral-500 text-sm">SwitchUp OS v2.0-alpha has been shut down successfully</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="border-t border-neutral-800 pt-8 space-y-4"
                            >
                                <div className="text-neutral-400 text-lg">
                                    "The best way to predict the future<br />is to build it."
                                </div>
                                <div className="text-neutral-600 text-sm">— someone who didn't take no for an answer</div>
                            </motion.div>
                        </motion.div>

                        {/* Subtle footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 20 + Math.random() * 10 }}
                            className="absolute bottom-6 left-0 right-0 text-center"
                        >
                            <div className="text-neutral-700 text-xs mb-2">
                                <span className="text-neutral-600">pssst:</span> still here? you might be our person.
                            </div>
                            <button
                                onClick={handleReboot}
                                className="text-neutral-600 hover:text-neutral-500 transition-colors text-xs underline mr-4"
                            >
                                reboot
                            </button>
                            <span className="text-neutral-800 text-xs">or</span>
                            <a
                                href="mailto:future-colleagues@switchup.tech"
                                className="text-neutral-600 hover:text-neutral-500 transition-colors text-xs underline ml-4"
                            >
                                email us
                            </a>
                        </motion.div>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-[#050505] text-neutral-300 font-mono selection:bg-green-900 selection:text-green-200 overflow-x-hidden ${crtMode ? 'crt-effect' : ''}`}>

            {/* --- MODALS --- */}
            <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
            <ApplicationModal isOpen={applicationOpen} onClose={() => setApplicationOpen(false)} />

            {/* --- STATUS BAR --- */}
            <div className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-neutral-800 h-10 flex items-center justify-between px-4 text-xs">
                <div className="flex items-center gap-4">
                    <span
                        onClick={handleLogoClick}
                        className="font-bold text-white cursor-pointer hover:text-green-400 transition-colors"
                        title="Click me... multiple times 😉"
                    >
                        SWITCHUP_OS <span className="text-green-500">v2.0-alpha</span>
                    </span>
                    <span className="hidden md:flex items-center gap-2 text-neutral-500">
                        <Server size={12} /> BERLIN :: ONLINE
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setCrtMode(!crtMode)}
                        className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-neutral-800 transition-colors ${crtMode ? 'text-green-500' : 'text-neutral-600'}`}
                    >
                        <Monitor size={12} />
                        <span>CRT: {crtMode ? 'ON' : 'OFF'}</span>
                    </button>
                    <div className="flex items-center gap-2 text-amber-500 animate-pulse">
                        <AlertTriangle size={12} />
                        <span>SCALING_BOTTLENECK_DETECTED</span>
                    </div>
                    <span className="text-neutral-600">root@switchup:~</span>
                    <button
                        onClick={handleShutdown}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-900 hover:text-red-400 transition-colors text-neutral-600"
                        title="Power down system"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v10"></path>
                            <path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>
                        </svg>
                        <span>PWR</span>
                    </button>
                </div>
            </div>

            <main className="pt-20 pb-32 max-w-6xl mx-auto px-6 space-y-32">

                {/* --- HERO SECTION --- */}
                <section className="min-h-[80vh] grid lg:grid-cols-2 gap-16 items-center relative">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-green-500/5 blur-[100px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-green-500 text-xs font-bold tracking-wider">
                            <Activity size={12} />
                            <span>SYSTEM_READY</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                            THE <br />
                            SUBSCRIPTION <br />
                            <GlitchText text="OS." className="text-green-500" />
                        </h1>

                        <p className="text-xl text-neutral-400 max-w-lg leading-relaxed border-l-2 border-green-500/30 pl-6">
                            We're building the <strong className="text-white">Universal Adapter</strong> — the world's first subscription infrastructure that works across any provider, any market.
                            <br /><br />
                            Where <span className="text-white">AI Agents</span> negotiate with legacy systems. Where automation handles the noise, and humans handle the relationship.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setApplicationOpen(true)}
                                className="px-6 py-3 border border-neutral-700 text-neutral-400 hover:border-green-500 hover:text-green-400 transition-all flex items-center gap-2 group text-sm font-mono"
                            >
                                INITIALIZE_APPLICATION()
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
                            </button>
                        </div>
                    </motion.div>

                    {/* INTERACTIVE TERMINAL IN HERO */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="relative z-20"
                    >
                        {/* --- AWE-INSPIRING BACKGROUND SYSTEM --- */}
                        {/* 1. Deep Ambient Nebula (Breathing) */}
                        <motion.div
                            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -inset-12 bg-gradient-to-tr from-green-500/20 via-blue-500/20 to-green-500/20 rounded-[40px] blur-3xl"
                        />

                        {/* 2. Rotating Energy Vortex (Green) */}
                        <div className="absolute -inset-[2px] rounded-lg overflow-hidden">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent,transparent,#22c55e,transparent,transparent)] opacity-30 blur-sm"
                            />
                        </div>

                        {/* 3. Counter-Rotating Vortex (Blue) */}
                        <div className="absolute -inset-[2px] rounded-lg overflow-hidden">
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent,transparent,#3b82f6,transparent,transparent)] opacity-30 blur-sm"
                            />
                        </div>
                        <InteractiveTerminal onExit={handleShutdown} />
                        <div className="mt-2 text-center text-xs text-neutral-600">
                            Try typing <span className="text-green-500">help</span>, <span className="text-green-500">ls</span>, or <span className="text-green-500">sudo</span>
                        </div>
                    </motion.div>
                </section>

                {/* --- LIVE TERMINAL --- */}
                <section className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <SectionHeader title="System Logs" icon={Terminal} />
                        <p className="text-neutral-400 leading-relaxed">
                            Switchup protects 100k+ households. But we are hitting limits.
                            Our service colleagues spend too much time on manual tasks.
                            <br /><br />
                            <strong className="text-white">The Mission:</strong> Build the "Universal Adapter" for any subscription service.
                            Make architectural decisions that are provider-agnostic.
                            Create a system where automation handles the noise, and humans handle the relationship.
                        </p>
                    </div>

                    <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl font-mono text-xs md:text-sm relative group">
                        <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <span className="text-neutral-500">tail -f /var/log/switchup_core.log</span>
                        </div>
                        <div
                            ref={logsContainerRef}
                            className="p-6 h-[400px] overflow-y-auto space-y-2 scrollbar-hide"
                        >
                            <AnimatePresence initial={false}>
                                {logs.map((log) => (
                                    <motion.div
                                        key={log.id}
                                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            filter: 'blur(0px)',
                                            textShadow: ['0 0 20px currentColor', '0 0 0px currentColor']
                                        }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className={`flex gap-3 ${log.level === 'WARN' ? 'text-amber-500' :
                                            log.level === 'ERROR' ? 'text-red-500' :
                                                log.level === 'SUCCESS' ? 'text-green-500' :
                                                    log.level === 'SYSTEM' ? 'text-blue-400' : 'text-neutral-500'
                                            }`}
                                    >
                                        <span className="opacity-30 shrink-0">[{log.timestamp}]</span>
                                        <span className="font-bold shrink-0 w-20">[{log.level}]</span>
                                        <span>{log.message}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={logsEndRef} />
                        </div>
                    </div>
                </section>

                {/* --- CORE ARCHITECTURE (REDESIGNED) --- */}
                <section className="space-y-8">
                    <SectionHeader title="Target Architecture" icon={Cpu} />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TECH_STACK.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-neutral-900/50 border border-neutral-800 hover:border-green-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]"
                            >
                                {/* Active Status Indicator */}
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                                    <span className="text-[10px] font-mono text-green-500 tracking-wider">{item.status}</span>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Header */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-neutral-800/50 rounded-lg group-hover:bg-green-500/10 group-hover:text-green-400 transition-colors">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{item.tool}</h3>
                                            <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider mt-1">{item.category}</p>
                                        </div>
                                    </div>

                                    {/* Telemetry Specs */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {item.specs.map((spec, j) => (
                                            <div key={j} className="bg-black/40 border border-neutral-800 rounded px-2 py-1 text-[10px] font-mono text-neutral-400 flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-neutral-600" />
                                                {spec}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Rationale (Revealed/Highlighted on Hover) */}
                                    <div className="relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-800 group-hover:bg-green-500 transition-colors" />
                                        <p className="pl-4 text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                                            {item.rationale}
                                        </p>
                                    </div>
                                </div>

                                {/* Scanline Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- INTERACTIVE: WATCH ME WORK --- */}
                <section id="watch-me-work" className="border border-neutral-800 bg-[#0a0a0a] rounded-xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] pointer-events-none" />

                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold">
                                <Eye size={12} />
                                <span>RADICAL_TRANSPARENCY</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white">Don't trust the job description. <br />Trust the code.</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                We recorded a real debugging session where we reverse-engineered the E.ON provider portal API.
                                <br /><br />
                                <span className="text-white">What you'll see:</span>
                            </p>
                            <ul className="space-y-2 text-sm text-neutral-400">
                                <li className="flex gap-2">
                                    <span className="text-green-500">→</span>
                                    How we handled undocumented rate limits and OAuth flows
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-green-500">→</span>
                                    Building a self-healing Playwright bot that adapts to DOM changes
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-green-500">→</span>
                                    Designing monitoring to catch breakage before users notice
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-green-500">→</span>
                                    The actual tools, libraries, and trade-offs we made along the way
                                </li>
                            </ul>
                            <p className="text-neutral-500 text-sm italic">
                                "This is the type of stuff you'll be doing. If you're excited about diving in, let's talk."
                            </p>
                            <button
                                onClick={() => setVideoOpen(true)}
                                className="flex items-center gap-3 text-white font-bold hover:text-green-400 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                    <Play size={20} className="ml-1" />
                                </div>
                                <span>WATCH_SESSION_RECORDING_01.mp4</span>
                            </button>
                        </div>
                        <div
                            onClick={() => setVideoOpen(true)}
                            className="aspect-video bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-center relative group cursor-pointer hover:border-neutral-700 transition-colors"
                        >
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                                <Play size={48} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="text-center">
                                <span className="text-neutral-600 font-mono text-sm">PREVIEW_THUMBNAIL</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- DECISION LOG --- */}
                <section>
                    <SectionHeader title="Engineering Decision Log" icon={BookOpen} />
                    <div className="grid md:grid-cols-2 gap-6">
                        {DECISIONS.map((decision) => (
                            <div
                                key={decision.id}
                                onClick={() => setActiveDecision(activeDecision === decision.id ? null : decision.id)}
                                className={`cursor-pointer p-6 rounded-lg border transition-all duration-300 ${activeDecision === decision.id
                                    ? 'bg-neutral-900 border-green-500'
                                    : 'bg-[#0a0a0a] border-neutral-800 hover:border-neutral-700'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-white">{decision.title}</h3>
                                    <ChevronRight className={`transition-transform ${activeDecision === decision.id ? 'rotate-90 text-green-500' : 'text-neutral-600'}`} />
                                </div>
                                <p className="text-sm text-neutral-400 mb-4">{decision.context}</p>
                                <AnimatePresence>
                                    {activeDecision === decision.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 border-t border-neutral-800 text-sm text-neutral-300">
                                                <strong className="text-amber-500 block mb-1">The Trade-off:</strong>
                                                {decision.tradeoff}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- ANTI-PERSONA --- */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-red-950/10 border border-red-900/30 rounded-lg">
                        <h3 className="text-red-500 font-bold flex items-center gap-2 mb-6">
                            <XCircle size={20} /> SYSTEM_REJECTION_CRITERIA
                        </h3>
                        <p className="text-neutral-500 text-sm mb-6 italic">
                            Great fit elsewhere, not here:
                        </p>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">01</span>
                                <div>
                                    <div className="text-white mb-1">You need detailed specs from a PM to function</div>
                                    <div className="text-neutral-600 text-xs">We don't have product managers. You define what to build based on business outcomes.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">02</span>
                                <div>
                                    <div className="text-white mb-1">You're a specialist who goes deep without connecting to business problems</div>
                                    <div className="text-neutral-600 text-xs">We need T-shaped engineers who understand the "why" behind every line of code.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">03</span>
                                <div>
                                    <div className="text-white mb-1">You optimize within familiar tools rather than adopting the best tool</div>
                                    <div className="text-neutral-600 text-xs">The right answer might be Rust, Go, or a library that came out last week. Can you adapt?</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">04</span>
                                <div>
                                    <div className="text-white mb-1">You prioritize code purity over shipping business results</div>
                                    <div className="text-neutral-600 text-xs">Success = "we reduced manual cases by 90%", not "the architecture is pristine."</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">05</span>
                                <div>
                                    <div className="text-white mb-1">You're not excited about AI, automation, or workflow engineering</div>
                                    <div className="text-neutral-600 text-xs">This is literally what we do. If Claude, Langfuse, or Playwright bore you, this isn't the place.</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="p-8 bg-green-950/10 border border-green-900/30 rounded-lg">
                        <h3 className="text-green-500 font-bold flex items-center gap-2 mb-6">
                            <CheckCircle size={20} /> COMPATIBILITY_MATCH
                        </h3>
                        <p className="text-neutral-500 text-sm mb-6 italic">
                            You might be our person if:
                        </p>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">01</span>
                                <div>
                                    <div className="text-white mb-1">You've built 0→1 products at startups</div>
                                    <div className="text-neutral-600 text-xs">You know the chaos of early-stage: ambiguity, pivots, wearing multiple hats. You thrive there.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">02</span>
                                <div>
                                    <div className="text-white mb-1">You dig into business intent, not just technical requirements</div>
                                    <div className="text-neutral-600 text-xs">"Why are we building this?" is your first question, not "What's the spec?"</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">03</span>
                                <div>
                                    <div className="text-white mb-1">You have an experimental mindset</div>
                                    <div className="text-neutral-600 text-xs">Ship incrementally. Measure impact. Iterate. Failures are learning opportunities we share openly.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">04</span>
                                <div>
                                    <div className="text-white mb-1">You're comfortable with ambiguity and ownership</div>
                                    <div className="text-neutral-600 text-xs">No one's handing you a roadmap. You define success metrics, tooling, and execution.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">05</span>
                                <div>
                                    <div className="text-white mb-1">You stay current with AI/LLM developments</div>
                                    <div className="text-neutral-600 text-xs">You experiment with GPT-4, Claude, new prompting techniques. You bring ideas to the table.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">06</span>
                                <div>
                                    <div className="text-white mb-1">You want to architect the "Universal Adapter"</div>
                                    <div className="text-neutral-600 text-xs">Build systems that scale from energy→telco→streaming. Provider-agnostic, market-agnostic. That's the challenge.</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* --- DEPLOYMENT CONSOLE (FOOTER) --- */}
                <section id="apply" className="pt-20 pb-20">
                    <div className="border-t border-neutral-800 pt-20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-black text-white tracking-tighter">
                                    READY TO <span className="text-green-500">DEPLOY?</span>
                                </h2>
                                <p className="text-neutral-400 text-lg max-w-md">
                                    You've analyzed the logs. You've seen the stack. You know the mission.
                                    <br /><br />
                                    The only thing left is to execute the sequence.
                                </p>
                                <div className="flex gap-6 text-sm text-neutral-500 font-mono">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span>POSITIONS_OPEN</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span>REMOTE_OK</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#0a0a0a] border border-neutral-800 p-8 rounded-xl relative overflow-hidden group hover:border-green-500/30 transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Command size={100} />
                                </div>

                                <div className="relative z-10 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-neutral-500 font-bold tracking-wider">TARGET_DESTINATION</label>
                                        <div className="font-mono text-xl text-white border-b border-neutral-800 pb-2">
                                            future-colleagues@switchup.tech
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs text-neutral-500 font-bold tracking-wider">REQUIRED_PAYLOAD</label>
                                        <div className="flex gap-2">
                                            <span className="px-2 py-1 bg-neutral-900 rounded text-xs text-green-500 border border-green-900/30">GITHUB_URL</span>
                                            <span className="px-2 py-1 bg-neutral-900 rounded text-xs text-green-500 border border-green-900/30">SESSION_TOKEN</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setApplicationOpen(true)}
                                        className="w-full py-4 bg-white text-black font-bold text-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2 mt-4"
                                    >
                                        <Terminal size={18} />
                                        INITIATE_APPLICATION_SEQUENCE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}