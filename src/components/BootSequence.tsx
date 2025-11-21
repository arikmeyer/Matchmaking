/**
 * BootSequence Component
 * Animated terminal boot screen with password authentication
 */

import { useState, useEffect } from 'react';

type BootSequenceProps = {
    onComplete: () => void;
};

export function BootSequence({ onComplete }: BootSequenceProps) {
    const [lines, setLines] = useState<string[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const bootText = [
        "INITIALIZING SWITCHUP_KERNEL...",
        "LOADING MODULES: [AI_AGENT, WORKFLOW_ENGINE, DOM_PARSER]",
        "CONNECTING TO NEON_DB [MAIN BRANCH]... SUCCESS",
        "VERIFYING USER_AGENTS... OK",
        "CHECKING SYSTEM INTEGRITY... 100%",
        "MOUNTING VIRTUAL FILESYSTEM...",
        "STARTING INTERFACE SERVICE...",
        "WELCOME, ARCHITECT OF THE FUTURE."
    ];

    useEffect(() => {
        const timeouts: ReturnType<typeof setTimeout>[] = [];
        let delay = 0;

        bootText.forEach((line, index) => {
            delay += Math.random() * 300 + 100;
            const id = setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (index === bootText.length - 1) {
                    // Show password prompt after welcome message
                    setTimeout(() => setShowPassword(true), 800);
                }
            }, delay);
            timeouts.push(id);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'SwitchMeUp') {
            setLines(prev => [...prev, `[PASSWORD] ${'*'.repeat(password.length)}`, 'ACCESS GRANTED.']);
            setTimeout(onComplete, 600);
        } else {
            setError(true);
            setPassword('');
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="fixed inset-0 bg-surface-dark z-[100] font-mono text-green-500 p-8 text-sm md:text-base overflow-hidden flex flex-col justify-end pb-20">
            {lines.map((line, i) => (
                <div key={i} className="mb-1">{`> ${line} `}</div>
            ))}

            {showPassword && (
                <form onSubmit={handlePasswordSubmit} className="mt-4">
                    <div className="mb-2">
                        <span className="text-amber-500">&gt; AUTHENTICATION REQUIRED</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={error ? 'text-red-500' : ''}>PASSWORD:</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border-none outline-none text-green-500 flex-1 placeholder:text-green-900"
                            placeholder="Enter access code..."
                            autoFocus
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 mt-2 animate-pulse">
                            &gt; ACCESS DENIED. TRY AGAIN.
                        </div>
                    )}
                </form>
            )}

            {!showPassword && <div className="animate-pulse mt-2">_</div>}
        </div>
    );
}
