# Switchup Product Engineer Job Board

An interactive web application showcasing the Product Engineer / Product-minded Fullstack Engineer position at Switchup.

## Overview

This repository contains both the job description documentation and an interactive preview application that presents the role in an engaging, modern format. Switchup is rethinking how service-led B2C businesses operate - automation and AI-first, based on smart, safe, and lifelong trust-based relationships with users.

## What's Inside

- **Interactive Job Board** - A React-based web application with smooth animations and modern UI
- **Job Descriptions** - Detailed markdown documentation of the role, requirements, and company mission

## Project Structure

```
/
├── src/
│   ├── components/             # React UI components
│   │   ├── ApplicationModal.tsx
│   │   ├── BootSequence.tsx
│   │   ├── GlitchText.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── VideoModal.tsx
│   │   └── index.ts
│   ├── constants/              # Data & configuration
│   │   ├── engineeringBets.ts
│   │   ├── logMessages.ts
│   │   ├── quizQuestions.ts
│   │   ├── techStack.ts
│   │   └── index.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── useQuizState.ts
│   │   ├── useShutdown.ts
│   │   ├── useTerminalLogs.ts
│   │   ├── useTheme.ts
│   │   └── index.ts
│   ├── types/                  # TypeScript definitions
│   │   ├── terminal.types.ts
│   │   └── index.ts
│   ├── swup-operating-system.tsx  # Main app component (~1500 lines)
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Tailwind & CRT effects
├── docs/                       # Job description documents
│   ├── job-description.md
│   ├── job-description_alt.md
│   ├── LEVERAGE-STRATEGY.md
│   └── UTILITIES-GUIDE.md
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
├── postcss.config.js           # PostCSS/Tailwind config
└── CLAUDE.md                   # Project development guide
```

## Tech Stack

- **React 19** - UI library with modern concurrent features
- **TypeScript** - Type safety and developer experience
- **Vite 7** - Lightning-fast build tool and dev server
- **Tailwind CSS v4** - Modern CSS-first configuration
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Icon library

## Architecture

This project has been refactored from a monolithic single-file component (~2000 lines) into a clean, modular architecture:

### Component Organization

**Components** (`src/components/`)
- `BootSequence` - Animated terminal boot screen with password authentication
- `ApplicationModal` - Multi-step application flow with token generation
- `VideoModal` - Placeholder for work session recordings
- `GlitchText` - Reusable glitch text effect component
- `SectionHeader` - Consistent section headers throughout the app

**Custom Hooks** (`src/hooks/`)
- `useTheme` - Theme and CRT mode management with React 19's `useTransition`
- `useTerminalLogs` - Auto-scrolling system log simulation
- `useQuizState` - Quiz flow state machine and score tracking
- `useShutdown` - Shutdown animation sequence with progress tracking

**Constants** (`src/constants/`)
- `logMessages` - ~100 system log entries for terminal realism
- `techStack` - Technology choices with rationale and specs
- `engineeringBets` - Engineering bets (work-in-progress technical directions)
- `quizQuestions` - Culture quiz questions with branching feedback

**Types** (`src/types/`)
- Centralized TypeScript definitions for terminal, quiz, and component types
- Ensures type safety across the entire application

### Design Principles

- **Modular & Maintainable** - Each concern separated into focused files
- **Type-Safe** - Comprehensive TypeScript coverage with centralized types
- **Reusable** - Custom hooks encapsulate complex state logic
- **Scalable** - Clear separation makes future enhancements straightforward
- **Performance-Conscious** - React 19 features like `useTransition` for non-blocking updates

## Key Features

### Interactive Terminal System
- **Full CLI Interface** - Custom command-line with `help`, `stack`, `mission`, `apply`, and more
- **Culture Quiz** - 10-question assessment with branching feedback based on score
- **Easter Eggs** - Hidden commands and achievements for curious explorers
- **Live System Logs** - Realistic terminal output with auto-scrolling and level indicators

### Visual Experience
- **Boot Sequence** - Password-protected boot animation (`SwitchMeUp`)
- **CRT Mode Toggle** - Optional vintage terminal aesthetic with scanlines and glow
- **Shutdown Sequence** - Animated power-down with progress tracking
- **Smooth Animations** - Framer Motion for all transitions and interactions

### Engagement Mechanics
- **Visit Tracking** - Console messages at milestones (3, 5, 10, 15, 20+ visits)
- **Persistent State** - localStorage for boot skip and visit history
- **Application Flow** - Two-step modal with session token generation

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server (auto-opens browser on port 5173)
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Development Guide

### Making Content Updates

**Add/Edit System Logs**
```typescript
// src/constants/logMessages.ts
export const LOG_MESSAGES = [
  { level: 'INFO', message: 'Your new log message' },
  // ...
];
```

**Update Tech Stack**
```typescript
// src/constants/techStack.ts
{
  category: 'Category Name',
  tool: 'Tool Name',
  rationale: 'What we use it for and why',
  specs: ['Use case 1', 'Use case 2'],
  status: 'CORE' | 'EXPLORING',
  icon: IconComponent
}
```

**Add Quiz Questions**
```typescript
// src/constants/quizQuestions.ts
{
  q: 'Your question?',
  a: 'Option A',
  b: 'Option B',
  correct: 'a' | 'b',
  feedback_pass: 'Correct feedback',
  feedback_fail: 'Incorrect feedback'
}
```

**Add Terminal Commands**
```typescript
// src/swup-operating-system.tsx - in InteractiveTerminal component
// Find handleCommand function and add new case to switch statement
```

### Component Customization

Each component is self-contained and can be easily modified:

- **BootSequence** - Change password, boot messages, or animation timing
- **ApplicationModal** - Modify application flow or token generation
- **Theme System** - Add new themes in `useTheme` hook
- **Quiz Flow** - Adjust scoring logic in `useQuizState` hook

### File Organization Best Practices

- **Components**: One component per file, export via `index.ts`
- **Hooks**: Single responsibility, reusable across components
- **Constants**: Data-only files, no business logic
- **Types**: Shared type definitions, imported where needed

## About the Role

Switchup is hiring Product Engineers to help build an AI-first technical platform that:

- Automates manual operational touchpoints
- Scales across multiple subscription types (energy, telco, streaming)
- Creates an environment where AI agents and humans work together seamlessly
- Serves hundreds of thousands of households with excellent service

### Key Challenges

- Building **provider and market-agnostic** architecture
- Creating **highly configurable yet robust** automated workflows
- Balancing experimentation needs with system stability

### Tech Stack at Switchup

- **Languages**: TypeScript (primary), Python, Rust/Go
- **AI**: Claude Code, Langfuse
- **Workflow Engine**: Windmill.dev
- **Browser Automation**: Playwright
- **Database**: Neon DB

## Documentation

Full job descriptions and guides are available in the [`/docs`](./docs) directory:

- [Primary Job Description](./docs/job-description.md)
- [Alternative Version](./docs/job-description_alt.md)
- [Development Guide](./CLAUDE.md) - Comprehensive project documentation for developers

## Technical Highlights

### Modern React Patterns
- **React 19** - Leveraging `useTransition` for non-blocking state updates
- **Custom Hooks** - Encapsulated state logic for reusability
- **Type Safety** - Full TypeScript coverage with centralized type definitions
- **Barrel Exports** - Clean imports via `index.ts` files

### Performance Optimizations
- **Vite 7** - Sub-second hot module replacement
- **Code Splitting** - Automatic chunk optimization
- **Lazy Loading** - Components loaded on demand
- **Memoization** - Optimized re-renders with React 19 features

### Tailwind CSS v4 Features
- **CSS-First Configuration** - Modern `@theme` directive in CSS
- **Custom Utilities** - Reusable utility classes for terminal aesthetic
- **Container Queries** - Component-level responsiveness
- **Color Mixing** - Dynamic color manipulation with `color-mix()`

### State Management
- **localStorage** - Persistent boot state and visit tracking
- **sessionStorage** - One-time hints and console messages
- **React State** - Component-level state with custom hooks
- **No External Libraries** - Clean React-only state management

## Deployment

### Production Build

The application builds to static files in `/dist`:

```bash
npm run build
# Output: dist/ directory ready for deployment
```

### Hosting Platforms

Zero-config deployment to modern platforms:

- **Vercel** - Auto-detects Vite config, instant deploys
- **Netlify** - Automatic builds from Git pushes
- **Cloudflare Pages** - Edge-optimized static hosting
- **GitHub Pages** - Free hosting for public repositories

### Build Configuration

- **Entry**: `index.html`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18+

No environment variables required - fully client-side application.

## Project Evolution

This codebase has undergone a complete architectural refactor:

**Before**: Single-file component (~2000 lines)
- All logic, data, and UI in one file
- Difficult to navigate and maintain
- Hard to reuse components

**After**: Modular architecture (~1500 lines main + focused modules)
- Clear separation of concerns
- Reusable components and hooks
- Easy to test and extend
- Better developer experience

The refactor maintains 100% feature parity while improving code quality and maintainability.

## License

Private - Not for redistribution

---

**Built with care by the Switchup team**

*Showcasing modern React architecture, TypeScript best practices, and engaging user experience design.*
