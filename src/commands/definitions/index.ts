/**
 * Command Definitions - Central export point
 *
 * All command definitions are exported from here.
 * Import this file to register all commands with the registry.
 */

// Help command
export { helpCommand } from './help';

// Navigation commands
export {
  pwdCommand,
  cdCommand,
  lsCommand,
  catCommand,
  HOME_DIR,
  getPathCompletions,
} from './navigation';

// System commands (ENV_VARIABLES exported below)
export {
  echoCommand,
  dateCommand,
  historyCommand,
  envCommand,
  clearCommand,
  whoamiCommand,
  uptimeCommand,
  hostnameCommand,
  unameCommand,
  ENV_VARIABLES,
} from './system';

// Business commands (Switchup-specific)
export {
  // Philosophy (The Soul)
  whyCommand,
  howCommand,
  whatCommand,
  missionCommand,
  // Beliefs & Team (The Heart)
  beliefsCommand,
  teamCommand,
  evolutionCommand,
  wartsCommand,
  // Architecture (The Brain)
  puzzleCommand,
  architectureCommand,
  domainsCommand,
  challengesCommand,
  // Role (The Shape)
  roleCommand,
  // Tools (The Hands)
  stackCommand,
} from './business';

// Action commands
export {
  applyCommand,
  themeCommand,
  exitCommand,
} from './actions';

// Feedback command
export { feedbackCommand } from './feedback';

// Quiz command
export { cultureCommand } from './quiz';

// Easter egg commands
export {
  konamiCommand,
  sudoCommand,
  matrixCommand,
  hireMeCommand,
  healthCommand,
  vimCommand,
  nanoCommand,
  emacsCommand,
  coffeeCommand,
  answerCommand,
  helloCommand,
  thanksCommand,
  hackCommand,
  rmCommand,
  touchCommand,
  makeCommand,
  gitCommand,
  npmCommand,
  neofetchCommand,
  pingCommand,
  fortuneCommand,
  cowsayCommand,
  slCommand,
  sshCommand,
  manCommand,
  psCommand,
  idCommand,
  rebootCommand,
  whoopsCommand,
  pleaseCommand,
  // whyCommand moved to business.tsx as main philosophy command
} from './easter-eggs';

/**
 * All command definitions as an array
 * Use this to register all commands at once
 */
import { helpCommand } from './help';
import {
  pwdCommand,
  cdCommand,
  lsCommand,
  catCommand,
} from './navigation';
import {
  echoCommand,
  dateCommand,
  historyCommand,
  envCommand,
  clearCommand,
  whoamiCommand,
  uptimeCommand,
  hostnameCommand,
  unameCommand,
} from './system';
import {
  whyCommand,
  howCommand,
  whatCommand,
  missionCommand,
  beliefsCommand,
  teamCommand,
  evolutionCommand,
  wartsCommand,
  puzzleCommand,
  architectureCommand,
  domainsCommand,
  challengesCommand,
  roleCommand,
  stackCommand,
} from './business';
import {
  applyCommand,
  themeCommand,
  exitCommand,
} from './actions';
import { feedbackCommand } from './feedback';
import { cultureCommand } from './quiz';
import {
  konamiCommand,
  sudoCommand,
  matrixCommand,
  hireMeCommand,
  healthCommand,
  vimCommand,
  nanoCommand,
  emacsCommand,
  coffeeCommand,
  answerCommand,
  helloCommand,
  thanksCommand,
  hackCommand,
  rmCommand,
  touchCommand,
  makeCommand,
  gitCommand,
  npmCommand,
  neofetchCommand,
  pingCommand,
  fortuneCommand,
  cowsayCommand,
  slCommand,
  sshCommand,
  manCommand,
  psCommand,
  idCommand,
  rebootCommand,
  whoopsCommand,
  pleaseCommand,
} from './easter-eggs';

export const ALL_COMMANDS = [
  // ═══════════════════════════════════════════════════════════════
  // PHILOSOPHY (The Soul) - Visible in help
  // ═══════════════════════════════════════════════════════════════
  missionCommand, // Overview: Why + How + What
  whyCommand, // Marktfairänderung
  howCommand, // Freundschaftsprinzip
  whatCommand, // Subscription Operating System

  // ═══════════════════════════════════════════════════════════════
  // BELIEFS & TEAM (The Heart) - Visible in help
  // ═══════════════════════════════════════════════════════════════
  beliefsCommand, // Four beliefs
  teamCommand, // Problem space ownership, AI orchestrator
  roleCommand, // Product Engineering (role convergence)
  evolutionCommand, // AI Trust Gradient
  wartsCommand, // Honest self-portrait

  // ═══════════════════════════════════════════════════════════════
  // ARCHITECTURE (The Brain) - Visible in help
  // ═══════════════════════════════════════════════════════════════
  puzzleCommand, // The problem we're solving
  architectureCommand, // Three-layer model
  domainsCommand, // 7 domains, 21 problem spaces

  // ═══════════════════════════════════════════════════════════════
  // TOOLS (The Hands) - Visible in help
  // ═══════════════════════════════════════════════════════════════
  stackCommand, // Engineering bets

  // ═══════════════════════════════════════════════════════════════
  // MATCHMAKING - Visible in help
  // ═══════════════════════════════════════════════════════════════
  whoamiCommand, // Explorer profile
  cultureCommand, // Mutual discovery quiz

  // ═══════════════════════════════════════════════════════════════
  // CORE UTILITIES - Visible in help
  // ═══════════════════════════════════════════════════════════════
  helpCommand,
  applyCommand,
  feedbackCommand,
  themeCommand,
  exitCommand,

  // ═══════════════════════════════════════════════════════════════
  // NAVIGATION - Visible in help
  // ═══════════════════════════════════════════════════════════════
  pwdCommand,
  cdCommand,
  lsCommand,
  catCommand,

  // ═══════════════════════════════════════════════════════════════
  // SYSTEM - Hidden but functional
  // ═══════════════════════════════════════════════════════════════
  echoCommand,
  dateCommand,
  historyCommand,
  envCommand,
  clearCommand,
  uptimeCommand,
  hostnameCommand,
  unameCommand,
  challengesCommand, // Hidden alias for architecture

  // ═══════════════════════════════════════════════════════════════
  // EASTER EGGS - All hidden
  // ═══════════════════════════════════════════════════════════════
  konamiCommand,
  sudoCommand,
  matrixCommand,
  hireMeCommand,
  healthCommand,
  vimCommand,
  nanoCommand,
  emacsCommand,
  coffeeCommand,
  answerCommand,
  helloCommand,
  thanksCommand,
  hackCommand,
  rmCommand,
  touchCommand,
  makeCommand,
  gitCommand,
  npmCommand,
  neofetchCommand,
  pingCommand,
  fortuneCommand,
  cowsayCommand,
  slCommand,
  sshCommand,
  manCommand,
  psCommand,
  idCommand,
  rebootCommand,
  whoopsCommand,
  pleaseCommand,
];
