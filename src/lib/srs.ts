/* ─────────────────────────────────────────────────────────────────────────────
   Repetición espaciada (SM-2 simplificado)

   Cada palabra vista entra en el pool de repaso. Al completar lecciones las
   nuevas palabras quedan "due" al día siguiente; cada repaso acertado expande
   el intervalo (1d → 2-3d → ~1 semana → …).
   ───────────────────────────────────────────────────────────────────────────── */

import type { SrsCard } from '../types/progress'

export const DAY = 86_400_000

export type Grade = 'again' | 'hard' | 'good' | 'easy'

export function newCard(dueInDays = 1): SrsCard {
  return { due: Date.now() + dueInDays * DAY, interval: 0, ease: 2.5, reps: 0, lapses: 0 }
}

/** Aplica una nota a una tarjeta y devuelve la nueva tarjeta */
export function gradeCard(card: SrsCard, g: Grade): SrsCard {
  const c: SrsCard = { ...card, reps: card.reps + 1 }

  switch (g) {
    case 'again':
      c.lapses += 1
      c.ease = Math.max(1.3, c.ease - 0.2)
      c.interval = 0
      // reintenta en ~10 minutos dentro de la sesión de repaso
      c.due = Date.now() + 10 * 60_000
      break
    case 'hard':
      c.ease = Math.max(1.3, c.ease - 0.05)
      c.interval = c.interval < 1 ? 0.5 : Math.max(1, c.interval * 1.2)
      c.due = Date.now() + c.interval * DAY
      break
    case 'good':
      c.interval = c.interval < 1 ? 1 : c.interval * c.ease
      c.due = Date.now() + c.interval * DAY
      break
    case 'easy':
      c.interval = c.interval < 1 ? 3 : c.interval * c.ease * 1.3
      c.due = Date.now() + c.interval * DAY
      break
  }

  // Redondeos de intervalo: 1d → 2d → 3d → ~5d → ~8d → ~2 sem → …
  return c
}

/** Nota sugerida a partir del rendimiento en la sesión de repaso */
export function suggestGrade(firstTry: boolean, fast: boolean): Grade {
  if (!firstTry) return 'again'
  return fast ? 'easy' : 'good'
}

/** Tarjetas que tocan repasar, de más antigua a más reciente */
export function dueCardIds(srs: Record<string, SrsCard>): string[] {
  const now = Date.now()
  return Object.entries(srs)
    .filter(([, c]) => c.due <= now)
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => id)
}

/** Cuánto falta (ms) para la próxima tarjeta, aunque no esté due aún */
export function nextDueIn(srs: Record<string, SrsCard>): number | null {
  const future = Object.values(srs)
    .map((c) => c.due)
    .filter((d) => d > Date.now())
  if (!future.length) return null
  return Math.min(...future) - Date.now()
}
