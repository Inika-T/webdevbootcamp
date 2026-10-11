# Inika Talati — Personal Website

A two-page personal site (Home and Contact) built with React and Vite, based on a Figma Make prototype.

**Live site:** https://inika-t.github.io/webdevbootcamp/

## Run it locally

You need [Bun](https://bun.sh) installed.

```bash
bun install
bun run dev
```

Then open the address it prints (usually http://localhost:5173).

## Other commands

- `bun run build` — production build into `dist/`
- `bun run preview` — serve the built site
- `bun run lint` — check the code with ESLint

## Where things live

- `src/pages/` — the Home and Contact pages
- `src/components/` — the sections of the Home page (hero, ticker, projects, art carousel, resume preview) and the shared top bar and footer
- `src/data/` — the project list, artwork slides, and contact links
- `src/index.css` — colors, fonts, and shared styles
- `public/images/` — images used by the site

## Deployment

Every push to `main` rebuilds the site and publishes it to GitHub Pages (see `.github/workflows/deploy.yml`).
