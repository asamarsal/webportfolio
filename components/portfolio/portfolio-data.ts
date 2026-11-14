import {
  Briefcase,
  Code2,
  Gamepad2,
  Infinity,
  Layers,
  Lightbulb,
  Trophy,
} from 'lucide-react'
import type { IconName } from 'tech-stack-icons'

export const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'beyond', label: 'Beyond' },
]

export const stats = [
  {
    value: '3+',
    count: 3,
    suffix: '+',
    label: 'Years Building',
    detail: 'Digital Products',
    icon: Code2,
  },
  {
    value: '10+',
    count: 10,
    suffix: '+',
    label: 'Projects & Experiments',
    detail: '(Web, Mobile, Web3)',
    icon: Layers,
  },
  {
    value: '4',
    count: 4,
    suffix: '',
    label: 'Hackathons &',
    detail: 'Competitions',
    icon: Trophy,
  },
  {
    value: '∞',
    count: null,
    suffix: '',
    label: 'Ideas in Progress',
    detail: 'always one more',
    icon: Infinity,
  },
]

export const projects = [
  {
    number: '01',
    name: 'PromptHub',
    category: 'Web3 / Marketplace',
    description:
      'A decentralized marketplace for prompts, datasets, and digital assets.',
    image: '/images/project-prompthub.png',
    imageAlt: 'Electric cyan network mark floating over a dark digital grid',
    technologies: ['0G Network', 'Solidity', 'React'],
  },
  {
    number: '02',
    name: 'Paradice',
    category: 'GameFi / On-chain game',
    description:
      'An on-chain multiplayer Ludo game with chat, leaderboards, and NFT rewards.',
    image: '/images/project-paradice.png',
    imageAlt: 'Glowing violet game die hovering above a perspective grid',
    technologies: ['Initia', 'Move', 'GameFi'],
  },
  {
    number: '03',
    name: 'Banking Platform',
    category: 'Enterprise / Banking',
    description:
      'Reusable components, back-office modules, utility APIs, and SIT/UAT.',
    image: '/images/project-banking.png',
    imageAlt: 'Monochrome photograph of a contemporary geometric bank facade',
    technologies: ['React', 'TypeScript', 'Storybook'],
  },
  {
    number: '04',
    name: 'Norxel Tracking',
    category: 'Mobile / Internal tool',
    description:
      'Maintenance tracking with attendance, geolocation, and task management.',
    image: '/images/project-tracking.png',
    imageAlt: 'Purple-lit smartphone showing an abstract tracking dashboard',
    technologies: ['Flutter', 'Riverpod', 'Dio'],
  },
]

export type TechnologyItem = {
  name: string
  mark: string
  icon?: IconName
  description: string
}

export const technologyStack: TechnologyItem[] = [
  { name: 'React', mark: '◎', icon: 'react', description: 'Composable interfaces' },
  { name: 'Next.js', mark: 'N', icon: 'nextjs', description: 'Full-stack React' },
  { name: 'TypeScript', mark: 'TS', icon: 'typescript', description: 'Safer application code' },
  { name: 'Flutter', mark: 'F', icon: 'flutter', description: 'Cross-platform mobile' },
  { name: 'Laravel', mark: 'L', icon: 'laravel', description: 'Expressive PHP apps' },
  { name: 'PostgreSQL', mark: 'PG', icon: 'postgresql', description: 'Relational data' },
  { name: 'Solidity', mark: 'S', icon: 'solidity', description: 'Smart contracts' },
  { name: 'Move', mark: 'M', description: 'Resource-oriented Web3' },
  { name: 'Docker', mark: 'D', icon: 'docker', description: 'Portable environments' },
  { name: 'Figma', mark: 'F', icon: 'figma', description: 'Interface exploration' },
  { name: 'Storybook', mark: 'SB', icon: 'storybook', description: 'UI system workshop' },
  { name: 'Git', mark: 'G', icon: 'git', description: 'Versioned collaboration' },
]

export type ExperienceTech = {
  name: string
  icon?: IconName
  customKey?: 'capcut' | 'x' | 'wagmi'
}

export type ExperienceItem = {
  index: string
  role: string
  organization: string
  logo?: string
  project?: string
  context: string
  period?: string
  description: string
  highlights: string[]
  technologies?: ExperienceTech[]
}

export const experiences: ExperienceItem[] = [
  {
    index: '01',
    role: 'Fullstack Web & Mobile Apps Developer',
    organization: 'PT Norxel Teknologi Indonesia',
    logo: '/icons/norxel.jpg',
    project: 'Norxel Apps (Flutter, Laravel, Next.js)',
    context: 'Enterprise',
    period: 'Oct 2025 - Present',
    description:
      'Developing internal systems used by technicians and operational teams to maintain cash and non-cash machines across Indonesia. Contributed to both mobile and web platforms, covering root cause analysis, solutions, system design, and implementation.',
    highlights: [
      'Streamlined technician workflows through system analysis and process digitalization',
      'Designed and optimized database architecture for consistent and reliable reporting',
      'Automated customer and machine database maintenance and optimization with Python',
      'Web Dashboard (Next.js & Laravel) for real-time monitoring, reporting, and technician route scheduling',
      'Mobile Application (Flutter) with OpenStreetMap routing and geolocation for technician task assignments',
      'Integrated modules with finance control, monitoring, ticketing, general affairs, and HR systems',
    ],
    technologies: [
      { name: 'Flutter', icon: 'flutter' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Firebase', icon: 'firebase' },
    ],
  },
  {
    index: '02',
    role: 'Community Advocate',
    organization: 'Hackquest.io',
    logo: '/icons/hackquest.jpg',
    project: 'Web3 Education Platform',
    context: 'Web3 Community',
    period: 'Jun 2025 - Present',
    description:
      'Promote and grow the HackQuest Web3 learning community by introducing the platform to developers and guiding new learners to explore Web3 from ground zero.',
    highlights: [
      'Promoted and guided learners in free 2-week co-learning camps on Eclipse, 0G, Mantle, Ethereum, and Arbitrum',
      'Created technical blog posts, informative video content, and assisted community management',
    ],
    technologies: [
      { name: 'Canva', icon: 'canva' },
      { name: 'CapCut', customKey: 'capcut' },
      { name: 'Photoshop', icon: 'photoshop' },
      { name: 'X', customKey: 'x' },
    ],
  },
  {
    index: '03',
    role: 'Mobile Apps Developer',
    organization: 'Supranusa Sindata',
    logo: '/icons/vhpsindata.jpg',
    project: 'VHP Dashboard Mobile (Java)',
    context: 'Hospitality Tech',
    period: 'Jun 2024 - Aug 2024',
    description:
      'Developed Visual Hotel Program (VHP) Android application for enterprise hotel management using Java.',
    highlights: [
      'Converted UI/UX design into responsive pages within the Android application',
      'Diagnosed and resolved critical bugs in the VHP Dashboard Android version',
    ],
    technologies: [
      { name: 'Java', icon: 'java' },
      { name: 'Android', icon: 'android' },
      { name: 'Firebase', icon: 'firebase' },
    ],
  },
  {
    index: '04',
    role: 'Magenta BUMN Internship',
    organization: 'Sinergi Gula Nusantara',
    logo: '/icons/sgn.webp',
    project: 'Magenta Attendance & Greens Monitoring (Flutter)',
    context: 'BUMN Internship',
    period: 'Oct 2023 - Mar 2024',
    description:
      'Developed enterprise mobile applications for internship attendance tracking and sugarcane supply chain field monitoring.',
    highlights: [
      'Magenta Mobile Apps Attendance (Flutter): Geolocation check-in/out with maps integration, Firebase push notifications, and API sync',
      'Greens Sugarcane Monitoring (Flutter): Real-time field data input via API, location tracking, and POS machine ticket printing integration',
      'End-to-end UI/UX design, Flutter layout implementation, and API integration',
    ],
    technologies: [
      { name: 'Flutter', icon: 'flutter' },
      { name: 'Java', icon: 'java' },
      { name: 'Android', icon: 'android' },
      { name: 'Firebase', icon: 'firebase' },
    ],
  },
  {
    index: '05',
    role: 'Frontend Developer',
    organization: 'Swadharma Duta Data · BNI',
    logo: '/icons/bni46.png',
    context: 'Enterprise Banking',
    period: 'Contract',
    description:
      'Building dependable interfaces and reusable frontend foundations for enterprise banking workflows.',
    highlights: [
      'React & TypeScript applications',
      'Reusable components and Storybook systems',
      'Back-office modules, utility APIs, SIT/UAT',
    ],
    technologies: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Storybook.js', icon: 'storybook' },
      { name: 'Java Spring Boot', icon: 'spring' },
      { name: 'Oracle DB', icon: 'oracle' },
      { name: 'Red Hat', icon: 'redhat' },
    ],
  },
  {
    index: '06',
    role: 'Product & Web3 Builder',
    organization: 'Personal & Hackathon Projects',
    logo: '/icons/asa.png',
    context: 'Independent',
    period: 'Ongoing',
    description:
      'Taking ideas from a rough sketch to working product experiments across decentralized apps and games.',
    highlights: [
      'dApps and smart-contract prototypes (0G Network, Initia, Solidity, Move)',
      'Product architecture and interaction design',
      'Blockchain and on-chain game experiments',
    ],
    technologies: [
      { name: 'Solidity', icon: 'solidity' },
      { name: 'Wagmi', customKey: 'wagmi' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Flutter', icon: 'flutter' },
      { name: 'Java', icon: 'java' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ],
  },
]

export const interests = [
  {
    number: '01',
    title: 'Business Development',
    note: 'Finding the useful signal in a big idea.',
    icon: Briefcase,
  },
  {
    number: '02',
    title: 'Entrepreneurship',
    note: 'Small bets. Real problems. Good people.',
    icon: Layers,
  },
  {
    number: '03',
    title: 'GameFi & Web3',
    note: 'Playful systems with a little more agency.',
    icon: Gamepad2,
  },
  {
    number: '04',
    title: 'Product Exploration',
    note: 'Following a curious question all the way through.',
    icon: Lightbulb,
  },
]
