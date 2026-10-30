import { request } from './client.js'

// One function per /messages endpoint in backend/main.py.

// Saves a contact form message and returns it with its new id.
export function sendMessage({ name, email, message }) {
  return request('/messages', {
    method: 'POST',
    body: { name, email, message },
  })
}

// Returns every message, newest first.
export function listMessages() {
  return request('/messages')
}
