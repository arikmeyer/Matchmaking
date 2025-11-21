import { Maximize2, Minimize2 } from 'lucide-react';

export interface TerminalWindowHeaderProps {
    title?: string;
    isFullscreen?: boolean;
    onClose?: () => void;
    onMinimize?: () => void;
    onFullscreenToggle?: () => void;
    showCloseButton?: boolean;
    showMinimizeButton?: boolean;
    showFullscreenButton?: boolean;
}

/**
 * Reusable macOS-style window header with traffic light buttons.
 * Can be used for any terminal-style window component.
 */
export function TerminalWindowHeader({
    title = 'zsh - future@switchup.tech',
    isFullscreen = false,
    onClose,
    onMinimize,
    onFullscreenToggle,
    showCloseButton = true,
    showMinimizeButton = true,
    showFullscreenButton = true,
}: TerminalWindowHeaderProps) {
    return (
        <div className="bg-surface px-4 py-2 border-b border-default flex-center justify-between">
            <div className="flex gap-2">
                {/* Red - Close */}
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50 hover:bg-red-500/40 transition-colors cursor-pointer"
                        title="Close"
                    />
                )}

                {/* Amber - Minimize */}
                {showMinimizeButton && (
                    <button
                        onClick={onMinimize}
                        className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/40 transition-colors cursor-pointer"
                        title="Minimize"
                    />
                )}

                {/* Green - Fullscreen */}
                {showFullscreenButton && (
                    <button
                        onClick={onFullscreenToggle}
                        className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 hover:bg-green-500/40 transition-colors cursor-pointer group relative"
                        title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    >
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {isFullscreen ? (
                                <Minimize2 size={6} className="text-green-500" />
                            ) : (
                                <Maximize2 size={6} className="text-green-500" />
                            )}
                        </span>
                    </button>
                )}
            </div>
            <div className="flex items-center gap-3">
                <span className="text-muted text-xs">{title}</span>
            </div>
        </div>
    );
}
