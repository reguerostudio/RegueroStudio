import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Vercel serverless function (auto-detectada por estar en /api).
// Necesita estas env vars configuradas en el proyecto de Vercel:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY   (nunca la anon key, esta es solo de servidor)
//   RESEND_API_KEY
//   CONTACT_EMAIL_TO            (a qué email llegan los avisos de lead)

interface VercelRequest {
  method?: string
  body: { name?: string; email?: string; message?: string }
}

interface VercelResponse {
  status: (code: number) => VercelResponse
  json: (body: unknown) => void
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { name, email, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos' })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { error: dbError } = await supabase.from('leads').insert({ name, email, message })

  if (dbError) {
    console.error('Error guardando lead en Supabase:', dbError)
    return res.status(500).json({ error: 'No se pudo guardar el lead' })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Reguero Studio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL_TO!,
      subject: `Nuevo lead: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    })
  } catch (emailError) {
    // El lead ya está en la base de datos aunque el email falle.
    console.error('Error enviando email de aviso:', emailError)
  }

  return res.status(200).json({ ok: true })
}
