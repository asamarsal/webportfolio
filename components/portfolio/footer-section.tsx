import { ArrowUp, ArrowUpRight, Briefcase, Code2, Mail } from 'lucide-react'
import { AsciiLandscape } from './ascii-landscape'

export function FooterSection() {
  return (
    <footer id="footer" className="footer-section" data-section>
      <div className="footer-stage">
        <AsciiLandscape className="footer-ascii-canvas" variant="footer" />
        <div className="footer-topline layout-shell mono">
          <span>END OF TRANSMISSION</span>
          <span>OPEN FOR BUSINESS COLLABORATIONS</span>
        </div>
        <div className="footer-content layout-shell">
          <p className="footer-kicker mono"><span>asa@portfolio:~$</span> echo</p>
          <p className="footer-command mono">&quot;LET&apos;S BUILD SOMETHING GREAT TOGETHER&quot;</p>
          <h2 data-scratch-reveal>Good ideas<br /><em>deserve to ship.</em></h2>
          <a className="footer-email" href="mailto:asa@portfolio.dev" data-magnetic>
            asa@portfolio.dev <ArrowUpRight aria-hidden="true" />
          </a>
          <nav className="footer-links" aria-label="Social and contact links">
            <a href="https://github.com/asamarsal" target="_blank" rel="noreferrer">
              <Code2 aria-hidden="true" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/asamarsal/" target="_blank" rel="noreferrer">
              <Briefcase aria-hidden="true" /> LinkedIn
            </a>
            <a href="mailto:asa@portfolio.dev">
              <Mail aria-hidden="true" /> Email
            </a>
            <a href="#home">
              <ArrowUp aria-hidden="true" /> Back to Top
            </a>
          </nav>
        </div>
        <div className="footer-bottom layout-shell mono">
          <span>© 2026 ASA MARSAL</span>
          <span>BUILT WITH CURIOSITY &amp; A LITTLE ORANGE</span>
          <span>WEB / MOBILE / WEB3</span>
        </div>
      </div>
    </footer>
  )
}
