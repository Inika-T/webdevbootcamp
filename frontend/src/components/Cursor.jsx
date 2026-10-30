import { useEffect, useRef } from 'react'
import './Cursor.css'

const SPARKS = 6

// A gold dot that follows the mouse, a ring that trails softly behind it,
// and a small burst of sparks on each click. Only switched on for a mouse
// or trackpad, and never when the device asks for reduced motion.
function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const burstsRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (!finePointer || reduceMotion) return

    const root = document.documentElement
    const dot = dotRef.current
    const ring = ringRef.current
    root.classList.add('has-custom-cursor')

    let x = -100
    let y = -100
    let ringX = x
    let ringY = y
    let frame

    function handleMove(event) {
      x = event.clientX
      y = event.clientY
      dot.style.transform = `translate(${x}px, ${y}px)`
      root.classList.add('cursor-visible')
      const overLink = event.target.closest(
        'a, button, select, label, summary, [role="button"]',
      )
      ring.classList.toggle('is-hovering', Boolean(overLink))
    }

    // The ring eases toward the dot a little each frame.
    function follow() {
      ringX += (x - ringX) * 0.2
      ringY += (y - ringY) * 0.2
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      frame = requestAnimationFrame(follow)
    }

    function handleClick(event) {
      const burst = document.createElement('span')
      burst.className = 'cursor-burst'
      burst.style.left = `${event.clientX}px`
      burst.style.top = `${event.clientY}px`
      for (let i = 0; i < SPARKS; i++) {
        const spark = document.createElement('i')
        spark.style.setProperty('--angle', `${(360 / SPARKS) * i}deg`)
        burst.append(spark)
      }
      burstsRef.current.append(burst)
      setTimeout(() => burst.remove(), 700)
    }

    function handleLeave() {
      root.classList.remove('cursor-visible')
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerdown', handleClick)
    document.addEventListener('pointerleave', handleLeave)
    frame = requestAnimationFrame(follow)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', handleClick)
      document.removeEventListener('pointerleave', handleLeave)
      cancelAnimationFrame(frame)
      root.classList.remove('has-custom-cursor', 'cursor-visible')
    }
  }, [])

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
      <div ref={burstsRef} />
    </div>
  )
}

export default Cursor
