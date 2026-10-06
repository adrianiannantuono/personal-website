export const profile = {
  name: 'Adrian Iannantuono',
  credentials: 'M.Eng, B.A.Sc',
  title: 'Software Engineer',
  location: 'Toronto, ON',
  email: 'aiannantuono@me.com',
  github: 'https://github.com/adrianiannantuono',
  linkedin: 'https://www.linkedin.com/in/adrianiannantuono/',
  summary:
    "Software engineer with 3+ years of experience and a Master's in Electrical and Computer Engineering. I build and maintain production SaaS and industrial systems, with a focus on full-stack development, automation, and data-driven applications.",
}

export type Position = {
  role: string
  location?: string
  start: string
  end: string
  summary?: string
  bullets?: string[]
  /** Tools/tech used in this role, shown as chips. */
  tags?: string[]
}

export type ExperienceEntry = {
  role: string
  company: string
  companyUrl?: string
  /** Path under /public to the company's logo, e.g. '/logos/magna.svg'. */
  logo?: string
  location: string
  start: string
  end: string
  summary: string
  bullets: string[]
  /** Tools/tech used in this role, shown as chips. */
  tags?: string[]
  /** Earlier positions at the same company, most recent first — shown alongside the primary role when expanded. */
  earlierPositions?: Position[]
  /** Tucked behind the "Show earlier experience" toggle instead of shown by default. */
  hidden?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Software Developer',
    company: 'Fractionl',
    logo: '/logos/fractionl.png',
    location: 'Toronto, ON',
    start: 'Sep 2025',
    end: 'Present',
    summary:
      'Building full-stack features for a B2B SaaS platform with Laravel and Vue.js — fast search via Typesense, secure REST APIs, and CI through GitHub Actions.',
    bullets: [
      'Developed and enhanced full-stack features for a production B2B SaaS platform using Laravel and Vue.js, enabling fast product search, dynamic pricing, and ordering workflows across catalogs containing thousands of vehicle parts.',
      'Designed and maintained secure REST API integrations for product, inventory, and order synchronization across internal systems, QuickBooks, and third-party APIs (Freightcom, OpenAI translations, Chatwoot).',
      'Built and optimized Typesense search infrastructure, including schema design, indexing pipelines, and data normalization, for fast, accurate search across large product catalogs.',
      'Led adoption of automated testing and CI/CD by implementing PHPUnit, Laravel Dusk, and GitHub Actions pipelines, validating critical workflows on every pull request.',
      'Owned end-to-end delivery of major features, including an application-wide user roles system and a migration from one-way to bidirectional API synchronization.',
      'Leveraged AI-assisted development (Claude Code, OpenAI Codex) to accelerate implementation and debugging while maintaining ownership of architecture, testing, security, and code quality.',
    ],
    tags: ['Laravel', 'Vue.js', 'Typesense', 'REST APIs', 'GitHub Actions'],
  },
  {
    role: 'IoT Developer',
    company: 'Magna International',
    logo: '/logos/magna.svg',
    location: 'Vaughan, ON',
    start: 'Sep 2024',
    end: 'Sep 2025',
    summary:
      'Connected hundreds of manufacturing machines via MQTT and OPC-UA into Node.js APIs, visualized on React and Grafana dashboards, with InfluxDB storage and predictive analytics powered by Python.',
    bullets: [
      'Built and documented RESTful APIs with Node.js and OpenAPI, integrating MQTT, OPC-UA, Modbus, and MTConnect to collect real-time machine data for performance monitoring and predictive maintenance.',
      'Integrated IFM vibration sensors via vendor SDKs into a real-time monitoring system (C++, WebSockets, Node.js, InfluxDB) that triggered alerts from Fourier-transform threshold analysis.',
      'Developed interactive dashboards in React and Grafana to visualize live production metrics and machine status across manufacturing operations.',
      'Built predictive analytics in Python (scikit-learn) to forecast CNC tool wear and remaining tool life, helping operators schedule maintenance before failures occurred.',
      'Led deployment of industrial connectivity (OPC-UA, Modbus, MQTT) across hundreds of manufacturing machines, partnering with IT on network segmentation and NAT strategies.',
    ],
    tags: ['Node.js', 'React', 'MQTT', 'OPC-UA', 'InfluxDB', 'Python', 'Grafana'],
    earlierPositions: [
      {
        role: 'Engineering Student (Internship)',
        start: 'May 2024',
        end: 'Sep 2024',
        summary: 'Engineering internship at Magna ahead of transitioning into the IoT Developer role.',
      },
    ],
  },
  {
    role: 'Graduate Teaching Assistant',
    company: 'University of Ottawa',
    logo: '/logos/uottawa.svg',
    location: 'Ottawa, ON',
    start: 'Sep 2023',
    end: 'Dec 2024',
    summary: 'Led lab sessions for 50+ students in digital and analog circuit design.',
    bullets: [
      'Led 50+ students through lab sessions on digital and analog circuit design and testing.',
      'Created technical lab documents outlining procedures and learning outcomes for each experiment.',
      'Troubleshot lab equipment and gave students constructive written and oral feedback.',
      'Used oscilloscopes, Multisim, MATLAB, waveform generators, and multimeters.',
    ],
  },
  {
    role: 'Web and Software Developer',
    company: 'Patio Concepts',
    logo: '/logos/patio-concepts.png',
    location: 'Richmond Hill, ON',
    start: 'Jan 2021',
    end: 'Sep 2022',
    summary:
      'Maintained and grew Nuxt.js and Three.js e-commerce sites serving 15k+ visitors a month, backed by a Laravel API with Stripe and Shopify integrations, bundled with Webpack.',
    bullets: [
      'Maintained and enhanced e-commerce websites generating 15k+ monthly visits.',
      'Improved a 3D product viewer by optimizing it for mobile and dynamically generating product dimensions.',
      'Led development of a custom application to parse and store existing site content ahead of a website upgrade, reducing migration errors, and integrated APIs to replace the existing payment solution.',
      'Ran weekly sprints and gave managers regular updates on progress and obstacles.',
      'Built a script to parse and save website content, reducing the risk of human error when migrating it to the company’s new site.',
      'Used JavaScript (Nuxt.js, Three.js), HTML/CSS, Bootstrap, Python, SQL, PHP (Laravel), Stripe/Shopify/Snipcart APIs, Webpack, and Netlify.',
    ],
    tags: ['Nuxt.js', 'Three.js', 'Laravel', 'Stripe', 'Shopify', 'Webpack'],
  },
  {
    role: 'IT Student (Co-op)',
    company: 'Magna International',
    logo: '/logos/magna.svg',
    location: 'Vaughan, ON',
    start: 'May 2020',
    end: 'Aug 2020',
    summary: 'IT infrastructure projects and Python automation of AWS (S3) environments during a co-op term.',
    bullets: [
      'Managed IT infrastructure refresh projects and supported the customer throughout the process.',
      'Met with managers and implemented changes to the service management system.',
      'Designed and built a library of Python scripts to manage large datasets in AWS S3 environments.',
      'Worked with engineers to optimize algorithms for efficiency and cost savings.',
      'Trained employees and documented how to use the AWS management tools.',
    ],
    tags: ['AWS (S3)', 'Python'],
    earlierPositions: [
      {
        role: 'IT Analyst',
        location: 'Aurora, ON',
        start: 'May 2019',
        end: 'Apr 2020',
        summary: 'SharePoint site design, migration, and management across divisions.',
        bullets: [
          'Worked with managers to design and implement new SharePoint sites and update existing ones for each division.',
          'Contributed to migrating sites from an old version of SharePoint to a newer version.',
          'Managed SharePoint sites, including document libraries, site pages, and organizational standards.',
          'Contributed to a new company campaign to increase workplace efficiency.',
          'Trained employees on SharePoint and drafted company-wide bulletins.',
        ],
      },
    ],
    hidden: true,
  },
  {
    role: 'Office Support (Part-time)',
    company: 'Artech Images',
    logo: '/logos/artech-logo-black.svg',
    location: 'Richmond Hill, ON',
    start: 'Aug 2016',
    end: 'Aug 2018',
    summary: 'Customer-facing office support at a photography and imaging studio.',
    bullets: [
      'Built creative skills using Photoshop and Illustrator.',
      'Built organizational skills maintaining and archiving work orders.',
      'Developed communication skills greeting customers on arrival.',
    ],
    hidden: true,
  },
]

export type ProjectEntry = {
  name: string
  context: string
  /** Which chapter of life this came out of — one filter axis, separate from `context` (the freer subtitle text shown on the card). */
  experience: 'uOttawa · Masters (M.Eng)' | 'uOttawa · Bachelors (B.A.Sc)' | 'Professional' | 'Personal'
  /** The project's domain/subject matter — the other filter axis. */
  category:
    | 'Web Application'
    | 'Computer Vision & Machine Learning'
    | 'Robotics & Controls'
    | 'IoT & Industrial Systems'
    | 'Hardware & Electronics'
    | 'Research & Literature Review'
  url?: string
  linkLabel?: string
  tags: string[]
  bullets: string[]
  /** Path under /public to a project logo/mark, e.g. '/projects/factory-flow/logo.png'. Shown as a small badge on the project card; omitted entirely when unset. */
  logo?: string
  /** Paths under /public, e.g. '/projects/factory-flow/1.png'. Each project has its own folder under /public/projects — drop new resources there. */
  images?: string[]
}

export const projects: ProjectEntry[] = [
  {
    name: 'Factory Flow',
    logo: '/projects/factory-flow/logo.jpg',
    context: 'Personal Project',
    experience: 'Personal',
    category: 'IoT & Industrial Systems',
    url: 'https://factoryflow.io',
    linkLabel: 'Visit site',
    tags: ['Laravel', 'React', 'PostgreSQL', 'TimescaleDB', 'Electron', 'Docker'],
    bullets: [
      'Real-time manufacturing analytics platform ingesting and visualizing part counts, cycle times, downtime, and production performance.',
      'Cross-platform industrial gateway (Electron + React) supporting OPC-UA, MQTT, Modbus, and MTConnect, normalizing protocols into a unified API.',
      'Analytics pipelines and scheduled jobs turning raw machine events into KPIs — utilization, uptime, downtime, cycle efficiency, and OEE.',
      'Production infrastructure on Docker, Cloudflare Tunnels, PostgreSQL, and Redis, with observability, monitoring, payments, and docs via Nightwatch, Better Stack, Stripe, and Mintlify.',
    ],
    images: ['/projects/factory-flow/1.png'],
  },
  {
    name: 'Pose Estimation and Digit Recognition for Automated IC Chip Testing',
    context: 'University of Ottawa · M.Eng Project',
    experience: 'uOttawa · Masters (M.Eng)',
    category: 'Computer Vision & Machine Learning',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
    bullets: [
      'Built a classical machine-vision system to detect incorrectly placed IC microchips in a test socket using pose estimation, without relying on neural networks.',
      'Developed an automated digit recognition pipeline — classical segmentation plus ML for the final digit classification — to accelerate serial number extraction during testing.',
    ],
    images: ['/projects/ic-chip/ic-chip-placement-1.png', '/projects/ic-chip/ic-chip-placement-2.png', '/projects/ic-chip/ELG5163_Project-Report.pdf'],
  },
  {
    name: 'Automated Parts Sorting with Visual Feedback',
    context: 'University of Ottawa · ELG 5163 Machine Vision Course Project',
    experience: 'uOttawa · Masters (M.Eng)',
    category: 'Computer Vision & Machine Learning',
    tags: ['MATLAB', 'Computer Vision', 'Image Processing'],
    bullets: [
      'Built a classical machine-vision pipeline to detect, locate, and classify bottle caps by colour and radius relative to a reference frame, using segmentation and feature extraction rather than machine learning.',
      'Modeled and corrected camera radial distortion, then used colour- and scale-based reference-frame detection to align measurements before exporting results to a structured .dat file.',
    ],
    images: ['/projects/parts-sorting/parts-sorting.png', '/projects/parts-sorting/parts-sorting-report.pdf'],
  },
  {
    name: 'Sensor-Based Fuzzy Control of a 4-Legged Robot',
    context: 'University of Ottawa · M.Eng Project',
    experience: 'uOttawa · Masters (M.Eng)',
    category: 'Robotics & Controls',
    tags: ['MATLAB', 'Simulink', 'Fuzzy Logic', 'Robotics'],
    bullets: [
      'Designed and simulated a rigid-bodied quadruped robot that uses fuzzy logic and foot-mounted contact sensors to dynamically adjust leg positioning and stay stable on uneven terrain.',
      'Compared the fuzzy-logic controller against a fixed-motion design, showing improved stability and lower motor fatigue in Simulink Multibody simulations.',
    ],
    images: ['/projects/fuzzy-robot/fuzzy-robot.png', '/projects/fuzzy-robot/Sensor_based_Fuzzy_Control_of_a_Rigid_Bodied_4_Legged_Robot_M_Eng_Project_Adrian_Iannantuono_300071774.pdf', '/projects/fuzzy-robot/Sensor-based Fuzzy Control of a 4-Legged Robot - M.Eng. Project - Adrian Iannantuono 300071774.pdf'],
  },
  {
    name: 'Portable Air Quality Monitor',
    context: 'University of Ottawa · Capstone Project · with the City of Ottawa',
    experience: 'uOttawa · Bachelors (B.A.Sc)',
    category: 'IoT & Industrial Systems',
    tags: ['React', 'REST APIs', 'IoT'],
    bullets: [
      'Built a prototype portable pollution monitor measuring CO2, PM2.5, GPS location, temperature, and humidity, with built-in capability to charge personal devices.',
      'Built a custom backend REST API that automatically ingested sensor data for visualization in a React web app.',
    ],
    images: ['/projects/air-quality-monitor/1.svg', '/projects/air-quality-monitor/2.svg'],
  },
  {
    name: 'ParkAid: AI Street Parking Detection',
    context: 'University of Ottawa · Capstone Project',
    experience: 'uOttawa · Bachelors (B.A.Sc)',
    category: 'Computer Vision & Machine Learning',
    tags: ['Machine Learning', 'Computer Vision', 'React', 'REST APIs', 'SQL'],
    bullets: [
      'Trained an AI model to detect parking space availability using existing public security camera infrastructure.',
      'Built a backend REST API handling SQL queries and vehicle routing, with iOS, Android, and web clients built in React.',
    ],
    images: ['/projects/parkaid/1.svg', '/projects/parkaid/2.svg'],
  },
  {
    name: 'Quantum Dot Solar Cells: A Review of Next-Generation Photovoltaics',
    context: 'University of Ottawa · Literature Review',
    experience: 'uOttawa · Masters (M.Eng)',
    category: 'Research & Literature Review',
    tags: ['Photovoltaics', 'Research'],
    bullets: [
      'Reviewed how quantum dot solar cells use tunable bandgaps and multiple exciton generation to exceed the efficiency limits of conventional silicon cells.',
      'Analyzed key barriers to real-world performance, including manufacturing defects, toxic materials, and fabrication complexity.',
    ],
    images: ['/projects/quantum-dot/1.svg', '/projects/quantum-dot/2.svg'],
  },
  {
    name: 'Literature Review: Perovskite Semiconductors in Photovoltaic Cells',
    context: 'University of Ottawa · Literature Review',
    experience: 'uOttawa · Masters (M.Eng)',
    category: 'Research & Literature Review',
    tags: ['Photovoltaics', 'Research'],
    bullets: [
      'Reviewed the rapid efficiency gains of perovskite-based photovoltaic cells and the techniques driving them.',
      'Examined material instability challenges and future research directions, including curved and semi-transparent installations.',
    ],
    images: ['/projects/perovskite/1.svg', '/projects/perovskite/2.svg'],
  },
  {
    name: 'COVID-19 Screening Web Application',
    context: 'Personal Project',
    experience: 'Personal',
    category: 'Web Application',
    tags: ['JavaScript', 'HTML/CSS', 'Firebase'],
    bullets: [
      'Built a web-based COVID-19 screening application to help employees self-assess before coming into work.',
      'Used Firebase Auth, Realtime Database, and Cloud Functions for authentication and data handling.',
    ],
    images: ['/projects/covid-screening/1.svg', '/projects/covid-screening/2.svg'],
  },
  {
    name: 'Intervalometer for Sony Cameras',
    context: 'Personal Project',
    experience: 'Personal',
    category: 'Hardware & Electronics',
    tags: ['Arduino', 'PCB Design', 'Eagle'],
    bullets: [
      'Designed and prototyped a custom PCB that interfaces with Sony cameras to trigger photos at a set interval.',
      'Designed the circuit in Autodesk Eagle and hand-soldered the prototype board.',
    ],
    images: ['/projects/intervalometer/1.svg', '/projects/intervalometer/2.svg'],
  },
  {
    name: 'Order Manager Web Application',
    context: 'Full-Stack Project',
    experience: 'Professional',
    category: 'Web Application',
    tags: ['React', 'TypeScript', 'Ionic', 'Node.js', 'Express', 'SQL'],
    bullets: [
      "Built a React.js web application to replace a company's existing order management software.",
      'Built a REST API on Node.js (Express) backed by SQL to handle order queries.',
    ],
    images: ['/projects/order-manager/1.svg', '/projects/order-manager/2.svg'],
  },
  {
    name: 'Portfolio Website',
    logo: '/favicon.svg',
    context: 'Personal Project',
    experience: 'Personal',
    category: 'Web Application',
    url: 'https://adrianiannantuono.ca',
    linkLabel: 'Visit site',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    bullets: [
      'This site — a React/TypeScript/Vite portfolio with a resume-driven data layer, live search and filtering, and light/dark theming.',
      'Built with Radix UI primitives and Tailwind CSS, deployed to a custom domain via GitHub Actions.',
    ],
    images: ['/projects/portfolio-website/1.png'],
  },
]

export type Skill = {
  name: string
  /** Extra context shown when the skill is expanded — what it was for, not just that it was used. */
  description?: string
  /** Companies or projects where this was used in practice, most recent first. */
  usedIn?: string[]
}

/** Loosely compares a skill name against bullet text — case/punctuation/plural-insensitive. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export type SkillContext = {
  logo?: string
  url?: string
  /** The specific bullet(s) mentioning this skill, falling back to the entry's summary/first bullet. */
  bullets: string[]
  /** Which section the place lives in — lets the UI jump to the right one when clicked. */
  kind: 'experience' | 'project'
}

/** Finds what was actually done with a skill at a given company/project, by matching it against that
 *  entry's bullets — surfaces the specific accomplishment instead of just the place name. */
export function getSkillContext(skillName: string, place: string): SkillContext | undefined {
  const needle = normalize(skillName)
  const needleSingular = needle.endsWith('s') ? needle.slice(0, -1) : needle
  const matchesBullet = (bullet: string) => {
    const haystack = normalize(bullet)
    return haystack.includes(needle) || haystack.includes(needleSingular)
  }

  const exp = experience.find((entry) => entry.company === place)
  if (exp) {
    const matched = exp.bullets.filter(matchesBullet)
    return {
      logo: exp.logo,
      url: exp.companyUrl,
      bullets: matched.length > 0 ? matched : [exp.summary],
      kind: 'experience',
    }
  }

  const project = projects.find((entry) => entry.name === place)
  if (project) {
    const matched = project.bullets.filter(matchesBullet)
    return {
      logo: project.logo,
      url: project.url,
      bullets: matched.length > 0 ? matched : [project.bullets[0]],
      kind: 'project',
    }
  }

  return undefined
}

export type SkillGroup = {
  category: string
  blurb: string
  items: Skill[]
}

const curatedSkills: SkillGroup[] = [
  {
    category: 'Backend',
    blurb: 'APIs and services behind production SaaS and industrial platforms.',
    items: [
      {
        name: 'Laravel',
        description: 'Primary framework for production APIs, admin tooling, and background jobs.',
        usedIn: ['Fractionl', 'Factory Flow'],
      },
      { name: 'PHP', description: 'Language behind the Laravel applications I maintain.', usedIn: ['Fractionl'] },
      {
        name: 'Node.js',
        description: 'Real-time APIs for collecting and serving industrial machine data.',
        usedIn: ['Magna International'],
      },
      {
        name: 'REST APIs',
        description: 'Designed and secured integrations across internal and third-party systems.',
        usedIn: ['Fractionl', 'Magna International'],
      },
      { name: 'GraphQL' },
      {
        name: 'Typesense',
        description: 'Schema design, indexing, and normalization for fast catalog search.',
        usedIn: ['Fractionl'],
      },
    ],
  },
  {
    category: 'Frontend',
    blurb: 'Interfaces for dashboards, catalogs, and live operational data.',
    items: [
      {
        name: 'React',
        description: 'Dashboards and product UIs, from live machine metrics to part catalogs.',
        usedIn: ['Magna International', 'Factory Flow'],
      },
      {
        name: 'Vue.js',
        description: "Frontend for a B2B SaaS platform's search, pricing, and ordering flows.",
        usedIn: ['Fractionl'],
      },
      { name: 'TypeScript' },
      { name: 'JavaScript', usedIn: ['Patio Concepts'] },
      { name: 'HTML/CSS', usedIn: ['Patio Concepts'] },
    ],
  },
  {
    category: 'Databases',
    blurb: 'Relational, time-series, and search-optimized storage.',
    items: [
      { name: 'PostgreSQL', usedIn: ['Factory Flow'] },
      {
        name: 'TimescaleDB',
        description: 'Time-series storage for high-frequency manufacturing metrics.',
        usedIn: ['Factory Flow'],
      },
      { name: 'MySQL' },
      {
        name: 'InfluxDB',
        description: 'Stored vibration and sensor data streamed from shop-floor equipment.',
        usedIn: ['Magna International'],
      },
      { name: 'SQL', usedIn: ['Patio Concepts'] },
    ],
  },
  {
    category: 'Cloud & DevOps',
    blurb: 'Shipping, testing, and observability for production systems.',
    items: [
      { name: 'Docker', usedIn: ['Factory Flow'] },
      { name: 'Git' },
      {
        name: 'GitHub Actions',
        description: 'CI pipelines validating critical workflows on every pull request.',
        usedIn: ['Fractionl'],
      },
      { name: 'CircleCI' },
      {
        name: 'Laravel Nightwatch',
        description: 'Production monitoring and observability for a self-hosted SaaS platform.',
        usedIn: ['Factory Flow'],
      },
      {
        name: 'AWS (S3)',
        description: 'Automated large-scale dataset management during an IT co-op term.',
        usedIn: ['Magna International'],
      },
    ],
  },
  {
    category: 'Industrial Systems',
    blurb: 'Protocols connecting shop-floor machines to software.',
    items: [
      { name: 'OPC-UA', usedIn: ['Magna International', 'Factory Flow'] },
      { name: 'MQTT', usedIn: ['Magna International', 'Factory Flow'] },
      { name: 'Modbus', usedIn: ['Magna International', 'Factory Flow'] },
      { name: 'MTConnect', usedIn: ['Magna International', 'Factory Flow'] },
      { name: 'Node-RED' },
    ],
  },
  {
    category: 'Professional',
    blurb: 'How I work day to day.',
    items: [
      {
        name: 'Production Debugging',
        description: 'Tracing and fixing issues in live systems without breaking existing workflows.',
        usedIn: ['Fractionl'],
      },
      {
        name: 'System Design',
        description: 'Owned end-to-end architecture for major features, like a roles system and bidirectional sync.',
        usedIn: ['Fractionl'],
      },
      {
        name: 'Automated Testing',
        description: 'Led adoption of PHPUnit, Laravel Dusk, and CI pipelines.',
        usedIn: ['Fractionl'],
      },
      {
        name: 'Technical Documentation',
        description: 'API specs, lab guides, and tool documentation for technical and non-technical audiences.',
        usedIn: ['Magna International', 'University of Ottawa'],
      },
    ],
  },
]

/**
 * Category to file a tag under when it turns up as an Experience/Project tag but has no
 * hand-written entry (with description) in `curatedSkills` above. Keeps the Skills section
 * a complete, auto-updating picture instead of one that silently drifts out of date.
 */
const autoSkillCategory: Record<string, string> = {
  IoT: 'Industrial Systems',
  Grafana: 'Cloud & DevOps',
  Webpack: 'Cloud & DevOps',
  Firebase: 'Cloud & DevOps',
  'Nuxt.js': 'Frontend',
  'Three.js': 'Frontend',
  Electron: 'Frontend',
  Ionic: 'Frontend',
  Vite: 'Frontend',
  'Tailwind CSS': 'Frontend',
  Python: 'Backend',
  Stripe: 'Backend',
  Shopify: 'Backend',
  Express: 'Backend',
  OpenCV: 'Backend',
  Arduino: 'Industrial Systems',
  'PCB Design': 'Industrial Systems',
  Eagle: 'Industrial Systems',
  'Computer Vision': 'Professional',
  'Machine Learning': 'Professional',
  MATLAB: 'Professional',
  Simulink: 'Professional',
  'Fuzzy Logic': 'Professional',
  Robotics: 'Professional',
  Photovoltaics: 'Professional',
  Research: 'Professional',
}

function buildSkills(): SkillGroup[] {
  const groups = curatedSkills.map((group) => ({ ...group, items: group.items.map((item) => ({ ...item })) }))
  const known = new Set(groups.flatMap((group) => group.items.map((item) => item.name)))

  const sources = new Map<string, Set<string>>()
  const record = (tag: string, source: string) => {
    if (!sources.has(tag)) sources.set(tag, new Set())
    sources.get(tag)!.add(source)
  }

  for (const entry of experience) {
    entry.tags?.forEach((tag) => record(tag, entry.company))
    entry.earlierPositions?.forEach((position) => position.tags?.forEach((tag) => record(tag, entry.company)))
  }
  for (const project of projects) {
    project.tags.forEach((tag) => record(tag, project.name))
  }

  const other: Skill[] = []
  for (const [tag, usedIn] of sources) {
    if (known.has(tag)) continue
    known.add(tag)
    const skill: Skill = { name: tag, usedIn: [...usedIn] }
    const group = groups.find((g) => g.category === autoSkillCategory[tag])
    if (group) group.items.push(skill)
    else other.push(skill)
  }

  if (other.length > 0) {
    groups.push({
      category: 'Other',
      blurb: 'Additional tools picked up from projects and experience.',
      items: other,
    })
  }

  return groups
}

/** Backend, Frontend, etc. plus whatever else shows up as a Project/Experience tag — always a full picture. */
export const skills: SkillGroup[] = buildSkills()

export type Course = {
  code: string
  name: string
  category: string
  /** Filled in later, per course, with more detail. */
  description?: string
  /** Key topics/tools covered, shown as chips. */
  tags?: string[]
  /** Exact `ProjectEntry.name` of the project this course produced, if any — links to it in the Projects section. */
  project?: string
}

export type EducationEntry = {
  degree: string
  school: string
  logo?: string
  location: string
  start: string
  end: string
  detail: string
  highlights?: string[]
  courses?: Course[]
}

export const education: EducationEntry[] = [
  {
    degree: "Master's in Electrical & Computer Engineering (M.Eng)",
    school: 'University of Ottawa',
    logo: '/logos/uottawa.svg',
    location: 'Ottawa, ON',
    start: '2023',
    end: '2025',
    detail: 'GPA: 3.9 / 4.0',
    highlights: [
      'Graduate coursework and research in Electrical & Computer Engineering.',
      'Maintained a 3.9 / 4.0 GPA throughout the program.',
    ],
    courses: [
      {
        code: 'ELG5301',
        name: 'Professional Skills and Responsibility',
        category: 'Professional Development',
        description:
          'Team-based projects and workshops building professional skills — communication, team leadership, and project management — plus modules on technical writing, academic integrity, and literature review.',
        tags: ['Technical Writing', 'Project Management', 'Team Leadership'],
      },
      {
        code: 'GNG5140',
        name: 'Engineering Design',
        category: 'Design & Project',
        description:
          'Open-ended, client-based engineering design course spanning client empathy, prototyping, and testing, with a strong emphasis on teamwork and real-world societal needs.',
        tags: ['Design Thinking', 'Prototyping', 'Client Projects'],
        project: 'Portable Air Quality Monitor',
      },
      {
        code: 'ELG5901',
        name: 'Electrical Engineering Project',
        category: 'Design & Project',
        description:
          'Independent research project in electrical engineering, culminating in an in-depth written report and oral presentation.',
        tags: ['Research', 'Technical Writing'],
        project: 'Sensor-Based Fuzzy Control of a 4-Legged Robot',
      },
      {
        code: 'ELG5378',
        name: 'Image Processing and Image Communications',
        category: 'Computer Vision & Imaging',
        description:
          'Image acquisition, sampling, and discrete representations, covering transformation, enhancement, restoration, analysis, and lossless/lossy image and video compression.',
        tags: ['Image Processing', 'Computer Vision', 'Video Compression'],
      },
      {
        code: 'ELG5163',
        name: 'Machine Vision',
        category: 'Computer Vision & Imaging',
        description:
          'Structured light and stereo ranging, image segmentation and edge detection, 3-D scene understanding, and motion detection for manufacturing applications.',
        tags: ['Machine Vision', 'Computer Vision', 'Robotics'],
        project: 'Pose Estimation and Digit Recognition for Automated IC Chip Testing',
      },
      {
        code: 'ELG6397',
        name: 'Solar Cells - Principles, Materials, Systems and Operation',
        category: 'Photovoltaics & Semiconductor Devices',
        description:
          'Solar radiation and photovoltaic cell technologies — crystalline silicon, thin-film, concentrator, organic, and dye-sensitized cells — plus system design, testing, and economics.',
        tags: ['Photovoltaics', 'Renewable Energy', 'Materials Science'],
        project: 'Quantum Dot Solar Cells: A Review of Next-Generation Photovoltaics',
      },
      {
        code: 'ELG6380',
        name: 'Theory of Semiconductor Devices',
        category: 'Photovoltaics & Semiconductor Devices',
        description:
          'Equilibrium and non-equilibrium carrier transport theory, PN junctions, bipolar transistors, and field-effect devices, including charge-control modeling and transistor performance limits.',
        tags: ['Semiconductor Physics', 'Device Modeling'],
        project: 'Literature Review: Perovskite Semiconductors in Photovoltaic Cells',
      },
      {
        code: 'ELG7132',
        name: 'Topics in Electronics I',
        category: 'Electronics',
        description:
          'Special topics course on current developments in electronics — this offering focused on electronics packaging and manufacturing.',
        tags: ['Electronics Packaging', 'Manufacturing'],
      },
    ],
  },
  {
    degree: "Bachelor's in Computer Engineering (B.A.Sc)",
    school: 'University of Ottawa',
    logo: '/logos/uottawa.svg',
    location: 'Ottawa, ON',
    start: '2018',
    end: '2023',
    detail: 'Co-op, graduated with distinction',
    highlights: [
      'Completed a co-op program with industry work terms, including a role at Patio Concepts.',
      'Capstone and design projects in computer vision and robotics — see Projects.',
      'Graduated with distinction.',
    ],
    courses: [
      // Computer Engineering
      {
        code: 'CEG2136',
        name: 'Computer Architecture I',
        category: 'Computer Engineering',
        description:
          'Digital computer design, register transfer and microoperations, instruction set and CPU design, pipelining, and memory/I-O subsystem design.',
        tags: ['Computer Architecture', 'CPU Design', 'Digital Logic'],
      },
      {
        code: 'CEG3136',
        name: 'Computer Architecture II',
        category: 'Computer Engineering',
        description:
          'Microprocessor architecture, CISC and RISC design, microcontrollers, embedded systems, and hardware-software codesign.',
        tags: ['Microprocessors', 'Embedded Systems'],
      },
      {
        code: 'CEG4136',
        name: 'Computer Architecture III',
        category: 'Computer Engineering',
        description:
          'Multiprocessor systems, interconnection networks, parallel programming models (PRAM, message-passing), and performance measurement.',
        tags: ['Parallel Computing', 'Multiprocessor Systems'],
      },
      {
        code: 'CEG3156',
        name: 'Computer Systems Design',
        category: 'Computer Engineering',
        description:
          'Computer design representations, hardware description languages, advanced processor design methodologies, and memory/I-O interconnection.',
        tags: ['HDL', 'Processor Design'],
      },
      {
        code: 'ITI1100',
        name: 'Digital Systems I',
        category: 'Computer Engineering',
        description:
          'Number systems, Boolean algebra, logic minimization, and design of combinational and basic sequential digital circuits.',
        tags: ['Digital Logic', 'Boolean Algebra'],
      },
      {
        code: 'CEG3155',
        name: 'Digital Systems II',
        category: 'Computer Engineering',
        description:
          'Finite state machine models, sequential circuit design, hardware description languages, and programmable logic implementation.',
        tags: ['Digital Logic', 'HDL', 'FSM Design'],
      },
      {
        code: 'CEG4166',
        name: 'Real-Time Systems Design',
        category: 'Computer Engineering',
        description:
          'Characteristics and structure of real-time systems, reliability and fault tolerance, concurrency, scheduling, and design methodologies.',
        tags: ['Real-Time Systems', 'Scheduling'],
      },
      {
        code: 'CEG3185',
        name: 'Introduction to Data Communication and Networking',
        category: 'Computer Engineering',
        description:
          'Physical and data link layer concepts, information theory, medium access control, switching, routing, and LAN/wireless architectures.',
        tags: ['Networking', 'Data Communications'],
      },
      {
        code: 'CEG4912',
        name: 'Computer Engineering Design Project I',
        category: 'Computer Engineering',
        description:
          'First iteration of a team-based computer engineering design project for an external client, covering management, design, and prototyping.',
        tags: ['Capstone Project', 'Project Management'],
        project: 'ParkAid: AI Street Parking Detection',
      },
      {
        code: 'CEG4913',
        name: 'Computer Engineering Design Project II',
        category: 'Computer Engineering',
        description:
          'Completion of the CEG4912 design project, including implementation, testing, a final report, and class presentation.',
        tags: ['Capstone Project', 'Technical Writing'],
        project: 'ParkAid: AI Street Parking Detection',
      },
      // Software & Programming
      {
        code: 'SEG3125',
        name: 'Analysis and Design of User Interfaces',
        category: 'Software & Programming',
        description:
          'Psychological principles of HCI, usability evaluation, task analysis, prototyping, and user-centered design of software interfaces.',
        tags: ['UI/UX', 'HCI', 'Usability Testing'],
      },
      {
        code: 'SEG2105',
        name: 'Introduction to Software Engineering',
        category: 'Software & Programming',
        description:
          'Software engineering principles of requirements, design and testing, object-oriented analysis with UML, and client-server architecture.',
        tags: ['Software Engineering', 'UML'],
      },
      {
        code: 'SEG2106',
        name: 'Software Construction',
        category: 'Software & Programming',
        description:
          'Low-level software design, grammar/parsing theory, formal languages, concurrency, and model-driven construction tools.',
        tags: ['Parsing', 'Formal Languages', 'Concurrency'],
      },
      {
        code: 'SEG3102',
        name: 'Software Design and Architecture',
        category: 'Software & Programming',
        description:
          'Design patterns, middleware architectures, distributed systems design, and evaluation of internal software qualities.',
        tags: ['Design Patterns', 'Distributed Systems', 'System Design'],
      },
      {
        code: 'ITI1120',
        name: 'Introduction to Computing I',
        category: 'Software & Programming',
        description:
          'Algorithm design, software engineering fundamentals, control structures, arrays, and introductory object concepts in programming.',
        tags: ['Algorithms', 'Programming Fundamentals'],
      },
      {
        code: 'ITI1121',
        name: 'Introduction to Computing II',
        category: 'Software & Programming',
        description:
          'Object-oriented programming, information hiding and encapsulation, linked lists, stacks, queues, binary search trees, and recursion.',
        tags: ['OOP', 'Data Structures'],
      },
      {
        code: 'CSI2110',
        name: 'Data Structures & Algorithms',
        category: 'Software & Programming',
        description:
          'Abstract data types, complexity analysis, trees, balanced trees, hashing, sorting, graph algorithms, and string pattern matching.',
        tags: ['Data Structures', 'Algorithms', 'Graph Theory'],
      },
      {
        code: 'CSI3131',
        name: 'Operating Systems',
        category: 'Software & Programming',
        description:
          'Process management and scheduling, concurrency, memory and virtual memory management, file systems, and I-O.',
        tags: ['Operating Systems', 'Concurrency', 'Memory Management'],
      },
      // Electrical Engineering & Electronics
      {
        code: 'ELG2138',
        name: 'Circuit Theory I',
        category: 'Electrical Engineering & Electronics',
        description:
          "DC and AC circuit analysis, passive elements, Kirchhoff's laws, circuit theorems, and transient response of RL/RC circuits.",
        tags: ['Circuit Analysis'],
      },
      {
        code: 'ELG2137',
        name: 'Circuit Theory II',
        category: 'Electrical Engineering & Electronics',
        description:
          'Op-amp analysis, RLC circuit responses via differential equations and Laplace transforms, two-port networks, and filter frequency response.',
        tags: ['Circuit Analysis', 'Filter Design'],
      },
      {
        code: 'ELG2136',
        name: 'Electronics I',
        category: 'Electrical Engineering & Electronics',
        description:
          'Semiconductor physics, diode and BJT/MOSFET circuits, basic digital logic, and power electronics converters.',
        tags: ['Semiconductor Physics', 'Power Electronics'],
      },
      {
        code: 'ELG3136',
        name: 'Electronics II',
        category: 'Electrical Engineering & Electronics',
        description:
          'Differential and multistage amplifiers, s-domain frequency response, feedback topologies, and Class A/B/AB power output stages.',
        tags: ['Amplifier Design', 'Power Electronics'],
      },
      {
        code: 'ELG3155',
        name: 'Introduction to Control Systems',
        category: 'Electrical Engineering & Electronics',
        description:
          'Dynamic system modeling, Laplace transforms, transfer functions, stability analysis, root locus, Bode plots, and controller design.',
        tags: ['Control Systems', 'Stability Analysis'],
      },
      {
        code: 'ELG3125',
        name: 'Signal and System Analysis',
        category: 'Electrical Engineering & Electronics',
        description:
          'Continuous- and discrete-time signals and systems, convolution, Fourier series/transforms, sampling, and Laplace/Z-transform analysis.',
        tags: ['Signal Processing', 'Fourier Analysis'],
      },
      {
        code: 'ELG2911',
        name: 'Professional Practice in Information Technology and Engineering',
        category: 'Electrical Engineering & Electronics',
        description:
          'History of the engineering profession and principles of professional practice, with ethical, societal, and legal obligations of engineers.',
        tags: ['Engineering Ethics', 'Professional Practice'],
      },
      // Mathematics
      {
        code: 'MAT1320',
        name: 'Calculus I',
        category: 'Mathematics',
        description:
          'Limits, derivative rules, optimization, linear approximation, the definite integral, and techniques of integration.',
        tags: ['Calculus'],
      },
      {
        code: 'MAT1322',
        name: 'Calculus II',
        category: 'Mathematics',
        description:
          'Improper integrals, applications of the integral, separable differential equations, sequences, series, and multivariable partial derivatives.',
        tags: ['Calculus', 'Differential Equations'],
      },
      {
        code: 'MAT2322',
        name: 'Calculus III',
        category: 'Mathematics',
        description:
          "Extrema of multivariable functions, multiple integration, vector fields, line and surface integrals, and the theorems of Stokes and Gauss.",
        tags: ['Multivariable Calculus', 'Vector Calculus'],
      },
      {
        code: 'MAT1348',
        name: 'Discrete Mathematics for Computing',
        category: 'Mathematics',
        description:
          'Propositional logic, sets, functions, relations, counting techniques, proof methods, and graph theory for computing applications.',
        tags: ['Discrete Math', 'Graph Theory'],
      },
      {
        code: 'MAT1341',
        name: 'Introduction to Linear Algebra',
        category: 'Mathematics',
        description:
          'Vector spaces, linear independence and bases, systems of linear equations, matrix algebra, eigenvalues/eigenvectors, and linear transformations.',
        tags: ['Linear Algebra'],
      },
      {
        code: 'MAT2384',
        name: 'Ordinary Differential Equations & Numerical Methods',
        category: 'Mathematics',
        description:
          'First- and higher-order differential equations, Laplace transforms, series solutions, and numerical methods for ODEs.',
        tags: ['Differential Equations', 'Numerical Methods'],
      },
      {
        code: 'MAT2377',
        name: 'Probability and Statistics for Engineers',
        category: 'Mathematics',
        description:
          'Probability distributions, statistical inference, hypothesis testing, and regression applied to engineering problems.',
        tags: ['Statistics', 'Probability'],
      },
      // Physics & Science
      {
        code: 'PHY1124',
        name: 'Fundamentals of Physics for Engineers',
        category: 'Physics & Science',
        description:
          "Kinematics, Newton's laws, work and energy, electrostatics and Gauss's law, magnetic fields and forces, and an intro to special relativity.",
        tags: ['Physics', 'Mechanics'],
      },
      {
        code: 'PHY2323',
        name: 'Electricity and Magnetism',
        category: 'Physics & Science',
        description:
          "Electrostatics, Gauss's law, conductors and dielectrics, steady currents, magnetostatics, and Maxwell's equations.",
        tags: ['Electromagnetism'],
      },
      {
        code: 'PHY2390',
        name: 'Astronomy',
        category: 'Physics & Science',
        description:
          'Celestial sphere, gravity and motion, telescopes and detectors, planets and the Solar System, stars, galaxies, black holes, and cosmology.',
        tags: ['Astronomy'],
      },
      {
        code: 'CHM1311',
        name: 'Principles of Chemistry',
        category: 'Physics & Science',
        description:
          'Atomic structure, chemical bonding, stoichiometry, gas laws, thermochemistry and kinetics, equilibrium, acids/bases, and solubility.',
        tags: ['Chemistry'],
      },
      // Engineering Design & Professional Skills
      {
        code: 'GNG1105',
        name: 'Engineering Mechanics',
        category: 'Engineering Design & Professional Skills',
        description:
          'Statics of particles and rigid bodies, free body diagrams, truss/frame/machine structures, and rectilinear and curvilinear motion.',
        tags: ['Statics', 'Mechanics'],
      },
      {
        code: 'GNG2101',
        name: 'Introduction to Product Development and Management for Engineers',
        category: 'Engineering Design & Professional Skills',
        description:
          'Hands-on, client-based product development covering economics, sustainability, project management, business models, and IP rights.',
        tags: ['Product Development', 'Project Management'],
      },
      {
        code: 'ENG1112',
        name: 'Technical Report Writing',
        category: 'Engineering Design & Professional Skills',
        description:
          'Practice writing technical reports, covering exposition, argumentation, and presentation of technical data.',
        tags: ['Technical Writing'],
      },
      {
        code: 'ADM1100',
        name: 'Introduction to Business',
        category: 'Engineering Design & Professional Skills',
        description:
          'Functions of business and management, including planning, organizing, leading, and controlling organizational resources.',
        tags: ['Business Fundamentals', 'Management'],
      },
      // Arts & Electives
      {
        code: 'SOC1101',
        name: 'Principles of Sociology',
        category: 'Arts & Electives',
        description:
          "Core fields, concepts, and methods of sociological analysis, and sociology's relation to the other social sciences.",
        tags: ['Sociology'],
      },
      {
        code: 'PHI2394',
        name: 'Scientific Thought and Social Values',
        category: 'Arts & Electives',
        description:
          'The nature of scientific thought and its relationships with culture, religion, politics, technology, and society.',
        tags: ['Philosophy of Science'],
      },
      {
        code: 'CLA2103',
        name: 'The Republic',
        category: 'Arts & Electives',
        description: 'General history of Rome from its founding in 753 BC to the death of Caesar in 44 BC.',
        tags: ['Roman History'],
      },
    ],
  },
]
