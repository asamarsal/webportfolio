'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Copy, Smartphone, Moon, Sun } from 'lucide-react'

type LinktreeViewProps = {
  onSwitchToFull: () => void
  theme?: 'dark' | 'light'
  onToggleTheme?: () => void
}

type LinkItem = {
  id: string
  label: string
  url: string
  icon:
  | 'linkedin'
  | 'behance'
  | 'github'
  | 'medium'
  | 'instagram'
  | 'objkt'
  | 'gitbook'
  | 'dribbble'
  | 'gumroad'
  | 'youtube'
  | 'soundcloud'
  | 'gdrive'
}

const linkItems: LinkItem[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/asamarsal/',
    icon: 'linkedin',
  },
  {
    id: 'behance',
    label: 'Behance',
    url: 'http://behance.net/asamarsal',
    icon: 'behance',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/asamarsal',
    icon: 'github',
  },
  {
    id: 'medium',
    label: 'Medium',
    url: 'https://medium.com/@asamarsal',
    icon: 'medium',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/exluminated',
    icon: 'instagram',
  },
  {
    id: 'objkt',
    label: 'Objkt (NFT)',
    url: 'https://objkt.com/users/tz1QNKFfaBJk1RU5MxLWUZDBk1p6BypXo5rB/',
    icon: 'objkt',
  },
  {
    id: 'gitbook',
    label: 'GitBook Notes',
    url: 'https://asamarsal.gitbook.io/notes',
    icon: 'gitbook',
  },
  {
    id: 'dribbble',
    label: 'Dribbble',
    url: 'http://dribbble.com/asamarsal',
    icon: 'dribbble',
  },
  {
    id: 'gumroad',
    label: 'Gumroad',
    url: 'https://exluminate.gumroad.com/',
    icon: 'gumroad',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/channel/UClqybM4UxI5B6KBkp7Xqu2g',
    icon: 'youtube',
  },
  {
    id: 'soundcloud',
    label: 'SoundCloud',
    url: 'https://soundcloud.com/asamarsal',
    icon: 'soundcloud',
  },
  {
    id: 'gdrive',
    label: 'Google Drive',
    url: 'https://drive.google.com/drive/folders/1_3tBqLBtyHLoRXcSdQpG_1UvUFyJ50rM',
    icon: 'gdrive',
  },
]

function renderLinkIcon(type: LinkItem['icon']) {
  switch (type) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M7 10v7M7 7v.01M11 17v-4.5a2 2 0 0 1 4 0V17M11 10v7" />
        </svg>
      )
    case 'behance':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M4 6h4.5a3.5 3.5 0 0 1 2.3 6.1A3.8 3.8 0 0 1 4 18H4V6zm2.4 4.8h2a1.4 1.4 0 0 0 0-2.8H6.4v2.8zm0 5h2.2a1.6 1.6 0 0 0 0-3.2H6.4v3.2zm8.4-5.8h5.2v1.4h-5.2v-1.4zm5.1 4.5c0-3.2-2.1-4.7-4.6-4.7-2.6 0-4.6 2-4.6 4.7 0 2.8 2 4.7 4.8 4.7 2.2 0 3.8-1.1 4.3-2.6h-2.1a2.1 2.1 0 0 1-2.2 1.3 2.3 2.3 0 0 1-2.4-2.1h6.8c0-.4 0-.9 0-1.3zm-6.8-.7c.2-1.3 1.1-2.1 2.2-2.1 1.2 0 2.1.8 2.2 2.1h-4.4z" />
        </svg>
      )
    case 'github':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    case 'medium':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M6.5 8.5v7M17.5 8.5v7M6.5 8.5l5.5 7 5.5-7" strokeWidth="1.8" />
        </svg>
      )
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.4" />
        </svg>
      )
    case 'objkt':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    case 'gitbook':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      )
    case 'dribbble':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.53 2.74c3.96 5.92 6.14 11.75 6.94 18.52" />
        </svg>
      )
    case 'gumroad':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'soundcloud':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
          <line x1="8" y1="13" x2="8" y2="17" />
          <line x1="11" y1="11" x2="11" y2="17" />
          <line x1="14" y1="13" x2="14" y2="17" />
        </svg>
      )
    case 'gdrive':
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
          <path d="M7.784 14.216l3.892 6.74h8.324l-3.892-6.74H7.784zm8.432-1.728l3.892-6.74H11.784l-3.892 6.74h8.324zm-9.08-5.012L3.244 14.216l4.162 7.208 3.892-6.74-4.162-7.208z" />
        </svg>
      )
  }
}

export function LinktreeView({ onSwitchToFull, theme = 'dark', onToggleTheme }: LinktreeViewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)

  const handleCopyLink = async (url: string, id: string) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`
    await navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    setActiveMenuId(null)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="linktree-screen">
      {/* Subtle top ambient glow matching dark background */}
      <div className="linktree-ambient-glow" aria-hidden="true" />

      {/* Top action header */}
      <header className="linktree-topbar">
        <button
          type="button"
          className="linktree-mode-badge-btn mono"
          onClick={onSwitchToFull}
          title="Current: Simple Mode. Tap to switch to Creative Mode"
          aria-label="Current: Simple Mode. Switch to Creative Mode"
        >
          <Smartphone size={13} aria-hidden="true" className="linktree-mode-badge-icon" />
          <span>Simple Mode</span>
        </button>

        {onToggleTheme && (
          <button
            type="button"
            className="linktree-top-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'light'}
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        )}
      </header>

      {/* Profile Section */}
      <section className="linktree-profile">
        <div className="linktree-avatar-wrapper">
          <Image
            src="/avatar.png"
            alt="Asa Marsal"
            width={96}
            height={96}
            className="linktree-avatar"
            priority
          />
        </div>
        <h1 className="linktree-name">Asa Marsal</h1>
        <p className="linktree-bio">Here&apos;s All of My Portfolio Down Below</p>
      </section>

      {/* Stack of link cards */}
      <main className="linktree-links" role="list">
        {linkItems.map((item) => (
          <div className="linktree-card-wrapper" key={item.id} role="listitem">
            <div className="linktree-card">
              <a
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                rel={item.url.startsWith('http') ? 'noreferrer' : undefined}
                className="linktree-card-main"
              >
                <span className="linktree-card-icon">
                  {renderLinkIcon(item.icon)}
                </span>
                <span className="linktree-card-label">{item.label}</span>
              </a>

              <button
                type="button"
                className="linktree-card-menu-btn"
                aria-label={`Options for ${item.label}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveMenuId(activeMenuId === item.id ? null : item.id)
                }}
              >
                {/* Vertical 3 dots */}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <circle cx="12" cy="5" r="1.6" />
                  <circle cx="12" cy="12" r="1.6" />
                  <circle cx="12" cy="19" r="1.6" />
                </svg>
              </button>
            </div>

            {/* Context menu for 3 dots */}
            {activeMenuId === item.id && (
              <div className="linktree-popup-menu">
                <button
                  type="button"
                  onClick={() => handleCopyLink(item.url, item.id)}
                  className="linktree-popup-item"
                >
                  <Copy size={13} aria-hidden="true" />
                  <span>{copiedId === item.id ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="linktree-popup-item"
                  onClick={() => setActiveMenuId(null)}
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  <span>Open Link</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  )
}

