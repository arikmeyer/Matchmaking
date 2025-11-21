/**
 * BehindTheScenesModal Component
 * Modal for displaying Vimeo-hosted behind the scenes videos
 * Uses shared window control components for consistency
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TerminalWindowHeader } from './TerminalWindowHeader';
import { ExitConfirmDialog } from './ExitConfirmDialog';
import type { BehindTheScenesVideo } from '../types';

type BehindTheScenesModalProps = {
    isOpen: boolean;
    onClose: () => void;
    /** Called when minimize button is clicked - should minimize the underlying window */
    onMinimize?: () => void;
    videos: BehindTheScenesVideo[];
    initialVideoIndex?: number;
};

export function BehindTheScenesModal({
    isOpen,
    onClose,
    onMinimize,
    videos,
    initialVideoIndex = 0,
}: BehindTheScenesModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialVideoIndex);
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    if (!isOpen || videos.length === 0) return null;

    const currentVideo = videos[currentIndex];
    const hasMultipleVideos = videos.length > 1;

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-surface-dark/95 backdrop-blur-md p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="w-full max-w-7xl max-h-[95vh] overflow-hidden terminal-card relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Shared header component */}
                        <TerminalWindowHeader
                            title={`BEHIND_THE_SCENES_${String(currentIndex + 1).padStart(2, '0')}.mp4`}
                            isFullscreen={true}
                            onClose={() => setShowExitConfirm(true)}
                            onMinimize={onMinimize || onClose}
                            onFullscreenToggle={onClose}
                        />

                        {/* Video Player */}
                        <div className="aspect-video bg-transparent relative">
                            <iframe
                                src={`https://player.vimeo.com/video/${currentVideo.vimeoId}?autoplay=0&title=0&byline=0&portrait=0&color=22c55e`}
                                className="absolute inset-0 w-full h-full"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                title={currentVideo.title}
                            />
                        </div>

                        {/* Video Info */}
                        <div className="p-6 space-y-4 bg-surface">
                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-500 font-bold text-sm">
                                    {currentVideo.author.avatarInitials}
                                </div>
                                <div>
                                    <div className="text-primary font-bold">{currentVideo.author.name}</div>
                                    <div className="text-xs text-muted">{currentVideo.author.role}</div>
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-primary">{currentVideo.title}</h3>
                                <p className="text-secondary text-sm leading-relaxed">
                                    {currentVideo.description}
                                </p>
                            </div>

                            {/* Topics */}
                            <div className="flex flex-wrap gap-2">
                                {currentVideo.topics.map((topic, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-surface-dark border border-default rounded-full text-xs text-secondary font-mono"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>

                            {/* Navigation (only if multiple videos) */}
                            {hasMultipleVideos && (
                                <div className="flex items-center justify-between pt-4 border-t border-default">
                                    <button
                                        onClick={goToPrev}
                                        className="flex items-center gap-2 text-muted hover:text-primary transition-colors group"
                                    >
                                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                        <span className="text-sm">Previous</span>
                                    </button>

                                    <div className="flex items-center gap-2">
                                        {videos.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentIndex(i)}
                                                className={`w-2 h-2 rounded-full transition-all ${
                                                    i === currentIndex
                                                        ? 'bg-green-500 w-6'
                                                        : 'bg-neutral-700 hover:bg-neutral-600'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={goToNext}
                                        className="flex items-center gap-2 text-muted hover:text-primary transition-colors group"
                                    >
                                        <span className="text-sm">Next</span>
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Shared exit confirmation dialog */}
            <ExitConfirmDialog
                isOpen={showExitConfirm}
                onCancel={() => setShowExitConfirm(false)}
                onConfirm={() => {
                    setShowExitConfirm(false);
                    onClose();
                }}
                title="Close the video?"
                description={
                    <div className="text-secondary text-sm space-y-2">
                        <p>You'll leave the behind-the-scenes footage.</p>
                        <p className="text-muted text-xs italic">
                            "The best insights are found by those who watch until the end."
                        </p>
                    </div>
                }
                cancelText="Keep watching"
                confirmText="Close video"
            />
        </>
    );
}
