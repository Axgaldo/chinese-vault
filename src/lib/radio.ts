/* ─────────────────────────────────────────────────────────────────────────────
   RADIO DEL REFUGIO 📻 — modo de escucha pura.

   "Programas" generados a partir del contenido ya aprendido:
   • BOLETÍN (frases de un sector): suena una frase →
       - ¿qué significa? (elegir traducción)
       - dictado completo (escribir el pinyin que oyes)
   • TONOS & MÚSICA: entrenador de oído con las palabras vistas.

   Solo usa frases/entradas de lecciones COMPLETADAS: la radio nunca
   suena algo que el morador no haya visto antes.
   ───────────────────────────────────────────────────────────────────────────── */

import { allLessons, entriesById, moduleOfLesson } from '../content'
import { sentenceAudioId } from './audio'
import { pinyinSlug, syllabify } from './pinyin'
import { shuffle } from './questions'
import type { Sentence, Tone, VocabEntry } from '../types/content'

export interface RadioSentence {
  sentence: Sentence
  moduleId: string
  code: string
}

export type RadioItem =
  /** suena una frase → elegir qué significa */
  | { kind: 'meaning'; sentence: Sentence; options: Sentence[]; retry?: boolean }
  /** suena una frase → escribir el pinyin completo (sin tonos) */
  | { kind: 'dictate'; sentence: Sentence; retry?: boolean }
  /** suena una palabra → identificar su tono */
  | { kind: 'tone'; entry: VocabEntry; syllable: string; tone: Tone; retry?: boolean }

/** Todas las frases de las lecciones completadas (dedupe por audio) */
export function unlockedSentences(completedLessonIds: string[]): RadioSentence[] {
  const seen = new Set<string>()
  const out: RadioSentence[] = []
  for (const lesson of allLessons) {
    if (!completedLessonIds.includes(lesson.id)) continue
    const mod = moduleOfLesson(lesson.id)
    for (const step of lesson.steps) {
      if (step.type !== 'build') continue
      const id = sentenceAudioId(step.sentence)
      if (seen.has(id)) continue
      seen.add(id)
      out.push({ sentence: step.sentence, moduleId: mod?.id ?? '', code: mod?.code ?? 'S-??' })
    }
  }
  return out
}

/** Palabras vistas con al menos una sílaba tonal (para el programa de tonos) */
export function tonePool(completedLessonIds: string[]): VocabEntry[] {
  const ids = new Set<string>()
  for (const lesson of allLessons) {
    if (!completedLessonIds.includes(lesson.id)) continue
    for (const step of lesson.steps) {
      if (step.type === 'tone') ids.add(step.entry)
      if (step.type === 'intro' || step.type === 'choose-es' || step.type === 'listen' || step.type === 'dictate' || step.type === 'type-pinyin' || step.type === 'choose-hanzi') {
        const entry = entriesById.get(step.entry)
        if (entry && syllabify(entry.pinyin).some((s) => s.tone !== 5)) ids.add(entry.id)
      }
    }
  }
  return [...ids].map((id) => entriesById.get(id)!).filter(Boolean)
}

/** Sesión del programa de frases: mezcla de significado y dictado */
export function buildRadioSession(pool: RadioSentence[], size = 8): RadioItem[] {
  const picked = shuffle(pool).slice(0, size)
  const items: RadioItem[] = []
  for (const s of picked) {
    // alterna dictado (más difícil) y significado
    if (Math.random() < 0.45) {
      items.push({ kind: 'dictate', sentence: s.sentence })
    } else {
      const distractors = shuffle(
        pool.filter((p) => pinyinSlug(p.sentence.pinyin) !== pinyinSlug(s.sentence.pinyin)),
      ).slice(0, 3)
      const options = shuffle([s.sentence, ...distractors.map((d) => d.sentence)])
      items.push({ kind: 'meaning', sentence: s.sentence, options })
    }
  }
  return items
}

/** Sesión del programa de tonos */
export function buildToneSession(pool: VocabEntry[], size = 8): RadioItem[] {
  const items: RadioItem[] = []
  const picked = shuffle(pool).slice(0, size)
  for (const entry of picked) {
    const syl = syllabify(entry.pinyin).find((s) => s.tone !== 5)
    if (!syl) continue
    const display = syl.text.normalize('NFC')
    items.push({ kind: 'tone', entry, syllable: display, tone: syl.tone as Tone })
  }
  return items
}
