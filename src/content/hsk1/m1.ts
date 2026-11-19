/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 1 · HSK 1 — PRIMER CONTACTO (módulo 1/10)

   Saludos, el sistema completo de pronombres (我你他她 + 们), estado y
   negación. Inspirado en "El saludo", "Pronombres I/II" y "Usos de shì 是"
   del curso básico de hablochino.com.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m1: VaultModule = {
  id: 'm1',
  hsk: 1,
  code: 'S-01',
  title: 'Primer Contacto',
  subtitle: 'Saludar, los pronombres y decir cómo estás',
  entries: [
    // (你好, 谢谢, 再见, 对不起 viven en el Sector 0; 他/她 en el Sector 2: aquí solo se referencian)
    e('w-hao3', '好', 'hǎo', 'bien, bueno', '🙂'),
    e('w-ni3', '你', 'nǐ', 'tú', '👉'),
    e('w-wo3', '我', 'wǒ', 'yo', '👤'),
    e('w-ni-men', '你们', 'nǐmen', 'vosotros, vosotras', '👥'),
    e('w-hen3', '很', 'hěn', 'muy', '⭐'),
    e('w-shi4', '是', 'shì', 'ser, estar', '✅'),
    e('w-bu4', '不', 'bù', 'no', '❌', 'bú delante de tono 4: bú shì'),
    e('w-ma5', '吗', 'ma', 'partícula de pregunta', '❓', 'se escribe sin tono'),
    e('w-qing3', '请', 'qǐng', 'por favor', '🙇'),
  ],
  lessons: [
    lesson(
      'm1-l1',
      'Saludos básicos',
      'vocab',
      [
        ...drill('w-ni-hao'),
        ...drill('w-hao3'),
        match('w-ni-hao', 'w-hao3', 'w-xie-xie', 'w-zai-jian'),
      ],
    ),
    lesson(
      'm1-l1b',
      'Los pronombres',
      'grammar',
      [
        ...drill('w-wo3'),
        ...drill('w-ni3'),
        ...drill('w-ta1'),
        ...drill('w-ta1-she'),
        ...drill('w-ni-men'),
        ...drill('w-hen3'),
        noteStep('n-dai-ci'),
        build('我很好。', 'wǒ hěn hǎo.', 'Estoy muy bien.'),
        build('你们好！', 'nǐmen hǎo!', '¡Hola a todos!'),
      ],
      [
        grammar('n-dai-ci', '我你他她: la caja de los pronombres', [
          'El chino tiene una caja de pronombres más pequeña que la española: solo CUATRO en singular, y el género vive en el ESCRITO, no en el sonido:',
          '我 (wǒ) = yo · 你 (nǐ) = tú · 他 (tā) = él · 她 (tā) = ella',
          '他 y 她 suenan EXACTAMENTE igual (tā): el oído nunca distingue el género — solo el ojo. Más adelante veremos que también existe 您 (nín, usted): la caja tiene un estante de cortesía.',
          '¿Y los plurales? 们 (men) convierte PERSONAS en plural, como un sello que se estampa detrás: 你 → 你们 (nǐmen, vosotros). Aprende el sello 们 una sola vez y te servirá para siempre: 我们 (wǒmen, nosotros) y 他们 (tāmen, ellos) llegan en el Sector 4, pero el mecanismo ya es tuyo.',
          'Tip del Overseer: 很 (hěn, "muy") es el pegamento entre pronombre y estado: 我很好 = "yo muy-bien". Sin 很, 我好 suena raro o a exclamación. Guárdalo junto a los pronombres: van siempre juntos.',
        ], [
          ['你们好！', 'nǐmen hǎo!', '¡Hola (a varios)!'],
          ['我很好。', 'wǒ hěn hǎo.', 'Estoy muy bien.'],
          ['她很好。', 'tā hěn hǎo.', 'Ella está muy bien.'],
        ]),
      ],
    ),
    lesson(
      'm1-l2',
      'Estado y negación',
      'grammar',
      [
        ...drill('w-shi4'),
        ...drill('w-bu4'),
        { type: 'intro', entry: 'w-ma5' },
        noteStep('n-bu4'),
        noteStep('n-ma5'),
        build('你好吗？', 'nǐ hǎo ma?', '¿Cómo estás?'),
        build('我不是安东。', 'wǒ bú shì Āndōng.', 'No soy Antonio.'),
      ],
      [
        grammar('n-bu4', '不 (bù): la palabra "no"', [
          '不 se pone DELANTE del verbo o adjetivo para negarlo. No hay conjugación: 我不是 = "yo no soy".',
          'Cambio de tono (sandhi): 不 es tono 4, pero delante de otro tono 4 pasa a tono 2: bú shì (no es).',
          'Escucha bien la diferencia: bù … bú shì …',
        ], [
          ['我不是老师。', 'wǒ bú shì lǎoshī.', 'No soy profesor.'],
          ['我不好。', 'wǒ bù hǎo.', 'No estoy bien.'],
        ]),
        grammar('n-ma5', 'Preguntas con 吗 (ma)', [
          'El chino no cambia el orden de la frase para preguntar: añades 吗 al final y ya tienes pregunta.',
          '你好 → 你好吗. En español sería como decir "¿tú bueno?" sin cambiar nada más.',
          ' 吗 siempre se escribe SIN marca de tono: es la partícula neutral por excelencia.',
        ], [
          ['你好吗？', 'nǐ hǎo ma?', '¿Cómo estás?'],
          ['你是学生吗？', 'nǐ shì xuésheng ma?', '¿Eres estudiante?'],
        ]),
      ],
    ),
    lesson(
      'm1-l3',
      'Cortesía de morador',
      'vocab',
      [
        ...practice('w-xie-xie'),
        ...practice('w-zai-jian'),
        ...practice('w-dui-bu-qi'),
        ...drill('w-qing3'),
        build('请喝茶。', 'qǐng hē chá.', 'Por favor, bebe té.'),
        match('w-xie-xie', 'w-zai-jian', 'w-dui-bu-qi', 'w-qing3'),
      ],
    ),
    lesson(
      'm1-l4',
      'Auditoría del Sector 1',
      'review',
      [
        match('w-ni3', 'w-wo3', 'w-ta1', 'w-ni-men'),
        match('w-ni-hao', 'w-xie-xie', 'w-zai-jian', 'w-qing3'),
        { type: 'listen', entry: 'w-shi4' },
        { type: 'listen', entry: 'w-bu4' },
        { type: 'listen', entry: 'w-ma5' },
        { type: 'listen', entry: 'w-ta1-she' },
        build('你好吗？', 'nǐ hǎo ma?', '¿Cómo estás?'),
        build('我很好。', 'wǒ hěn hǎo.', 'Estoy muy bien.'),
        typeP('w-ni-hao'),
        typeP('w-xie-xie'),
      ],
    ),
  ],
}
