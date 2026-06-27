import { ImageResponse } from '@vercel/og'

export const config = { runtime: 'edge' }

export default function handler() {
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
          backgroundImage: 'linear-gradient(135deg, #57b8bc 0%, #1c3b4a 55%, #0a0f14 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: 'rgba(10,15,20,0.55)',
            marginBottom: 28,
          }}
        >
          Reguero Studio · Madrid
        </div>
        <div
          style={{
            fontSize: 76,
            color: '#0a0f14',
            fontStyle: 'italic',
            fontWeight: 600,
          }}
        >
          Diseño que se siente.
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(10,15,20,0.6)',
            marginTop: 28,
          }}
        >
          Dirección creativa para marcas que no necesitan gritar.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
