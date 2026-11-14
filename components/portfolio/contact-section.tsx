'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Code2,
  FlaskConical,
  MessageSquare,
  MoreHorizontal,
  PenLine,
  Send,
  User,
  Users,
  X,
  Zap,
} from 'lucide-react'

type DiscussionTopic = {
  id: string
  label: string
  icon: typeof Code2
}

const TOPICS: DiscussionTopic[] = [
  { id: 'freelance', label: 'Freelance project', icon: Code2 },
  { id: 'fulltime', label: 'Full-time role', icon: Briefcase },
  { id: 'research', label: 'Research collaboration', icon: FlaskConical },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
]

export function ContactSection() {
  const [topic, setTopic] = useState<string>('Freelance project')
  const [name, setName] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  // Dynamically generate the upcoming 7 days starting tomorrow
  const upcomingDays = useMemo(() => {
    const list: Array<{ dayName: string; dayNum: number; fullDate: string }> = []
    const now = new Date()
    for (let i = 1; i <= 7; i++) {
      const d = new Date()
      d.setDate(now.getDate() + i)
      list.push({
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        fullDate: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      })
    }
    return list
  }, [])

  const handleSendMessage = () => {
    if (!message.trim()) {
      setStatusMessage('Please enter a message before sending.')
      return
    }

    const emailTo = 'asa@portfolio.dev'
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${topic} — ${name.trim() || 'New Message'}`)
    const bodyLines = [
      `Hi Asa,`,
      ``,
      `I'm reaching out regarding: ${topic}`,
      selectedDate ? `Preferred Call Date: ${selectedDate}` : null,
      name.trim() ? `From: ${name.trim()}` : null,
      ``,
      `Message:`,
      message.trim(),
      ``,
      `---`,
      `Sent via asa.portfolio.dev/contact`,
    ].filter(Boolean)

    const mailtoUrl = `mailto:${emailTo}?subject=${subject}&body=${encodeURIComponent(bodyLines.join('\n'))}`
    window.location.href = mailtoUrl
    setStatusMessage('Opening your email client...')
    setTimeout(() => setStatusMessage(null), 4000)
  }

  return (
    <section id="contact" className="contact-section" data-section>
      {/* Ambient background glows */}
      <div className="contact-glow contact-glow--top-right" aria-hidden="true" />
      <div className="contact-glow contact-glow--bottom-left" aria-hidden="true" />

      <div className="contact-container">
        {/* ================= LEFT COLUMN ================= */}
        <div className="contact-info-col reveal-up">
          <div className="contact-kicker mono">
            <span className="contact-kicker-slashes">//</span> Contact
          </div>

          <h2 className="contact-heading">
            Send me<br />
            <span className="contact-heading-accent">a Message</span>
          </h2>

          <p className="contact-subheading">
            Have a project, a collaboration idea, or just want to say hello? I&apos;d love to hear from you.
          </p>

          {/* Dotted Envelope Mail Illustration matching design */}
          <div className="contact-art" aria-hidden="true">
            <svg
              viewBox="0 0 280 180"
              className="contact-envelope-svg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="contact-halftone-grid" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="1.3" fill="var(--orange)" />
                </pattern>
              </defs>

              {/* Halftone Orange Circle behind envelope */}
              <circle cx="188" cy="74" r="38" fill="url(#contact-halftone-grid)" />

              {/* Crosshairs & Corner marks */}
              <path d="M 28 36 H 40 V 48" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 240 144 H 228 V 132" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round" />
              <text x="146" y="32" fill="var(--orange)" fontSize="13" fontFamily="var(--font-mono)" opacity="0.85">
                +
              </text>
              <text x="242" y="80" fill="var(--orange)" fontSize="13" fontFamily="var(--font-mono)" opacity="0.85">
                +
              </text>

              {/* Speed lines / Dot trails on the left */}
              <g className="contact-speed-dots" opacity="0.75" fill="currentColor">
                {[0, 1, 2, 3, 4].map((i) => (
                  <circle key={`s1-${i}`} cx={40 + i * 11} cy="86" r="1.15" />
                ))}
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <circle key={`s2-${i}`} cx={24 + i * 11} cy="96" r="1.15" />
                ))}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <circle key={`s3-${i}`} cx={16 + i * 11} cy="106" r="1.15" />
                ))}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle key={`s4-${i}`} cx={28 + i * 11} cy="116" r="1.15" />
                ))}
              </g>

              {/* Envelope Body with Dotted Stroke */}
              <g stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3">
                <rect x="96" y="66" width="108" height="68" rx="4" fill="rgba(18, 19, 23, 0.6)" />
                <path d="M 96 66 L 150 106 L 204 66" />
                <path d="M 96 134 L 136 100" />
                <path d="M 204 134 L 164 100" />
              </g>
            </svg>
          </div>

          {/* 3 Contact Pillar Items */}
          <div className="contact-pillars">
            <div className="contact-pillar-item">
              <div className="contact-pillar-icon" aria-hidden="true">
                <Zap size={16} />
              </div>
              <div className="contact-pillar-content">
                <h3 className="contact-pillar-title">Project Collaboration</h3>
                <p className="contact-pillar-desc">Build something impactful together</p>
              </div>
            </div>

            <div className="contact-pillar-item">
              <div className="contact-pillar-icon" aria-hidden="true">
                <Users size={16} />
              </div>
              <div className="contact-pillar-content">
                <h3 className="contact-pillar-title">Consultation</h3>
                <p className="contact-pillar-desc">Discuss ideas, tech, or product direction</p>
              </div>
            </div>

            <div className="contact-pillar-item">
              <div className="contact-pillar-icon" aria-hidden="true">
                <MessageSquare size={16} />
              </div>
              <div className="contact-pillar-content">
                <h3 className="contact-pillar-title">Just Say Hi</h3>
                <p className="contact-pillar-desc">Feedback, opportunities, or other things</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CARD (FORM) ================= */}
        <div className="contact-card reveal-up" data-reveal-delay="0.12">
          {/* STEP 01: What would you like to discuss? */}
          <div className="contact-step">
            <div className="contact-step-header">
              <span className="contact-step-num mono">01</span>
              <span className="contact-step-label">What would you like to discuss?</span>
            </div>

            <div className="contact-topic-pills" role="radiogroup" aria-label="Discussion topic">
              {TOPICS.map((item) => {
                const IconComponent = item.icon
                const isSelected = topic === item.label
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setTopic(item.label)}
                    className={`contact-topic-pill ${isSelected ? 'is-selected' : ''}`}
                  >
                    <IconComponent size={14} aria-hidden="true" className="contact-pill-icon" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ROW: STEP 02 & STEP 03 */}
          <div className="contact-dual-row">
            {/* STEP 02: Pick a day for a call (optional) */}
            <div className="contact-step contact-step--half">
              <div className="contact-step-header">
                <span className="contact-step-num mono">02</span>
                <span className="contact-step-label">
                  Pick a day for a call <small>(optional)</small>
                </span>
              </div>

              <div className="contact-date-wrapper">
                <button
                  type="button"
                  className={`contact-input-box contact-date-trigger ${selectedDate ? 'has-value' : ''}`}
                  onClick={() => setDatePickerOpen((open) => !open)}
                  aria-expanded={datePickerOpen}
                  aria-haspopup="dialog"
                >
                  <Calendar size={15} className="contact-input-icon" aria-hidden="true" />
                  <span className="contact-date-value">{selectedDate || 'Select a date'}</span>
                  {selectedDate ? (
                    <span
                      role="button"
                      tabIndex={0}
                      className="contact-date-clear"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedDate('')
                      }}
                      title="Clear date"
                      aria-label="Clear date"
                    >
                      <X size={13} />
                    </span>
                  ) : (
                    <ChevronDown
                      size={15}
                      className={`contact-chevron ${datePickerOpen ? 'is-open' : ''}`}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Day selector popover matching image reference */}
                {datePickerOpen && (
                  <div className="contact-date-popover" role="dialog" aria-label="Select a date for call">
                    <div className="contact-popover-header">
                      <span className="mono">UPCOMING DAYS</span>
                      <button
                        type="button"
                        className="contact-popover-close"
                        onClick={() => setDatePickerOpen(false)}
                        aria-label="Close date picker"
                      >
                        <X size={12} />
                      </button>
                    </div>

                    <div className="contact-days-strip">
                      {upcomingDays.map((d) => {
                        const isDayActive = selectedDate === d.fullDate
                        return (
                          <button
                            key={d.fullDate}
                            type="button"
                            className={`contact-day-tile ${isDayActive ? 'is-active' : ''}`}
                            onClick={() => {
                              setSelectedDate(d.fullDate)
                              setDatePickerOpen(false)
                            }}
                          >
                            <span className="contact-day-name mono">{d.dayName}</span>
                            <span className="contact-day-num">{d.dayNum}</span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="contact-custom-date-row">
                      <label className="contact-custom-date-label mono" htmlFor="contact-custom-date-input">
                        Custom date:
                      </label>
                      <input
                        id="contact-custom-date-input"
                        type="date"
                        className="contact-custom-date-input"
                        onChange={(e) => {
                          if (e.target.value) {
                            const parsed = new Date(e.target.value)
                            setSelectedDate(
                              parsed.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              }),
                            )
                            setDatePickerOpen(false)
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 03: Your name (optional) */}
            <div className="contact-step contact-step--half">
              <div className="contact-step-header">
                <span className="contact-step-num mono">03</span>
                <span className="contact-step-label">
                  Your name <small>(optional)</small>
                </span>
              </div>

              <div className="contact-input-box">
                <User size={15} className="contact-input-icon" aria-hidden="true" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name or organization"
                  className="contact-text-input"
                  maxLength={80}
                />
              </div>
            </div>
          </div>

          {/* STEP 04: Your message * */}
          <div className="contact-step">
            <div className="contact-step-header">
              <span className="contact-step-num mono">04</span>
              <span className="contact-step-label">
                Your message <span className="contact-required">*</span>
              </span>
            </div>

            <div className="contact-textarea-box">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, timeline, role, or what you'd like to collaborate on..."
                rows={4}
                maxLength={1000}
                className="contact-textarea"
                aria-required="true"
              />
              <div className="contact-textarea-footer">
                <span className="contact-char-count mono">{message.length} / 1000</span>
              </div>
            </div>
          </div>

          {statusMessage && (
            <div className="contact-feedback mono" role="status">
              {statusMessage}
            </div>
          )}

          {/* CARD ACTION BAR */}
          <div className="contact-action-bar">
            <div className="contact-btn-group">
              <button
                type="button"
                className="contact-submit-btn"
                onClick={handleSendMessage}
              >
                <Send size={15} aria-hidden="true" />
                <span>Send Message</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>

              <a
                href="https://www.linkedin.com/in/asamarsal/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-linkedin-btn"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.72.77-1.72 1.72 0 .95.77 1.72 1.72 1.72.95 0 1.72-.77 1.72-1.72 0-.95-.77-1.72-1.72-1.72Z" />
                </svg>
                <span>Message on LinkedIn</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

