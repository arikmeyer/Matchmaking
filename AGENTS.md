# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

Interactive job board for Switchup - a client-side React app with terminal/OS theme. No backend.

**Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion

## Commands

```bash
npm run dev      # Dev server at localhost:5173
npm run build    # Production build to /dist
npm run preview  # Preview production build
```

## File Locations

| What                     | Where                                              |
| ------------------------ | -------------------------------------------------- |
| Main component           | `src/swup-operating-system.tsx`                    |
| Terminal commands        | `handleCommand` function in main component         |
| System logs              | `src/constants/logMessages.ts`                     |
| Tech stack data          | `src/constants/techStack.ts`                       |
| Quiz questions           | `src/constants/quizQuestions.ts`                   |
| Engineering bets         | `src/constants/engineeringBets.ts`                 |
| Behind the scenes videos | `src/constants/behindTheScenes.ts`                 |
| Type definitions         | `src/types/terminal.types.ts`                      |
| Tailwind config          | `src/index.css` (CSS-first, no tailwind.config.js) |
| Boot password            | `src/components/BootSequence.tsx`                  |

## Import Patterns

```typescript
// Components - barrel export
import { BootSequence, ApplicationModal, TerminalWindow } from './components';

// Hooks - barrel export
import { useTheme, useQuizState, useWindowControls } from './hooks';

// Constants - barrel export
import { LOG_MESSAGES, TECH_STACK, QUIZ_QUESTIONS } from './constants';

// Types - use 'type' keyword
import type { LogEntry, QuizQuestion, BehindTheScenesVideo } from './types';
```

## Architecture

### Directory Structure

```
src/
├── components/     # UI components (export via index.ts)
├── constants/      # Data files (export via index.ts)
├── hooks/          # Custom hooks (export via index.ts)
├── types/          # TypeScript definitions (export via index.ts)
├── swup-operating-system.tsx  # Main app
├── main.tsx        # Entry point
└── index.css       # Tailwind v4 CSS config
```

### Component Hierarchy

```
SwitchupOperatingSystem (root)
├── BootSequence           # Password gate
├── InteractiveTerminal    # Inline in main component
│   └── Quiz mode          # useQuizState hook
├── BehindTheScenesModal   # Vimeo videos
├── ApplicationModal       # Application flow
└── Content sections       # Tech stack, logs, bets, footer
```

### State Management

**localStorage keys:**
- `switchup_shutdown` - Skip boot if `'true'`
- `switchup_visits` - `{count: number, days: string[]}`
- `switchup-theme` - Theme name
- `switchup-crt-mode` - CRT toggle

**sessionStorage keys:**
- `shutdown_console_hint` - One-time flag

## React 19 Patterns

The hooks use React 19 concurrent features:

| Hook              | React 19 Feature   | Purpose                    |
| ----------------- | ------------------ | -------------------------- |
| `useTheme`        | `useTransition`    | Non-blocking theme changes |
| `useTerminalLogs` | `useDeferredValue` | Deferred log rendering     |
| `useQuizState`    | `useOptimistic`    | Instant UI feedback        |

## Tailwind CSS v4

This project uses Tailwind v4's CSS-first approach. All config is in `src/index.css`.

**Key differences from v3:**
- No `tailwind.config.js` - use `@theme` block in CSS
- Single `@import "tailwindcss"` instead of directives
- `@utility` for custom utilities
- `@variant` for custom variants
- `@source` for content paths

**Color system uses OKLCH** for perceptual uniformity. Theme variants set CSS variables on `:root[data-theme="..."]`.

**Custom utilities available:**
- `terminal-card` - Card with border, shadow, radius
- `flex-center` - Flex with centered items
- `terminal-interactive` - Hover/focus states
- `terminal-glass` - Backdrop blur glass effect
- `terminal-neon` - Neon glow border
- `scrollbar-hide` - Hide scrollbars
- `text-primary`, `text-secondary`, `text-muted` - Theme-aware text
- `bg-surface`, `bg-surface-dark` - Theme-aware backgrounds
- `border-default` - Theme-aware border

## Common Tasks

### Add Terminal Command

In `src/swup-operating-system.tsx`, find `handleCommand` switch statement:

```typescript
case 'mycommand':
  addLine({ type: 'output', content: 'Output text' });
  break;
```

Also add to help text output in the `'help'` case.

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
  q: 'Question?',
  a: 'Option A',
  b: 'Option B',
  correct: 'a',
  feedback_pass: 'Correct response',
  feedback_fail: 'Incorrect response'
}
```

### Add Engineering Bet

```typescript
// src/constants/engineeringBets.ts
{
  id: 'unique-id',
  title: 'Bet Title',
  context: 'Background info',
  tradeoff: 'Trade-offs'
}
```

### Add Behind the Scenes Video

```typescript
// src/constants/behindTheScenes.ts
{
  id: 'unique-slug',
  vimeoId: '1139421319',  // From vimeo.com URL
  title: 'Title',
  description: 'Description',
  author: { name: 'Name', role: 'Role', avatarInitials: 'XX' },
  topics: ['Topic 1', 'Topic 2'],
  duration: '8:42',
  featured: true  // Optional: spans 2 columns
}
```

### Add New Component

1. Create `src/components/YourComponent.tsx`
2. Export from `src/components/index.ts`

### Add New Hook

1. Create `src/hooks/useYourHook.ts`
2. Export from `src/hooks/index.ts`

### Change Boot Password

```typescript
// src/components/BootSequence.tsx
if (password === 'NewPassword') {
```

### Add Custom Tailwind Utility

```css
/* src/index.css */
@utility my-utility {
  /* styles */
}
```

## Key Implementation Details

### Boot Sequence

- Password: `SwitchMeUp`
- Skips if `localStorage.getItem('switchup_shutdown') === 'true'`
- Triggers `onComplete` callback on success

### Terminal Commands

Standard: `help`, `stack`, `mission`, `challenges`, `culture`/`quiz`, `ls`, `whoami`, `apply`, `clear`, `exit`

Theme: `theme`, `theme default`, `theme matrix`, `theme cyberpunk`, `theme light`

Easter eggs: `konami`, `health`, `matrix`, `salary`, `hire me`, `sudo`

### Quiz Scoring

Branching feedback based on score:
- 8+ correct: High praise
- 6-7 correct: Encouraging
- <6 correct: Constructive

### Application Modal State Machine

`INIT` → `ROLE_SELECT` → `GENERATING` → `COMPLETE`

Generates token: `SWUP-${random9chars}`

### Shutdown Sequence

Phases: `idle` → `initiating` → `shutting-down` → `complete`

Progress updates every 50ms. Reboot link appears after 20+ seconds.

## Reusable Window Components

Use `TerminalWindow` for any terminal-style window with macOS controls:

```tsx
<TerminalWindow
  title="window-title"
  height="400px"
  showCloseButton={false}
  onClose={handleClose}
>
  <Content />
</TerminalWindow>
```

For granular control:
- `useWindowControls` - State hook
- `TerminalWindowHeader` - Header bar only
- `FullscreenModal` - Fullscreen overlay
- `ExitConfirmDialog` - Exit confirmation

## Application Email

All flows point to: `future-colleagues@switchup.tech`

Check:
- `ApplicationModal` component
- `apply` terminal command
- Footer CTA section

## Type Definitions

```typescript
type LogEntry = { id, timestamp, level, message }
type StackItem = { category, tool, rationale, specs[], status, icon }
type EngineeringBet = { id, title, context, tradeoff }
type QuizQuestion = { q, a, b, correct, feedback_pass, feedback_fail }
type BehindTheScenesVideo = { id, vimeoId, title, description, author, topics[], duration, featured? }
type TerminalLine = { type: 'input' | 'output' | 'system', content }
type TerminalTheme = 'default' | 'matrix' | 'cyberpunk' | 'light'
type ShutdownPhase = 'idle' | 'initiating' | 'shutting-down' | 'complete'
```

## Code Conventions

- **Barrel exports** - All directories have `index.ts`
- **Type imports** - Use `import type` for types
- **CSS utilities** - Prefer custom utilities over long class strings
- **Framer Motion** - Use for all animations
- **Lucide icons** - Import individual icons

## Performance Notes

This is a showcase piece - visual impact over performance:
- Heavy Framer Motion animations
- Rotating gradient borders
- Blur effects
- Multiple concurrent animations

Test on lower-end devices if performance becomes an issue.
