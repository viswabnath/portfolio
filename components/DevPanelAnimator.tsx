'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function DevPanelAnimator() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const panel = ref.current?.closest('.dev-panel-wrap')
      if (!panel) return

      // 1. Panel halves slide up on enter
      gsap.fromTo(
        ['.dev-panel-gh', '.dev-panel-cl'],
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: panel, start: 'top 82%', toggleActions: 'play none none reverse' },
        }
      )

      // 2. Stat number count-up (gh-stat-val + claude-stat-num)
      panel.querySelectorAll<HTMLElement>('.gh-stat-val, .gh-streak-val, .claude-stat-num').forEach(el => {
        const raw = el.textContent?.replace(/[^0-9.]/g, '') ?? ''
        const target = parseFloat(raw)
        if (isNaN(target) || target === 0) return

        const suffix = el.textContent?.replace(/^[\d.]+/, '') ?? ''
        const prefix = el.textContent?.match(/^[^\d]*/)?.[0] ?? ''
        const isInt = Number.isInteger(target)

        const obj = { val: 0 }
        gsap.fromTo(obj, { val: 0 }, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + (isInt ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix
          },
          scrollTrigger: { trigger: panel, start: 'top 78%', toggleActions: 'play none none reset' },
        })
      })

      // 3. Language bars grow from 0
      panel.querySelectorAll<HTMLElement>('.gh-lang-fill').forEach(el => {
        const targetW = el.style.width
        el.style.width = '0%'
        gsap.to(el, {
          width: targetW,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 75%', toggleActions: 'play none none reset' },
        })
      })

      // 4. Claude list items stagger in
      gsap.fromTo(
        '.claude-list-item',
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: '.claude-list', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )

      // 5. Claude stats grid cells pop in
      gsap.fromTo(
        '.claude-stat-cell',
        { opacity: 0, scale: 0.8, y: 12 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.55,
          ease: 'back.out(1.6)',
          stagger: 0.08,
          scrollTrigger: { trigger: '.claude-stats-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )

      // 6. AI bio fade in
      gsap.fromTo(
        '.claude-bio-row',
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.claude-bio-row', start: 'top 87%', toggleActions: 'play none none reverse' },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  return <div ref={ref} style={{ display: 'none' }} aria-hidden />
}
