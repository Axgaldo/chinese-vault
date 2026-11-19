/* ─────────────────────────────────────────────────────────────────────────────
   PRÁCTICA LIBRE — desafío oral o de escritura sobre una palabra del Archivo.
   Ruta /practice/:mode/:entryId · +3 XP por acierto (alimenta la caravana).
   ───────────────────────────────────────────────────────────────────────────── */

import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { entriesById } from '../content'
import { useProgress } from '../stores/useProgress'
import { ChallengeView } from '../components/challenges'
import { Btn, Chip } from '../components/ui'
import type { Step } from '../types/content'

export function PracticePage() {  const { mode, entryId } = useParams()
  const navigate = useNavigate()
  const addXp = useProgress((s) => s.addXp)
  const logActivity = useProgress((s) => s.logActivity)
  const [earned, setEarned] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const entry = entryId ? entriesById.get(entryId) : undefined
  const step = useMemo<Step | null>(() => {
    if (!entry) return null
    if (mode === 'speak') return { type: 'speak', entry: entry.id }
    if (mode === 'write') return { type: 'write', entry: entry.id }
    return null
  }, [entry, mode])

  if (!entry || !step) return <Navigate to="/archive" replace />

  const title = mode === 'speak' ? 'DESAFÍO ORAL' : 'DESAFÍO DE ESCRITURA'

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-vault-800 bg-vault-950/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg text-vault-500">{title}</span>
          <span className="ml-auto font-display text-xl text-vault-300">
            +{earned} XP
          </span>
        </div>
      </header>

      <div className="flex flex-1 flex-col justify-center p-4">
        <ChallengeView
          key={attempts}
          step={step}
          awardXp
          onResult={(correct, xp) => {
            if (correct && xp > 0) {
              addXp(xp)
              setEarned((e) => e + xp)
              logActivity('steps', 1)
            }
            setAttempts((a) => a + 1)
          }}
        />

        {attempts > 0 && (
          <div className="mt-4 flex items-center justify-between gap-2">
            <Chip className="text-vault-amber">
              {mode === 'speak' ? '🎤' : '✍️'} práctica libre · XP por acierto
            </Chip>            <div className="flex gap-2">
              <Btn variant="amber" onClick={() => setAttempts((a) => a + 1)}>
                ⟲ OTRA
              </Btn>
              <Btn onClick={() => navigate('/archive')}>AL ARCHIVO ▸</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
