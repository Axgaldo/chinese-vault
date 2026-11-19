import { describe, expect, it } from 'vitest'
import { allLessons } from '../content'
import type { Step } from '../types/content'
import { isGraded, optionsFor, reviewStepFor, shuffle } from './questions'

/** Un paso de cada tipo que SÍ puntúa */
const GRADED_STEPS: Step[] = [
  { type: 'choose-es', entry: 'w-ma1' },
  { type: 'choose-hanzi', entry: 'w-ma1' },
  { type: 'listen', entry: 'w-ma1' },
  { type: 'type-pinyin', entry: 'w-ma1' },
  { type: 'dictate', entry: 'w-ma1' },
  { type: 'tone', entry: 'w-ma1', syllable: 'mā', tone: 1 },
  { type: 'build', sentence: { hanzi: '你好吗？', pinyin: 'nǐ hǎo ma?', es: '¿Cómo estás?' } },
  { type: 'match', entries: ['w-ma1', 'w-ma2'] },
]

describe('optionsFor', () => {
  it('4 opciones únicas que incluyen la correcta', () => {
    const opts = optionsFor('w-ma1', ['hsk0-l1'], 4)
    expect(opts).toHaveLength(4)
    expect(opts).toContain('w-ma1')
    expect(new Set(opts).size).toBe(4)
  })

  it('con todo el curso completado sigue habiendo 4 únicas', () => {
    const done = allLessons.map((l) => l.id)
    const opts = optionsFor('w-ni-hao', done, 4)
    expect(opts).toHaveLength(4)
    expect(opts).toContain('w-ni-hao')
    expect(new Set(opts).size).toBe(4)
  })
})

describe('isGraded', () => {
  it('intro y note no puntúan', () => {
    expect(isGraded({ type: 'intro', entry: 'w-ma1' })).toBe(false)
    expect(isGraded({ type: 'note', note: 'n-tonos' })).toBe(false)
  })

  it('el resto de retos puntúa', () => {
    const notGraded = GRADED_STEPS.filter((s) => !isGraded(s)).map((s) => s.type)
    expect(notGraded).toEqual([])
  })
})

describe('reviewStepFor', () => {
  it('rota choose-es → listen → choose-hanzi', () => {
    expect(reviewStepFor('w-ni-hao', 0).type).toBe('choose-es')
    expect(reviewStepFor('w-ni-hao', 1).type).toBe('listen')
    expect(reviewStepFor('w-ni-hao', 2).type).toBe('choose-hanzi')
  })

  it('reps 3: palabra corta → type-pinyin, larga (对不起) → dictate', () => {
    expect(reviewStepFor('w-ni-hao', 3).type).toBe('type-pinyin')
    expect(reviewStepFor('w-dui-bu-qi', 3).type).toBe('dictate')
  })

  it('reps 4: desafío oral (el bucle oído-boca cada 5 repeticiones)', () => {
    expect(reviewStepFor('w-ni-hao', 4).type).toBe('speak')
    expect(reviewStepFor('w-dui-bu-qi', 4).type).toBe('speak')
  })
})

describe('shuffle', () => {
  it('conserva el multiset y no muta el original', () => {
    const src = [3, 1, 2, 1]
    const out = shuffle(src)
    expect([...out].sort((a, b) => a - b)).toEqual([1, 1, 2, 3])
    expect(src).toEqual([3, 1, 2, 1])
  })

  it('funciona con array vacío', () => {
    expect(shuffle([])).toEqual([])
  })
})
