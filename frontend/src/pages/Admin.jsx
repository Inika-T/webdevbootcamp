import { useEffect, useState } from 'react'
import { forgetAdminPassword, getAdminPassword, logIn } from '../api/admin.js'
import { listMessages } from '../api/messages.js'
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  resetProjects,
  updateProject,
} from '../api/projects.js'
import ProjectForm from '../components/ProjectForm.jsx'
import './Admin.css'

// Not linked from the menu: visit /admin to manage projects and read messages.
// It asks for the admin password first (set in backend/main.py).
function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getAdminPassword()))

  function handleLogOut() {
    forgetAdminPassword()
    setLoggedIn(false)
  }

  return (
    <section className="admin-page">
      <span className="eyebrow">BEHIND THE SCENES</span>
      <h1 className="glitch">ADMIN</h1>
      {loggedIn ? (
        <AdminPanel onLogOut={handleLogOut} />
      ) : (
        <LoginForm onLogIn={() => setLoggedIn(true)} />
      )}
    </section>
  )
}

function LoginForm({ onLogIn }) {
  const [password, setPassword] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setChecking(true)
    setError('')
    try {
      await logIn(password)
      onLogIn()
    } catch (err) {
      setError(err.message)
      setChecking(false)
    }
  }

  return (
    <form className="admin-login" onSubmit={handleSubmit}>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          autoFocus
          required
        />
      </label>
      <button className="comic-button yellow" type="submit" disabled={checking}>
        {checking ? 'Checking…' : 'Log in'}
      </button>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

function AdminPanel({ onLogOut }) {
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
        if (err.status === 401) return onLogOut()
        setError(err.message)
        setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [onLogOut])

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
      if (err.status === 401) return onLogOut()
      setError(err.message)
    }
  }

  async function handleReset() {
    if (!window.confirm('Reset projects? This undoes every add, edit and delete.')) {
      return
    }
    setError('')
    try {
      setProjects(await resetProjects())
      setEditing(null)
    } catch (err) {
      if (err.status === 401) return onLogOut()
      setError(err.message)
    }
  }

  return (
    <>
      <button className="admin-logout" type="button" onClick={onLogOut}>
        Log out
      </button>

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
            <div className="admin-heading-actions">
              {editing === null && (
                <button
                  className="comic-button yellow"
                  type="button"
                  onClick={() => setEditing('new')}
                >
                  Add project +
                </button>
              )}
              <button
                className="comic-button outline"
                type="button"
                onClick={handleReset}
              >
                Reset projects
              </button>
            </div>
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
    </>
  )
}

export default Admin
