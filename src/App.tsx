/* ─────────────────────────────────────────────────────────────────────────────
   CHINESE VAULT — shell de la app
   Móvil-first (max 460px centrado), con overlay CRT (scanlines + viñeta).
   La barra de navegación se oculta durante las lecciones (modo inmersivo).
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BootScreen } from './components/BootScreen'
import { NavBar } from './components/NavBar'
import { ArchivePage } from './pages/ArchivePage'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'
import { ProfilePage } from './pages/ProfilePage'
import { ReviewPage } from './pages/ReviewPage'

/** Clave compartida con BootScreen (primera visita) */
const BOOT_KEY = 'cv-boot-v1'

export default function App() {
  const location = useLocation()
  const [booted, setBooted] = useState(() => Boolean(localStorage.getItem(BOOT_KEY)))
  const inLesson = location.pathname.startsWith('/lesson')

  return (
    <>
      {/* capa CRT global */}
      <div className="crt-overlay" aria-hidden />
      <div className="crt-vignette" aria-hidden />
      <div className="crt-sweep" aria-hidden />

      {/* carcasa del dispositivo */}
      <div className="crt-flicker relative mx-auto flex min-h-dvh w-full max-w-[460px] flex-col md:my-4 md:min-h-[calc(100dvh-2rem)] md:border-x md:border-vault-800">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!inLesson && <NavBar />}
      </div>

      {!booted && <BootScreen onHide={() => setBooted(true)} />}
    </>
  )
}
