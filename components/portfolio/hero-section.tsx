import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { AsciiPortrait } from './ascii-portrait'
import { AsciiWave } from './ascii-wave'
import { TechStackSection } from './tech-stack-section'
import { HeroStats } from './story-sections'

const terminalLines = [
  ['name', 'Asa Marsal'],
  ['role', 'Creative Engineer'],
  ['focus', 'Web3, Product, UI/UX'],
]

function TerminalWindow() {
  return (
    <aside className="terminal-window reveal-up" aria-label="Portfolio terminal profile">
      <div className="terminal-topbar">
        <div className="terminal-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="terminal-prompt-label mono">asa@portfolio:~$ whoami</span>
        <span className="terminal-window-mark mono">01</span>
      </div>

      <pre className="terminal-art mono" aria-hidden="true">{`   .   .     .       +     .
 .   .-.-.       .      .      .
   . /   \\  .        *    .
 .  / /\\ \\      .      .
  _/ /  \\ \\_  .    .       +
 /__/    \\__\\      .`}</pre>

      <div className="terminal-divider" />
      <div className="terminal-content mono">
        <p className="terminal-command"><span>›</span> whoami</p>
        {terminalLines.map(([label, value], index) => (
          <p
            className="terminal-line"
            key={label}
            style={{ animationDelay: `${0.12 + index * 0.1}s` }}
          >
            <span className="terminal-prompt">›</span>
            <span className="terminal-key">{label}</span>
            <span className="terminal-value">: {value}</span>
          </p>
        ))}
        <div className="terminal-status" style={{ animationDelay: '0.52s' }}>
          <span className="terminal-prompt">›</span>
          <span className="terminal-key">status</span>
          <span className="terminal-value">: <span className="terminal-typing">building...</span></span>
          <span className="terminal-progress" aria-hidden="true">
            {Array.from({ length: 10 }, (_, index) => (
              <i className={index < 7 ? 'is-filled' : undefined} key={index} />
            ))}
          </span>
          <span className="terminal-percent">72%</span>
        </div>
      </div>
    </aside>
  )
}

export function HeroSection() {
  return (
    <section id="home" className="hero-section" data-section>
      <div className="hero-grid layout-shell">
        <div className="hero-intro">
          <p className="eyebrow mono"><span>//</span> portfolio v1.0.0</p>
          <h1 className="hero-heading" data-scratch-reveal>
            <span>Hi, I&apos;m</span>
            <span className="hero-name">Asa Marsal<span className="hero-caret">_</span></span>
          </h1>
          <div className="role-strip"><span>Creative Engineer</span></div>
          <p className="hero-copy">
            A developer and product builder who turns ideas into impactful digital products — across web, mobile, and Web3.
          </p>
          <div className="hero-actions">
            <a className="button-primary magnetic-link" href="#projects" data-magnetic>
              Explore My Work <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="button-outline" href="/Asa-Marsal-CV.txt" download>
              Download CV <ArrowDown aria-hidden="true" />
            </a>
          </div>
          <HeroStats />
        </div>

        <div className="hero-art reveal-up">
          <div
            className="hero-ascii-mask"
            role="img"
            aria-label="ASCII portrait of Asa Marsal that disperses into dust as you scroll"
          >
            <AsciiPortrait className="hero-ascii" />
          </div>
          <span className="art-coordinate mono">FIELD NOTE 01<br />IDEAS IN MOTION</span>
          <div className="art-corner art-corner-tl" aria-hidden="true" />
          <div className="art-corner art-corner-br" aria-hidden="true" />
          <span className="art-caption mono">a small atlas of possible things</span>
          <span className="art-crosshair" aria-hidden="true">+</span>
        </div>

        <div className="hero-aside">
          <TerminalWindow />
          <TechStackSection />
        </div>
      </div>
      <a className="hero-scroll-cue mono" href="#projects">
        <span className="scroll-cue-mouse" aria-hidden="true" />
        <span className="scroll-cue-label">Scroll to explore</span>
        <span className="scroll-cue-wave" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="scroll-cue-dot"
              style={{ '--i': i } as React.CSSProperties}
            />
          ))}
        </span>
      </a>
      <AsciiWave />
    </section>
  )
}
