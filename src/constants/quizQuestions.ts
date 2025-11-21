/**
 * Quiz Questions for Culture Fit Diagnostic
 * 10 questions testing alignment with SwitchUp's engineering philosophy
 */

import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        q: "You need to migrate 500 legacy integration files. The AI model gets it 80% right but hallucinates on edge cases.",
        a: "Trust but verify. Review every change to ensure correctness.",
        b: "Automate the reviewer. Build a secondary 'Linter Agent' to catch the hallucinations, then run the migration again.",
        correct: 'b',
        feedback_pass: "MATCH. Don't just write code. Build the system that writes the code.",
        feedback_fail: "MISMATCH. Manual review scales linearly. We need exponential leverage."
    },
    {
        q: "The Roadmap says 'Build Feature X'. You discover 'X' won't solve the user's actual problem, but 'Y' (which is harder) will.",
        a: "Build 'X' to deliver on the roadmap promise. Consistency and predictability are key.",
        b: "Kill 'Feature X'. Write a one-pager on why we should build 'Y' and pivot immediately.",
        correct: 'b',
        feedback_pass: "MATCH. You are the Product Owner. The roadmap is a hypothesis, not a law.",
        feedback_fail: "MISMATCH. We don't hire you to execute tickets. We hire you to solve problems."
    },
    {
        q: "We are launching a new vertical (Telco) that conflicts with our current data model (Energy).",
        a: "Spin up a separate 'Telco Service' to keep the 'Energy Core' clean and move fast.",
        b: "Refactor the Core to be 'Vertical-Agnostic', even if it delays the launch by a few weeks.",
        correct: 'b',
        feedback_pass: "MATCH. We are building the 'Universal Adapter', not a collection of consulting projects.",
        feedback_fail: "MISMATCH. Short-term speed that creates long-term fragmentation is not our way."
    },
    {
        q: "A critical 3rd-party API is undocumented and returns cryptic errors. Support isn't responding.",
        a: "Flag it as a blocker. Work on the next prioritized task until we get documentation.",
        b: "Reverse engineer the network traffic, trial-and-error the payload, and write the docs yourself.",
        correct: 'b',
        feedback_pass: "MATCH. The API is the truth. Documentation is just a hint.",
        feedback_fail: "MISMATCH. 'Blocked' is a state of mind. There is always a way."
    },
    {
        q: "You are using an AI coding assistant, but it keeps generating subtle bugs in a complex module.",
        a: "Stop using it for this task. It's faster to just write it manually than to debug the AI.",
        b: "Pause. Refactor the context you are feeding it. Create a 'Planner' sub-agent to guide the 'Coder'.",
        correct: 'b',
        feedback_pass: "MATCH. If the AI fails, it's a prompting/context failure. Fix the inputs.",
        feedback_fail: "MISMATCH. Blaming the tool doesn't scale. Mastering the tool does."
    },
    {
        q: "You shipped a new onboarding flow. How do you define success?",
        a: "Zero errors in production. The flow completed without exceptions.",
        b: "User activation increased by 30%. I know because I built the dashboard first.",
        correct: 'b',
        feedback_pass: "MATCH. Code that works but doesn't move metrics is just expensive art.",
        feedback_fail: "MISMATCH. Technical excellence is necessary but not sufficient. We need business impact."
    },
    {
        q: "You discovered a better way to handle authentication. What do you do?",
        a: "Implement it in my domain. Others will notice and ask me about it later.",
        b: "Write a short doc, demo it in standup, and help others migrate their flows.",
        correct: 'b',
        feedback_pass: "MATCH. Knowledge hoarding creates silos. We win by cross-pollinating insights.",
        feedback_fail: "MISMATCH. Individual excellence is good. Multiplying the team's capability is better."
    },
    {
        q: "You have an unproven hypothesis about automating a manual process. It might not work.",
        a: "Spec it out fully. Build a robust solution that handles all edge cases from day one.",
        b: "Build a 4-hour prototype that handles the happy path. Test with real users tomorrow.",
        correct: 'b',
        feedback_pass: "MATCH. Learn fast, fail cheap. Certainty comes from iteration, not planning.",
        feedback_fail: "MISMATCH. Over-engineering unvalidated ideas is waste. We need experimental velocity."
    },
    {
        q: "The founder asks you to 'automate contract extraction'. What do you do first?",
        a: "Research OCR libraries and start a proof-of-concept with the most popular one.",
        b: "Ask: 'What decision does this enable?' and 'What happens if we get it wrong?'",
        correct: 'b',
        feedback_pass: "MATCH. The best code is code you don't write. Understand 'why' before 'how'.",
        feedback_fail: "MISMATCH. Execution without context creates solutions searching for problems."
    },
    {
        q: "You see an opportunity to automate a painful manual process, but it's not on any roadmap.",
        a: "Propose it as a project for next quarter. Wait for prioritization and approval.",
        b: "Block out Friday afternoon. Ship a working prototype. Show the team Monday morning.",
        correct: 'b',
        feedback_pass: "MATCH. Product Engineers at SwitchUp create leverage, they don't wait for permission.",
        feedback_fail: "MISMATCH. Initiative and ownership are core to our DNA. We need people who 'go rogue' to create value."
    }
];
