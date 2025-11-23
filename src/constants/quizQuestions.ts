/**
 * Quiz Questions for Mutual Discovery
 * 10 questions to surface alignment (or healthy disagreement) with our approach
 */

import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        q: "You need to migrate 500 legacy integration files. The AI model gets it 80% right but hallucinates on edge cases.",
        a: "Automate the reviewer. Build a secondary 'Linter Agent' to catch the hallucinations, then run the migration again.",
        b: "Trust but verify. Review every change to ensure correctness.",
        correct: 'a',
        feedback_pass: "CLICK. Don't just write code. Build the system that writes the code.",
        feedback_fail: "TENSION. Manual review scales linearly. Here we chase exponential leverage."
    },
    {
        q: "The Roadmap says 'Build Feature X'. You discover 'X' won't solve the user's actual problem, but 'Y' (which is harder) will.",
        a: "Build 'X' to deliver on the roadmap promise. Consistency and predictability are key.",
        b: "Kill 'Feature X'. Write a one-pager on why we should build 'Y' and pivot immediately.",
        correct: 'b',
        feedback_pass: "CLICK. The roadmap is a hypothesis, not a contract. You'd own outcomes here.",
        feedback_fail: "TENSION. Here, people own problems, not tickets. That might feel chaotic."
    },
    {
        q: "We are launching a new vertical (Telco) that conflicts with our current data model (Energy).",
        a: "Spin up a separate 'Telco Service' to keep the 'Energy Core' clean and move fast.",
        b: "Refactor the Core to be 'Vertical-Agnostic', even if it delays the launch by a few weeks.",
        correct: 'b',
        feedback_pass: "CLICK. We're building the 'Universal Adapter', not a collection of one-offs.",
        feedback_fail: "TENSION. Short-term speed that creates long-term fragmentation isn't our style."
    },
    {
        q: "A critical 3rd-party API is undocumented and returns cryptic errors. Support isn't responding.",
        a: "Reverse engineer the network traffic, trial-and-error the payload, and write the docs yourself.",
        b: "Flag it as a blocker. Work on the next prioritized task until we get documentation.",
        correct: 'a',
        feedback_pass: "CLICK. The API is the truth. Documentation is just a hint.",
        feedback_fail: "TENSION. 'Blocked' is a state of mind here. There's always a way – if you dig."
    },
    {
        q: "You are using an AI coding assistant, but it keeps generating subtle bugs in a complex module.",
        a: "Stop using it for this task. It's faster to just write it manually than to debug the AI.",
        b: "Pause. Refactor the context you are feeding it. Create a 'Planner' sub-agent to guide the 'Coder'.",
        correct: 'b',
        feedback_pass: "CLICK. If the AI fails, it's a prompting/context failure. Fix the inputs.",
        feedback_fail: "TENSION. Blaming the tool doesn't scale. Mastering the tool does."
    },
    {
        q: "You shipped a new onboarding flow. How do you define success?",
        a: "User activation increased by 30%. I know because I built the dashboard first.",
        b: "Zero errors in production. The flow completed without exceptions.",
        correct: 'a',
        feedback_pass: "CLICK. Code that works but doesn't move metrics is just expensive art.",
        feedback_fail: "TENSION. Technical excellence is necessary but not sufficient. Impact matters here."
    },
    {
        q: "You discovered a better way to handle authentication. What do you do?",
        a: "Implement it in my domain. Others will notice and ask me about it later.",
        b: "Write a short doc, demo it in standup, and help others migrate their flows.",
        correct: 'b',
        feedback_pass: "CLICK. Knowledge hoarding creates silos. Cross-pollination wins.",
        feedback_fail: "TENSION. Individual excellence is good. Multiplying the team is better."
    },
    {
        q: "You have an unproven hypothesis about automating a manual process. It might not work.",
        a: "Build a 4-hour prototype that handles the happy path. Test with real users tomorrow.",
        b: "Spec it out fully. Build a robust solution that handles all edge cases from day one.",
        correct: 'a',
        feedback_pass: "CLICK. Learn fast, fail cheap. Certainty comes from iteration, not planning.",
        feedback_fail: "TENSION. Over-engineering unvalidated ideas is waste. Experimental velocity wins."
    },
    {
        q: "The founder asks you to 'automate contract extraction'. What do you do first?",
        a: "Research OCR libraries and start a proof-of-concept with the most popular one.",
        b: "Ask: 'What decision does this enable?' and 'What happens if we get it wrong?'",
        correct: 'b',
        feedback_pass: "CLICK. The best code is code you don't write. Understand 'why' before 'how'.",
        feedback_fail: "TENSION. Execution without context creates solutions searching for problems."
    },
    {
        q: "You see an opportunity to automate a painful manual process, but it's not on any roadmap.",
        a: "Block out Friday afternoon. Ship a working prototype. Show the team Monday morning.",
        b: "Propose it as a project for next quarter. Wait for prioritization and approval.",
        correct: 'a',
        feedback_pass: "CLICK. Here, people create leverage. They don't wait for permission.",
        feedback_fail: "TENSION. Initiative and ownership are core here. 'Go rogue' is a feature, not a bug."
    }
];
