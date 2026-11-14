'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import StackIcon from 'tech-stack-icons'
import { experiences, interests, stats } from './portfolio-data'

export function HeroStats() {
  return (
    <ul className="hero-stats" aria-label="Portfolio highlights">
      {stats.slice(0, 3).map((stat) => (
        <li className="hero-stat-item" key={stat.label}>
          <strong data-count={stat.count ?? undefined} data-suffix={stat.suffix}>
            {stat.value}
          </strong>
          <span>{stat.label}</span>
          <small>{stat.detail}</small>
        </li>
      ))}
    </ul>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="about-section layout-shell" data-section>
      <div className="about-index mono reveal-up">
        <span>// 01</span>
        <span>ABOUT</span>
      </div>
      <div className="about-main reveal-up">
        <h2 data-scratch-reveal>Build with intent.<br /><em>Leave room for wonder.</em></h2>
        <div className="about-copy-grid">
          <p>
            I&apos;m a creative engineer drawn to the space between a useful product and an unexpected detail. I like taking ideas from a rough sketch to something people can actually use.
          </p>
          <p>
            From reusable interfaces at BNI to on-chain experiments, I bring a systems mindset, a curious eye, and a belief that good software can feel human.
          </p>
        </div>
      </div>
      <aside className="about-note reveal-up">
        <span className="note-pin" aria-hidden="true" />
        <span className="note-label mono">A WORKING THESIS</span>
        <p>Make it clear.<br />Make it useful.<br /><em>Make it memorable.</em></p>
        <span className="note-signoff mono">— asa, still iterating</span>
      </aside>
    </section>
  )
}

function CapCutIcon() {
  return (
    <svg viewBox="-0.5 1 25.5 22" width="100%" height="100%" fill="currentColor" aria-hidden="true">
      <path d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.741-7.828l-7.742 4.057-7.825-4.057h15.567z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function WagmiIcon() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden="true">
      <path d="M3.116 4.286H3v6.14l9 7.727l9-8.145V4.325l-9 7.495zm13.796 0L12 8.53L7.089 4.286zM21 13.878l-6.943 5.837H21zm-10.993 5.837L3 13.672v6.043z" />
    </svg>
  )
}

export function ExperienceSection() {
  const [themeVariant, setThemeVariant] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const updateVariant = () => {
      const isLight = document.documentElement.dataset.theme === 'light'
      setThemeVariant(isLight ? 'light' : 'dark')
    }
    updateVariant()

    const observer = new MutationObserver(updateVariant)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="experience-section" data-section>
      <div className="experience-heading layout-shell">
        <div>
          <p className="section-eyebrow mono">// selected chapters</p>
          <h2 data-scratch-reveal>Experience<span className="orange-period">.</span></h2>
        </div>
        <p className="experience-intro mono">A few places where the ideas met the real world.</p>
      </div>

      <div className="experience-timeline layout-shell">
        {experiences.map((experience) => (
          <article className="experience-item reveal-up" key={experience.index}>
            <div className="experience-marker mono">
              <span>{experience.index}</span>
              <span className="timeline-line" aria-hidden="true" />
            </div>
            <div className="experience-content">
              <div className="experience-meta mono">
                <span>{experience.context}{experience.period ? ` · ${experience.period}` : ''}</span>
                {experience.logo ? (
                  <span className="experience-logo-wrapper">
                    <Image
                      src={experience.logo}
                      alt={`${experience.organization} logo`}
                      width={64}
                      height={64}
                      className="experience-logo-img"
                    />
                  </span>
                ) : (
                  <span>{experience.index} / {String(experiences.length).padStart(2, '0')}</span>
                )}
              </div>
              <h3>{experience.role}</h3>
              <p className="experience-organization">
                {experience.organization}
                {experience.project && (
                  <span className="experience-project"> · <em>{experience.project}</em></span>
                )}
              </p>
              <p className="experience-description">{experience.description}</p>
              <ul className="experience-highlights">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}><span aria-hidden="true">↳</span>{highlight}</li>
                ))}
              </ul>
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="experience-tech-icons" aria-label="Technologies used">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="experience-tech-chip"
                      title={tech.name}
                      data-label={tech.name}
                      aria-label={tech.name}
                    >
                      <span className="experience-tech-icon">
                        {tech.customKey === 'capcut' ? (
                          <CapCutIcon />
                        ) : tech.customKey === 'x' ? (
                          <XIcon />
                        ) : tech.customKey === 'wagmi' ? (
                          <WagmiIcon />
                        ) : tech.icon ? (
                          <StackIcon
                            name={tech.icon}
                            variant={themeVariant}
                          />
                        ) : null}
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <ArrowUpRight className="experience-arrow" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}

export function BeyondSection() {
  return (
    <section id="beyond" className="beyond-section layout-shell" data-section>
      <div className="beyond-heading reveal-up">
        <div className="beyond-paper-title">
          <span className="mono">04 / OPEN TABS</span>
          <h2 data-scratch-reveal>Beyond<br />the Code<span className="orange-period">.</span></h2>
        </div>
        <div className="beyond-copy">
          <p>
            Exploring business development, entrepreneurship, and creative product ideas beyond engineering.
          </p>
          <a className="text-link mono" href="#contact">
            Keep the conversation going <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <span className="beyond-scribble" aria-hidden="true">still curious</span>
      </div>

      <div className="interest-grid">
        {interests.map((interest, index) => {
          const Icon = interest.icon
          return (
            <article className="interest-card reveal-up" key={interest.number}>
              <div className="interest-topline mono">
                <span>{interest.number} / 04</span>
                <ArrowDownRight aria-hidden="true" />
              </div>
              <Icon className="interest-icon" aria-hidden="true" strokeWidth={1.5} />
              <h3>{interest.title}</h3>
              <p>{interest.note}</p>
              <span className="interest-underline" aria-hidden="true" style={{ '--interest-index': index } as CSSProperties} />
            </article>
          )
        })}
      </div>
    </section>
  )
}
