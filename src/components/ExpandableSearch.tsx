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
}: {
  query: string
  onQueryChange: (value: string) => void
  placeholder: string
  label: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const expanded = open || query.length > 0

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const close = () => {
    onQueryChange('')
    setOpen(false)
  }

  return (
    <div
      className={cn(
        'relative h-11 transition-[width] duration-200 ease-out',
        expanded ? 'w-full max-w-xs sm:w-64' : 'w-11',
        className,
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
          'h-11 pl-11 pr-11 text-sm transition-opacity duration-150',
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
  )
}
