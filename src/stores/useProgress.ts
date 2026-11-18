/* ─────────────────────────────────────────────────────────────────────────────
   Progreso del habitante — zustand + persistencia en localStorage.
   El shape completo es el que se sincroniza con Firestore (lib/sync.ts).
   ───────────────────────────────────────────────────────────────────────────── */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { lessonEntryIds } from '../content'
import { gradeCard, newCard, type Grade } from '../lib/srs'
import {
  INITIAL_PROGRESS,
  type ProgressState,
  type Settings,
} from '../types/progress'

interface ProgressActions {
  addXp(n: number): void
  /** Marca lección completada e inscribe sus palabras en el pool SRS */
  completeLesson(lessonId: string, stars: number, accuracy: number): void
  /** Registra el resultado de un repaso */
  gradeEntry(entryId: string, g: Grade): void
  /** Cuenta un día de estudio (racha) */
  touchDay(): void
  setSettings(patch: Partial<Settings>): void
  /** Adopta un progreso remoto (Firebase) más reciente */
  hydrate(p: ProgressState): void
  reset(): void
}

export type ProgressStore = ProgressState & ProgressActions

/** Fecha local ISO (yyyy-mm-dd) sin depender de la zona horaria del servidor */
function localISO(offsetDays = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export const useProgress = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...structuredClone(INITIAL_PROGRESS),

      addXp(n) {
        set((s) => ({ xp: s.xp + n, updatedAt: Date.now() }))
      },

      completeLesson(lessonId, stars, accuracy) {
        set((s) => {
          const prev = s.completed[lessonId]
          const completed = {
            ...s.completed,
            [lessonId]: {
              stars: Math.max(prev?.stars ?? 0, stars),
              accuracy: Math.max(prev?.accuracy ?? 0, accuracy),
              playedAt: Date.now(),
            },
          }
          // Las palabras de la lección entran al pool de repaso (due mañana)
          const srs = { ...s.srs }
          for (const id of lessonEntryIds(lessonId)) {
            if (!srs[id]) srs[id] = newCard(1)
          }
          const today = localISO()
          const streak =
            s.lastStudyDay === today
              ? s.streakDays
              : s.lastStudyDay === localISO(-1)
                ? s.streakDays + 1
                : 1
          return {
            completed,
            srs,
            streakDays: streak,
            lastStudyDay: today,
            updatedAt: Date.now(),
          }
        })
      },

      gradeEntry(entryId, g) {
        set((s) => ({
          srs: { ...s.srs, [entryId]: gradeCard(s.srs[entryId] ?? newCard(), g) },
          updatedAt: Date.now(),
        }))
      },

      touchDay() {
        const s = get()
        const today = localISO()
        if (s.lastStudyDay === today) return
        set({
          lastStudyDay: today,
          streakDays: s.lastStudyDay === localISO(-1) ? s.streakDays + 1 : 1,
          updatedAt: Date.now(),
        })
      },

      setSettings(patch) {
        set((s) => ({
          settings: { ...s.settings, ...patch },
          updatedAt: Date.now(),
        }))
      },

      hydrate(p) {
        set({ ...structuredClone(INITIAL_PROGRESS), ...p, updatedAt: Date.now() })
      },

      reset() {
        set({ ...structuredClone(INITIAL_PROGRESS), updatedAt: Date.now() })
      },
    }),
    {
      name: 'chinese-vault-progress',
      version: 1,
    },
  ),
)

/** Selecciona solo la parte de datos (para subir a Firestore) */
export function progressData(s: ProgressStore): ProgressState {
  const { xp, streakDays, lastStudyDay, completed, srs, settings, updatedAt } = s
  return { xp, streakDays, lastStudyDay, completed, srs, settings, updatedAt }
}
