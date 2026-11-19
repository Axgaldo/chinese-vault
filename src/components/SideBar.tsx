/* ─────────────────────────────────────────────────────────────────────────────
   SideBar — barra lateral de escritorio (≥lg). En móvil la sustituye NavBar.
   ───────────────────────────────────────────────────────────────────────────── */

import { NavLink } from 'react-router-dom'
import { sfx } from '../lib/sfx'
import { APP_VERSION, GITHUB_URL, GITHUB_USER } from '../lib/version'
import { useProgress } from '../stores/useProgress'
import { rankFor } from '../types/progress'
import { Chip, GithubMark, Meter } from './ui'

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded border px-3 py-2 font-display text-xl tracking-wider ${
    isActive
      ? 'choice-selected border-vault-400 text-vault-300 glow'
      : 'border-transparent text-vault-600 hover:border-vault-700'
  }`

export function SideBar({ className = '' }: { className?: string }) {
  const xp = useProgress((s) => s.xp)
  const caps = useProgress((s) => s.caps)
  const streak = useProgress((s) => s.streakDays)
  const due = useProgress((s) => Object.values(s.srs).filter((c) => c.due <= Date.now()).length)
  const { current: rank, next: nextRank, progress: rankProgress } = rankFor(xp)

  return (
    <aside className={`flex flex-col gap-4 border-r border-vault-800 p-4 ${className}`}>
      <div>
        <h1 className="font-display text-3xl tracking-widest text-vault-400 glow">CHINESE VAULT</h1>
        <p className="text-xs text-vault-600">SISTEMA DE ENTRENAMIENTO LINGÜÍSTICO · {APP_VERSION}</p>
      </div>

      <div className="panel p-3">
        <p className="font-display text-xl text-vault-300">{rank.name}</p>
        <Meter value={rankProgress} className="mt-2" />
        <p className="mt-1 text-xs text-vault-600">
          {xp} XP{nextRank ? ` · a ${nextRank.name}: ${nextRank.xp - xp}` : ' · rango máximo'}
        </p>
        <div className="mt-2 flex gap-1.5">
          <Chip className="text-vault-amber">⛓ {caps}</Chip>
          <Chip className="text-vault-amber">🔥 {streak}</Chip>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <NavLink to="/" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">🗺️</span> MAPA
        </NavLink>
        <NavLink to="/review" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">📡</span> REPASO
          {due > 0 && <span className="ml-auto rounded-full bg-vault-red px-1.5 text-xs text-vault-950">{due}</span>}
        </NavLink>
        <NavLink to="/radio" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">📻</span> RADIO
        </NavLink>
        <NavLink to="/archive" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">🗄️</span> ARCHIVO
        </NavLink>
        <NavLink to="/shop" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">🛒</span> TIENDA
        </NavLink>
        <NavLink to="/profile" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">👤</span> PERFIL
        </NavLink>
      </nav>

      <div className="mt-auto space-y-1 border-t border-vault-800 pt-3">
        <p className="text-xs text-vault-500">中文 · aprende chino desde 0, en español</p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-vault-300 hover:text-vault-100"
          title={`github.com/${GITHUB_USER}`}
        >
          <GithubMark />
          {GITHUB_USER}
        </a>
        <p className="text-xs text-vault-600">MIT · {APP_VERSION}</p>
      </div>
    </aside>
  )
}
