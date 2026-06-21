export interface ExperienceItem {
  number: string
  title: string
  company: string
  period: string
  summary: string
  achievements: string[]
  stack: string[]
  color: string
}

export const experience: ExperienceItem[] = [
  {
    number: '01',
    title: 'Senior Software Engineer',
    company: 'CLARIO — Channelsoft',
    period: 'Jan 2024 – Present',
    summary: 'Leading development of clinical research applications for global healthcare technology solutions.',
    achievements: [
      'Architected multi-language clinical research platform supporting 15+ languages across 50 countries',
      'Built automated CLI tools reducing deployment time by 75% (4 hours → 15 minutes)',
      'Mentored 4 junior developers and improved team productivity by 40%',
      'Implemented HIPAA-compliant patient diary systems processing 10K+ strings daily',
    ],
    stack: ['Angular 13+', 'Spring Boot', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Podman', 'AWS S3', 'Jest'],
    color: '#67e8f9',
  },
  {
    number: '02',
    title: 'Lead Frontend Developer',
    company: 'Purple Drive Technologies (TCS Contract)',
    period: 'Oct 2022 – Jan 2024',
    summary: 'Led modernization of legacy banking applications for critical financial systems.',
    achievements: [
      'Migrated AngularJS to Angular 14, improving performance by 50%',
      'Achieved 85% code coverage with comprehensive testing — 200+ tests written',
      'Reduced deployment time from 4 hours to 30 minutes',
      'Led cross-functional team of 6 developers across 15+ integrated modules',
    ],
    stack: ['Angular 14', 'TypeScript', 'Node.js', 'Mocha', 'Chai', 'REST APIs', 'CI/CD'],
    color: '#c084fc',
  },
  {
    number: '03',
    title: 'Software Developer',
    company: 'Gariyasi Systems Pvt Ltd',
    period: 'Apr 2021 – Sep 2022',
    summary: 'Designed innovative blockchain-based supply chain solutions for product authentication.',
    achievements: [
      'Architected end-to-end blockchain solution using Multichain technology — 100% tamper traceable',
      'Shipped Web, iOS, and Android platforms with zero offline data loss',
      'Integrated IoT sensors and QR code scanning for real-time tracking',
      'Secured 3 major enterprise clients through live demonstrations',
    ],
    stack: ['Multichain', 'Angular 12', 'Ionic 5', 'Node.js', 'MongoDB', 'Smart Contracts'],
    color: '#4ade80',
  },
  {
    number: '04',
    title: 'Software Developer',
    company: 'Sellcraft Global Solutions',
    period: '2017 – 2021',
    summary: 'Dashboards and hybrid apps serving 100K+ monthly users. Where the obsession with craft began.',
    achievements: [
      'Built dashboards and hybrid apps serving 100K+ monthly active users',
      'Created 20+ reusable Angular components that cut future dev time by 40%',
      'Integrated payment gateways, third-party APIs, and automation tools',
      'Promoted to team lead within 18 months',
    ],
    stack: ['Angular 8', 'Ionic', 'Bootstrap', 'TypeScript', 'HTML5/CSS3', 'MongoDB'],
    color: '#fbbf24',
  },
]
