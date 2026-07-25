# CODING_STANDARDS.md — Conventions & Style Guide

## Source of Truth

These standards are derived from the actual codebase, tooling configuration, and the project's master prompt. When in doubt, the existing code pattern wins over generic best practices.

---

## Formatting (Prettier)

Enforced via `.prettierrc.json`:

```json
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 100
}
```

- Single quotes for strings.
- No semicolons.
- 100-character line width.
- Run `npm run format` to verify.

---

## Linting (ESLint)

Configured in `eslint.config.js`:

- TypeScript ESLint recommended rules.
- React Hooks rules (exhaustive deps, rules of hooks).
- React Refresh (only export components from `.tsx` files).
- Zero warnings policy: `--max-warnings=0`.

---

## TypeScript

### Strictness

- `strict: true` via `tsconfig.app.json`.
- No `any` types. Use `unknown` and narrow.
- No type assertions (`as`) unless absolutely necessary — prefer type guards.
- Interfaces for object shapes. Types for unions and intersections.

### Naming

| Category           | Convention               | Example                  |
| ------------------ | ------------------------ | ------------------------ |
| Components         | PascalCase               | `DayCard`, `MapView`     |
| Functions          | camelCase                | `dateLabel`, `hotelFor`  |
| Constants          | camelCase or UPPER_SNAKE | `tripData`, `MAX_TILES`  |
| Types/Interfaces   | PascalCase               | `TripData`, `AppState`   |
| Files (components) | PascalCase.tsx           | `DayCard.tsx`            |
| Files (utilities)  | camelCase.ts             | `trip.ts`                |
| Files (tests)      | match source + `.test`   | `trip.test.ts`           |
| CSS classes        | kebab-case               | `day-card`, `hero-stats` |

### Exports

- Named exports preferred over default exports.
- One main export per file (additional helpers co-located are acceptable).

---

## React Patterns

### Components

- Functional components only (no class components).
- Props typed inline or with extracted interface for complex shapes.
- Destructure props in function signature.
- Keep components small — if it exceeds ~80 lines, extract sub-components.

```tsx
// Good
export function DayCard({ day, index }: { day: TripData['days'][number]; index: number }) {
  return (
    <Link className="day-card" to={`/planner/${day.id}`}>
      ...
    </Link>
  )
}
```

### Hooks

- Prefix with `use`: `useAppStore`, `useOfflineStatus`.
- Custom hooks go in `src/hooks/`.
- Keep hook logic minimal — delegate to `lib/` utilities for computation.

### State

- Zustand for persistent client state (preferences, interaction state).
- React state (`useState`) for ephemeral UI state (form inputs, toggle visibility).
- Never store trip data in state — it's static and imported.

---

## Data Layer

### Schema-First

- All external data (JSON, API responses) must pass through Zod validation.
- The schema IS the documentation for the data contract.
- Schema lives in `src/data/schema.ts`.

### Immutability

- `tripData` is treated as read-only after parse.
- Never mutate imported data — derive new values in `lib/` functions.

---

## CSS

### Current Pattern

- Single global stylesheet (`src/styles.css`).
- Class-based styling with semantic names.
- CSS custom properties for theme switching (`data-theme` attribute).
- Mobile-first with `@media (max-width: 700px)` override.

### Naming

- Component classes: `.component-name` (e.g., `.day-card`, `.hero-stats`).
- Modifiers via separate class: `.event-dot.ferry`, `.selected`.
- State via parent attribute: `:root[data-theme='dark'] .day-card`.
- Utility classes: `.eyebrow`, `.lede`, `.back`.

### Rules

- No inline styles except dynamic values (e.g., progress bar width).
- Consistent spacing scale (multiples of 4–8px).
- Transitions: use 0.2s default.
- Border radius: 12–18px for cards, 99px for pills.
- Avoid `!important` except in print styles.

---

## File Organization

### Current (Scaffold)

All pages in one file. This is acknowledged technical debt.

### Target

```
src/
├── components/      Reusable, composable UI pieces
├── data/            Trip data + Zod schema
├── hooks/           Custom React hooks
├── lib/             Pure utility functions (testable, no React imports)
├── pages/           One file per route (lazy-loadable)
├── store/           Zustand stores
├── types/           Shared type definitions
├── main.tsx         Entry point (routing + providers)
└── styles.css       Global styles
```

**Principle**: Every folder has one responsibility. A file should be findable by its function.

---

## Testing

### Framework

- Vitest for unit and component tests.
- React Testing Library for component behavior.
- jsdom environment.

### Standards

- Tests colocated with source: `trip.test.ts` next to `trip.ts`.
- Descriptive test names: `it('calculates distance from the supplied itinerary')`.
- Test behavior, not implementation.
- No mocking of internal modules unless testing integration boundaries.

### Coverage Goals

- `lib/` utilities: 100% coverage.
- Components: test user-facing behavior (render, interaction, accessibility).
- Pages: integration tests for critical flows.

---

## Imports

### Order

1. React / framework imports
2. Third-party libraries
3. Internal absolute imports (components, lib, data, store)
4. Relative imports
5. CSS / style imports

### Style

```tsx
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Fuse from 'fuse.js'
import { tripData } from '../data/trip'
import { dateLabel } from '../lib/trip'
import { DayCard } from '../components/DayCard'
import './styles.css'
```

---

## Performance

- Lazy load pages with `React.lazy()` + `Suspense`.
- Avoid unnecessary re-renders: memoize expensive computations with `useMemo`.
- Keep bundle small: tree-shake, remove unused dependencies.
- Images: use modern formats (WebP/AVIF), lazy load below fold.
- Service worker handles offline — design for it from day one.

---

## Accessibility

- Semantic HTML (`nav`, `main`, `article`, `section`, `header`).
- ARIA labels on interactive elements without visible text.
- Color contrast: meet WCAG AA minimum (4.5:1 for text).
- Keyboard navigable: all interactive elements focusable.
- Focus indicators visible in both light and dark themes.

---

## Git & Workflow

- Branch from `develop` for feature work.
- PR to `develop` for review.
- `main` is production — only merge from `develop` when stable.
- Commit messages follow Conventional Commits (see AGENTS.md).
- No force pushes to shared branches.
