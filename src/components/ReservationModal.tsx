import { useState, useEffect } from 'react'
import { BRAND_CONFIG } from '../data/mirthyData'
import { X, Calendar, Clock, Users, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    date: '',
    time: '04:00 PM',
    type: 'Table for Dining',
    notes: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  const handleResetAndClose = () => {
    setIsSubmitted(false)
    setFormData({
      name: '',
      phone: '',
      guests: '2 Guests',
      date: '',
      time: '04:00 PM',
      type: 'Table for Dining',
      notes: ''
    })
    onClose()
  }

  // Handle Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetAndClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate clean reference
    const ref = 'MRT-' + Math.floor(100000 + Math.random() * 900000)
    setBookingRef(ref)
    setIsSubmitted(true)

    // Trigger golden confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c58940', '#dfa964', '#f3d48d', '#fdfbf7']
      })
    } catch {
      // safe fallback
    }
  }

  const generateWhatsAppMessage = () => {
    const text = `Hello Mirthy Team! I would like to submit my reservation inquiry:
Ref: ${bookingRef}
Type: ${formData.type}
Name: ${formData.name}
Guests: ${formData.guests}
Date: ${formData.date || 'Today'}
Time: ${formData.time}
Notes: ${formData.notes || 'None'}`
    return `https://wa.me/919032890327?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose}>
      <div className="modal-window glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="serif-italic modal-sub">Atelier &amp; Salon Reservations</span>
            <h3 className="modal-title">Table Inquiry &amp; Custom Orders</h3>
          </div>
          <button type="button" onClick={handleResetAndClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="modal-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="text-gold" />
            </div>
            <h4 className="success-title">Inquiry Received</h4>
            <p className="success-sub">
              Thank you, <strong>{formData.name}</strong>. Your inquiry reference is <span className="ref-tag">{bookingRef}</span>.
            </p>
            <p className="success-desc">
              Our Jubilee Hills host team will review table availability for {formData.guests} on {formData.date || 'your selected date'} at {formData.time}.
            </p>

            <div className="success-actions">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <MessageCircle size={16} />
                <span>Forward Inquiry to WhatsApp (+91 9032890327)</span>
              </a>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="btn-secondary"
                style={{ width: '100%', marginTop: '0.8rem' }}
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <label className="form-label">Inquiry Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="form-select"
              >
                <option value="Table for Dining">Table for Dining (All-day)</option>
                <option value="Afternoon Tea & Entremets">Afternoon Tea &amp; Entremets</option>
                <option value="Bespoke Cake Pre-Order">Bespoke Celebration Cake Pre-Order</option>
                <option value="Private Gathering / Event">Private Gathering / Salon Event</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Rao"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 90328 90327"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Number of Guests</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="form-select"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3-4 Guests">3 – 4 Guests</option>
                  <option value="5-8 Guests">5 – 8 Guests</option>
                  <option value="9+ Gathering">9+ Guests (Private)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Time Slot</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="form-select"
              >
                <option value="10:30 AM">10:30 AM (Morning Viennoiserie)</option>
                <option value="01:00 PM">01:00 PM (Brunch &amp; Savory)</option>
                <option value="04:30 PM">04:30 PM (Afternoon Pâtisserie)</option>
                <option value="07:30 PM">07:30 PM (Evening Desserts)</option>
                <option value="09:30 PM">09:30 PM (Late Night Sanctuary)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Special Occasion or Dietary Preferences (Optional)</label>
              <textarea
                rows={3}
                placeholder="e.g. Celebrating an anniversary; prefer eggless entremet options or custom chocolate message."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="form-textarea"
              />
            </div>

            <div className="modal-actions">
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <Sparkles size={16} />
                <span>Submit Reservation Inquiry</span>
              </button>
            </div>

            <p className="modal-privacy-note">
              No prepayment required. We will confirm your table and dessert availability promptly.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
