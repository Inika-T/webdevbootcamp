import { useState } from 'react'
import { sendMessage } from '../api/messages.js'
import { emails } from '../data/contact.js'
import './ContactForm.css'

const emptyForm = { name: '', email: '', message: '' }

function ContactForm() {
  const [form, setForm] = useState(emptyForm)
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status, setStatus] = useState('idle')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    try {
      await sendMessage(form)
      setForm(emptyForm)
      setStatus('sent')
    } catch {
      // Keep what they typed so nothing is lost.
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>SEND A MESSAGE</h2>
      <div className="contact-rule short" />

      <label>
        <span>Name</span>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          maxLength={100}
          autoComplete="name"
        />
      </label>

      <label>
        <span>Email</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </label>

      <label>
        <span>Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          maxLength={2000}
          rows={5}
        />
      </label>

      <button
        className="button"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>

      <p className="form-status" role="status">
        {status === 'sent' && 'Thanks! Your message was sent.'}
        {status === 'error' && (
          <>
            Sorry, your message didn&apos;t send. Try again, or email me at{' '}
            <a href={`mailto:${emails[0].address}`}>{emails[0].address}</a>{' '}
            instead.
          </>
        )}
      </p>
    </form>
  )
}

export default ContactForm
