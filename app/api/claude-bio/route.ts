import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
// Revalidate once per day — bio doesn't need to change frequently
export const revalidate = 86400

const FALLBACK = 'Senior engineer who turns AI tools into production systems — from clinical platforms to 3D renders, shipping things that cannot fail.'

export async function GET() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ bio: FALLBACK })
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 80,
        messages: [{
          role: 'user',
          content: `Write exactly one sentence (max 20 words) describing this engineer for a portfolio hero card. Be specific, punchy, and impressive. No quotes.

Facts:
- Senior Software Engineer, 8+ years
- Angular expert, React, Next.js
- Built clinical platform used in 50 countries
- Co-founded Onemark Digital (agency)
- Built 3D architectural walkthrough using Blender MCP + Claude Code with zero prior 3D experience
- Created macOS disk cleaner app with zero prior Swift experience
- Ships AI agents, multi-agent pipelines, MCP servers in production
- Status: open to senior roles`,
        }],
      }),
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      return NextResponse.json({ bio: FALLBACK })
    }

    const data = await res.json()
    const bio = data?.content?.[0]?.text?.trim() ?? FALLBACK

    return NextResponse.json({ bio })
  } catch {
    return NextResponse.json({ bio: FALLBACK })
  }
}
