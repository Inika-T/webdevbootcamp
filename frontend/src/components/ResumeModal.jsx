import { useEffect, useRef } from 'react'
import { publicUrl } from '../publicUrl.js'
import './ResumeModal.css'

function ResumeModal({ onClose }) {
  const dialogRef = useRef(null)

  // <dialog> only becomes a true modal (dimmed backdrop, Escape to close,
  // keyboard focus kept inside) when opened with showModal(). There is no
  // cleanup that calls close(): closing fires the dialog's "close" event,
  // and React's dev-mode double run of effects would then shut the modal
  // the moment it opened.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      className="resume-modal"
      ref={dialogRef}
      aria-label="Resume preview"
      onClose={onClose}
      onClick={(event) => {
        // A click that lands on the dialog itself is a click on the backdrop.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="resume-modal-panel">
        <div className="resume-modal-actions">
          <a href={publicUrl('/resume.pdf')} download>
            Download
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume preview"
          >
            ×
          </button>
        </div>
        <iframe
          src={`${publicUrl('/resume.pdf')}#view=FitH&toolbar=0&navpanes=0`}
          title="Inika Talati resume"
        />
      </div>
    </dialog>
  )
}

export default ResumeModal
