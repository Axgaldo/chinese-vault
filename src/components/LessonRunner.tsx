/* ─────────────────────────────────────────────────────────────────────────────
   LessonRunner — orquesta una lección: cola de pasos, reintentos al fallar,
   XP, estrellas y pantalla de completado. Al completar, inscribe las palabras
   en el pool SRS (vía store.completeLesson).
   ───────────────────────────────────────────────────────────────────────────── */

import { useMemo, useState } from 'react'
import { entriesById, lessonEntryIds } from '../content'
import { sfx } from '../lib/sfx'
import { isGraded } from '../lib/questions'
import { QUEST_POOL } from '../lib/quests'
import { useProgress } from '../stores/useProgress'
import type { Lesson, Step } from '../types/content'
import type { ScriptMode } from '../types/progress'
import { SCRIPT_MODES } from '../types/progress'
import { ChallengeView } from './challenges'
import { QuestsList } from './QuestsPanel'
import { Btn, CapsIcon, Chip, Meter, Panel } from './ui'
import { Pinyin } from './Pinyin'

export interface RunnerResult {
  stars: number
  accuracy: number
  xp: number
}

const BONUS_FIRST = 30
const BONUS_PERFECT = 20

/** Hash estable de un string (elige siempre los mismos retos por lección) */
function stableHash(str: string): number {
  let h = 0
  for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) | 0
  return Math.abs(h)
}

/**
 * Pasos de la lección: las AUDITORÍAS (kind review) reciben automáticamente
 * un DESAFÍO ORAL y uno de ESCRITURA con palabras vistas de la lección.
 */
function lessonSteps(lesson: Lesson): Step[] {
  if (lesson.kind !== 'review') return lesson.steps
  const ids = lessonEntryIds(lesson.id).filter((id) => entriesById.has(id))
  if (ids.length < 2) return lesson.steps
  const h = stableHash(lesson.id)
  const speakId = ids[h % ids.length]
  const writeId = ids[(h + Math.floor(ids.length / 2)) % ids.length]
  const extra: Step[] = []
  if (speakId !== writeId) extra.push({ type: 'speak', entry: speakId })
  extra.push({ type: 'write', entry: writeId })
  return [...lesson.steps, ...extra]
}

export function LessonRunner({
  lesson,
  onExit,
  onNext,
}: {
  lesson: Lesson
  onExit(): void
  onNext(): void
}) {
  const completeLesson = useProgress((s) => s.completeLesson)
  const addXp = useProgress((s) => s.addXp)
  const logActivity = useProgress((s) => s.logActivity)
  const scriptMode = useProgress((s) => s.settings.scriptMode)
  const setSettings = useProgress((s) => s.setSettings)

  const steps = useMemo(() => lessonSteps(lesson), [lesson])

  const [queue, setQueue] = useState<number[]>(() => steps.map((_, i) => i))
  const [pos, setPos] = useState(0)
  /** firstTry[idx]: true/false la primera vez que se responde; false = reintento sin XP */
  const [firstTry, setFirstTry] = useState<Record<number, boolean>>({})
  const [passed, setPassed] = useState<number[]>([])
  const [xpGain, setXpGain] = useState(0)
  const [result, setResult] = useState<RunnerResult | null>(null)
  const [caravanGain, setCaravanGain] = useState(0)
  const [confirmExit, setConfirmExit] = useState(false)

  const current = queue[pos]
  const step = current !== undefined ? steps[current] : null
  const awardXp = step && current !== undefined ? firstTry[current] !== false : false

  const reset = () => {
    setQueue(steps.map((_, i) => i))
    setPos(0)
    setFirstTry({})
    setPassed([])
    setXpGain(0)
    setResult(null)
    setConfirmExit(false)
  }

  const finish = () => {
    const graded = steps.map((s, i) => (isGraded(s) ? i : -1)).filter((i) => i >= 0)
    const correct = graded.filter((i) => firstTry[i]).length
    const accuracy = graded.length ? correct / graded.length : 1
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.65 ? 2 : 1
    const firstTime = !useProgress.getState().completed[lesson.id]
    const bonus = firstTime ? BONUS_FIRST + (accuracy === 1 ? BONUS_PERFECT : 0) : 0

    // caravana: qué encargos estaban ya canjeados ANTES de completar
    const claimedBefore = new Set(
      useProgress.getState().quests.items.filter((q) => q.claimed).map((q) => q.id),
    )

    completeLesson(lesson.id, stars, accuracy)
    // el XP de los pasos acertados TAMBIÉN se persiste (no solo el bonus)
    addXp(xpGain + bonus)
    sfx.complete()

    // encargos auto-canjeados con ESTA lección (para el popup de la caravana)
    const claimedNow = useProgress
      .getState()
      .quests.items.filter((q) => q.claimed && !claimedBefore.has(q.id))
    const capsGained = claimedNow.reduce((sum, q) => {
      const t = QUEST_POOL.find((x) => x.id === q.id)
      return sum + (t?.caps ?? 0)
    }, 0)
    setCaravanGain(capsGained)

    setResult({ stars, accuracy, xp: xpGain + bonus })
  }

  const handleResult = (correct: boolean, xp: number) => {
    if (current === undefined || !step) return
    const idx = current
    setFirstTry((m) => (idx in m ? m : { ...m, [idx]: correct }))

    if (correct) {
      setXpGain((x) => x + xp)
      setPassed((p) => (p.includes(idx) ? p : [...p, idx]))
      // contadores para la caravana
      logActivity('steps', 1)
      if (step.type === 'dictate') logActivity('dictations', 1)
      if (step.type === 'tone') logActivity('tones', 1)
      if (pos + 1 >= queue.length) finish()
      else setPos(pos + 1)
    } else {
      // reintento un poco más adelante en la cola
      setQueue((q) => {
        if (q.slice(pos + 1).includes(idx)) return q
        const n = [...q]
        n.splice(Math.min(pos + 4, n.length), 0, idx)
        return n
      })
      setPos(pos + 1)
    }
  }

  /* ── Pantalla de completado ─────────────────────────────────────────────── */
  if (result) {
    const newEntries = lessonEntryIds(lesson.id)
      .map((id) => entriesById.get(id))
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
    return (
      <div className="pop-in flex flex-col items-center gap-4 p-4">
        <p className="font-display text-3xl tracking-widest text-vault-400 glow">▓ LECCIÓN COMPLETADA ▓</p>
        <p className="font-display text-6xl tracking-widest text-vault-amber glow">
          {'★'.repeat(result.stars)}
          <span className="text-vault-700">{'★'.repeat(3 - result.stars)}</span>
        </p>
        <Chip className="text-xl">+{result.xp} XP</Chip>
        <p className="text-sm text-vault-500">
          precisión {(result.accuracy * 100).toFixed(0)}% · las palabras nuevas ya están en tu cola de repaso
        </p>

        <Panel className="mt-2 w-full p-3">
          <p className="font-display text-xl text-vault-300">ENTRADAS REGISTRADAS</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {newEntries.map((e) => (
              <Chip key={e.id}>
                {e.emoji && <span>{e.emoji}</span>}
                <span className="font-hanzi">{e.hanzi}</span>
                <Pinyin text={e.pinyin} className="text-sm" />
              </Chip>
            ))}
          </div>
        </Panel>

        {/* popup de la caravana: barras del día + auto-canjeo */}
        <Panel className="pop-in mt-2 w-full p-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-vault-300">🐂 CARAVANA</span>
            {caravanGain > 0 && (
              <span className="flex items-center gap-1 font-display text-lg text-vault-amber">
                <CapsIcon />
                +{caravanGain} auto-canjeadas
              </span>
            )}
          </div>
          <div className="mt-2">
            <QuestsList />
          </div>
        </Panel>

        <div className="mt-3 flex w-full flex-col gap-2">
          <Btn className="w-full" onClick={onNext}>
            SIGUIENTE ▸
          </Btn>
          <div className="flex gap-2">
            <Btn variant="amber" className="flex-1" onClick={reset}>
              ⟲ REPETIR
            </Btn>
            <Btn variant="amber" className="flex-1" onClick={onExit}>
              SALIR AL MAPA
            </Btn>
          </div>
        </div>
      </div>
    )
  }

  /* ── Ejecución de la lección ────────────────────────────────────────────── */
  const progress = steps.length ? passed.length / steps.length : 1

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-vault-800 bg-vault-950/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="salir de la lección"
            className="btn-vault px-2 py-0.5 text-xl"
            onClick={() => setConfirmExit(true)}
          >
            ✕
          </button>
          <div className="flex-1">
            <Meter value={progress} />
          </div>
          <button
            type="button"
            aria-label="rotar modo de escritura"
            title={`modo: ${SCRIPT_MODES.find((m) => m.mode === scriptMode)?.label} — toca para rotar`}
            className={`btn-vault px-2.5 py-0.5 ${scriptMode === 'pinyin' ? '' : 'text-vault-amber'}`}
            onClick={() => {
              sfx.tap()
              const order: ScriptMode[] = ['pinyin', 'both', 'hanzi']
              const next = order[(order.indexOf(scriptMode) + 1) % order.length]
              setSettings({ scriptMode: next })
            }}
          >
            {SCRIPT_MODES.find((m) => m.mode === scriptMode)?.icon}
          </button>
          <span className="font-display text-xl text-vault-300">+{xpGain} XP</span>
        </div>
        <p className="mt-1 text-center font-display text-lg text-vault-500">{lesson.title}</p>
      </header>

      {confirmExit ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="font-display text-2xl text-vault-amber glow">¿ABANDONAR EL PROTOCOLO?</p>
          <p className="text-sm text-vault-500">el progreso de esta sesión se perderá</p>
          <div className="flex w-full gap-2">
            <Btn className="flex-1" onClick={() => setConfirmExit(false)}>
              NO, SEGUIR ▸
            </Btn>
            <Btn variant="amber" className="flex-1" onClick={onExit}>
              SÍ, SALIR
            </Btn>
          </div>
        </div>
      ) : step && current !== undefined ? (
        <div className="flex flex-1 flex-col justify-center p-4">
          <ChallengeView key={pos} step={step} lessonId={lesson.id} awardXp={awardXp} onResult={handleResult} />
        </div>
      ) : null}
    </div>
  )
}
