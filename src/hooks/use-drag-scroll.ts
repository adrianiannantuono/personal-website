import { useCallback, useEffect, useRef, useState } from 'react'

/** How far (in px) a mouse drag has to travel before it counts as a drag rather than a click. */
const DRAG_THRESHOLD = 5

/** `scroll-padding-left` as a px number — 0 when unset, since the computed value is then the
 *  keyword `auto` and `parseFloat` on that is `NaN`, not 0. */
function getScrollPaddingLeft(el: HTMLElement): number {
  return parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
}

/** Drag-to-scroll + edge detection + "scroll by one child" for a horizontal, snap-scrolling
 *  row. Powers both the project card carousel and the project detail gallery (see `Carousel`). */
export function useDragScroll() {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0, moved: false })
  // The last target we told the scroller to smooth-scroll to via the arrow buttons. scrollLeft
  // itself lags behind during the animation, so a rapid second click that reads scrollLeft would
  // see a barely-moved value and recompute the *same* next card — i.e. the click would be absorbed
  // into the current animation instead of advancing one more card. Tracking the intended target
  // separately lets each rapid click queue up the next card regardless of animation progress.
  const targetScrollLeftRef = useRef<number | null>(null)

  const updateEdges = () => {
    const el = scrollerRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  // A plain `useRef` passed as `ref={scrollerRef}` is attached to the DOM node during React's
  // commit phase, but for content a parent conditionally mounts (e.g. a dialog that only
  // renders once open), that commit can land *after* this hook's caller has already run its
  // own "measure on open" effect — so that effect would read a still-null `scrollerRef.current`.
  // A callback ref fires synchronously the instant the node attaches (or detaches), so bumping
  // this tick from it lets the effect below re-measure right when there's actually something to
  // measure, regardless of when the surrounding content mounts.
  const [mountTick, setMountTick] = useState(0)
  const attachRef = useCallback((node: HTMLDivElement | null) => {
    scrollerRef.current = node
    setMountTick((t) => t + 1)
  }, [])

  // Re-measure whenever the node attaches, and keep re-measuring as its content resizes — a
  // gallery's images can change the scroller's scrollWidth after mount (e.g. the dialog opening
  // after this fires), which a one-shot measurement on mount would miss entirely.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateEdges()
    const observer = new ResizeObserver(updateEdges)
    observer.observe(el)
    return () => observer.disconnect()
  }, [mountTick])

  // Jump back to the start and re-measure — call whenever the scroller's content changes size.
  const reset = () => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollLeft = 0
    targetScrollLeftRef.current = null
    setAtStart(true)
    setAtEnd(el.scrollWidth <= el.clientWidth + 4)
  }

  const scroll = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const scrollPaddingLeft = getScrollPaddingLeft(el)
    const current = (targetScrollLeftRef.current ?? el.scrollLeft) + scrollPaddingLeft
    const next =
      direction === 1
        ? cards.find((card) => card.offsetLeft > current + 4)
        : [...cards].reverse().find((card) => card.offsetLeft < current - 4)
    const left = next ? Math.max(0, next.offsetLeft - scrollPaddingLeft) : direction === 1 ? el.scrollWidth : 0
    targetScrollLeftRef.current = left
    el.scrollTo({ left, behavior: 'smooth' })
  }

  // Plain window listeners (not setPointerCapture on pointerdown) — capturing the pointer
  // immediately can silently suppress the native click on whatever's underneath, which broke
  // opening the card's dialog on a plain click. Capture is only engaged once the drag
  // threshold is crossed (see onMove) so a plain click never triggers it, but a real drag
  // keeps receiving pointermove/pointerup even if the cursor leaves the browser window
  // (e.g. dragged off-screen left/right) — without it, those events stop firing entirely
  // and the drag gets stuck.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el) return
    // Any manual touch/mouse interaction with the scroller invalidates a pending arrow-button
    // target — the next arrow click should recompute from where the user actually left it.
    targetScrollLeftRef.current = null
    if (e.pointerType !== 'mouse') return
    // A portaled dialog (e.g. the detail modal, or the lightbox above the gallery) is a React
    // descendant of the scroller but not an actual DOM descendant, so without this check
    // dragging inside it would still scroll the carousel behind it.
    if (!el.contains(e.target as Node)) return
    // Without this, the browser starts its own native text-selection drag on mousedown.
    // That selection then fights our manual scrollLeft updates and triggers the browser's
    // own edge auto-scrolling once the cursor nears/leaves the viewport edge — which is
    // exactly the "dragging off-screen messes it up" symptom.
    e.preventDefault()
    // A previous drag's settle (below) may still be smooth-scrolling when a new drag starts;
    // left unchecked, that animation keeps fighting our scrollLeft assignments in onMove every
    // frame. Assigning scrollLeft directly performs an instant scroll, canceling it.
    el.scrollLeft = el.scrollLeft
    const startX = e.clientX
    const startScrollLeft = el.scrollLeft
    const pointerId = e.pointerId
    dragStateRef.current = { startX, startScrollLeft, moved: false }

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX
      if (Math.abs(dx) > DRAG_THRESHOLD) {
        if (!dragStateRef.current.moved) {
          try {
            el.setPointerCapture(pointerId)
          } catch {
            // Ignore — pointer may already be gone (e.g. captured elsewhere or released).
          }
        }
        dragStateRef.current.moved = true
        setDragging(true)
      }
      el.scrollLeft = startScrollLeft - dx
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      if (el.hasPointerCapture(pointerId)) el.releasePointerCapture(pointerId)
      setDragging(false)

      // Scroll snap is disabled while dragging (see the style prop below), so the drag can
      // leave the container between cards. Re-enabling it abruptly snaps on its own and
      // reads as a jump, so settle to the nearest card ourselves first.
      if (dragStateRef.current.moved) {
        const cards = Array.from(el.children) as HTMLElement[]
        const nearest = cards.reduce((closest, card) =>
          Math.abs(card.offsetLeft - el.scrollLeft) < Math.abs(closest.offsetLeft - el.scrollLeft)
            ? card
            : closest,
        )
        // Match the scroll-padding the browser's own snapping respects, so a card settled
        // here (mouse drag) lands with the same edge gap as one snapped via touch/wheel.
        const target = Math.max(0, nearest.offsetLeft - getScrollPaddingLeft(el))
        el.scrollTo({ left: target, behavior: 'smooth' })
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStateRef.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      dragStateRef.current.moved = false
    }
  }

  return {
    scrollerRef: attachRef,
    atStart,
    atEnd,
    dragging,
    updateEdges,
    reset,
    scroll,
    handlePointerDown,
    handleClickCapture,
  }
}
