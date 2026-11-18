/* ─────────────────────────────────────────────────────────────────────────────
   Estado de sesión del habitante (no se persiste: lo alimenta lib/sync.ts)
   ───────────────────────────────────────────────────────────────────────────── */

import { create } from 'zustand'

export type AuthMode = 'local' | 'anon' | 'account'

interface AuthStore {
  mode: AuthMode
  uid: string | null
  email: string | null
  /** True cuando Firebase ya resolvió el estado inicial de la sesión */
  ready: boolean
  set(mode: AuthMode, uid: string | null, email: string | null): void
  markReady(): void
}

export const useAuth = create<AuthStore>((set) => ({
  mode: 'local',
  uid: null,
  email: null,
  ready: false,
  set: (mode, uid, email) => set({ mode, uid, email }),
  markReady: () => set({ ready: true }),
}))
