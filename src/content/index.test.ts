import { describe, expect, it } from 'vitest'
import { pinyinSlug } from '../lib/pinyin'
import type { LessonKind } from '../types/content'
import {
  allLessons,
  entriesById,
  entryIdsInStep,
  isLessonUnlocked,
  lessonById,
  lessonEntryIds,
  modules,
  nextLessonId,
  notesById,
  seenEntries,
} from './index'

const KINDS: LessonKind[] = ['pinyin', 'vocab', 'grammar', 'review']

describe('integridad del curso', () => {
  it('ids únicos: lecciones, apuntes y palabras', () => {
    const lessonIds = allLessons.map((l) => l.id)
    expect(new Set(lessonIds).size).toBe(lessonIds.length)
    expect(lessonById.size).toBe(allLessons.length)

    const allNotes = allLessons.flatMap((l) => l.notes)
    const noteIds = allNotes.map((n) => n.id)
    expect(new Set(noteIds).size).toBe(noteIds.length)
    expect(notesById.size).toBe(allNotes.length)

    const allEntries = modules.flatMap((m) => m.entries)
    const entryIds = allEntries.map((en) => en.id)
    expect(new Set(entryIds).size).toBe(entryIds.length)
    expect(entriesById.size).toBe(allEntries.length)
  })

  it('módulos y lecciones bien formados', () => {
    const problems: string[] = []
    for (const m of modules) {
      if (!m.id || !m.code || !m.title || !m.subtitle) problems.push(`módulo incompleto: ${m.id}`)
      if (m.hsk !== 0 && m.hsk !== 1) problems.push(`hsk inválido: ${m.id}`)
      if (m.lessons.length < 1) problems.push(`${m.id}: sin lecciones`)
      for (const l of m.lessons) {
        if (!l.id || !l.title) problems.push(`lección sin id/título en ${m.id}`)
        if (!KINDS.includes(l.kind)) problems.push(`kind inválido: ${l.id}`)
        if (l.steps.length < 1) problems.push(`${l.id}: sin pasos`)
      }
    }
    expect(problems).toEqual([])
  })

  it('todo paso referencia ids que existen', () => {
    const problems: string[] = []
    for (const l of allLessons) {
      for (const step of l.steps) {
        for (const id of entryIdsInStep(step)) {
          if (!entriesById.has(id)) problems.push(`${l.id} (${step.type}): entrada inexistente ${id}`)
        }
        if (step.type === 'note' && !notesById.has(step.note)) {
          problems.push(`${l.id}: apunte inexistente ${step.note}`)
        }
        if (step.type === 'build') {
          const { hanzi, pinyin, es } = step.sentence
          if (!hanzi || !pinyin || !es) problems.push(`${l.id}: frase build incompleta`)
          const slug = pinyinSlug(pinyin)
          if (!/^[a-z0-9-]+$/.test(slug)) problems.push(`${l.id}: slug de frase inválido "${slug}"`)
        }
      }
    }
    expect(problems).toEqual([])
  })

  it('lessonEntryIds: ids únicos y presentes en el banco', () => {
    const problems: string[] = []
    for (const l of allLessons) {
      const ids = lessonEntryIds(l.id)
      if (new Set(ids).size !== ids.length) problems.push(`${l.id}: repite entradas`)
      for (const id of ids) {
        if (!entriesById.has(id)) problems.push(`${l.id}: ${id} fuera del banco`)
      }
    }
    expect(problems).toEqual([])
  })

  it('entradas completas (hanzi, pinyin con letras, traducción)', () => {
    const problems: string[] = []
    for (const en of entriesById.values()) {
      if (!en.hanzi) problems.push(`${en.id}: sin hanzi`)
      if (!en.pinyin) problems.push(`${en.id}: sin pinyin`)
      else if (!/[a-z]/i.test(en.pinyin)) problems.push(`${en.id}: pinyin sin letras`)
      if (!en.es) problems.push(`${en.id}: sin traducción`)
    }
    expect(problems).toEqual([])
  })

  it('ejemplos de los apuntes completos', () => {
    const problems: string[] = []
    for (const n of notesById.values()) {
      for (const ex of n.examples) {
        if (!ex.hanzi || !ex.pinyin || !ex.es) problems.push(`${n.id}: ejemplo incompleto`)
      }
    }
    expect(problems).toEqual([])
  })

  it('nextLessonId([]) → primera lección del curso', () => {
    expect(allLessons[0].id).toBe('hsk0-l1')
    expect(nextLessonId([])).toBe(allLessons[0].id)
  })

  it('isLessonUnlocked: lineal, la primera siempre libre', () => {
    const [first, second] = allLessons
    expect(isLessonUnlocked(first.id, [])).toBe(true)
    expect(isLessonUnlocked(second.id, [])).toBe(false)
    expect(isLessonUnlocked(second.id, [first.id])).toBe(true)
    expect(isLessonUnlocked('leccion-fantasma', [])).toBe(false)
  })

  it('seenEntries: sin completar nada no se ha visto nada', () => {
    expect(seenEntries([])).toEqual([])
  })

  it('seenEntries(["hsk0-l1"]) → el cuarteto de "ma"', () => {
    expect(seenEntries(['hsk0-l1'])).toEqual(['w-ma1', 'w-ma2', 'w-ma3', 'w-ma4'])
  })
})
