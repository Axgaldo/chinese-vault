/* ─────────────────────────────────────────────────────────────────────────────
   Service Worker de CHINESE VAULT (injectManifest)

   - Precachea toda la app (manifest que inyecta vite-plugin-pwa).
   - Atiende el clic de la notificación de racha: "Posponer 3 h" avisa a la
     app abierta (o la abre) y "A entrenar" la enfoca.
   ───────────────────────────────────────────────────────────────────────────── */

import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

/** Tipos mínimos del entorno SW (fuera del DOM) */
interface SWClient {
  postMessage(data: unknown): void
  focus?(): Promise<unknown>
}
interface SWSelf {
  __WB_MANIFEST: { url: string; revision: string | null }[]
  skipWaiting(): Promise<void>
  clients: {
    matchAll(opts?: { type?: string }): Promise<SWClient[]>
    openWindow(url: string): Promise<SWClient | undefined>
  }
  addEventListener(
    type: string,
    cb: (event: {
      data?: unknown
      notification: { close(): void }
      action?: string
      waitUntil(p: Promise<unknown>): void
    }) => void,
  ): void
}

/** El `self` del service worker (sombrea el del DOM) */
declare const self: SWSelf

/* Precache de la app completa (shell + fuentes + audio del curso) */
// (la referencia literal self.__WB_MANIFEST es donde vite-plugin-pwa inyecta la lista)
precacheAndRoute(self.__WB_MANIFEST)

/* Fuentes de Google (CacheFirst, un año) */
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [new ExpirationPlugin({ maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 })],
  }),
)

/* Activación de la nueva versión cuando toque */
self.addEventListener('message', (event) => {
  if ((event.data as { type?: string } | undefined)?.type === 'SKIP_WAITING') {
    void self.skipWaiting()
  }
})

/* Clic en las notificaciones (recordatorio de racha) */
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const action = event.action
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      if (action === 'snooze') {
        // posponer: la app abierta guarda el aplazamiento; si no hay, se abre
        clients.forEach((c) => c.postMessage({ type: 'snooze-streak' }))
        if (!clients.length) return self.clients.openWindow('/')
        return undefined
      }
      const focusable = clients.find((c) => typeof c.focus === 'function')
      if (focusable?.focus) return focusable.focus()
      return self.clients.openWindow('/')
    }),
  )
})
