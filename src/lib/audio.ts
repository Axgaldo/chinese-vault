/* ─────────────────────────────────────────────────────────────────────────────
   Audio chino — sistema híbrido:
   1) MP3 pre-generado en /audio/{id}.mp3 (scripts/generate-audio.ts)
   2) Fallback automático: Web Speech API del navegador (voz zh-CN)
   ───────────────────────────────────────────────────────────────────────────── */

import type { Sentence, VocabEntry } from '../types/content'
import { pinyinSlug } from './pinyin'

/** Base de despliegue: '/' en local, '/chinese-vault/' en GitHub Pages */
const BASE = import.meta.env.BASE_URL

/** Ids cuyo MP3 no existe (para no reintentar 404 en cada reproducción) */
const missingFiles = new Set<string>()

/** Audio <html> en curso, para cortarlo al navegar */
let currentEl: HTMLAudioElement | null = null

/** Velocidad configurable desde ajustes */
let audioRate = 0.9

export function setAudioRate(rate: number) {
  audioRate = rate
}

/* ── Web Speech API ────────────────────────────────────────────────────────── */

let voices: SpeechSynthesisVoice[] = []

function loadVoices() {
  if (typeof speechSynthesis === 'undefined') return
  voices = speechSynthesis.getVoices()
}

if (typeof speechSynthesis !== 'undefined') {
  loadVoices()
  speechSynthesis.addEventListener('voiceschanged', loadVoices)
}

/** Elige la mejor voz china disponible */
function pickVoice(): SpeechSynthesisVoice | null {
  if (!voices.length) loadVoices()
  const zh = voices.filter((v) => v.lang?.toLowerCase().startsWith('zh'))
  if (!zh.length) return null
  // Prioridad: voces "natural" de Edge/Chrome online
  const preferred = zh.find((v) => /xiaoxiao|xiaoxi|yunxi|yaoyao|huihui|yunyang/i.test(v.name))
  return preferred ?? zh[0]
}

function tts(hanzi: string, rate?: number) {
  if (typeof speechSynthesis === 'undefined') return
  const voice = pickVoice()
  if (!voice && !voices.length) {
    // Puede que las voces aún no estén cargadas: reintento diferido
    loadVoices()
    return
  }
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(hanzi)
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? 'zh-CN'
  u.rate = rate ?? audioRate
  u.pitch = 1
  speechSynthesis.speak(u)
}

/* ── Reproducción de archivos ─────────────────────────────────────────────── */

function tryPlayFile(url: string, fallback: () => void) {
  const el = new Audio(url)
  el.playbackRate = audioRate
  currentEl = el
  el.onerror = () => {
    missingFiles.add(url)
    fallback()
  }
  void el.play().catch(() => {
    missingFiles.add(url)
    fallback()
  })
}

export function stopAudio() {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel()
  if (currentEl) {
    currentEl.pause()
    currentEl = null
  }
}

/* ── API pública ───────────────────────────────────────────────────────────── */

/** Reproduce una palabra/frase del curso (MP3 si existe, si no TTS) */
export function speakEntry(entry: VocabEntry, rate?: number) {
  const url = `${BASE}audio/${entry.id}.mp3`
  if (missingFiles.has(url)) return tts(entry.hanzi, rate)
  tryPlayFile(url, () => tts(entry.hanzi, rate))
}

/** Id de audio de una frase ejemplo (estable a partir de su pinyin) */
export function sentenceAudioId(s: Sentence): string {
  return `s-${pinyinSlug(s.pinyin) || pinyinSlug(s.hanzi)}`
}

/** Reproduce una frase ejemplo */
export function speakSentence(s: Sentence, rate?: number) {
  const url = `${BASE}audio/${sentenceAudioId(s)}.mp3`
  if (missingFiles.has(url)) return tts(s.hanzi, rate)
  tryPlayFile(url, () => tts(s.hanzi, rate))
}

/** Reproduce varias frases EN SECUENCIA (diálogos completos, sin solapar) */
export async function speakSentencesSequentially(list: Sentence[], rate?: number) {
  stopAudio()
  for (const s of list) {
    const url = `${BASE}audio/${sentenceAudioId(s)}.mp3`
    const hasFile = !missingFiles.has(url)
    if (hasFile) {
      const ok: boolean = await new Promise((resolve) => {
        const el = new Audio(url)
        el.playbackRate = audioRate
        currentEl = el
        el.onerror = () => {
          missingFiles.add(url)
          resolve(false)
        }
        el.onended = () => resolve(true)
        void el.play().catch(() => {
          missingFiles.add(url)
          resolve(false)
        })
      })
      if (ok) continue
    }
    // TTS por línea (el navegador encola las utterances si no hacemos cancel)
    await new Promise<void>((resolve) => {
      if (typeof speechSynthesis === 'undefined') return resolve()
      const u = new SpeechSynthesisUtterance(s.hanzi)
      const voice = pickVoice()
      if (voice) u.voice = voice
      u.lang = voice?.lang ?? 'zh-CN'
      u.rate = rate ?? audioRate
      u.onend = () => resolve()
      u.onerror = () => resolve()
      speechSynthesis.speak(u)
      // salvaguarda: si el motor no dispara onend
      setTimeout(resolve, 4000)
    })
  }
}

/** Reproduce texto chino arbitrario con TTS del navegador */
export function speakHanzi(hanzi: string, rate?: number) {
  tts(hanzi, rate)
}
