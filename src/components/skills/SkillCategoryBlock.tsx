import { ChevronDown, Code } from 'lucide-react'
import { memo, useCallback, useMemo } from 'react'
import { Reveal } from '@/components/Reveal'
import { categoryIcons, groupBySubcategory } from '@/components/skills/filters'
import { MarqueeRow } from '@/components/skills/MarqueeRow'
import type { Skill } from '@/data/resume'
import { cn } from '@/lib/utils'

/** One category's header + either its flat chip row or its per-subcategory breakdown. Memoized so
 *  toggling one category's breakdown (or the filter dropdown's own state, which lives in the same
 *  parent) doesn't re-render every *other* category too — each one holds a full duplicated marquee
 *  of popover-capable chips, so re-building them all on an unrelated state change was the actual
 *  source of the toggle-button stutter. */
export const SkillCategoryBlock = memo(function SkillCategoryBlock({
  group,
  delay,
  isFiltering,
  isToggledOpen,
  onToggle,
}: {
  group: { category: string; items: Skill[] }
  delay: number
  isFiltering: boolean
  isToggledOpen: boolean
  onToggle: (category: string) => void
}) {
  const Icon = categoryIcons[group.category] ?? Code
  const subgroups = useMemo(() => groupBySubcategory(group.items), [group.items])
  // Whether there's more than one subcategory to break into — this is what the manual toggle acts
  // on. (Unfiltered, every category has several; filtering can narrow it down to just one, which
  // is handled separately below.)
  const hasMultipleSubcats = subgroups.length > 1
  // A search/filter forces the breakdown open — including down to a single matching subcategory,
  // so a result stays labeled by what it matched on — regardless of what the user last toggled by hand.
  const showBreakdown = isFiltering || (hasMultipleSubcats && isToggledOpen)
  // The toggle is only meaningful (and shown) when there's more than one subcategory to act on and
  // the user can actually act on it — while filtering it's forced open, so a button there would be
  // dead weight.
  const canToggle = hasMultipleSubcats && !isFiltering
  const handleToggle = useCallback(() => onToggle(group.category), [onToggle, group.category])
  // Shared between both states so the icon/title/chevron never shift position when toggling —
  // only what's rendered beside or below this changes.
  const header = canToggle ? (
    <button
      type="button"
      onClick={handleToggle}
      aria-expanded={isToggledOpen}
      aria-label={isToggledOpen ? `Collapse ${group.category}` : `Break ${group.category} into subcategories`}
      className="relative flex w-fit max-w-28 shrink-0 items-center gap-1 rounded text-left transition-colors before:absolute before:-inset-y-2.5 before:inset-x-0 before:content-[''] hover:text-foreground sm:max-w-36"
    >
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <h3 className="w-min text-sm leading-tight font-medium">{group.category}</h3>
      <ChevronDown
        className={cn(
          'size-3.5 shrink-0 text-muted-foreground transition-transform duration-200',
          isToggledOpen && 'rotate-180',
        )}
      />
    </button>
  ) : (
    <div className="flex w-fit max-w-28 shrink-0 items-center gap-1 sm:max-w-36">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <h3 className="w-min text-sm leading-tight font-medium">{group.category}</h3>
    </div>
  )
  return (
    // `contain:layout` keeps this category's own expand/collapse transition from forcing the
    // browser to re-derive every other category's internal layout just because their vertical
    // offset shifted — without it, a long row of marquee chips below the one animating gets
    // dragged into the same reflow and the transition stutters.
    <Reveal delay={delay} className="[contain:layout]">
      <div className="flex items-start gap-3">
        {header}
        {!showBreakdown && <MarqueeRow items={group.items} />}
      </div>
      {(hasMultipleSubcats || isFiltering) && (
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-in-out',
            showBreakdown ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <div className="space-y-2 pt-2.5">
              {subgroups.map((sub, j) => (
                <div key={sub.subcategory ?? `_${j}`} className="flex items-center gap-3">
                  <div className="w-28 shrink-0 sm:w-36">
                    {sub.subcategory && (
                      <span className="block text-xs leading-tight text-muted-foreground">{sub.subcategory}</span>
                    )}
                  </div>
                  <MarqueeRow items={sub.items} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Reveal>
  )
})
