'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const deck = deckRef.current
      if (!section || !deck) return

      const cards = Array.from(deck.querySelectorAll<HTMLElement>('.proj-card'))
      if (!cards.length) return

      const n = cards.length
      const rotations = cards.map(() => gsap.utils.random(-6, 6))

      // First card on top
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: n - i,
          y: i * 12,
          scale: 1 - i * 0.028,
          transformOrigin: 'center bottom',
        })
      })

      // Defer height measurement until after layout paint
      requestAnimationFrame(() => {
        deck.style.height = `${cards[0].offsetHeight + (n - 1) * 12}px`
        ScrollTrigger.refresh()
      })

      // Single timeline — each card gets 1 unit of time
      const tl = gsap.timeline({ defaults: { ease: 'power2.in' } })

      cards.forEach((card, i) => {
        // Peel this card off
        tl.to(card, { y: '-125%', rotation: rotations[i], opacity: 0, duration: 1 }, i)

        // Cards behind rise up simultaneously
        for (let j = i + 1; j < n; j++) {
          const newDepth = j - i - 1
          tl.to(cards[j], {
            y: newDepth * 12,
            scale: 1 - newDepth * 0.028,
            duration: 1,
          }, i)
        }
      })

      // One ScrollTrigger drives the whole timeline
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${n * 600}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        animation: tl,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const counter = section.querySelector<HTMLElement>('.proj-counter-num')
          if (counter) {
            const idx = Math.min(Math.floor(self.progress * n), n - 1)
            counter.textContent = String(idx + 1)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="container proj-header">
        <div className="sec-label">Selected Projects</div>
        <h2 className="sec-h2 reveal-h">Things I&apos;ve<br /><em>actually shipped.</em></h2>
      </div>

      <div className="proj-deck-wrap">
        <div className="proj-deck" ref={deckRef}>
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
                        <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label="Live"><i className="fas fa-external-link-alt"></i></a>
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

        <div className="proj-counter">
          <span className="proj-counter-num">1</span>
          <span className="proj-counter-sep">/</span>
          <span className="proj-counter-total">6</span>
        </div>

        <div className="proj-scroll-cue">
          <span>scroll to reveal</span>
          <div className="proj-scroll-line"></div>
        </div>
      </div>
    </section>
  )
}
