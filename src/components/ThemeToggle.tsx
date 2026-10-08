import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export function ThemeToggle({
  className,
  /** Shows "Light mode"/"Dark mode" next to the icon — for use as a row inside a menu, rather than
   *  a standalone icon button. */
  showLabel,
}: {
  className?: string
  showLabel?: boolean
}) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Button
      variant="ghost"
      size={showLabel ? 'default' : 'icon'}
      className={cn(!showLabel && 'size-11', className)}
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    >
      <span className="relative flex size-5 shrink-0 items-center justify-center">
        <Sun className="absolute size-5 scale-100 dark:scale-0" />
        <Moon className="absolute size-5 scale-0 dark:scale-100" />
      </span>
      {showLabel && (
        <>
          <span className="dark:hidden">Light mode</span>
          <span className="hidden dark:inline">Dark mode</span>
        </>
      )}
    </Button>
  )
}
