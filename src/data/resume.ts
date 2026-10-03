export const profile = {
  name: 'Adrian Iannantuono',
  credentials: 'M.Eng, B.A.Sc',
  title: 'Software Engineer',
  location: 'Richmond Hill, ON',
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
  /** Earlier positions at the same company, most recent first — shown alongside the primary role when expanded. */
  earlierPositions?: Position[]
  /** Tucked behind the "Show earlier experience" toggle instead of shown by default. */
  hidden?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Software Developer',
    company: 'Fractionl',
    location: 'Richmond Hill, ON',
    start: 'Sep 2025',
    end: 'Present',
    summary:
      'Building full-stack features for a B2B SaaS platform — fast search, pricing, and order workflows.',
    bullets: [
      'Developed and enhanced full-stack features for a production B2B SaaS platform using Laravel and Vue.js, enabling fast product search, dynamic pricing, and ordering workflows across catalogs containing thousands of vehicle parts.',
      'Designed and maintained secure REST API integrations for product, inventory, and order synchronization across internal systems, QuickBooks, and third-party APIs (Freightcom, OpenAI translations, Chatwoot).',
      'Built and optimized Typesense search infrastructure, including schema design, indexing pipelines, and data normalization, for fast, accurate search across large product catalogs.',
      'Led adoption of automated testing and CI/CD by implementing PHPUnit, Laravel Dusk, and GitHub Actions pipelines, validating critical workflows on every pull request.',
      'Owned end-to-end delivery of major features, including an application-wide user roles system and a migration from one-way to bidirectional API synchronization.',
      'Leveraged AI-assisted development (Claude Code, OpenAI Codex) to accelerate implementation and debugging while maintaining ownership of architecture, testing, security, and code quality.',
    ],
  },
  {
    role: 'IoT Developer',
    company: 'Magna International',
    logo: '/logos/magna.svg',
    location: 'Vaughan, ON',
    start: 'Sep 2024',
    end: 'Sep 2025',
    summary:
      'Connected hundreds of manufacturing machines to real-time dashboards and predictive analytics.',
    bullets: [
      'Built and documented RESTful APIs with Node.js and OpenAPI, integrating MQTT, OPC-UA, Modbus, and MTConnect to collect real-time machine data for performance monitoring and predictive maintenance.',
      'Integrated IFM vibration sensors via vendor SDKs into a real-time monitoring system (C++, WebSockets, Node.js, InfluxDB) that triggered alerts from Fourier-transform threshold analysis.',
      'Developed interactive dashboards in React and Grafana to visualize live production metrics and machine status across manufacturing operations.',
      'Built predictive analytics in Python (scikit-learn) to forecast CNC tool wear and remaining tool life, helping operators schedule maintenance before failures occurred.',
      'Led deployment of industrial connectivity (OPC-UA, Modbus, MQTT) across hundreds of manufacturing machines, partnering with IT on network segmentation and NAT strategies.',
    ],
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
    summary: 'Maintained and grew e-commerce sites serving 15k+ visitors a month.',
    bullets: [
      'Maintained and enhanced e-commerce websites generating 15k+ monthly visits.',
      'Improved a 3D product viewer by optimizing it for mobile and dynamically generating product dimensions.',
      'Led development of a custom application to parse and store existing site content ahead of a website upgrade, reducing migration errors, and integrated APIs to replace the existing payment solution.',
      'Ran weekly sprints and gave managers regular updates on progress and obstacles.',
      'Built a script to parse and save website content, reducing the risk of human error when migrating it to the company’s new site.',
      'Used JavaScript (Nuxt.js, Three.js), HTML/CSS, Bootstrap, Python, SQL, PHP (Laravel), Stripe/Shopify/Snipcart APIs, Webpack, and Netlify.',
    ],
  },
  {
    role: 'IT Student (Co-op)',
    company: 'Magna International',
    logo: '/logos/magna.svg',
    location: 'Vaughan, ON',
    start: 'May 2020',
    end: 'Aug 2020',
    summary: 'IT infrastructure projects and AWS automation during a co-op term.',
    bullets: [
      'Managed IT infrastructure refresh projects and supported the customer throughout the process.',
      'Met with managers and implemented changes to the service management system.',
      'Designed and built a library of Python scripts to manage large datasets in AWS S3 environments.',
      'Worked with engineers to optimize algorithms for efficiency and cost savings.',
      'Trained employees and documented how to use the AWS management tools.',
    ],
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
  url?: string
  linkLabel?: string
  tags: string[]
  bullets: string[]
  /** Paths under /public, e.g. '/projects/factory-flow-1.png'. Empty until real screenshots are added. */
  images?: string[]
}

export const projects: ProjectEntry[] = [
  {
    name: 'Factory Flow',
    context: 'Personal Project',
    url: 'https://factoryflow.io',
    linkLabel: 'Visit site',
    tags: ['Laravel', 'React', 'PostgreSQL', 'TimescaleDB', 'Electron', 'Docker'],
    bullets: [
      'Real-time manufacturing analytics platform ingesting and visualizing part counts, cycle times, downtime, and production performance.',
      'Cross-platform industrial gateway (Electron + React) supporting OPC-UA, MQTT, Modbus, and MTConnect, normalizing protocols into a unified API.',
      'Analytics pipelines and scheduled jobs turning raw machine events into KPIs — utilization, uptime, downtime, cycle efficiency, and OEE.',
      'Production infrastructure on Docker, Cloudflare Tunnels, PostgreSQL, and Redis, with observability, monitoring, payments, and docs via Nightwatch, Better Stack, Stripe, and Mintlify.',
    ],
    images: [],
  },
  {
    name: 'Pose Estimation and Digit Recognition for Automated IC Chip Testing',
    context: 'University of Ottawa · M.Eng Project',
    tags: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning'],
    bullets: [
      'Built a classical machine-vision system to detect incorrectly placed IC microchips in a test socket using pose estimation, without relying on neural networks.',
      'Developed an automated digit recognition pipeline — classical segmentation plus ML for the final digit classification — to accelerate serial number extraction during testing.',
    ],
    images: [],
  },
  {
    name: 'Sensor-Based Fuzzy Control of a 4-Legged Robot',
    context: 'University of Ottawa · M.Eng Project',
    tags: ['MATLAB', 'Simulink', 'Fuzzy Logic', 'Robotics'],
    bullets: [
      'Designed and simulated a rigid-bodied quadruped robot that uses fuzzy logic and foot-mounted contact sensors to dynamically adjust leg positioning and stay stable on uneven terrain.',
      'Compared the fuzzy-logic controller against a fixed-motion design, showing improved stability and lower motor fatigue in Simulink Multibody simulations.',
    ],
    images: [],
  },
  {
    name: 'Quantum Dot Solar Cells: A Review of Next-Generation Photovoltaics',
    context: 'University of Ottawa · Literature Review',
    tags: ['Photovoltaics', 'Research'],
    bullets: [
      'Reviewed how quantum dot solar cells use tunable bandgaps and multiple exciton generation to exceed the efficiency limits of conventional silicon cells.',
      'Analyzed key barriers to real-world performance, including manufacturing defects, toxic materials, and fabrication complexity.',
    ],
    images: [],
  },
  {
    name: 'Literature Review: Perovskite Semiconductors in Photovoltaic Cells',
    context: 'University of Ottawa · Literature Review',
    tags: ['Photovoltaics', 'Research'],
    bullets: [
      'Reviewed the rapid efficiency gains of perovskite-based photovoltaic cells and the techniques driving them.',
      'Examined material instability challenges and future research directions, including curved and semi-transparent installations.',
    ],
    images: [],
  },
  {
    name: 'COVID-19 Screening Web Application',
    context: 'Personal Project',
    tags: ['JavaScript', 'HTML/CSS', 'Firebase'],
    bullets: [
      'Built a web-based COVID-19 screening application to help employees self-assess before coming into work.',
      'Used Firebase Auth, Realtime Database, and Cloud Functions for authentication and data handling.',
    ],
    images: [],
  },
  {
    name: 'Intervalometer for Sony Cameras',
    context: 'Personal Project',
    tags: ['Arduino', 'PCB Design', 'Eagle'],
    bullets: [
      'Designed and prototyped a custom PCB that interfaces with Sony cameras to trigger photos at a set interval.',
      'Designed the circuit in Autodesk Eagle and hand-soldered the prototype board.',
    ],
    images: [],
  },
  {
    name: 'Order Manager Web Application',
    context: 'Full-Stack Project',
    tags: ['React', 'TypeScript', 'Ionic', 'Node.js', 'Express', 'SQL'],
    bullets: [
      "Built a React.js web application to replace a company's existing order management software.",
      'Built a REST API on Node.js (Express) backed by SQL to handle order queries.',
    ],
    images: [],
  },
]

export const skills: { category: string; items: string[] }[] = [
  { category: 'Backend', items: ['Laravel', 'PHP', 'Node.js', 'REST APIs', 'GraphQL', 'Typesense'] },
  { category: 'Frontend', items: ['React', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML/CSS'] },
  { category: 'Databases', items: ['PostgreSQL', 'TimescaleDB', 'MySQL', 'InfluxDB', 'SQL'] },
  { category: 'Cloud & DevOps', items: ['Docker', 'Git', 'GitHub Actions', 'CircleCI', 'Laravel Nightwatch', 'AWS (S3)'] },
  { category: 'Industrial Systems', items: ['OPC-UA', 'MQTT', 'Modbus', 'MTConnect', 'Node-RED'] },
  { category: 'Professional', items: ['Production Debugging', 'System Design', 'Automated Testing', 'Technical Documentation'] },
]

export type Course = {
  code: string
  name: string
  category: string
  /** Filled in later, per course, with more detail. */
  description?: string
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
      },
      {
        code: 'CEG3136',
        name: 'Computer Architecture II',
        category: 'Computer Engineering',
        description:
          'Microprocessor architecture, CISC and RISC design, microcontrollers, embedded systems, and hardware-software codesign.',
      },
      {
        code: 'CEG4136',
        name: 'Computer Architecture III',
        category: 'Computer Engineering',
        description:
          'Multiprocessor systems, interconnection networks, parallel programming models (PRAM, message-passing), and performance measurement.',
      },
      {
        code: 'CEG3156',
        name: 'Computer Systems Design',
        category: 'Computer Engineering',
        description:
          'Computer design representations, hardware description languages, advanced processor design methodologies, and memory/I-O interconnection.',
      },
      {
        code: 'ITI1100',
        name: 'Digital Systems I',
        category: 'Computer Engineering',
        description:
          'Number systems, Boolean algebra, logic minimization, and design of combinational and basic sequential digital circuits.',
      },
      {
        code: 'CEG3155',
        name: 'Digital Systems II',
        category: 'Computer Engineering',
        description:
          'Finite state machine models, sequential circuit design, hardware description languages, and programmable logic implementation.',
      },
      {
        code: 'CEG4166',
        name: 'Real-Time Systems Design',
        category: 'Computer Engineering',
        description:
          'Characteristics and structure of real-time systems, reliability and fault tolerance, concurrency, scheduling, and design methodologies.',
      },
      {
        code: 'CEG3185',
        name: 'Introduction to Data Communication and Networking',
        category: 'Computer Engineering',
        description:
          'Physical and data link layer concepts, information theory, medium access control, switching, routing, and LAN/wireless architectures.',
      },
      {
        code: 'CEG4912',
        name: 'Computer Engineering Design Project I',
        category: 'Computer Engineering',
        description:
          'First iteration of a team-based computer engineering design project for an external client, covering management, design, and prototyping.',
      },
      {
        code: 'CEG4913',
        name: 'Computer Engineering Design Project II',
        category: 'Computer Engineering',
        description:
          'Completion of the CEG4912 design project, including implementation, testing, a final report, and class presentation.',
      },
      // Software & Programming
      {
        code: 'SEG3125',
        name: 'Analysis and Design of User Interfaces',
        category: 'Software & Programming',
        description:
          'Psychological principles of HCI, usability evaluation, task analysis, prototyping, and user-centered design of software interfaces.',
      },
      {
        code: 'SEG2105',
        name: 'Introduction to Software Engineering',
        category: 'Software & Programming',
        description:
          'Software engineering principles of requirements, design and testing, object-oriented analysis with UML, and client-server architecture.',
      },
      {
        code: 'SEG2106',
        name: 'Software Construction',
        category: 'Software & Programming',
        description:
          'Low-level software design, grammar/parsing theory, formal languages, concurrency, and model-driven construction tools.',
      },
      {
        code: 'SEG3102',
        name: 'Software Design and Architecture',
        category: 'Software & Programming',
        description:
          'Design patterns, middleware architectures, distributed systems design, and evaluation of internal software qualities.',
      },
      {
        code: 'ITI1120',
        name: 'Introduction to Computing I',
        category: 'Software & Programming',
        description:
          'Algorithm design, software engineering fundamentals, control structures, arrays, and introductory object concepts in programming.',
      },
      {
        code: 'ITI1121',
        name: 'Introduction to Computing II',
        category: 'Software & Programming',
        description:
          'Object-oriented programming, information hiding and encapsulation, linked lists, stacks, queues, binary search trees, and recursion.',
      },
      {
        code: 'CSI2110',
        name: 'Data Structures & Algorithms',
        category: 'Software & Programming',
        description:
          'Abstract data types, complexity analysis, trees, balanced trees, hashing, sorting, graph algorithms, and string pattern matching.',
      },
      {
        code: 'CSI3131',
        name: 'Operating Systems',
        category: 'Software & Programming',
        description:
          'Process management and scheduling, concurrency, memory and virtual memory management, file systems, and I-O.',
      },
      // Electrical Engineering & Electronics
      {
        code: 'ELG2138',
        name: 'Circuit Theory I',
        category: 'Electrical Engineering & Electronics',
        description:
          "DC and AC circuit analysis, passive elements, Kirchhoff's laws, circuit theorems, and transient response of RL/RC circuits.",
      },
      {
        code: 'ELG2137',
        name: 'Circuit Theory II',
        category: 'Electrical Engineering & Electronics',
        description:
          'Op-amp analysis, RLC circuit responses via differential equations and Laplace transforms, two-port networks, and filter frequency response.',
      },
      {
        code: 'ELG2136',
        name: 'Electronics I',
        category: 'Electrical Engineering & Electronics',
        description:
          'Semiconductor physics, diode and BJT/MOSFET circuits, basic digital logic, and power electronics converters.',
      },
      {
        code: 'ELG3136',
        name: 'Electronics II',
        category: 'Electrical Engineering & Electronics',
        description:
          'Differential and multistage amplifiers, s-domain frequency response, feedback topologies, and Class A/B/AB power output stages.',
      },
      {
        code: 'ELG3155',
        name: 'Introduction to Control Systems',
        category: 'Electrical Engineering & Electronics',
        description:
          'Dynamic system modeling, Laplace transforms, transfer functions, stability analysis, root locus, Bode plots, and controller design.',
      },
      {
        code: 'ELG3125',
        name: 'Signal and System Analysis',
        category: 'Electrical Engineering & Electronics',
        description:
          'Continuous- and discrete-time signals and systems, convolution, Fourier series/transforms, sampling, and Laplace/Z-transform analysis.',
      },
      {
        code: 'ELG2911',
        name: 'Professional Practice in Information Technology and Engineering',
        category: 'Electrical Engineering & Electronics',
        description:
          'History of the engineering profession and principles of professional practice, with ethical, societal, and legal obligations of engineers.',
      },
      // Mathematics
      {
        code: 'MAT1320',
        name: 'Calculus I',
        category: 'Mathematics',
        description:
          'Limits, derivative rules, optimization, linear approximation, the definite integral, and techniques of integration.',
      },
      {
        code: 'MAT1322',
        name: 'Calculus II',
        category: 'Mathematics',
        description:
          'Improper integrals, applications of the integral, separable differential equations, sequences, series, and multivariable partial derivatives.',
      },
      {
        code: 'MAT2322',
        name: 'Calculus III',
        category: 'Mathematics',
        description:
          "Extrema of multivariable functions, multiple integration, vector fields, line and surface integrals, and the theorems of Stokes and Gauss.",
      },
      {
        code: 'MAT1348',
        name: 'Discrete Mathematics for Computing',
        category: 'Mathematics',
        description:
          'Propositional logic, sets, functions, relations, counting techniques, proof methods, and graph theory for computing applications.',
      },
      {
        code: 'MAT1341',
        name: 'Introduction to Linear Algebra',
        category: 'Mathematics',
        description:
          'Vector spaces, linear independence and bases, systems of linear equations, matrix algebra, eigenvalues/eigenvectors, and linear transformations.',
      },
      {
        code: 'MAT2384',
        name: 'Ordinary Differential Equations & Numerical Methods',
        category: 'Mathematics',
        description:
          'First- and higher-order differential equations, Laplace transforms, series solutions, and numerical methods for ODEs.',
      },
      {
        code: 'MAT2377',
        name: 'Probability and Statistics for Engineers',
        category: 'Mathematics',
        description:
          'Probability distributions, statistical inference, hypothesis testing, and regression applied to engineering problems.',
      },
      // Physics & Science
      {
        code: 'PHY1124',
        name: 'Fundamentals of Physics for Engineers',
        category: 'Physics & Science',
        description:
          "Kinematics, Newton's laws, work and energy, electrostatics and Gauss's law, magnetic fields and forces, and an intro to special relativity.",
      },
      {
        code: 'PHY2323',
        name: 'Electricity and Magnetism',
        category: 'Physics & Science',
        description:
          "Electrostatics, Gauss's law, conductors and dielectrics, steady currents, magnetostatics, and Maxwell's equations.",
      },
      {
        code: 'PHY2390',
        name: 'Astronomy',
        category: 'Physics & Science',
        description:
          'Celestial sphere, gravity and motion, telescopes and detectors, planets and the Solar System, stars, galaxies, black holes, and cosmology.',
      },
      {
        code: 'CHM1311',
        name: 'Principles of Chemistry',
        category: 'Physics & Science',
        description:
          'Atomic structure, chemical bonding, stoichiometry, gas laws, thermochemistry and kinetics, equilibrium, acids/bases, and solubility.',
      },
      // Engineering Design & Professional Skills
      {
        code: 'GNG1105',
        name: 'Engineering Mechanics',
        category: 'Engineering Design & Professional Skills',
        description:
          'Statics of particles and rigid bodies, free body diagrams, truss/frame/machine structures, and rectilinear and curvilinear motion.',
      },
      {
        code: 'GNG2101',
        name: 'Introduction to Product Development and Management for Engineers',
        category: 'Engineering Design & Professional Skills',
        description:
          'Hands-on, client-based product development covering economics, sustainability, project management, business models, and IP rights.',
      },
      {
        code: 'ENG1112',
        name: 'Technical Report Writing',
        category: 'Engineering Design & Professional Skills',
        description:
          'Practice writing technical reports, covering exposition, argumentation, and presentation of technical data.',
      },
      {
        code: 'ADM1100',
        name: 'Introduction to Business',
        category: 'Engineering Design & Professional Skills',
        description:
          'Functions of business and management, including planning, organizing, leading, and controlling organizational resources.',
      },
      // Arts & Electives
      {
        code: 'SOC1101',
        name: 'Principles of Sociology',
        category: 'Arts & Electives',
        description:
          "Core fields, concepts, and methods of sociological analysis, and sociology's relation to the other social sciences.",
      },
      {
        code: 'PHI2394',
        name: 'Scientific Thought and Social Values',
        category: 'Arts & Electives',
        description:
          'The nature of scientific thought and its relationships with culture, religion, politics, technology, and society.',
      },
      {
        code: 'CLA2103',
        name: 'The Republic',
        category: 'Arts & Electives',
        description: 'General history of Rome from its founding in 753 BC to the death of Caesar in 44 BC.',
      },
    ],
  },
]
