import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SkillChip } from '@/components/SkillChip'
import type { Skill } from '@/data/resume'
import { subscribeTick } from '@/lib/sharedTicker'
import { cn } from '@/lib/utils'

/** px/sec — constant across rows so a short row and a long row feel equally fast. */
const AUTO_SCROLL_SPEED = 26
/** A mouse drag past this many px counts as a drag rather than a click (matches Projects' carousel). */
const DRAG_THRESHOLD = 5

// Memoized so an unrelated re-render of a sibling category (or the parent Skills component)
// doesn't force every row to re-run its drag/scroll setup and rebuild its (duplicated) chip tree.
export const MarqueeRow = memo(function MarqueeRow({ items }: { items: Skill[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const hoveredRef = useRef(false)
  // How many of this row's chip popovers are currently open — ref, not state, since it's only
  // ever read from the tick loop below and shouldn't trigger a re-render on every popover toggle.
  const openPopoverCountRef = useRef(0)
  // Stable identity (not a fresh closure per chip per render) so SkillChip's memoization actually holds.
  const handleChipOpenChange = useCallback((isOpen: boolean) => {
    openPopoverCountRef.current += isOpen ? 1 : -1
  }, [])
  // Whether the row is anywhere near the viewport — skips the tick loop's work entirely for rows
  // scrolled off-screen, so a long Skills list doesn't pay for categories the user isn't looking at.
  const isVisibleRef = useRef(true)
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0, moved: false })
  // Whether a single copy of the chips already overflows the row — only then is there anything
  // to loop, so a short row (e.g. a filtered-down category) skips the duplicate copy entirely.
  const [needsLoop, setNeedsLoop] = useState(false)
  const needsLoopRef = useRef(needsLoop)
  useEffect(() => {
    needsLoopRef.current = needsLoop
  }, [needsLoop])
  // One copy's width — i.e. exactly the scroll distance of a full loop — cached from the
  // ResizeObserver below so the tick loop never has to read it back from the layout-dependent
  // `el.scrollWidth` itself. Reading a layout property inside a loop that's also writing
  // `scrollLeft` every frame is the classic forced-synchronous-layout trap, and it gets much worse
  // whenever something else on the page (e.g. an accordion's height transition) is mid-reflow at
  // the same time — exactly when this stutter was reported.
  const halfWidthRef = useRef(0)

  // Runs before paint so the row never flashes between a duplicated and single-copy layout on mount.
  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    const content = contentRef.current
    if (!scroller || !content) return
    const measure = () => {
      halfWidthRef.current = content.scrollWidth
      setNeedsLoop(content.scrollWidth > scroller.clientWidth + 1)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(scroller)
    return () => observer.disconnect()
  }, [items])

  // Skips the tick loop's work for rows nowhere near the viewport.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Drives scrollLeft directly (rather than a CSS transform) so native drag/scroll and the
  // auto-advance share the same source of truth instead of fighting each other. Rides the shared
  // ticker rather than its own rAF loop so N animating rows cost one scheduled callback, not N —
  // otherwise every row's own loop (plus the old per-frame popover DOM query) competes for the
  // same frame budget as everything else on the page and shows up as jank elsewhere.
  useEffect(() => {
    // Tracked separately from el.scrollLeft, which browsers round to an integer pixel — reading
    // it back each frame would throw away the sub-pixel delta before it could ever accumulate.
    let position = scrollerRef.current?.scrollLeft ?? 0
    // Only true right as a pause ends — lets the loop resync `position` from the DOM exactly
    // once per pause (in case something else, e.g. a native drag, moved it) instead of reading
    // `el.scrollLeft` back every single paused frame for no reason.
    let wasPaused = true
    return subscribeTick((dt) => {
      const el = scrollerRef.current
      if (!el) return

      const shouldPause =
        !needsLoopRef.current ||
        draggingRef.current ||
        hoveredRef.current ||
        !isVisibleRef.current ||
        openPopoverCountRef.current > 0
      if (shouldPause) {
        wasPaused = true
        return
      }
      if (wasPaused) {
        position = el.scrollLeft
        wasPaused = false
      }
      const half = halfWidthRef.current
      position += AUTO_SCROLL_SPEED * dt
      if (position >= half) position -= half
      el.scrollLeft = position
    })
  }, [])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!needsLoop) return
    const el = scrollerRef.current
    if (!el) return

    // Touch gets native scrolling (momentum, etc.) — we just pause the auto-scroll rAF loop
    // while it's happening, otherwise it fights the finger. Momentum keeps scrolling the
    // element well after `pointerup`, so rather than un-pausing right away, wait for native
    // `scroll` events to actually stop firing before handing control back to the rAF loop.
    if (e.pointerType !== 'mouse') {
      draggingRef.current = true
      let settleTimer: ReturnType<typeof window.setTimeout>
      const onScroll = () => {
        window.clearTimeout(settleTimer)
        settleTimer = window.setTimeout(() => {
          draggingRef.current = false
          el.removeEventListener('scroll', onScroll)
        }, 150)
      }
      el.addEventListener('scroll', onScroll)
      onScroll()
      const onUp = () => {
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
      }
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
      return
    }

    dragStateRef.current = { startX: e.clientX, startScrollLeft: el.scrollLeft, moved: false }
    draggingRef.current = true

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - dragStateRef.current.startX
      if (Math.abs(dx) > DRAG_THRESHOLD) dragStateRef.current.moved = true
      el.scrollLeft = dragStateRef.current.startScrollLeft - dx
    }
    const onUp = () => {
      draggingRef.current = false
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  // A drag that actually moved shouldn't also fire the chip's click/popover underneath it.
  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStateRef.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      dragStateRef.current.moved = false
    }
  }

  return (
    <div
      ref={scrollerRef}
      onPointerDown={handlePointerDown}
      onClickCapture={handleClickCapture}
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
      onDragStart={(e) => e.preventDefault()}
      className={cn(
        'min-w-0 flex-1 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        needsLoop
          ? 'cursor-grab overflow-x-auto active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]'
          : 'overflow-hidden',
      )}
    >
      <div className="flex w-max">
        {/* A second copy (each followed by a divider) only renders once the first overflows,
            so the loop wraps seamlessly at exactly the halfway scroll point. */}
        {(needsLoop ? [0, 1] : [0]).map((copy) => (
          <div key={copy} ref={copy === 0 ? contentRef : undefined} className="flex shrink-0 items-center gap-1.5">
            {items.map((item, j) => (
              <SkillChip
                key={`${copy}-${item.name}-${j}`}
                skill={item}
                className="shrink-0"
                onOpenChange={handleChipOpenChange}
              />
            ))}
            {needsLoop && (
              <span className="flex h-6 w-10 shrink-0 items-center justify-center" aria-hidden>
                <span className="h-4 w-px bg-border" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
})
