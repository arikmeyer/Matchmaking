import { useState, useEffect, useCallback, useRef } from 'react';

export interface WindowControlsOptions {
    /** Callback when minimize state changes (for parent to sync background effects) */
    onMinimizedChange?: (isMinimized: boolean) => void;
    /** Callback when close/exit is confirmed */
    onExit?: () => void;
    /** Animation timing - delay before terminal shrinks (allows backgrounds to fade first) */
    minimizeDelay?: number;
    /** Animation timing - delay before backgrounds fade in (allows terminal to expand first) */
    restoreDelay?: number;
}

export interface WindowControlsState {
    isFullscreen: boolean;
    isMinimized: boolean;
    showExitConfirm: boolean;
}

export interface WindowControlsActions {
    setFullscreen: (value: boolean) => void;
    toggleFullscreen: () => void;
    handleMinimizeToggle: () => void;
    showExitDialog: () => void;
    hideExitDialog: () => void;
    confirmExit: () => void;
}

/**
 * Hook for managing terminal window controls (fullscreen, minimize, exit).
 * Handles animation sequencing for smooth minimize/restore transitions.
 *
 * Usage:
 * ```tsx
 * const { state, actions } = useWindowControls({
 *     onMinimizedChange: setTerminalMinimized,
 *     onExit: handleShutdown,
 * });
 * ```
 */
export function useWindowControls(options: WindowControlsOptions = {}): {
    state: WindowControlsState;
    actions: WindowControlsActions;
} {
    const {
        onMinimizedChange,
        onExit,
        minimizeDelay = 250,
        restoreDelay = 750,
    } = options;

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // Timer ref for cleanup on unmount
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
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

    // Handle minimize with proper animation sequencing
    // Minimize: backgrounds fade → terminal shrinks → placeholder appears
    // Restore: placeholder fades → terminal expands → backgrounds fade in
    const handleMinimizeToggle = useCallback(() => {
        // Clear any pending timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (!isMinimized) {
            // MINIMIZING: Fade backgrounds first, then trigger terminal shrink
            onMinimizedChange?.(true);
            timerRef.current = setTimeout(() => setIsMinimized(true), minimizeDelay);
        } else {
            // RESTORING: Expand terminal first, then fade in backgrounds
            setIsMinimized(false);
            timerRef.current = setTimeout(() => onMinimizedChange?.(false), restoreDelay);
        }
    }, [isMinimized, onMinimizedChange, minimizeDelay, restoreDelay]);

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen(prev => !prev);
    }, []);

    const showExitDialog = useCallback(() => {
        setShowExitConfirm(true);
    }, []);

    const hideExitDialog = useCallback(() => {
        setShowExitConfirm(false);
    }, []);

    const confirmExit = useCallback(() => {
        setShowExitConfirm(false);
        onExit?.();
    }, [onExit]);

    return {
        state: {
            isFullscreen,
            isMinimized,
            showExitConfirm,
        },
        actions: {
            setFullscreen: setIsFullscreen,
            toggleFullscreen,
            handleMinimizeToggle,
            showExitDialog,
            hideExitDialog,
            confirmExit,
        },
    };
}
