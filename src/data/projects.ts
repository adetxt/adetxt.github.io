export type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  stack: string[]
  gradient: string
  overlayColor?: string
  screenshot: string | null
  url?: string
  repo?: string
  year: number
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'ai-usage-analyzer',
    description: 'TUI analyzer for local AI coding agent token consumption.',
    longDescription:
      'A terminal UI that auto-detects Claude Code, Codex, OpenCode, MimoCode, GitHub Copilot, Antigravity, and Gemini CLI data directories — no hardcoded paths. Parses SQLite and JSONL session logs, breaks down input/output/cache/reasoning tokens, and exports JSON or Markdown reports. Built on Node.js ≥ 22.5 for the built-in node:sqlite.',
    stack: ['JavaScript', 'Node.js', 'SQLite', 'TUI'],
    gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
    screenshot: null,
    repo: 'https://github.com/adetxt/ai-usage-analyzer',
    year: 2026,
  },
  {
    id: 'project-2',
    title: 'My Pokpok',
    description: 'Member app for Indonesia\'s favorite crispy snack brand.',
    longDescription:
      'Landing site for the My Pokpok member app — points, rewards, and exclusive promos. Bilingual ID/EN, deep links into the Play Store and App Store, with a separate franchise inquiry CTA. Built for Script Alchemy\'s client Pok Pok.',
    stack: ['HTML', 'Tailwind', 'Bilingual'],
    gradient: 'from-amber-400 via-orange-400 to-red-400',
    overlayColor: '180, 83, 9',
    screenshot: 'https://i.imgur.com/UJUq8Og.jpeg',
    url: 'https://pokpok.cloud',
    year: 2026,
  },
  {
    id: 'project-3',
    title: 'After Last Night',
    description: 'A Roblox nightclub experience.',
    longDescription:
      'A social nightlife experience inside Roblox. Minimalist landing page acting as a teaser hub and entry point into the in-game venue.',
    stack: ['Roblox', 'Luau', 'Web'],
    gradient: 'from-fuchsia-400 via-purple-400 to-indigo-500',
    screenshot: null,
    url: 'https://afterlastnight.club',
    year: 2026,
  },
]
