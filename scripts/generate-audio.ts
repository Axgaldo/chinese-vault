/**
 * Generador de audio del curso — CHINESE VAULT
 * ─────────────────────────────────────────────────────────────────────────────
 * Sintetiza con la voz neuronal gratuita de Microsoft Edge (Read Aloud API)
 * todos los MP3 que faltan en public/audio:
 *   • /audio/{id}.mp3        → palabras y frases del curso
 *   • /audio/s-{slug}.mp3    → frases de ejemplo (apuntes y retos de construir)
 *
 * Uso:
 *   npm run audio              # genera solo lo que falte
 *   npm run audio:force        # regenera todo
 *   npm run audio -- --only w-ni-hao   # solo un id (para pruebas)
 *
 * Los MP3 quedan en .gitignore: nada de binarios en Git. La app hace fallback
 * automático a la Web Speech API cuando un archivo no existe.
 * ───────────────────────────────────────────────────────────────────────────── */

import { createWriteStream } from 'node:fs'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'
import { allLessons, entriesById } from '../src/content'
import { DIALOGUES } from '../src/lib/dialogues'
import { pinyinSlug } from '../src/lib/pinyin'
import type { Sentence } from '../src/types/content'

const VOICE = 'zh-CN-XiaoxiaoNeural'
const OUT_DIR = 'public/audio'

const FORCE = process.argv.includes('--force')
const ONLY = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : undefined

interface Task {
  file: string
  text: string
}

/** Todas las frases de ejemplo del curso (id determinista a partir del pinyin) */
function sentenceTasks(): Task[] {
  const sentences: Sentence[] = []
  for (const lesson of allLessons) {
    for (const note of lesson.notes) sentences.push(...note.examples)
    for (const step of lesson.steps) {
      if (step.type === 'build') sentences.push(step.sentence)
    }
  }
  // diálogos de la Radio: cada línea es una frase más
  for (const d of DIALOGUES) {
    for (const line of d.lines) sentences.push(line)
  }
  const seen = new Set<string>()
  const tasks: Task[] = []
  for (const s of sentences) {
    const slug = pinyinSlug(s.pinyin)
    if (!slug || seen.has(slug)) continue
    seen.add(slug)
    tasks.push({ file: `s-${slug}.mp3`, text: s.hanzi })
  }
  return tasks
}

const xmlEscape = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function synthesize(tts: MsEdgeTTS, text: string, outPath: string): Promise<void> {
  const { audioStream } = await tts.toStream(xmlEscape(text))
  audioStream.on('error', (err) => {
    throw err
  })
  await pipeline(audioStream, createWriteStream(outPath))
}

async function main() {
  const tasks: Task[] = []
  for (const [id, entry] of entriesById) {
    tasks.push({ file: `${id}.mp3`, text: entry.hanzi })
  }
  tasks.push(...sentenceTasks())

  const filtered = tasks.filter((t) => {
    if (ONLY) return t.file === ONLY || t.file === `${ONLY}.mp3`
    if (FORCE) return true
    const p = `${OUT_DIR}/${t.file}`
    // existe y no está vacío → skip
    return !(existsSync(p) && statSync(p).size > 0)
  })

  if (!filtered.length) {
    console.log('[audio] todo al día — no hay archivos que generar.')
    return
  }

  mkdirSync(OUT_DIR, { recursive: true })
  const tts = new MsEdgeTTS({ connectionTimeoutMs: 15000, synthesisTimeoutMs: 30000 })
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
  console.log(`[audio] conectado a ${VOICE} — ${filtered.length} archivo(s) por generar`)

  let ok = 0
  let fail = 0
  for (const [i, task] of filtered.entries()) {
    const out = `${OUT_DIR}/${task.file}`
    try {
      await synthesize(tts, task.text, out)
      ok++
      console.log(`[audio] (${i + 1}/${filtered.length}) ${out} ← "${task.text}"`)
    } catch (err) {
      fail++
      console.error(`[audio] FALLO (${i + 1}/${filtered.length}) ${out} ← "${task.text}":`, err)
    }
    // pequeño respiro entre peticiones
    await new Promise((r) => setTimeout(r, 150))
  }

  console.log(`[audio] terminado: ${ok} generados, ${fail} fallos, ${tasks.length - filtered.length} ya existían`)
  if (fail > 0) process.exitCode = 1
}

void main()
