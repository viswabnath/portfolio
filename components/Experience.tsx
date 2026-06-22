'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/data/experience'

export default function Experience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      document.querySelectorAll('.tl-item').forEach((el, idx) => {
        const item = el as HTMLElement
        const col = item.dataset.color || '#c9a96e'
        const line = item.querySelector('.tl-line') as HTMLElement
        const no = item.querySelector('.tl-no') as HTMLElement
        const card = item.querySelector('.tl-card') as HTMLElement
        if (line) line.style.background = `linear-gradient(to bottom, ${col}, transparent)`
        if (no) no.style.color = col

        // Line draw: scaleY 0 → 1 from top
        if (line) gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })

        const fromLeft = idx % 2 === 0
        const cardX = fromLeft ? -80 : 80

        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 82%', toggleActions: 'play none none reverse' }
        })
        tl.fromTo(no,
            { opacity: 0, x: -30, scale: 0.6 },
            { opacity: 1, x: 0, scale: 1, duration: .65, ease: 'back.out(1.4)' })
          .to(line ?? {}, { scaleY: 1, duration: .8, ease: 'power3.out' }, '-=.3')
          .fromTo(card,
            { opacity: 0, x: cardX, rotationY: fromLeft ? -6 : 6 },
            { opacity: 1, x: 0, rotationY: 0, duration: .85, ease: 'power3.out' }, '-=.5')
          .fromTo(item.querySelectorAll('.tl-achievements li'),
            { opacity: 0, x: fromLeft ? -20 : 20 },
            { opacity: 1, x: 0, stagger: .07, duration: .45, ease: 'power3.out' }, '-=.4')
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <div className="sec-label">Professional Journey</div>
        <h2 className="sec-h2 reveal-h">Four companies.<br /><em>One standard.</em></h2>
        <div className="timeline">
          {experience.map((item) => (
            <div key={item.number} className="tl-item fade-up" data-color={item.color}>
              <div className="tl-left">
                <span className="tl-no">{item.number}</span>
                <div className="tl-line"></div>
              </div>
              <div className="tl-card">
                <div className="tl-meta">
                  <h3>{item.title}</h3>
                  <h4>{item.company}</h4>
                  <span className="tl-period">{item.period}</span>
                </div>
                <p className="tl-summary">{item.summary}</p>
                <ul className="tl-achievements">
                  {item.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
                <div className="tl-stack">
                  {item.stack.map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
