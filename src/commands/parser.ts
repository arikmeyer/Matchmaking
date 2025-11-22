/**
 * Command Parser
 * Parses raw terminal input into structured command data
 */

import type { ParsedCommand } from '../types';

/**
 * Parse a raw input string into a structured command
 *
 * Features:
 * - Handles quoted strings (preserves spaces within quotes)
 * - Extracts flags (-f, --flag, --key=value)
 * - Normalizes command name to lowercase
 * - Preserves original raw input
 *
 * @example
 * parseCommand('cat "my file.txt" -n')
 * // Returns:
 * // {
 * //   command: 'cat',
 * //   args: ['my file.txt'],
 * //   flags: { n: true },
 * //   raw: 'cat "my file.txt" -n'
 * // }
 */
export function parseCommand(input: string): ParsedCommand {
  const raw = input;
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      command: '',
      args: [],
      flags: {},
      raw,
    };
  }

  // Tokenize the input, respecting quotes
  const tokens = tokenize(trimmed);

  if (tokens.length === 0) {
    return {
      command: '',
      args: [],
      flags: {},
      raw,
    };
  }

  // First token is the command
  const command = tokens[0].toLowerCase();
  const remainingTokens = tokens.slice(1);

  // Separate args and flags
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (const token of remainingTokens) {
    if (token.startsWith('--')) {
      // Long flag: --flag or --key=value
      const withoutDashes = token.slice(2);
      const equalsIndex = withoutDashes.indexOf('=');

      if (equalsIndex !== -1) {
        const key = withoutDashes.slice(0, equalsIndex);
        const value = withoutDashes.slice(equalsIndex + 1);
        flags[key] = value;
      } else {
        flags[withoutDashes] = true;
      }
    } else if (token.startsWith('-') && token.length > 1 && !isNumeric(token)) {
      // Short flag(s): -f or -abc (multiple flags)
      const flagChars = token.slice(1);
      for (const char of flagChars) {
        flags[char] = true;
      }
    } else {
      // Regular argument
      args.push(token);
    }
  }

  return {
    command,
    args,
    flags,
    raw,
  };
}

/**
 * Tokenize input string, respecting quoted strings
 */
function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (inQuotes) {
      if (char === quoteChar) {
        // End of quoted string
        inQuotes = false;
        quoteChar = '';
      } else {
        current += char;
      }
    } else {
      if (char === '"' || char === "'") {
        // Start of quoted string
        inQuotes = true;
        quoteChar = char;
      } else if (char === ' ' || char === '\t') {
        // Whitespace - end current token
        if (current) {
          tokens.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }
  }

  // Don't forget the last token
  if (current) {
    tokens.push(current);
  }

  return tokens;
}

/**
 * Check if a string is numeric (including negative numbers)
 */
function isNumeric(str: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(str);
}

/**
 * Join arguments back into a string (useful for commands like echo)
 */
export function joinArgs(args: string[]): string {
  return args.join(' ');
}

/**
 * Check if a flag is set
 */
export function hasFlag(parsed: ParsedCommand, flag: string): boolean {
  return flag in parsed.flags;
}

/**
 * Get a flag value (returns undefined if not set, true if boolean flag)
 */
export function getFlagValue(
  parsed: ParsedCommand,
  flag: string
): string | boolean | undefined {
  return parsed.flags[flag];
}

/**
 * Get the first argument, or undefined if none
 */
export function getFirstArg(parsed: ParsedCommand): string | undefined {
  return parsed.args[0];
}

/**
 * Check if the command matches (case-insensitive)
 * Supports checking multiple possible names
 */
export function commandMatches(
  parsed: ParsedCommand,
  ...names: string[]
): boolean {
  const cmd = parsed.command.toLowerCase();
  return names.some((name) => name.toLowerCase() === cmd);
}

/**
 * Create a "command not found" message
 */
export function commandNotFound(command: string): string {
  return `Command not found: ${command}. Try "help".`;
}

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy command matching / "Did you mean?" suggestions
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  // Initialize first column
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // Initialize first row
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Find similar commands based on Levenshtein distance
 * Returns commands with distance <= maxDistance, sorted by distance
 */
export function findSimilarCommands(
  input: string,
  commands: string[],
  maxDistance: number = 2
): string[] {
  const inputLower = input.toLowerCase();

  const matches = commands
    .map(cmd => ({
      command: cmd,
      distance: levenshteinDistance(inputLower, cmd.toLowerCase()),
    }))
    .filter(({ distance }) => distance <= maxDistance && distance > 0)
    .sort((a, b) => a.distance - b.distance);

  // Return unique commands (first occurrence wins)
  const seen = new Set<string>();
  return matches
    .filter(({ command }) => {
      const lower = command.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    })
    .map(({ command }) => command);
}
