/* ─────────────────────────────────────────────────────────────────────────────
   Secuencia de arranque del terminal (solo la primera visita)
   ───────────────────────────────────────────────────────────────────────────── */

import { useEffect, useState } from 'react'
import { sfx } from '../lib/sfx'
import { APP_VERSION } from '../lib/version'
import { Btn } from './ui'

const BOOT_LINES = [
  `VAULT-OS ${APP_VERSION} // TERMINAL DE ENTRENAMIENTO`,
  'PROPIETARIO DEL REFUGIO: AXGALDO',
  '',
  'INICIALIZANDO PROTOCOLO CHINO........ OK',
  'CARGANDO FONÉTICA MANDARÍN........... OK',
  'CALIBRANDO TONOS (4/4).............. OK',
  'ABRIENDO LA PUERTA DEL REFUGIO 101..',
]

const STORAGE_KEY = 'cv-boot-v1'

export function BootScreen({ onHide }: { onHide(): void }) {
  const [lines, setLines] = useState(0)

  useEffect(() => {
    if (lines >= BOOT_LINES.length) return
    const t = setTimeout(() => setLines((l) => l + 1), lines === 0 ? 200 : 300)
    return () => clearTimeout(t)
  }, [lines])

  const allShown = lines >= BOOT_LINES.length

  const enter = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    sfx.boot()
    onHide()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-vault-950">
      <div className="w-full max-w-md px-6">
        {BOOT_LINES.slice(0, lines).map((l, i) => (
          <p key={i} className="boot-line font-mono text-vault-400">
            {l || '\u00a0'}
          </p>
        ))}
        <span className="blink text-vault-400">█</span>
        {allShown ? (
          <Btn className="mt-8 w-full" onClick={enter}>
            ACCEDER AL REFUGIO ▸
          </Btn>
        ) : (
          <button type="button" className="mt-8 text-sm text-vault-600 underline" onClick={enter}>
            saltar
          </button>
        )}
      </div>
    </div>
  )
}
