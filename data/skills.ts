export interface SkillBar {
  name: string
  percent: number
}

export const skillBars: SkillBar[] = [
  { name: 'HTML / CSS', percent: 98 },
  { name: 'Angular', percent: 95 },
  { name: 'TypeScript / JavaScript', percent: 95 },
  { name: 'React / Ionic', percent: 88 },
  { name: 'Node.js / Express', percent: 78 },
  { name: 'Next.js', percent: 85 },
  { name: 'PostgreSQL / MongoDB', percent: 80 },
  { name: 'Docker / Podman / Cloud', percent: 82 },
  { name: 'Blockchain / Multichain', percent: 85 },
  { name: 'TDD / Jest / Mocha', percent: 88 },
  { name: 'Git / CI/CD', percent: 90 },
]

export const cloudTags: string[] = [
  'Three.js', 'GSAP', 'Lenis', 'Firebase',
  'Redis', 'RabbitMQ', 'Java 17', 'Flyway',
  'Hyperledger', 'Smart Contracts', 'Linux',
  'Podman', 'GitLab CI', 'Applanga',
  'HIPAA', 'Claude API', 'Gemini AI', 'LLM Tooling',
]
