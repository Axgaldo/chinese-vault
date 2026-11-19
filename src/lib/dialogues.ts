/* ─────────────────────────────────────────────────────────────────────────────
   DIÁLOGOS DE LA RADIO 🎭 — conversaciones reales por niveles/temas.

   Cada diálogo está anclado a un SECTOR (módulo): solo suena en la Radio
   cuando ese sector está completo (vocabulario ya aprendido, cero sorpresas).
   Temas: saludos · identidad · familia · comida · tiempo · planes ·
   opiniones · el idioma.
   ───────────────────────────────────────────────────────────────────────────── */

import type { Dialogue } from '../types/content'
import { modules } from '../content'

export const DIALOGUES: Dialogue[] = [
  /* ── Saludos (S-00/S-01) ─────────────────────────────────────────────── */
  {
    id: 'dlg-saludos-1',
    sector: 'm1',
    topic: 'Saludos',
    title: 'Dos moradores se cruzan',
    lines: [
      { who: 'A', hanzi: '你好！', pinyin: 'nǐ hǎo!', es: '¡Hola!' },
      { who: 'B', hanzi: '你好！你好吗？', pinyin: 'nǐ hǎo! nǐ hǎo ma?', es: '¡Hola! ¿Cómo estás?' },
      { who: 'A', hanzi: '我很好，谢谢。你呢？', pinyin: 'wǒ hěn hǎo, xièxie. nǐ ne?', es: 'Estoy muy bien, gracias. ¿Y tú?' },
      { who: 'B', hanzi: '我也很好。再见！', pinyin: 'wǒ yě hěn hǎo. zàijiàn!', es: 'Yo también estoy bien. ¡Adiós!' },
    ],
  },
  {
    id: 'dlg-saludos-2',
    sector: 'm1',
    topic: 'Saludos',
    title: 'Cortesía del refugio',
    lines: [
      { who: 'A', hanzi: '请坐。请喝茶。', pinyin: 'qǐng zuò. qǐng hē chá.', es: 'Siéntate, por favor. Toma té, por favor.' },
      { who: 'B', hanzi: '谢谢！', pinyin: 'xièxie!', es: '¡Gracias!' },
      { who: 'A', hanzi: '不客气。', pinyin: 'bú kèqi.', es: 'De nada.' },
      { who: 'B', hanzi: '对不起，我要走了。再见！', pinyin: 'duìbuqǐ, wǒ yào zǒu le. zàijiàn!', es: 'Perdón, me tengo que ir. ¡Adiós!' },
    ],
  },

  /* ── Identidad (S-02) ────────────────────────────────────────────────── */
  {
    id: 'dlg-identidad-1',
    sector: 'm2',
    topic: 'Identidad',
    title: '¿Cómo te llamas?',
    lines: [
      { who: 'A', hanzi: '你好！你叫什么名字？', pinyin: 'nǐ hǎo! nǐ jiào shénme míngzi?', es: '¡Hola! ¿Cómo te llamas?' },
      { who: 'B', hanzi: '我叫玛丽亚。你呢？', pinyin: 'wǒ jiào Mǎlìyà. nǐ ne?', es: 'Me llamo María. ¿Y tú?' },
      { who: 'A', hanzi: '我叫安东。你是学生吗？', pinyin: 'wǒ jiào Āndōng. nǐ shì xuésheng ma?', es: 'Me llamo Antonio. ¿Eres estudiante?' },
      { who: 'B', hanzi: '不是，我是老师。', pinyin: 'bú shì, wǒ shì lǎoshī.', es: 'No, soy profesor.' },
    ],
  },
  {
    id: 'dlg-identidad-2',
    sector: 'm2',
    topic: 'Identidad',
    title: 'Mi vecina nueva',
    lines: [
      { who: 'A', hanzi: '您好！您是老师吗？', pinyin: 'nín hǎo! nín shì lǎoshī ma?', es: '¡Hola (usted)! ¿Es usted profesor?' },
      { who: 'B', hanzi: '不是，我是医生。', pinyin: 'bú shì, wǒ shì yīshēng.', es: 'No, soy médico.' },
      { who: 'A', hanzi: '他是我的朋友，他是学生。', pinyin: 'tā shì wǒ de péngyou, tā shì xuésheng.', es: 'Él es mi amigo, es estudiante.' },
      { who: 'B', hanzi: '很高兴认识你们！', pinyin: 'hěn gāoxìng rènshi nǐmen!', es: '¡Mucho gusto conocerlos!' },
    ],
  },

  /* ── Familia (S-04) ──────────────────────────────────────────────────── */
  {
    id: 'dlg-familia-1',
    sector: 'm4',
    topic: 'Familia',
    title: 'La foto de familia',
    lines: [
      { who: 'A', hanzi: '这是我的妈妈。', pinyin: 'zhè shì wǒ de māma.', es: 'Esta es mi mamá.' },
      { who: 'B', hanzi: '她很漂亮！你爸爸呢？', pinyin: 'tā hěn piàoliang! nǐ bàba ne?', es: '¡Es muy guapa! ¿Y tu papá?' },
      { who: 'A', hanzi: '他在家。他有两条狗。', pinyin: 'tā zài jiā. tā yǒu liǎng tiáo gǒu.', es: 'Está en casa. Tiene dos perros.' },
      { who: 'B', hanzi: '我家有一个女儿。', pinyin: 'wǒ jiā yǒu yí ge nǚ’ér.', es: 'En mi casa tenemos una hija.' },
    ],
  },

  /* ── Comida (S-06/S-13) ──────────────────────────────────────────────── */
  {
    id: 'dlg-comida-1',
    sector: 'm6',
    topic: 'Comida',
    title: 'En el comedor',
    lines: [
      { who: 'A', hanzi: '你想吃什么？', pinyin: 'nǐ xiǎng chī shénme?', es: '¿Qué quieres comer?' },
      { who: 'B', hanzi: '我想吃米饭。你呢？', pinyin: 'wǒ xiǎng chī mǐfàn. nǐ ne?', es: 'Quiero comer arroz. ¿Y tú?' },
      { who: 'A', hanzi: '我想喝茶，还想吃水果。', pinyin: 'wǒ xiǎng hē chá, hái xiǎng chī shuǐguǒ.', es: 'Quiero tomar té y también comer fruta.' },
      { who: 'B', hanzi: '好，请给我一杯水。', pinyin: 'hǎo, qǐng gěi wǒ yì bēi shuǐ.', es: 'Bien, dame un vaso de agua, por favor.' },
    ],
  },

  /* ── Tiempo y planes (S-07/S-11) ─────────────────────────────────────── */
  {
    id: 'dlg-tiempo-1',
    sector: 'm11',
    topic: 'Planes',
    title: '¿Qué haces mañana?',
    lines: [
      { who: 'A', hanzi: '你明天打算做什么？', pinyin: 'nǐ míngtiān dǎsuan zuò shénme?', es: '¿Qué planeas hacer mañana?' },
      { who: 'B', hanzi: '我打算去学校。', pinyin: 'wǒ dǎsuan qù xuéxiào.', es: 'Pienso ir a la escuela.' },
      { who: 'A', hanzi: '现在几点？', pinyin: 'xiànzài jǐ diǎn?', es: '¿Qué hora es ahora?' },
      { who: 'B', hanzi: '两点半。我要走了！', pinyin: 'liǎng diǎn bàn. wǒ yào zǒu le!', es: 'Las dos y media. ¡Me voy ya!' },
    ],
  },

  /* ── Opiniones (S-15/S-19) ───────────────────────────────────────────── */
  {
    id: 'dlg-opiniones-1',
    sector: 'm19',
    topic: 'Opiniones',
    title: 'Café o té',
    lines: [
      { who: 'A', hanzi: '咖啡还是茶？', pinyin: 'kāfēi háishì chá?', es: '¿Café o té?' },
      { who: 'B', hanzi: '今天太热了，我想喝茶。', pinyin: 'jīntiān tài rè le, wǒ xiǎng hē chá.', es: 'Hoy hace demasiado calor, quiero tomar té.' },
      { who: 'A', hanzi: '我觉得咖啡有点儿贵。', pinyin: 'wǒ juéde kāfēi yǒudiǎnr guì.', es: 'Me parece que el café es un poco caro.' },
      { who: 'B', hanzi: '对！茶比咖啡好。', pinyin: 'duì! chá bǐ kāfēi hǎo.', es: '¡Exacto! El té es mejor que el café.' },
    ],
  },
]

/** Diálogos desbloqueados: los del sector completado (todas sus lecciones) */
export function unlockedDialogues(completedLessonIds: string[]): Dialogue[] {
  return DIALOGUES.filter((d) => {
    const sectorLessons = modules.find((m) => m.id === d.sector)?.lessons ?? []
    return sectorLessons.length > 0 && sectorLessons.every((l) => completedLessonIds.includes(l.id))
  })
}

/** Diálogos agrupados por tema (para la parrilla de la Radio) */
export function dialoguesByTopic(dialogues: Dialogue[]): Map<string, Dialogue[]> {
  const map = new Map<string, Dialogue[]>()
  for (const d of dialogues) {
    const list = map.get(d.topic) ?? []
    list.push(d)
    map.set(d.topic, list)
  }
  return map
}
