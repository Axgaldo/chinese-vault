/* ─────────────────────────────────────────────────────────────────────────────
   Registro de progreso del habitante (lo que se persiste/localStorage/Firestore)
   ───────────────────────────────────────────────────────────────────────────── */

export interface LessonRecord {
  /** 1-3 estrellas según precisión */
  stars: number
  /** Mejor precisión de la lección (0-1) */
  accuracy: number
  playedAt: number
}

/** Tarjeta de repetición espaciada (SM-2 simplificado) */
export interface SrsCard {
  /** Timestamp (ms) en que toca repasar */
  due: number
  /** Intervalo actual en días */
  interval: number
  /** Factor de facilidad (2.5 por defecto) */
  ease: number
  /** Repeticiones acertadas */
  reps: number
  /** Fallos */
  lapses: number
}

export interface Settings {
  /** Velocidad del audio (0.6 - 1.2) */
  audioRate: number
  /** false = pinyin-first puro: los retos muestran pinyin (el hanzi es el añadido) */
  showHanzi: boolean
  /** Efectos de sonido retro */
  sfxOn: boolean
  /** MODO SUPERVISOR: desbloquea todas las lecciones (libre, para explorar) */
  adminMode: boolean
}

export interface ProgressState {
  xp: number
  /** Chapas: la moneda del refugio (bono diario + actividades) */
  caps: number
  streakDays: number
  /** Último día de estudio (ISO yyyy-mm-dd) */
  lastStudyDay: string
  /** Lecciones completadas: lessonId → récord */
  completed: Record<string, LessonRecord>
  /** Tarjetas SRS: entryId → card */
  srs: Record<string, SrsCard>
  /** Sesiones de repaso completadas */
  reviewsDone: number
  /** Logros desbloqueados: achievementId → timestamp */
  achievements: Record<string, number>
  settings: Settings
  updatedAt: number
}

export const INITIAL_PROGRESS: ProgressState = {
  xp: 0,
  caps: 0,
  streakDays: 0,
  lastStudyDay: '',
  completed: {},
  srs: {},
  reviewsDone: 0,
  achievements: {},
  settings: { audioRate: 0.9, showHanzi: false, sfxOn: true, adminMode: false },
  updatedAt: 0,
}

/** Rangos del refugio por XP */
export interface Rank {
  xp: number
  name: string
}

export const RANKS: Rank[] = [
  { xp: 0, name: 'Habitante Errante' },
  { xp: 120, name: 'Residente del Vault' },
  { xp: 300, name: 'Explorador' },
  { xp: 600, name: 'Técnico de Campo' },
  { xp: 1000, name: 'Supervisor Adjunto' },
  { xp: 1500, name: 'Supervisor del Refugio' },
  { xp: 2200, name: 'Leyenda del Vault' },
]

export function rankFor(xp: number): { current: Rank; next: Rank | null; progress: number } {
  let current = RANKS[0]
  let next: Rank | null = null
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].xp) {
      current = RANKS[i]
      next = RANKS[i + 1] ?? null
    }
  }
  if (!next) return { current, next: null, progress: 1 }
  const span = next.xp - current.xp
  return { current, next, progress: Math.min(1, (xp - current.xp) / span) }
}
