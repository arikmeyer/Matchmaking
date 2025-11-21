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

    useEffect(() => {
        if (isOpen && step === 'INIT') {
            setLines([]);
            const initSequence = [
                "ESTABLISHING SECURE CONNECTION...",
                "HANDSHAKE COMPLETE.",
                "ACCESSING MATCHMAKING PROTOCOL v9.0...",
                "PLEASE IDENTIFY YOUR CORE FUNCTION:"
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
            setToken(`SWUP - ${Math.random().toString(36).substr(2, 9).toUpperCase()} `);
            setStep('COMPLETE');
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-surface-dark/95 backdrop-blur-md p-4 font-mono">
            <div className="w-full max-w-2xl bg-surface-dark border border-green-500/50 rounded-lg shadow-[0_0_50px_rgba(34,197,94,0.2)] overflow-hidden flex flex-col h-[60vh]">
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
                                className="text-left p-4 border border-default hover:border-green-500 hover:bg-green-500/10 transition-all group"
                            >
                                <span className="text-primary font-bold block mb-1 group-hover:text-green-400">[A] SYSTEM & DATA ARCHITECT</span>
                                <span className="text-muted text-xs">I like the idea of architecting provider- and market-agnostic data models and operationally scalable systems.</span>
                            </button>
                            <button
                                onClick={() => handleRoleSelect('PRODUCT_ENGINEER')}
                                className="text-left p-4 border border-default hover:border-green-500 hover:bg-green-500/10 transition-all group"
                            >
                                <span className="text-primary font-bold block mb-1 group-hover:text-green-400">[B] PRODUCT_ENGINEER</span>
                                <span className="text-muted text-xs">I like owning problem spaces end-to-end and building high-impact solutions.</span>
                            </button>
                        </div>
                    )}

                    {step === 'COMPLETE' && (
                        <div className="mt-8 p-6 border border-green-500/30 bg-green-500/5 rounded text-center space-y-6 animate-in zoom-in duration-300">
                            <div>
                                <div className="text-secondary text-xs mb-2">SESSION TOKEN GENERATED</div>
                                <div className="text-3xl md:text-4xl font-black text-primary tracking-widest select-all cursor-pointer hover:text-green-400 transition-colors">
                                    {token}
                                </div>
                            </div>
                            <div className="text-primary text-sm leading-relaxed">
                                <p className="mb-4">Access granted. To finalize your application:</p>
                                <ol className="text-left list-decimal list-inside space-y-2 text-secondary max-w-md mx-auto">
                                    <li>Email <a href={`mailto:future-colleagues@switchup.tech?subject=Application:${role}[${token}]`} className="text-primary underline hover:text-green-400">future-colleagues@switchup.tech</a></li>
                                    <li>Include your GitHub or LinkedIn.</li>
                                    <li>Share any thoughts or ideas you may have.</li>
                                </ol>
                            </div>
                            <button
                                onClick={() => window.location.href = `mailto:future-colleagues@switchup.tech?subject=Application:${role}[${token}]`}
                                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded transition-colors w-full"
                            >
                                OPEN_MAIL_CLIENT()
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
