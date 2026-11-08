'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Sparkles, Smartphone, Sun, X } from 'lucide-react'
import { navigationItems } from './portfolio-data'
import { AsaSmileLogo } from './asa-smile-logo'

type ThemeMode = 'dark' | 'light'

type SiteNavigationProps = {
  activeSection: string
  isScrolled: boolean
  theme: ThemeMode
  onToggleTheme: () => void
  viewMode?: 'full' | 'simple'
  onToggleViewMode?: () => void
}

export function SiteNavigation({
  activeSection,
  isScrolled,
  theme,
  onToggleTheme,
  viewMode = 'full',
  onToggleViewMode,
}: SiteNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-nav${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-shell">
        <a className="brand-lockup" href="#home" onClick={closeMenu} aria-label="Asa Marsal, home">
          <span className="brand-mark" aria-hidden="true">
            <AsaSmileLogo theme={theme} />
          </span>
          <span className="brand-name">
            Asa Marsal
            <small>Creative Engineer</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'is-active' : undefined}
              aria-current={activeSection === item.id ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          {onToggleViewMode && (
            <button
              className="view-mode-nav-btn mobile-only"
              type="button"
              onClick={onToggleViewMode}
              aria-label="Current: Creative Mode. Tap to switch to Simple Mode"
              title="Creative Mode (Tap to switch to Simple Mode)"
            >
              <Sparkles size={11} aria-hidden="true" />
              <span className="mono">Creative Mode</span>
            </button>
          )}
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-pressed={theme === 'light'}
          >
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          <a className="nav-cta" href="#contact" data-magnetic>
            Let&apos;s Build <ArrowUpRight aria-hidden="true" />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-topline mono">
            <span>// choose a direction</span>
            <span>06 sections</span>
          </div>
          <div className="mobile-nav-links">
            {navigationItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'is-active' : undefined}
                onClick={closeMenu}
              >
                <span className="mobile-link-index mono">0{index + 1}</span>
                <span>{item.label}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
          <a className="mobile-contact-link" href="#contact" onClick={closeMenu}>
            Let&apos;s make something matter <ArrowUpRight aria-hidden="true" />
          </a>
          {onToggleViewMode && (
            <button
              type="button"
              className="mobile-nav-mode-btn mono"
              onClick={() => {
                onToggleViewMode()
                closeMenu()
              }}
            >
              <span>SWITCH TO SIMPLE MODE</span>
              <ArrowUpRight aria-hidden="true" />
            </button>
          )}
        </nav>
      )}
    </header>
  )
}
