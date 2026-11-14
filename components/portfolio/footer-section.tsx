'use client'

import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { AsciiLandscape } from './ascii-landscape'
import { AsaSmileLogo } from './asa-smile-logo'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Beyond', href: '#beyond' },
]

const RESOURCE_LINKS = [
  { label: 'CV (PDF)', href: 'https://drive.google.com/drive/folders/1_3tBqLBtyHLoRXcSdQpG_1UvUFyJ50rM' },
  { label: 'GitBook Notes', href: 'https://asamarsal.gitbook.io/notes' },
  { label: 'Gumroad', href: 'https://exluminate.gumroad.com/' },
  { label: 'Google Drive', href: 'https://drive.google.com/drive/folders/1_3tBqLBtyHLoRXcSdQpG_1UvUFyJ50rM' },
]

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/asamarsal/',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.95 0-1.72.77-1.72 1.72 0 .95.77 1.72 1.72 1.72.95 0 1.72-.77 1.72-1.72 0-.95-.77-1.72-1.72Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/asamarsal',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: 'Behance',
    href: 'http://behance.net/asamarsal',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M4 6h4.5a3.5 3.5 0 0 1 2.3 6.1A3.8 3.8 0 0 1 4 18H4V6zm2.4 4.8h2a1.4 1.4 0 0 0 0-2.8H6.4v2.8zm0 5h2.2a1.6 1.6 0 0 0 0-3.2H6.4v3.2zm8.4-5.8h5.2v1.4h-5.2v-1.4zm5.1 4.5c0-3.2-2.1-4.7-4.6-4.7-2.6 0-4.6 2-4.6 4.7 0 2.8 2 4.7 4.8 4.7 2.2 0 3.8-1.1 4.3-2.6h-2.1a2.1 2.1 0 0 1-2.2 1.3 2.3 2.3 0 0 1-2.4-2.1h6.8c0-.4 0-.9 0-1.3zm-6.8-.7c.2-1.3 1.1-2.1 2.2-2.1 1.2 0 2.1.8 2.2 2.1h-4.4z" />
      </svg>
    ),
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@asamarsal',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M3 5.5h4.2l4.8 10.4 4.5-10.4H21V7h-1.2c-.3 0-.6.2-.6.5V17c0 .3.3.5.6.5H21v1.5h-5.8V17.5h1.2c.3 0 .5-.2.5-.5V8.8l-4.7 10.2h-.8L6.2 8.7V17c0 .3.2.5.5.5h1.5V19H3v-1.5h1.2c.3 0 .5-.2.5-.5V7.5c0-.3-.2-.5-.5-.5H3V5.5z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/exluminated',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UClqybM4UxI5B6KBkp7Xqu2g',
    icon: (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export function FooterSection() {
  return (
    <footer id="footer" className="footer-section">
      <div className="footer-stage">
        {/* Animated ASCII Canvas running continuously in background */}
        <AsciiLandscape className="footer-ascii-canvas" variant="footer" />

        {/* Ambient top vignette / gradient overlay */}
        <div className="footer-overlay" aria-hidden="true" />

        {/* Main Footer Content */}
        <div className="footer-container">
          <div className="footer-grid">
            {/* COLUMN 1: Brand, Tagline, Socials */}
            <div className="footer-col footer-col--brand">
              <div className="footer-brand-lockup">
                <div className="footer-brand-logo" aria-hidden="true">
                  <AsaSmileLogo size={34} />
                </div>
                <div className="footer-brand-divider" aria-hidden="true" />
                <div className="footer-brand-info">
                  <span className="footer-brand-name">Asa Marsal</span>
                  <span className="footer-brand-role mono">CREATIVE ENGINEER</span>
                </div>
              </div>

              <p className="footer-tagline">
                Building digital products, exploring Web3, and turning ideas into real impact.
              </p>

              <div className="footer-social-row" aria-label="Social profiles">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    title={item.name}
                    aria-label={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* COLUMN 2: Navigate */}
            <div className="footer-col">
              <h3 className="footer-col-title mono">
                <span className="footer-slashes">//</span> Navigate
              </h3>
              <nav className="footer-nav-list" aria-label="Footer navigation">
                {NAV_LINKS.map((item) => (
                  <a key={item.label} href={item.href} className="footer-nav-link">
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* COLUMN 3: Resources */}
            <div className="footer-col">
              <h3 className="footer-col-title mono">
                <span className="footer-slashes">//</span> Resources
              </h3>
              <div className="footer-nav-list">
                {RESOURCE_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-nav-link footer-nav-link--external"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={13} aria-hidden="true" className="footer-link-arrow" />
                  </a>
                ))}
              </div>
            </div>

            {/* COLUMN 4: Let's Connect */}
            <div className="footer-col footer-col--connect">
              <h3 className="footer-col-title mono">
                <span className="footer-slashes">//</span> Let&apos;s Connect
              </h3>
              <p className="footer-connect-desc">
                Have a project, collaboration, or just want to say hi?
              </p>
              <a href="#contact" className="footer-cta-btn">
                <Mail size={15} aria-hidden="true" />
                <span>Send me a Message</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Thin Hairline Divider */}
          <div className="footer-divider" aria-hidden="true" />

          {/* Bottom Bar Strip */}
          <div className="footer-bottom-bar">
            <span className="footer-copyright">
              © 2026 Asa Marsal. All rights reserved.
            </span>

            <div className="footer-status-group">
              <div className="footer-status-pill">
                <span className="footer-status-dot" aria-hidden="true" />
                <span>Open to collaboration</span>
              </div>

              <span className="footer-bar-separator" aria-hidden="true">|</span>

              <div className="footer-location">
                <MapPin size={13} aria-hidden="true" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
