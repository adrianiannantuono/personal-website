import { Camera, ShoppingBag, SquareTerminal, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { ExpandToggle } from '@/components/ExpandToggle'
import { Reveal } from '@/components/Reveal'
import { SkillChip } from '@/components/SkillChip'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { experience, type ExperienceEntry, type Position } from '@/data/resume'
import { type ExperienceOpenRequest, OPEN_EXPERIENCE_EVENT } from '@/lib/sectionEvents'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  Fractionl: SquareTerminal,
  'Patio Concepts': ShoppingBag,
  'Artech Images': Camera,
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Parses the resume's "MMM YYYY" / "Present" date strings into a first-of-month Date. */
function parseResumeDate(value: string): Date {
  if (value.trim().toLowerCase() === 'present') return new Date()
  const [month, year] = value.split(' ')
  return new Date(Number(year), MONTHS.indexOf(month), 1)
}

/** "Sep 2025" → "Present" as "1 yr 1 mo" — elapsed calendar months between the two, floored at 1. */
function formatDuration(start: string, end: string): string {
  const months = Math.max(
    1,
    (parseResumeDate(end).getFullYear() - parseResumeDate(start).getFullYear()) * 12 +
      (parseResumeDate(end).getMonth() - parseResumeDate(start).getMonth()),
  )
  const years = Math.floor(months / 12)
  const remainder = months % 12

  const parts: string[] = []
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (remainder > 0 || years === 0) parts.push(`${remainder} mo${remainder !== 1 ? 's' : ''}`)
  return parts.join(' ')
}

/** Renders `text` with any `tags` it mentions swapped in-place for skill pills, so the pill sits right where the tech is named. */
function HighlightedText({
  text,
  tags,
  size = 'default',
}: {
  text: string
  tags?: string[]
  size?: 'default' | 'sm'
}) {
  if (!tags || tags.length === 0) return <>{text}</>

  const pattern = [...tags]
    .sort((a, b) => b.length - a.length)
    .map((tag) => tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const parts = text.split(new RegExp(`(${pattern})`, 'g'))

  return (
    <>
      {parts.map((part, i) =>
        tags.includes(part) ? (
          <SkillChip
            key={`${part}-${i}`}
            skill={{ name: part }}
            size={size}
            className="my-0.5 align-middle"
          />
        ) : (
          part
        ),
      )}
    </>
  )
}

export function Experience() {
  const [showAll, setShowAll] = useState(false)
  const [showEarlier, setShowEarlier] = useState(false)
  const [openRequest, setOpenRequest] = useState<ExperienceOpenRequest | null>(null)
  const visible = experience.filter((job) => !job.hidden)
  const earlier = experience.filter((job) => job.hidden)
  const [current, ...rest] = visible
  // Keyed by company — only the authoritative (currently expanded-or-expandable) copy of each
  // item registers itself, since `rest[0]` also renders in the collapsed teaser below.
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const handler = (e: Event) => {
      const request = (e as CustomEvent<ExperienceOpenRequest>).detail
      const job = experience.find((j) => j.company === request.company)
      if (!job) return
      if (job.hidden) {
        setShowAll(true)
        setShowEarlier(true)
      } else if (job !== current) {
        setShowAll(true)
      }
      setOpenRequest(request)
      // Wait for the expand transition (300ms) so the item's final position is known.
      window.setTimeout(() => {
        itemRefs.current[request.company]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 320)
    }
    window.addEventListener(OPEN_EXPERIENCE_EVENT, handler)
    return () => window.removeEventListener(OPEN_EXPERIENCE_EVENT, handler)
  }, [current])

  return (
    <section id="experience" className="scroll-mt-14 py-12">
      <SectionHeading>Experience</SectionHeading>
      <div className="relative">
        <div className="absolute top-2 bottom-2 left-6 w-px bg-border sm:left-8" aria-hidden />
        <div className="space-y-6 sm:space-y-8">
          <Reveal>
            <ExperienceItem
              Icon={icons[current.company] ?? SquareTerminal}
              job={current}
              registerRef={(el) => (itemRefs.current[current.company] = el)}
              openRequest={openRequest}
            />
          </Reveal>
          {rest.length > 0 && (
            <>
              <div
                inert={showAll || undefined}
                aria-hidden={showAll}
                className={cn(
                  'overflow-hidden transition-[height,opacity] duration-300 ease-in-out',
                  '[mask-image:linear-gradient(to_bottom,black,black_15%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,black_15%,transparent)]',
                  showAll ? 'h-0 opacity-0' : 'h-24 opacity-100',
                )}
              >
                <ExperienceItem Icon={icons[rest[0].company] ?? SquareTerminal} job={rest[0]} />
              </div>
              <Collapsible open={showAll}>
                <CollapsibleContent>
                  <div className="space-y-6 sm:space-y-8">
                    {rest.map((job, i) => (
                      <Reveal key={`${job.company}-${job.role}`} delay={i * 80}>
                        <ExperienceItem
                          Icon={icons[job.company] ?? SquareTerminal}
                          job={job}
                          registerRef={(el) => (itemRefs.current[job.company] = el)}
                          openRequest={openRequest}
                        />
                      </Reveal>
                    ))}
                    {earlier.length > 0 && (
                      <Collapsible open={showEarlier}>
                        <CollapsibleContent>
                          <div className="space-y-6 sm:space-y-8">
                            {earlier.map((job, i) => (
                              <Reveal key={`${job.company}-${job.role}`} delay={i * 80}>
                                <ExperienceItem
                                  Icon={icons[job.company] ?? SquareTerminal}
                                  job={job}
                                  registerRef={(el) => (itemRefs.current[job.company] = el)}
                                  openRequest={openRequest}
                                />
                              </Reveal>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </>
          )}
        </div>
      </div>
      {showAll && earlier.length > 0 && (
        <div className="mt-8 ml-[60px] sm:ml-[84px]">
          <ExpandToggle
            expanded={showEarlier}
            onClick={() => setShowEarlier((v) => !v)}
            expandedLabel="Hide earlier experience"
            collapsedLabel="Show earlier experience"
          />
        </div>
      )}
      {rest.length > 0 && (
        <ExpandToggle
          variant="line"
          expanded={showAll}
          onClick={() => setShowAll((v) => !v)}
          expandedLabel="Hide experience"
          collapsedLabel="Show full experience"
          className="mt-6"
        />
      )}
    </section>
  )
}

function ExperienceItem({
  Icon,
  job,
  registerRef,
  openRequest,
}: {
  Icon: LucideIcon
  job: ExperienceEntry
  /** Attaches this item's DOM node so it can be scrolled into view from elsewhere (e.g. a skill popover). */
  registerRef?: (el: HTMLDivElement | null) => void
  /** Set when a skill popover asked to jump to this company's entry — forces its bullets open. */
  openRequest?: ExperienceOpenRequest | null
}) {
  const [showEarlierRoles, setShowEarlierRoles] = useState(false)
  const earlierPositions = job.earlierPositions ?? []
  const primaryPosition: Position = {
    role: job.role,
    location: job.location,
    start: job.start,
    end: job.end,
    summary: job.summary,
    bullets: job.bullets,
    tags: job.tags,
  }
  const forceOpen = openRequest?.company === job.company ? openRequest.ts : undefined

  return (
    <div ref={registerRef} className="relative flex gap-3 pl-0 sm:gap-5">
      <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-white p-2 text-brand sm:size-16 sm:p-2.5">
        {job.logo ? (
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <Icon className="size-5 sm:size-7" />
        )}
      </div>
      <div className="min-w-0 flex-1 pt-1 sm:pt-2">
        <PositionBlock position={primaryPosition} company={job.company} forceOpen={forceOpen} />

        {earlierPositions.length > 0 && (
          <Collapsible open={showEarlierRoles} onOpenChange={setShowEarlierRoles}>
            <CollapsibleTrigger asChild>
              <ExpandToggle
                expanded={showEarlierRoles}
                expandedLabel="See less"
                collapsedLabel={`See more at ${job.company}`}
                className="mt-4"
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-5 space-y-5">
                {earlierPositions.map((position) => (
                  <div
                    key={`${position.role}-${position.start}`}
                    className="border-t border-border pt-5"
                  >
                    <PositionBlock position={position} company={job.company} />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    </div>
  )
}

function PositionBlock({
  position,
  company,
  forceOpen,
}: {
  position: Position
  company: string
  /** A changing value (e.g. a timestamp) that forces the bullets open each time it changes. */
  forceOpen?: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const hasBullets = (position.bullets?.length ?? 0) > 0

  useEffect(() => {
    if (forceOpen !== undefined) setIsOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceOpen])

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 sm:gap-x-4">
        <h3 className="font-medium">
          {position.role} <span className="text-muted-foreground">· {company}</span>
        </h3>
        <p className="text-sm whitespace-nowrap text-muted-foreground">
          {position.start} — {position.end}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        {[position.location, formatDuration(position.start, position.end)].filter(Boolean).join(' · ')}
      </p>
      {position.summary && (
        <p className="mt-2 text-sm leading-relaxed">
          <HighlightedText text={position.summary} tags={position.tags} size="sm" />
        </p>
      )}
      {hasBullets && (
        <>
          <CollapsibleTrigger asChild>
            <ExpandToggle
              expanded={isOpen}
              expandedLabel="Show less"
              collapsedLabel="Show details"
              className="mt-2"
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
              {position.bullets!.map((bullet, j) => (
                <li key={j}>
                  <HighlightedText text={bullet} tags={position.tags} size="sm" />
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </>
      )}
    </Collapsible>
  )
}
