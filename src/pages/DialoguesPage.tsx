/* ─────────────────────────────────────────────────────────────────────────────
   DIÁLOGOS DE LA RADIO 🎭 — conversaciones reales por temas.

   Flujo: retos por línea (la conversación NO se revela entera hasta el final;
   cada línea suena opcionalmente con su botón 🔊) → al completar, la
   conversación entera se revela y se puede escuchar seguida.
   5 tipos de reto por línea: qué oyes · quién lo dice · ordena la línea ·
   qué palabra falta · qué responde.
   ───────────────────────────────────────────────────────────────────────────── */

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DIALOGUES, dialoguesByTopic, unlockedDialogues } from '../lib/dialogues'
import { speakSentence, speakSentencesSequentially } from '../lib/audio'
import { sfx } from '../lib/sfx'
import { useProgress } from '../stores/useProgress'
import { Pinyin } from '../components/Pinyin'
import { Btn, Chip, Meter, Panel, Prompt, SectionTitle, SpeakerBtn } from '../components/ui'
import type { Dialogue, DialogueLine } from '../types/content'

const XP_LINE = 5

type Phase = 'list' | 'quiz' | 'done'
type QuizKind = 'meaning' | 'who' | 'order' | 'gap' | 'reply'

interface LineQuiz {
  lineIdx: number
  kind: QuizKind
  /** meaning: traducciones · reply: hanzi de posibles respuestas */
  options?: string[]
  gapPinyin?: string
  /** gap: qué aparición de la palabra se vacía (evita ambigüedad con repeticiones) */
  gapIdx?: number
  retry?: boolean
}

export function DialoguesPage() {
  const navigate = useNavigate()
  const completedKey = useProgress((s) => Object.keys(s.completed).join(','))
  const completed = useMemo(() => (completedKey ? completedKey.split(',') : []), [completedKey])
  const addXp = useProgress((s) => s.addXp)
  const logActivity = useProgress((s) => s.logActivity)

  const unlocked = useMemo(() => unlockedDialogues(completed), [completed])
  const byTopic = useMemo(() => dialoguesByTopic(unlocked), [unlocked])
  const lockedCount = DIALOGUES.length - unlocked.length

  const [phase, setPhase] = useState<Phase>('list')
  const [dialogue, setDialogue] = useState<Dialogue | null>(null)
  const [quiz, setQuiz] = useState<LineQuiz[]>([])
  const [pos, setPos] = useState(0)
  const [xp, setXp] = useState(0)

  const start = (d: Dialogue) => {
    sfx.tap()
    setDialogue(d)
    setQuiz(buildQuiz(d))
    setPos(0)
    setXp(0)
    setPhase('quiz')
  }

  const current = quiz[pos]

  const advance = (correct: boolean) => {
    if (!current) return
    if (correct) {
      if (!current.retry) {
        addXp(XP_LINE)
        setXp((x) => x + XP_LINE)
        logActivity('steps', 1)
      }
      if (pos + 1 >= quiz.length) {
        sfx.complete()
        setPhase('done')
        return
      }
    } else {
      setQuiz((q) => [...q, { ...current, retry: true }])
    }
    setPos(pos + 1)
  }

  /* ── Parrilla de diálogos ─────────────────────────────────────────────── */
  if (phase === 'list') {
    return (
      <div className="flex flex-col gap-4 p-4 pb-8">
        <Prompt className="pt-1">▓ DIÁLOGOS DEL REFUGIO ▓</Prompt>
        {!unlocked.length ? (
          <Panel className="p-5 text-center">
            <p className="text-sm text-vault-500">
              Los diálogos llegan al terminar sectores: cada conversación usa el vocabulario
              de un sector completo (cero sorpresas). Completa el Protocolo de Iniciación y
              el Primer Contacto para oír los primeros.
            </p>
          </Panel>
        ) : (
          <>
            {[...byTopic.entries()].map(([topic, list]) => (
              <div key={topic}>
                <SectionTitle>{topic.toUpperCase()}</SectionTitle>
                <div className="mt-2 space-y-2">
                  {list.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className="choice block w-full rounded p-3 text-left"
                      onClick={() => start(d)}
                    >
                      <p className="font-display text-lg text-vault-300">🎭 {d.title}</p>
                      <p className="text-xs text-vault-600">
                        {d.lines.length} líneas · solo vocabulario de sus sectores
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {lockedCount > 0 && (
              <p className="text-center text-xs text-vault-600">
                {lockedCount} diálogo(s) más llegan al completar sus sectores
              </p>
            )}
            <Btn variant="amber" className="w-full" onClick={() => navigate('/radio')}>
              ◂ A LA RADIO
            </Btn>
          </>
        )}
      </div>
    )
  }

  if (!dialogue) return null

  /* ── FINAL: la conversación se revela (recompensa) ────────────────────── */
  if (phase === 'done') {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-vault-800 bg-vault-950/95 px-3 py-2 backdrop-blur">
          <span className="font-display text-lg text-vault-500">🎭 {dialogue.title}</span>
        </header>
        <div className="flex flex-1 flex-col justify-center gap-3 p-4">
          <Prompt>▓ CONVERSACIÓN COMPLETADA ▓</Prompt>
          <Chip className="self-center text-xl">+{xp} XP</Chip>

          <Panel solid className="panel-read space-y-3 p-4">
            <p className="font-display text-lg text-vault-300">📜 LA CONVERSACIÓN ENTERA</p>
            {dialogue.lines.map((l, i) => (
              <button
                key={i}
                type="button"
                className={`block w-full rounded px-2 py-1.5 text-left hover:bg-vault-800/60 ${
                  l.who === 'B' ? 'text-right' : ''
                }`}
                onClick={() => speakSentence(l)}
                title="pulsa para escuchar la línea"
              >
                <span className={`font-display text-sm text-vault-500 ${l.who === 'B' ? 'block' : ''}`}>
                  {l.who === 'A' ? '🧑‍🚀 A' : '🧑‍🔧 B'}
                </span>
                <span className="block font-hanzi text-xl text-vault-100">{l.hanzi}</span>
                <Pinyin text={l.pinyin} className="block text-xs" />
                <span className="block text-xs text-vault-500">{l.es}</span>
              </button>
            ))}
          </Panel>

          <Btn onClick={() => void speakSentencesSequentially(dialogue.lines)}>🔊 ESCUCHAR TODO SEGUIDO</Btn>

          <div className="flex gap-2">
            <Btn className="flex-1" onClick={() => start(dialogue)}>
              OTRA VEZ ▸
            </Btn>
            <Btn variant="amber" className="flex-1" onClick={() => setPhase('list')}>
              MÁS DIÁLOGOS ▸
            </Btn>
          </div>
        </div>
      </div>
    )
  }

  /* ── Retos por línea ──────────────────────────────────────────────────── */
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-vault-800 bg-vault-950/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-vault-500">🎭 {dialogue.title}</span>
          <div className="flex-1">
            <Meter value={quiz.length ? pos / quiz.length : 0} />
          </div>
          <span className="font-display text-xl text-vault-300">+{xp} XP</span>
        </div>
      </header>
      <div className="flex flex-1 flex-col justify-center p-4">
        {current && (
          <DialogueQuiz
            key={pos}
            dialogue={dialogue}
            quiz={current}
            onResult={advance}
          />
        )}
      </div>
    </div>
  )
}

/* ── Generación de retos ────────────────────────────────────────────────── */

/** Hash estable de string */
function hash(str: string): number {
  let h = 0
  for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) | 0
  return Math.abs(h)
}

/** Puntuación fuera (para contar palabras de pinyin limpias) */
function stripPunctuation(s: string): string {
  return s.replace(/[!？?，,。.…·]/g, '')
}

/** Barajado estable de una lista */
function stableShuffle<T>(list: T[], seed: string): T[] {
  return list
    .map((x, i) => ({ x, k: hash(seed + i) % 997 }))
    .sort((a, b) => a.k - b.k)
    .map((y) => y.x)
}

function buildQuiz(d: Dialogue): LineQuiz[] {
  const out: LineQuiz[] = []
  d.lines.forEach((_l: DialogueLine, i: number) => {
    const roll = hash(d.id + ':' + i) % 5
    let kind: QuizKind
    if (roll === 0) kind = 'meaning'
    else if (roll === 1) kind = 'who'
    else if (roll === 2) kind = 'order'
    else if (roll === 3) kind = 'gap'
    else kind = 'reply'
    // ajustes de viabilidad
    if (kind === 'reply' && i === 0) kind = 'meaning'
    if (kind === 'order') {
      const chars = [...d.lines[i].hanzi.replace(/[。，？！、]/g, '')]
      if (chars.length < 2) kind = 'meaning'
    }
    if (kind === 'gap') {
      const linePinyin = stripPunctuation(d.lines[i].pinyin)
      const words = linePinyin.split(/\s+/).filter((w: string) => w.length >= 2)
      if (!words.length) kind = 'meaning'
      else {
        const wIdx = hash(d.id + 'gap' + i) % words.length
        const gapWord = words[wIdx]
        // qué aparición de la palabra se vacía (p. ej. "shì" dos veces en la línea)
        const occurrences = words.filter((w: string) => w === gapWord).length
        const gapOcc = hash(d.id + 'occ' + i) % occurrences
        out.push({ lineIdx: i, kind: 'gap', gapPinyin: gapWord, gapIdx: gapOcc })
        return
      }
    }
    if (kind === 'meaning') {
      const others = d.lines
        .filter((_x: DialogueLine, j: number) => j !== i)
        .map((x: DialogueLine) => x.es)
      const options = stableShuffle([d.lines[i].es, ...others.slice(0, 3)], d.id + i + 'm')
      out.push({ lineIdx: i, kind: 'meaning', options })
      return
    }
    if (kind === 'reply') {
      // la respuesta correcta es ESTA línea; distractores: hanzi de otras líneas
      const others = d.lines
        .filter((_x: DialogueLine, j: number) => j !== i)
        .map((x: DialogueLine) => x.hanzi)
      const options = stableShuffle([d.lines[i].hanzi, ...others.slice(0, 3)], d.id + i + 'r')
      out.push({ lineIdx: i, kind: 'reply', options })
      return
    }
    out.push({ lineIdx: i, kind })
  })
  return out
}

/* ── Reto individual ────────────────────────────────────────────────────── */

function DialogueQuiz({
  dialogue,
  quiz,
  onResult,
}: {
  dialogue: Dialogue
  quiz: LineQuiz
  onResult(correct: boolean): void
}) {
  const line = dialogue.lines[quiz.lineIdx]
  const [picked, setPicked] = useState<string | null>(null)
  const [gapValue, setGapValue] = useState('')
  const [state, setState] = useState<'typing' | 'ok' | 'ko'>('typing')
  const mode = useProgress((s) => s.settings.scriptMode)

  /** Los retes de OÍDO reproducen la línea al montar; el resto la dejan opcional */
  const isListening = quiz.kind === 'meaning' || quiz.kind === 'who'
  useEffect(() => {
    if (line && isListening) {
      const t = setTimeout(() => speakSentence(line), 400)
      return () => clearTimeout(t)
    }
  }, [line, isListening])

  if (!line) return null

  const lineBadge = (
    <p className="text-center text-xs text-vault-600">
      línea {quiz.lineIdx + 1} de {dialogue.lines.length}
      {quiz.retry ? ' · reintento (sin XP)' : ''}
    </p>
  )

  const optionalAudio = (
    <SpeakerBtn onClick={() => speakSentence(line)} label="escuchar la línea" />
  )

  /** Revelado de la línea + CONTINUAR con el veredicto correcto */
  const feedback = (correct: boolean) => (
    <>
      <p className="text-center">
        <span className="font-hanzi text-xl text-vault-200">{line.hanzi}</span>
        <Pinyin text={line.pinyin} className="block text-sm" />
        <span className="block text-xs text-vault-500">— {line.es}</span>
      </p>
      <Btn className="w-full" onClick={() => onResult(correct)}>
        CONTINUAR ▸
      </Btn>
    </>
  )

  /* ¿Qué oyes? — solo audio, elegir traducción */
  if (quiz.kind === 'meaning') {
    const answered = picked !== null
    const correct = picked === line.es
    return (
      <div className="flex flex-col items-center gap-4">
        <Prompt>¿QUÉ OYES?</Prompt>
        <SpeakerBtn big onClick={() => speakSentence(line)} />
        {lineBadge}
        <div className={`grid w-full gap-2 ${answered ? (correct ? 'flash-correct' : 'shake flash-wrong') : ''}`}>
          {(quiz.options ?? []).map((opt, i) => {
            const cls = answered && opt === line.es ? 'choice-correct' : picked === opt ? 'choice-wrong' : ''
            return (
              <button
                key={i}
                type="button"
                disabled={answered}
                className={`choice rounded px-4 py-3 text-center text-base ${cls}`}
                onClick={() => {
                  setPicked(opt)
                  if (opt === line.es) sfx.correct()
                  else sfx.wrong()
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {answered && (
          <>
            <p className={`font-display text-xl ${correct ? 'text-vault-400 glow' : 'text-vault-red'}`}>
              {correct ? '▓ ACCESO CONCEDIDO ▓' : '✗ ERROR DE PROTOCOLO'}
            </p>
            {feedback(correct)}
          </>
        )}
      </div>
    )
  }

  /* ¿Quién lo dice? — oír y elegir hablante */
  if (quiz.kind === 'who') {
    const answered = picked !== null
    const correct = picked === line.who
    return (
      <div className="flex flex-col items-center gap-4">
        <Prompt>¿QUIÉN LO DICE?</Prompt>
        <SpeakerBtn big onClick={() => speakSentence(line)} />
        {lineBadge}
        <div className={`grid w-full grid-cols-2 gap-2 ${answered ? (correct ? 'flash-correct' : 'shake flash-wrong') : ''}`}>
          {(['A', 'B'] as const).map((w) => {
            const cls = answered && w === line.who ? 'choice-correct' : picked === w ? 'choice-wrong' : ''
            return (
              <button
                key={w}
                type="button"
                disabled={answered}
                className={`choice flex flex-col items-center rounded px-3 py-4 ${cls}`}
                onClick={() => {
                  setPicked(w)
                  if (w === line.who) sfx.correct()
                  else sfx.wrong()
                }}
              >
                <span className="text-3xl">{w === 'A' ? '🧑‍🚀' : '🧑‍🔧'}</span>
                <span className="font-display text-lg">{w}</span>
              </button>
            )
          })}
        </div>
        {answered && (
          <>
            <p className={`font-display text-xl ${correct ? 'text-vault-400 glow' : 'text-vault-red'}`}>
              {correct ? '▓ ACCESO CONCEDIDO ▓' : '✗ ERROR DE PROTOCOLO'}
            </p>
            {feedback(correct)}
          </>
        )}
      </div>
    )
  }

  /* Ordena la línea — fichas hanzi */
  if (quiz.kind === 'order') {
    return <OrderQuiz line={line} quiz={quiz} onResult={onResult} />
  }

  /* ¿Qué palabra falta? — pinyin con hueco (SOLO kind gap) */
  if (quiz.kind === 'gap') {
    const gapPinyin = quiz.gapPinyin ?? ''
    const plain = gapPinyin.toLowerCase().normalize('NFD').replace(/[\u0300-\u030F]/g, '')
    // vaciar la aparición gapIdx de la palabra (no siempre la primera)
    const blanked = (() => {
      let seen = -1
      return line.pinyin.replace(gapPinyin, () => {
        seen++
        return seen === (quiz.gapIdx ?? 0) ? '＿＿' : gapPinyin
      })
    })()
    const submit = () => {
      if (!gapValue.trim() || state !== 'typing') return
      const norm = (s: string) =>
        s.toLowerCase().normalize('NFD').replace(/[\u0300-\u030F]/g, '').replace(/[^a-z0-9]/g, '')
      if (norm(gapValue) === norm(gapPinyin)) {
        setState('ok')
        sfx.correct()
      } else {
        setState('ko')
        sfx.wrong()
      }
    }
    return (
      <div className="flex flex-col items-center gap-4">
        <Prompt>¿QUÉ PALABRA FALTA?</Prompt>
        {optionalAudio}
        {lineBadge}
        <Panel className="w-full p-3 text-center">
          <Pinyin text={blanked} className="text-xl" />
          <span className="mt-1 block text-sm text-vault-500">{line.es}</span>
        </Panel>
        <form
          className={`w-full space-y-3 ${state === 'ok' ? 'flash-correct' : state === 'ko' ? 'shake flash-wrong' : ''}`}
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <input
            value={gapValue}
            onChange={(e) => setGapValue(e.target.value)}
            disabled={state !== 'typing'}
            className="choice choice-selected w-full rounded px-4 py-3 text-center text-2xl text-vault-100 outline-none"
            placeholder="pinyin de la palabra…"
            autoComplete="off"
            spellCheck={false}
            inputMode="text"
          />
          {state === 'typing' && (
            <Btn type="submit" className="w-full" disabled={!gapValue.trim()}>
              COMPROBAR ▸
            </Btn>
          )}
        </form>
        {state !== 'typing' && (
          <>
            <p className="text-center text-sm text-vault-500">
              {state === 'ok' ? '¡exacto!' : `era: ${gapPinyin} (vale sin tonos: ${plain})`}
            </p>
            {feedback(state === 'ok')}
          </>
        )}
      </div>
    )
  }

  /* ¿Qué responde? — contexto + elegir respuesta (respeta scriptMode) */
  const answered = picked !== null
  const correct = picked === line.hanzi
  const prev = dialogue.lines[quiz.lineIdx - 1]
  /** Hanzi de opción → su línea (para pinyin en modo pinyin) */
  const lineByHanzi = (h: string) => dialogue.lines.find((l) => l.hanzi === h)
  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>¿QUÉ RESPONDE?</Prompt>
      <Panel className="w-full p-3 text-center">
        <span className="font-display text-sm text-vault-500">
          {prev.who === 'A' ? '🧑‍🚀 A' : '🧑‍🔧 B'} dice:
        </span>
        <span className="mt-1 block font-hanzi text-xl text-vault-100">{prev.hanzi}</span>
        <span className="block text-xs text-vault-500">— {prev.es}</span>
        <button
          type="button"
          className="mt-2 font-display text-sm text-vault-400 underline"
          onClick={() => speakSentence(prev)}
        >
          🔊 escuchar
        </button>
      </Panel>
      {lineBadge}
      <div className={`grid w-full gap-2 ${answered ? (correct ? 'flash-correct' : 'shake flash-wrong') : ''}`}>
        {(quiz.options ?? []).map((opt, i) => {
          const cls = answered && opt === line.hanzi ? 'choice-correct' : picked === opt ? 'choice-wrong' : ''
          const optLine = lineByHanzi(opt)
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              className={`choice rounded px-4 py-3 text-center ${cls}`}
              onClick={() => {
                setPicked(opt)
                if (opt === line.hanzi) sfx.correct()
                else sfx.wrong()
              }}
            >
              {mode === 'pinyin' && optLine ? (
                <Pinyin text={optLine.pinyin} className="text-xl text-vault-100" />
              ) : (
                <>
                  <span className="block font-hanzi text-xl text-vault-100">{opt}</span>
                  {mode === 'both' && optLine && (
                    <Pinyin text={optLine.pinyin} className="mt-0.5 block text-xs text-vault-400" />
                  )}
                </>
              )}
            </button>
          )
        })}
      </div>
      {answered && (
        <>
          <p className={`font-display text-xl ${correct ? 'text-vault-400 glow' : 'text-vault-red'}`}>
            {correct ? '▓ ACCESO CONCEDIDO ▓' : '✗ ERROR DE PROTOCOLO'}
          </p>
          {feedback(correct)}
        </>
      )}
    </div>
  )
}

/* Ordenar la línea (fichas por carácter, respeta scriptMode) */
function OrderQuiz({
  line,
  quiz,
  onResult,
}: {
  line: DialogueLine
  quiz: LineQuiz
  onResult(correct: boolean): void
}) {
  const mode = useProgress((s) => s.settings.scriptMode)
  const chars = useMemo(() => [...line.hanzi.replace(/[。，？！、]/g, '')], [line])
  /** sílabas alineadas 1:1 con los caracteres (el test de integridad lo garantiza) */
  const sylls = useMemo(() => {
    const clean = line.pinyin.replace(/[!？?，,。.…·]/g, '')
    const s = clean.split(/\s+/)
    return s.length === chars.length ? s : null
  }, [line, chars])
  const [order] = useState<number[]>(() => stableShuffle(chars.map((_, i) => i), line.hanzi + 'o'))
  const [placed, setPlaced] = useState<number[]>([])
  const [state, setState] = useState<'typing' | 'ok' | 'ko'>('typing')

  const answer = placed.map((i) => chars[i]).join('')
  const ready = answer.length === chars.length

  /** ficha del carácter i según el modo de escritura */
  const chip = (i: number) => {
    const ch = chars[i]
    const syl = sylls ? sylls[i] : null
    if (mode === 'pinyin' && syl) return <Pinyin text={syl} className="text-xl text-vault-200" />
    return (
      <span className="flex flex-col items-center leading-none">
        <span className="font-hanzi text-2xl text-vault-100">{ch}</span>
        {mode === 'both' && syl && (
          <span className="text-[10px] text-vault-500">
            {syl.toLowerCase().normalize('NFD').replace(/[\u0300-\u030F]/g, '')}
          </span>
        )}
      </span>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>ORDENA LA LÍNEA</Prompt>
      <SpeakerBtn onClick={() => speakSentence(line)} label="escuchar la línea" />
      <p className="text-center text-xs text-vault-600">
        línea {quiz.lineIdx + 1} · {quiz.retry ? 'reintento (sin XP)' : ''}
      </p>
      <p className="text-center text-sm text-vault-500">{line.es}</p>

      <div
        className={`meter flex min-h-14 w-full flex-wrap items-center justify-center gap-1 p-2 ${
          state === 'ok' ? 'flash-correct' : state === 'ko' ? 'shake flash-wrong' : ''
        }`}
      >
        {placed.length === 0 && <span className="text-sm text-vault-600">toca en orden…</span>}
        {placed.map((charIdx, pos) => (
          <button
            key={pos}
            type="button"
            className="chip px-2 py-1"
            onClick={() => state === 'typing' && setPlaced(placed.slice(0, pos))}
            title="quitar"
          >
            {chip(charIdx)}
          </button>
        ))}
      </div>

      {state === 'typing' && (
        <>
          <div className="flex flex-wrap justify-center gap-1">
            {order.map((charIdx, pos) => (
              <button
                key={pos}
                type="button"
                disabled={placed.includes(charIdx)}
                className={`choice rounded px-3 py-2 ${placed.includes(charIdx) ? 'opacity-20' : 'hover:border-vault-400'}`}
                onClick={() => setPlaced([...placed, charIdx])}
              >
                {chip(charIdx)}
              </button>
            ))}
          </div>
          <div className="flex w-full gap-2">
            <Btn variant="amber" className="flex-1" onClick={() => setPlaced(placed.slice(0, -1))} disabled={!placed.length}>
              ⟲ UNDO
            </Btn>
            <Btn
              className="flex-1"
              disabled={!ready}
              onClick={() => {
                if (answer === chars.join('')) {
                  setState('ok')
                  sfx.correct()
                } else {
                  setState('ko')
                  sfx.wrong()
                }
              }}
            >
              COMPROBAR ▸
            </Btn>
          </div>
        </>
      )}

      {state !== 'typing' && (
        <>
          <p className="text-center">
            <span className="font-hanzi text-xl text-vault-200">{line.hanzi}</span>
            <Pinyin text={line.pinyin} className="block text-sm" />
          </p>
          <Btn className="w-full" onClick={() => onResult(state === 'ok')}>
            CONTINUAR ▸
          </Btn>
        </>
      )}
    </div>
  )
}
