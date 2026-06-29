# Personal Portfolio — Bento Design Spec

**Date:** 2026-06-29
**Status:** Approved (awaiting implementation plan)
**Owner:** Ade (working name; user to confirm)

## 1. Context & Goals

A single-page personal portfolio for a software engineer. The design is rooted in the Apple "What's New in iPadOS 26" bento aesthetic — white rounded tiles, bold typography, real content inside tiles, asymmetric sizing, one colorful gradient hero. On top of this clean foundation sits a personality layer of subtle springs, micro-delight interactions, and a custom magnetic cursor.

**Primary goals**
- Showcase the engineer's projects, experience, and current focus in a way that feels alive without being chaotic.
- Communicate taste and craft — the site itself is a portfolio piece.
- Be cheap to maintain: all content in editable data files, no CMS, no backend.

**Non-goals (YAGNI)**
- Blog, CMS, markdown content pipeline.
- Analytics, authentication, contact form handler (mailto: link only).
- Multi-page routing.
- i18n.

## 2. Audience & Content

Single visitor: recruiters, hiring managers, fellow engineers, or potential collaborators. They will spend 20–90 seconds on the page. The design must communicate identity, competence, and personality within the first 3 seconds, then reward deeper exploration.

**Required sections (all confirmed by user):**
1. Hero / About
2. Featured projects (default: 3, expand to 4 if user has 4 to show)
3. Tech stack / Skills
4. "Now building" status
5. GitHub activity
6. Experience / Work history
7. Music / reading (interests)
8. Social links / Contact

## 3. Layout & Composition

Single page, vertical scroll. Top: minimal nav (logo + 3–4 anchor links + theme toggle). Below: bento grid, all visible above the fold on desktop.

### 3.1 Bento Grid (12-column, ~6 rows on desktop)

| Tile | Columns | Rows | Notes |
|---|---|---|---|
| Hero / About | 7 | 2 | Largest tile. Name, tagline, 1-line bio, availability chip. Animated gradient mesh background. Avatar top-right. |
| Featured project 1 | 5 | 1 | Placeholder screenshot, title, stack chips, link arrow. Project-specific gradient background. |
| Tech stack | 3 | 1 | Floating icon chips (react-icons). Gentle continuous drift. Hover pulses the chip. |
| Now building | 4 | 1 | Pulse dot + 1–2 lines about current focus + mini progress bar. |
| GitHub activity | 5 | 1 | 53-week contribution heatmap (mockable) + streak/commit count chips. Counters animate from 0 on first reveal. |
| Experience | 7 | 1 | Inline timeline: 3–4 roles, company, dates, 1-line description each. |
| Featured project 2 | 5 | 1 | Same pattern as project 1. |
| Music / reading | 4 | 1 | "Currently listening" + "Currently reading" stacked. Album/book cover placeholder + title. |
| Get in touch | 4 | 1 | Dark tile (contrasts with light surroundings). Big "Let's talk" + email + 4 social icons. |
| Project 3 | 4 | 1 | Same pattern as project 1. |
| Project 4 *(include only if user has 4 projects)* | 4 | 1 | Same. |

### 3.2 Responsive behavior

- **Desktop (≥1024px):** full asymmetric grid as mapped above.
- **Tablet (768–1023px):** 2-column grid. Hero takes full width. Tiles reorder for visual balance.
- **Mobile (<768px):** single column. Tiles stack in priority order: Hero → Projects → Tech stack → Now → GitHub → Experience → Music → Contact.

### 3.3 Tile styling

- **Light mode:** white tiles (`#ffffff`).
- **Dark mode:** near-black (`#1c1c1e`).
- **Radius:** 22–24px.
- **Border:** 1px subtle in light mode, none in dark mode.
- **Resting shadow:** `0 1px 2px rgba(0,0,0,0.04)`.
- **Tile labels:** small, bold, top-left, color `text-zinc-900` light / `text-zinc-100` dark.

## 4. Motion & Interaction System

All motion uses `transform` and `opacity` only — no layout thrash. All easings centralized in `src/lib/animations.ts` so feel can be tuned globally.

### 4.1 Custom magnetic cursor (desktop only)

- Small dot (8px) follows cursor with slight lag (`lerp(0.25)`).
- Outer ring (32px) follows with more lag (`lerp(0.15)`).
- **On tile hover:** ring scales to 1.5× and adopts the tile's accent color; dot becomes a "+" icon.
- **On link/CTA hover:** ring morphs into a pill shape with the link text inside.
- **Touch devices:** hidden; native cursor used.

### 4.2 Tile entrance (on scroll)

- Stagger 60ms between tiles, triggered when 15% in viewport.
- Each tile: `opacity 0→1`, `y: 24px→0`, `scale: 0.96→1`, duration 600ms.
- Spring easing: `stiffness: 120, damping: 18` — soft landing, no bounce.
- Reveals are one-shot (no replay on scroll-back).

### 4.3 Tile hover (the hero of motion)

- **3D tilt:** max 8° rotation, follows cursor position within tile, perspective 1000px.
- **Lift:** `translateY(-4px)`, shadow grows to `0 20px 40px rgba(0,0,0,0.08)`.
- **Inner content parallax:** text drifts opposite to cursor by 4px.
- Spring transition (~300ms).

### 4.4 Tile click → expand

- Click on a project or hero tile: it scales to 95%, then morphs into a centered detail modal via Framer Motion `layoutId` (shared-element feel).
- Detail view: full project info, larger screenshot, full description, links, stack.
- Backdrop: 8px blur + dim overlay.
- Close: reverse animation, spring-out. Escape key and click-outside also close.

### 4.5 Background mesh gradient

- 3–4 colored blobs that drift slowly (60s loop).
- Blob positions respond to mouse with 0.3× parallax.
- Pauses if user hasn't interacted in 10 seconds.
- Dark mode: same blobs, desaturated, lower opacity.

### 4.6 Marquee strip

- Thin strip below the hero: `Available for hire • Open to interesting projects • Currently shipping ___ • …`
- Continuous horizontal scroll, pauses on hover.

### 4.7 Other micro-interactions

- **Social icons (Contact tile):** each has a unique hover (GitHub rotates, LinkedIn bounces, X tilts, Email scales).
- **Skill chips (Tech stack tile):** float independently with gentle continuous drift.
- **Theme toggle:** smooth 300ms cross-fade; icon morphs (sun ↔ moon).
- **GitHub counters:** count up from 0 on first reveal.
- **"Now" status dot:** continuous 1.5s pulse.

### 4.8 Accessibility & performance

- All motion respects `prefers-reduced-motion`: falls back to simple opacity fades, no tilt, no magnetic cursor.
- Animations pause when `document.visibilityState === "hidden"`.
- All interactive elements keyboard-accessible; focus rings preserved (visible at all times, not just on keyboard nav).
- Color contrast: meets WCAG AA in both themes.

## 5. Color & Type

### 5.1 Palette (light mode)

- Background: `#f5f5f7` (Apple's classic page grey)
- Tile: `#ffffff`
- Text primary: `#1d1d1f`
- Text secondary: `#6e6e73`
- Accent gradient blob colors: vibrant but limited — coral, violet, mint, sky.
- Dark accent tile (Contact): `#0a0a0a` with white text.

### 5.2 Palette (dark mode)

- Background: `#000000`
- Tile: `#1c1c1e`
- Text primary: `#f5f5f7`
- Text secondary: `#98989d`
- Accent blobs: desaturated versions of light mode palette, lower opacity.

### 5.3 Typography

- **Display / headings:** Inter (or system font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
- **Body:** same stack, weight 400/500.
- **Headlines use tight letter-spacing (`-0.02em`) and large size (clamp 2rem–4rem) on the hero.**
- Tile labels: 11–12px, weight 600.

## 6. Tech Architecture

### 6.1 Stack (locked)

- Vite + React 18 + TypeScript
- Tailwind CSS
- Framer Motion (`framer-motion` npm package — user preference; the legacy package is still actively maintained and the docs are most stable here)
- react-icons
- Lucide (a few specific icons not in react-icons)

No router, no state-management library, no API layer — React state + localStorage is sufficient.

### 6.2 File structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── bento/
│   │   │   ├── BentoGrid.tsx
│   │   │   ├── BentoTile.tsx
│   │   │   └── expand/
│   │   │       └── TileDetail.tsx
│   │   ├── tiles/
│   │   │   ├── HeroTile.tsx
│   │   │   ├── ProjectTile.tsx
│   │   │   ├── TechStackTile.tsx
│   │   │   ├── NowBuildingTile.tsx
│   │   │   ├── GitHubTile.tsx
│   │   │   ├── ExperienceTile.tsx
│   │   │   ├── MusicTile.tsx
│   │   │   └── ContactTile.tsx
│   │   ├── motion/
│   │   │   ├── MagneticCursor.tsx
│   │   │   ├── MeshGradient.tsx
│   │   │   ├── Marquee.tsx
│   │   │   └── useReducedMotion.ts
│   │   ├── nav/
│   │   │   └── TopNav.tsx
│   │   └── ui/
│   │       ├── ThemeToggle.tsx
│   │       ├── Chip.tsx
│   │       └── IconButton.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   ├── now.ts
│   │   └── socials.ts
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useMousePosition.ts
│   │   └── useInView.ts
│   ├── lib/
│   │   ├── animations.ts
│   │   └── cn.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

### 6.3 Data model

`src/data/projects.ts` — all projects live here as a typed array:

```ts
export type Project = {
  id: string
  title: string
  description: string          // 1-line for the tile
  longDescription: string      // paragraph(s) for the detail view
  stack: string[]              // e.g. ["TypeScript", "React", "Vite"]
  gradient: string             // e.g. "from-pink-400 via-purple-400 to-indigo-400"
  screenshot: string | null    // null = placeholder shown
  url?: string
  repo?: string
  year: number
}
```

Other data files follow the same pattern: typed, editable, single source of truth.

### 6.4 Theming implementation

- All design tokens defined as CSS custom properties in `src/styles/theme.css`.
- `dark` class on `<html>` toggled by `useTheme` hook.
- Theme persists in `localStorage`; defaults to `prefers-color-scheme`.
- Tailwind `dark:` variants for any utility classes not covered by tokens.

### 6.5 Architectural decisions

- **`BentoTile` is a thin motion wrapper.** All tilt, hover, and expand logic lives there. Child components are pure and content-focused — easy to reason about and modify.
- **Shared Framer Motion variants in `lib/animations.ts`** so timing/feel is a single-file tune.
- **Custom `useInView` hook** (IntersectionObserver) so thresholds and throttling can be tuned without adding a dependency.
- **No router.** Site is single-page. Anchor links for in-page navigation.

## 7. Testing

This is a portfolio, not a product — manual testing is appropriate.

- **Dev server checklist** (in `README.md`): the user walks through this after implementation:
  - Page loads without console errors.
  - Tiles reveal on scroll in stagger.
  - Hover effects (tilt, lift, parallax) work on all tiles.
  - Click expand works on hero + project tiles; Escape closes.
  - Magnetic cursor works on desktop, hidden on mobile.
  - Theme toggle persists across reload.
  - All responsive breakpoints render correctly (resize browser to test).
  - `prefers-reduced-motion` disables motion (toggle in OS settings to test).
  - Keyboard navigation: tab through interactive elements, focus rings visible.
- **Automated smoke check:** `npm run test:smoke` runs a Lighthouse + a11y audit (axe) against the dev server and reports scores. Not a gate — informational only.

## 8. Open Items (post-design)

- Confirm display name (working: "Ade"). Easy to change in `data/`.
- Drop in real project screenshots when ready — replace `screenshot: null` with image path.
- Optional: configure real GitHub username for live activity tile (currently uses mock data; falling back to mock is acceptable for v1).

## 9. Implementation Order (high-level)

1. Scaffold Vite + React + TS + Tailwind.
2. Set up theme system (CSS tokens, `useTheme`, toggle).
3. Build `BentoGrid` + `BentoTile` motion wrapper.
4. Build the eight tile components with placeholder content.
5. Add `MagneticCursor`, `MeshGradient`, `Marquee`.
6. Wire up `TileDetail` expand view.
7. Add scroll reveal orchestration.
8. Responsive pass across breakpoints.
9. Accessibility pass (focus, reduced motion, contrast).
10. Polish, perf check, write README.
