import { useEffect, useState } from 'react'
import { listProjects } from '../api/projects.js'
import { publicUrl } from '../publicUrl.js'
import './Projects.css'

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
    <section className="work-section halftone" id="work">
      <img
        className="cityscape"
        src={publicUrl('/images/city-purple.webp')}
        alt=""
      />
      <div className="section-heading">
        <h2 className="glitch">PROJECTS</h2>
      </div>
      {status === 'loading' && <p className="project-status">Loading projects…</p>}
      {status === 'error' && (
        <p className="project-status">Projects couldn&apos;t load right now.</p>
      )}
      <div className="project-list">
        {projects.map((project, index) => (
          <article
            className={`project-card ${project.color}`}
            key={project.id}
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
              <h3 className="glitch">{project.title}</h3>
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
      <div className="resume-actions">
        <button
          className="comic-button outline"
          type="button"
          onClick={onPreviewResume}
        >
          Preview resume <span>↗</span>
        </button>
        <a className="comic-button yellow" href={publicUrl('/resume.pdf')} download>
          Download resume <span>↓</span>
        </a>
      </div>
    </section>
  )
}

export default Projects
