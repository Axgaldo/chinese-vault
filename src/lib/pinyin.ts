/* ─────────────────────────────────────────────────────────────────────────────
   Utilidades de pinyin: colores por tono, comparación tolerante, texto plano
   ───────────────────────────────────────────────────────────────────────────── */

const TONE_COMBINING: Record<string, 1 | 2 | 3 | 4> = {
  '\u0304': 1, // ̄  macron
  '\u0301': 2, // ́  acute
  '\u030C': 3, // ̌  caron
  '\u0300': 4, // ̀  grave
}

/** Diacrítico de la ü (NFD: u + U+0308) */
const UMLAUT = '\u0308'

export interface Syllable {
  /** Texto de la sílaba tal cual (con sus marcas) */
  text: string
  tone: 1 | 2 | 3 | 4 | 5
}

/**
 * Divide pinyin en sílabas y detecta el tono de cada una.
 * Entrada esperada: "nǐ hǎo", "Xī'ān", "nǚ'ér"…
 * El texto se conserva en NFD (se renderiza igual que el original).
 */
export function syllabify(pinyin: string): Syllable[] {
  const out: Syllable[] = []
  let current = ''
  let tone: 1 | 2 | 3 | 4 | 5 = 5

  const flush = () => {
    if (current) out.push({ text: current, tone })
    current = ''
    tone = 5
  }

  for (const ch of pinyin.normalize('NFD')) {
    if (TONE_COMBINING[ch]) {
      tone = TONE_COMBINING[ch]
      current += ch
      continue
    }
    if (ch === UMLAUT) {
      current += ch
      continue
    }
    if (/[a-zA-Z]/.test(ch)) {
      current += ch
      continue
    }
    // apóstrofo separador de sílabas: TERMINA la sílaba en curso (Xi'an → xī + ān)
    if (ch === "'" || ch === '’') {
      flush()
      continue
    }
    // espacio, signos de puntuación… fin de sílaba
    flush()
  }
  flush()
  return out
}

/** Detecta el tono de una sílaba aislada */
export function toneOfSyllable(syl: string): 1 | 2 | 3 | 4 | 5 {
  return syllabify(syl)[0]?.tone ?? 5
}

/** Pinyin sin marcas de tono: "nǐ hǎo" → "ni hao"
 *  (la ü también se pierde en el NFD: "lǜ" → "lu" — coherente con slugs/normalización) */
export function stripTones(pinyin: string): string {
  return pinyin
    .normalize('NFD')
    .replace(/[\u0300-\u030F]/g, '')
    .normalize('NFC')
}

/** Slug de archivo para el audio de frases: "nǐ hǎo ma" → "ni-hao-ma" */
export function pinyinSlug(pinyin: string): string {
  return stripTones(pinyin)
    .toLowerCase()
    .replace(/ü/g, 'v')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Normaliza pinyin tecleado por el usuario para comparar:
 * minúsculas, sin espacios ni signos, v/u:/ü → u.
 */
export function normalizePinyin(input: string): string {
  return stripTones(input)
    .toLowerCase()
    .replace(/[üǖǘǚǜ]/g, 'u')
    .replace(/u:/g, 'u')
    .replace(/v/g, 'u')
    .replace(/[^a-z0-9]/g, '')
}

/** ¿El usuario escribió el pinyin correcto? (tolerante a tonos/espacios/ü) */
export function pinyinMatches(input: string, expected: string): boolean {
  return normalizePinyin(input) === normalizePinyin(expected)
}

/** Clase de color Tailwind para cada tono */
export const toneColor = (tone: 1 | 2 | 3 | 4 | 5): string =>
  ({
    1: 'text-tone-1',
    2: 'text-tone-2',
    3: 'text-tone-3',
    4: 'text-tone-4',
    5: 'text-tone-5',
  })[tone]

/** Descripción corta del tono (UI) */
export const toneLabel = (tone: 1 | 2 | 3 | 4 | 5): string =>
  ({
    1: 'alto y plano',
    2: 'ascendente',
    3: 'baja y sube',
    4: 'descendente',
    5: 'neutral',
  })[tone]
