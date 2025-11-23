# Switchup Product Engineer Matchmaking

An interactive web application for mutual discovery between Switchup and potential Product Engineers through an immersive terminal-themed experience.

## Overview

This is a client-side React application that facilitates mutual exploration through an engaging, gamified interface. Switchup is rethinking how service-led B2C businesses operate - automation and AI-first, based on smart, safe, and lifelong trust-based relationships with users.

## What's Inside

- **Interactive Terminal** - Full CLI interface with 50+ commands, easter eggs, and a culture quiz
- **System Architecture Explorer** - Interactive explorer with 7 domains, 21 problem spaces, and architecture documentation
- **Behind the Scenes** - Vimeo-hosted videos showing real engineering challenges
- **Tech Stack Cards** - Flip cards revealing engineering bets and rationale
- **Job Documentation** - Detailed markdown docs in `/docs`

## Tech Stack

| Category    | Technology                                                          |
| ----------- | ------------------------------------------------------------------- |
| Framework   | React 19.2.0 (Concurrent features: `useTransition`, `useOptimistic`, `useDeferredValue`) |
| Language    | TypeScript 5.7.3                                                    |
| Build       | Vite 7.2.4 with @vitejs/plugin-react-swc                            |
| Styling     | Tailwind CSS 4.1.17 (CSS-first config, OKLCH colors)                |
| Animation   | Framer Motion 12.23.24 (3D transforms, layout animations)           |
| Icons       | Lucide React 0.554.0                                                |

## Quick Start

```bash
npm install    # Install dependencies
npm run dev    # Start dev server at http://localhost:5173
npm run build  # Production build to /dist
npm run preview # Preview production build
```

## Project Structure

```
src/
├── commands/                # Terminal command system
│   ├── definitions/         # Command implementations by category
│   │   ├── actions.tsx      # apply, theme, exit
│   │   ├── business.tsx     # mission, why, how, what, beliefs, team, etc.
│   │   ├── easter-eggs.tsx  # 25+ hidden fun commands
│   │   ├── feedback.tsx     # feedback command
│   │   ├── help.tsx         # help command with categories
│   │   ├── navigation.tsx   # cd, ls, cat, pwd
│   │   ├── quiz.tsx         # culture/quiz command
│   │   ├── system.tsx       # echo, date, env, history, etc.
│   │   └── index.ts         # ALL_COMMANDS array export
│   ├── registry.ts          # Command registration & lookup
│   ├── parser.ts            # Input parsing & tab completion
│   └── useCommandExecutor.ts # Hook for command execution
├── components/              # React UI components (24 exports)
├── constants/               # Data files (5 exports)
├── hooks/                   # Custom React hooks (8 exports)
├── types/                   # TypeScript definitions (3 files)
├── swup-operating-system.tsx # Main app component
├── main.tsx                 # Entry point with ThemeProvider
└── index.css                # Tailwind v4 CSS configuration
```

## Architecture

### Component Hierarchy

```
SwitchupOperatingSystem (root)
├── BootSequence              # Password-protected boot animation
├── TerminalGlowEffect        # Chromatic depth field wrapper
│   └── InteractiveTerminal   # Hero terminal (inline, with quiz support)
│       ├── useTerminalCore   # Shared terminal logic
│       └── Quiz mode         # useQuizState hook
├── ProblemSpaces             # System Architecture Explorer
│   ├── ExplorerSidebar       # Left navigation panel
│   └── ExplorerMainContent   # Right content panel
│       └── ArchitectureDocs  # 9 documentation pages
├── TechStackCard             # Tech stack with flip animation
│   └── FlipCard              # Reusable 3D flip card (Framer Motion)
├── BehindTheScenesModal      # Vimeo videos with navigation
├── ApplicationModal          # Multi-step application flow
├── TerminalGlowEffect        # Chromatic depth field wrapper
│   └── DecisionTerminal      # Footer CTA terminal
│       ├── useTerminalCore   # Shared terminal logic
│       └── Scroll-triggered  # Loading animation on scroll
└── Content sections          # Logs, convergence, mutual fit
```

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

**Terminal Window System (Reusable)**

| Component               | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `TerminalWindow`        | Complete window with all controls (recommended) |
| `TerminalWindowHeader`  | macOS-style traffic light buttons               |
| `FullscreenModal`       | Fullscreen overlay wrapper                      |
| `ExitConfirmDialog`     | Exit confirmation with humor                    |
| `TerminalGlowEffect`    | Chromatic depth field effect                    |

**Terminal Components**

| Component          | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `Terminal`         | Unified terminal component                   |
| `DecisionTerminal` | Footer CTA with scroll-triggered loading     |
| `TerminalOutput`   | Individual terminal line rendering           |

**System Architecture Explorer**

| Component             | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `ProblemSpaces`       | Main explorer container                    |
| `ExplorerSidebar`     | Left navigation with categories            |
| `ExplorerMainContent` | Right content panel                        |
| `ArchitectureDocs`    | 9 documentation content pages              |

**Tech Stack Components**

| Component       | Purpose                               |
| --------------- | ------------------------------------- |
| `TechStackCard` | Individual card with hover flip       |
| `FlipCard`      | Reusable 3D flip (Framer Motion)      |

### Custom Hooks

| Hook                   | React 19 Feature   | Purpose                                    |
| ---------------------- | ------------------ | ------------------------------------------ |
| `useTheme`             | `useTransition`    | Theme & CRT mode with non-blocking updates |
| `useTerminalLogs`      | `useDeferredValue` | Auto-scrolling log simulation              |
| `useQuizState`         | `useOptimistic`    | Quiz state with instant UI feedback        |
| `useTerminalCore`      | -                  | **Master hook** - unified terminal logic   |
| `useTerminalFocus`     | -                  | Input ref management (normal/fullscreen)   |
| `useTerminalKeyboard`  | -                  | Shared keyboard shortcuts                  |
| `useShutdown`          | -                  | Shutdown animation sequence                |
| `useWindowControls`    | -                  | Window state (fullscreen, minimize, exit)  |

### Command System

The terminal uses a modular command architecture:

```
src/commands/
├── definitions/           # 9 command definition files
│   ├── actions.tsx        # apply, theme, exit
│   ├── business.tsx       # Philosophy, beliefs, team, architecture
│   ├── easter-eggs.tsx    # 25+ hidden fun commands
│   ├── feedback.tsx       # feedback command
│   ├── help.tsx           # help with categorized output
│   ├── navigation.tsx     # cd, ls, cat, pwd (with path completion)
│   ├── quiz.tsx           # culture/quiz command
│   ├── system.tsx         # echo, date, env, history, etc.
│   └── index.ts           # ALL_COMMANDS array
├── registry.ts            # register, get, getByCategory, has
├── parser.ts              # parseCommand, findSimilarCommands
└── useCommandExecutor.ts  # Hook connecting it all
```

**Command Categories:**

| Category     | Commands                                           |
| ------------ | -------------------------------------------------- |
| `info`       | help, whoami, stack, mission, why, how, what       |
| `navigation` | cd, ls, pwd, cat                                   |
| `action`     | apply, clear, exit                                 |
| `theme`      | theme [default/matrix/cyberpunk/light]             |
| `quiz`       | culture, quiz                                      |
| `system`     | echo, date, env, history, uptime, hostname, uname  |
| `easter-egg` | 25+ hidden commands                                |

### Data Constants

| File                  | Content                                                              |
| --------------------- | -------------------------------------------------------------------- |
| `logMessages.ts`      | System log entries with levels (INFO, WARN, ERROR, SUCCESS, SYSTEM)  |
| `techStack.ts`        | Technology choices with rationale, specs, and engineering bets       |
| `quizQuestions.ts`    | Culture quiz with branching feedback                                 |
| `behindTheScenes.ts`  | Vimeo video metadata and authors                                     |
| `problemSpaces.ts`    | 7 domains with 21 problem spaces                                     |

### TypeScript Types

**Terminal Types** (`terminal.types.ts`)
```typescript
type TerminalTheme = 'default' | 'matrix' | 'cyberpunk' | 'light'
type LogEntry = { id, timestamp, level, message }
type TerminalLine = { type: 'input' | 'output' | 'system' | 'error', content }
type StackItem = { category, tool, rationale, specs[], status, icon, bet? }
type EngineeringBetContent = { title, context, tradeoff }
type QuizQuestion = { q, a, b, correct, feedback_pass, feedback_fail }
type BehindTheScenesVideo = { id, vimeoId, title, description, author, topics[], duration, featured? }
```

**Command Types** (`command.types.ts`)
```typescript
interface ParsedCommand { command, args[], raw, flags }
interface CommandOutput { type: 'output' | 'system' | 'error', content }
interface CommandContext { addOutput, clearHistory, currentDirectory, quiz, ... }
interface CommandResult { handled, preventHistoryUpdate?, clearInput? }
interface CommandDefinition { name, aliases?, description, usage?, examples?, hidden?, category, handler }
type CommandCategory = 'navigation' | 'info' | 'action' | 'theme' | 'quiz' | 'system' | 'easter-egg' | 'dev'
interface CommandRegistry { register, registerAll, get, getAll, getByCategory, getVisible, has }
```

**Problem Spaces Types** (`problemSpaces.types.ts`)
```typescript
type ViewMode = 'intermediate' | 'target'
type DomainId = 'lifecycle' | 'offer' | 'optimisation' | 'case' | 'provider' | 'service' | 'growth'
type DocId = 'challenge' | 'target' | 'overview' | 'domains' | 'philosophy' | 'beliefs' | 'team-setup' | 'role-convergence' | 'evolution'
type ExplorerItemId = DocId | DomainId
type ExplorerColor = 'cyan' | 'orange' | 'blue' | 'purple' | 'amber' | 'red' | 'pink' | 'green' | 'teal'
type ExplorerCategory = 'Architecture' | 'Organisation' | 'Domains'
interface OperationalState { role, description, activities[] }
interface ProblemSpace { id, title, subtitle, problem, outcome, intermediate, target, prerequisites[] }
interface DocItem { type: 'doc', id: DocId, title, icon, color, category, subtitle, content }
interface DomainItem { type: 'domain', id: DomainId, title, icon, color, category, spaces[] }
type ExplorerItem = DocItem | DomainItem  // Discriminated union
```

## Terminal Commands

### Philosophy (The Soul)

| Command   | Description                      |
| --------- | -------------------------------- |
| `mission` | WHY + HOW + WHAT overview        |
| `why`     | Marktfairänderung (market fairness) |
| `how`     | Freundschaftsprinzip (friendship principle) |
| `what`    | Subscription Operating System    |

### Beliefs & Team (The Heart)

| Command     | Description                                  |
| ----------- | -------------------------------------------- |
| `beliefs`   | Four core beliefs                            |
| `team`      | Problem space ownership, AI orchestration    |
| `role`      | Product Engineering role convergence         |
| `evolution` | AI Trust Gradient                            |
| `warts`     | Honest self-portrait of challenges           |

### Architecture (The Brain)

| Command        | Description                           |
| -------------- | ------------------------------------- |
| `puzzle`       | The subscription problem              |
| `architecture` | Three-layer model                     |
| `domains`      | 7 domains, 21 problem spaces          |

### Tools (The Hands)

| Command | Description                       |
| ------- | --------------------------------- |
| `stack` | Engineering bets: What we use     |

### Matchmaking

| Command   | Description                          |
| --------- | ------------------------------------ |
| `whoami`  | Your explorer profile                |
| `culture` | Mutual discovery quiz (10 questions) |
| `apply`   | Start a conversation                 |

### Utilities

| Command    | Description                 |
| ---------- | --------------------------- |
| `help`     | Show available commands     |
| `ls`       | List directory contents     |
| `cat`      | View file contents          |
| `cd`       | Change directory            |
| `pwd`      | Print working directory     |
| `env`      | Display environment vars    |
| `theme`    | Switch visual theme         |
| `feedback` | Share thoughts              |
| `clear`    | Clear terminal history      |
| `exit`     | Shutdown system             |

### Theme Options

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `theme default`   | Classic terminal green             |
| `theme matrix`    | Intense green on green-tinted dark |
| `theme cyberpunk` | Magenta/purple futuristic          |
| `theme light`     | Light mode for accessibility       |

### Easter Eggs (Hidden)

| Command                    | Effect                      |
| -------------------------- | --------------------------- |
| `konami`                   | Classic code reward         |
| `health`                   | System health check         |
| `matrix`                   | Enter the matrix theme      |
| `hire me` / `hireme`       | Eager explorer response     |
| `sudo`                     | Permission denied joke      |
| `42`                       | The answer                  |
| `vim`, `nano`, `emacs`     | Editor war jokes            |
| `git`, `npm`, `make`       | Developer humor             |
| `coffee`                   | Developer fuel              |
| `fortune`, `cowsay`        | Unix classics               |
| `neofetch`                 | System info display         |
| `ping`, `ssh`              | Network humor               |
| `sl`                       | Steam locomotive            |
| `rm`, `touch`, `mkdir`     | Dangerous commands warnings |
| `man`, `ps`, `id`          | Unix utilities              |
| `reboot`, `please`, `hack` | Various jokes               |

## System Architecture Explorer

The explorer showcases Switchup's problem domain with:

### Architecture Documentation (9 Pages)

| Doc ID             | Title                  | Description                           |
| ------------------ | ---------------------- | ------------------------------------- |
| `challenge`        | The Challenge          | Core operational scalability problem  |
| `target`           | Target State           | Subscription Operating System vision  |
| `overview`         | System Overview        | Three-layer architecture model        |
| `domains`          | Domains                | Domain-driven design approach         |
| `philosophy`       | Philosophy             | WHY / HOW / WHAT framework            |
| `beliefs`          | Beliefs                | Four core beliefs                     |
| `team-setup`       | Team Setup             | Problem space ownership               |
| `role-convergence` | Role Convergence       | Product Engineering convergence       |
| `evolution`        | Evolution              | AI Trust Gradient model               |

### Problem Space Domains (7 Domains, 21 Spaces)

| Domain       | Problem Spaces                                      |
| ------------ | --------------------------------------------------- |
| Lifecycle    | State Integrity, Business Intent, Temporal Projections |
| Offer        | Offer Modelling, Offer Normalisation, Offer Matching |
| Optimisation | Optimal Offer Selection, Switch Decision Assessment |
| Case         | Event Monitoring, Workflow Orchestration, Task Management |
| Provider     | Provider Configuration, API/Bot Automation, Data Extraction |
| Service      | Self-Servicing, Service Interactions                |
| Growth       | Expert Guidance, User Onboarding                    |

Each problem space includes:
- **Problem statement** - What challenge we're solving
- **Outcome** - Desired end state
- **Intermediate state** - Human-operated current approach
- **Target state** - AI-assisted future approach
- **Prerequisites** - Required capabilities

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

### Terminal Glow Effect
- Chromatic depth field wrapper
- Customizable glow colors per theme
- Wraps both hero and footer terminals

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
- 3D flip cards for tech stack

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

### Add Terminal Command

Create or edit a file in `src/commands/definitions/`:

```typescript
// src/commands/definitions/my-commands.tsx
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

### Add Problem Space

```typescript
// src/constants/problemSpaces.ts - Add to existing domain
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
1. Add domain ID to `DomainId` type in `src/types/problemSpaces.types.ts`
2. Add problem spaces to `PROBLEM_SPACES` in `src/constants/problemSpaces.ts`
3. Add domain entry to `EXPLORER_ITEMS` in `src/components/ProblemSpaces.tsx`

### Add Architecture Documentation

1. Add doc ID to `DocId` type in `src/types/problemSpaces.types.ts`
2. Create content component in `src/components/ArchitectureDocs.tsx`
3. Add to `EXPLORER_ITEMS` in `src/components/ProblemSpaces.tsx`

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

### Change Boot Password

```typescript
// src/components/BootSequence.tsx
if (password === 'YourNewPassword') {
```

### Add Custom Tailwind Utility

```css
/* src/index.css */
@utility my-utility {
  /* styles */
}
```

## About the Role

Switchup is looking for Product Engineers to build an AI-first platform that:
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
