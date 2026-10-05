import { Camera, ChevronDown, ShoppingBag, SquareTerminal, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { SkillChip } from '@/components/SkillChip'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { experience, type ExperienceEntry, type Position } from '@/data/resume'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  Fractionl: SquareTerminal,
  'Patio Concepts': ShoppingBag,
  'Artech Images': Camera,
}

export function Experience() {
  const [showEarlier, setShowEarlier] = useState(false)
  const visible = experience.filter((job) => !job.hidden)
  const earlier = experience.filter((job) => job.hidden)

  return (
    <section id="experience" className="scroll-mt-14 py-12">
      <SectionHeading>Experience</SectionHeading>
      <div className="relative">
        <div className="absolute top-2 bottom-2 left-8 w-px bg-border" aria-hidden />
        <div className="space-y-8">
          {visible.map((job, i) => (
            <Reveal key={`${job.company}-${job.role}`} delay={i * 80}>
              <ExperienceItem Icon={icons[job.company] ?? SquareTerminal} job={job} />
            </Reveal>
          ))}
          {showEarlier &&
            earlier.map((job, i) => (
              <Reveal key={`${job.company}-${job.role}`} delay={i * 80}>
                <ExperienceItem Icon={icons[job.company] ?? SquareTerminal} job={job} />
              </Reveal>
            ))}
        </div>
      </div>
      {earlier.length > 0 && (
        <button
          onClick={() => setShowEarlier((v) => !v)}
          className="mt-8 ml-[84px] flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          {showEarlier ? 'Hide earlier experience' : 'Show earlier experience'}
          <ChevronDown
            className={cn('size-3.5 transition-transform', showEarlier && 'rotate-180')}
          />
        </button>
      )}
    </section>
  )
}

function ExperienceItem({ Icon, job }: { Icon: LucideIcon; job: ExperienceEntry }) {
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

  return (
    <div className="relative flex gap-5 pl-0">
      <div className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full border border-border bg-white p-2.5 text-brand">
        {job.logo ? (
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <Icon className="size-7" />
        )}
      </div>
      <div className="min-w-0 flex-1 pt-2">
        <PositionBlock position={primaryPosition} company={job.company} />

        {earlierPositions.length > 0 && (
          <>
            <button
              onClick={() => setShowEarlierRoles((v) => !v)}
              className="mt-4 flex items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              {showEarlierRoles ? 'See less' : `See more at ${job.company}`}
              <ChevronDown
                className={cn('size-3.5 transition-transform', showEarlierRoles && 'rotate-180')}
              />
            </button>
            {showEarlierRoles && (
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
            )}
          </>
        )}
      </div>
    </div>
  )
}

function PositionBlock({ position, company }: { position: Position; company: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasBullets = (position.bullets?.length ?? 0) > 0

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium">
          {position.role} <span className="text-muted-foreground">· {company}</span>
        </h3>
        <p className="text-sm whitespace-nowrap text-muted-foreground">
          {position.start} — {position.end}
        </p>
      </div>
      {position.location && <p className="text-sm text-muted-foreground">{position.location}</p>}
      {position.summary && <p className="mt-2 text-sm leading-relaxed">{position.summary}</p>}
      {position.tags && position.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {position.tags.map((tag) => (
            <SkillChip key={tag} skill={{ name: tag }} />
          ))}
        </div>
      )}
      {hasBullets && (
        <>
          <CollapsibleTrigger asChild>
            <button className="mt-2 flex items-center gap-1 text-sm font-medium text-brand hover:underline">
              {isOpen ? 'Show less' : 'Show details'}
              <ChevronDown
                className={cn('size-3.5 transition-transform', isOpen && 'rotate-180')}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
              {position.bullets!.map((bullet, j) => (
                <li key={j}>{bullet}</li>
              ))}
            </ul>
          </CollapsibleContent>
        </>
      )}
    </Collapsible>
  )
}
