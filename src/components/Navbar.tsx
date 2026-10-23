import { useState, useEffect } from 'react'
import { BRAND_CONFIG } from '../data/mirthyData'
import { Menu, X, Utensils, Calendar, Volume2, VolumeX, Instagram, MapPin } from 'lucide-react'

interface NavbarProps {
  onOpenMenu: () => void
  onOpenReserve: () => void
  isAudioPlaying: boolean
  onToggleAudio: () => void
}

export function Navbar({ onOpenMenu, onOpenReserve, isAudioPlaying, onToggleAudio }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Passive coalesced scroll handler with RAF throttling
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 40
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev))
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { label: 'Our Craft', href: '#our-craft' },
    { label: 'Signatures', href: '#signatures' },
    { label: 'Viennoiserie', href: '#viennoiserie' },
    { label: 'Café Dining', href: '#cafe' },
    { label: 'Experience', href: '#experience' },
    { label: 'Visit Us', href: '#visit' }
  ]

  return (
    <>
      <header
        className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background-color 0.3s ease, border-color 0.3s ease, padding 0.3s ease',
          background: isScrolled
            ? 'rgba(15, 10, 7, 0.95)'
            : 'linear-gradient(180deg, rgba(15, 10, 7, 0.85) 0%, rgba(15, 10, 7, 0) 100%)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(197, 137, 64, 0.2)' : '1px solid transparent',
          padding: isScrolled ? '0.9rem 0' : '1.3rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo with Official Mirthy Emblem */}
          <a
            href="#"
            className="brand-logo-container"
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}
          >
            <div className="logo-badge-wrapper">
              <img
                src={BRAND_CONFIG.logo || '/Mirthylogo.jpg'}
                alt="Mirthy Patisserie & Café"
                className="brand-logo-img"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  letterSpacing: '0.24em',
                  fontWeight: 600,
                  color: 'var(--color-cream-light)',
                  lineHeight: 1
                }}
              >
                {BRAND_CONFIG.name}
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-sans)',
                  marginTop: '3px'
                }}
              >
                Pâtisserie & Café
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cream-muted)',
                  fontWeight: 500,
                  position: 'relative',
                  padding: '4px 0'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Ambient Sound Toggle */}
            <button
              type="button"
              onClick={onToggleAudio}
              className="sound-toggle-btn"
              title={isAudioPlaying ? 'Mute ambient sound' : 'Play café soundscape'}
              aria-label="Toggle ambient café sound"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid rgba(244, 239, 230, 0.12)',
                background: isAudioPlaying ? 'rgba(197, 137, 64, 0.2)' : 'rgba(28, 20, 15, 0.5)',
                color: isAudioPlaying ? 'var(--color-gold-light)' : 'var(--color-cream-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              {isAudioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Menu Drawer Button */}
            <button
              type="button"
              onClick={onOpenMenu}
              className="nav-action-btn menu-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(197, 137, 64, 0.35)',
                background: 'rgba(28, 20, 15, 0.6)',
                color: 'var(--color-cream)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'var(--transition-smooth)'
              }}
            >
              <Utensils size={14} style={{ color: 'var(--color-gold)' }} />
              <span>Menu</span>
            </button>

            {/* Reserve CTA */}
            <button
              type="button"
              onClick={onOpenReserve}
              className="btn-primary desktop-only"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.78rem' }}
            >
              <Calendar size={13} />
              <span>Reserve</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                border: '1px solid rgba(244, 239, 230, 0.15)',
                background: 'rgba(28, 20, 15, 0.6)',
                color: 'var(--color-cream)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(15, 10, 7, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.8rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                letterSpacing: '0.2em',
                color: 'var(--color-gold)'
              }}
            >
              {BRAND_CONFIG.name}
            </span>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  color: 'var(--color-cream-light)',
                  letterSpacing: '0.05em'
                }}
              >
                {link.label}
              </a>
            ))}

            <div style={{ width: '60px', height: '1px', background: 'rgba(197, 137, 64, 0.4)', margin: '1rem 0' }} />

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenReserve()
              }}
              className="btn-primary"
              style={{ width: '220px' }}
            >
              <Calendar size={15} />
              <span>Reserve Table</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenMenu()
              }}
              className="btn-secondary"
              style={{ width: '220px' }}
            >
              <Utensils size={15} />
              <span>Browse Full Menu</span>
            </button>

            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Instagram size={18} />
                <span style={{ fontSize: '0.85rem' }}>{BRAND_CONFIG.socials.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
