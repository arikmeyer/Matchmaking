/**
 * useShutdown Hook
 * Manages shutdown animation and system state with smooth transitions
 */

import { useState, useCallback, useEffect, useRef } from 'react';

export type ShutdownPhase = 'idle' | 'initiating' | 'shutting-down' | 'complete';

export function useShutdown(onComplete?: () => void) {
    const [phase, setPhase] = useState<ShutdownPhase>('idle');
    const [progress, setProgress] = useState(0);

    // Store callback in ref to avoid effect re-runs when callback reference changes
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Initiate shutdown sequence
    const initiate = useCallback(() => {
        setPhase('initiating');
    }, []);

    // Cancel shutdown
    const cancel = useCallback(() => {
        setPhase('idle');
        setProgress(0);
    }, []);

    // Force immediate shutdown
    const forceShutdown = useCallback(() => {
        setPhase('shutting-down');
    }, []);

    // Shutdown animation sequence
    useEffect(() => {
        if (phase !== 'shutting-down') return;

        let currentProgress = 0;
        let completionTimer: ReturnType<typeof setTimeout> | null = null;

        const interval = setInterval(() => {
            currentProgress += 5;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setPhase('complete');

                // Call completion callback after a brief delay
                completionTimer = setTimeout(() => {
                    onCompleteRef.current?.();
                }, 500);
            }
        }, 50); // Update every 50ms for smooth progress

        return () => {
            clearInterval(interval);
            if (completionTimer) clearTimeout(completionTimer);
        };
    }, [phase]); // Only depend on phase - callback is accessed via ref

    // Auto-start shutdown after initiation delay
    useEffect(() => {
        if (phase !== 'initiating') return;

        const timer = setTimeout(() => {
            setPhase('shutting-down');
        }, 1000); // 1 second delay before actual shutdown

        return () => clearTimeout(timer);
    }, [phase]);

    return {
        phase,
        progress,
        isActive: phase !== 'idle',
        isComplete: phase === 'complete',
        initiate,
        cancel,
        forceShutdown
    };
}
