import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-11"
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
    >
      <Sun className="size-5 scale-100 dark:scale-0" />
      <Moon className="absolute size-5 scale-0 dark:scale-100" />
    </Button>
  )
}
