/**
 * Renumeración de códigos de sector — CHINESE VAULT
 * ─────────────────────────────────────────────────────────────────────────────
 * Alinea los códigos S-XX con el orden real del curso tras insertar los
 * sectores de refuerzo (m9b/m9c) y de cierre HSK2 (m19a-e), y deja hueco
 * para HSK 3 (S-28..S-39). Node maneja UTF-8 nativamente: seguro para hanzi.
 *
 * Uso: npx tsx scripts/renumber-sectors.ts
 */

import { readFileSync, writeFileSync } from 'node:fs'

/** [archivo, número viejo, número nuevo] */
const OWN: Array<[string, number, number]> = [
  ['src/content/hsk1/m10.ts', 10, 12],
  ['src/content/hsk2/m11.ts', 11, 13],
  ['src/content/hsk2/m12.ts', 12, 14],
  ['src/content/hsk2/m13.ts', 13, 15],
  ['src/content/hsk2/m14.ts', 14, 16],
  ['src/content/hsk2/m15.ts', 15, 17],
  ['src/content/hsk2/m16.ts', 16, 18],
  ['src/content/hsk2/m17.ts', 17, 19],
  ['src/content/hsk2/m18.ts', 18, 20],
  ['src/content/hsk2/m19.ts', 19, 21],
  ['src/content/hsk2/m20.ts', 20, 27],
]

const pad = (n: number) => String(n).padStart(2, '0')

for (const [file, oldN, newN] of OWN) {
  let text = readFileSync(file, 'utf8')
  const before = text
  const o = pad(oldN)
  const n = pad(newN)
  text = text
    .replace(`code: 'S-${o}'`, `code: 'S-${n}'`)
    .replace(`SECTOR ${oldN} ·`, `SECTOR ${newN} ·`)
    .replace(`Auditoría del Sector ${oldN}`, `Auditoría del Sector ${newN}`)
  if (text === before) {
    console.warn(`[renumber] AVISO: sin cambios en ${file} (¿patrón no encontrado?)`)
  } else {
    writeFileSync(file, text, 'utf8')
    console.log(`[renumber] ${file}: S-${o} → S-${n}`)
  }
}

// Referencias cruzadas en prosa (objetos que cambian de número)
const CROSS: Array<[string, string, string]> = [
  // m9: 贵 vive en m16, que pasa de S-16 a S-18
  ['src/content/hsk1/m9.ts', 'llega en el Sector 16', 'llega en el Sector 18'],
  // m13: 吃饭/以后 viven en m11 (→ S-13); 有点儿 a fondo en m15 (→ S-17)
  // (la regla LARGA va primero: "mecanismo del Sector 11" contiene "del Sector 11")
  ['src/content/hsk2/m13.ts', 'mecanismo del Sector 11', 'mecanismo del Sector 13'],
  ['src/content/hsk2/m13.ts', 'del Sector 11', 'del Sector 13'],
  ['src/content/hsk2/m13.ts', 'a fondo en el Sector 15', 'a fondo en el Sector 17'],
]

for (const [file, from, to] of CROSS) {
  let text = readFileSync(file, 'utf8')
  if (!text.includes(from)) {
    console.warn(`[renumber] AVISO: no encuentro «${from}» en ${file}`)
    continue
  }
  // "mecanismo del Sector 11" ya contiene "del Sector 11": aplicar el LARGO
  // primero evita el doble reemplazo — por eso CROSS va en este orden.
  text = text.split(from).join(to)
  writeFileSync(file, text, 'utf8')
  console.log(`[renumber] ${file}: «${from}» → «${to}»`)
}

console.log('[renumber] terminado')
