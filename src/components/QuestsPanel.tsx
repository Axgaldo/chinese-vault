/* ─────────────────────────────────────────────────────────────────────────────
   Panel de la CARAVANA 🐂 — barras de los encargos del día.
   Lo usan el Perfil (sección fija) y el popup de fin de lección.
   ───────────────────────────────────────────────────────────────────────────── */

import { QUEST_POOL } from '../lib/quests'
import { sfx } from '../lib/sfx'
import { useProgress } from '../stores/useProgress'
import { Btn, CapsIcon, Meter } from './ui'

export function QuestsList() {
  const quests = useProgress((s) => s.quests)
  const claimQuest = useProgress((s) => s.claimQuest)

  if (!quests.items.length) return null

  return (
    <div className="space-y-2">
      {quests.items.map((item) => {
        const template = QUEST_POOL.find((t) => t.id === item.id)
        if (!template) return null
        const done = item.progress >= template.goal
        return (
          <div key={item.id} className="flex items-center gap-2">
            <span className="text-xl">{template.emoji}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className={`truncate text-sm ${done ? 'text-vault-200' : 'text-vault-400'}`}>
                  {template.title}
                </span>
                <span className="shrink-0 text-xs text-vault-500">
                  {Math.min(item.progress, template.goal)}/{template.goal}
                </span>
              </div>
              <Meter value={item.progress / template.goal} className="mt-1 h-2!" />
            </div>
            {item.claimed ? (
              <span className="font-display text-lg text-vault-600">✔</span>
            ) : done ? (
              <Btn
                className="flex items-center gap-1 px-2 py-0.5 text-lg"
                onClick={() => {
                  sfx.log()
                  claimQuest(item.id)
                }}
              >
                <CapsIcon />
                {template.caps}
              </Btn>
            ) : (
              <span className="flex items-center gap-1 font-display text-lg text-vault-600">
                <CapsIcon />
                {template.caps}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
