/**
 * ProblemSpaces Component
 * System Architecture Explorer with interactive documentation.
 * Uses extracted ExplorerSidebar and ExplorerMainContent components.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Database, TrendingUp, GitPullRequest, Server, User, Zap,
    Brain, Network, Layers, Sparkles, Lightbulb, Users, GitMerge
} from 'lucide-react';
import { PROBLEM_SPACES } from '../constants';
import { TerminalWindow } from './TerminalWindow';
import { ExplorerSidebar } from './ExplorerSidebar';
import { ExplorerMainContent } from './ExplorerMainContent';
import {
    ChallengeContent,
    TargetStateContent,
    AnatomyContent,
    DomainsContent,
    PhilosophyContent,
    TeamSetupContent,
    RoleConvergenceContent,
    EvolutionContent
} from './ArchitectureDocs';
import type { ExplorerItem, ExplorerItemId, ViewMode } from '../types';

// --- Explorer Items Configuration ---

const EXPLORER_ITEMS: ExplorerItem[] = [
    // Architecture Docs
    {
        id: 'challenge',
        type: 'doc',
        title: 'Core Challenge',
        subtitle: 'Operational Scalability',
        icon: Network,
        color: 'blue',
        category: 'Architecture',
        content: <ChallengeContent />
    },
    {
        id: 'target',
        type: 'doc',
        title: 'Target State',
        subtitle: 'Subscription Operating System',
        icon: Sparkles,
        color: 'amber',
        category: 'Architecture',
        content: <TargetStateContent />
    },
    {
        id: 'anatomy',
        type: 'doc',
        title: 'System Anatomy',
        subtitle: 'Brain / Spine / Limbs',
        icon: Layers,
        color: 'orange',
        category: 'Architecture',
        content: <AnatomyContent />
    },
    {
        id: 'domains',
        type: 'doc',
        title: 'Why DDD',
        subtitle: 'Domain-Driven Design',
        icon: Database,
        color: 'amber',
        category: 'Architecture',
        content: <DomainsContent />
    },

    // Organisation
    {
        id: 'philosophy',
        type: 'doc',
        title: 'Philosophy',
        subtitle: 'Beliefs & Principles',
        icon: Lightbulb,
        color: 'blue',
        category: 'Organisation',
        content: <PhilosophyContent />
    },
    {
        id: 'team-setup',
        type: 'doc',
        title: 'Team Setup',
        subtitle: 'Problem Space Ownership',
        icon: Users,
        color: 'pink',
        category: 'Organisation',
        content: <TeamSetupContent />
    },
    {
        id: 'role-convergence',
        type: 'doc',
        title: 'Role Convergence',
        subtitle: 'Product Engineering',
        icon: GitMerge,
        color: 'blue',
        category: 'Organisation',
        content: <RoleConvergenceContent />
    },
    {
        id: 'evolution',
        type: 'doc',
        title: 'AI Collaboration',
        subtitle: 'Trust Gradient',
        icon: Brain,
        color: 'green',
        category: 'Organisation',
        content: <EvolutionContent />
    },

    // Domains
    {
        id: 'offer',
        type: 'domain',
        title: 'Offer Domain',
        icon: Database,
        color: 'blue',
        category: 'Domains',
        spaces: PROBLEM_SPACES.offer
    },
    {
        id: 'optimisation',
        type: 'domain',
        title: 'Optimisation Domain',
        icon: TrendingUp,
        color: 'amber',
        category: 'Domains',
        spaces: PROBLEM_SPACES.optimisation
    },
    {
        id: 'case',
        type: 'domain',
        title: 'Case Domain',
        icon: GitPullRequest,
        color: 'amber',
        category: 'Domains',
        spaces: PROBLEM_SPACES.case
    },
    {
        id: 'provider',
        type: 'domain',
        title: 'Provider Domain',
        icon: Server,
        color: 'red',
        category: 'Domains',
        spaces: PROBLEM_SPACES.provider
    },
    {
        id: 'service',
        type: 'domain',
        title: 'Service Domain',
        icon: User,
        color: 'pink',
        category: 'Domains',
        spaces: PROBLEM_SPACES.service
    },
    {
        id: 'growth',
        type: 'domain',
        title: 'Growth Domain',
        icon: Zap,
        color: 'green',
        category: 'Domains',
        spaces: PROBLEM_SPACES.growth
    }
];

// --- Main Component ---

export const ProblemSpaces = () => {
    const [selectedItemId, setSelectedItemId] = useState<ExplorerItemId>(EXPLORER_ITEMS[0].id);
    const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('intermediate');
    const [isMinimized, setIsMinimized] = useState(false);

    const activeItem = EXPLORER_ITEMS.find(d => d.id === selectedItemId) || EXPLORER_ITEMS[0];

    // Determine active space safely (discriminated union ensures spaces exists when type is 'domain')
    const activeSpace = activeItem.type === 'domain'
        ? (activeItem.spaces.find(s => s.id === selectedSpaceId) || activeItem.spaces[0])
        : null;

    // Handle Item Click
    const handleItemClick = (itemId: ExplorerItemId) => {
        if (selectedItemId === itemId) return;
        setSelectedItemId(itemId);

        const item = EXPLORER_ITEMS.find(d => d.id === itemId);
        if (item?.type === 'domain') {
            setSelectedSpaceId(item.spaces[0].id);
            setViewMode('intermediate');
        } else {
            setSelectedSpaceId(null);
        }
    };

    // Minimized content with ASCII art (consistent with other windows)
    const minimizedContent = (
        <div className="h-[250px] flex flex-col items-center justify-center text-center space-y-6">
            {/* ASCII Art - Brain-Spine-Limbs Architecture */}
            <motion.pre
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-500/80 text-xs leading-tight"
            >
                {`
     ◇ BRAIN ◇
        │
    ┌───┴───┐
    │ SPINE │
    └┬──┬──┬┘
     │  │  │
    ◇  ◇  ◇
`}
            </motion.pre>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
            >
                <div className="text-xl font-bold text-primary">
                    Architect is dreaming
                </div>
                <div className="text-secondary text-sm">
                    The blueprints rest, but the structure endures.
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
                className="text-terminal-green font-mono text-sm"
            >
                <span className="text-muted">$</span> ./wake_architect.sh
            </motion.div>
        </div>
    );

    return (
        <TerminalWindow
            title="./architect --explore"
            height="650px"
            showCloseButton={true}
            showMinimizeButton={true}
            showFullscreenButton={true}
            isMinimizedControlled={isMinimized}
            onMinimizeClick={() => setIsMinimized(!isMinimized)}
            onClose={() => setIsMinimized(true)}
            minimizedContent={minimizedContent}
            exitDialogTitle="Abandon the blueprints?"
            exitDialogDescription={
                <div className="text-secondary text-sm space-y-2">
                    <p>The architecture will continue evolving without you. It always does.</p>
                    <p className="text-muted text-xs italic">"The Brain orchestrates, the Spine records, and you... wander off."</p>
                </div>
            }
        >
            <div className="grid lg:grid-cols-12 flex-1 min-h-0 bg-surface-dark">
                <ExplorerSidebar
                    items={EXPLORER_ITEMS}
                    selectedItemId={selectedItemId}
                    selectedSpaceId={selectedSpaceId}
                    onItemClick={handleItemClick}
                    onSpaceClick={setSelectedSpaceId}
                />
                <ExplorerMainContent
                    activeItem={activeItem}
                    activeSpace={activeSpace}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />
            </div>
        </TerminalWindow>
    );
};
