import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <h2 className={cn('mb-6 text-lg font-semibold tracking-tight', className)}>{children}</h2>
}
