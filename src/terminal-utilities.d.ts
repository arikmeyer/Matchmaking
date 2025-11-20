/**
 * Custom Tailwind v4 Utility Classes
 * Auto-generated type definitions for IDE autocomplete and type safety
 */

declare module 'react' {
  interface HTMLAttributes<T> {
    className?: string & {
      /** Terminal card with surface background, border, shadow */
      'terminal-card'?: never;
      /** Terminal border styling */
      'terminal-border'?: never;
      /** Flex container with centered items */
      'flex-center'?: never;
      /** Flex column with centered items */
      'flex-center-col'?: never;
      /** Monospace terminal text styling */
      'terminal-text'?: never;
      /** Animated glow effect */
      'terminal-glow'?: never;
      /** Interactive states (hover/focus) with color transitions */
      'terminal-interactive'?: never;
      /** Glass morphism effect with backdrop blur */
      'terminal-glass'?: never;
      /** Neon border with glow effect */
      'terminal-neon'?: never;
      /** Gradient background */
      'terminal-gradient-bg'?: never;
      /** Pulsing text with glow animation */
      'terminal-text-glow'?: never;
      /** Hover surface color transition */
      'terminal-surface-hover'?: never;
      /** Subtle accent color */
      'terminal-accent-subtle'?: never;
      /** Glowing border color */
      'terminal-border-glow'?: never;
      /** Terminal spacing */
      'terminal-spacing'?: never;
      /** Inline spacing (for i18n) */
      'terminal-spacing-inline'?: never;
      /** Block spacing */
      'terminal-spacing-block'?: never;
      /** Inline start border (for i18n) */
      'terminal-border-inline-start'?: never;
      /** Container query setup */
      'terminal-container'?: never;
      /** Responsive text with container queries */
      'terminal-responsive-text'?: never;
      /** Grid with auto-fit columns */
      'terminal-grid'?: never;
      /** Subgrid support */
      'terminal-subgrid'?: never;
      /** View transition name for content */
      'terminal-transition'?: never;
      /** View transition name for card */
      'terminal-transition-card'?: never;
      /** Scroll-driven fade-in animation */
      'terminal-scroll-fade'?: never;
      /** Scroll-driven slide-up animation */
      'terminal-scroll-slide'?: never;
      /** Parallax scroll effect */
      'terminal-parallax'?: never;
      /** Modern focus ring */
      'terminal-focus'?: never;
      /** Theme transition smoothing */
      'terminal-theme-transition'?: never;
      /** Anchor positioning (future) */
      'terminal-anchor'?: never;
      /** Primary text color (theme-aware) */
      'text-primary'?: never;
      /** Secondary text color (theme-aware) */
      'text-secondary'?: never;
      /** Muted text color (theme-aware) */
      'text-muted'?: never;
      /** Surface background (theme-aware) */
      'bg-surface'?: never;
      /** Dark surface background (theme-aware) */
      'bg-surface-dark'?: never;
      /** Default border color (theme-aware) */
      'border-default'?: never;
    };
  }
}

/**
 * Theme variants available
 */
export type TerminalTheme = 'default' | 'matrix' | 'cyberpunk' | 'light';

/**
 * CSS Custom Properties (Design Tokens)
 */
export interface TerminalDesignTokens {
  '--color-terminal-bg': string;
  '--color-terminal-surface': string;
  '--color-terminal-border': string;
  '--color-terminal-green': string;
  '--color-terminal-green-dark': string;
  '--color-terminal-green-glow': string;
  '--color-terminal-success': string;
  '--color-terminal-warning': string;
  '--color-terminal-error': string;
  '--ease-terminal': string;
  '--spacing-terminal': string;
  '--radius-terminal': string;
  '--radius-terminal-lg': string;
  '--terminal-glow-intensity': number;
  '--terminal-scan-speed': string;
  '--terminal-hue-rotate': string;
}

/**
 * Utility composition patterns
 */
export const TERMINAL_PATTERNS = {
  /** Interactive card with scroll animation */
  interactiveCard: 'terminal-card terminal-interactive terminal-scroll-fade' as const,
  /** Card with theme transition */
  themeCard: 'terminal-card terminal-theme-transition' as const,
  /** Glass card with neon border */
  glassNeon: 'terminal-glass terminal-neon' as const,
  /** Centered flex with gap */
  flexCenterGap: 'flex-center gap-4' as const,
  /** Column layout with animations */
  animatedColumn: 'flex-center-col terminal-scroll-slide' as const,
} as const;

export {};
