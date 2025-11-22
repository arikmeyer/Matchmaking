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
  stackCommand,
  missionCommand,
  challengesCommand,
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
  whyCommand,
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
  stackCommand,
  missionCommand,
  challengesCommand,
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
  whyCommand,
} from './easter-eggs';

export const ALL_COMMANDS = [
  // Core info commands (visible in help)
  helpCommand,
  stackCommand,
  missionCommand,
  challengesCommand,
  whoamiCommand,

  // Navigation commands
  pwdCommand,
  cdCommand,
  lsCommand,
  catCommand,

  // System commands
  echoCommand,
  dateCommand,
  historyCommand,
  envCommand,
  clearCommand,

  // Action commands
  applyCommand,
  feedbackCommand,
  themeCommand,
  exitCommand,

  // Quiz command
  cultureCommand,

  // Hidden system commands
  uptimeCommand,
  hostnameCommand,
  unameCommand,

  // Easter eggs (all hidden)
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
  whyCommand,
];
