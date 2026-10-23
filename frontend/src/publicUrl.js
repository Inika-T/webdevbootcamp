// Files in public/ are served from the site's base path. Locally that is "/",
// but on GitHub Pages the site lives under "/<repo-name>/", so every link to
// a public file goes through this helper instead of being hard-coded.
const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export function publicUrl(path) {
  return base + path
}
