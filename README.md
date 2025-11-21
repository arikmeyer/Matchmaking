# Switchup Product Engineer Job Board

An interactive web application showcasing the Product Engineer position at Switchup through an immersive terminal-themed experience.

## Overview

This is a client-side React application that presents a job opportunity through an engaging, gamified interface. Switchup is rethinking how service-led B2C businesses operate - automation and AI-first, based on smart, safe, and lifelong trust-based relationships with users.

## What's Inside

- **Interactive Terminal** - Full CLI interface with commands, easter eggs, and a culture quiz
- **Behind the Scenes** - Vimeo-hosted videos showing real engineering challenges
- **Job Documentation** - Detailed markdown docs in `/docs`

## Tech Stack

- **React 19** - Concurrent features (`useTransition`, `useOptimistic`, `useDeferredValue`)
- **TypeScript** - Full type coverage with centralized definitions
- **Vite** - Fast development and optimized builds
- **Tailwind CSS v4** - CSS-first configuration with OKLCH colors
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Icon library

## Quick Start

```bash
npm install    # Install dependencies
npm run dev    # Start dev server at http://localhost:5173
npm run build  # Production build to /dist
```

## Project Structure

```
src/
├── components/          # React UI components
├── constants/           # Data files (logs, tech stack, quiz, videos)
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
├── swup-operating-system.tsx  # Main app component
├── main.tsx             # Entry point
└── index.css            # Tailwind v4 configuration
```

## Architecture

### Components

**Application Flow**

| Component              | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| `BootSequence`         | Password-protected boot animation            |
| `ApplicationModal`     | Multi-step application with token generation |
| `BehindTheScenesModal` | Vimeo video player with navigation           |
| `GlitchText`           | Animated glitch text effect                  |
| `SectionHeader`        | Consistent section headers                   |
| `ErrorBoundary`        | Graceful error handling                      |

**Reusable Window System**

| Component              | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `TerminalWindow`       | Complete window with all controls (recommended) |
| `TerminalWindowHeader` | macOS-style traffic light buttons               |
| `FullscreenModal`      | Fullscreen overlay wrapper                      |
| `ExitConfirmDialog`    | Exit confirmation with humor                    |

### Custom Hooks

| Hook                | React 19 Feature   | Purpose                                    |
| ------------------- | ------------------ | ------------------------------------------ |
| `useTheme`          | `useTransition`    | Theme & CRT mode with non-blocking updates |
| `useTerminalLogs`   | `useDeferredValue` | Auto-scrolling log simulation              |
| `useQuizState`      | `useOptimistic`    | Quiz state with instant UI feedback        |
| `useShutdown`       | -                  | Shutdown animation sequence                |
| `useWindowControls` | -                  | Window state (fullscreen, minimize, exit)  |

### Data Constants

| File                 | Content                                                             |
| -------------------- | ------------------------------------------------------------------- |
| `logMessages.ts`     | System log entries with levels (INFO, WARN, ERROR, SUCCESS, SYSTEM) |
| `techStack.ts`       | Technology choices with rationale and specs                         |
| `engineeringBets.ts` | Work-in-progress technical directions                               |
| `quizQuestions.ts`   | Culture quiz with branching feedback                                |
| `behindTheScenes.ts` | Vimeo video metadata and authors                                    |

### TypeScript Types

```typescript
type LogEntry = { id, timestamp, level, message }
type StackItem = { category, tool, rationale, specs[], status, icon }
type EngineeringBet = { id, title, context, tradeoff }
type QuizQuestion = { q, a, b, correct, feedback_pass, feedback_fail }
type BehindTheScenesVideo = { id, vimeoId, title, description, author, topics[], duration, featured? }
type TerminalLine = { type: 'input' | 'output' | 'system', content }
type TerminalTheme = 'default' | 'matrix' | 'cyberpunk' | 'light'
```

## Terminal Commands

### Standard Commands

| Command                | Description                 |
| ---------------------- | --------------------------- |
| `help`                 | Show available commands     |
| `stack`                | Display tech stack          |
| `mission`              | Show company mission        |
| `challenges`           | List engineering challenges |
| `culture` / `quiz`     | Start culture assessment    |
| `ls`                   | List "directory" contents   |
| `whoami`               | Show user info              |
| `apply` / `./apply.sh` | Open application modal      |
| `clear`                | Clear terminal              |
| `exit`                 | Trigger shutdown sequence   |

### Theme Commands

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `theme`           | Show current theme                 |
| `theme default`   | Classic terminal green             |
| `theme matrix`    | Intense green on green-tinted dark |
| `theme cyberpunk` | Magenta/purple futuristic          |
| `theme light`     | Light mode for accessibility       |

### Easter Eggs

| Command              | Effect                   |
| -------------------- | ------------------------ |
| `konami`             | Classic code reward      |
| `health`             | System health check      |
| `matrix`             | Enter the matrix theme   |
| `salary`             | Humorous response        |
| `hire me` / `hireme` | Eager candidate response |
| `sudo`               | Permission denied joke   |

## State Management

### localStorage Keys

| Key                 | Purpose                          |
| ------------------- | -------------------------------- |
| `switchup_shutdown` | Skip boot on reload if `true`    |
| `switchup_visits`   | Visit tracking `{count, days[]}` |
| `switchup-theme`    | Persisted theme preference       |
| `switchup-crt-mode` | CRT effect toggle                |

### sessionStorage Keys

| Key                     | Purpose                       |
| ----------------------- | ----------------------------- |
| `shutdown_console_hint` | One-time console message flag |

## Visual Features

### Boot Sequence
- Password: `SwitchMeUp`
- Animated line-by-line boot messages
- Skipped automatically if shutdown flag set

### CRT Mode
- Scanline overlay with flicker animation
- Phosphor glow effect on text
- Screen curvature vignette
- Chromatic aberration (RGB split)

### Themes (OKLCH Color Space)
- **Default** - Green (#22c55e equivalent) on ultra-dark
- **Matrix** - Intense green with green-tinted backgrounds
- **Cyberpunk** - Magenta/purple on purple-tinted dark
- **Light** - Full inversion for accessibility

### Animations
- Framer Motion for all transitions
- Boot/shutdown sequences with progress
- Log entries fade in with blur effect
- Modal scale/opacity animations
- Rotating gradient borders

## Engagement Mechanics

- **Visit Tracking** - Console messages at 3, 5, 10, 15, 20+ visits
- **Logo Clicks** - Hidden achievements at 5 and 10 clicks
- **Quiz Scoring** - Branching feedback at 8+, 6-7, <6 correct
- **Shutdown Delay** - Reboot link appears after 20+ seconds

## Tailwind CSS v4 Configuration

### Features Used
- `@import "tailwindcss"` - Single import
- `@source` - Optimized content scanning
- `@theme` - CSS-native configuration
- `@utility` - Custom utilities
- `@variant` - Custom state variants
- `@layer` - Cascade layer organization
- `@property` - Type-safe CSS custom properties
- OKLCH colors - Perceptually uniform
- `color-mix()` - Dynamic color manipulation
- CSS nesting - Modern selectors
- Container queries - Component-level responsive
- View Transitions API - Page transitions
- Scroll-driven animations - Scroll-tied effects
- Logical properties - i18n support

### Custom Utilities
```css
terminal-card       /* Complete card with border, shadow, radius */
flex-center         /* display: flex; align-items: center */
flex-center-col     /* Vertical centered flex */
terminal-interactive /* Hover/focus states with color-mix */
terminal-glass      /* Backdrop blur glass effect */
terminal-neon       /* Neon border with glow */
terminal-text-glow  /* Pulsing green text */
scrollbar-hide      /* Cross-browser scrollbar hiding */
tag-bg              /* Chip/tag background */
warning-header      /* Warning banner styling */
text-primary        /* Theme-aware primary text */
text-secondary      /* Theme-aware secondary text */
text-muted          /* Theme-aware muted text */
bg-surface          /* Theme-aware surface background */
bg-surface-dark     /* Theme-aware dark background */
border-default      /* Theme-aware border color */
```

### Accessibility
- `prefers-reduced-motion` - Disables animations
- `prefers-contrast: high` - Enhanced colors
- Print styles - Disables visual effects

## Development Guide

### Add System Log
```typescript
// src/constants/logMessages.ts
{ level: 'INFO', message: 'Your message' }
// Levels: INFO, WARN, ERROR, SUCCESS, SYSTEM
```

### Add Tech Stack Item
```typescript
// src/constants/techStack.ts
{
  category: 'Category',
  tool: 'Tool Name',
  rationale: 'Why we use it',
  specs: ['Use case 1', 'Use case 2'],
  status: 'CORE',  // or 'EXPLORING'
  icon: LucideIcon
}
```

### Add Quiz Question
```typescript
// src/constants/quizQuestions.ts
{
  q: 'Question text?',
  a: 'Option A',
  b: 'Option B',
  correct: 'a',
  feedback_pass: 'Correct response',
  feedback_fail: 'Incorrect response'
}
```

### Add Behind the Scenes Video
```typescript
// src/constants/behindTheScenes.ts
{
  id: 'unique-slug',
  vimeoId: '1139231458',  // From vimeo.com/1139231458
  title: 'Video Title',
  description: 'What the video covers...',
  author: {
    name: 'Name',
    role: 'Role at SwitchUp',
    avatarInitials: 'XX',
  },
  topics: ['Topic 1', 'Topic 2'],
  duration: '8:42',
  featured: true,  // Optional: spans 2 columns
}
```

### Add Terminal Command
```typescript
// src/swup-operating-system.tsx - handleCommand function
case 'mycommand':
  addLine({ type: 'output', content: 'Output text' });
  break;
```

### Change Boot Password
```typescript
// src/components/BootSequence.tsx
if (password === 'YourNewPassword') {
```

### Use TerminalWindow Component
```tsx
import { TerminalWindow } from './components';

<TerminalWindow
  title="window-title"
  height="400px"
  showCloseButton={false}
  minimizedContent={<CustomMinimizedView />}
  onClose={handleClose}
>
  <YourContent />
</TerminalWindow>
```

**Props:**

| Prop                   | Type             | Default                |
| ---------------------- | ---------------- | ---------------------- |
| `title`                | string           | `'terminal'`           |
| `height`               | string           | `'400px'`              |
| `fullscreenHeight`     | string           | `'calc(100vh-120px)'`  |
| `minimizedContent`     | ReactNode        | Default placeholder    |
| `onClose`              | `() => void`     | Shows exit dialog      |
| `onMinimizedChange`    | `(bool) => void` | -                      |
| `showCloseButton`      | boolean          | `true`                 |
| `showMinimizeButton`   | boolean          | `true`                 |
| `showFullscreenButton` | boolean          | `true`                 |
| `exitDialogTitle`      | string           | `'Close this window?'` |

For granular control, use individual components:
- `useWindowControls` - State management hook
- `TerminalWindowHeader` - Just the header bar
- `FullscreenModal` - Fullscreen overlay
- `ExitConfirmDialog` - Exit confirmation

## About the Role

Switchup is hiring Product Engineers to build an AI-first platform that:
- Automates manual operational touchpoints
- Scales across energy, telco, and streaming subscriptions
- Creates seamless AI-human collaboration
- Serves hundreds of thousands of households

### Key Challenges
- Provider and market-agnostic architecture
- Highly configurable yet robust workflows
- Balancing experimentation with stability

### Switchup Tech Stack

| Category   | Technologies                          |
| ---------- | ------------------------------------- |
| Languages  | TypeScript (primary), Python, Rust/Go |
| AI         | Claude Code, Langfuse                 |
| Workflows  | Windmill.dev                          |
| Automation | Playwright                            |
| Database   | Neon DB                               |

## Deployment

Static files build to `/dist`. Zero-config deployment to:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

No environment variables required - fully client-side.

## Documentation

- [Primary Job Description](./docs/job-description.md)
- [Alternative Version](./docs/job-description_alt.md)
- [Development Guide](./CLAUDE.md)

## License

Private - Not for redistribution

---

**Built by the Switchup team** - Showcasing React 19, Tailwind CSS v4, and engaging UX design.
