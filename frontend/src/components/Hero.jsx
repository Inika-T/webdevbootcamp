import { Link } from 'react-router'
import './Hero.css'

function Hero() {
  return (
    <section className="hero halftone">
      <div className="hero-copy">
        <p className="eyebrow">HELLO, I&apos;M</p>
        <h1 className="glitch">
          INIKA
          <br />
          TALATI
        </h1>
        <p className="hero-intro">
          Hi! I&apos;m a Computer Science and Info Design double major at the
          University of Maryland. I love UI/UX, reading fantasy, making art,
          listening to music, poetry, playing basketball and lifting.
        </p>
        <Link className="text-link" to="/contact">
          Get in touch <span>→</span>
        </Link>
      </div>

      <div className="portrait-wrap">
        <div className="scribble" />
        <div className="scribble scribble-two" />
        <div className="portrait-card">
          {/* Swap this block for <img src={publicUrl('/images/portrait.webp')} alt="Inika Talati" /> once there is a photo */}
          <div className="portrait-placeholder">
            <svg aria-hidden="true" viewBox="0 0 240 280">
              <circle cx="120" cy="92" r="52" />
              <path d="M28 280c8-88 50-128 92-128s84 40 92 128" />
            </svg>
            <span>DROP YOUR PHOTO HERE</span>
          </div>
        </div>
        <span className="sfx">THWIP!</span>
        <span className="issue-stamp">
          ISSUE
          <br />
          001
        </span>
      </div>

      <div className="scroll-cue">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </div>
    </section>
  )
}

export default Hero
