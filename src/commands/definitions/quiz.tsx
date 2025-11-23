/**
 * Quiz Command
 * Starts the mutual discovery quiz
 *
 * Note: Quiz answer handling (a/b responses) remains in the main component
 * because it requires complex state management with useQuizState hook.
 * This command only initiates the quiz.
 */

import React from 'react';
import { defineCommand } from '../registry';
import { QUIZ_QUESTIONS } from '../../constants';

/**
 * CULTURE - Mutual discovery quiz
 * Not a test. More like a conversation to see if we click.
 */
export const cultureCommand = defineCommand({
  name: 'culture',
  aliases: ['quiz', 'match', 'fit'],
  description: 'Mutual discovery quiz (10 questions)',
  category: 'quiz',

  handler: (_parsed, ctx) => {
    // Start the quiz via context
    ctx.quiz.start();

    // Show initial quiz output
    const firstQuestion = QUIZ_QUESTIONS[0];

    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-2">
          <div className="text-primary font-bold">MUTUAL DISCOVERY :: LET'S SEE IF WE CLICK</div>
          <div className="text-muted text-xs italic mb-2">
            (Not a test. No scores. Just honest questions to surface whether we'd enjoy working together.)
          </div>
          <div className="text-muted text-xs">Answer <span className="text-terminal-green">a</span> or <span className="text-terminal-green">b</span>. Type <span className="text-terminal-green">exit</span> anytime – no hard feelings.</div>
          <div className="mt-4">
            <div className="text-primary font-bold">Q1: {firstQuestion.q}</div>
            <div className="pl-4 text-secondary">A) {firstQuestion.a}</div>
            <div className="pl-4 text-secondary">B) {firstQuestion.b}</div>
          </div>
        </div>
      ),
    });

    return { handled: true };
  },
});
