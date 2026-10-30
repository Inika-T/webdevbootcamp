# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

The repo has two apps, each run from its own folder (in separate terminals):

- `frontend/` — the React site. All frontend paths below are relative to this folder.
- `backend/` — a FastAPI app (Python, managed with `uv`). The app is in `backend/main.py`.

GitHub Pages deploys `frontend/` only (`.github/workflows/deploy.yml`).

## Commands

### Frontend (run in `frontend/`)

The package manager is Bun (`bun.lock` is the only lockfile) — use `bun`, not `npm`/`yarn`/`pnpm`.

- `bun install` — install dependencies
- `bun run dev` — Vite dev server with HMR
- `bun run build` — production build to `dist/`
- `bun run preview` — serve the built `dist/`
- `bun run lint` — ESLint over the repo (`bunx eslint src/App.jsx` for a single file)

There is no test runner configured.

### Backend (run in `backend/`)

- `uv run fastapi dev` — dev server with auto-reload at http://127.0.0.1:8000 (interactive API docs at `/docs`)
- `uv add <package>` — add a Python dependency

## Architecture

Inika Talati's personal website (Vite 8, React 19), being built from a Figma Make prototype: an elegant light two-page site (Home and Contact): white background, navies, teals and blues, with gold accents and a navy nav bar.

- Plain JavaScript with JSX (`.jsx`), ES modules. No TypeScript — `@types/react*` are installed only for editor IntelliSense.
- Entry chain: `index.html` → `src/main.jsx` (mounts `<App />` in `StrictMode` on `#root`) → `src/App.jsx` → `src/routes.jsx`.
- Routing is `react-router` (`createBrowserRouter` in `src/routes.jsx`): `src/components/Layout.jsx` is the shared top bar and footer, and pages live in `src/pages/`.
- Data comes from the backend: `src/api/client.js` holds the base URL (`VITE_API_URL`, default `http://127.0.0.1:8000`) and a `request()` helper; `src/api/projects.js` and `src/api/messages.js` have one function per endpoint. Components call these, never `fetch` directly. The backend's CORS list in `main.py` must include the frontend's origin. `/admin` (unlinked, no login) manages projects and lists messages.
- No state library or CSS framework. Styling is plain CSS: `src/index.css` holds a small reset and the global design tokens as CSS custom properties on `:root` (`--cloud`/`--white` backgrounds, `--navy-*`, `--teal-*`, `--blue-*`, `--gold`, the `--serif`/`--sans` font stacks, `--band-pad` for full-width sections, etc.); each component has its own CSS file that consumes those variables and uses native CSS nesting. Reuse the tokens rather than hard-coding colors. The design is light-only. Project `color` values from the backend (`pink`/`cyan`/`yellow`) map to navy/teal/blue cover gradients in `Projects.css`.
- Fonts (Newsreader for headings, Instrument Sans for body) are loaded from Google Fonts in `index.html`.
- `src/components/Cursor.jsx` is the custom gold cursor and click burst (mouse/trackpad only, off for reduced motion). The owner removed the decorative gold swirls/sparkles, so don't add ornament graphics back unasked. Keep motion small and always respect `prefers-reduced-motion`.
- Don't change the site's wording when restyling; the owner wants all copy kept as written and no added labels.
- Assets: files in `src/assets/` are imported from JS and bundled/hashed; files in `public/` are served from the site root and referenced by absolute URL.
- ESLint uses flat config (`eslint.config.js`) with `react-hooks` and `react-refresh` rules. The `react-refresh` rule expects component files to export only components, or HMR breaks — put shared constants/helpers in separate modules.
- The React Compiler is not enabled.
