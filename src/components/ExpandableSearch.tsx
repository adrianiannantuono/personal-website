import { Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/** A search icon that expands into an input on click, collapsing back once it's empty and unfocused. */
export function ExpandableSearch({
  query,
  onQueryChange,
  placeholder,
  label,
  className,
  onExpandedChange,
}: {
  query: string
  onQueryChange: (value: string) => void
  placeholder: string
  label: string
  className?: string
  /** Fires whenever the field expands/collapses — lets a caller that has content sitting under
   *  the expanding panel (e.g. a subtitle) make room for it instead of letting it get covered. */
  onExpandedChange?: (expanded: boolean) => void
}) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const expanded = open || query.length > 0

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    onExpandedChange?.(expanded)
  }, [expanded, onExpandedChange])

  const close = () => {
    onQueryChange('')
    setOpen(false)
  }

  return (
    // Fixed footprint (always just the icon's 44×44 box) so expanding never reflows surrounding
    // layout — the expanding panel below is positioned out of flow and overlays on top instead.
    <div className={cn('relative h-11 w-11 shrink-0', className)}>
      <div
        className={cn(
          'absolute top-0 right-0 z-20 h-11 overflow-hidden rounded-lg transition-[width] duration-200 ease-out',
          expanded ? 'w-56 sm:w-64' : 'w-11',
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={label}
          aria-hidden={expanded}
          tabIndex={expanded ? -1 : 0}
          className={cn(
            'absolute left-0 top-0 flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-colors',
            expanded ? 'pointer-events-none' : 'hover:border hover:border-border hover:bg-muted',
          )}
        >
          <Search className="size-4" />
        </button>
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onBlur={() => {
            if (!query) setOpen(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') close()
          }}
          placeholder={placeholder}
          aria-label={label}
          aria-hidden={!expanded}
          tabIndex={expanded ? 0 : -1}
          className={cn(
            // text-base (16px) prevents iOS Safari from auto-zooming the viewport on focus;
            // zoom only kicks in below that size, so sm+ can safely drop back to text-sm.
            'h-11 w-56 bg-background pl-11 pr-11 text-base shadow-sm transition-opacity duration-150 sm:w-64 sm:text-sm',
            expanded ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        />
        {expanded && (
          <button
            type="button"
            onClick={close}
            aria-label="Clear search"
            className="absolute right-0 top-0 flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
