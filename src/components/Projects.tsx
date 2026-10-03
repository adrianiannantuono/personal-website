import { ArrowUpRight, ChevronDown, FileText } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { type ProjectEntry, projects } from '@/data/resume'
import { cn } from '@/lib/utils'

const VISIBLE_COUNT = 3

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.slice(0, VISIBLE_COUNT)

  return (
    <section id="projects" className="scroll-mt-14 py-12">
      <SectionHeading>Projects</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {visibleProjects.map((project, i) => (
          <Reveal
            key={project.name}
            delay={i * 80}
            className={i === 0 ? 'sm:col-span-2' : undefined}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
      {projects.length > VISIBLE_COUNT && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-6 flex items-center gap-1 text-sm font-medium text-brand hover:underline"
        >
          {showAll ? 'See less' : 'See more'}
          <ChevronDown className={cn('size-3.5 transition-transform', showAll && 'rotate-180')} />
        </button>
      )}
    </section>
  )
}

function ProjectCard({ project }: { project: ProjectEntry }) {
  const [open, setOpen] = useState(false)
  const cover = project.images?.[0]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="group h-full rounded-lg border border-border transition-colors hover:border-foreground/20">
        {cover && (
          <button
            onClick={() => setOpen(true)}
            className="block aspect-video w-full overflow-hidden rounded-t-lg bg-muted"
          >
            <img
              src={cover}
              alt={`${project.name} preview`}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        )}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-muted-foreground">{project.context}</p>
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={project.linkLabel ?? `Open ${project.name}`}
                className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {project.bullets[0]}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            {(project.bullets.length > 1 || (project.images?.length ?? 0) > 0) && (
              <DialogTrigger asChild>
                <button className="text-sm font-medium whitespace-nowrap underline-offset-4 hover:underline">
                  View details
                </button>
              </DialogTrigger>
            )}
          </div>
        </div>
      </div>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
          <DialogDescription>{project.context}</DialogDescription>
        </DialogHeader>

        {project.images && project.images.length > 0 && (
          <div className="-mx-1 flex gap-2 overflow-x-auto pb-1">
            {project.images.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} screenshot`}
                className="aspect-video w-56 shrink-0 rounded-md object-cover"
              />
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
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
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
  )
}
