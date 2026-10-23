import { BRAND_CONFIG } from '../data/mirthyData'
import { Instagram, ArrowUp, Heart } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer-section">
      <div className="container">
        {/* Top Tier: Brand Statement */}
        <div className="footer-top-grid">
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <span className="footer-monogram">M</span>
              <span className="footer-brand-name">{BRAND_CONFIG.name}</span>
            </div>
            <p className="footer-tagline serif-italic">“{BRAND_CONFIG.tagline}”</p>
            <p className="footer-brand-bio">
              Artistic French patisserie, multi-tiered entremets, viennoiserie, and specialty café dining in Jubilee Hills, Hyderabad.
            </p>
          </div>

          <div className="footer-links-col">
            <span className="footer-heading">Culinary Navigation</span>
            <ul className="footer-links-list">
              <li><a href="#our-craft">Our Craft &amp; Heritage</a></li>
              <li><a href="#signatures">Signature Entremets</a></li>
              <li><a href="#viennoiserie">Viennoiserie &amp; Croissants</a></li>
              <li><a href="#cafe">Café &amp; Specialty Coffee</a></li>
              <li><a href="#experience">The Mirthy Space</a></li>
              <li><a href="#visit">Location &amp; Hours</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <span className="footer-heading">Atelier &amp; Café</span>
            <address className="footer-address">
              <p>{BRAND_CONFIG.address.line1}, {BRAND_CONFIG.address.line2}</p>
              <p>{BRAND_CONFIG.address.city}, Telangana {BRAND_CONFIG.address.pincode}</p>
              <p className="footer-hours-note">Open Daily: {BRAND_CONFIG.hours.time}</p>
            </address>

            <div className="footer-social-row">
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Mirthy Instagram"
              >
                <Instagram size={16} />
                <span>Follow {BRAND_CONFIG.socials.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Tier: Copyright & Back to Top */}
        <div className="footer-bottom-row">
          <div className="footer-legal">
            <span>© {new Date().getFullYear()} {BRAND_CONFIG.name} Pâtisserie &amp; Café. All rights reserved.</span>
            <span className="footer-bullet">•</span>
            <span>Jubilee Hills, Hyderabad</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
