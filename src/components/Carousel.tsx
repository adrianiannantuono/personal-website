import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { useDragScroll } from '@/hooks/use-drag-scroll'
import { cn } from '@/lib/utils'

type CarouselSize = 'default' | 'compact'

/** `default` is a page-level carousel (project cards): wide arrows, a soft fade into the page
 *  background, and scroll-padding so a snapped card clears the arrow buttons. `compact` is a
 *  carousel nested inside other content (e.g. a dialog's image gallery): smaller everything, and
 *  no scroll-padding since there's no fixed arrow gutter to clear. */
const VARIANTS: Record<
  CarouselSize,
  { scrollerClassName: string; arrowClassName: string; fadeWidthClassName: string; fadeFromClassName: string }
> = {
  default: {
    scrollerClassName: 'gap-4 overflow-y-hidden scroll-pl-10 scroll-pr-10 pb-2 sm:scroll-pl-16 sm:scroll-pr-16',
    arrowClassName: 'size-11',
    fadeWidthClassName: 'w-10 sm:w-16',
    fadeFromClassName: 'from-background',
  },
  compact: {
    scrollerClassName: 'gap-2 pb-1',
    arrowClassName: 'size-8',
    fadeWidthClassName: 'w-6',
    fadeFromClassName: 'from-popover',
  },
}

export function Carousel({
  children,
  size = 'default',
  resetKey,
  hideArrowsAtEdge = false,
}: {
  children: ReactNode
  size?: CarouselSize
  /** Anything that identifies "this set of items" — jumps the scroller back to the start and
   *  re-measures whenever it changes (e.g. the active filter, or a dialog's open state). */
  resetKey: unknown
  /** Hide each arrow entirely once there's nothing further in that direction, instead of
   *  rendering it disabled. Use for a secondary/inline carousel; the page-level one keeps a
   *  stable disabled button so its layout doesn't shift. */
  hideArrowsAtEdge?: boolean
}) {
  const { scrollerRef, atStart, atEnd, dragging, updateEdges, reset, scroll, handlePointerDown, handleClickCapture } =
    useDragScroll()
  const variant = VARIANTS[size]

  useEffect(reset, [resetKey])

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={updateEdges}
        onPointerDown={handlePointerDown}
        onClickCapture={handleClickCapture}
        onDragStart={(e) => e.preventDefault()}
        style={{ scrollSnapType: dragging ? 'none' : undefined }}
        className={cn(
          'flex snap-x snap-mandatory overflow-x-auto [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent',
          variant.scrollerClassName,
          dragging ? 'cursor-grabbing select-none' : 'cursor-grab',
        )}
      >
        {children}
      </div>
      {!atStart && (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r to-transparent',
            variant.fadeWidthClassName,
            variant.fadeFromClassName,
          )}
        />
      )}
      {(!hideArrowsAtEdge || !atStart) && (
        <Button
          variant="outline"
          size="icon-sm"
          className={cn(
            'absolute inset-y-0 left-1 z-10 my-auto hidden rounded-full border-border/60 bg-background/90 shadow-md backdrop-blur-sm sm:flex disabled:pointer-events-auto',
            variant.arrowClassName,
          )}
          onClick={() => scroll(-1)}
          disabled={atStart}
          aria-label="Scroll left"
        >
          <ChevronLeft className="size-4" />
        </Button>
      )}
      {!atEnd && (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l to-transparent',
            variant.fadeWidthClassName,
            variant.fadeFromClassName,
          )}
        />
      )}
      {(!hideArrowsAtEdge || !atEnd) && (
        <Button
          variant="outline"
          size="icon-sm"
          className={cn(
            'absolute inset-y-0 right-1 z-10 my-auto hidden rounded-full border-border/60 bg-background/90 shadow-md backdrop-blur-sm sm:flex disabled:pointer-events-auto',
            variant.arrowClassName,
          )}
          onClick={() => scroll(1)}
          disabled={atEnd}
          aria-label="Scroll right"
        >
          <ChevronRight className="size-4" />
        </Button>
      )}
    </div>
  )
}
