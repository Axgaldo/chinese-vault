/* ─────────────────────────────────────────────────────────────────────────────
   Progreso del habitante — zustand + persistencia en localStorage.
   El shape completo es el que se sincroniza con Firestore (lib/sync.ts).
   ───────────────────────────────────────────────────────────────────────────── */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { lessonEntryIds } from '../content'
import { newlyUnlocked } from '../lib/achievements'
import { gradeCard, newCard, type Grade } from '../lib/srs'
import { toastAchievement, toastCaps } from './useToasts'
import {
  INITIAL_PROGRESS,
  type ProgressState,
  type ScriptMode,
  type Settings,
} from '../types/progress'

/* Chapas: la moneda del refugio ⛓ */
const CAPS_DAILY_BONUS = 5
const CAPS_LESSON_NEW = 3
const CAPS_LESSON_REPEAT = 1
const CAPS_REVIEW = 2

interface ProgressActions {
  addXp(n: number): void
  /** Marca lección completada: chapas + racha + palabras al pool SRS + logros */
  completeLesson(lessonId: string, stars: number, accuracy: number): void
  /** Registra el resultado de un repaso individual */
  gradeEntry(entryId: string, g: Grade): void
  /** Cierra una sesión de repaso: chapas + logros */
  finishReviewSession(): void
  /** Sella logros pendientes de estados migrados (se llama al arrancar) */
  checkAchievements(): void
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

/** Aplica el día de estudio y devuelve [nuevoEstado, sumóDía] */
function applyDay(state: ProgressState): { s: ProgressState; newDay: boolean } {
  const today = localISO()
  if (state.lastStudyDay === today) return { s: state, newDay: false }
  const streakDays =
    state.lastStudyDay === localISO(-1) ? state.streakDays + 1 : Math.max(1, state.streakDays)
  return { s: { ...state, streakDays, lastStudyDay: today }, newDay: true }
}

/** Comprueba logros sobre un estado candidato, los sella y avisa */
function sealAchievements(state: ProgressState): ProgressState {
  const fresh = newlyUnlocked(state)
  if (!fresh.length) return state
  const achievements = { ...state.achievements }
  const now = Date.now()
  for (const a of fresh) {
    achievements[a.id] = now
    toastAchievement(a.emoji, a.title)
  }
  return { ...state, achievements }
}

export const useProgress = create<ProgressStore>()(
  persist(
    (set) => ({
      ...structuredClone(INITIAL_PROGRESS),

      addXp(n) {
        set((s) => sealAchievements({ ...s, xp: s.xp + n, updatedAt: Date.now() }))
      },

      completeLesson(lessonId, stars, accuracy) {
        set((s) => {
          const prev = s.completed[lessonId]
          const firstTime = !prev

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

          // racha + chapas
          const day = applyDay(s)
          const capsGain =
            (day.newDay ? CAPS_DAILY_BONUS : 0) + (firstTime ? CAPS_LESSON_NEW : CAPS_LESSON_REPEAT)
          if (capsGain > 0) toastCaps(capsGain, day.newDay ? 'bono diario' : 'lección completada')

          const next = sealAchievements({
            ...day.s,
            completed,
            srs,
            caps: s.caps + capsGain,
            updatedAt: Date.now(),
          })
          return next
        })
      },

      gradeEntry(entryId, g) {
        set((s) => ({
          srs: { ...s.srs, [entryId]: gradeCard(s.srs[entryId] ?? newCard(), g) },
          updatedAt: Date.now(),
        }))
      },

      finishReviewSession() {
        set((s) => {
          const day = applyDay(s)
          const capsGain = (day.newDay ? CAPS_DAILY_BONUS : 0) + CAPS_REVIEW
          toastCaps(capsGain, day.newDay ? 'bono diario' : 'repaso completado')
          return sealAchievements({
            ...day.s,
            reviewsDone: s.reviewsDone + 1,
            caps: s.caps + capsGain,
            updatedAt: Date.now(),
          })
        })
      },

      checkAchievements() {
        set((s) => sealAchievements({ ...s }))
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
      version: 3,
      migrate: (persisted) => {
        const raw = persisted as Partial<ProgressState> & {
          settings?: Partial<Settings> & { showHanzi?: boolean }
        }
        const rawSettings = (raw.settings ?? {}) as Partial<Settings> & { showHanzi?: boolean }
        const p = {
          ...structuredClone(INITIAL_PROGRESS),
          ...raw,
        } as ProgressState
        // v2→v3: showHanzi (boolean) → scriptMode ('pinyin' | 'both' | 'hanzi')
        const scriptMode: ScriptMode =
          rawSettings.scriptMode ?? (rawSettings.showHanzi ? 'hanzi' : 'pinyin')
        p.settings = { ...INITIAL_PROGRESS.settings, ...rawSettings, scriptMode } as Settings
        return p
      },
    },
  ),
)

/** Selecciona solo la parte de datos (para subir a Firestore) */
export function progressData(s: ProgressStore): ProgressState {
  const { xp, caps, streakDays, lastStudyDay, completed, srs, reviewsDone, achievements, settings, updatedAt } = s
  return { xp, caps, streakDays, lastStudyDay, completed, srs, reviewsDone, achievements, settings, updatedAt }
}
