# Inika Talati — Personal Website

A two-page personal site (Home and Contact) built with React and Vite, based on a Figma Make prototype.

**Live site:** https://inika-t.github.io/webdevbootcamp/

## API + Frontend: where each endpoint is used

The React frontend calls every endpoint in the FastAPI backend (`backend/main.py`). All requests go through `frontend/src/api/`; components never call `fetch` directly.

| Endpoint | Where in the UI |
| --- | --- |
| `GET /projects` | **Home** — the Projects section, and the project list on **Admin** |
| `GET /projects/{id}` | **Admin** — clicking Edit loads that project into the form |
| `POST /projects` | **Admin** — the "Add project" form |
| `PUT /projects/{id}` | **Admin** — saving an edited project |
| `DELETE /projects/{id}` | **Admin** — the Delete button |
| `POST /projects/reset` | **Admin** — the "Reset projects" button (puts the starting projects back) |
| `POST /messages` | **Contact** — the contact form |
| `GET /messages` | **Admin** — the Messages list |

**Admin page:** http://localhost:5173/admin (not linked in the menu). Password: `admin` (change it by setting the `ADMIN_PASSWORD` environment variable before starting the backend). Adding, editing and deleting projects and reading messages need the password; the public pages don't. It's where projects are added, edited and deleted and where contact messages show up. To try it: run both parts (below), add or edit a project on `/admin`, then check that Home shows the change; send a message from Contact and see it appear on `/admin`.

The backend keeps data in memory, so restarting it resets the projects and clears messages.

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

Then open http://localhost:5173 (and http://localhost:5173/admin for the admin page).

## Other commands (in `frontend/`)

- `bun run build` — production build into `dist/`
- `bun run preview` — serve the built site
- `bun run lint` — check the code with ESLint

## Where things live

- `backend/main.py` — the API: projects and contact messages
- `frontend/src/api/` — one function per API endpoint
- `frontend/src/pages/` — the Home, Contact and Admin pages
- `frontend/src/components/` — page sections (hero, projects, art carousel, resume preview), the project form used on Admin, and the shared top bar and footer
- `frontend/src/data/` — artwork slides and contact links
- `frontend/src/index.css` — colors, fonts and shared styles
- `frontend/public/images/` — images used by the site

## Deployment

Every push to `main` rebuilds the frontend and publishes it to GitHub Pages (see `.github/workflows/deploy.yml`). GitHub Pages can't run the Python backend, so on the live site projects show a "couldn't load" message and the contact form can't send; run both parts locally to see everything working.
