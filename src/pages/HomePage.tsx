/* ─────────────────────────────────────────────────────────────────────────────
   MAPA — sectores del refugio, progreso y continuación
   ───────────────────────────────────────────────────────────────────────────── */

import { useNavigate } from 'react-router-dom'
import { isLessonUnlocked, lessonById, moduleOfLesson, modules, nextLessonId } from '../content'
import { sfx } from '../lib/sfx'
import { APP_VERSION, GITHUB_URL, GITHUB_USER } from '../lib/version'
import { useProgress } from '../stores/useProgress'
import { rankFor, type LessonRecord } from '../types/progress'
import { CapsIcon, Chip, GithubMark, Meter, Panel, SectionTitle, VaultDoorMark } from '../components/ui'
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
  const { current: rank, next: nextRank, progress: rankProgress } = rankFor(xp)

  const nextId = nextLessonId(completed)
  const nextLesson = lessonById.get(nextId)
  const nextModule = moduleOfLesson(nextId)

  return (
    <div className="flex flex-col gap-4 p-4 pb-8">
      <header className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h1 className="font-display text-3xl leading-none tracking-wider text-vault-400 glow sm:text-4xl sm:tracking-widest">
            CHINESE VAULT
          </h1>
          <p className="mt-1 truncate text-[10px] leading-tight text-vault-600 sm:text-xs">
            SISTEMA DE ENTRENAMIENTO LINGÜÍSTICO · {APP_VERSION}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {adminMode && <Chip className="px-1.5 py-0 text-vault-teal">👁</Chip>}
          <Chip className="flex items-center gap-1 px-1.5 py-0 text-vault-amber">
            <CapsIcon className="text-lg leading-none" />
            <span className="font-display text-lg leading-none">{caps}</span>
          </Chip>
          <Chip className="flex items-center gap-1 px-1.5 py-0 text-vault-amber">
            <span className="text-lg leading-none">🔥</span>
            <span className="font-display text-lg leading-none">{streak}</span>
          </Chip>
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

      {nextLesson && (
        <button
          type="button"
          className="btn-vault relative w-full overflow-hidden px-4 py-3 text-left"
          onClick={() => {
            sfx.tap()
            navigate(`/lesson/${nextLesson.id}`)
          }}
        >
          {/* marca de agua: la puerta del refugio asomando por la esquina (~40% visible) */}
          <VaultDoorMark className="pointer-events-none absolute -bottom-24 -right-4 h-40 w-40 text-vault-700 opacity-70" />
          <span className="relative block text-lg">CONTINUAR PROTOCOLO ▸</span>
          <span className="relative block text-sm text-vault-200">
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
          <ModuleCard
            key={m.id}
            m={m}
            records={records}
            completed={completed}
            adminMode={adminMode}
            nextLessonId={nextId}
            onPlay={(lessonId) => navigate(`/lesson/${lessonId}`)}
          />
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
  completed,
  adminMode,
  nextLessonId,
  onPlay,
}: {
  m: VaultModule
  records: Record<string, LessonRecord>
  completed: string[]
  adminMode: boolean
  nextLessonId: string
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
        {m.lessons.map((l) => {
          const isDone = l.id in records
          // MISMA regla global que LessonPage (antes: cada módulo "abría" su
          // lección 1 aunque la página la rechazara → 20 botones muertos)
          const unlocked = adminMode || isLessonUnlocked(l.id, completed)
          // un solo nodo "actual": la siguiente lección global pendiente
          const isNext = !isDone && unlocked && l.id === nextLessonId
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
                <span className="font-display text-lg">{m.lessons.indexOf(l) + 1}</span>
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
