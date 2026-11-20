/* ─────────────────────────────────────────────────────────────────────────────
   <Pinyin /> — pinyin con cada SÍLABA coloreada según su tono:
   1 rojo · 2 ámbar · 3 turquesa · 4 violeta · 5 gris
   Las palabras multislaba (zhōngwén, xièxie…) se trocean con syllabify()
   para que cada sílaba reciba SU tono (bug histórico: la primera pintaba todo).
   ───────────────────────────────────────────────────────────────────────────── */

import type { ReactNode } from 'react'
import { syllabify, toneColor } from '../lib/pinyin'

export function Pinyin({ text, className = '' }: { text: string; className?: string }) {
  const parts: ReactNode[] = []
  let buffer = ''
  let key = 0

  const flushBuffer = () => {
    if (buffer) {
      parts.push(<span key={key++}>{buffer}</span>)
      buffer = ''
    }
  }

  // recorre por runs de letras+marcas; cada run se trocea en sílabas
  const isLetter = (ch: string) => /[a-zA-ZüÜ]/.test(ch)
  const isMark = (ch: string) => /[\u0300-\u030F]/.test(ch)

  let i = 0
  while (i < text.length) {
    const ch = text[i]
    if (isLetter(ch) || isMark(ch)) {
      let run = ''
      while (i < text.length && (isLetter(text[i]) || isMark(text[i]))) {
        run += text[i]
        i++
      }
      flushBuffer()
      for (const syl of syllabify(run)) {
        parts.push(
          <span key={key++} className={toneColor(syl.tone)}>
            {syl.text}
          </span>,
        )
      }
      continue
    }
    buffer += ch
    i++
  }
  flushBuffer()

  return <span className={`font-pinyin ${className}`}>{parts}</span>
}

/** Leyenda de tonos (para apuntes y entrenador) */
export function ToneLegend() {
  const tones = [1, 2, 3, 4, 5] as const
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      {tones.map((t) => (
        <span key={t} className={toneColor(t)}>
          {t} {toneMark(t)}
        </span>
      ))}
    </div>
  )
}

const toneMark = (t: 1 | 2 | 3 | 4 | 5) =>
  ({ 1: '▁̄', 2: '↗', 3: '∨', 4: '↘', 5: '·' })[t]
