/* ─────────────────────────────────────────────────────────────────────────────
   SFX retro — pitidos procedurales con WebAudio, sin archivos de sonido
   ───────────────────────────────────────────────────────────────────────────── */

let ctx: AudioContext | null = null
let enabled = true

export function setSfxEnabled(on: boolean) {
  enabled = on
}

/** Desbloquea el audio en el primer gesto del usuario (política de autoplay) */
export function initSfx() {
  if (ctx) {
    if (ctx.state === 'suspended') void ctx.resume()
    return
  }
  const AC = window.AudioContext
  if (!AC) return
  ctx = new AC()
}

function beep(freq: number, dur: number, opts: { type?: OscillatorType; vol?: number; delay?: number } = {}) {
  if (!ctx || !enabled) return
  const { type = 'square', vol = 0.035, delay = 0 } = opts
  const t0 = ctx.currentTime + delay
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(vol, t0 + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

export const sfx = {
  /** Toque de botón */
  tap: () => beep(720, 0.05),
  /** Marca de progreso / navegación */
  blip: () => beep(980, 0.06, { vol: 0.025 }),
  /** Respuesta correcta */
  correct: () => {
    beep(660, 0.07)
    beep(990, 0.09, { delay: 0.07 })
  },
  /** Respuesta incorrecta */
  wrong: () => beep(140, 0.22, { type: 'sawtooth', vol: 0.05 }),
  /** Emparejado correcto en el reto de parejas */
  match: () => beep(880, 0.05, { vol: 0.025 }),
  /** Lección completada — pequeño arpegio */
  complete: () => {
    ;[523, 659, 784, 1047].forEach((f, i) => beep(f, 0.12, { delay: i * 0.11, vol: 0.04 }))
  },
  /** Arranque del terminal */
  boot: () => {
    beep(440, 0.08)
    beep(660, 0.1, { delay: 0.09 })
  },
  /** Entrada registrada en el archivo */
  log: () => {
    beep(1046, 0.05)
    beep(1568, 0.08, { delay: 0.05, vol: 0.03 })
  },
}
