# Chinese Vault ☢

[![CI](https://github.com/Axgaldo/chinese-vault/actions/workflows/ci.yml/badge.svg)](https://github.com/Axgaldo/chinese-vault/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/Axgaldo/chinese-vault/actions/workflows/deploy.yml/badge.svg)](https://github.com/Axgaldo/chinese-vault/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

**Aprende chino mandarín desde cero, en español, dentro de tu refugio.**

Chinese Vault es una web-app con estética de terminal post-apocalíptico (hola, Fallout 👋) para
aprender mandarín desde nivel absoluto 0: primero los **tonos y el pinyin**, y de propina los
caracteres chinos. Lecciones cortas con retos, XP, rangos y un **Archivo del Refugio** donde
van quedando apuntadas todas las palabras y la gramática que vas aprendiendo.

```
VAULT-OS v1.0 // TERMINAL DE ENTRENAMIENTO
INICIALIZANDO PROTOCOLO CHINO........ OK
CALIBRANDO TONOS (4/4).............. OK
ABRIENDO LA PUERTA DEL REFUGIO 101..
```

## Qué tiene hoy (v0.3) — HSK 1 COMPLETO

- **Sector 0 (HSK 0):** tonos, fonética y pinyin antes de hablar.
- **Sectores 1–10 (HSK 1 completo):** saludos, identidad, números, familia, lugares, comida,
  tiempo, rutina, cualidades y la Auditoría Final — **~150 palabras y 25 apuntes de gramática**.
- **Sectores 11–20 (HSK 2 completo):** la gran partícula **了** (explicada como cambio de estado,
  no como "pasado"), posiciones, comida, gente, comparaciones con **比**, dar/tomar con **V+到**,
  tecnología, direcciones con deixis **V+来/V+去**, conectores **因为...所以** y la experiencia
  con **V+过** — ~130 palabras nuevas y 16 apunes con profundidad de profesor (contrastes bien/mal).
- **📻 Radio del Refugio:** escucha pura con las frases que ya has aprendido — boletines por
  sector, transcripción de emisiones (dictado de frase completa) y el programa de tonos.
- **10 tipos de reto:** tarjetas de vocabulario, traducción, dictado por oído, entrenador de tonos,
  escribir pinyin, **dictado de oído puro** (quiz de escucha sin texto), construir frases,
  emparejar, apuntes de gramática y auditorías de repaso.
- **Repetición espaciada (SRS):** cada palabra vista entra en tu cola de repaso con intervalos
  crecientes (SM-2 simplificado).
- **3 modos de escritura (estilo HelloChinese):** botón 拼 → 拼+漢 → 漢 en plena lección —
  pinyin puro (con toque-revelado del hanzi), hanzi con pinyin apilado, o hanzi. El pinyin va
  coloreado por tono (1 rojo, 2 ámbar, 3 turquesa, 4 violeta).
- **Apariencia configurable:** tema de color (8 en la Tienda: incluidos Cuaderno de papel
  rayado, Atompunk frío y Cálido), **VFX** (CRT, Glitch, Neón) y letra del texto
  (mono/pixel/sans/manuscrita/redonda) + alto contraste (todo blanco) en el Perfil.
- **Chapas ⛓ y logros:** la moneda del refugio — bono diario +5, chapas por lecciones y repasos;
  10 logros con sus toasts ("Puerta 101", "El Rey de las Chapas"…).
- **👁 Modo Supervisor (libre):** en Ajustes del Perfil, desbloquea todas las lecciones para
  explorar el contenido sin orden.
- **PWA offline:** `npm run build` genera un service worker que precachea la app completa,
  audio incluido. Instálala en el móvil/escritorio y funciona sin conexión.
- **Progreso 100% local** (localStorage) y **sincronización opcional con Firebase** gratuito para
  tener cuenta y multi-dispositivo.
- **Misiones de la Caravana 🐂:** cada día, 3 encargos nuevos (dictados, repasos, lecciones,
  tonos, XP…) con recompensa en chapas, directamente en el mapa.
- **Tienda del Refugio ⛓:** gasta tus chapas en **temas de terminal** (Ámbar, Turquesa,
  Rojo Alerta, Pip-Boy 2000, Cuaderno de papel, Atompunk, Cálido), **letras** extra
  (manuscrita y redonda) y **VFX** (Glitch y Neón, además del CRT de serie).
- **Estadísticas del morador:** registro con XP, racha (con récord), precisión media y por
  sector, calor de actividad de 14 días y contadores varios.
- **50 tests automatizados** (Vitest) de pinyin, SRS, retos y la integridad completa del
  curso, corriendo en CI en cada push.
- Cero backend, cero binarios en el repo, licencia **MIT**.

## Arranque rápido

```bash
npm install
npm run audio     # genera los MP3 del curso (voz neuronal gratuita de Edge; ~1 min)
npm run dev       # http://localhost:5173
```

> El `npm run audio` es opcional (la app cae a la síntesis del navegador si falta), pero se oye
> mucho mejor. Solo genera lo que falte: puedes repetirlo siempre.

| Comando           | Qué hace                                        |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                          |
| `npm run build`   | Producción (`tsc -b` + Vite)                    |
| `npm run preview` | Sirve el build de producción                    |
| `npm run lint`    | ESLint                                          |
| `npm run audio`   | Genera los MP3 que falten (`audio:force` = todo)|

> **PWA offline:** el service worker se genera al hacer `npm run build` (en `dev` no hace falta).
> Sirve `dist/` con cualquier hosting estático y la app instalará como app con su icono,
> funcionando sin conexión.

## Despliegue a GitHub Pages (automático)

El repo incluye el workflow `.github/workflows/deploy.yml`: en cada push a `main` compila la app
(con `base = /chinese-vault/`), **regenera los MP3** del curso (no viven en Git) y publica `dist/`
en GitHub Pages.

Puesta en marcha (una sola vez):

1. Repo → **Settings → Pages → Source: "GitHub Actions"**.
2. Para que el **login con Google funcione en la web publicada**, el workflow necesita tu
   configuración de Firebase (el `.env` no se commitea al repo):
   - Repo → **Settings → Secrets and variables → Actions → "New repository secret"**
   - Nombre: **`FIREBASE_ENV`**
   - Valor: **pega el contenido completo de tu `.env` local** (las 6 líneas `VITE_FB_...`)
   - Haz push (o repo → Actions → *Deploy to GitHub Pages* → *Run workflow*).
3. Añade tu dominio de Pages (`axgaldo.github.io`) en
   **Firebase → Authentication → Settings → Authorized domains** (imprescindible: sin esto,
   Google bloquea el login desde ese dominio).
4. Sin el secret, la app se publica igualmente en **modo local** (el deploy nunca se rompe).

> Nota de seguridad: la configuración web de Firebase está diseñada para ser pública (va
> embebida en el JS que recibe cualquier visitante). La protección real son las reglas de
> Firestore (solo tu uid lee/escribe tu documento), el login de Google y los dominios
> autorizados. Usamos secrets por higiene, para que bots de GitHub no escaneen la clave.

Para simular el build de Pages en local: `npm run build:pages && npm run preview` (con
`dist/` ya generado, ábrelo vía `npx serve dist` para respetar la subcarpeta).

## Cuenta en la nube (opcional y gratis)

Por defecto tu progreso vive en tu navegador. Para tenerlo en la nube y seguir en otro dispositivo,
la app usa **inicio de sesión con Google** (seguridad de Google, sin contraseñas que cuidar):

1. En tu proyecto de [console.firebase.google.com](https://console.firebase.google.com):
   **Authentication → Sign-in method** → activa **Google** (elige tu email de soporte)
   y también **Anónimo** (lo usa el modo local inicial).
2. **Project settings → Your apps → Web (</>)** y copia la configuración que te da.
3. Crea **Firestore Database** (production mode vale) y pega estas reglas para que nadie
   más que tú lea tu progreso:

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

4. Copia `.env.example` a `.env` y pega tus claves. Reinicia `npm run dev`.
5. En la app: **Perfil → 🔴 ENTRAR CON GOOGLE**. Tu morador anónimo se convierte en tu
   cuenta de Google conservando todo el progreso.

## Estructura del aprendizaje

```
S-00 Protocolo de Iniciación  ── tonos, sonidos y pinyin en acción
S-01 Primer Contacto          ── 你好， ¿cómo estás?, cortesía
S-02 Identidad                ── nombres, países, posesión con 的
S-03 Números                  ── contar, precios, teléfono y edad
S-04 Familia                  ── los tuyos, tener (有)， plurales con 们
S-05 Lugares                  ── estar en (在)， este/ese, ¿dónde?
S-06 Comida y bebida          ── 我想喝茶 y el comedor del refugio
S-07 Tiempo                   ── hoy/mañana, fechas, horas y 两点半
S-08 Rutina                   ── verbos sin conjugación, 会/能， 我在学习
S-09 Cualidades               ── adjetivos-como-verbo, estados y gustos
S-10 Auditoría Final          ── el dictado del Overseer + certificado HSK 1
S-11 El Tiempo y 了           ── 了 como CAMBIO, 正在, planes y antes/después
S-12 Casa y Posiciones        ── habitaciones, 旁边/前面/后面
S-13 Mesa del Comedor         ── comidas del día, sabores 甜/酸
S-14 Gente del Refugio        ── 男/女， oficios y las palabras del idioma
S-15 Comparar y Describir     ── opuestos en pareja, colores y la báscula 比
S-16 Dar y Tomar              ── 给 (persona primero), V+到 = misión cumplida
S-17 Mundo y Tecnología       ── 用手机发短信 y la vida digital
S-18 Rutas y Movimiento      ── V+来/V+去 (aquí/allá), 一直走，然后左拐
S-19 Opiniones del Overseer   ── 因为...所以， 还是, 太...了， 越来越
S-20 El Idioma + Final        ── 声调/拼音/汉字/语法 y el certificado HSK 2
```

Cada sector termina con una **Auditoría** que consolida todo antes de abrir la siguiente puerta.
La estructura pedagógica está inspirada en el curso básico de
[hablochino.com](https://hablochino.com/aprende-chino-online/) y en la filosofía de retos de
apps como HelloChinese.

## Desarrollo y roadmap

- Cómo se añade contenido (palabras, lecciones, módulos nuevos): ver **AGENTS.md**.
- Próximos sectores: **S-07 Tiempo**, **S-08 Rutina (verbos)**, **S-09 Cualidades** y
  **S-10 Auditoría final** — con eso se completa el HSK 1 (~150 palabras).
- Ideas en la nevera: misión diaria, tienda de chapas (temas de color), quiz de escucha pura,
  HSK 2, modo escritura de caracteres.

## Créditos

Proyecto personal de **[Axgaldo](https://github.com/Axgaldo)** — hecho para aprender (¡en todos los sentidos!).
Sonido: voz neuronal `zh-CN-XiaoxiaoNeural` vía el servicio gratuito Read Aloud de Microsoft Edge.
Licencia MIT — ver [LICENSE](./LICENSE).
