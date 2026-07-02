import { useEffect } from 'react'

interface SeoHeadProps {
  title: string
  description: string
  path: string // ej. "/contacto"
  image?: string // URL absoluta de OG image; si no se pasa, mantiene la de index.html
  noindex?: boolean
}

const SITE_URL = 'https://reguerostudio.es'
const DEFAULT_TITLE = 'Reguero Studio · Diseño de marca y web en Madrid'
const DEFAULT_DESCRIPTION =
  'Dirección creativa para marcas que no necesitan gritar. Identidad visual, estrategia digital y web para negocios con algo que decir.'
const DEFAULT_IMAGE = `${SITE_URL}/api/og`

function setMeta(selector: string, attr: string, value: string) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Gestiona title/description/canonical/OG/robots por ruta en esta SPA sin
 * SSR. Restaura los valores por defecto de index.html al desmontar.
 */
export default function SeoHead({ title, description, path, image, noindex }: SeoHeadProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const ogImage = image ?? DEFAULT_IMAGE

    document.title = title

    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', ogImage)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:image"]', 'content', ogImage)
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex,nofollow' : 'index,follow')

    return () => {
      document.title = DEFAULT_TITLE
      setMeta('meta[name="description"]', 'content', DEFAULT_DESCRIPTION)
      setMeta('link[rel="canonical"]', 'href', `${SITE_URL}/`)
      setMeta('meta[property="og:title"]', 'content', DEFAULT_TITLE)
      setMeta('meta[property="og:description"]', 'content', DEFAULT_DESCRIPTION)
      setMeta('meta[property="og:url"]', 'content', `${SITE_URL}/`)
      setMeta('meta[property="og:image"]', 'content', DEFAULT_IMAGE)
      setMeta('meta[name="twitter:title"]', 'content', DEFAULT_TITLE)
      setMeta('meta[name="twitter:description"]', 'content', DEFAULT_DESCRIPTION)
      setMeta('meta[name="twitter:image"]', 'content', DEFAULT_IMAGE)
      setMeta('meta[name="robots"]', 'content', 'index,follow')
    }
  }, [title, description, path, image, noindex])

  return null
}
