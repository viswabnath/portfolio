import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

function calcExpYears(): number {
  const start = new Date(2017, 10, 1)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  const monthDiff = now.getMonth() - start.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < 1)) years--
  return years
}

export async function GET() {
  const expYears = calcExpYears()
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#07070e',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Gold top border */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#c9a96e' }} />

        {/* Label */}
        <div style={{ fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '24px' }}>
          Senior Frontend Engineer · Co-Founder
        </div>

        {/* Name */}
        <div style={{ fontSize: '80px', fontWeight: 700, color: '#ffffff', lineHeight: 1, marginBottom: '16px' }}>
          Viswanath
        </div>
        <div style={{ fontSize: '80px', fontWeight: 300, fontStyle: 'italic', color: '#c9a96e', lineHeight: 1, marginBottom: '40px' }}>
          Bodasakurthi
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: '20px', color: '#8a95a5', letterSpacing: '1px', marginBottom: '48px' }}>
          Angular · React · Blockchain · AI Agents · Onemark Digital
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '48px' }}>
          {[[`${expYears}+`, 'Years Experience'], ['4', 'Industries'], ['50+', 'Projects Shipped']].map(([v, l]) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff' }}>{v}</span>
              <span style={{ fontSize: '12px', color: '#8a95a5', letterSpacing: '2px', textTransform: 'uppercase' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: '40px', right: '80px', fontSize: '14px', color: '#c9a96e', letterSpacing: '2px' }}>
          viswabnath.github.io
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
