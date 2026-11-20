/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 0 · HSK 0 — PROTOCOLO DE INICIACIÓN

   Pinyin y tonos antes que nada: la base fonética del mandarín.
   Estructura inspirada en el curso básico de hablochino.com
   (tonos → fonética → primer pinyin en acción).
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../types/content'
import {
  build,
  drill,
  e,
  grammar,
  introLite,
  lesson,
  match,
  noteStep,
  toneDrill,
  typeP,
} from './builders'

export const hsk0: VaultModule = {
  id: 'hsk0',
  hsk: 0,
  code: 'S-00',
  title: 'Protocolo de Iniciación',
  subtitle: 'Tonos, sonidos y pinyin — la fonética del mandarín antes de hablar',
  entries: [
    // El cuarteto clásico de "ma"
    e('w-ma1', '妈', 'mā', 'mamá', '👩'),
    e('w-ma2', '麻', 'má', 'cáñamo (también: entumecido)', '🌾'),
    e('w-ma3', '马', 'mǎ', 'caballo', '🐴'),
    e('w-ma4', '骂', 'mà', 'regañar', '😤'),
    // Sonidos clave de la L0-2 (los números se consolidan en el Sector 3)
    e('w-ba1', '八', 'bā', 'ocho', '8️⃣'),
    e('w-qi1', '七', 'qī', 'siete', '7️⃣'),
    e('w-shi2', '十', 'shí', 'diez', '🔟'),
    e('w-si4', '四', 'sì', 'cuatro', '4️⃣'),
    e('w-yu2', '鱼', 'yú', 'pez', '🐟'),
    e('w-qu4', '去', 'qù', 'ir', '🚶'),
    // Frases de supervivencia (se consolidan en el Sector 1)
    e('w-ni-hao', '你好', 'nǐ hǎo', 'hola', '👋'),
    e('w-xie-xie', '谢谢', 'xièxie', 'gracias', '🙏'),
    e('w-zai-jian', '再见', 'zàijiàn', 'adiós', '🚪'),
    e('w-dui-bu-qi', '对不起', 'duìbuqǐ', 'perdón, lo siento', '😅'),
  ],
  lessons: [
    lesson(
      'hsk0-l1',
      'Los cuatro tonos',
      'pinyin',
      [
        noteStep('n-tonos'),
        ...introLite('w-ma1'),
        ...introLite('w-ma2'),
        ...introLite('w-ma3'),
        ...introLite('w-ma4'),
        toneDrill('w-ma1', 'mā', 1),
        toneDrill('w-ma2', 'má', 2),
        toneDrill('w-ma3', 'mǎ', 3),
        toneDrill('w-ma4', 'mà', 4),
        match('w-ma1', 'w-ma2', 'w-ma3', 'w-ma4'),
      ],
      [
        grammar('n-tonos', 'Los tonos: la melodía del chino', [
          'El chino es un idioma tonal: la misma sílaba significa cosas distintas según la "melodía" con la que la pronuncies. El tono afecta a toda la sílaba.',
          'Mira el cuarteto clásico con la sílaba "ma":',
          '1 (alto y plano)   mā  妈  mamá\n2 (ascendente)      má  麻  cáñamo\n3 (baja y sube)     mǎ  马  caballo\n4 (descendente)     mà  骂  regañar',
          'Tip de morador: el tono 3 en solitario suele pronunciarse bajo, sin subir demasiado. ¡Practica cantando cada tono!',
        ], [
          ['妈', 'mā', 'mamá (tono 1)'],
          ['马', 'mǎ', 'caballo (tono 3)'],
          ['骂', 'mà', 'regañar (tono 4)'],
        ]),
      ],
    ),
    lesson(
      'hsk0-l2',
      'Sonidos del refugio',
      'pinyin',
      [
        noteStep('n-sonidos'),
        ...introLite('w-ba1'),
        ...introLite('w-qi1'),
        ...introLite('w-shi2'),
        ...introLite('w-si4'),
        { type: 'listen', entry: 'w-ba1' },
        { type: 'listen', entry: 'w-shi2' },
        { type: 'listen', entry: 'w-qi1' },
        { type: 'listen', entry: 'w-si4' },
        ...introLite('w-yu2'),
        ...introLite('w-qu4'),
        { type: 'choose-hanzi', entry: 'w-yu2' },
        { type: 'choose-hanzi', entry: 'w-qu4' },
        match('w-ba1', 'w-shi2', 'w-qi1', 'w-si4'),
      ],
      [
        grammar('n-sonidos', 'Sonidos que no existen en español', [
          'El pinyin se lee casi como en español, pero hay trampas. Estas son las del refugio:',
          '• b/p, d/t, g/k: la b, d y g chinas NO son como las españolas. Suena parecido, pero la p, t y k chinas van con un soplo fuerte de aire (aspiración).',
          '• j/q/x: familia "palatal". j = una "ch" SIN soplo (jiā), q = la misma "ch" CON soplo fuerte (qǐ), x = una "sh" suave y adelantada (xī). Van seguidas SIEMPRE de i/ü: qi, ju, xu.',
          '• zh/ch/sh: parecidas a "ch/sh" españolas pero con la lengua más atrás (zhōng, shí).',
          '• z/c/s: más adelantadas y "silbantes" (sì).',
          '• ü: como la "ü" alemana. Di "i" con labios de "u". TRAS j/q/x/y la ü se escribe u (qu = qü, ju = jü, xu = xü, yu = yü) pero suena igual.',
          'No te obsesiones: el oído se entrena con exposición. ¡Escucha y repite!',
        ], [
          ['八', 'bā', 'ocho — b sin soplo'],
          ['四', 'sì', 'cuatro — s silbante'],
          ['十', 'shí', 'diez — sh con lengua atrás'],
        ]),
      ],
    ),
    lesson(
      'hsk0-l3',
      'Frases de supervivencia',
      'vocab',
      [
        noteStep('n-pinyin'),
        ...drill('w-ni-hao'),
        ...drill('w-xie-xie'),
        ...drill('w-zai-jian'),
        ...drill('w-dui-bu-qi'),
        build('你好吗？', 'nǐ hǎo ma?', '¿Cómo estás?'),
        typeP('w-ni-hao'),
        match('w-ni-hao', 'w-xie-xie', 'w-zai-jian', 'w-dui-bu-qi'),
      ],
      [
        grammar('n-pinyin', 'Leer pinyin sin miedo', [
          'El pinyin es tu mapa sonoro del chino. Cada sílaba = inicial + final + tono.',
          'Ejemplo: nǐ = n (inicial) + i (final) + tono 3. hǎo = h + ao + tono 3.',
          'Dos reglas de oro del refugio:',
          "• El apóstrofo separa sílabas ambiguas: Xī'ān (dos sílabas: xī-ān).",
          '• Las marcas van sobre la vocal principal: a > o > e > i/u/ü.',
          'En este refugio mandamos en pinyin: los caracteres chinos se aprenden de propina. 🐎',
        ], [
          ['你好', 'nǐ hǎo', 'hola'],
          ['谢谢', 'xièxie', 'gracias'],
        ]),
      ],
    ),
  ],
}
