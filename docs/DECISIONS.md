# DECISIONS.md — Architectural Decision Records

## Format

Each decision follows the ADR (Architecture Decision Record) format:

- **ID**: Sequential number
- **Date**: When the decision was made
- **Status**: Proposed | Accepted | Superseded | Deprecated
- **Context**: What prompted the decision
- **Decision**: What was decided
- **Consequences**: What follows from the decision

---

## ADR-001: Data-First Architecture

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted

### Context

The app serves a fixed 7-day itinerary. Content changes are about data (new stops, updated times), not UI structure. We need the ability to replace the entire trip without modifying application code.

### Decision

All trip content lives in a single `trip.json` file, validated at import time by a Zod schema. The UI is a pure projection of typed data. No itinerary content is hardcoded in components.

### Consequences

- ✅ Trip data is testable independently (`validate-data` script)
- ✅ Schema serves as documentation of the data contract
- ✅ Another trip can be created by replacing one file
- ✅ CI can validate data integrity
- ⚠️ Schema changes require updating both schema.ts and trip.json
- ⚠️ Large datasets (100+ places) may need lazy parsing in the future

---

## ADR-002: Zustand Over Redux

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted

### Context

The app needs to persist user preferences (theme) and interaction state (packing checklist). The data is simple key-value pairs. Redux would introduce boilerplate (slices, actions, reducers) disproportionate to the problem.

### Decision

Use Zustand with the `persist` middleware for client-side state. Keep the store minimal — only user preferences and interaction state, never trip data.

### Consequences

- ✅ ~1KB bundle addition (vs ~12KB for Redux toolkit)
- ✅ Zero boilerplate
- ✅ Built-in localStorage persistence
- ✅ Simple mental model
- ⚠️ Not suitable if we needed server state sync (but we don't)

---

## ADR-003: Zod Over io-ts / Yup / Manual Validation

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted

### Context

Trip data comes from a JSON file. We need runtime validation that also produces TypeScript types. Options: manual type guards, Yup, io-ts, Zod.

### Decision

Use Zod v4 for schema definition and runtime validation. Derive the `TripData` type from the schema using `z.infer<>`.

### Consequences

- ✅ Single source of truth for types AND validation
- ✅ Excellent TypeScript integration
- ✅ Small bundle (~13KB)
- ✅ Clear error messages for invalid data
- ⚠️ Zod v4 is newer — fewer community examples than v3

---

## ADR-004: PWA with Workbox (via vite-plugin-pwa)

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted

### Context

The app must work offline in Norwegian fjords and tunnels where cellular coverage is unreliable. The primary use case is consulting the itinerary without internet.

### Decision

Use `vite-plugin-pwa` to generate a service worker that:
- Precaches the app shell (HTML, CSS, JS, JSON, SVG)
- Runtime-caches OpenStreetMap tiles with CacheFirst strategy

### Consequences

- ✅ Full offline support for app content
- ✅ Map tiles cached after first view
- ✅ Zero-config integration with Vite build
- ⚠️ Map tiles only cached for areas already viewed (not pre-downloaded)
- ⚠️ Service worker updates require user acknowledgment (`registerType: 'prompt'`)

---

## ADR-005: OpenStreetMap Over Google Maps / Mapbox

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted

### Context

The map needs to show hotels, places, and chargers with markers and popups. Options: Google Maps (requires API key, billing), Mapbox (API key, usage limits), OpenStreetMap/Leaflet (free, open).

### Decision

Use Leaflet with OpenStreetMap tiles. No API key required, no usage limits, tiles are cacheable for offline use.

### Consequences

- ✅ Free, no billing surprises
- ✅ No API key management
- ✅ Tiles cacheable via service worker
- ✅ Works in all countries without restrictions
- ⚠️ Less polished than Google Maps
- ⚠️ No built-in routing/directions (we link out to Google Maps for navigation)
- ⚠️ No traffic data

---

## ADR-006: Single CSS File (Initial)

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted (may be superseded)

### Context

The scaffold needs styling. Options: Tailwind, CSS Modules, Styled Components, plain CSS.

### Decision

Use a single global CSS file with semantic class names. The Norway-inspired design requires fine-grained visual control that utility-first CSS makes harder to achieve for unique aesthetics.

### Consequences

- ✅ Full design control
- ✅ No build-time CSS processing beyond standard Vite
- ✅ Zero additional dependencies
- ✅ Norway palette implemented precisely
- ⚠️ At scale (50+ components), may become hard to maintain
- ⚠️ No automatic scoping — class naming discipline required
- 📋 May revisit with CSS Modules if the file grows past 20KB

---

## ADR-007: GitHub Pages Deployment

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted

### Context

The app is a static PWA. Hosting options: Vercel, Netlify, GitHub Pages, Cloudflare Pages.

### Decision

Deploy to GitHub Pages via GitHub Actions. The app is already on GitHub; Pages is free, zero-config, and integrated with the CI pipeline.

### Consequences

- ✅ Free hosting with HTTPS
- ✅ Automatic deployment on push to main
- ✅ No external service accounts
- ⚠️ No server-side functionality (fine for a static PWA)
- ⚠️ Base path requires `process.env.GITHUB_ACTIONS` check in Vite config

---

## ADR-008: All Pages in Single File (Scaffold Decision)

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted → **Will be superseded in Sprint 1**

### Context

During initial scaffolding, all 11 page components were placed in a single `pages.tsx` file for rapid prototyping.

### Decision

Ship the scaffold with a monolithic pages file to validate the overall structure quickly.

### Consequences

- ✅ Fast initial development
- ❌ Cannot lazy-load individual pages
- ❌ 180+ line file violates single-responsibility principle
- ❌ Hard to navigate, hard to test individual pages
- 📋 **Sprint 1 will split this into `src/pages/` directory**

---

## ADR-009: Fuse.js for Client-Side Search

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted

### Context

Users need to find hotels, stops, and chargers quickly. The dataset is small (~50 items max). Options: simple `Array.filter`, Fuse.js fuzzy search, Lunr.js full-text search.

### Decision

Use Fuse.js for fuzzy search across trip data (days, hotels, places).

### Consequences

- ✅ Typo-tolerant search (useful on mobile keyboards)
- ✅ Works entirely offline
- ✅ Small bundle (~5KB)
- ✅ Configurable relevance scoring
- ⚠️ Overkill for < 20 items (but scales to future data expansion)

---

## ADR-010: React Router v7 with Layout Routes

**Date**: 2026-07-24 (Sprint 0)
**Status**: Accepted

### Context

The app has 11 routes sharing a common layout (header, bottom nav, main content area). Need URL-based navigation for bookmarkability and back-button support.

### Decision

Use React Router v7 with a layout route pattern. `AppShell` wraps all routes via `<Outlet />`.

### Consequences

- ✅ Shared layout without prop drilling
- ✅ URL-based navigation (shareable, bookmarkable)
- ✅ Dynamic segments for day planner (`/planner/:dayId`)
- ✅ Compatible with React.lazy for code splitting
- ⚠️ React Router v7 is latest — some community guides still reference v6

---

## Template for New Decisions

```markdown
## ADR-XXX: Title

**Date**: YYYY-MM-DD (Sprint N)
**Status**: Proposed | Accepted | Superseded | Deprecated

### Context

What is the issue we're facing?

### Decision

What did we decide to do?

### Consequences

What are the positive and negative outcomes?
```
