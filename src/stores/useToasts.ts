/* ─────────────────────────────────────────────────────────────────────────────
   Avisos flotantes (toasts): logros desbloqueados, bono diario de chapas…
   Ephemeral: no se persiste.
   ───────────────────────────────────────────────────────────────────────────── */

import { create } from 'zustand'
import { sfx } from '../lib/sfx'

export interface Toast {
  id: number
  emoji: string
  text: string
}

interface ToastStore {
  toasts: Toast[]
  push(emoji: string, text: string): void
  remove(id: number): void
}

let nextId = 1

export const useToasts = create<ToastStore>((set, get) => ({
  toasts: [],
  push: (emoji, text) => {
    const id = nextId++
    set((s) => ({ toasts: [...s.toasts, { id, emoji, text }] }))
    // autodesaparecen a los 4s (lo gestiona el componente, esto es el fallback)
    setTimeout(() => get().remove(id), 4500)
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

/** helpers con el estilo del refugio */
export function toastAchievement(emoji: string, title: string) {
  sfx.log()
  useToasts.getState().push(emoji, `LOGRO DESBLOQUEADO — ${title}`)
}

export function toastCaps(amount: number, reason: string) {
  sfx.blip()
  useToasts.getState().push('⛓️', `+${amount} chapas — ${reason}`)
}
