/**
 * Tokens de color de Reguero Studio.
 * SURFACE = capa turquesa (superficie, contenido público estándar).
 * INMERSO = capa abisal (manifiesto crudo, ver inmerso-brief.md).
 */

export const SURFACE = {
  textLight: '#dde8e9',
  turquoise: '#57b8bc',
  lightAccent: '#9fe0e5',
  lightAccent2: '#8ce1e6',
  darkContrast: '#0a0a0a',
} as const

export const INMERSO = {
  base: '#050308',       // negro abisal, fondo dominante
  violet: '#2C1FA8',     // superficies y escenas de sección
  bioGreen: '#6EF2A8',   // glow puntual — nunca superficies grandes
  accent: '#FF9E5E',     // CTA, único naranja
  text: '#EDEAF5',       // texto principal dentro de INMERSO
} as const

/** Convierte un hex de 6 dígitos a rgba() con la opacidad dada. */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
