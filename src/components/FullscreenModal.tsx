import { ReactNode, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalGlowEffect } from './TerminalGlowEffect';

export interface FullscreenModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    /** Additional class names for the modal content container */
    contentClassName?: string;
    /** Whether clicking the backdrop closes the modal */
    closeOnBackdropClick?: boolean;
    /** Whether to show the chromatic glow effect (default: true) */
    showGlow?: boolean;
}

/**
 * Reusable fullscreen modal overlay for terminal windows.
 * Positioned below the navbar (top-10) and centers content.
 *
 * Usage:
 * ```tsx
 * <FullscreenModal isOpen={isFullscreen} onClose={() => setIsFullscreen(false)}>
 *     <YourContent />
 * </FullscreenModal>
 * ```
 */
export function FullscreenModal({
    isOpen,
    onClose,
    children,
    contentClassName = '',
    closeOnBackdropClick = true,
    showGlow = true,
}: FullscreenModalProps) {
    // Delayed glow visibility for smooth entry animation
    const [glowReady, setGlowReady] = useState(false);
    const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (glowTimerRef.current) {
            clearTimeout(glowTimerRef.current);
            glowTimerRef.current = null;
        }

        if (isOpen) {
            // Delay glow until entry animation completes
            // Spring animation with stiffness:300, damping:30 takes ~400ms to settle
            glowTimerRef.current = setTimeout(() => {
                setGlowReady(true);
            }, 450); // Spring animation (~400ms) + 50ms buffer
        } else {
            // Reset when modal closes
            setGlowReady(false);
        }

        return () => {
            if (glowTimerRef.current) {
                clearTimeout(glowTimerRef.current);
            }
        };
    }, [isOpen]);

    // Use Portal to render at document body level, avoiding transform ancestor issues
    // (position: fixed is relative to transformed ancestors, not viewport)
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-10 left-0 right-0 bottom-0 z-[100] bg-overlay-heavy backdrop-blur-md"
                    onClick={(e) => {
                        if (closeOnBackdropClick && e.target === e.currentTarget) {
                            onClose();
                        }
                    }}
                >
                    {/* Content container with glow effect */}
                    <div className="absolute inset-4 md:inset-8">
                        <TerminalGlowEffect isVisible={showGlow && glowReady} className="h-full">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                                className={`h-full flex flex-col bg-terminal-surface rounded-lg overflow-hidden border border-border ${contentClassName}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {children}
                            </motion.div>
                        </TerminalGlowEffect>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
