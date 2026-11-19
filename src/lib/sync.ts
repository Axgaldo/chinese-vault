/* ─────────────────────────────────────────────────────────────────────────────
   Sincronización con Firestore (users/{uid} = { progress, updatedAt })

   Estrategia "local-first":
   • El progreso vive en localStorage (zustand persist) y la app siempre funciona.
   • Con Firebase configurado: Auth anónimo automático → cada dispositivo tiene su
     uid; el progreso se sube con debounce tras cada cambio y se adopta el remoto
     solo si es más reciente que el local.
   • "Guardar en la nube" (Perfil) enlaza email/contraseña al uid anónimo para
     recuperar el progreso en otro dispositivo sin perder nada.
   ───────────────────────────────────────────────────────────────────────────── */

import { firebaseEnabled, loadFirebase } from './firebase'
import { progressData, useProgress } from '../stores/useProgress'
import { useAuth } from '../stores/useAuth'
import type { ProgressState } from '../types/progress'

const PUSH_DEBOUNCE_MS = 3000

let uid: string | null = null
let pushTimer: ReturnType<typeof setTimeout> | null = null
/** El próximo inicio de sesión explícito debe priorizar la nube (recuperación de cuenta) */
let cloudPreferred = false

async function pushProgress(db: import('firebase/firestore').Firestore) {
  if (!uid) return
  const data = progressData(useProgress.getState())
  // nunca propagar un reset accidental a la nube
  if (Object.keys(data.completed).length === 0 && Object.keys(data.srs).length === 0 && data.xp === 0) {
    return
  }
  try {
    const { doc, setDoc } = await import('firebase/firestore')
    await setDoc(doc(db, 'users', uid), { progress: data, updatedAt: Date.now() }, { merge: true })
  } catch (err) {
    console.warn('[vault] no se pudo subir el progreso', err)
  }
}

function schedulePush() {
  if (!uid) return
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(() => {
    void loadFirebase().then((fb) => fb && pushProgress(fb.db))
  }, PUSH_DEBOUNCE_MS)
}

/** Se llama desde main.tsx al arrancar la app */
export function initSync() {
  if (!firebaseEnabled) {
    useAuth.getState().markReady()
    return
  }

  void (async () => {
    const fb = await loadFirebase()
    if (!fb) return
    const { auth, db } = fb
    const { onAuthStateChanged, signInAnonymously } = await import('firebase/auth')
    const { doc, getDoc } = await import('firebase/firestore')

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Política: el inicio de sesión EXPLÍCITO con Google prioriza la nube
        // (recuperas tu cuenta tal cual estaba en la base de datos).
        const preferCloud = cloudPreferred && Boolean(user.email)
        cloudPreferred = false
        uid = user.uid
        useAuth
          .getState()
          .set(user.email ? 'account' : 'anon', user.uid, user.email, user.metadata.creationTime)
        void (async () => {
          try {
            const snap = await getDoc(doc(db, 'users', user.uid))
            const remote = snap.data() as { progress?: ProgressState } | undefined
            const local = useProgress.getState()

            // ¿El local está "vacío"? (reset accidental / primera visita en este dispositivo)
            const localEmpty =
              Object.keys(local.completed).length === 0 &&
              Object.keys(local.srs).length === 0 &&
              local.xp === 0

            if (remote?.progress && (preferCloud || (remote.progress.updatedAt ?? 0) > local.updatedAt)) {
              // la nube manda: adoptar (siempre al iniciar sesión explícito con cuenta)
              useProgress.getState().hydrate(remote.progress)
            } else if (localEmpty && remote?.progress) {
              // el local se vació por un accidente pero la nube tiene progreso: RECUPERAR
              console.warn('[vault] local vacío: recuperando progreso desde la nube')
              useProgress.getState().hydrate(remote.progress)
            } else if (!localEmpty) {
              // el local manda (o el remoto no existe): asegurar que la nube se pinta
              schedulePush()
            }
          } catch (err) {
            console.warn('[vault] no se pudo leer el progreso remoto', err)
          }
        })()
      } else {
        // primera visita / sesión cerrada: entra como morador anónimo
        signInAnonymously(auth).catch((err) => {
          console.warn('[vault] auth anónima falló', err)
        })
      }
      useAuth.getState().markReady()
    })
  })()

  // cualquier cambio local → subir (con debounce)
  useProgress.subscribe((state, prev) => {
    if (state.updatedAt !== prev.updatedAt) schedulePush()
  })
}

/** Marca el próximo inicio de sesión como "recuperación de cuenta": la nube prioriza */
export function preferCloudOnNextAuth() {
  cloudPreferred = true
}
