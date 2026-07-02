import { ImageResponse } from '@vercel/og'

export const config = { runtime: 'edge' }

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Diseño que se siente.'
  const subtitle =
    searchParams.get('subtitle') || 'Dirección creativa para marcas que no necesitan gritar.'
  const kicker = searchParams.get('kicker') || 'Reguero Studio · Madrid'
  const isInmerso = searchParams.get('theme') === 'inmerso'

  const background = isInmerso
    ? 'linear-gradient(135deg, #2C1FA8 0%, #0d0a1a 55%, #050308 100%)'
    : 'linear-gradient(135deg, #57b8bc 0%, #1c3b4a 55%, #0a0f14 100%)'
  const kickerColor = isInmerso ? 'rgba(110,242,168,0.75)' : 'rgba(10,15,20,0.55)'
  const titleColor = isInmerso ? '#EDEAF5' : '#0a0f14'
  const subtitleColor = isInmerso ? 'rgba(237,234,245,0.6)' : 'rgba(10,15,20,0.6)'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: background,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: kickerColor,
            marginBottom: 28,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            fontSize: 64,
            color: titleColor,
            fontStyle: 'italic',
            fontWeight: 600,
            textAlign: 'center',
            maxWidth: 980,
            padding: '0 40px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: subtitleColor,
            marginTop: 28,
            textAlign: 'center',
            maxWidth: 860,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
