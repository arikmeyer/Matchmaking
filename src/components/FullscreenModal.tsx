import { ReactNode } from 'react';
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
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-10 left-0 right-0 bottom-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                    onClick={(e) => {
                        if (closeOnBackdropClick && e.target === e.currentTarget) {
                            onClose();
                        }
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                        className={`w-full max-w-6xl max-h-[90vh] overflow-hidden relative ${contentClassName}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Background glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-blue-500/10 to-green-500/20 rounded-lg blur-xl opacity-50" />
                        <div className="relative bg-terminal-surface rounded-lg overflow-hidden border border-green-500/30">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
