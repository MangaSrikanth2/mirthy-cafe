import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { OurCraft } from './components/OurCraft'
import { SignatureCreations } from './components/SignatureCreations'
import { FreshlyBaked } from './components/FreshlyBaked'
import { BeyondDesserts } from './components/BeyondDesserts'
import { MirthyExperience } from './components/MirthyExperience'
import { VisitUs } from './components/VisitUs'
import { Footer } from './components/Footer'
import { MenuDrawer } from './components/MenuDrawer'
import { ReservationModal } from './components/ReservationModal'
import { toggleAudioAmbience } from './utils/audioAmbience'

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isReserveOpen, setIsReserveOpen] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const handleToggleAudio = () => {
    toggleAudioAmbience((playing) => {
      setIsAudioPlaying(playing)
    })
  }

  return (
    <div className="mirthy-app-root">
      {/* Editorial Navigation */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenReserve={() => setIsReserveOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Cinematic Hero with 3D Entremet */}
        <Hero
          onOpenReserve={() => setIsReserveOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />

        {/* 2. Our Craft Storytelling */}
        <OurCraft />

        {/* 3. Signature Creations (Hazelnut Obsidian, The Cherry, Cheesecake, Pistachio) */}
        <SignatureCreations
          onOpenReserve={() => setIsReserveOpen(true)}
        />

        {/* 4. Freshly Baked Viennoiserie */}
        <FreshlyBaked />

        {/* 5. Beyond Desserts (Coffee, Savory, Gelato) */}
        <BeyondDesserts />

        {/* 6. The Mirthy Experience (Atmospheric Café) */}
        <MirthyExperience />

        {/* 7. Visit Us & Table Inquiries */}
        <VisitUs
          onOpenReserve={() => setIsReserveOpen(true)}
        />
      </main>

      {/* 8. Minimal Premium Footer */}
      <Footer />

      {/* Interactive Overlays */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenReserve={() => {
          setIsMenuOpen(false)
          setIsReserveOpen(true)
        }}
      />

      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />
    </div>
  )
}

export default App
