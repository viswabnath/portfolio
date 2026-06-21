const FALLBACK_BIO = 'Senior engineer who turns AI tools into production systems — shipping things that cannot fail.'

async function fetchBio(): Promise<string> {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return FALLBACK_BIO

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 60,
        messages: [{
          role: 'user',
          content: 'Write one punchy sentence (max 18 words, no quotes) for a portfolio hero card describing: Senior engineer, 8+ yrs, Angular/React/AI, built clinical platform 50 countries, co-founded agency, shipped 3D app with zero prior 3D experience, AI-native workflow with Claude Code.',
        }],
      }),
      next: { revalidate: 86400 },
    })

    const data = await res.json()
    return data?.content?.[0]?.text?.trim() ?? FALLBACK_BIO
  } catch {
    return FALLBACK_BIO
  }
}

const HIGHLIGHTS = [
  { label: 'Claude Code', note: 'Primary dev tool — daily driver since early 2024' },
  { label: 'Multi-agent pipelines', note: 'CrewAI, tool-chaining, MCP servers in production' },
  { label: 'Blender MCP', note: 'Full 3D architectural render — zero prior 3D experience' },
  { label: 'Remotion × Claude', note: 'AI-directed programmatic video pipeline' },
  { label: 'CompresoClean', note: 'macOS native app — zero prior Swift/AppKit experience' },
  { label: 'Claude Haiku bot', note: 'NL family-tree queries shipped to production' },
]

export default async function ClaudeStats() {
  const bio = await fetchBio()

  return (
    <div className="claude-inner">
      {/* Header */}
      <div className="claude-card-header">
        <div className="claude-card-title-row">
          <span className="claude-diamond">◆</span>
          <span className="claude-wordmark">claude</span>
          <span className="claude-dot-sep">·</span>
          <span className="claude-sub">Anthropic</span>
        </div>
        <span className="claude-power-badge">Power User</span>
      </div>

      {/* Live AI bio */}
      <div className="claude-bio-row">
        <span className="claude-bio-label">AI says —</span>
        <p className="claude-bio-text">&ldquo;{bio}&rdquo;</p>
      </div>

      {/* Stats row */}
      <div className="claude-stats-grid">
        <div className="claude-stat-cell">
          <span className="claude-stat-num">500<span className="claude-stat-plus">+</span></span>
          <span className="claude-stat-lbl">Sessions run</span>
        </div>
        <div className="claude-stat-cell">
          <span className="claude-stat-num">8</span>
          <span className="claude-stat-lbl">Apps shipped</span>
        </div>
        <div className="claude-stat-cell">
          <span className="claude-stat-num">4</span>
          <span className="claude-stat-lbl">Certifications</span>
        </div>
        <div className="claude-stat-cell">
          <span className="claude-stat-num">~2M</span>
          <span className="claude-stat-lbl">Tokens used</span>
        </div>
      </div>

      <div className="claude-rule"></div>

      {/* Built with Claude */}
      <p className="claude-section-label">Built with Claude Code</p>
      <ul className="claude-list">
        {HIGHLIGHTS.map((h) => (
          <li key={h.label} className="claude-list-item">
            <span className="claude-list-diamond">◆</span>
            <span className="claude-list-text">
              <strong>{h.label}</strong>
              <span className="claude-list-note"> — {h.note}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="claude-footer-note">
        Certified Anthropic practitioner · AI-native workflow since 2024
      </div>
    </div>
  )
}
