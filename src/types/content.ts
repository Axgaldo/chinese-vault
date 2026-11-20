/* ─────────────────────────────────────────────────────────────────────────────
   Modelo de contenido del curso
   El contenido vive en `src/content/` como datos TS puros. Nada de binarios:
   el audio se genera (scripts/generate-audio.ts) o se sintetiza en el navegador.
   ───────────────────────────────────────────────────────────────────────────── */

/** Tono del mandarín: 1 alto ─ 2 ascendente ─ 3 descendente-ascendente ─ 4 descendente ─ 5 neutral */
export type Tone = 1 | 2 | 3 | 4 | 5

/** Una palabra o frase del curso. El id determina el audio: `/audio/{id}.mp3` */
export interface VocabEntry {
  id: string
  /** Caracteres chinos, p. ej. 你好 */
  hanzi: string
  /** Pinyin con marcas de tono, p. ej. "nǐ hǎo" */
  pinyin: string
  /** Traducción al español */
  es: string
  /** Icono representativo (emoji) */
  emoji?: string
  /** Desglose literal opcional, p. ej. "xué = aprender · xí = practicar" */
  literal?: string
}

/** Frase de ejemplo. El audio se deduce del pinyin: `/audio/s-{slug}.mp3` */
export interface Sentence {
  hanzi: string
  pinyin: string
  es: string
}

/** Línea de un diálogo de la Radio */
export interface DialogueLine {
  /** Hablante corto mostrado: "A" / "B" */
  who: 'A' | 'B'
  hanzi: string
  pinyin: string
  es: string
}

/**
 * Diálogo de la Radio: situación real con 3-6 líneas A/B.
 * `sector` = id del módulo que lo desbloquea (mismo vocabulario/nivel);
 * `topic` = etiqueta temática corta para la parrilla.
 */
export interface Dialogue {
  id: string
  sector: string
  topic: string
  title: string
  lines: DialogueLine[]
}

/** Apunte de gramática: se guarda en el Archivo del Vault al completar la lección */
export interface GrammarNote {
  id: string
  title: string
  /** Explicación en español. Los saltos de línea separan párrafos. */
  body: string
  examples: Sentence[]
}

/** Un paso de lección. Los distractores se generan en tiempo de ejecución. */
export type Step =
  /** Presentación de palabra: tarjeta con audio + REGISTRAR ENTRADA */
  | { type: 'intro'; entry: string }
  /** Apunte de gramática */
  | { type: 'note'; note: string }
  /** Dado el hanzi/pinyin, elegir la traducción española */
  | { type: 'choose-es'; entry: string }
  /** Dada la traducción, elegir el hanzi (o pinyin si el usuario lo prefiere) */
  | { type: 'choose-hanzi'; entry: string }
  /** Solo audio: escuchar y elegir el hanzi correcto */
  | { type: 'listen'; entry: string }
  /** Entrenador de tonos: suena `entry`, elegir el tono de `syllable` */
  | { type: 'tone'; entry: string; syllable: string; tone: Tone }
  /** Escribir el pinyin (sin tonos, sin mayúsculas) */
  | { type: 'type-pinyin'; entry: string }
  /** Dictado de oído puro: solo audio, escribir el pinyin que se oye */
  | { type: 'dictate'; entry: string }
  /** Desafío oral: pronunciar la palabra (SpeechRecognition, puntúa por sílabas) */
  | { type: 'speak'; entry: string }
  /** Desafío de escritura: trazar el hanzi en la cuadrícula 田字格 (puntúa el trazo) */
  | { type: 'write'; entry: string }
  /** Construir una frase ordenando sus piezas */
  | { type: 'build'; sentence: Sentence }
  /** Emparejar hanzi ↔ español */
  | { type: 'match'; entries: string[] }

export type LessonKind = 'pinyin' | 'vocab' | 'grammar' | 'review'

export interface Lesson {
  id: string
  title: string
  kind: LessonKind
  steps: Step[]
  /** Apuntes de la lección, referenciados por pasos `{ type: 'note' }` */
  notes: GrammarNote[]
}

/** Módulo = "sector" del refugio */
export interface VaultModule {
  id: string
  /** Nivel HSK del sector */
  hsk: 0 | 1 | 2 | 3
  /** Código corto mostrado en la UI, p. ej. "S-00" */
  code: string
  title: string
  subtitle: string
  /** Banco de palabras del módulo (también alimentan los distractores) */
  entries: VocabEntry[]
  lessons: Lesson[]
}
