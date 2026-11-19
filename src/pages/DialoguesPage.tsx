/* ─────────────────────────────────────────────────────────────────────────────
   DIÁLOGOS DE LA RADIO 🎭 — conversaciones reales por temas.
   Flujo: se escucha/lee el diálogo → retos por línea (qué significa /
   ordenar la frase / palabra que falta) → resumen con XP.
   ───────────────────────────────────────────────────────────────────────────── */

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Dialogue, DialogueLine } from '../types/content'
import { DIALOGUES, dialoguesByTopic, unlockedDialogues } from '../lib/dialogues'
import { speakSentence } from '../lib/audio'
import { sfx } from '../lib/sfx'
import { useProgress } from '../stores/useProgress'
import { Pinyin } from '../components/Pinyin'
import { Btn, CapsIcon, Chip, Meter, Panel, Prompt, SectionTitle, SpeakerBtn } from '../components/ui'

const XP_LINE = 5

type Phase = 'list' | 'listen' | 'quiz' | 'done'

/** Reto generado para una línea del diálogo */
interface LineQuiz {
  lineIdx: number
  kind: 'meaning' | 'order' | 'gap'
  /** opciones para meaning / la palabra oculta para gap */
  options?: string[]
  gapHanzi?: string
  gapPinyin?: string
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
  const [firstTry, setFirstTry] = useState(true)
  const [xp, setXp] = useState(0)

  const start = (d: Dialogue) => {
    sfx.tap()
    setDialogue(d)
    setQuiz(buildQuiz(d))
    setPos(0)
    setFirstTry(true)
    setXp(0)
    setPhase('listen')
  }

  const current = quiz[pos]

  const advance = (correct: boolean) => {
    if (!current) return
    if (correct) {
      if (firstTry) {
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
      setFirstTry(false)
      setQuiz((q) => [...q, current])
    }
    setFirstTry(true)
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

  /* ── Escuchar el diálogo ──────────────────────────────────────────────── */
  if (phase === 'listen') {
    return (
      <div className="flex min-h-dvh flex-col">
        <header className="sticky top-0 z-10 border-b border-vault-800 bg-vault-950/95 px-3 py-2 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg text-vault-500">🎭 {dialogue.title}</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col justify-center gap-3 p-4">
          <Prompt>ESCUCHA LA CONVERSACIÓN</Prompt>
          <Panel solid className="panel-read space-y-3 p-4">
            {dialogue.lines.map((l, i) => (
              <button
                key={i}
                type="button"
                className={`block w-full rounded px-2 py-1.5 text-left hover:bg-vault-800/60 ${
                  l.who === 'A' ? 'self-start' : 'self-end text-right'
                }`}
                onClick={() => speakSentence(l)}
                title="pulsa para escuchar la línea"
              >
                <span className={`font-display text-sm text-vault-500 ${l.who === 'B' ? 'block text-right' : ''}`}>
                  {l.who === 'A' ? '🧑‍🚀 A' : '🧑‍🔧 B'}
                </span>
                <span className="block font-hanzi text-xl text-vault-100">{l.hanzi}</span>
                <Pinyin text={l.pinyin} className="block text-xs" />
                <span className="block text-xs text-vault-500">{l.es}</span>
              </button>
            ))}
          </Panel>
          <div className="flex gap-2">
            <Btn
              variant="amber"
              className="flex-1"
              onClick={() => dialogue.lines.forEach((l) => speakSentence(l))}
            >
              🔊 TODO
            </Btn>
            <Btn
              className="flex-1"
              onClick={() => {
                sfx.tap()
                setPhase('quiz')
              }}
            >
              A LOS RETOS ▸
            </Btn>
          </div>
        </div>
      </div>
    )
  }

  /* ── Resumen ──────────────────────────────────────────────────────────── */
  if (phase === 'done') {
    return (
      <div className="pop-in flex flex-col items-center gap-4 p-4 pt-10 text-center">
        <Prompt>▓ CONVERSACIÓN COMPLETADA ▓</Prompt>
        <p className="font-display text-5xl text-vault-amber glow">🎭</p>
        <Chip className="text-xl">+{xp} XP</Chip>
        <Panel className="w-full p-3">
          <p className="font-display text-xl text-vault-300">{dialogue.title}</p>
          <p className="text-xs text-vault-600">{dialogue.topic} · {dialogue.lines.length} líneas dominadas</p>
        </Panel>
        <div className="flex w-full gap-2">
          <Btn className="flex-1" onClick={() => start(dialogue)}>
            OTRA VEZ ▸
          </Btn>
          <Btn variant="amber" className="flex-1" onClick={() => setPhase('list')}>
            MÁS DIÁLOGOS ▸
          </Btn>
        </div>
      </div>
    )
  }

  /* ── Retos por línea ──────────────────────────────────────────────────── */
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-vault-800 bg-vault-950/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-vault-500">🎭 {dialogue.title}</span>
          <div className="flex-1">
            <Meter value={quiz.length ? pos / quiz.length : 0} />
          </div>
          <span className="flex items-center gap-1 font-display text-xl text-vault-300">
            <CapsIcon /> +{xp}
          </span>
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

function buildQuiz(d: Dialogue): LineQuiz[] {
  const out: LineQuiz[] = []
  d.lines.forEach((l: DialogueLine, i: number) => {
    const kindRoll = hash(d.id + i) % 3
    if (kindRoll === 0) {
      // ¿qué significa? — opciones: traducciones de otras líneas + la correcta
      const others = d.lines.filter((_x: DialogueLine, j: number) => j !== i).map((x: DialogueLine) => x.es)
      const distract = others.slice(0, 3)
      const options = [l.es, ...distract]
      // barajar de forma estable
      const ordered = options.map((o: string) => ({ o, k: hash(d.id + i + o) % 97 }))
      ordered.sort((a, b) => a.k - b.k)
      out.push({ lineIdx: i, kind: 'meaning', options: ordered.map((x: { o: string }) => x.o) })
    } else if (kindRoll === 1) {
      out.push({ lineIdx: i, kind: 'order' })
    } else {
      // palabra que falta: el "hueco" — usa una palabra de 2+ sílabas de la línea
      const words = l.pinyin.split(/\s+/).filter((w: string) => w.length >= 2)
      if (words.length >= 1) {
        const wIdx = hash(d.id + 'gap' + i) % words.length
        out.push({ lineIdx: i, kind: 'gap', gapPinyin: words[wIdx] })
      } else {
        out.push({ lineIdx: i, kind: 'meaning', options: [l.es, ...d.lines.slice(0, 3).map((x: DialogueLine) => x.es)] })
      }
    }
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

  if (!line) return null

  const lineContext = (
    <div className="w-full space-y-1 text-center">
      <SpeakerBtn onClick={() => speakSentence(line)} label="escuchar la línea" />
      <p className="text-xs text-vault-600">
        {line.who === 'A' ? '🧑‍🚀 A' : '🧑‍🔧 B'} · línea {quiz.lineIdx + 1} de {dialogue.lines.length}
      </p>
    </div>
  )

  /* ¿Qué significa esta línea? */
  if (quiz.kind === 'meaning') {
    const answered = picked !== null
    const correct = picked === line.es
    return (
      <div className="flex flex-col items-center gap-4">
        <Prompt>¿QUÉ SIGNIFICA ESTA LÍNEA?</Prompt>
        {lineContext}
        <Panel className="w-full p-3 text-center">
          <span className="font-hanzi text-2xl text-vault-100">{line.hanzi}</span>
          <Pinyin text={line.pinyin} className="block text-sm" />
        </Panel>
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
        {answered && <Btn className="w-full" onClick={() => onResult(correct)}>CONTINUAR ▸</Btn>}
      </div>
    )
  }

  /* Ordena la frase */
  if (quiz.kind === 'order') {
    return <OrderQuiz key={quiz.lineIdx} line={line} onResult={onResult} />
  }

  /* Palabra que falta */
  const gapPinyin = quiz.gapPinyin ?? ''
  const plain = gapPinyin.toLowerCase().normalize('NFD').replace(/[\u0300-\u030F]/g, '')
  const submit = () => {
    if (!gapValue.trim() || state !== 'typing') return
    const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u030F]/g, '').replace(/[^a-z0-9]/g, '')
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
      {lineContext}
      <Panel className="w-full p-3 text-center">
        <Pinyin text={line.pinyin.replace(gapPinyin, '＿＿')} className="text-xl" />
        <span className="mt-1 block font-hanzi text-lg text-vault-500">{line.es}</span>
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
          <Btn className="w-full" onClick={() => onResult(state === 'ok')}>
            CONTINUAR ▸
          </Btn>
        </>
      )}
    </div>
  )
}

/* Ordenar la línea (fichas por carácter, mismo motor que las lecciones) */
function OrderQuiz({
  line,
  onResult,
}: {
  line: DialogueLine
  onResult(correct: boolean): void
}) {
  const chars = useMemo(() => [...line.hanzi.replace(/[。，？！、]/g, '')], [line])
  const [order] = useState<number[]>(() => {
    const idx = chars.map((_, i) => i)
    // barajar estable por línea
    const keyed = idx.map((i) => ({ i, k: hash(line.hanzi + i) % 997 }))
    keyed.sort((a, b) => a.k - b.k)
    return keyed.map((x) => x.i)
  })
  const [placed, setPlaced] = useState<number[]>([])
  const [state, setState] = useState<'typing' | 'ok' | 'ko'>('typing')

  const answer = placed.map((i) => chars[i]).join('')
  const ready = answer.length === chars.length

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>ORDENA LA LÍNEA</Prompt>
      <Panel className="w-full p-2 text-center">
        <SpeakerBtn onClick={() => speakSentence(line)} label="escuchar la línea" />
      </Panel>
      <p className="text-sm text-vault-500">{line.es}</p>

      <div className={`meter flex min-h-14 w-full flex-wrap items-center justify-center gap-1 p-2 ${
        state === 'ok' ? 'flash-correct' : state === 'ko' ? 'shake flash-wrong' : ''
      }`}>
        {placed.length === 0 && <span className="text-sm text-vault-600">toca en orden…</span>}
        {placed.map((charIdx, pos) => (
          <button
            key={pos}
            type="button"
            className="chip px-2 py-1 font-hanzi text-2xl text-vault-200"
            onClick={() => state === 'typing' && setPlaced(placed.slice(0, pos))}
            title="quitar"
          >
            {chars[charIdx]}
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
                className={`choice rounded px-3 py-2 font-hanzi text-2xl text-vault-100 ${
                  placed.includes(charIdx) ? 'opacity-20' : 'hover:border-vault-400'
                }`}
                onClick={() => setPlaced([...placed, charIdx])}
              >
                {chars[charIdx]}
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
