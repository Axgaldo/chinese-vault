/* ─────────────────────────────────────────────────────────────────────────────
   Registro del curso: módulos, lecciones y bancos de palabras.

   Para añadir un módulo nuevo: créalo en src/content/hsk1/mX.ts y añádelo
   al array `modules` de aquí. Los ids de entrada (w-*) son globales y
   determinan el archivo de audio /audio/{id}.mp3.
   ───────────────────────────────────────────────────────────────────────────── */

import type { Step, VaultModule } from '../types/content'
import { hsk0 } from './hsk0'
import { m1 } from './hsk1/m1'
import { m2 } from './hsk1/m2'
import { m3 } from './hsk1/m3'
import { m4 } from './hsk1/m4'
import { m5 } from './hsk1/m5'
import { m6 } from './hsk1/m6'

export const modules: VaultModule[] = [hsk0, m1, m2, m3, m4, m5, m6]

export const moduleById = new Map(modules.map((m) => [m.id, m]))

export const allLessons = modules.flatMap((m) => m.lessons)

export const lessonById = new Map(allLessons.map((l) => [l.id, l]))

export const entriesById = new Map(
  modules.flatMap((m) => m.entries.map((en) => [en.id, en] as const)),
)

export const notesById = new Map(
  allLessons.flatMap((l) => l.notes.map((n) => [n.id, n] as const)),
)

/** Módulo al que pertenece una lección */
export function moduleOfLesson(lessonId: string): VaultModule | undefined {
  return modules.find((m) => m.lessons.some((l) => l.id === lessonId))
}

/** Ids de palabra referenciados por un paso */
export function entryIdsInStep(step: Step): string[] {
  switch (step.type) {
    case 'intro':
    case 'choose-es':
    case 'choose-hanzi':
    case 'listen':
    case 'type-pinyin':
      return [step.entry]
    case 'tone':
      return [step.entry]
    case 'match':
      return step.entries
    case 'build':
    case 'note':
      return []
  }
}

/** Palabras nuevas que enseña una lección (ids únicos, en orden) */
export function lessonEntryIds(lessonId: string): string[] {
  const lesson = lessonById.get(lessonId)
  if (!lesson) return []
  const ids: string[] = []
  for (const s of lesson.steps) {
    for (const id of entryIdsInStep(s)) {
      if (!ids.includes(id)) ids.push(id)
    }
  }
  return ids
}

/** Todas las palabras vistas al completar un conjunto de lecciones (en orden) */
export function seenEntries(completedLessonIds: string[]): string[] {
  const ids: string[] = []
  for (const lesson of allLessons) {
    if (!completedLessonIds.includes(lesson.id)) continue
    for (const id of lessonEntryIds(lesson.id)) {
      if (!ids.includes(id)) ids.push(id)
    }
  }
  return ids
}

/** ¿La lección está desbloqueada? (lineal: la anterior completada) */
export function isLessonUnlocked(lessonId: string, completedLessonIds: string[]): boolean {
  const idx = allLessons.findIndex((l) => l.id === lessonId)
  if (idx <= 0) return idx === 0
  return completedLessonIds.includes(allLessons[idx - 1].id)
}

/** Siguiente lección pendiente (la primera no completada en orden) */
export function nextLessonId(completedLessonIds: string[]): string {
  return allLessons.find((l) => !completedLessonIds.includes(l.id))?.id ?? allLessons[0].id
}

/** Apuntes de gramática desbloqueados por lecciones completadas */
export function unlockedNotes(completedLessonIds: string[]) {
  return allLessons
    .filter((l) => completedLessonIds.includes(l.id))
    .flatMap((l) => l.notes)
}
