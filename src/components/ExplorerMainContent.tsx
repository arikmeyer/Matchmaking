/**
 * ExplorerMainContent Component
 * Right content panel for the System Architecture Explorer.
 * Displays breadcrumbs and either doc content or domain problem space details.
 */

import { motion, AnimatePresence } from 'framer-motion';
import {
    Folder, FileText, ChevronRight, AlertTriangle, ShieldCheck,
    Activity, Zap, ArrowRight, Layers, Cpu
} from 'lucide-react';
import type { ExplorerItem, ProblemSpace, ViewMode } from '../types';

interface ExplorerMainContentProps {
    activeItem: ExplorerItem;
    activeSpace: ProblemSpace | null;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

export function ExplorerMainContent({
    activeItem,
    activeSpace,
    viewMode,
    onViewModeChange,
}: ExplorerMainContentProps) {
    return (
        <div className="lg:col-span-9 flex flex-col bg-surface min-h-0">
            {/* Breadcrumbs */}
            <div className="h-10 border-b border-border flex items-center px-6 gap-2 text-xs font-mono text-muted">
                <span className="flex items-center gap-1">
                    {activeItem.type === 'domain' ? <Folder size={12} /> : <FileText size={12} />}
                    {activeItem.type === 'domain' ? activeItem.title : activeItem.category}
                </span>
                <ChevronRight size={12} className="text-muted" />
                <span className="flex items-center gap-1">
                    <FileText size={12} />
                    {activeItem.type === 'domain' && activeSpace ? activeSpace.title : activeItem.title}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {/* Doc view */}
                    {activeItem.type === 'doc' && (
                        <motion.div
                            key={activeItem.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-primary mb-1">{activeItem.title}</h2>
                                <p className="text-sm font-mono text-muted uppercase tracking-wider">{activeItem.subtitle}</p>
                            </div>
                            {activeItem.content}
                        </motion.div>
                    )}

                    {/* Domain view */}
                    {activeItem.type === 'domain' && activeSpace && (
                        <motion.div
                            key={activeSpace.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            {/* Header */}
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-1">{activeSpace.title}</h2>
                                <p className="text-sm font-mono text-muted uppercase tracking-wider">{activeSpace.subtitle}</p>
                            </div>

                            {/* Problem & Outcome Grid */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-5 border border-section-problem bg-section-problem rounded-xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-surface-dark/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    <h3 className="text-xs font-mono text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <AlertTriangle size={14} /> Problem Definition
                                    </h3>
                                    <p className="text-secondary text-sm leading-relaxed">
                                        {activeSpace.problem}
                                    </p>
                                </div>
                                <div className="p-5 border border-section-success bg-section-success rounded-xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-surface-dark/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    <h3 className="text-xs font-mono text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <ShieldCheck size={14} /> Intended Outcome
                                    </h3>
                                    <p className="text-secondary text-sm leading-relaxed">
                                        {activeSpace.outcome}
                                    </p>
                                </div>
                            </div>

                            {/* Operational Shift Visualization */}
                            <div className="flex-1 border border-border rounded-xl bg-surface overflow-hidden flex flex-col shadow-inner">
                                {/* Toggle Header */}
                                <div className="p-4 border-b border-border bg-surface-dark flex justify-center">
                                    <div className="flex items-center gap-0 bg-surface-dark p-1 rounded-lg border border-border relative">
                                        {/* Animated Background Slider */}
                                        <motion.div
                                            className="absolute top-1 bottom-1 left-1 rounded w-[180px] bg-card-elevated border border-border"
                                            animate={{ x: viewMode === 'intermediate' ? 0 : 212 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />

                                        <button
                                            onClick={() => onViewModeChange('intermediate')}
                                            className={`relative z-10 px-6 py-2 rounded text-xs font-mono transition-all w-[180px] flex items-center justify-center gap-2 ${viewMode === 'intermediate' ? 'text-blue-400' : 'text-muted hover:text-secondary'
                                                }`}
                                        >
                                            <Activity size={14} /> INTERMEDIATE
                                        </button>

                                        <ArrowRight size={14} className="text-muted mx-2" />

                                        <button
                                            onClick={() => onViewModeChange('target')}
                                            className={`relative z-10 px-6 py-2 rounded text-xs font-mono transition-all w-[180px] flex items-center justify-center gap-2 ${viewMode === 'target' ? 'text-green-400' : 'text-muted hover:text-secondary'
                                                }`}
                                        >
                                            <Zap size={14} /> TARGET STATE
                                        </button>
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-8 flex-1 flex flex-col justify-center relative">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={viewMode}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <div className={`text-sm font-bold mb-2 uppercase tracking-wider ${viewMode === 'intermediate' ? 'text-blue-400' : 'text-green-400'}`}>
                                                    {viewMode === 'intermediate' ? activeSpace.intermediate.role : activeSpace.target.role}
                                                </div>
                                                <p className="text-xl text-primary leading-relaxed font-light">
                                                    {viewMode === 'intermediate' ? activeSpace.intermediate.description : activeSpace.target.description}
                                                </p>
                                            </div>

                                            <div>
                                                <div className="text-xs font-mono text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                                                    <Layers size={12} /> Key Activities
                                                </div>
                                                <div className="grid md:grid-cols-3 gap-4">
                                                    {(viewMode === 'intermediate' ? activeSpace.intermediate.activities : activeSpace.target.activities).map((activity, i) => (
                                                        <div key={i} className="p-4 rounded-lg bg-surface-dark border border-border flex items-start gap-3 hover:border-border-hover transition-colors">
                                                            {viewMode === 'intermediate' ? (
                                                                <Activity size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                                            ) : (
                                                                <Zap size={16} className="text-green-500 shrink-0 mt-0.5" />
                                                            )}
                                                            <span className="text-sm text-secondary leading-snug">{activity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Prerequisites Footer */}
                            <div className="mt-auto pt-4 border-t border-border flex items-center gap-4 overflow-x-auto">
                                <span className="text-[10px] font-mono text-muted uppercase tracking-wider shrink-0 flex items-center gap-2">
                                    <Cpu size={12} /> Technical Prerequisites:
                                </span>
                                {activeSpace.prerequisites.map((req, i) => (
                                    <div key={i} className="px-2 py-1 rounded bg-surface-dark border border-border text-[10px] font-mono text-secondary whitespace-nowrap hover:border-border-hover transition-colors">
                                        {req}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
