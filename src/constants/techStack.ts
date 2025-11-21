/**
 * Tech Stack Configuration
 * Real tools we use with tangible descriptions and honest status indicators
 */

import { Terminal, Cpu, Database, Code, FileText, Network } from 'lucide-react';
import type { StackItem } from '../types';

export const TECH_STACK: StackItem[] = [
    {
        category: 'Workflow Engine',
        tool: 'Windmill.dev',
        rationale: 'We\'ve built production flows handling portal integration (automated logins to provider sites), service classification (routing customer requests), and order submission (cancellations, switches).',
        specs: ['Portal integration flows', 'Service classification', 'Order submission automation'],
        status: 'CORE',
        icon: Network
    },
    {
        category: 'Type Safety',
        tool: 'TypeScript + ZOD',
        rationale: 'All Windmill scripts are TypeScript with ZOD schemas validating provider responses. When an extraction returns unpredictable JSON, ZOD catches it before breaking downstream.',
        specs: ['All scripts: TypeScript + ZOD', 'Runtime schema validation', 'Also exploring: Python, Rust, Go'],
        status: 'CORE',
        icon: Code
    },
    {
        category: 'Browser Automation',
        tool: 'Playwright',
        rationale: 'We use Playwright to submit orders or connect to provider portals where no APIs exist. We put strong debugging layers in place and are experimenting with self-healing capabilities.',
        specs: ['100k+ orders submitted', 'Designed for: 100+ portals', 'Self-healing: Early experiments'],
        status: 'CORE',
        icon: Terminal
    },
    {
        category: 'Intelligence Layer',
        tool: 'Multi-Model',
        rationale: 'AI is not only fundamentally reshaping how we are building our future platform, but also the perfect solution to our core challenge: Making sense of very large volumes of unstructured data.',
        specs: ['Models: Gemini 3, Claude, others', 'Specialized sub-agents', 'Carefully crafted skills', 'LLM Ops: Langfuse for observability'],
        status: 'CORE',
        icon: Cpu
    },
    {
        category: 'Serverless Database',
        tool: 'Neon DB',
        rationale: 'We\'re exploring Neon\'s branch-per-feature pattern for database evolution. As we expand from energy to telco and streaming, testing schema changes in isolated branches before merging could be huge.',
        specs: ['Problem: Our data model is complex and evolving', 'Goal: Facilitating schema evolution'],
        status: 'EXPLORING',
        icon: Database
    },
    {
        category: 'Document Engine',
        tool: 'Vision Pipeline',
        rationale: 'We\'re experimenting with vision models to extract structured data from provider PDFs. Exploring whether a custom JSON schema per document type + provider delivers a more accurate result or a more generalised schema is sufficient.',
        specs: ['Problem: Extract data from PDFs', 'Target scale: 100ks docs/month'],
        status: 'EXPLORING',
        icon: FileText
    }
];
