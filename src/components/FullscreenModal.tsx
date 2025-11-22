import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export interface FullscreenModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    /** Additional class names for the modal content container */
    contentClassName?: string;
    /** Whether clicking the backdrop closes the modal */
    closeOnBackdropClick?: boolean;
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
}: FullscreenModalProps) {
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
                    {/* Glow effect - sized to match content */}
                    <div className="absolute inset-4 md:inset-8 bg-gradient-to-r from-terminal-green/20 via-surface/10 to-terminal-green/20 rounded-lg blur-xl opacity-50 pointer-events-none" />

                    {/* Content container - uses absolute positioning for guaranteed sizing */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                        className={`absolute inset-4 md:inset-8 flex flex-col bg-terminal-surface rounded-lg overflow-hidden border border-border ${contentClassName}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
