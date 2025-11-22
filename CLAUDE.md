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
| System logs              | `src/constants/logMessages.ts`                     |
| Tech stack + bets        | `src/constants/techStack.ts` (bets inline)         |
| Quiz questions           | `src/constants/quizQuestions.ts`                   |
| Behind the scenes videos | `src/constants/behindTheScenes.ts`                 |
| Problem spaces data      | `src/constants/problemSpaces.ts`                   |
| Type definitions         | `src/types/` (barrel exported via index.ts)        |
| Tailwind config          | `src/index.css` (CSS-first, no tailwind.config.js) |
| Boot password            | `src/components/BootSequence.tsx`                  |
| Terminal commands        | `src/commands/definitions/` (modular system)       |
| Command registry         | `src/commands/registry.ts`                         |
| Command parser           | `src/commands/parser.ts`                           |
| Flip card component      | `src/components/FlipCard.tsx`                      |
| Tech stack card          | `src/components/TechStackCard.tsx`                 |

## Import Patterns

```typescript
// Components - barrel export
import { BootSequence, ApplicationModal, TerminalWindow, ContextAwareInput, ContextAwareClickArea, ProblemSpaces } from './components';

// Hooks - barrel export
import { useTheme, useQuizState, useWindowControls, useTerminalFocus, useTerminalKeyboard, useTerminalCore } from './hooks';

// Constants - barrel export
import { LOG_MESSAGES, TECH_STACK, QUIZ_QUESTIONS, PROBLEM_SPACES } from './constants';

// Types - use 'type' keyword
import type { LogEntry, QuizQuestion, ProblemSpace, ExplorerItem, ExplorerItemId } from './types';
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
├── InteractiveTerminal    # Hero terminal (inline, uses useTerminalCore)
│   ├── useTerminalCore    # Shared terminal logic
│   └── Quiz mode          # useQuizState hook
├── ProblemSpaces          # System Architecture Explorer
│   ├── ExplorerSidebar    # Left navigation panel
│   └── ExplorerMainContent # Right content panel
│       └── ArchitectureDocs # Doc content (Anatomy, Hierarchy, Evolution, Walkthrough)
├── TechStackCard          # Tech stack with flip animation
│   └── FlipCard           # Reusable 3D flip card (Framer Motion)
├── BehindTheScenesModal   # Vimeo videos
├── ApplicationModal       # Application flow
├── DecisionTerminal       # Footer terminal (uses useTerminalCore)
│   ├── useTerminalCore    # Shared terminal logic
│   └── Scroll-triggered   # Loading animation on scroll into view
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

Commands are now modular. Create a new file or add to an existing one in `src/commands/definitions/`:

```typescript
// src/commands/definitions/my-command.tsx
import { defineCommand } from '../registry';

export const myCommand = defineCommand({
  name: 'mycommand',
  aliases: ['mc', 'mycmd'],
  description: 'Does something cool',
  usage: 'mycommand [options]',
  examples: ['mycommand', 'mycommand --flag'],
  category: 'info', // info, navigation, system, action, theme, quiz, easter-egg, dev
  hidden: false, // Set to true for easter eggs

  handler: (parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: 'Hello from my command!',
    });
    return { handled: true };
  },
});
```

Then export from `src/commands/definitions/index.ts` and add to `ALL_COMMANDS` array.

To show in main help, add to `PRIMARY_COMMANDS` in `src/commands/definitions/help.tsx`.

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

To add a new domain:
1. Add the domain ID to `DomainId` type in `src/types/problemSpaces.types.ts`
2. Add problem spaces to `PROBLEM_SPACES` in `src/constants/problemSpaces.ts`
3. Add domain entry to `EXPLORER_ITEMS` in `src/components/ProblemSpaces.tsx`

To add a new doc page, add the doc ID to `DocId` type and create content in `ArchitectureDocs.tsx`.

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
// Terminal types
type LogEntry = { id, timestamp, level, message }
type TerminalLine = { type: 'input' | 'output' | 'system', content }
type TerminalTheme = 'default' | 'matrix' | 'cyberpunk' | 'light'
type ShutdownPhase = 'idle' | 'initiating' | 'shutting-down' | 'complete'

// Content types
type EngineeringBetContent = { title, context, tradeoff }
type StackItem = { category, tool, rationale, specs[], status, icon, bet?: EngineeringBetContent }
type QuizQuestion = { q, a, b, correct, feedback_pass, feedback_fail }
type BehindTheScenesVideo = { id, vimeoId, title, description, author, topics[], duration, featured? }

// Problem Spaces types (discriminated union with typed IDs)
type DomainId = 'offer' | 'optimisation' | 'case' | 'provider' | 'service' | 'growth'
type DocId = 'anatomy' | 'hierarchy' | 'evolution' | 'walkthrough'
type ExplorerItemId = DocId | DomainId  // Union of all valid item IDs
type ExplorerColor = 'cyan' | 'orange' | 'blue' | 'purple' | 'amber' | 'red' | 'pink' | 'green'
type ExplorerCategory = 'Architecture' | 'Resources' | 'Domains'
type ViewMode = 'intermediate' | 'target'
interface OperationalState { role, description, activities[] }
interface ProblemSpace { id, title, subtitle, problem, outcome, intermediate: OperationalState, target: OperationalState, prerequisites[] }
interface DocItem { type: 'doc', id: DocId, title, icon, color, category, content: ReactNode }
interface DomainItem { type: 'domain', id: DomainId, title, icon, color, category, spaces: ProblemSpace[] }
type ExplorerItem = DocItem | DomainItem  // Discriminated union
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
