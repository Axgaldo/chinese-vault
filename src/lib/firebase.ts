/* ─────────────────────────────────────────────────────────────────────────────
   Firebase — plan Spark (gratuito, sin tarjeta): Auth anónimo + Firestore.

   El SDK se carga como chunk diferenciado SOLO si hay .env configurado:
   sin claves, la app es 100% local y no descarga nada de Firebase.
   ───────────────────────────────────────────────────────────────────────────── */

import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

const cfg = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
}

/** ¿El usuario configuró .env con las claves de Firebase? */
export const firebaseEnabled = Boolean(cfg.apiKey && cfg.projectId && cfg.appId)

let loaded: Promise<{ auth: Auth; db: Firestore } | null> | null = null

/** Carga perezosa del SDK (una sola vez). Sin .env → null inmediato. */
export function loadFirebase(): Promise<{ auth: Auth; db: Firestore } | null> {
  if (!firebaseEnabled) return Promise.resolve(null)
  return (loaded ??= (async () => {
    const [{ initializeApp }, { getAuth }, { getFirestore }] = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/firestore'),
    ])
    const app = initializeApp(cfg)
    return { auth: getAuth(app), db: getFirestore(app) }
  })())
}
