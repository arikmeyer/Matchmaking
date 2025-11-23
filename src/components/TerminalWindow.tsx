/**
 * TerminalWindow Component
 * Reusable terminal-style window with macOS traffic light controls.
 * Uses shared components for header, fullscreen modal, and exit dialog.
 */

import { ReactNode, useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalWindowHeader } from './TerminalWindowHeader';
import { FullscreenModal } from './FullscreenModal';
import { ExitConfirmDialog } from './ExitConfirmDialog';
import { TerminalGlowEffect } from './TerminalGlowEffect';

/**
 * Context to provide fullscreen state to children of TerminalWindow.
 * This allows nested components to know if they're being rendered in fullscreen mode,
 * which is essential for proper input ref management.
 */
export const TerminalWindowContext = createContext<{ isFullscreenMode: boolean }>({ isFullscreenMode: false });

/**
 * Hook to access the current fullscreen mode from TerminalWindow context.
 * Returns { isFullscreenMode: boolean }
 */
export const useTerminalWindowContext = () => useContext(TerminalWindowContext);

/**
 * Context-aware input wrapper that automatically uses the correct ref based on fullscreen mode.
 * Use this for inputs inside TerminalWindow children that need focus management.
 */
export interface ContextAwareInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    getInputRef: (isFullscreenMode: boolean) => React.RefObject<HTMLInputElement | null>;
}

export const ContextAwareInput: React.FC<ContextAwareInputProps> = ({ getInputRef, ...props }) => {
    const { isFullscreenMode } = useTerminalWindowContext();
    return <input ref={getInputRef(isFullscreenMode)} {...props} />;
};

/**
 * Context-aware click area wrapper that automatically uses the correct focus handler based on fullscreen mode.
 * Use this for click-to-focus areas inside TerminalWindow children.
 */
export interface ContextAwareClickAreaProps {
    getClickHandler: (isFullscreenMode: boolean) => () => void;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
}

export const ContextAwareClickArea: React.FC<ContextAwareClickAreaProps> = ({
    getClickHandler,
    disabled,
    className,
    children,
}) => {
    const { isFullscreenMode } = useTerminalWindowContext();
    return (
        <div className={className} onClick={() => !disabled && getClickHandler(isFullscreenMode)()}>
            {children}
        </div>
    );
};

export interface TerminalWindowProps {
    /** Window title displayed in header */
    title?: string;
    /** Content to render inside the window */
    children: ReactNode;
    /** Height of the content area (default: '400px') */
    height?: string;
    /** Content to show when minimized (if not provided, window just hides) */
    minimizedContent?: ReactNode;
    /** Callback when user confirms exit dialog (close always shows confirmation first) */
    onClose?: () => void;
    /** Callback when minimized state changes (for parent to sync effects like backgrounds) */
    onMinimizedChange?: (isMinimized: boolean) => void;
    /** Callback when fullscreen state changes (for parent to sync effects like backgrounds) */
    onFullscreenChange?: (isFullscreen: boolean) => void;
    /** Custom callback when fullscreen button is clicked (overrides default fullscreen behavior) */
    onFullscreenClick?: () => void;
    /** Controlled minimize state - when provided, parent controls minimize */
    isMinimizedControlled?: boolean;
    /** Custom callback when minimize button is clicked (overrides default minimize behavior) */
    onMinimizeClick?: () => void;
    /** Whether to show the close (red) button */
    showCloseButton?: boolean;
    /** Whether to show the minimize (amber) button */
    showMinimizeButton?: boolean;
    /** Whether to show the fullscreen (green) button */
    showFullscreenButton?: boolean;
    /** Custom exit dialog title */
    exitDialogTitle?: string;
    /** Custom exit dialog description */
    exitDialogDescription?: ReactNode;
    /** Additional class names for the window container */
    className?: string;
    /** Animation timing - delay before content hides on minimize */
    minimizeDelay?: number;
    /** Animation timing - delay before backgrounds restore */
    restoreDelay?: number;
    /** Custom content to display on the right side of the header (e.g., status indicators) */
    headerRightContent?: ReactNode;
    /** Whether to show the chromatic glow effect around the window (default: true) */
    showGlow?: boolean;
}

/**
 * Reusable terminal-style window with macOS traffic light controls.
 * Supports fullscreen, minimize, and close functionality.
 *
 * Usage:
 * ```tsx
 * <TerminalWindow
 *     title="tail -f /var/log/app.log"
 *     height="400px"
 *     minimizedContent={<MyMinimizedPlaceholder />}
 * >
 *     <MyContent />
 * </TerminalWindow>
 * ```
 */
export function TerminalWindow({
    title = 'terminal',
    children,
    height = '400px',
    minimizedContent,
    onClose,
    onMinimizedChange,
    onFullscreenChange,
    onFullscreenClick,
    isMinimizedControlled,
    onMinimizeClick,
    showCloseButton = true,
    showMinimizeButton = true,
    showFullscreenButton = true,
    exitDialogTitle = "Close this window?",
    exitDialogDescription,
    className = '',
    minimizeDelay = 250,
    restoreDelay = 750,
    headerRightContent,
    showGlow = true,
}: TerminalWindowProps) {
    // If custom fullscreen handler provided, don't use internal fullscreen state
    const useInternalFullscreen = !onFullscreenClick;
    // If controlled minimize state provided, use it; otherwise use internal state
    const useInternalMinimize = isMinimizedControlled === undefined;
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMinimizedInternal, setIsMinimizedInternal] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // Use controlled state if provided, otherwise internal
    const isMinimized = useInternalMinimize ? isMinimizedInternal : isMinimizedControlled;

    // Timer ref for cleanup on unmount
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Ref for tracking if window is in viewport (for keyboard shortcut scoping)
    const containerRef = useRef<HTMLDivElement>(null);
    const isInViewRef = useRef(true);

    // Glow visibility management for smooth transitions
    // Hide immediately, show only after window animation completes
    const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const wasHiddenRef = useRef(false);
    const [glowReady, setGlowReady] = useState(true);

    // Window is "visible" when not minimized and not in internal fullscreen
    const windowShouldBeVisible = !isMinimized && !(useInternalFullscreen && isFullscreen);

    useEffect(() => {
        // Clear any pending glow timer
        if (glowTimerRef.current) {
            clearTimeout(glowTimerRef.current);
            glowTimerRef.current = null;
        }

        if (windowShouldBeVisible) {
            if (wasHiddenRef.current) {
                // Coming back from hidden state - delay glow until animation completes
                // AnimatePresence mode="wait" means: exit animation (300ms) + enter animation (500ms) = 800ms total
                glowTimerRef.current = setTimeout(() => {
                    setGlowReady(true);
                    wasHiddenRef.current = false;
                }, 850); // 800ms animation + 50ms buffer
            }
            // If already visible (initial render), keep glow ready
        } else {
            // Going hidden - hide glow immediately
            setGlowReady(false);
            wasHiddenRef.current = true;
        }

        return () => {
            if (glowTimerRef.current) {
                clearTimeout(glowTimerRef.current);
            }
        };
    }, [windowShouldBeVisible]);

    // Cleanup timers on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            if (glowTimerRef.current) {
                clearTimeout(glowTimerRef.current);
            }
        };
    }, []);

    // Track if window is in viewport using Intersection Observer
    // This ensures keyboard shortcuts only affect the visible terminal
    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Consider "in view" if at least 20% visible
                    isInViewRef.current = entry.intersectionRatio > 0.2;
                });
            },
            { threshold: [0, 0.2, 0.5, 1] }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // Handle keyboard shortcuts for window control
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Escape: close fullscreen
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
                onFullscreenChange?.(false);
                return;
            }

            // Ctrl+Shift+F (Windows/Linux) or Cmd+Shift+F (Mac): cycle window state
            // Only respond if this window is in view OR is currently fullscreen
            if (e.key === 'f' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
                if (!isFullscreen && !isInViewRef.current) return;
                e.preventDefault();

                if (isMinimized) {
                    // Minimized → Normal: restore window
                    if (useInternalMinimize) {
                        setIsMinimizedInternal(false);
                        if (timerRef.current) clearTimeout(timerRef.current);
                        timerRef.current = setTimeout(() => onMinimizedChange?.(false), restoreDelay);
                    } else {
                        onMinimizeClick?.();
                    }
                } else if (isFullscreen) {
                    // Fullscreen → Minimized: minimize from fullscreen (inline logic)
                    if (onMinimizeClick) {
                        setIsFullscreen(false);
                        onFullscreenChange?.(false);
                        onMinimizeClick();
                    } else {
                        onMinimizedChange?.(true);
                        setIsMinimizedInternal(true);
                        setIsFullscreen(false);
                        onFullscreenChange?.(false);
                    }
                } else {
                    // Normal → Fullscreen: enter fullscreen (inline logic)
                    if (onFullscreenClick) {
                        onFullscreenClick();
                    } else {
                        setIsFullscreen(true);
                        onFullscreenChange?.(true);
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen, isMinimized, useInternalMinimize, onFullscreenChange, onMinimizedChange, onMinimizeClick, onFullscreenClick, restoreDelay]);

    // Handle minimize with animation sequencing
    const handleMinimizeToggle = useCallback(() => {
        // If custom handler provided, use it (like fullscreen pattern)
        if (onMinimizeClick) {
            onMinimizeClick();
            return;
        }
        // Clear any pending timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        // Otherwise use internal state
        if (!isMinimized) {
            onMinimizedChange?.(true);
            timerRef.current = setTimeout(() => setIsMinimizedInternal(true), minimizeDelay);
        } else {
            setIsMinimizedInternal(false);
            timerRef.current = setTimeout(() => onMinimizedChange?.(false), restoreDelay);
        }
    }, [isMinimized, onMinimizedChange, onMinimizeClick, minimizeDelay, restoreDelay]);

    // Handle close button - always show confirmation dialog for consistency
    const handleClose = useCallback(() => {
        setShowExitConfirm(true);
    }, []);

    // Handle fullscreen toggle
    const handleFullscreenToggle = useCallback(() => {
        if (onFullscreenClick) {
            onFullscreenClick();
        } else {
            const newState = !isFullscreen;
            setIsFullscreen(newState);
            onFullscreenChange?.(newState);
        }
    }, [onFullscreenClick, isFullscreen, onFullscreenChange]);

    // Handle minimize from fullscreen - DIRECT minimize (no intermediate normal window state)
    const handleMinimizeFromFullscreen = useCallback(() => {
        if (onMinimizeClick) {
            // If custom handler provided, let it handle everything
            setIsFullscreen(false);
            onFullscreenChange?.(false);
            onMinimizeClick();
        } else {
            // Internal state: immediately set minimized BEFORE closing fullscreen
            // This prevents the normal window from flashing during transition
            onMinimizedChange?.(true);
            setIsMinimizedInternal(true);  // No delay - immediate!
            setIsFullscreen(false);
            onFullscreenChange?.(false);
        }
    }, [onMinimizeClick, onMinimizedChange, onFullscreenChange]);

    // Window content wrapper - wraps children in context to provide fullscreen state
    const windowContent = (isFullscreenMode: boolean) => {
        // In fullscreen mode, use flex-1 to fill the modal's flex container
        // In normal mode, use the specified fixed height
        if (isFullscreenMode) {
            return (
                <TerminalWindowContext.Provider value={{ isFullscreenMode: true }}>
                    <TerminalWindowHeader
                        title={title}
                        isFullscreen={isFullscreenMode}
                        onClose={handleClose}
                        onMinimize={handleMinimizeFromFullscreen}
                        onFullscreenToggle={handleFullscreenToggle}
                        showCloseButton={showCloseButton}
                        showMinimizeButton={showMinimizeButton}
                        showFullscreenButton={showFullscreenButton}
                        rightContent={headerRightContent}
                    />
                    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                        {children}
                    </div>
                </TerminalWindowContext.Provider>
            );
        }

        return (
            <TerminalWindowContext.Provider value={{ isFullscreenMode: false }}>
                <TerminalWindowHeader
                    title={title}
                    isFullscreen={isFullscreenMode}
                    onClose={handleClose}
                    onMinimize={handleMinimizeToggle}
                    onFullscreenToggle={handleFullscreenToggle}
                    showCloseButton={showCloseButton}
                    showMinimizeButton={showMinimizeButton}
                    showFullscreenButton={showFullscreenButton}
                    rightContent={headerRightContent}
                />
                <div className="flex flex-col overflow-hidden" style={height === 'auto' ? undefined : { height }}>
                    {children}
                </div>
            </TerminalWindowContext.Provider>
        );
    };

    // Default minimized content
    const defaultMinimizedContent = (
        <div className="h-[200px] flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-4xl">📦</div>
            <div className="text-muted text-sm">Window minimized</div>
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-terminal-green font-mono text-sm"
            >
                <span className="text-muted">$</span> await window.restore()
            </motion.div>
        </div>
    );

    // Glow is visible when: showGlow enabled, window visible, AND glow animation ready
    // glowReady is delayed when transitioning from hidden to visible
    const glowVisible = showGlow && windowShouldBeVisible && glowReady;

    return (
        <div ref={containerRef}>
        <TerminalGlowEffect isVisible={glowVisible} className={className}>
            {/* Main window or minimized state */}
            <AnimatePresence mode="wait" initial={false}>
                {isMinimized ? (
                    <motion.div
                        key="minimized"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="font-mono text-sm cursor-pointer"
                        onClick={handleMinimizeToggle}
                    >
                        {minimizedContent || defaultMinimizedContent}
                    </motion.div>
                ) : (
                    <motion.div
                        key="window"
                        initial={{ opacity: 0, scaleX: 0.2, scaleY: 0.05, y: 300 }}
                        animate={{
                            opacity: useInternalFullscreen && isFullscreen ? 0 : 1,
                            scaleX: useInternalFullscreen && isFullscreen ? 1.02 : 1,
                            scaleY: useInternalFullscreen && isFullscreen ? 1.02 : 1,
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
                        className={`terminal-card font-mono text-xs md:text-sm ${useInternalFullscreen && isFullscreen ? 'pointer-events-none' : ''}`}
                    >
                        {windowContent(false)}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fullscreen modal - using shared component */}
            {useInternalFullscreen && (
                <FullscreenModal
                    isOpen={isFullscreen}
                    onClose={() => setIsFullscreen(false)}
                >
                    {windowContent(true)}
                </FullscreenModal>
            )}

            {/* Exit confirmation dialog - using shared component */}
            <ExitConfirmDialog
                isOpen={showExitConfirm}
                onCancel={() => setShowExitConfirm(false)}
                onConfirm={() => {
                    setShowExitConfirm(false);
                    onClose?.();
                }}
                title={exitDialogTitle}
                description={exitDialogDescription}
            />
        </TerminalGlowEffect>
        </div>
    );
}
