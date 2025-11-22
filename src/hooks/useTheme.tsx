/**
 * useTheme Hook + ThemeProvider
 * Manages theme and CRT mode state with React 19's useTransition for non-blocking updates.
 * Uses React Context so all components share the same theme state.
 */

import { useState, useCallback, useTransition, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { TerminalTheme } from '../types';

const THEME_STORAGE_KEY = 'switchup-theme';
const CRT_STORAGE_KEY = 'switchup-crt-mode';

interface ThemeContextValue {
    currentTheme: TerminalTheme;
    crtMode: boolean;
    isPending: boolean;
    changeTheme: (theme: TerminalTheme, crt: boolean) => void;
    toggleCrtMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * ThemeProvider - Wrap your app with this to enable useTheme() everywhere
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
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

    return (
        <ThemeContext.Provider value={{ currentTheme, crtMode, isPending, changeTheme, toggleCrtMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * useTheme - Access shared theme state from anywhere in the app
 */
export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
