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
  SiThreedotjs,
  SiTimescale,
  SiTypescript,
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { Skill } from '@/data/resume'
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
  // Experience tags
  Grafana: { Icon: SiGrafana, brand: true },
  'Nuxt.js': { Icon: SiNuxt, brand: true },
  'Three.js': { Icon: SiThreedotjs, brand: true },
  Stripe: { Icon: SiStripe, brand: true },
  Shopify: { Icon: SiShopify, brand: true },
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
export function SkillChip({ skill }: { skill: Skill }) {
  const config = skillIcons[skill.name]
  const Icon = config?.Icon
  const hasDetails = Boolean(skill.description || skill.usedIn?.length)

  const chip = (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-md border border-border bg-card px-2 text-xs font-medium text-foreground transition-colors',
        hasDetails && 'cursor-pointer hover:border-brand/40 hover:bg-brand/5',
      )}
    >
      {Icon && (
        <Icon
          size={13}
          {...(config?.brand ? { color: 'default' } : { className: 'text-muted-foreground' })}
        />
      )}
      {skill.name}
    </span>
  )

  if (!hasDetails) return chip

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">{chip}</button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="font-medium">{skill.name}</p>
        {skill.description && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{skill.description}</p>
        )}
        {skill.usedIn && skill.usedIn.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {skill.usedIn.map((place) => (
              <span
                key={place}
                className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {place}
              </span>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
