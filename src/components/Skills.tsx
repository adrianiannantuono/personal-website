import { SearchX } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { ExpandableSearch } from '@/components/ExpandableSearch'
import { SectionHeading } from '@/components/SectionHeading'
import { matchesFilter, matchesQuery } from '@/components/skills/filters'
import { SkillCategoryBlock } from '@/components/skills/SkillCategoryBlock'
import { SkillsFilterMenu } from '@/components/skills/SkillsFilterMenu'
import { skills } from '@/data/resume'
import { cn } from '@/lib/utils'

export function Skills() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchExpanded, setSearchExpanded] = useState(false)
  // Which categories are showing their per-subcategory breakdown instead of one flat row.
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  // Stable across re-renders (state setters are already stable; wrapping it just lets this be
  // passed as a memoized prop) so toggling one category doesn't change every other category
  // block's props and force them all to re-render — otherwise every chip's popover content and
  // the whole duplicated marquee tree gets rebuilt on each toggle, which is what was stuttering.
  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }, [])

  const normalized = query.trim().toLowerCase()
  const isFiltering = normalized.length > 0 || filter !== 'all'

  const filteredGroups = useMemo(() => {
    if (!isFiltering) return skills
    return skills
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) => matchesFilter(item, group.category, filter) && matchesQuery(item, group.category, normalized),
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [isFiltering, normalized, filter])

  return (
    <section id="skills" className="scroll-mt-14 py-12">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <SectionHeading className="mb-1.5">Skills</SectionHeading>
          <p
            className={cn(
              'text-sm text-muted-foreground transition-[margin-top] duration-200 ease-out',
              searchExpanded && 'mt-4',
            )}
          >
            Click a skill to see where I've used it.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ExpandableSearch
            query={query}
            onQueryChange={setQuery}
            onExpandedChange={setSearchExpanded}
            placeholder="Search for a skill"
            label="Search skills"
          />
          <SkillsFilterMenu value={filter} onValueChange={setFilter} />
        </div>
      </div>
      {isFiltering && filteredGroups.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-14 text-center">
          <SearchX className="size-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">No skills found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {query.trim() ? `Nothing matches “${query.trim()}”.` : 'Nothing matches this filter.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setFilter('all')
            }}
            className="text-sm font-medium text-brand hover:underline"
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredGroups.map((group, i) => (
            <SkillCategoryBlock
              key={group.category}
              group={group}
              delay={i * 60}
              isFiltering={isFiltering}
              isToggledOpen={expandedCategories.has(group.category)}
              onToggle={toggleCategory}
            />
          ))}
        </div>
      )}
    </section>
  )
}
