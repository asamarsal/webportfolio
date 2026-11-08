'use client'

import { Smartphone, Sparkles } from 'lucide-react'

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
          aria-label="Switch to Creative Mode"
        >
          <Sparkles size={12} aria-hidden="true" />
          <span>Creative Mode</span>
        </button>

        <button
          type="button"
          className={`mobile-view-flag-btn ${mode === 'simple' ? 'is-active' : ''}`}
          onClick={() => onChange('simple')}
          aria-pressed={mode === 'simple'}
          aria-label="Switch to Simple Mode"
        >
          <Smartphone size={12} aria-hidden="true" />
          <span>Simple Mode</span>
        </button>
      </div>
    </div>
  )
}

