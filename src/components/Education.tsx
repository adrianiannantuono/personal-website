import { ArrowUpRight, GraduationCap, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ExpandToggle } from '@/components/ExpandToggle'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { SkillChip } from '@/components/SkillChip'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { type Course, education } from '@/data/resume'
import { viewProject } from '@/lib/sectionEvents'

/** "2023" → "2025" as "2 yrs" — elapsed calendar years between the two, floored at 1. */
function formatYearDuration(start: string, end: string): string {
  const years = Math.max(1, Number(end) - Number(start))
  return `${years} yr${years > 1 ? 's' : ''}`
}

export function Education() {
  return (
    <section id="education" className="scroll-mt-14 py-12">
      <SectionHeading>Education</SectionHeading>
      <div className="relative">
        {/* On mobile each item centers its own icon and carries a short connector into the gap
         *  below it instead (see `EducationItem`) — this continuous rail only fits the desktop
         *  side-by-side layout, where every icon shares the same left offset. */}
        <div className="absolute top-2 bottom-2 left-8 hidden w-px bg-border sm:block" aria-hidden />
        <div className="space-y-6 sm:space-y-8">
          {education.map((entry, i) => (
            <Reveal key={entry.degree} delay={i * 80}>
              <EducationItem entry={entry} showConnector={i < education.length - 1} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function EducationItem({
  entry,
  showConnector,
}: {
  entry: (typeof education)[number]
  /** Whether another item follows this one — draws a short connector into the gap below, centered
   *  under the (mobile-only, centered) icon, bridging to the next item's icon. */
  showConnector?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const hasHighlights = (entry.highlights?.length ?? 0) > 0
  const hasCourses = (entry.courses?.length ?? 0) > 0

  return (
    <div className="relative flex flex-col items-center gap-2 sm:flex-row sm:items-stretch sm:gap-5">
      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-white p-2 text-brand sm:size-16 sm:p-2.5">
        {entry.logo ? (
          <img
            src={entry.logo}
            alt={`${entry.school} logo`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <GraduationCap className="size-5 sm:size-7" />
        )}
      </div>
      {showConnector && (
        <div
          className="absolute top-full left-1/2 mt-1.5 h-3 w-px -translate-x-1/2 bg-border sm:hidden"
          aria-hidden
        />
      )}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full min-w-0 sm:flex-1 sm:pt-2">
        <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4 sm:gap-y-1 sm:text-left">
          <h3 className="font-medium">{entry.degree}</h3>
          <p className="text-sm whitespace-nowrap text-muted-foreground">
            {entry.start} — {entry.end}
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          {entry.school} · {entry.location} · {formatYearDuration(entry.start, entry.end)}
        </p>
        <p className="mt-2 text-sm leading-relaxed">{entry.detail}</p>

        {(hasHighlights || hasCourses) && (
          <CollapsibleTrigger asChild>
            <ExpandToggle
              expanded={isOpen}
              expandedLabel="Show less"
              collapsedLabel="Show details"
              className="mt-2"
            />
          </CollapsibleTrigger>
        )}

        {(hasHighlights || hasCourses) && (
          <CollapsibleContent>
            {hasHighlights && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                {entry.highlights!.map((highlight, j) => (
                  <li key={j}>{highlight}</li>
                ))}
              </ul>
            )}
            {hasCourses && (
              <div className="mt-3">
                <CourseDialog entry={entry} />
              </div>
            )}
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  )
}

function CourseDialog({ entry }: { entry: (typeof education)[number] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entry.courses!
    return entry.courses!.filter((course) =>
      [course.code, course.name, course.category, course.description]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q)),
    )
  }, [query, entry.courses])

  const groups = new Map<string, Course[]>()
  for (const course of filtered) {
    const group = groups.get(course.category) ?? []
    group.push(course)
    groups.set(course.category, group)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) setQuery('')
      }}
    >
      <DialogTrigger asChild>
        <button className="text-sm font-medium underline-offset-4 hover:underline">
          View courses ({entry.courses!.length})
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Coursework</DialogTitle>
          <DialogDescription>{entry.degree}</DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses…"
            className="pl-9"
          />
        </div>

        <div className="max-h-[60vh] space-y-6 overflow-y-auto pr-1">
          {groups.size === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">No courses match.</p>
          )}
          {[...groups.entries()].map(([category, courses]) => (
            <div key={category}>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand">
                {category}
                <span className="h-px flex-1 bg-border" aria-hidden />
              </h4>
              <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <div key={course.code} className="text-sm leading-relaxed">
                    <span className="font-mono text-xs text-muted-foreground">
                      {course.code}
                    </span>{' '}
                    <span>{course.name}</span>
                    {course.description && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {course.description}
                      </p>
                    )}
                    {course.tags && course.tags.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {course.tags.map((tag) => (
                          <SkillChip key={tag} skill={{ name: tag }} size="sm" />
                        ))}
                      </div>
                    )}
                    {course.project && (
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false)
                          viewProject(course.project!)
                        }}
                        className="mt-1.5 flex items-center gap-1 text-xs font-medium text-brand hover:underline"
                      >
                        View project
                        <ArrowUpRight className="size-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
