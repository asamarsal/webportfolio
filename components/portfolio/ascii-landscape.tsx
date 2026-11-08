'use client'

import { useEffect, useRef } from 'react'

type AsciiLandscapeProps = {
  className?: string
  variant?: 'hero' | 'footer'
}

const GLYPHS = ' .:+*#%@01'
const clampUnit = (value: number) => Math.max(0, Math.min(1, value))
const smoothStep = (value: number) => {
  const progress = clampUnit(value)
  return progress * progress * (3 - 2 * progress)
}

export function AsciiLandscape({
  className = '',
  variant = 'hero',
}: AsciiLandscapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement

    if (!canvas || !host) return
    const heroSection = variant === 'hero' ? host.closest<HTMLElement>('#home') : null

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return
    const ctx = context
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -1, y: -1 }
    let width = 1
    let height = 1
    let pixelRatio = 1
    let scrollProgress = 0
    let heroProgress = 0
    let frameId = 0
    let lastFrame = 0
    let visible = true

    const resize = () => {
      const bounds = host.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      draw(performance.now())
    }

    const updateScroll = () => {
      if (reducedMotion) draw(performance.now())
    }

    const updatePointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect()
      pointer.x = (event.clientX - bounds.left) / bounds.width
      pointer.y = (event.clientY - bounds.top) / bounds.height
      if (reducedMotion) draw(performance.now())
    }

    const clearPointer = () => {
      pointer.x = -1
      pointer.y = -1
      if (reducedMotion) draw(performance.now())
    }

    function draw(time: number) {
      if (heroSection) {
        const heroBounds = heroSection.getBoundingClientRect()
        heroProgress = clampUnit(-heroBounds.top / Math.max(1, heroBounds.height))
      }
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      ctx.clearRect(0, 0, width, height)

      const compact = width < 360
      const footerScene = variant === 'footer'
      const fontSize = footerScene ? 8 : compact ? 9 : 10
      const stepX = footerScene ? (compact ? 8 : 12) : compact ? 8 : 9
      const stepY = footerScene ? (compact ? 14 : 18) : compact ? 11 : 13
      const columns = Math.min(
        compact ? footerScene ? 44 : 56 : footerScene ? 76 : 92,
        Math.ceil(width / stepX),
      )
      const rows = Math.ceil(height / stepY)
      const theme = document.documentElement.dataset.theme
      const darkMode = theme !== 'light'
      const ink = darkMode ? '238, 232, 220' : '31, 29, 26'
      const orange = darkMode ? '255, 107, 22' : '229, 91, 17'
      const cyan = darkMode ? '0, 229, 255' : '0, 134, 153'
      const motion = reducedMotion ? 0 : time * 0.00016
      const waveMorph = variant === 'footer' ? smoothStep((scrollProgress - 0.69) / 0.3) : 0
      const portraitMorph = variant === 'hero' ? smoothStep((heroProgress - 0.02) / 0.24) : 0
      const waveStrength = variant === 'footer'
        ? 0.018 + scrollProgress * 0.04
        : 0.014 + scrollProgress * 0.072
      const mouseStrength = pointer.x >= 0 && pointer.y >= 0 ? 0.045 : 0

      ctx.font = `${fontSize}px 'IBM Plex Mono', 'Courier New', monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (let row = 0; row < rows; row += 1) {
        const ny = row / Math.max(1, rows - 1)

        for (let column = 0; column < columns; column += 1) {
          const nx = column / Math.max(1, columns - 1)
          const pointX = (column + 0.5) * stepX
          const pointY = (row + 0.5) * stepY
          const mouseDistance = Math.hypot(nx - pointer.x, (ny - pointer.y) * 0.72)
          const mouseInfluence = mouseStrength
            ? Math.max(0, 1 - mouseDistance / 0.24) * mouseStrength
            : 0
          const drift = Math.sin(nx * 15 + motion * 2.1) * waveStrength
          const firstPeakX = variant === 'footer' ? 0.18 : 0.34
          const secondPeakX = variant === 'footer' ? 0.82 : 0.67
          const peakA = Math.exp(-Math.pow((nx - firstPeakX) / 0.17, 2)) * 0.32
          const peakB = Math.exp(-Math.pow((nx - secondPeakX) / 0.2, 2)) * 0.27
          const mountainShape = 0.73 - Math.max(peakA, peakB)
          const flowingWave = 0.72 + Math.sin(nx * 8 + motion * 1.8) * 0.05 + Math.sin(nx * 17 - motion) * 0.016
          const mountainLine = mountainShape * (1 - waveMorph) + flowingWave * waveMorph + drift - mouseInfluence
          const warpedY = ny + Math.sin(nx * 9 - motion * 1.4) * waveStrength * 0.28
          const sunX = variant === 'footer' ? 0.5 : 0.52
          const sunY = variant === 'footer' ? 0.34 : 0.38
          const sunDistance = Math.hypot((nx - sunX) * 1.06, (ny - sunY) * 1.4)
          const inSun = sunDistance < (variant === 'footer' ? 0.19 : 0.175)
          const cloudLine = 0.56 + Math.sin(nx * 13 + motion * 0.7) * 0.018
          const inCloud =
            ny > cloudLine - 0.022 &&
            ny < cloudLine + 0.018 &&
            ((nx > 0.04 && nx < 0.34) || (nx > 0.69 && nx < 0.98))
          const globeX = 0.82
          const globeY = 0.28
          const globeDX = (nx - globeX) / 0.105
          const globeDY = (ny - globeY) / 0.105
          const globeRadius = Math.hypot(globeDX, globeDY)
          const inGlobe = variant === 'hero' && globeRadius < 1 && (
            globeRadius > 0.84 ||
            Math.abs(Math.sin(globeDX * 6 + motion)) < 0.16 ||
            Math.abs(Math.sin(globeDY * 6)) < 0.15
          )
          const headDistance = Math.hypot((nx - 0.7) / 0.14, (ny - 0.55) / 0.16)
          const shoulderDistance = Math.hypot((nx - 0.7) / 0.29, (ny - 0.84) / 0.17)
          const portraitNeck = ny > 0.68 && ny < 0.76 && Math.abs(nx - 0.7) < 0.1
          const inPortrait = variant === 'hero' && (
            headDistance < 1 || portraitNeck || (shoulderDistance < 1 && ny > 0.61)
          )
          const portraitEdge = Math.abs(headDistance - 1) < 0.17 || (
            Math.abs(shoulderDistance - 1) < 0.14 && ny > 0.61
          )
          const terrainDepth = variant === 'footer' ? 0.18 * (1 - waveMorph) + 0.11 * waveMorph : 0.2
          const ridge = Math.abs(warpedY - mountainLine) < 0.015
          const terrain = warpedY > mountainLine && warpedY < mountainLine + terrainDepth
          const seed = Math.abs(Math.sin(column * 12.9898 + row * 78.233) * 43758.5453) % 1
          let glyph = ''
          let color = `rgba(${ink}, 0.38)`
          let glyphOpacity = variant === 'hero' ? 1 - portraitMorph : 1
          let glyphX = pointX
          let glyphY = pointY

          if (variant === 'hero' && portraitMorph > 0.025 && inPortrait) {
            const portraitPattern = (row + column) % 5
            glyph = portraitEdge ? '#' : portraitPattern === 0 ? '@' : portraitPattern === 1 ? '%' : portraitPattern === 2 ? '0' : '@'
            color = seed > 0.94
              ? `rgba(${orange}, 0.9)`
              : seed > 0.82
                ? `rgba(${cyan}, 0.8)`
                : `rgba(${ink}, 0.92)`
            glyphOpacity = portraitMorph
          } else if (variant === 'hero' && portraitMorph > 0.97) {
            continue
          } else if (inGlobe && portraitMorph < 0.68) {
            if (seed > 0.2) {
              glyph = seed > 0.9 ? '@' : seed > 0.62 ? ':' : '.'
              color = seed > 0.94 ? `rgba(${orange}, 0.82)` : `rgba(${cyan}, ${0.52 + seed * 0.35})`
            }
          } else if (inSun) {
            if (seed > 0.12) {
              glyph = GLYPHS[Math.floor(seed * GLYPHS.length)]
              color = `rgba(${orange}, ${0.68 + seed * 0.26})`
            }
          } else if (inCloud) {
            if (seed > 0.16) {
              glyph = seed > 0.78 ? '*' : seed > 0.5 ? ':' : '.'
              color = `rgba(${ink}, ${0.4 + seed * 0.4})`
            }
          } else if (ridge) {
            if (waveMorph > 0.35) {
              glyph = column % 4 === 0 ? '~' : '.'
              const waveColor = column % 9 === 0 ? orange : cyan
              color = `rgba(${waveColor}, ${0.56 + waveMorph * 0.3})`
            } else {
              glyph = column % 5 === 0 ? '^' : column % 2 === 0 ? '/' : '\\'
              color = `rgba(${ink}, 0.76)`
            }
          } else if (terrain && seed > (variant === 'footer' ? 0.9 : 0.32)) {
            const slope = Math.max(0, Math.min(1, (warpedY - mountainLine) / terrainDepth))
            const charIndex = Math.min(7, Math.floor(1 + slope * 4 + seed * 1.35))
            glyph = GLYPHS[charIndex]
            color = mouseInfluence > 0.012
              ? `rgba(${cyan}, ${0.62 + mouseInfluence * 4})`
              : waveMorph > 0.4 && seed > 0.86
                ? `rgba(${orange}, ${0.48 + waveMorph * 0.3})`
                : `rgba(${ink}, ${0.3 + slope * 0.38})`
          } else if (seed > 0.984 && ny < 0.48) {
            const scatter = variant === 'hero'
              ? smoothStep((scrollProgress - 0.04) / 0.05) * (1 - smoothStep((scrollProgress - 0.12) / 0.06))
              : waveMorph
            glyph = GLYPHS[Math.floor(seed * GLYPHS.length)]
            glyphX += Math.sin(motion * 1.8 + row * 0.71 + column) * (2 + scatter * 5)
            glyphY += Math.cos(motion * 1.4 + column * 0.51) * (2 + scatter * 3) - scatter * seed * 9
            color = seed > 0.994 ? `rgba(${orange}, 0.75)` : `rgba(${ink}, 0.36)`
          } else if (ny > 0.82 && seed > 0.91) {
            glyph = seed > 0.97 ? '+' : '.'
            color = `rgba(${cyan}, 0.46)`
          }

          if (!glyph) continue
          ctx.globalAlpha = glyphOpacity
          ctx.fillStyle = color
          ctx.fillText(glyph, glyphX, glyphY)
          ctx.globalAlpha = 1
        }
      }
    }

    const animate = (time: number) => {
      if (time - lastFrame >= 32) {
        lastFrame = time
        draw(time)
      }
      if (visible && !reducedMotion) frameId = window.requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      if (!reducedMotion && visible) frameId = window.requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        draw(performance.now())
        startAnimation()
      } else {
        window.cancelAnimationFrame(frameId)
      }
    })
    intersectionObserver.observe(host)
    host.addEventListener('pointermove', updatePointer, { passive: true })
    host.addEventListener('pointerleave', clearPointer)
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', resize, { passive: true })

    const themeObserver = new MutationObserver(() => draw(performance.now()))
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    updateScroll()
    resize()
    startAnimation()

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      host.removeEventListener('pointermove', updatePointer)
      host.removeEventListener('pointerleave', clearPointer)
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', resize)
    }
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className={`ascii-landscape ${className}`}
      aria-hidden="true"
    />
  )
}
