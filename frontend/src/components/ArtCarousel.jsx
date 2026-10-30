import { useState } from 'react'
import { artwork } from '../data/artwork.js'
import { publicUrl } from '../publicUrl.js'
import './ArtCarousel.css'

function ArtCarousel() {
  const [active, setActive] = useState(0)

  // Wraps around: going back from the first slide lands on the last one.
  const step = (direction) => {
    setActive(
      (current) => (current + direction + artwork.length) % artwork.length,
    )
  }

  return (
    <section className="art-section" id="art">
      <div className="section-heading reveal">
        <h2 className="display">ARTWORK</h2>
      </div>
      <div className="art-frame-wrap reveal">
        <button
          className="art-side-button previous"
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous artwork"
        >
          ←
        </button>
        <div className="art-stage">
          <img
            className="art-piece"
            src={publicUrl(artwork[active].src)}
            alt={artwork[active].title}
            width="1080"
            height="1080"
          />
        </div>
        <button
          className="art-side-button next"
          type="button"
          onClick={() => step(1)}
          aria-label="Next artwork"
        >
          →
        </button>
      </div>
      <div className="slide-dots">
        {artwork.map((slide, index) => (
          <button
            key={slide.title}
            className={index === active ? 'active' : ''}
            onClick={() => setActive(index)}
            aria-label={`Show ${slide.title}`}
            aria-current={index === active}
            type="button"
          />
        ))}
        <span>
          {String(active + 1).padStart(2, '0')} /{' '}
          {String(artwork.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}

export default ArtCarousel
