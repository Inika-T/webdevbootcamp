import { useEffect, useState } from 'react'
import { listProjects } from '../api/projects.js'
import { publicUrl } from '../publicUrl.js'
import './Projects.css'

// Tilt a card toward the mouse and shift its cover shapes a little.
// The CSS only applies these values for a mouse and when motion is allowed.
function tiltCard(event) {
  if (event.pointerType !== 'mouse') return
  const card = event.currentTarget
  const box = card.getBoundingClientRect()
  // -0.5 to 0.5 across the card, 0 at the centre
  const x = (event.clientX - box.left) / box.width - 0.5
  const y = (event.clientY - box.top) / box.height - 0.5
  card.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`)
  card.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`)
  card.style.setProperty('--shift-x', `${(x * 16).toFixed(1)}px`)
  card.style.setProperty('--shift-y', `${(y * 16).toFixed(1)}px`)
}

function resetCard(event) {
  const card = event.currentTarget
  for (const name of ['--tilt-x', '--tilt-y', '--shift-x', '--shift-y']) {
    card.style.removeProperty(name)
  }
}

function Projects({ onPreviewResume }) {
  const [projects, setProjects] = useState([])
  // 'loading' | 'ready' | 'error'
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    // If the page is left before the reply arrives, ignore the reply.
    let ignore = false
    listProjects()
      .then((data) => {
        if (ignore) return
        setProjects(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="work-section" id="work">
      <div className="section-heading reveal">
        <h2 className="display">PROJECTS</h2>
      </div>
      {status === 'loading' && <p className="project-status">Loading projects…</p>}
      {status === 'error' && (
        <p className="project-status">Projects couldn&apos;t load right now.</p>
      )}
      <div className="project-list">
        {projects.map((project, index) => (
          <article
            className={`project-card reveal ${project.color}`}
            key={project.id}
            onPointerMove={tiltCard}
            onPointerLeave={resetCard}
          >
            <div className="project-number">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="project-preview" aria-hidden="true">
              <span>{project.type}</span>
              <div className="preview-orbit" />
              <div className="preview-grid" />
            </div>
            <div className="project-info">
              <span className="eyebrow">{project.type}</span>
              <h3 className="display">{project.title}</h3>
              <p>{project.description}</p>
              <ul>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            {project.href && (
              <a
                className="project-link"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title}`}
              >
                ↗
              </a>
            )}
          </article>
        ))}
      </div>
      <div className="resume-actions reveal">
        <button
          className="button secondary"
          type="button"
          onClick={onPreviewResume}
        >
          Preview resume <span>↗</span>
        </button>
        <a className="button" href={publicUrl('/resume.pdf')} download>
          Download resume <span>↓</span>
        </a>
      </div>
    </section>
  )
}

export default Projects
