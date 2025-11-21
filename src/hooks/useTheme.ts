/**
 * useTheme Hook
 * Manages theme and CRT mode state with React 19's useTransition for non-blocking updates
 */

import { useState, useCallback, useTransition, useEffect } from 'react';
import type { TerminalTheme } from '../types';

const THEME_STORAGE_KEY = 'switchup-theme';
const CRT_STORAGE_KEY = 'switchup-crt-mode';

export function useTheme() {
    // Initialize from localStorage or defaults
    const [currentTheme, setCurrentTheme] = useState<TerminalTheme>(() => {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        const validThemes: TerminalTheme[] = ['default', 'matrix', 'cyberpunk', 'light'];
        return (stored && validThemes.includes(stored as TerminalTheme))
            ? (stored as TerminalTheme)
            : 'default';
    });

    const [crtMode, setCrtMode] = useState(() => {
        const stored = localStorage.getItem(CRT_STORAGE_KEY);
        return stored === 'true';
    });

    const [isPending, startTransition] = useTransition();

    // Persist theme changes to localStorage
    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    }, [currentTheme]);

    useEffect(() => {
        localStorage.setItem(CRT_STORAGE_KEY, String(crtMode));
    }, [crtMode]);

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    // Non-blocking theme change with React 19's useTransition
    const changeTheme = useCallback((theme: TerminalTheme, crt: boolean) => {
        startTransition(() => {
            setCurrentTheme(theme);
            setCrtMode(crt);
        });
    }, []);

    // Toggle CRT mode independently
    const toggleCrtMode = useCallback(() => {
        startTransition(() => {
            setCrtMode(prev => !prev);
        });
    }, []);

    return {
        currentTheme,
        crtMode,
        isPending,
        changeTheme,
        toggleCrtMode
    };
}
