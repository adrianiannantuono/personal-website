import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ThemeToggle } from '@/components/ThemeToggle'
import { profile } from '@/data/resume'

const links = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <img src="/favicon.svg" alt="" className="size-5" />
          {profile.name}
        </a>
        <nav className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="size-11 sm:hidden">
                <Menu className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48 p-1">
              <nav className="flex flex-col">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center rounded-lg px-3 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </PopoverContent>
          </Popover>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
