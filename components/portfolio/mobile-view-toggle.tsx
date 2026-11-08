'use client'

import { Globe, Smartphone } from 'lucide-react'

type ViewMode = 'full' | 'simple'

type MobileViewToggleProps = {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function MobileViewToggle({ mode, onChange }: MobileViewToggleProps) {
  return (
    <div className="mobile-view-flag-container" role="region" aria-label="View mode switcher">
      <div className="mobile-view-flag-pill">
        <button
          type="button"
          className={`mobile-view-flag-btn ${mode === 'full' ? 'is-active' : ''}`}
          onClick={() => onChange('full')}
          aria-pressed={mode === 'full'}
          aria-label="Switch to full website portfolio"
        >
          <Globe size={13} aria-hidden="true" />
          <span>Full Web</span>
        </button>

        <button
          type="button"
          className={`mobile-view-flag-btn ${mode === 'simple' ? 'is-active' : ''}`}
          onClick={() => onChange('simple')}
          aria-pressed={mode === 'simple'}
          aria-label="Switch to simple portfolio view"
        >
          <Smartphone size={13} aria-hidden="true" />
          <span>Simple</span>
        </button>
      </div>
    </div>
  )
}

