'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SHIMMER_GLYPHS = '.:+*#%@'
const clampUnit = (value: number) => Math.max(0, Math.min(1, value))
const smoothStep = (value: number) => {
  const progress = clampUnit(value)
  return progress * progress * (3 - 2 * progress)
}

export function ScrollAsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 1
    let height = 1
    let pixelRatio = 1
    let scrollProgress = 0
    let frameId = 0
    let lastFrame = 0
    let visible = document.visibilityState === 'visible'

    const resize = () => {
      width = Math.max(1, window.innerWidth)
      height = Math.max(1, window.innerHeight)
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      draw(performance.now())
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)

      const compact = width < 520
      const columns = Math.max(1, Math.ceil(width / (compact ? 20 : 18)))
      const rows = Math.ceil(height / (compact ? 21 : 23))
      const stepX = width / columns
      const stepY = height / rows
      const progress = smoothStep(scrollProgress / 0.8)
      const motion = reducedMotion ? 0 : time * 0.00042 + scrollProgress * 19
      const themeIsLight = document.documentElement.dataset.theme === 'light'
      const cyan = themeIsLight ? '0, 134, 153' : '0, 229, 255'
      const orange = themeIsLight ? '229, 91, 17' : '255, 107, 22'

      context.font = `${compact ? 10 : 12}px 'IBM Plex Mono', 'Courier New', monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      for (let row = 0; row < rows; row += 1) {
        const ny = (row + 0.5) / rows

        for (let column = 0; column < columns; column += 1) {
          const nx = (column + 0.5) / columns
          const seed = Math.abs(Math.sin(column * 12.9898 + row * 78.233) * 43758.5453) % 1
          const wave = Math.sin(nx * 16 - motion + Math.cos(ny * 7 + motion * 0.4) * 0.8) * 0.5 + 0.5
          const crossWave = Math.cos(ny * 15 + motion * 0.72 - nx * 4) * 0.5 + 0.5
          const shimmer = wave * 0.62 + crossWave * 0.22 + seed * 0.16
          const threshold = 0.9 - progress * 0.46

          if (shimmer < threshold) continue

          const intensity = clampUnit((shimmer - threshold) / Math.max(0.001, 1 - threshold))
          const glyphIndex = Math.max(
            1,
            Math.min(
              SHIMMER_GLYPHS.length - 1,
              Math.floor(shimmer * (SHIMMER_GLYPHS.length - 1)),
            ),
          )
          const color = (row * 3 + column) % 11 === 0 ? orange : cyan
          const opacity = (0.18 + progress * 0.38) * (0.45 + intensity * 0.55)
          const offsetX = Math.sin(motion * 0.7 + row * 0.42) * (1 + progress * 2.5)
          const offsetY = Math.cos(motion * 0.55 + column * 0.31) * (1 + progress * 2)

          context.globalAlpha = opacity
          context.fillStyle = `rgba(${color}, 1)`
          context.fillText(
            SHIMMER_GLYPHS[glyphIndex],
            (column + 0.5) * stepX + offsetX,
            (row + 0.5) * stepY + offsetY,
          )
        }
      }

      context.globalAlpha = 1
    }

    const animate = (time: number) => {
      if (time - lastFrame >= 40) {
        lastFrame = time
        draw(time)
      }
      if (visible && !reducedMotion) frameId = window.requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      if (visible && !reducedMotion) frameId = window.requestAnimationFrame(animate)
    }

    const syncScrollProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = scrollableHeight > 0 ? clampUnit(window.scrollY / scrollableHeight) : 0
      if (reducedMotion) draw(performance.now())
    }

    gsap.registerPlugin(ScrollTrigger)
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onUpdate: syncScrollProgress,
      onRefresh: syncScrollProgress,
    })

    const handleVisibilityChange = () => {
      visible = document.visibilityState === 'visible'
      if (visible) {
        draw(performance.now())
        startAnimation()
      } else {
        window.cancelAnimationFrame(frameId)
      }
    }

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('scroll', syncScrollProgress, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    syncScrollProgress()
    resize()
    startAnimation()

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', syncScrollProgress)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      scrollTrigger.kill()
    }
  }, [])

  return (
    <div className="ascii-scroll-background" aria-hidden="true">
      <canvas ref={canvasRef} className="ascii-scroll-canvas" />
    </div>
  )
}
