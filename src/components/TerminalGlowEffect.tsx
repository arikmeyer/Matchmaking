/**
 * TerminalGlowEffect Component
 * Reusable glowing frame effect for terminal windows.
 * Features ambient nebula + rotating conic gradients.
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TerminalGlowEffectProps {
  children: ReactNode;
  /** Whether the glow effect is visible */
  isVisible?: boolean;
  /** Scale of the ambient nebula (-inset value) */
  nebulaInset?: number;
  /** Additional class names for the container */
  className?: string;
}

/**
 * Wraps children with an animated glowing frame effect.
 * Used for hero terminal and decision terminal.
 *
 * The effect consists of:
 * 1. Deep ambient nebula (breathing animation)
 * 2. Rotating green conic gradient vortex
 * 3. Counter-rotating subtle conic gradient vortex
 */
export function TerminalGlowEffect({
  children,
  isVisible = true,
  nebulaInset = 12,
  className = '',
}: TerminalGlowEffectProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow Effects Container */}
      <motion.div
        initial={false}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none"
      >
        {/* 1. Deep Ambient Nebula (Breathing) */}
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-[40px] blur-3xl bg-gradient-to-tr from-terminal-green/20 via-surface/20 to-terminal-green/20"
          style={{ inset: `-${nebulaInset * 4}px` }}
        />

        {/* 2. Rotating Energy Vortex (Green) */}
        <div className="absolute -inset-[2px] rounded-lg overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent,transparent,var(--terminal-green),transparent,transparent)] opacity-30 blur-sm"
          />
        </div>

        {/* 3. Counter-Rotating Vortex (Subtle) */}
        <div className="absolute -inset-[2px] rounded-lg overflow-hidden">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent,transparent,var(--color-surface-dark),transparent,transparent)] opacity-20 blur-sm"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

export default TerminalGlowEffect;
