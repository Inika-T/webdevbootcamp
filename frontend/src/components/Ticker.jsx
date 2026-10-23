import './Ticker.css'

const words = ['UI/UX DESIGN', 'HCI RESEARCH', 'FRONT-END', 'ILLUSTRATION']
const repeats = [0, 1, 2]

// One half of the scrolling strip. Two identical halves sit side by side, so
// sliding the strip left by exactly one half loops without a visible jump.
// Each run through the word list is its own group, with a gap after it.
function TickerHalf({ hidden }) {
  return (
    <span aria-hidden={hidden}>
      {repeats.map((repeat) => (
        <span className="ticker-group" key={repeat}>
          {words.map((word) => (
            <span key={word}>
              {word} <b>✦</b>
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}

function Ticker() {
  return (
    <section className="ticker" aria-label="What I do">
      <div>
        <TickerHalf hidden={false} />
        <TickerHalf hidden={true} />
      </div>
    </section>
  )
}

export default Ticker
