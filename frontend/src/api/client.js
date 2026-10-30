// Where the FastAPI backend runs. Set VITE_API_URL in frontend/.env to point
// somewhere else (for example, once the backend is hosted online).
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

// Sends one request to the backend and returns the JSON it replies with.
// Throws an Error with a readable message if the request fails.
export async function request(path, { method = 'GET', body } = {}) {
  let response
  try {
    response = await fetch(API_URL + path, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    // fetch only throws when it can't reach the server at all.
    throw new Error("Can't reach the server. Is the backend running?")
  }

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(errorMessage(data, response.status))
  }
  return data
}

// FastAPI puts its error in `detail`: a string for 404s, or a list of
// problems (one per invalid field) for 422s.
function errorMessage(data, status) {
  const detail = data?.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) {
    return detail
      .map((problem) => `${problem.loc.at(-1)}: ${problem.msg}`)
      .join('; ')
  }
  return `Request failed (${status})`
}
