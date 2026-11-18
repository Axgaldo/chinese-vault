/* ─────────────────────────────────────────────────────────────────────────────
   Retos del refugio. Cada componente recibe un paso del contenido y reporta
   onResult(correcto, xp). Los distractores se generan en runtime para que
   repetir una lección nunca dé las mismas opciones.
   ───────────────────────────────────────────────────────────────────────────── */

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { entriesById, notesById } from '../content'
import { speakEntry, speakSentence } from '../lib/audio'
import { sfx } from '../lib/sfx'
import { optionsFor, shuffle } from '../lib/questions'
import { pinyinMatches, toneColor, toneLabel } from '../lib/pinyin'
import { useProgress } from '../stores/useProgress'
import { Pinyin } from './Pinyin'
import { Btn, Panel, Prompt, SpeakerBtn } from './ui'
import type { Step, VocabEntry } from '../types/content'

export interface ChallengeProps {
  step: Step
  /** false cuando es el reintento de un paso ya fallado (no da XP otra vez) */
  awardXp: boolean
  onResult: (correct: boolean, xp: number) => void
}

interface CoreProps {
  awardXp: boolean
  onResult: (correct: boolean, xp: number) => void
}

/** Props de un reto concreto: el paso llega ya acotado a su variante */
type CProps<T extends Step['type']> = CoreProps & { step: Extract<Step, { type: T }> }

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
    case 'build':
      return <BuildView step={step} {...rest} />
    case 'match':
      return <MatchView step={step} {...rest} />
  }
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
  return (
    <div className="pop-in mt-5">
      <p
        className={`font-display text-center text-2xl tracking-widest ${correct ? 'text-vault-400 glow' : 'text-vault-red'}`}
      >
        {correct ? '▓ ACCESO CONCEDIDO ▓' : '✗ ERROR DE PROTOCOLO'}
      </p>
      {children}
      <Btn className="mt-4 w-full" onClick={onContinue}>
        CONTINUAR ▸
      </Btn>
    </div>
  )
}

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

function IntroVocab({ step, onResult }: CProps<'intro'>) {
  const entry = entriesById.get(step.entry)
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
      <Btn className="mt-3 w-full" onClick={() => onResult(true, 0)}>
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
      <Panel solid className="p-4">
        <h3 className="font-display text-2xl text-vault-300 glow">{note.title}</h3>
        <div className="mt-2 space-y-2 text-base leading-relaxed">
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
    () => optionsFor(step.entry, completedKey ? completedKey.split(',') : []),
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
        <EntryHanzi entry={entry} className="text-7xl" />
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
  const showHanzi = useProgress((s) => s.settings.showHanzi)
  const completedKey = useCompletedKey()
  const options = useMemo(
    () => optionsFor(step.entry, completedKey ? completedKey.split(',') : []),
    [step.entry, completedKey],
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
              {showHanzi ? (
                <span className="font-hanzi text-3xl text-vault-100">{opt.hanzi}</span>
              ) : (
                <Pinyin text={opt.pinyin} className="text-2xl" />
              )}
              {answered && <Pinyin text={opt.pinyin} className="mt-1 text-xs text-vault-500" />}
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
  const showHanzi = useProgress((s) => s.settings.showHanzi)
  const completedKey = useCompletedKey()
  const options = useMemo(
    () => optionsFor(step.entry, completedKey ? completedKey.split(',') : []),
    [step.entry, completedKey],
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
              {showHanzi ? (
                <span className="font-hanzi text-3xl text-vault-100">{opt.hanzi}</span>
              ) : (
                <Pinyin text={opt.pinyin} className="text-2xl" />
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
      <p className="text-sm text-vault-500">sin tonos y sin mayúsculas — p. ej. «{plain.toLowerCase().normalize('NFD').replace(/[\u0300-\u030F]/g, '')}»</p>
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

/* ── Construir frase ──────────────────────────────────────────────────────── */

function BuildView({ step, awardXp, onResult }: CProps<'build'>) {
  const { sentence } = step
  const target = useMemo(() => sentence.hanzi.replace(/[。，？！、]/g, ''), [sentence])
  const bank = useMemo(() => shuffle(Array.from(target)), [target])
  const [placed, setPlaced] = useState<number[]>([])
  const [state, setState] = useState<'building' | 'ok' | 'ko'>('building')

  const answer = placed.map((i) => bank[i]).join('')
  const ready = answer.length === target.length

  const check = () => {
    if (!ready || state !== 'building') return
    if (answer === target) {
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
            className="chip px-2 py-1 font-hanzi text-2xl text-vault-200"
            onClick={() => state === 'building' && setPlaced(placed.slice(0, pos))}
            title="quitar pieza"
          >
            {bank[bankIdx]}
          </button>
        ))}
      </div>

      {state === 'building' && (
        <>
          <div className="flex flex-wrap justify-center gap-1">
            {bank.map((ch, i) => (
              <button
                key={i}
                type="button"
                disabled={placed.includes(i)}
                className={`choice rounded px-3 py-2 font-hanzi text-2xl text-vault-100 ${
                  placed.includes(i) ? 'opacity-20' : 'hover:border-vault-400'
                }`}
                onClick={() => setPlaced([...placed, i])}
              >
                {ch}
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
            <span className="font-hanzi text-xl text-vault-200">{target}</span>
            <Pinyin text={sentence.pinyin} className="block text-sm" />
            <span className="text-sm text-vault-500">{sentence.es}</span>
          </p>
        </Feedback>
      )}
    </div>
  )
}

/* ── Emparejar ────────────────────────────────────────────────────────────── */

function MatchView({ step, awardXp, onResult }: CProps<'match'>) {
  const ids = step.entries
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
      <Prompt>EMPAREJA HANZI ↔ SIGNIFICADO</Prompt>
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
                className={`choice w-full rounded px-3 py-3 font-hanzi text-2xl text-vault-100 ${
                  isMatched ? 'choice-correct opacity-40' : selected === id ? 'choice-selected' : ''
                } ${wrongPair === id ? 'shake' : ''}`}
                onClick={() => tapLeft(id)}
              >
                {opt.hanzi}
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
        <Feedback correct={errors === 0} onContinue={() => onResult(true, awardXp ? (errors === 0 ? 10 : 5) : 0)}>
          {errors > 0 && <p className="text-center text-sm text-vault-500">+5 XP · registrados {errors} fallo(s)</p>}
        </Feedback>
      )}
    </div>
  )
}
