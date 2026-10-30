import { useEffect, useState } from 'react'
import { listMessages } from '../api/messages.js'
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject,
} from '../api/projects.js'
import ProjectForm from '../components/ProjectForm.jsx'
import './Admin.css'

// Not linked from the menu: visit /admin to manage projects and read messages.
// There is no login, so anyone who knows the address can use it.
function Admin() {
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  // 'loading' | 'ready' | 'error'
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  // What the form is doing: null (closed), 'new', or the project being edited.
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    let ignore = false
    Promise.all([listProjects(), listMessages()])
      .then(([projectData, messageData]) => {
        if (ignore) return
        setProjects(projectData)
        setMessages(messageData)
        setStatus('ready')
      })
      .catch((err) => {
        if (ignore) return
        setError(err.message)
        setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [])

  // Fetch the latest copy of the project before opening the edit form.
  async function handleEdit(id) {
    setError('')
    try {
      setEditing(await getProject(id))
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleSave(fields) {
    if (editing === 'new') {
      const created = await createProject(fields)
      setProjects((current) => [...current, created])
    } else {
      const updated = await updateProject(editing.id, fields)
      setProjects((current) =>
        current.map((p) => (p.id === updated.id ? updated : p)),
      )
    }
    setEditing(null)
  }

  async function handleDelete(project) {
    if (!window.confirm(`Delete “${project.title}”?`)) return
    setError('')
    try {
      await deleteProject(project.id)
      setProjects((current) => current.filter((p) => p.id !== project.id))
      if (editing?.id === project.id) setEditing(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="admin-page">
      <span className="eyebrow">BEHIND THE SCENES</span>
      <h1 className="display">ADMIN</h1>

      {status === 'loading' && <p className="admin-note">Loading…</p>}
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}

      {status === 'ready' && (
        <>
          <div className="admin-heading">
            <h2>PROJECTS</h2>
            {editing === null && (
              <button
                className="button"
                type="button"
                onClick={() => setEditing('new')}
              >
                Add project +
              </button>
            )}
          </div>

          {editing !== null && (
            <ProjectForm
              // A new key resets the form when switching between projects.
              key={editing === 'new' ? 'new' : editing.id}
              project={editing === 'new' ? null : editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          )}

          {projects.length === 0 && <p className="admin-note">No projects yet.</p>}
          <ul className="admin-list">
            {projects.map((project) => (
              <li key={project.id} className={project.color}>
                <div>
                  <span className="eyebrow">{project.type}</span>
                  <strong>{project.title}</strong>
                </div>
                <div className="admin-actions">
                  <button type="button" onClick={() => handleEdit(project.id)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(project)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="admin-heading">
            <h2>MESSAGES</h2>
          </div>
          {messages.length === 0 && <p className="admin-note">No messages yet.</p>}
          <ul className="admin-list messages">
            {messages.map((message) => (
              <li key={message.id}>
                <div>
                  <strong>{message.name}</strong>{' '}
                  <a className="text-link" href={`mailto:${message.email}`}>
                    {message.email}
                  </a>
                  <time dateTime={message.created_at}>
                    {new Date(message.created_at).toLocaleString()}
                  </time>
                  <p>{message.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default Admin
