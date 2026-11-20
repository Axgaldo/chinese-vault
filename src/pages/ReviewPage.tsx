/* ─────────────────────────────────────────────────────────────────────────────
   REPASO — sesión de repetición espaciada (SRS) sobre las palabras vistas
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { entriesById } from '../content'
import { dueCardIds, nextDueIn, type Grade } from '../lib/srs'
import { reviewStepFor } from '../lib/questions'
import { sfx } from '../lib/sfx'
import { useProgress } from '../stores/useProgress'
import { ChallengeView } from '../components/challenges'
import { Btn, Chip, Meter, Panel, Prompt } from '../components/ui'
import type { Step } from '../types/content'

const XP_REVIEW = 5
/** Máximo de tarjetas por sesión de repaso (el resto queda para la próxima) */
const REVIEW_SESSION_CAP = 30

interface ReviewItem {
  entry: string
  step: Step
}

export function ReviewPage() {
  const navigate = useNavigate()
  const addXp = useProgress((s) => s.addXp)
  const gradeEntry = useProgress((s) => s.gradeEntry)
  const finishReviewSession = useProgress((s) => s.finishReviewSession)
  const logActivity = useProgress((s) => s.logActivity)
  const srs = useProgress((s) => s.srs)

  const [queue, setQueue] = useState<ReviewItem[]>(() => {
    return dueCardIds(srs)
      .filter((id) => entriesById.has(id))
      // tope por sesión: sin él, con todo el curso visto serían 200+ tarjetas seguidas
      .slice(0, REVIEW_SESSION_CAP)
      .map((id) => ({
        entry: id,
        step: reviewStepFor(id, srs[id]?.reps ?? 0),
      }))
  })
  const [pos, setPos] = useState(0)
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({})
  const [xp, setXp] = useState(0)
  const [done, setDone] = useState(false)

  const current = queue[pos]
  const progress = queue.length ? pos / queue.length : 0

  const handleResult = (correct: boolean) => {
    if (!current) return
    const id = current.entry
    const wasFirst = !(id in firstTry)
    setFirstTry((m) => (id in m ? m : { ...m, [id]: correct }))

    let g: Grade
    if (!correct) g = 'again'
    else if (wasFirst) g = 'good'
    else g = 'hard'
    gradeEntry(id, g)

    if (correct) {
      addXp(XP_REVIEW)
      setXp((x) => x + XP_REVIEW)
      logActivity('reviews', 1)
      if (pos + 1 >= queue.length) {
        finishReviewSession()
        setDone(true)
        sfx.complete()
      } else setPos(pos + 1)
    } else {
      // reencolar al final para verla otra vez
      setQueue((q) => [...q, current])
      setPos(pos + 1)
    }
  }

  /* ── Sin pendientes ─────────────────────────────────────────────────────── */
  if (!queue.length) {
    const nextIn = nextDueIn(srs)
    return (
      <div className="flex flex-col items-center gap-4 p-4 pt-10 text-center">
        <Prompt>▓ COLA DE REPASO ▓</Prompt>
        <Panel className="w-full p-5">
          <p className="font-display text-2xl text-vault-300">NO HAY REVISIONES PENDIENTES</p>
          <p className="mt-3 text-sm text-vault-500">
            {nextIn !== null
              ? `próximo repaso en ${humanize(nextIn)} — vuelve cuando el terminal te llame`
              : 'completa lecciones para llenar la cola de repaso del refugio'}
          </p>
        </Panel>
        <Btn className="w-full" onClick={() => navigate('/')}>
          AL MAPA ▸
        </Btn>
      </div>
    )
  }

  /* ── Resumen ────────────────────────────────────────────────────────────── */
  if (done) {
    const reviewed = new Set(queue.map((q) => q.entry)).size
    const remaining = dueCardIds(useProgress.getState().srs).filter((id) => entriesById.has(id)).length
    return (
      <div className="pop-in flex flex-col items-center gap-4 p-4 pt-10 text-center">
        <Prompt>▓ REPASO COMPLETADO ▓</Prompt>
        <p className="font-display text-5xl text-vault-amber glow">📡</p>
        <Chip className="text-xl">+{xp} XP</Chip>
        <Panel className="w-full p-4">
          <p className="text-sm text-vault-500">
            {reviewed} palabras repasadas · las falladas volverán a la cola en minutos y el resto
            dentro de días (repetición espaciada)
          </p>
          {remaining > 0 && (
            <p className="mt-2 text-sm text-vault-400">
              quedan {remaining} en la cola — te esperan en la próxima sesión (tope de {REVIEW_SESSION_CAP} por sesión)
            </p>
          )}
        </Panel>
        <div className="flex w-full gap-2">
          <Btn className="flex-1" onClick={() => navigate('/')}>
            AL MAPA ▸
          </Btn>
        </div>
      </div>
    )
  }

  /* ── Sesión en curso ────────────────────────────────────────────────────── */
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b border-vault-800 bg-vault-950/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-vault-500">REPASO</span>
          <div className="flex-1">
            <Meter value={progress} />
          </div>
          <span className="font-display text-xl text-vault-300">+{xp} XP</span>
        </div>
      </header>
      <div className="flex flex-1 flex-col justify-center p-4">
        {current && (
          <ChallengeView
            key={`${current.entry}-${pos}`}
            step={current.step}
            awardXp={!(current.entry in firstTry) || firstTry[current.entry]}
            onResult={(correct) => handleResult(correct)}
          />
        )}
      </div>
    </div>
  )
}

function humanize(ms: number): string {
  const min = Math.max(1, Math.round(ms / 60_000))
  if (min < 60) return `${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `${h} h`
  return `${Math.round(h / 24)} días`
}
