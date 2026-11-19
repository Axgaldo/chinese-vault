/* ─────────────────────────────────────────────────────────────────────────────
   Barra de navegación inferior del refugio
   ───────────────────────────────────────────────────────────────────────────── */

import { NavLink } from 'react-router-dom'
import { sfx } from '../lib/sfx'
import { useProgress } from '../stores/useProgress'

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center gap-0.5 py-2 font-display text-sm tracking-wider ${
    isActive ? 'text-vault-400 glow' : 'text-vault-600'
  }`

export function NavBar({ className = '' }: { className?: string }) {
  const due = useProgress((s) => Object.values(s.srs).filter((c) => c.due <= Date.now()).length)

  return (
    <nav className={`sticky bottom-0 z-10 border-t border-vault-800 bg-vault-950/95 backdrop-blur ${className}`}>
      <div className="grid grid-cols-5">
        <NavLink to="/" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">🗺️</span>
          MAPA
        </NavLink>
        <NavLink to="/review" className={linkCls} onClick={() => sfx.tap()}>
          <span className="relative text-2xl">
            📡
            {due > 0 && (
              <span className="absolute -right-3 -top-1 rounded-full bg-vault-red px-1.5 text-xs text-vault-950">
                {due}
              </span>
            )}
          </span>
          REPASO
        </NavLink>
        <NavLink to="/archive" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">🗄️</span>
          ARCHIVO
        </NavLink>
        <NavLink to="/shop" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">🛒</span>
          TIENDA
        </NavLink>
        <NavLink to="/profile" className={linkCls} onClick={() => sfx.tap()}>
          <span className="text-2xl">👤</span>
          PERFIL
        </NavLink>
      </div>
    </nav>
  )
}
