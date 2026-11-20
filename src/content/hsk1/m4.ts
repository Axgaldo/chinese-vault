/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 4 · HSK 1 — FAMILIA (módulo 4/10)

   Los tuyos dentro del refugio: 爸爸, 妈妈, 儿子 y 女儿, más 有 para decir
   "tener" y 们 para los plurales. Aquí nadie se queda fuera del búnker.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m4: VaultModule = {
  id: 'm4',
  hsk: 1,
  code: 'S-04',
  title: 'Familia',
  subtitle: 'Los tuyos dentro del refugio',
  entries: [
    // (我, 你, 你们, 他, 她, 是, 老师, 的, 两, 个, 三… viven en otros sectores: aquí solo se referencian)
    e('w-ba-ba', '爸爸', 'bàba', 'papá', '👨'),
    e('w-ma-ma', '妈妈', 'māma', 'mamá', '👩', 'la misma sílaba que 妈 mā del Sector 0'),
    e('w-er-zi', '儿子', 'érzi', 'hijo', '👦'),
    e('w-nv-er', '女儿', "nǚ'ér", 'hija', '👧'),
    e('w-jia1', '家', 'jiā', 'casa, hogar, familia', '🏠'),
    e('w-you3', '有', 'yǒu', 'tener, haber', '🤲'),
    e('w-gou3', '狗', 'gǒu', 'perro', '🐶'),
    e('w-mao1', '猫', 'māo', 'gato', '🐱'),
    e('w-he2', '和', 'hé', 'y, con', '➕'),
    e('w-wo-men', '我们', 'wǒmen', 'nosotros, nosotras', '🫂'),
    e('w-ta-men', '他们', 'tāmen', 'ellos, ellas', '👥'),
  ],
  lessons: [
    lesson(
      'm4-l1',
      'Los tuyos',
      'vocab',
      [
        ...drill('w-ba-ba'),
        ...drill('w-ma-ma'),
        ...drill('w-er-zi'),
        ...drill('w-nv-er'),
        { type: 'intro', entry: 'w-jia1' },
        noteStep('n-jia1'),
        match('w-ba-ba', 'w-ma-ma', 'w-er-zi', 'w-nv-er', 'w-jia1'),
        build('我的妈妈是老师。', 'wǒ de māma shì lǎoshī.', 'Mi madre es profesora.'),
      ],
      [
        grammar('n-jia1', '家 (jiā): casa Y familia', [
          '家 significa "casa" y "hogar", pero también "familia": una sola palabra para el lugar y para la gente que vive en él.',
          '家 = casa Y familia; para "mi casa" lo normal es 我家 (sin 的), pero 我的家 también es correcto — solo un pelín más enfático.',
          'Tip de morador: pronto dirás "estoy en casa" con 我在家. El refugio siempre reutiliza sus piezas.',
        ], [
          ['我家', 'wǒ jiā', 'mi casa (se dice sin 的)'],
          ['我家有爸爸和妈妈。', 'wǒ jiā yǒu bàba hé māma.', 'En mi casa están papá y mamá.'],
        ]),
      ],
    ),
    lesson(
      'm4-l2',
      '¿Qué tienes?',
      'grammar',
      [
        ...drill('w-you3'),
        ...drill('w-gou3'),
        ...drill('w-mao1'),
        ...drill('w-he2'),
        noteStep('n-you3'),
        { type: 'intro', entry: 'w-wo-men' },
        { type: 'intro', entry: 'w-ta-men' },
        noteStep('n-men'),
        build('我有两个女儿。', "wǒ yǒu liǎng gè nǚ'ér.", 'Tengo dos hijas.'),
        build('我家有一个儿子。', 'wǒ jiā yǒu yí gè érzi.', 'En mi casa hay un hijo.'),
      ],
      [
        grammar('n-you3', '有 (yǒu): tener y haber', [
          '有 es "tener": SUJETO + 有 + COSA. 我有狗 = "yo tengo perro". Directo y sin conjugación, como todo por aquí.',
          'Su negación es especial: 没有 (méiyǒu), nunca "不有". Delante de 有, el "no" se convierte en méi.',
          'El mismo 有 dice "hay": 我家有一个儿子 = "en mi casa hay un hijo". Un verbo, dos trabajos.',
          'Ojo al 一 delante de 个: se pronuncia yí (tono 2): yí gè = "un/uno". Lo oirás en la última frase de la lección.',
        ], [
          ['你有猫吗？', 'nǐ yǒu māo ma?', '¿Tienes gato?'],
          ['我家有三个人。', 'wǒ jiā yǒu sān gè rén.', 'Somos tres en casa.'],
        ]),
        grammar('n-men', '们 (men): plurales de personas', [
          '们 hace plurales de PERSONAS: 我们 nosotros, 你们 vosotros, 他们 ellos. Se pega al pronombre como una sombra.',
          'NUNCA con animales ni cosas: no existen "狗们" ni "猫们". Con ellos no se añade nada: el número ya marca el plural.',
          '他们 sirve para "ellos" y "ellas": el plural no distingue género. En singular lo apunta el carácter: 他 / 她, ambos tā.',
        ], [
          ['我们是老师。', 'wǒmen shì lǎoshī.', 'Somos profesores.'],
          ['他们很好。', 'tāmen hěn hǎo.', 'Ellos están muy bien.'],
        ]),
      ],
    ),
    lesson(
      'm4-l3',
      'Auditoría del Sector 4',
      'review',
      [
        ...practice('w-er-zi'),
        ...practice('w-nv-er'),
        match('w-ba-ba', 'w-ma-ma', 'w-er-zi', 'w-nv-er', 'w-jia1'),
        match('w-ni3', 'w-ni-men', 'w-wo3', 'w-ta1', 'w-ta1-she'),
        match('w-wo-men', 'w-ta-men', 'w-you3', 'w-he2', 'w-shi4'),
        { type: 'listen', entry: 'w-you3' },
        { type: 'listen', entry: 'w-gou3' },
        { type: 'listen', entry: 'w-mao1' },
        build('我的妈妈是老师。', 'wǒ de māma shì lǎoshī.', 'Mi madre es profesora.'),
        build('我有两个女儿。', "wǒ yǒu liǎng gè nǚ'ér.", 'Tengo dos hijas.'),
        typeP('w-nv-er'),
      ],
    ),
  ],
}
