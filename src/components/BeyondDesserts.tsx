import { useState } from 'react'
import { CAFE_ITEMS } from '../data/mirthyData'
import { Coffee, Utensils, IceCream, Sparkles } from 'lucide-react'

export function BeyondDesserts() {
  const [filter, setFilter] = useState<'all' | 'coffee' | 'savory' | 'gelato'>('all')

  const filteredItems = filter === 'all'
    ? CAFE_ITEMS
    : CAFE_ITEMS.filter((item) => item.category === filter)

  return (
    <section className="section-padding beyond-section" id="cafe">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Café Dining & Terroir</span>
          <h2>
            Beyond Desserts: <span className="serif-italic gold-glow-text">Specialty Coffee & Plates</span>
          </h2>
          <p className="section-subtitle">
            From single-estate high-altitude Arabica to savory truffle plates, Mirthy is an all-day culinary sanctuary designed for unhurried gatherings.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="beyond-filters">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <span>All Offerings</span>
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'coffee' ? 'active' : ''}`}
            onClick={() => setFilter('coffee')}
          >
            <Coffee size={14} />
            <span>Specialty Coffee</span>
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'savory' ? 'active' : ''}`}
            onClick={() => setFilter('savory')}
          >
            <Utensils size={14} />
            <span>Savory Plates</span>
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'gelato' ? 'active' : ''}`}
            onClick={() => setFilter('gelato')}
          >
            <IceCream size={14} />
            <span>Artisanal Gelato</span>
          </button>
        </div>

        {/* Culinary Spread Highlight Hero */}
        <div className="beyond-hero-card glass-card">
          <div className="beyond-hero-grid">
            <div className="beyond-hero-img-wrap">
              <img
                src="/images/IMG_20261023_174019.jpg"
                alt="Specialty swan latte art coffee, truffle scrambled egg brioche, and heirloom burrata"
                className="beyond-hero-img"
                loading="lazy"
                width="540"
                height="380"
                decoding="async"
              />
              <div className="beyond-hero-badge">
                <Sparkles size={13} />
                <span>All-Day Gourmet Café Menu</span>
              </div>
            </div>

            <div className="beyond-hero-content">
              <span className="beyond-sub serif-italic">Araku Single-Origin & Slow Dining</span>
              <h3 className="beyond-hero-title">A Morning Ceremony of Taste</h3>
              <p className="beyond-hero-p">
                We collaborate with sustainable high-elevation micro-lots from the Araku Valley and Ethiopia. Every espresso is dialled in on a custom synesso machine, and every savory brioche is baked that morning.
              </p>

              <div className="beyond-feature-list">
                <div className="beyond-feat-item">
                  <span className="feat-dot">✦</span>
                  <div>
                    <strong>Araku Valley Micro-lot:</strong> Notes of dark cocoa, orange blossom, and velvety crema.
                  </div>
                </div>
                <div className="beyond-feat-item">
                  <span className="feat-dot">✦</span>
                  <div>
                    <strong>House-Baked Brioche:</strong> Generously buttered and toasted on plancha for savory classics.
                  </div>
                </div>
                <div className="beyond-feat-item">
                  <span className="feat-dot">✦</span>
                  <div>
                    <strong>Hand-churned Gelato:</strong> Churned in small batches with zero preservatives.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Items Cards Grid */}
        <div className="beyond-items-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="beyond-item-card glass-card">
              <div className="item-card-header">
                <span className="item-french serif-italic">{item.frenchName}</span>
                <span className="item-price">₹{item.price}</span>
              </div>
              <h4 className="item-name">{item.name}</h4>
              <p className="item-desc">{item.description}</p>
              <div className="item-flavors">
                {item.flavorNotes.map((note, i) => (
                  <span key={i} className="item-flavor-tag">{note}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
