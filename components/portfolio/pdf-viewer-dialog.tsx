'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Loader2,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'

interface PdfViewerDialogProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl?: string
  fileName?: string
}

declare global {
  interface Window {
    pdfjsLib?: any
  }
}

export function PdfViewerDialog({
  isOpen,
  onClose,
  pdfUrl = '/portfolio/creativeportfolio-asamarsal.pdf',
  fileName = 'creativeportfolio-asamarsal.pdf',
}: PdfViewerDialogProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [zoomScale, setZoomScale] = useState<number>(1.0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRendering, setIsRendering] = useState<boolean>(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [useFallback, setUseFallback] = useState<boolean>(false)

  const pdfDocRef = useRef<any>(null)
  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const mainContainerRef = useRef<HTMLDivElement | null>(null)
  const currentRenderTaskRef = useRef<any>(null)
  const thumbRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({})
  const lastWheelTimeRef = useRef<number>(0)

  // Handle ESC key, lock background scrolling & stop Lenis
  useEffect(() => {
    if (!isOpen) return
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    // Stop Lenis smooth scroll while dialog is open so website in background never scrolls
    const lenis = typeof window !== 'undefined' ? (window as any).__lenis : null
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((prev) => Math.max(1, prev - 1))
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage((prev) => Math.min(numPages || prev, prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      const currentLenis = typeof window !== 'undefined' ? (window as any).__lenis : null
      if (currentLenis && typeof currentLenis.start === 'function') {
        currentLenis.start()
      }
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, numPages])

  // Reset scroll to top on page change
  useEffect(() => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTop = 0
    }
  }, [currentPage])

  // Handle wheel on main canvas viewport: scroll within page, or advance page when reaching edge
  const handleMainWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation()

    const container = mainContainerRef.current
    if (!container) return

    const now = Date.now()
    const isAtBottom =
      container.scrollTop + container.clientHeight >= container.scrollHeight - 8
    const isAtTop = container.scrollTop <= 8

    // If reached the bottom and scrolling down, go to next page
    if (e.deltaY > 25 && isAtBottom && currentPage < numPages) {
      if (now - lastWheelTimeRef.current > 380) {
        lastWheelTimeRef.current = now
        setCurrentPage((p) => Math.min(numPages, p + 1))
      }
    }
    // If reached the top and scrolling up, go to prev page
    else if (e.deltaY < -25 && isAtTop && currentPage > 1) {
      if (now - lastWheelTimeRef.current > 380) {
        lastWheelTimeRef.current = now
        setCurrentPage((p) => Math.max(1, p - 1))
      }
    }
  }

  // Load PDF.js library & Document
  useEffect(() => {
    if (!isOpen) return

    let isMounted = true
    setIsLoading(true)
    setUseFallback(false)
    setCurrentPage(1)
    setZoomScale(1.0)

    const initPdf = async (lib: any) => {
      try {
        lib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
        const loadingTask = lib.getDocument(pdfUrl)
        const doc = await loadingTask.promise
        if (!isMounted) return
        pdfDocRef.current = doc
        setNumPages(doc.numPages)
        setIsLoading(false)
      } catch (err) {
        console.warn('PDF.js failed to load doc, using fallback:', err)
        if (isMounted) {
          setUseFallback(true)
          setIsLoading(false)
        }
      }
    }

    if (window.pdfjsLib) {
      initPdf(window.pdfjsLib)
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
      script.async = true
      script.onload = () => {
        if (!isMounted) return
        if (window.pdfjsLib) {
          initPdf(window.pdfjsLib)
        } else {
          setUseFallback(true)
          setIsLoading(false)
        }
      }
      script.onerror = () => {
        if (!isMounted) return
        setUseFallback(true)
        setIsLoading(false)
      }
      document.head.appendChild(script)
    }

    return () => {
      isMounted = false
      if (currentRenderTaskRef.current) {
        try {
          currentRenderTaskRef.current.cancel()
        } catch { }
      }
      pdfDocRef.current = null
    }
  }, [isOpen, pdfUrl])

  // Render main page
  const renderMainPage = useCallback(async () => {
    if (!pdfDocRef.current || !mainCanvasRef.current) return
    try {
      setIsRendering(true)
      if (currentRenderTaskRef.current) {
        try {
          currentRenderTaskRef.current.cancel()
        } catch { }
      }

      const page = await pdfDocRef.current.getPage(currentPage)
      const canvas = mainCanvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const containerWidth = mainContainerRef.current?.clientWidth || 800
      const unscaledViewport = page.getViewport({ scale: 1.0 })
      // Responsive base scale so page fits width with comfort margin
      const padding = window.innerWidth <= 768 ? 20 : 64
      const baseScale = Math.min((containerWidth - padding) / unscaledViewport.width, 1.35)
      const scale = Math.max(0.45, baseScale * zoomScale)
      const viewport = page.getViewport({ scale })

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(viewport.width * dpr)
      canvas.height = Math.floor(viewport.height * dpr)
      canvas.style.width = `${Math.floor(viewport.width)}px`
      canvas.style.height = `${Math.floor(viewport.height)}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const renderTask = page.render({
        canvasContext: ctx,
        viewport,
      })
      currentRenderTaskRef.current = renderTask
      await renderTask.promise
      setIsRendering(false)
    } catch (err: any) {
      if (err?.name !== 'RenderingCancelledException') {
        console.error('Error rendering PDF page:', err)
      }
    }
  }, [currentPage, zoomScale])

  useEffect(() => {
    if (!isLoading && !useFallback && pdfDocRef.current) {
      renderMainPage()
    }
  }, [isLoading, useFallback, renderMainPage])

  // Render thumbnails
  useEffect(() => {
    if (isLoading || useFallback || !pdfDocRef.current || numPages === 0) return

    let isMounted = true

    const renderAllThumbs = async () => {
      for (let p = 1; p <= numPages; p++) {
        if (!isMounted) break
        const canvas = thumbRefs.current[p]
        if (!canvas) continue

        try {
          const page = await pdfDocRef.current.getPage(p)
          if (!isMounted) break
          const unscaledViewport = page.getViewport({ scale: 1.0 })
          const targetWidth = window.innerWidth <= 768 ? 72 : 110
          const scale = targetWidth / unscaledViewport.width
          const viewport = page.getViewport({ scale })

          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          canvas.width = Math.floor(viewport.width * dpr)
          canvas.height = Math.floor(viewport.height * dpr)
          canvas.style.width = `${Math.floor(viewport.width)}px`
          canvas.style.height = `${Math.floor(viewport.height)}px`

          const ctx = canvas.getContext('2d')
          if (!ctx) continue
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          await page.render({ canvasContext: ctx, viewport }).promise
        } catch (e) {
          // ignore thumb render cancel
        }
      }
    }

    renderAllThumbs()

    return () => {
      isMounted = false
    }
  }, [isLoading, useFallback, numPages])

  if (!isOpen) return null

  return (
    <div
      className="pdf-dialog-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="PDF Viewer Dialog"
      onClick={onClose}
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className="pdf-dialog-window"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* ================= HEADER BAR ================= */}
        <header className="pdf-dialog-header">
          {/* Left: Document details & sidebar toggle */}
          <div className="pdf-dialog-header-left">
            <button
              type="button"
              className="pdf-dialog-icon-btn pdf-sidebar-toggle-btn"
              onClick={() => setSidebarOpen((prev) => !prev)}
              title={sidebarOpen ? 'Hide page thumbnails' : 'Show page thumbnails'}
              aria-label={sidebarOpen ? 'Hide page thumbnails' : 'Show page thumbnails'}
            >
              {sidebarOpen ? <PanelLeftClose size={17} /> : <PanelLeftOpen size={17} />}
            </button>
            <div className="pdf-dialog-file-info">
              <FileText size={16} className="pdf-file-icon" aria-hidden="true" />
              <span className="pdf-dialog-filename mono">{fileName}</span>
              {numPages > 0 && (
                <span className="pdf-dialog-badge mono">{numPages} Pages</span>
              )}
            </div>
          </div>

          {/* Center: Page Navigation & Zoom Controls */}
          {!useFallback && (
            <div className="pdf-dialog-header-center">
              <div className="pdf-page-controls mono">
                <button
                  type="button"
                  className="pdf-dialog-icon-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  title="Previous page (Left arrow)"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="pdf-page-indicator">
                  <strong>{currentPage}</strong> / {numPages || '...'}
                </span>
                <button
                  type="button"
                  className="pdf-dialog-icon-btn"
                  onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
                  disabled={currentPage >= numPages}
                  title="Next page (Right arrow)"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="pdf-toolbar-separator" aria-hidden="true" />

              <div className="pdf-zoom-controls">
                <button
                  type="button"
                  className="pdf-dialog-icon-btn"
                  onClick={() => setZoomScale((z) => Math.max(0.6, z - 0.15))}
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={15} />
                </button>
                <button
                  type="button"
                  className="pdf-dialog-icon-btn pdf-zoom-reset-btn mono"
                  onClick={() => setZoomScale(1.0)}
                  title="Reset Zoom"
                  aria-label="Reset Zoom"
                >
                  <Maximize2 size={13} />
                  <span>{Math.round(zoomScale * 100)}%</span>
                </button>
                <button
                  type="button"
                  className="pdf-dialog-icon-btn"
                  onClick={() => setZoomScale((z) => Math.min(2.5, z + 0.15))}
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={15} />
                </button>
              </div>
            </div>
          )}

          {/* Right: Download PDF & Close Buttons */}
          <div className="pdf-dialog-header-right">
            <a
              href={pdfUrl}
              download={fileName}
              className="pdf-dialog-download-btn"
              title="Download PDF"
              aria-label="Download PDF"
            >
              <Download size={15} aria-hidden="true" />
              <span className="pdf-download-text">Download PDF</span>
            </a>

            <button
              type="button"
              className="pdf-dialog-close-btn"
              onClick={onClose}
              title="Close viewer (Esc)"
              aria-label="Close PDF Viewer"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* ================= BODY: SIDEBAR + MAIN VIEW ================= */}
        <div
          className="pdf-dialog-body"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Left Sidebar: Thumbnails */}
          {sidebarOpen && !useFallback && (
            <aside
              className="pdf-dialog-sidebar"
              aria-label="Page thumbnails"
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="pdf-sidebar-title mono">
                <span>Thumbnails</span>
                <span className="pdf-sidebar-count">({numPages})</span>
              </div>
              <div
                className="pdf-thumbs-scroll"
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                data-lenis-prevent-touch="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    type="button"
                    key={`thumb-${pageNum}`}
                    className={`pdf-thumb-card ${currentPage === pageNum ? 'is-active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                    title={`Jump to Page ${pageNum}`}
                  >
                    <div className="pdf-thumb-preview">
                      <canvas
                        ref={(el) => {
                          thumbRefs.current[pageNum] = el
                        }}
                      />
                    </div>
                    <span className="pdf-thumb-label mono">Page {pageNum}</span>
                  </button>
                ))}
              </div>
            </aside>
          )}

          {/* Center: Main Viewport */}
          <main
            className="pdf-dialog-main"
            ref={mainContainerRef}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={handleMainWheel}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {isLoading && (
              <div className="pdf-loading-state">
                <Loader2 size={32} className="pdf-spinner" aria-hidden="true" />
                <p className="mono">Loading Creative Portfolio...</p>
              </div>
            )}

            {!isLoading && useFallback && (
              <div className="pdf-fallback-container">
                <iframe
                  src={`${pdfUrl}#page=${currentPage}`}
                  className="pdf-fallback-iframe"
                  title="PDF Document"
                />
              </div>
            )}

            {!isLoading && !useFallback && (
              <div className="pdf-canvas-stage">
                <div className="pdf-canvas-paper">
                  {isRendering && (
                    <div className="pdf-rendering-overlay">
                      <Loader2 size={24} className="pdf-spinner" aria-hidden="true" />
                    </div>
                  )}
                  <canvas ref={mainCanvasRef} className="pdf-main-canvas" />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

