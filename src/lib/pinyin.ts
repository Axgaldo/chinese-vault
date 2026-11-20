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

/**
 * Tabla de sílabas pinyin (sin tonos, minúsculas). Necesaria porque el pinyin
 * se escribe por PALABRAS (zhōngwén = 2 sílabas juntas): para alinear sílaba
 * ↔ carácter hay que trocear cada palabra en sílabas válidas.
 * 'r' suelto = erhuà (diǎnr, yǒudiǎnr).
 */
const SYLLABLES = new Set(
  (
    'a ai an ang ao ' +
    'ba bai ban bang bao bei ben beng bi bian biao bie bin bing bo bu ' +
    'ca cai can cang cao ce cen ceng cha chai chan chang chao che chen cheng chi chong chou chu chua chuai chuan chuang chui chun chuo ci cong cou cu cuan cui cun cuo ' +
    'da dai dan dang dao de den deng di dia dian diao die ding diu dong dou du duan dui dun duo ' +
    'e ei en eng er ' +
    'fa fan fang fei fen feng fo fou fu ' +
    'ga gai gan gang gao ge gei gen geng gong gou gu gua guai guan guang gui gun guo ' +
    'ha hai han hang hao he hei hen heng hong hou hu hua huai huan huang hui hun huo ' +
    'ji jia jian jiang jiao jie jin jing jiong jiu ju juan jue jun ' +
    'ka kai kan kang kao ke kei ken keng kong kou ku kua kuai kuan kuang kui kun kuo ' +
    'la lai lan lang lao le lei leng li lia lian liang liao lie lin ling liu lo long lou lu luan lun luo lü lüe ' +
    'ma mai man mang mao me mei men meng mi mian miao mie min ming miu mo mou mu ' +
    'na nai nan nang nao ne nei nen neng ni nian niang niao nie nin ning niu nong nou nu nuan nuo nü nüe ' +
    'o ou ' +
    'pa pai pan pang pao pei pen peng pi pian piao pie pin ping po pou pu ' +
    'qi qia qian qiang qiao qie qin qing qiong qiu qu quan que qun ' +
    'ran rang rao re ren reng ri rong rou ru rua ruan rui run ruo ' +
    'sa sai san sang sao se sen seng sha shai shan shang shao she shei shen sheng shi shou shu shua shuai shuan shuang shui shun shuo si song sou su suan sui sun suo ' +
    'ta tai tan tang tao te teng ti tian tiao tie ting tong tou tu tuan tui tun tuo ' +
    'wa wai wan wang wei wen weng wo wu ' +
    'xi xia xian xiang xiao xie xin xing xiong xiu xu xuan xue xun ' +
    'ya yan yang yao ye yi yin ying yo yong you yu yuan yue yun ' +
    'za zai zan zang zao ze zei zen zeng zha zhai zhan zhang zhao zhe zhei zhen zheng zhi zhong zhou zhu zhua zhuai zhuan zhuang zhui zhun zhuo zi zong zou zu zuan zui zun zuo ' +
    'r'
  ).split(' '),
)

const MAX_SYLLABLE_LEN = 6

/** Trocea una palabra pinyin "plana" en sílabas válidas (DP, máx. longitud primero) */
function splitPlainSyllables(plain: string): string[] | null {
  const memo = new Map<number, string[] | null>()
  const rec = (i: number): string[] | null => {
    if (i === plain.length) return []
    const cached = memo.get(i)
    if (cached !== undefined) return cached
    for (let len = Math.min(MAX_SYLLABLE_LEN, plain.length - i); len >= 1; len--) {
      const head = plain.slice(i, i + len)
      if (!SYLLABLES.has(head)) continue
      const rest = rec(i + len)
      if (rest) {
        const res = [head, ...rest]
        memo.set(i, res)
        return res
      }
    }
    memo.set(i, null)
    return null
  }
  return rec(0)
}

export interface Syllable {
  /** Texto de la sílaba tal cual (con sus marcas) */
  text: string
  tone: 1 | 2 | 3 | 4 | 5
}

/** Runs de letras pinyin + sus marcas diacríticas (NFD) */
function pinyinRuns(input: string): string[] {
  const out: string[] = []
  let cur = ''
  for (const ch of input) {
    const isLetter = /[a-zA-Z]/.test(ch) || ch === 'ü' || ch === 'Ü'
    const isMark = /[\u0300-\u030F]/.test(ch)
    if (isLetter || isMark) {
      cur += ch
    } else if (cur) {
      out.push(cur)
      cur = ''
    }
  }
  if (cur) out.push(cur)
  return out
}

/**
 * Divide pinyin en sílabas y detecta el tono de cada una.
 * Entrada esperada: "nǐ hǎo", "Xī'ān", "nǚ'ér", "zhōngwén"…
 * Cada palabra se trocea en sílabas válidas (tabla pinyin), así una sílaba
 * SIEMPRE corresponde a un carácter chino. El texto se conserva en NFD.
 */
export function syllabify(pinyin: string): Syllable[] {
  const out: Syllable[] = []
  const runs = pinyinRuns(pinyin.normalize('NFD'))

  for (const run of runs) {
    // info por letra: carácter plano, tramo NFD y tono (las marcas van DETRÁS
    // de la letra y pueden apilarse: ü + tono)
    const infos: { plain: string; runStart: number; runEnd: number; tone: 1 | 2 | 3 | 4 | 5 }[] = []
    let i = 0
    while (i < run.length) {
      const ch = run[i]
      if (/[a-zA-Z]/.test(ch)) {
        infos.push({ plain: ch.toLowerCase(), runStart: i, runEnd: i + 1, tone: 5 })
      } else if (infos.length) {
        const last = infos[infos.length - 1]
        last.runEnd = i + 1
        if (TONE_COMBINING[ch]) last.tone = TONE_COMBINING[ch]
        if (ch === UMLAUT && last.plain === 'u') last.plain = 'ü'
      }
      i++
    }

    const plain = infos.map((x) => x.plain).join('')
    const pieces = splitPlainSyllables(plain) ?? (plain ? [plain] : [])

    // reconstruir cada pieza con sus caracteres NFD originales
    let pos = 0
    for (const piece of pieces) {
      const len = piece.length
      const from = infos[pos].runStart
      const to = infos[pos + len - 1].runEnd
      const tone = infos.slice(pos, pos + len).find((x) => x.tone !== 5)?.tone ?? 5
      out.push({ text: run.slice(from, to), tone })
      pos += len
    }
  }
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

/** Slug de archivo para el audio de frases, CON TONOS para que sea único:
 *  "nǐ hǎo ma?" → "ni3-hao3-ma" · 妈 mā→ma1 ≠ 马 mǎ→ma3 ≠ 骂 mà→ma4.
 *  (Sin tonos, las tres compartían "s-ma" y el apunte de tonos sonaba siempre mā.)
 *  La ü sale como v: nǚ→nv3 (en NFD llega como u+diéresis, no ü precompuesta). */
export function pinyinSlug(pinyin: string): string {
  return syllabify(pinyin)
    .map((s) => {
      // stripTones elimina TODAS las marcas NFD (incluida la diéresis): la ü
      // llega aquí como "u" simple → nǚ → "nu3". La sustitución por 'v' debe
      // hacerse ANTES de stripTones, sobre el texto NFD original.
      const nfd = s.text.normalize('NFD')
      const withV = nfd.replace(/u\u0308/g, 'v').replace(/ü/g, 'v')
      const base = stripTones(withV).toLowerCase()
      return s.tone === 5 ? base : base + String(s.tone)
    })
    .join('-')
    .replace(/-+/g, '-')
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

/** Trozo coloreable de pinyin: una sílaba con su tono, o texto plano */
export type PinyinSegment = { syl: string; tone: 1 | 2 | 3 | 4 | 5 } | { raw: string }

/**
 * Segmentación de pinyin para colorear por tono — el motor de <Pinyin/>.
 * Cada trozo es una SÍLABA con su tono, o texto plano (espacios, puntuación).
 * Acepta diacríticos PRECOMPUESTOS (ǐ ǎ ǖ literales del curso) y NFD:
 * normaliza internamente y devuelve las sílabas en NFC.
 * (Regresión histórica v2.9: sin el NFD previo, los caracteres precompuestos
 * no casaban con "letra" y el pinyin perdía TODOS los colores.)
 */
export function pinyinSegments(text: string): PinyinSegment[] {
  const out: PinyinSegment[] = []
  // NFD primero: 'ǐ' llega como i + acento; abajo solo se reconocen ASCII + marcas
  const nfd = text.normalize('NFD')
  const isLetter = (ch: string) => /[a-zA-Z]/.test(ch)
  const isMark = (ch: string) => /[\u0300-\u036F]/.test(ch)
  let raw = ''
  const flushRaw = () => {
    if (raw) {
      out.push({ raw })
      raw = ''
    }
  }
  let i = 0
  while (i < nfd.length) {
    if (isLetter(nfd[i]) || isMark(nfd[i])) {
      let run = ''
      while (i < nfd.length && (isLetter(nfd[i]) || isMark(nfd[i]))) {
        run += nfd[i]
        i++
      }
      flushRaw()
      // recomponer a NFC: syllabify trabaja con las formas literales del curso
      for (const syl of syllabify(run.normalize('NFC'))) {
        out.push({ syl: syl.text.normalize('NFC'), tone: syl.tone })
      }
    } else {
      raw += nfd[i]
      i++
    }
  }
  flushRaw()
  return out
}
