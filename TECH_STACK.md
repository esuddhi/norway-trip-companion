# TECH_STACK.md — Technologies, Versions & Rationale

## Overview

Every dependency in this project must justify its presence. The stack is intentionally minimal — a family travel app should load fast, work offline, and never break because a dependency changed.

---

## Core Framework

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| React | 19.1 | UI framework | Industry standard, excellent ecosystem, concurrent features |
| React DOM | 19.1 | DOM rendering | Required by React |
| TypeScript | ~5.8 | Type safety | Catches bugs at compile time, improves DX |
| Vite | 7.1 | Build tool + dev server | Fastest dev experience, excellent ESM support, native TS |

---

## Routing

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| React Router DOM | 7.8 | Client-side routing | De facto React routing solution, layout routes, URL params |

---

## State Management

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| Zustand | 5.0 | Client state (preferences) | Tiny (~1KB), no boilerplate, built-in persist middleware |

---

## Data Validation

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| Zod | 4.0 | Runtime schema validation | Type inference from schemas, excellent DX, small bundle |

---

## Maps

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| Leaflet | 1.9 | Interactive maps | Open source, lightweight, OpenStreetMap compatible |
| React Leaflet | 5.0 | React wrapper for Leaflet | Declarative Leaflet in React |

---

## Search

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| Fuse.js | 7.1 | Client-side fuzzy search | Works offline, no server needed, lightweight |

---

## Utilities

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| QRCode React | 4.2 | QR code generation | Quick navigation to hotel addresses |
| @heroicons/react | 2.2 | Icon library | Clean, consistent icons from Tailwind ecosystem |

---

## PWA

| Technology | Version | Purpose | Rationale |
|-----------|---------|---------|-----------|
| vite-plugin-pwa | 1.0 | PWA + service worker | Workbox integration, auto-precache, manifest generation |

---

## Development Tools

| Technology | Version | Purpose |
|-----------|---------|---------|
| Vitest | 3.2 | Unit and component testing |
| @testing-library/react | 16.3 | Component testing utilities |
| @testing-library/jest-dom | 6.8 | DOM assertion matchers |
| jsdom | 26.1 | Browser environment for tests |
| ESLint | 9.33 | Code linting |
| typescript-eslint | 8.39 | TypeScript-aware lint rules |
| eslint-plugin-react-hooks | 5.2 | React hooks lint rules |
| eslint-plugin-react-refresh | 0.4 | Fast refresh compatibility |
| Prettier | 3.6 | Code formatting |
| tsx | 4.20 | TypeScript execution for scripts |
| @vitejs/plugin-react | 5.0 | React Fast Refresh + JSX |

---

## Unused Dependencies (Technical Debt)

These are installed but NOT used in the current codebase. Scheduled for removal in Sprint 1.

| Technology | Version | Reason Unused |
|-----------|---------|---------------|
| framer-motion | 12.23 | Listed in package.json but never imported in source |
| react-hook-form | 7.62 | No forms use it |
| @hookform/resolvers | 5.1 | Companion to react-hook-form |
| @tanstack/react-query | 5.85 | Provider wraps app in main.tsx but no queries exist |
| react-markdown | 10.1 | No markdown rendering in app |

**Impact**: ~80KB+ of unnecessary bundle size.

---

## Not Used (And Why)

| Technology | Why Not |
|-----------|---------|
| Tailwind CSS | Adds build complexity; custom CSS gives more design control for this project's unique aesthetic |
| Next.js | SSR not needed — this is a static PWA with no server |
| Redux | Overkill — Zustand covers our needs in 1/10th the code |
| Axios | Native `fetch` is sufficient; no HTTP abstraction needed |
| Styled Components | Runtime CSS-in-JS adds bundle weight; plain CSS is faster |
| Firebase | No backend needed — everything is client-side |
| GraphQL | No API server to query |

---

## Infrastructure

| Service | Purpose |
|---------|---------|
| GitHub | Source code, issues, PRs |
| GitHub Actions | CI/CD (lint, test, build, deploy) |
| GitHub Pages | Static hosting (free, HTTPS) |
| OpenStreetMap | Map tiles (free, no API key) |

---

## Future Considerations

| Technology | When | Purpose |
|-----------|------|---------|
| Yr.no API | Sprint 4 | Norwegian weather data (free, no API key for basic use) |
| Web Share API | Sprint 7 | Native share sheets |
| Web App Manifest | Already present | Install as native app |
| IndexedDB | Sprint 6 | Large offline data (map tiles, images) |

---

## Dependency Policy

1. **Justify before adding**: Every new dependency must solve a real problem that can't be solved with built-in APIs in less than 50 lines.
2. **Pin versions**: Use exact versions in package.json (no `^` for production deps after stabilization).
3. **Audit regularly**: Check for unused deps each sprint.
4. **Prefer small**: Choose the smallest library that does the job.
5. **Prefer maintained**: No dependencies with < 1 year of activity.
