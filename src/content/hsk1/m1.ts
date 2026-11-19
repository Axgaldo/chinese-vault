/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 1 · HSK 1 — PRIMER CONTACTO (módulo 1/10)

   Saludos, estado y negación. Inspirado en "El saludo" y "Usos de shì 是"
   del curso básico de hablochino.com.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m1: VaultModule = {
  id: 'm1',
  hsk: 1,
  code: 'S-01',
  title: 'Primer Contacto',
  subtitle: 'Saludar, presentarte y decir cómo estás',
  entries: [
    // (你好, 谢谢, 再见, 对不起 se introdujeron en el Sector 0: aquí solo se referencian)
    e('w-ni3', '你', 'nǐ', 'tú', '👉'),
    e('w-ni-men', '你们', 'nǐmen', 'vosotros, vosotras', '👥'),
    e('w-hao3', '好', 'hǎo', 'bien, bueno', '🙂'),
    e('w-hen3', '很', 'hěn', 'muy', '⭐'),
    e('w-wo3', '我', 'wǒ', 'yo', '👤'),
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
        ...drill('w-ni3'),
        ...drill('w-ni-men'),
        match('w-ni-hao', 'w-hao3', 'w-ni3', 'w-ni-men'),
      ],
    ),
    lesson(
      'm1-l2',
      'Estado y negación',
      'grammar',
      [
        ...drill('w-wo3'),
        ...drill('w-hen3'),
        ...drill('w-shi4'),
        ...drill('w-bu4'),
        { type: 'intro', entry: 'w-ma5' },
        noteStep('n-bu4'),
        noteStep('n-ma5'),
        build('你好吗？', 'nǐ hǎo ma?', '¿Cómo estás?'),
        build('我很好。', 'wǒ hěn hǎo.', 'Estoy muy bien.'),
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
        match('w-ni3', 'w-wo3', 'w-shi4', 'w-hen3'),
        match('w-ni-hao', 'w-xie-xie', 'w-zai-jian', 'w-qing3'),
        { type: 'listen', entry: 'w-shi4' },
        { type: 'listen', entry: 'w-bu4' },
        { type: 'listen', entry: 'w-ma5' },
        build('你好吗？', 'nǐ hǎo ma?', '¿Cómo estás?'),
        build('我很好。', 'wǒ hěn hǎo.', 'Estoy muy bien.'),
        typeP('w-ni-hao'),
        typeP('w-xie-xie'),
      ],
    ),
  ],
}
