export type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  stack: string[]
  gradient: string
  screenshot: string | null
  url?: string
  repo?: string
  year: number
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Realtime Canvas',
    description: 'A multiplayer drawing surface with WebSocket sync.',
    longDescription:
      'A collaborative whiteboard built on CRDTs, with cursor presence, undo/redo, and export to PNG/SVG. Demonstrates real-time state management and conflict resolution.',
    stack: ['TypeScript', 'React', 'WebSocket', 'Yjs'],
    gradient: 'from-pink-400 via-rose-400 to-orange-300',
    screenshot: null,
    url: 'https://example.com',
    repo: 'https://github.com/example/realtime-canvas',
    year: 2025,
  },
  {
    id: 'project-2',
    title: 'Tiny ORM',
    description: 'A 2KB type-safe ORM for SQLite.',
    longDescription:
      'A zero-dependency ORM with a fluent query builder, migrations, and full TypeScript inference. Designed to be auditable in an afternoon.',
    stack: ['TypeScript', 'SQLite', 'Vitest'],
    gradient: 'from-violet-400 via-purple-400 to-indigo-400',
    screenshot: null,
    repo: 'https://github.com/example/tiny-orm',
    year: 2024,
  },
  {
    id: 'project-3',
    title: 'Focus Timer',
    description: 'A pomodoro app with ambient soundscapes.',
    longDescription:
      'A productivity timer that pairs with a curated library of generative ambient audio. Built as a PWA with offline support.',
    stack: ['React', 'Web Audio', 'PWA'],
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    screenshot: null,
    url: 'https://example.com',
    year: 2024,
  },
]
