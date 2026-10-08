type TickFn = (dt: number) => void

const subscribers = new Set<TickFn>()
let rafId: number | null = null
let last: number | null = null

function loop(now: number) {
  const dt = last === null ? 0 : (now - last) / 1000
  last = now
  for (const fn of subscribers) fn(dt)
  rafId = requestAnimationFrame(loop)
}

/** One requestAnimationFrame loop shared by every subscriber, so N looping animations (e.g. one
 *  per marquee row) cost a single scheduled callback instead of N fighting for the same frame. */
export function subscribeTick(fn: TickFn): () => void {
  subscribers.add(fn)
  if (rafId === null) {
    last = null
    rafId = requestAnimationFrame(loop)
  }
  return () => {
    subscribers.delete(fn)
    if (subscribers.size === 0 && rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }
}
