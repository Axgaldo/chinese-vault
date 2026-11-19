import { describe, expect, it } from 'vitest'
import {
  normalizePinyin,
  pinyinMatches,
  pinyinSlug,
  stripTones,
  syllabify,
  toneColor,
  toneLabel,
  toneOfSyllable,
} from './pinyin'

describe('syllabify', () => {
  it('"nǐ hǎo" → 2 sílabas, tono 3, texto en NFD', () => {
    const r = syllabify('nǐ hǎo')
    expect(r).toHaveLength(2)
    expect(r.map((s) => s.tone)).toEqual([3, 3])
    // el texto interno va en NFD; recomponiendo debe dar la sílaba original
    expect(r[0].text.normalize('NFC')).toBe('nǐ')
  })

  it('apóstrofo separa sílabas (Xi\'an → xī + ān)', () => {
    const r = syllabify("Xī'ān")
    expect(r).toHaveLength(2)
    expect(r.map((s) => s.tone)).toEqual([1, 1])
    expect(r[0].text.normalize('NFC')).toBe('Xī')
    expect(r[1].text.normalize('NFC')).toBe('ān')
  })

  it('"nǚ" → 1 sílaba con tono 3 (u + diéresis + caron en NFD)', () => {
    const r = syllabify('nǚ')
    expect(r).toHaveLength(1)
    expect(r[0].tone).toBe(3)
    expect(r[0].text.normalize('NFC')).toBe('nǚ')
  })

  it('tonos de "ma": 2, 4 y neutral', () => {
    expect(syllabify('má')[0].tone).toBe(2)
    expect(syllabify('mà')[0].tone).toBe(4)
    expect(syllabify('ma')[0].tone).toBe(5)
  })
})

describe('toneOfSyllable', () => {
  it('tono de una sílaba aislada (5 si no tiene marca)', () => {
    expect(toneOfSyllable('mǎ')).toBe(3)
    expect(toneOfSyllable('ma')).toBe(5)
  })
})

describe('stripTones', () => {
  it('quita las marcas de tono', () => {
    expect(stripTones('nǐ hǎo')).toBe('ni hao')
  })

  it('la diéresis de la ü también se quita (U+0308 cae en el rango del regex)', () => {
    // ojo: el docstring dice "ü se mantiene", pero el rango \u0300-\u030F se la lleva
    expect(stripTones('lǜ')).toBe('lu')
  })
})

describe('pinyinSlug', () => {
  it('frase → slug de audio', () => {
    expect(pinyinSlug('nǐ hǎo ma?')).toBe('ni-hao-ma')
  })

  it('"nǚ" → "nu" (la ü ya se perdió en stripTones)', () => {
    expect(pinyinSlug('nǚ')).toBe('nu')
  })
})

describe('normalizePinyin', () => {
  it('minúsculas, sin espacios ni signos', () => {
    expect(normalizePinyin('Nǐ HǎO!')).toBe('nihao')
  })

  it('ü, v y "u:" se convierten en u', () => {
    expect(normalizePinyin('nü')).toBe('nu')
    expect(normalizePinyin('nv')).toBe('nu')
    expect(normalizePinyin('u:')).toBe('u')
  })
})

describe('pinyinMatches', () => {
  it('tolerante a tonos, mayúsculas y puntuación', () => {
    expect(pinyinMatches('nihao', 'nǐ hǎo')).toBe(true)
    expect(pinyinMatches('NI HAO?', 'nǐ hǎo')).toBe(true)
  })

  it('una letra cambiada no pasa', () => {
    expect(pinyinMatches('ni jao', 'nǐ hǎo')).toBe(false)
  })
})

describe('UI de tonos', () => {
  it('toneColor(3) contiene la clase tone-3', () => {
    expect(toneColor(3)).toContain('tone-3')
  })

  it('toneLabel(1) no vacío', () => {
    expect(toneLabel(1).length).toBeGreaterThan(0)
  })
})
