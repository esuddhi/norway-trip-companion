# ARCHITECTURE.md — System Architecture

## Overview

Norway Road Trip Companion is a mobile-first, offline-capable Progressive Web App (PWA) that serves as an interactive travel guide for a family road trip through Norway.

The architecture follows a **data-first** pattern: all itinerary content lives in a validated JSON file, parsed at startup by Zod, and consumed by a typed React component tree. No business logic depends on component state; the UI is a pure projection of validated data.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
├─────────────────────────────────────────────────────────────┤
│  Service Worker (Workbox)                                    │
│  ├── Precaches: app shell, CSS, JS, JSON, SVG               │
│  └── Runtime: CacheFirst for OpenStreetMap tiles             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              React Application                       │    │
│  │                                                      │    │
│  │  ┌──────────┐   ┌──────────┐   ┌──────────────┐    │    │
│  │  │  Pages   │   │Components│   │   AppShell    │    │    │
│  │  │(routes)  │◄──│(reusable)│◄──│(layout+nav)   │    │    │
│  │  └────┬─────┘   └──────────┘   └──────────────┘    │    │
│  │       │                                              │    │
│  │  ┌────▼─────────────────────────────────────────┐   │    │
│  │  │              Data Layer                       │   │    │
│  │  │                                              │   │    │
│  │  │  trip.json → Zod Schema → Typed TripData     │   │    │
│  │  │                                              │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │       │                                              │    │
│  │  ┌────▼─────┐   ┌──────────────┐                   │    │
│  │  │  lib/    │   │   store/     │                    │    │
│  │  │(utilities│   │ (Zustand +   │                    │    │
│  │  │ pure fn) │   │  persist)    │                    │    │
│  │  └──────────┘   └──────────────┘                   │    │
│  │                                                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Layers

### 1. Data Layer (`src/data/`)

**Responsibility**: Single source of truth for all trip content.

| File        | Purpose                                                       |
| ----------- | ------------------------------------------------------------- |
| `trip.json` | Raw itinerary data (days, hotels, places, packing, emergency) |
| `schema.ts` | Zod schema defining the data contract                         |
| `trip.ts`   | Parses and exports validated, typed `tripData`                |

**Key principle**: To change the trip, modify `trip.json` — never the UI code.

### 2. Business Logic Layer (`src/lib/`)

**Responsibility**: Pure utility functions that transform trip data.

| Function          | Purpose                                |
| ----------------- | -------------------------------------- |
| `dateLabel()`     | Formats ISO date to readable label     |
| `daysUntil()`     | Calculates countdown to trip start     |
| `hotelFor()`      | Finds hotel by ID from trip data       |
| `totalDistance()` | Sums driving distances across all days |

**Key principle**: No side effects. No DOM access. Fully testable.

### 3. State Layer (`src/store/`)

**Responsibility**: Client-side persistent state (not trip content).

| Store         | Manages                                            |
| ------------- | -------------------------------------------------- |
| `useAppStore` | Theme preference, packing checklist checked states |

**Key principle**: Zustand with `persist` middleware. Only user preferences and interaction state — never trip data duplication.

### 4. Component Layer (`src/components/`)

**Responsibility**: Reusable UI building blocks.

| Component  | Purpose                                         |
| ---------- | ----------------------------------------------- |
| `AppShell` | Layout wrapper, header, bottom navigation       |
| `DayCard`  | Day summary card used in timeline and dashboard |
| `MapView`  | Leaflet map rendering hotels and places         |

### 5. Page Layer (`src/pages.tsx` — planned: `src/pages/`)

**Responsibility**: Route-level views composing components and data.

| Page          | Route             | Purpose                             |
| ------------- | ----------------- | ----------------------------------- |
| Dashboard     | `/`               | Hero, stats, today's plan, overview |
| Timeline      | `/timeline`       | All days in timeline layout         |
| Planner       | `/planner/:dayId` | Single day detailed plan            |
| MapPage       | `/map`            | Interactive map + place listing     |
| Packing       | `/packing`        | Checklist with persistence          |
| Search        | `/search`         | Fuzzy search across all data        |
| Accommodation | `/accommodation`  | Hotel details + QR codes            |
| Emergency     | `/emergency`      | Callable emergency contacts         |
| Expenses      | `/expenses`       | Trip expense tracker                |
| Settings      | `/settings`       | Theme + data management             |
| Admin         | `/admin`          | JSON import validation              |

### 6. Service Worker Layer (Vite PWA / Workbox)

**Responsibility**: Offline support and performance.

- Precaches all build artifacts (JS, CSS, HTML, SVG, JSON)
- Runtime caching: OpenStreetMap tiles with CacheFirst strategy (21-day TTL, 150 tile max)

---

## Data Flow

```
trip.json
    │
    ▼ (import + Zod parse at build time)
tripData: TripData (fully typed, immutable)
    │
    ├──▶ Pages read tripData directly
    ├──▶ lib/ functions accept TripData as parameter
    └──▶ Components receive data as props

User interactions (theme, checklist) ──▶ Zustand store ──▶ localStorage
```

---

## Routing

React Router v7 with layout route pattern:

```
<BrowserRouter>
  <Routes>
    <Route element={<AppShell />}>      ← layout wrapper
      <Route index />                    ← Dashboard
      <Route path="timeline" />
      <Route path="planner/:dayId" />
      <Route path="map" />
      <Route path="packing" />
      <Route path="search" />
      <Route path="settings" />
      <Route path="accommodation" />
      <Route path="emergency" />
      <Route path="expenses" />
      <Route path="admin" />
    </Route>
  </Routes>
</BrowserRouter>
```

---

## File Structure (Current)

```
norway-trip-companion/
├── .github/workflows/deploy.yml    CI/CD pipeline
├── public/icon.svg                 App icon
├── scripts/validate-data.ts        Data validation script
├── src/
│   ├── components/
│   │   ├── AppShell.tsx            Layout + navigation
│   │   ├── DayCard.tsx             Day summary card
│   │   └── MapView.tsx             Leaflet map
│   ├── data/
│   │   ├── schema.ts              Zod schema
│   │   ├── trip.json              Trip content
│   │   └── trip.ts                Validated export
│   ├── lib/
│   │   ├── trip.ts                Pure utility functions
│   │   └── trip.test.ts           Tests
│   ├── store/
│   │   └── useAppStore.ts         Zustand store
│   ├── main.tsx                   App entry point
│   ├── pages.tsx                  All page components
│   └── styles.css                 Global styles
├── index.html
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── eslint.config.js
└── .prettierrc.json
```

---

## File Structure (Target)

```
norway-trip-companion/
├── src/
│   ├── components/                 Reusable UI components
│   ├── data/                       Trip data + schema
│   ├── hooks/                      Custom React hooks
│   ├── lib/                        Pure utilities
│   ├── pages/                      One file per route
│   ├── store/                      Zustand stores
│   ├── types/                      Shared TypeScript types
│   ├── main.tsx                    Entry point
│   └── styles.css                  Global styles (→ CSS modules later)
├── docs/                           Extended documentation
├── scripts/                        Build/validation scripts
└── public/                         Static assets
```

---

## Design System (Current)

### Colors

| Token         | Light               | Dark      | Usage            |
| ------------- | ------------------- | --------- | ---------------- |
| Background    | `#f5f5ef`           | `#10242a` | Page background  |
| Text          | `#15333c`           | `#e9efe9` | Body text        |
| Brand dark    | `#173e46`           | —         | Nav bar, accents |
| Green accent  | `#4f8c68`           | —         | Status, links    |
| Hero gradient | `#102f39 → #2c5860` | —         | Dashboard hero   |
| Card surface  | `#fffefa`           | `#18363b` | Card backgrounds |
| Card border   | `#e2e5df`           | `#315158` | Card borders     |

### Typography

| Font             | Weight   | Usage                      |
| ---------------- | -------- | -------------------------- |
| Playfair Display | 600, 700 | Headings, display numbers  |
| DM Sans          | 400–700  | Body text, UI labels       |
| DM Mono          | 400, 500 | Eyebrows, timestamps, code |

### Breakpoints

| Name    | Width   | Notes                            |
| ------- | ------- | -------------------------------- |
| Mobile  | ≤ 700px | Single column, simplified layout |
| Desktop | > 700px | Multi-column grids               |

---

## Architecture Audit

### Status: Alpha / Scaffold

The project has a single commit containing a complete but monolithic scaffold.

### Implemented Features

- ✅ Dashboard with countdown, stats, hero section
- ✅ 7-day timeline view
- ✅ Day planner with hourly events
- ✅ Interactive Leaflet map (hotels + 3 places)
- ✅ Packing checklist with persistence
- ✅ Fuzzy search (Fuse.js)
- ✅ Accommodation page with QR codes
- ✅ Emergency contacts (callable)
- ✅ Expense tracker (session-only, not persisted)
- ✅ Settings (theme toggle, data export)
- ✅ Admin (JSON import validation)
- ✅ PWA with service worker
- ✅ CI/CD pipeline (GitHub Actions → Pages)
- ✅ Zod data validation
- ✅ Dark mode support
- ✅ Mobile responsive layout
- ✅ Print styles

### Technical Debt

| Issue                                                           | Severity | Impact                                                       |
| --------------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| All pages in single file (`pages.tsx`, 180+ lines)              | High     | Maintainability, code splitting impossible                   |
| No lazy loading / code splitting                                | Medium   | Bundle size, initial load time                               |
| Expenses not persisted                                          | Medium   | Data loss on refresh                                         |
| Framer Motion imported but unused                               | Low      | Bundle bloat (~30KB)                                         |
| `@hookform/resolvers` + `react-hook-form` unused                | Low      | Unnecessary dependencies                                     |
| `@tanstack/react-query` imported but no API calls               | Low      | Unused dependency                                            |
| `react-markdown` dependency unused                              | Low      | Bundle bloat                                                 |
| Only 4 unit tests                                               | Medium   | Insufficient coverage                                        |
| No accessibility testing                                        | Medium   | WCAG compliance unknown                                      |
| `index.html` missing `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` | High     | PWA cannot inject service worker/manifest; non-standard HTML |
| CSS in single monolithic file (12KB)                            | Low      | Harder to maintain at scale                                  |
| Map has only 3 places                                           | Low      | Incomplete data                                              |
| Static weather strings (no API)                                 | Low      | No live data                                                 |

### Missing Components (vs. Master Prompt)

- EV charging planner / route optimizer
- Weather API integration
- Family-specific UX (kid indicators, rest timing)
- Photography / image assets
- Offline map tiles (beyond visited tiles)
- Ferry schedule integration
- PDF export
- Photo journal / travel diary
- Road closure alerts
- Additional map markers (chargers, restaurants, parking, toilets)

### Recommended Next Sprint

1. Split `pages.tsx` into individual page files
2. Remove unused dependencies (framer-motion, react-hook-form, react-query, react-markdown)
3. Add lazy loading with React.lazy + Suspense
4. Persist expenses in Zustand store
5. Expand trip.json with more places (chargers, viewpoints, restaurants)
6. Add component tests for critical UI paths
