# Inika Talati — Personal Website

A two-page personal site (Home and Contact) built with React and Vite, based on a Figma Make prototype.

**Live site:** https://inika-t.github.io/webdevbootcamp/

## Run it locally

The site has two parts that run side by side, each in its own terminal.

**1. Backend** (FastAPI, needs [uv](https://docs.astral.sh/uv/)):

```bash
cd backend
uv run fastapi dev
```

It runs at http://127.0.0.1:8000 (interactive API docs at http://127.0.0.1:8000/docs).

**2. Frontend** (React + Vite, needs [Bun](https://bun.sh)):

```bash
cd frontend
bun install
bun run dev
```

Then open http://localhost:5173.

- **Home** lists projects from `GET /projects`.
- **Contact** sends the form to `POST /messages`.
- **http://localhost:5173/admin** (not linked in the menu) adds, edits and deletes projects (`POST`, `GET /projects/{id}` + `PUT`, `DELETE`) and lists messages (`GET /messages`).

The backend keeps data in memory, so restarting it resets the projects and clears messages.

## Other commands (in `frontend/`)

- `bun run build` — production build into `dist/`
- `bun run preview` — serve the built site
- `bun run lint` — check the code with ESLint

## Where things live

- `backend/main.py` — the API: projects and contact messages
- `frontend/src/api/` — one function per API endpoint
- `frontend/src/pages/` — the Home, Contact and Admin pages
- `frontend/src/components/` — page sections (hero, projects, art carousel, resume preview), the shared top bar and footer, the custom cursor and decorative graphics
- `frontend/src/data/` — artwork slides and contact links
- `frontend/src/index.css` — colors, fonts and shared styles
- `frontend/public/images/` — images used by the site

## Deployment

Every push to `main` rebuilds the frontend and publishes it to GitHub Pages (see `.github/workflows/deploy.yml`). GitHub Pages can't run the Python backend, so the live site shows a "couldn't load" message for projects; run both parts locally to see everything working.
