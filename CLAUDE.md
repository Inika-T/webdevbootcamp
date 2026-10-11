# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

The package manager is Bun (`bun.lock` is the only lockfile) — use `bun`, not `npm`/`yarn`/`pnpm`.

- `bun install` — install dependencies
- `bun run dev` — Vite dev server with HMR
- `bun run build` — production build to `dist/`
- `bun run preview` — serve the built `dist/`
- `bun run lint` — ESLint over the repo (`bunx eslint src/App.jsx` for a single file)

There is no test runner configured.

## Architecture

Inika Talati's personal website (Vite 8, React 19), being built from a Figma Make prototype: a dark, comic-style two-page site (Home and Contact).

- Plain JavaScript with JSX (`.jsx`), ES modules. No TypeScript — `@types/react*` are installed only for editor IntelliSense.
- Entry chain: `index.html` → `src/main.jsx` (mounts `<App />` in `StrictMode` on `#root`) → `src/App.jsx` → `src/routes.jsx`.
- Routing is `react-router` (`createBrowserRouter` in `src/routes.jsx`): `src/components/Layout.jsx` is the shared top bar and footer, and pages live in `src/pages/`.
- No state library or CSS framework. Styling is plain CSS: `src/index.css` holds a small reset and the global design tokens as CSS custom properties on `:root` (`--ink`, `--paper`, `--pink`, `--cyan`, `--yellow`, the `--display`/`--label`/`--mono` font stacks, etc.); each component has its own CSS file that consumes those variables and uses native CSS nesting. Reuse the tokens rather than hard-coding colors. The design is dark-only, with no light theme.
- Fonts (Barlow Condensed, Abel, Anonymous Pro) are loaded from Google Fonts in `index.html`.
- Assets: files in `src/assets/` are imported from JS and bundled/hashed; files in `public/` are served from the site root and referenced by absolute URL.
- ESLint uses flat config (`eslint.config.js`) with `react-hooks` and `react-refresh` rules. The `react-refresh` rule expects component files to export only components, or HMR breaks — put shared constants/helpers in separate modules.
- The React Compiler is not enabled.
