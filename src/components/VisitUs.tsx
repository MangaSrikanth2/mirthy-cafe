import { useState, useMemo } from 'react'
import { BRAND_CONFIG } from '../data/mirthyData'
import { MapPin, Clock, Phone, MessageCircle, Instagram, ExternalLink, Calendar, Navigation } from 'lucide-react'

interface VisitUsProps {
  onOpenReserve: () => void
}

export function VisitUs({ onOpenReserve }: VisitUsProps) {
  // Compute if currently open
  const isOpenNow = useMemo(() => {
    const now = new Date()
    const currentHour = now.getHours() + now.getMinutes() / 60
    return currentHour >= BRAND_CONFIG.hours.openHour && currentHour < BRAND_CONFIG.hours.closeHour
  }, [])

  return (
    <section className="section-padding visit-section" id="visit">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Find Us in Jubilee Hills</span>
          <h2>
            Visit Mirthy: <span className="serif-italic gold-glow-text">Your Table Awaits</span>
          </h2>
          <p className="section-subtitle">
            Located in the heart of Hyderabad's premier culinary district on Road No. 36. Drop in for morning viennoiserie, afternoon tea, or late-night dessert indulgence.
          </p>
        </div>

        <div className="visit-grid">
          {/* Left Column: Verified Location & Operating Information */}
          <div className="visit-info-card glass-card">
            {/* Live Operational Status */}
            <div className="status-indicator-bar">
              <span className={`status-dot ${isOpenNow ? 'open' : 'closed'}`} />
              <div className="status-text-block">
                <strong>{isOpenNow ? 'Open Now for Dining & Takeaway' : 'Opening at 10:00 AM'}</strong>
                <span>Today: {BRAND_CONFIG.hours.time}</span>
              </div>
            </div>

            {/* Address Block */}
            <div className="visit-detail-block">
              <div className="detail-icon-wrap">
                <MapPin size={20} className="text-gold" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Verified Address</span>
                <p className="detail-value-strong">{BRAND_CONFIG.address.line1}, {BRAND_CONFIG.address.line2}</p>
                <p className="detail-value-sub">{BRAND_CONFIG.address.landmark}</p>
                <p className="detail-value-sub">{BRAND_CONFIG.address.city}, {BRAND_CONFIG.address.state} — {BRAND_CONFIG.address.pincode}</p>
                
                <a
                  href={BRAND_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-outline direction-link"
                >
                  <Navigation size={14} />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Operating Hours Block */}
            <div className="visit-detail-block">
              <div className="detail-icon-wrap">
                <Clock size={20} className="text-gold" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Operating Hours</span>
                <p className="detail-value-strong">{BRAND_CONFIG.hours.days}</p>
                <p className="detail-value-sub">{BRAND_CONFIG.hours.time}</p>
                <span className="detail-note">Last dessert orders taken at 11:15 PM</span>
              </div>
            </div>

            {/* Direct Connect & Socials */}
            <div className="visit-detail-block">
              <div className="detail-icon-wrap">
                <Phone size={20} className="text-gold" />
              </div>
              <div className="detail-content">
                <span className="detail-label">Inquiries & Reservations</span>
                <p className="detail-value-strong">{BRAND_CONFIG.socials.phone}</p>
                
                <div className="connect-buttons-row">
                  <a
                    href={BRAND_CONFIG.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Concierge</span>
                  </a>

                  <a
                    href={BRAND_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-instagram"
                  >
                    <Instagram size={15} />
                    <span>{BRAND_CONFIG.socials.instagramHandle}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview & Reservation Card */}
          <div className="visit-action-column">
            {/* Interactive Map Visual */}
            <div className="map-embed-wrapper glass-card">
              <div className="map-overlay-header">
                <div className="map-marker-pill">
                  <MapPin size={14} className="text-gold" />
                  <span>Mirthy Patisserie &amp; Café • Road No. 36</span>
                </div>
                <a
                  href={BRAND_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-open-link"
                >
                  <span>Open Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Styled Interactive Map Embed */}
              <iframe
                title="Mirthy Cafe Jubilee Hills Location Map"
                src="https://maps.google.com/maps?q=17.4382631,78.3987587+(Mirthy+Cafe)&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="280"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Reservation / Inquire Callout Box */}
            <div className="reserve-callout-card glass-card">
              <div className="reserve-callout-header">
                <Calendar size={20} className="text-gold" />
                <div>
                  <h4 className="reserve-callout-title">Table Reservations & Custom Cakes</h4>
                  <p className="reserve-callout-desc">
                    Planning a special celebration or seeking a bespoke tiered entremet? We welcome pre-orders 24 hours in advance.
                  </p>
                </div>
              </div>

              <div className="reserve-callout-btns">
                <button
                  type="button"
                  onClick={onOpenReserve}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  <Calendar size={15} />
                  <span>Request Table / Event Reservation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
