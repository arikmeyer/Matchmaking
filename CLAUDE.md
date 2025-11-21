# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive job board application for Switchup, built as a single-page React app with a terminal/operating system theme. The entire application is client-side only (no backend) and designed to showcase a Product Engineer position through an immersive, gamified experience.

**Tech Stack**: React 19, TypeScript, Vite 7, Tailwind CSS v4, Framer Motion

## Quick Reference

### File Locations (Most Common)
- **Main Component**: `src/swup-operating-system.tsx` (~1500 lines)
- **System Logs**: `src/constants/logMessages.ts`
- **Tech Stack**: `src/constants/techStack.ts`
- **Quiz Questions**: `src/constants/quizQuestions.ts`
- **Engineering Bets**: `src/constants/engineeringBets.ts`
- **Behind the Scenes Videos**: `src/constants/behindTheScenes.ts`
- **Types**: `src/types/terminal.types.ts`

### Common Tasks
```bash
# Add system log → edit src/constants/logMessages.ts
# Add quiz question → edit src/constants/quizQuestions.ts
# Add behind the scenes video → edit src/constants/behindTheScenes.ts
# Add terminal command → edit handleCommand in src/swup-operating-system.tsx
# Change boot password → edit src/components/BootSequence.tsx
# Add new component → create in src/components/, export via index.ts
# Add new hook → create in src/hooks/, export via index.ts
```

### Import Patterns
```typescript
// Components
import { BootSequence, ApplicationModal, BehindTheScenesModal } from './components';

// Hooks
import { useTheme, useQuizState } from './hooks';

// Constants
import { LOG_MESSAGES, TECH_STACK, BEHIND_THE_SCENES_VIDEOS } from './constants';

// Types
import type { LogEntry, QuizQuestion, BehindTheScenesVideo } from './types';
```

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

### Modular Component Design

The application has been refactored from a single-file monolith into a clean, modular architecture:

**Main Component**: `src/swup-operating-system.tsx` (~1500 lines)
- Core application logic and InteractiveTerminal component
- Page layout and section rendering

**Extracted Modules**:
- `src/components/` - Reusable UI components (5 files)
- `src/constants/` - Data and configuration (4 files)
- `src/hooks/` - Custom React hooks (4 files)
- `src/types/` - TypeScript type definitions (1 file)

### Component Hierarchy

```
SwitchupOperatingSystem (root)
├── BootSequence (src/components/BootSequence.tsx)
│   └── Password-protected boot animation
├── InteractiveTerminal (inline in main component)
│   ├── CLI interface with commands
│   └── Culture quiz (useQuizState hook)
├── BehindTheScenesModal (src/components/BehindTheScenesModal.tsx)
│   └── Vimeo video player with multi-video navigation
├── ApplicationModal (src/components/ApplicationModal.tsx)
└── Main content sections
    ├── Hero with GlitchText
    ├── Live system logs (useTerminalLogs hook)
    ├── Tech Stack grid
    ├── Behind the Scenes video grid
    ├── Engineering Bets cards
    └── Footer CTA
```

### Module Organization

**Components** (`src/components/`):
- `BootSequence.tsx` - Boot animation with password auth
- `ApplicationModal.tsx` - Multi-step application flow
- `BehindTheScenesModal.tsx` - Vimeo video modal with multi-video navigation
- `GlitchText.tsx` - Reusable glitch effect
- `SectionHeader.tsx` - Consistent section headers
- `TerminalWindow.tsx` - **Reusable** complete window wrapper with all controls (recommended)
- `TerminalWindowHeader.tsx` - **Reusable** macOS-style window header with traffic light buttons
- `FullscreenModal.tsx` - **Reusable** fullscreen modal overlay for terminal windows
- `ExitConfirmDialog.tsx` - **Reusable** exit confirmation dialog with terminal styling

**Hooks** (`src/hooks/`):
- `useTheme.ts` - Theme & CRT mode with React 19's `useTransition`
- `useTerminalLogs.ts` - Auto-scrolling log simulation
- `useQuizState.ts` - Quiz state machine & scoring
- `useShutdown.ts` - Shutdown sequence with progress
- `useWindowControls.ts` - **Reusable** window state management (fullscreen, minimize, exit)

**Constants** (`src/constants/`):
- `logMessages.ts` - ~100 system log entries
- `techStack.ts` - Technology choices with rationale
- `engineeringBets.ts` - Engineering bets (work-in-progress technical directions)
- `quizQuestions.ts` - Culture quiz Q&A
- `behindTheScenes.ts` - Behind the scenes Vimeo videos from team members

**Types** (`src/types/`):
- `terminal.types.ts` - Centralized TypeScript definitions

### State Management Patterns

**Persistent State** (localStorage):
- `switchup_shutdown`: Tracks if system was shut down (skips boot on reload)
- `switchup_visits`: Visit tracking for easter eggs `{count: number, days: string[]}`

**Session State** (sessionStorage):
- `shutdown_console_hint`: One-time console message flag

**Component State** (React hooks):
- Boot/shutdown sequences
- Modal visibility
- Active engineering bet cards
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

Content is now separated into dedicated constant files:

1. **LOG_MESSAGES** (`src/constants/logMessages.ts`)
   - ~100 system log entries with `level` and `message`
   - Randomly displayed every 2 seconds when booted
   - Humor mixed with technical authenticity

2. **TECH_STACK** (`src/constants/techStack.ts`)
   - 6 technology choices with rationale
   - Structure: `{ category, tool, rationale, specs[], status, icon }`
   - Displayed in tech stack grid

3. **ENGINEERING_BETS** (`src/constants/engineeringBets.ts`)
   - 6 engineering bets (work-in-progress technical directions)
   - Structure: `{ id, title, context, tradeoff }`
   - Expandable cards in UI

4. **QUIZ_QUESTIONS** (`src/constants/quizQuestions.ts`)
   - 10 culture quiz questions
   - Structure: `{ q, a, b, correct, feedback_pass, feedback_fail }`
   - Used by `useQuizState` hook

5. **BEHIND_THE_SCENES_VIDEOS** (`src/constants/behindTheScenes.ts`)
   - Team member video insights (Vimeo-hosted)
   - Structure: `{ id, vimeoId, title, description, author: { name, role, avatarInitials }, topics[], duration, featured? }`
   - Displayed in "Behind the Scenes" section as a responsive grid
   - Featured videos span 2 columns on larger screens

### Easter Eggs & Engagement Mechanics

**Visit Tracking**: Increments on every page load, shows console messages at milestones (3, 5, 10, 15, 20+ visits)

**Logo Click Counter**: Hidden achievement at 5 and 10 clicks

**Console Messages**: Developer-targeted messages logged on mount encouraging application

**Shutdown Screen**: After shutdown, reboot link appears after 20+ second delay (tests patience)

## Key Technical Patterns

### Boot Sequence Authentication
`src/components/BootSequence.tsx`:
- Password hardcoded: `"SwitchMeUp"`
- On correct password: triggers `onComplete` callback
- Skip boot if `localStorage.getItem('switchup_shutdown') === 'true'`

### Theme & CRT Mode
`src/hooks/useTheme.ts`:
- React 19's `useTransition` for non-blocking theme changes
- Persists to localStorage: `switchup-theme` and `switchup-crt-mode`
- Applies `data-theme` attribute and `crt-effect` class to document root
- Returns: `{ currentTheme, crtMode, isPending, changeTheme, toggleCrtMode }`

### Terminal Logs System
`src/hooks/useTerminalLogs.ts`:
- Auto-scrolling log container with ref pattern
- Random log selection every 2 seconds
- Returns: `{ logs, logsContainerRef, addLog, clearLogs }`

### Quiz State Machine
`src/hooks/useQuizState.ts`:
- Manages quiz flow: inactive → active → complete
- Tracks current step (0-9) and score
- Branching feedback: 8+/6-7/<6 thresholds
- Returns: `{ quizActive, step, score, feedback, startQuiz, answerQuestion, resetQuiz }`

### Shutdown Sequence
`src/hooks/useShutdown.ts`:
- Phase-based: idle → initiating → shutting-down → complete
- Progress tracking (0-100%)
- Returns: `{ phase, progress, isActive, isComplete, initiate, cancel, forceShutdown }`

### Modal State Management
`src/components/ApplicationModal.tsx` and `BehindTheScenesModal.tsx`:
- Accept `isOpen` and `onClose` props
- ApplicationModal state machine: `INIT` → `ROLE_SELECT` → `GENERATING` → `COMPLETE`
- Generates session tokens: `SWUP-${random 9-char string}`
- BehindTheScenesModal supports multiple videos with navigation and Vimeo embedding

## Important Implementation Notes

### File Paths
**Main Application**:
- `src/swup-operating-system.tsx` (~1500 lines) - Core app logic and InteractiveTerminal

**Components**:
- `src/components/BootSequence.tsx` - Boot animation
- `src/components/ApplicationModal.tsx` - Application flow
- `src/components/BehindTheScenesModal.tsx` - Vimeo video modal
- `src/components/GlitchText.tsx` - Glitch effect
- `src/components/SectionHeader.tsx` - Section headers

**Hooks**:
- `src/hooks/useTheme.ts` - Theme management
- `src/hooks/useTerminalLogs.ts` - Log simulation
- `src/hooks/useQuizState.ts` - Quiz state
- `src/hooks/useShutdown.ts` - Shutdown sequence

**Constants**:
- `src/constants/logMessages.ts` - System logs
- `src/constants/techStack.ts` - Tech stack data
- `src/constants/engineeringBets.ts` - Engineering bets
- `src/constants/quizQuestions.ts` - Quiz questions
- `src/constants/behindTheScenes.ts` - Behind the scenes videos

**Supporting Files**:
- `src/types/terminal.types.ts` - TypeScript definitions
- `src/main.tsx` - React root mount
- `src/index.css` - Tailwind + CRT effects
- `index.html` - HTML shell

### Content Updates

**System Logs**:
```typescript
// src/constants/logMessages.ts
export const LOG_MESSAGES: LogMessage[] = [
  { level: 'INFO', message: 'Your new log message' },
  // ...
];
```

**Tech Stack**:
```typescript
// src/constants/techStack.ts
export const TECH_STACK: StackItem[] = [
  {
    category: 'Category',
    tool: 'Tool Name',
    rationale: 'What we use it for and why',
    specs: ['Use case 1', 'Use case 2'],
    status: 'CORE',  // or 'EXPLORING'
    icon: IconComponent
  },
];
```

**Engineering Bets**:
```typescript
// src/constants/engineeringBets.ts
export const ENGINEERING_BETS: EngineeringBet[] = [
  {
    id: 'unique-id',
    title: 'Bet Title',
    context: 'Background and current direction',
    tradeoff: 'Trade-offs we\'re navigating'
  },
];
```

**Quiz Questions**:
```typescript
// src/constants/quizQuestions.ts
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'Your question?',
    a: 'Option A',
    b: 'Option B',
    correct: 'a',
    feedback_pass: 'Correct feedback',
    feedback_fail: 'Incorrect feedback'
  },
];
```

### Password Changes
Boot password in `src/components/BootSequence.tsx`:
```typescript
if (password === 'SwitchMeUp') {
  onComplete();
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

## Reusable Window Controls

### TerminalWindow Component (Recommended)
The easiest way to add window controls to any content. Handles fullscreen, minimize, and close with all animations built-in.

```tsx
import { TerminalWindow } from './components';

<TerminalWindow
    title="tail -f /var/log/app.log"
    height="400px"
    showCloseButton={false}  // Hide close button for display-only windows
    minimizedContent={
        <div className="h-[200px] flex items-center justify-center">
            <span>Window minimized - click to restore</span>
        </div>
    }
>
    <div className="p-6 h-full overflow-y-auto">
        {/* Your content here */}
    </div>
</TerminalWindow>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | 'terminal' | Window title in header |
| `children` | ReactNode | required | Content to render |
| `height` | string | '400px' | Content area height |
| `fullscreenHeight` | string | 'calc(100vh-120px)' | Height when fullscreen |
| `minimizedContent` | ReactNode | default placeholder | Custom minimized view |
| `onClose` | () => void | shows dialog | Close button handler |
| `onMinimizedChange` | (bool) => void | - | Callback for minimize state |
| `showCloseButton` | boolean | true | Show red button |
| `showMinimizeButton` | boolean | true | Show amber button |
| `showFullscreenButton` | boolean | true | Show green button |
| `exitDialogTitle` | string | 'Close this window?' | Exit dialog title |

### Low-Level Components (For Custom Implementations)

For more control, use these individual components:

**useWindowControls Hook** - State management for window controls:
```typescript
import { useWindowControls } from './hooks';
const { state, actions } = useWindowControls({ onExit, onMinimizedChange });
```

**TerminalWindowHeader** - Just the macOS-style header bar:
```tsx
import { TerminalWindowHeader } from './components';
<TerminalWindowHeader title="my-window" onClose={...} onMinimize={...} onFullscreenToggle={...} />
```

**FullscreenModal** - Fullscreen overlay wrapper:
```tsx
import { FullscreenModal } from './components';
<FullscreenModal isOpen={isFullscreen} onClose={...}>{children}</FullscreenModal>
```

**ExitConfirmDialog** - Exit confirmation dialog:
```tsx
import { ExitConfirmDialog } from './components';
<ExitConfirmDialog isOpen={showConfirm} onCancel={...} onConfirm={...} />
```

## Common Development Tasks

### Add a New Terminal Command
1. Open `src/swup-operating-system.tsx`
2. Find `handleCommand` function in `InteractiveTerminal` component
3. Add new case to the switch statement
4. Add command to help text output

Example:
```typescript
case 'mycommand':
  addLine({ type: 'output', content: 'Command output here' });
  break;
```

### Update Tech Stack
Edit `src/constants/techStack.ts`:
```typescript
import { Network } from 'lucide-react';

export const TECH_STACK: StackItem[] = [
  {
    category: 'Workflow Engine',
    tool: 'Windmill.dev',
    rationale: 'What we use it for and why',
    specs: ['Use case 1', 'Use case 2'],
    status: 'CORE',  // or 'EXPLORING'
    icon: Network
  },
  // ...
];
```

### Add Quiz Questions
Edit `src/constants/quizQuestions.ts`:
```typescript
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'Your question text?',
    a: 'First option',
    b: 'Second option',
    correct: 'a',
    feedback_pass: 'Great answer! Here\'s why...',
    feedback_fail: 'Not quite. Consider this...'
  },
  // ... (10 total questions)
];
```

### Modify Boot Sequence
Edit `src/components/BootSequence.tsx`:
- Change `bootText` array for different boot messages
- Modify password check logic
- Adjust timing in `useEffect` delays

### Add System Logs
Edit `src/constants/logMessages.ts`:
```typescript
export const LOG_MESSAGES: LogMessage[] = [
  { level: 'INFO', message: 'New log message' },
  { level: 'WARN', message: 'Warning message' },
  { level: 'ERROR', message: 'Error message' },
  // ...
];
```

### Add Behind the Scenes Video
Edit `src/constants/behindTheScenes.ts`:
```typescript
export const BEHIND_THE_SCENES_VIDEOS: BehindTheScenesVideo[] = [
  {
    id: 'unique-id',           // URL-safe unique identifier
    vimeoId: '1139231458',     // Get from Vimeo URL (vimeo.com/XXXXXXXXX)
    title: 'Video Title',
    description: 'What the video covers and why it matters...',
    author: {
      name: 'Name',
      role: 'Role at SwitchUp',
      avatarInitials: 'XX',    // 2-letter initials for avatar
    },
    topics: ['Topic 1', 'Topic 2', 'Topic 3'],
    duration: '8:42',          // Format: M:SS or MM:SS
    featured: true,            // Optional: spans 2 columns in grid
  },
];
```

### Create New Custom Hook
1. Create file in `src/hooks/useYourHook.ts`
2. Export hook function
3. Add export to `src/hooks/index.ts`
4. Import in main component: `import { useYourHook } from './hooks';`

### Add New Component
1. Create file in `src/components/YourComponent.tsx`
2. Export component
3. Add export to `src/components/index.ts`
4. Import in main component: `import { YourComponent } from './components';`

## Architecture Philosophy

This codebase has evolved to balance engagement with maintainability:

### Design Principles
1. **Modular & Maintainable** - Clean separation of concerns for easy navigation
2. **Type-Safe** - Comprehensive TypeScript coverage with centralized types
3. **Reusable** - Custom hooks and components prevent duplication
4. **Engagement-First** - Heavy animations and easter eggs create memorable experience
5. **Developer Experience** - Clear file organization and barrel exports

### Production Considerations
This is a showcase piece, not production SaaS. Performance is secondary to visual impact:
- **Heavy Animations** - Multiple Framer Motion effects, rotating gradients
- **No Optimization** - Large bundle size acceptable for job board
- **Easter Eggs** - Visit tracking and hidden features filter curious candidates
- **Client-Only** - No backend, no SSR, purely static hosting

### Future Enhancements
If expanding beyond job board:
- Add proper routing (React Router)
- Implement analytics tracking
- Optimize animation performance for lower-end devices
- Add testing suite (Vitest + React Testing Library)
- Consider code splitting for larger features

### Refactor History
**Before** (~2000 lines, single file):
- All logic, data, UI in one file
- Difficult to navigate and maintain
- Hard to reuse components

**After** (~1500 lines main + modules):
- Modular architecture with clear boundaries
- Reusable hooks and components
- Easy to test and extend
- 100% feature parity maintained
