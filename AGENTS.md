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

Owner: **Antonio Galdó Seiquer** · Licencia: **MIT** · Repo público de GitHub.
Antonio vibecodea y hace push desde GitHub Desktop; los agentes hacen commits en local.

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
| PWA             | vite-plugin-pwa 2 (workbox)| Service worker + manifest; precachea TODO incluido el audio → offline total |
| Lint            | ESLint 10 flat config       | `npm run lint`                              |
| SFX             | WebAudio procedural         | pitidos retro, sin archivos de sonido       |

Node >= 20 (desarrollado con Node 26). npm como gestor.

## Comandos

```bash
npm install          # dependencias
npm run dev          # http://localhost:5173
npm run build        # tsc -b && vite build (debe pasar sin errores)
npm run lint         # ESLint
npm run audio        # genera los MP3 que falten (usa src/content como fuente de verdad)
npm run audio:force  # regenera TODOS los mp3
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
│   └── hsk1/m1…m6.ts    # SECTORES 1-6 (saludos→identidad→números→familia→lugares→comida)
├── types/               # content.ts (curso) y progress.ts (progreso/SRS/rangos)
├── lib/
│   ├── audio.ts         # speakEntry/speakSentence: MP3 → fallback TTS
│   ├── pinyin.ts        # sílabas, tonos, colores, normalización (ü/v/u:, sin tonos)
│   ├── srs.ts           # SM-2 simplificado (again/hard/good/easy)
│   ├── questions.ts     # distractores en runtime + reviewStepFor
│   ├── achievements.ts  # catálogo de logros + newlyUnlocked (se sellan en el store)
│   ├── sfx.ts           # WebAudio bleeps retro
│   ├── firebase.ts      # loadFirebase() perezoso (chunk aparte)
│   └── sync.ts          # local-first → Firestore (debounce 3s, updatedAt manda)
├── stores/
│   ├── useProgress.ts   # zustand persist: xp, chapas, racha, completadas, srs, logros, ajustes
│   ├── useAuth.ts       # modo local/anon/account (no persistido)
│   └── useToasts.ts     # avisos flotantes (logros/chapas) con autodesaparición
├── components/
│   ├── challenges.tsx   # LOS 9 RETOS (intro, note, choose-es, choose-hanzi, listen,
│   │                    #   tone, type-pinyin, build, match) + ChallengeView dispatcher
│   ├── LessonRunner.tsx # cola de pasos, reintentos (pos+4), XP, estrellas, completado
│   ├── Pinyin.tsx       # pinyin coloreado por tono
│   ├── BootScreen.tsx   # arranque VAULT-OS (una vez, localStorage 'cv-boot-v1')
│   ├── NavBar.tsx       # 4 tabs + badge de repasos pendientes
│   └── ui.tsx           # Btn, Panel, Chip, Meter, SectionTitle, Prompt, SpeakerBtn
├── pages/               # Home (mapa), Lesson, Review (SRS), Archive, Profile
├── App.tsx              # rutas + carcasa (max-w-460px) + overlays CRT
└── main.tsx             # initSfx/initSync/settings + HashRouter
scripts/generate-audio.ts  # msedge-tts → public/audio (NO tocar sin rerun)
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

- **Auth anónima automática** → cada dispositivo = un uid; su Firestore doc guarda el progreso.
- Sincronización **local-first**: debounce 3s tras cada cambio; si el remoto tiene `updatedAt` mayor,
  se adopta el remoto.
- **Vincular email** (Perfil) hace `linkWithCredential` sobre el usuario anónimo → mismo uid en otros
  dispositivos, sin perder progreso.
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
- **Chapas ⛓ (moneda):** bono diario +5 con la primera actividad de cada día, lección nueva +3,
  repetida +1, sesión de repaso +2. Constantes en `stores/useProgress.ts`.
- **Logros:** catálogo en `lib/achievements.ts` (se sellan tras cada actividad con toast +
  sfx.log; `main.tsx` hace un `checkAchievements()` de arranque para migraciones).
- **Modo Supervisor:** `settings.adminMode` (libre, no es secreto) — desbloquea todas las
  lecciones (Home + LessonPage consultan el flag).

## Modo de escritura (pinyin-first)

- `settings.showHanzi` (default **false** = pinyin): los retos muestran pinyin (coloreado por tono)
  o hanzi. El botón 拼/漢 de la cabecera de lección lo alterna al vuelo.
- `PromptWord` (challenges.tsx): la palabra del enunciado suena al tocarla y revela el otro
  sistema. `reveal={false}` solo para retos de transcripción (type-pinyin SIEMPRE muestra hanzi).
- Match/Build/options muestran el script activo y anotan el otro tras responder.
- persist version 2 migra showHanzi a false. Cualquier campo nuevo de settings/ProgressState
  necesita: tipo + INITIAL_PROGRESS + `progressData()` + migrate con defaults.

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
- Textos de UI en español con sabor Fallout pero sin ser insoportables: "REGISTRAR ENTRADA",
  "ACCESO CONCEDIDO", "ERROR DE PROTOCOLO", "ENTRADAS REGISTRADAS", "ZONA PELIGROSA"…

## Convenciones y reglas del repo

- Commits en inglés, estilo `feat:`/`fix:`/`docs:`/`chore:`, presente simple. Antonio hace push.
- `npm run build` (tsc -b incluido) debe pasar SIEMPRE antes de commit. Lint sin errores nuevos.
- No commitear: `public/audio/*.mp3`, `.env`, `dist/`, `node_modules/`.
- UI strings: español. Código/comentarios/docs: inglés (salvo strings visibles al usuario).
- Prefiere editar archivos existentes con precisión; respeta la estructura descrita arriba.
- No cambiar decisiones de producto listadas al principio sin pedirlo a Antonio.

## Roadmap (siguientes sesiones)

Contenido (sectores 7-10 de HSK 1, ~150 palabras completas):

- **S-07 Tiempo:** 今天/明天/昨天, 星期, 年/月/日, 现在, 时候, 上午/下午, 分钟…
- **S-08 Rutina (verbos):** 去/来/看/想/会/能/做/写/读/听/说, 学习, 工作, 睡觉…
- **S-09 Cualidades (adjetivos):** 大/小/多/少, 高兴, 漂亮, 热/冷, 累, 忙, 知道…
- **S-10 Auditoría final del Vault:** repaso integral + mini-conversaciones con todo lo visto.

Hecho en v0.2: PWA offline, chapas + bono diario, 10 logros, modo supervisor,
modo pinyin⇄hanzi con toque-revelar, legibilidad de paneles largos + cursor de consola.

Features candidatas: misión diaria (quest con recompensa en chapas), quiz de escucha pura,
exportar/importar progreso (JSON), HSK 2+ (nuevos módulos), modo caracteres (escribir hanzi
con trazos), estadísticas con gráficas, tienda de chapas (temas de color del terminal).

## Notas de entorno conocidas

- Windows + PowerShell: los comandos de npm funcionan igual.
- El preinstall de msedge-tts ("only-allow pnpm") se salta con npm ≥11 (install-scripts): es
  inofensivo, el paquete funciona igual.
- El chunk de Firebase pesa ~580KB (gzip ~173KB) y solo se descarga con `.env` activo.
- `dialog`/`confirm` nativos: no usar; hay confirmaciones inline ya hechas.
