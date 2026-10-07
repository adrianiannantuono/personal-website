import { ArrowUpRight, FileText, X } from 'lucide-react'
import { useState } from 'react'
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
import { isPdf, isPptx, PdfThumb } from '@/components/projects/media'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import { ProjectLightbox } from '@/components/projects/ProjectLightbox'
import { SkillChip } from '@/components/SkillChip'
import { type ProjectEntry } from '@/data/resume'
import { cn } from '@/lib/utils'

export function ProjectCard({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectEntry
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const images = (project.images ?? []).filter((src) => !isPptx(src))
  const documents = (project.images ?? []).filter(isPptx)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const heroImage = images.find((src) => !isPdf(src)) ?? images.find(isPdf)
  const art = (heroImage && !isPdf(heroImage) ? heroImage : undefined) ?? project.logo

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
                    <img src={heroImage} alt={`${project.name} preview`} className="size-full object-cover" />
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
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {project.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            <ProjectGallery
              images={images}
              documents={documents}
              projectName={project.name}
              onSelectImage={setLightboxIndex}
              resetKey={open}
            />

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <SkillChip key={tag} skill={{ name: tag }} />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ProjectLightbox images={images} projectName={project.name} index={lightboxIndex} onIndexChange={setLightboxIndex} />
    </>
  )
}
