import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { isPdf, pdfFileName } from '@/components/projects/media'
import { cn } from '@/lib/utils'

/** Full-screen viewer for a gallery image/PDF, with prev/next (click or arrow keys). */
export function ProjectLightbox({
  images,
  projectName,
  index,
  onIndexChange,
}: {
  images: string[]
  projectName: string
  index: number | null
  onIndexChange: (index: number | null) => void
}) {
  const lightbox = index !== null ? images[index] : null
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || index === null) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    touchStart.current = null

    const SWIPE_THRESHOLD = 50
    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return

    if (deltaX > 0 && index > 0) onIndexChange(index - 1)
    if (deltaX < 0 && index < images.length - 1) onIndexChange(index + 1)
  }

  useEffect(() => {
    if (index === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onIndexChange(index === 0 ? index : index - 1)
      if (e.key === 'ArrowRight') onIndexChange(index === images.length - 1 ? index : index + 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, images.length, onIndexChange])

  return (
    <Dialog open={!!lightbox} onOpenChange={(isOpen) => !isOpen && onIndexChange(null)}>
      <DialogContent
        showCloseButton={false}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className={cn(
          'flex items-center justify-center border-0 bg-transparent p-0 ring-0',
          lightbox && isPdf(lightbox)
            ? 'h-auto w-auto max-w-[95vw] sm:h-[90vh] sm:w-[95vw] sm:max-w-5xl'
            : 'h-auto w-auto max-w-[95vw] sm:max-w-[95vw]',
        )}
      >
        <DialogTitle className="sr-only">
          {projectName} {lightbox && isPdf(lightbox) ? 'document' : 'screenshot'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {images.length > 1 ? 'Use the arrow keys to browse, press Escape to close' : 'Press Escape to close'}
        </DialogDescription>
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close"
            className="absolute -top-3 -right-3 z-10 flex size-8 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-colors hover:bg-foreground/90"
          >
            <X className="size-4" />
          </button>
        </DialogClose>
        {index !== null && index > 0 && (
          <button
            type="button"
            aria-label="Previous"
            onClick={() => onIndexChange(index - 1)}
            className="absolute top-1/2 -left-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-colors hover:bg-foreground/90 sm:-left-12"
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
        {index !== null && index < images.length - 1 && (
          <button
            type="button"
            aria-label="Next"
            onClick={() => onIndexChange(index + 1)}
            className="absolute top-1/2 -right-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-colors hover:bg-foreground/90 sm:-right-12"
          >
            <ChevronRight className="size-4" />
          </button>
        )}
        {lightbox &&
          (isPdf(lightbox) ? (
            <>
              {/* Mobile browsers render embedded PDFs at native size, ignoring the iframe's
               *  box, which pushes the page off screen and breaks scrolling. Hand off to the
               *  OS's own PDF viewer there instead and keep the inline iframe for larger screens. */}
              <iframe
                src={lightbox}
                title={`${projectName} document`}
                className="hidden size-full rounded-lg bg-white sm:block"
              />
              <a
                href={lightbox}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-72 flex-col items-center justify-center gap-3 rounded-lg bg-white p-10 text-foreground sm:hidden"
              >
                <ExternalLink className="size-8 text-muted-foreground" />
                <span className="text-center text-sm font-medium">{pdfFileName(lightbox)}</span>
                <span className="text-sm font-medium text-primary">Open PDF</span>
                <span className="text-center text-xs text-muted-foreground">Opens in your device's PDF viewer</span>
              </a>
            </>
          ) : (
            <img src={lightbox} alt="" className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain" />
          ))}
      </DialogContent>
    </Dialog>
  )
}
