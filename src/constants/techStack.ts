/**
 * Tech Stack Configuration
 * Real tools we use with tangible descriptions and honest status indicators
 * Each item includes an optional engineering bet explaining our rationale
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
        icon: Network,
        bet: {
            title: 'Windmill.dev: Workflow Engine vs. Building Our Own',
            context: 'We\'ll run hundreds of millions of workflow instances per year. We thought about: (a) building our own workflow engine, (b) Temporal (beautiful but heavyweight), (c) Windmill (TypeScript-native, self-hostable), (d) popular no-code workflow builders like n8n.',
            tradeoff: 'We\'re going with Windmill, for now. Self-hostable and script-based flows means no vendor lock-in. Built-in observability means we\'re spending zero time building admin dashboards. The bet we\'re making: This open-source tool will mature with us. If it doesn\'t, we migrate—but the months we\'re saving by not building workflow infrastructure from scratch lets us address the core points we have in a much more rapid manner. Open question: What is a best practice setup for our scripts & flows?'
        }
    },
    {
        category: 'Type Safety',
        tool: 'TypeScript + ZOD',
        rationale: 'All Windmill scripts are TypeScript with ZOD schemas validating provider responses. When an extraction returns unpredictable JSON, ZOD catches it before breaking downstream.',
        specs: ['All scripts: TypeScript + ZOD', 'Runtime schema validation', 'Also exploring: Python, Rust, Go'],
        status: 'CORE',
        icon: Code,
        bet: {
            title: 'Schema-Driven Development: Taming Provider Chaos',
            context: 'Every provider is a black box. One returns dates as ISO strings, another as Unix timestamps. APIs change without notice. Scraped data is structurally unpredictable. TypeScript catches type errors at compile time, but production data doesn\'t care about our types.',
            tradeoff: 'We\'re using ZOD schemas as more than validation — they\'re executable documentation of provider behavior. When a provider changes their response format, the ZOD error tells us exactly what changed. The overhead: maintaining both TypeScript types AND ZOD schemas. The payoff: we catch chaos at the boundary, not three steps downstream. Open question: How do we keep 100+ provider schemas maintainable as we scale?'
        }
    },
    {
        category: 'Browser Automation',
        tool: 'Playwright',
        rationale: 'We use Playwright to submit orders or connect to provider portals where no APIs exist. We put strong debugging layers in place and are experimenting with self-healing capabilities.',
        specs: ['100k+ orders submitted', 'Designed for: 100+ portals', 'Self-healing: Early experiments'],
        status: 'CORE',
        icon: Terminal,
        bet: {
            title: 'Playwright + Self-Healing Bots: RPA at Scale',
            context: 'Energy providers don\'t have APIs (or don\'t grant us access to them). We need to eventually connect to 100+ provider portals. DOM changes break bots constantly—it\'s the nature of scraping.',
            tradeoff: 'We\'re experimenting with self-healing scripts: Playwright captures screenshots when things break, an AI sub-agent analyzes the failures, generates fixes, and commits them for review. Does it work all the time? No. Does it make our lives easier? Yes, absolutely! Our bet: AI capabilities continues increasingly rapidly (hello Gemini 3) and will continue to reduce our maintenance burden. Upfront engineering effort now to build the healing pipeline pays off at scale. What we\'d love to accomplish at some point in the not too distant future: a 90% auto-heal rate.'
        }
    },
    {
        category: 'Intelligence Layer',
        tool: 'Multi-Model',
        rationale: 'AI is not only fundamentally reshaping how we are building our future platform, but also the perfect solution to our core challenge: Making sense of very large volumes of unstructured data.',
        specs: ['Models: Gemini 3, Claude, others', 'Specialized sub-agents', 'Carefully crafted skills', 'LLM Ops: Langfuse for observability'],
        status: 'CORE',
        icon: Cpu,
        bet: {
            title: 'Mastering AI: Craft, Experimentation, and Collective Learning',
            context: 'AI capabilities are remarkable, but raw model access is just the beginning. The real work is figuring out how to leverage them effectively—crafting skills that encode domain knowledge, designing sub-agents for specific tasks, engineering context that gets reliable results while working around limitations. And the landscape shifts as models evolve.',
            tradeoff: 'We\'re betting on developing AI craft together. We experiment with prompting techniques, sub-agent architectures, and context patterns. When someone discovers what works (or fails spectacularly), we share it. Langfuse gives us observability. The alternative would be using models naively and shipping faster short-term. We believe the compound returns — better results AND accelerated personal growth for everyone — justify the investment. What we\'re navigating: balancing exploration with delivery, and ensuring we all benefit from our lessons learned.'
        }
    },
    {
        category: 'Serverless Database',
        tool: 'Neon DB',
        rationale: 'We\'re exploring Neon\'s branch-per-feature pattern for database evolution. As we expand from energy to telco and streaming, testing schema changes in isolated branches before merging could be huge.',
        specs: ['Problem: Our data model is complex and evolving', 'Goal: Facilitating schema evolution'],
        status: 'EXPLORING',
        icon: Database,
        bet: {
            title: 'Neon DB Branching: Test Schema Changes Like Git',
            context: 'Database migrations are terrifying. One wrong ALTER TABLE and production is down. We need a way to test schema changes in isolation, especially as we evolve our offer data model to support new verticals (telco, streaming, etc.) to model available offers with all their variations.',
            tradeoff: 'We\'re curious about using Neon\'s branching feature as our safety net. Create a branch, test the migration, merge if it works. Certainly, there are tradeoffs compared to plain vanilla Postgres. The win: Fast experimentation loops. The tension: Slightly higher cost vs. massive reduction in "oh shit" moments. This is still a little discovered field for us and we\'re curiously exploring whether this is a viable direction.'
        }
    },
    {
        category: 'Document Engine',
        tool: 'Vision Pipeline',
        rationale: 'We\'re experimenting with vision models to extract structured data from provider PDFs. Exploring whether a custom JSON schema per document type + provider delivers a more accurate result or a more generalised schema is sufficient.',
        specs: ['Problem: Extract data from PDFs', 'Target scale: 100ks docs/month'],
        status: 'EXPLORING',
        icon: FileText,
        bet: {
            title: 'Document Intelligence: Precision vs. Generalization at Scale',
            context: 'We need to be able to process 100k+ provider documents monthly — contract confirmations, bills, cancellation notices, price change letters. Traditional OCR fails on reality: scanned PDFs, varying layouts, German legalese. Vision models "see" documents holistically — but accuracy depends on how we structure extraction.',
            tradeoff: 'Do we build custom JSON schemas per document type and provider, or use a generic schema that handles everything? Custom schemas deliver higher accuracy — critical when wrong extraction means wrong decisions for customers. But custom means O(n) maintenance as we onboard providers. We\'re thinking about a hybrid approach: generic core with provider-specific overrides where accuracy gaps matter. What we\'re exploring: Can AI help generate and maintain schemas as providers change formats?'
        }
    }
];
