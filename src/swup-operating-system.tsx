
import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Globe, Shield, Zap, Activity, Command, ChevronRight, Lock, Search, Play, Pause, RotateCcw, Check, X, Server, AlertTriangle, BookOpen, Eye, XCircle, CheckCircle } from 'lucide-react';

// Import hooks
import { useTheme, useTerminalLogs, useShutdown, useQuizState } from './hooks';

// Lazy load components for code splitting (React 19 optimization)
const BootSequence = lazy(() => import('./components/BootSequence').then(m => ({ default: m.BootSequence })));
const BehindTheScenesModal = lazy(() => import('./components/BehindTheScenesModal').then(m => ({ default: m.BehindTheScenesModal })));
const ApplicationModal = lazy(() => import('./components/ApplicationModal').then(m => ({ default: m.ApplicationModal })));

// Import utility components (small, used everywhere)
import { GlitchText, SectionHeader, ErrorBoundary, TerminalWindow, TerminalWindowHeader, FullscreenModal, ExitConfirmDialog } from './components';

// Import constants
import { LOG_MESSAGES, TECH_STACK, ENGINEERING_BETS, QUIZ_QUESTIONS, BEHIND_THE_SCENES_VIDEOS } from './constants';

// Import types
import type { LogEntry, StackItem, EngineeringBet, TerminalLine, BehindTheScenesVideo } from './types';

// --- REMAINING INLINE COMPONENTS ---
// Note: ApplicationModal and InteractiveTerminal remain inline due to complexity
// Other components (BootSequence, VideoModal, GlitchText, SectionHeader) are imported from ./components

const InteractiveTerminal = ({ onExit, onThemeChange, onMinimizedChange, onFullscreenChange, onShowExitConfirm }: { onExit?: () => void, onThemeChange?: (theme: 'default' | 'matrix' | 'cyberpunk' | 'light', crtMode: boolean) => void, onMinimizedChange?: (isMinimized: boolean) => void, onFullscreenChange?: (isFullscreen: boolean) => void, onShowExitConfirm?: () => void }) => {
    const [history, setHistory] = useState<TerminalLine[]>([
        { type: 'system', content: 'Welcome, Architect of the Future.' }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Track timers for cleanup (prevent memory leaks)
    const quizTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // React 19 useQuizState hook with useOptimistic for instant UI feedback
    const quiz = useQuizState(QUIZ_QUESTIONS);

    // Cleanup timers on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (quizTimerRef.current) clearTimeout(quizTimerRef.current);
            if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        };
    }, []);

    // Handle escape key to close fullscreen
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen]);

    // Focus input when entering fullscreen
    useEffect(() => {
        if (isFullscreen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFullscreen]);

    // Notify parent when fullscreen changes
    useEffect(() => {
        onFullscreenChange?.(isFullscreen);
    }, [isFullscreen, onFullscreenChange]);

    // Handle minimize with proper animation sequencing
    // Minimize: backgrounds fade (200ms) → terminal shrinks (500ms) → cat appears (300ms)
    // Restore: cat fades (300ms) → terminal expands (400ms) → backgrounds fade in (200ms)
    const handleMinimizeToggle = () => {
        if (!isMinimized) {
            // MINIMIZING: Fade backgrounds first, then trigger terminal shrink
            onMinimizedChange?.(true);
            setTimeout(() => setIsMinimized(true), 250);
        } else {
            // RESTORING: Expand terminal first, then fade in backgrounds
            setIsMinimized(false);
            setTimeout(() => onMinimizedChange?.(false), 750); // Wait for cat exit + terminal enter
        }
    };

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        const newHistory = [...history, { type: 'input', content: input } as TerminalLine];

        // QUIZ LOGIC (React 19 useOptimistic for instant UI feedback)
        if (quizStarted && !quiz.state.isComplete) {
            if (cmd === 'exit' || cmd === 'quit') {
                quiz.resetQuiz();
                setQuizStarted(false);
                newHistory.push({ type: 'output', content: 'Quiz terminated.' });
            } else if (cmd === 'a' || cmd === 'b') {
                const answer = cmd as 'a' | 'b';
                const currentQuestion = quiz.currentQuestion;

                // Capture current index BEFORE submitAnswer updates state
                const currentIndex = quiz.state.currentQuestionIndex;

                if (currentQuestion) {
                    const isCorrect = answer === currentQuestion.correct;

                    // Submit answer (uses useOptimistic for instant feedback - increments index)
                    quiz.submitAnswer(answer);

                    newHistory.push({
                        type: 'output',
                        content: isCorrect
                            ? <span className="text-green-500">{currentQuestion.feedback_pass}</span>
                            : <span className="text-amber-500">{currentQuestion.feedback_fail}</span>
                    });

                    // Show next question or results (using captured index to avoid timing issues)
                    // Clear any existing quiz timer before setting a new one
                    if (quizTimerRef.current) clearTimeout(quizTimerRef.current);

                    quizTimerRef.current = setTimeout(() => {
                        const nextIndex = currentIndex + 1;
                        if (nextIndex < QUIZ_QUESTIONS.length) {
                            const nextQ = QUIZ_QUESTIONS[nextIndex];
                            if (nextQ) {
                                setHistory(prev => [...prev, {
                                    type: 'output',
                                    content: (
                                        <div className="mt-2">
                                            <div className="text-primary font-bold">Q{nextIndex + 1}: {nextQ.q}</div>
                                            <div className="pl-4 text-secondary">A) {nextQ.a}</div>
                                            <div className="pl-4 text-secondary">B) {nextQ.b}</div>
                                        </div>
                                    )
                                }]);
                            }
                        } else {
                            // Quiz complete - show results and reset quiz state
                            const finalScore = quiz.state.score;
                            setQuizStarted(false); // Reset flag for next quiz
                            setHistory(prev => [...prev, {
                                type: 'output',
                                content: (
                                    <div className="mt-4 p-4 border border-default rounded bg-surface/80">
                                        <div className="text-primary font-bold mb-2 text-lg">DIAGNOSTIC COMPLETE</div>
                                        <div className="font-mono mb-4">SCORE: {finalScore}/{QUIZ_QUESTIONS.length}</div>

                                        {finalScore >= 8 ? (
                                            <div className="space-y-2">
                                                <div className="text-green-400 font-bold">&gt;&gt; COMPATIBILITY CONFIRMED ({Math.round((finalScore / QUIZ_QUESTIONS.length) * 100)}%)</div>
                                                <div className="text-primary">You have the mindset we're looking for.</div>
                                                <div className="text-muted text-xs">Initiating application sequence...</div>
                                                <div className="mt-2 p-2 bg-green-900/20 border border-green-500/30 rounded text-green-300">
                                                    Run <span className="text-primary font-bold">apply</span> to claim your spot.
                                                </div>
                                            </div>
                                        ) : finalScore >= 6 ? (
                                            <div className="space-y-2">
                                                <div className="text-amber-400 font-bold">&gt;&gt; MIXED SIGNALS DETECTED</div>
                                                <div className="text-primary">You have some of the traits we value, but there are gaps.</div>
                                                <div className="text-secondary">Consider whether full ownership of ambiguous problem spaces excites or exhausts you.</div>
                                                <div className="text-muted text-sm mt-2">If you're energized by that challenge, let's talk anyway. Run <span className="text-primary">apply</span>.</div>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <div className="text-red-400 font-bold">&gt;&gt; LOW ALIGNMENT DETECTED</div>
                                                <div className="text-primary">Based on these answers, Switchup likely won't make you happy.</div>
                                                <div className="text-secondary">You might thrive in an environment with:</div>
                                                <div className="text-muted text-sm pl-4">• Clear product specs and roadmaps</div>
                                                <div className="text-muted text-sm pl-4">• Defined scope and predictable deliverables</div>
                                                <div className="text-muted text-sm pl-4">• Separation between 'building' and 'deciding what to build'</div>
                                                <div className="text-amber-500 text-xs mt-3">That's a valid choice. Different people thrive in different environments.</div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }]);
                        }
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
                            <div className="text-primary font-bold">Available Commands:</div>
                            <div className="grid grid-cols-[120px_1fr] gap-2 text-secondary">
                                <span className="text-green-500">stack</span> <span>Show tech stack + engineering bets</span>
                                <span className="text-green-500">mission</span> <span>Our vision for the Universal Adapter</span>
                                <span className="text-green-500">challenges</span> <span>Core architectural problems to solve</span>
                                <span className="text-green-500">culture</span> <span>10-question fit diagnostic (profound)</span>
                                <span className="text-green-500">theme</span> <span>Switch visual theme (matrix/cyberpunk/light/default)</span>
                                <span className="text-green-500">ls</span> <span>Explore the codebase structure</span>
                                <span className="text-green-500">whoami</span> <span>Your profile + permissions</span>
                                <span className="text-green-500">sudo</span> <span>Try it (you'll see)</span>
                                <span className="text-green-500">apply</span> <span>Start your application</span>
                                <span className="text-green-500">clear</span> <span>Clear terminal history</span>
                            </div>
                            <div className="text-muted text-xs mt-3 border-t border-default pt-2">
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
                            <div className="text-primary font-bold border-b border-default pb-1">ARCHITECTURAL CHALLENGES</div>
                            <div>
                                <span className="text-green-500">1. The Universal Adapter:</span> <br />
                                <span className="text-secondary">Moving from "Energy in Germany" to "Any Subscription Across Countries". How do we abstract provider logic so the core system is agnostic?</span>
                            </div>
                            <div>
                                <span className="text-green-500">2. Configurable vs. Robust:</span> <br />
                                <span className="text-secondary">We need to launch new markets in weeks, not months. How do we build a system that is highly configurable but doesn't break under edge cases?</span>
                            </div>
                        </div>
                    )
                });
                break;
            case 'culture':
            case 'quiz':
                // Start quiz using React 19 useQuizState hook
                quiz.resetQuiz(); // Ensure clean start
                setQuizStarted(true);
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="space-y-2">
                            <div className="text-green-400 font-bold">INITIALIZING CULTURE FIT DIAGNOSTIC...</div>
                            <div>Answer A or B. Type "exit" to quit.</div>
                            <div className="mt-4">
                                <div className="text-primary font-bold">Q1: {QUIZ_QUESTIONS[0].q}</div>
                                <div className="pl-4 text-secondary">A) {QUIZ_QUESTIONS[0].a}</div>
                                <div className="pl-4 text-secondary">B) {QUIZ_QUESTIONS[0].b}</div>
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
                    )
                });
                break;
            case 'mission':
                newHistory.push({
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
                                <div className="pl-4 text-green-500">✓ Energy (DE): 15k switches/mo, 7-day avg (down from 45)</div>
                                <div className="pl-4 text-green-500">✓ E.ON Bot: 98% success (reverse-engineered, battle-tested)</div>
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
                    )
                });
                break;
            case 'ls':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="font-mono text-sm space-y-1">
                            <div className="text-muted mb-2">total 47 files (and counting)</div>
                            <div className="text-blue-400">drwxr-xr-x  .git/                    (3 months of commits, some regrettable)</div>
                            <div className="text-primary">-rw-r--r--  README.md                2.3kb   "How to ship your first flow"</div>
                            <div className="text-primary">-rw-r--r--  job-description.md       8.1kb   You are here 👋</div>
                            <div className="text-green-400">-rwxr-xr-x  apply.sh                 127b    Your future starts here</div>
                            <div className="text-blue-400 mt-2">drwxr-xr-x  flows/</div>
                            <div className="text-secondary pl-4">-rw-r--r--  eon-bot.ts             4.2kb   The legendary reverse-eng (ask us about this)</div>
                            <div className="text-secondary pl-4">-rw-r--r--  telco-adapter.ts       2.8kb   WIP: Universal pattern v1 (your playground)</div>
                            <div className="text-secondary pl-4">-rw-r--r--  doc-parser.ts          3.1kb   Gemini + Vision pipeline (99.2% accuracy!)</div>
                            <div className="text-secondary pl-4">-rw-r--r--  fax-handler.ts         1.9kb   Yes, fax. In 2025. Don't @ us.</div>
                            <div className="text-blue-400 mt-2">drwxr-xr-x  core/</div>
                            <div className="text-red-400 pl-4">-rw-r--r--  universal-adapter.ts   BROKEN  This is your job (seriously)</div>
                            <div className="text-muted pl-4 text-xs"># TODO: Make this work for Energy + Telco without if/else hell</div>
                            <div className="text-blue-400 mt-2">drwxr-xr-x  monitoring/</div>
                            <div className="text-secondary pl-4">-rw-r--r--  langfuse-traces.ts     1.4kb   LLM observability (we debug AI like code)</div>
                            <div className="text-secondary pl-4">-rw-r--r--  alerting.ts            892b    Slack webhooks (3am pings, yay!)</div>
                            <div className="text-muted mt-2">-rw-r--r--  .env                     REDACTED (nice try)</div>
                            <div className="text-muted">-rw-r--r--  docker-compose.yml       1.1kb   Local dev setup</div>
                            <div className="text-muted">-rw-r--r--  package.json             2.9kb   23 deps (we keep it light)</div>
                            <div className="text-blue-400 mt-2">drwxr-xr-x  docs/</div>
                            <div className="text-secondary pl-4">-rw-r--r--  engineering-bets.md    5.2kb   Our engineering bets</div>
                            <div className="text-secondary pl-4">-rw-r--r--  failures.md            3.8kb   Things that didn't work</div>
                        </div>
                    )
                });
                break;
            case 'whoami':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="font-mono text-sm space-y-2">
                            <div className="text-secondary">USER: guest@switchup.tech</div>
                            <div className="text-secondary">ROLE: Potential Product Engineer</div>
                            <div className="text-secondary">STATUS: Evaluating cultural fit...</div>
                            <div className="text-muted text-xs">SESSION_START: {new Date().toISOString()}</div>

                            <div className="mt-3 border-t border-default pt-2">
                                <div className="text-primary font-bold mb-1">PERMISSIONS:</div>
                                <div className="pl-4 text-green-500">✓ Read job description</div>
                                <div className="pl-4 text-green-500">✓ Explore tech stack</div>
                                <div className="pl-4 text-green-500">✓ Run culture diagnostic</div>
                                <div className="pl-4 text-green-500">✓ Challenge our bets</div>
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
                    )
                });
                break;
            case 'sudo':
                newHistory.push({
                    type: 'output',
                    content: (
                        <div className="font-mono text-sm space-y-2">
                            <div className="text-muted">[sudo] password for guest:</div>
                            <div className="text-red-400">Permission denied.</div>

                            <div className="mt-2 text-secondary">You need to be hired first. Three paths:</div>
                            <div className="pl-4 text-muted">1. Run './apply.sh' (email us directly)</div>
                            <div className="pl-4 text-muted">2. Click 'Initialize Application' (fancy modal, same result)</div>
                            <div className="pl-4 text-muted">3. Keep exploring, find easter eggs, impress us</div>

                            <div className="mt-2 text-muted text-xs">
                                Protip: We actually read every application. No AI screening here.
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
                            <a href="mailto:future-colleagues@switchup.tech" className="underline hover:text-primary">Click here to email future-colleagues@switchup.tech</a>
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
                            <div className="text-xs text-muted">You know the classics. We like that.</div>
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
                            <span className="text-secondary">Fun fact: We not only experiment with our ways of working, but also with innovative approaches to supporting health.</span>
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
                            <div className="text-secondary">Run <span className="text-primary">apply</span> to make it official.</div>
                        </div>
                    )
                });
                break;
            case 'exit':
                if (!quizStarted) {
                    // Trigger shutdown sequence
                    newHistory.push({
                        type: 'output',
                        content: (
                            <div className="space-y-2">
                                <div className="text-red-400 font-bold">INITIATING SHUTDOWN SEQUENCE...</div>
                                <div className="text-muted text-xs">Disconnecting neural links...</div>
                                <div className="text-muted text-xs">Saving session state...</div>
                                <div className="text-amber-500 text-xs">Warning: Unsaved applications will be lost.</div>
                                <div className="text-green-400 mt-2">See you on the inside. 🚀</div>
                            </div>
                        )
                    });
                    setHistory(newHistory);
                    setInput('');

                    // Trigger parent shutdown after a delay (clean up existing timer first)
                    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
                    exitTimerRef.current = setTimeout(() => {
                        if (onExit) onExit();
                    }, 2000);
                    return;
                }
                break;
            case 'theme':
            case 'theme matrix':
            case 'theme cyberpunk':
            case 'theme light':
            case 'theme default':
                if (cmd === 'theme') {
                    // Show available themes
                    newHistory.push({
                        type: 'output',
                        content: (
                            <div className="space-y-2">
                                <div className="text-primary font-bold">Available Themes:</div>
                                <div className="space-y-1 text-sm">
                                    <div className="text-secondary">• <span className="text-green-500">theme matrix</span> - Matrix-inspired green glow + CRT effect</div>
                                    <div className="text-secondary">• <span className="text-green-500">theme cyberpunk</span> - Magenta/purple futuristic aesthetic</div>
                                    <div className="text-secondary">• <span className="text-green-500">theme light</span> - Light mode (accessibility)</div>
                                    <div className="text-secondary">• <span className="text-green-500">theme default</span> - Terminal green classic</div>
                                </div>
                            </div>
                        )
                    });
                } else {
                    const themeName = cmd.split(' ')[1] as 'matrix' | 'cyberpunk' | 'light' | 'default';
                    const crtEnabled = themeName === 'matrix';

                    if (onThemeChange) {
                        onThemeChange(themeName, crtEnabled);
                    }

                    newHistory.push({
                        type: 'output',
                        content: (
                            <div className="text-green-400">
                                Theme switched to: <span className="text-primary font-bold">{themeName.toUpperCase()}</span>
                                {crtEnabled && <span className="text-muted text-xs ml-2">(CRT mode enabled)</span>}
                            </div>
                        )
                    });
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

    // Terminal content (shared between normal and fullscreen modes)
    const terminalContent = (isFullscreenMode: boolean) => (
        <>
            {/* Shared Window Header */}
            <TerminalWindowHeader
                title="zsh - future@switchup.tech"
                isFullscreen={isFullscreenMode}
                onClose={() => onShowExitConfirm?.()}
                onMinimize={() => {
                    if (isFullscreenMode) setIsFullscreen(false);
                    handleMinimizeToggle();
                }}
                onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
            />

            {/* Terminal Content */}
            <div className={`p-6 flex flex-col ${isFullscreenMode ? 'h-[calc(100vh-120px)]' : 'h-[600px]'}`}>
                <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-neutral-700">
                    {history.map((line, i) => (
                        <div key={i} className={`${line.type === 'input' ? 'text-primary' : 'text-secondary'} `}>
                            {line.type === 'input' && <span className="text-green-500 mr-2">➜</span>}
                            {line.content}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <form onSubmit={handleCommand} className="mt-2 flex items-center gap-2 border-t border-default pt-2">
                    <span className="text-green-500">➜</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-transparent border-none outline-none text-primary w-full placeholder:text-neutral-700"
                        placeholder="Type a command..."
                    />
                </form>
            </div>
        </>
    );

    return (
        <div className="relative">
            {/* Terminal Views - Minimized or Normal */}
            <AnimatePresence mode="wait" initial={false}>
                {isMinimized ? (
                    <motion.div
                        key="minimized"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-mono text-sm cursor-pointer group h-[640px] flex flex-col items-center justify-center"
                        onClick={handleMinimizeToggle}
                    >
                        <div className="text-center space-y-6 relative">
                            {/* ASCII Art Cat */}
                            <motion.pre
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-green-500/80 text-xs leading-tight"
                            >
{`
    /\\_____/\\
   /  o   o  \\
  ( ==  ^  == )
   )         (
  (           )
 ( (  )   (  ) )
(__(__)___(__)__)
`}
                            </motion.pre>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="space-y-3"
                            >
                                <div className="text-2xl font-bold text-primary">
                                    🏖️ Terminal went on vacation
                                </div>
                                <div className="text-secondary text-sm">
                                    Even AI-powered terminals need a break sometimes.
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
                                className="text-green-500 font-mono text-sm mt-6"
                            >
                                <span className="text-muted">$</span> await terminal.wakeUp()
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="terminal"
                        initial={{ opacity: 0, scaleX: 0.2, scaleY: 0.05, y: 300 }}
                        animate={{
                            opacity: isFullscreen ? 0 : 1,
                            scaleX: isFullscreen ? 1.02 : 1,
                            scaleY: isFullscreen ? 1.02 : 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            scaleX: 0.2,
                            scaleY: 0.05,
                            y: 300,
                            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                        }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{ transformOrigin: 'bottom center' }}
                        className={`terminal-card font-mono text-sm ${isFullscreen ? 'pointer-events-none' : ''}`}
                    >
                        {terminalContent(false)}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fullscreen Modal - using shared component */}
            <FullscreenModal
                isOpen={isFullscreen}
                onClose={() => setIsFullscreen(false)}
            >
                {terminalContent(true)}
            </FullscreenModal>
        </div>
    );
};

export default function SwitchupOperatingSystem() {
    // Use React 19 hooks
    const { currentTheme, crtMode, isPending: themeChanging, changeTheme } = useTheme();

    // useShutdown hook for React 19 concurrent rendering
    const shutdown = useShutdown(() => {
        localStorage.setItem('switchup_shutdown', 'true');
    });

    const [booted, setBooted] = useState(() => {
        // If system was shut down, skip boot sequence
        if (typeof window !== 'undefined') {
            return localStorage.getItem('switchup_shutdown') === 'true';
        }
        return false;
    });

    // useTerminalLogs hook for React 19 deferred rendering (non-blocking)
    const terminalLogs = useTerminalLogs(booted); // Auto-start when booted

    const [activeBet, setActiveBet] = useState<string | null>(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
    const [videoSectionMinimized, setVideoSectionMinimized] = useState(false);
    const [applicationOpen, setApplicationOpen] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);
    const [terminalMinimized, setTerminalMinimized] = useState(false);
    const [terminalFullscreen, setTerminalFullscreen] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const logsEndRef = useRef<HTMLDivElement>(null);
    const logsContainerRef = useRef<HTMLDivElement>(null);

    // Handle shutdown sequence
    const handleShutdown = () => {
        shutdown.initiate(); // Use React 19 useShutdown hook
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
        if (!shutdown.isActive) return;

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
    }, [shutdown.isActive]);

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

    // Auto-scroll to bottom when new logs arrive (using deferred logs for performance)
    useEffect(() => {
        if (logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
        }
    }, [terminalLogs.logs]);

    // Start terminal logs when system boots
    useEffect(() => {
        if (booted && !terminalLogs.isRunning) {
            terminalLogs.start();
        }
    }, [booted, terminalLogs.isRunning, terminalLogs.start]);

    if (!booted && !shutdown.isActive) {
        return (
            <ErrorBoundary>
                <Suspense fallback={
                    <div className="fixed inset-0 bg-surface-dark z-[100] flex items-center justify-center">
                        <div className="text-green-500 font-mono animate-pulse">Initializing system...</div>
                    </div>
                }>
                    <BootSequence onComplete={() => setBooted(true)} />
                </Suspense>
            </ErrorBoundary>
        );
    }

    // If shutdown is active, show only the shutdown screen
    if (shutdown.isActive) {
        const shutdownMessages = [
            "Terminating AI agents...",
            "Closing provider connections...",
            "Archiving workflow state...",
            "Shutting down Windmill engine...",
            "Disconnecting from Neon DB...",
            "Powering down systems..."
        ];

        return (
            <div className="min-h-screen bg-surface-dark flex items-center justify-center font-mono">
                {!shutdown.isComplete ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                    >
                        <div className="text-red-400 text-2xl font-bold mb-8">SYSTEM SHUTDOWN IN PROGRESS</div>
                        <div className="space-y-2 text-secondary">
                            {shutdownMessages.map((msg, i) => {
                                const msgProgress = ((i + 1) / shutdownMessages.length) * 100;
                                if (shutdown.progress >= msgProgress - 10) {
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-3"
                                        >
                                            <X className="text-red-500" size={16} />
                                            <span>{msg}</span>
                                        </motion.div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-muted text-sm mt-8"
                        >
                            ████████████████████
                        </motion.div>
                        <div className="text-muted text-xs mt-4">{Math.round(shutdown.progress)}%</div>
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
                                <div className="text-primary text-3xl font-bold mb-2">SYSTEM OFFLINE</div>
                                <div className="text-muted text-sm">SwitchUp OS v2.0-alpha has been shut down successfully</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="border-t border-default pt-8 space-y-4"
                            >
                                <div className="text-secondary text-lg">
                                    "The best way to predict the future<br />is to build it."
                                </div>
                                <div className="text-muted text-sm">— someone who didn't take no for an answer</div>
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
                                <span className="text-muted">pssst:</span> still here? you might be our person.
                            </div>
                            <button
                                onClick={handleReboot}
                                className="text-muted hover:text-muted transition-colors text-xs underline mr-4"
                            >
                                reboot
                            </button>
                            <span className="text-neutral-800 text-xs">or</span>
                            <a
                                href="mailto:future-colleagues@switchup.tech"
                                className="text-muted hover:text-muted transition-colors text-xs underline ml-4"
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
        <div className={`min-h-screen bg-terminal-bg text-primary font-mono selection:bg-green-900 selection:text-green-200 overflow-x-hidden ${crtMode ? 'crt-effect' : ''}`}>

            {/* --- MODALS --- */}
            <ErrorBoundary>
                <Suspense fallback={null}>
                    <BehindTheScenesModal
                        isOpen={selectedVideoIndex !== null}
                        onClose={() => setSelectedVideoIndex(null)}
                        onMinimize={() => {
                            // Close modal and minimize the underlying TerminalWindow
                            setSelectedVideoIndex(null);
                            setVideoSectionMinimized(true);
                        }}
                        videos={BEHIND_THE_SCENES_VIDEOS}
                        initialVideoIndex={selectedVideoIndex ?? 0}
                    />
                    <ApplicationModal isOpen={applicationOpen} onClose={() => setApplicationOpen(false)} />
                </Suspense>
            </ErrorBoundary>

            {/* Exit Confirmation Dialog - rendered at root level for full-screen backdrop */}
            <ExitConfirmDialog
                isOpen={showExitConfirm}
                onCancel={() => setShowExitConfirm(false)}
                onConfirm={() => {
                    setShowExitConfirm(false);
                    handleShutdown();
                }}
            />

            {/* --- STATUS BAR --- */}
            <div className="fixed top-0 w-full z-50 bg-terminal-bg/90 backdrop-blur-md border-b border-default h-10 flex items-center justify-between px-4 text-xs">
                <div className="flex items-center gap-4">
                    <span
                        onClick={handleLogoClick}
                        className="font-bold text-primary cursor-pointer hover:text-green-400 transition-colors"
                        title="Click me... multiple times 😉"
                    >
                        SWITCHUP_OS <span className="text-green-500">v2.0-alpha</span>
                    </span>
                    <span className="hidden md:flex items-center gap-2 text-muted">
                        <Server size={12} /> BERLIN :: ONLINE
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-amber-500 animate-pulse">
                        <AlertTriangle size={12} />
                        <span>SCALING_BOTTLENECK_DETECTED</span>
                    </div>
                    <span className="text-muted">root@switchup:~</span>
                    <button
                        onClick={handleShutdown}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-red-900 hover:text-red-400 transition-colors text-muted"
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
                <section className="min-h-[80vh] grid lg:grid-cols-2 gap-16 items-center relative terminal-scroll-fade">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-green-500/5 blur-[100px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface border border-default text-green-500 text-xs font-bold tracking-wider">
                            <Activity size={12} />
                            <span>SYSTEM_READY</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-primary leading-[0.9] tracking-tighter">
                            <GlitchText text="THE" /> <br />
                            <GlitchText text="SUBSCRIPTION" /> <br />
                            <GlitchText text="OS." className="text-green-500" />
                        </h1>

                        <p className="text-xl text-secondary max-w-lg leading-relaxed border-l-2 border-green-500/30 pl-6">
                            We're building the <strong className="text-primary">Universal Adapter</strong> — the world's first subscription infrastructure that works across any provider, any market.
                            <br /><br />
                            Where <span className="text-primary">AI Agents</span> negotiate with legacy systems. Where automation handles the noise, and humans handle the relationship.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setApplicationOpen(true)}
                                className="px-6 py-3 border border-default text-secondary hover:border-green-500 hover:text-green-400 transition-all flex items-center gap-2 group text-sm font-mono"
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
                        <motion.div
                            initial={false}
                            animate={{ opacity: (terminalMinimized || terminalFullscreen) ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                            className="pointer-events-none"
                        >
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
                        </motion.div>
                        <InteractiveTerminal
                            onExit={handleShutdown}
                            onThemeChange={changeTheme}
                            onMinimizedChange={setTerminalMinimized}
                            onFullscreenChange={setTerminalFullscreen}
                            onShowExitConfirm={() => setShowExitConfirm(true)}
                        />
                        {!terminalMinimized && !terminalFullscreen && (
                            <div className="mt-2 text-center text-xs text-muted">
                                Type <span className="text-green-500">help</span> to explore
                            </div>
                        )}
                    </motion.div>
                </section>

                {/* --- LIVE TERMINAL --- */}
                <section className="grid lg:grid-cols-2 gap-12 items-start terminal-scroll-slide">
                    <div className="space-y-6">
                        <SectionHeader title="System Logs" icon={Terminal} />
                        <p className="text-secondary leading-relaxed">
                            Switchup protects 100k+ households. But we are hitting limits.
                            Our service colleagues spend too much time on manual tasks.
                            <br /><br />
                            <strong className="text-primary">The Mission:</strong> Build the "Universal Adapter" for any subscription service.
                            Make architectural decisions that are provider-agnostic.
                            Create a system where automation handles the noise, and humans handle the relationship.
                        </p>
                    </div>

                    <TerminalWindow
                        title="tail -f /var/log/switchup_core.log"
                        height="400px"
                        exitDialogTitle="Stop watching logs?"
                        exitDialogDescription={
                            <div className="text-secondary text-sm space-y-2">
                                <p>The logs will continue without you. They always do.</p>
                                <p className="text-muted text-xs italic">"In the silence between log entries, wisdom is found."</p>
                            </div>
                        }
                        minimizedContent={
                            <div className="h-[250px] flex flex-col items-center justify-center text-center space-y-6">
                                {/* ASCII Art Coffee Cup */}
                                <motion.pre
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-amber-500/80 text-xs leading-tight"
                                >
{`
      ) )
    ( ( )
  ........
  |      |]
  \\      /
   \`----'
`}
                                </motion.pre>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-2"
                                >
                                    <div className="text-xl font-bold text-primary">
                                        Logs on coffee break
                                    </div>
                                    <div className="text-secondary text-sm">
                                        Even infinite streams need a moment of zen.
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
                                    className="text-green-500 font-mono text-sm"
                                >
                                    <span className="text-muted">$</span> tail --resume
                                </motion.div>
                            </div>
                        }
                    >
                        <div
                            ref={logsContainerRef}
                            className="p-6 h-full overflow-y-auto space-y-2 scrollbar-hide"
                        >
                            <AnimatePresence initial={false}>
                                {terminalLogs.logs.slice(-12).map((log) => (
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
                                                    log.level === 'SYSTEM' ? 'text-blue-400' : 'text-muted'
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
                    </TerminalWindow>
                </section>

                {/* --- TECH STACK --- */}
                <section className="space-y-8 terminal-scroll-fade">
                    <SectionHeader title="Tech Stack" icon={Cpu} />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TECH_STACK.map((item, i) => {
                            const isCore = item.status === 'CORE';
                            const statusColor = isCore ? 'green' : 'blue';
                            return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`group relative bg-surface/50 border border-default hover:border-${statusColor}-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(${isCore ? '34,197,94' : '59,130,246'},0.1)]`}
                            >
                                {/* Status Indicator */}
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${isCore ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'} animate-pulse`} />
                                    <span className={`text-[10px] font-mono ${isCore ? 'text-green-500' : 'text-blue-500'} tracking-wider`}>{item.status}</span>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Header */}
                                    <div className="flex items-start gap-1">
                                        <div className={`p-3 bg-surface-dark/50 rounded-lg ${isCore ? 'group-hover:bg-green-500/10 group-hover:text-green-400' : 'group-hover:bg-blue-500/10 group-hover:text-blue-400'} transition-colors`}>
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-bold text-primary ${isCore ? 'group-hover:text-green-400' : 'group-hover:text-blue-400'} transition-colors`}>{item.tool}</h3>
                                            <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">{item.category}</p>
                                        </div>
                                    </div>

                                    {/* Specs */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {item.specs.map((spec, j) => (
                                            <div key={j} className="tag-bg border border-default rounded px-2 py-1 text-[10px] font-mono text-secondary flex items-center gap-2">
                                                <div className={`w-1 h-1 rounded-full ${isCore ? 'bg-green-500/50' : 'bg-blue-500/50'}`} />
                                                {spec}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Rationale */}
                                    <div className="relative">
                                        <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-surface-dark ${isCore ? 'group-hover:bg-green-500' : 'group-hover:bg-blue-500'} transition-colors`} />
                                        <p className="pl-4 text-sm text-secondary leading-relaxed group-hover:text-primary transition-colors">
                                            {item.rationale}
                                        </p>
                                    </div>
                                </div>

                                {/* Scanline Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity" />
                            </motion.div>
                        );
                        })}
                    </div>
                </section>

                {/* --- BEHIND THE SCENES --- */}
                <section id="behind-the-scenes" className="space-y-8">
                    <SectionHeader title="Behind the Scenes" icon={Eye} />

                    <TerminalWindow
                        title="BEHIND_THE_SCENES_01.mp4"
                        height="auto"
                        onFullscreenClick={() => setSelectedVideoIndex(0)}
                        isMinimizedControlled={videoSectionMinimized}
                        onMinimizeClick={() => setVideoSectionMinimized(!videoSectionMinimized)}
                        exitDialogTitle="Close the director's cut?"
                        exitDialogDescription={
                            <div className="text-secondary text-sm space-y-2">
                                <p>You'll miss out on the unfiltered truth from the team.</p>
                                <p className="text-muted text-xs italic">"The best stories are told by those who live them."</p>
                            </div>
                        }
                        minimizedContent={
                            <div className="h-[250px] flex flex-col items-center justify-center text-center space-y-6">
                                {/* ASCII Art Film Reel */}
                                <motion.pre
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-blue-400/80 text-xs leading-tight"
                                >
{`
    .----.
   ( o  o )
    |    |
   /|    |\\
  (_|    |_)
    '----'
`}
                                </motion.pre>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-2"
                                >
                                    <div className="text-xl font-bold text-primary">
                                        Intermission
                                    </div>
                                    <div className="text-secondary text-sm">
                                        The team went to grab popcorn.
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
                                    className="text-green-500 font-mono text-sm"
                                >
                                    <span className="text-muted">$</span> ffplay --resume
                                </motion.div>
                            </div>
                        }
                    >
                        {/* Clean Browser-style Video Player */}
                        <div className="p-4">
                            {BEHIND_THE_SCENES_VIDEOS.slice(0, 1).map((video) => (
                                <div
                                    key={video.id}
                                    onClick={() => setSelectedVideoIndex(0)}
                                    className="group cursor-pointer"
                                >
                                    {/* Video Player Area */}
                                    <div className="relative aspect-video bg-black rounded overflow-hidden">
                                        {/* Dark gradient background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900" />

                                        {/* Center play button */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/60 group-hover:scale-110 transition-all duration-300">
                                                <Play size={32} className="text-green-500 ml-1" />
                                            </div>
                                        </div>

                                        {/* Author badge - bottom left */}
                                        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2 py-1 bg-black/80 rounded">
                                            <div className="w-5 h-5 rounded-full bg-green-500/30 border border-green-500/50 flex items-center justify-center text-green-500 font-bold text-[10px]">
                                                {video.author.avatarInitials}
                                            </div>
                                            <span className="text-white text-xs">{video.author.name}</span>
                                        </div>

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {/* Video title below */}
                                    <div className="mt-3 px-1">
                                        <h3 className="text-base font-bold text-primary group-hover:text-green-400 transition-colors">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-muted mt-1 line-clamp-1">
                                            {video.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TerminalWindow>
                </section>

                {/* --- ENGINEERING BETS --- */}
                <section>
                    <SectionHeader title="Engineering Bets" icon={BookOpen} />
                    <div className="grid md:grid-cols-2 gap-6">
                        {ENGINEERING_BETS.map((bet) => (
                            <div
                                key={bet.id}
                                onClick={() => setActiveBet(activeBet === bet.id ? null : bet.id)}
                                className={`group cursor-pointer p-6 rounded-lg border transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] ${activeBet === bet.id
                                    ? 'bg-surface border-green-500'
                                    : 'bg-terminal-surface border-default'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-primary group-hover:text-green-400 transition-colors">{bet.title}</h3>
                                    <ChevronRight className={`transition-transform ${activeBet === bet.id ? 'rotate-90 text-green-500' : 'text-muted group-hover:text-green-500'}`} />
                                </div>
                                <p className="text-sm text-secondary mb-4 group-hover:text-primary transition-colors">{bet.context}</p>
                                <AnimatePresence>
                                    {activeBet === bet.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 border-t border-default text-sm text-primary">
                                                <strong className="text-amber-500 block mb-1">The Trade-off:</strong>
                                                {bet.tradeoff}
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
                        <p className="text-muted text-sm mb-6 italic">
                            Great fit elsewhere, not here:
                        </p>
                        <ul className="space-y-4 text-sm text-secondary">
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">01</span>
                                <div>
                                    <div className="text-primary mb-1">You need detailed specs from a PM to function</div>
                                    <div className="text-muted text-xs">We don't have product managers. You define what to build based on business outcomes.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">02</span>
                                <div>
                                    <div className="text-primary mb-1">You're a specialist who goes deep without connecting to business problems</div>
                                    <div className="text-muted text-xs">We need T-shaped engineers who understand the "why" behind every line of code.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">03</span>
                                <div>
                                    <div className="text-primary mb-1">You optimize within familiar tools rather than adopting the best tool</div>
                                    <div className="text-muted text-xs">The right answer might be Rust, Go, or a library that came out last week. Can you adapt?</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">04</span>
                                <div>
                                    <div className="text-primary mb-1">You prioritize code purity over shipping business results</div>
                                    <div className="text-muted text-xs">Success = "we reduced manual cases by 90%", not "the architecture is pristine."</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-red-900 font-mono">05</span>
                                <div>
                                    <div className="text-primary mb-1">You're not excited about AI, automation, or workflow engineering</div>
                                    <div className="text-muted text-xs">This is literally what we do. If Claude, Langfuse, or Playwright bore you, this isn't the place.</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="p-8 bg-green-950/10 border border-green-900/30 rounded-lg">
                        <h3 className="text-green-500 font-bold flex items-center gap-2 mb-6">
                            <CheckCircle size={20} /> COMPATIBILITY_MATCH
                        </h3>
                        <p className="text-muted text-sm mb-6 italic">
                            You might be our person if:
                        </p>
                        <ul className="space-y-4 text-sm text-secondary">
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">01</span>
                                <div>
                                    <div className="text-primary mb-1">You've built 0→1 products at startups</div>
                                    <div className="text-muted text-xs">You know the chaos of early-stage: ambiguity, pivots, wearing multiple hats. You thrive there.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">02</span>
                                <div>
                                    <div className="text-primary mb-1">You dig into business intent, not just technical requirements</div>
                                    <div className="text-muted text-xs">"Why are we building this?" is your first question, not "What's the spec?"</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">03</span>
                                <div>
                                    <div className="text-primary mb-1">You have an experimental mindset</div>
                                    <div className="text-muted text-xs">Ship incrementally. Measure impact. Iterate. Failures are learning opportunities we share openly.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">04</span>
                                <div>
                                    <div className="text-primary mb-1">You're comfortable with ambiguity and ownership</div>
                                    <div className="text-muted text-xs">No one's handing you a roadmap. You define success metrics, tooling, and execution.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">05</span>
                                <div>
                                    <div className="text-primary mb-1">You stay current with AI/LLM developments</div>
                                    <div className="text-muted text-xs">You experiment with GPT-4, Claude, new prompting techniques. You bring ideas to the table.</div>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-green-900 font-mono">06</span>
                                <div>
                                    <div className="text-primary mb-1">You want to architect the "Universal Adapter"</div>
                                    <div className="text-muted text-xs">Build systems that scale from energy→telco→streaming. Provider-agnostic, market-agnostic. That's the challenge.</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* --- DEPLOYMENT CONSOLE (FOOTER) --- */}
                <section id="apply" className="pt-20 pb-20">
                    <div className="border-t border-default pt-20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-black text-primary tracking-tighter">
                                    READY TO <span className="text-green-500">DEPLOY?</span>
                                </h2>
                                <p className="text-secondary text-lg max-w-md">
                                    You've analyzed the logs. You've seen the stack. You know the mission.
                                    <br /><br />
                                    The only thing left is to execute the sequence.
                                </p>
                                <div className="flex gap-6 text-sm text-muted font-mono">
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

                            <div className="terminal-card terminal-interactive p-8 relative group">
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Command size={100} />
                                </div>

                                <div className="relative z-10 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs text-muted font-bold tracking-wider">TARGET_DESTINATION</label>
                                        <div className="font-mono text-xl text-primary border-b border-default pb-2">
                                            future-colleagues@switchup.tech
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs text-muted font-bold tracking-wider">REQUIRED_PAYLOAD</label>
                                        <div className="flex gap-2">
                                            <span className="px-2 py-1 bg-surface rounded text-xs text-green-500 border border-green-900/30">GITHUB_URL</span>
                                            <span className="px-2 py-1 bg-surface rounded text-xs text-green-500 border border-green-900/30">SESSION_TOKEN</span>
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