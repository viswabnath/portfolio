'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

const items = [
  'Angular Expert', 'Clinical Technology', 'UI Architect', 'Banking Modernization',
  'Co-Founder', 'Creative Technologist', 'Frontend Craft', 'Blender MCP',
  'Blockchain Pioneer', 'Programmatic Video', 'Onemark Digital', 'WebGL Experiences',
  'Claude Code Expert', 'AI Agent Development', 'Agentic Workflows', 'Remotion × Claude',
  'AI-Native Creation', 'Multi-Agent Systems', 'macOS Native Apps',
]

export default function Ticker() {
  useEffect(() => {
    const anim = gsap.to('#ticker-track', { x: '-50%', ease: 'none', duration: 22, repeat: -1 })
    return () => { anim.kill() }
  }, [])

  const doubled = [...items, ...items]

  return (
    <div className="ticker-strip">
      <div className="ticker-track" id="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ti">{item}<span className="ts">◆</span></span>
        ))}
      </div>
    </div>
  )
}
