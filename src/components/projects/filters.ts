import { BookOpen, Bot, Briefcase, CircuitBoard, Eye, Factory, Globe, type LucideIcon, User } from 'lucide-react'
import type { ProjectEntry } from '@/data/resume'

export const categoryIcons: Record<string, LucideIcon> = {
  'Web Application': Globe,
  'Computer Vision & Machine Learning': Eye,
  'Robotics & Controls': Bot,
  'IoT & Industrial Systems': Factory,
  'Hardware & Electronics': CircuitBoard,
  'Research & Literature Review': BookOpen,
}

/** uOttawa entries share the school's logo; the non-academic chapters get a plain icon instead. */
export const experienceIcons: Record<string, { icon?: LucideIcon; logo?: string }> = {
  'uOttawa · Masters (M.Eng)': { logo: '/logos/uottawa.svg' },
  'uOttawa · Bachelors (B.A.Sc)': { logo: '/logos/uottawa.svg' },
  Professional: { icon: Briefcase },
  Personal: { icon: User },
}

/** Matches on project name, context, category, experience, or tags. */
export function matchesQuery(project: ProjectEntry, query: string): boolean {
  if (!query) return true
  const haystack = [project.name, project.context, project.category, project.experience, ...project.tags]
    .join(' ')
    .toLowerCase()
  return haystack.includes(query)
}
