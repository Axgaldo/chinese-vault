/* ─────────────────────────────────────────────────────────────────────────────
   Registro de progreso del morador (lo que se persiste/localStorage/Firestore)
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

/** Contadores de actividad del DÍA en curso (alimenta las misiones) */
export interface DailyStats {
  /** Día local yyyy-mm-dd (cambia → se resetea todo) */
  date: string
  lessons: number
  perfect: number
  reviews: number
  dictations: number
  tones: number
  steps: number
  xp: number
}

/** Estado de una misión de la caravana */
export interface QuestItem {
  /** id de la plantilla (también es el id del encargo del día) */
  id: string
  progress: number
  claimed: boolean
}

/** Misiones generadas para un día concreto */
export interface QuestState {
  date: string
  items: QuestItem[]
}

/** Tema de color del terminal (Tienda del Refugio) */
export type ThemeId = 'green' | 'amber' | 'teal' | 'red' | 'mono' | 'notebook' | 'atompunk' | 'calido'

/** Registro de un día del histórico (para estadísticas) */
export interface DayLog {
  xp: number
  lessons: number
  reviews: number
}

/** Modo de escritura: pinyin puro · pinyin+hanzi apilados · hanzi puro */
export type ScriptMode = 'pinyin' | 'both' | 'hanzi'

export const SCRIPT_MODES: { mode: ScriptMode; label: string; icon: string }[] = [
  { mode: 'pinyin', label: 'pinyin', icon: '拼' },
  { mode: 'both', label: 'pinyin + hanzi', icon: '拼漢' },
  { mode: 'hanzi', label: 'hanzi', icon: '漢' },
]

/** Letra del texto general */
export type BodyFont = 'mono' | 'pixel' | 'sans' | 'hand' | 'round'

export const BODY_FONTS: { font: BodyFont; label: string }[] = [
  { font: 'mono', label: 'MONO' },
  { font: 'pixel', label: 'PIXEL' },
  { font: 'sans', label: 'SANS' },
  { font: 'hand', label: 'MANO' },
  { font: 'round', label: 'REDONDA' },
]

/** Efectos visuales del terminal (VFX) */
export type VfxId = 'none' | 'crt' | 'glitch' | 'neon'

export const VFX_OPTIONS: { id: VfxId; label: string }[] = [
  { id: 'none', label: 'NINGUNO' },
  { id: 'crt', label: 'CRT' },
  { id: 'glitch', label: 'GLITCH' },
  { id: 'neon', label: 'NEÓN' },
]

export interface Settings {
  /** Velocidad del audio (0.6 - 1.2) */
  audioRate: number
  /** Qué sistema de escritura muestran los retos (botón 拼/漢 de la lección) */
  scriptMode: ScriptMode
  /** Efectos de sonido retro */
  sfxOn: boolean
  /** MODO SUPERVISOR: desbloquea todas las lecciones (libre, para explorar) */
  adminMode: boolean
  /** Efecto visual del terminal (VFX): se compran en la tienda */
  vfx: VfxId
  /** Alto contraste: todo el texto en blanco sobre negro (accesibilidad) */
  highContrast: boolean
  /** Letra del texto general (se compran en la tienda) */
  bodyFont: BodyFont
  /** Tema de color equipado (comprado en la Tienda del Refugio) */
  theme: ThemeId
  /** Recordatorio de racha: notificación unas horas antes de perderla */
  streakReminder: boolean
}

export interface ProgressState {
  xp: number
  /** Chapas: la moneda del refugio (bono diario + actividades) */
  caps: number
  streakDays: number
  /** Mejor racha histórica */
  bestStreak: number
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
  /** Contadores del día (misiones de la caravana) */
  dailyStats: DailyStats
  /** Misiones de la caravana del día */
  quests: QuestState
  /** Temas comprados en la tienda */
  ownedThemes: ThemeId[]
  /** Fuentes compradas en la tienda */
  ownedFonts: BodyFont[]
  /** VFX comprados en la tienda */
  ownedVfx: VfxId[]
  /** Histórico de actividad: yyyy-mm-dd → registro (máx. 60 días) */
  history: Record<string, DayLog>
  settings: Settings
  updatedAt: number
}

export const INITIAL_PROGRESS: ProgressState = {
  xp: 0,
  caps: 0,
  streakDays: 0,
  bestStreak: 0,
  lastStudyDay: '',
  completed: {},
  srs: {},
  reviewsDone: 0,
  achievements: {},
  dailyStats: { date: '', lessons: 0, perfect: 0, reviews: 0, dictations: 0, tones: 0, steps: 0, xp: 0 },
  quests: { date: '', items: [] },
  ownedThemes: ['green'],
  ownedFonts: ['mono', 'pixel', 'sans'],
  ownedVfx: ['none', 'crt'],
  history: {},
  settings: {
    audioRate: 0.9,
    scriptMode: 'pinyin',
    sfxOn: true,
    adminMode: false,
    vfx: 'crt',
    highContrast: false,
    bodyFont: 'mono',
    theme: 'green',
    streakReminder: false,
  },
  updatedAt: 0,
}

/** Rangos del refugio por XP (terminología Fallout ES). Reescalados para cubrir
 *  HSK 0-3 (~25.000 XP de recorrido), no solo el primer 15% del curso. */
export interface Rank {
  xp: number
  name: string
}

export const RANKS: Rank[] = [
  { xp: 0, name: 'Morador Errante' },
  { xp: 250, name: 'Morador del Refugio' },
  { xp: 700, name: 'Superviviente' },
  { xp: 1500, name: 'Explorador' },
  { xp: 2800, name: 'Guía de Supervivencia' },
  { xp: 5000, name: 'Jefe de Caravana' },
  { xp: 8000, name: 'Saqueador' },
  { xp: 12000, name: 'Miembro de la Hermandad' },
  { xp: 17000, name: 'Supervisor del Refugio' },
  { xp: 23000, name: 'Leyenda del Refugio' },
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
