/* ─────────────────────────────────────────────────────────────────────────────
   PERFIL DEL HABITANTE — rango, estadísticas, cuenta de nube y ajustes
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Auth } from 'firebase/auth'
import { allLessons, seenEntries } from '../content'
import { ACHIEVEMENTS } from '../lib/achievements'
import { speakHanzi } from '../lib/audio'
import { firebaseEnabled, loadFirebase } from '../lib/firebase'
import { useProgress } from '../stores/useProgress'
import { useAuth } from '../stores/useAuth'
import { rankFor } from '../types/progress'
import { Btn, Chip, Meter, Panel, Prompt, SectionTitle } from '../components/ui'

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

  const [mailInput, setMailInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const [authMsg, setAuthMsg] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const { current: rank, next: nextRank, progress: rankProgress } = rankFor(xp)
  const seenCount = seenEntries(completed).length
  const achievements = useProgress((s) => s.achievements)
  const unlockedCount = Object.keys(achievements).length

  const authError = (code: string): string => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Ese email ya tiene cuenta: usa ENTRAR con tus datos.'
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Email o contraseña incorrectos.'
      case 'auth/invalid-email':
        return 'Ese email no parece válido.'
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.'
      default:
        return 'No se pudo completar la operación. Inténtalo de nuevo.'
    }
  }

  const linkAccount = async () => {
    const fb = await loadFirebase()
    if (!fb) return
    const a = fb.auth
    const { EmailAuthProvider, linkWithCredential, signInWithEmailAndPassword } = await import('firebase/auth')
    try {
      const cred = EmailAuthProvider.credential(mailInput, passInput)
      const user = a.currentUser
      if (user?.isAnonymous) {
        await linkWithCredential(user, cred)
        setAuthMsg('Progreso vinculado a tu cuenta ✓ ya puedes entrar desde otro dispositivo')
      } else if (!user) {
        await signInWithEmailAndPassword(a, mailInput, passInput)
        setAuthMsg('Sesión iniciada ✓')
      } else {
        setAuthMsg('Ya tienes cuenta guardada en la nube.')
      }
      setPassInput('')
    } catch (err) {
      setAuthMsg(authError((err as { code?: string })?.code ?? ''))
    }
  }

  const login = async () => {
    const fb = await loadFirebase()
    if (!fb) return
    const a: Auth = fb.auth
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    try {
      await signInWithEmailAndPassword(a, mailInput, passInput)
      setAuthMsg('Sesión iniciada ✓')
      setPassInput('')
    } catch (err) {
      setAuthMsg(authError((err as { code?: string })?.code ?? ''))
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
              CUENTA EN LA NUBE: <span className="text-vault-300">{email}</span>
            </p>
            <Btn variant="amber" className="w-full" onClick={() => void logout()}>
              CERRAR SESIÓN
            </Btn>
          </div>
        )}

        {firebaseEnabled && mode === 'anon' && (
          <div className="space-y-2">
            <p className="text-sm text-vault-500">
              HABITANTE ANÓNIMO ({uid?.slice(0, 8)}) — el progreso se guarda en la nube con ese id. Vincula
              un email para recuperarlo en otro dispositivo:
            </p>
            <input
              type="email"
              className="choice choice-selected w-full rounded px-3 py-2 text-vault-100 outline-none"
              placeholder="tu@email.com"
              value={mailInput}
              onChange={(e) => setMailInput(e.target.value)}
              autoComplete="email"
            />
            <input
              type="password"
              className="choice choice-selected w-full rounded px-3 py-2 text-vault-100 outline-none"
              placeholder="contraseña (mín. 6)"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              autoComplete="new-password"
            />
            <div className="flex gap-2">
              <Btn className="flex-1" onClick={() => void linkAccount()} disabled={!mailInput || !passInput}>
                VINCULAR ✓
              </Btn>
              <Btn variant="amber" className="flex-1" onClick={() => void login()} disabled={!mailInput || !passInput}>
                ENTRAR
              </Btn>
            </div>
          </div>
        )}

        {authMsg && <p className="mt-2 text-sm text-vault-400">{authMsg}</p>}
      </Panel>

      <SectionTitle>AJUSTES DEL TERMINAL</SectionTitle>
      <Panel className="space-y-4 p-4">
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

        <label className="flex items-center justify-between">
          <span className="text-sm">
            Modo hanzi en los retos
            <span className="block text-xs text-vault-600">desactivado = pinyin puro (también cambia con 拼/漢 arriba)</span>
          </span>
          <input
            type="checkbox"
            checked={settings.showHanzi}
            className="h-5 w-5 accent-vault-400"
            onChange={(e) => setSettings({ showHanzi: e.target.checked })}
          />
        </label>

        <label className="flex items-center justify-between">
          <span className="text-sm">
            Efectos de sonido retro
          </span>
          <input
            type="checkbox"
            checked={settings.sfxOn}
            className="h-5 w-5 accent-vault-400"
            onChange={(e) => setSettings({ sfxOn: e.target.checked })}
          />
        </label>

        <label className="flex items-center justify-between border-t border-vault-700 pt-3">
          <span className="text-sm">
            👁 Modo Supervisor
            <span className="block text-xs text-vault-600">libre: desbloquea todas las lecciones y sectores</span>
          </span>
          <input
            type="checkbox"
            checked={settings.adminMode}
            className="h-5 w-5 accent-vault-teal"
            onChange={(e) => setSettings({ adminMode: e.target.checked })}
          />
        </label>
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
