/* ─────────────────────────────────────────────────────────────────────────────
   Logros del refugio — se comprueban tras cada actividad (lección/repaso).
   Uno nuevo desbloqueado → sfx + toast + queda grabado en el perfil.
   ───────────────────────────────────────────────────────────────────────────── */

import { modules, seenEntries } from '../content'
import type { ProgressState } from '../types/progress'

export interface Achievement {
  id: string
  emoji: string
  title: string
  desc: string
  check(s: ProgressState): boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a-puerta-101',
    emoji: '🚪',
    title: 'Puerta 101',
    desc: 'Completa tu primera lección',
    check: (s) => Object.keys(s.completed).length >= 1,
  },
  {
    id: 'a-oido-fino',
    emoji: '👂',
    title: 'Oído Fino',
    desc: 'Completa el Sector 0 (tonos y pinyin)',
    check: (s) => modules[0]?.lessons.every((l) => l.id in s.completed) ?? false,
  },
  {
    id: 'a-operador-radio',
    emoji: '📡',
    title: 'Operador de Radio',
    desc: 'Completa tu primera sesión de repaso',
    check: (s) => s.reviewsDone >= 1,
  },
  {
    id: 'a-perfeccionista',
    emoji: '⭐',
    title: 'Perfeccionista',
    desc: 'Consigue 3★ en una lección',
    check: (s) => Object.values(s.completed).some((r) => r.stars >= 3),
  },
  {
    id: 'a-fuego-amigo',
    emoji: '🔥',
    title: 'Fuego Amigo',
    desc: 'Estudia 3 días seguidos',
    check: (s) => s.streakDays >= 3,
  },
  {
    id: 'a-bibliotecario',
    emoji: '📚',
    title: 'Bibliotecario',
    desc: 'Registra 25 palabras en el archivo',
    check: (s) => seenEntries(Object.keys(s.completed)).length >= 25,
  },
  {
    id: 'a-supervisor-sector',
    emoji: '🏆',
    title: 'Supervisor de Sector',
    desc: 'Completa un sector entero',
    check: (s) => modules.some((m) => m.lessons.every((l) => l.id in s.completed)),
  },
  {
    id: 'a-maraton',
    emoji: '⚡',
    title: 'Maratón del Refugio',
    desc: 'Completa 10 lecciones',
    check: (s) => Object.keys(s.completed).length >= 10,
  },
  {
    id: 'a-veterano',
    emoji: '🎖️',
    title: 'Veterano del Refugio',
    desc: 'Registra 60 palabras en el archivo',
    check: (s) => seenEntries(Object.keys(s.completed)).length >= 60,
  },
  {
    id: 'a-chapero',
    emoji: '🥤',
    title: 'El Rey de las Chapas',
    desc: 'Acumula 100 chapas',
    check: (s) => s.caps >= 100,
  },
]

/** Qué logros acaban de desbloquearse con este estado */
export function newlyUnlocked(s: ProgressState): Achievement[] {
  return ACHIEVEMENTS.filter((a) => !(a.id in s.achievements) && a.check(s))
}
