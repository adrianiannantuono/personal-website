import {
  ArrowUpRight,
  BookOpen,
  Bot,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Eye,
  Factory,
  FileText,
  Filter,
  Globe,
  type LucideIcon,
  SearchX,
  User,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ExpandableSearch } from '@/components/ExpandableSearch'
import { SectionHeading } from '@/components/SectionHeading'
import { SkillChip } from '@/components/SkillChip'
import { type ProjectEntry, projects } from '@/data/resume'
import { OPEN_PROJECT_EVENT } from '@/lib/sectionEvents'
import { cn } from '@/lib/utils'

/** How far (in px) a mouse drag has to travel before it counts as a drag rather than a click. */
const DRAG_THRESHOLD = 5

const EXPERIENCES = Array.from(new Set(projects.map((p) => p.experience)))
const CATEGORIES = Array.from(new Set(projects.map((p) => p.category)))

const categoryIcons: Record<string, LucideIcon> = {
  'Web Application': Globe,
  'Computer Vision & Machine Learning': Eye,
  'Robotics & Controls': Bot,
  'IoT & Industrial Systems': Factory,
  'Hardware & Electronics': CircuitBoard,
  'Research & Literature Review': BookOpen,
}

/** uOttawa entries share the school's logo; the non-academic chapters get a plain icon instead. */
const experienceIcons: Record<string, { icon?: LucideIcon; logo?: string }> = {
  'uOttawa · Masters (M.Eng)': { logo: '/logos/uottawa.svg' },
  'uOttawa · Bachelors (B.A.Sc)': { logo: '/logos/uottawa.svg' },
  Professional: { icon: Briefcase },
  Personal: { icon: User },
}

const isPdf = (src: string) => src.toLowerCase().endsWith('.pdf')
const pdfPreviewSrc = (src: string) => `${src}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`

/** Chrome's PDF viewer ignores scrollbar=0, so the iframe is widened past its clipped
 *  container to push the native scrollbar out of view. */
function PdfThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <iframe
      src={pdfPreviewSrc(src)}
      title={alt}
      tabIndex={-1}
      className="h-full bg-white"
      style={{ width: 'calc(100% + 20px)', pointerEvents: 'none' }}
    />
  )
}

/** Matches on project name, context, category, experience, or tags. */
function matchesQuery(project: ProjectEntry, query: string): boolean {
  if (!query) return true
  const haystack = [project.name, project.context, project.category, project.experience, ...project.tags]
    .join(' ')
    .toLowerCase()
  return haystack.includes(query)
}

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [openProject, setOpenProject] = useState<string | null>(null)
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0, moved: false })
  // The last target we told the scroller to smooth-scroll to via the arrow buttons. scrollLeft
  // itself lags behind during the animation, so a rapid second click that reads scrollLeft would
  // see a barely-moved value and recompute the *same* next card — i.e. the click would be absorbed
  // into the current animation instead of advancing one more card. Tracking the intended target
  // separately lets each rapid click queue up the next card regardless of animation progress.
  const targetScrollLeftRef = useRef<number | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const name = (e as CustomEvent<string>).detail
      setFilter('all')
      setOpenProject(name)
    }
    window.addEventListener(OPEN_PROJECT_EVENT, handler)
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, handler)
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const isFiltering = normalizedQuery.length > 0 || filter !== 'all'
  // Experience and category values never collide, so one filter value unambiguously matches one axis.
  const filtered = projects.filter(
    (p) => (filter === 'all' || p.experience === filter || p.category === filter) && matchesQuery(p, normalizedQuery),
  )

  const updateEdges = () => {
    const el = scrollerRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  // Jump back to the start and re-measure whenever the filtered set changes size.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollLeft = 0
    targetScrollLeftRef.current = null
    setAtStart(true)
    setAtEnd(el.scrollWidth <= el.clientWidth + 4)
  }, [filter, normalizedQuery])

  const scroll = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    const scrollPaddingLeft = parseFloat(getComputedStyle(el).scrollPaddingLeft || '0')
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
    // A portaled dialog (the detail modal) is a React descendant of the scroller but not
    // an actual DOM descendant, so without this check dragging inside the open modal would
    // still scroll the carousel behind it.
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
        const scrollPaddingLeft = parseFloat(getComputedStyle(el).scrollPaddingLeft || '0')
        const target = Math.max(0, nearest.offsetLeft - scrollPaddingLeft)
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

  return (
    <section id="projects" className="scroll-mt-14 py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <SectionHeading className="mb-0">Projects</SectionHeading>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ExpandableSearch
            query={query}
            onQueryChange={setQuery}
            placeholder="Search by name, category, or tag…"
            label="Search projects"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger
              className="relative size-11 shrink-0 justify-center gap-0 border-0 bg-transparent px-0 hover:bg-muted [&>svg:last-child]:hidden"
              aria-label="Filter projects"
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
              <SelectItem value="all">All projects</SelectItem>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {CATEGORIES.map((category) => {
                  const Icon = categoryIcons[category] ?? Globe
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
                {EXPERIENCES.map((exp) => {
                  const { icon: Icon, logo } = experienceIcons[exp] ?? {}
                  return (
                    <SelectItem key={exp} value={exp}>
                      <span className="flex items-center gap-2">
                        {logo ? (
                          <span className="flex size-5 shrink-0 items-center justify-center rounded bg-white ring-1 ring-border">
                            <img src={logo} alt="" className="size-3.5 object-contain" />
                          </span>
                        ) : Icon ? (
                          <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                        ) : (
                          <span className="size-5 shrink-0" aria-hidden />
                        )}
                        {exp}
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isFiltering && filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-14 text-center">
          <SearchX className="size-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">No projects found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {normalizedQuery ? `Nothing matches “${query.trim()}”.` : 'Nothing matches this filter.'}
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
        <div className="relative">
          <div
            ref={scrollerRef}
            onScroll={updateEdges}
            onPointerDown={handlePointerDown}
            onClickCapture={handleClickCapture}
            onDragStart={(e) => e.preventDefault()}
            style={{ scrollSnapType: dragging ? 'none' : undefined }}
            className={cn(
              'flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-pl-10 scroll-pr-10 pb-2 sm:scroll-pl-16 sm:scroll-pr-16 [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent',
              dragging ? 'cursor-grabbing select-none' : 'cursor-grab',
            )}
          >
            {filtered.map((project) => (
              <div key={project.name} className="w-[82%] shrink-0 snap-start sm:w-[42%]">
                <ProjectCard
                  project={project}
                  open={openProject === project.name}
                  onOpenChange={(isOpen) => setOpenProject(isOpen ? project.name : null)}
                />
              </div>
            ))}
          </div>
          {!atStart && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent sm:w-16"
            />
          )}
          {!atEnd && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent sm:w-16"
            />
          )}
          <Button
            variant="outline"
            size="icon-sm"
            className="absolute inset-y-0 left-1 z-10 my-auto hidden size-11 rounded-full border-border/60 bg-background/90 shadow-md backdrop-blur-sm sm:flex disabled:pointer-events-auto"
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="absolute inset-y-0 right-1 z-10 my-auto hidden size-11 rounded-full border-border/60 bg-background/90 shadow-md backdrop-blur-sm sm:flex disabled:pointer-events-auto"
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </section>
  )
}

function ProjectCard({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectEntry
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const images = project.images ?? []
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const lightbox = lightboxIndex !== null ? images[lightboxIndex] : null
  const heroImage = project.images?.find((src) => !isPdf(src)) ?? project.images?.find(isPdf)
  const art = (heroImage && !isPdf(heroImage) ? heroImage : undefined) ?? project.logo

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null || i === 0 ? i : i - 1))
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null || i === images.length - 1 ? i : i + 1))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex, images.length])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <div
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.name}`}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onOpenChange(true)
              }
            }}
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border text-left transition-colors hover:border-foreground/20"
          >
            <div className="absolute inset-0" aria-hidden>
              {art ? (
                <img
                  src={art}
                  alt=""
                  className="size-full scale-125 object-cover opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                />
              ) : (
                <div className="size-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-card/90" />
            </div>

            <div className="relative flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  {project.logo && (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-white">
                      <img src={project.logo} alt="" className="size-6 object-contain" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.context}</p>
                  </div>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={project.linkLabel ?? `Open ${project.name}`}
                    className="relative shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.bullets[0]}</p>

              {heroImage && (
                <div
                  className={cn(
                    'mt-4 overflow-hidden rounded-lg border border-border',
                    isPdf(heroImage) ? 'aspect-[3/4] w-32' : 'aspect-video w-full',
                  )}
                >
                  {isPdf(heroImage) ? (
                    <PdfThumb src={heroImage} alt={`${project.name} preview`} />
                  ) : (
                    <img
                      src={heroImage}
                      alt={`${project.name} preview`}
                      className="size-full object-cover"
                    />
                  )}
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <SkillChip key={tag} skill={{ name: tag }} />
                  ))}
                </div>
                <span className="text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors group-hover:text-foreground">
                  View details
                </span>
              </div>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-2xl" showCloseButton={false}>
          <DialogHeader className="shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                {project.logo && (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-white">
                    <img src={project.logo} alt="" className="size-6 object-contain" />
                  </div>
                )}
                <div className="min-w-0">
                  <DialogTitle>{project.name}</DialogTitle>
                  <DialogDescription>{project.context}</DialogDescription>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {project.url && (
                  <Button asChild size="sm" className="w-fit">
                    <a href={project.url} target="_blank" rel="noreferrer">
                      {project.linkLabel?.toLowerCase().includes('paper') ? (
                        <FileText className="size-4" />
                      ) : (
                        <ArrowUpRight className="size-4" />
                      )}
                      {project.linkLabel ?? 'View project'}
                    </a>
                  </Button>
                )}
                <DialogClose asChild>
                  <Button variant="ghost" size="icon-sm" className="size-9 sm:size-7" aria-label="Close">
                    <X className="size-5 sm:size-4" />
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 -mr-1">
            {project.images && project.images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`View full ${isPdf(src) ? 'document' : 'screenshot'}`}
                    className={cn(
                      'group/thumb shrink-0 overflow-hidden rounded-md border border-border',
                      isPdf(src) ? 'aspect-[3/4] w-40' : 'aspect-video w-56',
                    )}
                  >
                    {isPdf(src) ? (
                      <div className="relative size-full">
                        <PdfThumb src={src} alt={`${project.name} document preview`} />
                        <div className="pointer-events-none absolute right-1.5 bottom-1.5 flex items-center gap-1 rounded bg-foreground/80 px-1.5 py-0.5 text-[0.65rem] font-medium text-background">
                          <FileText className="size-3" />
                          PDF
                        </div>
                      </div>
                    ) : (
                      <img
                        src={src}
                        alt={`${project.name} screenshot`}
                        className="size-full object-cover transition-transform duration-200 group-hover/thumb:scale-105"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {project.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <SkillChip key={tag} skill={{ name: tag }} />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!lightbox} onOpenChange={(isOpen) => !isOpen && setLightboxIndex(null)}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            'flex items-center justify-center border-0 bg-transparent p-0 ring-0',
            lightbox && isPdf(lightbox)
              ? 'h-[90vh] w-[95vw] max-w-5xl sm:max-w-5xl'
              : 'h-auto w-auto max-w-[95vw] sm:max-w-[95vw]',
          )}
        >
          <DialogTitle className="sr-only">
            {project.name} {lightbox && isPdf(lightbox) ? 'document' : 'screenshot'}
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
          {lightboxIndex !== null && lightboxIndex > 0 && (
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setLightboxIndex((i) => (i === null ? null : i - 1))}
              className="absolute top-1/2 -left-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-colors hover:bg-foreground/90 sm:-left-12"
            >
              <ChevronLeft className="size-4" />
            </button>
          )}
          {lightboxIndex !== null && lightboxIndex < images.length - 1 && (
            <button
              type="button"
              aria-label="Next"
              onClick={() => setLightboxIndex((i) => (i === null ? null : i + 1))}
              className="absolute top-1/2 -right-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-colors hover:bg-foreground/90 sm:-right-12"
            >
              <ChevronRight className="size-4" />
            </button>
          )}
          {lightbox &&
            (isPdf(lightbox) ? (
              <iframe src={lightbox} title={`${project.name} document`} className="size-full rounded-lg bg-white" />
            ) : (
              <img
                src={lightbox}
                alt=""
                className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain"
              />
            ))}
        </DialogContent>
      </Dialog>
    </>
  )
}
