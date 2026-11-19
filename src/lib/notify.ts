/* ─────────────────────────────────────────────────────────────────────────────
   Recordatorio de racha ☢ (notificaciones locales de la PWA)

   "El refugio te necesita": unas 8 h antes de medianoche, si tienes racha
   activa y aún no has estudiado hoy, la app avisa con una notificación del
   sistema (Android/PWA instalada). El botón "Posponer 3 h" aplaza el aviso.
   Sin servidores: se comprueba al abrir la app, al volver a ella y cada
   5 minutos mientras está abierta o en segundo plano.
   ───────────────────────────────────────────────────────────────────────────── */

import { useProgress } from '../stores/useProgress'

const SNOOZE_KEY = 'cv-snooze-until'
const SHOWN_KEY = 'cv-streak-notified-at'
/** Horas antes de medianoche para empezar a avisar */
const REMIND_HOURS_BEFORE = 8
/** Horas que aplaza el botón "Posponer" */
export const SNOOZE_HOURS = 3
/** Reavisar como muy pronto cada X minutos (si no se pospone) */
const RESHOW_MINUTES = 30

export function notificationsSupported(): boolean {
  return typeof Notification !== 'undefined' && 'serviceWorker' in navigator
}

export function notificationPermission(): NotificationPermission | 'unsupported' {
  if (!notificationsSupported()) return 'unsupported'
  return Notification.permission
}

/** Pide permiso (llamar SIEMPRE desde un gesto del usuario) */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!notificationsSupported()) return 'denied'
  if (Notification.permission === 'granted') return 'granted'
  return Notification.requestPermission()
}

/** Próxima medianoche local (cuando se apaga la racha) */
function nextMidnight(): number {
  const d = new Date()
  d.setHours(24, 0, 0, 0)
  return d.getTime()
}

function remindAt(): number {
  return nextMidnight() - REMIND_HOURS_BEFORE * 3_600_000
}

/** Aplaza el recordatorio (lo llama el botón de la notificación vía SW) */
export function snoozeStreakReminder() {
  localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_HOURS * 3_600_000))
}

function localISO(): string {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

async function showStreakNotification(streak: number): Promise<void> {
  const reg = await navigator.serviceWorker.ready
  const icon = `${import.meta.env.BASE_URL}icon-192.png`
  // 'actions' no está en el tipo DOM de TS pero los navegadores lo soportan
  // en registration.showNotification (los botones de la notificación).
  const options = {
    body:
      `Tu racha de ${streak} ${streak === 1 ? 'día' : 'días'} se apaga a medianoche. ` +
      'Una lección rápida y el Overseer duerme tranquilo.',
    icon,
    badge: icon,
    tag: 'cv-streak',
    actions: [
      { action: 'snooze', title: `Posponer ${SNOOZE_HOURS} h` },
      { action: 'open', title: 'A entrenar' },
    ],
  } as NotificationOptions
  await reg.showNotification('El refugio te necesita ☢', options)
}

/** Comprueba si toca avisar y muestra la notificación (llamado periódicamente) */
export async function maybeShowStreakReminder(): Promise<void> {
  if (!notificationsSupported()) return
  if (Notification.permission !== 'granted') return

  const s = useProgress.getState()
  if (!s.settings.streakReminder) return
  if (s.streakDays < 1) return
  if (s.lastStudyDay === localISO()) return // hoy ya se ha estudiado

  const now = Date.now()
  if (now < remindAt()) return // aún no toca
  const snoozeUntil = Number(localStorage.getItem(SNOOZE_KEY) ?? 0)
  if (now < snoozeUntil) return // pospuesto
  const shownAt = Number(localStorage.getItem(SHOWN_KEY) ?? 0)
  if (now < shownAt + RESHOW_MINUTES * 60_000) return // ya avisado hace poco

  localStorage.setItem(SHOWN_KEY, String(now))
  try {
    await showStreakNotification(s.streakDays)
  } catch (err) {
    console.warn('[vault] no se pudo mostrar el recordatorio', err)
  }
}
