# Fjordline — Norway Road Trip Companion

A mobile-first, offline-capable PWA for a Norway road trip. The sample trip covers 26 July–1 August 2026.

## Quick Start

```bash
npm install
npm run dev        # Start dev server (accessible on LAN)
npm test           # Run all 85 tests
npm run build      # Production build (tsc + vite)
```

Open `/roadbook` to access the Driver & Navigator Roadbook.

### Accessing from Mobile (LAN)

The dev server is configured with `server.host: true` and listens on all network interfaces.

1. Run `npm run dev`
2. Vite will output a **Network** URL like `http://192.168.x.x:5173/`
3. Open that URL on your phone (same Wi-Fi network)

**Windows Firewall**: You may need to allow Node.js through the firewall on port 5173. Run as Administrator:

```powershell
netsh advfirewall firewall add rule name="Vite Dev Server" dir=in action=allow protocol=TCP localport=5173
```

## Roadbook Architecture (Sprint 1)

The Roadbook is a Driver & Navigator companion designed to reduce cognitive load while travelling. Every screen answers:

- Where do we go next?
- Where do we park?
- Where do we regroup?
- Where do we charge?
- What changes if it rains?

### Data Flow

```
trip data/*.yaml → src/data/days/*.yaml → parser.ts → typed RoadbookDayData → Components
```

All itinerary content lives in YAML files (`src/data/days/day1.yaml` through `day7.yaml`). These are imported as raw strings at build time and parsed with `js-yaml` into typed TypeScript objects. Components never contain hardcoded itinerary data.

### Component Architecture

```
RoadbookPage (day navigation)
└── DayPage (layout compositor)
    ├── RoadbookHeader
    ├── DriverCard
    ├── NavigatorCard
    ├── RouteDecisionCard (Day 6 only, when enabled)
    ├── AccommodationCard (Days 4-6, when present)
    ├── Timeline (dynamically generated from stops)
    ├── Stops section
    │   ├── StopCard (default)
    │   ├── ExperienceCard (Signature/Major priority only)
    │   ├── RegroupCard (regroup type)
    │   └── ChargingCard (charging type)
    ├── ArrivalCard (+ TripSummary on Day 7)
    └── RoadbookFooter
```

Supporting components: `ParkingSection`, `WeatherSection`

### Key Design Decisions

- **YAML-driven**: All pages render from data. Zero hardcoded itinerary in components.
- **Conditional rendering**: Absent fields produce no empty UI. Optional sections only appear when data exists.
- **Route Decision**: Only visible when `routeDecision.enabled === true`. Toggling Option A/B updates UI state only — never modifies YAML.
- **Experience Card**: Only renders for `Signature` or `Major` priority stops. `Optional` priority stops are hidden unless expanded.
- **Offline**: Application works completely offline. No network requests required to view itinerary.
- **Mobile-first**: Primary target is iPhone. 44px minimum touch targets. High contrast for outdoor readability.

### Type System

Types in `src/types/roadbook-day.ts` match the canonical YAML schema defined in `trip data/SCHEMA.md`:

- `RoadbookDayData` — top-level day structure
- `Stop` — individual stop with schedule, navigation, weather, food, experience
- `RouteDecision` — route alternative options (Day 6)
- `BookingInfo` — ferry booking (Day 5)
- `TripSummary` — completion message (Day 7)

### Tests

85 tests across 8 test files:

| File | Tests | Coverage |
|------|-------|----------|
| `parser.test.ts` | 4 | YAML parsing, validation, error handling |
| `timeline.test.ts` | 6 | Timeline event generation, type mapping |
| `components.test.tsx` | 23 | DriverCard, NavigatorCard, StopCard, ExperienceCard |
| `route-decision.test.tsx` | 6 | Conditional rendering, option switching |
| `integration.test.tsx` | 23 | All 7 day pages render from real YAML |
| `snapshots.test.tsx` | 7 | Regression detection for each day page |
| `sprint2.test.tsx` | 12 | Terminology fix, timeline recommended stay, mobile nav, icons |
| `trip.test.ts` | 4 | Trip helper utilities |

### File Structure

```
src/
├── components/roadbook/   # All roadbook components
├── data/days/             # YAML files + parser + index
├── types/roadbook-day.ts  # TypeScript types matching YAML schema
├── __tests__/             # Unit, integration, and snapshot tests
├── roadbook.css           # Mobile-first roadbook styles
└── main.tsx               # Routes including /roadbook
```

## Sprint 2 — Premium UX Polish

Sprint 2 transformed the app from a functional dashboard into a premium travel companion.

### Visual Design
- **Dark theme**: `#0B1720` background, `#152232` cards, `#D4B26A` gold accent
- **Typography**: SF Pro stack with clear hierarchy — uppercase labels, prominent values, large titles
- **Cards**: Elevation + shadow, no excessive borders, generous whitespace

### Terminology Fix
- Departure stops: **Leave** (not "Arrival/Departure")
- Intermediate stops: **Arrive** / **Recommended Stay** / **Leave**
- Accommodation: **Expected Arrival**
- Never shows identical arrival and departure times

### Timeline
- Premium icons: 🏠 Departure, 📍 Attraction, 🍱 Regroup, 🔋 Charging, ⛴ Ferry, 🏡 Accommodation
- "Recommended Stay" label with duration prominently displayed
- Larger spacing for 3-second readability

### Mobile Navigation
- Horizontally scrollable day selector with scroll-snap
- Current day highlighted with accent color
- Prev/Next arrows always visible

### Accessibility
- AA contrast ratios on dark background
- Visible focus states (2px accent outline)
- 44px minimum touch targets
- Keyboard navigable tabs and buttons

## Original Dashboard

The original trip.json-based dashboard, planner, map, packing, and search features remain at their existing routes (`/`, `/timeline`, `/planner/:dayId`, `/map`, `/packing`).

## Offline and Deployment

The Vite PWA integration precaches the app shell, YAML data, and static assets on build. It uses a cache-first policy for OpenStreetMap tiles. The GitHub Pages workflow builds and publishes `dist` on pushes to `main`.

## Quality Checks

```bash
npm run lint       # ESLint
npm run format     # Prettier check
npm test           # Vitest (85 tests)
npm run build      # TypeScript + Vite production build
```
