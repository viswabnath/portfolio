'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { calcExpYears } from '@/lib/expYears'

export default function Hero() {
  const expYears = calcExpYears()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    document.querySelectorAll('.exp-years-val').forEach(el => {
      el.textContent = String(expYears)
    })

    // Cursor
    const dot = document.querySelector('.cur-dot') as HTMLElement
    const ring = document.querySelector('.cur-ring') as HTMLElement

    function onCursorMove(e: MouseEvent) {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: .09 })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: .44, ease: 'power3.out' })
    }

    if (dot && ring) {
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: innerWidth / 2, y: innerHeight / 2 })
      window.addEventListener('mousemove', onCursorMove, { passive: true })

      document.querySelectorAll('a, button, [data-h]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(ring, { scale: 2.5, borderColor: '#c9a96e', opacity: .7, duration: .25 })
          gsap.to(dot, { scale: 0, duration: .18 })
        })
        el.addEventListener('mouseleave', () => {
          gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,.28)', opacity: 1, duration: .25 })
          gsap.to(dot, { scale: 1, duration: .18 })
        })
      })
    }

    // Hero entrance
    const heroTl = gsap.timeline({ delay: .15 })
      .from('.hero-kicker', { opacity: 0, y: 14, duration: .7, ease: 'power3.out' })
      .from('.name-row-1', { opacity: 0, y: 40, duration: .9, ease: 'expo.out' }, '-=.3')
      .from('.name-row-2', { opacity: 0, y: 40, duration: .9, ease: 'expo.out' }, '-=.6')
      .from('.hero-role', { opacity: 0, y: 18, duration: .7, ease: 'power3.out' }, '-=.5')
      .from('.hero-stats .hs', { opacity: 0, y: 16, stagger: .1, duration: .65, ease: 'power3.out' }, '-=.5')
      .from('.hero-socials', { opacity: 0, duration: .7 }, '-=.3')

    // Terminal boot
    gsap.set('#hero-terminal', { perspective: 1000 })
    gsap.set('.term-window', { transformOrigin: '50% 50%', opacity: 0, rotationX: 35, scaleY: 0.01, scaleX: 0.3 })

    const termTl = gsap.timeline({ delay: 0.7 })
      .to('.term-window', { opacity: 1, scaleX: 1, duration: 0.2, ease: 'power2.inOut' })
      .to('.term-window', { scaleY: 1, rotationX: 0, duration: 0.8, ease: 'elastic.out(1, 0.6)' })
      .fromTo('.term-window',
        { boxShadow: '0 0 80px rgba(201, 169, 110, 0.8)' },
        { boxShadow: '0 24px 60px rgba(0, 0, 0, .5), 0 0 40px rgba(201, 169, 110, .05)', duration: 0.6 }, '-=0.6')

    // Parallax (desktop only)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 769px)', () => {
      gsap.to('.hero-identity', {
        yPercent: 20,
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.5 }
      })
      gsap.to('#hero-terminal', {
        yPercent: -10,
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.5 }
      })
    })

    // Scroll cue
    const scrollCueTrigger = ScrollTrigger.create({
      start: '5% top',
      onEnter: () => gsap.to('.scroll-cue', { opacity: 0, y: 10, duration: .4 }),
      onLeaveBack: () => gsap.to('.scroll-cue', { opacity: 1, y: 0, duration: .4 }),
    })

    // Aurora scroll sync
    const _sections = ['#home', '#about', '#experience', '#projects', '#skills', '#contact']
    function getSectionScrollValue() {
      const scrollY = window.scrollY
      const winH = window.innerHeight
      const n = _sections.length
      for (let i = n - 1; i >= 0; i--) {
        const el = document.querySelector(_sections[i])
        if (!el) continue
        const elTop = el.getBoundingClientRect().top + scrollY
        if (scrollY >= elTop - winH * 0.5) {
          const nextEl = i < n - 1 ? document.querySelector(_sections[i + 1]) : null
          let progress = 0
          if (nextEl) {
            const nextTop = nextEl.getBoundingClientRect().top + scrollY
            const h = nextTop - elTop
            progress = Math.min(Math.max((scrollY - (elTop - winH * 0.5)) / (h * 0.85), 0), 1)
          }
          return (i + progress) / n
        }
      }
      return 0
    }

    function onAuroraScroll() {
      window._auroraSetScroll?.(getSectionScrollValue())
    }

    window.addEventListener('scroll', onAuroraScroll, { passive: true })
    setTimeout(() => window._auroraSetScroll?.(getSectionScrollValue()), 100)

    // Smooth scroll for nav anchors
    function onAnchorClick(this: HTMLAnchorElement, e: Event) {
      const target = document.querySelector(this.getAttribute('href') ?? '')
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    anchors.forEach(a => a.addEventListener('click', onAnchorClick))

    // Terminal typing
    const termContent = document.getElementById('term-content')
    const termCursor = document.getElementById('term-cursor')
    const termIndicator = document.getElementById('term-indicator')
    const termIndicatorText = document.getElementById('term-indicator-text')
    const termBody = document.querySelector<HTMLElement>('.term-body')
    let stopped = false

    // Exact Claude Code status bar: · Action… (Xs · ↓ Y tokens)
    const actions = ['Thinking','Writing','Reading','Analyzing','Processing','Searching','Generating','Infusing']
    let actionIdx  = 0
    let elapsedSec = 0
    let tokens     = 0
    let spinInterval: ReturnType<typeof setInterval> | null = null
    let actionInterval: ReturnType<typeof setInterval> | null = null
    const termSpinner = document.getElementById('term-spinner')
    const termTokens  = document.getElementById('term-tokens')
    const termSecs    = document.getElementById('term-secs')

    function startIndicator() {
      if (!termIndicator || !termIndicatorText || !termSpinner) return
      termIndicator.style.opacity = '1'
      termSpinner.textContent = actions[0]
      elapsedSec = 0; tokens = 0

      // tick every second — update timer + token count (simulate streaming)
      spinInterval = setInterval(() => {
        if (stopped) return
        elapsedSec++
        tokens += Math.floor(Math.random() * 60 + 30)
        if (termSecs)   termSecs.textContent   = String(elapsedSec)
        if (termTokens) termTokens.textContent = String(tokens)
      }, 1000)

      // cycle action word every ~2.5s
      actionInterval = setInterval(() => {
        if (stopped) return
        actionIdx = (actionIdx + 1) % actions.length
        if (termSpinner) termSpinner.textContent = actions[actionIdx]
      }, 2500)
    }

    function stopIndicator() {
      if (spinInterval)   { clearInterval(spinInterval);   spinInterval   = null }
      if (actionInterval) { clearInterval(actionInterval); actionInterval = null }
      if (termIndicator)  termIndicator.style.opacity  = '0'
      if (termCursor)     termCursor.style.opacity     = '1'
    }

    const lines = [
      { text: '> claude "who is this engineer?"', color: '#cc785c', delay: 900 },
      { text: '', color: '', delay: 200 },
      { text: '◆  Reading profile...', color: 'rgba(255,255,255,.4)', delay: 500, tool: true },
      { text: '', color: '', delay: 150 },
      { text: `  Viswanath Bodasakurthi — ${expYears} yrs`, color: '#e2e8f0', delay: 80 },
      { text: '  Senior Software Engineer @ CLARIO', color: '#e2e8f0', delay: 80 },
      { text: '  Co-Founder, Onemark Digital', color: '#c084fc', delay: 80 },
      { text: '  Angular · React · Next.js · AI Agents', color: 'rgba(255,255,255,.5)', delay: 80 },
      { text: '', color: '', delay: 300 },
      { text: '> claude "show recent wins"', color: '#cc785c', delay: 800 },
      { text: '', color: '', delay: 200 },
      { text: '◆  Running: git log --format="%s" -4', color: 'rgba(255,255,255,.4)', delay: 400, tool: true },
      { text: '', color: '', delay: 150 },
      { text: '  ✓ Shipped FamilyWall AI bot to production', color: '#4ade80', delay: 100 },
      { text: '  ✓ 4h deploy → 15min via custom CLI tool', color: '#4ade80', delay: 100 },
      { text: '  ✓ 3D house walkthrough, zero 3D experience', color: '#4ade80', delay: 100 },
      { text: '  ✓ Programmatic video with Remotion + Claude', color: '#4ade80', delay: 100 },
      { text: '', color: '', delay: 300 },
      { text: '> claude "availability?"', color: '#cc785c', delay: 700 },
      { text: '', color: '', delay: 200 },
      { text: '  Open to senior engineering roles. Let\'s build.', color: '#fbbf24', delay: 400 },
    ]

    let lineIdx = 0
    let charIdx = 0

    function scrollTerminal() {
      if (termBody) termBody.scrollTop = termBody.scrollHeight
    }

    function typeNextLine() {
      if (stopped || !termContent) return
      if (lineIdx >= lines.length) {
        stopIndicator()
        return
      }
      const line = lines[lineIdx]
      const el = document.createElement('div')
      el.className = 'tl' + ((line as { tool?: boolean }).tool ? ' tool-block' : '')
      el.style.color = line.color || '#e2e8f0'

      if (!line.text) {
        el.innerHTML = '&nbsp;'
        termContent.appendChild(el)
        scrollTerminal()
        lineIdx++
        setTimeout(typeNextLine, line.delay)
        return
      }

      termContent.appendChild(el)

      if ((line as { tool?: boolean }).tool) {
        el.textContent = line.text
        scrollTerminal()
        lineIdx++; charIdx = 0
        setTimeout(typeNextLine, line.delay)
        return
      }

      function typeChar() {
        if (stopped || !termContent) return
        if (charIdx < line.text.length) {
          el.textContent += line.text[charIdx++]
          scrollTerminal()
          setTimeout(typeChar, 26)
        } else {
          lineIdx++; charIdx = 0
          setTimeout(typeNextLine, line.delay)
        }
      }
      typeChar()
    }

    setTimeout(() => {
      startIndicator()
      typeNextLine()
    }, 1200)

    // Terminal scroll isolation
    function onTermWheel(this: HTMLElement, e: Event) {
      const we = e as WheelEvent
      const atTop = this.scrollTop === 0
      const atBottom = this.scrollTop + this.clientHeight >= this.scrollHeight - 1
      if (!(atTop && we.deltaY < 0) && !(atBottom && we.deltaY > 0)) {
        we.stopPropagation()
      }
    }
    if (termBody) termBody.addEventListener('wheel', onTermWheel, { passive: true })

    return () => {
      stopped = true
      if (spinInterval)   clearInterval(spinInterval)
      if (actionInterval) clearInterval(actionInterval)
      window.removeEventListener('mousemove', onCursorMove)
      window.removeEventListener('scroll', onAuroraScroll)
      anchors.forEach(a => a.removeEventListener('click', onAnchorClick))
      if (termBody) termBody.removeEventListener('wheel', onTermWheel)
      heroTl.kill()
      termTl.kill()
      scrollCueTrigger.kill()
      mm.revert()
    }
  }, [expYears])

  return (
    <section className="hero" id="home">
      <div className="hero-grid">
        <div className="hero-identity">
          <p className="hero-kicker"><span className="kicker-dot"></span> Systems online. Ready to ship.</p>
          <h1 className="hero-name">
            <span className="name-row name-row-1">Viswanath</span>
            <span className="name-row name-row-2"><em>Bodasakurthi</em></span>
          </h1>
          <p className="hero-role">Senior Frontend Engineer &nbsp;/&nbsp; UI Architect<br />
            Co-Founder, <a href="https://onemark.co.in/" target="_blank" className="onemark-link">Onemark</a>
          </p>
          <div className="hero-stats">
            <div className="hs">
              <span className="hs-v exp-years-val">{expYears}</span>
              <span className="hs-l">Years writing<br />code that ships</span>
            </div>
            <div className="hs">
              <span className="hs-v">4</span>
              <span className="hs-l">Industries —<br />clinical to blockchain</span>
            </div>
            <div className="hs">
              <span className="hs-v">1</span>
              <span className="hs-l">Digital Agency built<br />from scratch</span>
            </div>
            <div className="hs hs-accent">
              <span className="hs-v">50+</span>
              <span className="hs-l">Projects<br />shipped live</span>
            </div>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/viswabnath" target="_blank" className="soc-link" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://linkedin.com/in/viswabnath" target="_blank" className="soc-link" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="https://twitter.com/viswabnath" target="_blank" className="soc-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://onemark.co.in/" target="_blank" className="soc-link" aria-label="Onemark"><i className="fas fa-globe"></i></a>
          </div>
          <a href="/resume.pdf" download className="resume-btn">
            <i className="fas fa-download"></i> Download Resume
          </a>
        </div>

        <div className="hero-terminal" id="hero-terminal">
          <div className="term-window">
            <div className="term-bar">
              <div className="term-dots">
                <span className="td red"></span>
                <span className="td yellow"></span>
                <span className="td green"></span>
              </div>
              <span className="term-title"><span className="term-title-diamond">◆</span> claude <span className="term-title-dim">~/portfolio</span></span>
              <span className="term-title-spacer"></span>
            </div>
            <div className="term-body">
              <div className="term-content" id="term-content"></div>
              {/* Active indicator — · Action… (Xs · ↓ Y tokens) exact Claude Code format */}
              <div className="term-indicator" id="term-indicator" style={{ opacity: 0 }}>
                <span className="term-ind-dot">·</span>
                <span className="term-spinner" id="term-spinner">Thinking</span>
                <span className="term-ind-ellipsis">…</span>
                <span className="term-ind-meta">
                  (<span id="term-secs">0</span>s
                  <span className="term-ind-sep"> · </span>
                  <span className="term-ind-arrow">↓</span>
                  <span> </span>
                  <span id="term-tokens">0</span>
                  <span> tokens</span>)
                </span>
              </div>
              {/* Idle cursor — shown after typing completes */}
              <div className="term-cursor" id="term-cursor" style={{ opacity: 0 }}>
                <span className="term-cursor-diamond">◆</span>
                <span className="term-cursor-label">claude</span>
                <span className="term-cursor-block">▋</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <div className="sc-line"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
