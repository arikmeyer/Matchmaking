/**
 * useTerminalLogs Hook
 * Manages system log simulation with React 19's useDeferredValue for non-blocking updates
 */

import { useState, useEffect, useDeferredValue, useCallback } from 'react';
import type { LogEntry } from '../types';
import { LOG_MESSAGES } from '../constants';

export function useTerminalLogs(autoStart = false) {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isRunning, setIsRunning] = useState(autoStart);

    // Defer log updates to prevent blocking the main thread
    const deferredLogs = useDeferredValue(logs);

    // Generate log entries from LOG_MESSAGES
    const generateLog = useCallback((): LogEntry => {
        const randomMessage = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        const now = new Date();

        return {
            id: `log-${Date.now()}-${Math.random()}`,
            timestamp: now.toLocaleTimeString('en-US', { hour12: false }),
            level: randomMessage.level,
            message: randomMessage.message
        };
    }, []);

    // Add a single log entry
    const addLog = useCallback(() => {
        const newLog = generateLog();
        setLogs(prev => [...prev.slice(-99), newLog]); // Keep last 100 logs
    }, [generateLog]);

    // Clear all logs
    const clearLogs = useCallback(() => {
        setLogs([]);
    }, []);

    // Start/stop log simulation
    const start = useCallback(() => {
        setIsRunning(true);
    }, []);

    const stop = useCallback(() => {
        setIsRunning(false);
    }, []);

    const toggle = useCallback(() => {
        setIsRunning(prev => !prev);
    }, []);

    // Auto-generate logs when running
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            addLog();
        }, Math.random() * 2000 + 500); // Random interval: 500ms - 2500ms

        return () => clearInterval(interval);
    }, [isRunning, addLog]);

    return {
        logs: deferredLogs, // Return deferred value for non-blocking rendering
        rawLogs: logs, // Also expose raw logs if needed for immediate updates
        isRunning,
        addLog,
        clearLogs,
        start,
        stop,
        toggle
    };
}
