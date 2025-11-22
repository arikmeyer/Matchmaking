/**
 * FlipCard Component
 * A reusable card that flips on hover using Framer Motion 3D transforms
 */

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
    front: ReactNode;
    back: ReactNode;
    className?: string;
}

export function FlipCard({ front, back, className = '' }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`relative ${className}`}
            style={{ perspective: 1000 }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {front}
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    {back}
                </div>
            </motion.div>
        </div>
    );
}
