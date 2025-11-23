/**
 * TerminalGlowEffect Component
 *
 * Apple-inspired "Chromatic Depth Field" effect for terminal windows.
 * Creates an ambient energy field the terminal floats within.
 *
 * Architecture:
 * - Uses pure CSS animations via @property for flicker-free rendering
 * - No Framer Motion animations that could create stacking context issues
 * - Layer 0: Ambient Field (atmospheric presence, radial breathing)
 * - Layer 1: Primary Aurora (main color movement, multi-stop conic)
 * - Layer 2: Secondary Harmonic (iridescence, offset counter-rotation)
 * - Layer 3: Edge Accent (crisp dynamism, fast rotation with pulse)
 * - Fresnel Edge: Static inner glow at contact points
 *
 * Design principles:
 * - Prime number animation durations (13, 17, 23, 29s) = never repeats
 * - Layered blur depths create z-axis perception
 * - Color harmonics via OKLCH for perceptual uniformity
 * - Respects prefers-reduced-motion via CSS media query
 */

import { ReactNode } from 'react';

interface TerminalGlowEffectProps {
  children: ReactNode;
  /** Whether the glow effect is visible */
  isVisible?: boolean;
  /** Scale of the ambient field extension (multiplier) - reserved for future use */
  ambientScale?: number;
  /** Additional class names for the container */
  className?: string;
}

/**
 * Wraps children with an animated chromatic depth field effect.
 * Used for hero terminal and decision terminal.
 *
 * Uses pure CSS animations instead of Framer Motion to avoid
 * stacking context issues that cause z-index flickering.
 */
export function TerminalGlowEffect({
  children,
  isVisible = true,
  // ambientScale is reserved for future customization
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ambientScale = 1,
  className = '',
}: TerminalGlowEffectProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow Effects Container - CSS-only animation, no stacking context issues */}
      {/* Using visibility instead of opacity to avoid stacking context changes */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        {/* Main chromatic glow - animated via CSS @property */}
        <div className="chromatic-glow" />

        {/* Fresnel Edge Glow - Static highlight at contact points */}
        <div className="chromatic-glow-fresnel" />

        {/* Inner Edge Highlight - Subtle brightness at terminal border */}
        <div className="chromatic-glow-inner" />
      </div>

      {/* Content - Always on top with stable z-index */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default TerminalGlowEffect;
