'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { SiteNavigation } from './site-navigation'
import { HeroSection } from './hero-section'
import { TechStackSection } from './tech-stack-section'
import { ProjectsSection } from './projects-section'
import { AboutSection, BeyondSection, ExperienceSection } from './story-sections'
import { ContactSection } from './contact-section'
import { FooterSection } from './footer-section'
import { ScrollAsciiBackground } from './scroll-ascii-background'
import { LinktreeView } from './linktree-view'
import { MobileViewToggle } from './mobile-view-toggle'

type ThemeMode = 'dark' | 'light'
type ViewMode = 'full' | 'simple'

function CursorFollower() {
  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    const ring = document.querySelector<HTMLElement>('.cursor-ring')
    if (!dot || !ring) return

    const moveCursor = (event: PointerEvent) => {
      const position = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      dot.style.transform = position
      ring.style.transform = position
    }
    const toggleTarget = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const interactiveTarget = Boolean(target.closest('a, button, [tabindex="0"]'))
      document.body.classList.toggle('cursor-on-target', interactiveTarget)
    }
    const hideCursor = () => document.body.classList.add('cursor-hidden')
    const showCursor = () => document.body.classList.remove('cursor-hidden')

    window.addEventListener('pointermove', moveCursor, { passive: true })
    document.addEventListener('pointerover', toggleTarget)
    document.addEventListener('pointerout', toggleTarget)
    document.addEventListener('pointerleave', hideCursor)
    document.addEventListener('pointerenter', showCursor)

    return () => {
      window.removeEventListener('pointermove', moveCursor)
      document.removeEventListener('pointerover', toggleTarget)
      document.removeEventListener('pointerout', toggleTarget)
      document.removeEventListener('pointerleave', hideCursor)
      document.removeEventListener('pointerenter', showCursor)
      document.body.classList.remove('cursor-on-target', 'cursor-hidden')
    }
  }, [])

  return (
    <div className="cursor-follower" aria-hidden="true">
      <span className="cursor-ring" />
      <span className="cursor-dot" />
    </div>
  )
}

export default function PortfolioPage() {
  const mainRef = useRef<HTMLElement | null>(null)
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [themeReady, setThemeReady] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('full')
  const [viewModeReady, setViewModeReady] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('asa-portfolio-theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme: ThemeMode = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : systemTheme

    document.documentElement.dataset.theme = initialTheme
    setTheme(initialTheme)
    setThemeReady(true)

    const savedViewMode = window.localStorage.getItem('asa-portfolio-view-mode') as ViewMode | null
    if (savedViewMode === 'full' || savedViewMode === 'simple') {
      setViewMode(savedViewMode)
    }
    setViewModeReady(true)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    if (themeReady) window.localStorage.setItem('asa-portfolio-theme', theme)
  }, [theme, themeReady])

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    if (viewModeReady) {
      window.localStorage.setItem('asa-portfolio-view-mode', mode)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  useEffect(() => {
    const updateScrollState = () => {
      if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY)
      }
      setIsScrolled(window.scrollY > 24)
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    if (viewMode === 'simple') return

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)
        const activeId = visibleSections[0]?.target.id
        if (activeId) setActiveSection(activeId)
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [viewMode])

  useEffect(() => {
    if (viewMode === 'simple') return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.1,
      anchors: { offset: -84 },
      respectReducedMotion: true,
    })
    const updateLenis = (time: number) => lenis.raf(time * 1000)
    lenis.on('scroll', () => ScrollTrigger.update())
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 24, filter: 'blur(5px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            delay: Number(element.dataset.revealDelay ?? 0),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 89%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-scratch-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.82,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 91%',
              once: true,
            },
          },
        )
      })

      document.querySelectorAll<HTMLElement>('[data-count]').forEach((element) => {
        const count = Number(element.dataset.count)
        if (!Number.isFinite(count)) return
        const counter = { value: 0 }
        const suffix = element.dataset.suffix ?? ''

        gsap.to(counter, {
          value: count,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            element.textContent = `${Math.round(counter.value)}${suffix}`
          },
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            once: true,
          },
        })
      })

      const footerElements = gsap.utils.toArray<HTMLElement>(
        '.footer-brand-lockup, .footer-tagline, .footer-social-row, .footer-col, .footer-divider, .footer-bottom-bar',
      )
      if (footerElements.length > 0) {
        gsap.fromTo(
          footerElements,
          { autoAlpha: 0, y: 22, filter: 'blur(5px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.76,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.footer-section',
              start: 'top 88%',
              once: true,
            },
          },
        )
      }
    }, mainRef)

    const responsiveMotion = gsap.matchMedia()
    responsiveMotion.add('(min-width: 900px)', () => {
      const footerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      footerTimeline
        .fromTo(
          '.footer-col-title',
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', ease: 'none', stagger: 0.04 },
          0,
        )
        .fromTo(
          '.footer-nav-link',
          { y: 16, autoAlpha: 0.35 },
          { y: 0, autoAlpha: 1, ease: 'none', stagger: 0.02 },
          0.1,
        )
        .to('.footer-ascii-canvas', { scale: 1.12, y: -24, opacity: 0.72, ease: 'none' }, 0)

      return () => footerTimeline.scrollTrigger?.kill()
    })

    const magneticCleanups: Array<() => void> = []
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((element) => {
      const moveX = gsap.quickTo(element, 'x', { duration: 0.24, ease: 'power3.out' })
      const moveY = gsap.quickTo(element, 'y', { duration: 0.24, ease: 'power3.out' })
      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType === 'touch') return
        const bounds = element.getBoundingClientRect()
        moveX((event.clientX - bounds.left - bounds.width / 2) * 0.12)
        moveY((event.clientY - bounds.top - bounds.height / 2) * 0.12)
      }
      const resetPosition = () => {
        moveX(0)
        moveY(0)
      }

      element.addEventListener('pointermove', onPointerMove, { passive: true })
      element.addEventListener('pointerleave', resetPosition)
      magneticCleanups.push(() => {
        element.removeEventListener('pointermove', onPointerMove)
        element.removeEventListener('pointerleave', resetPosition)
        gsap.killTweensOf(element)
      })
    })

    const refreshTriggers = () => ScrollTrigger.refresh()
    window.addEventListener('load', refreshTriggers, { once: true })
    const refreshFrameId = window.requestAnimationFrame(refreshTriggers)

    return () => {
      window.removeEventListener('load', refreshTriggers)
      window.cancelAnimationFrame(refreshFrameId)
      magneticCleanups.forEach((cleanup) => cleanup())
      gsap.ticker.remove(updateLenis)
      responsiveMotion.revert()
      context.revert()
      lenis.destroy()
    }
  }, [viewMode])

  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark')

  return (
    <div className={`portfolio-shell ${viewMode === 'simple' ? 'is-simple-view' : ''}`}>
      {viewMode === 'simple' ? (
        <>
          <LinktreeView
            onSwitchToFull={() => handleViewModeChange('full')}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
          <MobileViewToggle mode={viewMode} onChange={handleViewModeChange} />
        </>
      ) : (
        <>
          <ScrollAsciiBackground />
          <SiteNavigation
            activeSection={activeSection}
            isScrolled={isScrolled}
            theme={theme}
            onToggleTheme={toggleTheme}
            viewMode={viewMode}
            onToggleViewMode={() => handleViewModeChange('simple')}
          />
          <main ref={mainRef}>
            <HeroSection />
            <TechStackSection />
            <ProjectsSection />
            <AboutSection />
            <ExperienceSection />
            <BeyondSection />
            <ContactSection />
            <FooterSection />
          </main>
          <CursorFollower />
          <MobileViewToggle mode={viewMode} onChange={handleViewModeChange} />
        </>
      )}
    </div>
  )
}
