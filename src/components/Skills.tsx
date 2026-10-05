import { Cloud, Code, Database, Factory, Server, Sparkles, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { SkillChip } from '@/components/SkillChip'
import { skills } from '@/data/resume'
import { cn } from '@/lib/utils'

/** Drives the per-item progress bar; the `skills-progress` keyframes live in index.css. */
const ROTATE_MS = 5000

const categoryIcons: Record<string, LucideIcon> = {
  Backend: Server,
  Frontend: Code,
  Databases: Database,
  'Cloud & DevOps': Cloud,
  'Industrial Systems': Factory,
  Professional: Sparkles,
}

export function Skills() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const group = skills[active]
  const CategoryIcon = categoryIcons[group.category] ?? Code

  return (
    <section id="skills" className="scroll-mt-14 py-12">
      <SectionHeading>Skills</SectionHeading>
      <div
        className="grid gap-3 sm:grid-cols-[220px_1fr] sm:gap-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex gap-1 overflow-x-auto sm:flex-col sm:overflow-visible">
          {skills.map((g, i) => {
            const Icon = categoryIcons[g.category] ?? Code
            const isActive = i === active
            return (
              <button
                key={g.category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(i)}
                className={cn(
                  'flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors sm:shrink',
                  isActive ? 'bg-muted' : 'hover:bg-muted/60',
                )}
              >
                <Icon
                  className={cn('size-4 shrink-0', isActive ? 'text-brand' : 'text-muted-foreground')}
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block text-sm font-medium whitespace-nowrap sm:whitespace-normal',
                      !isActive && 'text-muted-foreground',
                    )}
                  >
                    {g.category}
                  </span>
                  <span className="relative mt-1.5 block h-0.5 w-full overflow-hidden rounded-full bg-border">
                    {isActive && (
                      <span
                        key={active}
                        onAnimationEnd={() => setActive((a) => (a + 1) % skills.length)}
                        className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-brand"
                        style={{
                          animationName: 'skills-progress',
                          animationDuration: `${ROTATE_MS}ms`,
                          animationTimingFunction: 'linear',
                          animationFillMode: 'forwards',
                          animationPlayState: paused ? 'paused' : 'running',
                        }}
                      />
                    )}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <Reveal key={group.category} className="min-w-0">
          <div className="h-full rounded-lg border border-border p-5">
            <div className="mb-1 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-brand/10 text-brand">
                <CategoryIcon className="size-4" />
              </div>
              <p className="text-sm font-medium">{group.category}</p>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">{group.blurb}</p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <SkillChip key={item.name} skill={item} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
