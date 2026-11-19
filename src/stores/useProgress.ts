/* ─────────────────────────────────────────────────────────────────────────────
   Progreso del morador — zustand + persistencia en localStorage.
   El shape completo es el que se sincroniza con Firestore (lib/sync.ts).

   Contiene: XP, chapas, rangos, lecciones, SRS, logros, misiones de la
   caravana (contadores diarios), tienda (temas) e histórico para estadísticas.
   ───────────────────────────────────────────────────────────────────────────── */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { lessonEntryIds } from '../content'
import { newlyUnlocked } from '../lib/achievements'
import { questsForDate, QUEST_POOL } from '../lib/quests'
import { FONTS, THEMES, VFX } from '../lib/shop'
import { gradeCard, newCard, type Grade } from '../lib/srs'
import { toastAchievement, toastCaps, useToasts } from './useToasts'
import type { BodyFont, DailyStats, ThemeId, VfxId } from '../types/progress'
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

/** Días que guarda el histórico de estadísticas */
const HISTORY_DAYS = 60

type DailyKey = keyof Omit<DailyStats, 'date'>

interface ProgressActions {
  addXp(n: number): void
  /** Registra actividad del día (alimenta la caravana y las estadísticas) */
  logActivity(metric: DailyKey, amount: number): void
  /** Marca lección completada: chapas + racha + palabras al pool SRS + logros */
  completeLesson(lessonId: string, stars: number, accuracy: number): void
  /** Registra el resultado de un repaso individual */
  gradeEntry(entryId: string, g: Grade): void
  /** Cierra una sesión de repaso: chapas + logros */
  finishReviewSession(): void
  /** Reclama la recompensa de un encargo de la caravana */
  claimQuest(questId: string): void
  /** Compra un tema de la tienda (gasta chapas) */
  buyTheme(themeId: ThemeId): void
  /** Equipa un tema ya comprado */
  equipTheme(themeId: ThemeId): void
  /** Compra una fuente de la tienda (gasta chapas) */
  buyFont(fontId: BodyFont): void
  /** Equipa una fuente ya comprada */
  equipFont(fontId: BodyFont): void
  /** Compra un VFX de la tienda (gasta chapas) */
  buyVfx(vfxId: VfxId): void
  /** Equipa un VFX ya comprado */
  equipVfx(vfxId: VfxId): void
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

const emptyStats = (date: string): DailyStats => ({
  date,
  lessons: 0,
  perfect: 0,
  reviews: 0,
  dictations: 0,
  tones: 0,
  steps: 0,
  xp: 0,
})

/** Poda el histórico a los últimos HISTORY_DAYS días */
function trimHistory(history: ProgressState['history']): ProgressState['history'] {
  const days = Object.keys(history)
  if (days.length <= HISTORY_DAYS) return history
  const keep = days.sort().slice(-HISTORY_DAYS)
  return Object.fromEntries(keep.map((d) => [d, history[d]]))
}

/**
 * Refresco del día: racha, contadores diarios y misiones de la caravana.
 * Devuelve el estado con el día correcto aplicado.
 */
function refreshDay(s: ProgressState): ProgressState {
  const today = localISO()
  let next = s

  // racha
  if (s.lastStudyDay !== today) {
    const streakDays =
      s.lastStudyDay === localISO(-1) ? s.streakDays + 1 : Math.max(1, s.streakDays)
    next = { ...next, streakDays, lastStudyDay: today, bestStreak: Math.max(s.bestStreak, streakDays) }
  }

  // contadores diarios
  if (s.dailyStats.date !== today) {
    next = { ...next, dailyStats: emptyStats(today) }
  }

  // misiones de la caravana
  if (s.quests.date !== today) {
    next = {
      ...next,
      quests: {
        date: today,
        items: questsForDate(today).map((t) => ({ id: t.id, progress: 0, claimed: false })),
      },
    }
  }

  return next
}

/** Acumula una métrica diaria + histórico + progreso de encargos */
function bumpDaily(s: ProgressState, metric: DailyKey, amount: number): ProgressState {
  const today = s.dailyStats.date || localISO()
  const dailyStats = { ...s.dailyStats, [metric]: s.dailyStats[metric] + amount }
  const dayLog = s.history[today] ?? { xp: 0, lessons: 0, reviews: 0 }
  const history = { ...s.history, [today]: { ...dayLog } }

  if (metric === 'xp') {
    dailyStats.xp = s.dailyStats.xp + amount
    history[today].xp += amount
  }
  if (metric === 'lessons') history[today].lessons += amount
  if (metric === 'reviews') history[today].reviews += amount

  // progreso de la caravana (con aviso al llegar al objetivo)
  const items = s.quests.items.map((item) => {
    const template = QUEST_POOL.find((t) => t.id === item.id)
    if (!template || template.metric !== metric || item.claimed) return item
    const progress = Math.min(template.goal, item.progress + amount)
    if (item.progress < template.goal && progress >= template.goal) {
      useToasts.getState().push(template.emoji, `CARAVANA — encargo completado`)
    }
    return { ...item, progress }
  })

  return { ...s, dailyStats, history: trimHistory(history), quests: { ...s.quests, items } }
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

/** Auto-canjea los encargos de la caravana ya completados (pagando sus chapas) */
function autoClaimQuests(state: ProgressState): ProgressState {
  const ready = state.quests.items.filter((q) => {
    if (q.claimed) return false
    const t = QUEST_POOL.find((x) => x.id === q.id)
    return t ? q.progress >= t.goal : false
  })
  if (!ready.length) return state
  const capsGain = ready.reduce(
    (sum, q) => sum + (QUEST_POOL.find((t) => t.id === q.id)?.caps ?? 0),
    0,
  )
  const ids = new Set(ready.map((q) => q.id))
  toastCaps(capsGain, 'caravana: encargos auto-canjeados')
  return {
    ...state,
    caps: state.caps + capsGain,
    quests: {
      ...state.quests,
      items: state.quests.items.map((q) => (ids.has(q.id) ? { ...q, claimed: true } : q)),
    },
  }
}

export const useProgress = create<ProgressStore>()(
  persist(
    (set) => ({
      ...structuredClone(INITIAL_PROGRESS),

      addXp(n) {
        set((s) => {
          const withDay = bumpDaily(refreshDay(s), 'xp', n)
          return sealAchievements({ ...withDay, xp: s.xp + n, updatedAt: Date.now() })
        })
      },

      logActivity(metric, amount) {
        set((s) => ({ ...bumpDaily(refreshDay(s), metric, amount), updatedAt: Date.now() }))
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

          // racha + chapas + contadores
          const day = refreshDay(s)
          const capsGain =
            (day.lastStudyDay !== s.lastStudyDay ? CAPS_DAILY_BONUS : 0) +
            (firstTime ? CAPS_LESSON_NEW : CAPS_LESSON_REPEAT)
          if (capsGain > 0) toastCaps(capsGain, day.lastStudyDay !== s.lastStudyDay ? 'bono diario' : 'lección completada')

          let withDay = bumpDaily(day, 'lessons', 1)
          if (stars >= 3) withDay = bumpDaily(withDay, 'perfect', 1)

          // encargos de la caravana completados → AUTO-CANJEO con sus chapas
          const withQuests = autoClaimQuests({
            ...withDay,
            completed,
            srs,
            caps: s.caps + capsGain,
            updatedAt: Date.now(),
          })
          return sealAchievements(withQuests)
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
          const day = refreshDay(s)
          const capsGain = (day.lastStudyDay !== s.lastStudyDay ? CAPS_DAILY_BONUS : 0) + CAPS_REVIEW
          toastCaps(capsGain, day.lastStudyDay !== s.lastStudyDay ? 'bono diario' : 'repaso completado')
          const withQuests = autoClaimQuests({
            ...day,
            reviewsDone: s.reviewsDone + 1,
            caps: s.caps + capsGain,
            updatedAt: Date.now(),
          })
          return sealAchievements(withQuests)
        })
      },

      claimQuest(questId) {
        set((s) => {
          const item = s.quests.items.find((q) => q.id === questId)
          const template = QUEST_POOL.find((t) => t.id === questId)
          if (!item || !template || item.claimed || item.progress < template.goal) return s
          const items = s.quests.items.map((q) => (q.id === questId ? { ...q, claimed: true } : q))
          toastCaps(template.caps, `caravana: ${template.title}`)
          return {
            ...s,
            quests: { ...s.quests, items },
            caps: s.caps + template.caps,
            updatedAt: Date.now(),
          }
        })
      },

      buyTheme(themeId) {
        set((s) => {
          if (s.ownedThemes.includes(themeId)) return s
          const product = THEMES.find((t) => t.id === themeId)
          if (!product || s.caps < product.price) return s
          toastCaps(0, `tema adquirido: ${product.name}`)
          return {
            ...s,
            caps: s.caps - product.price,
            ownedThemes: [...s.ownedThemes, themeId],
            settings: { ...s.settings, theme: themeId },
            updatedAt: Date.now(),
          }
        })
      },

      equipTheme(themeId) {
        set((s) => {
          // el MODO SUPERVISOR permite equipar sin haber comprado (para probar)
          if (!s.ownedThemes.includes(themeId) && !s.settings.adminMode) return s
          return { ...s, settings: { ...s.settings, theme: themeId }, updatedAt: Date.now() }
        })
      },

      buyFont(fontId) {
        set((s) => {
          if (s.ownedFonts.includes(fontId)) return s
          const product = FONTS.find((f) => f.id === fontId)
          if (!product || s.caps < product.price) return s
          toastCaps(0, `fuente adquirida: ${product.name}`)
          return {
            ...s,
            caps: s.caps - product.price,
            ownedFonts: [...s.ownedFonts, fontId],
            settings: { ...s.settings, bodyFont: fontId },
            updatedAt: Date.now(),
          }
        })
      },

      equipFont(fontId) {
        set((s) => {
          if (!s.ownedFonts.includes(fontId) && !s.settings.adminMode) return s
          return { ...s, settings: { ...s.settings, bodyFont: fontId }, updatedAt: Date.now() }
        })
      },

      buyVfx(vfxId) {
        set((s) => {
          if (s.ownedVfx.includes(vfxId)) return s
          const product = VFX.find((v) => v.id === vfxId)
          if (!product || s.caps < product.price) return s
          toastCaps(0, `VFX adquirido: ${product.name}`)
          return {
            ...s,
            caps: s.caps - product.price,
            ownedVfx: [...s.ownedVfx, vfxId],
            settings: { ...s.settings, vfx: vfxId },
            updatedAt: Date.now(),
          }
        })
      },

      equipVfx(vfxId) {
        set((s) => {
          if (!s.ownedVfx.includes(vfxId) && !s.settings.adminMode) return s
          return { ...s, settings: { ...s.settings, vfx: vfxId }, updatedAt: Date.now() }
        })
      },

      checkAchievements() {
        set((s) => sealAchievements({ ...s }))
      },

      setSettings(patch) {
        set((s) => {
          const settings = { ...s.settings, ...patch }
          // Al QUITAR el supervisor, el equipo vuelve a lo comprado de verdad
          if (patch.adminMode === false) {
            if (!s.ownedThemes.includes(settings.theme)) settings.theme = 'green'
            if (!s.ownedFonts.includes(settings.bodyFont)) settings.bodyFont = 'mono'
            if (!s.ownedVfx.includes(settings.vfx)) settings.vfx = 'crt'
          }
          return { settings, updatedAt: Date.now() }
        })
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
      version: 5,
      migrate: (persisted) => {
        const raw = persisted as Partial<ProgressState> & {
          settings?: Partial<Settings> & { showHanzi?: boolean; contrast?: boolean; crt?: boolean }
        }
        const rawSettings = (raw.settings ?? {}) as Partial<Settings> & {
          showHanzi?: boolean
          contrast?: boolean
          crt?: boolean
        }
        const p = {
          ...structuredClone(INITIAL_PROGRESS),
          ...raw,
        } as ProgressState
        // v2→v3: showHanzi (boolean) → scriptMode ('pinyin' | 'both' | 'hanzi')
        const scriptMode: ScriptMode =
          rawSettings.scriptMode ?? (rawSettings.showHanzi ? 'hanzi' : 'pinyin')
        // v4→v5: contrast se retira (el look base YA es ultra-oscuro); crt → vfx;
        // fuentes y VFX pasan por la tienda (ownedFonts/ownedVfx)
        const vfx: VfxId = rawSettings.vfx ?? (rawSettings.crt === false ? 'none' : 'crt')
        p.settings = {
          ...INITIAL_PROGRESS.settings,
          ...rawSettings,
          scriptMode,
          vfx,
        } as Settings
        delete (p.settings as Settings & { contrast?: boolean }).contrast
        delete (p.settings as Settings & { crt?: boolean }).crt
        p.bestStreak = Math.max(raw.bestStreak ?? 0, raw.streakDays ?? 0)
        p.dailyStats = raw.dailyStats ?? emptyStats('')
        p.quests = raw.quests ?? { date: '', items: [] }
        p.ownedThemes = raw.ownedThemes ?? ['green']
        p.ownedFonts = raw.ownedFonts ?? ['mono', 'pixel', 'sans']
        if (!p.ownedFonts.includes('mono')) p.ownedFonts = ['mono', ...p.ownedFonts]
        p.ownedVfx = raw.ownedVfx ?? ['none', 'crt']
        if (!p.ownedVfx.includes('none')) p.ownedVfx = ['none', ...p.ownedVfx]
        p.history = raw.history ?? {}
        return p
      },
    },
  ),
)

/** Selecciona solo la parte de datos (para subir a Firestore) */
export function progressData(s: ProgressStore): ProgressState {
  const {
    xp,
    caps,
    streakDays,
    bestStreak,
    lastStudyDay,
    completed,
    srs,
    reviewsDone,
    achievements,
    dailyStats,
    quests,
    ownedThemes,
    ownedFonts,
    ownedVfx,
    history,
    settings,
    updatedAt,
  } = s
  return {
    xp,
    caps,
    streakDays,
    bestStreak,
    lastStudyDay,
    completed,
    srs,
    reviewsDone,
    achievements,
    dailyStats,
    quests,
    ownedThemes,
    ownedFonts,
    ownedVfx,
    history,
    settings,
    updatedAt,
  }
}
