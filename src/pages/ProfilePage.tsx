/* ─────────────────────────────────────────────────────────────────────────────
   PERFIL DEL HABITANTE — rango, estadísticas, cuenta de nube y ajustes
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allLessons, seenEntries } from '../content'
import { ACHIEVEMENTS } from '../lib/achievements'
import { speakHanzi } from '../lib/audio'
import { sfx } from '../lib/sfx'
import { firebaseEnabled, loadFirebase } from '../lib/firebase'
import { useProgress } from '../stores/useProgress'
import { useAuth } from '../stores/useAuth'
import { rankFor, type ScriptMode } from '../types/progress'
import { BODY_FONTS, SCRIPT_MODES } from '../types/progress'
import { Btn, Chip, Meter, Panel, Prompt, SectionTitle, Toggle } from '../components/ui'

export function ProfilePage() {
  const navigate = useNavigate()
  const records = useProgress((s) => s.completed)
  const completed = Object.keys(records)
  const xp = useProgress((s) => s.xp)
  const caps = useProgress((s) => s.caps)
  const streak = useProgress((s) => s.streakDays)
  const reviewsDone = useProgress((s) => s.reviewsDone)
  const settings = useProgress((s) => s.settings)
  const setSettings = useProgress((s) => s.setSettings)
  const reset = useProgress((s) => s.reset)
  const { mode, email, uid } = useAuth()

  const [authMsg, setAuthMsg] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const { current: rank, next: nextRank, progress: rankProgress } = rankFor(xp)
  const seenCount = seenEntries(completed).length
  const achievements = useProgress((s) => s.achievements)
  const unlockedCount = Object.keys(achievements).length

  /** Errores de Google Sign-In traducidos al idioma del refugio */
  const googleError = (code: string): string => {
    switch (code) {
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'Ventana cerrada antes de terminar. Inténtalo otra vez.'
      case 'auth/popup-blocked':
        return 'El navegador bloqueó la ventana emergente: permite pop-ups para esta web.'
      case 'auth/operation-not-allowed':
        return 'Proveedor no activado: enciende Google en Authentication → Sign-in method (consola de Firebase).'
      case 'auth/unauthorized-domain':
        return 'Dominio no autorizado: añádelo en Authentication → Settings → Authorized domains.'
      case 'auth/network-request-failed':
        return 'Problema de red al hablar con Google. Revisa tu conexión.'
      default:
        return 'No se pudo completar la operación. Inténtalo de nuevo.'
    }
  }

  /**
   * ENTRAR CON GOOGLE:
   * • si la sesión es anónima → linkWithPopup (mismo uid: el progreso local sube sin perder nada)
   * • si no hay sesión → signInWithPopup (recupera el progreso de la nube en este dispositivo)
   */
  const googleSignIn = async () => {
    const fb = await loadFirebase()
    if (!fb) return
    const { GoogleAuthProvider, linkWithPopup, signInWithPopup } = await import('firebase/auth')
    const provider = new GoogleAuthProvider()
    try {
      const user = fb.auth.currentUser
      if (user?.isAnonymous) {
        await linkWithPopup(user, provider)
        setAuthMsg('Progreso vinculado a tu cuenta de Google ✓ te sigue en cualquier dispositivo')
      } else {
        await signInWithPopup(fb.auth, provider)
        setAuthMsg('Sesión iniciada con Google ✓')
      }
    } catch (err) {
      setAuthMsg(googleError((err as { code?: string })?.code ?? ''))
    }
  }

  const logout = async () => {
    const fb = await loadFirebase()
    if (!fb) return
    const { signOut } = await import('firebase/auth')
    await signOut(fb.auth)
    setAuthMsg('Sesión cerrada. Has vuelto como habitante anónimo (mismo dispositivo).')
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-8">
      <Prompt className="pt-1">▓ PERFIL DEL HABITANTE ▓</Prompt>

      <Panel className="p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-vault-300">{rank.name}</span>
          <Chip className="text-vault-amber">🔥 {streak} días</Chip>
        </div>
        <Meter value={rankProgress} className="mt-2" />
        <p className="mt-1 text-xs text-vault-600">
          {xp} XP{nextRank ? ` · siguiente: ${nextRank.name} (${nextRank.xp - xp} XP)` : ' · rango máximo'}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="chip px-2 py-1">⛓ CHAPAS {caps}</div>
          <div className="chip px-2 py-1">LECCIONES {completed.length}/{allLessons.length}</div>
          <div className="chip px-2 py-1">PALABRAS {seenCount}</div>
          <div className="chip px-2 py-1">REPASOS {reviewsDone}</div>
        </div>
      </Panel>

      <SectionTitle>LOGROS ({unlockedCount}/{ACHIEVEMENTS.length})</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {ACHIEVEMENTS.map((a) => {
          const unlockedAt = achievements[a.id]
          const isUnlocked = Boolean(unlockedAt)
          return (
            <div
              key={a.id}
              className={`panel p-3 ${isUnlocked ? 'border-vault-400' : 'opacity-45'}`}
              title={isUnlocked ? `desbloqueado ${new Date(unlockedAt).toLocaleDateString('es')}` : a.desc}
            >
              <div className={`text-2xl ${isUnlocked ? '' : 'grayscale'}`}>{isUnlocked ? a.emoji : '🔒'}</div>
              <p className={`font-display text-lg ${isUnlocked ? 'text-vault-200 glow' : 'text-vault-500'}`}>{a.title}</p>
              <p className="text-xs text-vault-600">{a.desc}</p>
            </div>
          )
        })}
      </div>

      <SectionTitle>CUENTA Y NUBE</SectionTitle>
      <Panel className="p-4">
        {!firebaseEnabled && (
          <p className="text-sm text-vault-500">
            MODO LOCAL — tu progreso vive en este dispositivo (localStorage). Para sincronizarlo entre
            dispositivos, crea un proyecto gratuito de Firebase (plan Spark) y pega tus claves en{' '}
            <code>.env</code>. Consulta el README del repo.
          </p>
        )}

        {firebaseEnabled && mode === 'account' && (
          <div className="space-y-2">
            <p className="text-sm">
              CUENTA DE GOOGLE: <span className="text-vault-300">{email}</span>
            </p>
            <Btn variant="amber" className="w-full" onClick={() => void logout()}>
              CERRAR SESIÓN
            </Btn>
          </div>
        )}

        {firebaseEnabled && mode === 'anon' && (
          <div className="space-y-2">
            <p className="text-sm text-vault-500">
              HABITANTE ANÓNIMO ({uid?.slice(0, 8)}) — el progreso se guarda en la nube con ese id.
              Entra con Google para llevarlo a cualquier dispositivo (sin perder nada):
            </p>
            <Btn className="w-full" onClick={() => void googleSignIn()}>
              <span className="mr-2">🔴</span> ENTRAR CON GOOGLE ▸
            </Btn>
          </div>
        )}

        {authMsg && <p className="mt-2 text-sm text-vault-400">{authMsg}</p>}
      </Panel>

      <SectionTitle>AJUSTES DEL TERMINAL</SectionTitle>
      <Panel className="space-y-3 p-4">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Velocidad del audio</span>
            <span className="font-display text-lg text-vault-300">{settings.audioRate.toFixed(2)}×</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="range"
              min={0.6}
              max={1.2}
              step={0.05}
              value={settings.audioRate}
              className="flex-1 accent-vault-400"
              onChange={(e) => setSettings({ audioRate: Number(e.target.value) })}
            />
            <Btn onClick={() => speakHanzi('你好，中文')} className="px-2 py-1 text-lg">
              🔊
            </Btn>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-vault-700 pt-3">
          <span className="text-sm">
            Modo de escritura
            <span className="block text-xs text-vault-600">
              rota también con el botón 拼/漢 de la cabecera de cada lección
            </span>
          </span>
          <Btn
            className="px-3 py-1 text-xl"
            onClick={() => {
              const order: ScriptMode[] = ['pinyin', 'both', 'hanzi']
              setSettings({ scriptMode: order[(order.indexOf(settings.scriptMode) + 1) % order.length] })
            }}
            title="rotar modo"
          >
            {SCRIPT_MODES.find((m) => m.mode === settings.scriptMode)?.icon}
          </Btn>
        </div>

        <div className="border-t border-vault-700 pt-3">
          <Toggle
            label="Efectos de sonido retro"
            on={settings.sfxOn}
            onToggle={() => setSettings({ sfxOn: !settings.sfxOn })}
          />
        </div>

        <div className="border-t border-vault-700 pt-3">
          <Toggle
            label="👁 Modo Supervisor"
            hint="libre: desbloquea todas las lecciones y sectores"
            teal={true}
            on={settings.adminMode}
            onToggle={() => setSettings({ adminMode: !settings.adminMode })}
          />
        </div>
      </Panel>

      <SectionTitle>APARIENCIA DEL TERMINAL</SectionTitle>
      <Panel className="space-y-3 p-4">
        <Toggle
          label="Ultra-oscuro"
          hint="negro puro y verde fósforo: contraste máximo"
          on={settings.contrast}
          onToggle={() => setSettings({ contrast: !settings.contrast })}
        />
        <div className="border-t border-vault-700 pt-3">
          <Toggle
            label="Efecto CRT"
            hint="scanlines, viñeta, barrido y parpadeo"
            on={settings.crt}
            onToggle={() => setSettings({ crt: !settings.crt })}
          />
        </div>
        <div className="flex items-center justify-between border-t border-vault-700 pt-3">
          <span className="text-sm">
            Letra del texto general
          </span>
          <div className="flex gap-1">
            {BODY_FONTS.map((f) => (
              <button
                key={f.font}
                type="button"
                className={`choice rounded px-2.5 py-1 font-display text-sm ${
                  settings.bodyFont === f.font ? 'choice-selected text-vault-300' : 'text-vault-600'
                }`}
                onClick={() => {
                  sfx.tap()
                  setSettings({ bodyFont: f.font })
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <SectionTitle>ZONA PELIGROSA</SectionTitle>
      <Panel className="p-4">
        {confirmReset ? (
          <div className="space-y-2">
            <p className="text-sm text-vault-red">Se borrará TODO el progreso local. ¿Seguro?</p>
            <div className="flex gap-2">
              <Btn
                variant="amber"
                className="flex-1"
                onClick={() => {
                  reset()
                  setConfirmReset(false)
                  navigate('/')
                }}
              >
                BORRAR TODO ✗
              </Btn>
              <Btn className="flex-1" onClick={() => setConfirmReset(false)}>
                CANCELAR
              </Btn>
            </div>
          </div>
        ) : (
          <Btn variant="amber" className="w-full" onClick={() => setConfirmReset(true)}>
            ⚠ BORRAR PROGRESO
          </Btn>
        )}
      </Panel>

      <p className="text-center text-xs text-vault-600">
        Chinese Vault · MIT · hecho por y para Antonio Galdó Seiquer
      </p>
    </div>
  )
}
