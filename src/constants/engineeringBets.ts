/**
 * Engineering Bets
 */

import type { EngineeringBet } from '../types';

export const ENGINEERING_BETS: EngineeringBet[] = [
    {
        id: 'd1',
        title: 'Domain-Driven Design: Provider & Market Agnostic Architecture',
        context: 'Challenge: Scale from "Energy in Germany" to "any subscription across countries and markets". We need a data model that works for Vattenfall, E.ON, Telekom, Netflix—anything.',
        tradeoff: 'We\'re betting on DDD with a "Universal Adapter" core. It\'s adding boilerplate, we won\'t lie. Our rationale: Domain logic is staying clean while provider adapters handle the complexity of provider offers, rules & requirements. The tension we\'re navigating: More upfront complexity now, but we believe it gives us exponential scalability later. What we\'re still figuring out: How do we keep adapters maintainable to handle 1000+ providers?'
    },
    {
        id: 'd2',
        title: 'Windmill.dev: Workflow Engine vs. Building Our Own',
        context: 'We\'ll run hundreds of millions of workflow instances per year. We thought about: (a) building our own workflow engine, (b) Temporal (beautiful but heavyweight), (c) Windmill (TypeScript-native, self-hostable), (d) popular no-code workflow builders like n8n.',
        tradeoff: 'We\'re going with Windmill, for now. Self-hostable and script-based flows means no vendor lock-in. Built-in observability means we\'re spending zero time building admin dashboards. The bet we\'re making: This open-source tool will mature with us. If it doesn\'t, we migrate—but the months we\'re saving by not building workflow infrastructure from scratch lets us address the core points we have in a much more rapid manner. Open question: What is a best practice setup for our scripts & flows?'
    },
    {
        id: 'd3',
        title: 'AI-Augmented Support: Trust Over Pure Automation',
        context: 'Pure AI chatbots hallucinate. Pure human support doesn\'t scale given the complexity of our business. We serve hundreds of thousands of households — each contract is a puzzle with dozens of pieces, and we\'re often missing many of them. How do we make the right decision on behalf of users when we have incomplete information? And how do we enable our service colleagues to focus their energy on building trust-based relationships rather than on repetitive tasks?',
        tradeoff: 'We\'re building an "AI drafts, human approves" workflow. AI agents are handling roughly 80% of the grunt work (parsing emails, drafting responses, filling forms). Humans review and sign off. We\'re using Langfuse to trace every LLM "thought chain". The tension: Not as fast as pure automation, but we\'re keeping the trust. What we\'re experimenting with: Can we support humans to spot AI errors faster, or do we need dynamic confidence thresholds?'
    },
    {
        id: 'd4',
        title: 'Neon DB Branching: Test Schema Changes Like Git',
        context: 'Database migrations are terrifying. One wrong ALTER TABLE and production is down. We need a way to test schema changes in isolation, especially as we evolve our offer data model to support new verticals (telco, streaming, etc.) to model available offers with all their variations.',
        tradeoff: 'We\'re keen on using Neon\'s branching feature as our safety net. Create a branch, test the migration, merge if it works. Certainly, there are tradeoffs compared to plain vanilla Postgres. The win: Fast experimentation loops. The tension: Slightly higher cost vs. massive reduction in "oh shit" moments. This is still a little discovered field for us and we\'re curiously exploring whether this scales as our data grows.'
    },
    {
        id: 'd5',
        title: 'Playwright + Self-Healing Bots: RPA at Scale',
        context: 'Energy providers don\'t have APIs (or don\'t grant us access to them). We need to eventually connect to 100+ provider portals. DOM changes break bots constantly—it\'s the nature of scraping.',
        tradeoff: 'We\'re experimenting with self-healing scripts: Playwright captures screenshots when things break, an AI sub-agent analyzes the failures, generates fixes, and commits them for review. Does it work all the time? No. Does it make our lives easier? Yes, absolutely! Our bet: AI capabilities continues increasingly rapidly (hello Gemini 3!) and will continue to reduce our maintenance burden. Upfront engineering effort now to build the healing pipeline pays off at scale. What we\'d love to accomplish at some point in the not too distant future: a 90% auto-heal rate.'
    },
    {
        id: 'd6',
        title: 'Configurability vs. Robustness: The Eternal Struggle',
        context: 'Every market has quirks. German energy contracts have different cancellation rules than telco. Each provider defines their own custom processes, policies, and requirements. We need workflows that are flexible enough to handle this variety without sacrificing robustness. The question that haunts us: How configurable is too configurable?',
        tradeoff: 'We\'re designing a "configuration layer" on top of workflows: JSON-driven rules that non-engineers can edit (cancellation windows, notification templates, escalation paths). But we\'re locking down core logic in TypeScript to prevent config drift. The philosophy: Engineers own the engine, ops owns the knobs. What we\'re still iterating on: Where exactly is the line between "config" and "code"? We\'re learning this boundary by pushing against it.'
    }
];
