/**
 * ErrorBoundary Component
 * Catches errors in child components and displays fallback UI
 * Protects lazy-loaded components from crashing the entire app
 */

import { Component, type ReactNode } from 'react';

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    error?: Error;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('Component Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="p-8 border border-red-500 bg-red-950/20 rounded">
                    <h2 className="text-section-problem font-mono text-xl font-bold mb-2">
                        Component Load Failed
                    </h2>
                    <p className="text-section-problem text-sm mt-2 font-mono">
                        {this.state.error?.message || 'Unknown error'}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-900/30 border border-red-500/50 text-section-problem rounded hover:bg-red-900/50 transition-colors text-sm font-mono"
                    >
                        RELOAD_SYSTEM
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
