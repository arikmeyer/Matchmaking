# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

Interactive matchmaking page for Switchup - a client-side React app with terminal/OS theme. No backend.

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
| Terminal commands        | `src/commands/definitions/`                        |
| Problem spaces data      | `src/constants/problemSpaces.ts`                   |
| Quiz questions           | `src/constants/quizQuestions.ts`                   |
| Tech stack + bets        | `src/constants/techStack.ts`                       |
| System logs              | `src/constants/logMessages.ts`                     |
| Type definitions         | `src/types/`                                       |
| Tailwind config          | `src/index.css` (CSS-first, no tailwind.config.js) |
| Boot password            | `src/components/BootSequence.tsx`                  |

## Import Patterns

```typescript
// Components, Hooks, Constants - barrel exports from each directory
import { BootSequence, ApplicationModal, TerminalWindow, ProblemSpaces } from './components';
import { useTheme, useQuizState, useTerminalCore } from './hooks';
import { LOG_MESSAGES, TECH_STACK, QUIZ_QUESTIONS, PROBLEM_SPACES } from './constants';

// Types - use 'type' keyword
import type { LogEntry, QuizQuestion, ProblemSpace, ExplorerItem, CommandDefinition } from './types';
```

## Architecture

### Directory Structure

```
src/
├── commands/       # Terminal command system (definitions/, registry, parser)
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
├── InteractiveTerminal    # Hero terminal (uses useTerminalCore)
│   └── Quiz mode          # useQuizState hook
├── ProblemSpaces          # System Architecture Explorer
│   ├── ExplorerSidebar    # Left navigation
│   └── ExplorerMainContent
│       └── ArchitectureDocs
├── TechStackCard          # Tech stack with flip animation
├── BehindTheScenesModal   # Vimeo videos
├── ApplicationModal       # Application flow
├── DecisionTerminal       # Footer terminal (uses useTerminalCore)
└── Content sections       # Logs, convergence, mutual fit
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

**Terminal-specific hooks** (shared between InteractiveTerminal and DecisionTerminal):

| Hook                 | Purpose                                                                   |
| -------------------- | ------------------------------------------------------------------------- |
| `useTerminalCore`    | **Main hook** - unified terminal logic (commands, history, tab completion)|
| `useTerminalFocus`   | Manages input refs for normal/fullscreen modes, auto-focus                |
| `useTerminalKeyboard`| Shared keyboard shortcuts (ArrowUp/Down, Ctrl+L/C)                        |

The `useTerminalCore` hook centralizes ALL terminal logic and is used by both InteractiveTerminal and DecisionTerminal. Configuration options:
- `enablePathCompletion` - Path completion for cd/cat/ls (InteractiveTerminal only)
- `enableAdvancedShortcuts` - Ctrl+U/K/A/E/W shortcuts (InteractiveTerminal only)
- `customApplyHandler` - Custom apply command behavior (DecisionTerminal's progress bar)
- `quiz` - Quiz integration with `useQuizState`

**Context-aware wrappers** (for TerminalWindow children):
- `ContextAwareInput` - Input that auto-selects correct ref based on fullscreen mode
- `ContextAwareClickArea` - Click area that auto-selects correct focus handler

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

Commands organized by category in `src/commands/definitions/`:
- `business.tsx` - Core Switchup content (mission, beliefs, architecture, stack)
- `easter-eggs.tsx` - Hidden fun commands
- `help.tsx` - Help command + `HELP_GROUPS` config

```typescript
// src/commands/definitions/my-command.tsx
import { defineCommand } from '../registry';

export const myCommand = defineCommand({
  name: 'mycommand',
  aliases: ['mc'],
  description: 'Does something cool',
  category: 'info', // info, navigation, system, action, theme, quiz, easter-egg, dev
  hidden: false,    // true for easter eggs
  handler: (parsed, ctx) => {
    ctx.addOutput({ type: 'output', content: 'Hello!' });
    return { handled: true };
  },
});
```

Then export from `definitions/index.ts` and add to `ALL_COMMANDS`.

### Add System Log

```typescript
// src/constants/logMessages.ts
{ level: 'INFO', message: 'Your message' }
// Levels: INFO, WARN, ERROR, SUCCESS, SYSTEM
```

### Add Tech Stack Item (with Engineering Bet)

```typescript
// src/constants/techStack.ts
{
  category: 'Category',
  tool: 'Tool Name',
  rationale: 'Why we use it',
  specs: ['Use case 1', 'Use case 2'],
  status: 'CORE',  // or 'EXPLORING'
  icon: LucideIcon,
  bet: {  // Optional - shows on card flip
    title: 'Bet Title',
    context: 'Background info',
    tradeoff: 'Trade-offs'
  }
}
```

Tech stack cards flip on hover to reveal the engineering bet. Uses `FlipCard` and `TechStackCard` components with Framer Motion 3D transforms.

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

### Add Problem Space

```typescript
// src/constants/problemSpaces.ts - Add to existing domain or create new domain
{
  id: 'unique-id',
  title: 'Problem Space Title',
  subtitle: 'Short Description',
  problem: 'The problem statement...',
  outcome: 'The desired outcome...',
  intermediate: {
    role: 'Admin as Operator',
    description: 'How humans currently handle this...',
    activities: ['Activity 1', 'Activity 2', 'Activity 3']
  },
  target: {
    role: 'Admin as Supervisor',
    description: 'How AI will assist...',
    activities: ['AI activity 1', 'AI activity 2', 'Human oversight']
  },
  prerequisites: ['Prereq 1', 'Prereq 2', 'Prereq 3']
}
```

To add a new domain or doc: update types in `problemSpaces.types.ts`, add data/content, add to `EXPLORER_ITEMS` in `ProblemSpaces.tsx`.

### Add Behind the Scenes Video

```typescript
// src/constants/behindTheScenes.ts
{
  id: 'unique-slug',
  vimeoId: '1139231458',  // From vimeo.com URL
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

**Philosophy (The Soul):** `mission`, `why`, `how`, `what`

**Beliefs & Team (The Heart):** `beliefs`, `team`, `role`, `evolution`, `warts`

**Architecture (The Brain):** `puzzle`, `architecture`, `domains`

**Tools (The Hands):** `stack`

**Matchmaking:** `whoami`, `culture`, `apply`

**Utilities:** `help`, `ls`, `cat`, `cd`, `pwd`, `env`, `theme`, `feedback`, `clear`, `exit`

**Easter eggs:** `konami`, `health`, `matrix`, `hire me`, `sudo`, `42`, `vim`, `nano`, `emacs`, `coffee`, `git`, `npm`, `make`, `neofetch`, `fortune`, `cowsay`, `sl`, `ping`, `ssh`, `man`, `ps`, `reboot`, `please`

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
// Terminal
type TerminalTheme = 'default' | 'matrix' | 'cyberpunk' | 'light'
type LogEntry = { id, timestamp, level, message }

// Content
type StackItem = { category, tool, rationale, specs[], status, icon, bet? }
type QuizQuestion = { q, a, b, correct, feedback_pass, feedback_fail }

// Problem Spaces (discriminated union)
type DomainId = 'lifecycle' | 'offer' | 'optimisation' | 'case' | 'provider' | 'service' | 'growth'
type DocId = 'challenge' | 'target' | 'overview' | 'domains' | 'philosophy' | 'beliefs' | 'team-setup' | 'role-convergence' | 'evolution'
type ExplorerCategory = 'Architecture' | 'Organisation' | 'Domains'
type ExplorerItem = DocItem | DomainItem
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
