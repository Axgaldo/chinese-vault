/* ─────────────────────────────────────────────────────────────────────────────
   <Pinyin /> — pinyin con cada sílaba coloreada según su tono:
   1 rojo · 2 ámbar · 3 turquesa · 4 violeta · 5 gris
   ───────────────────────────────────────────────────────────────────────────── */

import type { ReactNode } from 'react'
import { toneColor, toneOfSyllable } from '../lib/pinyin'

const LETTER = /[a-zA-Z]/
const TONE_MARKS = new Set(['\u0300', '\u0301', '\u0304', '\u030C', '\u0308'])

/** Divide el string original en [sílabas y separadores] conservando el texto */
function tokenize(text: string): { syllable: boolean; text: string }[] {
  const out: { syllable: boolean; text: string }[] = []
  let syl = ''
  for (const ch of text.normalize('NFD')) {
    if (LETTER.test(ch) || TONE_MARKS.has(ch)) {
      syl += ch
    } else {
      if (syl) {
        out.push({ syllable: true, text: syl })
        syl = ''
      }
      out.push({ syllable: false, text: ch })
    }
  }
  if (syl) out.push({ syllable: true, text: syl })
  return out
}

export function Pinyin({ text, className = '' }: { text: string; className?: string }) {
  const parts: ReactNode[] = tokenize(text).map((p, i) =>
    p.syllable ? (
      <span key={i} className={toneColor(toneOfSyllable(p.text))}>
        {p.text}
      </span>
    ) : (
      <span key={i}>{p.text}</span>
    ),
  )
  return <span className={`font-pinyin ${className}`}>{parts}</span>
}

/** Leyenda de tonos (para apuntes y entrenador) */
export function ToneLegend() {
  const tones = [1, 2, 3, 4, 5] as const
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      {tones.map((t) => (
        <span key={t} className={toneColor(t)}>
          {t} {toneOf(t)}
        </span>
      ))}
    </div>
  )
}

const toneOf = (t: 1 | 2 | 3 | 4 | 5) =>
  ({ 1: '▁̄', 2: '↗', 3: '∨', 4: '↘', 5: '·' })[t]
