import { useState } from 'react'
import { SIGNATURE_DESSERTS } from '../data/mirthyData'
import { MenuItem } from '../types'
import { Sparkles, Layers, ChevronRight, CheckCircle2, MessageCircle } from 'lucide-react'

interface SignatureCreationsProps {
  onSelectDessert?: (dessert: MenuItem) => void
  onOpenReserve: () => void
}

export function SignatureCreations({ onOpenReserve }: SignatureCreationsProps) {
  const [activeId, setActiveId] = useState<string>(SIGNATURE_DESSERTS[0].id)
  const activeDessert = SIGNATURE_DESSERTS.find((d) => d.id === activeId) || SIGNATURE_DESSERTS[0]

  return (
    <section className="section-padding signatures-section" id="signatures">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Jewels of the Counter</span>
          <h2>
            Signature <span className="serif-italic gold-glow-text">Entremets & Creations</span>
          </h2>
          <p className="section-subtitle">
            Meticulously sculpted layered French entremets, where every texture—from mirror glaze to praliné crunch—is calibrated to create moment-stopping delight.
          </p>
        </div>

        {/* 4-Item Tab Selector */}
        <div className="signatures-tabs">
          {SIGNATURE_DESSERTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`signature-tab-btn ${item.id === activeId ? 'active' : ''}`}
              onClick={() => setActiveId(item.id)}
            >
              <div className="tab-thumb-wrapper">
                <img
                  src={item.image}
                  alt={item.name}
                  className="tab-thumb-img"
                  width="44"
                  height="44"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="tab-text-wrap">
                <span className="tab-item-name">{item.name}</span>
                <span className="tab-item-price">₹{item.price}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Featured Creation Deep-Dive Card */}
        <div className="signature-showcase-card glass-card">
          <div className="showcase-grid">
            {/* Visual Column */}
            <div className="showcase-media-side">
              <div className="showcase-image-wrapper">
                <img
                  src={activeDessert.image}
                  alt={activeDessert.name}
                  className="showcase-main-image"
                  width="540"
                  height="420"
                  decoding="async"
                />
                <div className="showcase-img-badge">
                  <Sparkles size={13} />
                  <span>Signature Creation</span>
                </div>
              </div>
            </div>

            {/* Info & Story Column */}
            <div className="showcase-info-side">
              <div className="showcase-top-header">
                {activeDessert.frenchName && (
                  <span className="showcase-french-name serif-italic">{activeDessert.frenchName}</span>
                )}
                <div className="showcase-title-row">
                  <h3 className="showcase-title">{activeDessert.name}</h3>
                  <span className="showcase-price-tag">₹{activeDessert.price}</span>
                </div>
              </div>

              <p className="showcase-description">{activeDessert.description}</p>

              {/* Flavor Profile Pills */}
              <div className="showcase-section-block">
                <span className="showcase-block-label">Flavor Profile & Notes</span>
                <div className="flavor-notes-wrap">
                  {activeDessert.flavorNotes.map((note, idx) => (
                    <span key={idx} className="flavor-pill">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture / Layers Breakdown */}
              {activeDessert.layers && (
                <div className="showcase-section-block">
                  <div className="showcase-block-title-row">
                    <Layers size={14} className="text-gold" />
                    <span className="showcase-block-label">Anatomy of the Entremet</span>
                  </div>
                  <ul className="layers-list">
                    {activeDessert.layers.map((layer, idx) => (
                      <li key={idx} className="layer-item">
                        <span className="layer-step-num">0{idx + 1}</span>
                        <span className="layer-step-text">{layer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dietary Tags & Actions */}
              <div className="showcase-footer-row">
                <div className="dietary-tags-row">
                  {activeDessert.dietary.map((tag, i) => (
                    <span key={i} className="dietary-badge">
                      <CheckCircle2 size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="showcase-actions">
                  <button
                    type="button"
                    onClick={onOpenReserve}
                    className="btn-primary"
                  >
                    <span>Reserve at Counter</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Grid of all 4 signatures */}
        <div className="signatures-quad-grid">
          {SIGNATURE_DESSERTS.map((item) => (
            <div
              key={item.id}
              className={`quad-card glass-card ${item.id === activeId ? 'quad-selected' : ''}`}
              onClick={() => setActiveId(item.id)}
            >
              <div className="quad-img-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="quad-img"
                  loading="lazy"
                  width="280"
                  height="200"
                  decoding="async"
                />
                <span className="quad-price-badge">₹{item.price}</span>
              </div>
              <div className="quad-content">
                <span className="quad-french serif-italic">{item.frenchName}</span>
                <h4 className="quad-title">{item.name}</h4>
                <p className="quad-desc">{item.description}</p>
                <div className="quad-tags">
                  {item.flavorNotes.slice(0, 2).map((n, i) => (
                    <span key={i} className="quad-tag">{n}</span>
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
