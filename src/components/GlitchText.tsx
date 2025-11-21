/**
 * GlitchText Component
 * Text with chromatic aberration glitch effect on hover
 */

type GlitchTextProps = {
    text: string;
    className?: string;
};

export function GlitchText({ text, className = "" }: GlitchTextProps) {
    return (
        <span className={`relative inline-block group cursor-default ${className}`}>
            <span className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-red-500 opacity-0 group-hover:opacity-70 animate-pulse">
                {text}
            </span>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[1px] text-blue-500 opacity-0 group-hover:opacity-70 animate-pulse delay-75">
                {text}
            </span>
        </span>
    );
}
