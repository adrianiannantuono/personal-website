import { FileText, Presentation } from 'lucide-react'
import { Carousel } from '@/components/Carousel'
import { isPdf, PdfThumb } from '@/components/projects/media'
import { cn } from '@/lib/utils'

export function ProjectGallery({
  images,
  documents,
  projectName,
  onSelectImage,
  resetKey,
}: {
  images: string[]
  documents: string[]
  projectName: string
  onSelectImage: (index: number) => void
  /** Identifies "this gallery is now showing" — re-measures and jumps back to the start when it
   *  changes (the detail dialog opening). */
  resetKey: unknown
}) {
  if (images.length === 0 && documents.length === 0) return null

  return (
    <Carousel size="compact" hideArrowsAtEdge resetKey={resetKey}>
      {images.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => onSelectImage(i)}
          aria-label={`View full ${isPdf(src) ? 'document' : 'screenshot'}`}
          className={cn(
            'group/thumb shrink-0 snap-start overflow-hidden rounded-md border border-border',
            isPdf(src) ? 'aspect-[3/4] w-28 sm:w-40' : 'aspect-video w-36 sm:w-56',
          )}
        >
          {isPdf(src) ? (
            <div className="relative size-full">
              <PdfThumb src={src} alt={`${projectName} document preview`} />
              <div className="pointer-events-none absolute right-1.5 bottom-1.5 flex items-center gap-1 rounded bg-foreground/80 px-1.5 py-0.5 text-[0.65rem] font-medium text-background">
                <FileText className="size-3" />
                PDF
              </div>
            </div>
          ) : (
            <img
              src={src}
              alt={`${projectName} screenshot`}
              className="size-full object-cover transition-transform duration-200 group-hover/thumb:scale-105"
            />
          )}
        </button>
      ))}
      {documents.map((src) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noreferrer"
          aria-label="Open presentation"
          className="group/thumb flex aspect-[3/4] w-28 shrink-0 snap-start flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-border bg-muted/50 transition-colors hover:bg-muted sm:w-40"
        >
          <Presentation className="size-6 text-muted-foreground transition-colors group-hover/thumb:text-foreground sm:size-8" />
          <span className="flex items-center gap-1 rounded bg-foreground/80 px-1.5 py-0.5 text-[0.65rem] font-medium text-background">
            PPTX
          </span>
        </a>
      ))}
    </Carousel>
  )
}
