/**
 * Quiz Command
 * Starts the culture fit diagnostic
 *
 * Note: Quiz answer handling (a/b responses) remains in the main component
 * because it requires complex state management with useQuizState hook.
 * This command only initiates the quiz.
 */

import React from 'react';
import { defineCommand } from '../registry';
import { QUIZ_QUESTIONS } from '../../constants';

/**
 * CULTURE / QUIZ - Start culture fit diagnostic
 */
export const cultureCommand = defineCommand({
  name: 'culture',
  aliases: ['quiz', 'diagnostic', 'fit'],
  description: '10-question fit diagnostic (profound)',
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
          <div className="text-terminal-green font-bold">INITIALIZING CULTURE FIT DIAGNOSTIC...</div>
          <div>Answer A or B. Type "exit" to quit.</div>
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
