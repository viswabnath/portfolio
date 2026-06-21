export interface Cert {
  title: string
  issuer: string
  date: string
}

export const certs: Cert[] = [
  { title: 'Introduction to Agent Skills', issuer: 'Anthropic', date: 'Jun 2026' },
  { title: 'Claude Code in Action', issuer: 'Anthropic', date: 'May 2026' },
  { title: 'Claude Code 101', issuer: 'Anthropic', date: 'May 2026' },
  { title: 'Generative AI Mastermind', issuer: 'Outskill', date: '2026' },
]
