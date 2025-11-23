import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

export interface ExitConfirmDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    /** Custom title (default: "Are you sure you want to log off the Subscription OS?") */
    title?: string;
    /** Custom description content */
    description?: ReactNode;
    /** Custom cancel button text */
    cancelText?: string;
    /** Custom confirm button text */
    confirmText?: string;
}

/**
 * Reusable exit confirmation dialog with terminal styling.
 * Shows a humorous warning message before triggering exit/shutdown.
 *
 * Usage:
 * ```tsx
 * <ExitConfirmDialog
 *     isOpen={showExitConfirm}
 *     onCancel={() => setShowExitConfirm(false)}
 *     onConfirm={handleShutdown}
 * />
 * ```
 */
export function ExitConfirmDialog({
    isOpen,
    onCancel,
    onConfirm,
    title = "Are you sure you want to log off the Subscription OS?",
    description,
    cancelText = "Cancel (phew!)",
    confirmText = "Yes, shut it down",
}: ExitConfirmDialogProps) {
    const defaultDescription = (
        <div className="text-secondary text-sm space-y-2">
            <p>This will terminate all running processes including:</p>
            <ul className="text-muted text-xs space-y-1 pl-4">
                <li>• 247 active Windmill flows</li>
                <li>• 3 AI agents mid-negotiation with legacy systems</li>
                <li>• 1 fax machine (yes, really)</li>
                <li>• Your hopes of ever escaping this terminal</li>
            </ul>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-overlay backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="terminal-card max-w-md w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="warning-header px-4 py-2 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-section-problem" />
                            <span className="text-section-problem font-bold text-sm">SYSTEM WARNING</span>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <div className="text-primary text-lg font-bold">
                                {title}
                            </div>

                            {description || defaultDescription}

                            <div className="text-section-focus text-xs italic">
                                "With great power comes great responsibility to not click red buttons."
                                <br /> – A wise developer, probably
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={onCancel}
                                    className="flex-1 px-4 py-2 border border-default text-secondary hover:border-border-hover hover:text-primary transition-colors text-sm"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 px-4 py-2 bg-red-500/20 border border-red-500/50 text-section-problem hover:bg-red-500/30 transition-colors text-sm"
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
