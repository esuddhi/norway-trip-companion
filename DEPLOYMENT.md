# DEPLOYMENT.md — GitHub Pages Deployment Guide

## Live URL

https://esuddhi.github.io/norway-trip-companion/

---

## Architecture

| Component         | Technology                         |
| ----------------- | ---------------------------------- |
| Build tool        | Vite 7                             |
| Hosting           | GitHub Pages                       |
| CI/CD             | GitHub Actions                     |
| Deployment method | Official `actions/deploy-pages@v4` |
| Branch            | `develop` (auto-deploys on push)   |

---

## How It Works

1. Developer pushes to `develop`
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) triggers
3. Workflow runs quality checks: lint, format, validate, test
4. Workflow builds the production bundle (`npm run build`)
5. `dist/index.html` is copied to `dist/404.html` (SPA fallback)
6. `dist/` folder is uploaded as a Pages artifact
7. GitHub deploys the artifact to Pages

---

## First-Time Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings → Pages**
3. Under "Build and deployment", set **Source** to **GitHub Actions**
4. Save

### 2. Verify Permissions

The workflow requires these permissions (already configured in `deploy.yml`):

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### 3. Push to `develop`

```bash
git push origin develop
```

The workflow will run automatically and deploy the site.

---

## Configuration Details

### Base Path

The app is hosted at a subpath (`/norway-trip-companion/`). This is handled automatically:

| File             | Configuration                                                        |
| ---------------- | -------------------------------------------------------------------- |
| `vite.config.ts` | `base: process.env.GITHUB_ACTIONS ? '/norway-trip-companion/' : '/'` |
| `src/main.tsx`   | `<BrowserRouter basename={import.meta.env.BASE_URL}>`                |
| PWA manifest     | `start_url` and `scope` set to `base`                                |
| Service worker   | `navigateFallback: 'index.html'`                                     |

In local development, the base is `/` (no subpath). In CI, it's `/norway-trip-companion/`.

### SPA Routing on GitHub Pages

GitHub Pages doesn't natively support client-side routing. When a user navigates directly to `/norway-trip-companion/timeline`, GitHub returns a 404 because that file doesn't exist on the server.

Solution: The workflow copies `index.html` to `404.html`. GitHub serves `404.html` for any missing path, which loads the React app, which then renders the correct route.

### PWA / Service Worker

The PWA configuration ensures:

- `start_url` points to the correct base path
- `scope` limits the service worker to the app's path
- `navigateFallback` returns `index.html` for unmatched routes (offline SPA support)
- All assets are precached with correct paths

---

## Local Development

```bash
npm run dev
```

Runs at `http://localhost:5173/` with hot module replacement.

The base path is `/` locally — no subpath. All routing works as expected.

---

## Production Build (Local)

```bash
npm run build
npm run preview
```

`npm run preview` serves the built app at `http://localhost:4173/` for local verification.

Note: When `GITHUB_ACTIONS` env var is not set, the base is `/`. To test with the GitHub Pages base path locally:

```bash
GITHUB_ACTIONS=true npm run build
npx serve dist
```

---

## Troubleshooting

### Workflow fails at "npm run lint"

Fix lint errors locally:

```bash
npm run lint
```

### Workflow fails at "npm run format"

Fix formatting:

```bash
npx prettier --write .
```

### Workflow fails at "npm run build"

Check for TypeScript errors:

```bash
npx tsc -b
```

### Site shows 404 after deployment

1. Verify **Settings → Pages → Source** is set to "GitHub Actions"
2. Check the workflow completed successfully (Actions tab)
3. Wait 1-2 minutes for CDN propagation

### Routes show GitHub's 404 page

The `404.html` fallback is missing. Verify the workflow includes:

```yaml
- name: Copy 404.html for SPA routing
  run: cp dist/index.html dist/404.html
```

### Assets fail to load (CSS, JS, images)

The base path is wrong. Verify:

- `vite.config.ts` uses `'/norway-trip-companion/'` (matching the repo name exactly)
- No hardcoded absolute paths (`/src/...`) in HTML or CSS

### PWA won't install

1. Open DevTools → Application → Manifest
2. Verify `start_url` and `scope` point to `/norway-trip-companion/`
3. Verify the service worker is registered under the correct scope

### Offline doesn't work

1. Open DevTools → Application → Service Workers
2. Verify the service worker is active
3. Check the Cache Storage for precached assets
4. Ensure `navigateFallback` is set in the Workbox config

---

## Updating the Deployment

No special steps needed. Push to `develop` and the workflow handles everything:

```bash
git add .
git commit -m "feat: update trip data"
git push origin develop
```

The site updates within 2-3 minutes.

---

## Environment Variables

| Variable         | Set By | Purpose                                                                            |
| ---------------- | ------ | ---------------------------------------------------------------------------------- |
| `GITHUB_ACTIONS` | GitHub | Automatically set in CI; triggers production base path                             |
| `BASE_URL`       | Vite   | Injected at build time from `base` config; available as `import.meta.env.BASE_URL` |

No secrets or API keys are required for deployment.
