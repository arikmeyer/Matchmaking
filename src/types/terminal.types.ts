/**
 * Terminal Types
 * Centralized type definitions for the terminal application
 */

import type { ElementType, ReactNode } from 'react';

/**
 * Theme variants available
 */
export type TerminalTheme = 'default' | 'matrix' | 'cyberpunk' | 'light';

/**
 * Log entry in the system logs
 */
export type LogEntry = {
    id: string;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS' | 'SYSTEM';
    message: string;
};

/**
 * Tech stack item displayed in the architecture section
 */
export type StackItem = {
    category: string;
    tool: string;
    rationale: string;
    specs: string[];
    status: 'ONLINE' | 'SCALING' | 'OPTIMIZED';
    icon: ElementType;
};

/**
 * Engineering decision for the decision log
 */
export type Decision = {
    id: string;
    title: string;
    context: string;
    tradeoff: string;
};

/**
 * Terminal history line
 */
export type TerminalLine = {
    type: 'input' | 'output' | 'system';
    content: ReactNode;
};

/**
 * Quiz question structure
 */
export type QuizQuestion = {
    q: string;
    a: string;
    b: string;
    correct: 'a' | 'b';
    feedback_pass: string;
    feedback_fail: string;
};
