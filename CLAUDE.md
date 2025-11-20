# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive job board application for Switchup, built as a single-page React app with a terminal/operating system theme. The entire application is client-side only (no backend) and designed to showcase a Product Engineer position through an immersive, gamified experience.

## Development Commands

```bash
# Start development server (opens browser automatically on port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## High-Level Architecture

### Single-File Component Design

The entire application lives in `src/swup-operating-system.tsx` (~2000 lines). This is intentional - it's a standalone presentation piece, not a production app with multiple routes or features.

**Key architectural decision**: All components, data, and logic are colocated in one file for easy portability and deployment as a self-contained artifact.

### Component Hierarchy

```
SwitchupOperatingSystem (root)
├── BootSequence (password-protected boot animation)
├── InteractiveTerminal (main CLI interface with commands & quiz)
├── VideoModal (placeholder for work session recording)
├── ApplicationModal (two-step application flow with token generation)
└── Main content sections (Hero, Logs, Tech Stack, Decisions, etc.)
```

### State Management Patterns

**Persistent State** (localStorage):
- `switchup_shutdown`: Tracks if system was shut down (skips boot on reload)
- `switchup_visits`: Visit tracking for easter eggs `{count: number, days: string[]}`

**Session State** (sessionStorage):
- `shutdown_console_hint`: One-time console message flag

**Component State** (React hooks):
- Boot/shutdown sequences
- Modal visibility
- Active decision cards
- Terminal command history
- Quiz state (active, step, score)
- Live log entries

### Interactive Terminal System

The `InteractiveTerminal` component implements a full command-line interface:

**Standard Commands**: `help`, `stack`, `mission`, `challenges`, `ls`, `whoami`, `sudo`, `apply`, `clear`, `exit`

**Easter Eggs**: `konami`, `health`, `matrix`, `hire me`

**Quiz Mode**: Triggered by `culture` or `quiz` command - runs a 10-question assessment with branching feedback based on score (8+/6-7/<6).

**Exit Behavior**: The `exit` command triggers `onExit` callback → initiates shutdown sequence in parent component.

### Animation System

Heavy use of **Framer Motion** for:
- Page transitions
- Log entry animations (fade + blur → sharp)
- Modal appearances (scale, opacity)
- Shutdown sequence (staggered animation)
- Rotating gradient borders on terminal

**Performance consideration**: Multiple rotating gradients and blur effects - test on lower-end devices if performance becomes an issue.

### Data Structures

Three main data arrays define content:

1. **LOG_MESSAGES** (~100 entries): System log messages with `level` and `message`
   - Randomly displayed every 2 seconds when booted
   - Humor mixed with technical authenticity

2. **TECH_STACK** (6 items): Technology choices with rationale
   - Each has: `category`, `tool`, `rationale`, `specs[]`, `status`, `icon`

3. **DECISIONS** (6 items): Architectural decision records
   - Format: `title`, `context`, `tradeoff`
   - Expandable cards in UI

### Easter Eggs & Engagement Mechanics

**Visit Tracking**: Increments on every page load, shows console messages at milestones (3, 5, 10, 15, 20+ visits)

**Logo Click Counter**: Hidden achievement at 5 and 10 clicks

**Console Messages**: Developer-targeted messages logged on mount encouraging application

**Shutdown Screen**: After shutdown, reboot link appears after 20+ second delay (tests patience)

## Key Technical Patterns

### Boot Sequence Authentication
Password is hardcoded: `"SwitchMeUp"`
- On correct password: completes boot, shows main interface
- Skip boot if `localStorage.getItem('switchup_shutdown') === 'true'`

### Modal State Management
Both VideoModal and ApplicationModal:
- Accept `isOpen` and `onClose` props
- ApplicationModal has internal state machine: `INIT` → `ROLE_SELECT` → `GENERATING` → `COMPLETE`
- Generates random session tokens: `SWUP-${random 9-char string}`

### Log Auto-Scroll
Uses `ref` pattern with `useEffect` to auto-scroll logs container:
```typescript
useEffect(() => {
  if (logsContainerRef.current) {
    logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
  }
}, [logs]);
```

### CRT Mode Toggle
Applies CSS class `crt-effect` to root element (assumed to be defined in `index.css`)

## Important Implementation Notes

### File Paths
When editing code, the main file is:
- `/src/swup-operating-system.tsx` (1978 lines)

Supporting files:
- `/src/main.tsx` (simple React root mount)
- `/src/index.css` (Tailwind + custom CRT effects)
- `/index.html` (minimal HTML shell)

### Content Updates
To update job description content:
- **System logs**: Edit `LOG_MESSAGES` array
- **Tech stack**: Edit `TECH_STACK` array
- **Decisions**: Edit `DECISIONS` array
- **Quiz questions**: Edit `QUESTIONS` array inside `InteractiveTerminal` component (starts line ~486)

### Password Changes
The boot password is hardcoded at line ~265:
```typescript
if (password === 'SwitchMeUp') {
  // grant access
}
```

### Application Email
All application flows point to: `future-colleagues@switchup.tech`
- Check ApplicationModal component
- Check "apply" terminal command
- Check footer CTA section

## Styling Approach

**Tailwind CSS v4** with CSS-first configuration:
- **CSS-based theme** using `@theme` directive in `src/index.css`
- Custom color system:
  - `bg-terminal-bg` (#050505) - Ultra dark background
  - `bg-terminal-surface` (#0a0a0a) - Surface/card background
  - `terminal-green` (#22c55e) - Accent color
- Neutral grays: `neutral-300` through `neutral-900`
- Border patterns: `border-neutral-800`
- Mono font: Applied at root level via `font-mono`

**Custom effects** (in index.css):
- `.crt-effect` - Scanline and curvature effects with phosphor glow
- Scrollbar hiding utilities
- Blur gradients for ambient lighting

**Tailwind v4 Features Used:**
- `@import "tailwindcss"` - Single import replaces old `@tailwind` directives
- `@theme` - CSS-first configuration with CSS variables
- No `tailwind.config.js` - Configuration lives entirely in CSS
- Semantic color names via CSS custom properties

## Deployment Considerations

**Build output**: Standard Vite build → `/dist`

**No environment variables needed**: Everything is client-side, no API keys

**Static hosting ready**: Works on Vercel, Netlify, Cloudflare Pages, GitHub Pages

**No SSR required**: Pure client-side React app

## Tailwind v4 Advanced Configuration

This project fully leverages Tailwind CSS v4's modern capabilities with a CSS-first approach.

### Core V4 Features Implemented

**1. @source Directive** - Optimized content scanning:
```css
@source "./src/**/*.{ts,tsx}";
@source "./index.html";
```

**2. @theme Block** - CSS-native configuration:
```css
@theme {
  --color-terminal-bg: #050505;
  --color-terminal-surface: #0a0a0a;
  --color-terminal-green: #22c55e;

  /* Animations defined in @theme */
  @keyframes scanline-flicker {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.18; }
  }
}
```

**3. @utility Directive** - Custom reusable utilities:
- `terminal-card` - Complete card styling with border, shadow, radius
- `terminal-border` - Consistent border styling
- `flex-center` - Flex container with centered items (used 42x)
- `terminal-text` - Monospace font with proper color
- `terminal-glow` - Animated glow effect
- `terminal-interactive` - Hover/focus states with color-mix
- `terminal-glass` - Glass morphism with backdrop-filter
- `terminal-neon` - Neon border effect

**4. @variant Directive** - Custom state variants:
```css
@variant terminal (&.terminal-active);
@variant crt (&.crt-effect);
```

**5. Container Queries** - Responsive without media queries:
```css
@utility terminal-container {
  container-type: inline-size;
  container-name: terminal;
}
```

**6. Modern CSS color-mix()** - Dynamic color manipulation:
```css
color-mix(in srgb, var(--color-terminal-green) 50%, transparent)
```

**7. CSS Nesting** - Modern selector nesting:
```css
@utility terminal-interactive {
  &:hover { /* nested styles */ }
  &:focus-visible { /* nested styles */ }
}
```

### Available Custom Utilities

Use these single-class utilities instead of combining multiple Tailwind classes:

| Utility | Replaces | Usage |
|---------|----------|-------|
| `terminal-card` | `bg-terminal-surface border border-neutral-800 rounded-lg overflow-hidden shadow-2xl` | Terminal-style cards |
| `flex-center` | `flex items-center` | Centered flex containers |
| `flex-center-col` | `flex flex-col items-center` | Vertical centered containers |
| `terminal-interactive` | Manual hover/focus states | Interactive elements |
| `terminal-glass` | Complex backdrop-filter setup | Glass morphism effect |
| `terminal-neon` | Multi-shadow border effect | Neon glow borders |
| `terminal-text-glow` | Animated text with glow | Pulsing green text |

### Color System with color-mix()

All colors support dynamic mixing:
```tsx
// Old way
<div className="bg-[#0a0a0a] hover:bg-green-500/10">

// New way with custom utility
<div className="terminal-surface-hover">
```

### Container Queries for Responsive Design

```tsx
<div className="terminal-container">
  <p className="terminal-responsive-text">
    Auto-sizes based on container, not viewport
  </p>
</div>
```

### Performance Optimizations

- **@source directive** - Tailwind scans only specified paths
- **CSS variables** - Native browser performance
- **color-mix()** - No runtime JavaScript for color manipulation
- **Container queries** - Faster than media queries for component-level responsiveness

## Common Development Tasks

### Add a new terminal command
1. Open `src/swup-operating-system.tsx`
2. Find the `handleCommand` function in `InteractiveTerminal` component
3. Add new case to the switch statement (~line 654-1043)
4. Add command to help text output

### Update tech stack
Edit the `TECH_STACK` array (~line 119), following existing structure:
```typescript
{
  category: string,
  tool: string,
  rationale: string,
  specs: string[],
  status: 'ONLINE' | 'SCALING' | 'OPTIMIZED',
  icon: React.ElementType
}
```

### Add new quiz question
Edit `QUESTIONS` array inside `InteractiveTerminal` (~line 486):
```typescript
{
  q: string,      // The question
  a: string,      // Option A text
  b: string,      // Option B text
  correct: 'a' | 'b',
  feedback_pass: string,
  feedback_fail: string
}
```

### Modify boot sequence
Edit `BootSequence` component (~line 227):
- Change `bootText` array for different boot messages
- Change password check logic for different authentication

## Architecture Philosophy

This codebase prioritizes:
1. **Self-containment**: Single file = easy to understand, deploy, share
2. **Engagement over convention**: Unusual patterns (one giant file) serve the goal of creating memorable experience
3. **Performance is secondary**: Heavy animations and effects - this is a showcase piece, not a production SaaS
4. **Easter eggs as signal**: Visit tracking and hidden features filter for curious, persistent candidates

If refactoring for production use, consider:
- Breaking into multiple component files
- Extracting data to separate content files
- Adding proper TypeScript types (currently using inline types)
- Implementing proper routing if expanding beyond single page
- Adding analytics tracking
- Optimizing animation performance
