import { describe, expect, it } from 'vitest'
import type { SrsCard } from '../types/progress'
import { DAY, dueCardIds, gradeCard, newCard, nextDueIn, suggestGrade } from './srs'

const MIN = 60_000

/** Tarjeta de prueba: intervalo 1, ease 2.5 (gradeCard sobreescribe due) */
const card = (over: Partial<SrsCard> = {}): SrsCard => ({
  due: 0,
  interval: 1,
  ease: 2.5,
  reps: 0,
  lapses: 0,
  ...over,
})

describe('newCard', () => {
  it('due mañana, intervalo 0, ease 2.5, virgen', () => {
    const before = Date.now()
    const c = newCard(1)
    const after = Date.now()
    expect(c.interval).toBe(0)
    expect(c.ease).toBe(2.5)
    expect(c.reps).toBe(0)
    expect(c.lapses).toBe(0)
    expect(c.due).toBeGreaterThanOrEqual(before + DAY - MIN)
    expect(c.due).toBeLessThanOrEqual(after + DAY + MIN)
  })
})

describe('gradeCard', () => {
  it('again: lapses+1, ease -0.2, reintento en ~10 min', () => {
    const before = Date.now()
    const g = gradeCard(card(), 'again')
    const after = Date.now()
    expect(g.lapses).toBe(1)
    expect(g.ease).toBeCloseTo(2.3)
    expect(g.interval).toBe(0)
    expect(g.due).toBeGreaterThanOrEqual(before + 10 * MIN - MIN)
    expect(g.due).toBeLessThanOrEqual(after + 10 * MIN + MIN)
  })

  it('good desde tarjeta nueva: intervalo 1, due ~1 día', () => {
    const before = Date.now()
    const g = gradeCard(newCard(), 'good')
    const after = Date.now()
    expect(g.interval).toBe(1)
    expect(g.reps).toBe(1)
    expect(g.due).toBeGreaterThanOrEqual(before + DAY - MIN)
    expect(g.due).toBeLessThanOrEqual(after + DAY + MIN)
  })

  it('intervalo 1: good ×2.5 · easy ×2.5×1.3 · hard ×1.2 (ease 2.45)', () => {
    expect(gradeCard(card(), 'good').interval).toBe(2.5)
    expect(gradeCard(card(), 'easy').interval).toBeCloseTo(3.25)
    const hard = gradeCard(card(), 'hard')
    expect(hard.interval).toBeCloseTo(1.2)
    expect(hard.ease).toBeCloseTo(2.45)
  })

  it('el ease tiene suelo en 1.3', () => {
    let c = card()
    for (let i = 0; i < 10; i++) c = gradeCard(c, 'again')
    expect(c.ease).toBe(1.3)
    expect(c.lapses).toBe(10)
  })
})

describe('dueCardIds', () => {
  it('solo las vencidas, de más antigua a más reciente', () => {
    const now = Date.now()
    const srs: Record<string, SrsCard> = {
      a: card({ due: now - 5 * MIN }),
      b: card({ due: now + DAY }),
      c: card({ due: now - 60 * MIN }),
    }
    expect(dueCardIds(srs)).toEqual(['c', 'a'])
  })
})

describe('nextDueIn', () => {
  it('ms hasta la tarjeta más cercana, aunque no esté due', () => {
    const now = Date.now()
    const srs: Record<string, SrsCard> = {
      b: card({ due: now + MIN }),
      d: card({ due: now + 7 * DAY }),
    }
    const delta = nextDueIn(srs)
    expect(delta).not.toBeNull()
    const ms = delta ?? -1
    expect(ms).toBeGreaterThan(0)
    expect(ms).toBeLessThanOrEqual(MIN)
  })

  it('null si no hay tarjetas en el futuro', () => {
    expect(nextDueIn({})).toBeNull()
  })
})

describe('suggestGrade', () => {
  it('fallo → again · acierto rápido → easy · acierto → good', () => {
    expect(suggestGrade(false, true)).toBe('again')
    expect(suggestGrade(true, true)).toBe('easy')
    expect(suggestGrade(true, false)).toBe('good')
  })
})
