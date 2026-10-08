import { Cloud, Code, Database, Factory, Server, User, type LucideIcon } from 'lucide-react'
import { experience, type Skill, skills } from '@/data/resume'

export const categoryIcons: Record<string, LucideIcon> = {
  Backend: Server,
  Frontend: Code,
  Databases: Database,
  'Cloud & DevOps': Cloud,
  'Industrial Systems': Factory,
  Professional: User,
}

export const CATEGORIES = skills.map((group) => group.category)

// `skills` is already sorted into subcategory clusters (see `buildSkills` in resume.ts), so a
// de-duped pass over each category's items reproduces that same order — used by the filter
// dropdown's per-category subcategory disclosure.
export const CATEGORY_SUBCATEGORIES: Record<string, string[]> = {}
for (const group of skills) {
  CATEGORY_SUBCATEGORIES[group.category] = Array.from(
    new Set(group.items.map((item) => item.subcategory).filter((s): s is string => Boolean(s))),
  )
}

/** Joins a category and subcategory into one filter value — `::` can't appear in either name. */
export function subcategoryFilterValue(category: string, subcategory: string): string {
  return `${category}::${subcategory}`
}

// Companies/roles, not the looser project-tag strings also found in `usedIn` — mirrors Projects' own Category/Experience split.
export const EXPERIENCES = Array.from(new Set(experience.map((entry) => entry.company)))
export const EXPERIENCE_LOGOS: Record<string, string> = {}
for (const entry of experience) {
  if (entry.logo) EXPERIENCE_LOGOS[entry.company] = entry.logo
}

/** Matches on skill name, category, subcategory, or the experience/project it was used in. */
export function matchesQuery(skill: Skill, category: string, query: string): boolean {
  if (!query) return true
  if (skill.name.toLowerCase().includes(query)) return true
  if (category.toLowerCase().includes(query)) return true
  if (skill.subcategory?.toLowerCase().includes(query)) return true
  return skill.usedIn?.some((place) => place.toLowerCase().includes(query)) ?? false
}

/** Matches the dropdown filter, which picks a category, a category+subcategory pair (joined by
 *  `subcategoryFilterValue`), or a used-in project/experience. */
export function matchesFilter(skill: Skill, category: string, filter: string): boolean {
  if (filter === 'all') return true
  if (filter.includes('::')) {
    const [filterCategory, filterSubcategory] = filter.split('::')
    return category === filterCategory && skill.subcategory === filterSubcategory
  }
  if (category === filter) return true
  return skill.usedIn?.includes(filter) ?? false
}

/** Chunks a category's items into consecutive same-subcategory runs — `skills` is already sorted
 *  this way (see `buildSkills` in resume.ts), so this is just turning that clustering into groups
 *  to render as their own row, not re-sorting anything. */
export function groupBySubcategory(items: Skill[]): { subcategory?: string; items: Skill[] }[] {
  const chunks: { subcategory?: string; items: Skill[] }[] = []
  for (const item of items) {
    const last = chunks[chunks.length - 1]
    if (last && last.subcategory === item.subcategory) last.items.push(item)
    else chunks.push({ subcategory: item.subcategory, items: [item] })
  }
  return chunks
}
