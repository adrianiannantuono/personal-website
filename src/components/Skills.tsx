import {
  Cloud,
  Code,
  Database,
  Factory,
  Server,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { skills } from '@/data/resume'

const icons: Record<string, LucideIcon> = {
  Backend: Server,
  Frontend: Code,
  Databases: Database,
  'Cloud & DevOps': Cloud,
  'Industrial Systems': Factory,
  Professional: Sparkles,
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-14 py-12">
      <SectionHeading>Skills</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => {
          const Icon = icons[group.category] ?? Code
          return (
            <Reveal key={group.category} delay={i * 60}>
              <div className="rounded-lg border border-border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="size-4 text-brand" />
                  <p className="text-sm font-medium">{group.category}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
