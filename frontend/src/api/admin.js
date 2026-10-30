import { request } from './client.js'

// The admin password is kept in sessionStorage, so it's forgotten when the
// browser tab closes. client.js sends it with every request.
const KEY = 'adminPassword'

export function getAdminPassword() {
  try {
    return sessionStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function forgetAdminPassword() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    // Storage is blocked; nothing to forget.
  }
}

// Checks the password with the backend and saves it if it's right.
// Throws "Wrong password" if it isn't.
export async function logIn(password) {
  await request('/admin/check', { password })
  try {
    sessionStorage.setItem(KEY, password)
  } catch {
    // Storage is blocked: the password works but won't be remembered.
  }
}
