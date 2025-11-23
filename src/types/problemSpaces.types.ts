/**
 * Type definitions for the ProblemSpaces explorer components.
 * Shared between ProblemSpaces, ExplorerSidebar, ExplorerMainContent, and constants.
 */

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export type ViewMode = 'intermediate' | 'target';

/** Valid domain identifiers for problem spaces */
export type DomainId = 'lifecycle' | 'offer' | 'optimisation' | 'case' | 'provider' | 'service' | 'growth';

/** Valid document identifiers for architecture docs */
export type DocId = 'challenge' | 'target' | 'overview' | 'domains' | 'philosophy' | 'beliefs' | 'team-setup' | 'role-convergence' | 'evolution';

/** Union of all valid explorer item identifiers */
export type ExplorerItemId = DocId | DomainId;

/** Valid color values for explorer items (maps to Tailwind color classes) */
export type ExplorerColor = 'cyan' | 'orange' | 'blue' | 'purple' | 'amber' | 'red' | 'pink' | 'green' | 'teal';

/** Categories for organizing explorer items */
export type ExplorerCategory = 'Architecture' | 'Organisation' | 'Domains';

/** Operational state describing human/AI roles and activities */
export interface OperationalState {
    role: string;
    description: string;
    activities: string[];
}

export interface ProblemSpace {
    id: string;
    title: string;
    subtitle: string;
    problem: string;
    outcome: string;
    intermediate: OperationalState;
    target: OperationalState;
    prerequisites: string[];
}

/** Base properties shared by all explorer items (excluding id which is type-specific) */
interface ExplorerItemBase {
    title: string;
    icon: LucideIcon;
    color: ExplorerColor;
    category: ExplorerCategory;
}

/** Document item with React content */
export interface DocItem extends ExplorerItemBase {
    type: 'doc';
    id: DocId;
    subtitle: string;
    content: ReactNode;
}

/** Domain item with problem spaces */
export interface DomainItem extends ExplorerItemBase {
    type: 'domain';
    id: DomainId;
    spaces: ProblemSpace[];
}

/** Discriminated union for type-safe explorer items */
export type ExplorerItem = DocItem | DomainItem;
