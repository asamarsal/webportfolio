'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AsciiSkeleton } from 'ascii-reveal'

type AsciiPortraitProps = {
  className?: string
}

const PORTRAIT_SOURCE = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Q8dSarJ6HFHwNSEYshYYNyhiDyUatw.png'
const PORTRAIT_CROP = { x: 0.305, y: 0.095, width: 0.37, height: 0.82 }
const PORTRAIT_MASKS = [
  { x: 0.49, y: 0.93, width: 0.06, height: 0.07 }, // scroll icon mask
  { x: 0.0, y: 0.315, width: 0.09, height: 0.035 }, // top-left orange bar artifact
  { x: 0.0, y: 0.615, width: 0.06, height: 0.09 }, // bottom-left bracket mark artifact
]
const GLYPHS = ' .,:;irsXA253hMHGS#9B&@'

const clampUnit = (value: number) => Math.max(0, Math.min(1, value))
const smoothStep = (value: number) => {
  const progress = clampUnit(value)
  return progress * progress * (3 - 2 * progress)
}

export function AsciiPortrait({ className = '' }: AsciiPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = containerRef.current || canvas?.parentElement
    const hero = canvas?.closest<HTMLElement>('#home')
    const context = canvas?.getContext('2d', { alpha: true })
    const sampleCanvas = document.createElement('canvas')
    const sampleContext = sampleCanvas.getContext('2d', { willReadFrequently: true })
    const photoCanvas = document.createElement('canvas')
    const photoContext = photoCanvas.getContext('2d', { willReadFrequently: true })

    if (!canvas || !host || !hero || !context || !sampleContext || !photoContext) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const image = new window.Image()
    image.crossOrigin = 'anonymous'

    let width = 1
    let height = 1
    let pixelRatio = 1
    let columns = 1
    let rows = 1
    let pixels: Uint8ClampedArray | null = null
    let scrollProgress = 0
    let frameId = 0
    let lastFrame = 0
    let imageReady = false
    let photoReady = false
    let visible = true
    const mountTime = performance.now()
    const minSkeletonDuration = 850
    let revealTimer: NodeJS.Timeout | null = null
    let unmountTimer: NodeJS.Timeout | null = null

    const triggerReveal = () => {
      const elapsed = performance.now() - mountTime
      const delay = Math.max(0, minSkeletonDuration - elapsed)

      revealTimer = setTimeout(() => {
        setIsFading(true)
        setIsReady(true)
        unmountTimer = setTimeout(() => {
          setShowSkeleton(false)
        }, 550)
      }, delay)
    }

    const samplePortrait = () => {
      if (!imageReady) return

      sampleCanvas.width = columns
      sampleCanvas.height = rows
      const sourceX = image.naturalWidth * PORTRAIT_CROP.x
      const sourceY = image.naturalHeight * PORTRAIT_CROP.y
      const sourceWidth = image.naturalWidth * PORTRAIT_CROP.width
      const sourceHeight = image.naturalHeight * PORTRAIT_CROP.height

      sampleContext.clearRect(0, 0, columns, rows)
      sampleContext.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        columns,
        rows,
      )
      PORTRAIT_MASKS.forEach((mask) => {
        sampleContext.clearRect(
          columns * mask.x,
          rows * mask.y,
          columns * mask.width,
          rows * mask.height,
        )
      })

      try {
        pixels = sampleContext.getImageData(0, 0, columns, rows).data
      } catch {
        pixels = null
      }
    }

    const preparePhoto = () => {
      if (!imageReady) {
        photoReady = false
        return
      }

      photoCanvas.width = canvas.width
      photoCanvas.height = canvas.height
      const sourceX = image.naturalWidth * PORTRAIT_CROP.x
      const sourceY = image.naturalHeight * PORTRAIT_CROP.y
      const sourceWidth = image.naturalWidth * PORTRAIT_CROP.width
      const sourceHeight = image.naturalHeight * PORTRAIT_CROP.height
      photoContext.clearRect(0, 0, photoCanvas.width, photoCanvas.height)
      photoContext.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        photoCanvas.width,
        photoCanvas.height,
      )
      PORTRAIT_MASKS.forEach((mask) => {
        photoContext.clearRect(
          photoCanvas.width * mask.x,
          photoCanvas.height * mask.y,
          photoCanvas.width * mask.width,
          photoCanvas.height * mask.height,
        )
      })

      try {
        const photo = photoContext.getImageData(0, 0, photoCanvas.width, photoCanvas.height)
        for (let offset = 0; offset < photo.data.length; offset += 4) {
          if (photo.data[offset + 3] === 0) continue

          const luminance = (
            photo.data[offset] * 0.2126 +
            photo.data[offset + 1] * 0.7152 +
            photo.data[offset + 2] * 0.0722
          ) / 255

          if (luminance < 0.09) photo.data[offset + 3] = 0
        }
        photoContext.putImageData(photo, 0, 0)
        photoReady = true
      } catch {
        photoReady = false
      }
    }

    const resize = () => {
      const bounds = host.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      columns = Math.max(1, Math.floor(width / 5.2))
      rows = Math.max(1, Math.floor(height / 7.5))
      samplePortrait()
      preparePhoto()
      draw(performance.now())
    }

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      if (!pixels) return

      const themeIsLight = document.documentElement.dataset.theme === 'light'
      const ink = themeIsLight ? '31, 29, 26' : '245, 241, 232'
      const orange = themeIsLight ? '229, 91, 17' : '255, 107, 22'
      const dustProgress = smoothStep((scrollProgress - 0.08) / 0.62)
      const conversion = smoothStep(scrollProgress / 0.32)
      const phase = reducedMotion ? 0 : time * 0.00022
      const cellWidth = width / columns
      const cellHeight = height / rows
      const fontSize = Math.max(3.5, cellHeight * 0.88 * (1 - dustProgress * 0.72))

      context.font = `${fontSize}px 'IBM Plex Mono', 'Courier New', monospace`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      if (!themeIsLight && photoReady) {
        context.save()
        context.globalAlpha = 0.88 * (1 - conversion) * (1 - dustProgress)
        context.drawImage(photoCanvas, 0, 0, width, height)
        context.restore()
      }

      for (let row = 0; row < rows; row += 1) {
        const ny = (row + 0.5) / rows

        for (let column = 0; column < columns; column += 1) {
          const offset = (row * columns + column) * 4
          const red = pixels[offset] / 255
          const green = pixels[offset + 1] / 255
          const blue = pixels[offset + 2] / 255
          const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722
          const isOrange = red > green * 1.22 && red > blue * 1.28 && red > 0.34
          const brightness = clampUnit((luminance - 0.045) / 0.32)
          const nx = (column + 0.5) / columns

          const isMasked = PORTRAIT_MASKS.some(
            (mask) =>
              nx >= mask.x &&
              nx <= mask.x + mask.width &&
              ny >= mask.y &&
              ny <= mask.y + mask.height,
          )
          if (isMasked || (brightness < 0.1 && !isOrange)) continue

          const glyphIndex = Math.min(
            GLYPHS.length - 1,
            Math.floor(brightness * (GLYPHS.length - 1)),
          )
          const glyph = GLYPHS[glyphIndex]
          if (glyph === ' ') continue

          const x = (column + 0.5) * cellWidth
          const y = (row + 0.5) * cellHeight
          const noise = Math.abs(Math.sin(column * 12.9898 + row * 78.233))
          const breeze = Math.sin(phase * 2 + ny * 12 + nx * 3)
          const driftX = dustProgress * (width * (0.035 + noise * 0.34) + breeze * 12)
          const driftY = dustProgress * (
            height * ((noise - 0.5) * 0.16 + (ny - 0.5) * 0.06) +
            Math.cos(phase * 1.7 + nx * 17 + ny * 4) * cellHeight * 2.4
          )
          const targetX = x + driftX
          const targetY = y + driftY
          const opacity = (0.32 + conversion * 0.68) * Math.max(0.2, brightness) * (1 - dustProgress)
          const color = isOrange ? orange : ink

          context.globalAlpha = opacity
          context.fillStyle = `rgba(${color}, 1)`
          context.fillText(glyph, targetX, targetY)

          const cellIndex = row * columns + column
          if (dustProgress > 0.02 && cellIndex % 3 === 0) {
            context.globalAlpha = 0.62 * dustProgress * (1 - dustProgress) * Math.max(0.25, brightness)
            context.fillRect(
              targetX + breeze * cellWidth * 1.2,
              targetY + Math.cos(phase * 2 + nx * 17) * cellHeight,
              Math.max(0.7, cellWidth * (0.12 + noise * 0.12)),
              Math.max(0.7, cellHeight * (0.1 + noise * 0.1)),
            )
          }
        }
      }

      context.globalAlpha = 1
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
      if (visible && !reducedMotion) frameId = window.requestAnimationFrame(animate)
    }

    const redrawAfterFontsLoad = () => {
      if (imageReady) draw(performance.now())
    }
    document.fonts.addEventListener('loadingdone', redrawAfterFontsLoad, { once: true })

    image.onload = () => {
      imageReady = true
      resize()
      startAnimation()
      triggerReveal()
    }
    image.onerror = () => {
      imageReady = false
      photoReady = false
      pixels = null
      draw(performance.now())
      triggerReveal()
    }
    image.src = PORTRAIT_SOURCE

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    window.addEventListener('resize', resize)
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

    const themeObserver = new MutationObserver(() => draw(performance.now()))
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const morphValue = { value: 0 }
    let morphTween: gsap.core.Tween | undefined

    if (!reducedMotion) {
      gsap.registerPlugin(ScrollTrigger)
      morphTween = gsap.to(morphValue, {
        value: 1,
        ease: 'none',
        onUpdate: () => {
          scrollProgress = morphValue.value
          draw(performance.now())
        },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom 35%',
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      })
    }

    return () => {
      if (revealTimer) clearTimeout(revealTimer)
      if (unmountTimer) clearTimeout(unmountTimer)
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      morphTween?.scrollTrigger?.kill()
      morphTween?.kill()
      document.fonts.removeEventListener('loadingdone', redrawAfterFontsLoad)
      image.onload = null
      image.onerror = null
      image.src = ''
    }
  }, [])

  return (
    <div ref={containerRef} className={`ascii-portrait-wrapper ${className}`}>
      <canvas
        ref={canvasRef}
        className={`ascii-portrait ${isReady ? 'is-ready' : 'is-loading'}`}
        aria-hidden="true"
      />
      {showSkeleton && (
        <div
          className={`ascii-portrait-skeleton ${isFading ? 'is-fading' : ''}`}
          aria-hidden="true"
        >
          <AsciiSkeleton
            variant="dither"
            rows={34}
            width="100%"
            height="100%"
            className="ascii-face-skeleton"
          />
        </div>
      )}
    </div>
  )
}
