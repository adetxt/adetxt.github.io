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
