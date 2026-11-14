'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Eye, EyeOff, X } from 'lucide-react'
import { AsciiPortrait } from './ascii-portrait'
import { AsciiWave } from './ascii-wave'
import { DigitalPresenceCard } from './digital-presence-card'
import { HeroStats } from './story-sections'

export function HeroSection() {
  const [showPhoto, setShowPhoto] = useState(false)
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false)

  useEffect(() => {
    if (!isPhotoViewerOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPhotoViewerOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPhotoViewerOpen])

  return (
    <section id="home" className="hero-section" data-section>
      <div className="hero-grid layout-shell">
        <div className="hero-intro">
          <p className="eyebrow mono"><span>//</span> portfolio v1.0.0</p>
          <div className="hero-title-row">
            <h1 className="hero-heading" data-scratch-reveal>
              <span>Hi, I&apos;m</span>
              <span className="hero-name">Asa Marsal<span className="hero-caret">_</span></span>
            </h1>
            <button
              type="button"
              className="hero-mobile-avatar"
              onClick={() => setIsPhotoViewerOpen(true)}
              title="Lihat foto profil"
              aria-label="Lihat foto profil Asa Marsal"
            >
              <Image
                src="/images/profilephoto.png"
                alt="Asa Marsal"
                width={80}
                height={80}
                className="hero-mobile-avatar-img"
                priority
              />
            </button>
          </div>
          <div className="role-strip"><span>Creative Engineer</span></div>
          <p className="hero-copy">
            A developer and product builder who turns ideas into impactful digital products — across web, mobile, and Web3.
          </p>
          <div className="hero-actions">
            <a className="button-primary magnetic-link" href="#projects" data-magnetic>
              <span className="btn-text-full">Explore My Work</span>
              <span className="btn-text-short">My Work</span>
              <ArrowUpRight aria-hidden="true" />
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
            aria-label={
              showPhoto
                ? 'Original portrait photo of Asa Marsal'
                : 'ASCII portrait of Asa Marsal that disperses into dust as you scroll'
            }
          >
            <AsciiPortrait className={`hero-ascii ${showPhoto ? 'is-hidden' : ''}`} />
            <div className={`hero-photo-layer ${showPhoto ? 'is-visible' : ''}`} aria-hidden={!showPhoto}>
              <Image
                src="/images/face-hero.png"
                alt="Asa Marsal portrait photo"
                fill
                sizes="(max-width: 900px) 100vw, 480px"
                className="hero-photo-img"
                priority
              />
            </div>
          </div>

          <button
            type="button"
            className={`art-eye-toggle ${showPhoto ? 'is-active' : ''}`}
            onClick={() => setShowPhoto((prev) => !prev)}
            data-magnetic
            title={showPhoto ? 'Beralih ke versi ASCII Face' : 'Lihat foto asli'}
            aria-label={showPhoto ? 'Beralih ke versi ASCII Face' : 'Lihat foto asli'}
            aria-pressed={showPhoto}
          >
            {showPhoto ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
          </button>

          <span className="art-coordinate mono">Frontend Dev<br />@asamarsal</span>
          <div className="art-corner art-corner-tl" aria-hidden="true" />
          <div className="art-corner art-corner-br" aria-hidden="true" />
          <span className="art-caption mono">to keep me warm, i got to feel the fire</span>
          <span className="art-crosshair" aria-hidden="true">+</span>
        </div>

        <div className="hero-aside">
          <DigitalPresenceCard />
        </div>
      </div>
      <a className="hero-scroll-cue mono" href="#skills">
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

      {/* Profile Photo Viewer Modal */}
      {isPhotoViewerOpen && (
        <div
          className="photoviewer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Profile photo viewer"
          onClick={() => setIsPhotoViewerOpen(false)}
        >
          <div
            className="photoviewer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="photoviewer-close-btn"
              onClick={() => setIsPhotoViewerOpen(false)}
              aria-label="Close photo viewer"
              title="Close"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="photoviewer-image-card">
              <Image
                src="/images/profilephoto.png"
                alt="Asa Marsal profile photo"
                width={500}
                height={500}
                className="photoviewer-img"
                priority
              />
            </div>
            <p className="photoviewer-caption mono">Asa Marsal</p>
          </div>
        </div>
      )}
    </section>
  )
}
