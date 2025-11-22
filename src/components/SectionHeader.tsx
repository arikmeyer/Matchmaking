/**
 * SectionHeader Component
 * Styled section header with optional icon
 */

import type { ElementType } from 'react';

type SectionHeaderProps = {
    title: string;
    icon?: ElementType;
};

export function SectionHeader({ title, icon: Icon }: SectionHeaderProps) {
    return (
        <div className="flex items-center gap-3 mb-8 border-b border-default pb-2">
            {Icon && <Icon className="text-terminal-green" size={20} />}
            <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight uppercase">
                {title}
            </h2>
        </div>
    );
}
