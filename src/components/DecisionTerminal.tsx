/**
 * DecisionTerminal - Footer terminal for final CTA
 * Uses shared useTerminalCore hook for command logic.
 * Has unique features: scroll-triggered loading, phase indicator, apply progress bar.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { TerminalWindow, ContextAwareInput, ContextAwareClickArea } from './TerminalWindow';
import { TerminalOutput } from './TerminalOutput';
import { useTerminalCore, type TerminalLine } from '../hooks/useTerminalCore';

interface DecisionTerminalProps {
  onApply: () => void;
}

type Phase = 'idle' | 'loading' | 'ready' | 'processing';

// Session files that mirror the page sections
const SESSION_FILES = [
  'mission.md',
  'system-logs/',
  'problem-spaces/',
  'tech-stack/',
  'engineering-bets.md',
  'mutual-fit.yaml',
];

// Progress bar stages for apply animation
const APPLY_STAGES = [
  { progress: 1, label: 'Connecting...' },
  { progress: 4, label: 'Validating...' },
  { progress: 7, label: 'Preparing...' },
  { progress: 10, label: 'Ready.' },
];

// ASCII art for minimized state (defined at column 0 to avoid indentation issues)
const ROCKET_ASCII = `
     /\\
    /  \\
   |    |
   |    |
   | SU |
   |    |
  /|    |\\
 / |    | \\
/__|    |__\\
   |____|
   /  \\  \\
  / /\\ \\  \\
 /_/  \\_\\__\\
`.trim();

const ProgressBar = ({ stage }: { stage: number }) => {
  const filled = APPLY_STAGES[stage]?.progress || 0;
  const label = APPLY_STAGES[stage]?.label || '';
  const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
  return (
    <span className="text-terminal-green">
      [{bar}] <span className="text-muted">{label}</span>
    </span>
  );
};

// Phase indicator component for header
const PhaseIndicator = ({ phase }: { phase: Phase }) => {
  if (phase === 'idle') return null;

  if (phase === 'loading') {
    return (
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-section-focus text-xs font-mono"
      >
        LOADING
      </motion.span>
    );
  }

  if (phase === 'ready') {
    return <span className="text-terminal-green text-xs font-mono">READY</span>;
  }

  if (phase === 'processing') {
    return (
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-section-planning text-xs font-mono"
      >
        PROCESSING
      </motion.span>
    );
  }

  return null;
};

// Minimized content with ASCII art
const MinimizedContent = () => (
  <div className="h-[280px] flex flex-col items-center justify-center text-center space-y-4">
    <motion.pre
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-section-planning/80 text-[10px] leading-tight font-mono"
    >
      {ROCKET_ASCII}
    </motion.pre>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-1"
    >
      <div className="text-lg font-bold text-primary">
        Ready for liftoff?
      </div>
      <div className="text-secondary text-xs">
        Your next adventure is one command away.
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
      className="text-terminal-green font-mono text-xs"
    >
      <span className="text-muted">$</span> ./launch_journey_of_a_lifetime.sh
    </motion.div>
  </div>
);

export const DecisionTerminal: React.FC<DecisionTerminalProps> = ({ onApply }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track window state for glow effect visibility
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const [phase, setPhase] = useState<Phase>('idle');
  const [loadingFileIndex, setLoadingFileIndex] = useState(-1);
  const [applyStage, setApplyStage] = useState(-1);

  // Timer ref for nested setTimeout cleanup
  const innerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Line ID generator
  const lineId = useCallback(() => `line-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, []);

  // Ref to hold setLines - avoids circular dependency in customApplyHandler
  const setLinesRef = useRef<React.Dispatch<React.SetStateAction<TerminalLine[]>>>(() => { });
  const addLineRef = useRef<(content: string | React.ReactNode, type?: TerminalLine['type']) => void>(() => { });

  // Custom apply handler with progress bar animation
  const customApplyHandler = useCallback((addLineFn: (content: string | React.ReactNode, type: TerminalLine['type']) => void, lineIdFn: () => string) => {
    setPhase('processing');
    addLineFn('Initiating application sequence...', 'system');
    setTimeout(() => {
      setLinesRef.current(prev => [...prev, { id: lineIdFn(), content: <ProgressBar stage={0} />, type: 'progress' }]);
      setApplyStage(0);
    }, 200);
    return true; // Handled
  }, []);

  // Use unified terminal core hook
  const terminal = useTerminalCore({
    initialLines: [],
    enablePathCompletion: false,
    enableAdvancedShortcuts: false,
    onApply,
    onExit: () => {
      addLineRef.current('Understood.', 'output');
      addLineRef.current('', 'output');
      addLineRef.current('The terminal remains open.', 'output');
      addLineRef.current("Come back when you're ready.", 'output');
    },
    customApplyHandler,
    disabled: phase !== 'ready',
    isMinimized,
    isFullscreen,
    focusDelay: 100,
  });

  // Keep refs up to date
  setLinesRef.current = terminal.setLines;
  addLineRef.current = terminal.addLine;

  // Destructure stable functions for use in effects
  const { addLine, setLines } = terminal;

  // Cleanup inner timer on unmount
  useEffect(() => {
    return () => {
      if (innerTimerRef.current) {
        clearTimeout(innerTimerRef.current);
      }
    };
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Handle scroll trigger - start loading animation
  useEffect(() => {
    if (isInView && phase === 'idle') {
      if (prefersReducedMotion) {
        // Skip animation, show final state
        setLines([
          { id: lineId(), content: '> Session loaded', type: 'system' },
          { id: lineId(), content: '', type: 'output' },
          { id: lineId(), content: "Got feedback? Type 'feedback'", type: 'output' },
          { id: lineId(), content: "Ready to talk? Type 'apply'", type: 'output' },
        ]);
        setPhase('ready');
        return;
      }

      setPhase('loading');
      addLine('> Loading session context...', 'system');
      setLoadingFileIndex(0);
    }
  }, [isInView, phase, prefersReducedMotion, setLines, addLine, lineId]);

  // File loading animation sequence
  useEffect(() => {
    if (phase !== 'loading' || loadingFileIndex < 0) return;

    if (loadingFileIndex < SESSION_FILES.length) {
      const timer = setTimeout(() => {
        addLine(
          <span>
            <span className="text-terminal-green">✓</span>{' '}
            <span className="text-muted">{SESSION_FILES[loadingFileIndex]}</span>
          </span>,
          'success'
        );
        setLoadingFileIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // Files done, show completion and call-to-action
      const timer1 = setTimeout(() => {
        addLine('', 'output');
        addLine('Session loaded.', 'output');
      }, 400);

      const timer2 = setTimeout(() => {
        addLine('', 'output');
        addLine("Got feedback? Type 'feedback'", 'output');
      }, 800);

      const timer3 = setTimeout(() => {
        addLine("Ready to talk? Type 'apply'", 'output');
      }, 1000);

      const timer4 = setTimeout(() => {
        addLine('', 'output');
        setPhase('ready');
      }, 1400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [phase, loadingFileIndex, addLine]);

  // Apply command animation sequence
  useEffect(() => {
    if (applyStage < 0) return;

    if (applyStage < APPLY_STAGES.length) {
      const timer = setTimeout(() => {
        setLines(prev => {
          const newLines = [...prev];
          const lastLine = newLines[newLines.length - 1];
          if (lastLine && lastLine.type === 'progress') {
            lastLine.content = <ProgressBar stage={applyStage} />;
          }
          return newLines;
        });
        setApplyStage(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Animation complete, launch modal
      const timer = setTimeout(() => {
        addLine('Launching application interface...', 'system');
        innerTimerRef.current = setTimeout(() => {
          onApply();
          setPhase('ready');
          setApplyStage(-1);
        }, 400);
      }, 200);
      return () => {
        clearTimeout(timer);
        if (innerTimerRef.current) {
          clearTimeout(innerTimerRef.current);
        }
      };
    }
  }, [applyStage, setLines, addLine, onApply]);

  // Handle close button
  const handleClose = useCallback(() => {
    addLine('> exit', 'command');
    addLine('Understood.', 'output');
    addLine('', 'output');
    addLine('The terminal remains open.', 'output');
    addLine("Come back when you're ready.", 'output');
  }, [addLine]);

  const inputDisabled = phase !== 'ready';

  return (
    <div ref={containerRef} className="w-full">
      <TerminalWindow
        title="decision@switchup:~"
        height="320px"
        minimizedContent={<MinimizedContent />}
        onClose={handleClose}
        onMinimizedChange={setIsMinimized}
        onFullscreenChange={setIsFullscreen}
        exitDialogTitle="Exit without applying?"
        exitDialogDescription={
          <div className="text-secondary text-sm space-y-2">
            <p>You can always return to explore more.</p>
            <p className="text-muted text-xs italic">"The best time to plant a tree was 20 years ago. The second best time is now."</p>
          </div>
        }
        headerRightContent={<PhaseIndicator phase={phase} />}
      >
          {/* Terminal Content - click anywhere to focus input */}
          <ContextAwareClickArea
            getClickHandler={terminal.getClickToFocusHandler}
            disabled={inputDisabled}
            className="p-4 flex-1 min-h-0 flex flex-col cursor-text"
          >
            {/* Output Area */}
            <TerminalOutput
              lines={terminal.lines}
              scrollRef={terminal.scrollRef}
              animated
              spacing="tight"
            />

            {/* Input Area */}
            <form onSubmit={terminal.handleSubmit} className="mt-3 pt-3 border-t border-default">
              <div className={`flex items-center gap-2 ${inputDisabled ? 'opacity-50' : ''}`}>
                <span className="text-muted">switchup</span>
                <span className="text-muted"> {'>'}</span>
                <div className="flex-1 relative">
                  <ContextAwareInput
                    getInputRef={terminal.getInputRef}
                    type="text"
                    value={terminal.input}
                    onChange={(e) => terminal.setInput(e.target.value)}
                    onKeyDown={(e) => terminal.handleKeyDown(e, false)}
                    disabled={inputDisabled}
                    className="terminal-input w-full"
                    placeholder="Type a command or 'help'..."
                    aria-label="Terminal command input"
                  />
                </div>
              </div>
            </form>
          </ContextAwareClickArea>
      </TerminalWindow>
    </div>
  );
};

export default DecisionTerminal;
