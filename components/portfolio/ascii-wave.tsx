'use client'

import { useEffect, useRef } from 'react'

const clampUnit = (value: number) => Math.max(0, Math.min(1, value))
const smoothStep = (value: number) => {
  const progress = clampUnit(value)
  return progress * progress * (3 - 2 * progress)
}

type RGBColor = readonly [number, number, number]

function paintDot(
  pixels: Uint8ClampedArray,
  canvasW: number,
  canvasH: number,
  cx: number,
  cy: number,
  radius: number,
  color: RGBColor,
  alpha: number,
  pixelRatio: number,
) {
  if (alpha <= 0) return

  const r = radius * pixelRatio
  const pxCx = cx * pixelRatio
  const pxCy = cy * pixelRatio
  const minX = Math.max(0, Math.floor(pxCx - r))
  const maxX = Math.min(canvasW - 1, Math.ceil(pxCx + r))
  const minY = Math.max(0, Math.floor(pxCy - r))
  const maxY = Math.min(canvasH - 1, Math.ceil(pxCy + r))
  const r2 = r * r

  for (let py = minY; py <= maxY; py++) {
    for (let px = minX; px <= maxX; px++) {
      const dx = px - pxCx
      const dy = py - pxCy
      if (dx * dx + dy * dy > r2) continue
      const idx = (py * canvasW + px) * 4
      if (pixels[idx + 3] >= alpha) continue
      pixels[idx] = color[0]
      pixels[idx + 1] = color[1]
      pixels[idx + 2] = color[2]
      pixels[idx + 3] = alpha
    }
  }
}

function hash(a: number, b: number): number {
  const v = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return v - Math.floor(v)
}

export function AsciiWave() {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })

    if (!stage || !canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 1
    let height = 1
    let pixelRatio = 1
    let visible = true
    let frameImage: ImageData | null = null
    let animFrameId = 0

    const DOT_SPACING = 8
    const WAVE_LAYERS = 5
    const BAND_SPACING = 7

    const resize = () => {
      const bounds = stage.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      frameImage = context.createImageData(canvas.width, canvas.height)
    }

    // Compute wave surface Y (0..1 normalized) for a given x-position and layer at time t
    const waveY = (x: number, layer: number, t: number): number => {
      const baseOffset = 0.18 + layer * 0.13

      // Primary ocean swell — slow, large amplitude, moves right-to-left
      const swell = Math.sin(x * 0.008 - t * 0.4 + layer * 0.9) * 0.13

      // Secondary wave — medium speed, different direction feel
      const wave2 = Math.sin(x * 0.018 + t * 0.25 + layer * 1.6) * 0.045

      // Tertiary ripple — faster, subtle surface chop
      const ripple = Math.sin(x * 0.04 - t * 0.7 + layer * 2.3) * 0.018

      // Slow drift to add organic breathing
      const breath = Math.sin(t * 0.12 + layer * 1.1) * 0.015

      return baseOffset + swell + wave2 + ripple + breath
    }

    const draw = (t: number) => {
      if (!frameImage) return

      const pixels = frameImage.data
      pixels.fill(0)

      const themeIsLight = document.documentElement.dataset.theme === 'light'
      const ink: RGBColor = themeIsLight ? [31, 29, 26] : [238, 232, 220]
      const orange: RGBColor = themeIsLight ? [229, 91, 17] : [255, 107, 22]

      const columns = Math.ceil(width / DOT_SPACING)
      const stepX = width / columns
      const maxBands = Math.ceil(height * 0.6 / BAND_SPACING)

      // Horizontal drift: moves dots from left to right, looping seamlessly
      const driftSpeed = 18 // pixels per second
      const driftOffset = (t * driftSpeed) % width

      for (let layer = 0; layer < WAVE_LAYERS; layer++) {
        const baseRadius = 2.2 - layer * 0.25

        for (let col = -2; col < columns + 2; col++) {
          // Apply horizontal drift offset per dot
          let xPos = (col + 0.5) * stepX + driftOffset
          // Wrap around for seamless loop
          xPos = ((xPos % width) + width) % width

          // Use the visual x position for wave calculation so the shape drifts with dots
          const surfaceNy = waveY(xPos, layer, t)

          // Surface dot
          {
            const y = surfaceNy * height
            if (y >= -4 && y < height + 4) {
              const seed = hash(col + layer * 1000, 0)
              const isOrange = seed < (0.22 + layer * 0.04)
              const color = isOrange ? orange : ink
              const opacity = 0.75 + (1 - layer / WAVE_LAYERS) * 0.25

              paintDot(pixels, canvas.width, canvas.height, xPos, y, baseRadius, color, Math.round(opacity * 255), pixelRatio)
            }
          }

          // Body dots below surface
          for (let band = 1; band <= maxBands; band++) {
            const depth = (band * BAND_SPACING) / height
            const dy = surfaceNy + depth
            if (dy > 1.02) break

            const seed = hash(col + layer * 1000, band)
            const density = 0.50 * Math.exp(-depth * 3.2) + 0.03
            if (seed > density) continue

            const y = dy * height
            if (y < -4 || y >= height + 4) continue

            const accentSeed = hash(col * 3 + layer * 500, band * 7)
            const nearSurface = Math.exp(-depth * 6)
            const isOrange = accentSeed < (0.04 + nearSurface * 0.2)
            const opacity = clampUnit(0.12 + nearSurface * 0.5)
            const bodyRadius = baseRadius * (0.45 + nearSurface * 0.55)

            paintDot(pixels, canvas.width, canvas.height, xPos, y, bodyRadius, isOrange ? orange : ink, Math.round(opacity * 255), pixelRatio)
          }
        }
      }

      context.putImageData(frameImage, 0, 0)
    }

    let lastTime = 0
    const FPS_INTERVAL = 1000 / 30 // cap at 30fps for performance

    const animate = (timestamp: number) => {
      animFrameId = requestAnimationFrame(animate)

      if (!visible) return

      const elapsed = timestamp - lastTime
      if (elapsed < FPS_INTERVAL) return
      lastTime = timestamp - (elapsed % FPS_INTERVAL)

      const t = timestamp * 0.001 // convert to seconds
      draw(t)
    }

    const syncScroll = () => {
      const bounds = stage.getBoundingClientRect()
      const start = window.innerHeight * 0.88
      const end = window.innerHeight * 0.35 - bounds.height
      const fadeProgress = reducedMotion
        ? 0
        : clampUnit((start - bounds.top) / Math.max(1, start - end))
      canvas.style.opacity = String(1 - smoothStep(fadeProgress))
    }

    const handleResize = () => {
      resize()
      syncScroll()
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(stage)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    intersectionObserver.observe(stage)

    const themeObserver = new MutationObserver(() => {
      // Theme change will be picked up on next draw frame
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    window.addEventListener('scroll', syncScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    handleResize()

    if (reducedMotion) {
      draw(0)
    } else {
      animFrameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('scroll', syncScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={stageRef} className="hero-wave-stage" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-wave-canvas" />
    </div>
  )
}
