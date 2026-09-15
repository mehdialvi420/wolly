import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const item = items[index]
  const hasPrev = index > 0
  const hasNext = index < items.length - 1
  const closeRef = useRef(null)
  const dialogRef = useRef(null)

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(index - 1)
  }, [hasPrev, index, onNavigate])

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(index + 1)
  }, [hasNext, index, onNavigate])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [onClose, goPrev, goNext])

  if (!item) return null

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/92 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt || 'Image lightbox'}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 p-2 text-background transition hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        aria-label="Close lightbox"
      >
        <X size={28} />
      </button>

      <button
        type="button"
        disabled={!hasPrev}
        onClick={(e) => {
          e.stopPropagation()
          goPrev()
        }}
        className="absolute left-2 z-10 p-2 text-background transition hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:opacity-30 md:left-6"
        aria-label="Previous image"
      >
        <ChevronLeft size={36} />
      </button>

      <button
        type="button"
        disabled={!hasNext}
        onClick={(e) => {
          e.stopPropagation()
          goNext()
        }}
        className="absolute right-2 z-10 p-2 text-background transition hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:opacity-30 md:right-6"
        aria-label="Next image"
      >
        <ChevronRight size={36} />
      </button>

      <figure
        className="relative max-h-[85vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt || 'Gallery photo'}
          className="max-h-[85vh] w-auto max-w-full object-contain"
        />
        {item.alt ? (
          <figcaption className="mt-3 text-center font-sans text-sm text-background/80">
            {item.alt}
          </figcaption>
        ) : null}
        <p className="mt-1 text-center font-sans text-xs text-background/50">
          {index + 1} / {items.length}
        </p>
      </figure>
    </div>,
    document.body,
  )
}
