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
├── src/                    # React application source
├── docs/                   # Job description documents
│   ├── job-description.md
│   └── job-description_alt.md
├── index.html             # Entry point
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library

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
# Start development server
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

Full job descriptions are available in the [`/docs`](./docs) directory:

- [Primary Job Description](./docs/job-description.md)
- [Alternative Version](./docs/job-description_alt.md)

## Deployment

This application is ready to deploy to modern hosting platforms:

- **Vercel** - Zero-config deployment from GitHub
- **Netlify** - Automatic builds and deployments
- **Cloudflare Pages** - Edge-optimized hosting

Simply connect your repository and the platform will auto-detect the Vite configuration.

## License

Private - Not for redistribution

---

Built with care by the Switchup team
