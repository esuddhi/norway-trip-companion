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

## Deployment

The app deploys automatically to GitHub Pages on every push to `develop`.

**Live site:** https://esuddhi.github.io/norway-trip-companion/

### How it works

1. Push to `develop` triggers the GitHub Actions workflow
2. The workflow runs lint, format, validate, test, and build
3. On success, it deploys `dist/` to GitHub Pages

### First-time setup

1. Go to **Settings → Pages** in the GitHub repository
2. Set **Source** to "GitHub Actions"
3. Push to `develop` — the workflow handles the rest

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions and troubleshooting.

## Offline and PWA

The Vite PWA integration precaches the app shell and JSON on build. It uses a cache-first policy for OpenStreetMap tiles visited during the trip. The service worker supports offline navigation with `navigateFallback`.

## Quality checks

`npm run lint`, `npm run format`, `npm run validate:data`, `npm test`, and `npm run build` are designed for CI. The included tests exercise the data-derived core utilities; add feature and browser tests alongside modules as the app expands.
