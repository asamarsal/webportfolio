'use client'

import { useEffect, useRef } from 'react'
import type { AnimationItem } from 'lottie-web'
import rawAnimationData from '@/public/asa-smile.json'

type AsaSmileLogoProps = {
  theme?: 'dark' | 'light'
  className?: string
  size?: number | string
}

function getThemedAnimationData(isDark: boolean) {
  const data = JSON.parse(JSON.stringify(rawAnimationData))
  const eyeNoseColor = isDark
    ? [0.9765, 0.9412, 0.8941, 1]
    : [0.09, 0.086, 0.078, 1]
  const smileColor = [1, 0.42, 0.09, 1] // #ff6b16

  for (const layer of data.layers || []) {
    if (layer.nm === 'Eyes (A + A)' || layer.nm === 'Nose (S)') {
      for (const shape of layer.shapes || []) {
        for (const item of shape.it || []) {
          if (item.ty === 'fl' && item.c) {
            item.c.k = eyeNoseColor
          }
        }
      }
    } else if (layer.nm === 'Mouth (smile)') {
      for (const shape of layer.shapes || []) {
        for (const item of shape.it || []) {
          if (item.ty === 'st' && item.c) {
            item.c.k = smileColor
          }
        }
      }
    }
  }

  return data
}

export function AsaSmileLogo({ theme = 'dark', className = '', size }: AsaSmileLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    let isMounted = true
    const isDark = theme !== 'light'

    import('lottie-web').then((lottieModule) => {
      if (!isMounted || !containerRef.current) return

      if (animRef.current) {
        animRef.current.destroy()
        animRef.current = null
      }

      const lottie = lottieModule.default || lottieModule
      const themedData = getThemedAnimationData(isDark)

      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: themedData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
          progressiveLoad: true,
        },
      })

      animRef.current = anim

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        anim.goToAndStop(100, true)
      }
    })

    return () => {
      isMounted = false
      if (animRef.current) {
        animRef.current.destroy()
        animRef.current = null
      }
    }
  }, [theme])

  useEffect(() => {
    const handleMouseEnter = () => {
      if (animRef.current) {
        animRef.current.goToAndPlay(0, true)
      }
    }

    const container = containerRef.current
    const parentLockup = container?.closest('.brand-lockup') || container
    parentLockup?.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      parentLockup?.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  const sizeStyle = size
    ? {
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }
    : {
        width: '100%',
        height: '100%',
      }

  return (
    <span
      className={`asa-smile-logo ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sizeStyle,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </span>
  )
}
