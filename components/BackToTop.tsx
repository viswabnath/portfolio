'use client'

import { useEffect } from 'react'

export default function BackToTop() {
  useEffect(() => {
    const btn = document.getElementById('backToTop')
    if (!btn) return

    function onScroll() {
      if (window.scrollY > 500) btn!.classList.add('visible')
      else btn!.classList.remove('visible')
    }

    function onClick() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    btn.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      btn.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <button className="back-to-top" id="backToTop" aria-label="Back to Top">
      <i className="fas fa-arrow-up"></i>
    </button>
  )
}
