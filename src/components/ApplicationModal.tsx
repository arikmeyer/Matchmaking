/**
 * ApplicationModal Component
 * Modal for job application with role selection and token generation
 */

import { useState, useEffect } from 'react';
import { Lock, X } from 'lucide-react';

type ApplicationModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
    const [step, setStep] = useState<'INIT' | 'ROLE_SELECT' | 'GENERATING' | 'COMPLETE'>('INIT');
    const [role, setRole] = useState<string | null>(null);
    const [lines, setLines] = useState<string[]>([]);
    const [token, setToken] = useState('');

    // Build mailto URL with proper RFC 2368 encoding
    // Spaces must be %20, not raw spaces or + signs
    const mailtoUrl = token && role
        ? `mailto:future-colleagues@switchup.tech?subject=${encodeURIComponent(`Application - ${role} - ${token}`)}`
        : '';

    useEffect(() => {
        if (isOpen && step === 'INIT') {
            setLines([]);
            const initSequence = [
                "ESTABLISHING SECURE CONNECTION...",
                "HANDSHAKE COMPLETE.",
                "ACCESSING MATCHMAKING PROTOCOL v7.0...",
                "PLEASE IDENTIFY YOUR CORE ROLE:"
            ];
            let delay = 0;
            initSequence.forEach((line, i) => {
                delay += 400;
                setTimeout(() => {
                    setLines(prev => [...prev, line]);
                    if (i === initSequence.length - 1) setStep('ROLE_SELECT');
                }, delay);
            });
        }
    }, [isOpen, step]);

    const handleRoleSelect = (selectedRole: string) => {
        setRole(selectedRole);
        setStep('GENERATING');
        setLines(prev => [...prev, `> SELECTED ROLE: ${selectedRole} `, "GENERATING UNIQUE SESSION TOKEN...", "ENCRYPTING PAYLOAD..."]);

        setTimeout(() => {
            setToken(`SWUP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
            setStep('COMPLETE');
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-surface-dark/95 backdrop-blur-md p-4 font-mono">
            <div className="w-full max-w-2xl bg-surface-dark border border-border rounded-lg shadow-lg overflow-hidden flex flex-col h-[60vh]">
                <div className="bg-surface px-4 py-2 border-b border-default flex-center justify-between">
                    <span className="text-xs text-green-500 flex items-center gap-2 animate-pulse">
                        <Lock size={12} />
                        SECURE_CHANNEL_ESTABLISHED
                    </span>
                    <button onClick={onClose} className="text-muted hover:text-primary">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-8 flex-1 overflow-y-auto space-y-4 text-sm md:text-base">
                    {lines.map((line, i) => (
                        <div key={i} className="text-green-500">{`> ${line} `}</div>
                    ))}

                    {step === 'ROLE_SELECT' && (
                        <div className="grid gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <button
                                onClick={() => handleRoleSelect('SYSTEM_ARCHITECT')}
                                className="text-left p-4 border border-default hover:border-border-hover hover:bg-surface transition-all group"
                            >
                                <span className="text-primary font-bold block mb-1 group-hover:text-terminal-green">[A] SYSTEM & DATA ARCHITECT</span>
                                <span className="text-muted text-xs">I like the idea of architecting provider- and market-agnostic data models and operationally scalable systems.</span>
                            </button>
                            <button
                                onClick={() => handleRoleSelect('PRODUCT_ENGINEER')}
                                className="text-left p-4 border border-default hover:border-border-hover hover:bg-surface transition-all group"
                            >
                                <span className="text-primary font-bold block mb-1 group-hover:text-terminal-green">[B] PRODUCT_ENGINEER</span>
                                <span className="text-muted text-xs">I like owning problem spaces end-to-end and building high-impact solutions.</span>
                            </button>
                        </div>
                    )}

                    {step === 'COMPLETE' && (
                        <div className="mt-8 p-6 border border-border bg-nested rounded text-center space-y-6 animate-in zoom-in duration-300">
                            <div>
                                <div className="text-secondary text-xs mb-2">SESSION TOKEN GENERATED</div>
                                <div className="text-3xl md:text-4xl font-black text-primary tracking-widest select-all cursor-pointer hover:text-terminal-green transition-colors">
                                    {token}
                                </div>
                            </div>
                            <div className="text-primary text-sm leading-relaxed">
                                <p className="mb-4">Access granted. To finalize your application:</p>
                                <ol className="text-left list-decimal list-inside space-y-2 text-secondary max-w-md mx-auto">
                                    <li>Email <a href={mailtoUrl} className="text-primary underline hover:text-terminal-green">future-colleagues@switchup.tech</a></li>
                                    <li>Include your GitHub or LinkedIn.</li>
                                    <li>Share any thoughts or ideas you may have.</li>
                                </ol>
                            </div>
                            <a
                                href={mailtoUrl}
                                className="block px-6 py-3 bg-terminal-green hover:brightness-110 text-black font-bold rounded transition-colors w-full text-center"
                            >
                                OPEN_MAIL_CLIENT()
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
