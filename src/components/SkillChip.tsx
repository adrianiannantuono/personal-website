import {
  SiArduino,
  SiCircleci,
  SiDocker,
  SiElectron,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithubactions,
  SiGrafana,
  SiGraphql,
  SiHtml5,
  SiInfluxdb,
  SiIonic,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiMqtt,
  SiNodedotjs,
  SiNodered,
  SiNuxt,
  SiOpencv,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiShopify,
  SiStripe,
  SiTailwindcss,
  SiThreedotjs,
  SiTimescale,
  SiTypescript,
  SiVite,
  SiVuedotjs,
  SiWebpack,
} from '@icons-pack/react-simple-icons'
import {
  Activity,
  BookOpen,
  Bot,
  BrainCircuit,
  Bug,
  Cable,
  CircuitBoard,
  Cloud,
  Cpu,
  Database,
  Eye,
  FileText,
  Search,
  Sigma,
  Sun,
  TestTube,
  Webhook,
  Wifi,
  Workflow,
} from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getSkillContext, type Skill } from '@/data/resume'
import { viewExperience, viewProject } from '@/lib/sectionEvents'
import { cn } from '@/lib/utils'

type IconConfig = { Icon: React.ComponentType<{ size?: number; color?: string; className?: string }>; brand?: boolean }

const skillIcons: Record<string, IconConfig> = {
  Laravel: { Icon: SiLaravel, brand: true },
  PHP: { Icon: SiPhp, brand: true },
  'Node.js': { Icon: SiNodedotjs, brand: true },
  'REST APIs': { Icon: Webhook },
  GraphQL: { Icon: SiGraphql, brand: true },
  Typesense: { Icon: Search },
  React: { Icon: SiReact, brand: true },
  'Vue.js': { Icon: SiVuedotjs, brand: true },
  TypeScript: { Icon: SiTypescript, brand: true },
  JavaScript: { Icon: SiJavascript, brand: true },
  'HTML/CSS': { Icon: SiHtml5, brand: true },
  PostgreSQL: { Icon: SiPostgresql, brand: true },
  TimescaleDB: { Icon: SiTimescale, brand: true },
  MySQL: { Icon: SiMysql, brand: true },
  InfluxDB: { Icon: SiInfluxdb, brand: true },
  SQL: { Icon: Database },
  Docker: { Icon: SiDocker, brand: true },
  Git: { Icon: SiGit, brand: true },
  'GitHub Actions': { Icon: SiGithubactions, brand: true },
  CircleCI: { Icon: SiCircleci, brand: true },
  'Laravel Nightwatch': { Icon: Activity },
  'AWS (S3)': { Icon: Cloud },
  'OPC-UA': { Icon: Cpu },
  MQTT: { Icon: SiMqtt, brand: true },
  Modbus: { Icon: Cable },
  MTConnect: { Icon: Activity },
  'Node-RED': { Icon: SiNodered, brand: true },
  'Production Debugging': { Icon: Bug },
  'System Design': { Icon: Workflow },
  'Automated Testing': { Icon: TestTube },
  'Technical Documentation': { Icon: FileText },
  // Project tags
  Python: { Icon: SiPython, brand: true },
  OpenCV: { Icon: SiOpencv, brand: true },
  Electron: { Icon: SiElectron, brand: true },
  Firebase: { Icon: SiFirebase, brand: true },
  Arduino: { Icon: SiArduino, brand: true },
  Express: { Icon: SiExpress, brand: true },
  Ionic: { Icon: SiIonic, brand: true },
  IoT: { Icon: Wifi },
  Vite: { Icon: SiVite, brand: true },
  'Tailwind CSS': { Icon: SiTailwindcss, brand: true },
  // Experience tags
  Grafana: { Icon: SiGrafana, brand: true },
  'Nuxt.js': { Icon: SiNuxt, brand: true },
  'Three.js': { Icon: SiThreedotjs, brand: true },
  'Stripe API': { Icon: SiStripe, brand: true },
  'Shopify API': { Icon: SiShopify, brand: true },
  Webpack: { Icon: SiWebpack, brand: true },
  'Computer Vision': { Icon: Eye },
  'Machine Learning': { Icon: BrainCircuit },
  'Fuzzy Logic': { Icon: Sigma },
  Robotics: { Icon: Bot },
  Photovoltaics: { Icon: Sun },
  Research: { Icon: BookOpen },
  'PCB Design': { Icon: CircuitBoard },
}

/** A small icon + label pill, optionally popping open extra context (description, where it was used). */
export const SkillChip = memo(function SkillChip({
  skill,
  className,
  size = 'default',
  onOpenChange,
}: {
  skill: Skill
  className?: string
  /** 'sm' for denser contexts, like inline within bullet points. */
  size?: 'default' | 'sm'
  /** Lets a containing marquee track open popovers without polling the DOM for them every frame. */
  onOpenChange?: (open: boolean) => void
}) {
  const config = skillIcons[skill.name]
  const Icon = config?.Icon
  const hasDetails = Boolean(skill.description || skill.usedIn?.length)
  const [open, setOpen] = useState(false)
  // Mirrors `open` so the unmount effect below can see its last value without depending on it
  // (that would re-fire the "was it open when this ran" check on every toggle, not just unmount).
  const openRef = useRef(open)
  useEffect(() => {
    openRef.current = open
  }, [open])
  // If a chip unmounts while its popover is open (e.g. a filter change drops it from the list),
  // nothing else would tell the parent it closed — leaving the marquee paused forever.
  useEffect(() => {
    return () => {
      if (openRef.current) onOpenChange?.(false)
    }
  }, [onOpenChange])
  // Once true, stays true — so a chip that's never been opened never has to build its detail
  // content (icon lookups, `getSkillContext` calls for every `usedIn` entry) at all. Without this,
  // every chip paid that cost on every render, including ones triggered by something as unrelated
  // as toggling a different category's breakdown open. Set alongside `open` in the same handler,
  // so it costs no extra render beyond the one opening already causes.
  const [hasOpened, setHasOpened] = useState(false)
  const handleOpenChange = (next: boolean) => {
    if (next) setHasOpened(true)
    setOpen(next)
    onOpenChange?.(next)
  }

  const chip = (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-border bg-card font-medium text-foreground transition-colors',
        size === 'sm' ? 'h-5 px-1.5 text-[11px]' : 'h-6 px-2 text-xs',
        hasDetails && 'cursor-pointer hover:border-brand/40 hover:bg-brand/5',
        className,
      )}
    >
      {Icon && (
        <Icon
          size={size === 'sm' ? 11 : 13}
          {...(config?.brand ? { color: 'default' } : { className: 'text-muted-foreground' })}
        />
      )}
      {skill.name}
    </span>
  )

  if (!hasDetails) return chip

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button type="button">{chip}</button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        {(open || hasOpened) && (
          <>
            <div className="flex items-center gap-1.5">
              {Icon && (
                <Icon
                  size={14}
                  {...(config?.brand ? { color: 'default' } : { className: 'text-muted-foreground' })}
                />
              )}
              <p className="font-medium">{skill.name}</p>
            </div>
            {skill.subcategory && <p className="text-[11px] text-muted-foreground/70">{skill.subcategory}</p>}
            {skill.description && (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{skill.description}</p>
            )}
            {skill.usedIn && skill.usedIn.length > 0 && (
              <div className="mt-3 space-y-2.5 border-t border-border pt-2.5">
                {skill.usedIn.map((place) => {
                  const context = getSkillContext(skill.name, place)
                  return (
                    <button
                      key={place}
                      type="button"
                      onClick={() => {
                        handleOpenChange(false)
                        if (context?.kind === 'experience') viewExperience(place)
                        else if (context?.kind === 'project') viewProject(place)
                      }}
                      className="flex w-full gap-2 rounded-md text-left transition-colors hover:bg-muted/60 -mx-1 px-1 py-0.5"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-white ring-1 ring-border">
                        {context?.logo && <img src={context.logo} alt="" className="size-3.5 object-contain" />}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium">{place}</p>
                        {context?.bullets.map((bullet, i) => (
                          <p key={i} className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {bullet}
                          </p>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  )
})
