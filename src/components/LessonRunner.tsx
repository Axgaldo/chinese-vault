/* ─────────────────────────────────────────────────────────────────────────────
   LessonRunner — orquesta una lección: cola de pasos, reintentos al fallar,
   XP, estrellas y pantalla de completado. Al completar, inscribe las palabras
   en el pool SRS (vía store.completeLesson).
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'
import { entriesById, lessonEntryIds } from '../content'
import { sfx } from '../lib/sfx'
import { isGraded } from '../lib/questions'
import { useProgress } from '../stores/useProgress'
import type { Lesson } from '../types/content'
import { ChallengeView } from './challenges'
import { Btn, Chip, Meter, Panel } from './ui'
import { Pinyin } from './Pinyin'

export interface RunnerResult {
  stars: number
  accuracy: number
  xp: number
}

const BONUS_FIRST = 30
const BONUS_PERFECT = 20

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
  const showHanzi = useProgress((s) => s.settings.showHanzi)
  const setSettings = useProgress((s) => s.setSettings)

  const [queue, setQueue] = useState<number[]>(() => lesson.steps.map((_, i) => i))
  const [pos, setPos] = useState(0)
  /** firstTry[idx]: true/false la primera vez que se responde; false = reintento sin XP */
  const [firstTry, setFirstTry] = useState<Record<number, boolean>>({})
  const [passed, setPassed] = useState<number[]>([])
  const [xpGain, setXpGain] = useState(0)
  const [result, setResult] = useState<RunnerResult | null>(null)
  const [confirmExit, setConfirmExit] = useState(false)

  const current = queue[pos]
  const step = current !== undefined ? lesson.steps[current] : null
  const awardXp = step && current !== undefined ? firstTry[current] !== false : false

  const reset = () => {
    setQueue(lesson.steps.map((_, i) => i))
    setPos(0)
    setFirstTry({})
    setPassed([])
    setXpGain(0)
    setResult(null)
    setConfirmExit(false)
  }

  const finish = () => {
    const graded = lesson.steps.map((s, i) => (isGraded(s) ? i : -1)).filter((i) => i >= 0)
    const correct = graded.filter((i) => firstTry[i]).length
    const accuracy = graded.length ? correct / graded.length : 1
    const stars = accuracy >= 0.9 ? 3 : accuracy >= 0.65 ? 2 : 1
    const firstTime = !useProgress.getState().completed[lesson.id]
    const bonus = firstTime ? BONUS_FIRST + (accuracy === 1 ? BONUS_PERFECT : 0) : 0

    completeLesson(lesson.id, stars, accuracy)
    addXp(bonus)
    sfx.complete()
    setResult({ stars, accuracy, xp: xpGain + bonus })
  }

  const handleResult = (correct: boolean, xp: number) => {
    if (current === undefined || !step) return
    const idx = current
    setFirstTry((m) => (idx in m ? m : { ...m, [idx]: correct }))

    if (correct) {
      setXpGain((x) => x + xp)
      setPassed((p) => (p.includes(idx) ? p : [...p, idx]))
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
  const progress = lesson.steps.length ? passed.length / lesson.steps.length : 1

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
            aria-label={showHanzi ? 'cambiar a pinyin' : 'cambiar a caracteres chinos'}
            title={showHanzi ? 'modo pinyin' : 'modo hanzi'}
            className={`btn-vault px-2.5 py-0.5 ${showHanzi ? '' : 'text-vault-amber'}`}
            onClick={() => {
              sfx.tap()
              setSettings({ showHanzi: !showHanzi })
            }}
          >
            {showHanzi ? '拼' : '漢'}
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
          <ChallengeView key={pos} step={step} awardXp={awardXp} onResult={handleResult} />
        </div>
      ) : null}
    </div>
  )
}
