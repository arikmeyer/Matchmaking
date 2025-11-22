/**
 * Problem Spaces Data
 * Domain problem space definitions for the System Architecture Explorer.
 * Pure data - no React dependencies.
 */

import type { DomainId, ProblemSpace } from '../types';

/**
 * Problem spaces organized by domain ID.
 * Each domain contains an array of problem spaces with their definitions,
 * intermediate states, target states, and prerequisites.
 */
export const PROBLEM_SPACES: Record<DomainId, ProblemSpace[]> = {
    offer: [
        {
            id: 'modelling',
            title: 'Offer Modelling',
            subtitle: 'Universal Service Ontology',
            problem: 'Lack of a unified, flexible data model forces inconsistent representations of complex offers across markets (Energy, Telco, Insurance).',
            outcome: 'A unified, extensible Offer Data Model ontology serves as the canonical language for representing all service agreements.',
            intermediate: {
                role: 'Offer Admin as Operator',
                description: 'Humans translate domain knowledge into predefined model components using specialized configuration tools.',
                activities: [
                    'Translate domain knowledge manually',
                    'Configure Blueprints & Policies',
                    'Bridge gaps for new domains'
                ]
            },
            target: {
                role: 'Offer Admin as Supervisor',
                description: 'Generative AI models analyze diverse examples and propose schema extensions. Humans validate and refine.',
                activities: [
                    'AI analyzes docs & web pages',
                    'AI proposes schema extensions',
                    'Humans validate AI models'
                ]
            },
            prerequisites: ['Core extensible data modeling framework', 'AI model governance', 'Visualization tools']
        },
        {
            id: 'normalisation',
            title: 'Offer Normalisation',
            subtitle: 'Semantic Translation',
            problem: 'Significant manual effort and high error rates in transforming inconsistent offer data from numerous external sources.',
            outcome: 'All ingested external offer data is reliably interpreted and transformed into the canonical internal model.',
            intermediate: {
                role: 'Offer Admin as Operator',
                description: 'Admins maintain brittle, source-specific transformation rules that require frequent manual adjustment.',
                activities: [
                    'Maintain mapping rules',
                    'Write parsing scripts',
                    'Manually adjust for source changes'
                ]
            },
            target: {
                role: 'Offer Admin as Supervisor',
                description: 'Adaptive AI systems perform dynamic semantic interpretation with minimal explicit rules, learning from examples.',
                activities: [
                    'AI interprets diverse formats',
                    'AI learns translation patterns',
                    'Humans provide correction feedback'
                ]
            },
            prerequisites: ['Robust data validation', 'Advanced AI interpretation models', 'Efficient feedback loops']
        },
        {
            id: 'matching',
            title: 'Offer Matching',
            subtitle: 'Identity Disambiguation',
            problem: 'Incoming offer data lacks stable identifiers, making it difficult to link to the correct canonical offer definition.',
            outcome: 'Every external offer instance is automatically and accurately linked to its unique canonical internal definition.',
            intermediate: {
                role: 'Offer Admin as Operator',
                description: 'Systems rely on configurable heuristics. Humans manually resolve low-confidence or conflicting matches.',
                activities: [
                    'Configure matching heuristics',
                    'Manually resolve conflicts',
                    'Investigate low-confidence matches'
                ]
            },
            target: {
                role: 'Offer Admin as Supervisor',
                description: 'AI agents employ multi-modal reasoning to achieve near-perfect automated identity resolution.',
                activities: [
                    'AI analyzes multi-modal context',
                    'AI resolves identities automatically',
                    'Humans judge novel edge cases'
                ]
            },
            prerequisites: ['Rich metadata catalog', 'Entity resolution AI', 'Continuous learning loop']
        }
    ],

    optimisation: [
        {
            id: 'selection',
            title: 'Optimal Offer Selection',
            subtitle: 'Core Savings Calculation',
            problem: 'Current logic relies on simplistic cost ranking, failing to identify the truly optimal offer for a user\'s complex needs.',
            outcome: 'Every recommendation represents the maximum long-term value proposition, considering financial and non-financial factors.',
            intermediate: {
                role: 'Optimisation Admin as Operator',
                description: 'Humans define explicit scoring functions and rule sets based on simplified models of user utility.',
                activities: [
                    'Define scoring formulas',
                    'Manually rank offers',
                    'Update static cost rules'
                ]
            },
            target: {
                role: 'Optimisation Admin as Supervisor',
                description: 'Advanced engines perform comprehensive long-term value calculations, synthesizing financial projections with user utility.',
                activities: [
                    'AI calculates long-term value',
                    'AI models user utility',
                    'Humans refine scoring models'
                ]
            },
            prerequisites: ['Robust cost engine', 'User preference modeling', 'High-performance computation']
        },
        {
            id: 'decision',
            title: 'Switch Decision Assessment',
            subtitle: 'Go/No-Go Evaluation',
            problem: 'Determining whether switching is genuinely beneficial requires complex calculations that are often oversimplified.',
            outcome: 'Every proposed switch receives a rapid, definitive evaluation against configurable business rules and savings thresholds.',
            intermediate: {
                role: 'Optimisation Admin as Operator',
                description: 'Static business rules and simplified cost comparison logic manually configured and updated.',
                activities: [
                    'Configure static rules',
                    'Maintain threshold values',
                    'Update logic for market changes'
                ]
            },
            target: {
                role: 'Optimisation Admin as Supervisor',
                description: 'Stateless evaluation functions perform consistent assessments using sophisticated value calculations.',
                activities: [
                    'AI executes complex assessments',
                    'Humans define strategic rules',
                    'Humans monitor decision quality'
                ]
            },
            prerequisites: ['Flexible business rules engine', 'Audit trail', 'Clear success criteria']
        }
    ],

    case: [
        {
            id: 'monitoring',
            title: 'Event Monitoring',
            subtitle: 'State Signal Detection',
            problem: 'Detecting critical events relies on manual review or brittle keyword rules, leading to delays and missed events.',
            outcome: 'The true state and all significant lifecycle events for every contract are inferred in near real-time.',
            intermediate: {
                role: 'Case Admin as Operator',
                description: 'Systems employ pattern matching and basic classification. Significant manual review of unclassified items.',
                activities: [
                    'Define keyword rules',
                    'Manually review unclassified items',
                    'Update patterns for new events'
                ]
            },
            target: {
                role: 'Case Admin as Supervisor',
                description: 'Advanced AI models analyze communication streams holistically, inferring subtle state changes and predicting future events.',
                activities: [
                    'AI infers semantic state',
                    'AI predicts future events',
                    'Humans investigate anomalies'
                ]
            },
            prerequisites: ['Unified stream ingestion', 'Temporal reasoning AI', 'Complex event detection']
        },
        {
            id: 'orchestration',
            title: 'Workflow Orchestration',
            subtitle: 'Process Synthesis',
            problem: 'Managing complex processes is rigid. Existing tools lack flexibility to handle exceptions or adapt execution.',
            outcome: 'Business processes achieve goals through dynamically synthesized and optimized execution plans.',
            intermediate: {
                role: 'Case Admin as Operator',
                description: 'Humans explicitly model workflows as static sequences. Exception handling is pre-defined and manual.',
                activities: [
                    'Design static workflows',
                    'Manually handle exceptions',
                    'Redesign flows for new cases'
                ]
            },
            target: {
                role: 'Case Admin as Supervisor',
                description: 'AI planning agents decompose goals into task sequences, dynamically orchestrating resources and replanning for exceptions.',
                activities: [
                    'AI decomposes high-level goals',
                    'AI dynamically selects resources',
                    'AI replans for exceptions'
                ]
            },
            prerequisites: ['Goal definition language', 'AI planning framework', 'Real-time feedback loop']
        },
        {
            id: 'tasks',
            title: 'Task Management',
            subtitle: 'Work Allocation',
            problem: 'Volume and diversity of tasks overwhelm manual assignment, leading to delays and inefficient use of time.',
            outcome: 'Every task is routed to and executed by the optimal actor (human or AI) dynamically.',
            intermediate: {
                role: 'Case Admin as Operator',
                description: 'Static rules assign predefined task types. Admins manage queue prioritization manually.',
                activities: [
                    'Configure assignment rules',
                    'Manually prioritize queues',
                    'Reassign stuck tasks'
                ]
            },
            target: {
                role: 'Case Admin as Supervisor',
                description: 'AI orchestration dynamically assesses task requirements and predicts optimal assignment, automating feasible tasks.',
                activities: [
                    'AI assesses task complexity',
                    'AI predicts optimal actor',
                    'AI automates feasible tasks'
                ]
            },
            prerequisites: ['Centralized task tracking', 'Actor capability mapping', 'Advanced scheduling engine']
        }
    ],

    provider: [
        {
            id: 'config',
            title: 'Provider Configuration',
            subtitle: 'Knowledge Synthesis',
            problem: 'Maintaining accurate understanding of thousands of providers is difficult due to scattered, undocumented information.',
            outcome: 'A dynamic, self-updating internal knowledge graph serves as a high-fidelity digital twin of the provider ecosystem.',
            intermediate: {
                role: 'Provider Admin as Operator',
                description: 'Humans manually gather intelligence and configure provider attributes. Updates are reactive.',
                activities: [
                    'Manually gather intelligence',
                    'Configure provider rules',
                    'Reactively fix outdated info'
                ]
            },
            target: {
                role: 'Provider Admin as Supervisor',
                description: 'AI agents monitor sources (portals, logs) and autonomously propose validated updates to the knowledge graph.',
                activities: [
                    'AI monitors external sources',
                    'AI infers provider changes',
                    'Humans approve knowledge updates'
                ]
            },
            prerequisites: ['Knowledge graph framework', 'Web monitoring agents', 'Change detection pipelines']
        },
        {
            id: 'automation',
            title: 'API/Bot Automation',
            subtitle: 'Interface Negotiation',
            problem: 'Automating interactions is hampered by unstable portals and lack of APIs, resulting in brittle scripts.',
            outcome: 'Critical interactions are reliably automated, demonstrating self-adaptation to interface changes.',
            intermediate: {
                role: 'Bot Admin as Operator',
                description: 'Developers maintain specific API clients and scripts, updating them semi-manually when they break.',
                activities: [
                    'Write specific API clients',
                    'Debug broken scripts',
                    'Manually rewrite for changes'
                ]
            },
            target: {
                role: 'Bot Admin as Supervisor',
                description: 'Adaptive AI agents autonomously navigate interfaces, detecting changes and attempting automated repair.',
                activities: [
                    'AI navigates visual UIs',
                    'AI detects interface changes',
                    'AI self-heals scripts'
                ]
            },
            prerequisites: ['Visual UI understanding', 'Automated script repair', 'Secure execution env']
        },
        {
            id: 'extraction',
            title: 'Data Extraction',
            subtitle: 'Knowledge Distillation',
            problem: 'Critical data is buried in unstructured text, requiring inefficient manual entry or brittle templates.',
            outcome: 'Essential information in unstructured communications is automatically extracted and structured with high fidelity.',
            intermediate: {
                role: 'Extraction Admin as Operator',
                description: 'Systems rely on manually crafted rules and partial LLM usage. Humans validate and correct data.',
                activities: [
                    'Craft extraction rules',
                    'Manually validate data',
                    'Correct extraction errors'
                ]
            },
            target: {
                role: 'Extraction Admin as Supervisor',
                description: 'AI applies constantly adapting extractions. Humans focus on defining goals and validating anomalies.',
                activities: [
                    'AI detects recurring patterns',
                    'AI adapts to new formats',
                    'Humans define extraction goals'
                ]
            },
            prerequisites: ['Extraction-specialized LLMs', 'Target schema definition', 'Validation feedback system']
        }
    ],

    service: [
        {
            id: 'self-service',
            title: 'Self-Servicing',
            subtitle: 'Seamless Agency',
            problem: 'Users lack direct channels to manage routine tasks, forcing them to contact support agents.',
            outcome: 'Users achieve goals effortlessly through proactive, intuitive self-service interfaces.',
            intermediate: {
                role: 'Service Admin as Operator',
                description: 'A portal offers forms for a limited set of explicitly implemented common tasks.',
                activities: [
                    'Build static forms',
                    'Link to backend processes',
                    'Handle non-standard requests manually'
                ]
            },
            target: {
                role: 'Service Admin as Supervisor',
                description: 'AI-driven interfaces understand intent, generate interaction flows, and execute backend actions.',
                activities: [
                    'AI understands natural language',
                    'AI generates interaction flows',
                    'AI executes backend actions'
                ]
            },
            prerequisites: ['Conversational AI', 'Dynamic UI generation', 'Deep context integration']
        },
        {
            id: 'interactions',
            title: 'Service Interactions',
            subtitle: 'Cognitive Augmentation',
            problem: 'Support colleagues spend time on repetitive inquiries and routine tasks, limiting availability for complex issues.',
            outcome: 'Human colleagues, amplified by AI, resolve complex issues with speed and empathy.',
            intermediate: {
                role: 'Service Admin as Operator',
                description: 'AI provides information and suggestions. Users interact with chatbots for basic topics.',
                activities: [
                    'Review AI suggestions',
                    'Handle escalated chats',
                    'Manually search knowledge base'
                ]
            },
            target: {
                role: 'Service Admin as Supervisor',
                description: 'AI "copilot" analyzes context, automates tasks, and summarizes cases. Humans focus on relationships.',
                activities: [
                    'AI analyzes conversation context',
                    'AI automates backend tasks',
                    'Humans focus on empathy & judgment'
                ]
            },
            prerequisites: ['Real-time conversation analysis', 'Response suggestion', 'Omni-channel platform']
        }
    ],

    growth: [
        {
            id: 'guidance',
            title: 'Expert Guidance',
            subtitle: 'Generative Authority',
            problem: 'Creating a comprehensive knowledge base requires prohibitive manual research and content creation effort.',
            outcome: 'SwitchUp is the indispensable, AI-powered knowledge resource for consumers.',
            intermediate: {
                role: 'Growth Admin as Operator',
                description: 'Human experts manually research and instruct AI for content creation.',
                activities: [
                    'Manually research topics',
                    'Instruct AI for drafts',
                    'Edit and publish content'
                ]
            },
            target: {
                role: 'Growth Admin as Supervisor',
                description: 'AI monitors markets and drafts content. Human experts review and add strategic insights.',
                activities: [
                    'AI monitors market trends',
                    'AI drafts data-rich content',
                    'Humans add strategic insight'
                ]
            },
            prerequisites: ['High-quality data streams', 'Generative AI models', 'Collaborative content platform']
        },
        {
            id: 'onboarding',
            title: 'User Onboarding',
            subtitle: 'Conversion Synthesis',
            problem: 'Static onboarding fails to address diverse user concerns, leading to drop-off.',
            outcome: 'Onboarding adapts fluidly to each user, maximizing conversion rates.',
            intermediate: {
                role: 'Growth Admin as Operator',
                description: 'Humans design and A/B test variations of static onboarding funnels.',
                activities: [
                    'Design funnel variations',
                    'Run A/B tests',
                    'Analyze aggregate data'
                ]
            },
            target: {
                role: 'Growth Admin as Supervisor',
                description: 'AI agents manage end-to-end onboarding, personalizing content and steps in real-time.',
                activities: [
                    'AI personalizes journey steps',
                    'AI optimizes via reinforcement learning',
                    'Humans define conversion goals'
                ]
            },
            prerequisites: ['Real-time behavior tracking', 'Dynamic personalization', 'Reinforcement learning']
        }
    ]
};
