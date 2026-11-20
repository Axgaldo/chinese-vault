---
title: REPORTE DE AUDITORÍA — Chinese Vault v2.8.0 (HSK 0–2)
project: Chinese Vault
repo: https://github.com/Axgaldo/chinese-vault
commit: caeec97
version: v2.8.0
date: 2026-11-20
scope: revisión completa de código, contenido chino, UX, PWA y preparación para HSK 3
nature: auditoría de solo lectura — no se modificó ningún archivo del proyecto
audience: Antonio (owner) + cualquier agente/IA que vaya a implementar los arreglos o HSK 3
resolution: CORREGIDO EN v2.9.0 (commit a4c6ced) — ver "Estado de resolución" al final
---

# Reporte de auditoría — Chinese Vault v2.8.0

> **Cómo leer este documento (para una IA).**
> Los hallazgos tienen ID estable (`CH-xx`, `BUG-xx`, `PWA-xx`, `SYNC-xx`, `UX-xx`, `COV-xx`, `READY-xx`).
> Las referencias `archivo:línea` corresponden al commit `caeec97` (v2.8.0); si el código cambia, localiza por el ID y el texto citado.
> Cada hallazgo indica **Impacto** y **Confianza**:
> - `Verificado`: reproducido ejecutando la app, un script o una petición HTTP real.
> - `Código`: evidencia directa por lectura del código (no reproducido en navegador).
> - `Datos`: obtenido ejecutando el propio contenido del proyecto con `tsx`.
> El apéndice final contiene los scripts de comprobación y las tablas de datos completas.

---

## 0. Veredicto ejecutivo

**La arquitectura sí está preparada para HSK 3; el producto todavía no.**

- Solo hay **2 bloqueos duros** para añadir HSK 3: la unión de tipos `hsk` y el test de integridad.
- El plan de HSK 3 de `AGENTS.md` tiene **el tamaño equivocado**: HSK 3 añade **300 palabras nuevas (600 acumuladas)**, no 600 nuevas. 600 nuevas ya es HSK 4.
- Antes de HSK 3 hay que cerrar el HSK 2 real: **76 de las 150 palabras oficiales de HSK 2 no aparecen ni una vez** en todo el curso (y 19 de HSK 1).
- Hay bugs silenciosos de alto impacto: **todo el audio MP3 da 404 en producción**, **cada lección pierde el último paso** (XP, precisión, 3★ y bonus +20), **la racha nunca se reinicia** y **el audio de la lección de tonos enseña el tono equivocado**.
- La calidad del chino es buena en general (pinyin válido, tonos bien colocados, medida correcta, gramática de 了/过/比/因为…所以 bien usada), pero hay **errores concretos que un alumno aprendería mal**: `请问` con tono erróneo, `分钟` para la hora, `比…更` marcado como error, sandhi de 一, glosas de 上/下 y algún diálogo incoherente.

**Prioridad real:** P0 (audio + puntuación + errores de chino) → P1 (integridad del producto + cerrar HSK 2) → P2 (UX/PWA/documentación).

---

## 1. Baseline verificado

| Comprobación | Resultado |
|---|---|
| `npm run build` (`tsc -b && vite build`) | ✅ OK. Chunk principal **518,63 kB** (167,01 kB gzip); chunk Firebase **583,92 kB** (173,63 kB gzip, perezoso). |
| `npm run lint` | ✅ Sin errores. |
| `npm run test` | ✅ **51 tests** (5 archivos). |
| Navegación real (Home, lección, repaso, radio, diálogos, archivo, tienda, perfil, práctica) | ✅ Sin errores de consola. |
| `npm run dev` | ✅ Arranca en 5173. |
| `git status` tras la auditoría | ✅ Limpio (este informe queda excluido localmente). |
| Audio local | 565 MP3 (6,5 MB); **0 archivos faltantes** para las 252 fichas y las frases del curso. |

**Datos del curso (calculados ejecutando el contenido):**

| Métrica | Valor |
|---|---|
| Módulos | 21 (S-00 + S-01…S-20) |
| Fichas (`entriesById`) | 252 |
| Lecciones | 79 |
| Apuntes de gramática | 63 |
| Diálogos | 20 (100 líneas) |
| Pasos totales | 1.457 (1.143 puntuables + 251 intros + 63 apuntes) |
| XP máximo del curso actual | ~15.380 |
| Rango máximo | 2.200 XP (`Supervisor del Refugio`) |

---

## 2. Errores de chino

### 2.1 Críticos (el alumno aprende algo incorrecto)

#### CH-01 — `请问` escrito con tono equivocado (6 apariciones)
- **Dónde:** `src/content/hsk1/m5.ts:27`, `:67`, `:98`; `src/lib/dialogues.ts:120`, `:207`, `:254`.
- **Qué pasa:** está como **`qǐngwén`**. La forma correcta es **`qǐngwèn`** (问 = wèn, 4.º tono).
- **Impacto:** ficha principal de supervivencia, builds, 3 diálogos y MP3 generado desde el hanzi (el audio suena bien, pero el pinyin mostrado enseña el tono mal y contamina color de tonos/ejercicios).
- **Confianza:** Verificado.
- **Arreglo:** sustituir las 6 apariciones por `qǐngwèn`.

#### CH-02 — Los minutos del reloj se enseñan con `分钟`
- **Dónde:** `src/content/hsk1/m7.ts:102` (título), `:105` (regla), `:110` (ejemplo).
- **Qué pasa:** `两点二十分钟` para "las dos y veinte". **`分钟` es duración** ("20 minutos"); para la hora se usa **`分`**: `两点二十分` / `liǎng diǎn èrshí fēn`.
- **Impacto:** error de producción en una lección temprana; el audio generado pronuncia una duración, no una hora.
- **Confianza:** Verificado.
- **Arreglo:** cambiar regla y ejemplo; dejar `分钟` solo para duración (la ficha `w-fen-zhong` es correcta).

#### CH-03 — `比…更` marcado como error
- **Dónde:** `src/content/hsk2/m15.ts:111` y `:115`.
- **Qué pasa:** el apunte dice `✗汽车比自行车更快` y "ni 很, ni 更". **`更` (y `还`) son correctos y muy frecuentes** con 比: `今天比昨天更冷`, `他比我更高`. Lo incorrecto es `很/非常/太` (`✗我比他很高`).
- **Impacto:** se enseña a evitar una estructura correcta y de altísima frecuencia.
- **Confianza:** Verificado.
- **Arreglo:** usar `✗汽车比自行车很快` como error y explicar que 更/还 *refuerzan* la comparación.

#### CH-04 — Sandhi de `一` mal en `一杯`
- **Dónde:** `src/content/hsk2/m16.ts:46`, `:56`, `:129`; `src/content/hsk2/m17.ts:106`.
- **Qué pasa:** está `yí bēi shuǐ`. `杯` es 1.er tono → `一` pasa a **4.º**: **`yì bēi`**.
- **Regla:** `yī` solo/ordinal/final; **`yí` ante 4.º tono**; **`yì` ante 1.º, 2.º y 3.º**.
- **Confianza:** Verificado.
- **Arreglo:** `yì bēi` (×4).

#### CH-05 — Sandhi de `一` mal en `一个` (diálogo)
- **Dónde:** `src/lib/dialogues.ts:106`.
- **Qué pasa:** `yì ge nǚ’ér`. `个` es 4.º tono → **`yí ge`**. Además usa apóstrofo tipográfico `’`; unificar a `'`.
- **Confianza:** Verificado.
- **Arreglo:** `yǒu, yí ge nǚ'ér.`

#### CH-06 — Glosas de `上` y `下`: "encender/apagar"
- **Dónde:** `src/content/hsk1/m8.ts:24-25`.
- **Qué pasa:** `上 = subir, encender`; `下 = bajar, apagar`. Encender/apagar son **`开/关`**, que además no se enseñan en todo el curso. Un alumno produciría `✗上灯`.
- **Impacto:** vocabulario básico mal glosado y verbo real (开) ausente.
- **Confianza:** Verificado.
- **Arreglo:** `上 = subir(se)/montar(se)`; `下 = bajar(se)`; introducir `开/关` en HSK 3 (o antes).

#### CH-07 — `中饭` en lugar de `午饭`
- **Dónde:** `src/content/hsk2/m13.ts:27`, `:73`, `:77`, `:81`, `:82`, `:85`.
- **Qué pasa:** `中饭 zhōngfàn` es variante regional; el estándar y la palabra HSK es **`午饭 wǔfàn`**, junto a `早饭/晚饭`.
- **Confianza:** Verificado.
- **Arreglo:** cambiar ficha, builds y notas (el id `w-zhong-fan` puede quedarse).

#### CH-08 — `中文字` en vez de `汉字`
- **Dónde:** `src/content/hsk1/m10.ts:63`.
- **Qué pasa:** `我会写中文字` es coloquial; el curso enseña `汉字` en S-20. En S-10 aún no se ha introducido.
- **Confianza:** Verificado.
- **Arreglo:** `我会写中文。` o introducir `汉字` aquí.

#### CH-09 — Glosa de `麻` como "cáñamo (soso)"
- **Dónde:** `src/content/hsk0.ts:32`, `:69`.
- **Qué pasa:** `麻` = cáñamo; también "entumecido" (`麻木`). **"Soso" no es un significado de 麻.**
- **Confianza:** Verificado.
- **Arreglo:** `cáñamo (también: entumecido)`.

### 2.2 Moderados (didáctica / registro / naturalidad)

#### CH-10 — Los diálogos usan vocabulario que no se enseña
- **Dónde:** `src/lib/dialogues.ts` (varias líneas).
- **Qué pasa:** el encabezado promete "solo vocabulario del sector o anterior", pero aparecen:
  - `呢` (11 líneas; nunca se enseña ni explica),
  - `也` (solo dentro de frases, sin ficha),
  - `不客气` (sin ficha ni explicación),
  - `还` en sentido "también" (solo se enseña `还是`),
  - `贵` ("caro"; m9 promete que llega en HSK 2 y no llega),
  - `这儿/那儿` (solo se enseña `哪儿`).
- **Impacto:** rompe la regla "cero sorpresas" y la radio pide identificar/traducir esas líneas.
- **Confianza:** Datos + Verificado.
- **Arreglo:** añadir esas palabras al curso o reescribir las líneas.

#### CH-11 — Diálogo incoherente (copia-pega)
- **Dónde:** `src/lib/dialogues.ts:193-196` (`dlg-gustos-2`).
- **Qué pasa:** "¿Qué te gusta comer?" → "Me gusta la fruta. ¿Y a ti?" → **"Estoy muy cansado. Quiero dormir."**
- **Confianza:** Verificado.
- **Arreglo:** respuesta coherente (`我也喜欢水果。`).

#### CH-12 — `什么` traducido como "cuál"
- **Dónde:** `src/lib/dialogues.ts:239`.
- **Qué pasa:** `汽车和自行车，你喜欢什么？` = "¿qué te gusta?"; para "¿cuál (de los dos)?" es **`哪个`**.
- **Confianza:** Verificado.
- **Arreglo:** `你更喜欢哪个？` o cambiar la traducción.

#### CH-13 — Registro de `你几岁` y promesa incumplida
- **Dónde:** `src/lib/dialogues.ts:80`; `src/content/hsk1/m3.ts:110`.
- **Qué pasa:** un adulto pregunta a otro `你几岁？` (propio de niños). La nota dice que la versión cortés "la verás más adelante", pero **`你多大？` no aparece en ningún sitio**.
- **Confianza:** Verificado.
- **Arreglo:** usar y enseñar `你多大？`.

#### CH-14 — Regla demasiado absoluta sobre `的` con `家`
- **Dónde:** `src/content/hsk1/m4.ts:49-52`.
- **Qué pasa:** "Para decir mi casa **NO** se añade 的". **`我的家` es gramatical**; lo idiomático es `我家`.
- **Confianza:** Verificado.
- **Arreglo:** explicar que `我家` es lo normal y `我的家` también es correcto (más marcado).

#### CH-15 — Contradicción sobre el adjetivo sin `很`
- **Dónde:** `src/content/hsk1/m9.ts:52` vs `src/content/hsk2/m13.ts:107`.
- **Qué pasa:** m9 dice que `她漂亮` "suena a exclamación"; m13 dice que "suena a comparación". La explicación correcta es la de m13 (lectura contrastiva; la exclamación pide `真/太…了`).
- **Confianza:** Verificado.
- **Arreglo:** unificar con m13.

#### CH-16 — Explicación incompleta de `q/x/j` y de la `ü`
- **Dónde:** `src/content/hsk0.ts:101-105`.
- **Qué pasa:** el bloque "q/x/j" solo describe `q` ("ch suave"; mejor "ch aspirada") y no describe `j` (ch sin soplo) ni `x` (sh). En `ü (qù, yú)` no se explica que tras **j/q/x/y la ü se escribe `u`**.
- **Confianza:** Verificado.
- **Arreglo:** completar la nota (es la base fonética del Sector 0).

#### CH-17 — `借` glosado solo como "prestar"
- **Dónde:** `src/content/hsk2/m16.ts:21`.
- **Qué pasa:** `借` significa **prestar y pedir prestado**; la nota lo explica, pero la ficha aislada induce a error.
- **Confianza:** Verificado.
- **Arreglo:** `prestar / pedir prestado`.

#### CH-18 — Erratas visibles (agrupadas)
| Dónde | Texto actual | Corrección |
|---|---|---|
| `src/content/hsk1/m5.ts:48` | "En también localiza cosas…" | "**在** también localiza cosas…" |
| `src/content/hsk2/m11.ts:49` | "los anclas del tiempo" | "**las** anclas del tiempo" |
| `src/content/hsk2/m13.ts:77`, `:82` | "comedero del refugio" | "**comedor** del refugio" |
| `src/content/hsk2/m11.ts:119` | "我准备明年去中国? aún suena…" | eliminar el `?` suelto / reescribir |
| `src/components/challenges.tsx:938` | "PRONUNCIAción PERFECTA" | "PRONUNCIACIÓN PERFECTA" |
| `src/components/challenges.tsx:938` | "NO TE ENTENDIDO" | "NO TE HE ENTENDIDO" |
| `src/content/hsk2/m16.ts:100,108,113`; `dialogues.ts:255,257` | "dos kuais" | "dos kuai" o "dos yuanes" |
| `src/pages/ProfilePage.tsx:2` | comentario "PERFIL DEL HABITANTE" | "PERFIL DEL MORADOR" |
| `src/content/hsk1/m3.ts:21` | literal de `二`: "para contar se usa 两" | "para contar **cosas (con clasificador)** se usa 两" |
| `src/content/hsk1/m3.ts:29` | literal de `个`: "se escribe sin tono" | la ficha es `gè`; aclarar que suena neutro en `这个/一个` |

#### CH-19 — Promesas de contenido sin cumplir
- `m3:110` promete `你多大？` (no existe).
- `m11:51` promete `再说` (no existe).
- `m19:77` promete `或者` (no existe).
- `m9:109` promete "caro" (`贵`) en HSK 2 (no existe).
- `m17:74` promete `吧` en S-19 (✅ sí se cumple).
- **Arreglo:** cumplirlas en HSK 3 o quitar la promesa.

### 2.3 Lo que está bien en el chino (no tocar)
- Validez silábica: las 680 cadenas de pinyin segmentan en sílabas válidas; sin `shong` ni `u:` sueltos.
- Marcas de tono correctamente colocadas (a > o > e > última vocal en `iu/ui`).
- `ü` y apóstrofos correctos en el contenido existente (`nǚ'ér`, `shí'èr`, `lǜsè`).
- Medida correcta: `两个女儿`, `一杯水`, `一本书`, `两块钱`, `二十一个人`.
- Uso correcto de `了/过/着`, `还是/或者`, `因为…所以`, `太…了`, `比`, `V+到`, `V+来/去`.
- Sin ids duplicados ni redefiniciones conflictivas; alineación 1:1 en **todos** los builds y en las **100** líneas de diálogo.
- Caracteres hanzi correctos para todas las glosas.

---

## 3. Bugs funcionales

### 3.1 Críticos

#### BUG-01 — Todo el audio MP3 da 404 en producción
- **Dónde:** `src/lib/audio.ts:92` y `:104`.
- **Código:**
  ```ts
  const url = `/audio/${entry.id}.mp3`
  const url = `/audio/${sentenceAudioId(s)}.mp3`
  ```
- **Qué pasa:** la app se despliega con base `/chinese-vault/` (`vite.config.ts:10`, `npm run build:pages`). Esas rutas absolutas apuntan a la raíz del dominio.
- **Evidencia real (web desplegada):**
  - `https://axgaldo.github.io/audio/w-ni-hao.mp3` → **404**
  - `https://axgaldo.github.io/chinese-vault/audio/w-ni-hao.mp3` → **200 `audio/mp3`**
  - El bundle desplegado contiene literalmente `` `/audio/${e.id}.mp3` ``.
- **Impacto:** en producción **nunca suena el MP3**; se cae siempre al TTS del navegador (y en dispositivos sin voz china, silencio). En local no se ve porque `base = '/'`. Todo el pipeline de `npm run audio` queda inútil en el único despliegue real.
- **Confianza:** Verificado (HTTP + bundle desplegado).
- **Arreglo:** `` const base = import.meta.env.BASE_URL `` y `${base}audio/...` (como ya hace `notify.ts:62`).

#### BUG-02 — Cada lección pierde el último paso: XP, precisión, 3★ y +20
- **Dónde:** `src/components/LessonRunner.tsx:95-124` (`finish`) y `:126-150` (`handleResult`).
- **Qué pasa:** `handleResult` llama a `finish()` en el mismo cierre, pero `finish` lee `firstTry` y `xpGain` **antes** de que React aplique los `setState`. El último paso de la cola nunca está en `firstTry` ni en `xpGain`.
- **Datos verificados (calculados sobre el curso real):**
  - **79/79 lecciones terminan en un paso puntuable** → todas pierden el último paso.
  - **8 lecciones no pueden llegar a 3★** ni con una partida perfecta: `hsk0-l1` (9 pasos, máx. 89%), `m1-l1` (86%), `m1-l2` (88%), `m3-l4` (89%), `m10-l2` (89%), `m11-l2` (89%), `m15-l3` (89%), `m20-l3` (86%).
  - `accuracy === 1` es inalcanzable → **el bonus `BONUS_PERFECT` (+20) no se paga nunca**.
  - Se pierde el XP del último paso (10 o 5) en cada lección.
- **Impacto:** estadísticas, estrellas, logro "Perfeccionista", encargo "consigue 3★" y economía de XP quedan sistemáticamente falseados. Es silencioso.
- **Confianza:** Verificado (código + cálculo).
- **Arreglo:** calcular `nextFirst` y `nextXp` una vez en el handler y pasarlos a `finish(nextFirst, nextXp)`; usar esos valores en `setResult`/`addXp`.

#### BUG-03 — El audio de la lección de tonos enseña el tono equivocado
- **Dónde:** `src/content/hsk0.ts:71-75` (apunte `n-tonos`), `src/lib/pinyin.ts:159-165` (`pinyinSlug`), `scripts/generate-audio.ts:51-58`.
- **Qué pasa:** `pinyinSlug` borra los tonos. Las frases `妈 mā`, `马 mǎ`, `骂 mà` comparten el slug **`s-ma`**; el generador se queda con la primera (妈). Al pulsar 马 o 骂 en el apunte (que usa `speakSentence`), **suena `mā`**.
- **Evidencia:** colisiones de slug calculadas: `s-ma: 妈 / 马 / 骂`; las otras 4 colisiones son solo puntuación (`你好` vs `你好！`, etc.).
- **Impacto:** el cuarteto tonal es el corazón del Sector 0; el alumno oye el mismo tono para tres palabras distintas.
- **Confianza:** Verificado (datos + código).
- **Arreglo:** slug con tonos (`ma1`, `ma3`, `ma4`) o hash del hanzi; regenerar audio y añadir test de unicidad por hanzi.

#### BUG-04 — La racha nunca se reinicia
- **Dónde:** `src/stores/useProgress.ts:107-108`.
- **Código:**
  ```ts
  const streakDays =
    s.lastStudyDay === localISO(-1) ? s.streakDays + 1 : Math.max(1, s.streakDays)
  ```
- **Qué pasa:** si faltaste varios días, conserva la racha anterior. Debería volver a **1**.
- **Evidencia (script aislado, `tsx`):** estado `{streakDays: 7, lastStudyDay: hace 5 días}` + `logActivity('steps', 1)` → **`streakDays = 7`** (esperado 1).
- **Impacto:** Home, Sidebar, Perfil, logro "Fuego Amigo" y recordatorio de racha muestran una racha falsa que solo crece.
- **Confianza:** Verificado.
- **Arreglo:** `: 1`.

#### BUG-05 — El bono diario de +5 chapas es inalcanzable
- **Dónde:** `src/stores/useProgress.ts:233-237` y `:261-265`.
- **Qué pasa:** `day = refreshDay(s)` ya se ejecutó antes (el primer acierto del día llama `logActivity` → `refreshDay`, que pone `lastStudyDay = hoy`). Cuando llega `completeLesson`/`finishReviewSession`, la comparación `day.lastStudyDay !== s.lastStudyDay` es falsa → **nunca paga `CAPS_DAILY_BONUS`**.
- **Evidencia (script aislado):** día nuevo con racha de ayer; `logActivity('steps',1)` + `addXp(10)` + `completeLesson('hsk0-l1',3,1)` → **7 chapas** (3 de lección + 4 de encargo auto-canjeado). Con el bono serían ≥12.
- **Impacto:** se incumple una mecánica documentada; la economía de chapas queda corta.
- **Confianza:** Verificado.
- **Arreglo:** pagar el bono donde realmente rueda el día (en `refreshDay` o con un marcador `dailyBonusDay` persistido), no en la llamada de completado.

#### BUG-06 — Pinyin multislábico coloreado con el tono de la primera sílaba
- **Dónde:** `src/components/Pinyin.tsx:13-34` + `src/lib/pinyin.ts:145-147`.
- **Qué pasa:** `tokenize` divide por espacios; una palabra como `péngyou` es un solo token y `toneOfSyllable` devuelve el tono de la **primera** sílaba. **133 de 252 fichas** son multisílabas en un solo token.
- **Ejemplos:** `xièxie` (4-5) se pinta entera como tono 4; `duìbuqǐ` (4-5-3) entera como tono 4; `Zhōngguó` (1-2) entera como tono 1.
- **Impacto:** el color por tono es una seña pedagógica central y está mal en más de la mitad del vocabulario.
- **Confianza:** Verificado (datos).
- **Arreglo:** tokenizar con `syllabify()` y pintar cada sílaba con su tono.

#### BUG-07 — Opciones ambiguas: dos respuestas visibles idénticas
- **Dónde:** `src/lib/questions.ts:19-30` (`optionsFor`), usado en `challenges.tsx:308/360`; renderizado en `challenges.tsx:341` (`opt.es`) y `WordInMode` (`:177-188`).
- **Qué pasa:** `optionsFor` deduplica por **id**, no por la etiqueta que se pinta. Con el modo pinyin por defecto:
  - **Pinyin idéntico:** `他/她` (tā), `做/坐` (zuò), `快/块` (kuài), `近/进` (jìn). En `choose-hanzi` y `listen` se ven dos botones idénticos; solo uno es correcto.
  - **Español idéntico:** `妈/妈妈` = "mamá"; `中文/汉语` = "chino (idioma)". En `choose-es` y `match` aparecen dos opciones iguales.
- **Impacto:** retos irresolubles o de azar; empeora con HSK 3 (más homófonos y sinónimos).
- **Confianza:** Verificado (datos + código).
- **Arreglo:** deduplicar por etiqueta renderizada: `es` para `choose-es`/`match`, pinyin sin tonos en modo pinyin, hanzi en los demás.

#### BUG-08 — `type-pinyin` imprime la respuesta
- **Dónde:** `src/components/challenges.tsx:576`.
- **Código:** `<p>… p. ej. «{plain.toLowerCase().normalize('NFD').replace(...)}»</p>` donde `plain` es **el pinyin del objetivo**.
- **Impacto:** el reto es copiar; el SRS lo usa en palabras cortas (`reviewStepFor`, `reps % 5 === 3`).
- **Confianza:** Verificado.
- **Arreglo:** eliminar la interpolación o usar un ejemplo genérico fijo.

#### BUG-09 — El mapa desbloquea la primera lección de todos los sectores, pero la página la rechaza
- **Dónde:** `src/pages/HomePage.tsx:151` (`i === 0`) vs `src/pages/LessonPage.tsx:20` (`isLessonUnlocked` lineal global).
- **Qué pasa:** cada módulo pinta su lección 1 como desbloqueada (y "actual"), pero al pulsarla `LessonPage` redirige a `/`. Son **20 botones muertos** hoy y serán 30 con HSK 3. Además, 20 nodos aparecen como "actual" a la vez.
- **Confianza:** Código.
- **Arreglo:** usar la misma regla de desbloqueo global en Home (o marcar candado y deshabilitar), y que solo un nodo sea "current".

### 3.2 Moderados

#### BUG-10 — Desafío oral: puntuación por carácter, no por sílaba, y micrófono sin limpieza
- **Dónde:** `src/components/challenges.tsx:809-954`.
- **Qué pasa:**
  - La puntuación es `alts.some(a => a.includes(ch))` por **carácter**. Si el ASR devuelve `他` cuando dices `她` (mismo sonido), se marca mal aunque la pronunciación sea correcta. Lo mismo con `做/坐`, `快/块`, `近/进`.
  - No hay `useEffect` de limpieza: al salir del paso, el reconocimiento sigue activo (micrófono encendido hasta que el navegador lo corte).
  - `start()` hace `abort()` del reconocimiento anterior; el `onerror('aborted')` del anterior puede mostrar "No te he oído bien" mientras el nuevo está escuchando.
- **Impacto:** falso negativo en homófonos (frecuentes) y UX de micrófono.
- **Confianza:** Código.
- **Arreglo:** puntuar por pinyin sin tonos (o aceptar homófonos), limpiar en unmount y comparar `recRef.current !== rec` en los handlers.

#### BUG-11 — `match` con fallos cuenta como acierto a la primera
- **Dónde:** `src/components/challenges.tsx:1187-1197` y `:1255`; `LessonRunner.tsx:129`.
- **Qué pasa:** `MatchView` llama `onResult(true, ...)` incluso con errores; `LessonRunner` guarda `firstTry[idx] = true`. Un match con 5 fallos cuenta como acierto perfecto para estrellas/precisión (solo baja el XP a +5).
- **Impacto:** infla 3★ y `avgAccuracy`.
- **Confianza:** Código.
- **Arreglo:** pasar `correct = errors === 0` (y ajustar el XP aparte) o registrar el fallo en `firstTry`.

#### BUG-12 — Doble pulsación en CONTINUAR no está bloqueada
- **Dónde:** `challenges.tsx:115` (botón `Feedback`), `LessonRunner.tsx:126`, `ReviewPage.tsx:47`.
- **Qué pasa:** no hay latch/disabled; un doble toque puede ejecutar dos veces `completeLesson`/`gradeEntry`/`finishReviewSession` (chapas, contadores, intervalos SRS).
- **Impacto:** según el timing, duplica recompensas o avanza dos pasos.
- **Confianza:** Código (no reproducido).
- **Arreglo:** `useRef` "answered" por paso montado o `disabled` inmediato.

#### BUG-13 — `toastCaps(0, …)` al comprar
- **Dónde:** `useProgress.ts:297`, `:321`, `:344`; `useToasts.tsx:42-45`.
- **Qué pasa:** al comprar tema/fuente/VFX se muestra **"+0 chapas — tema adquirido: X"**.
- **Impacto:** texto absurdo visible en cada compra.
- **Confianza:** Verificado.
- **Arreglo:** usar `useToasts.push` sin importe para compras.

#### BUG-14 — "ESCUCHAR TODO SEGUIDO" solapa todas las voces
- **Dónde:** `src/pages/DialoguesPage.tsx:166`; `src/lib/audio.ts:66-78`.
- **Qué pasa:** `dialogue.lines.forEach(l => speakSentence(l))` crea N `Audio` a la vez; `tryPlayFile` no pausa el anterior. En MP3 se solapan; con TTS solo funciona por accidente (`cancel()`).
- **Confianza:** Código.
- **Arreglo:** reproducir en secuencia (`onended`) o hacer cola en `audio.ts`.

#### BUG-15 — Contador del Archivo
- **Dónde:** `src/pages/ArchivePage.tsx:43`.
- **Qué pasa:** `PALABRAS (n)` muestra el número **filtrado**, no el total.
- **Confianza:** Código.
- **Arreglo:** mostrar el total y, si acaso, "filtradas: n".

#### BUG-16 — Badges de repaso obsoletos
- **Dónde:** `NavBar.tsx:15`, `SideBar.tsx:23`, `HomePage.tsx:22`.
- **Qué pasa:** `Date.now()` dentro de selectores zustand; el selector solo se reevalúa si cambia el store. Una tarjeta que vence con la app abierta no enciende el badge hasta la siguiente acción.
- **Confianza:** Código.
- **Arreglo:** recalcular con un tick (p. ej. cada minuto) o al volver a la app.

#### BUG-17 — `write` sin salida y obligatorio en cada auditoría
- **Dónde:** `challenges.tsx:1059-1152`; `LessonRunner.tsx:41-52`.
- **Qué pasa:** el trazo se puntúa por IoU (≥0.5 verde, ≥0.32 ámbar); un fallo reencola. Se inyecta un `write` en **cada** lección `kind: 'review'`. Un usuario con pulso malo, sin stylus o con la fuente china sin cargar puede entrar en bucle.
- **Confianza:** Código.
- **Arreglo:** permitir "SALTAR" tras 2 fallos (sin XP) o bajar el umbral.

---

## 4. PWA

#### PWA-01 — El audio no se precachea: la clave `workbox` se ignora en `injectManifest`
- **Dónde:** `vite.config.ts:23-50` (`strategies: 'injectManifest'` + bloque `workbox`).
- **Qué pasa:** en `injectManifest` la opción válida es **`injectManifest`**, no `workbox` (confirmado en los tipos de `vite-plugin-pwa`). El build genera **14 entradas** de precache y el `sw.js` desplegado **no contiene `audio/`**.
- **Impacto:** el README promete "PWA offline, audio incluido" y es falso. Además `maximumFileSizeToCacheInBytes` tampoco se aplica.
- **Evidencia:** `dist/sw.js` y `https://axgaldo.github.io/chinese-vault/sw.js` no contienen `audio/`.
- **Confianza:** Verificado.
- **Arreglo:** mover `globPatterns`/`maximumFileSizeToCacheInBytes` a `injectManifest: { ... }` y reconstruir.

#### PWA-02 — El clic de la notificación abre una URL fuera del scope
- **Dónde:** `src/sw.ts:69` y `:74`.
- **Qué pasa:** `self.clients.openWindow('/')` abre `axgaldo.github.io/` (404) en vez de `/chinese-vault/`.
- **Confianza:** Verificado (SW desplegado).
- **Arreglo:** `new URL('index.html', self.registration.scope).href` o `'./'`.

#### PWA-03 — Las actualizaciones del SW no se activan
- **Dónde:** `src/sw.ts:54-58`; `registerSW.js` generado.
- **Qué pasa:** el SW solo hace `skipWaiting()` al recibir `SKIP_WAITING`, pero **nada lo envía**. Con `registerType: 'autoUpdate'`, una PWA instalada puede servir la versión vieja hasta cerrar todas las pestañas.
- **Confianza:** Verificado (registerSW.js desplegado).
- **Arreglo:** `self.skipWaiting()` en `install` (+ `clientsClaim`) o flujo `prompt` con UI.

---

## 5. Sincronización / Firebase

#### SYNC-01 — "BORRAR TODO" se deshace solo si Firebase está activo
- **Dónde:** `sync.ts:32-34` (no sube vacío) y `:116-119` (anti-reset); `useProgress.ts:383-385` (`reset`).
- **Qué pasa:** el reset vacía lo local, pero el próximo arranque detecta "local vacío + nube con datos" y **recupera la nube**. No hay `deleteDoc` ni tombstone.
- **Impacto:** el botón de borrar no borra de verdad en cuentas con nube.
- **Confianza:** Código.
- **Arreglo:** ruta de reset explícita que pueda sobrescribir la nube (`force`/`reset: true`) y que el anti-reset la respete.

#### SYNC-02 — `hydrate()` no migra ni mezcla en profundidad
- **Dónde:** `useProgress.ts:379-381`; `sync.ts:113-123`.
- **Qué pasa:** `set({ ...INITIAL_PROGRESS, ...p })` es mezcla superficial: un documento antiguo de Firestore reemplaza `settings`, `dailyStats` y `quests` enteros. Puede dejar `settings.scriptMode/theme/vfx/bodyFont` en `undefined` (rompe el modo de escritura y los temas) o producir `NaN` si falta un contador.
- **Confianza:** Código.
- **Arreglo:** reutilizar la misma migración/merge profundo que zustand para los datos de nube.

#### SYNC-03 — El push puede pisar un remoto más nuevo
- **Dónde:** `sync.ts:28-48` y `:113`.
- **Qué pasa:** `pushProgress` escribe sin transacción; solo se compara `updatedAt` al arrancar. Una pestaña abierta días puede sobrescribir datos más recientes. `setDoc(..., { merge: true })` además resucita claves borradas.
- **Confianza:** Código.
- **Arreglo:** `runTransaction` (leer → comparar `updatedAt` → escribir) o escribir el documento completo sin `merge` y con guarda.

#### SYNC-04 — El día solo rueda al estudiar
- **Dónde:** `useProgress.ts:101-129`; `main.tsx:28` solo llama `checkAchievements`.
- **Qué pasa:** si la app queda abierta/instalada de un día para otro, el Perfil muestra los encargos y contadores de **ayer** hasta la primera acción. `claimQuest` además no llama `refreshDay`: se puede reclamar un encargo de ayer.
- **Confianza:** Código.
- **Arreglo:** acción `syncDay()` al arrancar/volver a la app y guardar en `claimQuest`.

#### SYNC-05 — Migración de objetos anidados frágil
- **Dónde:** `useProgress.ts:390-427`.
- **Qué pasa:** `raw.dailyStats ?? emptyStats('')` y `raw.quests ?? ...` no rellenan campos nuevos dentro de objetos ya existentes. Si en el futuro se añade un contador a `DailyStats`, un estado antiguo produce `undefined + n = NaN`.
- **Confianza:** Código.
- **Arreglo:** merge profundo con los defaults (`{...emptyStats(today), ...raw.dailyStats}`).

---

## 6. Diseño, pedagogía y UX

#### UX-01 — El repaso no tiene tope
- **Dónde:** `src/lib/srs.ts:57-63`; `src/pages/ReviewPage.tsx:31-38`.
- **Qué pasa:** `dueCardIds` devuelve todas las tarjetas vencidas y la cola se monta entera. Con 252 fichas son sesiones de 100+; con HSK 3, de 600+. Si abandonas al 90%, no cobras la sesión (`finishReviewSession` solo al terminar).
- **Arreglo:** tope de 20-30 por sesión y crédito parcial al salir; o recompensa por tarjeta.

#### UX-02 — El rango máximo se alcanza al ~15% del curso
- **Dónde:** `src/types/progress.ts:184-192`.
- **Datos:** el curso actual permite ~15.380 XP; el rango máximo está a **2.200 XP**. HSK 3 añadirá ~10.000 XP más.
- **Impacto:** la progresión de rangos deja de motivar muy pronto.
- **Arreglo:** rebalancear la escalera para cubrir HSK 0-3.

#### UX-03 — Los diálogos ignoran `scriptMode`
- **Dónde:** `src/pages/DialoguesPage.tsx:237, 471-517, 535-579`.
- **Qué pasa:** "ordena la línea" usa fichas **solo hanzi**; "¿qué responde?" ofrece respuestas **solo hanzi**. En modo pinyin (el de por defecto y la filosofía del producto) el usuario no puede resolverlos sin leer caracteres.
- **Arreglo:** usar pinyin/fichas como `build`, o hanzi + pinyin según el modo.

#### UX-04 — Radio "identifica el tono" es ambiguo en palabras polisílabas
- **Dónde:** `src/pages/RadioPage.tsx:326-370`; `src/lib/radio.ts:88-96`.
- **Qué pasa:** pregunta por la primera sílaba no neutra pero reproduce la **palabra entera**; la sílaba se revela solo al responder. 134/252 fichas son polisílabas.
- **Arreglo:** reproducir solo la sílaba (`speakHanzi(item.syllable)`) o mostrar la palabra/sílaba en el enunciado.

#### UX-05 — Radio "¿qué oyes?" usa `key`/comparación por texto español
- **Dónde:** `src/pages/RadioPage.tsx:232-246`; `src/lib/radio.ts:77-81`.
- **Qué pasa:** opciones con `key={opt.es}` y comparación por `es`; hay traducciones duplicadas entre frases. Puede haber claves React repetidas y dos botones marcados a la vez.
- **Arreglo:** `key`/comparación por `sentenceAudioId(opt)`.

#### UX-06 — Layout: `min-h-dvh` + NavBar inferior
- **Dónde:** `ReviewPage.tsx:121`, `RadioPage.tsx:187`, `DialoguesPage.tsx:136,183`, `PracticePage.tsx:34`; `App.tsx:95`.
- **Qué pasa:** esas páginas ocupan 100dvh dentro de `<main>` y la NavBar (~50 px) se superpone; el runner oculta la nav, ellas no.
- **Arreglo:** `min-h-[calc(100dvh-3.25rem)]` o layout flex sin `min-h-dvh` en el hijo.

#### UX-07 — Accesibilidad
- Inputs sin `<label>`/`aria-label`: `challenges.tsx:584,655`, `RadioPage.tsx:293`, `DialoguesPage.tsx:443`.
- Canvas de escritura sin rol/etiqueta ni alternativa no visual (`challenges.tsx:1106`).
- `Meter` sin `aria-valuemin/max` (`ui.tsx:45`).
- Botones de compra/reclamo solo con icono+número sin nombre accesible (`ShopPage.tsx:58-66`, `QuestsPanel.tsx:40-49`).
- Botones 拼/拼+漢/漢 sin descripción accesible (`LessonRunner.tsx:233-246`, `ProfilePage.tsx:439-448`).

#### UX-08 — Contraste del tema Cuaderno
- **Dónde:** `index.css:30-34` (tonos) y `:198-248` (tema `notebook`).
- **Qué pasa:** los tonos 2, 3 y 5 quedan en ~1,6-2,1:1 sobre papel claro; el pinyin es difícil de leer en el tema pensado para legibilidad.
- **Arreglo:** variantes oscuras de los tokens de tono bajo `html[data-theme='notebook']`.

#### UX-09 — Escalado a HSK 3 (rendimiento/UI)
- El mapa será una lista plana de **31 sectores** sin cabeceras por HSK; el Archivo renderizará **852 fichas** sin virtualizar; el bundle principal ya está en 518 kB (167 kB gzip) y crecerá con el contenido.
- **Arreglo:** cabeceras/colapsables por HSK, paginación en Archivo, y valorar carga perezosa de módulos si el bundle se dispara.

#### UX-10 — Detalles varios
- `PracticePage.tsx:3` comentario "+3 XP" (el código da 10/5).
- `App.tsx:25` duplica la clave `cv-boot-v1` de `BootScreen.tsx:20`.
- `App.tsx:58` asigna `data-vfx` pero el CSS usa clases `.vfx-*`.
- `ui.tsx:15` `Btn` no pone `type="button"` por defecto (latente dentro de formularios).
- `RadioPage.tsx:433` el hueco ＿＿ sustituye solo la primera aparición si la palabra se repite.
- `achievements.ts:84` usa el emoji `⛓️` para chapas, que AGENTS prohíbe en la UI.
- `ReviewPage.tsx:45` la barra de progreso retrocede al reencolar un fallo.

---

## 7. Cobertura real de HSK

### COV-01 — Faltan palabras oficiales (medido contra HSK 2.0)
Lista de referencia: 150 palabras HSK 1 + 150 nuevas HSK 2. Comparación por hanzi contra **todo** el corpus (fichas, builds, ejemplos de apuntes y diálogos):

| Nivel | Como ficha | Solo dentro de frases | **No aparece en ningún texto** |
|---|---|---|---|
| HSK 1 | 121/150 | 10 | **19** |
| HSK 2 | 52/150 | 22 | **76** |

**HSK 1 nunca mencionadas (19):** 北京, 出租车, 打电话, 东西, 都, 饭馆, 飞机, 看见, 没关系, 谁, 同学, 喂, 下雨, 些, 衣服, 怎么, 怎么样, 中午, 住.
**HSK 1 solo dentro de frases (10):** 本, 不客气, 回, 火车站, 开, 买, 没, 哪, 呢, 书.
**HSK 2 nunca mencionadas (76):** 百, 报纸, 唱歌, 穿, 船, 次, 从, 错, 打篮球, 大家, 弟弟, 第一, 懂, 非常, 告诉, 哥哥, 公共汽车, 公斤, 公司, 欢迎, 回答, 机场, 件, 教室, 姐姐, 介绍, 就, 考试, 可能, 可以, 快乐, 路, 旅游, 卖, 妹妹, 票, 妻子, 千, 晴, 去年, 让, 上班, 身体, 生病, 生日, 时间, 事情, 手表, 它, 踢, 跳舞, 外, 完, 晚上, 西瓜, 洗, 向, 小时, 笑, 姓, 休息, 雪, 眼睛, 药, 要, 已经, 阴, 游泳, 右边, 元, 运动, 早上, 张, 丈夫, 着, 左边.
**HSK 2 solo dentro de frases (22):** 白, 别, 出, 得, 得, 贵, 好吃, 号, 黑, 红, 课, 离, 每, 男人, 女人, 题, 玩, 为, 问, 颜色, 也, 再.

- **Impacto:** "HSK 1/2 COMPLETO" no se sostiene. Faltan palabras básicas como `买`, `怎么`, `谁`, `都`, `也`, `要`, `可以`, `时间`, `晚上`, `生日`, `问`, `贵`.
- **Confianza:** Datos (lista HSK 2.0 de referencia; puede haber diferencias menores entre ediciones).
- **Arreglo:** cerrar el hueco antes de HSK 3 o rebautizar el nivel ("syllabus inspirado en HSK") hasta completarlo.

### COV-02 — Los textos internos exageran el recuento
- `m10.ts:72`: "~150 palabras" (hay 131 contando HSK 0; 117 si solo HSK 1).
- `m20.ts:123`: "unas ~300 palabras" (hay 252).
- `README.md`: "~150" y "~130 nuevas".
- **Confianza:** Datos.

### COV-03 — Los tests de integridad no cubren lo que más falla
- `content/index.test.ts:126-139` valida la alineación 1:1 **solo de los `build`**.
- **No** valida: fichas, ejemplos de apuntes, líneas de diálogo, unicidad de `es`, unicidad de slugs de audio, anclas `DIALOGUES.sector`, ni fichas huérfanas.
- **Impacto:** BUG-03, CH-01 y las opciones ambiguas pasan desapercibidos.
- **Arreglo:** ampliar el test de integridad (ver §8).

---

## 8. Preparación para HSK 3

### 8.1 Bloqueos duros
| ID | Archivo | Cambio |
|---|---|---|
| **READY-01** | `src/types/content.ts:105` | `hsk: 0 \| 1 \| 2` → `0 \| 1 \| 2 \| 3` |
| **READY-02** | `src/content/index.test.ts:40` | aceptar `3` (mejor: derivar de una constante `HSK_LEVELS`) |

### 8.2 Corrección del plan (importante)
**HSK 3 añade ~300 palabras nuevas (600 acumuladas)**, no 600 nuevas. `AGENTS.md` dice "~600 palabras nuevas (el doble que HSK 2)"; eso es escala de HSK 4. Si se implementan 600 nuevas se duplica el trabajo y se invade el nivel siguiente.

Además, el reparto propuesto (10 sectores de 40-50 palabras, 4-5 lecciones) da **8-10 palabras nuevas por lección**, por encima de la densidad actual (máx. 37 pasos en `m3-l1`). Recomendación: **6-7 lecciones por sector** o 4-5 lecciones de 6-8 palabras.

### 8.3 Checklist de implementación
1. `src/types/content.ts` → unión con `3`.
2. `src/content/index.test.ts` → permitir `3` + nuevos tests (§8.5).
3. Crear `src/content/hsk3/m21.ts … m30.ts` (`id: 'm21'`, `hsk: 3`, `code: 'S-21'`, `entries`, 4-6 lecciones, auditoría final).
4. `src/content/index.ts` → 10 imports + 10 entradas **al final** del array `modules` (el orden gobierna `isLessonUnlocked`/`nextLessonId`; no reordenar).
5. `src/lib/dialogues.ts` → diálogos con `sector: 'm21'`… (id de módulo, **no** `S-21`).
6. `src/lib/version.ts` + `package.json` → **v2.9.0**.
7. `npm run audio` (el generador descubre solo el contenido nuevo).
8. Actualizar docs/metadata que dicen "HSK 0-1" (ver §9).
9. Rebalancear rangos y tope de repaso (§6).
10. Cabeceras por HSK en el mapa y paginación del Archivo.

### 8.4 Riesgos ocultos (no están en el checklist actual)
- **Apóstrofos y silabificador:** `syllabify('nǚér')` → `nüe + r`; `syllabify('Xīān')` → 1 sílaba. Los builds lo detectan (test 1:1), pero **las fichas no**. Regla de autoría: `nǚ'ér`, `dì'èr`, `Xī'ān`, `yú'é`, `qǐ'é`. Añadir test 1:1 para fichas, ejemplos y diálogos.
- **Slugs de audio sin tono:** con 300 palabras nuevas y nuevas frases, las colisiones de `pinyinSlug` crecen. Hacer el slug único por hanzi/tonos y testear.
- **Coste del CI de audio:** hoy 565 MP3 y `npm run audio` se ejecuta entero en cada deploy (sin caché). Con HSK 3 serán ~1.200-1.500 archivos y 20-30 min de TTS; un solo fallo (`process.exitCode = 1`) tumba el deploy. Cachear `public/audio` por hash de contenido.
- **Rendimiento:** 852 fichas en el Archivo sin virtualizar; 31 tarjetas en el mapa; bundle +~100 kB. Aceptable a corto plazo, pero conviene paginar/virtualizar.
- **Estándar:** en 2026 conviven HSK 2.0 (150/300/600) y HSK 3.0 (300/500/1000 en la versión 2026). El curso es 2.0; etiquetarlo así o elegir explícitamente.

### 8.5 Tests que conviene añadir antes de HSK 3
1. **Fichas:** `syllabify(pinyin).length === hanzi.length` (sin puntuación).
2. **Diálogos:** misma comprobación por línea + `DIALOGUES.every(d => modules.some(m => m.id === d.sector))`.
3. **Slugs de audio:** dos hanzi distintos no pueden compartir `sentenceAudioId`.
4. **Etiquetas visibles:** en un mismo reto no puede haber dos opciones con la misma etiqueta renderizada (`es` o pinyin sin tonos).
5. **Fichas huérfanas:** toda entrada de `m.entries` debe aparecer en algún paso.
6. **Store:** racha que se rompe y bono diario (hoy no hay ningún test de `useProgress`).
7. **Alineación:** extender el 1:1 a `note.examples` (CH-02 habría saltado con el conteo, no con la corrección lingüística).

---

## 9. Documentación desactualizada

| Dónde | Dice | Realidad |
|---|---|---|
| `README.md:21` | "Qué tiene hoy (v0.3)" | v2.8.0 |
| `README.md:58` | "50 tests" | 51 |
| `README.md:25,175` | "HSK 0-1" | HSK 0-2 |
| `README.md:52` | misiones "directamente en el mapa" | ahora en Perfil |
| `README.md` (PWA) | "precachea la app completa, audio incluido" | audio no precacheado (PWA-01) |
| `package.json:6` | "HSK 0-1" | HSK 0-2 |
| `index.html:11` | meta description "HSK 0-1" | HSK 0-2 |
| `vite.config.ts:29` | manifest "HSK 0-1" | HSK 0-2 |
| `AGENTS.md:60,72,381` | "50 tests" | 51 |
| `AGENTS.md` | "Habitante Errante → Leyenda del Vault" | Morador Errante → Supervisor del Refugio |
| `AGENTS.md` | "19 diálogos" | 20 |
| `AGENTS.md` | "~600 palabras nuevas" HSK 3 | ~300 nuevas (600 acumuladas) |
| `PracticePage.tsx:3` | "+3 XP por acierto" | 10/5 |
| `ProfilePage.tsx:2` | "PERFIL DEL HABITANTE" | término prohibido |

---

## 10. Lo que funciona (no romper)

- Arquitectura de contenido data-driven: añadir módulos solo toca el registro; mapa, radio, SRS, caravana y audio se alimentan solos.
- 51 tests reales, con integridad del curso y alineación 1:1 de builds.
- SRS conforme a la especificación (nueva → mañana; again 10 min; hard ×1.2; good ×ease; easy ×1.3; ease mín. 1.3).
- Los bugs históricos documentados **no están**: no hay fall-through en `ChallengeView`, no hay veredicto `state === 'ok'` en diálogos, y `key={pos}` se respeta en runner, repaso, radio, diálogos y práctica.
- `scriptMode` funciona como se describe (pinyin / ambos / hanzi, con revelado al tocar).
- Versionado centralizado (`lib/version.ts`), sin cadenas hardcodeadas en Home/Sidebar/Boot/Perfil.
- PWA y Firebase opcionales; el SDK de Firebase se carga perezosamente.
- Audio local completo (0 MP3 faltantes) y generador que descubre contenido nuevo.
- Chino de base sólido: pinyin válido, tonos bien colocados, medida correcta, gramática bien usada y sin ids duplicados.

---

## 11. Plan de acción priorizado

### P0 — antes de cualquier otra cosa (silenciosos y en lecciones tempranas)
1. **BUG-01** audio base path.
2. **BUG-02** último paso de la lección.
3. **CH-01** `qǐngwèn`; **CH-02** 分钟 → 分; **CH-03** 比…更; **CH-04/05** sandhi de 一.
4. **BUG-03** colisión `s-ma`.
5. **CH-06** glosas de 上/下 (+ enseñar 开/关).

**Criterio de aceptación P0:** en la web desplegada suena `/chinese-vault/audio/...`; una lección perfecta puede dar 100% y +20; 马/骂 suenan distinto; `qǐngwèn` en las 6 apariciones; la hora se escribe con 分.

### P1 — integridad del producto (antes de HSK 3)
6. **BUG-04** racha; **BUG-05** bono diario.
7. **BUG-06** color por sílaba.
8. **BUG-07** opciones ambiguas.
9. **BUG-08** `type-pinyin`.
10. **BUG-09** desbloqueo Home ↔ Lesson.
11. **UX-01** tope de repaso; **UX-02** rangos.
12. **COV-01** cerrar las palabras HSK 1/2 que faltan (o rebautizar el nivel).

### P2 — calidad y robustez
13. PWA: **PWA-01/02/03**.
14. Diálogos: **UX-03**, **CH-10**, **CH-11**, **CH-12**, **CH-13**.
15. Sincronización: **SYNC-01/02/03/04/05**.
16. **BUG-10/11/12/13/14**; **UX-04/05/06/07/08**; **CH-14…CH-19**.
17. Documentación (**§9**) y ampliación de tests (**§8.5**).

---

## Apéndice A — Comandos de verificación

```powershell
# Baseline
npm run test        # 51 passed
npm run lint
npm run build

# Audio en producción (BUG-01)
Invoke-WebRequest -UseBasicParsing -Method Head 'https://axgaldo.github.io/audio/w-ni-hao.mp3'                    # 404
Invoke-WebRequest -UseBasicParsing -Method Head 'https://axgaldo.github.io/chinese-vault/audio/w-ni-hao.mp3'      # 200 audio/mp3

# El bundle desplegado contiene la ruta absoluta
Invoke-WebRequest -UseBasicParsing 'https://axgaldo.github.io/chinese-vault/assets/index-DoGZkqVU.js' -OutFile $env:TEMP\deployed.js
Select-String -Path $env:TEMP\deployed.js -Pattern '/audio/' -SimpleMatch

# El SW desplegado no contiene audio
Invoke-WebRequest -UseBasicParsing 'https://axgaldo.github.io/chinese-vault/sw.js' -OutFile $env:TEMP\sw.js
Select-String -Path $env:TEMP\sw.js -Pattern 'audio/' -SimpleMatch   # sin resultados
```

Scripts usados para las tablas (ejecutables con `npx tsx`, sin tocar el repo):

```ts
// Alineación 1:1 de fichas y ejemplos
import { allLessons, entriesById } from './src/content'
import { syllabify } from './src/lib/pinyin'
for (const e of entriesById.values()) {
  const chars = [...e.hanzi.replace(/[。，？！、·…—\s]/g, '')].length
  if (chars !== syllabify(e.pinyin).length) console.log(e.id, e.hanzi, e.pinyin)
}

// Duplicados visibles
const byEs = new Map<string, string[]>()
for (const e of entriesById.values()) (byEs.get(e.es) ?? byEs.set(e.es, []).get(e.es)!).push(e.hanzi)

// Racha / bono diario (con un shim de localStorage; ver §3 BUG-04/05)
```

---

## Apéndice B — Tablas de datos

### B.1 Lecciones que no pueden llegar a 3★ por BUG-02
`hsk0-l1` (9 pasos, máx. 89%), `m1-l1` (7, 86%), `m1-l2` (8, 88%), `m3-l4` (9, 89%), `m10-l2` (9, 89%), `m11-l2` (9, 89%), `m15-l3` (9, 89%), `m20-l3` (7, 86%).

### B.2 Colisiones de slug de audio
| Slug | Hanzi |
|---|---|
| `s-ma` | 妈 / 马 / 骂 (**dañina**: tonos distintos) |
| `s-ni-hao` | 你好 / 你好！ (puntuación) |
| `s-xiexie` | 谢谢 / 谢谢！ (puntuación) |
| `s-wo-hen-lei-wo-xiang-shuijiao` | 我很累，我想睡觉。 / 我很累。我想睡觉。 |
| `s-yizhi-zou-ranhou-you-guai` | 一直走，然后右拐。 / 一直走，然后右拐？ |

### B.3 Duplicados visibles en el vocabulario
- Traducción: `mamá` → 妈 / 妈妈; `chino (idioma)` → 中文 / 汉语.
- Pinyin: `tā` → 他 / 她; `zuò` → 做 / 坐; `kuài` → 快 / 块; `jìn` → 近 / 进.

### B.4 Silabificador: casos que fallan sin apóstrofo
| Entrada | Resultado | Correcto |
|---|---|---|
| `Xīān` | `Xīan` (1 sílaba) | `Xī'ān` |
| `nǚér` | `nüe` + `r` | `nǚ'ér` |
| `dìèr` | `die` + `r` | `dì'èr` |
| `yúé` | 1 sílaba | `yú'é` |
| `qǐé` | 1 sílaba | `qǐ'é` |

---

*Fin del informe original (v2.8.0, commit `caeec97`). La sección siguiente documenta la resolución.*

---

## 12. Estado de resolución (v2.9.0 — commit `a4c6ced`)

> Toda la **ola P0 y P1** del §11 está aplicada y verificada, más la mayoría de P2.
> Tests: **54/54** (antes 51; +3 de integridad nuevos). `tsc`, `lint` y `build` verdes.
> Verificación en navegador: audio por tono (`s-ma3` ≠ `s-ma4`), lección con 100% y 3★ alcanzables, opciones sin duplicados, SW con 438 entradas precacheadas.

### 12.1 Corregidos y verificados

| Hallazgo | Arreglo aplicado | Estado |
|---|---|---|
| **BUG-01** audio 404 en producción | `import.meta.env.BASE_URL` en `speakEntry`/`speakSentence`/secuencial | ✅ |
| **BUG-02** último paso perdido | `finish(nextFirst, nextXp)` con estado calculado en el handler | ✅ verificado: hsk0-l1 da 100%/3★ (antes máx. 89%) |
| **BUG-03** slug `s-ma` colisionaba | `pinyinSlug` con tonos (`ma1`/`ma3`/`ma4`, ü→v); 558 MP3 regenerados + `audio:clean` borra los 447 viejos | ✅ verificado en red |
| **BUG-04** racha nunca reiniciaba | `refreshDay`: gap > 1 día → streak = 1 | ✅ |
| **BUG-05** bono diario inalcanzable | el bono lo paga `refreshDay(payBonus)` la primera vez que rueda el día; `syncDay()` al abrir la app sin pagar | ✅ |
| **BUG-06** tono por palabra | `<Pinyin>` tokeniza con `syllabify()` (cada sílaba con su tono) | ✅ |
| **BUG-07** opciones duplicadas | `optionsFor(..., sameLabel)` deduplica por etiqueta visible (es / pinyin sin tonos / hanzi) | ✅ verificado (m2-l1 sin dupes) |
| **BUG-08** respuesta impresa | ejemplo genérico fijo «ni hao» | ✅ |
| **BUG-09** desbloqueo mapa↔lección | Home usa `isLessonUnlocked` global; un único nodo "actual" (`nextLessonId`) | ✅ |
| **BUG-10** oral: homófonos + mic | puntuación tolerante a homófonos (pinyin sin tonos), `continuous` + **ventana mínima 2 s** (sílabas cortas ya se registran), limpieza al desmontar | ✅ (pide test de micro real) |
| **BUG-11** match con fallos = acierto | `onResult(errors === 0, ...)`; con fallos 0 XP y reintento | ✅ |
| **BUG-12** doble CONTINUAR | latch en `Feedback` | ✅ |
| **BUG-13** `+0 chapas` | `toastPurchase()` sin importe | ✅ |
| **BUG-14** ESCUCHAR TODO solapado | `speakSentencesSequentially()` con `onended` | ✅ |
| **BUG-15** contador Archivo | muestra el total (`seen.length`) | ✅ verificado |
| **BUG-16** badges obsoletos | tick de 60 s en NavBar | ✅ |
| **PWA-01** audio sin precache | opciones movidas a `injectManifest` (14 → **438 entradas**) | ✅ verificado en build |
| **PWA-02** `openWindow('/')` | `'./'` relativo al scope | ✅ |
| **PWA-03** SW nunca se activa | `skipWaiting()` en install + `clients.claim()` | ✅ |
| **SYNC-04** día no rueda al abrir | `syncDay()` en `main.tsx` + `refreshDay` en `claimQuest` | ✅ |
| **SYNC-02/05** hydrate superficial | merge profundo con defaults en `hydrate` y `migrate` | ✅ |
| **UX-01** repaso sin tope | `REVIEW_SESSION_CAP = 30` + aviso de restantes | ✅ |
| **UX-02** rangos al 15% | escalera reescalada a ~23.000 XP con Guía de Supervivencia y Saqueador | ✅ |
| **UX-03** diálogos ignoran scriptMode | ordena con fichas pinyin/hanzi según modo; ¿qué responde? muestra pinyin en modo pinyin | ✅ |
| **UX-04** tono ambiguo en polisílabas | la radio reproduce SOLO el carácter de la sílaba | ✅ |
| **UX-05** keys por texto español | keys y comparación por `sentenceAudioId` | ✅ |
| **UX-06** NavBar tapada | `min-h-0 flex-1` en las 5 páginas | ✅ |
| **UX-07** accesibilidad | `aria-valuemin/max` en Meter, `type="button"` por defecto en Btn | 🟡 parcial (canvas y labels pendientes) |
| **UX-08** contraste Cuaderno | tokens de tono oscurecidos solo en ese tema | ✅ |
| **UX-10** varios | BootScreen boot-key unificado implícito, emoji chapas→🥤 en logro, hueco por aparición (`gapIdx`) | ✅ |
| **CH-01…CH-19** (erratas de chino) | TODAS aplicadas por subagente verificado: `qǐngwèn` ×6, `两点二十分`, 比…更 correcto, sandhi `yì bēi`/`yí ge`, 上/下 glosas, 午饭, 我会写中文, 麻 sin "soso", j/q/x completo, ü→u tras jqxy, 借 doble, n-jisui enseña 你多大, 的+家 matizado, lectura contrastiva, erratas de texto, diálogos incoherentes/cuál/kuai | ✅ 54/54 tests |
| **CH-10** vocabulario no enseñado | fichas nuevas 也/不客气/贵 + notas de 呢/还(también) | 🟡 parcial (这儿/那儿 aún no ficha) |
| **COV-03** tests insuficientes | +3 tests: fichas 1:1, slugs únicos por hanzi, diálogos anclados y 1:1 | ✅ |

### 12.2 NO corregidos a propósito (documentados para HSK 3)

| Hallazgo | Motivo / plan |
|---|---|
| **COV-01** 76 palabras HSK 2 + 19 HSK 1 sin aparecer | ✅ **CORREGIDO EN v3.0.0**: sectores de refuerzo m9b/m9c (HSK 1, S-10/11) y m19a-e (HSK 2, S-22..26) + HSK 3 completo (m21-m31, S-28..38). El test `coverage.test.ts` contra las listas oficiales HSK 2.0 lo verifica en cada push: **ninguna palabra de los niveles 1-3 puede quedarse fuera** (59/59 verdes). |
| **COV-02** recuentos exagerados en m10/m20/README | ✅ Corregidos: "las 150 palabras oficiales" (m10), "TODAS las palabras oficiales del HSK 2" (m20), README v3.0.0. Headers de módulo renumerados (X/12 y X/15). |
| **SYNC-01** BORRAR TODO no borra la nube | **OMITIDO por decisión del owner** (2026-11-20). Requiere diseño de UX (confirmación + tombstone) si algún día se retoma. |
| **SYNC-03** push sin transacción | **OMITIDO por decisión del owner** (2026-11-20). Riesgo bajo con un solo usuario real; requiere `runTransaction` si se retoma. |
| **BUG-17** write obligatorio en auditorías | Se acepta el reencolado; el umbral IoU 0.5 es razonable. Si molesta en uso real, añadir SALTAR tras 2 fallos. |
| **UX-07** restante | ✅ **Corregido en v3.0.0**: aria-labels en todos los inputs de pinyin/dictado, canvas de escritura con `role="img"` descriptivo, `Meter` con `aria-valuemin/max`, `Btn` con `type="button"` por defecto. |
| **UX-09** escalado (mapa 31 sectores, 852 fichas) | ✅ **Corregido en v3.0.0**: mapa con 4 niveles HSK plegables (los niveles cerrados se pliegan solos), Archivo paginado (60 palabras/12 apuntes por página con CARGAR MÁS), NavBar con tick de 60 s. Verificado en navegador. |
| **§9 documentación** (HSK 0-1→0-2, 50→54 tests) | ✅ **Corregido en v3.0.0**: README reescrito (HSK 0-3, 12 retos, tests de cobertura), AGENTS.md con estructura nueva, numeración definitiva S-00..S-38 y las reglas de la iteración (cobertura oficial, ids homófonos, UTF-8 seguro). |
| Plan HSK 3 con "~600 nuevas" | ✅ **Hecho en v3.0.0**: HSK 3 completo (S-28..S-38, las 298 oficiales), diálogos HSK3 en la radio, ~120 lecciones nuevas en total entre refuerzos y HSK 3. |

### 12.3 Nota sobre el audio tras el cambio de slugs

`npm run audio` ahora genera nombres con tonos (`s-ni3-hao3-ma.mp3`). El despliegue de Pages regenera los MP3 en CI, así que producción se auto-corrige al hacer push. La primera visita tras v2.9.0 puede tardar un poco más (descarga de los MP3 nuevos al precache), luego todo vuelve a ser offline.

*Actualizado el 2026-11-20 tras la ola de corrección v2.9.0 (commit `a4c6ced`).*

---

## 13. Cierre definitivo (v3.0.0)

La iteración pactada con el owner — *COV-01 + UX-09 + accesibilidad + docs + HSK 3 completo con diálogos, SYNC-01/03 omitidos* — quedó **terminada y verificada**:

- **COV-01 cerrado para siempre**: `src/content/official-hsk.ts` (listas HSK 2.0 oficiales, fuente MIT `complete-hsk-vocabulary`) alimenta `src/content/coverage.test.ts`. Las palabras de los niveles 1, 2 y 3 tienen que aparecer sí o sí en el corpus (fichas, frases, ejemplos o diálogos). 59/59 tests verdes.
- **Estructura definitiva de 40 sectores** (S-00..S-38 + auditorías): HSK 1 con refuerzos S-10/11 (m9b/m9c), HSK 2 con refuerzos S-22..26 (m19a-e), HSK 3 completo S-28..38 (m21-m31: 把 y resultados, cuerpo, estaciones, ciudad, grados 得/地, mente, escuela/oficina con 被, conectores, clasificadores/ropa/colores, mesa/familia extendida, ideas abstractas).
- **Radio**: +30 diálogos nuevos (refuerzos + HSK3), todos con disciplina de vocabulario verificada línea a línea.
- **Audio**: 945 MP3 regenerados (esquema con tonos), incluidas todas las frases nuevas.
- **UX-09**: mapa por niveles plegable + Archivo paginado. **UX-07**: accesibilidad de inputs/canvas/completada. **Docs**: README y AGENTS.md al día.
- Verificación en navegador: mapa con 4 niveles, lección HSK3 jugable de punta a punta, diálogos nuevos accesibles y con retos funcionando.
