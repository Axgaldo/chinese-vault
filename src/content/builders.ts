/* ─────────────────────────────────────────────────────────────────────────────
   Helpers para autorar contenido. Así las lecciones se definen casi en tabla:

     const steps = [
       ...drill('w-ni-hao'),          // intro + traducción + listening + hanzi
       noteStep('n-ma5'),             // apunte de gramática
       build('你好吗？', 'nǐ hǎo ma?', '¿Cómo estás?'),
       match('w-ni-hao', 'w-hao3'),
     ]
   ───────────────────────────────────────────────────────────────────────────── */

import type {
  GrammarNote,
  Lesson,
  LessonKind,
  Step,
  Tone,
  VocabEntry,
} from '../types/content'

/** Define una palabra del banco del módulo */
export function e(
  id: string,
  hanzi: string,
  pinyin: string,
  es: string,
  emoji?: string,
  literal?: string,
): VocabEntry {
  return { id, hanzi, pinyin, es, emoji, literal }
}

/** Define un apunte de gramática (el cuerpo acepta párrafos como array) */
export function grammar(
  id: string,
  title: string,
  body: string | string[],
  examples: [hanzi: string, pinyin: string, es: string][],
): GrammarNote {
  return {
    id,
    title,
    body: Array.isArray(body) ? body.join('\n') : body,
    examples: examples.map(([hanzi, pinyin, es]) => ({ hanzi, pinyin, es })),
  }
}

/** Define una lección */
export function lesson(
  id: string,
  title: string,
  kind: LessonKind,
  steps: Step[],
  notes: GrammarNote[] = [],
): Lesson {
  return { id, title, kind, steps, notes }
}

/* ── Secuencias de pasos reutilizables ────────────────────────────────────── */

/** Presentación de palabra (tarjeta con audio) */
export const intro = (id: string): Step => ({ type: 'intro', entry: id })

/** Presentación + escucha (para palabras que solo se muestran de pasada) */
export const introLite = (id: string): Step[] => [{ type: 'intro', entry: id }, { type: 'listen', entry: id }]

/** Repaso ligero de palabra ya presentada (sin intro) */
export const practice = (id: string): Step[] => [
  { type: 'choose-es', entry: id },
  { type: 'listen', entry: id },
]

/** Ciclo completo de una palabra nueva */
export const drill = (id: string): Step[] => [
  { type: 'intro', entry: id },
  { type: 'choose-es', entry: id },
  { type: 'listen', entry: id },
  { type: 'choose-hanzi', entry: id },
]

/** Entrenador de tonos sobre una sílaba */
export const toneDrill = (entry: string, syllable: string, tone: Tone): Step => ({
  type: 'tone',
  entry,
  syllable,
  tone,
})

/** Escribir el pinyin */
export const typeP = (id: string): Step => ({ type: 'type-pinyin', entry: id })

/** Construir una frase ordenando sus caracteres */
export const build = (hanzi: string, pinyin: string, es: string): Step => ({
  type: 'build',
  sentence: { hanzi, pinyin, es },
})

/** Emparejar palabras */
export const match = (...ids: string[]): Step => ({ type: 'match', entries: ids })

/** Mostrar un apunte de gramática */
export const noteStep = (id: string): Step => ({ type: 'note', note: id })
