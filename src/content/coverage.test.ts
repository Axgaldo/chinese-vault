/* ─────────────────────────────────────────────────────────────────────────────
   COBERTURA OFICIAL HSK — el curso debe contener TODAS las palabras de las
   listas oficiales HSK 2.0 (niveles 1-3). "Contener" = el hanzi aparece en
   fichas, builds, ejemplos de apuntes o diálogos (el corpus completo).
   Este test es el guardián de COV-01: ninguna palabra oficial puede quedarse
   fuera. Las listas viven en official-hsk.ts (regeneradas de la fuente MIT).
   ───────────────────────────────────────────────────────────────────────────── */

import { describe, expect, it } from 'vitest'
import { allLessons } from './index'
import { entriesById } from './index'
import { DIALOGUES } from '../lib/dialogues'
import { OFFICIAL_HSK1, OFFICIAL_HSK2, OFFICIAL_HSK3 } from './official-hsk'

/** Corpus completo del curso (fichas + frases + ejemplos + diálogos) */
function corpusText(): string {
  let text = ''
  for (const e of entriesById.values()) text += e.hanzi
  for (const lesson of allLessons) {
    for (const step of lesson.steps) {
      if (step.type === 'build') text += step.sentence.hanzi
    }
    for (const note of lesson.notes) {
      for (const ex of note.examples) text += ex.hanzi
    }
  }
  for (const d of DIALOGUES) for (const l of d.lines) text += l.hanzi
  return text
}

describe('cobertura oficial HSK', () => {
  const corpus = corpusText()

  function missingOf(list: string[]): string[] {
    return list.filter((w) => !corpus.includes(w))
  }

  it('HSK 1: las 150 palabras oficiales están todas en el curso', () => {
    expect(missingOf(OFFICIAL_HSK1)).toEqual([])
  })

  it('HSK 2: todas las palabras oficiales del nivel 2 están en el curso', () => {
    expect(missingOf(OFFICIAL_HSK2)).toEqual([])
  })

  it('HSK 3: todas las palabras oficiales del nivel 3 están en el curso', () => {
    expect(missingOf(OFFICIAL_HSK3)).toEqual([])
  })

  it('las listas oficiales no contienen duplicados', () => {
    const uniq = (l: string[]) => new Set(l).size === l.length
    expect(uniq(OFFICIAL_HSK1)).toBe(true)
    expect(uniq(OFFICIAL_HSK2)).toBe(true)
    expect(uniq(OFFICIAL_HSK3)).toBe(true)
  })
})
