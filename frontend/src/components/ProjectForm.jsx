import { useState } from 'react'
import './ProjectForm.css'

const blankProject = {
  type: '',
  title: '',
  description: '',
  tags: [],
  color: 'pink',
  href: null,
}

// Add/edit form for one project. `project` is the project being edited, or
// null to add a new one. `onSave` gets the cleaned-up fields and may throw;
// its error message is shown under the form.
function ProjectForm({ project, onSave, onCancel }) {
  const start = project ?? blankProject
  const [form, setForm] = useState({
    type: start.type,
    title: start.title,
    description: start.description,
    // Tags are typed as one comma-separated line.
    tags: start.tags.join(', '),
    href: start.href ?? '',
    color: start.color,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await onSave({
        type: form.type.trim(),
        title: form.title.trim(),
        description: form.description.trim(),
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        color: form.color,
        // The backend expects null, not an empty string, for "no link".
        href: form.href.trim() || null,
      })
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3>{project ? `Edit “${project.title}”` : 'Add a project'}</h3>

      <label>
        <span>Title</span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          maxLength={100}
        />
      </label>

      <label>
        <span>Type</span>
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          maxLength={40}
          placeholder="e.g. DEVELOPMENT"
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          maxLength={500}
          rows={4}
        />
      </label>

      <label>
        <span>Tags (comma-separated, up to 5)</span>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="e.g. UI/UX, Figma, 2026"
        />
      </label>

      <label>
        <span>Link (optional)</span>
        <input
          name="href"
          type="url"
          value={form.href}
          onChange={handleChange}
          placeholder="https://"
        />
      </label>

      <label>
        <span>Colour</span>
        <select name="color" value={form.color} onChange={handleChange}>
          <option value="pink">Pink</option>
          <option value="cyan">Cyan</option>
          <option value="yellow">Yellow</option>
        </select>
      </label>

      <div className="project-form-actions">
        <button className="comic-button yellow" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button className="comic-button outline" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>

      {error && (
        <p className="project-form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default ProjectForm
