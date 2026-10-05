import { ArrowUpRight, ChevronLeft, ChevronRight, FileText, X } from 'lucide-react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SectionHeading } from '@/components/SectionHeading'
import { SkillChip } from '@/components/SkillChip'
import { type ProjectEntry, projects } from '@/data/resume'
import { cn } from '@/lib/utils'

/** How far (in px) a mouse drag has to travel before it counts as a drag rather than a click. */
const DRAG_THRESHOLD = 5

const CATEGORIES = Array.from(new Set(projects.map((p) => p.context)))

const isPdf = (src: string) => src.toLowerCase().endsWith('.pdf')

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [filter, setFilter] = useState('all')
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0, moved: false })

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.context === filter)

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
    setAtStart(true)
    setAtEnd(el.scrollWidth <= el.clientWidth + 4)
  }, [filter])

  const scroll = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({
      left: direction * scrollerRef.current.clientWidth * 0.9,
      behavior: 'smooth',
    })
  }

  // Plain window listeners (not setPointerCapture) — capturing the pointer on mousedown
  // can silently suppress the native click on whatever's underneath, which broke opening
  // the card's dialog on a plain click.
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el || e.pointerType !== 'mouse') return
    // A portaled dialog (the detail modal) is a React descendant of the scroller but not
    // an actual DOM descendant, so without this check dragging inside the open modal would
    // still scroll the carousel behind it.
    if (!el.contains(e.target as Node)) return
    const startX = e.clientX
    const startScrollLeft = el.scrollLeft
    dragStateRef.current = { startX, startScrollLeft, moved: false }

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX
      if (Math.abs(dx) > DRAG_THRESHOLD) {
        dragStateRef.current.moved = true
        setDragging(true)
      }
      el.scrollLeft = startScrollLeft - dx
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
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
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[13rem]" aria-label="Filter projects">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All projects</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="hidden gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => scroll(-1)}
              disabled={atStart}
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => scroll(1)}
              disabled={atEnd}
              aria-label="Scroll right"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
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
              <ProjectCard project={project} />
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
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: ProjectEntry }) {
  const [open, setOpen] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const heroImage = project.images?.find((src) => !isPdf(src))
  const art = heroImage ?? project.logo

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.name}`}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setOpen(true)
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
                <div className="mt-4 overflow-hidden rounded-lg border border-border">
                  <img
                    src={heroImage}
                    alt={`${project.name} preview`}
                    className="aspect-video w-full object-cover"
                  />
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

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-3">
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
          </DialogHeader>

          {project.images && project.images.length > 0 && (
            <div className="-mx-1 flex gap-2 overflow-x-auto pb-1">
              {project.images.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightbox(src)}
                  aria-label={`View full ${isPdf(src) ? 'document' : 'screenshot'}`}
                  className="group/thumb aspect-video w-56 shrink-0 overflow-hidden rounded-md border border-border"
                >
                  {isPdf(src) ? (
                    <div className="flex size-full flex-col items-center justify-center gap-1.5 bg-muted text-muted-foreground">
                      <FileText className="size-6" />
                      <span className="text-xs font-medium">PDF</span>
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

          {project.url && (
            <Button asChild className="mt-2 w-fit">
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
        </DialogContent>
      </Dialog>

      <Dialog open={!!lightbox} onOpenChange={(isOpen) => !isOpen && setLightbox(null)}>
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
          <DialogDescription className="sr-only">Press Escape to close</DialogDescription>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute -top-3 -right-3 flex size-8 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-colors hover:bg-foreground/90"
            >
              <X className="size-4" />
            </button>
          </DialogClose>
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
