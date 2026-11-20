# AGENTS.md — Chinese Vault

Guía de proyecto para agentes de IA (y para Antonio del futuro). Léela entera antes de tocar código.

## Qué es esto

**Chinese Vault** es una web-app (móvil-first) para aprender chino mandarín **desde cero**, en **español**,
con estética de refugio post-apocalíptico / terminal Pip-Boy (inspiración: Fallout). El nombre viene de
ahí: el conocimiento se acumula como recursos en tu *vault*.

Filosofía de producto (decisiones del owner, no negociarlas sin consultar):

1. **Pinyin primero.** El pinyin es el sistema principal; los caracteres chinos (hanzi) se aprenden
   "de propina", colateralmente. Hay un ajuste para ocultar el hanzi por completo.
2. **Gamificación tipo HelloChinese / SuperChinese:** lecciones cortas con retos variados, XP, rangos,
   racha y un banco desbloqueable ("Archivo del Refugio") que hace de apuntes.
3. **Nivel 0 antes que nada:** tonos y fonética (módulo HSK 0) antes del vocabulario HSK 1.
4. **Estructura pedagógica inspirada en hablochino.com** (tonos → fonética → saludos → pronombres →
   números → 的 → verbos…), pero en formato de retos, no de texto.
5. **Español para la UI y el contenido; inglés para código, commits y docs** (esta incluida).
6. **Cero coste:** sin servidores propios; Firebase Spark (gratis, sin tarjeta) opcional para cuentas;
   el resto 100% local.
7. **Sin binarios en Git** (imágenes/audios se generan o usan emoji/SVG/web APIs).

Owner: **Axgaldo** (Antonio Galdó Seiquer) · Licencia: **MIT** (a nombre del handle) ·
Repo: https://github.com/Axgaldo/chinese-vault — público en GitHub.
Antonio vibecodea y hace push desde GitHub Desktop; los agentes hacen commits en local.

## Terminología Fallout (obligatoria en toda la UI)

El vocabulario del refugio SIEMPRE en la traducción española de Fallout:

- **morador** — NUNCA "habitante" (el usuario es un morador del refugio)
- **refugio** — el vault; "Overseer" puede quedarse en inglés o como "Supervisor"
- **supervisor / superviviente / guía de supervivencia / saqueador / caravana /
  miembro de la hermandad** — para rangos, misiones y futuros modos
- Rangos actuales: Morador Errante → Morador del Refugio → Superviviente → Explorador →
  Jefe de Caravana → Miembro de la Hermandad → Supervisor del Refugio (máximo)

## Versionado (semver)

`src/lib/version.ts` define `APP_VERSION` (formato `vX.Y.Z`) y debe coincidir con
`package.json`. Regla: **X** = cambios muy grandes · **Y** = nuevas features · **Z** = bugs
y arreglos. Se muestra en inicio, barra lateral, arranque y perfil: SIEMPRE importar de
`lib/version.ts`, nunca hardcodear "v1.0" suelto.

## Stack (nov 2026)

| Capa            | Tecnología                  | Notas                                      |
| --------------- | --------------------------- | ------------------------------------------ |
| Build           | Vite 8 (rolldown)           | `npm run dev/build/preview`                |
| UI              | React 19 + TypeScript 5.9   | `strict`, sin globals sueltos              |
| Estilos         | Tailwind CSS v4             | tema vía `@theme` en `src/index.css` (sin tailwind.config) |
| Estado          | zustand 5 + persist         | localStorage; sincronización desacoplada    |
| Router          | react-router-dom 7          | **HashRouter** (deploy estático sin rewrites) |
| Nube (opcional) | Firebase 13 (JS SDK)       | Auth anónima+email, Firestore; **chunk perezoso** (solo carga si hay `.env`) |
| Audio           | msedge-tts + Web Speech API | MP3 pre-generados en `public/audio` (gitignored) con fallback TTS navegador |
| PWA             | vite-plugin-pwa 2 · **injectManifest** (SW propio `src/sw.ts`): precache + clic de notificaciones |
| Lint            | ESLint 10 flat config       | `npm run lint`                              |
| Tests           | Vitest 5 (`npm run test`)   | libs puras + integridad del curso + COBERTURA OFICIAL HSK 1-3; gate en CI y deploy |
| SFX             | WebAudio procedural         | pitidos retro, sin archivos de sonido       |

Node >= 20 (desarrollado con Node 26). npm como gestor.

## Comandos

```bash
npm install          # dependencias
npm run dev          # http://localhost:5173
npm run build        # tsc -b && vite build (debe pasar sin errores)
npm run lint         # ESLint
npm run test         # Vitest (pinyin, SRS, retos, logros, integridad del curso, cobertura oficial HSK)
npm run audio        # genera los MP3 que falten (usa src/content como fuente de verdad)
npm run audio:force  # regenera TODOS los mp3
npm run icons        # rasteriza favicon.svg → PNGs (icon-192/512, maskable, apple-touch)
                       # el carácter del icono (对) es GEOMETRÍA (sin <text>): el CI no tiene
                       # fuentes chinas y un <text> rasteriza como tofu "4E2D". Nunca poner
                       # texto en el SVG.
```

**Regla de oro del contenido:** cada vez que se añadan/editen palabras o frases (`src/content/**`),
ejecutar `npm run audio` para que los MP3 existan. Si no existen, la app sigue funcionando (fallback
TTS), pero la calidad es peor.

## Estructura

```
src/
├── content/            # EL CURSO (datos puros, sin lógica de UI)
│   ├── builders.ts      # helpers: e(), grammar(), lesson(), drill(), build(), match()…
│   ├── hsk0.ts          # SECTOR 0: tonos y fonética
│   ├── index.ts         # registro: modules, lessonById, entriesById, seenEntries…
│   ├── official-hsk.ts  # listas oficiales HSK 1-3 (generadas; alimentan coverage.test.ts)
│   ├── coverage.test.ts # EL GUARDIÁN: TODAS las palabras oficiales HSK 1-3 deben estar
│   ├── hsk1/m1…m10.ts  # SECTORES S-01 a S-09 + m9b/m9c (S-10/11 refuerzo) + m10 (S-12 auditoría)
│   ├── hsk2/m11…m20.ts # SECTORES S-13 a S-21 + m19a-e (S-22..26 refuerzo) + m20 (S-27 auditoría)
│   └── hsk3/m21….ts    # SECTORES S-28 en adelante (HSK 3)
├── types/               # content.ts (curso) y progress.ts (progreso/SRS/rangos)
├── lib/
│   ├── audio.ts         # speakEntry/speakSentence: MP3 → fallback TTS
│   ├── pinyin.ts        # sílabas, tonos, colores, normalización (ü/v/u:, sin tonos)
│   ├── srs.ts           # SM-2 simplificado (again/hard/good/easy)
│   ├── questions.ts     # distractores en runtime + reviewStepFor (dedup por etiqueta visible)
│   ├── achievements.ts  # catálogo de logros + newlyUnlocked (se sellan en el store)
│   ├── sfx.ts           # WebAudio bleeps retro
│   ├── firebase.ts      # loadFirebase() perezoso (chunk aparte)
│   └── sync.ts          # local-first → Firestore (debounce 3s, updatedAt manda)
├── stores/
│   ├── useProgress.ts   # zustand persist: xp, chapas, racha, completadas, srs, logros, ajustes
│   ├── useAuth.ts       # modo local/anon/account (no persistido)
│   └── useToasts.tsx    # avisos flotantes (logros/chapas) con autodesaparición
├── components/
│   ├── challenges.tsx   # LOS RETOS (intro, note, choose-es, choose-hanzi, listen,
│   │                    #   tone, type-pinyin, dictate=quiz de escucha, build, match,
│   │                    #   speak=oral con ventana mínima 2s, write=canvas 田字格)
│   │                    #   + ChallengeView dispatcher
│   ├── LessonRunner.tsx # cola de pasos, reintentos (pos+4), XP, estrellas, completado
│   ├── Pinyin.tsx       # pinyin coloreado por tono (POR SÍLABA, syllabify)
│   ├── BootScreen.tsx   # arranque VAULT-OS (una vez, localStorage 'cv-boot-v1')
│   ├── NavBar.tsx       # 6 tabs + badge de repasos pendientes (tick 60s)
│   └── ui.tsx           # Btn, Panel, Chip, Meter, SectionTitle, Prompt, SpeakerBtn
├── pages/               # Home (mapa por niveles plegable), Lesson, Review (SRS, tope 30),
│   │                    # Archive (paginado), Radio, Dialogues, Practice, Profile, Shop
├── App.tsx              # rutas + carcasa (max-w-460px) + overlays CRT
└── main.tsx             # initSfx/initSync/syncDay/settings + HashRouter
scripts/generate-audio.ts  # msedge-tts → public/audio (slugs CON tonos desde v2.9)
scripts/clean-audio.ts     # borra MP3 del esquema antiguo (sin tonos)
scripts/hsk-coverage.ts    # informe: qué palabras oficiales faltan
scripts/gen-official-hsk.ts# regenera official-hsk.ts desde scripts/hsk-data
public/audio/              # MP3 GENERADOS, gitignored. Regenerables siempre.
```

## Cómo se autoriza contenido (lo más frecuente)

Todo el curso son datos TS. Mirar `src/content/hsk1/m1.ts` como ejemplo canónico.

- **Palabra:** `e('w-id', '你好', 'nǐ hǎo', 'hola', '👋', 'literal opcional')`.
  - `w-*` ids son GLOBALES: defínela en su módulo canónico; el resto la referencia sin redefinir.
  - El id determina el audio: `/audio/{id}.mp3`.
  - Pinyin con diacríticos UTF-8 literales (ǐ ǎ ǖ…). Sílabas neutras sin marca (ma, de, zi, gè).
- **Ciclo estándar de palabra nueva:** `...drill('w-x')` = intro → elegir traducción → listening →
  elegir hanzi. Para repasos de palabra ya vista: `...practice('w-x')` (sin intro). Para presentarla
  de pasada: `...introLite('w-x')`.
- **Apunte de gramática:** `grammar('n-id', 'Título', [párrafos], [['汉', 'pīn', 'es'], …])`.
  El body admite array de párrafos (se unen con \n). Ejemplos: `[hanzi, pinyin, español]`.
- **Frase a construir:** `build('你好吗？', 'nǐ hǎo ma?', '¿Cómo estás?')` — el banco se genera
  automáticamente carácter a carácter (se limpia la puntuación)。 ，？！、
- **Otros pasos:** `match('w-a','w-b',…)` (emparejar), `toneDrill(entry,'mā',1)` (oido puro),
  `typeP('w-x')` (teclear pinyin), `noteStep('n-id')`.
- **Lección:** `lesson('mX-lN', 'Título', 'vocab'|'grammar'|'review', steps, notes?)`.
  Cada módulo termina con una lección "Auditoría del Sector N" (kind review).
- **Al añadir un módulo:** crear `src/content/hsk1/m7.ts`, exportar `m7: VaultModule` e importarlo
  en el array `modules` de `src/content/index.ts`. Nada más: el mapa, el archivo y el SRS se alimentan
  del registro.
- **Política de pinyin en frases:** aplicar sandhi de 不/一 (bú shì, yí gè, liǎng) pero en las
  ENTRADAS dejar la forma de diccionario (bù, yī). Traducción al español natural, no literal.
- **Distractores:** no se escriben; se generan en runtime (`lib/questions.ts`) desde las palabras
  vistas → repetir una lección nunca da las mismas opciones.

## Sistema de audio

1. `speakEntry` intenta `/audio/{id}.mp3` (uno por palabra) y `/audio/s-{slug}.mp3` (frases,
   slug = pinyin sin tonos). 404 → marca el id como faltante y usa **Web Speech API** (voz zh-CN,
   mejor en Chrome/Edge; en Edge hay voces "Natural" online).
2. `npm run audio` regenera lo que falte con la voz **zh-CN-XiaoxiaoNeural** (servicio Read Aloud de
   Edge, gratuito). 24kHz/48kbps MP3. `public/audio/*` está en .gitignore salvo su README.
3. Ajuste de velocidad del usuario: playbackRate (MP3) y utterance.rate (TTS), guardado en settings.

## Firebase (opcional, plan Spark gratis)

Sin `.env` la app es 100% local. Con `.env` (ver `.env.example`):

- **Auth anónima automática** → cada dispositivo = un uid anónimo; su Firestore doc guarda el progreso.
  En la consola hay que activar los DOS proveedores: **Google** y **Anónimo**.
- **ENTRAR CON GOOGLE** (Perfil): si la sesión es anónima hace `linkWithPopup` (mismo uid → el
  progreso local sube sin perder nada); si ese Google YA tiene cuenta, se reutiliza la credencial
  del propio popup (`signInWithCredential` — sin segundo popup). Si el navegador BLOQUEA popups
  → **redirect automático** (`linkWithRedirect`/`signInWithRedirect`) y el flag `cv-cloud-preferred`
  viaja en sessionStorage para que al volver de la recarga siga aplicándose la prioridad de nube.
  Errores típicos traducidos: `operation-not-allowed` (proveedor sin activar) y
  `unauthorized-domain` (dominio no añadido en Authentication → Settings).
- Sincronización **local-first**: debounce 3s tras cada cambio; si el remoto tiene `updatedAt` mayor,
  se adopta el remoto (gana el más reciente).
- **Política de sesión**: la sesión ANÓNIMA automática es local-first; el inicio de sesión
  EXPLÍCITO con Google (`preferCloudOnNextAuth`) prioriza LA NUBE (recuperas tu cuenta tal
  cual estaba en la BBDD, aunque el dispositivo tuviera otro progreso local). Vincular por
  primera vez (linkWithPopup) conserva el local. Nunca se sube un progreso vacío, y si el
  local amanece vacío con nube con datos, se RECUPERA desde la nube (anti-reset).
- Documento: `users/{uid} = { progress: <ProgressState>, updatedAt }`.
- **Reglas de seguridad** a poner en la consola (la modalidad "prueba" caduca en 30 días):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

- El SDK se importa perezosamente: en modo local **no se descarga** el chunk de Firebase.

## Mecánicas (no tocar a la ligera, están balanceadas)

- XP: +10 acierto (solo primer intento del paso), match sin fallos +10 / con fallos +5,
  lección nueva +30 bonus, precisión perfecta +20, repaso +5.
- Estrellas: ≥90% primera intención → 3★, ≥65% → 2★, resto 1★. Precisión = aciertos a la primera /
  pasos que puntúan (intro y apuntes no puntúan).
- Fallo → el paso se reencola 4 posiciones más adelante y no da XP al repetirse.
  IMPORTANTE: `LessonRunner` monta cada paso con `key={pos}` — sin la key, el estado interno
  de un reto se filtra al siguiente paso del mismo tipo (bug histórico de los "escucha" seguidos).
- SRS: nueva palabra → due mañana. again (due ~10 min, lapses++), hard (intervalo×1.2),
  good (×ease), easy (×ease×1.3), ease 2.5→mín 1.3.
- Racha: cuenta al completar lección o repaso (día local, no UTC).
- Rangos en `types/progress.ts` (Habitante Errante → Leyenda del Vault).
- **Chapas (moneda):** icono `CapsIcon` (ui.tsx, 3 chapas SVG apiladas — chips, botones,
  tienda y toasts; NUNCA el emoji ⛓). Bono diario +5 con la primera actividad de cada día,
  lección nueva +3, repetida +1, sesión de repaso +2. Constantes en `stores/useProgress.ts`.
- **Logros:** catálogo en `lib/achievements.ts` (se sellan tras cada actividad con toast +
  sfx.log; `main.tsx` hace un `checkAchievements()` de arranque para migraciones).
- **Modo Supervisor:** `settings.adminMode` (libre, no es secreto) — desbloquea todas las
  lecciones (Home + LessonPage consultan el flag) Y TODO el catálogo de la tienda/VFX/letras
  para probar sin coste (equip* lo permiten; van marcados con 👁). Al DESACTIVARLO, el equipo
  vuelve a lo comprado de verdad (setSettings lo reajusta: theme→green, font→mono, vfx→crt
  si no eran owned).

## Modo de escritura (pinyin-first)

- `settings.scriptMode` ('pinyin' | 'both' | 'hanzi', default **pinyin**): el botón 拼/拼+漢/漢 de la
  cabecera de lección ROTA los tres modos (también desde Perfil → Ajustes).
  - 拼: pinyin grande; tocar la palabra = audio + revela el hanzi.
  - 拼+漢: hanzi con el pinyin apilado debajo (estilo HelloChinese).
  - 漢: hanzi; tocar = audio + revela el pinyin.
- `PromptWord` (challenges.tsx) es el enunciado; `reveal={false}` solo para retos de transcripción
  (type-pinyin SIEMPRE muestra hanzi). `WordInMode` es la versión para opciones/chips.
- Tras responder, las opciones anotan el script que falta según el modo.
- persist version 3 migra showHanzi(boolean)→scriptMode. Campo nuevo en settings/ProgressState:
  tipo + INITIAL_PROGRESS + migrate con defaults.

## Diseño (identidad visual)

- Verde fósforo sobre negro: tokens `vault-950…100` + `vault-amber/red/teal/purple` en `@theme`.
- Tipos: `font-display` (VT323) para titulares, `font-mono` (Share Tech Mono) para texto,
  `font-hanzi` (Noto Sans SC) para caracteres chinos, `font-pinyin` para pinyin (con diacríticos).
- **Colores de tono** (pedagógicos, en pinyin): 1 rojo `tone-1`, 2 ámbar `tone-2`, 3 turquesa
  `tone-3`, 4 violeta `tone-4`, 5 gris `tone-5`. El componente `<Pinyin>` los aplica solo.
- Clases CRT en `index.css`: `.crt-overlay` (scanlines suaves, alpha 0.12), `.crt-vignette`,
  `.crt-sweep`, `.crt-flicker`, `.panel` (esquinas biseladas), `.btn-vault`, `.choice`,
  `.meter` (barra segmentada), `.glow`.
- **Legibilidad:** los párrafos largos van en `.panel` + `.panel-read` (fondo casi negro, texto
  claro, `text-lg`); al final, `<Cursor />` (barrita parpadeante de consola). Los retos con
  opciones grandes y botones de audio son el look de referencia ("escucha y elige").
- Componentes de UI en `components/ui.tsx`: NO inventar botones nuevos, usar `Btn`/`Panel`/etc.
  Para ajustes on/off usa SIEMPRE `Toggle` (botón `[ ■ ACTIVADO ]`) — los checkboxes nativos se
  renderizan invisibles en algunos navegadores oscuros (bug real reportado).
- **Apariencia (Perfil + Tienda):** la base del tema es ULTRA-OSCURA (texto brillante sobre
  paneles casi negros: tokens vault-100/200 para texto, paneles `#020604`). El toggle
  "Ultra-oscuro" se retiró en v5 (el look base YA es ese). `settings.highContrast`
  (clase `cv-highcontrast`: todo blanco sobre negro puro, accesibilidad) y
  `settings.vfx` (`html[data-vfx]`: none · crt (scanlines/viñeta/barrido/parpadeo) ·
  glitch (`vfx-glitch`) · neon (`vfx-neon`)). Se aplican con el useEffect de App.tsx.
- **Tienda (3 catálogos en `lib/shop.ts`):** TEMAS (green gratis · amber · teal · red ·
  mono · **notebook** (papel rayado, claro) · **atompunk** (aceró/cian) · **calido**
  (crema/naranja)), FUENTES (mono/pixel/sans gratis · **hand** (Caveat, encaja con
  Cuaderno) · **round** (Nunito)) y VFX (none/crt gratis · glitch 20 · neon 20).
  `buyTheme/buyFont/buyVfx` + `equipTheme/equipFont/equipVfx` en el store;
  `ownedThemes/ownedFonts/ownedVfx` en el progreso. El perfil solo deja equipar lo
  comprado. Fuentes extra en index.html (Caveat, Nunito).
- Textos de UI en español con sabor Fallout pero sin ser insoportables: "REGISTRAR ENTRADA",
  "ACCESO CONCEDIDO", "ERROR DE PROTOCOLO", "ENTRADAS REGISTRADAS", "ZONA PELIGROSA"…

## Convenciones y reglas del repo

- Commits en inglés, estilo `feat:`/`fix:`/`docs:`/`chore:`, presente simple. Antonio hace push.
- `npm run build` (tsc -b incluido) debe pasar SIEMPRE antes de commit. Lint sin errores nuevos.
- No commitear: `public/audio/*.mp3`, `.env`, `dist/`, `node_modules/`.
- UI strings: español. Código/comentarios/docs: inglés (salvo strings visibles al usuario).
- Prefiere editar archivos existentes con precisión; respeta la estructura descrita arriba.
- No cambiar decisiones de producto listadas al principio sin pedirlo a Antonio.

## Caravana, Tienda y Estadísticas (v1.2.0)

- **Caravana 🐂** (`lib/quests.ts`): 3 encargos/día generados de forma DETERMINISTA desde la
  fecha (`questsForDate`); miden contadores de `dailyStats` (lessons, perfect, reviews,
  dictations, tones, steps, xp). `logActivity(metric, n)` los alimenta desde LessonRunner
  (steps/dictations/tones) y ReviewPage (reviews). **Los encargos completados se AUTO-CANJEAN**
  al terminar lección/repaso (`autoClaimQuests` en el store). Las barras viven SOLO en el
  Perfil (`components/QuestsPanel.tsx`, con reclamación manual para lo completado fuera de
  lección) y en el POPUP de la pantalla de fin de lección (LessonRunner: diff de claimed
  antes/después + "+N auto-canjeadas").
- **Tienda ⛓** (`lib/shop.ts` + ShopPage): temas de terminal (green gratis · amber · teal ·
  red · mono). `buyTheme` descuenta chapas y EQUIPA al instante; `settings.theme` se aplica
  en App.tsx como `html[data-theme]` (paletas en index.css; los colores de tono pedagógicos
  no cambian). NUEVA PÁGINA `/shop` (NavBar 5 pestañas + SideBar).
- **Estadísticas** (ProfilePage → "REGISTRO DEL REFUGIO"): grid (XP, chapas, racha con
  récord, 3★, precisión media, repasos), calor de 14 días (`history`, poda a 60 días) y
  precisión por sector. `bestStreak` y `history` viven en el store.
- **Sincronización blindada** (lib/sync.ts): nunca se sube un progreso VACÍO a la nube, y si
  el local amanece vacío pero el remoto tiene datos, se RECUPERA desde la nube (anti-reset).
- **Tests**: 50 vitest en `src/**/*.test.ts` — al tocar `lib/pinyin.ts`, `lib/srs.ts`,
  `lib/questions.ts`, `lib/achievements.ts` o el contenido, corre `npm run test`. El test de
  integridad del curso (`content/index.test.ts`) valida TODAS las referencias de ids.

- **Desafío oral (`speak`)**: SpeechRecognition (Chrome/Edge; en Firefox se omite sin
  penalización): micrófono → oye en zh-CN → cada carácter del objetivo (≈ sílaba) se marca
  verde/rojo según si aparece en lo oído (hasta 3 alternativas). Verde total = +10 XP,
  parcial (≥50%) = +5.
- **Desafío de escritura (`write`)**: canvas 田字格 (cuadrícula china con guías) — trazas
  el hanzi sobre la guía tenue y se puntúa por IoU de píxeles contra el carácter renderizado:
  ≥50% verde +10, ≥32% ámbar +5. PointerEvents (funciona con ratón y dedo).
- **Inyección automática**: `lessonSteps()` (LessonRunner) añade un `speak` + un `write`
  (elegidos por hash estable de la lección) a toda lección kind 'review' (auditorías).
  El SRS también rota un `speak` cada 5 repeticiones (reviewStepFor).
- **Práctica libre**: ruta `/practice/:mode/:entryId` (PracticePage) — en el Archivo el
  selector 🔊 ESCUCHAR / 🎤 PRONUNCIAR / ✍️ ESCRIBIR decide si tocar la palabra la
  reproduce o abre su desafío. +10/+5 XP por acierto.
- **Palabra en contexto (v2.4.0)**: `contextSentences(entryId, completed, excludeLesson)` —
  la INTRO de cada palabra muestra hasta 2 frases reales del curso donde suena (prioriza
  lecciones completadas; excluye la lección en curso para no spoilear su propio build),
  con su pinyin sandhi-correcto y audio (speakSentence). LessonRunner pasa `lessonId` a
  ChallengeView para la exclusión.
- **Variedad de presentación (v2.4.0)**: `drill(id)` alterna 3 variantes por hash del id
  (mismos 4 retos, distinto orden — choose-es siempre temprano por pedagogía).
- **LessonPage usa `key={location.key}`**: re-navegar a la misma lección REMONTA el runner
  (antes mostraba la pantalla de completado anterior).
- **Silabificador de pinyin (v2.6.0)**: `syllabify` trocea cada PALABRA en sílabas válidas
  (tabla SYLLABLES + DP en `lib/pinyin.ts`): `zhōngwén` → zhōng+wén, `nǐmen` → nǐ+men,
  ü y tonos NFD incluidos. INVARIANTE: una sílaba de pinyin = un carácter hanzi — el
  test de integridad (`content/index.test.ts`, test "builds: alineación 1:1") lo garantiza
  en TODO build. El reto `build` aparea ficha↔carácter↔sílaba por el MISMO índice
  (el banco son índices barajados de target, nunca texto suelto: bug histórico de fichas
  con hanzi de una posición y pinyin de otra).
- **Recordatorio de racha ☢ (v2.6.0)**: `lib/notify.ts` + SW propio (`src/sw.ts`, PWA en
  modo `injectManifest` en vite.config.ts): ~8 h antes de medianoche, con racha activa y
  sin haber estudiado hoy, notificación del sistema (PWA instalada) con botones
  "Posponer 3 h" (SW → message → snoozeStreakReminder) y "A entrenar". Se activa en
  Perfil → Ajustes (`settings.streakReminder`, pide permiso al habilitarlo) y se
  comprueba al arrancar, al volver a la app y cada 5 min (main.tsx). Sin servidor: no
  avisa si la app está cerrada del todo (limitación PWA sin push).

- **Diálogos de la Radio 🎭 (v2.7.0+v2.8.0)**: `lib/dialogues.ts` (catálogo `DIALOGUES` — 19
  diálogos de 4-6 líneas anclados a sectores; DISCIPLINA: solo vocabulario de su sector o
  anteriores) + `pages/DialoguesPage.tsx` (ruta `/radio/dialogues`). FLUJO: retos por línea
  directamente (la conversación NO se revela hasta el final; audio por línea opcional 🔊,
  autoplay solo en retes de oído) → al completar: transcripción completa + ESCUCHAR TODO.
  5 tipos de reto (hash estable por línea): ¿qué oyes? (audio→traducción) · ¿quién lo dice?
  (audio→A/B) · ordena la línea (fichas) · ¿qué palabra falta? (hueco ＿＿ en el pinyin) ·
  ¿qué responde? (línea anterior → elegir respuesta hanzi). +5 XP/línea primer intento,
  fallo → reencola con retry. BUGS HISTÓRICOS ya arreglados (que no vuelvan): (1) el
  CONTINUAR de meaning/who/reply debe pasar el veredicto correcto (no `state === 'ok'`,
  que siempre es false ahí); (2) CADA tipo de reto necesita su `if (quiz.kind === 'x')`
  con return — el JSX de gap como fall-through renderizaba los reply como gap
  (gapPinyin undefined → hueco imposible). Las líneas usan el slug `s-{pinyin}` —
  `npm run audio` las genera.

## HSK 3 (v3.0.0 — en curso)

La numeración DEFINITIVA de sectores (40 en total, se pegó al hueco de los refuerzos):

- **S-00** hsk0 · **S-01..S-09** m1-m9 · **S-10/S-11** m9b/m9c (refuerzo HSK 1) · **S-12** m10 (auditoría HSK 1)
- **S-13..S-21** m11-m19 · **S-22..S-26** m19a-m19e (refuerzo HSK 2) · **S-27** m20 (auditoría HSK 2)
- **S-28..S-30** m21-m23 (HSK 3 oleada 1) · **S-31..S-38** m24-m31 (HSK 3 oleada 2)

Reglas nuevas que surgieron en esta iteración (ya aplicadas, no romperlas):

1. **COBERTURA OFICIAL**: `src/content/official-hsk.ts` (generado de la fuente MIT
   `scripts/hsk-data/old-{1,2,3}.json`) alimenta `src/content/coverage.test.ts` — TODAS las
   palabras oficiales HSK 1-3 deben aparecer en el corpus (fichas, builds, ejemplos o diálogos).
   Al añadir palabras: `npx tsx scripts/hsk-coverage.ts` dice qué faltan.
2. **Referencias de sector en prosa**: al renumerar, los apuntes citan "S-XX" — si se mueve un
   módulo, actualizar las citas (busca `S-1\d` en el contenido).
3. **Ids homófonos**: cuando dos palabras comparten pinyin, el id se desambigua con sufijo
   (`w-jiu4-then` 就 vs `w-jiu4` 旧, `w-xia4-summer` 夏, `w-zhu4-wish` 祝, `w-jiao3-corner` 角,
   `w-nan2-south` 南, `w-nan2-hard` 难…). El audio por entrada usa el id: sin desambiguación,
   homófonos perfectos compartirían MP3.
4. **Renumeración/archivos con hanzi**: NUNCA `Set-Content -Encoding UTF8` de PowerShell 5.1
   (mojibake doble). Usar Node/tsx (`scripts/renumber-sectors.ts` como patrón) o el edit tool.
5. Los sectores HSK 3 restantes m24-m31 están pautados en `scripts/check-hsk3-buckets.ts`
   (reparto palabra↔sector verificado contra la lista oficial).

## Radio del Refugio 📻 y HSK 2 (v2.0.0)

- **Radio** (`lib/radio.ts` + `pages/RadioPage.tsx`, ruta `/radio`, NavBar 6 pestañas):
  programas generados desde el contenido COMPLETADO (nunca suena algo no visto):
  "BOLETÍN · sector X" (frases: ¿qué oyes? → elegir traducción / transcripción → escribir
  pinyin completo sin tonos) y "TONOS & MÚSICA" (identificar tono al oído). Items fallados
  se reencolan con `retry: true` (sin XP doble). XP +5 por acierto, alimenta `steps` diario.
- **HSK 2** (`content/hsk2/m11..m20.ts`, sectores S-11 a S-20, ~130 palabras nuevas):
  la gramática va EXPLICADA con profundidad ("el error número uno…", contrastes ✗/✓,
  "Tip del Overseer"): 了 como CAMBIO (no "pasado"), 正在, V+到 (resultado logrado),
  V+来/V+去 (deixis), 比, 有点儿, 因为...所以, 还是, 太...了, 越来越, V+过 (experiencia).
  El sector m20 cierra con la "auditoría final HSK 2" y el certificado del Overseer.
- `VaultModule.hsk` ahora es `0 | 1 | 2`: para HSK 3 ampliar el union y el test de integridad.

## Roadmap (siguientes sesiones)

**HSK 1 COMPLETO** (S-00 → S-12, las 150 palabras oficiales, 40 lecciones).
**HSK 2 COMPLETO** (S-13 → S-27, TODAS las palabras oficiales del nivel, 62 lecciones).
**HSK 3 COMPLETO** (S-28 → S-38, las 298 palabras oficiales, ~60 lecciones) — verificado por
`coverage.test.ts` contra la lista oficial HSK 2.0: ninguna palabra de los niveles 1-3 puede
quedarse fuera del curso.

Hecho en v3.0.0: refuerzos HSK1 (ciudad, preguntas) y HSK2 (familia ampliada, cifras, salud,
viajes, modales) que cierran las listas oficiales; HSK 3 completo con 把, complementos de
resultado, 被, 得/地, conectores (虽然/如果/又/一边), clasificadores finos y las ideas abstractas.

Features candidatas: misión diaria de caravana mejorada, tienda con más temas,
exportar/importar progreso (JSON), HSK 4, modo escritura de caracteres (trazos),
estadísticas con gráficas, PWA iOS pulida.

## Notas de entorno conocidas

- Windows + PowerShell: los comandos de npm funcionan igual.
- El preinstall de msedge-tts ("only-allow pnpm") se salta con npm ≥11 (install-scripts): es
  inofensivo, el paquete funciona igual.
- El chunk de Firebase pesa ~580KB (gzip ~173KB) y solo se descarga con `.env` activo.
- `dialog`/`confirm` nativos: no usar; hay confirmaciones inline ya hechas.

## Despliegue (GitHub Pages)

- Workflow `.github/workflows/deploy.yml`: push a main → `npm ci` → **escribe `.env` desde el
  secret `FIREBASE_ENV`** (Settings → Secrets → Actions; vacío = modo local) → `npm run audio`
  (los MP3 se regeneran en CI, nunca en Git) → `npm run build:pages` (base `/chinese-vault/` vía
  `VITE_BASE_PATH` y cross-env) → `actions/deploy-pages`.
- Configuración única del repo: **Settings → Pages → Source: GitHub Actions** + secret
  `FIREBASE_ENV` (contenido del `.env` pegado tal cual) + dominio de Pages en
  Firebase → Authentication → Authorized domains.
- HashRouter + base: no necesita rewrites ni 404.html.
- La app funciona en escritorio (≥lg: sidebar + contenido, NavBar inferior solo en móvil).

## Sobre Firebase y el plan Blaze

- Auth anónima: no es un riesgo de seguridad por sí misma — el uid anónimo es un secreto
  local del dispositivo y las reglas de Firestore solo dejan leer/escribir SU documento al uid
  propietario. El único "riesgo" real es de PÉRDIDA: si activas la caducidad de 30 días y no
  pasas a Google a tiempo, Firebase borra el usuario anónimo y la nube queda huérfana (el
  progreso local en localStorage sigue a salvo). El Perfil muestra la cuenta atrás.
- Blaze NO hace falta para nada de lo que usa la app (Auth + Firestore entran gratis también
  en Blaze). Hazlo solo si algún día queremos Storage (ficheros binarios de usuarios) o Cloud
  Functions, y SIEMPRE con budget alert configurado (console → Usage and billing).
