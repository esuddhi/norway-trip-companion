# ROADMAP.md — Development Plan

## Philosophy

Each sprint delivers measurable value.
No sprint introduces features without completing the previous sprint's cleanup.
Quality over velocity.

---

## Sprint 0 — Foundation ✅

**Status**: Complete (single scaffold commit)

- [x] React + TypeScript + Vite project setup
- [x] Data-first architecture (trip.json + Zod schema)
- [x] Basic routing (11 routes)
- [x] Dashboard, Timeline, Planner, Map, Packing, Search, Accommodation, Emergency, Expenses, Settings, Admin pages
- [x] PWA with service worker (offline app shell + tile caching)
- [x] Zustand store (theme + checklist persistence)
- [x] Leaflet map integration
- [x] Fuse.js search
- [x] CI/CD pipeline (GitHub Actions)
- [x] Mobile responsive layout
- [x] Dark mode

---

## Sprint 1 — Repository Cleanup & Performance

**Status**: Next

**Goal**: Eliminate technical debt from scaffold, establish clean foundation for features.

### Tasks

- [ ] Fix `index.html` — add proper `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` structure
- [ ] Split `pages.tsx` into individual page files in `src/pages/`
- [ ] Remove unused dependencies: `framer-motion`, `react-hook-form`, `@hookform/resolvers`, `@tanstack/react-query`, `react-markdown`
- [ ] Add lazy loading with `React.lazy()` + `Suspense` for all pages
- [ ] Persist expenses in Zustand store
- [ ] Add component tests for Dashboard, Packing, and DayCard
- [ ] Create `src/hooks/` and `src/types/` directories
- [ ] Audit and fix accessibility (ARIA labels, focus indicators, color contrast)
- [ ] Add `.env.example` for future weather API config

### Definition of Done

- All pages load independently via lazy loading
- Bundle size reduced (unused deps removed)
- Expenses survive page refresh
- Test count: ≥ 12 (from current 4)
- Build passes, lint clean, no TypeScript errors

---

## Sprint 2 — Data Enrichment & Map Enhancement

**Goal**: Make the map genuinely useful for the trip.

### Tasks

- [ ] Expand `trip.json` with 30+ places:
  - EV chargers along route (IONITY, Tesla Supercharger)
  - Scenic viewpoints (Stegastein, Dalsnibba, etc.)
  - Restaurants and cafes
  - Rest areas with toilets
  - Kid-friendly activities
  - Swimming spots
  - Parking areas
- [ ] Add map filtering by place type
- [ ] Add map clustering for dense areas
- [ ] Add "navigate" buttons linking to Google Maps / Apple Maps
- [ ] Add driving route polylines on map
- [ ] Color-code markers by type

### Definition of Done

- Map is useful as standalone navigation aid
- All locations verified against real data
- Filter controls work on mobile

---

## Sprint 3 — EV Charging Intelligence

**Goal**: Address range anxiety for the Tesla Model Y and Volvo EX40.

### Tasks

- [ ] Add EV-specific data to schema: charger power, connector type, network, amenities
- [ ] Create EV Planner page with:
  - Route-level charge planning
  - Estimated battery arrival at each stop
  - Charging duration estimates
  - Nearby amenities during charge
- [ ] Add mountain/weather impact warnings on battery
- [ ] Support both Tesla Supercharger and CCS networks
- [ ] Add charger availability notes

### Definition of Done

- Families can plan charging stops without external apps
- Works offline with pre-loaded charger data

---

## Sprint 4 — Weather Integration

**Goal**: Real weather data with graceful offline fallback.

### Tasks

- [ ] Integrate weather API (Yr.no — Norwegian weather service, free)
- [ ] Show 7-day forecast on Dashboard
- [ ] Show per-day weather on Planner pages
- [ ] Add weather-appropriate activity recommendations
- [ ] Rain alternatives for each day
- [ ] Cache weather data for offline use (24h TTL)
- [ ] Add `.env` variable for API key

### Definition of Done

- Weather displays on Dashboard and Planner
- Graceful fallback when offline (shows cached or static data)
- No UI errors when API unavailable

---

## Sprint 5 — Family Experience & UX Polish

**Goal**: Make the app feel designed for families with children.

### Tasks

- [ ] Add kid-friendly indicators on activities
- [ ] Add estimated timing for rest breaks
- [ ] Add stroller accessibility info
- [ ] Add "are we there yet?" progress indicators on drive days
- [ ] Add family tips per day
- [ ] Improve mobile touch targets (min 44px)
- [ ] Add haptic feedback on checklist interactions (where supported)
- [ ] Add Norway photography / hero images
- [ ] Refine Norway color palette per design philosophy

### Definition of Done

- Parents can hand the phone to kids for "how far?" questions
- All activities clearly tagged for age-appropriateness
- App feels premium and family-friendly

---

## Sprint 6 — Offline Maps & Media

**Goal**: Full offline capability — no internet needed during trip.

### Tasks

- [ ] Pre-download map tiles for the full route corridor
- [ ] Add offline indicator in UI
- [ ] Add hero photography (compressed, lazy-loaded)
- [ ] Explore offline routing (if feasible without large dataset)
- [ ] Test app in airplane mode end-to-end

### Definition of Done

- App is fully functional with no network
- Map tiles cover the driving corridor
- Images load from cache

---

## Sprint 7 — Export & Sharing

**Goal**: Support print and share use cases.

### Tasks

- [ ] PDF export of full itinerary
- [ ] Printable day-by-day handbook
- [ ] Share trip link (static export)
- [ ] Improve print stylesheet for all pages
- [ ] Add QR codes for quick access to key pages

### Definition of Done

- Family can print a paper backup
- Trip is shareable as a link or PDF

---

## Future Backlog (Unscheduled)

These features are in scope per the master prompt but not yet planned:

- Ferry schedule integration
- Road closure / construction alerts
- Photo journal / travel diary
- Trip replay after return
- Voice navigation prompts
- AI travel assistant (conversational)
- Widget support (home screen)
- Apple CarPlay / Android Auto
- Wildlife alerts (moose, reindeer)
- Camera/speed camera locations
- Child entertainment (games, trivia)
- Multi-trip support (replace trip.json)
- Expense categories and budget tracking
- Currency converter (SEK ↔ NOK)
- Emergency location sharing

---

## Principles for Backlog Prioritization

1. Does it help during the trip (July 26 – Aug 1, 2026)?
2. Does it work offline?
3. Does it reduce stress or increase safety?
4. Is it achievable without over-engineering?
5. Does it make the family smile?

If yes to 3+ of these, prioritize it.
