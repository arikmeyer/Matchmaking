import { useRef, useEffect, useCallback } from 'react';

export interface UseTerminalFocusOptions {
  /** Whether the terminal is minimized */
  isMinimized: boolean;
  /** Whether the terminal is in fullscreen mode */
  isFullscreen: boolean;
  /** Whether focusing is currently disabled (e.g., during loading) */
  disabled?: boolean;
  /** Delay before focusing after state change (default: 350ms to account for exit animations) */
  focusDelay?: number;
}

export interface UseTerminalFocusReturn {
  /** Ref for the normal (non-fullscreen) input */
  normalInputRef: React.RefObject<HTMLInputElement | null>;
  /** Ref for the fullscreen input */
  fullscreenInputRef: React.RefObject<HTMLInputElement | null>;
  /** Helper to get the correct ref based on fullscreen mode */
  getInputRef: (isFullscreenMode: boolean) => React.RefObject<HTMLInputElement | null>;
  /** Focus the appropriate input based on current mode */
  focusInput: (options?: { preventScroll?: boolean }) => void;
  /** Get click handler that focuses the appropriate input */
  getClickToFocusHandler: (isFullscreenMode: boolean) => () => void;
}

/**
 * Hook for managing terminal input focus across normal and fullscreen modes.
 *
 * Handles:
 * - Separate refs for normal and fullscreen inputs (to avoid ref conflicts)
 * - Focus on mount with preventScroll
 * - Focus restoration when exiting minimized or fullscreen states
 * - Proper timing to wait for exit animations
 *
 * Usage:
 * ```tsx
 * const { normalInputRef, fullscreenInputRef, getInputRef, getClickToFocusHandler } = useTerminalFocus({
 *   isMinimized,
 *   isFullscreen,
 * });
 *
 * // In your render:
 * <input ref={getInputRef(isFullscreenMode)} />
 * <div onClick={getClickToFocusHandler(isFullscreenMode)}>...</div>
 * ```
 */
export function useTerminalFocus({
  isMinimized,
  isFullscreen,
  disabled = false,
  focusDelay = 350,
}: UseTerminalFocusOptions): UseTerminalFocusReturn {
  const normalInputRef = useRef<HTMLInputElement>(null);
  const fullscreenInputRef = useRef<HTMLInputElement>(null);

  // Focus normal input when visible (not minimized, not fullscreen)
  useEffect(() => {
    if (!isMinimized && !isFullscreen && !disabled) {
      const timer = setTimeout(() => {
        normalInputRef.current?.focus({ preventScroll: true });
      }, focusDelay);
      return () => clearTimeout(timer);
    }
  }, [isMinimized, isFullscreen, disabled, focusDelay]);

  // Focus fullscreen input when entering fullscreen
  useEffect(() => {
    if (isFullscreen && !disabled) {
      // Small delay to ensure the fullscreen modal has rendered
      const timer = setTimeout(() => {
        fullscreenInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen, disabled]);

  // Helper to get the correct ref based on mode
  const getInputRef = useCallback(
    (isFullscreenMode: boolean) => (isFullscreenMode ? fullscreenInputRef : normalInputRef),
    []
  );

  // Manual focus function
  const focusInput = useCallback(
    (options?: { preventScroll?: boolean }) => {
      const ref = isFullscreen ? fullscreenInputRef : normalInputRef;
      if (options?.preventScroll) {
        ref.current?.focus({ preventScroll: true });
      } else {
        ref.current?.focus();
      }
    },
    [isFullscreen]
  );

  // Click handler factory
  const getClickToFocusHandler = useCallback(
    (isFullscreenMode: boolean) => () => {
      const ref = isFullscreenMode ? fullscreenInputRef : normalInputRef;
      ref.current?.focus();
    },
    []
  );

  return {
    normalInputRef,
    fullscreenInputRef,
    getInputRef,
    focusInput,
    getClickToFocusHandler,
  };
}
