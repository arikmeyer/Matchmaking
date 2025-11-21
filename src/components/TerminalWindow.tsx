/**
 * TerminalWindow Component
 * Reusable terminal-style window with macOS traffic light controls.
 * Uses shared components for header, fullscreen modal, and exit dialog.
 */

import { ReactNode, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalWindowHeader } from './TerminalWindowHeader';
import { FullscreenModal } from './FullscreenModal';
import { ExitConfirmDialog } from './ExitConfirmDialog';

export interface TerminalWindowProps {
    /** Window title displayed in header */
    title?: string;
    /** Content to render inside the window */
    children: ReactNode;
    /** Height of the content area (default: '400px') */
    height?: string;
    /** Height when in fullscreen mode (default: 'calc(100vh-120px)') */
    fullscreenHeight?: string;
    /** Content to show when minimized (if not provided, window just hides) */
    minimizedContent?: ReactNode;
    /** Callback when close button is clicked (if not provided, shows exit dialog) */
    onClose?: () => void;
    /** Callback when minimized state changes (for parent to sync effects like backgrounds) */
    onMinimizedChange?: (isMinimized: boolean) => void;
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
    fullscreenHeight = 'calc(100vh-120px)',
    minimizedContent,
    onClose,
    onMinimizedChange,
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

    // Handle minimize with animation sequencing
    const handleMinimizeToggle = useCallback(() => {
        // If custom handler provided, use it (like fullscreen pattern)
        if (onMinimizeClick) {
            onMinimizeClick();
            return;
        }
        // Otherwise use internal state
        if (!isMinimized) {
            onMinimizedChange?.(true);
            setTimeout(() => setIsMinimizedInternal(true), minimizeDelay);
        } else {
            setIsMinimizedInternal(false);
            setTimeout(() => onMinimizedChange?.(false), restoreDelay);
        }
    }, [isMinimized, onMinimizedChange, onMinimizeClick, minimizeDelay, restoreDelay]);

    // Handle close button
    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        } else {
            setShowExitConfirm(true);
        }
    }, [onClose]);

    // Handle fullscreen toggle
    const handleFullscreenToggle = useCallback(() => {
        if (onFullscreenClick) {
            onFullscreenClick();
        } else {
            setIsFullscreen(!isFullscreen);
        }
    }, [onFullscreenClick, isFullscreen]);

    // Handle minimize from fullscreen
    const handleMinimizeFromFullscreen = useCallback(() => {
        setIsFullscreen(false);
        handleMinimizeToggle();
    }, [handleMinimizeToggle]);

    // Window content wrapper
    const windowContent = (isFullscreenMode: boolean) => {
        const contentHeight = isFullscreenMode ? fullscreenHeight : height;
        return (
            <>
                <TerminalWindowHeader
                    title={title}
                    isFullscreen={isFullscreenMode}
                    onClose={handleClose}
                    onMinimize={isFullscreenMode ? handleMinimizeFromFullscreen : handleMinimizeToggle}
                    onFullscreenToggle={handleFullscreenToggle}
                    showCloseButton={showCloseButton}
                    showMinimizeButton={showMinimizeButton}
                    showFullscreenButton={showFullscreenButton}
                />
                <div style={contentHeight === 'auto' ? undefined : { height: contentHeight }}>
                    {children}
                </div>
            </>
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
                className="text-green-500 font-mono text-sm"
            >
                <span className="text-muted">$</span> await window.restore()
            </motion.div>
        </div>
    );

    return (
        <div className={`relative ${className}`}>
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
        </div>
    );
}
