/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 3 · HSK 1 — NÚMEROS (módulo 3/12)

   Contar, precios y edad — el registro del refugio: del cero al diez,
   números compuestos, teléfonos y cuántos años tienes.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, drill, e, grammar, lesson, match, noteStep, practice, toneDrill, typeP } from '../builders'

export const m3: VaultModule = {
  id: 'm3',
  hsk: 1,
  code: 'S-03',
  title: 'Números',
  subtitle: 'Contar, precios y edad — el registro del refugio',
  entries: [
    // (四, 七, 八, 十 llegaron en el Sector 0: aquí solo se referencian)
    e('w-ling2', '零', 'líng', 'cero', '0️⃣'),
    e('w-yi1', '一', 'yī', 'uno', '1️⃣'),
    e('w-er4', '二', 'èr', 'dos', '2️⃣', 'para contar cosas (con clasificador) se usa 两'),
    e('w-san1', '三', 'sān', 'tres', '3️⃣'),
    e('w-wu3', '五', 'wǔ', 'cinco', '5️⃣'),
    e('w-liu4', '六', 'liù', 'seis', '6️⃣'),
    e('w-jiu3', '九', 'jiǔ', 'nueve', '9️⃣'),
    e('w-liang3', '两', 'liǎng', 'dos (para contar cosas)', '✌️'),
    e('w-ji3', '几', 'jǐ', 'cuántos', '🧮'),
    e('w-duo-shao', '多少', 'duōshao', 'cuánto (precio)', '💰'),
    e('w-ge4', '个', 'gè', 'clasificador general', '📦', 'tono neutro en 这个/一个'),
    e('w-sui4', '岁', 'suì', 'años de edad', '🎂'),
    e('w-dian-hua', '电话', 'diànhuà', 'teléfono', '☎️'),
    e('w-hao-ma', '号码', 'hàomǎ', 'número (de teléfono)', '🔢'),
  ],
  lessons: [
    lesson(
      'm3-l1',
      'Del cero al diez',
      'vocab',
      [
        ...drill('w-ling2'),
        ...drill('w-yi1'),
        ...drill('w-san1'),
        ...drill('w-wu3'),
        ...drill('w-liu4'),
        ...drill('w-jiu3'),
        ...practice('w-ba1'),
        ...practice('w-qi1'),
        ...practice('w-shi2'),
        ...practice('w-si4'),
        toneDrill('w-yi1', 'yī', 1),
        toneDrill('w-er4', 'èr', 4),
        toneDrill('w-wu3', 'wǔ', 3),
        toneDrill('w-jiu3', 'jiǔ', 3),
        match('w-ling2', 'w-yi1', 'w-san1', 'w-wu3', 'w-liu4', 'w-jiu3'),
      ],
    ),
    lesson(
      'm3-l2',
      'El contador del refugio',
      'grammar',
      [
        noteStep('n-numeros'),
        ...drill('w-er4'),
        ...drill('w-liang3'),
        ...drill('w-ji3'),
        ...drill('w-duo-shao'),
        ...drill('w-ge4'),
        noteStep('n-liang'),
        build('二十一个人。', 'èrshíyī gè rén.', 'Veintiuna personas.'),
        build('我有两个孩子。', 'wǒ yǒu liǎng gè háizi.', 'Tengo dos hijos. (有 yǒu: "tener" · 孩子 háizi: "niño" — solo en esta frase)'),
      ],
      [
        grammar('n-numeros', 'Números compuestos: la aritmética de 十', [
          '十 shí = 10. A partir de ahí, todo se apila: 十一 shíyī = 10 + 1 = 11; 二十 èrshí = 2 × 10 = 20; 二十一 èrshíyī = 2 × 10 + 1 = 21.',
          'Multiplicas por 十 y sumas: sin formas irregulares ni sorpresas. Si sabes el 2 y el 10, ya sabes el 20 y el 21.',
          'Y un alivio: en los números compuestos, 一 NO cambia de tono. Se queda yī: shíyī, èrshíyī. (El sandhi de 一 es plato de otro sector.)',
        ], [
          ['十一', 'shíyī', 'once (10 + 1)'],
          ['二十', 'èrshí', 'veinte (2 × 10)'],
          ['二十一', 'èrshíyī', 'veintiuno (2 × 10 + 1)'],
        ]),
        grammar('n-liang', '二 (èr) vs 两 (liǎng)', [
          'Para matrículas, teléfonos y números sueltos: 二. Es el dos "de ficha", el que se lee en las cuentas.',
          'Para contar cosas: 两 + clasificador. 两个 (liǎng gè) = "dos unidades de algo". Nunca 二个.',
          'Regla de bolsillo del refugio: si lo cuentas con 个, es 两; si lo lees en una ficha, es 二.',
        ], [
          ['两个人。', 'liǎng gè rén.', 'Dos personas.'],
          ['十二', "shí'èr", 'Doce: dentro de un número compuesto, 二.'],
        ]),
      ],
    ),
    lesson(
      'm3-l3',
      'Teléfonos y edad',
      'vocab',
      [
        ...practice('w-ni3'),
        ...practice('w-shi4'),
        ...practice('w-wo3'),
        ...drill('w-dian-hua'),
        ...drill('w-hao-ma'),
        ...drill('w-sui4'),
        noteStep('n-jisui'),
        build('你的电话号码是多少？', 'nǐ de diànhuà hàomǎ shì duōshao?', '¿Cuál es tu número de teléfono?'),
        build('我二十一岁。', 'wǒ èrshíyī suì.', 'Tengo veintiún años.'),
      ],
      [
        grammar('n-jisui', 'La edad con 岁 (suì)', [
          'La edad no lleva verbo: SUJETO + NÚMERO + 岁. 我二十一岁 es literalmente "yo, veintiún años". Nunca digas "yo SOY veintiún años": el 是 sobra.',
          'Preguntar la edad: TÚ + NÚMERO + 岁. A niños: 你几岁？ A adultos: 你多大？ ("¿qué tan grande eres?") — 多大 es la forma normal entre adultos; 几岁 con niños.',
          '岁 va siempre pegado a su número: 二十一岁, "veintiún años".',
        ], [
          ['我二十一岁。', 'wǒ èrshíyī suì.', 'Tengo veintiún años.'],
          ['你几岁？', 'nǐ jǐ suì?', '¿Cuántos años tienes? (a un niño)'],
        ]),
      ],
    ),
    lesson(
      'm3-l4',
      'Auditoría del Sector 3',
      'review',
      [
        match('w-ling2', 'w-yi1', 'w-san1', 'w-wu3', 'w-liu4', 'w-jiu3'),
        match('w-ba1', 'w-qi1', 'w-shi2', 'w-si4'),
        { type: 'listen', entry: 'w-ji3' },
        { type: 'listen', entry: 'w-duo-shao' },
        { type: 'listen', entry: 'w-liang3' },
        typeP('w-liang3'),
        build('你的电话号码是多少？', 'nǐ de diànhuà hàomǎ shì duōshao?', '¿Cuál es tu número de teléfono?'),
      ],
    ),
  ],
}
