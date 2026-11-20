/* ─────────────────────────────────────────────────────────────────────────────
   Punto de entrada — React 19 + HashRouter (funciona en cualquier hosting
   estático sin rewrites) + sincronización Firebase opcional.
   ───────────────────────────────────────────────────────────────────────────── */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { setAudioRate } from './lib/audio'
import { maybeShowStreakReminder, snoozeStreakReminder, SNOOZE_HOURS } from './lib/notify'
import { initSync } from './lib/sync'
import { initSfx, setSfxEnabled } from './lib/sfx'
import { useProgress } from './stores/useProgress'
import { useToasts } from './stores/useToasts'
import './index.css'

// Aplica los ajustes persistidos (audio/sfx) y escucha cambios
const { audioRate, sfxOn } = useProgress.getState().settings
setAudioRate(audioRate)
setSfxEnabled(sfxOn)
useProgress.subscribe((s, prev) => {
  if (s.settings.audioRate !== prev.settings.audioRate) setAudioRate(s.settings.audioRate)
  if (s.settings.sfxOn !== prev.settings.sfxOn) setSfxEnabled(s.settings.sfxOn)
})

// Sella logros merecidos por estados previos (migraciones) sin toasts múltiples
useProgress.getState().checkAchievements()
// Rueda el día al abrir (racha/encargos de HOY en el Perfil, sin pagar bono)
useProgress.getState().syncDay()

// Desbloqueo del audio del navegador al primer gesto
window.addEventListener('pointerdown', () => initSfx(), { once: true, capture: true })

// Firebase (si hay .env) — auth anónima + sincronización Firestore
initSync()

// Recordatorio de racha ☢: el SW avisa cuando se pospone; se comprueba
// al arrancar, al volver a la app y cada 5 minutos.
navigator.serviceWorker?.addEventListener('message', (event) => {
  if ((event.data as { type?: string } | undefined)?.type === 'snooze-streak') {
    snoozeStreakReminder()
    useToasts.getState().push('😴', `Recordatorio pospuesto ${SNOOZE_HOURS} horas`)
  }
})
const reminderTick = () => void maybeShowStreakReminder()
setTimeout(reminderTick, 15_000)
setInterval(reminderTick, 5 * 60_000)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') reminderTick()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
