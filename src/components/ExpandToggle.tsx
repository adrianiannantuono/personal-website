import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/** A small pill button for show/hide toggles — collapsible details, "show more" lists, etc. */
export function ExpandToggle({
  expanded,
  onClick,
  expandedLabel,
  collapsedLabel,
  className,
  variant = 'pill',
}: {
  expanded: boolean
  onClick?: () => void
  expandedLabel: string
  collapsedLabel: string
  className?: string
  /** 'line' spans the full width as a labeled divider — for a section's primary expand/collapse action. */
  variant?: 'pill' | 'line'
}) {
  if (variant === 'line') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'group relative flex w-full items-center justify-center py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-brand',
          className,
        )}
      >
        <span
          className="absolute inset-x-0 top-1/2 h-px bg-border transition-colors group-hover:bg-brand/40"
          aria-hidden
        />
        <span className="relative flex items-center gap-1.5 bg-background px-3">
          {expanded ? expandedLabel : collapsedLabel}
          <ChevronDown className={cn('size-3 transition-transform', expanded && 'rotate-180')} />
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:bg-brand/5 hover:text-brand',
        className,
      )}
    >
      {expanded ? expandedLabel : collapsedLabel}
      <ChevronDown className={cn('size-3 transition-transform', expanded && 'rotate-180')} />
    </button>
  )
}
