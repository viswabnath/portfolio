'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Contact() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo('.ci-item',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: .12, duration: .75, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-info', start: 'top 82%', toggleActions: 'play none none none' } }
      )
      gsap.fromTo('.soc-card',
        { opacity: 0, y: 24, scale: .92 },
        { opacity: 1, y: 0, scale: 1, stagger: .08, duration: .6, ease: 'back.out(1.3)',
          scrollTrigger: { trigger: '.social-grid', start: 'top 85%', toggleActions: 'play none none none' } }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="sec-label">Let&apos;s connect</div>
        <h2 className="sec-h2 reveal-h">Ready to build<br /><em>something great?</em></h2>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="ci-item">
              <div className="ci-icon"><i className="fas fa-envelope"></i></div>
              <div>
                <h4>Email</h4>
                <a href="mailto:viswanathbodasakurthi@gmail.com">viswanathbodasakurthi@gmail.com</a>
              </div>
            </div>
            <div className="ci-item">
              <div className="ci-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div>
                <h4>Location</h4>
                <span>Kakinada, Andhra Pradesh, India</span>
              </div>
            </div>
            <div className="ci-item">
              <div className="ci-icon"><i className="fas fa-clock"></i></div>
              <div>
                <h4>System Status</h4>
                <span>Accepting high-impact engineering roles</span>
              </div>
            </div>
            <div className="ci-item">
              <div className="ci-icon"><i className="fas fa-globe"></i></div>
              <div>
                <h4>Agency</h4>
                <a href="https://onemark.co.in/" target="_blank" rel="noopener noreferrer">onemark.co.in ↗</a>
              </div>
            </div>
          </div>

          <div className="social-grid">
            <a href="https://github.com/viswabnath" target="_blank" rel="noopener noreferrer" className="soc-card github">
              <i className="fab fa-github"></i><span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/viswabnath" target="_blank" rel="noopener noreferrer" className="soc-card linkedin">
              <i className="fab fa-linkedin"></i><span>LinkedIn</span>
            </a>
            <a href="https://twitter.com/viswabnath" target="_blank" rel="noopener noreferrer" className="soc-card twitter">
              <i className="fab fa-twitter"></i><span>Twitter</span>
            </a>
            <a href="https://codepen.io/viswabnath" target="_blank" rel="noopener noreferrer" className="soc-card codepen">
              <i className="fab fa-codepen"></i><span>CodePen</span>
            </a>
            <a href="https://www.instagram.com/viswabnath/" target="_blank" rel="noopener noreferrer" className="soc-card instagram">
              <i className="fab fa-instagram"></i><span>Instagram</span>
            </a>
            <a href="https://medium.com/@viswabnath" target="_blank" rel="noopener noreferrer" className="soc-card onemark">
              <i className="fab fa-medium"></i><span>Medium</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
