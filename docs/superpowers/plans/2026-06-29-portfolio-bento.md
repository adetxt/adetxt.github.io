# Portfolio Bento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page personal portfolio with an Apple-style bento grid foundation and a subtle-springs/magnetic-cursor personality layer, per `docs/superpowers/specs/2026-06-29-portfolio-bento-design.md`.

**Architecture:** Vite + React 18 + TypeScript SPA. All content in typed data files under `src/data/`. A thin `BentoTile` motion wrapper handles tilt/hover/expand; child tile components stay pure. CSS custom properties drive theming; Tailwind consumes them.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind CSS 3, Framer Motion 11, react-icons 5, Vitest 1, @testing-library/react 15.

## Global Constraints

- Node ≥ 18.17. Package manager: npm.
- Dependency versions (exact floors): `vite@^5.0.0`, `react@^18.3.0`, `react-dom@^18.3.0`, `typescript@^5.4.0`, `tailwindcss@^3.4.0`, `framer-motion@^11.0.0`, `react-icons@^5.0.0`, `vitest@^1.6.0`, `@testing-library/react@^15.0.0`, `@testing-library/jest-dom@^6.4.0`, `jsdom@^24.0.0`, `@vitejs/plugin-react@^4.3.0`, `autoprefixer@^10.4.0`, `postcss@^8.4.0`.
- Naming: components `PascalCase`, hooks `useCamelCase`, files match export names.
- TDD applies to hooks, utilities, and pure functions. Components use manual visual verification (per spec §7).
- All commits use Conventional Commits prefix: `feat:`, `chore:`, `test:`, `style:`, `docs:`, `refactor:`.
- No `any` types in committed code.
- All Framer Motion variants centralized in `src/lib/animations.ts`.

---

## Task 1: Scaffold the project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `.gitignore`, `README.md`, `postcss.config.js`, `tailwind.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/styles/globals.css`
- Test: none (scaffolding)

- [ ] **Step 1: Initialize git in project root**

```bash
cd /Users/engineering/development/rbs/adetxt
git init
git branch -m main
```

- [ ] **Step 2: Create `.gitignore`**

Write `/Users/engineering/development/rbs/adetxt/.gitignore`:

```gitignore
node_modules
dist
.DS_Store
*.log
.superpowers
coverage
```

- [ ] **Step 3: Create `package.json`**

Write `/Users/engineering/development/rbs/adetxt/package.json`:

```json
{
  "name": "adetxt-portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:smoke": "node scripts/smoke.mjs",
    "lint": "tsc -b --noEmit"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-icons": "^5.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^15.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "jsdom": "^24.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.4.0",
    "vite": "^5.0.0",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`
Expected: completes without ERR; `node_modules` and `package-lock.json` created.

- [ ] **Step 5: Create `tsconfig.json`**

Write `/Users/engineering/development/rbs/adetxt/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 6: Create `tsconfig.node.json`**

Write `/Users/engineering/development/rbs/adetxt/tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "tailwind.config.ts", "postcss.config.js"]
}
```

- [ ] **Step 7: Create `vite.config.ts`**

Write `/Users/engineering/development/rbs/adetxt/vite.config.ts`:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 8: Create `postcss.config.js`**

Write `/Users/engineering/development/rbs/adetxt/postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 9: Create `tailwind.config.ts`**

Write `/Users/engineering/development/rbs/adetxt/tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        tile: 'var(--tile)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        accent: 'var(--accent)',
      },
      borderRadius: {
        bento: '24px',
      },
      boxShadow: {
        tile: '0 1px 2px rgba(0,0,0,0.04)',
        'tile-hover': '0 20px 40px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Inter',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 10: Create `index.html`**

Write `/Users/engineering/development/rbs/adetxt/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ade — Software Engineer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 11: Create `src/styles/globals.css`**

Write `/Users/engineering/development/rbs/adetxt/src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 12: Create `src/main.tsx`**

Write `/Users/engineering/development/rbs/adetxt/src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 13: Create placeholder `src/App.tsx`**

Write `/Users/engineering/development/rbs/adetxt/src/App.tsx`:

```tsx
export default function App() {
  return <div className="p-8 text-ink">Ade — portfolio (scaffolded)</div>
}
```

- [ ] **Step 14: Create `src/test-setup.ts`**

Write `/Users/engineering/development/rbs/adetxt/src/test-setup.ts`:

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 15: Verify dev server starts and type-checks pass**

Run: `npm run dev` (in background), wait 3s, then `curl -s http://localhost:5173 | head -5` — expect HTML output.
Run: `npm run lint` — expect no errors.
Stop the dev server.

- [ ] **Step 16: Initial commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TS + Tailwind project"
```

---

## Task 2: Design tokens and theme CSS

**Files:**
- Create: `src/styles/theme.css`
- Modify: `src/styles/globals.css` (import theme.css)
- Test: none

- [ ] **Step 1: Create `src/styles/theme.css`**

Write `/Users/engineering/development/rbs/adetxt/src/styles/theme.css`:

```css
:root {
  --bg: #f5f5f7;
  --tile: #ffffff;
  --ink: #1d1d1f;
  --ink-muted: #6e6e73;
  --accent: #6e6e73;
  --tile-border: rgba(0, 0, 0, 0.06);
  --mesh-1: #ff6b9d;
  --mesh-2: #4ecdc4;
  --mesh-3: #ffd93d;
  --mesh-4: #a78bfa;
}

.dark {
  --bg: #000000;
  --tile: #1c1c1e;
  --ink: #f5f5f7;
  --ink-muted: #98989d;
  --accent: #98989d;
  --tile-border: transparent;
  --mesh-1: #ff6b9d;
  --mesh-2: #4ecdc4;
  --mesh-3: #ffd93d;
  --mesh-4: #a78bfa;
  color-scheme: dark;
}
```

- [ ] **Step 2: Import theme.css in globals.css**

Edit `/Users/engineering/development/rbs/adetxt/src/styles/globals.css` — add at the very top, before `@tailwind` lines:

```css
@import './theme.css';
```

- [ ] **Step 3: Verify build still passes**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/
git commit -m "feat: add design tokens and light/dark theme variables"
```

---

## Task 3: Theme hook (TDD)

**Files:**
- Create: `src/hooks/useTheme.ts`, `src/hooks/useTheme.test.ts`
- Test: `src/hooks/useTheme.test.ts`

- [ ] **Step 1: Write the failing test**

Write `/Users/engineering/development/rbs/adetxt/src/hooks/useTheme.test.ts`:

```ts
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('defaults to light when no stored value and no system preference', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }))
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    vi.unstubAllGlobals()
  })

  it('defaults to dark when system prefers dark', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: () => {}, removeEventListener: () => {} }))
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    vi.unstubAllGlobals()
  })

  it('reads stored theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('toggle switches theme and persists', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggle())
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    act(() => result.current.toggle())
    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('setTheme updates state and DOM', () => {
    const { result } = renderHook(() => useTheme())
    act(() => result.current.setTheme('dark'))
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

Run: `npx vitest run src/hooks/useTheme.test.ts`
Expected: FAIL — `useTheme` does not exist.

- [ ] **Step 3: Implement `useTheme`**

Write `/Users/engineering/development/rbs/adetxt/src/hooks/useTheme.ts`:

```ts
import { useEffect, useState, useCallback } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next)
    setThemeState(next)
  }, [])

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return { theme, setTheme, toggle }
}
```

- [ ] **Step 4: Run test to confirm it passes**

Run: `npx vitest run src/hooks/useTheme.test.ts`
Expected: PASS — all 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useTheme.ts src/hooks/useTheme.test.ts
git commit -m "feat: add useTheme hook with persistence and system preference"
```

---

## Task 4: ThemeToggle component

**Files:**
- Create: `src/components/ui/ThemeToggle.tsx`
- Test: `src/components/ui/ThemeToggle.test.tsx`

- [ ] **Step 1: Write the failing test**

Write `/Users/engineering/development/rbs/adetxt/src/components/ui/ThemeToggle.test.tsx`:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('renders a button with an accessible label', () => {
    render(<ThemeToggle />)
    const btn = screen.getByRole('button', { name: /switch to (dark|light) mode/i })
    expect(btn).toBeInTheDocument()
  })

  it('clicking toggles the document class', () => {
    render(<ThemeToggle />)
    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    fireEvent.click(btn)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**

Run: `npx vitest run src/components/ui/ThemeToggle.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement ThemeToggle**

Write `/Users/engineering/development/rbs/adetxt/src/components/ui/ThemeToggle.tsx`:

```tsx
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--tile-border)] bg-tile text-ink transition-colors hover:bg-[var(--bg)]"
    >
      {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**

Run: `npx vitest run src/components/ui/ThemeToggle.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/ThemeToggle.tsx src/components/ui/ThemeToggle.test.tsx
git commit -m "feat: add ThemeToggle button with sun/moon icon"
```

---

## Task 5: Data files and types

**Files:**
- Create: `src/data/projects.ts`, `src/data/experience.ts`, `src/data/skills.ts`, `src/data/now.ts`, `src/data/socials.ts`
- Test: `src/data/projects.test.ts` (type check via build)

- [ ] **Step 1: Create `src/data/projects.ts`**

Write `/Users/engineering/development/rbs/adetxt/src/data/projects.ts`:

```ts
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
```

- [ ] **Step 2: Create `src/data/experience.ts`**

Write `/Users/engineering/development/rbs/adetxt/src/data/experience.ts`:

```ts
export type Experience = {
  id: string
  role: string
  company: string
  start: string
  end: string
  description: string
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Senior Software Engineer',
    company: 'Acme Co',
    start: '2023',
    end: 'Present',
    description: 'Lead frontend for a data-heavy dashboard used by 10k+ daily users.',
  },
  {
    id: 'exp-2',
    role: 'Software Engineer',
    company: 'Startup Inc',
    start: '2021',
    end: '2023',
    description: 'Full-stack work on a B2B SaaS, from Postgres to React.',
  },
  {
    id: 'exp-3',
    role: 'Junior Developer',
    company: 'Agency LLC',
    start: '2019',
    end: '2021',
    description: 'Shipped 20+ client sites across React, Vue, and vanilla JS.',
  },
]
```

- [ ] **Step 3: Create `src/data/skills.ts`**

Write `/Users/engineering/development/rbs/adetxt/src/data/skills.ts`:

```ts
import type { IconType } from 'react-icons'

export type Skill = {
  name: string
  icon: IconType
}

export const skills: Skill[] = [
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Tailwind', icon: SiTailwindcss },
  { name: 'Postgres', icon: SiPostgresql },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'Docker', icon: SiDocker },
  { name: 'Figma', icon: SiFigma },
  { name: 'Vitest', icon: SiVitest },
]

// react-icons imports live at the bottom so the file can be read top-to-bottom
import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiGraphql,
  SiDocker,
  SiFigma,
  SiVitest,
} from 'react-icons/si'
```

- [ ] **Step 4: Create `src/data/now.ts`**

Write `/Users/engineering/development/rbs/adetxt/src/data/now.ts`:

```ts
export const now = {
  status: 'shipping' as const,
  title: 'Building a CLI for fun',
  description: 'A small Rust tool for renaming batches of files with rules. Learning systems programming on weekends.',
  progress: 62,
}
```

- [ ] **Step 5: Create `src/data/socials.ts`**

Write `/Users/engineering/development/rbs/adetxt/src/data/socials.ts`:

```ts
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi'
import type { IconType } from 'react-icons'

export type Social = {
  name: string
  icon: IconType
  href: string
}

export const socials: Social[] = [
  { name: 'GitHub', icon: FiGithub, href: 'https://github.com/example' },
  { name: 'LinkedIn', icon: FiLinkedin, href: 'https://linkedin.com/in/example' },
  { name: 'Twitter', icon: FiTwitter, href: 'https://twitter.com/example' },
  { name: 'Email', icon: FiMail, href: 'mailto:hello@example.com' },
]
```

- [ ] **Step 6: Verify type-check passes**

Run: `npm run lint`
Expected: no errors. If `SiTypescript` etc. fail to resolve, the import order in `skills.ts` is the issue — move the imports to the top of the file.

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data files with placeholder content for all tiles"
```

---

## Task 6: Utility functions and shared animation variants (TDD for animations)

**Files:**
- Create: `src/lib/cn.ts`, `src/lib/animations.ts`, `src/lib/animations.test.ts`
- Test: `src/lib/animations.test.ts`

- [ ] **Step 1: Create `src/lib/cn.ts`**

Write `/Users/engineering/development/rbs/adetxt/src/lib/cn.ts`:

```ts
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

- [ ] **Step 2: Write the failing test for animations**

Write `/Users/engineering/development/rbs/adetxt/src/lib/animations.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { fadeInUp, staggerContainer, springConfig, tileHover } from './animations'

describe('animations', () => {
  it('fadeInUp has the expected initial and animate states', () => {
    expect(fadeInUp.initial).toEqual({ opacity: 0, y: 24, scale: 0.96 })
    expect(fadeInUp.animate).toEqual({ opacity: 1, y: 0, scale: 1 })
  })

  it('staggerContainer has 60ms stagger and 15% viewport threshold', () => {
    expect(staggerContainer.animate.transition.staggerChildren).toBe(0.06)
    expect(staggerContainer.viewport.amount).toBe(0.15)
  })

  it('springConfig defines stiffness and damping', () => {
    expect(springConfig.stiffness).toBe(120)
    expect(springConfig.damping).toBe(18)
  })

  it('tileHover has y -4 and the expected shadow', () => {
    expect(tileHover.y).toBe(-4)
    expect(tileHover.boxShadow).toBe('0 20px 40px rgba(0,0,0,0.08)')
  })
})
```

- [ ] **Step 3: Run test to confirm it fails**

Run: `npx vitest run src/lib/animations.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement animations**

Write `/Users/engineering/development/rbs/adetxt/src/lib/animations.ts`:

```ts
import type { Variants, Transition } from 'framer-motion'

export const springConfig: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
}

export const tileHover = {
  y: -4,
  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
  transition: springConfig,
}
```

- [ ] **Step 5: Run test to confirm it passes**

Run: `npx vitest run src/lib/animations.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/
git commit -m "feat: add cn utility and shared Framer Motion animation variants"
```

---

## Task 7: Custom hooks (TDD)

**Files:**
- Create: `src/hooks/useMousePosition.ts`, `src/hooks/useMousePosition.test.ts`, `src/hooks/useInView.ts`, `src/hooks/useInView.test.ts`
- Test: both `*.test.ts` files

- [ ] **Step 1: Write the failing test for useMousePosition**

Write `/Users/engineering/development/rbs/adetxt/src/hooks/useMousePosition.test.ts`:

```ts
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useMousePosition } from './useMousePosition'

describe('useMousePosition', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
  })

  it('starts at 0,0', () => {
    const { result } = renderHook(() => useMousePosition())
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
  })

  it('updates on mousemove', () => {
    const { result } = renderHook(() => useMousePosition())
    act(() => {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 500, clientY: 400 }))
    })
    expect(result.current.x).toBe(500)
    expect(result.current.y).toBe(400)
  })

  it('cleans up listener on unmount', () => {
    const { unmount } = renderHook(() => useMousePosition())
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
  })
})
```

Note: add `import { vi } from 'vitest'` at top if not already imported.

- [ ] **Step 2: Run test to confirm it fails**

Run: `npx vitest run src/hooks/useMousePosition.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement useMousePosition**

Write `/Users/engineering/development/rbs/adetxt/src/hooks/useMousePosition.ts`:

```ts
import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return pos
}
```

- [ ] **Step 4: Run test to confirm it passes**

Run: `npx vitest run src/hooks/useMousePosition.test.ts`
Expected: PASS.

- [ ] **Step 5: Write the failing test for useInView**

Write `/Users/engineering/development/rbs/adetxt/src/hooks/useInView.test.ts`:

```ts
import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useInView } from './useInView'

let intersectionCallback: ((entries: any[]) => void) | null = null

beforeEach(() => {
  intersectionCallback = null
  // @ts-expect-error - mock
  globalThis.IntersectionObserver = class {
    constructor(cb: any) {
      intersectionCallback = cb
    }
    observe() {}
    disconnect() {}
    unobserve() {}
  }
})

describe('useInView', () => {
  it('starts as not in view', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current).toBe(false)
  })

  it('becomes true when intersection is reported as intersecting', () => {
    const { result } = renderHook(() => useInView({ threshold: 0.15 }))
    intersectionCallback!([{ isIntersecting: true }])
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 6: Run test to confirm it fails**

Run: `npx vitest run src/hooks/useInView.test.ts`
Expected: FAIL.

- [ ] **Step 7: Implement useInView**

Write `/Users/engineering/development/rbs/adetxt/src/hooks/useInView.ts`:

```ts
import { useEffect, useRef, useState } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends Element = HTMLDivElement>(
  options: Options = {},
): [React.RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = '0px', once = true } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
```

- [ ] **Step 8: Run all hook tests**

Run: `npx vitest run src/hooks/`
Expected: PASS for all.

- [ ] **Step 9: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useMousePosition and useInView hooks with tests"
```

---

## Task 8: BentoGrid and BentoTile wrapper

**Files:**
- Create: `src/components/bento/BentoGrid.tsx`, `src/components/bento/BentoTile.tsx`

- [ ] **Step 1: Implement BentoTile**

Write `/Users/engineering/development/rbs/adetxt/src/components/bento/BentoTile.tsx`:

```tsx
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode, type HTMLAttributes } from 'react'
import { fadeInUp, tileHover, springConfig } from '../../lib/animations'

type BentoTileProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  onClick?: () => void
  expandable?: boolean
  label?: string
  layoutId?: string
  inView?: boolean
}

export function BentoTile({
  children,
  className = '',
  onClick,
  expandable = false,
  label,
  layoutId,
  inView = true,
  ...rest
}: BentoTileProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-150, 150], [8, -8]), springConfig)
  const ry = useSpring(useTransform(mx, [-150, 150], [-8, 8]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      variants={fadeInUp}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      whileHover={tileHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={expandable ? 'button' : undefined}
      tabIndex={expandable ? 0 : undefined}
      aria-label={label}
      {...rest}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        ...rest.style,
      }}
      className={`group relative overflow-hidden rounded-bento bg-tile shadow-tile ${expandable ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Implement BentoGrid**

Write `/Users/engineering/development/rbs/adetxt/src/components/bento/BentoGrid.tsx`:

```tsx
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { staggerContainer } from '../../lib/animations'

type BentoGridProps = {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <motion.section
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.15 }}
      className={`mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5 lg:p-6 ${className}`}
    >
      {children}
    </motion.section>
  )
}
```

- [ ] **Step 3: Verify type-check passes**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/bento/
git commit -m "feat: add BentoGrid and BentoTile with 3D tilt hover"
```

---

## Task 9: TopNav

**Files:**
- Create: `src/components/nav/TopNav.tsx`

- [ ] **Step 1: Implement TopNav**

Write `/Users/engineering/development/rbs/adetxt/src/components/nav/TopNav.tsx`:

```tsx
import { ThemeToggle } from '../ui/ThemeToggle'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function TopNav() {
  return (
    <nav className="sticky top-0 z-40 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 backdrop-blur-md lg:px-6">
      <a href="#top" className="text-lg font-bold tracking-tight text-ink">
        ade<span className="text-accent">.</span>
      </a>
      <div className="flex items-center gap-1 sm:gap-2">
        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:bg-tile hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Wire TopNav into App**

Edit `/Users/engineering/development/rbs/adetxt/src/App.tsx` — replace contents with:

```tsx
import { TopNav } from './components/nav/TopNav'

export default function App() {
  return (
    <main id="top" className="min-h-screen bg-bg">
      <TopNav />
    </main>
  )
}
```

- [ ] **Step 3: Verify dev server renders without errors**

Run: `npm run dev` in background, wait 3s, `curl -s http://localhost:5173 | head -20`, stop server.
Expected: HTML returns; nav links present in source.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav/ src/App.tsx
git commit -m "feat: add TopNav with anchor links and theme toggle"
```

---

## Task 10: Background motion primitives (MeshGradient, Marquee, MagneticCursor)

**Files:**
- Create: `src/components/motion/MeshGradient.tsx`, `src/components/motion/Marquee.tsx`, `src/components/motion/MagneticCursor.tsx`, `src/components/motion/useReducedMotion.ts`

- [ ] **Step 1: Create `useReducedMotion`**

Write `/Users/engineering/development/rbs/adetxt/src/components/motion/useReducedMotion.ts`:

```ts
import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
```

- [ ] **Step 2: Implement MeshGradient**

Write `/Users/engineering/development/rbs/adetxt/src/components/motion/MeshGradient.tsx`:

```tsx
import { useEffect, useState } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useReducedMotion } from './useReducedMotion'

const COLORS = ['var(--mesh-1)', 'var(--mesh-2)', 'var(--mesh-3)', 'var(--mesh-4)']

export function MeshGradient() {
  const { x, y } = useMousePosition()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setActive(false), 10_000)
    const wake = () => {
      setActive(true)
      clearTimeout(t)
    }
    window.addEventListener('mousemove', wake)
    return () => {
      window.removeEventListener('mousemove', wake)
      clearTimeout(t)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: active ? 1 : 0.6 }}
      >
        {COLORS.map((c, i) => (
          <div
            key={i}
            className="absolute h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-40 mix-blend-multiply dark:mix-blend-screen"
            style={{
              background: c,
              top: `${20 + i * 15}%`,
              left: `${(i * 25 + (x * 0.03)) % 80}%`,
              transform: `translateY(${y * 0.03}px)`,
              animation: `mesh-drift-${i} ${60 + i * 5}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes mesh-drift-0 { from { transform: translate(0,0); } to { transform: translate(40vw, 30vh); } }
        @keyframes mesh-drift-1 { from { transform: translate(0,0); } to { transform: translate(-30vw, 40vh); } }
        @keyframes mesh-drift-2 { from { transform: translate(0,0); } to { transform: translate(20vw, -30vh); } }
        @keyframes mesh-drift-3 { from { transform: translate(0,0); } to { transform: translate(-40vw, -20vh); } }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 3: Implement Marquee**

Write `/Users/engineering/development/rbs/adetxt/src/components/motion/Marquee.tsx`:

```tsx
import { useReducedMotion } from './useReducedMotion'

type Props = {
  items: string[]
  speed?: number // seconds per loop
}

export function Marquee({ items, speed = 40 }: Props) {
  const reduced = useReducedMotion()
  const text = items.join('  •  ')

  if (reduced) {
    return (
      <div className="overflow-hidden border-y border-[var(--tile-border)] bg-tile py-3">
        <div className="px-6 text-sm text-ink-muted">{text}</div>
      </div>
    )
  }

  return (
    <div className="group overflow-hidden border-y border-[var(--tile-border)] bg-tile py-3">
      <div
        className="flex whitespace-nowrap text-sm text-ink-muted"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationPlayState: 'running',
        }}
      >
        <span className="px-6">{text}</span>
        <span className="px-6" aria-hidden>{text}</span>
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .group:hover > div { animation-play-state: paused; }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 4: Implement MagneticCursor**

Write `/Users/engineering/development/rbs/adetxt/src/components/motion/MagneticCursor.tsx`:

```tsx
import { useEffect, useState } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useReducedMotion } from './useReducedMotion'

export function MagneticCursor() {
  const { x, y } = useMousePosition()
  const reduced = useReducedMotion()
  const [hidden, setHidden] = useState(true)
  const [variant, setVariant] = useState<'default' | 'tile' | 'link'>('default')
  const [accent, setAccent] = useState('#6e6e73')

  useEffect(() => {
    if (reduced) return
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return
    setHidden(false)
  }, [reduced])

  useEffect(() => {
    if (hidden) return
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const tile = t.closest('[data-bento-tile]') as HTMLElement | null
      const link = t.closest('a, button') as HTMLElement | null
      if (tile) {
        setVariant('tile')
        setAccent(getComputedStyle(tile).getPropertyValue('--accent').trim() || '#6e6e73')
      } else if (link) {
        setVariant('link')
      } else {
        setVariant('default')
      }
    }
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => window.removeEventListener('mouseover', onOver)
  }, [hidden])

  if (hidden) return null

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 mix-blend-difference md:block"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          width: variant === 'link' ? 0 : 8,
          height: variant === 'link' ? 0 : 8,
          borderRadius: 9999,
          background: variant === 'tile' ? accent : '#fff',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{
          transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
          transition: 'width 0.25s, height 0.25s, opacity 0.25s, border-color 0.25s',
          width: variant === 'tile' ? 48 : variant === 'link' ? 64 : 32,
          height: variant === 'tile' ? 48 : variant === 'link' ? 28 : 32,
          borderRadius: variant === 'link' ? 999 : 999,
          border: `1.5px solid ${variant === 'tile' ? accent : 'rgba(255,255,255,0.5)'}`,
          background: 'transparent',
        }}
      />
    </>
  )
}
```

- [ ] **Step 5: Wire primitives into App**

Edit `/Users/engineering/development/rbs/adetxt/src/App.tsx` — replace contents with:

```tsx
import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'

export default function App() {
  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
    </main>
  )
}
```

- [ ] **Step 6: Verify dev server renders and type-checks pass**

Run: `npm run lint`
Run: `npm run dev` in background, wait 3s, `curl -s http://localhost:5173 | head -10`, stop server.
Expected: HTML returns; no console errors visible in dev server output.

- [ ] **Step 7: Commit**

```bash
git add src/components/motion/ src/App.tsx
git commit -m "feat: add mesh gradient, marquee, and magnetic cursor primitives"
```

---

## Task 11: HeroTile

**Files:**
- Create: `src/components/tiles/HeroTile.tsx`, `src/components/ui/Chip.tsx`

- [ ] **Step 1: Create Chip**

Write `/Users/engineering/development/rbs/adetxt/src/components/ui/Chip.tsx`:

```tsx
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  children: ReactNode
  className?: string
  tone?: 'default' | 'dark'
}

export function Chip({ children, className = '', tone = 'default' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        tone === 'default' && 'bg-[var(--bg)] text-ink-muted',
        tone === 'dark' && 'bg-white/10 text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Implement HeroTile**

Write `/Users/engineering/development/rbs/adetxt/src/components/tiles/HeroTile.tsx`:

```tsx
import { BentoTile } from '../bento/BentoTile'
import { Chip } from '../ui/Chip'

export function HeroTile() {
  return (
    <BentoTile
      data-bento-tile
      label="About"
      className="col-span-1 md:col-span-2 lg:col-span-7 lg:row-span-2 p-8"
    >
      <div className="flex h-full flex-col justify-between gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            About
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Hi, I'm <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">Ade</span>.
          </h1>
          <p className="mt-4 max-w-md text-base text-ink-muted sm:text-lg">
            Software engineer building delightful, useful things. Currently focused on
            real-time interfaces and developer tools.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Open to work
          </Chip>
          <Chip>Lagos · Remote</Chip>
        </div>
      </div>
    </BentoTile>
  )
}
```

- [ ] **Step 3: Add HeroTile to App and verify**

Edit `/Users/engineering/development/rbs/adetxt/src/App.tsx` — replace contents with:

```tsx
import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'
import { BentoGrid } from './components/bento/BentoGrid'
import { HeroTile } from './components/tiles/HeroTile'

export default function App() {
  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
      <BentoGrid>
        <HeroTile />
      </BentoGrid>
    </main>
  )
}
```

Run: `npm run lint` — expect no errors. Run dev server, verify hero renders.

- [ ] **Step 4: Commit**

```bash
git add src/components/tiles/HeroTile.tsx src/components/ui/Chip.tsx src/components/bento/BentoTile.tsx src/App.tsx
git commit -m "feat: add HeroTile with gradient name and availability chip"
```

---

## Task 12: ProjectTile and project tiles in grid

**Files:**
- Create: `src/components/tiles/ProjectTile.tsx`

- [ ] **Step 1: Implement ProjectTile**

Write `/Users/engineering/development/rbs/adetxt/src/components/tiles/ProjectTile.tsx`:

```tsx
import { FiArrowUpRight } from 'react-icons/fi'
import { BentoTile } from '../bento/BentoTile'
import { Chip } from '../ui/Chip'
import type { Project } from '../../data/projects'

type Props = {
  project: Project
  className?: string
}

export function ProjectTile({ project, className = '' }: Props) {
  return (
    <BentoTile
      data-bento-tile
      label={`Project: ${project.title}`}
      className={`col-span-1 lg:col-span-5 ${className}`}
    >
      <div className={`flex h-full flex-col gap-4 bg-gradient-to-br ${project.gradient} p-6 text-white`}>
        <div className="flex items-start justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
            Project · {project.year}
          </p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white/20 p-2 backdrop-blur transition-transform hover:rotate-45"
              aria-label={`Open ${project.title}`}
            >
              <FiArrowUpRight size={14} />
            </a>
          )}
        </div>
        <div className="mt-auto">
          <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
          <p className="mt-1 text-sm text-white/90">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </BentoTile>
  )
}
```

- [ ] **Step 2: Add 3 project tiles to App**

Edit `/Users/engineering/development/rbs/adetxt/src/App.tsx` — add imports and project tiles inside the `BentoGrid`:

```tsx
import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'
import { BentoGrid } from './components/bento/BentoGrid'
import { HeroTile } from './components/tiles/HeroTile'
import { ProjectTile } from './components/tiles/ProjectTile'
import { projects } from './data/projects'

export default function App() {
  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
      <BentoGrid>
        <HeroTile />
        {projects.map((p, i) => (
          <ProjectTile
            key={p.id}
            project={p}
            className={i === 0 ? 'lg:col-span-5' : i === 1 ? 'lg:col-span-7' : 'lg:col-span-4'}
          />
        ))}
      </BentoGrid>
    </main>
  )
}
```

- [ ] **Step 3: Verify dev server renders and type-checks pass**

Run: `npm run lint`
Run: `npm run dev` in background, wait 3s, `curl -s http://localhost:5173 | head -10`, stop server.

- [ ] **Step 4: Commit**

```bash
git add src/components/tiles/ProjectTile.tsx src/App.tsx
git commit -m "feat: add ProjectTile and render 3 project tiles from data"
```

---

## Task 13: Tech stack, Now, Music, Contact tiles

**Files:**
- Create: `src/components/tiles/TechStackTile.tsx`, `src/components/tiles/NowBuildingTile.tsx`, `src/components/tiles/MusicTile.tsx`, `src/components/tiles/ContactTile.tsx`

- [ ] **Step 1: Implement TechStackTile**

Write `/Users/engineering/development/rbs/adetxt/src/components/tiles/TechStackTile.tsx`:

```tsx
import { motion } from 'framer-motion'
import { BentoTile } from '../bento/BentoTile'
import { skills } from '../../data/skills'

export function TechStackTile() {
  return (
    <BentoTile data-bento-tile label="Tech stack" className="col-span-1 lg:col-span-3 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Tech stack
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.name}
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)] text-ink hover:scale-125 transition-transform"
              title={s.name}
            >
              <Icon size={16} />
            </motion.div>
          )
        })}
      </div>
    </BentoTile>
  )
}
```

- [ ] **Step 2: Implement NowBuildingTile**

Write `/Users/engineering/development/rbs/adetxt/src/components/tiles/NowBuildingTile.tsx`:

```tsx
import { motion } from 'framer-motion'
import { BentoTile } from '../bento/BentoTile'
import { now } from '../../data/now'

export function NowBuildingTile() {
  return (
    <BentoTile data-bento-tile label="What I'm building now" className="col-span-1 lg:col-span-4 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Now
      </p>
      <div className="mt-3 flex items-center gap-2">
        <motion.span
          className="h-2 w-2 rounded-full bg-emerald-500"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-sm font-medium text-ink">Shipping</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
        {now.title}
      </h3>
      <p className="mt-1 text-sm text-ink-muted">{now.description}</p>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: `${now.progress}%` }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
    </BentoTile>
  )
}
```

- [ ] **Step 3: Implement MusicTile**

Write `/Users/engineering/development/rbs/adetxt/src/components/tiles/MusicTile.tsx`:

```tsx
import { BentoTile } from '../bento/BentoTile'

export function MusicTile() {
  return (
    <BentoTile data-bento-tile label="Currently enjoying" className="col-span-1 lg:col-span-4 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Vibes
      </p>
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex-shrink-0 rounded-md bg-gradient-to-br from-orange-400 to-pink-500" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">Album title here</p>
            <p className="truncate text-xs text-ink-muted">Artist name</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex-shrink-0 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">Book title here</p>
            <p className="truncate text-xs text-ink-muted">Author</p>
          </div>
        </div>
      </div>
    </BentoTile>
  )
}
```

- [ ] **Step 4: Implement ContactTile**

Write `/Users/engineering/development/rbs/adetxt/src/components/tiles/ContactTile.tsx`:

```tsx
import { BentoTile } from '../bento/BentoTile'
import { socials } from '../../data/socials'

export function ContactTile() {
  return (
    <BentoTile
      data-bento-tile
      label="Get in touch"
      className="col-span-1 !bg-[#0a0a0a] p-6 !text-white lg:col-span-4"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
        Get in touch
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight">Let's talk.</h3>
      <a
        href="mailto:hello@example.com"
        className="mt-3 inline-block text-sm text-white/80 underline-offset-4 hover:underline"
      >
        hello@example.com
      </a>
      <div className="mt-4 flex gap-2">
        {socials.map((s) => {
          const Icon = s.icon
          return (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-transform hover:scale-110"
            >
              <Icon size={15} />
            </a>
          )
        })}
      </div>
    </BentoTile>
  )
}
```

- [ ] **Step 5: Add tiles to App**

Edit `/Users/engineering/development/rbs/adetxt/src/App.tsx` — add imports and tiles inside the `BentoGrid`:

```tsx
import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'
import { BentoGrid } from './components/bento/BentoGrid'
import { HeroTile } from './components/tiles/HeroTile'
import { ProjectTile } from './components/tiles/ProjectTile'
import { TechStackTile } from './components/tiles/TechStackTile'
import { NowBuildingTile } from './components/tiles/NowBuildingTile'
import { MusicTile } from './components/tiles/MusicTile'
import { ContactTile } from './components/tiles/ContactTile'
import { projects } from './data/projects'

export default function App() {
  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
      <BentoGrid>
        <HeroTile />
        <ProjectTile project={projects[0]} className="lg:col-span-5" />
        <TechStackTile />
        <NowBuildingTile />
        <ProjectTile project={projects[1]} className="lg:col-span-7" />
        <MusicTile />
        <ContactTile />
        <ProjectTile project={projects[2]} className="lg:col-span-4" />
      </BentoGrid>
    </main>
  )
}
```

- [ ] **Step 6: Verify type-check and dev server**

Run: `npm run lint` — expect no errors. Run dev server, verify all tiles render.

- [ ] **Step 7: Commit**

```bash
git add src/components/tiles/ src/components/bento/BentoTile.tsx src/App.tsx
git commit -m "feat: add tech stack, now, music, and contact tiles"
```

---

## Task 14: GitHub tile and Experience tile

**Files:**
- Create: `src/components/tiles/GitHubTile.tsx`, `src/components/tiles/ExperienceTile.tsx`, `src/components/ui/Counter.tsx`

- [ ] **Step 1: Create Counter component**

Write `/Users/engineering/development/rbs/adetxt/src/components/ui/Counter.tsx`:

```tsx
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../motion/useReducedMotion'

type Props = {
  to: number
  duration?: number
  className?: string
}

export function Counter({ to, duration = 1200, className = '' }: Props) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? to : 0)

  useEffect(() => {
    if (reduced) return
    const start = performance.now()
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setN(Math.floor(t * to))
      if (t < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration, reduced])

  return <span className={className}>{n.toLocaleString()}</span>
}
```

- [ ] **Step 2: Implement GitHubTile**

Write `/Users/engineering/development/rbs/adetxt/src/components/tiles/GitHubTile.tsx`:

```tsx
import { useMemo } from 'react'
import { BentoTile } from '../bento/BentoTile'
import { Counter } from '../ui/Counter'

const WEEKS = 26
const DAYS = 7

function generateMockContributions(): number[][] {
  return Array.from({ length: WEEKS }, () =>
    Array.from({ length: DAYS }, () => Math.floor(Math.random() * 5)),
  )
}

const LEVEL_COLORS = [
  'bg-[var(--bg)]',
  'bg-emerald-200 dark:bg-emerald-900',
  'bg-emerald-300 dark:bg-emerald-700',
  'bg-emerald-400 dark:bg-emerald-500',
  'bg-emerald-500 dark:bg-emerald-400',
]

export function GitHubTile() {
  const data = useMemo(generateMockContributions, [])
  const total = useMemo(() => data.flat().reduce((a, b) => a + b, 0), [data])

  return (
    <BentoTile data-bento-tile label="GitHub activity" className="col-span-1 lg:col-span-5 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        GitHub activity
      </p>
      <div className="mt-4 flex items-end gap-4">
        <div>
          <p className="text-3xl font-bold text-ink">
            <Counter to={total} />
          </p>
          <p className="text-xs text-ink-muted">contributions in 6mo</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-ink">
            <Counter to={12} />
          </p>
          <p className="text-xs text-ink-muted">day streak</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        {data.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <div
                key={di}
                className={`h-2.5 w-2.5 rounded-sm ${LEVEL_COLORS[level]}`}
                title={`${level} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </BentoTile>
  )
}
```

- [ ] **Step 3: Implement ExperienceTile**

Write `/Users/engineering/development/rbs/adetxt/src/components/tiles/ExperienceTile.tsx`:

```tsx
import { BentoTile } from '../bento/BentoTile'
import { experiences } from '../../data/experience'

export function ExperienceTile() {
  return (
    <BentoTile data-bento-tile label="Experience" className="col-span-1 lg:col-span-7 p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Experience
      </p>
      <ul className="mt-4 divide-y divide-[var(--tile-border)]">
        {experiences.map((e) => (
          <li key={e.id} className="grid grid-cols-12 gap-3 py-3 first:pt-0 last:pb-0">
            <p className="col-span-3 text-xs font-medium text-ink-muted">
              {e.start} – {e.end}
            </p>
            <div className="col-span-9">
              <p className="text-sm font-semibold text-ink">
                {e.role} · {e.company}
              </p>
              <p className="text-sm text-ink-muted">{e.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </BentoTile>
  )
}
```

- [ ] **Step 4: Add tiles to App**

Edit `/Users/engineering/development/rbs/adetxt/src/App.tsx` — add imports and place tiles:

```tsx
import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'
import { Marquee } from './components/motion/Marquee'
import { BentoGrid } from './components/bento/BentoGrid'
import { HeroTile } from './components/tiles/HeroTile'
import { ProjectTile } from './components/tiles/ProjectTile'
import { TechStackTile } from './components/tiles/TechStackTile'
import { NowBuildingTile } from './components/tiles/NowBuildingTile'
import { MusicTile } from './components/tiles/MusicTile'
import { ContactTile } from './components/tiles/ContactTile'
import { GitHubTile } from './components/tiles/GitHubTile'
import { ExperienceTile } from './components/tiles/ExperienceTile'
import { projects } from './data/projects'

export default function App() {
  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
      <BentoGrid>
        <HeroTile />
        <ProjectTile project={projects[0]} className="lg:col-span-5" />
        <TechStackTile />
        <NowBuildingTile />
        <ProjectTile project={projects[1]} className="lg:col-span-7" />
        <ExperienceTile />
        <GitHubTile />
        <MusicTile />
        <ContactTile />
        <ProjectTile project={projects[2]} className="lg:col-span-4" />
      </BentoGrid>
      <Marquee
        items={[
          'Available for hire',
          'Open to interesting projects',
          'Currently shipping CLI tools',
        ]}
      />
    </main>
  )
}
```

- [ ] **Step 5: Verify type-check and dev server**

Run: `npm run lint` — expect no errors. Run dev server, verify all tiles render with their data.

- [ ] **Step 6: Commit**

```bash
git add src/components/tiles/GitHubTile.tsx src/components/tiles/ExperienceTile.tsx src/components/ui/Counter.tsx src/App.tsx
git commit -m "feat: add GitHub and experience tiles; wire marquee strip"
```

---

## Task 15: TileDetail expand view

**Files:**
- Create: `src/components/bento/expand/TileDetail.tsx`, `src/hooks/useTileExpand.ts`

- [ ] **Step 1: Create useTileExpand hook**

Write `/Users/engineering/development/rbs/adetxt/src/hooks/useTileExpand.ts`:

```ts
import { useCallback, useState } from 'react'

export function useTileExpand() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = useCallback((id: string) => setOpenId(id), [])
  const close = useCallback(() => setOpenId(null), [])
  return { openId, open, close }
}
```

- [ ] **Step 2: Implement TileDetail**

Write `/Users/engineering/development/rbs/adetxt/src/components/bento/expand/TileDetail.tsx`:

```tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import type { Project } from '../../../data/projects'

type Props = {
  project: Project | null
  onClose: () => void
}

export function TileDetail({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            layoutId={`tile-${project.id}`}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-bento bg-tile shadow-tile-hover"
          >
            <div className={`h-48 bg-gradient-to-br ${project.gradient} p-6 text-white`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                Project · {project.year}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">{project.title}</h2>
            </div>
            <div className="p-6">
              <p className="text-base text-ink">{project.longDescription}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-[var(--bg)] px-2.5 py-1 text-xs font-medium text-ink-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-tile hover:opacity-80"
                  >
                    Visit
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--tile-border)] px-4 py-2 text-sm font-medium text-ink hover:bg-[var(--bg)]"
                  >
                    Source
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="ml-auto text-sm text-ink-muted hover:text-ink"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Wire expand into App**

Edit `/Users/engineering/development/rbs/adetxt/src/App.tsx`:

```tsx
import { useState } from 'react'
import { TopNav } from './components/nav/TopNav'
import { MeshGradient } from './components/motion/MeshGradient'
import { MagneticCursor } from './components/motion/MagneticCursor'
import { Marquee } from './components/motion/Marquee'
import { BentoGrid } from './components/bento/BentoGrid'
import { TileDetail } from './components/bento/expand/TileDetail'
import { HeroTile } from './components/tiles/HeroTile'
import { ProjectTile } from './components/tiles/ProjectTile'
import { TechStackTile } from './components/tiles/TechStackTile'
import { NowBuildingTile } from './components/tiles/NowBuildingTile'
import { MusicTile } from './components/tiles/MusicTile'
import { ContactTile } from './components/tiles/ContactTile'
import { GitHubTile } from './components/tiles/GitHubTile'
import { ExperienceTile } from './components/tiles/ExperienceTile'
import { projects } from './data/projects'
import type { Project } from './data/projects'

export default function App() {
  const [openProject, setOpenProject] = useState<Project | null>(null)

  return (
    <main id="top" className="relative min-h-screen bg-bg">
      <MeshGradient />
      <MagneticCursor />
      <TopNav />
      <BentoGrid>
        <HeroTile />
        <ProjectTile project={projects[0]} className="lg:col-span-5" onClick={() => setOpenProject(projects[0])} />
        <TechStackTile />
        <NowBuildingTile />
        <ProjectTile project={projects[1]} className="lg:col-span-7" onClick={() => setOpenProject(projects[1])} />
        <ExperienceTile />
        <GitHubTile />
        <MusicTile />
        <ContactTile />
        <ProjectTile project={projects[2]} className="lg:col-span-4" onClick={() => setOpenProject(projects[2])} />
      </BentoGrid>
      <Marquee
        items={[
          'Available for hire',
          'Open to interesting projects',
          'Currently shipping CLI tools',
        ]}
      />
      <TileDetail project={openProject} onClose={() => setOpenProject(null)} />
    </main>
  )
}
```

Also update `ProjectTile` to accept and forward `onClick` (it does via the parent `BentoTile`'s `onClick` — pass it through):

Edit `/Users/engineering/development/rbs/adetxt/src/components/tiles/ProjectTile.tsx` — add `onClick` to the `BentoTile` props.

```tsx
type Props = {
  project: Project
  className?: string
  onClick?: () => void
}

// inside component, on the BentoTile:
<BentoTile ... onClick={onClick}>
```

- [ ] **Step 4: Verify dev server and expand flow**

Run: `npm run dev` in background. Click a project tile — modal should open with details. Press Escape — should close. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/bento/expand/ src/hooks/useTileExpand.ts src/App.tsx src/components/tiles/ProjectTile.tsx
git commit -m "feat: add tile expand detail view with shared-element motion"
```

---

## Task 16: Responsive and accessibility pass

**Files:**
- Modify: `src/components/bento/BentoGrid.tsx`, `src/components/tiles/*.tsx` (col-span adjustments if needed), `src/styles/globals.css`

- [ ] **Step 1: Audit grid at three breakpoints**

Open the dev server, resize browser to: 1440px, 900px, 400px. Verify:
- Desktop: full bento as designed.
- Tablet: tiles collapse to 2 columns; hero still dominant.
- Mobile: single column, all tiles stack.
For any tile that breaks, adjust its `col-span`/`row-span` classes.

- [ ] **Step 2: Confirm focus styles**

Add to `/Users/engineering/development/rbs/adetxt/src/styles/globals.css` at the bottom:

```css
:focus-visible {
  outline: 2px solid #a78bfa;
  outline-offset: 2px;
  border-radius: inherit;
}
```

- [ ] **Step 3: Confirm reduced-motion path**

Set OS reduced-motion to on (or in devtools rendering tab). Reload page. Verify:
- Mesh gradient does not render
- Marquee is static
- Tile tilt/3D effects don't apply
- Theme toggle still works

- [ ] **Step 4: Run all tests**

Run: `npx vitest run`
Expected: all tests pass.

- [ ] **Step 5: Run lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "style: responsive grid tweaks and focus-visible outline"
```

---

## Task 17: README and final smoke test

**Files:**
- Create: `README.md`, `scripts/smoke.mjs`

- [ ] **Step 1: Create `scripts/smoke.mjs`**

Write `/Users/engineering/development/rbs/adetxt/scripts/smoke.mjs`:

```js
// Minimal smoke check: start preview, fetch root, expect non-empty HTML.
import { spawn } from 'node:child_process'
import { setTimeout as wait } from 'node:timers/promises'

const port = 4173
const server = spawn('npx', ['vite', 'preview', '--port', String(port)], { stdio: 'inherit' })

let failed = false
try {
  await wait(2000)
  const res = await fetch(`http://localhost:${port}/`)
  const html = await res.text()
  if (res.status !== 200 || !html.includes('id="root"')) {
    console.error('SMOKE FAIL: expected 200 + #root in body')
    failed = true
  } else {
    console.log('SMOKE OK: page served and contains #root')
  }
} catch (e) {
  console.error('SMOKE FAIL:', e)
  failed = true
} finally {
  server.kill()
  process.exit(failed ? 1 : 0)
}
```

- [ ] **Step 2: Create `README.md`**

Write `/Users/engineering/development/rbs/adetxt/README.md`:

````markdown
# Ade — Portfolio

A single-page personal portfolio with a bento grid and subtle motion. See `docs/superpowers/specs/2026-06-29-portfolio-bento-design.md` for the design rationale.

## Stack
Vite, React 18, TypeScript, Tailwind CSS, Framer Motion, react-icons.

## Develop
```bash
npm install
npm run dev          # http://localhost:5173
```

## Test
```bash
npm test             # unit tests (Vitest)
npm run test:smoke   # build + serve + fetch
```

## Build
```bash
npm run build        # tsc -b && vite build → dist/
npm run preview      # serve dist/ locally
```

## Manual checklist
- [ ] Page loads with no console errors
- [ ] Tiles reveal on scroll, staggered
- [ ] Hover on each tile: 3D tilt + lift + shadow
- [ ] Click a project tile: expand modal opens; Escape closes
- [ ] Magnetic cursor follows on desktop, hidden on touch
- [ ] Theme toggle persists across reload
- [ ] Resize to mobile width: tiles stack
- [ ] `prefers-reduced-motion: reduce` disables motion

## Editing content
All copy and links live in `src/data/`:
- `projects.ts` — project tiles
- `experience.ts` — experience timeline
- `skills.ts` — tech stack icons
- `now.ts` — current focus
- `socials.ts` — contact tile links
````

- [ ] **Step 3: Run smoke test**

Run: `npm run test:smoke`
Expected: `SMOKE OK: page served and contains #root`

- [ ] **Step 4: Run full test + build**

Run: `npm test` — expect all green.
Run: `npm run build` — expect success, `dist/` created.

- [ ] **Step 5: Commit**

```bash
git add README.md scripts/smoke.mjs
git commit -m "docs: add README and smoke test script"
```

---

## Self-Review (post-write)

**Spec coverage:**
- §1 Context & Goals — covered by all tasks.
- §2 Audience & Content — covered (8 sections, all 8 tiles in Task 14).
- §3.1 Bento Grid map — covered (Tasks 11, 12, 13, 14 with correct col-spans).
- §3.2 Responsive — Task 16.
- §3.3 Tile styling — `BentoTile` in Task 8 with `rounded-bento bg-tile shadow-tile`.
- §4.1 Magnetic cursor — Task 10.
- §4.2 Tile entrance — Task 8 (stagger + fadeInUp variants, `whileInView` triggers reveal at 15% visibility, one-shot).
- §4.3 Hover — Task 8.
- §4.4 Tile click → expand — Task 15.
- §4.5 Mesh gradient — Task 10.
- §4.6 Marquee — Task 10, used in Task 14.
- §4.7 Micro-interactions — social icons (Task 13), skill chips drift (Task 13), theme toggle cross-fade (Task 4 CSS), counters (Task 14), status pulse (Task 13).
- §4.8 a11y/perf — Task 16 + `useReducedMotion` (Task 10).
- §5 Color & Type — Task 2 (CSS tokens) + Task 1 (Tailwind config).
- §6.1 Stack — Task 1.
- §6.2 File structure — all tasks produce files matching spec.
- §6.3 Data model — Task 5.
- §6.4 Theming — Task 2 + 3 + 4.
- §6.5 Architectural decisions — `BentoTile` thin wrapper (Task 8), `lib/animations.ts` (Task 6), `useInView` (Task 7).
- §7 Testing — Task 16 (manual checklist) + Task 17 (smoke + README checklist).
- §8 Open items — README editing section (Task 17).
- §9 Implementation order — matches task sequence.

**Placeholder scan:** No "TBD" / "TODO" / "implement later." All code blocks are complete.

**Type consistency:** `useInView` returns `[RefObject<T>, boolean]`; `useTheme` returns `{ theme, setTheme, toggle }`; `Project` type defined in Task 5 matches usages in Tasks 12, 13, 15. `BentoTile` extends `HTMLAttributes<HTMLDivElement>` from Task 8, so `data-bento-tile` and `style` forward correctly without later patches.

**No gaps found.**
