import type { CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
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

export function ExperienceSection() {
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
