/**
 * Análisis de cobertura HSK — compara el corpus del curso con las listas
 * oficiales HSK 2.0 (old-1/2/3.json del repo complete-hsk-vocabulary).
 * Uso: npx tsx scripts/hsk-coverage.ts
 */

import { readFileSync } from 'node:fs'
import { allLessons, entriesById, modules } from '../src/content'
import { DIALOGUES } from '../src/lib/dialogues'

interface HskWord {
  simplified: string
  level: string[]
  forms: { transcriptions: { pinyin: string }; meanings: string[] }[]
}

function loadLevel(n: 1 | 2 | 3): { hanzi: string; pinyin: string }[] {
  const raw = JSON.parse(readFileSync(`scripts/hsk-data/old-${n}.json`, 'utf-8')) as HskWord[]
  return raw.map((w) => ({
    hanzi: w.simplified,
    pinyin: w.forms[0]?.transcriptions.pinyin ?? '',
  }))
}

/** Corpus completo: fichas + builds + ejemplos + diálogos */
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

const corpus = corpusText()

for (const lvl of [1, 2, 3] as const) {
  const words = loadLevel(lvl)
  const missing = words.filter((w) => !corpus.includes(w.hanzi))
  console.log(`\n=== HSK ${lvl}: ${words.length} palabras oficiales, ${missing.length} NO aparecen en el corpus ===`)
  for (const w of missing) {
    console.log(`  ${w.hanzi}\t${w.pinyin}`)
  }
}

// resumen de sectores
console.log(`\nSectores actuales: ${modules.length}`)
