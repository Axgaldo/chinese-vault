/**
 * Limpieza de audio — CHINESE VAULT
 * ─────────────────────────────────────────────────────────────────────────────
 * Los slugs de audio llevan TONOS desde la v2.9.0 (ma1 ≠ ma3 ≠ ma4).
 * Este script borra los MP3 con el esquema antiguo (sin dígito de tono en
 * sílabas con tono) para que la carpeta quede limpia tras `npm run audio:force`.
 * ───────────────────────────────────────────────────────────────────────────── */

import { readdir, unlink } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import process from 'node:process'

const DIR = 'public/audio'
const DRY_RUN = process.argv.includes('--dry')

// un slug del esquema nuevo tiene dígitos de tono; el antiguo (v≤2.8) nunca
// los tenía: "s-ni-hao-ma.mp3" vs "s-ni3-hao3-ma.mp3". Borraremos los archivos
// cuyo nombre NO contenga ningún dígito de tono (los .mp3 con solo letras+guiones)
async function main() {
  const files = (await readdir(DIR)).filter((f) => f.endsWith('.mp3'))
  let removed = 0
  for (const f of files) {
    const name = f.replace(/^s-/, '').replace(/\.mp3$/, '')
    // esquema nuevo: cada trozo termina en dígito (salvo sílabas neutras);
    // esquema viejo: NINGÚN trozo termina en dígito
    const parts = name.split('-')
    const anyToned = parts.some((p) => /\d$/.test(p))
    if (!anyToned) {
      if (!DRY_RUN) await unlink(`${DIR}/${f}`)
      removed++
    }
  }
  console.log(`[audio-clean] ${removed} MP3 del esquema antiguo ${DRY_RUN ? 'detectados (dry-run)' : 'eliminados'}`)
}

if (existsSync(DIR)) void main()
