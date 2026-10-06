/** Cross-section navigation events — kept dependency-free so components that trigger these
 *  (e.g. SkillChip) don't have to import the sections that handle them, avoiding import cycles. */

export const OPEN_PROJECT_EVENT = 'open-project'
export const OPEN_EXPERIENCE_EVENT = 'open-experience'

/** Opens the given project's detail dialog and scrolls the Projects section into view. */
export function viewProject(name: string) {
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: name }))
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}

/** Expands the given company's experience entry (past whatever "show more" toggles it's behind)
 *  and scrolls to it. Carries a timestamp so re-firing for the same company still re-expands it
 *  if the user had since collapsed it manually. */
export function viewExperience(company: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EXPERIENCE_EVENT, { detail: { company, ts: Date.now() } }))
}

export type ExperienceOpenRequest = { company: string; ts: number }
