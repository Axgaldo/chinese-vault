/* ─────────────────────────────────────────────────────────────────────────────
   Registro del curso: módulos, lecciones y bancos de palabras.

   Para añadir un módulo nuevo: créalo en src/content/hsk1/mX.ts y añádelo
   al array `modules` de aquí. Los ids de entrada (w-*) son globales y
   determinan el archivo de audio /audio/{id}.mp3.
   ───────────────────────────────────────────────────────────────────────────── */

import type { Step, VaultModule } from '../types/content'
import type { Sentence } from '../types/content'
import { hsk0 } from './hsk0'
import { m1 } from './hsk1/m1'
import { m2 } from './hsk1/m2'
import { m3 } from './hsk1/m3'
import { m4 } from './hsk1/m4'
import { m5 } from './hsk1/m5'
import { m6 } from './hsk1/m6'
import { m7 } from './hsk1/m7'
import { m8 } from './hsk1/m8'
import { m9 } from './hsk1/m9'
import { m9b } from './hsk1/m9b'
import { m9c } from './hsk1/m9c'
import { m10 } from './hsk1/m10'
import { m11 } from './hsk2/m11'
import { m12 } from './hsk2/m12'
import { m13 } from './hsk2/m13'
import { m14 } from './hsk2/m14'
import { m15 } from './hsk2/m15'
import { m16 } from './hsk2/m16'
import { m17 } from './hsk2/m17'
import { m18 } from './hsk2/m18'
import { m19 } from './hsk2/m19'
import { m19a } from './hsk2/m19a'
import { m19b } from './hsk2/m19b'
import { m19c } from './hsk2/m19c'
import { m19d } from './hsk2/m19d'
import { m19e } from './hsk2/m19e'
import { m20 } from './hsk2/m20'
import { m21 } from './hsk3/m21'
import { m22 } from './hsk3/m22'
import { m23 } from './hsk3/m23'
import { m24 } from './hsk3/m24'
import { m25 } from './hsk3/m25'
import { m26 } from './hsk3/m26'
import { m27 } from './hsk3/m27'
import { m28 } from './hsk3/m28'
import { m29 } from './hsk3/m29'
import { m30 } from './hsk3/m30'
import { m31 } from './hsk3/m31'

export const modules: VaultModule[] = [
  hsk0,
  // HSK 1 — S-00 a S-12 (12 sectores: el 10 y el 11 cierran las palabras oficiales)
  m1, m2, m3, m4, m5, m6, m7, m8, m9, m9b, m9c, m10,
  // HSK 2 — S-13 a S-27 (15 sectores: el 22-26 cierran las palabras oficiales)
  m11, m12, m13, m14, m15, m16, m17, m18, m19, m19a, m19b, m19c, m19d, m19e, m20,
  // HSK 3 — S-28 a S-38 (las 298 palabras oficiales del nivel, completas)
  m21, m22, m23, m24, m25, m26, m27, m28, m29, m30, m31,
]

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
    case 'dictate':
    case 'speak':
    case 'write':
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

/**
 * Frases reales del curso donde suena una palabra (para verla en contexto).
 * Prioriza frases de lecciones ya completadas; excluye la lección en curso
 * (que suele contener el build que viene justo después).
 */
export function contextSentences(
  entryId: string,
  completedLessonIds: string[],
  excludeLessonId?: string,
  max = 2,
): Sentence[] {
  const entry = entriesById.get(entryId)
  if (!entry) return []
  const seen = new Set<string>()
  const out: Sentence[] = []
  // pasada 1: lecciones completadas · pasada 2: resto (adelantos con traducción)
  for (const pass of [1, 2]) {
    for (const lesson of allLessons) {
      const isCompleted = completedLessonIds.includes(lesson.id)
      if ((pass === 1) !== isCompleted) continue
      if (lesson.id === excludeLessonId) continue
      for (const step of lesson.steps) {
        if (step.type !== 'build') continue
        const s = step.sentence
        if (!s.hanzi.includes(entry.hanzi)) continue
        if (seen.has(s.pinyin)) continue
        seen.add(s.pinyin)
        out.push(s)
        if (out.length >= max) return out
      }
    }
  }
  return out
}
