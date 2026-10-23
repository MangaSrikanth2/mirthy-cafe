import { useRef } from 'react'
import { BAKERY_ITEMS } from '../data/mirthyData'
import { Sparkles, ChevronLeft, ChevronRight, Clock, Wind } from 'lucide-react'

export function FreshlyBaked() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const offset = direction === 'left' ? -380 : 380
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <section className="section-padding bakes-section" id="viennoiserie">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row">
          <div className="header-text-block">
            <span className="section-label">Viennoiserie & Morning Bakes</span>
            <h2>
              The Art of the <span className="serif-italic gold-glow-text">Golden Shatter</span>
            </h2>
            <p className="section-subtitle">
              Folded with AOP Isigny Sainte-Mère cultured butter over a 72-hour cold fermentation. Golden on the outside, airy and honeycomb within.
            </p>
          </div>

          <div className="bakes-controls">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="scroll-arrow-btn"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="scroll-arrow-btn"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Feature Banner: Fresh Batch Schedule */}
        <div className="bakes-schedule-banner glass-card">
          <div className="schedule-left">
            <Clock size={16} className="text-gold" />
            <span>Oven Timings: Fresh Batches Pulled Daily at <strong>8:00 AM</strong> &amp; <strong>3:00 PM</strong></span>
          </div>
          <div className="schedule-right">
            <Wind size={16} className="text-gold" />
            <span>Crafted with 100% French Normandy Cultured Butter</span>
          </div>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="bakes-horizontal-container" ref={scrollContainerRef}>
          {BAKERY_ITEMS.map((item, idx) => (
            <div key={item.id} className="bakes-card glass-card">
              <div className="bakes-card-img-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  className="bakes-card-img"
                  loading="lazy"
                />
                <span className="bakes-step-badge">Fold 0{idx + 1}</span>
              </div>

              <div className="bakes-card-body">
                <div className="bakes-title-wrap">
                  <span className="bakes-french-sub serif-italic">{item.frenchName}</span>
                  <div className="bakes-name-row">
                    <h3 className="bakes-name">{item.name}</h3>
                    <span className="bakes-price">₹{item.price}</span>
                  </div>
                </div>

                <p className="bakes-desc">{item.description}</p>

                <div className="bakes-notes-row">
                  {item.flavorNotes.map((n, i) => (
                    <span key={i} className="bakes-note-pill">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
