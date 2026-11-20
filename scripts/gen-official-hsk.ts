/**
 * Generador de la lista oficial HSK — emite src/content/official-hsk.ts
 * desde scripts/hsk-data/old-{1,2,3}.json (repo complete-hsk-vocabulary, MIT).
 * Ese TS alimenta el test de cobertura permanente (content/coverage.test.ts).
 *
 * Uso: npx tsx scripts/gen-official-hsk.ts
 */

import { readFileSync, writeFileSync } from 'node:fs'

interface HskWord {
  simplified: string
  level: string[]
  forms: { transcriptions: { pinyin: string } }[]
}

const header = `/* ─────────────────────────────────────────────────────────────────────────────
   LISTAS OFICIALES HSK 2.0 (simplificado) — generadas por scripts/gen-official-hsk.ts
   desde complete-hsk-vocabulary (MIT). NO editar a mano: regenerar.
   Fuente del test de cobertura (content/coverage.test.ts).
   ───────────────────────────────────────────────────────────────────────────── */

`

let out = header
for (const lvl of [1, 2, 3] as const) {
  const raw = JSON.parse(readFileSync(`scripts/hsk-data/old-${lvl}.json`, 'utf-8')) as HskWord[]
  const words = raw.map((w) => ({ hanzi: w.simplified, pinyin: w.forms[0]?.transcriptions.pinyin ?? '' }))
  out += `/** HSK 2.0 — nivel ${lvl} (exclusivo): ${words.length} palabras */\nexport const OFFICIAL_HSK${lvl}: string[] = [\n`
  for (const w of words) out += `  ${JSON.stringify(w.hanzi)},\n`
  out += `]\n\n`
}

writeFileSync('src/content/official-hsk.ts', out)
console.log('[official-hsk] src/content/official-hsk.ts generado')
