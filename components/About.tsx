'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { calcExpYears } from '@/lib/expYears'

const cards = [
  { icon: 'fab fa-angular', title: 'Frontend Mastery', body: 'Expert in Angular, React, and Next.js with 50+ production applications shipped globally across clinical, banking, SaaS, and agency sectors.' },
  { icon: 'fas fa-robot', title: 'AI-Native Engineering', body: 'Certified Claude Code practitioner (Anthropic, 2026). Built production AI agents, multi-agent pipelines, CrewAI workflows, and LLM-powered features using Claude and Gemini. I write in agentic sessions the same way I write code.' },
  { icon: 'fas fa-cube', title: 'Creative Technologist', body: 'Blender MCP + Claude Code → full 3D architectural walkthrough with zero prior 3D experience. Remotion + Claude → programmatic video compositions rendered to MP4. I experiment at the edge of what AI tools can do.' },
  { icon: 'fas fa-rocket', title: 'Entrepreneurship', body: 'Co-Founded and scaled Onemark Digital — 50+ client projects delivered across event microsites, enterprise portals, SaaS products, and AI-powered tools since 2020.' },
  { icon: 'fas fa-heartbeat', title: 'Clinical Technology', body: 'Built HIPAA-compliant clinical research platforms at CLARIO processing 10K+ translation strings daily across 50 countries and 15+ languages.' },
  { icon: 'fas fa-cubes', title: 'Blockchain & Web3', body: 'Architected end-to-end blockchain supply chain solutions on Multichain with IoT sensor integration, QR tracking, and cross-platform delivery (Web, iOS, Android).' },
]

export default function About() {
  const expYears = calcExpYears()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-h',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.inOut', stagger: 0.2,
          scrollTrigger: { trigger: '.about-section', start: 'top 84%', toggleActions: 'play none none none' } }
      )
      gsap.fromTo('.fade-up',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: .9, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.about-intro', start: 'top 85%', toggleActions: 'play none none none' } }
      )
      gsap.fromTo('.ex-card',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 1, ease: 'elastic.out(1, 0.75)',
          scrollTrigger: { trigger: '.expertise-grid', start: 'top 82%', toggleActions: 'play none none reverse' } }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="sec-label">About Me</div>
        <h2 className="sec-h2 reveal-h">I don&apos;t just write code.<br /><em>I craft the feeling of the web.</em></h2>
        <p className="about-intro fade-up">
          Senior Frontend Engineer with <span className="exp-years-val">{expYears}</span>+ years of professional experience in full-stack
          development and entrepreneurship. As a senior frontend engineer, I specialize in Angular and React, with a strong background in building complex,
          high-stakes applications. My expertise extends to blockchain technologies, where I&apos;ve developed smart contracts
          and decentralized applications for real-world supply chain solutions. I&apos;ve Co founded Onemark Digital in
          2017, successfully delivering over 50 projects across various industries. I excel in leading cross-functional teams,
          mentoring junior developers, and driving technical excellence in every project I undertake.
          I&apos;ve built software that runs where it matters most — clinical trials, banking infrastructure, blockchain supply
          chains. The kind that absolutely cannot fail.
        </p>
        <div className="expertise-grid">
          {cards.map((c, i) => (
            <div key={i} className="ex-card fade-up">
              <div className="ex-icon"><i className={c.icon}></i></div>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
