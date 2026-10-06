import { Cloud, Code, Database, Factory, Filter, SearchX, Server, User, type LucideIcon } from 'lucide-react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ExpandableSearch } from '@/components/ExpandableSearch'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { SkillChip } from '@/components/SkillChip'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { experience, type Skill, type SkillGroup, skills } from '@/data/resume'
import { cn } from '@/lib/utils'

const categoryIcons: Record<string, LucideIcon> = {
  Backend: Server,
  Frontend: Code,
  Databases: Database,
  'Cloud & DevOps': Cloud,
  'Industrial Systems': Factory,
  Professional: User,
}

const CATEGORIES = skills.map((group) => group.category)
// Companies/roles, not the looser project-tag strings also found in `usedIn` — mirrors Projects' own Category/Experience split.
const EXPERIENCES = Array.from(new Set(experience.map((entry) => entry.company)))
const EXPERIENCE_LOGOS: Record<string, string> = {}
for (const entry of experience) {
  if (entry.logo) EXPERIENCE_LOGOS[entry.company] = entry.logo
}

/** px/sec — constant across rows so a short row and a long row feel equally fast. */
const AUTO_SCROLL_SPEED = 26
/** A mouse drag past this many px counts as a drag rather than a click (matches Projects' carousel). */
const DRAG_THRESHOLD = 5

/** Matches on skill name, category, or the experience/project it was used in. */
function matchesQuery(skill: Skill, category: string, query: string): boolean {
  if (!query) return true
  if (skill.name.toLowerCase().includes(query)) return true
  if (category.toLowerCase().includes(query)) return true
  return skill.usedIn?.some((place) => place.toLowerCase().includes(query)) ?? false
}

/** Matches the dropdown filter, which picks either a category or a used-in project/experience. */
function matchesFilter(skill: Skill, category: string, filter: string): boolean {
  if (filter === 'all') return true
  if (category === filter) return true
  return skill.usedIn?.includes(filter) ?? false
}

export function Skills() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const normalized = query.trim().toLowerCase()
  const isFiltering = normalized.length > 0 || filter !== 'all'

  const filteredGroups = useMemo(() => {
    if (!isFiltering) return skills
    return skills
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => matchesFilter(item, group.category, filter) && matchesQuery(item, group.category, normalized),
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [isFiltering, normalized, filter])

  return (
    <section id="skills" className="scroll-mt-14 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <SectionHeading className="mb-1.5">Skills</SectionHeading>
          <p className="text-sm text-muted-foreground">Click a skill to see where I've used it.</p>
        </div>
        <div className="flex items-center gap-2">
          <ExpandableSearch
            query={query}
            onQueryChange={setQuery}
            placeholder="Search by name, category, or project…"
            label="Search skills"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger
              className="relative size-11 shrink-0 justify-center gap-0 border-0 bg-transparent px-0 hover:bg-muted [&>svg:last-child]:hidden"
              aria-label="Filter skills"
            >
              <Filter className="size-4 text-muted-foreground" />
              <span className="sr-only">
                <SelectValue />
              </span>
              {filter !== 'all' && (
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand" aria-hidden />
              )}
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All skills</SelectItem>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {CATEGORIES.map((category) => {
                  const Icon = categoryIcons[category] ?? Code
                  return (
                    <SelectItem key={category} value={category}>
                      <span className="flex items-center gap-2">
                        <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                        {category}
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Experience</SelectLabel>
                {EXPERIENCES.map((company) => (
                  <SelectItem key={company} value={company}>
                    <span className="flex items-center gap-2">
                      {EXPERIENCE_LOGOS[company] ? (
                        <span className="flex size-5 shrink-0 items-center justify-center rounded bg-white ring-1 ring-border">
                          <img src={EXPERIENCE_LOGOS[company]} alt="" className="size-3.5 object-contain" />
                        </span>
                      ) : (
                        <span className="size-5 shrink-0" aria-hidden />
                      )}
                      {company}
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isFiltering && filteredGroups.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-14 text-center">
          <SearchX className="size-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">No skills found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {query.trim() ? `Nothing matches “${query.trim()}”.` : 'Nothing matches this filter.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setFilter('all')
            }}
            className="text-sm font-medium text-brand hover:underline"
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredGroups.map((group, i) => {
            const Icon = categoryIcons[group.category] ?? Code
            return (
              <Reveal key={group.category} delay={i * 60}>
                <div className="flex items-center gap-3">
                  <div className="flex w-28 shrink-0 items-center gap-1.5 sm:w-36">
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <h3 className="truncate text-sm font-medium">{group.category}</h3>
                  </div>
                  <MarqueeRow group={group} />
                </div>
              </Reveal>
            )
          })}
        </div>
      )}
    </section>
  )
}

function MarqueeRow({ group }: { group: SkillGroup }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const hoveredRef = useRef(false)
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0, moved: false })
  // Whether a single copy of the chips already overflows the row — only then is there anything
  // to loop, so a short row (e.g. a filtered-down category) skips the duplicate copy entirely.
  const [needsLoop, setNeedsLoop] = useState(false)
  const needsLoopRef = useRef(needsLoop)
  useEffect(() => {
    needsLoopRef.current = needsLoop
  }, [needsLoop])

  // Runs before paint so the row never flashes between a duplicated and single-copy layout on mount.
  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    const content = contentRef.current
    if (!scroller || !content) return
    const measure = () => setNeedsLoop(content.scrollWidth > scroller.clientWidth + 1)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(scroller)
    return () => observer.disconnect()
  }, [group.items])

  // Drives scrollLeft directly (rather than a CSS transform) so native drag/scroll and the
  // auto-advance share the same source of truth instead of fighting each other.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    // `last` starts null and is seeded from the first rAF timestamp itself (not performance.now()),
    // since mixing the two clocks could make the very first dt come out negative.
    let last: number | null = null
    // Tracked separately from el.scrollLeft, which browsers round to an integer pixel — reading
    // it back each frame would throw away the sub-pixel delta before it could ever accumulate.
    let position = el.scrollLeft
    let raf = requestAnimationFrame(tick)

    function tick(now: number) {
      const el = scrollerRef.current
      if (!el) return
      const dt = last === null ? 0 : (now - last) / 1000
      last = now

      const shouldPause =
        !needsLoopRef.current || draggingRef.current || hoveredRef.current || el.querySelector('[data-state="open"]')
      if (shouldPause) {
        position = el.scrollLeft
      } else if (dt > 0) {
        const half = el.scrollWidth / 2
        position += AUTO_SCROLL_SPEED * dt
        if (position >= half) position -= half
        el.scrollLeft = position
      }
      raf = requestAnimationFrame(tick)
    }
    return () => cancelAnimationFrame(raf)
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
          <div
            key={copy}
            ref={copy === 0 ? contentRef : undefined}
            className="flex shrink-0 items-center gap-1.5"
          >
            {group.items.map((item, j) => (
              <SkillChip key={`${copy}-${item.name}-${j}`} skill={item} className="shrink-0" />
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
}
