import { useState, useMemo, useEffect } from 'react'
import { SIGNATURE_DESSERTS, BAKERY_ITEMS, CAFE_ITEMS, BRAND_CONFIG } from '../data/mirthyData'
import { MenuItem } from '../types'
import { X, Search, Sparkles, Filter, ExternalLink, CheckCircle2 } from 'lucide-react'

interface MenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  onOpenReserve: () => void
}

export function MenuDrawer({ isOpen, onClose, onOpenReserve }: MenuDrawerProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [egglessOnly, setEgglessOnly] = useState(false)

  const allItems: MenuItem[] = useMemo(() => {
    return [...SIGNATURE_DESSERTS, ...BAKERY_ITEMS, ...CAFE_ITEMS]
  }, [])

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'entremets' && item.category === 'entremets') ||
        (activeCategory === 'viennoiserie' && item.category === 'viennoiserie') ||
        (activeCategory === 'cheesecakes' && item.category === 'cheesecakes') ||
        (activeCategory === 'cafe' && (item.category === 'coffee' || item.category === 'savory' || item.category === 'gelato'))

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.frenchName && item.frenchName.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesEggless = !egglessOnly || item.dietary.includes('Eggless')

      return matchesCategory && matchesSearch && matchesEggless
    })
  }, [allItems, activeCategory, searchQuery, egglessOnly])

  // Lock body scroll and listen for Escape key when drawer is open
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="menu-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="menu-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="menu-drawer-header">
          <div>
            <span className="serif-italic menu-drawer-sub">La Carte des Délices</span>
            <h3 className="menu-drawer-title">{BRAND_CONFIG.name} Digital Collection</h3>
          </div>
          <button type="button" onClick={onClose} className="menu-close-btn" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="menu-filter-bar">
          <div className="menu-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search entremets, croissants, coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-input"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="search-clear-btn">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="menu-category-tabs">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'entremets', label: 'Signature Entremets' },
              { id: 'viennoiserie', label: 'Viennoiserie' },
              { id: 'cheesecakes', label: 'Cheesecakes' },
              { id: 'cafe', label: 'Café & Plates' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`category-pill ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Eggless Quick Filter */}
          <div className="menu-dietary-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={egglessOnly}
                onChange={(e) => setEgglessOnly(e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-text">Show Eggless Only</span>
            </label>
            <span className="menu-count-badge">{filteredItems.length} creations</span>
          </div>
        </div>

        {/* Scrollable Items List */}
        <div className="menu-items-scroll">
          {filteredItems.length === 0 ? (
            <div className="menu-empty-state">
              <p>No creations match your search criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('all')
                  setEgglessOnly(false)
                }}
                className="btn-gold-outline"
                style={{ marginTop: '1rem' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="menu-cards-list">
              {filteredItems.map((item) => (
                <div key={item.id} className="menu-card glass-card">
                  <div className="menu-card-img-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-card-img"
                      loading="lazy"
                      width="88"
                      height="88"
                      decoding="async"
                    />
                  </div>
                  <div className="menu-card-info">
                    <div className="menu-card-top">
                      <div>
                        {item.frenchName && (
                          <span className="card-french-sub serif-italic">{item.frenchName}</span>
                        )}
                        <h4 className="card-item-title">{item.name}</h4>
                      </div>
                      <span className="card-price-val">₹{item.price}</span>
                    </div>

                    <p className="card-item-desc">{item.description}</p>

                    <div className="card-item-bottom">
                      <div className="card-dietary-tags">
                        {item.dietary.map((d, i) => (
                          <span key={i} className="card-tag-pill">
                            {d}
                          </span>
                        ))}
                      </div>

                      <a
                        href={`https://wa.me/919032890327?text=Hello%20Mirthy%2C%20I%20would%20like%20to%20order%20or%20inquire%20about%20the%20${encodeURIComponent(item.name)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-inquire-link"
                      >
                        <span>Inquire via WhatsApp</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="menu-drawer-footer">
          <p className="menu-footer-disclaimer">
            Prices are in INR (₹), exclusive of applicable taxes. All items prepared in our Jubilee Hills atelier.
          </p>
          <button
            type="button"
            onClick={() => {
              onClose()
              onOpenReserve()
            }}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            <span>Reserve Table to Dine In</span>
          </button>
        </div>
      </div>
    </div>
  )
}
