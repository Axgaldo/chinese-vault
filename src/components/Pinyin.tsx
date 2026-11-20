/* ─────────────────────────────────────────────────────────────────────────────
   <Pinyin /> — pinyin con cada SÍLABA coloreada según su tono:
   1 rojo · 2 ámbar · 3 turquesa · 4 violeta · 5 gris
   La segmentación (NFD-segura, sílaba a sílaba) vive en lib/pinyin.ts
   (pinyinSegments) y está cubierta por tests: los diacríticos literales
   del curso (ǐ ǎ ǖ…) nunca pueden quedarse sin color.
   ───────────────────────────────────────────────────────────────────────────── */

import { pinyinSegments, toneColor } from '../lib/pinyin'

export function Pinyin({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`font-pinyin ${className}`}>
      {pinyinSegments(text).map((p, i) =>
        'syl' in p ? (
          <span key={i} className={toneColor(p.tone)}>
            {p.syl}
          </span>
        ) : (
          <span key={i}>{p.raw}</span>
        ),
      )}
    </span>
  )
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
