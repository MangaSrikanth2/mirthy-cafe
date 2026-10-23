import { BRAND_CONFIG } from '../data/mirthyData'
import { HeroScene } from './3d/HeroScene'
import { ArrowDown, Sparkles, MapPin, Clock } from 'lucide-react'

interface HeroProps {
  onOpenReserve: () => void
  onOpenMenu: () => void
}

export function Hero({ onOpenReserve, onOpenMenu }: HeroProps) {
  return (
    <section className="hero-section" id="hero">
      {/* Background Ambience Layers */}
      <div className="hero-bg-glow" />
      <div className="hero-vignette" />

      <div className="container hero-container">
        {/* Left Column: Brand Editorial Typography & Story */}
        <div className="hero-text-content">
          <div className="hero-badge">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>Haute Pâtisserie & Specialty Coffee</span>
          </div>

          <h1 className="hero-title">
            Come for the desserts.
            <span className="serif-italic gold-glow-text hero-title-italic"> Stay for the mirth.</span>
          </h1>

          <p className="hero-description">
            An encounter with sculptural French entremets, 72-hour laminated viennoiserie, and unhurried café living in Jubilee Hills, Hyderabad. Every creation is an edible work of art.
          </p>

          <div className="hero-actions">
            <a href="#signatures" className="btn-primary">
              <span>Explore Creations</span>
            </a>

            <button
              type="button"
              onClick={onOpenMenu}
              className="btn-secondary"
            >
              <span>View Full Menu</span>
            </button>
          </div>

          {/* Quick Location & Status Bar */}
          <div className="hero-meta-strip">
            <div className="hero-meta-item">
              <MapPin size={15} className="hero-meta-icon" />
              <div>
                <span className="hero-meta-label">Location</span>
                <span className="hero-meta-val">Road No. 36, Jubilee Hills</span>
              </div>
            </div>

            <div className="hero-meta-divider" />

            <div className="hero-meta-item">
              <Clock size={15} className="hero-meta-icon" />
              <div>
                <span className="hero-meta-label">Hours</span>
                <span className="hero-meta-val">Open Daily • 10:00 AM – 11:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Entremet Showcase */}
        <div className="hero-3d-wrapper">
          <div className="hero-3d-card">
            <HeroScene />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#our-craft" className="hero-scroll-prompt" aria-label="Scroll to discover craft">
        <span className="scroll-prompt-text">Discover Our Craft</span>
        <div className="scroll-prompt-mouse">
          <div className="scroll-prompt-wheel" />
        </div>
        <ArrowDown size={14} className="scroll-prompt-arrow" />
      </a>
    </section>
  )
}
