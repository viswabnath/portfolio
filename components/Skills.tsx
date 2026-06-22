'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillBars, cloudTags } from '@/data/skills'
import { certs } from '@/data/certs'

export default function Skills() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-bars',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-bars', start: 'top 85%', toggleActions: 'play none none none' } }
      )
      document.querySelectorAll('.skill-fill').forEach(el => {
        const fill = el as HTMLElement
        gsap.fromTo(fill,
          { width: '0%' },
          { width: fill.dataset.w ?? '0%', duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: fill, start: 'top 90%', toggleActions: 'play none none none' } }
        )
      })
      gsap.fromTo('.skills-cloud',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-cloud', start: 'top 85%', toggleActions: 'play none none none' } }
      )
      const tags = gsap.utils.toArray<HTMLElement>('.cloud-grid span')
      tags.forEach((tag) => {
        gsap.set(tag, {
          x: gsap.utils.random(-220, 220),
          y: gsap.utils.random(-130, 130),
          rotation: gsap.utils.random(-30, 30),
          opacity: 0,
          scale: gsap.utils.random(0.4, 0.9),
        })
      })
      gsap.to(tags, {
        x: 0, y: 0, rotation: 0, opacity: 1, scale: 1,
        duration: 0.75,
        ease: 'back.out(1.7)',
        stagger: { amount: 0.7, from: 'random' },
        scrollTrigger: { trigger: '.cloud-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="sec-label">The Arsenal</div>
        <h2 className="sec-h2 reveal-h">Built to engineer<br /><em>anything.</em></h2>
        <div className="skills-layout">
          <div className="skills-bars">
            {skillBars.map((s, i) => (
              <div key={i} className="skill-row">
                <div className="skill-meta">
                  <span>{s.name}</span>
                  <span>{s.percent}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" data-w={`${s.percent}%`}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="skills-cloud">
            <div className="sec-label">Also proficient in</div>
            <div className="cloud-grid">
              {cloudTags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>

            <div className="sec-label" style={{ marginTop: '2.5rem', marginBottom: '1rem' }}>Certifications</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
              {certs.map((cert, i) => (
                <div key={i} className="cert-card">
                  <div className="cert-icon"><i className="fas fa-certificate"></i></div>
                  <div>
                    <div className="cert-title">{cert.title}</div>
                    <div className="cert-meta">{cert.issuer} · {cert.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
