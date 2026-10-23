import { BRAND_CONFIG } from '../data/mirthyData'
import { Sparkles, Sun, Heart, Coffee, Star } from 'lucide-react'

export function MirthyExperience() {
  const experiences = [
    {
      icon: <Sun size={18} className="text-gold" />,
      title: 'Sunlit Courtyard & Arches',
      desc: 'Travertine limestone walls, organic plaster arches, and soft cove illumination that transitions gently from morning breakfast to intimate evening dessert rendezvous.'
    },
    {
      icon: <Coffee size={18} className="text-gold" />,
      title: 'The Artisanal Display Bar',
      desc: 'Watch our baristas extract single-origin espresso while admiring the daily gem-like entremet line-up behind pristine temperature-controlled glass cases.'
    },
    {
      icon: <Heart size={18} className="text-gold" />,
      title: 'Hospitality & Lingering',
      desc: 'We created Mirthy as an antidote to rush. You are invited to sink into plush linen booths, bring a favorite novel, or share celebration cakes with cherished friends.'
    }
  ]

  const reviews = [
    {
      author: 'Aarav M.',
      quote: 'The Hazelnut Obsidian is a work of architectural genius. The chocolate mirror glaze is impossibly glossy, and the atmosphere feels like an upscale European salon in the heart of Jubilee Hills.',
      dish: 'Hazelnut Obsidian & Flat White'
    },
    {
      author: 'Natasha K.',
      quote: 'Hands down the best lamination in Hyderabad. The croissant layers shatter with the first bite, and the San Sebastian cheesecake center is warm, creamy perfection.',
      dish: 'Mirthy Signature Cheesecake'
    }
  ]

  return (
    <section className="section-padding experience-section" id="experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Atmosphere & Architecture</span>
          <h2>
            The Mirthy Experience: <span className="serif-italic gold-glow-text">An Urban Sanctuary</span>
          </h2>
          <p className="section-subtitle">
            Nestled on Road No. 36 in Jubilee Hills, Mirthy is an architectural dialogue between earthy European minimalism and warm Southern hospitality.
          </p>
        </div>

        {/* Feature Highlight with Interior Architectural Photography */}
        <div className="experience-showcase glass-card">
          <div className="experience-grid">
            {/* Real Interior Photography */}
            <div className="experience-media-wrap">
              <img
                src="/images/mirthy_cafe_interior.jpg"
                alt="Interior architecture of Mirthy Patisserie & Cafe in Jubilee Hills, Hyderabad"
                className="experience-main-img"
                loading="lazy"
              />
              <div className="experience-tag">
                <Sparkles size={13} />
                <span>Road No. 36, Jubilee Hills</span>
              </div>
            </div>

            {/* Atmosphere Features */}
            <div className="experience-story-side">
              <span className="serif-italic experience-tagline">“Stay for the mirth.”</span>
              <h3 className="experience-title">Designed for Unhurried Moments</h3>
              <p className="experience-p">
                Every corner of Mirthy is curated with intention—from curved oak fluting to soft amber architectural lighting and acoustic calmness. Whether you are savoring morning viennoiserie alone or sharing entremets at twilight, time slows down here.
              </p>

              <div className="experience-cards-column">
                {experiences.map((exp, i) => (
                  <div key={i} className="exp-card">
                    <div className="exp-icon-wrap">{exp.icon}</div>
                    <div>
                      <h4 className="exp-card-title">{exp.title}</h4>
                      <p className="exp-card-desc">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guest Impressions / Testimonials Carousel */}
        <div className="experience-testimonials-row">
          {reviews.map((rev, idx) => (
            <div key={idx} className="testimonial-card glass-card">
              <div className="stars-row">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} fill="#c58940" color="#c58940" />
                ))}
              </div>
              <p className="testimonial-quote">“{rev.quote}”</p>
              <div className="testimonial-footer">
                <span className="testimonial-author">{rev.author}</span>
                <span className="testimonial-dish">{rev.dish}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
