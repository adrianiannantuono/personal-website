import { memo, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** The filter dropdown's per-category subcategory list — mounted only while open or while
 *  animating shut, so collapsed-and-settled items aren't reachable by arrow-key navigation inside
 *  the (Radix) listbox, but freshly opened ones still get a frame in the closed state to animate
 *  *from*. Without that one-frame gap, a wrapper that's created and given its open class in the
 *  same commit has nothing to transition from and just pops open instantly. */
export const FilterCategoryDisclosure = memo(function FilterCategoryDisclosure({
  open,
  children,
}: {
  open: boolean
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(open)
  const [animateOpen, setAnimateOpen] = useState(open)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const raf = requestAnimationFrame(() => setAnimateOpen(true))
      return () => cancelAnimationFrame(raf)
    }
    setAnimateOpen(false)
    const timer = setTimeout(() => setMounted(false), 300)
    return () => clearTimeout(timer)
  }, [open])

  if (!mounted) return null
  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows] duration-300 ease-in-out',
        animateOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
})
