# Fjordline — Norway Road Trip Companion

A mobile-first, offline-capable PWA for a Norway road trip. The sample trip covers 26 July–1 August 2026 and can be replaced without changing UI code.

## Start

```bash
npm install
npm run dev
npm run validate:data
npm test
npm run build
```

## Data-first architecture

All itinerary content is in `src/data/trip.json`. It is parsed by Zod at application startup and can be validated in CI using `npm run validate:data`. The UI only consumes the typed `TripData` model, keeping data, business utilities, and presentation separate.

To create another trip, replace the trip object, days, hotels, places, packing, and emergency arrays while retaining their schema. Optional weather API configuration belongs in `.env` using `.env.example` as a template.

## Offline and deployment

The Vite PWA integration precaches the app shell and JSON on build. It uses a cache-first policy for OpenStreetMap tiles visited during the trip. The GitHub Pages workflow builds and publishes `dist` on pushes to `main`.

## Quality checks

`npm run lint`, `npm run format`, `npm run validate:data`, `npm test`, and `npm run build` are designed for CI. The included tests exercise the data-derived core utilities; add feature and browser tests alongside modules as the app expands.
