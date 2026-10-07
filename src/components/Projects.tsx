import { Filter, Globe, SearchX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Carousel } from '@/components/Carousel'
import { categoryIcons, experienceIcons, matchesQuery } from '@/components/projects/filters'
import { ProjectCard } from '@/components/projects/ProjectCard'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ExpandableSearch } from '@/components/ExpandableSearch'
import { SectionHeading } from '@/components/SectionHeading'
import { projects } from '@/data/resume'
import { OPEN_PROJECT_EVENT } from '@/lib/sectionEvents'

const EXPERIENCES = Array.from(new Set(projects.map((p) => p.experience)))
const CATEGORIES = Array.from(new Set(projects.map((p) => p.category)))

export function Projects() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [openProject, setOpenProject] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const name = (e as CustomEvent<string>).detail
      setFilter('all')
      setOpenProject(name)
    }
    window.addEventListener(OPEN_PROJECT_EVENT, handler)
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, handler)
  }, [])

  const normalizedQuery = query.trim().toLowerCase()
  const isFiltering = normalizedQuery.length > 0 || filter !== 'all'
  // Experience and category values never collide, so one filter value unambiguously matches one axis.
  const filtered = projects.filter(
    (p) => (filter === 'all' || p.experience === filter || p.category === filter) && matchesQuery(p, normalizedQuery),
  )

  return (
    <section id="projects" className="scroll-mt-14 py-12">
      <div className="mb-6 flex items-center justify-between gap-3">
        <SectionHeading className="mb-0">Projects</SectionHeading>
        <div className="flex shrink-0 items-center justify-end gap-2">
          <ExpandableSearch
            query={query}
            onQueryChange={setQuery}
            placeholder="Search for a project"
            label="Search projects"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger
              className="relative size-11 shrink-0 justify-center gap-0 border-0 bg-transparent px-0 hover:bg-muted [&>svg:last-child]:hidden"
              aria-label="Filter projects"
            >
              <Filter className="size-4 text-muted-foreground" />
              <span className="sr-only">
                <SelectValue />
              </span>
              {filter !== 'all' && (
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-brand" aria-hidden />
              )}
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All projects</SelectItem>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {CATEGORIES.map((category) => {
                  const Icon = categoryIcons[category] ?? Globe
                  return (
                    <SelectItem key={category} value={category}>
                      <span className="flex items-center gap-2">
                        <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                        {category}
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Experience</SelectLabel>
                {EXPERIENCES.map((exp) => {
                  const { icon: Icon, logo } = experienceIcons[exp] ?? {}
                  return (
                    <SelectItem key={exp} value={exp}>
                      <span className="flex items-center gap-2">
                        {logo ? (
                          <span className="flex size-5 shrink-0 items-center justify-center rounded bg-white ring-1 ring-border">
                            <img src={logo} alt="" className="size-3.5 object-contain" />
                          </span>
                        ) : Icon ? (
                          <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                        ) : (
                          <span className="size-5 shrink-0" aria-hidden />
                        )}
                        {exp}
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isFiltering && filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-14 text-center">
          <SearchX className="size-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">No projects found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {normalizedQuery ? `Nothing matches “${query.trim()}”.` : 'Nothing matches this filter.'}
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
        <Carousel resetKey={`${filter}:${normalizedQuery}`}>
          {filtered.map((project) => (
            <div key={project.name} className="w-[82%] shrink-0 snap-start sm:w-[42%]">
              <ProjectCard
                project={project}
                open={openProject === project.name}
                onOpenChange={(isOpen) => setOpenProject(isOpen ? project.name : null)}
              />
            </div>
          ))}
        </Carousel>
      )}
    </section>
  )
}
