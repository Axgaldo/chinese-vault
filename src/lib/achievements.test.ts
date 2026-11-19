import { describe, expect, it } from 'vitest'
import { INITIAL_PROGRESS, type LessonRecord, type ProgressState } from '../types/progress'
import { newlyUnlocked } from './achievements'

const unlockedIds = (s: ProgressState): string[] => newlyUnlocked(s).map((a) => a.id)

/** Estado base (INITIAL_PROGRESS) + overrides tipo Partial */
const state = (over: Partial<ProgressState>): ProgressState => ({ ...INITIAL_PROGRESS, ...over })

const lessonDone = (stars = 1): LessonRecord => ({ stars, accuracy: 1, playedAt: 0 })

describe('newlyUnlocked', () => {
  it('progreso virgen: ningún logro', () => {
    expect(unlockedIds(INITIAL_PROGRESS)).toEqual([])
  })

  it('primera lección completada → Puerta 101', () => {
    expect(unlockedIds(state({ completed: { 'hsk0-l1': lessonDone() } }))).toContain('a-puerta-101')
  })

  it('racha de 3 días → Fuego Amigo', () => {
    expect(unlockedIds(state({ streakDays: 3 }))).toContain('a-fuego-amigo')
  })

  it('100 chapas → El Rey de las Chapas', () => {
    expect(unlockedIds(state({ caps: 100 }))).toContain('a-chapero')
  })

  it('una sesión de repaso → Operador de Radio', () => {
    expect(unlockedIds(state({ reviewsDone: 1 }))).toContain('a-operador-radio')
  })

  it('3★ en una lección → Perfeccionista', () => {
    expect(unlockedIds(state({ completed: { 'hsk0-l1': lessonDone(3) } }))).toContain('a-perfeccionista')
  })

  it('un logro ya sellado no vuelve a desbloquearse', () => {
    const s = state({
      completed: { 'hsk0-l1': lessonDone() },
      achievements: { 'a-puerta-101': 12345 },
    })
    expect(unlockedIds(s)).not.toContain('a-puerta-101')
  })
})
