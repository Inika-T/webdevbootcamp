import { useState } from 'react'
import ArtCarousel from '../components/ArtCarousel.jsx'
import Hero from '../components/Hero.jsx'
import Projects from '../components/Projects.jsx'
import ResumeModal from '../components/ResumeModal.jsx'

function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  return (
    <>
      <Hero />
      <Projects onPreviewResume={() => setIsResumeOpen(true)} />
      <ArtCarousel />
      {isResumeOpen && <ResumeModal onClose={() => setIsResumeOpen(false)} />}
    </>
  )
}

export default Home
