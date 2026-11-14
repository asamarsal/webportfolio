'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { AsciiSkeleton } from 'ascii-reveal'

type LinkItem = {
  title: string
  desc: string
  url: string
  icon: React.ReactNode
  widths: string[]
}

const digitalLinks: LinkItem[] = [
  {
    title: 'LinkedIn',
    desc: 'Professional network',
    url: 'https://www.linkedin.com/in/asamarsal/',
    widths: ['52%', '92%'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
        <path
          d="M5.5 8.7h3.1V19H5.5V8.7zM7.1 4.5c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zM10.8 8.7h3v1.4h.1c.4-.8 1.5-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.8V19h-3.1v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V19h-3.1V8.7z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  {
    title: 'Behance',
    desc: 'Creative work',
    url: 'http://behance.net/asamarsal',
    widths: ['48%', '78%'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#0057ff" aria-hidden="true">
        <path d="M4 6h4.5a3.5 3.5 0 0 1 2.3 6.1A3.8 3.8 0 0 1 4 18H4V6zm2.4 4.8h2a1.4 1.4 0 0 0 0-2.8H6.4v2.8zm0 5h2.2a1.6 1.6 0 0 0 0-3.2H6.4v3.2zm8.4-5.8h5.2v1.4h-5.2v-1.4zm5.1 4.5c0-3.2-2.1-4.7-4.6-4.7-2.6 0-4.6 2-4.6 4.7 0 2.8 2 4.7 4.8 4.7 2.2 0 3.8-1.1 4.3-2.6h-2.1a2.1 2.1 0 0 1-2.2 1.3 2.3 2.3 0 0 1-2.4-2.1h6.8c0-.4 0-.9 0-1.3zm-6.8-.7c.2-1.3 1.1-2.1 2.2-2.1 1.2 0 2.1.8 2.2 2.1h-4.4z" />
      </svg>
    ),
  },
  {
    title: 'GitHub',
    desc: 'Open source projects',
    url: 'https://github.com/asamarsal',
    widths: ['45%', '92%'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Medium',
    desc: 'Articles & writing',
    url: 'https://medium.com/@asamarsal',
    widths: ['46%', '86%'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M3 5.5h4.2l4.8 10.4 4.5-10.4H21V7h-1.2c-.3 0-.6.2-.6.5V17c0 .3.3.5.6.5H21v1.5h-5.8V17.5h1.2c.3 0 .5-.2.5-.5V8.8l-4.7 10.2h-.8L6.2 8.7V17c0 .3.2.5.5.5h1.5V19H3v-1.5h1.2c.3 0 .5-.2.5-.5V7.5c0-.3-.2-.5-.5-.5H3V5.5z" />
      </svg>
    ),
  },
  {
    title: 'Instagram',
    desc: 'Visual journal',
    url: 'https://www.instagram.com/exluminated',
    widths: ['58%', '80%'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <defs>
          <linearGradient id="dp-ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd600" />
            <stop offset="25%" stopColor="#ff7a00" />
            <stop offset="50%" stopColor="#ff0069" />
            <stop offset="75%" stopColor="#d300c5" />
            <stop offset="100%" stopColor="#7638fa" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5.5" fill="none" stroke="url(#dp-ig-grad)" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="url(#dp-ig-grad)" strokeWidth="2.2" />
        <circle cx="17.2" cy="6.8" r="1.3" fill="url(#dp-ig-grad)" />
      </svg>
    ),
  },
  {
    title: 'Objkt (NFT)',
    desc: 'Digital art & NFT',
    url: 'https://objkt.com/users/tz1QNKFfaBJk1RU5MxLWUZDBk1p6BypXo5rB/',
    widths: ['62%', '88%'],
    icon: (
      <span
        className="mono font-bold"
        style={{ fontSize: '11px', letterSpacing: '-0.02em', color: 'currentColor', lineHeight: 1 }}
      >
        objkt
      </span>
    ),
  },
  {
    title: 'GitBook Notes',
    desc: 'Documentation & notes',
    url: 'https://asamarsal.gitbook.io/notes',
    widths: ['72%', '96%'],
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
        <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: 'Dribbble',
    desc: 'UI / UX design',
    url: 'http://dribbble.com/asamarsal',
    widths: ['50%', '82%'],
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="#ea4c89"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.53 2.74c3.48 4.9 5.08 10.5 4.79 18.52" />
      </svg>
    ),
  },
  {
    title: 'Gumroad',
    desc: 'Digital products',
    url: 'https://exluminate.gumroad.com/',
    widths: ['48%', '85%'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#ff90e8" />
        <text
          x="12"
          y="16.5"
          fill="#000"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="900"
        >
          G
        </text>
      </svg>
    ),
  },
  {
    title: 'YouTube',
    desc: 'Video content',
    url: 'https://www.youtube.com/channel/UClqybM4UxI5B6KBkp7Xqu2g',
    widths: ['50%', '78%'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="#FF0000" />
        <polygon points="10,8 15.5,12 10,16" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    title: 'SoundCloud',
    desc: 'Audio & sound design',
    url: 'https://soundcloud.com/asamarsal',
    widths: ['64%', '94%'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#ff5500" aria-hidden="true">
        <path d="M11.56 8.87V17h7.24a3.86 3.86 0 0 0 3.86-3.86c0-2-1.52-3.65-3.48-3.84a5.04 5.04 0 0 0-4.83-3.43c-1.07 0-2.06.35-2.86.95l.07 2.05zM10.15 9.77v7.23h-.84V9.8c.28-.02.56-.03.84-.03zM7.9 11.23v5.77h-.84v-5.59c.28-.08.56-.14.84-.18zM5.65 12.38V17H4.8v-4.47c.28-.06.56-.1.85-.15zm-2.26 1.4V17h-.84v-2.97c.27-.08.55-.15.84-.23zm-2.25 1.5V17H.3v-1.46c.27-.09.56-.18.84-.26z" />
      </svg>
    ),
  },
  {
    title: 'Google Drive',
    desc: 'Certificates & docs',
    url: 'https://drive.google.com/drive/folders/1_3tBqLBtyHLoRXcSdQpG_1UvUFyJ50rM',
    widths: ['68%', '90%'],
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M8.27 3.3h7.46l5.77 10h-7.46z" fill="#4285F4" />
        <path d="M14.04 13.3H2.5l3.73 6.5h15.27z" fill="#34A853" />
        <path d="M2.5 13.3L8.27 3.3l3.73 6.5-5.77 10z" fill="#FBBC05" />
      </svg>
    ),
  },
]

export function DigitalPresenceCard() {
  const [isReady, setIsReady] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const mountTime = performance.now()
    const minSkeletonDuration = 850
    let revealTimer: NodeJS.Timeout | null = null
    let unmountTimer: NodeJS.Timeout | null = null

    const elapsed = performance.now() - mountTime
    const delay = Math.max(0, minSkeletonDuration - elapsed)

    revealTimer = setTimeout(() => {
      setIsFading(true)
      setIsReady(true)
      unmountTimer = setTimeout(() => {
        setShowSkeleton(false)
      }, 550)
    }, delay)

    return () => {
      if (revealTimer) clearTimeout(revealTimer)
      if (unmountTimer) clearTimeout(unmountTimer)
    }
  }, [])

  return (
    <aside
      className={`dp-window reveal-up ${isCollapsed ? 'is-collapsed' : ''}`}
      aria-label="Asa Marsal digital presence & portfolio links"
    >
      {/* Heading & Collapse Toggle Button */}
      <div className="dp-header-row">
        <h2 className="dp-heading">
          Here&apos;s All of My<br />
          Portfolio Down Below<span className="dp-orange-dot">.</span>
        </h2>
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className={`dp-toggle-btn ${isCollapsed ? 'is-collapsed' : ''}`}
          title={isCollapsed ? 'Expand portfolio links' : 'Collapse to icon marquee'}
          aria-label={isCollapsed ? 'Expand portfolio links' : 'Collapse to icon marquee'}
          aria-expanded={!isCollapsed}
        >
          <ChevronDown size={18} className="dp-toggle-chevron" aria-hidden="true" />
        </button>
      </div>

      {isCollapsed ? (
        /* Collapsed View: Running icon marquee from left to right */
        <div className="dp-collapsed-marquee" aria-label="Social and portfolio links running marquee">
          <div className="dp-collapsed-track">
            {/* Duplicated 4 times to ensure seamless infinite loop */}
            {[...digitalLinks, ...digitalLinks, ...digitalLinks, ...digitalLinks].map((item, idx) => (
              <a
                key={`marquee-${item.title}-${idx}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="dp-marquee-icon-btn"
                title={`${item.title} — ${item.desc}`}
                aria-label={item.title}
              >
                <span className="dp-marquee-icon">{item.icon}</span>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* 2-Column Links Grid with 3D Flip Card Hover Effect & ASCII Skeleton Shimmer */}
          <div className="dp-grid">
            {digitalLinks.map((item, index) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="dp-card"
                title={`${item.title} — ${item.desc}`}
              >
                <div className="dp-card-stage" aria-hidden="true">
                  {/* Front leaf: Resting view that folds up on hover */}
                  <div className="dp-card-leaf dp-card-front">
                    <span className="dp-card-icon">{item.icon}</span>
                    <div className="dp-card-info">
                      <span className={`dp-card-title ${showSkeleton && !isReady ? 'is-loading' : ''}`}>
                        {item.title}
                      </span>
                      <span className={`dp-card-desc ${showSkeleton && !isReady ? 'is-loading' : ''}`}>
                        {item.desc}
                      </span>

                      {showSkeleton && (
                        <div className={`dp-card-skeleton ${isFading ? 'is-fading' : ''}`} aria-hidden="true">
                          <AsciiSkeleton
                            variant="dither"
                            lines={2}
                            widths={item.widths}
                            seed={index * 7 + 3}
                            className="dp-text-skeleton"
                          />
                        </div>
                      )}
                    </div>
                    <ArrowUpRight className="dp-card-arrow" size={13} />
                  </div>

                  {/* Back leaf: Highlighted view that flips up from bottom on hover */}
                  <div className="dp-card-leaf dp-card-back">
                    <span className="dp-card-icon dp-card-icon--back">{item.icon}</span>
                    <div className="dp-card-info">
                      <span className={`dp-card-title dp-card-title--back ${showSkeleton && !isReady ? 'is-loading' : ''}`}>
                        {item.title}
                      </span>
                      <span className={`dp-card-desc dp-card-desc--back ${showSkeleton && !isReady ? 'is-loading' : ''}`}>
                        {item.desc}
                      </span>

                      {showSkeleton && (
                        <div className={`dp-card-skeleton ${isFading ? 'is-fading' : ''}`} aria-hidden="true">
                          <AsciiSkeleton
                            variant="dither"
                            lines={2}
                            widths={item.widths}
                            seed={index * 7 + 3}
                            className="dp-text-skeleton"
                          />
                        </div>
                      )}
                    </div>
                    <ArrowUpRight className="dp-card-arrow dp-card-arrow--back" size={13} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Window Footer Strip */}
          <div className="dp-footer">
            <span className="dp-footer-tag mono">EXPLORE MY DIGITAL FOOTPRINT</span>
            <a
              href="https://www.linkedin.com/in/asamarsal/"
              target="_blank"
              rel="noopener noreferrer"
              className="dp-footer-link mono"
            >
              ASA MARSAL <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </>
      )}
    </aside>
  )
}
