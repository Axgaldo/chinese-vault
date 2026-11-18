# Chinese Vault ☢

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

## Qué tiene hoy (v0.1)

- **Sector 0 (HSK 0):** tonos, fonética y pinyin antes de hablar.
- **Sectores 1–6 (HSK 1):** saludos, identidad, números, familia, lugares, comida — 24 lecciones,
  ~100 palabras y 17 apuntes de gramática, con **audio en todas las palabras y frases**.
- **9 tipos de reto:** tarjetas de vocabulario, traducción, dictado por oído, entrenador de tonos,
  escribir pinyin, construir frases, emparejar, apuntes de gramática y auditorías de repaso.
- **Repetición espaciada (SRS):** cada palabra vista entra en tu cola de repaso con intervalos
  crecientes (SM-2 simplificado).
- **Pinyin coloreado por tono** (1 rojo, 2 ámbar, 3 turquesa, 4 violeta) — el truco que usan las
  mejores apps.
- **Puro pinyin si quieres:** en Ajustes puedes ocultar el hanzi por completo.
- **Progreso 100% local** (localStorage) y **sincronización opcional con Firebase** gratuito para
  tener cuenta y multi-dispositivo.
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

## Cuenta en la nube (opcional y gratis)

Por defecto tu progreso vive en tu navegador. Para tenerlo en la nube y seguir en otro dispositivo:

1. Crea un proyecto en [console.firebase.google.com](https://console.firebase.google.com)
   (**plan Spark**: gratuito, sin tarjeta).
2. Añade una app web (`</>`) y copia su configuración.
3. Activa **Authentication → Sign-in method → Anónimo** y **Correo electrónico/contraseña**.
4. Crea **Firestore Database** (da igual el modo; luego pega estas reglas para que nadie más que
   tú lea tu progreso):

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

5. Copia `.env.example` a `.env` y pega tus claves. Reinicia `npm run dev`.
6. En la app: **Perfil → vincula tu email**. Tu habitante anónimo se convierte en cuenta sin
   perder nada.

## Estructura del aprendizaje

```
S-00 Protocolo de Iniciación  ── tonos, sonidos y pinyin en acción
S-01 Primer Contacto          ── 你好， ¿cómo estás?, cortesía
S-02 Identidad                ── nombres, países, posesión con 的
S-03 Números                  ── contar, precios, teléfono y edad
S-04 Familia                  ── los tuyos, tener (有)， plurales con 们
S-05 Lugares                  ── estar en (在)， este/ese, ¿dónde?
S-06 Comida y bebida          ── 我想喝茶 y el comedor del refugio
```

Cada sector termina con una **Auditoría** que consolida todo antes de abrir la siguiente puerta.
La estructura pedagógica está inspirada en el curso básico de
[hablochino.com](https://hablochino.com/aprende-chino-online/) y en la filosofía de retos de
apps como HelloChinese.

## Desarrollo y roadmap

- Cómo se añade contenido (palabras, lecciones, módulos nuevos): ver **AGENTS.md**.
- Próximos sectores: **S-07 Tiempo**, **S-08 Rutina (verbos)**, **S-09 Cualidades** y
  **S-10 Auditoría final** — con eso se completa el HSK 1 (~150 palabras).
- Ideas en la nevera: misión diaria, logros, PWA offline, HSK 2, modo escritura de caracteres.

## Créditos

Proyecto personal de **Antonio Galdó Seiquer** — hecho para aprender (¡en todos los sentidos!).
Sonido: voz neuronal `zh-CN-XiaoxiaoNeural` vía el servicio gratuito Read Aloud de Microsoft Edge.
Licencia MIT — ver [LICENSE](./LICENSE).
