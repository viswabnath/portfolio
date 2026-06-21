'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'

export default function Projects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      document.querySelectorAll('.proj-card').forEach(card => {
        gsap.fromTo(card,
          { opacity: 0, y: 60, rotationX: -15, transformOrigin: '50% 100%' },
          { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' } }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="sec-label">Selected Projects</div>
        <h2 className="sec-h2 reveal-h">Things I&apos;ve<br /><em>actually shipped.</em></h2>
        <div className="projects-grid">
          {projects.map((p, i) => {
            const isEnterprise = p.badge === 'Enterprise'
            const isNative = p.badge === 'Native / Tool'
            const isAI = p.badge === 'AI Experiment'
            const isCreative = p.badge === 'Creative'
            let badgeBorderColor = 'rgba(201,169,110,.35)'
            let badgeBg = 'rgba(201,169,110,.08)'
            if (isEnterprise) { badgeBorderColor = 'rgba(59,130,246,.35)'; badgeBg = 'rgba(59,130,246,.08)' }
            if (isNative) { badgeBorderColor = 'rgba(74,222,128,.3)'; badgeBg = 'rgba(74,222,128,.07)' }
            if (isAI) { badgeBorderColor = 'rgba(167,139,250,.35)'; badgeBg = 'rgba(167,139,250,.08)' }
            if (isCreative) { badgeBorderColor = 'rgba(212,117,140,.3)'; badgeBg = 'rgba(212,117,140,.07)' }

            return (
              <div key={i} className="proj-card">
                <div className="proj-top">
                  <div className="proj-icon" style={{ ['--ic' as string]: p.iconColor }}>
                    <i className={p.icon}></i>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <span
                      className="proj-badge"
                      style={{ ['--bc' as string]: p.badgeColor, borderColor: badgeBorderColor, color: p.badgeColor, background: badgeBg }}
                    >
                      {p.badge}
                    </span>
                    <div className="proj-links">
                      {p.github && (
                        <a href={p.github} target="_blank" aria-label="GitHub"><i className="fab fa-github"></i></a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" aria-label="Live"><i className="fas fa-external-link-alt"></i></a>
                      )}
                    </div>
                  </div>
                </div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="proj-stack">
                  {p.stack.map((s, j) => <span key={j}>{s}</span>)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
