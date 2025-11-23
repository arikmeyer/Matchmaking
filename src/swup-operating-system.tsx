
import React, { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Globe, Shield, Activity, Command, Lock, Search, Play, Pause, RotateCcw, X, Server, AlertTriangle, Eye, XCircle, CheckCircle, Database, TrendingUp, GitPullRequest, User, Sparkles, Target, Code, Palette, Wrench, Heart, Rocket } from 'lucide-react';

// Import hooks
import { useTheme, useTerminalLogs, useShutdown, useQuizState, useTerminalCore } from './hooks';

// Lazy load components for code splitting (React 19 optimization)
const BootSequence = lazy(() => import('./components/BootSequence').then(m => ({ default: m.BootSequence })));
const BehindTheScenesModal = lazy(() => import('./components/BehindTheScenesModal').then(m => ({ default: m.BehindTheScenesModal })));
const ApplicationModal = lazy(() => import('./components/ApplicationModal').then(m => ({ default: m.ApplicationModal })));

// Import utility components (small, used everywhere)
import { GlitchText, SectionHeader, ErrorBoundary, TerminalWindow, ContextAwareInput, ContextAwareClickArea, ExitConfirmDialog, ProblemSpaces, DecisionTerminal, TechStackCard, FlipCard, TerminalOutput } from './components';

// Import constants
import { LOG_MESSAGES, TECH_STACK, QUIZ_QUESTIONS, BEHIND_THE_SCENES_VIDEOS } from './constants';

// Import types
import type { LogEntry, TerminalLine } from './types';

// Import command system
import { HOME_DIR } from './commands';

// --- REMAINING INLINE COMPONENTS ---
// Note: ApplicationModal and InteractiveTerminal remain inline due to complexity
// Other components (BootSequence, VideoModal, GlitchText, SectionHeader) are imported from ./components

const InteractiveTerminal = ({ onMinimizedChange, onFullscreenChange, onShowExitConfirm, onApply }: { onMinimizedChange?: (isMinimized: boolean) => void, onFullscreenChange?: (isFullscreen: boolean) => void, onShowExitConfirm?: () => void, onApply?: () => void }) => {
    // Track window state for terminal hook (TerminalWindow handles the actual state internally)
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // React 19 useQuizState hook with useOptimistic for instant UI feedback
    const quizHook = useQuizState(QUIZ_QUESTIONS);

    // Quiz results renderer - mutual discovery framing
    const renderQuizResults = (finalScore: number) => (
        <div className="mt-4 p-4 border border-default rounded bg-card-subtle">
            <div className="text-section-planning font-bold mb-2 text-lg">DISCOVERY COMPLETE</div>
            <div className="font-mono mb-4 text-muted">Clicks: {finalScore}/{QUIZ_QUESTIONS.length}</div>

            {finalScore >= 8 ? (
                <div className="space-y-2">
                    <div className="text-terminal-green font-bold">&gt;&gt; LOTS OF CLICKS ({Math.round((finalScore / QUIZ_QUESTIONS.length) * 100)}%)</div>
                    <div className="text-primary">Looks like we think similarly about building things.</div>
                    <div className="text-muted text-xs">(That's rare. We notice.)</div>
                    <div className="mt-2 p-2 bg-nested border border-border rounded text-terminal-green">
                        Curious to explore further? Run <span className="text-primary font-bold">apply</span> to start the conversation.
                    </div>
                </div>
            ) : finalScore >= 6 ? (
                <div className="space-y-2">
                    <div className="text-section-focus font-bold">&gt;&gt; SOME CLICKS, SOME TENSION</div>
                    <div className="text-primary">We agree on some things, differ on others.</div>
                    <div className="text-secondary">That's not necessarily bad – diverse perspectives can strengthen a team.</div>
                    <div className="text-muted text-sm mt-2">If the tension feels interesting rather than exhausting, let's talk. Run <span className="text-primary">apply</span>.</div>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="text-section-problem font-bold">&gt;&gt; MOSTLY TENSION</div>
                    <div className="text-primary">Our approaches seem to diverge on a few things.</div>
                    <div className="text-secondary">Honestly, we might not be the right place for what you're looking for:</div>
                    <div className="text-muted text-sm pl-4">• We don't have a product layer – scope is fluid and often unclear</div>
                    <div className="text-muted text-sm pl-4">• We expect people to define 'what' alongside 'how'</div>
                    <div className="text-muted text-sm pl-4">• Our processes change constantly – stability isn't our strength</div>
                    <div className="text-section-focus text-xs mt-3">10 questions can't capture everything. If you think we're reading this wrong, we're open to being surprised. Run <span className="text-primary">apply</span>.</div>
                </div>
            )}
        </div>
    );

    // Use unified terminal core hook
    const terminal = useTerminalCore({
        initialLines: [{ id: 'welcome', type: 'system', content: 'Welcome, Architect of the Future.' }],
        enablePathCompletion: true,
        enableAdvancedShortcuts: true,
        onApply,
        onExit: onShowExitConfirm,
        quiz: {
            start: quizHook.resetQuiz,
            submitAnswer: quizHook.submitAnswer,
            resetQuiz: quizHook.resetQuiz,
            currentQuestion: quizHook.currentQuestion,
            state: quizHook.state,
        },
        renderQuizResults,
        isMinimized,
        isFullscreen,
    });

    // Sync state changes to parent
    const handleMinimizedChange = (minimized: boolean) => {
        setIsMinimized(minimized);
        onMinimizedChange?.(minimized);
    };

    const handleFullscreenChange = (fullscreen: boolean) => {
        setIsFullscreen(fullscreen);
        onFullscreenChange?.(fullscreen);
    };

    // Minimized content
    const minimizedContent = (
        <div className="h-[640px] flex flex-col items-center justify-center text-center space-y-6">
            <motion.pre
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-terminal-green/80 text-xs leading-tight"
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
                    Terminal went on vacation
                </div>
                <div className="text-secondary text-sm">
                    Even AI-powered terminals need a break sometimes.
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
                className="text-terminal-green font-mono text-sm mt-6"
            >
                <span className="text-muted">$</span> await terminal.wakeUp()
            </motion.div>
        </div>
    );

    return (
        <TerminalWindow
            title="zsh - future@switchup.tech"
            height="600px"
            minimizedContent={minimizedContent}
            onClose={onShowExitConfirm}
            onMinimizedChange={handleMinimizedChange}
            onFullscreenChange={handleFullscreenChange}
        >
            {/* Terminal Content - uses ContextAwareClickArea for proper focus management */}
            <ContextAwareClickArea
                getClickHandler={terminal.getClickToFocusHandler}
                className="p-6 flex-1 min-h-0 flex flex-col cursor-text"
            >
                <TerminalOutput
                    lines={terminal.lines}
                    scrollRef={terminal.scrollRef}
                />
                <form onSubmit={terminal.handleSubmit} className="mt-2 flex items-center gap-2 border-t border-default pt-2">
                    <span className="text-muted">switchup{terminal.currentDirectory === HOME_DIR ? '' : `/${terminal.currentDirectory.replace(HOME_DIR, '').replace(/^\//, '')}`}</span>
                    <span className="text-muted"> {'>'}</span>
                    <ContextAwareInput
                        getInputRef={terminal.getInputRef}
                        type="text"
                        value={terminal.input}
                        onChange={(e) => terminal.setInput(e.target.value)}
                        onKeyDown={(e) => terminal.handleKeyDown(e, isFullscreen)}
                        className="terminal-input w-full"
                        placeholder="Type a command or 'help'..."
                    />
                </form>
            </ContextAwareClickArea>
        </TerminalWindow>
    );
};

export default function SwitchupOperatingSystem() {
    // Use React 19 hooks
    const { currentTheme, crtMode, isPending: themeChanging, changeTheme } = useTheme();

    // Stable callback for shutdown completion (prevents effect re-runs in hook)
    const handleShutdownComplete = useCallback(() => {
        localStorage.setItem('switchup_shutdown', 'true');
    }, []);

    // useShutdown hook for React 19 concurrent rendering
    const shutdown = useShutdown(handleShutdownComplete);

    const [booted, setBooted] = useState(() => {
        // If system was shut down, skip boot sequence
        if (typeof window !== 'undefined') {
            return localStorage.getItem('switchup_shutdown') === 'true';
        }
        return false;
    });

    // useTerminalLogs hook for React 19 deferred rendering (non-blocking)
    const terminalLogs = useTerminalLogs(booted); // Auto-start when booted

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
        console.log('%cWe see you peeking under the hood. That\'s the kind of curiosity we appreciate.', 'color: #a3a3a3; font-size: 14px;');
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
                console.log('%c – Our backend logs, probably', 'color: #737373; font-size: 10px; font-style: italic;');
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
                console.log('%cWe notice persistence. It says a lot about how someone approaches problems.', 'color: #22c55e; font-size: 12px;');
                console.log('%cYou clearly have it. Curious what else you can do?', 'color: #22c55e; font-size: 12px;');
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
            console.log('%cSeriously though, this level of thoroughness? We should probably talk.', 'color: #22c55e; font-size: 14px;');
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
                        <div className="text-terminal-green font-mono animate-pulse">Initializing system...</div>
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
                        <div className="text-section-problem text-2xl font-bold mb-8">SYSTEM SHUTDOWN IN PROGRESS</div>
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
                                            <X className="text-section-problem" size={16} />
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
                                <div className="text-muted text-sm"> – someone who didn't take no for an answer</div>
                            </motion.div>
                        </motion.div>

                        {/* Subtle footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 20 + Math.random() * 10 }}
                            className="absolute bottom-6 left-0 right-0 text-center"
                        >
                            <div className="text-faint text-xs mb-2">
                                <span className="text-muted">pssst:</span> still here? you might be our person.
                            </div>
                            <button
                                onClick={handleReboot}
                                className="text-muted hover:text-muted transition-colors text-xs underline mr-4"
                            >
                                reboot
                            </button>
                            <span className="text-faint text-xs">or</span>
                            <a
                                href="mailto:future-colleagues@switchup.tech"
                                target="_blank"
                                rel="noopener noreferrer"
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
            <div className="fixed top-0 w-full z-50 bg-navbar backdrop-blur-md border-b border-default h-10 flex items-center justify-between px-4 text-xs">
                <div className="flex items-center gap-4">
                    <span
                        onClick={handleLogoClick}
                        className="font-bold text-primary cursor-pointer hover:text-terminal-green transition-colors"
                        title="Click me... multiple times 😉"
                    >
                        SWITCHUP_OS <span className="text-terminal-green">v2.0-alpha</span>
                    </span>
                    <span className="hidden md:flex items-center gap-2 text-muted">
                        <Server size={12} /> BERLIN :: ONLINE
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-section-focus animate-pulse">
                        <AlertTriangle size={12} />
                        <span>SCALING_BOTTLENECK_DETECTED</span>
                    </div>
                    <span className="text-muted">root@switchup:~</span>
                    <button
                        onClick={handleShutdown}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-surface-dark hover:text-section-problem transition-colors text-muted"
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
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-terminal-green/5 blur-[100px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface border border-default text-terminal-green text-xs font-bold tracking-wider">
                            <Activity size={12} />
                            <span>ACCEPTING_CONNECTIONS</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-primary leading-[0.9] tracking-tighter">
                            <GlitchText text="THE" /> <br />
                            <GlitchText text="SUBSCRIPTION" /> <br />
                            <GlitchText text="OS." className="text-terminal-green" />
                        </h1>

                        <p className="text-xl text-secondary max-w-lg leading-relaxed border-l-2 border-border pl-6">
                            We're building the <strong className="text-primary">Universal Adapter</strong> – the world's first subscription infrastructure that works across any provider, any market.
                            <br /><br />
                            Where <span className="text-primary">AI Agents</span> negotiate with legacy systems. Where automation handles the noise, and humans handle the relationship.
                        </p>

                    </motion.div>

                    {/* INTERACTIVE TERMINAL IN HERO */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="relative z-20"
                    >
                        <InteractiveTerminal
                            onMinimizedChange={setTerminalMinimized}
                            onFullscreenChange={setTerminalFullscreen}
                            onShowExitConfirm={() => setShowExitConfirm(true)}
                            onApply={() => setApplicationOpen(true)}
                        />
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
                                    className="text-section-focus/80 text-xs leading-tight"
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
                                    className="text-terminal-green font-mono text-sm"
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
                                {terminalLogs.logs.map((log) => (
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
                                        className={`flex gap-3 ${log.level === 'WARN' ? 'text-section-focus' :
                                            log.level === 'ERROR' ? 'text-section-problem' :
                                                log.level === 'SUCCESS' ? 'text-terminal-green' :
                                                    log.level === 'SYSTEM' ? 'text-section-planning' : 'text-muted'
                                            }`}
                                    >
                                        <span className="opacity-30 shrink-0">[{log.timestamp}]</span>
                                        <span className="shrink-0 w-20">[{log.level}]</span>
                                        <span>{log.message}</span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={logsEndRef} />
                        </div>
                    </TerminalWindow>
                </section>

                {/* --- ORGANISATION --- */}
                <section className="space-y-8 terminal-scroll-fade">
                    <SectionHeader title="Organisation" icon={Globe} />
                    <ProblemSpaces />
                </section>

                {/* --- TECH STACK & ENGINEERING BETS --- */}
                <section className="space-y-8 terminal-scroll-fade">
                    <SectionHeader title="Tech Stack" icon={Cpu} />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TECH_STACK.map((item, i) => (
                            <TechStackCard key={item.tool} item={item} index={i} />
                        ))}
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
                                    className="text-section-planning/80 text-xs leading-tight"
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
                                    className="text-terminal-green font-mono text-sm"
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
                                    <div className="relative aspect-video bg-media rounded overflow-hidden">
                                        {/* Dark gradient background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-surface-dark via-terminal-bg to-surface-dark" />

                                        {/* Center play button */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 rounded-full bg-nested border-2 border-border flex items-center justify-center group-hover:bg-surface group-hover:border-border-hover group-hover:scale-110 transition-all duration-300">
                                                <Play size={32} className="text-terminal-green ml-1" />
                                            </div>
                                        </div>

                                        {/* Author badge - bottom left */}
                                        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2 py-1 bg-badge rounded">
                                            <div className="w-5 h-5 rounded-full bg-nested border border-border flex items-center justify-center text-terminal-green font-bold text-[10px]">
                                                {video.author.avatarInitials}
                                            </div>
                                            <span className="text-primary text-xs">{video.author.name}</span>
                                        </div>

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-surface/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {/* Video title below */}
                                    <div className="mt-3 px-1">
                                        <h3 className="text-base font-bold text-primary group-hover:text-terminal-green transition-colors">
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

                {/* --- MUTUAL FIT --- */}
                <section className="space-y-8">
                    <SectionHeader title="Mutual Fit" icon={Target} />
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* SKIP_IF Card with Flip */}
                        <FlipCard
                            front={
                                <div className="h-full p-8 bg-surface border border-card-problem rounded-lg">
                                    <h3 className="text-section-problem font-bold flex items-center gap-2 mb-2">
                                        <XCircle size={20} /> SKIP_IF
                                    </h3>
                                    <p className="text-muted text-sm mb-6 italic">
                                        This probably isn't for you if:
                                    </p>
                                    <ul className="space-y-4 text-sm text-secondary">
                                        <li className="flex gap-3">
                                            <span className="text-red-900 font-mono">01</span>
                                            <div>
                                                <div className="text-primary mb-1">You need detailed specs from a PM to function</div>
                                                <div className="text-muted text-xs">There's no product layer. You own the "what" and the "how."</div>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-900 font-mono">02</span>
                                            <div>
                                                <div className="text-primary mb-1">You optimize within familiar tools rather than adopting the best tool</div>
                                                <div className="text-muted text-xs">The right answer might be Rust, Go, or a library released last week.</div>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-900 font-mono">03</span>
                                            <div>
                                                <div className="text-primary mb-1">You prioritize code purity over shipping business results</div>
                                                <div className="text-muted text-xs">Success = "we reduced manual cases by 90%", not "the architecture is pristine."</div>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-900 font-mono">04</span>
                                            <div>
                                                <div className="text-primary mb-1">You're not excited about AI, automation, or workflow engineering</div>
                                                <div className="text-muted text-xs">This is literally what we do. If Claude, Langfuse, or Playwright bore you, this isn't the place.</div>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-900 font-mono">05</span>
                                            <div>
                                                <div className="text-primary mb-1">You need defined scope and stable processes</div>
                                                <div className="text-muted text-xs">Scope is fluid and how we work evolves constantly. If you need predictability to thrive, this will be disorienting.</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            }
                            back={
                                <div className="h-full p-8 bg-surface border border-card-problem rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
                                    <div className="space-y-6 max-w-sm">
                                        <div className="flex items-center justify-center">
                                            <div className="p-4 bg-nested rounded-full border border-card-problem">
                                                <Heart size={32} className="text-section-problem" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-section-problem">
                                            Different paths, same destination
                                        </h3>
                                        <p className="text-secondary leading-relaxed text-sm">
                                            The world is beautifully diverse – and so are the environments where people thrive. What feels wrong for you might be perfect for someone else, and vice versa.
                                        </p>
                                        <p className="text-muted text-xs leading-relaxed border-t border-card-problem pt-4">
                                            The best matches start with honest self-reflection. Knowing what you need helps you find where you'll truly flourish.
                                        </p>
                                    </div>
                                </div>
                            }
                            className="h-[520px]"
                        />

                        {/* APPLY_IF Card with Flip */}
                        <FlipCard
                            front={
                                <div className="h-full p-8 bg-surface border border-card-success rounded-lg">
                                    <h3 className="text-terminal-green font-bold flex items-center gap-2 mb-2">
                                        <CheckCircle size={20} /> APPLY_IF
                                    </h3>
                                    <p className="text-muted text-sm mb-6 italic">
                                        We're likely a match if:
                                    </p>
                                    <ul className="space-y-4 text-sm text-secondary">
                                        <li className="flex gap-3">
                                            <span className="text-green-900 font-mono">01</span>
                                            <div>
                                                <div className="text-primary mb-1">You've shipped 0→1 products at startups</div>
                                                <div className="text-muted text-xs">You've navigated early-stage chaos. Ambiguity doesn't slow you down.</div>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-green-900 font-mono">02</span>
                                            <div>
                                                <div className="text-primary mb-1">You own outcomes, not just outputs</div>
                                                <div className="text-muted text-xs">You define what to build, set success metrics, and ship it. No hand-offs.</div>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-green-900 font-mono">03</span>
                                            <div>
                                                <div className="text-primary mb-1">You experiment at every level</div>
                                                <div className="text-muted text-xs">Product, process, tooling, ways of working. Fast learning loops aren't just for features – they're how we improve everything.</div>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-green-900 font-mono">04</span>
                                            <div>
                                                <div className="text-primary mb-1">AI/LLM tools are your daily workflow</div>
                                                <div className="text-muted text-xs">Claude, skills & sub-agents, LLM ops aren't buzzwords – they're how you work.</div>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-green-900 font-mono">05</span>
                                            <div>
                                                <div className="text-primary mb-1">You want to architect the "Universal Adapter"</div>
                                                <div className="text-muted text-xs">Build systems that scale from energy→telco→streaming. Provider-agnostic, market-agnostic. That's the challenge.</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            }
                            back={
                                <div className="h-full p-8 bg-surface border border-card-success rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
                                    <div className="space-y-6 max-w-sm">
                                        <div className="flex items-center justify-center">
                                            <div className="p-4 bg-nested rounded-full border border-card-success">
                                                <Rocket size={32} className="text-terminal-green" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-terminal-green">
                                            Welcome to the starting line
                                        </h3>
                                        <p className="text-secondary leading-relaxed text-sm">
                                            If you're nodding along, that's not coincidence – it's signal. We're a small team building something ambitious, and the best collaborations start with mutual recognition.
                                        </p>
                                        <p className="text-muted text-xs leading-relaxed border-t border-card-success pt-4">
                                            Your curiosity brought you here. Let's see where it leads.
                                        </p>
                                    </div>
                                </div>
                            }
                            className="h-[520px]"
                        />
                    </div>
                </section>

                {/* --- DECISION TERMINAL (FOOTER) --- */}
                <section id="apply" className="space-y-8 pt-20 pb-20">
                    <SectionHeader title="Ready to Connect" icon={Terminal} />

                    {/* Centered Decision Terminal */}
                    <div className="max-w-2xl mx-auto">
                        <DecisionTerminal onApply={() => setApplicationOpen(true)} />
                    </div>
                </section>

            </main>
        </div>
    );
}