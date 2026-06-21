'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Navbar() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const navbar = document.getElementById('navbar')
    if (!navbar) return

    ScrollTrigger.create({
      start: '80px top',
      onEnter: () => navbar.classList.add('scrolled'),
      onLeaveBack: () => navbar.classList.remove('scrolled'),
    })

    const hamburger = document.getElementById('hamburger')
    const navMenu = document.getElementById('nav-menu')

    function toggleMenu() {
      hamburger?.classList.toggle('open')
      navMenu?.classList.toggle('open')
      document.body.classList.toggle('menu-open')
    }

    function closeMenu() {
      hamburger?.classList.remove('open')
      navMenu?.classList.remove('open')
      document.body.classList.remove('menu-open')
    }

    hamburger?.addEventListener('click', toggleMenu)
    const navLinks = document.querySelectorAll('.nav-link')
    navLinks.forEach(l => l.addEventListener('click', closeMenu))

    const sectionTriggers: ReturnType<typeof ScrollTrigger.create>[] = []
    document.querySelectorAll('section[id]').forEach(sec => {
      sectionTriggers.push(ScrollTrigger.create({
        trigger: sec, start: 'top 55%', end: 'bottom 55%',
        onEnter: () => setActive((sec as HTMLElement).id),
        onEnterBack: () => setActive((sec as HTMLElement).id),
      }))
    })

    function setActive(id: string) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id)
      })
    }

    return () => {
      hamburger?.removeEventListener('click', toggleMenu)
      navLinks.forEach(l => l.removeEventListener('click', closeMenu))
      sectionTriggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-inner">
        <a href="#home" className="nav-logo">VB<span className="logo-dot">.</span></a>
        <ul className="nav-menu" id="nav-menu">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#experience" className="nav-link">Experience</a></li>
          <li><a href="#projects" className="nav-link">Projects</a></li>
          <li><a href="#skills" className="nav-link">Skills</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>
        <div className="hamburger" id="hamburger">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  )
}
