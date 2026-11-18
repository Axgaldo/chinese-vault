/* ─────────────────────────────────────────────────────────────────────────────
   Punto de entrada — React 19 + HashRouter (funciona en cualquier hosting
   estático sin rewrites) + sincronización Firebase opcional.
   ───────────────────────────────────────────────────────────────────────────── */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { setAudioRate } from './lib/audio'
import { initSync } from './lib/sync'
import { initSfx, setSfxEnabled } from './lib/sfx'
import { useProgress } from './stores/useProgress'
import './index.css'

// Aplica los ajustes persistidos (audio/sfx) y escucha cambios
const { audioRate, sfxOn } = useProgress.getState().settings
setAudioRate(audioRate)
setSfxEnabled(sfxOn)
useProgress.subscribe((s, prev) => {
  if (s.settings.audioRate !== prev.settings.audioRate) setAudioRate(s.settings.audioRate)
  if (s.settings.sfxOn !== prev.settings.sfxOn) setSfxEnabled(s.settings.sfxOn)
})

// Desbloqueo del audio del navegador al primer gesto
window.addEventListener('pointerdown', () => initSfx(), { once: true, capture: true })

// Firebase (si hay .env) — auth anónima + sincronización Firestore
initSync()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
