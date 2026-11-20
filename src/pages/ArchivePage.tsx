/* ─────────────────────────────────────────────────────────────────────────────
   ARCHIVO DEL REFUGIO — banco desbloqueable de palabras y gramática vistas
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { entriesById, modules, seenEntries, unlockedNotes } from '../content'
import { speakEntry, speakSentence } from '../lib/audio'
import { useProgress } from '../stores/useProgress'
import { Panel, Prompt, SectionTitle } from '../components/ui'
import { Pinyin } from '../components/Pinyin'

export function ArchivePage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'palabras' | 'gramatica'>('palabras')
  const [filter, setFilter] = useState('all')
  const [mode, setMode] = useState<'listen' | 'speak' | 'write'>('listen')
  const completedKey = useProgress((s) => Object.keys(s.completed).join(','))
  const completed = completedKey ? completedKey.split(',') : []

  const seen = seenEntries(completed)
  const notes = unlockedNotes(completed)

  const words = seen
    .map((id) => entriesById.get(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => {
      if (filter === 'all') return true
      const mod = modules.find((m) => m.entries.some((en) => en.id === e.id))
      return mod?.id === filter
    })

  return (
    <div className="flex flex-col gap-3 p-4 pb-8">
      <Prompt className="pt-1">▓ ARCHIVO DEL REFUGIO ▓</Prompt>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className={`choice rounded py-2 font-display text-xl ${tab === 'palabras' ? 'choice-selected text-vault-300' : 'text-vault-600'}`}
          onClick={() => setTab('palabras')}
        >
          PALABRAS ({seen.length})
        </button>
        <button
          type="button"
          className={`choice rounded py-2 font-display text-xl ${tab === 'gramatica' ? 'choice-selected text-vault-300' : 'text-vault-600'}`}
          onClick={() => setTab('gramatica')}
        >
          GRAMÁTICA ({notes.length})
        </button>
      </div>

      {!completed.length && (
        <Panel className="p-5 text-center">
          <p className="text-sm text-vault-500">
            El archivo está vacío. Completa lecciones del mapa para registrar entradas aquí.
          </p>
        </Panel>
      )}

      {tab === 'palabras' && completed.length > 0 && (
        <>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" onClick={() => setFilter('all')} className={filterChip(filter === 'all')}>
              TODOS
            </button>
            {modules
              .filter((m) => m.entries.some((e) => seen.includes(e.id)))
              .map((m) => (
                <button key={m.id} type="button" onClick={() => setFilter(m.id)} className={filterChip(filter === m.id)}>
                  {m.code}
                </button>
              ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-vault-600">TOCAR UNA PALABRA PARA:</span>
            {(
              [
                ['listen', '🔊 ESCUCHAR'],
                ['speak', '🎤 PRONUNCIAR'],
                ['write', '✍️ ESCRIBIR'],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={filterChip(mode === m)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {words.map((e) => (
              <button
                key={e.id}
                type="button"
                className="choice rounded p-3 text-left"
                onClick={() => {
                  if (mode === 'listen') speakEntry(e)
                  else navigate(`/practice/${mode}/${e.id}`)
                }}
              >
                <div className="flex items-center gap-2">
                  {e.emoji && <span className="text-xl">{e.emoji}</span>}
                  <span className="font-hanzi text-2xl text-vault-100">{e.hanzi}</span>
                </div>
                <Pinyin text={e.pinyin} className="text-sm" />
                <p className="text-sm text-vault-500">{e.es}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {tab === 'gramatica' && (
        <div className="flex flex-col gap-3">
          {notes.map((n) => (
            <Panel key={n.id} className="p-4">
              <SectionTitle className="text-xl">{n.title}</SectionTitle>
              <div className="mt-2 space-y-2 text-sm leading-relaxed">
                {n.body.split('\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-3 space-y-2 border-t border-vault-700 pt-3">
                {n.examples.map((ex, i) => (
                  <button key={i} type="button" className="block w-full text-left hover:text-vault-100" onClick={() => speakSentence(ex)}>
                    <span className="font-hanzi text-lg text-vault-200">{ex.hanzi} </span>
                    <Pinyin text={ex.pinyin} className="text-xs" />{' '}
                    <span className="text-xs text-vault-500">— {ex.es}</span>
                  </button>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  )
}

const filterChip = (active: boolean) =>
  `chip px-2 py-0.5 text-sm ${active ? 'border-vault-400 text-vault-300' : 'text-vault-600'}`
