import { Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { profile } from '@/data/resume'

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-14 py-12">
      <Separator className="mb-10" />
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          Get in touch.
        </p>
        <div className="flex items-center gap-1">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Mail className="size-5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LinkedInIcon className="size-5" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}
