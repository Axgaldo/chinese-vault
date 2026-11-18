/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 5 · HSK 1 — LUGARES (módulo 5/10)

   Dónde está cada cosa y dónde estás tú: 在 para localizar, 这/那 para
   señalar y 哪儿 para no perderse por los pasillos del refugio.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m5: VaultModule = {
  id: 'm5',
  hsk: 1,
  code: 'S-05',
  title: 'Lugares',
  subtitle: 'Dónde está cada cosa y dónde estás tú',
  entries: [
    // (家, 和, 猫, 狗, 朋友, 老师, 学生… viven en otros sectores: aquí solo se referencian)
    e('w-zhe4', '这', 'zhè', 'este, esto', '👉'),
    e('w-na4', '那', 'nà', 'ese, aquel', '👈'),
    e('w-na-er', '哪儿', 'nǎr', 'dónde', '📍'),
    e('w-zai4', '在', 'zài', 'estar en, encontrarse en', '📍'),
    e('w-xue-xiao', '学校', 'xuéxiào', 'escuela', '🏫'),
    e('w-yi-yuan', '医院', 'yīyuàn', 'hospital', '🏥'),
    e('w-shang-dian', '商店', 'shāngdiàn', 'tienda', '🏪'),
    e('w-li3', '里', 'lǐ', 'dentro', '📥'),
    e('w-qing-wen', '请问', 'qǐngwén', 'disculpe, ¿puede decirme?', '🙋', 'pedir + preguntar'),
  ],
  lessons: [
    lesson(
      'm5-l1',
      'Estar en algún sitio',
      'grammar',
      [
        ...practice('w-jia1'),
        ...drill('w-zai4'),
        ...drill('w-xue-xiao'),
        ...drill('w-yi-yuan'),
        ...drill('w-shang-dian'),
        noteStep('n-zai4'),
        build('我在学校。', 'wǒ zài xuéxiào.', 'Estoy en la escuela.'),
        build('我的猫在家。', 'wǒ de māo zài jiā.', 'Mi gato está en casa.'),
      ],
      [
        grammar('n-zai4', '在 (zài): estar en un sitio', [
          'En chino "estar en" tiene verbo propio: SUJETO + 在 + LUGAR. 我在学校 = "yo estoy en la escuela".',
          '¿"Estoy en casa"? 我在家 (wǒ zài jiā), con el 家 del Sector 4 y sin 的.',
          'En también localiza cosas, no solo a personas: 我的猫在家 = "mi gato está en casa". Una palabra y todo el refugio queda mapeado.',
        ], [
          ['我在家。', 'wǒ zài jiā.', 'Estoy en casa.'],
          ['我的猫和狗在家。', 'wǒ de māo hé gǒu zài jiā.', 'Mi gato y mi perro están en casa.'],
          ['他在商店。', 'tā zài shāngdiàn.', 'Él está en la tienda.'],
        ]),
      ],
    ),
    lesson(
      'm5-l2',
      'Este, ese… ¿dónde?',
      'vocab',
      [
        ...drill('w-zhe4'),
        ...drill('w-na4'),
        ...drill('w-na-er'),
        ...drill('w-li3'),
        ...drill('w-qing-wen'),
        noteStep('n-zhe-na'),
        build('请问，商店在哪儿？', 'qǐngwén, shāngdiàn zài nǎr?', 'Disculpe, ¿dónde está la tienda?'),
        ...practice('w-peng-you'),
        build('我的朋友在医院里。', 'wǒ de péngyou zài yīyuàn lǐ.', 'Mi amigo está en el hospital.'),
        match('w-zhe4', 'w-na4', 'w-na-er', 'w-li3', 'w-qing-wen'),
      ],
      [
        grammar('n-zhe-na', '这/那 y 哪儿: señalar y preguntar', [
          '这 (zhè) apunta a lo CERCA ("este, esto") y 那 (nà) a lo LEJOS ("ese, aquel"). Dos dedos, dos distancias.',
          'Delante de una palabra la concretan: 这个人 = "esta persona". Y en solitario con 是: 这是猫 = "esto es un gato".',
          'La pregunta de sitio es SUJETO + 在 + 哪儿: 你在哪儿？, 你们在哪儿？ (plural de personas con 们, como siempre).',
          '里 (lǐ) = "dentro": va DETRÁS del lugar. 医院里 = "dentro del hospital", 商店里 = "dentro de la tienda".',
        ], [
          ['这是我的猫。', 'zhè shì wǒ de māo.', 'Este es mi gato.'],
          ['那是学校吗？', 'nà shì xuéxiào ma?', '¿Eso es la escuela?'],
          ['你的狗在哪儿？', 'nǐ de gǒu zài nǎr?', '¿Dónde está tu perro?'],
        ]),
      ],
    ),
    lesson(
      'm5-l3',
      'Auditoría del Sector 5',
      'review',
      [
        match('w-zhe4', 'w-na4', 'w-na-er', 'w-zai4', 'w-li3'),
        match('w-xue-xiao', 'w-yi-yuan', 'w-shang-dian', 'w-qing-wen', 'w-jia1'),
        match('w-gou3', 'w-mao1', 'w-peng-you', 'w-lao-shi', 'w-xue-sheng'),
        { type: 'listen', entry: 'w-zai4' },
        { type: 'listen', entry: 'w-na-er' },
        { type: 'listen', entry: 'w-zhe4' },
        { type: 'listen', entry: 'w-na4' },
        build('我在学校。', 'wǒ zài xuéxiào.', 'Estoy en la escuela.'),
        build('请问，商店在哪儿？', 'qǐngwén, shāngdiàn zài nǎr?', 'Disculpe, ¿dónde está la tienda?'),
        typeP('w-zai4'),
      ],
    ),
  ],
}
