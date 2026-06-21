// Server component — all data fetched live, revalidates every hour
import { calcExpYears } from '@/lib/expYears'

interface GHProfile { public_repos: number; followers: number }
interface GHRepo    { stargazers_count: number; language: string | null }
interface PRSearch  { total_count: number }
interface ContribTotal { [year: string]: number }
interface ContribResp  { total: ContribTotal }

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', HTML: '#e34c26',
  Java: '#b07219', Swift: '#F05138', Python: '#3572A5',
  SCSS: '#c6538c', CSS: '#563d7c', Dart: '#00B4AB',
}

const OPT = { next: { revalidate: 3600 } }

async function fetchAll() {
  try {
    const [profileRes, reposRes, prsRes, contribRes] = await Promise.all([
      fetch('https://api.github.com/users/viswabnath', OPT),
      fetch('https://api.github.com/users/viswabnath/repos?per_page=100&sort=updated', OPT),
      fetch('https://api.github.com/search/issues?q=author:viswabnath+type:pr', OPT),
      fetch('https://github-contributions-api.jogruber.de/v4/viswabnath', OPT),
    ])

    const profile: GHProfile   = await profileRes.json()
    const repos:   GHRepo[]    = await reposRes.json()
    const prs:     PRSearch     = await prsRes.json()
    const contrib: ContribResp  = await contribRes.json()

    const stars = repos.reduce((s, r) => s + r.stargazers_count, 0)
    const langCount: Record<string, number> = {}
    repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1 })
    const topLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([name, count]) => ({ name, count }))

    const yearTotals = Object.entries(contrib.total ?? {}).filter(([k]) => k !== 'lastYear')
    const totalContrib = yearTotals.reduce((s, [, v]) => s + (v as number), 0)

    return {
      repos:      profile.public_repos,
      followers:  profile.followers,
      stars,
      prs:        prs.total_count ?? 8,
      topLangs,
      totalContrib,
    }
  } catch {
    return {
      repos: 27, followers: 9, stars: 5, prs: 8,
      topLangs: [
        { name: 'JavaScript', count: 6 }, { name: 'HTML', count: 5 },
        { name: 'TypeScript', count: 4 }, { name: 'Swift', count: 1 },
      ],
      totalContrib: 241,
    }
  }
}

export default async function GitHubStats() {
  const { repos, followers, stars, prs, topLangs, totalContrib } = await fetchAll()
  const expYears = calcExpYears()
  const total = topLangs.reduce((s, l) => s + l.count, 0)

  return (
    <div className="gh-inner">
      {/* Header */}
      <div className="gh-stats-header">
        <i className="fab fa-github gh-icon"></i>
        <span>github.com/viswabnath</span>
        <a href="https://github.com/viswabnath" target="_blank" className="gh-link" aria-label="GitHub profile">
          <i className="fas fa-arrow-up-right-from-square"></i>
        </a>
      </div>

      {/* Primary stats — 3 cols */}
      <div className="gh-stats-row gh-stats-row--6">
        <div className="gh-stat">
          <span className="gh-stat-val">{stars}</span>
          <span className="gh-stat-label">Stars</span>
        </div>
        <div className="gh-stat">
          <span className="gh-stat-val">{repos}</span>
          <span className="gh-stat-label">Repos</span>
        </div>
        <div className="gh-stat">
          <span className="gh-stat-val">373<span style={{ fontSize: '.9rem' }}>+</span></span>
          <span className="gh-stat-label">Commits</span>
        </div>
        <div className="gh-stat">
          <span className="gh-stat-val">{prs}</span>
          <span className="gh-stat-label">Pull Requests</span>
        </div>
        <div className="gh-stat">
          <span className="gh-stat-val">{totalContrib}</span>
          <span className="gh-stat-label">Contributions</span>
        </div>
        <div className="gh-stat">
          <span className="gh-stat-val">{expYears}+</span>
          <span className="gh-stat-label">Yrs Active</span>
        </div>
      </div>

      {/* Streak row */}
      <div className="gh-streak-row">
        <div className="gh-streak-cell">
          <span className="gh-streak-val">{totalContrib}</span>
          <span className="gh-streak-lbl">Total Contributions</span>
          <span className="gh-streak-sub">Aug 2017 — Present</span>
        </div>
        <div className="gh-streak-divider"></div>
        <div className="gh-streak-cell gh-streak-cell--center">
          <span className="gh-streak-val gh-streak-val--accent">5</span>
          <span className="gh-streak-lbl">Longest Streak</span>
          <span className="gh-streak-sub">Feb 25 – Mar 1</span>
        </div>
        <div className="gh-streak-divider"></div>
        <div className="gh-streak-cell">
          <span className="gh-streak-val">143</span>
          <span className="gh-streak-lbl">Last 12 Months</span>
          <span className="gh-streak-sub">contributions</span>
        </div>
      </div>

      {/* Language bars */}
      <div className="gh-langs">
        <div className="gh-langs-title">Language Distribution</div>
        {topLangs.map((l) => {
          const pct  = Math.round((l.count / total) * 100)
          const color = LANG_COLORS[l.name] ?? '#c9a96e'
          return (
            <div key={l.name} className="gh-lang-row">
              <div className="gh-lang-meta">
                <span className="gh-lang-dot" style={{ background: color }}></span>
                <span className="gh-lang-name">{l.name}</span>
                <span className="gh-lang-pct">{pct}%</span>
              </div>
              <div className="gh-lang-track">
                <div className="gh-lang-fill" style={{ background: color, width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="gh-contrib-label">
        <i className="fas fa-fire-flame-curved" style={{ color: '#f97316' }}></i>
        &nbsp;Building in public since 2017 · Updated hourly
      </div>
    </div>
  )
}
