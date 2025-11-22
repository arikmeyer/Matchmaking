/**
 * Feedback Command
 * Allows users to share their impressions without applying
 */

import React from 'react';
import { defineCommand } from '../registry';

/**
 * Feedback categories with their email subjects and descriptions
 */
const FEEDBACK_CATEGORIES: Record<string, { subject: string; description: string; emoji: string }> = {
  like: {
    subject: '[Feedback] What I liked about the terminal',
    description: 'Tell us what resonated with you',
    emoji: '💚',
  },
  improve: {
    subject: '[Feedback] Suggestion for improvement',
    description: 'Help us make this better',
    emoji: '🔧',
  },
  question: {
    subject: '[Feedback] Question about Switchup',
    description: 'Curious about something?',
    emoji: '❓',
  },
  idea: {
    subject: '[Feedback] Feature idea',
    description: 'Share your creative suggestions',
    emoji: '💡',
  },
  general: {
    subject: '[Feedback] General impression',
    description: 'Share your overall thoughts',
    emoji: '💬',
  },
};

const FEEDBACK_EMAIL = 'future-colleagues@switchup.tech';

/**
 * Generate mailto link with pre-filled subject
 */
function getMailtoLink(category: string): string {
  const cat = FEEDBACK_CATEGORIES[category] || FEEDBACK_CATEGORIES.general;
  return `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(cat.subject)}`;
}

/**
 * FEEDBACK - Share impressions without applying
 */
export const feedbackCommand = defineCommand({
  name: 'feedback',
  aliases: ['fb', 'thoughts', 'impression', 'comment'],
  description: 'Share your thoughts (no commitment)',
  usage: 'feedback [type]',
  examples: ['feedback', 'feedback like', 'feedback improve', 'feedback question'],
  category: 'action',

  handler: (parsed, ctx) => {
    const feedbackType = parsed.args[0]?.toLowerCase();

    // If a specific type is provided
    if (feedbackType && FEEDBACK_CATEGORIES[feedbackType]) {
      const category = FEEDBACK_CATEGORIES[feedbackType];
      const mailtoLink = getMailtoLink(feedbackType);

      ctx.addOutput({
        type: 'output',
        content: (
          <div className="space-y-3 font-mono text-sm">
            <div className="text-primary font-bold border-b border-default pb-1">
              {category.emoji} FEEDBACK: {feedbackType.toUpperCase()}
            </div>
            <div className="text-secondary">{category.description}</div>
            <div className="mt-3 p-3 bg-card-muted border border-default rounded">
              <a
                href={mailtoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-green hover:brightness-125 underline font-bold"
              >
                Click here to send your {feedbackType} feedback
              </a>
            </div>
            <div className="text-muted text-xs mt-2">
              Your feedback helps us improve. We read everything.
            </div>
          </div>
        ),
      });

      return { handled: true };
    }

    // Show all feedback options
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-3 font-mono text-sm">
          <div className="text-primary font-bold border-b border-default pb-1">
            FEEDBACK TERMINAL
          </div>
          <div className="text-secondary">
            Not ready to apply? No problem. We'd still love to hear from you.
          </div>

          <div className="mt-3 space-y-2">
            <div className="text-muted text-xs uppercase tracking-wider">Feedback Types:</div>
            {Object.entries(FEEDBACK_CATEGORIES).map(([key, cat]) => (
              <div key={key} className="pl-2 flex items-start gap-2">
                <span className="text-terminal-green font-bold w-20">feedback {key}</span>
                <span className="text-muted">— {cat.description} {cat.emoji}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-card-muted border border-default rounded space-y-2">
            <div className="text-secondary font-bold">Quick Feedback:</div>
            <a
              href={getMailtoLink('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-green hover:brightness-125 underline block"
            >
              Send general feedback now →
            </a>
          </div>

          <div className="text-muted text-xs mt-3 border-t border-default pt-2 space-y-1">
            <div>Why share feedback?</div>
            <div className="pl-2">• Help us improve the candidate experience</div>
            <div className="pl-2">• Let us know what resonated (or didn't)</div>
            <div className="pl-2">• Stay on our radar for future opportunities</div>
            <div className="mt-2 text-amber-500/80">
              Tip: Even "I'm not the right fit because..." is valuable feedback.
            </div>
          </div>
        </div>
      ),
    });

    return { handled: true };
  },
});
