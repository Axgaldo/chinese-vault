/* ─────────────────────────────────────────────────────────────────────────────
   Componentes base del refugio: botones, paneles, medidores…
   ───────────────────────────────────────────────────────────────────────────── */

import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { sfx } from '../lib/sfx'

export function Btn({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'amber' }) {
  return (
    <button
      className={`btn-vault ${variant === 'amber' ? 'btn-vault-amber' : ''} px-4 py-2.5 text-2xl ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Panel({
  solid = false,
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { solid?: boolean }) {
  return (
    <div className={`panel ${solid ? 'panel-solid' : ''} ${className}`} {...rest}>
      {children}
    </div>
  )
}

export function Chip({ className = '', children }: { className?: string; children: ReactNode }) {
  return <span className={`chip inline-flex items-center gap-1 px-2 py-0.5 text-lg ${className}`}>{children}</span>
}

/** Barra segmentada retro */
export function Meter({ value, className = '' }: { value: number; className?: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100)
  return (
    <div className={`meter h-3 w-full ${className}`} role="progressbar" aria-valuenow={pct}>
      <div className="meter-fill h-full transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

/** Título de sección con decoración */
export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-2xl tracking-wider text-vault-400 glow ${className}`}>
      <span className="text-vault-600">▚▚ </span>
      {children}
      <span className="text-vault-600"> ▚▚</span>
    </h2>
  )
}

/** Encabezado de reto */
export function Prompt({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-display text-center text-2xl tracking-wider text-vault-200 glow ${className}`}>{children}</p>
  )
}

/** Cursor de consola antigua, para finales de texto largo */
export function Cursor({ className = '' }: { className?: string }) {
  return (
    <span className={`blink ml-1 text-vault-400 ${className}`} aria-hidden>
      █
    </span>
  )
}

/** Botón interruptor estilo terminal (sustituye a los checkboxes nativos,
 *  que se renderizan invisibles en algunos navegadores oscuros) */
export function Toggle({
  on,
  onToggle,
  label,
  hint,
  teal = false,
}: {
  on: boolean
  onToggle(): void
  label: string
  hint?: string
  teal?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className="flex w-full items-center justify-between py-1 text-left"
      onClick={() => {
        sfx.tap()
        onToggle()
      }}
    >
      <span className="text-sm">
        {label}
        {hint && <span className="block text-xs text-vault-600">{hint}</span>}
      </span>
      <span className={`font-display text-lg tracking-wider ${on ? (teal ? 'text-vault-teal glow' : 'text-vault-400 glow') : 'text-vault-600'}`}>
        {on ? '[ ■ ACTIVADO ]' : '[ □ DESACTIVADO ]'}
      </span>
    </button>
  )
}

/** Botón redondo de audio */
export function SpeakerBtn({
  onClick,
  label = 'reproducir audio',
  className = '',
  big = false,
}: {
  onClick: () => void
  label?: string
  className?: string
  big?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`btn-vault rounded-full leading-none ${big ? 'px-6 py-4 text-4xl' : 'px-3 py-1.5 text-xl'} ${className}`}
    >
      🔊
    </button>
  )
}
