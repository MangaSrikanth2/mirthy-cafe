import { CRAFT_FEATURES, CAFE_HIGHLIGHTS } from '../data/mirthyData'
import { Sparkles, Award, ShieldCheck, Flame } from 'lucide-react'

export function OurCraft() {
  return (
    <section className="section-padding craft-section" id="our-craft">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Haute Pâtisserie Heritage</span>
          <h2>
            Patience, Precision & <span className="serif-italic gold-glow-text">The Poetry of Pastry</span>
          </h2>
          <p className="section-subtitle">
            At Mirthy, we honor classical French techniques with modern architectural aesthetics. There are no shortcuts, no commercial pre-mixes, and no compromises.
          </p>
        </div>

        {/* Feature Grid with Photography */}
        <div className="craft-grid">
          {/* Left Column: Visual Storytelling with Real Atelier Photography */}
          <div className="craft-media-card glass-card">
            <div className="craft-img-container">
              <img
                src="/images/pastry_chef_craft.jpg"
                alt="Pastry Chef applying 24k gold leaf to chocolate entremet at Mirthy atelier"
                className="craft-image"
                loading="lazy"
              />
              <div className="craft-img-overlay" />
            </div>

            <div className="craft-card-content">
              <div className="craft-badge">
                <Sparkles size={13} />
                <span>The Atelier Jubilee Hills</span>
              </div>
              <h3 className="craft-card-title">Where Science Becomes Sweet Art</h3>
              <p className="craft-card-quote">
                “Every glaze must mirror the room. Every croissant must shatter like parchment. That is the discipline behind the mirth.”
              </p>
              <div className="craft-card-meta">
                <span>Hand-finished daily in small batches</span>
                <span className="craft-bullet">•</span>
                <span>Jubilee Hills, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Right Column: Four Pillars of Craft */}
          <div className="craft-pillars">
            {CRAFT_FEATURES.map((item) => (
              <div key={item.number} className="craft-pillar-card glass-card">
                <div className="pillar-header">
                  <span className="pillar-num">{item.number}</span>
                  <div className="pillar-title-wrap">
                    <span className="pillar-subtitle">{item.subtitle}</span>
                    <h4 className="pillar-title">{item.title}</h4>
                  </div>
                </div>
                <p className="pillar-desc">{item.description}</p>
                <div className="pillar-detail-tag">
                  <span className="pillar-dot" />
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics / Numbers Ribbon */}
        <div className="craft-stats-ribbon glass-card">
          {CAFE_HIGHLIGHTS.map((h, i) => (
            <div key={i} className="stat-item">
              <span className="stat-number gold-glow-text">{h.stat}</span>
              <span className="stat-label">{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
