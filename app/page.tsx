import { calcExpYears } from '@/lib/expYears'
import AuroraCanvas from '@/components/AuroraCanvas'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import GitHubStats from '@/components/GitHubStats'
import ClaudeStats from '@/components/ClaudeStats'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import BackToTop from '@/components/BackToTop'

export default function Home() {
  const year = new Date().getFullYear()
  return (
    <>
      <AuroraCanvas />
      <div className="cur-dot" />
      <div className="cur-ring" />
      <Navbar />
      <Hero />
      {/* Unified developer profile panel — no gap, no boxes */}
      <div className="dev-panel-wrap">
        <div className="container">
          <div className="dev-panel">
            <div className="dev-panel-gh"><GitHubStats /></div>
            <div className="dev-panel-rule"></div>
            <div className="dev-panel-cl"><ClaudeStats /></div>
          </div>
        </div>
      </div>
      <Ticker />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <footer className="footer">
        <div className="footer-inner">
          <p>© {year} <strong>Viswanath Bodasakurthi</strong> &nbsp;·&nbsp;
            <a href="https://onemark.co.in" target="_blank">Onemark</a>
          </p>
          <p className="footer-sub">Next.js 15 · Three.js · GSAP · TypeScript · Deployed on Vercel.</p>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}
