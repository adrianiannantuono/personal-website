export const isPdf = (src: string) => src.toLowerCase().endsWith('.pdf')
export const isPptx = (src: string) => src.toLowerCase().endsWith('.pptx')

const pdfPreviewSrc = (src: string) => `${src}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`

/** Chrome's PDF viewer ignores scrollbar=0, so the iframe is widened past its clipped
 *  container to push the native scrollbar out of view. */
export function PdfThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <iframe
      src={pdfPreviewSrc(src)}
      title={alt}
      tabIndex={-1}
      className="h-full bg-white"
      style={{ width: 'calc(100% + 20px)', pointerEvents: 'none' }}
    />
  )
}
