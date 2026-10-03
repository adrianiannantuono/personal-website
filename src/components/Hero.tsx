import { Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { profile } from '@/data/resume'

export function Hero() {
  return (
    <section id="top" className="scroll-mt-14 py-16 sm:py-24">
      <p className="text-sm font-medium text-muted-foreground">Hi, I'm</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {profile.title} · {profile.credentials}
      </p>
      <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-3.5" />
        {profile.location}
      </div>
      <p className="mt-6 max-w-xl text-balance leading-relaxed text-muted-foreground">
        {profile.summary}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <a href={`mailto:${profile.email}`}>
            <Mail className="size-4" />
            Get in touch
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <GitHubIcon className="size-4" />
            GitHub
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon className="size-4" />
            LinkedIn
          </a>
        </Button>
      </div>
    </section>
  )
}
