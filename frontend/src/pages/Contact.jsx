import { emails, socials } from '../data/contact.js'
import { publicUrl } from '../publicUrl.js'
import './Contact.css'

function Contact() {
  return (
    <section className="contact-page halftone">
      <div className="contact-details">
        <span className="eyebrow">GET IN TOUCH</span>
        <h1 className="glitch">CONTACT ME</h1>
        <div className="contact-rule" />

        <div className="contact-lines">
          {emails.map((email) => (
            <a href={`mailto:${email.address}`} key={email.address}>
              <span>{email.label}</span>
              {email.address}
            </a>
          ))}
        </div>

        <div className="social-list">
          <h2>SOCIALS</h2>
          <div className="contact-rule short" />
          {socials.map((social) => (
            <a
              href={social.href}
              key={social.label}
              target="_blank"
              rel="noreferrer"
            >
              <span>{social.label}</span>
              <b>{social.handle}</b>
              <i>↗</i>
            </a>
          ))}
        </div>
      </div>

      <img
        className="contact-art"
        src={publicUrl('/images/contact-gwen-cutout.webp')}
        alt=""
        width="1080"
        height="863"
      />
    </section>
  )
}

export default Contact
