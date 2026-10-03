import type { ReactNode } from 'react'

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="mb-6 text-lg font-semibold tracking-tight">{children}</h2>
}
