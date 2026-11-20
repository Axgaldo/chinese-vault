/* ─────────────────────────────────────────────────────────────────────────────
   Retos del refugio. Cada componente recibe un paso del contenido y reporta
   onResult(correcto, xp). Los distractores se generan en runtime para que
   repetir una lección nunca dé las mismas opciones.
   ───────────────────────────────────────────────────────────────────────────── */

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { contextSentences, entriesById, notesById } from '../content'
import { speakEntry, speakSentence } from '../lib/audio'
import { sfx } from '../lib/sfx'
import { optionsFor, shuffle } from '../lib/questions'
import { pinyinMatches, stripTones, syllabify, toneColor, toneLabel } from '../lib/pinyin'
import { useProgress } from '../stores/useProgress'
import { Pinyin } from './Pinyin'
import { Btn, Cursor, Panel, Prompt, SpeakerBtn } from './ui'
import type { Step, VocabEntry } from '../types/content'
import type { ScriptMode } from '../types/progress'

export interface ChallengeProps {
  step: Step
  /** false cuando es el reintento de un paso ya fallado (no da XP otra vez) */
  awardXp: boolean
  /** Lección en curso: para no spoilear sus propios builds como "contexto" */
  lessonId?: string
  onResult: (correct: boolean, xp: number) => void
}

interface CoreProps {
  awardXp: boolean
  onResult: (correct: boolean, xp: number) => void
}

/** Props de un reto concreto: el paso llega ya acotado a su variante */
type CProps<T extends Step['type']> = CoreProps & { step: Extract<Step, { type: T }>; lessonId?: string }

export function ChallengeView({ step, ...rest }: ChallengeProps) {
  switch (step.type) {
    case 'intro':
      return <IntroVocab step={step} {...rest} />
    case 'note':
      return <NoteView step={step} {...rest} />
    case 'choose-es':
      return <ChooseEs step={step} {...rest} />
    case 'choose-hanzi':
      return <ChooseHanzi step={step} {...rest} />
    case 'listen':
      return <ListenView step={step} {...rest} />
    case 'tone':
      return <TonePick step={step} {...rest} />
    case 'type-pinyin':
      return <TypePinyin step={step} {...rest} />
    case 'dictate':
      return <Dictation step={step} {...rest} />
    case 'speak':
      return <SpeakView step={step} {...rest} />
    case 'write':
      return <WriteView step={step} {...rest} />
    case 'build':
      return <BuildView step={step} {...rest} />
    case 'match':
      return <MatchView step={step} {...rest} />
  }
}

/* ── Reconocimiento de voz (Web Speech API) ───────────────────────────────── */

interface SpeechRecognitionEventLike {
  results: ArrayLike<ArrayLike<{ transcript: string }>>
}
interface SpeechRecognitionInstance {
  lang: string
  interimResults: boolean
  continuous: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onresult: ((e: SpeechRecognitionEventLike) => void) | null
  onerror: ((e: { error?: string }) => void) | null
  onend: (() => void) | null
}
type SpeechRecognitionCtor = new () => SpeechRecognitionInstance

/** ¿El navegador trae reconocimiento de voz? (Chrome/Edge sí; Firefox no) */
function getSpeechRecognition(): SpeechRecognitionCtor | null {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

/* ── Utilidades compartidas ───────────────────────────────────────────────── */

function useCompletedKey(): string {
  return useProgress((s) => Object.keys(s.completed).join(','))
}

function Feedback({
  correct,
  onContinue,
  children,
}: {
  correct: boolean
  onContinue: () => void
  children?: ReactNode
}) {
  // latch: el doble toque no debe disparar el avance dos veces
  const [done, setDone] = useState(false)
  return (
    <div className="pop-in mt-5">
      <p
        className={`font-display text-center text-2xl tracking-widest ${correct ? 'text-vault-400 glow' : 'text-vault-red'}`}
      >
        {correct ? '▓ ACCESO CONCEDIDO ▓' : '✗ ERROR DE PROTOCOLO'}
      </p>
      {children}
      <Btn
        className="mt-4 w-full"
        disabled={done}
        onClick={() => {
          if (done) return
          setDone(true)
          onContinue()
        }}
      >
        CONTINUAR ▸
      </Btn>
    </div>
  )
}

/** Modo de escritura del morador: 拼 (pinyin) → 拼+漢 (ambos) → 漢 (hanzi) */
function useScriptMode(): ScriptMode {
  return useProgress((s) => s.settings.scriptMode)
}

/**
 * Palabra del enunciado, estilo HelloChinese:
 * 拼: pinyin grande (toca = audio + revela el hanzi)
 * 拼+漢: hanzi con pinyin apilado debajo
 * 漢: hanzi grande (toca = audio + revela el pinyin)
 */
function PromptWord({
  entry,
  reveal = true,
  className = '',
}: {
  entry: VocabEntry
  /** false para retos de transcripción: siempre hanzi, sin revelado */
  reveal?: boolean
  className?: string
}) {
  const mode = useScriptMode()
  const [peeked, setPeeked] = useState(false)
  const canPeek = reveal && mode !== 'both'

  return (
    <button
      type="button"
      className={`flex flex-col items-center ${className}`}
      onClick={() => {
        speakEntry(entry)
        if (canPeek) setPeeked((p) => !p)
      }}
      title={canPeek ? 'toca: audio + versión en el otro sistema' : 'toca: audio'}
    >
      {mode === 'pinyin' ? (
        <Pinyin text={entry.pinyin} className="text-5xl glow sm:text-6xl" />
      ) : (
        <span className="font-hanzi text-6xl leading-tight text-vault-100 glow sm:text-7xl">{entry.hanzi}</span>
      )}
      {mode === 'both' && <Pinyin text={entry.pinyin} className="mt-0.5 text-xl text-vault-300" />}
      {canPeek && peeked && (
        <span className="pop-in mt-1">
          {mode === 'pinyin' ? (
            <span className="font-hanzi text-2xl text-vault-300">{entry.hanzi}</span>
          ) : (
            <Pinyin text={entry.pinyin} className="text-xl" />
          )}
        </span>
      )}
    </button>
  )
}

/** Palabra dentro de opciones/chips: muestra el script del modo activo */
function WordInMode({ entry }: { entry: VocabEntry }) {
  const mode = useScriptMode()
  if (mode === 'pinyin') {
    return <Pinyin text={entry.pinyin} className="text-2xl" />
  }
  return (
    <span className="flex flex-col items-center">
      <span className="font-hanzi text-3xl text-vault-100">{entry.hanzi}</span>
      {mode === 'both' && <Pinyin text={entry.pinyin} className="mt-0.5 text-xs text-vault-400" />}
    </span>
  )
}

/** Hanzi grande siempre visible (para retos de transcripción de pinyin) */
function EntryHanzi({ entry, className = '' }: { entry: VocabEntry; className?: string }) {
  return (
    <button
      type="button"
      className={`font-hanzi text-6xl leading-tight text-vault-100 glow cursor-pointer ${className}`}
      onClick={() => speakEntry(entry)}
      title="pulsa para escuchar"
    >
      {entry.hanzi}
    </button>
  )
}

/* ── Presentación de palabra ───────────────────────────────────────────────── */

function IntroVocab({ step, lessonId, onResult }: CProps<'intro'>) {
  const entry = entriesById.get(step.entry)
  const completedKey = useCompletedKey()
  const context = useMemo(
    () =>
      entry
        ? contextSentences(entry.id, completedKey ? completedKey.split(',') : [], lessonId, 2)
        : [],
    [entry, completedKey, lessonId],
  )
  const [pop, setPop] = useState(false)

  useEffect(() => {
    if (!entry) return
    const t = setTimeout(() => {
      speakEntry(entry)
      sfx.log()
    }, 350)
    setPop(true)
    return () => clearTimeout(t)
  }, [entry])

  if (!entry) return null
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${pop ? 'pop-in' : ''}`}>
      <Prompt>▓ NUEVA ENTRADA AL ARCHIVO ▓</Prompt>
      {entry.emoji && <div className="text-6xl">{entry.emoji}</div>}
      <EntryHanzi entry={entry} />
      <Pinyin text={entry.pinyin} className="text-4xl" />
      <p className="text-xl text-vault-100">{entry.es}</p>
      {entry.literal && <p className="text-sm text-vault-500">{entry.literal}</p>}

      {context.length > 0 && (
        <div className="w-full space-y-1.5 border-t border-vault-800 pt-2 text-left">
          <p className="text-xs text-vault-600">▓ EN CONTEXTO — toca para oírla ▓</p>
          {context.map((s, i) => (
            <button
              key={i}
              type="button"
              className="block w-full rounded px-2 py-1 text-left hover:bg-vault-800/60"
              onClick={() => speakSentence(s)}
              title="pulsa para escuchar la frase"
            >
              <span className="font-hanzi text-lg text-vault-200">{s.hanzi}</span>{' '}
              <Pinyin text={s.pinyin} className="text-xs" />
              <span className="block text-xs text-vault-600">{s.es}</span>
            </button>
          ))}
        </div>
      )}

      <Btn className="mt-2 w-full" onClick={() => onResult(true, 0)}>
        REGISTRAR ENTRADA ▸
      </Btn>
    </div>
  )
}

/* ── Apunte de gramática ───────────────────────────────────────────────────── */

function NoteView({ step, onResult }: CProps<'note'>) {
  const note = notesById.get(step.note)
  if (!note) return null
  return (
    <div className="flex flex-col gap-3">
      <Prompt>▓ APUNTE DEL REFUGIO ▓</Prompt>
      <Panel solid className="panel-read p-4">
        <h3 className="font-display text-2xl text-vault-200 glow">{note.title}</h3>
        <div className="mt-2 space-y-2 text-lg leading-relaxed">
          {note.body.split('\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-3 space-y-2 border-t border-vault-700 pt-3">
          {note.examples.map((ex, i) => (
            <button
              key={i}
              type="button"
              className="block w-full text-left hover:text-vault-100"
              onClick={() => speakSentence(ex)}
              title="pulsa para escuchar"
            >
              <span className="font-hanzi text-xl text-vault-200">{ex.hanzi} </span>
              <Pinyin text={ex.pinyin} className="text-sm" /> <span className="text-sm text-vault-500">— {ex.es}</span>
            </button>
          ))}
          <Cursor />
        </div>
      </Panel>
      <Btn className="w-full" onClick={() => onResult(true, 0)}>
        ENTENDIDO ▸
      </Btn>
    </div>
  )
}

/* ── Elegir traducción ────────────────────────────────────────────────────── */

function ChooseEs({ step, awardXp, onResult }: CProps<'choose-es'>) {
  const entry = entriesById.get(step.entry)
  const completedKey = useCompletedKey()
  const options = useMemo(
    () =>
      optionsFor(
        step.entry,
        completedKey ? completedKey.split(',') : [],
        4,
        // deduplicar por la etiqueta que el jugador VE (español)
        (id) => entriesById.get(id)?.es ?? id,
      ),
    [step.entry, completedKey],
  )
  const [picked, setPicked] = useState<string | null>(null)

  if (!entry) return null
  const answered = picked !== null
  const correct = picked === entry.id

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>¿QUÉ SIGNIFICA?</Prompt>
      <div className="flex items-center gap-3">
        <PromptWord entry={entry} />
        <SpeakerBtn onClick={() => speakEntry(entry)} />
      </div>
      <div className={`grid w-full gap-2 ${answered ? (correct ? 'flash-correct' : 'shake flash-wrong') : ''}`}>
        {options.map((id) => {
          const opt = entriesById.get(id)
          if (!opt) return null
          const cls = answered && id === entry.id ? 'choice-correct' : picked === id ? 'choice-wrong' : ''
          return (
            <button
              key={id}
              type="button"
              disabled={answered}
              className={`choice rounded px-4 py-3 text-center text-lg ${cls}`}
              onClick={() => {
                setPicked(id)
                if (id === entry.id) sfx.correct()
                else sfx.wrong()
              }}
            >
              {opt.es}
            </button>
          )
        })}
      </div>
      {answered && (
        <Feedback correct={correct} onContinue={() => onResult(correct, awardXp && correct ? 10 : 0)} />
      )}
    </div>
  )
}

/* ── Elegir hanzi/pinyin ──────────────────────────────────────────────────── */

function ChooseHanzi({ step, awardXp, onResult }: CProps<'choose-hanzi'>) {
  const entry = entriesById.get(step.entry)
  const mode = useScriptMode()
  const completedKey = useCompletedKey()
  const options = useMemo(
    () =>
      optionsFor(
        step.entry,
        completedKey ? completedKey.split(',') : [],
        4,
        (id) => {
          const e = entriesById.get(id)
          if (!e) return id
          return mode === 'pinyin' ? stripTones(e.pinyin).toLowerCase() : e.hanzi
        },
      ),
    [step.entry, completedKey, mode],
  )
  const [picked, setPicked] = useState<string | null>(null)

  if (!entry) return null
  const answered = picked !== null
  const correct = picked === entry.id

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>ELIGE LA PALABRA</Prompt>
      <div className="text-center">
        {entry.emoji && <div className="text-4xl">{entry.emoji}</div>}
        <p className="text-2xl text-vault-100">{entry.es}</p>
      </div>
      <div className={`grid w-full grid-cols-2 gap-2 ${answered ? (correct ? 'flash-correct' : 'shake flash-wrong') : ''}`}>
        {options.map((id) => {
          const opt = entriesById.get(id)
          if (!opt) return null
          const cls = answered && id === entry.id ? 'choice-correct' : picked === id ? 'choice-wrong' : ''
          return (
            <button
              key={id}
              type="button"
              disabled={answered}
              className={`choice flex flex-col items-center rounded px-3 py-4 ${cls}`}
              onClick={() => {
                setPicked(id)
                if (id === entry.id) sfx.correct()
                else sfx.wrong()
              }}
            >
              <WordInMode entry={opt} />
              {answered && mode !== 'both' && (
                <span className="mt-1 text-xs text-vault-500">
                  {mode === 'pinyin' ? opt.hanzi : <Pinyin text={opt.pinyin} />}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {answered && (
        <Feedback correct={correct} onContinue={() => onResult(correct, awardXp && correct ? 10 : 0)}>
          <p className="text-center text-sm text-vault-500">
            {entry.hanzi} · <Pinyin text={entry.pinyin} /> — {entry.es}
          </p>
        </Feedback>
      )}
    </div>
  )
}

/* ── Escuchar y elegir ────────────────────────────────────────────────────── */

function ListenView({ step, awardXp, onResult }: CProps<'listen'>) {
  const entry = entriesById.get(step.entry)
  const mode = useScriptMode()
  const completedKey = useCompletedKey()
  const options = useMemo(
    () =>
      optionsFor(
        step.entry,
        completedKey ? completedKey.split(',') : [],
        4,
        (id) => {
          const e = entriesById.get(id)
          if (!e) return id
          return mode === 'pinyin' ? stripTones(e.pinyin).toLowerCase() : e.hanzi
        },
      ),
    [step.entry, completedKey, mode],
  )
  const [picked, setPicked] = useState<string | null>(null)

  useEffect(() => {
    if (entry) {
      const t = setTimeout(() => speakEntry(entry), 400)
      return () => clearTimeout(t)
    }
  }, [entry])

  if (!entry) return null
  const answered = picked !== null
  const correct = picked === entry.id

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>ESCUCHA Y ELIGE</Prompt>
      <SpeakerBtn big onClick={() => speakEntry(entry)} />
      <div className={`grid w-full grid-cols-2 gap-2 ${answered ? (correct ? 'flash-correct' : 'shake flash-wrong') : ''}`}>
        {options.map((id) => {
          const opt = entriesById.get(id)
          if (!opt) return null
          const cls = answered && id === entry.id ? 'choice-correct' : picked === id ? 'choice-wrong' : ''
          return (
            <button
              key={id}
              type="button"
              disabled={answered}
              className={`choice flex flex-col items-center rounded px-3 py-4 ${cls}`}
              onClick={() => {
                setPicked(id)
                if (id === entry.id) sfx.correct()
                else sfx.wrong()
              }}
            >
              <WordInMode entry={opt} />
              {answered && mode !== 'both' && (
                <span className="mt-1 text-xs text-vault-500">
                  {mode === 'pinyin' ? opt.hanzi : <Pinyin text={opt.pinyin} />}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {answered && (
        <Feedback correct={correct} onContinue={() => onResult(correct, awardXp && correct ? 10 : 0)}>
          <p className="text-center text-sm text-vault-500">
            {entry.hanzi} · <Pinyin text={entry.pinyin} /> — {entry.es}
          </p>
        </Feedback>
      )}
    </div>
  )
}

/* ── Entrenador de tonos ──────────────────────────────────────────────────── */

function TonePick({ step, awardXp, onResult }: CProps<'tone'>) {
  const entry = entriesById.get(step.entry)
  const [picked, setPicked] = useState<number | null>(null)

  useEffect(() => {
    if (entry) {
      const t = setTimeout(() => speakEntry(entry), 400)
      return () => clearTimeout(t)
    }
  }, [entry])

  if (!entry) return null
  const answered = picked !== null
  const correct = picked === step.tone

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>IDENTIFICA EL TONO</Prompt>
      <SpeakerBtn big onClick={() => speakEntry(entry)} />
      <div className={`grid w-full grid-cols-2 gap-2 ${answered ? (correct ? 'flash-correct' : 'shake flash-wrong') : ''}`}>
        {([1, 2, 3, 4] as const).map((t) => {
          const cls = answered && t === step.tone ? 'choice-correct' : picked === t ? 'choice-wrong' : ''
          return (
            <button
              key={t}
              type="button"
              disabled={answered}
              className={`choice rounded px-4 py-3 ${cls}`}
              onClick={() => {
                setPicked(t)
                if (t === step.tone) sfx.correct()
                else sfx.wrong()
              }}
            >
              <span className={`font-display text-2xl ${toneColor(t)}`}>
                {t} {toneShape(t)}
              </span>
              <span className="block text-sm text-vault-500">{toneLabel(t)}</span>
            </button>
          )
        })}
      </div>
      {answered && (
        <Feedback correct={correct} onContinue={() => onResult(correct, awardXp && correct ? 10 : 0)}>
          <p className="text-center">
            <Pinyin text={step.syllable} className="text-2xl" />{' '}
            <span className="text-sm text-vault-500">— tono {step.tone}: {toneLabel(step.tone)}</span>
          </p>
          {!correct && (
            <p className="text-center text-sm text-vault-500">
              {entry.hanzi} significa «{entry.es}»
            </p>
          )}
        </Feedback>
      )}
    </div>
  )
}

const toneShape = (t: 1 | 2 | 3 | 4) =>
  ({ 1: '▁̄', 2: '↗', 3: '∨', 4: '↘' })[t]

/* ── Escribir pinyin ──────────────────────────────────────────────────────── */

function TypePinyin({ step, awardXp, onResult }: CProps<'type-pinyin'>) {
  const entry = entriesById.get(step.entry)
  const [value, setValue] = useState('')
  const [state, setState] = useState<'typing' | 'ok' | 'ko'>('typing')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  if (!entry) return null
  const plain = entry.pinyin.replace(/\s+/g, '')

  const submit = () => {
    if (!value.trim() || state !== 'typing') return
    if (pinyinMatches(value, entry.pinyin)) {
      setState('ok')
      sfx.correct()
    } else {
      setState('ko')
      sfx.wrong()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>ESCRIBE EL PINYIN</Prompt>
      <div className="flex items-center gap-3">
        <EntryHanzi entry={entry} />
        <SpeakerBtn onClick={() => speakEntry(entry)} />
      </div>
      <p className="text-sm text-vault-500">sin tonos y sin mayúsculas — p. ej. «ni hao»</p>
      <form
        className={`w-full space-y-3 ${state === 'ok' ? 'flash-correct' : state === 'ko' ? 'shake flash-wrong' : ''}`}
        onSubmit={(ev) => {
          ev.preventDefault()
          submit()
        }}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          disabled={state !== 'typing'}
          className="choice choice-selected w-full rounded px-4 py-3 text-center text-2xl text-vault-100 outline-none"
          placeholder="pinyin…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
        />
        {state === 'typing' && (
          <Btn type="submit" className="w-full" disabled={!value.trim()}>
            COMPROBAR ▸
          </Btn>
        )}
      </form>
      {state !== 'typing' && (
        <Feedback correct={state === 'ok'} onContinue={() => onResult(state === 'ok', awardXp && state === 'ok' ? 10 : 0)}>
          <p className="text-center text-sm text-vault-500">
            <Pinyin text={entry.pinyin} className="text-lg" />
            <span className="block">(vale con o sin tonos: {plain.toLowerCase().normalize('NFD').replace(/[\u0300-\u030F]/g, '')})</span>
          </p>
        </Feedback>
      )}
    </div>
  )
}

/* ── Dictado de oído puro (quiz de escucha) ───────────────────────────────── */

function Dictation({ step, awardXp, onResult }: CProps<'dictate'>) {
  const entry = entriesById.get(step.entry)
  const [value, setValue] = useState('')
  const [state, setState] = useState<'typing' | 'ok' | 'ko'>('typing')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    if (entry) {
      const t = setTimeout(() => speakEntry(entry), 400)
      return () => clearTimeout(t)
    }
  }, [entry])

  if (!entry) return null

  const submit = () => {
    if (!value.trim() || state !== 'typing') return
    if (pinyinMatches(value, entry.pinyin)) {
      setState('ok')
      sfx.correct()
    } else {
      setState('ko')
      sfx.wrong()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>▓ DICTADO DEL REFUGIO ▓</Prompt>
      <p className="text-sm text-vault-500">solo con el oído: escribe el pinyin (sin tonos)</p>
      <SpeakerBtn big onClick={() => speakEntry(entry)} />
      <form
        className={`w-full space-y-3 ${state === 'ok' ? 'flash-correct' : state === 'ko' ? 'shake flash-wrong' : ''}`}
        onSubmit={(ev) => {
          ev.preventDefault()
          submit()
        }}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          disabled={state !== 'typing'}
          className="choice choice-selected w-full rounded px-4 py-3 text-center text-2xl text-vault-100 outline-none"
          placeholder="lo que oigas…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
        />
        {state === 'typing' && (
          <Btn type="submit" className="w-full" disabled={!value.trim()}>
            COMPROBAR ▸
          </Btn>
        )}
      </form>
      {state !== 'typing' && (
        <Feedback correct={state === 'ok'} onContinue={() => onResult(state === 'ok', awardXp && state === 'ok' ? 10 : 0)}>
          <p className="text-center">
            <span className="font-hanzi text-xl text-vault-200">{entry.hanzi} </span>
            <Pinyin text={entry.pinyin} className="text-lg" />
            <span className="block text-sm text-vault-500">— {entry.es}</span>
          </p>
        </Feedback>
      )}
    </div>
  )
}

/* ── Construir frase ──────────────────────────────────────────────────────── */

function BuildView({ step, awardXp, onResult }: CProps<'build'>) {
  const { sentence } = step
  const mode = useScriptMode()
  /** Frase objetivo sin puntuación, por caracteres */
  const target = useMemo(() => [...sentence.hanzi.replace(/[。，？！、]/g, '')], [sentence])
  /** Sílabas alineadas 1:1 con target (mismo índice = mismo carácter) */
  const sylls = useMemo(() => {
    const syl = syllabify(sentence.pinyin)
    return syl.length === target.length ? syl : null
  }, [sentence, target])
  /** Orden barajado de ÍNDICES: cada ficha i = target[i] con sylls[i] (coherentes) */
  const bank = useMemo(() => shuffle(target.map((_, i) => i)), [target])
  const [placed, setPlaced] = useState<number[]>([])
  const [state, setState] = useState<'building' | 'ok' | 'ko'>('building')

  const answer = placed.map((i) => target[i]).join('')
  const ready = answer.length === target.length

  /** Contenido de la ficha del carácter i según el modo de escritura */
  const chip = (i: number) => {
    const ch = target[i]
    const syl = sylls ? sylls[i]?.text.normalize('NFC') : null
    if (mode === 'pinyin') {
      // sin sílaba fiable (desalineado) se muestra el hanzi: NUNCA un pinyin ajeno
      return syl ? (
        <Pinyin text={syl} className="text-xl text-vault-200" />
      ) : (
        <span className="font-hanzi text-2xl text-vault-200">{ch}</span>
      )
    }
    return (
      <span className="flex flex-col items-center leading-none">
        <span className="font-hanzi text-2xl text-vault-200">{ch}</span>
        {mode === 'both' && (
          <span className="text-[10px] text-vault-500">{syl ? stripTones(syl) : ''}</span>
        )}
      </span>
    )
  }

  const check = () => {
    if (!ready || state !== 'building') return
    if (answer === target.join('')) {
      setState('ok')
      sfx.correct()
    } else {
      setState('ko')
      sfx.wrong()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>CONSTRUYE LA FRASE</Prompt>
      <div className="flex items-center gap-3 text-center">
        <div>
          <p className="text-xl text-vault-100">{sentence.es}</p>
          <SpeakerBtn className="mt-2" onClick={() => speakSentence(sentence)} label="escuchar la frase" />
        </div>
      </div>

      <div
        className={`meter flex min-h-16 w-full flex-wrap items-center justify-center gap-1 p-2 ${
          state === 'ok' ? 'flash-correct' : state === 'ko' ? 'shake flash-wrong' : ''
        }`}
      >
        {placed.length === 0 && <span className="text-sm text-vault-600">toca las piezas en orden…</span>}
        {placed.map((bankIdx, pos) => (
          <button
            key={pos}
            type="button"
            className="chip px-2 py-1"
            onClick={() => state === 'building' && setPlaced(placed.slice(0, pos))}
            title="quitar pieza"
          >
            {chip(bankIdx)}
          </button>
        ))}
      </div>

      {state === 'building' && (
        <>
          <div className="flex flex-wrap justify-center gap-1">
            {bank.map((targetIdx, pos) => (
              <button
                key={pos}
                type="button"
                disabled={placed.includes(targetIdx)}
                className={`choice rounded px-3 py-2 ${placed.includes(targetIdx) ? 'opacity-20' : 'hover:border-vault-400'}`}
                onClick={() => setPlaced([...placed, targetIdx])}
              >
                {chip(targetIdx)}
              </button>
            ))}
          </div>
          <div className="flex w-full gap-2">
            <Btn className="flex-1" variant="amber" onClick={() => setPlaced(placed.slice(0, -1))} disabled={!placed.length}>
              ⟲ UNDO
            </Btn>
            <Btn className="flex-1" onClick={check} disabled={!ready}>
              COMPROBAR ▸
            </Btn>
          </div>
        </>
      )}

      {state !== 'building' && (
        <Feedback correct={state === 'ok'} onContinue={() => onResult(state === 'ok', awardXp && state === 'ok' ? 10 : 0)}>
          <p className="text-center">
            <span className="font-hanzi text-xl text-vault-200">{sentence.hanzi}</span>
            <Pinyin text={sentence.pinyin} className="block text-sm" />
            <span className="text-sm text-vault-500">{sentence.es}</span>
          </p>
        </Feedback>
      )}
    </div>
  )
}

/* ── Desafío oral (pronunciación) ─────────────────────────────────────────── */

/** Tiempo mínimo de escucha (ms): sílabas cortas ("mā") necesitan margen o el
 *  reconocedor corta antes de capturarlas; con escucha CONTINUA se acumulan
 *  varios intentos hasta que pase el mínimo (o el máximo). */
const SPEAK_MIN_MS = 2000
const SPEAK_MAX_MS = 6000

function SpeakView({ step, awardXp, onResult }: CProps<'speak'>) {
  const entry = entriesById.get(step.entry)
  const [state, setState] = useState<'idle' | 'listening' | 'done'>('idle')
  const [alts, setAlts] = useState<string[]>([])
  const [errMsg, setErrMsg] = useState<string | null>(null)
  const recRef = useRef<SpeechRecognitionInstance | null>(null)
  const collectedRef = useRef<string[]>([])
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const hasSR = Boolean(getSpeechRecognition())

  useEffect(() => {
    if (entry) {
      const t = setTimeout(() => speakEntry(entry), 350)
      return () => clearTimeout(t)
    }
  }, [entry])

  // limpieza al desmontar: cortar micro y temporizadores
  useEffect(() => {
    const timers = timersRef.current
    return () => {
      try {
        recRef.current?.abort()
      } catch {
        /* ya muerto */
      }
      timers.forEach(clearTimeout)
    }
  }, [])

  if (!entry) return null

  const evaluate = () => {
    const heard = collectedRef.current
    setAlts(heard.length ? heard : ['…'])
    setState('done')
    sfx.blip()
  }

  const start = () => {
    const SR = getSpeechRecognition()
    if (!SR || !entry) return
    sfx.tap()
    try {
      recRef.current?.abort()
    } catch {
      /* rec ya muerto */
    }
    collectedRef.current = []
    const rec = new SR()
    recRef.current = rec
    rec.lang = 'zh-CN'
    rec.interimResults = false
    rec.maxAlternatives = 3
    rec.continuous = true

    const startedAt = Date.now()
    let stopped = false

    const stopAndEvaluate = () => {
      if (stopped) return
      stopped = true
      timersRef.current.forEach(clearTimeout)
      try {
        rec.stop()
      } catch {
        /* ya parado */
      }
      // margen para el último onresult en llegar
      timersRef.current.push(setTimeout(evaluate, 250))
    }

    rec.onresult = (e) => {
      // CONTINUO: acumula los resultados de todos los eventos del turno
      const results = e.results as unknown as ArrayLike<ArrayLike<{ transcript: string }>>
      for (let r = 0; r < results.length; r++) {
        const list = results[r]
        for (let i = 0; i < list.length; i++) {
          const t = list[i].transcript.trim()
          if (t && !collectedRef.current.includes(t)) collectedRef.current.push(t)
        }
      }
      // si ya pasó el mínimo y tenemos algo, cerramos con un pequeño colchón
      if (Date.now() - startedAt >= SPEAK_MIN_MS && collectedRef.current.length) {
        stopAndEvaluate()
      }
    }
    rec.onerror = (e) => {
      if (stopped) return
      if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed') {
        setErrMsg('El micrófono está bloqueado: permítele el acceso al navegador.')
        setState('idle')
        stopped = true
      }
      // 'no-speech' / 'aborted' se toleran: seguirá escuchando hasta el mínimo
    }
    rec.onend = () => {
      if (stopped) return
      // el motor cortó solo (silencio): si aún no llegó al mínimo, reintenta
      if (Date.now() - startedAt < SPEAK_MIN_MS) {
        try {
          rec.start()
        } catch {
          stopAndEvaluate()
        }
      } else {
        stopAndEvaluate()
      }
    }

    // tope duro: pase lo que pase, evaluamos
    timersRef.current.push(setTimeout(stopAndEvaluate, SPEAK_MAX_MS))

    setErrMsg(null)
    setAlts([])
    setState('listening')
    rec.start()
  }

  /** Mapa carácter → pinyin sin tonos (del propio curso) para tolerar homófonos:
   *  decir "tā" y que el ASR escriba 他/她 debe contar como ella/el éxito fonético. */
  const homophonesOf = (ch: string): Set<string> => {
    const out = new Set<string>()
    for (const e of entriesById.values()) {
      const chars = [...e.hanzi]
      const syls = syllabify(e.pinyin)
      const idx = chars.indexOf(ch)
      if (idx >= 0 && syls[idx]) {
        out.add(stripTones(syls[idx].text).toLowerCase())
      }
    }
    return out
  }

  /** Puntuación por sílabas con tolerancia de homófonos */
  const targetChars = [...entry.hanzi]
  const sylls = syllabify(entry.pinyin)
  const heardText = alts.join(' ')
  const heardChars = new Set([...heardText])
  const charOk = targetChars.map((ch) => {
    if (heardChars.has(ch)) return true
    // homófonos: algún carácter oído con el mismo pinyin (sin tonos)
    const pron = homophonesOf(ch)
    for (const h of heardChars) {
      const hPron = [...entriesById.values()].find((e) => e.hanzi.includes(h))
      const hSyls = hPron ? syllabify(hPron.pinyin) : []
      const hIdx = hPron ? [...hPron.hanzi].indexOf(h) : -1
      if (hPron && hIdx >= 0 && hSyls[hIdx] && pron.has(stripTones(hSyls[hIdx].text).toLowerCase())) {
        return true
      }
    }
    return false
  })
  const ratio = targetChars.length ? charOk.filter(Boolean).length / targetChars.length : 0
  const green = state === 'done' && ratio === 1
  const yellow = state === 'done' && ratio >= 0.5 && ratio < 1

  return (
    <div className="flex flex-col items-center gap-3">
      <Prompt>DESAFÍO ORAL</Prompt>

      {/* objetivo */}
      <PromptWord entry={entry} />

      <p className="text-center text-sm text-vault-500">
        {entry.es} — pulsa el micro y pronuncia «{entry.pinyin}»
      </p>

      {!hasSR && (
        <Panel className="w-full p-3 text-center">
          <p className="text-sm text-vault-500">
            Tu navegador no trae reconocimiento de voz (Chrome o Edge sí). Desafío oral
            omitido — sin penalización.
          </p>
          <Btn className="mt-2 w-full" onClick={() => onResult(true, 0)}>
            CONTINUAR ▸
          </Btn>
        </Panel>
      )}

      {hasSR && (
        <>
          <Btn className="px-6 py-3 text-2xl" variant={state === 'listening' ? 'amber' : 'primary'} onClick={start}>
            {state === 'listening' ? '🎙️ ESCUCHANDO…' : '🎤 PRONUNCIAR'}
          </Btn>

          {state === 'listening' && (
            <p className="font-display text-lg text-vault-400 glow">
              ▂▃▅ ▁▂▄ ▃▅▂ <span className="blink">▍</span>
            </p>
          )}
          {state === 'listening' && (
            <p className="text-xs text-vault-600">di la palabra; puedes repetirla hasta {SPEAK_MAX_MS / 1000} s</p>
          )}
          {errMsg && state !== 'done' && <p className="text-sm text-vault-amber">{errMsg}</p>}

          {state === 'done' && (
            <div className={`w-full space-y-3 ${green ? 'flash-correct' : yellow ? '' : 'shake flash-wrong'}`}>
              {/* lo que ha oído el terminal */}
              <Panel className="p-3 text-center">
                <p className="text-xs text-vault-600">EL TERMINAL HA OÍDO</p>
                <p className="font-hanzi text-2xl text-vault-200">{alts[0] || '…'}</p>
                {alts.length > 1 && (
                  <p className="mt-1 text-xs text-vault-600">también: {alts.slice(1).join(' · ')}</p>
                )}
              </Panel>

              {/* puntuación por sílabas */}
              <div className="flex flex-wrap justify-center gap-1.5">
                {targetChars.map((ch, i) => (
                  <div
                    key={i}
                    className={`choice rounded px-2.5 py-1.5 text-center ${
                      charOk[i] ? 'choice-correct' : 'choice-wrong'
                    }`}
                  >
                    <span className="block font-hanzi text-2xl text-vault-100">{ch}</span>
                    <span className="block text-[10px] text-vault-500">{sylls[i]?.text.normalize('NFC') ?? ''}</span>
                  </div>
                ))}
              </div>

              <p
                className={`text-center font-display text-xl ${
                  green ? 'text-vault-400 glow' : yellow ? 'text-vault-amber glow' : 'text-vault-red'
                }`}
              >
                {green ? '▓ PRONUNCIACIÓN PERFECTA ▓' : yellow ? '◐ CASI: alguna sílaba se te escapó' : '✗ NO TE HE ENTENDIDO'}
              </p>

              <div className="flex w-full gap-2">
                <Btn variant="amber" className="flex-1" onClick={start}>
                  ⟲ OTRA VEZ
                </Btn>
                <Btn
                  className="flex-1"
                  onClick={() => onResult(green || yellow, awardXp && green ? 10 : awardXp && yellow ? 5 : 0)}
                >
                  CONTINUAR ▸
                </Btn>
              </div>
            </div>
          )}

          {state === 'idle' && !errMsg && (
            <p className="text-xs text-vault-600">se puntúa por sílabas: verde acierto · rojo fallo</p>
          )}
        </>
      )}
    </div>
  )
}

/* ── Desafío de escritura (trazar el hanzi) ───────────────────────────────── */

const GRID = 240

function WriteView({ step, awardXp, onResult }: CProps<'write'>) {
  const entry = entriesById.get(step.entry)
  const guideRef = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [hasInk, setHasInk] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  /** Pinta la cuadrícula 田字格 + el carácter guía tenue */
  useEffect(() => {
    const c = guideRef.current
    if (!c || !entry) return
    const ctx = c.getContext('2d')!
    ctx.clearRect(0, 0, GRID, GRID)
    // fondo
    ctx.fillStyle = '#020604'
    ctx.fillRect(0, 0, GRID, GRID)
    // cuadrícula 田字格: marco + cruces (diagonales discontinuas)
    ctx.strokeStyle = '#1d7a38'
    ctx.lineWidth = 2
    ctx.setLineDash([])
    ctx.strokeRect(1, 1, GRID - 2, GRID - 2)
    ctx.setLineDash([6, 8])
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(GRID / 2, 0)
    ctx.lineTo(GRID / 2, GRID)
    ctx.moveTo(0, GRID / 2)
    ctx.lineTo(GRID, GRID / 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(GRID, GRID)
    ctx.moveTo(GRID, 0)
    ctx.lineTo(0, GRID)
    ctx.stroke()
    ctx.setLineDash([])
    // guía del carácter (tenue)
    ctx.fillStyle = 'rgba(61, 255, 112, 0.14)'
    ctx.font = `700 ${Math.floor(GRID * 0.72)}px "Noto Sans SC", "Microsoft YaHei", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(entry.hanzi, GRID / 2, GRID / 2 + GRID * 0.04)
  }, [entry])

  const clear = () => {
    const c = drawRef.current
    if (!c) return
    c.getContext('2d')!.clearRect(0, 0, GRID, GRID)
    setHasInk(false)
    setScore(null)
  }

  const pointer = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    const c = drawRef.current
    if (!c) return { x: 0, y: 0 }
    const r = c.getBoundingClientRect()
    return { x: ((ev.clientX - r.left) / r.width) * GRID, y: ((ev.clientY - r.top) / r.height) * GRID }
  }

  const startStroke = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    if (score !== null) return
    const c = drawRef.current
    if (!c) return
    c.setPointerCapture(ev.pointerId)
    drawing.current = true
    setHasInk(true)
    const { x, y } = pointer(ev)
    const ctx = c.getContext('2d')!
    ctx.strokeStyle = '#3dff70'
    ctx.lineWidth = 13
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const moveStroke = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const ctx = drawRef.current?.getContext('2d')
    if (!ctx) return
    const { x, y } = pointer(ev)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const endStroke = () => {
    drawing.current = false
  }

  /** IoU del trazo del morador contra el carácter renderizado */
  const check = () => {
    const draw = drawRef.current
    const guide = guideRef.current
    if (!draw || !guide || !entry || !hasInk) return
    // render limpio del objetivo (sin cuadrícula)
    const target = document.createElement('canvas')
    target.width = GRID
    target.height = GRID
    const tctx = target.getContext('2d')!
    tctx.fillStyle = '#fff'
    tctx.font = `700 ${Math.floor(GRID * 0.72)}px "Noto Sans SC", "Microsoft YaHei", sans-serif`
    tctx.textAlign = 'center'
    tctx.textBaseline = 'middle'
    tctx.fillText(entry.hanzi, GRID / 2, GRID / 2 + GRID * 0.04)

    const tData = tctx.getImageData(0, 0, GRID, GRID).data
    const uData = draw.getContext('2d')!.getImageData(0, 0, GRID, GRID).data
    let inter = 0
    let union = 0
    for (let i = 3; i < tData.length; i += 4) {
      const t = tData[i] > 40
      const u = uData[i] > 40
      if (t && u) inter++
      if (t || u) union++
    }
    const iou = union ? inter / union : 0
    setScore(iou)
    if (iou >= 0.5) sfx.correct()
    else sfx.wrong()
  }

  if (!entry) return null

  const green = score !== null && score >= 0.5
  const yellow = score !== null && score >= 0.32 && score < 0.5

  return (
    <div className="flex flex-col items-center gap-3">
      <Prompt>DESAFÍO DE ESCRITURA</Prompt>

      <div className="text-center">
        <Pinyin text={entry.pinyin} className="text-2xl" />
        <p className="text-sm text-vault-500">{entry.es}</p>
      </div>

      <div className={`relative ${score !== null && !green && !yellow ? 'shake' : ''}`}>
        <canvas ref={guideRef} width={GRID} height={GRID} className="rounded border border-vault-700" />
        <canvas
          ref={drawRef}
          width={GRID}
          height={GRID}
          className="absolute inset-0 cursor-crosshair touch-none rounded"
          onPointerDown={startStroke}
          onPointerMove={moveStroke}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
        />
      </div>

      {score === null ? (
        <div className="flex w-full gap-2">
          <Btn variant="amber" className="flex-1" onClick={clear} disabled={!hasInk}>
            ⟲ LIMPIAR
          </Btn>
          <Btn className="flex-1" onClick={check} disabled={!hasInk}>
            COMPROBAR ▸
          </Btn>
        </div>
      ) : (
        <div className="w-full space-y-3">
          <p
            className={`text-center font-display text-xl ${
              green ? 'text-vault-400 glow' : yellow ? 'text-vault-amber glow' : 'text-vault-red'
            }`}
          >
            {green
              ? `▓ TRAZO MAESTRO · ${Math.round(score * 100)}% ▓`
              : yellow
                ? `◐ CASI · ${Math.round(score * 100)}% — la guía era tenue, el pulso también`
                : `✗ ${Math.round(score * 100)}% — vuelve a intentarlo con calma`}
          </p>
          <div className="flex w-full gap-2">
            <Btn variant="amber" className="flex-1" onClick={clear}>
              ⟲ OTRA VEZ
            </Btn>
            <Btn
              className="flex-1"
              onClick={() => onResult(green || yellow, awardXp && green ? 10 : awardXp && yellow ? 5 : 0)}
            >
              CONTINUAR ▸
            </Btn>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-vault-600">
        traza el carácter sobre la guía tenue · la puntuación compara tu trazo con el original
      </p>
    </div>
  )
}

/* ── Emparejar ────────────────────────────────────────────────────────────── */

function MatchView({ step, awardXp, onResult }: CProps<'match'>) {
  const ids = step.entries
  const mode = useScriptMode()
  const left = useMemo(() => shuffle(ids), [ids])
  const right = useMemo(() => shuffle(ids), [ids])
  const [selected, setSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const [errors, setErrors] = useState(0)
  const [wrongPair, setWrongPair] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const tapLeft = (id: string) => {
    if (matched.includes(id)) return
    setSelected(id)
    sfx.tap()
  }

  const tapRight = (id: string) => {
    if (matched.includes(id) || !selected) return
    if (id === selected) {
      sfx.match()
      const next = [...matched, selected]
      setMatched(next)
      setSelected(null)
      if (next.length === ids.length) {
        setDone(true)
        setTimeout(() => sfx.complete(), 250)
      }
    } else {
      sfx.wrong()
      setErrors((n) => n + 1)
      setWrongPair(id)
      setTimeout(() => setWrongPair(null), 450)
      setSelected(null)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>{mode === 'pinyin' ? 'EMPAREJA PINYIN ↔ SIGNIFICADO' : 'EMPAREJA HANZI ↔ SIGNIFICADO'}</Prompt>
      <div className="grid w-full grid-cols-2 gap-2">
        <div className="space-y-2">
          {left.map((id) => {
            const opt = entriesById.get(id)
            if (!opt) return null
            const isMatched = matched.includes(id)
            return (
              <button
                key={id}
                type="button"
                className={`choice flex w-full flex-col items-center rounded px-3 py-3 ${
                  isMatched ? 'choice-correct opacity-50' : selected === id ? 'choice-selected' : ''
                } ${wrongPair === id ? 'shake' : ''}`}
                onClick={() => tapLeft(id)}
              >
                {mode === 'pinyin' ? (
                  <Pinyin text={opt.pinyin} className="text-xl" />
                ) : (
                  <span className="font-hanzi text-2xl text-vault-100">{opt.hanzi}</span>
                )}
                {mode === 'both' && <Pinyin text={opt.pinyin} className="mt-0.5 text-xs text-vault-400" />}
                {isMatched && mode !== 'both' && (
                  <span className="mt-0.5 text-xs text-vault-300">
                    {mode === 'pinyin' ? opt.hanzi : <Pinyin text={opt.pinyin} />}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <div className="space-y-2">
          {right.map((id) => {
            const opt = entriesById.get(id)
            if (!opt) return null
            const isMatched = matched.includes(id)
            return (
              <button
                key={id}
                type="button"
                className={`choice w-full rounded px-3 py-3 text-base ${isMatched ? 'choice-correct opacity-40' : ''} ${
                  wrongPair === id ? 'choice-wrong shake' : ''
                }`}
                onClick={() => tapRight(id)}
              >
                {opt.es}
              </button>
            )
          })}
        </div>
      </div>
      <p className="text-sm text-vault-500">fallos: {errors}</p>
      {done && (
        <Feedback
          correct={errors === 0}
          onContinue={() => onResult(errors === 0, awardXp && errors === 0 ? 10 : 0)}
        >
          {errors > 0 && <p className="text-center text-sm text-vault-500">+0 XP · registrados {errors} fallo(s) — vuelve a intentarlo</p>}
        </Feedback>
      )}
    </div>
  )
}
