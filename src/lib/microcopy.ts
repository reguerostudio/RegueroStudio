/** Frases cortas para huecos vacíos del portfolio. Tono: yo Fer, sin máscara. */
const INMERSO_PLACEHOLDER_COPY = [
  'En construcción. Como todo lo que merece la pena.',
  'Todavía no. Pronto.',
  'Esto se llena con trabajo, no con relleno.',
  'Vacío por ahora. No por siempre.',
  'En proceso. Sin prisa, sin trampa.',
  'Lo que falta también cuenta la historia.',
  'Aquí va algo real en cuanto lo tenga.',
]

/** Selección determinista por seed (ej. el título de la pieza) para que
 * cada card muestre siempre la misma frase sin parpadear entre renders. */
export function pickMicrocopy(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }
  const idx = Math.abs(hash) % INMERSO_PLACEHOLDER_COPY.length
  return INMERSO_PLACEHOLDER_COPY[idx]
}

/** Formatea el número secuencial de una pieza real del portfolio. */
export function formatSighting(n: number): string {
  return `Avistamiento ${String(n).padStart(3, '0')}`
}
