/* ─────────────────────────────────────────────────────────────────────────────
   MISIONES DE LA CARAVANA 🐂

   Cada día llega al refugio una caravana con 3 encargos generados de forma
   DETERMINISTA a partir de la fecha (todos los moradores del mismo día ven los
   mismos encargos; cambiar de día regenera). Los encargos miden contadores del
   día (`dailyStats`) y al reclamarlos pagan chapas.
   ───────────────────────────────────────────────────────────────────────────── */

import type { DailyStats } from '../types/progress'

export type QuestMetric = keyof Omit<DailyStats, 'date'>

export interface QuestTemplate {
  id: string
  emoji: string
  title: string
  metric: QuestMetric
  goal: number
  caps: number
}

export const QUEST_POOL: QuestTemplate[] = [
  {
    id: 'q-lesson',
    emoji: '📗',
    title: 'completa 1 lección (nueva o repetida)',
    metric: 'lessons',
    goal: 1,
    caps: 4,
  },
  {
    id: 'q-perfect',
    emoji: '⭐',
    title: 'consigue 3★ en una lección',
    metric: 'perfect',
    goal: 1,
    caps: 6,
  },
  {
    id: 'q-review',
    emoji: '📡',
    title: 'acierta 12 repasos',
    metric: 'reviews',
    goal: 12,
    caps: 5,
  },
  {
    id: 'q-dictation',
    emoji: '🎧',
    title: 'acierta 4 dictados de oído',
    metric: 'dictations',
    goal: 4,
    caps: 5,
  },
  {
    id: 'q-tone',
    emoji: '🎼',
    title: 'acierta 6 entrenamientos de tonos',
    metric: 'tones',
    goal: 6,
    caps: 4,
  },
  {
    id: 'q-steps',
    emoji: '⚔️',
    title: 'acierta 25 pasos de reto',
    metric: 'steps',
    goal: 25,
    caps: 4,
  },
  {
    id: 'q-xp',
    emoji: '⚡',
    title: 'gana 60 XP hoy',
    metric: 'xp',
    goal: 60,
    caps: 6,
  },
]

/** Hash estable de un string (para sembrar la generación diaria) */
function hash(str: string): number {
  let h = 0
  for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) | 0
  return Math.abs(h)
}

/** Los 3 encargos de la caravana para una fecha yyyy-mm-dd (estables todo el día) */
export function questsForDate(date: string): QuestTemplate[] {
  const seed = hash(`caravana-${date}`)
  // selección determinista sin repetición
  const picked: QuestTemplate[] = []
  let cursor = seed % QUEST_POOL.length
  while (picked.length < 3) {
    const t = QUEST_POOL[cursor % QUEST_POOL.length]
    if (!picked.some((p) => p.id === t.id)) picked.push(t)
    cursor += 1 + (seed % 3)
  }
  return picked
}
