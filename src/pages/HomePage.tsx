/* ─────────────────────────────────────────────────────────────────────────────
   MAPA — sectores del refugio, progreso y continuación
   ───────────────────────────────────────────────────────────────────────────── */

import { useNavigate } from 'react-router-dom'
import { lessonById, moduleOfLesson, modules, nextLessonId } from '../content'
import { sfx } from '../lib/sfx'
import { QUEST_POOL } from '../lib/quests'
import { APP_VERSION, GITHUB_URL, GITHUB_USER } from '../lib/version'
import { useProgress } from '../stores/useProgress'
import { rankFor, type LessonRecord } from '../types/progress'
import { Btn, Chip, GithubMark, Meter, Panel, SectionTitle } from '../components/ui'
import type { VaultModule } from '../types/content'

export function HomePage() {
  const navigate = useNavigate()
  const records = useProgress((s) => s.completed)
  const completed = Object.keys(records)
  const xp = useProgress((s) => s.xp)
  const caps = useProgress((s) => s.caps)
  const streak = useProgress((s) => s.streakDays)
  const adminMode = useProgress((s) => s.settings.adminMode)
  const due = useProgress((s) => Object.values(s.srs).filter((c) => c.due <= Date.now()).length)
  const quests = useProgress((s) => s.quests)
  const claimQuest = useProgress((s) => s.claimQuest)
  const { current: rank, next: nextRank, progress: rankProgress } = rankFor(xp)

  const nextId = nextLessonId(completed)
  const nextLesson = lessonById.get(nextId)
  const nextModule = moduleOfLesson(nextId)

  return (
    <div className="flex flex-col gap-4 p-4 pb-8">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-widest text-vault-400 glow">CHINESE VAULT</h1>
          <p className="text-xs text-vault-600">SISTEMA DE ENTRENAMIENTO LINGÜÍSTICO · {APP_VERSION}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {adminMode && <Chip className="text-vault-teal">👁 SUPERVISOR</Chip>}
          <Chip className="text-vault-amber">⛓ {caps}</Chip>
          <Chip className="text-vault-amber">🔥 {streak}</Chip>
        </div>
      </header>

      <Panel className="p-3">
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-vault-300">{rank.name}</span>
          <span className="font-display text-xl text-vault-200">{xp} XP</span>
        </div>
        <Meter value={rankProgress} className="mt-2" />
        {nextRank && (
          <p className="mt-1 text-xs text-vault-600">
            siguiente rango: {nextRank.name} ({nextRank.xp - xp} XP)
          </p>
        )}
      </Panel>

      {quests.items.length > 0 && (
        <Panel className="p-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-vault-300">🐂 CARAVANA DE HOY</span>
            <span className="text-xs text-vault-600">
              {quests.items.filter((q) => q.claimed).length}/{quests.items.length} reclamados
            </span>
          </div>
          <div className="mt-2 space-y-2">
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
                      className="px-2 py-0.5 text-lg"
                      onClick={() => {
                        sfx.log()
                        claimQuest(item.id)
                      }}
                    >
                      ⛓{template.caps}
                    </Btn>
                  ) : (
                    <span className="font-display text-lg text-vault-600">⛓{template.caps}</span>
                  )}
                </div>
              )
            })}
          </div>
        </Panel>
      )}

      {nextLesson && (
        <button
          type="button"
          className="btn-vault w-full px-4 py-3 text-left"
          onClick={() => {
            sfx.tap()
            navigate(`/lesson/${nextLesson.id}`)
          }}
        >
          <span className="block text-lg">CONTINUAR PROTOCOLO ▸</span>
          <span className="block text-sm text-vault-200">
            {nextModule?.code} · {nextLesson.title}
          </span>
        </button>
      )}

      {due > 0 && (
        <button
          type="button"
          className="btn-vault btn-vault-amber w-full px-4 py-3 text-left"
          onClick={() => {
            sfx.tap()
            navigate('/review')
          }}
        >
          <span className="block text-lg">📡 REPASO DISPONIBLE</span>
          <span className="block text-sm">{due} palabras esperan en la cola</span>
        </button>
      )}

      <SectionTitle>SECTORES DEL REFUGIO</SectionTitle>
      <div className="flex flex-col gap-3">
        {modules.map((m) => (
          <ModuleCard key={m.id} m={m} records={records} adminMode={adminMode} onPlay={(lessonId) => navigate(`/lesson/${lessonId}`)} />
        ))}
      </div>

      <footer className="flex flex-col items-center gap-1 text-center">
        <p className="text-xs text-vault-500">中文 · aprende chino desde cero, en español</p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-vault-400 hover:text-vault-100"
          title={`github.com/${GITHUB_USER}`}
        >
          <GithubMark />
          {GITHUB_USER}
        </a>
      </footer>
    </div>
  )
}

function ModuleCard({
  m,
  records,
  adminMode,
  onPlay,
}: {
  m: VaultModule
  records: Record<string, LessonRecord>
  adminMode: boolean
  onPlay(lessonId: string): void
}) {
  const doneCount = m.lessons.filter((l) => l.id in records).length
  const allDone = doneCount === m.lessons.length

  return (
    <Panel className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Chip>{m.code}</Chip>
          <span className="font-display text-xl text-vault-300">{m.title}</span>
        </div>
        <span className={`font-display text-lg ${allDone ? 'text-vault-amber' : 'text-vault-600'}`}>
          {doneCount}/{m.lessons.length}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-vault-600">{m.subtitle}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {m.lessons.map((l, i) => {
          const isDone = l.id in records
          const unlocked = adminMode || i === 0 || m.lessons[i - 1].id in records
          const isNext = !isDone && unlocked
          return (
            <button
              key={l.id}
              type="button"
              disabled={!unlocked}
              title={`${m.code} · ${l.title}`}
              onClick={() => {
                sfx.tap()
                onPlay(l.id)
              }}
              className={`choice flex h-12 w-12 flex-col items-center justify-center rounded-full text-center ${
                isDone
                  ? 'choice-correct text-vault-300'
                  : isNext
                    ? 'node-current text-vault-300'
                    : 'node-locked text-vault-500'
              }`}
            >
              {isDone ? (
                <span className="text-vault-amber">{'★'.repeat(records[l.id]?.stars ?? 1)}</span>
              ) : unlocked ? (
                <span className="font-display text-lg">{i + 1}</span>
              ) : (
                <span>🔒</span>
              )}
            </button>
          )
        })}
      </div>
    </Panel>
  )
}
