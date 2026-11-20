/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 9 · HSK 1 — CUALIDADES (módulo 9/12)

   Cómo es y cómo está el morador: 大/小/高 para el tamaño, 高兴/累/忙 para
   el ánimo, 便宜 para los precios y los gustos con 喜欢 y 爱.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m9: VaultModule = {
  id: 'm9',
  hsk: 1,
  code: 'S-09',
  title: 'Cualidades',
  subtitle: 'Adjetivos, estados y gustos del morador',
  entries: [
    // (很, 不, 的, 猫, 狗, 今天, 想, 喝, 茶, 睡觉… viven en otros sectores: aquí solo se referencian)
    e('w-da4', '大', 'dà', 'grande', '🐘'),
    e('w-xiao3', '小', 'xiǎo', 'pequeño', '🐭'),
    e('w-duo1', '多', 'duō', 'mucho, muchos', '♾️'),
    e('w-shao3', '少', 'shǎo', 'poco', '🤏'),
    e('w-gao1', '高', 'gāo', 'alto', '🏔️'),
    e('w-gao-xing', '高兴', 'gāoxìng', 'contento, feliz', '😊'),
    e('w-piao-liang', '漂亮', 'piàoliang', 'bonito, bonita', '💐'),
    e('w-re4', '热', 'rè', 'caliente (tiempo)', '🥵'),
    e('w-leng3', '冷', 'lěng', 'frío', '🥶'),
    e('w-lei4', '累', 'lèi', 'cansado', '😪'),
    e('w-mang2', '忙', 'máng', 'ocupado', '😵'),
    e('w-zhi-dao', '知道', 'zhīdào', 'saber', '🧠'),
    e('w-pian-yi', '便宜', 'piányi', 'barato', '💰', 'la segunda sílaba va sin tono'),
    e('w-ai4', '爱', 'ài', 'amar, encantar', '❤️'),
    e('w-xi-huan', '喜欢', 'xǐhuan', 'gustar', '🥰'),
  ],
  lessons: [
    lesson(
      'm9-l1',
      'Cómo es',
      'vocab',
      [
        ...drill('w-da4'),
        ...drill('w-xiao3'),
        ...drill('w-gao1'),
        ...drill('w-piao-liang'),
        noteStep('n-suj-adj'),
        build('我的猫很小。', 'wǒ de māo hěn xiǎo.', 'Mi gato es pequeño.'),
        build('她很漂亮。', 'tā hěn piàoliang.', 'Ella es muy guapa.'),
      ],
      [
        grammar('n-suj-adj', 'El adjetivo ES el verbo (nada de 是)', [
          'En chino los adjetivos funcionan como VERBO: 她很漂亮 = "ella muy-guapa". No se dice "ella ES guapa": el 是 del Sector 1 aquí no trabaja.',
          'La palabra 很 conecta sujeto y adjetivo: 我的猫很小 = "mi gato es pequeño". Sin 很, 她漂亮 suena a LECTURA CONTRASTIVA (comparando: "ella, guapa...") — la exclamación de verdad se hace con 真/太…了: 她真漂亮！',
          'Para negar, 不 va delante del adjetivo: 今天不热 = "hoy no hace calor". Con el sandhi de siempre: bú rè, porque 热 es tono 4.',
        ], [
          ['她很漂亮。', 'tā hěn piàoliang.', 'Ella es muy guapa.'],
          ['我的猫很小。', 'wǒ de māo hěn xiǎo.', 'Mi gato es pequeño.'],
          ['今天不热。', 'jīntiān bú rè.', 'Hoy no hace calor.'],
        ]),
      ],
    ),
    lesson(
      'm9-l2',
      'Estados del morador',
      'vocab',
      [
        ...drill('w-gao-xing'),
        ...drill('w-lei4'),
        ...drill('w-mang2'),
        ...drill('w-re4'),
        ...drill('w-leng3'),
        ...drill('w-zhi-dao'),
        ...practice('w-duo1'),
        ...practice('w-shao3'),
        noteStep('n-duo-shao'),
        build('我今天很高兴。', 'wǒ jīntiān hěn gāoxìng.', 'Hoy estoy contento.'),
        build('今天很热。', 'jīntiān hěn rè.', 'Hoy hace calor.'),
        build('我很累，我想睡觉。', 'wǒ hěn lèi, wǒ xiǎng shuìjiào.', 'Estoy cansado, quiero dormir.'),
      ],
      [
        grammar('n-duo-shao', '多 y 少: mucho y poco', [
          '多 (duō) = "mucho" y 少 (shǎo) = "poco". Van ANTES del sustantivo, como cualquier adjetivo: 很多水 = "mucha agua".',
          'Con 很 delante suben la intensidad: 很多 "muchísimo", 很少 "muy poco". 我的茶很少 = "me queda muy poco té".',
          '¿Y juntos? 多少 (duōshao) = "¿cuánto?", la pregunta de precios del Sector 3. Dos cantidades que se convierten en pregunta: puro chino.',
        ], [
          ['我想喝很多水。', 'wǒ xiǎng hē hěn duō shuǐ.', 'Quiero beber mucha agua.'],
          ['我的茶很少。', 'wǒ de chá hěn shǎo.', 'Me queda muy poco té.'],
          ['你喝多少水？', 'nǐ hē duōshao shuǐ?', '¿Cuánta agua bebes?'],
        ]),
      ],
    ),
    lesson(
      'm9-l3',
      'Gustos del refugio',
      'grammar',
      [
        ...drill('w-xi-huan'),
        ...drill('w-ai4'),
        ...drill('w-pian-yi'),
        ...practice('w-zhi-dao'),
        noteStep('n-xihuan-ai'),
        build('我喜欢喝茶。', 'wǒ xǐhuan hē chá.', 'Me gusta tomar té.'),
        build('我爱我的狗。', 'wǒ ài wǒ de gǒu.', 'Amo a mi perro.'),
        build('这个很便宜。', 'zhè ge hěn piányi.', 'Esto es barato.'),
      ],
      [
        grammar('n-xihuan-ai', '喜欢 y 爱: del gusto al amor', [
          '喜欢 (xǐhuan) + cosa o + verbo = "gustar": 我喜欢喝茶 = "me gusta tomar té", 我喜欢学习 = "me gusta estudiar". Sin conjugación, como siempre.',
          '爱 (ài) es más fuerte que en español para las cosas: con personas y mascotas funciona igual, 我爱我的狗. Para objetos suena muy intenso: resérvalo para lo que de verdad amas.',
          'Para precios llega 便宜 (piányi), con la segunda sílaba sin tono: 这个很便宜 = "esto es barato". ¿Lo contrario? 贵 (guì, "caro") llega en el Sector 18.',
        ], [
          ['我喜欢喝茶。', 'wǒ xǐhuan hē chá.', 'Me gusta tomar té.'],
          ['我爱我的狗。', 'wǒ ài wǒ de gǒu.', 'Amo a mi perro.'],
          ['这个很便宜。', 'zhè ge hěn piányi.', 'Esto es barato.'],
        ]),
      ],
    ),
    lesson(
      'm9-l4',
      'Auditoría del Sector 9',
      'review',
      [
        match('w-da4', 'w-xiao3', 'w-duo1', 'w-shao3'),
        match('w-gao-xing', 'w-lei4', 'w-mang2', 'w-piao-liang'),
        { type: 'listen', entry: 'w-re4' },
        { type: 'listen', entry: 'w-leng3' },
        dictate('w-piao-liang'),
        dictate('w-gao-xing'),
        typeP('w-xi-huan'),
        build('我今天很高兴。', 'wǒ jīntiān hěn gāoxìng.', 'Hoy estoy contento.'),
        build('我喜欢喝茶。', 'wǒ xǐhuan hē chá.', 'Me gusta tomar té.'),
      ],
    ),
  ],
}
