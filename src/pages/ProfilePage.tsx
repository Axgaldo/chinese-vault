/* ─────────────────────────────────────────────────────────────────────────────
   PERFIL DEL HABITANTE — rango, estadísticas, cuenta de nube y ajustes
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { OAuthCredential } from 'firebase/auth'
import { allLessons, modules, seenEntries } from '../content'
import { ACHIEVEMENTS } from '../lib/achievements'
import { speakHanzi } from '../lib/audio'
import { sfx } from '../lib/sfx'
import { firebaseEnabled, loadFirebase } from '../lib/firebase'
import { preferCloudOnNextAuth } from '../lib/sync'
import { APP_VERSION, GITHUB_URL, GITHUB_USER } from '../lib/version'
import { useProgress } from '../stores/useProgress'
import { useAuth } from '../stores/useAuth'
import { rankFor, SCRIPT_MODES, type ScriptMode, VFX_OPTIONS } from '../types/progress'
import { BODY_FONTS } from '../types/progress'
import { THEMES } from '../lib/shop'
import { Btn, Chip, GithubMark, Meter, Panel, Prompt, SectionTitle, Toggle } from '../components/ui'

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
  const { mode, email, uid, ready } = useAuth()

  const [authMsg, setAuthMsg] = useState<string | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  const { current: rank, next: nextRank, progress: rankProgress } = rankFor(xp)
  const seenCount = seenEntries(completed).length
  const achievements = useProgress((s) => s.achievements)
  const unlockedCount = Object.keys(achievements).length
  const anonCreatedAt = useAuth((s) => s.anonCreatedAt)
  const history = useProgress((s) => s.history)
  const bestStreak = useProgress((s) => s.bestStreak)
  const ownedVfx = useProgress((s) => s.ownedVfx)
  const ownedFonts = useProgress((s) => s.ownedFonts)
  const ownedThemes = useProgress((s) => s.ownedThemes)
  const equipVfx = useProgress((s) => s.equipVfx)
  const equipFont = useProgress((s) => s.equipFont)
  const equipTheme = useProgress((s) => s.equipTheme)
  const adminMode = useProgress((s) => s.settings.adminMode)

  /** Días que le quedan a la cuenta anónima (Firebase la borra a los 30) */
  const anonDaysLeft = (() => {
    if (!anonCreatedAt) return null
    const msLeft = new Date(anonCreatedAt).getTime() + 30 * 86_400_000 - Date.now()
    return Math.ceil(msLeft / 86_400_000)
  })()

  /** Estadísticas del refugio */
  const threeStars = Object.values(records).filter((r) => r.stars >= 3).length
  const avgAccuracy = (() => {
    const accs = Object.values(records).map((r) => r.accuracy)
    return accs.length ? accs.reduce((a, b) => a + b, 0) / accs.length : null
  })()
  const last14Days = (() => {
    const days: string[] = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const p = (n: number) => String(n).padStart(2, '0')
      days.push(`${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`)
    }
    return days
  })()
  const sectorAccuracy = modules
    .map((m) => {
      const doneRecords = m.lessons
        .filter((l) => l.id in records)
        .map((l) => records[l.id])
      return {
        code: m.code,
        name: m.title,
        done: doneRecords.length,
        total: m.lessons.length,
        accuracy: doneRecords.length
          ? doneRecords.reduce((a, r) => a + r.accuracy, 0) / doneRecords.length
          : 0,
      }
    })
    .filter((s) => s.done > 0)

  /** Errores de Google Sign-In traducidos al idioma del refugio (el código va SIEMPRE
   *  visible entre paréntesis para poder diagnosticar) */
  const googleError = (code: string): string => {
    switch (code) {
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'Ventana cerrada antes de terminar. Inténtalo otra vez.'
      case 'auth/popup-blocked':
        return 'Sin pop-ups disponibles: la app redirigirá a Google automáticamente.'
      case 'auth/operation-not-allowed':
      case 'auth/configuration-not-found':
        return 'Proveedor Google no activo: enciéndelo en Authentication → Sign-in method (consola de Firebase).'
      case 'auth/unauthorized-domain':
        return 'Dominio no autorizado: añádelo en Authentication → Settings → Authorized domains.'
      case 'auth/credential-already-in-use':
        return 'Ese Google ya pertenece a una cuenta: se entrará a la existente.'
      case 'auth/api-key-not-valid':
        return 'Las claves del .env no son válidas: revisa la config de tu app web en Firebase.'
      case 'auth/network-request-failed':
        return 'Problema de red al hablar con Google. Revisa tu conexión.'
      case 'auth/internal-error':
        return 'Error interno de Firebase. Suele resolverse esperando un minuto y reintentando.'
      default:
        return 'No se pudo completar la operación.'
    }
  }

  /**
   * ENTRAR CON GOOGLE (flujo a prueba de popups):
   * • sesión anónima → VINCULAR. Si ese Google ya tiene cuenta, el propio popup ya
   *   autenticó al usuario → se reutiliza SU credencial (signInWithCredential,
   *   sin abrir un segundo popup).
   * • si el navegador BLOQUEA la ventana → REDIRECCIÓN a Google (página entera,
   *   cero pop-ups; la sesión se completa al volver de la recarga).
   * • al ENTRAR a una cuenta existente, la NUBE PRIORIZA (flag en sessionStorage:
   *   sobrevive al viaje de ida y vuelta del redirect).
   */
  const googleSignIn = async () => {
    const fb = await loadFirebase()
    if (!fb) return
    const {
      GoogleAuthProvider,
      linkWithPopup,
      linkWithRedirect,
      signInWithCredential,
      signInWithPopup,
      signInWithRedirect,
    } = await import('firebase/auth')
    const provider = new GoogleAuthProvider()
    try {
      const user = fb.auth.currentUser
      if (user && !user.isAnonymous) {
        // ya hay sesión activa: simplemente refrescar el estado de la UI
        useAuth.getState().set('account', user.uid, user.email, user.metadata.creationTime)
        setAuthMsg(`Ya tienes sesión activa como ${user.email} ✓`)
        return
      }
      if (user?.isAnonymous) {
        try {
          await linkWithPopup(user, provider)
        } catch (err) {
          const code = (err as { code?: string }).code ?? ''
          if (code === 'auth/credential-already-in-use') {
            // ese Google ya pertenece a una cuenta: la credencial del popup SIRVE
            const credential = (err as { customData?: { credential?: OAuthCredential } })
              .customData?.credential
            preferCloudOnNextAuth()
            if (credential) {
              await signInWithCredential(fb.auth, credential)
            } else {
              await signInWithPopup(fb.auth, provider)
            }
          } else if (code === 'auth/popup-blocked') {
            setAuthMsg('Ventana bloqueada: redirigiendo a Google… (la app se recargará)')
            await linkWithRedirect(user, provider)
          } else {
            throw err
          }
        }
      } else {
        preferCloudOnNextAuth()
        try {
          await signInWithPopup(fb.auth, provider)
        } catch (err) {
          if ((err as { code?: string }).code === 'auth/popup-blocked') {
            setAuthMsg('Ventana bloqueada: redirigiendo a Google… (la app se recargará)')
            await signInWithRedirect(fb.auth, provider)
          } else {
            throw err
          }
        }
      }
      // aplicar el estado de sesión inmediatamente
      const u = fb.auth.currentUser
      if (u) {
        useAuth.getState().set(u.email ? 'account' : 'anon', u.uid, u.email, u.metadata.creationTime)
      }
      setAuthMsg('Progreso sincronizado con Google ✓ ya te sigue en cualquier dispositivo')
    } catch (err) {
      const code = (err as { code?: string })?.code ?? 'desconocido'
      setAuthMsg(`${googleError(code)} (${code})`)
    }
  }

  const logout = async () => {
    const fb = await loadFirebase()
    if (!fb) return
    const { signOut } = await import('firebase/auth')
    await signOut(fb.auth)
    setAuthMsg('Sesión cerrada. Has vuelto como morador anónimo (mismo dispositivo).')
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-8">
      <Prompt className="pt-1">▓ PERFIL DEL MORADOR ▓</Prompt>

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

      <SectionTitle>REGISTRO DEL REFUGIO</SectionTitle>
      <Panel className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="chip px-2 py-1">⚡ XP {xp}</div>
          <div className="chip px-2 py-1">⛓ CHAPAS {caps}</div>
          <div className="chip px-2 py-1">
            🔥 {streak} (RÉCORD {bestStreak})
          </div>
          <div className="chip px-2 py-1">⭐ 3★ {threeStars}</div>
          <div className="chip px-2 py-1">
            🎯 PRECISIÓN {avgAccuracy !== null ? `${Math.round(avgAccuracy * 100)}%` : '—'}
          </div>
          <div className="chip px-2 py-1">📡 REPASOS {reviewsDone}</div>
        </div>

        {/* Calor de los últimos 14 días */}
        <div>
          <p className="mb-1 text-xs text-vault-500">ACTIVIDAD · últimos 14 días</p>
          <div className="flex items-end gap-1">
            {last14Days.map((day) => {
              const xpDay = history[day]?.xp ?? 0
              return (
                <div
                  key={day}
                  title={`${day} · ${xpDay} XP`}
                  className="h-6 flex-1 rounded-sm border border-vault-700"
                  style={{
                    background:
                      xpDay > 0
                        ? `color-mix(in srgb, var(--color-vault-400) ${Math.min(100, 25 + xpDay)}%, #000)`
                        : undefined,
                    opacity: xpDay > 0 ? 1 : 0.25,
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Precisión por sector */}
        {sectorAccuracy.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-vault-500">PRECISIÓN POR SECTOR</p>
            {sectorAccuracy.map(({ code, name, accuracy, done, total }) => (
              <div key={code} className="flex items-center gap-2">
                <span className="w-14 shrink-0 font-display text-sm text-vault-400">{code}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between text-xs text-vault-600">
                    <span className="truncate">{name}</span>
                    <span>
                      {done}/{total} · {Math.round(accuracy * 100)}%
                    </span>
                  </div>
                  <Meter value={accuracy} className="mt-0.5 h-2!" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <SectionTitle>CUENTA Y NUBE</SectionTitle>
      <Panel className="p-4">
        {!firebaseEnabled && (
          <p className="text-sm text-vault-500">
            MODO LOCAL — tu progreso vive en este dispositivo (localStorage). Para sincronizarlo entre
            dispositivos, crea un proyecto gratuito de Firebase (plan Spark) y pega tus claves en{' '}
            <code>.env</code>. Consulta el README del repo.
          </p>
        )}

        {firebaseEnabled && !ready && (
          <p className="text-sm text-vault-600">conectando con la nube…</p>
        )}

        {firebaseEnabled && ready && mode === 'account' && (
          <div className="space-y-2">
            <p className="text-sm">
              CUENTA DE GOOGLE: <span className="text-vault-300">{email}</span>
            </p>
            <Btn variant="amber" className="w-full" onClick={() => void logout()}>
              CERRAR SESIÓN
            </Btn>
          </div>
        )}

        {firebaseEnabled && ready && mode === 'anon' && (
          <div className="space-y-2">
            <p className="text-sm text-vault-500">
              MORADOR ANÓNIMO ({uid?.slice(0, 8)}) — el progreso se guarda en la nube con ese id.
              Entra con Google para llevarlo a cualquier dispositivo (sin perder nada):
            </p>
            {anonDaysLeft !== null && (
              <p className="text-sm text-vault-amber">
                ⚠ tu morador anónimo{' '}
                {anonDaysLeft > 0 ? (
                  <>
                    caduca en <span className="font-display text-lg">{anonDaysLeft}</span> día
                    {anonDaysLeft === 1 ? '' : 's'}
                  </>
                ) : (
                  'caduca HOY'
                )}{' '}
                — Firebase lo borrará: entra con Google para hacerlo permanente
              </p>
            )}
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
          label="Alto contraste"
          hint="todo el texto en blanco sobre negro (accesibilidad)"
          on={settings.highContrast}
          onToggle={() => setSettings({ highContrast: !settings.highContrast })}
        />

        <div className="border-t border-vault-700 pt-3">
          <p className="mb-1 text-sm">Tema del terminal</p>
          <div className="flex flex-wrap gap-1">
            {THEMES.filter((t) => adminMode || ownedThemes.includes(t.id)).map((t) => (
              <button
                key={t.id}
                type="button"
                title={t.desc}
                className={`choice flex items-center gap-1.5 rounded px-2.5 py-1 font-display text-sm ${
                  settings.theme === t.id ? 'choice-selected text-vault-300' : 'text-vault-600'
                }`}
                onClick={() => {
                  sfx.tap()
                  equipTheme(t.id)
                }}
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full border border-vault-700"
                  style={{ background: t.swatch }}
                />
                {t.name}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-vault-600">
            {adminMode ? '👁 supervisor: todo el catálogo a mano' : 'los temas faltantes se compran en la Tienda'}
          </p>
        </div>

        <div className="border-t border-vault-700 pt-3">
          <p className="mb-1 text-sm">VFX del terminal</p>
          <div className="flex flex-wrap gap-1">
            {VFX_OPTIONS.filter((v) => adminMode || ownedVfx.includes(v.id)).map((v) => (
              <button
                key={v.id}
                type="button"
                className={`choice rounded px-2.5 py-1 font-display text-sm ${
                  settings.vfx === v.id ? 'choice-selected text-vault-300' : 'text-vault-600'
                }`}
                onClick={() => {
                  sfx.tap()
                  equipVfx(v.id)
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-vault-600">
            {adminMode ? '👁 supervisor: todo desbloqueado para probar' : 'los VFX faltantes se compran en la Tienda'}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-vault-700 pt-3">
          <span className="text-sm">
            Letra del texto general
            <span className="block text-xs text-vault-600">
              {adminMode ? '👁 supervisor: todas las letras a mano' : 'las letras faltantes, en la Tienda'}
            </span>
          </span>
          <div className="flex flex-wrap justify-end gap-1">
            {BODY_FONTS.filter((f) => adminMode || ownedFonts.includes(f.font)).map((f) => (
              <button
                key={f.font}
                type="button"
                className={`choice rounded px-2.5 py-1 font-display text-sm ${
                  settings.bodyFont === f.font ? 'choice-selected text-vault-300' : 'text-vault-600'
                }`}
                onClick={() => {
                  sfx.tap()
                  equipFont(f.font)
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="border-t border-vault-700 pt-3 text-xs text-vault-600">
          temas, letras y VFX sin comprar se consiguen en la Tienda del Refugio
        </p>
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

      <div className="flex flex-col items-center gap-1 text-center">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-vault-400 hover:text-vault-100"
        >
          <GithubMark />
          {GITHUB_USER}
        </a>
        <p className="text-xs text-vault-600">Chinese Vault · MIT · {APP_VERSION}</p>
      </div>
    </div>
  )
}
