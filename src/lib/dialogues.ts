/* ─────────────────────────────────────────────────────────────────────────────
   DIÁLOGOS DE LA RADIO 🎭 — conversaciones reales por niveles/temas.

   Cada diálogo está anclado a un SECTOR (módulo): solo suena en la Radio
   cuando ese sector está completo. DISCIPLINA: cada línea solo usa
   vocabulario de su sector o de sectores anteriores (cero sorpresas).
   Temas: saludos · identidad · números · familia · lugares · comida ·
   tiempo · rutina · gustos · direcciones · compras · comparar ·
   tecnología · opiniones · el idioma.
   ───────────────────────────────────────────────────────────────────────────── */

import type { Dialogue } from '../types/content'
import { modules } from '../content'

export const DIALOGUES: Dialogue[] = [
  /* ── S-01 Saludos ──────────────────────────────────────────────────── */
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
      { who: 'B', hanzi: '再见！谢谢你！', pinyin: 'zàijiàn! xièxie nǐ!', es: '¡Adiós! ¡Gracias!' },
      { who: 'A', hanzi: '再见！', pinyin: 'zàijiàn!', es: '¡Adiós!' },
    ],
  },

  /* ── S-02 Identidad ────────────────────────────────────────────────── */
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
    title: '¿De dónde eres?',
    lines: [
      { who: 'A', hanzi: '您好！', pinyin: 'nín hǎo!', es: '¡Hola (con respeto)!' },
      { who: 'B', hanzi: '你好！你是西班牙人吗？', pinyin: 'nǐ hǎo! nǐ shì Xībānyá rén ma?', es: '¡Hola! ¿Eres español?' },
      { who: 'A', hanzi: '是，我是西班牙人。', pinyin: 'shì, wǒ shì Xībānyá rén.', es: 'Sí, soy español.' },
      { who: 'B', hanzi: '我是中国人。', pinyin: 'wǒ shì Zhōngguó rén.', es: 'Yo soy chino.' },
      { who: 'A', hanzi: '我是学生。你是老师吗？', pinyin: 'wǒ shì xuésheng. nǐ shì lǎoshī ma?', es: 'Soy estudiante. ¿Eres profesor?' },
      { who: 'B', hanzi: '不是，我是学生。', pinyin: 'bú shì, wǒ shì xuésheng.', es: 'No, soy estudiante.' },
    ],
  },

  /* ── S-03 Números ──────────────────────────────────────────────────── */
  {
    id: 'dlg-numeros-1',
    sector: 'm3',
    topic: 'Números',
    title: 'Teléfono y edad',
    lines: [
      { who: 'A', hanzi: '你的电话号码是多少？', pinyin: 'nǐ de diànhuà hàomǎ shì duōshao?', es: '¿Cuál es tu número de teléfono?' },
      { who: 'B', hanzi: '一三七九，八二五零。', pinyin: 'yī sān qī jiǔ, bā èr wǔ líng.', es: 'Uno-tres-siete-nueve, ocho-dos-cinco-cero.' },
      { who: 'A', hanzi: '谢谢。你几岁？', pinyin: 'xièxie. nǐ jǐ suì?', es: 'Gracias. ¿Cuántos años tienes?' },
      { who: 'B', hanzi: '我二十一岁。你呢？', pinyin: 'wǒ èrshíyī suì. nǐ ne?', es: 'Tengo veintiún años. ¿Y tú?' },
      { who: 'A', hanzi: '我三十岁。', pinyin: 'wǒ sānshí suì.', es: 'Tengo treinta años.' },
    ],
  },

  /* ── S-04 Familia ──────────────────────────────────────────────────── */
  {
    id: 'dlg-familia-1',
    sector: 'm4',
    topic: 'Familia',
    title: 'La foto de familia',
    lines: [
      { who: 'A', hanzi: '这是我的妈妈。', pinyin: 'zhè shì wǒ de māma.', es: 'Esta es mi mamá.' },
      { who: 'B', hanzi: '她很好！你爸爸呢？', pinyin: 'tā hěn hǎo! nǐ bàba ne?', es: '¡Está muy bien! ¿Y tu papá?' },
      { who: 'A', hanzi: '他有两个儿子。', pinyin: 'tā yǒu liǎng ge érzi.', es: 'Él tiene dos hijos (varones).' },
      { who: 'B', hanzi: '我家有两个孩子。', pinyin: 'wǒ jiā yǒu liǎng ge háizi.', es: 'En mi casa tenemos dos niños.' },
    ],
  },
  {
    id: 'dlg-familia-2',
    sector: 'm4',
    topic: 'Familia',
    title: '¿Tienes hijos?',
    lines: [
      { who: 'A', hanzi: '你有孩子吗？', pinyin: 'nǐ yǒu háizi ma?', es: '¿Tienes hijos?' },
      { who: 'B', hanzi: '有，一个女儿。', pinyin: 'yǒu, yì ge nǚ’ér.', es: 'Sí, una hija.' },
      { who: 'A', hanzi: '她几岁？', pinyin: 'tā jǐ suì?', es: '¿Cuántos años tiene?' },
      { who: 'B', hanzi: '她六岁。', pinyin: 'tā liù suì.', es: 'Tiene seis años.' },
      { who: 'A', hanzi: '我的儿子七岁。', pinyin: 'wǒ de érzi qī suì.', es: 'Mi hijo tiene siete años.' },
    ],
  },

  /* ── S-05 Lugares ──────────────────────────────────────────────────── */
  {
    id: 'dlg-lugares-1',
    sector: 'm5',
    topic: 'Lugares',
    title: '¿Dónde está la escuela?',
    lines: [
      { who: 'A', hanzi: '请问，学校在哪儿？', pinyin: 'qǐngwén, xuéxiào zài nǎr?', es: 'Disculpe, ¿dónde está la escuela?' },
      { who: 'B', hanzi: '在那儿。', pinyin: 'zài nàr.', es: 'Está allí.' },
      { who: 'A', hanzi: '医院呢？', pinyin: 'yīyuàn ne?', es: '¿Y el hospital?' },
      { who: 'B', hanzi: '不在这儿。在那儿。', pinyin: 'bú zài zhèr. zài nàr.', es: 'No está aquí. Está allí.' },
      { who: 'A', hanzi: '谢谢！', pinyin: 'xièxie!', es: '¡Gracias!' },
      { who: 'B', hanzi: '不客气。', pinyin: 'bú kèqi.', es: 'De nada.' },
    ],
  },

  /* ── S-06 Comida ───────────────────────────────────────────────────── */
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

  /* ── S-07 Tiempo ───────────────────────────────────────────────────── */
  {
    id: 'dlg-tiempo-1',
    sector: 'm7',
    topic: 'Tiempo',
    title: '¿Qué día es hoy?',
    lines: [
      { who: 'A', hanzi: '今天星期几？', pinyin: 'jīntiān xīngqī jǐ?', es: '¿Qué día de la semana es hoy?' },
      { who: 'B', hanzi: '今天星期五。', pinyin: 'jīntiān xīngqīwǔ.', es: 'Hoy es viernes.' },
      { who: 'A', hanzi: '明天星期六。', pinyin: 'míngtiān xīngqīliù.', es: 'Mañana es sábado.' },
      { who: 'B', hanzi: '对！现在几点？', pinyin: 'duì! xiànzài jǐ diǎn?', es: '¡Exacto! ¿Qué hora es ahora?' },
      { who: 'A', hanzi: '两点半。', pinyin: 'liǎng diǎn bàn.', es: 'Las dos y media.' },
    ],
  },

  /* ── S-08 Rutina ───────────────────────────────────────────────────── */
  {
    id: 'dlg-rutina-1',
    sector: 'm8',
    topic: 'Rutina',
    title: 'Un día de trabajo',
    lines: [
      { who: 'A', hanzi: '你工作吗？', pinyin: 'nǐ gōngzuò ma?', es: '¿Trabajas?' },
      { who: 'B', hanzi: '工作。我上午工作。', pinyin: 'gōngzuò. wǒ shàngwǔ gōngzuò.', es: 'Trabajo. Trabajo por la mañana.' },
      { who: 'A', hanzi: '你会说中文吗？', pinyin: 'nǐ huì shuō zhōngwén ma?', es: '¿Sabes hablar chino?' },
      { who: 'B', hanzi: '会说。我在学习。', pinyin: 'huì shuō. wǒ zài xuéxí.', es: 'Sé hablarlo. Estoy estudiando.' },
      { who: 'A', hanzi: '下午呢？', pinyin: 'xiàwǔ ne?', es: '¿Y por la tarde?' },
      { who: 'B', hanzi: '下午我看电视。', pinyin: 'xiàwǔ wǒ kàn diànshì.', es: 'Por la tarde veo la tele.' },
    ],
  },

  /* ── S-09 Gustos ───────────────────────────────────────────────────── */
  {
    id: 'dlg-gustos-1',
    sector: 'm9',
    topic: 'Gustos',
    title: 'Gatos y perros',
    lines: [
      { who: 'A', hanzi: '我的猫很大。', pinyin: 'wǒ de māo hěn dà.', es: 'Mi gato es muy grande.' },
      { who: 'B', hanzi: '我的猫很小。', pinyin: 'wǒ de māo hěn xiǎo.', es: 'Mi gato es muy pequeño.' },
      { who: 'A', hanzi: '你的狗呢？', pinyin: 'nǐ de gǒu ne?', es: '¿Y tu perro?' },
      { who: 'B', hanzi: '我的狗很漂亮！', pinyin: 'wǒ de gǒu hěn piàoliang!', es: '¡Mi perro es muy guapo!' },
    ],
  },
  {
    id: 'dlg-gustos-2',
    sector: 'm9',
    topic: 'Gustos',
    title: '¿Qué te gusta comer?',
    lines: [
      { who: 'A', hanzi: '你喜欢吃什么？', pinyin: 'nǐ xǐhuan chī shénme?', es: '¿Qué te gusta comer?' },
      { who: 'B', hanzi: '我喜欢吃水果。你呢？', pinyin: 'wǒ xǐhuan chī shuǐguǒ. nǐ ne?', es: 'Me gusta comer fruta. ¿Y a ti?' },
      { who: 'A', hanzi: '我很累。我想睡觉。', pinyin: 'wǒ hěn lèi. wǒ xiǎng shuìjiào.', es: 'Estoy muy cansado. Quiero dormir.' },
      { who: 'B', hanzi: '好，再见！', pinyin: 'hǎo, zàijiàn!', es: 'Bueno, ¡adiós!' },
    ],
  },

  /* ── S-12/18 Direcciones ───────────────────────────────────────────── */
  {
    id: 'dlg-direcciones-1',
    sector: 'm18',
    topic: 'Direcciones',
    title: 'Camino a la biblioteca',
    lines: [
      { who: 'A', hanzi: '请问，图书馆在哪儿？', pinyin: 'qǐngwén, túshūguǎn zài nǎr?', es: 'Disculpe, ¿dónde está la biblioteca?' },
      { who: 'B', hanzi: '一直走，然后右拐。', pinyin: 'yìzhí zǒu, ránhòu yòu guǎi.', es: 'Sigue todo recto y luego gira a la derecha.' },
      { who: 'A', hanzi: '一直走，然后右拐？', pinyin: 'yìzhí zǒu, ránhòu yòu guǎi?', es: '¿Todo recto y luego giro a la derecha?' },
      { who: 'B', hanzi: '对！图书馆在学校前面。', pinyin: 'duì! túshūguǎn zài xuéxiào qiánmiàn.', es: '¡Exacto! La biblioteca está delante de la escuela.' },
      { who: 'A', hanzi: '谢谢你！', pinyin: 'xièxie nǐ!', es: '¡Muchas gracias!' },
      { who: 'B', hanzi: '不客气。再见！', pinyin: 'bú kèqi. zàijiàn!', es: 'De nada. ¡Adiós!' },
    ],
  },

  /* ── S-13 Restaurante ──────────────────────────────────────────────── */
  {
    id: 'dlg-restaurante-1',
    sector: 'm13',
    topic: 'Restaurante',
    title: 'Sin cordero, hay vaca',
    lines: [
      { who: 'A', hanzi: '你想吃什么？', pinyin: 'nǐ xiǎng chī shénme?', es: '¿Qué quieres comer?' },
      { who: 'B', hanzi: '我想吃羊肉。', pinyin: 'wǒ xiǎng chī yángròu.', es: 'Quiero comer cordero.' },
      { who: 'A', hanzi: '没有羊肉。牛肉呢？', pinyin: 'méiyǒu yángròu. niúròu ne?', es: 'No hay cordero. ¿Y carne de vaca?' },
      { who: 'B', hanzi: '好，牛肉和米饭。', pinyin: 'hǎo, niúròu hé mǐfàn.', es: 'Bien, carne de vaca y arroz.' },
      { who: 'A', hanzi: '这是蛋糕。你吃吗？', pinyin: 'zhè shì dàngāo. nǐ chī ma?', es: 'Esto es tarta. ¿Comes?' },
      { who: 'B', hanzi: '吃！谢谢！', pinyin: 'chī! xièxie!', es: '¡Como! ¡Gracias!' },
    ],
  },

  /* ── S-15 Comparar ─────────────────────────────────────────────────── */
  {
    id: 'dlg-comparar-1',
    sector: 'm15',
    topic: 'Comparar',
    title: 'Coche o bicicleta',
    lines: [
      { who: 'A', hanzi: '汽车和自行车，你喜欢什么？', pinyin: 'qìchē hé zìxíngchē, nǐ xǐhuan shénme?', es: 'El coche y la bici, ¿cuál te gusta?' },
      { who: 'B', hanzi: '我喜欢自行车。', pinyin: 'wǒ xǐhuan zìxíngchē.', es: 'Me gusta la bici.' },
      { who: 'A', hanzi: '汽车比自行车快。', pinyin: 'qìchē bǐ zìxíngchē kuài.', es: 'El coche es más rápido que la bici.' },
      { who: 'B', hanzi: '对，但是自行车很便宜。', pinyin: 'duì, dànshì zìxíngchē hěn piányi.', es: 'Exacto, pero la bici es muy barata.' },
      { who: 'A', hanzi: '我的自行车是新的。', pinyin: 'wǒ de zìxíngchē shì xīn de.', es: 'Mi bici es nueva.' },
    ],
  },

  /* ── S-16 Compras ──────────────────────────────────────────────────── */
  {
    id: 'dlg-compras-1',
    sector: 'm16',
    topic: 'Compras',
    title: 'En el mercado del refugio',
    lines: [
      { who: 'A', hanzi: '请问，这个多少钱？', pinyin: 'qǐngwén, zhè ge duōshao qián?', es: 'Disculpe, ¿cuánto cuesta esto?' },
      { who: 'B', hanzi: '两块钱。', pinyin: 'liǎng kuài qián.', es: 'Dos kuais.' },
      { who: 'A', hanzi: '请给我两个。', pinyin: 'qǐng gěi wǒ liǎng ge.', es: 'Dame dos, por favor.' },
      { who: 'B', hanzi: '好，四块钱。', pinyin: 'hǎo, sì kuài qián.', es: 'Bien, cuatro kuais.' },
      { who: 'A', hanzi: '给你五块。', pinyin: 'gěi nǐ wǔ kuài.', es: 'Te doy cinco.' },
      { who: 'B', hanzi: '谢谢！再见！', pinyin: 'xièxie! zàijiàn!', es: '¡Gracias! ¡Adiós!' },
    ],
  },

  /* ── S-17 Tecnología ───────────────────────────────────────────────── */
  {
    id: 'dlg-tec-1',
    sector: 'm17',
    topic: 'Tecnología',
    title: 'Mensajes y fotos',
    lines: [
      { who: 'A', hanzi: '你在做什么？', pinyin: 'nǐ zài zuò shénme?', es: '¿Qué estás haciendo?' },
      { who: 'B', hanzi: '我在用电脑看新闻。', pinyin: 'wǒ zài yòng diànnǎo kàn xīnwén.', es: 'Estoy usando el ordenador para ver noticias.' },
      { who: 'A', hanzi: '发短信给我。', pinyin: 'fā duǎnxìn gěi wǒ.', es: 'Mándame un mensaje.' },
      { who: 'B', hanzi: '好。你的手机呢？', pinyin: 'hǎo. nǐ de shǒujī ne?', es: 'Vale. ¿Y tu móvil?' },
      { who: 'A', hanzi: '我的手机很旧，但是很好。', pinyin: 'wǒ de shǒujī hěn jiù, dànshì hěn hǎo.', es: 'Mi móvil es muy viejo, pero está muy bien.' },
    ],
  },

  /* ── S-19 Opiniones ────────────────────────────────────────────────── */
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

  /* ── S-20 El idioma ────────────────────────────────────────────────── */
  {
    id: 'dlg-idioma-1',
    sector: 'm20',
    topic: 'El idioma',
    title: 'Estudiando chino',
    lines: [
      { who: 'A', hanzi: '你学过汉语吗？', pinyin: 'nǐ xuéguo hànyǔ ma?', es: '¿Has estudiado chino (alguna vez)?' },
      { who: 'B', hanzi: '学过。我学过两年。', pinyin: 'xuéguo. wǒ xuéguo liǎng nián.', es: 'Lo he estudiado. Lo estudié dos años.' },
      { who: 'A', hanzi: '你认识很多字吗？', pinyin: 'nǐ rènshi hěn duō zì ma?', es: '¿Reconoces muchos caracteres?' },
      { who: 'B', hanzi: '认识一点儿。', pinyin: 'rènshi yìdiǎnr.', es: 'Reconozco un poquito.' },
      { who: 'A', hanzi: '我的声调越来越好。', pinyin: 'wǒ de shēngdiào yuèláiyuè hǎo.', es: 'Mis tonos son cada vez mejores.' },
      { who: 'B', hanzi: '对！我们一起练习吧。', pinyin: 'duì! wǒmen yìqǐ liànxí ba.', es: '¡Exacto! Practiquemos juntos.' },
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
