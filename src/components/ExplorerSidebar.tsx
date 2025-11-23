/**
 * ExplorerSidebar Component
 * Left navigation panel for the System Architecture Explorer.
 * Displays a file tree with categories, domains, and problem spaces.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, ChevronRight, ChevronDown, Disc, FileText } from 'lucide-react';
import type { ExplorerItem, ExplorerItemId, ExplorerColor } from '../types';

/**
 * Static color class mapping for Tailwind JIT compilation.
 * Dynamic template literals like `border-${color}-500/30` don't get scanned.
 */
const colorClasses: Record<ExplorerColor, { border: string; text: string; bg: string }> = {
    cyan: { border: 'border-section-planning', text: 'text-section-planning', bg: 'bg-section-planning' },
    blue: { border: 'border-section-planning', text: 'text-section-planning', bg: 'bg-section-planning' },
    green: { border: 'border-section-success', text: 'text-section-success', bg: 'bg-section-success' },
    amber: { border: 'border-section-focus', text: 'text-section-focus', bg: 'bg-section-focus' },
    orange: { border: 'border-section-focus', text: 'text-section-focus', bg: 'bg-section-focus' }, // Map to Focus
    red: { border: 'border-section-problem', text: 'text-section-problem', bg: 'bg-section-problem' },
    purple: { border: 'border-section-process', text: 'text-section-process', bg: 'bg-section-process' },
    teal: { border: 'border-section-process', text: 'text-section-process', bg: 'bg-section-process' }, // Map to Process
    pink: { border: 'border-section-process', text: 'text-section-process', bg: 'bg-section-process' }, // Fallback
};

interface ExplorerSidebarProps {
    items: ExplorerItem[];
    selectedItemId: ExplorerItemId;
    selectedSpaceId: string | null;
    onItemClick: (itemId: ExplorerItemId) => void;
    onSpaceClick: (spaceId: string) => void;
}

export function ExplorerSidebar({
    items,
    selectedItemId,
    selectedSpaceId,
    onItemClick,
    onSpaceClick,
}: ExplorerSidebarProps) {
    return (
        <div className="lg:col-span-3 border-r border-border bg-surface flex flex-col min-h-0">
            {/* Header */}
            <div className="p-3 border-b border-border">
                <h3 className="text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-2">
                    <Layout size={12} /> Explorer
                </h3>
            </div>

            {/* Item list */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-1">
                {items.map((item, index) => {
                    const isActive = selectedItemId === item.id;
                    const showCategory = index === 0 || item.category !== items[index - 1].category;

                    return (
                        <React.Fragment key={item.id}>
                            {/* Category header */}
                            {showCategory && item.category && (
                                <div className="px-3 py-2 mt-2 mb-1">
                                    <h4 className="text-[10px] font-mono text-muted opacity-50 uppercase tracking-widest">
                                        {item.category}
                                    </h4>
                                </div>
                            )}

                            <div className="space-y-1">
                                {/* Item button */}
                                <button
                                    onClick={() => onItemClick(item.id)}
                                    className={`
                                        w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-bold transition-all
                                        ${isActive
                                            ? `bg-surface text-primary border ${colorClasses[item.color].border}`
                                            : 'text-muted hover:text-secondary hover:bg-card-subtle border border-transparent'
                                        }
                                    `}
                                >
                                    {item.type === 'domain' ? (
                                        isActive ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                                    ) : (
                                        <Disc size={14} className={isActive ? colorClasses[item.color].text : ''} />
                                    )}

                                    {item.type === 'domain' && (
                                        <item.icon size={14} className={isActive ? colorClasses[item.color].text : ''} />
                                    )}

                                    {item.title}
                                </button>

                                {/* Sub-items (Problem Spaces) for Domains */}
                                <AnimatePresence>
                                    {isActive && item.type === 'domain' && item.spaces && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden ml-4 pl-2 border-l border-border space-y-1"
                                        >
                                            {item.spaces.map((space) => {
                                                const isSpaceActive = selectedSpaceId === space.id;
                                                return (
                                                    <button
                                                        key={space.id}
                                                        onClick={() => onSpaceClick(space.id)}
                                                        className={`
                                                            w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-mono text-left transition-all
                                                            ${isSpaceActive
                                                                ? `${colorClasses[item.color].bg} ${colorClasses[item.color].text}`
                                                                : 'text-muted hover:text-secondary'
                                                            }
                                                        `}
                                                    >
                                                        <FileText size={12} className={isSpaceActive ? 'opacity-100' : 'opacity-50'} />
                                                        {space.title}
                                                    </button>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
