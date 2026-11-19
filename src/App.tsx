/* ─────────────────────────────────────────────────────────────────────────────
   CHINESE VAULT — shell de la app
   Móvil-first (max 460px centrado) con VFX (CRT por defecto).
   La barra de navegación se oculta durante las lecciones (modo inmersivo).
   ───────────────────────────────────────────────────────────────────────────── */

import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BootScreen } from './components/BootScreen'
import { NavBar } from './components/NavBar'
import { SideBar } from './components/SideBar'
import { useToasts } from './stores/useToasts'
import { useProgress } from './stores/useProgress'
import { ArchivePage } from './pages/ArchivePage'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'
import { ProfilePage } from './pages/ProfilePage'
import { RadioPage } from './pages/RadioPage'
import { ReviewPage } from './pages/ReviewPage'
import { ShopPage } from './pages/ShopPage'

/** Clave compartida con BootScreen (primera visita) */
const BOOT_KEY = 'cv-boot-v1'

/** Avisos flotantes: logros, chapas… */
function ToastStack() {
  const toasts = useToasts((s) => s.toasts)
  if (!toasts.length) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[95] mx-auto flex max-w-[460px] flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div key={t.id} className="panel panel-solid pop-in px-4 py-2 text-center">
          <span className="mr-2 text-xl">{t.emoji}</span>
          <span className="font-display text-lg tracking-wider text-vault-200 glow">{t.text}</span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const [booted, setBooted] = useState(() => Boolean(localStorage.getItem(BOOT_KEY)))
  const inLesson = location.pathname.startsWith('/lesson')

  // Apariencia del terminal (tema/fuente/VFX/alto contraste — tienda y perfil)
  const bodyFont = useProgress((s) => s.settings.bodyFont)
  const theme = useProgress((s) => s.settings.theme)
  const vfx = useProgress((s) => s.settings.vfx)
  const highContrast = useProgress((s) => s.settings.highContrast)

  useEffect(() => {
    const el = document.documentElement
    el.dataset.font = bodyFont
    el.dataset.theme = theme
    el.dataset.vfx = vfx
    el.classList.toggle('cv-highcontrast', highContrast)
  }, [bodyFont, theme, vfx, highContrast])

  return (
    <>
      {/* capa CRT global (VFX) */}
      {vfx === 'crt' && (
        <>
          <div className="crt-overlay" aria-hidden />
          <div className="crt-vignette" aria-hidden />
          <div className="crt-sweep" aria-hidden />
        </>
      )}

      {/* carcasa: móvil (columna) · escritorio ≥lg (sidebar + contenido) */}
      <div
        className={`relative mx-auto flex min-h-dvh w-full max-w-[460px] flex-col md:max-w-[560px] md:border-x md:border-vault-800 lg:grid lg:max-w-5xl lg:grid-cols-[260px_1fr] lg:border-x lg:border-vault-800 ${
          vfx === 'crt' ? 'crt-flicker' : ''
        } ${vfx === 'glitch' ? 'vfx-glitch' : ''} ${vfx === 'neon' ? 'vfx-neon' : ''}`}
      >
        <SideBar className="hidden lg:flex" />
        <div className="flex min-h-dvh flex-1 flex-col">
          <main className="mx-auto flex w-full max-w-xl flex-1 flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lesson/:lessonId" element={<LessonPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/radio" element={<RadioPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          {!inLesson && <NavBar className="lg:hidden" />}
        </div>
      </div>

      <ToastStack />
      {!booted && <BootScreen onHide={() => setBooted(true)} />}
    </>
  )
}
