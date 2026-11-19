/* ─────────────────────────────────────────────────────────────────────────────
   Estado de sesión del morador (no se persiste: lo alimenta lib/sync.ts)
   ───────────────────────────────────────────────────────────────────────────── */

import { create } from 'zustand'

export type AuthMode = 'local' | 'anon' | 'account'

interface AuthStore {
  mode: AuthMode
  uid: string | null
  email: string | null
  /** Creación de la cuenta anónima (ISO) — para el aviso de caducidad de 30 días */
  anonCreatedAt: string | null
  /** True cuando Firebase ya resolvió el estado inicial de la sesión */
  ready: boolean
  set(mode: AuthMode, uid: string | null, email: string | null, anonCreatedAt?: string | null): void
  markReady(): void
}

export const useAuth = create<AuthStore>((set) => ({
  mode: 'local',
  uid: null,
  email: null,
  anonCreatedAt: null,
  ready: false,
  set: (mode, uid, email, anonCreatedAt) =>
    set({ mode, uid, email, anonCreatedAt: anonCreatedAt ?? null }),
  markReady: () => set({ ready: true }),
}))
