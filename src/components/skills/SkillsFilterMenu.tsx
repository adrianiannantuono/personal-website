import { ChevronDown, Code, Filter } from 'lucide-react'
import { useState } from 'react'
import { FilterCategoryDisclosure } from '@/components/skills/FilterCategoryDisclosure'
import {
  CATEGORIES,
  CATEGORY_SUBCATEGORIES,
  categoryIcons,
  EXPERIENCE_LOGOS,
  EXPERIENCES,
  subcategoryFilterValue,
} from '@/components/skills/filters'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

/** The Skills section's filter dropdown: a flat "All skills" option, a per-category list (each
 *  with an optional subcategory disclosure), and an experience list. Owns which category's
 *  subcategories are currently shown — that's pure dropdown UI state, nothing outside this
 *  component needs it. */
export function SkillsFilterMenu({ value, onValueChange }: { value: string; onValueChange: (value: string) => void }) {
  // Which category has its subcategories expanded. Only one at a time, so opening a category
  // closes whichever one was open before.
  const [openFilterCategory, setOpenFilterCategory] = useState<string | null>(null)
  const toggleFilterCategory = (category: string) => {
    setOpenFilterCategory((prev) => (prev === category ? null : category))
  }
  // Picking "All skills", a plain category, or an experience also collapses any open subcategory
  // disclosure — only picking a subcategory itself (a `category::subcategory` value) leaves it as-is.
  const handleValueChange = (next: string) => {
    onValueChange(next)
    if (!next.includes('::')) setOpenFilterCategory(null)
  }

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger
        className="relative size-11 shrink-0 justify-center gap-0 border-0 bg-transparent px-0 hover:bg-muted [&>svg:last-child]:hidden"
        aria-label="Filter skills"
      >
        <Filter className="size-4 text-muted-foreground" />
        <span className="sr-only">
          <SelectValue />
        </span>
        {value !== 'all' && <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand" aria-hidden />}
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="all">All skills</SelectItem>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {CATEGORIES.map((category) => {
            const Icon = categoryIcons[category] ?? Code
            const subcategories = CATEGORY_SUBCATEGORIES[category] ?? []
            const isOpen = openFilterCategory === category
            return (
              // `contain:layout` keeps this row's own disclosure animation from forcing the
              // dropdown to re-derive every category below it just because their position shifted.
              <div key={category} className="[contain:layout]">
                <div className="flex items-center gap-0.5">
                  <SelectItem value={category} className="w-auto flex-1">
                    <span className="flex items-center gap-2">
                      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                      {category}
                    </span>
                  </SelectItem>
                  {subcategories.length > 0 && (
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFilterCategory(category)
                      }}
                      aria-expanded={isOpen}
                      aria-label={isOpen ? `Hide ${category} subcategories` : `Show ${category} subcategories`}
                      className="flex size-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted sm:size-7"
                    >
                      <ChevronDown className={cn('size-3.5 transition-transform duration-200', isOpen && 'rotate-180')} />
                    </button>
                  )}
                </div>
                <FilterCategoryDisclosure open={isOpen}>
                  {subcategories.map((subcategory) => (
                    <SelectItem
                      key={subcategory}
                      value={subcategoryFilterValue(category, subcategory)}
                      className="py-3 pl-8 text-xs text-muted-foreground sm:py-1"
                    >
                      {subcategory}
                    </SelectItem>
                  ))}
                </FilterCategoryDisclosure>
              </div>
            )
          })}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Experience</SelectLabel>
          {EXPERIENCES.map((company) => (
            <SelectItem key={company} value={company}>
              <span className="flex items-center gap-2">
                {EXPERIENCE_LOGOS[company] ? (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded bg-white ring-1 ring-border">
                    <img src={EXPERIENCE_LOGOS[company]} alt="" className="size-3.5 object-contain" />
                  </span>
                ) : (
                  <span className="size-5 shrink-0" aria-hidden />
                )}
                {company}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
