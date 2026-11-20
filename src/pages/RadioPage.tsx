/* ─────────────────────────────────────────────────────────────────────────────
   RADIO DEL REFUGIO 📻 — escucha pura: frases completas y tonos.
   Solo emite contenido de lecciones ya completadas.
   ───────────────────────────────────────────────────────────────────────────── */

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { modules } from '../content'
import { speakSentence, speakHanzi } from '../lib/audio'
import { unlockedDialogues } from '../lib/dialogues'
import { sentenceAudioId } from '../lib/audio'
import {
  buildRadioSession,
  buildToneSession,
  tonePool,
  unlockedSentences,
  type RadioItem,
  type RadioSentence,
} from '../lib/radio'
import { pinyinMatches, toneColor, toneLabel } from '../lib/pinyin'
import { sfx } from '../lib/sfx'
import { useProgress } from '../stores/useProgress'
import { Pinyin } from '../components/Pinyin'
import { Btn, Chip, Meter, Panel, Prompt, SectionTitle, SpeakerBtn } from '../components/ui'
import type { Sentence } from '../types/content'

const XP_RADIO = 5

type Phase = 'programs' | 'session' | 'done'

export function RadioPage() {
  const navigate = useNavigate()
  const completedKey = useProgress((s) => Object.keys(s.completed).join(','))
  const completed = useMemo(() => (completedKey ? completedKey.split(',') : []), [completedKey])
  const addXp = useProgress((s) => s.addXp)
  const logActivity = useProgress((s) => s.logActivity)

  const sentences = useMemo(() => unlockedSentences(completed), [completed])
  const toneEntries = useMemo(() => tonePool(completed), [completed])
  const dialoguesReady = useMemo(() => unlockedDialogues(completed).length, [completed])

  const [phase, setPhase] = useState<Phase>('programs')
  const [title, setTitle] = useState('')
  const [items, setItems] = useState<RadioItem[]>([])
  const [pos, setPos] = useState(0)
  const [xp, setXp] = useState(0)

  const startProgram = (moduleId: string) => {
    const pool = moduleId ? sentences.filter((s) => s.moduleId === moduleId) : sentences
    if (!pool.length) return
    const mod = modules.find((m) => m.id === moduleId)
    sfx.tap()
    setItems(buildRadioSession(pool, 8))
    setTitle(mod ? `BOLETÍN · ${mod.code}` : 'BOLETÍN DEL REFUGIO')
    setPos(0)
    setXp(0)
    setPhase('session')
  }

  const startTones = () => {
    if (!toneEntries.length) return
    sfx.tap()
    setItems(buildToneSession(toneEntries, 8))
    setTitle('TONOS & MÚSICA')
    setPos(0)
    setXp(0)
    setPhase('session')
  }

  /** Programas por sector con frases disponibles */
  const programs = useMemo(() => {
    const byModule = new Map<string, { code: string; list: RadioSentence[] }>()
    for (const s of sentences) {
      const key = s.moduleId || 'otros'
      if (!byModule.has(key)) byModule.set(key, { code: s.code, list: [] })
      byModule.get(key)!.list.push(s)
    }
    return [...byModule.entries()].map(([id, { code, list }]) => ({
      id,
      code,
      name: modules.find((m) => m.id === id)?.title ?? 'Varios',
      count: list.length,
    }))
  }, [sentences])

  /* ── Programas ──────────────────────────────────────────────────────────── */
  if (phase === 'programs') {
    return (
      <div className="flex flex-col gap-4 p-4 pb-8">
        <Prompt className="pt-1">▓ RADIO DEL REFUGIO ▓</Prompt>
        {!sentences.length ? (
          <Panel className="p-5 text-center">
            <p className="text-sm text-vault-500">
              La radio aún no tiene señal: completa lecciones y sus frases se emitirán aquí.
            </p>
          </Panel>
        ) : (
          <>
            <Panel className="p-4">
              <p className="font-display text-xl text-vault-300">📻 EMISIÓN CONTINUA</p>
              <p className="mt-1 text-sm text-vault-500">
                escucha pura, sin texto delante: {sentences.length} frases y {toneEntries.length}{' '}
                palabras en la parrilla
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn onClick={() => startProgram('')}>
                  TODAS LAS FRASES ▸
                </Btn>
                <Btn variant="amber" onClick={startTones}>
                  🎼 TONOS & MÚSICA ▸
                </Btn>
                <Btn onClick={() => navigate('/radio/dialogues')} disabled={dialoguesReady === 0}>
                  🎭 DIÁLOGOS ({dialoguesReady}) ▸
                </Btn>
              </div>
            </Panel>

            {programs.length > 1 && (
              <>
                <SectionTitle>PROGRAMAS POR SECTOR</SectionTitle>
                <div className="grid grid-cols-2 gap-2">
                  {programs.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="choice rounded p-3 text-left"
                      onClick={() => startProgram(p.id)}
                    >
                      <span className="font-display text-lg text-vault-400">{p.code}</span>
                      <p className="truncate text-sm text-vault-300">{p.name}</p>
                      <p className="text-xs text-vault-600">{p.count} frases en emisión</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    )
  }

  /* ── Resumen ────────────────────────────────────────────────────────────── */
  if (phase === 'done') {
    return (
      <div className="pop-in flex flex-col items-center gap-4 p-4 pt-10 text-center">
        <Prompt>▓ FIN DE LA EMISIÓN ▓</Prompt>
        <p className="font-display text-5xl text-vault-amber glow">📻</p>
        <Chip className="text-xl">+{xp} XP</Chip>
        <Panel className="w-full p-4">
          <p className="text-sm text-vault-500">{items.length} intervenciones de la radio escuchadas</p>
        </Panel>
        <div className="flex w-full gap-2">
          <Btn className="flex-1" onClick={() => setPhase('programs')}>
            OTRO PROGRAMA ▸
          </Btn>
          <Btn variant="amber" className="flex-1" onClick={() => navigate('/')}>
            AL MAPA
          </Btn>
        </div>
      </div>
    )
  }

  /* ── Sesión ─────────────────────────────────────────────────────────────── */
  const current = items[pos]
  const advance = (correct: boolean) => {
    if (!current) return
    if (correct) {
      // XP solo en el primer intento del item (los reintentos llevan retry)
      if (!current.retry) {
        addXp(XP_RADIO)
        setXp((x) => x + XP_RADIO)
        logActivity('steps', 1)
      }
      if (pos + 1 >= items.length) {
        sfx.complete()
        setPhase('done')
        return
      }
    } else {
      // reintento al final, sin XP
      setItems((q) => [...q, { ...current, retry: true }])
    }
    setPos(pos + 1)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-vault-800 bg-vault-950/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-vault-500">{title}</span>
          <div className="flex-1">
            <Meter value={items.length ? pos / items.length : 0} />
          </div>
          <span className="font-display text-xl text-vault-300">+{xp} XP</span>
        </div>
      </header>
      <div className="flex flex-1 flex-col justify-center p-4">
        {current && <RadioChallenge key={pos} item={current} onResult={advance} />}
      </div>
    </div>
  )
}

/* ── Retos de la radio ────────────────────────────────────────────────────── */

function RadioChallenge({ item, onResult }: { item: RadioItem; onResult(correct: boolean): void }) {
  if (item.kind === 'tone') return <RadioTone item={item} onResult={onResult} />
  if (item.kind === 'dictate') return <RadioDictate item={item} onResult={onResult} />
  return <RadioMeaning item={item} onResult={onResult} />
}

/** Suena una frase → elegir qué significa */
function RadioMeaning({ item, onResult }: { item: Extract<RadioItem, { kind: 'meaning' }>; onResult(correct: boolean): void }) {
  const [picked, setPicked] = useState<string | null>(null)
  const sentence = item.sentence
  const target = sentence.es
  const answered = picked !== null
  const correct = picked === target

  // auto-reproducción al montar
  useEffect(() => {
    const t = setTimeout(() => speakSentence(sentence), 400)
    return () => clearTimeout(t)
  }, [sentence])

  // keys por id de audio (el texto español puede repetirse entre frases →
  // dos botones marcados a la vez / keys React duplicadas)
  const optId = (s: Sentence) => sentenceAudioId(s)

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>¿QUÉ OYES?</Prompt>
      <SpeakerBtn big onClick={() => speakSentence(sentence)} />
      <div className={`grid w-full gap-2 ${answered ? (correct ? 'flash-correct' : 'shake flash-wrong') : ''}`}>
        {item.options.map((opt) => {
          const cls = answered && optId(opt) === optId(sentence) ? 'choice-correct' : picked === optId(opt) ? 'choice-wrong' : ''
          return (
            <button
              key={optId(opt)}
              type="button"
              disabled={answered}
              className={`choice rounded px-4 py-3 text-center text-base ${cls}`}
              onClick={() => {
                setPicked(optId(opt))
                if (optId(opt) === optId(sentence)) sfx.correct()
                else sfx.wrong()
              }}
            >
              {opt.es}
            </button>
          )
        })}
      </div>
      {answered && (
        <Btn className="w-full" onClick={() => onResult(correct)}>
          CONTINUAR ▸
        </Btn>
      )}
    </div>
  )
}

/** Suena una frase → escribir el pinyin completo */
function RadioDictate({ item, onResult }: { item: Extract<RadioItem, { kind: 'dictate' }>; onResult(correct: boolean): void }) {
  const [value, setValue] = useState('')
  const [state, setState] = useState<'typing' | 'ok' | 'ko'>('typing')
  const sentence = item.sentence

  useEffect(() => {
    const t = setTimeout(() => speakSentence(sentence), 400)
    return () => clearTimeout(t)
  }, [sentence])

  const submit = () => {
    if (!value.trim() || state !== 'typing') return
    if (pinyinMatches(value, sentence.pinyin)) {
      setState('ok')
      sfx.correct()
    } else {
      setState('ko')
      sfx.wrong()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>TRANSCRIPCIÓN DE LA EMISIÓN</Prompt>
      <p className="text-sm text-vault-500">escribe el pinyin de la frase que oyes (sin tonos)</p>
      <SpeakerBtn big onClick={() => speakSentence(sentence)} />
      <form
        className={`w-full space-y-3 ${state === 'ok' ? 'flash-correct' : state === 'ko' ? 'shake flash-wrong' : ''}`}
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={state !== 'typing'}
          className="choice choice-selected w-full rounded px-4 py-3 text-center text-vault-100 outline-none"
          placeholder="pinyin de la frase…"
          autoComplete="off"
          spellCheck={false}
          inputMode="text"
          aria-label="escribe la frase completa en pinyin, sin tonos"
        />
        {state === 'typing' && (
          <Btn type="submit" className="w-full" disabled={!value.trim()}>
            COMPROBAR ▸
          </Btn>
        )}
      </form>
      {state !== 'typing' && (
        <>
          <p className="text-center">
            <span className="font-hanzi text-xl text-vault-200">{sentence.hanzi}</span>
            <Pinyin text={sentence.pinyin} className="block text-sm" />
            <span className="block text-xs text-vault-500">— {sentence.es}</span>
          </p>
          <Btn className="w-full" onClick={() => onResult(state === 'ok')}>
            CONTINUAR ▸
          </Btn>
        </>
      )}
    </div>
  )
}

/** Entrenador de tonos de la radio */
function RadioTone({ item, onResult }: { item: Extract<RadioItem, { kind: 'tone' }>; onResult(correct: boolean): void }) {
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  const correct = picked === item.tone

  // suena SOLO la sílaba (su carácter), no la palabra entera
  const play = () => speakHanzi(item.char ?? item.entry.hanzi)

  useEffect(() => {
    const t = setTimeout(play, 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.char, item.entry.id])

  return (
    <div className="flex flex-col items-center gap-4">
      <Prompt>IDENTIFICA EL TONO</Prompt>
      <SpeakerBtn big onClick={play} />
      <p className="text-xs text-vault-600">
        sílaba suelta{item.char && item.char !== item.entry.hanzi ? ` de ${item.entry.hanzi}` : ''}
      </p>
      <div className={`grid w-full grid-cols-2 gap-2 ${answered ? (correct ? 'flash-correct' : 'shake flash-wrong') : ''}`}>
        {([1, 2, 3, 4] as const).map((t) => {
          const cls = answered && t === item.tone ? 'choice-correct' : picked === t ? 'choice-wrong' : ''
          return (
            <button
              key={t}
              type="button"
              disabled={answered}
              className={`choice rounded px-4 py-3 ${cls}`}
              onClick={() => {
                setPicked(t)
                if (t === item.tone) sfx.correct()
                else sfx.wrong()
              }}
            >
              <span className={`font-display text-2xl ${toneColor(t)}`}>{t}</span>
              <span className="block text-sm text-vault-500">{toneLabel(t)}</span>
            </button>
          )
        })}
      </div>
      {answered && (
        <>
          <p className="text-center">
            <Pinyin text={item.syllable} className="text-2xl" />{' '}
            <span className="text-sm text-vault-500">— tono {item.tone}: {toneLabel(item.tone)}</span>
          </p>
          <Btn className="w-full" onClick={() => onResult(correct)}>
            CONTINUAR ▸
          </Btn>
        </>
      )}
    </div>
  )
}
