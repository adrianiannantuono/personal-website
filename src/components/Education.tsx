import { ChevronDown, GraduationCap, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
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
import { cn } from '@/lib/utils'

export function Education() {
  return (
    <section id="education" className="scroll-mt-14 py-12">
      <SectionHeading>Education</SectionHeading>
      <div className="relative">
        <div className="absolute top-2 bottom-2 left-8 w-px bg-border" aria-hidden />
        <div className="space-y-8">
          {education.map((entry, i) => (
            <Reveal key={entry.degree} delay={i * 80}>
              <EducationItem entry={entry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function EducationItem({ entry }: { entry: (typeof education)[number] }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasHighlights = (entry.highlights?.length ?? 0) > 0
  const hasCourses = (entry.courses?.length ?? 0) > 0

  return (
    <div className="relative flex gap-5">
      <div className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full border border-border bg-white p-2.5 text-brand">
        {entry.logo ? (
          <img
            src={entry.logo}
            alt={`${entry.school} logo`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <GraduationCap className="size-7" />
        )}
      </div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="min-w-0 flex-1 pt-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-medium">{entry.degree}</h3>
          <p className="text-sm whitespace-nowrap text-muted-foreground">
            {entry.start} — {entry.end}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {entry.school} · {entry.location}
        </p>
        <p className="mt-2 text-sm leading-relaxed">{entry.detail}</p>

        {(hasHighlights || hasCourses) && (
          <CollapsibleTrigger asChild>
            <button className="mt-2 flex items-center gap-1 text-sm font-medium text-brand hover:underline">
              {isOpen ? 'Show less' : 'Show details'}
              <ChevronDown
                className={cn('size-3.5 transition-transform', isOpen && 'rotate-180')}
              />
            </button>
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
    <Dialog onOpenChange={(open) => !open && setQuery('')}>
      <DialogTrigger asChild>
        <button className="text-sm font-medium underline-offset-4 hover:underline">
          View courses ({entry.courses!.length})
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
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
