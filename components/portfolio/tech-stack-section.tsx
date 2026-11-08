'use client'

import { useEffect, useState } from 'react'
import StackIcon from 'tech-stack-icons'
import { technologyStack } from './portfolio-data'

function MoveLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    >
      <path
        d="M4 19V5.5L12 13.5L20 5.5V19"
        stroke="var(--cyan)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="19" r="1.5" fill="var(--orange)" />
    </svg>
  )
}

export function TechStackSection() {
  const [variant, setVariant] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const updateVariant = () => {
      const isLight = document.documentElement.dataset.theme === 'light'
      setVariant(isLight ? 'light' : 'dark')
    }
    updateVariant()

    const observer = new MutationObserver(updateVariant)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  const renderIcon = (technology: (typeof technologyStack)[number]) => {
    if (technology.icon) {
      return (
        <StackIcon
          name={technology.icon}
          variant={variant}
          className="tech-icon"
        />
      )
    }
    if (technology.name === 'Move') {
      return (
        <span className="tech-icon">
          <MoveLogo />
        </span>
      )
    }
    return <span className="tech-icon-fallback">{technology.mark}</span>
  }

  return (
    <aside id="skills" className="tech-stack hero-tech-stack" aria-labelledby="tech-stack-title">
      <div className="tech-title-paper">
        <span className="mono">//</span>
        <h2 id="tech-stack-title" data-scratch-reveal>Tech Stack</h2>
      </div>
      <div className="tech-grid">
        {technologyStack.map((technology, index) => (
          <article
            className={`tech-tile${index === 0 || index === 2 || index === 7 ? ' is-accent' : ''}`}
            key={technology.name}
            tabIndex={0}
            aria-label={technology.name}
            title={technology.name}
          >
            <div className="tech-card-stage" aria-hidden="true">
              {/* Front leaf: Icon that folds up on hover */}
              <div className="tech-card-leaf tech-card-front">
                <span className="tech-mark">
                  {renderIcon(technology)}
                </span>
              </div>

              {/* Back leaf: Icon that flips up into view from bottom */}
              <div className="tech-card-leaf tech-card-back">
                <span className="tech-mark tech-mark--back">
                  {renderIcon(technology)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="tech-stack-foot mono">
        <span>12 tools</span>
        <span>and always learning</span>
      </div>
    </aside>
  )
}
