import { Download, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { profile } from '@/data/resume'

export function Hero() {
  return (
    <section id="top" className="scroll-mt-14 py-16 sm:py-24">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-stretch sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Hello, I'm</p>
          <div className="mt-2 flex items-center gap-4 sm:mt-0 sm:block">
            <img
              src="/headshot.jpeg"
              alt={profile.name}
              className="size-16 shrink-0 rounded-lg object-cover ring-1 ring-border sm:hidden"
            />
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:mt-2 sm:text-5xl">
              {profile.name}
            </h1>
          </div>
          <div className="mt-3">
            <p className="text-lg text-muted-foreground">
              {profile.title} · {profile.credentials}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {profile.location}
            </div>
          </div>
          <p className="mt-6 max-w-xl text-balance leading-relaxed text-muted-foreground">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              <Button className="h-11 px-4" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="size-4" />
                  Get in touch
                </a>
              </Button>
              <Button variant="outline" size="icon" className="size-11" asChild>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon className="size-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="size-11" asChild>
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <GitHubIcon className="size-4" />
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="h-11 px-4" asChild>
                <a href="/resume.pdf" download>
                  <Download className="size-4" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
        <img
          src="/headshot.jpeg"
          alt={profile.name}
          className="hidden shrink-0 rounded-xl object-cover ring-1 ring-border sm:block sm:h-auto sm:w-64"
        />
      </div>
    </section>
  )
}
