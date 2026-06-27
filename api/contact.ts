/// <reference types="node" />
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildEmailHtml(name: string, email: string, message: string) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')

  return `
  <div style="background-color:#0a0f14;padding:40px 20px;font-family:Helvetica,Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background-color:#0e1c28;border:1px solid rgba(87,184,188,0.15);border-radius:8px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid rgba(87,184,188,0.15);">
        <p style="margin:0;color:#57b8bc;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Reguero Studio</p>
        <p style="margin:6px 0 0;color:#dde8e9;font-size:20px;font-style:italic;">Nuevo lead</p>
      </div>
      <div style="padding:24px 28px;">
        <p style="margin:0 0 4px;color:#57b8bc;font-size:11px;letter-spacing:1px;text-transform:uppercase;">Nombre</p>
        <p style="margin:0 0 20px;color:#dde8e9;font-size:16px;">${safeName}</p>

        <p style="margin:0 0 4px;color:#57b8bc;font-size:11px;letter-spacing:1px;text-transform:uppercase;">Email</p>
        <p style="margin:0 0 20px;">
          <a href="mailto:${safeEmail}" style="color:#9fe0e5;font-size:16px;text-decoration:none;">${safeEmail}</a>
        </p>

        <p style="margin:0 0 4px;color:#57b8bc;font-size:11px;letter-spacing:1px;text-transform:uppercase;">Mensaje</p>
        <p style="margin:0;color:#dde8e9;font-size:15px;line-height:1.6;">${safeMessage}</p>
      </div>
      <div style="padding:16px 28px;border-top:1px solid rgba(87,184,188,0.15);">
        <a href="mailto:${safeEmail}" style="display:inline-block;background-color:#57b8bc;color:#0a0a0a;font-size:13px;font-weight:600;padding:10px 20px;border-radius:999px;text-decoration:none;">Responder a ${safeName.split(' ')[0]}</a>
      </div>
    </div>
    <p style="text-align:center;color:rgba(221,232,233,0.3);font-size:11px;margin-top:20px;">Reguero Studio · Madrid · 2026</p>
  </div>
  `
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
      replyTo: email,
      subject: `Nuevo lead: ${name}`,
      html: buildEmailHtml(name, email, message),
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    })
  } catch (emailError) {
    // El lead ya está en la base de datos aunque el email falle.
    console.error('Error enviando email de aviso:', emailError)
  }

  return res.status(200).json({ ok: true })
}
