/**
 * useQuizState Hook
 * Manages quiz state with React 19's useOptimistic for instant UI feedback
 */

import { useState, useOptimistic, useCallback, useTransition } from 'react';
import type { QuizQuestion } from '../types';

export type QuizAnswer = {
    questionId: string;
    selectedAnswer: 'a' | 'b';
    isCorrect: boolean;
    feedback: string;
};

export type QuizState = {
    currentQuestionIndex: number;
    answers: QuizAnswer[];
    isComplete: boolean;
    score: number;
};

export function useQuizState(questions: QuizQuestion[]) {
    const [quizState, setQuizState] = useState<QuizState>({
        currentQuestionIndex: 0,
        answers: [],
        isComplete: false,
        score: 0
    });

    const [isPending, startTransition] = useTransition();

    // Optimistic state for instant UI feedback
    const [optimisticState, setOptimisticState] = useOptimistic(
        quizState,
        (state, newAnswer: QuizAnswer) => ({
            ...state,
            answers: [...state.answers, newAnswer],
            currentQuestionIndex: state.currentQuestionIndex + 1,
            score: state.score + (newAnswer.isCorrect ? 1 : 0),
            isComplete: state.currentQuestionIndex + 1 >= questions.length
        })
    );

    // Submit an answer with optimistic update
    const submitAnswer = useCallback((answer: 'a' | 'b') => {
        const currentQuestion = questions[quizState.currentQuestionIndex];
        if (!currentQuestion) return;

        const isCorrect = answer === currentQuestion.correct;
        const feedback = isCorrect ? currentQuestion.feedback_pass : currentQuestion.feedback_fail;

        const newAnswer: QuizAnswer = {
            questionId: `q${quizState.currentQuestionIndex}`,
            selectedAnswer: answer,
            isCorrect,
            feedback
        };

        // Instantly update UI with optimistic state
        setOptimisticState(newAnswer);

        // Then update actual state in transition (non-blocking)
        startTransition(() => {
            setQuizState(prev => ({
                ...prev,
                answers: [...prev.answers, newAnswer],
                currentQuestionIndex: prev.currentQuestionIndex + 1,
                score: prev.score + (isCorrect ? 1 : 0),
                isComplete: prev.currentQuestionIndex + 1 >= questions.length
            }));
        });
    }, [questions, quizState.currentQuestionIndex, setOptimisticState]);

    // Reset quiz to beginning
    const resetQuiz = useCallback(() => {
        startTransition(() => {
            setQuizState({
                currentQuestionIndex: 0,
                answers: [],
                isComplete: false,
                score: 0
            });
        });
    }, []);

    // Get current question
    const currentQuestion = questions[optimisticState.currentQuestionIndex] || null;

    // Calculate progress percentage (guard against division by zero)
    const progress = questions.length > 0
        ? (optimisticState.currentQuestionIndex / questions.length) * 100
        : 0;

    return {
        state: optimisticState,
        currentQuestion,
        progress,
        isPending,
        submitAnswer,
        resetQuiz
    };
}
