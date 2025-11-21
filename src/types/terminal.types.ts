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
 * Tech stack item displayed in the tech stack section
 */
export type StackItem = {
    category: string;
    tool: string;
    rationale: string;
    specs: string[];
    status: 'CORE' | 'EXPLORING';
    icon: ElementType;
};

/**
 * Engineering bet for the engineering bets section
 */
export type EngineeringBet = {
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

/**
 * Behind the Scenes video entry
 * Supports multiple videos from different team members
 */
export type BehindTheScenesVideo = {
    id: string;
    vimeoId: string;
    title: string;
    description: string;
    author: {
        name: string;
        role: string;
        avatarInitials: string;
    };
    topics: string[];
    duration: string;
    featured?: boolean;
};
