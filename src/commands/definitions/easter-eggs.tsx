/**
 * Easter Egg Commands
 * Hidden commands for curious developers to discover
 */

import React from 'react';
import { defineCommand } from '../registry';

/**
 * KONAMI - Classic konami code easter egg
 */
export const konamiCommand = defineCommand({
  name: 'konami',
  aliases: ['up up down down left right left right b a'],
  description: 'Classic easter egg',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="text-terminal-green space-y-2">
          <div>Achievement Unlocked: "Konami Commander"</div>
          <div className="text-xs text-muted">You know the classics. We like that.</div>
          <div className="text-muted mt-2">+30 Curiosity Points (we track those)</div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * SUDO - Permission denied (with humor)
 */
export const sudoCommand = defineCommand({
  name: 'sudo',
  description: 'Execute with superuser privileges',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="font-mono text-sm space-y-2">
          <div className="text-muted">[sudo] password for guest:</div>
          <div className="text-section-problem">Permission denied.</div>

          <div className="mt-2 text-secondary">Access requires mutual agreement. Three paths:</div>
          <div className="pl-4 text-muted">1. Run 'apply' (email us directly)</div>
          <div className="pl-4 text-muted">2. Click 'Initialize Application' (fancy modal)</div>
          <div className="pl-4 text-muted">3. Keep exploring, find easter eggs, maybe we click</div>

          <div className="mt-2 text-muted text-xs">
            Protip: We actually read every message. No AI screening here.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * MATRIX / SALARY - Wake up Neo
 */
export const matrixCommand = defineCommand({
  name: 'matrix',
  aliases: ['salary'],
  description: 'Follow the white rabbit',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="text-terminal-green font-bold animate-pulse">
          Wake up, Neo... <br />
          The subscription matrix has you. <br />
          Follow the white terminal prompt.
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * HIRE ME - Confidence detector
 */
export const hireMeCommand = defineCommand({
  name: 'hire me',
  aliases: ['hireme', 'hire', 'hired'],
  description: 'Express interest',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="text-terminal-green space-y-2">
          <div>Confidence detected. We like it.</div>
          <div className="text-secondary">
            Run <span className="text-terminal-green">apply</span> to make it official.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * HEALTH - Company health experiment
 */
export const healthCommand = defineCommand({
  name: 'health',
  description: 'Health initiatives',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="text-secondary">
          Experimenting... <br />
          <span className="text-muted">
            Fun fact: We not only experiment with our ways of working, but also
            with innovative approaches to supporting health.
          </span>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * VIM / NANO / EMACS - Editor wars
 */
export const vimCommand = defineCommand({
  name: 'vim',
  aliases: ['vi', 'nvim'],
  description: 'Text editor',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div className="space-y-1">
          <div>You've entered vim.</div>
          <div className="text-secondary">Good luck exiting.</div>
          <div className="text-muted text-sm mt-2">
            (Just kidding. Type <span className="text-terminal-green">:q</span> or press Escape then <span className="text-terminal-green">:q!</span>)
          </div>
          <div className="text-muted text-sm">
            At Switchup, we don't judge your editor choice. Much.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

export const nanoCommand = defineCommand({
  name: 'nano',
  description: 'Text editor',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content:
        'nano: Even nano users are welcome here. No judgment. (Okay, a little judgment.)',
    });
    return { handled: true };
  },
});

export const emacsCommand = defineCommand({
  name: 'emacs',
  description: 'Text editor / operating system',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: 'M-x apply RET',
    });
    return { handled: true };
  },
});

/**
 * COFFEE / BREW - Developer fuel
 */
export const coffeeCommand = defineCommand({
  name: 'coffee',
  aliases: ['brew', 'cafe'],
  description: 'Developer fuel',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <pre className="whitespace-pre font-mono text-secondary">
          {`
    ( (
     ) )
  ........
  |      |]
  \\      /
   '----'

Brewing...

Office perk: Great coffee and even better matcha at Maybachufer
(Come by. The espresso machine doesn't judge quantity)`}
        </pre>
      ),
    });
    return { handled: true };
  },
});

/**
 * 42 - The answer
 */
export const answerCommand = defineCommand({
  name: '42',
  description: 'The answer',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div>
          <div className="text-secondary">
            The Answer to Life, the Universe, and Everything.
          </div>
          <div className="text-muted mt-1">
            Also the answer to: "How many problem spaces do we have?"
          </div>
          <div className="text-muted">Well, 21 actually. Across 7 domains. But who's counting?</div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * HELLO / HI - Greetings
 */
export const helloCommand = defineCommand({
  name: 'hello',
  aliases: ['hi', 'hey', 'howdy', 'hola'],
  description: 'Say hello',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div>
          <div>Hello!</div>
          <div className="text-muted mt-1">
            I'm the Switchup matchmaking terminal. Here to help us figure out
            if we'd click.
          </div>
          <div className="text-muted mt-1">
            Try 'help' to see available commands, or jump straight to 'culture'
            for mutual discovery.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * THANKS - Politeness points
 */
export const thanksCommand = defineCommand({
  name: 'thanks',
  aliases: ['thank', 'ty', 'thank you', 'thx'],
  description: 'Express gratitude',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div>
          <div>You're welcome!</div>
          <div className="text-terminal-green text-sm mt-1">
            +5 politeness points (we notice these things)
          </div>
          <div className="text-muted text-sm">
            (Politeness goes a long way in small teams)
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * HACK - Nice try
 */
export const hackCommand = defineCommand({
  name: 'hack',
  aliases: ['hacker', 'hackermode'],
  description: 'Hack the system',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div>
          <div className="text-terminal-green">ACCESS GRANTED</div>
          <div className="text-section-problem mt-1">...Just kidding.</div>
          <div className="text-muted text-sm mt-1">
            We prefer ethical engineers. The real hack is running 'apply'.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * RM -RF / - The classic
 */
export const rmCommand = defineCommand({
  name: 'rm',
  description: 'Remove files',
  category: 'easter-egg',
  hidden: true,

  handler: (parsed, ctx) => {
    const args = parsed.args.join(' ');
    const isDestructive =
      args.includes('-rf') ||
      args.includes('-fr') ||
      args.includes('--force');

    if (isDestructive && (args.includes('/') || args.includes('*'))) {
      ctx.addOutput({
        type: 'output',
        content: (
          <div className="text-section-problem">
            <div>Nice try.</div>
            <div className="text-muted text-sm mt-1">
              We value engineers who don't destroy production.
            </div>
            <div className="text-muted text-sm">
              +10 points for testing boundaries though.
            </div>
          </div>
        ),
      });
    } else {
      ctx.addOutput({
        type: 'output',
        content: (
          <div>
            <div className="text-section-problem">Error: Read-only file system</div>
            <div className="text-muted text-sm mt-1">
              This terminal is read-only. But you can 'touch' our hearts with
              'apply'.
            </div>
          </div>
        ),
      });
    }
    return { handled: true };
  },
});

/**
 * TOUCH / MKDIR - Read-only filesystem
 */
export const touchCommand = defineCommand({
  name: 'touch',
  aliases: ['mkdir', 'mv', 'cp'],
  description: 'Create files',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <div>
          <div className="text-section-problem">Error: Read-only file system</div>
          <div className="text-muted text-sm mt-1">
            This terminal is read-only. But you can 'touch' our hearts with
            'apply'.
          </div>
        </div>
      ),
    });
    return { handled: true };
  },
});

/**
 * MAKE - Build commands
 */
export const makeCommand = defineCommand({
  name: 'make',
  description: 'Build targets',
  category: 'easter-egg',
  hidden: true,

  handler: (parsed, ctx) => {
    const target = parsed.args[0];

    const makeTargets: Record<string, string> = {
      love: "make: *** No rule to make target 'love'. Try 'make career'.",
      career: "Building career... Success! Now run 'apply' to deploy.",
      coffee: "Brewing... Success! Come to Maybachufer for the good stuff.",
      money: "make: *** 'money' requires 'career' first. Try 'make career'.",
      friends: 'Making friends... Found: future-colleagues@switchup.tech',
      sandwich: "make: *** What? Make it yourself. Or join us for lunch at the office.",
      install: "Installing dependencies... Ready. Run 'apply' to complete.",
    };

    if (!target) {
      ctx.addOutput({
        type: 'output',
        content: "make: *** No targets specified. Try: make career",
      });
    } else {
      ctx.addOutput({
        type: 'output',
        content:
          makeTargets[target.toLowerCase()] ||
          `make: *** No rule to make target '${target}'.`,
      });
    }

    return { handled: true };
  },
});

/**
 * GIT - Version control
 */
export const gitCommand = defineCommand({
  name: 'git',
  description: 'Version control',
  category: 'dev',
  hidden: true,

  handler: (parsed, ctx) => {
    const subcommand = parsed.args[0];

    switch (subcommand) {
      case 'status':
        ctx.addOutput({
          type: 'output',
          content: (
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {`On branch: your-journey
Your branch is behind 'origin/interesting-paths' by 1 commit.
  (use "apply" to fast-forward)

Untracked possibilities:
  (use "apply" to begin exploring)

        switchup-conversation.md

nothing added to commit but untracked possibilities present`}
            </pre>
          ),
        });
        break;

      case 'log':
        ctx.addOutput({
          type: 'output',
          content: (
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {`commit 7d3f2a1 (HEAD -> main)
Author: Switchup Team <future-colleagues@switchup.tech>
Date:   Nov 2024

    feat: Launched matchmaking terminal

commit 4b2e8c9
Author: Engineering <eng@switchup.tech>
Date:   Oct 2024

    refactor: Three-layer architecture (Orchestrator/Capabilities/Record)

commit 1a9d4f2
Author: Founders <founder@switchup.tech>
Date:   Sep 2024

    docs: Added Marktfairänderung philosophy`}
            </pre>
          ),
        });
        break;

      case 'clone':
        ctx.addOutput({
          type: 'output',
          content:
            "Cloning into 'switchup-career'... To complete the clone, run: apply",
        });
        break;

      case 'push':
        ctx.addOutput({
          type: 'output',
          content: (
            <div className="text-section-problem">
              error: failed to push some refs to 'origin/your-career'
              <div className="text-muted text-sm mt-1">
                hint: You need to 'apply' before you can push.
              </div>
            </div>
          ),
        });
        break;

      default:
        ctx.addOutput({
          type: 'output',
          content: `git: '${subcommand || ''}' is not a git command. Try: status, log, clone`,
        });
    }

    return { handled: true };
  },
});

/**
 * NPM / YARN / PNPM - Package managers
 */
export const npmCommand = defineCommand({
  name: 'npm',
  aliases: ['yarn', 'pnpm', 'bun'],
  description: 'Package manager',
  category: 'dev',
  hidden: true,

  handler: (parsed, ctx) => {
    const subcommand = parsed.args[0];
    const pkg = parsed.args[1];

    if (subcommand === 'install' || subcommand === 'i' || subcommand === 'add') {
      if (pkg === 'career' || pkg === 'job' || pkg === 'opportunity') {
        ctx.addOutput({
          type: 'output',
          content: (
            <div className="space-y-1">
              <div>Installing {pkg}@switchup...</div>
              <div className="text-terminal-green">✓ Added 1 package</div>
              <div className="text-muted text-sm">Run 'apply' to initialize</div>
            </div>
          ),
        });
      } else {
        ctx.addOutput({
          type: 'output',
          content: `npm WARN deprecated ${pkg || 'your-current-job'}@old: Package no longer maintained. Consider 'npm install career@switchup'`,
        });
      }
    } else if (subcommand === 'run') {
      if (pkg === 'apply' || pkg === 'start') {
        ctx.addOutput({
          type: 'output',
          content: "Running application script... Run 'apply' to continue.",
        });
      } else {
        ctx.addOutput({
          type: 'output',
          content: `npm run ${pkg || ''}: Script not found. Try: npm run apply`,
        });
      }
    } else {
      ctx.addOutput({
        type: 'output',
        content: `${parsed.command}: Try '${parsed.command} install career' or '${parsed.command} run apply'`,
      });
    }

    return { handled: true };
  },
});

/**
 * NEOFETCH - System info with ASCII art
 */
export const neofetchCommand = defineCommand({
  name: 'neofetch',
  aliases: ['screenfetch', 'fastfetch'],
  description: 'System information',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <pre className="whitespace-pre font-mono text-xs leading-tight">
          {`
   _____ _    _ _____ _____ _____ _    _ _    _  explorer@switchup
  / ____| |  | |_   _|_   _/ ____| |  | | |  | | -----------------
 | (___ | |  | | | |   | || |    | |__| | |  | | OS: SwitchupOS 2024.1 LTS
  \\___ \\| |  | | | |   | || |    |  __  | |  | | Host: Matchmaking Terminal
  ____) | |__| |_| |_ _| || |____| |  | | |__| | Kernel: React 19.0.0
 |_____/ \\____/|_____|_____\\_____|_|  |_|\\____/  Domains: 7 (21 problem spaces)
                                                 Shell: bash 5.2.0

  Stack: Windmill, TypeScript+ZOD, Playwright, AI
  Team: Small by design, problem space owners
  Location: Berlin @ Maybachufer
  Philosophy: Marktfairänderung

  Run 'apply' if something clicks`}
        </pre>
      ),
    });
    return { handled: true };
  },
});

/**
 * PING - Network diagnostic
 */
export const pingCommand = defineCommand({
  name: 'ping',
  description: 'Network diagnostic',
  category: 'easter-egg',
  hidden: true,

  handler: (parsed, ctx) => {
    const host = parsed.args[0];

    if (!host) {
      ctx.addOutput({
        type: 'output',
        content: 'ping: usage: ping hostname',
      });
      return { handled: true };
    }

    const responses: Record<string, string[]> = {
      'switchup.tech': [
        'PING switchup.tech: 56 data bytes',
        '64 bytes from switchup.tech: icmp_seq=0 ttl=64 time=12.3 ms',
        '64 bytes from switchup.tech: icmp_seq=1 ttl=64 time=11.8 ms',
        '',
        '--- switchup.tech ping statistics ---',
        '2 packets transmitted, 2 received, 0% packet loss',
        '',
        'Connection status: EXPLORING_TOGETHER',
      ],
      'google.com': [
        'PING google.com: Packet redirected',
        'Destination: apply.sh',
        'Reason: Better opportunities await',
      ],
      localhost: [
        'PING localhost (127.0.0.1): 56 data bytes',
        '64 bytes from localhost: You are here.',
        "But where do you want to be?",
        '',
        "Run 'apply' to ping your future.",
      ],
    };

    const output = responses[host] || [
      `PING ${host}: Name resolution failed`,
      'Try: ping switchup.tech',
    ];

    ctx.addOutput({
      type: 'output',
      content: (
        <pre className="font-mono text-sm text-secondary">
          {output.join('\n')}
        </pre>
      ),
    });

    return { handled: true };
  },
});

/**
 * FORTUNE - Random wisdom
 */
export const fortuneCommand = defineCommand({
  name: 'fortune',
  description: 'Random wisdom',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    const fortunes = [
      "Your career will thank you for running 'apply'.",
      'A small team with big ambitions. Perhaps we click.',
      'The best time to start a conversation was yesterday. The second best time is now.',
      'Marktfairänderung: Markets can be transformed toward fairness.',
      'Fortune favors the bold. And those who explore matchmaking terminals.',
      "You will soon receive an interesting email... if you run 'apply'.",
      'The code you write today will shape subscriptions tomorrow.',
      '21 problem spaces. 7 domains. Room for one more explorer.',
      'Berlin HQ at Maybachufer: canal views, good coffee, great code.',
      'Meetings: few. Impact: high. Problem space ownership: yours.',
    ];

    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    ctx.addOutput({
      type: 'output',
      content: (
        <div className="border border-default p-3 my-2">
          <div className="text-secondary italic">{randomFortune}</div>
        </div>
      ),
    });

    return { handled: true };
  },
});

/**
 * COWSAY - ASCII cow
 */
export const cowsayCommand = defineCommand({
  name: 'cowsay',
  description: 'ASCII cow',
  category: 'easter-egg',
  hidden: true,

  handler: (parsed, ctx) => {
    const message = parsed.args.join(' ') || 'Moo. Run apply.';
    const border = '-'.repeat(message.length + 2);

    ctx.addOutput({
      type: 'output',
      content: (
        <pre className="whitespace-pre font-mono text-sm">
          {` ${border}
< ${message} >
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
        </pre>
      ),
    });

    return { handled: true };
  },
});

/**
 * SL - Steam Locomotive (typo of ls)
 */
export const slCommand = defineCommand({
  name: 'sl',
  description: 'Steam locomotive',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <pre className="whitespace-pre font-mono text-xs text-terminal-green">
          {`
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=    ||    ||    ||    |_____/~\\___/
  \\_/      \\O=====O=====O=====O_/      \\_/

Destination: Your career at Switchup
ETA: After you run 'apply'`}
        </pre>
      ),
    });

    return { handled: true };
  },
});

/**
 * SSH - Secure shell
 */
export const sshCommand = defineCommand({
  name: 'ssh',
  description: 'Secure shell',
  category: 'easter-egg',
  hidden: true,

  handler: (parsed, ctx) => {
    const target = parsed.args[0];

    if (!target) {
      ctx.addOutput({
        type: 'output',
        content: 'usage: ssh [user@]hostname',
      });
    } else if (target.includes('root@') || target === 'root') {
      ctx.addOutput({
        type: 'output',
        content:
          "Permission denied (publickey). Also, we don't do root access here. We do ownership.",
      });
    } else if (target.includes('switchup') || target === 'switchup.tech') {
      ctx.addOutput({
        type: 'output',
        content: (
          <div className="space-y-1">
            <div>Connecting to switchup.tech...</div>
            <div className="text-terminal-green">Connection established.</div>
            <div className="mt-2">Welcome to Switchup.</div>
            <div className="text-muted text-sm">
              To continue exploring, run 'apply'
            </div>
          </div>
        ),
      });
    } else {
      ctx.addOutput({
        type: 'output',
        content: `ssh: Could not resolve hostname ${target}: Name resolution suggested: switchup.tech`,
      });
    }

    return { handled: true };
  },
});

/**
 * MAN - Manual pages
 */
export const manCommand = defineCommand({
  name: 'man',
  description: 'Display manual pages',
  category: 'dev',
  hidden: true,

  handler: (parsed, ctx) => {
    const command = parsed.args[0];

    if (!command) {
      ctx.addOutput({
        type: 'output',
        content: 'What manual page do you want?',
      });
      return { handled: true };
    }

    const manPages: Record<string, { name: string; shortDesc: string; description: string }> = {
      stack: {
        name: 'stack',
        shortDesc: 'Display Switchup technology stack',
        description: `Shows the complete technology stack used at Switchup,
including our engineering bets and the reasoning behind each choice.`,
      },
      apply: {
        name: 'apply',
        shortDesc: 'Start a conversation about working together',
        description: `Opens the door to explore working together.

We don't use AI to screen conversations - real humans read every message.
Include what excites you about what we're building and a project
you're proud of. We'll take it from there.`,
      },
      culture: {
        name: 'culture',
        shortDesc: 'Start the mutual discovery quiz',
        description: `Interactive 10-question quiz for mutual discovery.

This isn't a test - it's a conversation starter. The questions reveal
what it's actually like to work here so we can both decide if we'd
click.`,
      },
      switchup: {
        name: 'switchup',
        shortDesc: 'About Switchup',
        description: `Switchup is building a Subscription Operating System.

WHY: MARKTFAIRÄNDERUNG
Markets should reward value, not exploit inattention.
We believe technology can transform markets toward fairness.

HOW: FREUNDSCHAFTSPRINZIP
What would a good friend do? We recommend what's best
for users – even if we don't earn anything.

WHAT: NEVER OVERCHARGED AGAIN
Not a switching service. An operating system that monitors,
detects, acts, and protects. Continuously.

THE TEAM
Small by design. Problem space owners, not ticket pushers.
Each of us acts as an AI orchestrator for our domains.`,
      },
      ls: {
        name: 'ls',
        shortDesc: 'List directory contents',
        description: `Display contents of a directory in the virtual filesystem.

Usage: ls [directory]

If no directory is specified, lists the current directory.
Directories are shown in blue, executables in green.`,
      },
      cd: {
        name: 'cd',
        shortDesc: 'Change directory',
        description: `Change the current working directory.

Usage: cd [directory]

Supports:
  ~        Home directory
  ..       Parent directory
  .        Current directory
  /path    Absolute path
  path     Relative path`,
      },
      cat: {
        name: 'cat',
        shortDesc: 'View file contents',
        description: `Display the contents of a file.

Usage: cat <file>

Try: cat README.md
     cat core/matching.ts
     cat docs/failures.md`,
      },
      pwd: {
        name: 'pwd',
        shortDesc: 'Print working directory',
        description: `Display the current working directory path.

Usage: pwd

The home directory is /home/explorer/switchup (aka ~)`,
      },
      help: {
        name: 'help',
        shortDesc: 'Show available commands',
        description: `Display list of available commands or help for a specific command.

Usage: help [command]

Try: help stack
     help culture
     help theme`,
      },
    };

    const manPage = manPages[command.toLowerCase()];

    if (manPage) {
      ctx.addOutput({
        type: 'output',
        content: (
          <div className="space-y-2">
            <div className="text-primary font-bold">
              {manPage.name.toUpperCase()}(1) - {manPage.shortDesc}
            </div>
            <div className="mt-2">
              <span className="text-muted uppercase">DESCRIPTION</span>
              <div className="ml-4 whitespace-pre-wrap text-secondary">{manPage.description}</div>
            </div>
          </div>
        ),
      });
    } else {
      ctx.addOutput({
        type: 'output',
        content: `No manual entry for ${command}`,
      });
    }

    return { handled: true };
  },
});

/**
 * PS / TOP - Process list
 */
export const psCommand = defineCommand({
  name: 'ps',
  aliases: ['top', 'htop'],
  description: 'Display running processes',
  category: 'dev',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: (
        <pre className="whitespace-pre font-mono text-sm">
          {`  PID TTY          TIME CMD
    1 pts/0    00:00:01 process-orchestrator --domains=7
    2 pts/0    00:00:00 matchmaking-engine --mode=mutual
    3 pts/0    00:00:02 capability-domain --type=offer
    4 pts/0    00:00:00 discovery-quiz --awaiting-explorer
    5 pts/0    00:00:01 system-of-record --lifecycle
    6 pts/0    00:00:00 ps

Pro tip: These processes could use a problem space owner. Is that you?
Run 'apply' if something clicks.`}
        </pre>
      ),
    });
    return { handled: true };
  },
});

/**
 * ID - User identity
 */
export const idCommand = defineCommand({
  name: 'id',
  description: 'Print user identity',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: 'uid=1000(explorer) gid=1000(mutual-discovery) groups=1000(future-colleagues),27(sudo-worthy)',
    });
    return { handled: true };
  },
});

/**
 * REBOOT / RESTART
 */
export const rebootCommand = defineCommand({
  name: 'reboot',
  aliases: ['restart'],
  description: 'Restart system',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: "Rebooting career trajectory... Use 'exit' for full shutdown, or 'apply' to upgrade.",
    });
    return { handled: true };
  },
});

/**
 * WHOOPS / OOPS - Friendly error recovery
 */
export const whoopsCommand = defineCommand({
  name: 'whoops',
  aliases: ['oops', 'sorry'],
  description: 'Recover from mistakes',
  category: 'easter-egg',
  hidden: true,

  handler: (_parsed, ctx) => {
    ctx.addOutput({
      type: 'output',
      content: "No worries! At Switchup, we learn from mistakes. Try 'help' to get back on track.",
    });
    return { handled: true };
  },
});

/**
 * PLEASE - Polite command prefix
 */
export const pleaseCommand = defineCommand({
  name: 'please',
  description: 'Ask politely',
  category: 'easter-egg',
  hidden: true,

  handler: (parsed, ctx) => {
    const actualCommand = parsed.args.join(' ');
    if (actualCommand) {
      ctx.addOutput({
        type: 'output',
        content: (
          <div>
            <div>Since you asked nicely... </div>
            <div className="text-terminal-green text-sm">+2 politeness points</div>
            <div className="text-muted text-sm mt-1">Now try running '{actualCommand}' directly.</div>
          </div>
        ),
      });
    } else {
      ctx.addOutput({
        type: 'output',
        content: 'Please what? We appreciate the politeness though. +2 points.',
      });
    }
    return { handled: true };
  },
});

