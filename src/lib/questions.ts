/* ─────────────────────────────────────────────────────────────────────────────
   Generación de retos: distractores y retos de repaso (SRS)
   ───────────────────────────────────────────────────────────────────────────── */

import { allLessons, entriesById, seenEntries } from '../content'
import type { Step, Tone } from '../types/content'

/** Barajado Fisher-Yates (copia) */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Pool de distractores: palabras vistas y, si no alcanzan, todo el curso */
function distractorPool(entryId: string, completedLessonIds: string[]): string[] {
  const seen = seenEntries(completedLessonIds).filter((id) => id !== entryId)
  if (seen.length >= 3) return seen
  const rest = [...entriesById.keys()].filter((id) => id !== entryId && !seen.includes(id))
  return [...seen, ...rest]
}

/** Opciones de respuesta: [correcta + 3 distractores] barajadas */
export function optionsFor(entryId: string, completedLessonIds: string[], total = 4): string[] {
  const pool = shuffle(distractorPool(entryId, completedLessonIds)).slice(0, total - 1)
  return shuffle([entryId, ...pool])
}

/** ¿El paso puntúa para estrellas/XP? (intros y apuntes no) */
export function isGraded(step: Step): boolean {
  return step.type !== 'intro' && step.type !== 'note'
}

/**
 * Genera el reto de repaso para una tarjeta SRS.
 * Rota el tipo según las repeticiones para no mecanizar la respuesta.
 */
export function reviewStepFor(entryId: string, reps: number): Step {
  const entry = entriesById.get(entryId)
  // Palabras largas: dictado de oído puro (type-pinyin si es muy corta)
  if (entry && entry.hanzi.length >= 3 && reps % 5 === 3) {
    return { type: 'dictate', entry: entryId }
  }
  if (entry && entry.hanzi.length < 3 && reps % 5 === 3) {
    return { type: 'type-pinyin', entry: entryId }
  }
  // cada 5ª repetición: desafío oral (el bucle oído-boca)
  if (reps % 5 === 4) {
    return { type: 'speak', entry: entryId }
  }
  switch (reps % 3) {
    case 0:
      return { type: 'choose-es', entry: entryId }
    case 1:
      return { type: 'listen', entry: entryId }
    default:
      return { type: 'choose-hanzi', entry: entryId }
  }
}

/** Tonos para el entrenador rápido (HSK0) */
export const ALL_TONES: Tone[] = [1, 2, 3, 4]

/** Total de lecciones del curso (para estadísticas) */
export const TOTAL_LESSONS = allLessons.length
