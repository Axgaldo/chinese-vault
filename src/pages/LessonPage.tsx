/* ─────────────────────────────────────────────────────────────────────────────
   LECTOR DE LECCIÓN — envoltorio de ruta del LessonRunner
   ───────────────────────────────────────────────────────────────────────────── */

import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { isLessonUnlocked, lessonById, nextLessonId } from '../content'
import { LessonRunner } from '../components/LessonRunner'
import { useProgress } from '../stores/useProgress'

export function LessonPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const completedKey = useProgress((s) => Object.keys(s.completed).join(','))
  const adminMode = useProgress((s) => s.settings.adminMode)
  const completed = completedKey ? completedKey.split(',') : []

  const lesson = lessonId ? lessonById.get(lessonId) : undefined
  if (!lesson) return <Navigate to="/" replace />
  if (!isLessonUnlocked(lesson.id, completed) && !adminMode) return <Navigate to="/" replace />

  return (
    <LessonRunner
      key={location.key}
      lesson={lesson}
      onExit={() => navigate('/')}
      onNext={() => {
        const next = nextLessonId(Object.keys(useProgress.getState().completed))
        if (next === lesson.id) navigate('/')
        else navigate(`/lesson/${next}`)
      }}
    />
  )
}
