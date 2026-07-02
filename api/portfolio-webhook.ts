/// <reference types="node" />

// Vercel serverless function. Dispara un webhook a n8n/Make con un borrador
// de post cuando se añade una pieza nueva al portfolio. NO publica en redes
// automáticamente: deja el borrador para que Fer lo revise.
//
// Estado actual: el portfolio se edita a mano en
// src/pages/InmersoPortfolioPage.tsx (array ITEMS), no hay CMS/API de
// publicación todavía. Este endpoint es el punto de entrada para cuando lo
// haya; hasta entonces se puede llamar a mano al añadir una pieza real, ej.:
//
//   curl -X POST https://reguerostudio.es/api/portfolio-webhook \
//     -H "Content-Type: application/json" \
//     -H "x-webhook-secret: TU_SECRETO" \
//     -d '{"title":"Motor Arjona · Reel verano","tag":"Vídeo","url":"https://reguerostudio.es/inmerso/portfolio"}'
//
// Requiere estas env vars en Vercel:
//   N8N_PORTFOLIO_WEBHOOK_URL   (destino en n8n/Make que crea el borrador)
//   PORTFOLIO_WEBHOOK_SECRET    (secreto compartido para autorizar la llamada)

interface VercelRequest {
  method?: string
  headers: { [key: string]: string | string[] | undefined }
  body: { title?: string; tag?: string; url?: string }
}

interface VercelResponse {
  status: (code: number) => VercelResponse
  json: (body: unknown) => void
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const secret = req.headers['x-webhook-secret']
  if (!secret || secret !== process.env.PORTFOLIO_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  const webhookUrl = process.env.N8N_PORTFOLIO_WEBHOOK_URL
  if (!webhookUrl) {
    return res.status(500).json({ error: 'N8N_PORTFOLIO_WEBHOOK_URL no configurada' })
  }

  const { title, tag, url } = req.body ?? {}
  if (!title) {
    return res.status(400).json({ error: 'Falta title' })
  }

  try {
    const forward = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        tag: tag ?? null,
        url: url ?? 'https://reguerostudio.es/inmerso/portfolio',
        status: 'draft',
        source: 'reguero-studio-portfolio',
      }),
    })

    if (!forward.ok) {
      console.error('n8n webhook respondió con error:', forward.status)
      return res.status(502).json({ error: 'El webhook de destino falló' })
    }
  } catch (err) {
    console.error('Error llamando al webhook de n8n:', err)
    return res.status(502).json({ error: 'No se pudo contactar el webhook de destino' })
  }

  return res.status(200).json({ ok: true })
}
