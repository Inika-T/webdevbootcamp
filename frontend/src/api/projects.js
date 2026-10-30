import { request } from './client.js'

// One function per /projects endpoint in backend/main.py.
// A project looks like:
// { id, type, title, description, tags: [...], color: 'pink' | 'cyan' | 'yellow', href }

export function listProjects() {
  return request('/projects')
}

export function getProject(id) {
  return request(`/projects/${id}`)
}

export function createProject(project) {
  return request('/projects', { method: 'POST', body: project })
}

export function updateProject(id, project) {
  return request(`/projects/${id}`, { method: 'PUT', body: project })
}

export function deleteProject(id) {
  return request(`/projects/${id}`, { method: 'DELETE' })
}
