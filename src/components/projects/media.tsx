import { FileText } from 'lucide-react'

export const isPdf = (src: string) => src.toLowerCase().endsWith('.pdf')
export const isPptx = (src: string) => src.toLowerCase().endsWith('.pptx')

/** Human-readable file name from a PDF path/URL, for display in UI. */
export const pdfFileName = (src: string) => {
  const fileName = decodeURIComponent(src.split('/').pop() ?? src)
  return fileName.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim()
}

const pdfPreviewSrc = (src: string) => `${src}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`

/** Chrome's PDF viewer ignores scrollbar=0, so the iframe is widened past its clipped
 *  container to push the native scrollbar out of view. Mobile browsers' built-in PDF
 *  renderers ignore the view=FitH hint and render at native zoom, so the thumbnail just
 *  shows a tightly cropped corner of the page there — fall back to a static icon instead. */
export function PdfThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      <iframe
        src={pdfPreviewSrc(src)}
        title={alt}
        tabIndex={-1}
        className="hidden h-full bg-white sm:block"
        style={{ width: 'calc(100% + 20px)', pointerEvents: 'none' }}
      />
      <div className="flex size-full flex-col items-center justify-center gap-1.5 bg-muted/50 sm:hidden">
        <FileText className="size-6 text-muted-foreground" />
        <span className="text-[0.65rem] font-medium text-muted-foreground">PDF</span>
      </div>
    </>
  )
}
