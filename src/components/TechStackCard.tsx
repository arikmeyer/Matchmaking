/**
 * TechStackCard Component
 * Displays a tech stack item with flip animation to reveal engineering bet
 */

import { motion } from 'framer-motion';
import { FlipCard } from './FlipCard';
import type { StackItem } from '../types';

interface TechStackCardProps {
    item: StackItem;
    index: number;
}

export function TechStackCard({ item, index }: TechStackCardProps) {
    const isCore = item.status === 'CORE';

    const frontContent = (
        <div
            className="h-full bg-surface border border-default rounded-xl overflow-hidden transition-all duration-300 hover:border-border-hover hover:shadow-lg"
        >
            {/* Status Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <div
                    className={`w-2 h-2 rounded-full ${isCore ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'} animate-pulse`}
                />
                <span
                    className={`text-[10px] font-mono ${isCore ? 'text-green-500' : 'text-blue-500'} tracking-wider`}
                >
                    {item.status}
                </span>
            </div>

            <div className="p-6 space-y-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start gap-3">
                    <div
                        className={`p-3 bg-surface-dark border border-default rounded-lg group-hover:bg-surface ${isCore ? 'group-hover:text-green-400' : 'group-hover:text-blue-400'} transition-colors`}
                    >
                        <item.icon size={24} />
                    </div>
                    <div>
                        <h3
                            className={`text-xl font-bold text-primary ${isCore ? 'group-hover:text-green-400' : 'group-hover:text-blue-400'} transition-colors`}
                        >
                            {item.tool}
                        </h3>
                        <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">
                            {item.category}
                        </p>
                    </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2">
                    {item.specs.map((spec, j) => (
                        <div
                            key={j}
                            className="tag-bg border border-default rounded px-2 py-1 text-[10px] font-mono text-secondary flex items-center gap-2"
                        >
                            <div
                                className={`w-1 h-1 rounded-full ${isCore ? 'bg-green-500/50' : 'bg-blue-500/50'}`}
                            />
                            {spec}
                        </div>
                    ))}
                </div>

                {/* Rationale */}
                <div className="flex-1">
                    <p className="text-sm text-secondary leading-relaxed group-hover:text-primary transition-colors">
                        {item.rationale}
                    </p>
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity" />
        </div>
    );

    const backContent = (
        <div
            className="h-full bg-surface rounded-xl overflow-hidden border border-border shadow-lg"
        >
            <div className="p-5 space-y-3 h-full flex flex-col">
                {/* Back Header */}
                <div className="flex items-center gap-2">
                    <div
                        className={`w-2 h-2 rounded-full ${isCore ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}
                    />
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                        Engineering Bet
                    </span>
                </div>

                {/* Bet Title */}
                <h3
                    className={`text-base font-bold leading-tight ${isCore ? 'text-green-400' : 'text-blue-400'}`}
                >
                    {item.bet?.title ?? item.tool}
                </h3>

                {/* Context */}
                <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
                    <p className="text-xs text-secondary leading-relaxed">
                        {item.bet?.context}
                    </p>

                    {/* Tradeoff */}
                    <div className="pt-2 border-t border-default">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1 h-1 rounded-full bg-amber-500" />
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                                The Trade-off
                            </span>
                        </div>
                        <p className="text-xs text-secondary leading-relaxed">
                            {item.bet?.tradeoff}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    // If no bet, render front only without flip
    if (!item.bet) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
            >
                {frontContent}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <FlipCard
                front={frontContent}
                back={backContent}
                className="h-[420px]"
            />
        </motion.div>
    );
}
