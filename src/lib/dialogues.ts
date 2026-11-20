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
      { who: 'A', hanzi: '谢谢。你多大？', pinyin: 'xièxie. nǐ duō dà?', es: 'Gracias. ¿Cuántos años tienes?' },
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
      { who: 'B', hanzi: '有，一个女儿。', pinyin: "yǒu, yí ge nǚ'ér.", es: 'Sí, una hija.' },
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
      { who: 'A', hanzi: '请问，学校在哪儿？', pinyin: 'qǐngwèn, xuéxiào zài nǎr?', es: 'Disculpe, ¿dónde está la escuela?' },
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
      { who: 'A', hanzi: '我也很喜欢吃水果。', pinyin: 'wǒ yě hěn xǐhuan chī shuǐguǒ.', es: 'A mí también me gusta mucho comer fruta.' },
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
      { who: 'A', hanzi: '请问，图书馆在哪儿？', pinyin: 'qǐngwèn, túshūguǎn zài nǎr?', es: 'Disculpe, ¿dónde está la biblioteca?' },
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
      { who: 'A', hanzi: '汽车和自行车，你喜欢哪个？', pinyin: 'qìchē hé zìxíngchē, nǐ xǐhuan nǎ ge?', es: 'El coche y la bici, ¿cuál te gusta?' },
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
      { who: 'A', hanzi: '请问，这个多少钱？', pinyin: 'qǐngwèn, zhè ge duōshao qián?', es: 'Disculpe, ¿cuánto cuesta esto?' },
      { who: 'B', hanzi: '两块钱。', pinyin: 'liǎng kuài qián.', es: 'Dos kuai.' },
      { who: 'A', hanzi: '请给我两个。', pinyin: 'qǐng gěi wǒ liǎng ge.', es: 'Dame dos, por favor.' },
      { who: 'B', hanzi: '好，四块钱。', pinyin: 'hǎo, sì kuài qián.', es: 'Bien, cuatro kuai.' },
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

  /* ── S-10 En la ciudad (refuerzo) ──────────────────────────────────── */
  {
    id: 'dlg-ciudad-1',
    sector: 'm9b',
    topic: 'Lugares',
    title: 'Cómo ir a Pekín',
    lines: [
      { who: 'A', hanzi: '你去学校吗？', pinyin: 'nǐ qù xuéxiào ma?', es: '¿Vas a la escuela?' },
      { who: 'B', hanzi: '是，我坐出租车去。', pinyin: 'shì, wǒ zuò chūzūchē qù.', es: 'Sí, voy en taxi.' },
      { who: 'A', hanzi: '我坐飞机去北京。', pinyin: 'wǒ zuò fēijī qù Běijīng.', es: 'Yo voy a Pekín en avión.' },
      { who: 'B', hanzi: '北京很大！再见！', pinyin: 'Běijīng hěn dà! zàijiàn!', es: '¡Pekín es enorme! ¡Adiós!' },
    ],
  },
  {
    id: 'dlg-ciudad-2',
    sector: 'm9b',
    topic: 'Compras',
    title: 'La tienda del refugio',
    lines: [
      { who: 'A', hanzi: '你买什么东西？', pinyin: 'nǐ mǎi shénme dōngxi?', es: '¿Qué cosas compras?' },
      { who: 'B', hanzi: '我买衣服。你也买东西吗？', pinyin: 'wǒ mǎi yīfu. nǐ yě mǎi dōngxi ma?', es: 'Compro ropa. ¿Tú también compras cosas?' },
      { who: 'A', hanzi: '是，我和同学去饭馆。', pinyin: 'shì, wǒ hé tóngxué qù fànguǎn.', es: 'Sí, y voy al restaurante con un compañero.' },
      { who: 'B', hanzi: '好！你们吃饭，我买衣服。', pinyin: 'hǎo! nǐmen chī fàn, wǒ mǎi yīfu.', es: '¡Bien! Vosotros coméis, yo compro ropa.' },
    ],
  },
  {
    id: 'dlg-ciudad-3',
    sector: 'm9b',
    topic: 'Lugares',
    title: 'Vivir en la gran ciudad',
    lines: [
      { who: 'A', hanzi: '你住在北京吗？', pinyin: 'nǐ zhù zài Běijīng ma?', es: '¿Vives en Pekín?' },
      { who: 'B', hanzi: '不，我住在中国。', pinyin: 'bù, wǒ zhù zài Zhōngguó.', es: 'No, vivo en China.' },
      { who: 'A', hanzi: '你给妈妈打电话吗？', pinyin: 'nǐ gěi māma dǎ diànhuà ma?', es: '¿Llamas a tu madre por teléfono?' },
      { who: 'B', hanzi: '是，我每天给妈妈打电话。', pinyin: 'shì, wǒ měitiān gěi māma dǎ diànhuà.', es: 'Sí, llamo a mi madre todos los días.' },
    ],
  },

  /* ── S-11 ¿Qué pasa? (refuerzo) ────────────────────────────────────── */
  {
    id: 'dlg-que-pasa-1',
    sector: 'm9c',
    topic: 'Saludos',
    title: 'Al teléfono del refugio',
    lines: [
      { who: 'A', hanzi: '喂，你好！', pinyin: 'wèi, nǐ hǎo!', es: '¡Oiga, hola!' },
      { who: 'B', hanzi: '喂！你是谁？', pinyin: 'wèi! nǐ shì shéi?', es: '¡Oiga! ¿Quién eres?' },
      { who: 'A', hanzi: '我是安东。你看见我的同学吗？', pinyin: 'wǒ shì Āndōng. nǐ kànjiàn wǒ de tóngxué ma?', es: 'Soy Antonio. ¿Has visto a mi compañero?' },
      { who: 'B', hanzi: '看见，他在学校。', pinyin: 'kànjiàn, tā zài xuéxiào.', es: 'Lo he visto, está en la escuela.' },
      { who: 'A', hanzi: '谢谢你！', pinyin: 'xièxie nǐ!', es: '¡Gracias!' },
      { who: 'B', hanzi: '没关系！再见！', pinyin: 'méi guānxi! zàijiàn!', es: '¡No pasa nada! ¡Adiós!' },
    ],
  },
  {
    id: 'dlg-que-pasa-2',
    sector: 'm9c',
    topic: 'Tiempo',
    title: 'Día de lluvia',
    lines: [
      { who: 'A', hanzi: '今天怎么样？', pinyin: 'jīntiān zěnmeyàng?', es: '¿Qué tal hoy?' },
      { who: 'B', hanzi: '今天下雨。', pinyin: 'jīntiān xiàyǔ.', es: 'Hoy llueve.' },
      { who: 'A', hanzi: '中午我们去饭馆，好吗？', pinyin: 'zhōngwǔ wǒmen qù fànguǎn, hǎo ma?', es: 'Al mediodía vamos al restaurante, ¿vale?' },
      { who: 'B', hanzi: '好！我们都去。', pinyin: 'hǎo! wǒmen dōu qù.', es: '¡Bien! Vamos todos.' },
    ],
  },
  {
    id: 'dlg-que-pasa-3',
    sector: 'm9c',
    topic: 'Compras',
    title: 'Estas cosas sí',
    lines: [
      { who: 'A', hanzi: '这些东西很好。', pinyin: 'zhèxiē dōngxi hěn hǎo.', es: 'Estas cosas están muy bien.' },
      { who: 'B', hanzi: '那些东西呢？', pinyin: 'nàxiē dōngxi ne?', es: '¿Y esas cosas?' },
      { who: 'A', hanzi: '那些东西不好。', pinyin: 'nàxiē dōngxi bù hǎo.', es: 'Esas cosas no están bien.' },
      { who: 'B', hanzi: '好，我买这些。', pinyin: 'hǎo, wǒ mǎi zhèxiē.', es: 'Bien, compro estas.' },
    ],
  },

  /* ── S-22 La familia ampliada (refuerzo) ───────────────────────────── */
  {
    id: 'dlg-familia2-1',
    sector: 'm19a',
    topic: 'Familia',
    title: 'Presentando a la familia',
    lines: [
      { who: 'A', hanzi: '这是我哥哥。', pinyin: 'zhè shì wǒ gēge.', es: 'Este es mi hermano mayor.' },
      { who: 'B', hanzi: '你好！你姓什么？', pinyin: 'nǐ hǎo! nǐ xìng shénme?', es: '¡Hola! ¿Cómo te apellidas?' },
      { who: 'A', hanzi: '我姓王。这是我妻子。', pinyin: 'wǒ xìng Wáng. zhè shì wǒ qīzi.', es: 'Me apellido Wang. Esta es mi esposa.' },
      { who: 'B', hanzi: '你们好！', pinyin: 'nǐmen hǎo!', es: '¡Hola a los dos!' },
      { who: 'A', hanzi: '今天是我弟弟的生日。', pinyin: 'jīntiān shì wǒ dìdi de shēngrì.', es: 'Hoy es el cumpleaños de mi hermano pequeño.' },
      { who: 'B', hanzi: '弟弟，生日快乐！', pinyin: 'dìdi, shēngrì kuàilè!', es: '¡Felicidades, hermano pequeño!' },
    ],
  },
  {
    id: 'dlg-familia2-2',
    sector: 'm19a',
    topic: 'Familia',
    title: 'El hombre del periódico',
    lines: [
      { who: 'A', hanzi: '那个男人是谁？', pinyin: 'nà ge nánrén shì shéi?', es: '¿Quién es ese hombre?' },
      { who: 'B', hanzi: '他是我丈夫。', pinyin: 'tā shì wǒ zhàngfu.', es: 'Es mi esposo.' },
      { who: 'A', hanzi: '他在看报纸。', pinyin: 'tā zài kàn bàozhǐ.', es: 'Está leyendo el periódico.' },
      { who: 'B', hanzi: '是，他喜欢看报纸。', pinyin: 'shì, tā xǐhuan kàn bàozhǐ.', es: 'Sí, le gusta leer el periódico.' },
      { who: 'A', hanzi: '你的手表很好看！', pinyin: 'nǐ de shǒubiǎo hěn hǎokàn!', es: '¡Tu reloj es muy bonito!' },
      { who: 'B', hanzi: '谢谢！它是我妹妹的。', pinyin: 'xièxie! tā shì wǒ mèimei de.', es: '¡Gracias! Es de mi hermana pequeña.' },
    ],
  },

  /* ── S-23 El tiempo y las cifras (refuerzo) ────────────────────────── */
  {
    id: 'dlg-cifras-1',
    sector: 'm19b',
    topic: 'Compras',
    title: '¿Cuánto cuesta?',
    lines: [
      { who: 'A', hanzi: '这件衣服多少钱？', pinyin: 'zhè jiàn yīfu duōshao qián?', es: '¿Cuánto cuesta esta ropa?' },
      { who: 'B', hanzi: '两百元。', pinyin: 'liǎng bǎi yuán.', es: 'Doscientos yuanes.' },
      { who: 'A', hanzi: '太贵了！', pinyin: 'tài guì le!', es: '¡Demasiado caro!' },
      { who: 'B', hanzi: '那件一百元。', pinyin: 'nà jiàn yì bǎi yuán.', es: 'Aquella cuesta cien yuanes.' },
      { who: 'A', hanzi: '好，我买这件。苹果呢？', pinyin: 'hǎo, wǒ mǎi zhè jiàn. píngguǒ ne?', es: 'Bien, compro esta. ¿Y las manzanas?' },
      { who: 'B', hanzi: '五元一公斤。', pinyin: 'wǔ yuán yì gōngjīn.', es: 'Cinco yuanes el kilo.' },
    ],
  },
  {
    id: 'dlg-cifras-2',
    sector: 'm19b',
    topic: 'Tiempo',
    title: 'El examen de mañana',
    lines: [
      { who: 'A', hanzi: '明天我们有一次考试。', pinyin: 'míngtiān wǒmen yǒu yì cì kǎoshì.', es: 'Mañana tenemos un examen.' },
      { who: 'B', hanzi: '考试在教室吗？', pinyin: 'kǎoshì zài jiàoshì ma?', es: '¿El examen es en el aula?' },
      { who: 'A', hanzi: '是，在教室。', pinyin: 'shì, zài jiàoshì.', es: 'Sí, en el aula.' },
      { who: 'B', hanzi: '我学习了三个小时。', pinyin: 'wǒ xuéxí le sān ge xiǎoshí.', es: 'He estudiado tres horas.' },
      { who: 'A', hanzi: '今年你是第一个！', pinyin: 'jīnnián nǐ shì dì-yī ge!', es: '¡Este año eres el primero!' },
    ],
  },
  {
    id: 'dlg-cifras-3',
    sector: 'm19b',
    topic: 'Tiempo',
    title: '¿Tienes tiempo?',
    lines: [
      { who: 'A', hanzi: '你早上有时间吗？', pinyin: 'nǐ zǎoshang yǒu shíjiān ma?', es: '¿Tienes tiempo por la mañana?' },
      { who: 'B', hanzi: '没有，我早上学习。', pinyin: 'méiyǒu, wǒ zǎoshang xuéxí.', es: 'No, por la mañana estudio.' },
      { who: 'A', hanzi: '晚上呢？', pinyin: 'wǎnshang ne?', es: '¿Y por la noche?' },
      { who: 'B', hanzi: '晚上有时间。', pinyin: 'wǎnshang yǒu shíjiān.', es: 'Por la noche tengo tiempo.' },
      { who: 'A', hanzi: '去年你去北京了吗？', pinyin: 'qùnián nǐ qù Běijīng le ma?', es: '¿Fuiste a Pekín el año pasado?' },
      { who: 'B', hanzi: '去年没有去。', pinyin: 'qùnián méiyǒu qù.', es: 'El año pasado no fui.' },
    ],
  },

  /* ── S-24 Salud y bienestar (refuerzo) ─────────────────────────────── */
  {
    id: 'dlg-salud-1',
    sector: 'm19c',
    topic: 'Salud',
    title: 'En la enfermería del refugio',
    lines: [
      { who: 'A', hanzi: '你生病了吗？', pinyin: 'nǐ shēngbìng le ma?', es: '¿Te has puesto enfermo?' },
      { who: 'B', hanzi: '是，我身体不好。', pinyin: 'shì, wǒ shēntǐ bù hǎo.', es: 'Sí, no estoy bien de salud.' },
      { who: 'A', hanzi: '你吃药了吗？', pinyin: 'nǐ chī yào le ma?', es: '¿Has tomado la medicina?' },
      { who: 'B', hanzi: '吃了，我想休息。', pinyin: 'chī le, wǒ xiǎng xiūxi.', es: 'Ya la he tomado, quiero descansar.' },
      { who: 'A', hanzi: '好，你休息吧。', pinyin: 'hǎo, nǐ xiūxi ba.', es: 'Bien, descansa.' },
    ],
  },
  {
    id: 'dlg-salud-2',
    sector: 'm19c',
    topic: 'Tiempo',
    title: 'Después de la lluvia',
    lines: [
      { who: 'A', hanzi: '今天天气怎么样？', pinyin: 'jīntiān tiānqì zěnmeyàng?', es: '¿Qué tal hace hoy?' },
      { who: 'B', hanzi: '早上阴，现在晴。', pinyin: 'zǎoshang yīn, xiànzài qíng.', es: 'Por la mañana nublado, ahora despejado.' },
      { who: 'A', hanzi: '你的眼睛怎么了？', pinyin: 'nǐ de yǎnjing zěnme le?', es: '¿Qué les pasa a tus ojos?' },
      { who: 'B', hanzi: '没关系，我很累。', pinyin: 'méi guānxi, wǒ hěn lèi.', es: 'No pasa nada, estoy muy cansado.' },
      { who: 'A', hanzi: '去洗手，吃药，休息。', pinyin: 'qù xǐshǒu, chī yào, xiūxi.', es: 'Ve a lavarte las manos, toma la medicina y descansa.' },
    ],
  },
  {
    id: 'dlg-salud-3',
    sector: 'm19c',
    topic: 'Deportes',
    title: 'Nadar o no nadar',
    lines: [
      { who: 'A', hanzi: '你每天运动吗？', pinyin: 'nǐ měitiān yùndòng ma?', es: '¿Haces ejercicio todos los días?' },
      { who: 'B', hanzi: '是，我每天游泳。', pinyin: 'shì, wǒ měitiān yóuyǒng.', es: 'Sí, nado todos los días.' },
      { who: 'A', hanzi: '今天你穿新衣服。', pinyin: 'jīntiān nǐ chuān xīn yīfu.', es: 'Hoy llevas ropa nueva.' },
      { who: 'B', hanzi: '谢谢！今天很晴。', pinyin: 'xièxie! jīntiān hěn qíng.', es: '¡Gracias! Hoy está muy despejado.' },
      { who: 'A', hanzi: '下雪呢？', pinyin: 'xià xuě ne?', es: '¿Y cuando nieva?' },
      { who: 'B', hanzi: '下雪不游泳。', pinyin: 'xià xuě bù yóuyǒng.', es: 'Cuando nieva, no nado.' },
    ],
  },

  /* ── S-25 Viajes y ciudad (refuerzo) ───────────────────────────────── */
  {
    id: 'dlg-viajes-1',
    sector: 'm19d',
    topic: 'Direcciones',
    title: 'Camino al aeropuerto',
    lines: [
      { who: 'A', hanzi: '你怎么去机场？', pinyin: 'nǐ zěnme qù jīchǎng?', es: '¿Cómo vas al aeropuerto?' },
      { who: 'B', hanzi: '我坐公共汽车去。', pinyin: 'wǒ zuò gōnggòng qìchē qù.', es: 'Voy en autobús.' },
      { who: 'A', hanzi: '给我两张票。', pinyin: 'gěi wǒ liǎng zhāng piào.', es: 'Dame dos billetes.' },
      { who: 'B', hanzi: '好，两张票，二十元。', pinyin: 'hǎo, liǎng zhāng piào, èrshí yuán.', es: 'Bien, dos billetes, veinte yuanes.' },
      { who: 'A', hanzi: '谢谢！再见！', pinyin: 'xièxie! zàijiàn!', es: '¡Gracias! ¡Adiós!' },
    ],
  },
  {
    id: 'dlg-viajes-2',
    sector: 'm19d',
    topic: 'Trabajo',
    title: 'De la empresa a casa',
    lines: [
      { who: 'A', hanzi: '你从公司到家怎么走？', pinyin: 'nǐ cóng gōngsī dào jiā zěnme zǒu?', es: '¿Cómo vas de la empresa a casa?' },
      { who: 'B', hanzi: '我坐船。', pinyin: 'wǒ zuò chuán.', es: 'Voy en barco.' },
      { who: 'A', hanzi: '路远吗？', pinyin: 'lù yuǎn ma?', es: '¿Está lejos el camino?' },
      { who: 'B', hanzi: '不远。我每天上午上班。', pinyin: 'bù yuǎn. wǒ měitiān shàngwǔ shàngbān.', es: 'No muy. Todos los días por la mañana voy a trabajar.' },
      { who: 'A', hanzi: '下午呢？', pinyin: 'xiàwǔ ne?', es: '¿Y por la tarde?' },
      { who: 'B', hanzi: '下午回家。', pinyin: 'xiàwǔ huí jiā.', es: 'Por la tarde vuelvo a casa.' },
    ],
  },
  {
    id: 'dlg-viajes-3',
    sector: 'm19d',
    topic: 'Compras',
    title: 'La tienda de la esquina',
    lines: [
      { who: 'A', hanzi: '这个商店卖什么？', pinyin: 'zhè ge shāngdiàn mài shénme?', es: '¿Qué vende esta tienda?' },
      { who: 'B', hanzi: '卖衣服和报纸。', pinyin: 'mài yīfu hé bàozhǐ.', es: 'Vende ropa y periódicos.' },
      { who: 'A', hanzi: '商店在右边吗？', pinyin: 'shāngdiàn zài yòubian ma?', es: '¿La tienda está a la derecha?' },
      { who: 'B', hanzi: '不在右边，在左边。', pinyin: 'bú zài yòubian, zài zuǒbian.', es: 'No está a la derecha, está a la izquierda.' },
      { who: 'A', hanzi: '向左拐吗？', pinyin: 'xiàng zuǒ guǎi ma?', es: '¿Giro a la izquierda?' },
      { who: 'B', hanzi: '是。外面有很多出租车。', pinyin: 'shì. wàimiàn yǒu hěn duō chūzūchē.', es: 'Sí. Fuera hay muchos taxis.' },
    ],
  },

  /* ── S-26 Modales y gramática viva (refuerzo) ──────────────────────── */
  {
    id: 'dlg-modales-1',
    sector: 'm19e',
    topic: 'Fiestas',
    title: 'El club del refugio',
    lines: [
      { who: 'A', hanzi: '欢迎大家！', pinyin: 'huānyíng dàjiā!', es: '¡Bienvenidos todos!' },
      { who: 'B', hanzi: '今天我们可以唱歌吗？', pinyin: 'jīntiān wǒmen kěyǐ chàng gē ma?', es: '¿Hoy podemos cantar?' },
      { who: 'A', hanzi: '可以！你们也可以跳舞。', pinyin: 'kěyǐ! nǐmen yě kěyǐ tiào wǔ.', es: '¡Podéis! También podéis bailar.' },
      { who: 'B', hanzi: '他们可以打篮球吗？', pinyin: 'tāmen kěyǐ dǎ lánqiú ma?', es: '¿Pueden jugar al baloncesto?' },
      { who: 'A', hanzi: '可以，但是别踢桌子。', pinyin: 'kěyǐ, dànshì bié tī zhuōzi.', es: 'Pueden, pero no pateéis la mesa.' },
    ],
  },
  {
    id: 'dlg-modales-2',
    sector: 'm19e',
    topic: 'El idioma',
    title: 'El favor del traductor',
    lines: [
      { who: 'A', hanzi: '请告诉我你的名字。', pinyin: 'qǐng gàosu wǒ nǐ de míngzi.', es: 'Dime tu nombre, por favor.' },
      { who: 'B', hanzi: '我叫王明。你懂中文吗？', pinyin: 'wǒ jiào Wáng Míng. nǐ dǒng zhōngwén ma?', es: 'Me llamo Wang Ming. ¿Entiendes chino?' },
      { who: 'A', hanzi: '我懂一点儿。', pinyin: 'wǒ dǒng yìdiǎnr.', es: 'Entiendo un poquito.' },
      { who: 'B', hanzi: '好！请你回答问题。', pinyin: 'hǎo! qǐng nǐ huídá wèntí.', es: '¡Bien! Responde a la pregunta.' },
      { who: 'A', hanzi: '我可能回答错。', pinyin: 'wǒ kěnéng huídá cuò.', es: 'Puede que responda mal.' },
      { who: 'B', hanzi: '没关系！', pinyin: 'méi guānxi!', es: '¡No pasa nada!' },
    ],
  },
  {
    id: 'dlg-modales-3',
    sector: 'm19e',
    topic: 'Comida',
    title: 'En cuanto acabemos, salimos',
    lines: [
      { who: 'A', hanzi: '我们吃完饭就去，好吗？', pinyin: 'wǒmen chī wán fàn jiù qù, hǎo ma?', es: 'En cuanto acabemos de comer, vamos, ¿vale?' },
      { who: 'B', hanzi: '好！我非常想去。', pinyin: 'hǎo! wǒ fēicháng xiǎng qù.', es: '¡Bien! Tengo muchísimas ganas de ir.' },
      { who: 'A', hanzi: '你要喝水吗？', pinyin: 'nǐ yào hē shuǐ ma?', es: '¿Quieres beber agua?' },
      { who: 'B', hanzi: '不要，谢谢。', pinyin: 'bú yào, xièxie.', es: 'No quiero, gracias.' },
      { who: 'A', hanzi: '你笑什么？', pinyin: 'nǐ xiào shénme?', es: '¿De qué te ríes?' },
      { who: 'B', hanzi: '因为你笑着说话！', pinyin: 'yīnwèi nǐ xiàozhe shuōhuà!', es: '¡Porque hablas riéndote!' },
    ],
  },

  /* ── S-28 El resultado de las acciones (HSK 3) ─────────────────────── */
  {
    id: 'dlg-acciones-1',
    sector: 'm21',
    topic: 'Casa',
    title: 'La mudanza del refugio',
    lines: [
      { who: 'A', hanzi: '你搬桌子吗？', pinyin: 'nǐ bān zhuōzi ma?', es: '¿Mudas la mesa?' },
      { who: 'B', hanzi: '是，我把桌子放在房间里。', pinyin: 'shì, wǒ bǎ zhuōzi fàng zài fángjiān li.', es: 'Sí, pongo la mesa en la habitación.' },
      { who: 'A', hanzi: '我把窗户关了。', pinyin: 'wǒ bǎ chuānghu guān le.', es: 'He cerrado la ventana.' },
      { who: 'B', hanzi: '谢谢！你打扫了吗？', pinyin: 'xièxie! nǐ dǎsǎo le ma?', es: '¡Gracias! ¿Has limpiado?' },
      { who: 'A', hanzi: '打扫了。', pinyin: 'dǎsǎo le.', es: 'Limpiado.' },
    ],
  },
  {
    id: 'dlg-acciones-2',
    sector: 'm21',
    topic: 'Viajes',
    title: 'El recado del aeropuerto',
    lines: [
      { who: 'A', hanzi: '明天你有时间吗？', pinyin: 'míngtiān nǐ yǒu shíjiān ma?', es: '¿Tienes tiempo mañana?' },
      { who: 'B', hanzi: '有。什么事情？', pinyin: 'yǒu. shénme shìqing?', es: 'Sí. ¿Qué asunto?' },
      { who: 'A', hanzi: '我去机场接妈妈。', pinyin: 'wǒ qù jīchǎng jiē māma.', es: 'Voy al aeropuerto a recoger a mamá.' },
      { who: 'B', hanzi: '好！我检查了汽车以后去。', pinyin: 'hǎo! wǒ jiǎnchá le qìchē yǐhòu qù.', es: '¡Bien! Iré después de revisar el coche.' },
      { who: 'A', hanzi: '谢谢！你记得我的电话吗？', pinyin: 'xièxie! nǐ jìde wǒ de diànhuà ma?', es: '¡Gracias! ¿Recuerdas mi número?' },
      { who: 'B', hanzi: '记得。我不会忘记。', pinyin: 'jìde. wǒ bú huì wàngjì.', es: 'Lo recuerdo. No lo voy a olvidar.' },
    ],
  },
  {
    id: 'dlg-acciones-3',
    sector: 'm21',
    topic: 'Casa',
    title: 'El problema del baño',
    lines: [
      { who: 'A', hanzi: '你发现了什么？', pinyin: 'nǐ fāxiàn le shénme?', es: '¿Qué has descubierto?' },
      { who: 'B', hanzi: '我发现了一个问题。', pinyin: 'wǒ fāxiàn le yí ge wèntí.', es: 'He descubierto un problema.' },
      { who: 'A', hanzi: '我不明白。', pinyin: 'wǒ bù míngbai.', es: 'No lo entiendo.' },
      { who: 'B', hanzi: '洗手间没有水。', pinyin: 'xǐshǒujiān méiyǒu shuǐ.', es: 'No hay agua en el baño.' },
      { who: 'A', hanzi: '我知道了。谢谢！', pinyin: 'wǒ zhīdào le. xièxie!', es: 'Ya lo sé. ¡Gracias!' },
    ],
  },

  /* ── S-29 El cuerpo y las sensaciones (HSK 3) ──────────────────────── */
  {
    id: 'dlg-cuerpo-1',
    sector: 'm22',
    topic: 'Salud',
    title: 'En la enfermería, otra vez',
    lines: [
      { who: 'A', hanzi: '你怎么了？', pinyin: 'nǐ zěnme le?', es: '¿Qué te pasa?' },
      { who: 'B', hanzi: '我感冒了，还发烧。', pinyin: 'wǒ gǎnmào le, hái fāshāo.', es: 'Me he resfriado y además tengo fiebre.' },
      { who: 'A', hanzi: '你吃药了吗？', pinyin: 'nǐ chī yào le ma?', es: '¿Has tomado la medicina?' },
      { who: 'B', hanzi: '吃了，还不舒服。', pinyin: 'chī le, hái bù shūfu.', es: 'Sí, pero sigo sin estar bien.' },
      { who: 'A', hanzi: '你休息吧。喝热水。', pinyin: 'nǐ xiūxi ba. hē rè shuǐ.', es: 'Descansa. Bebe agua caliente.' },
    ],
  },
  {
    id: 'dlg-cuerpo-2',
    sector: 'm22',
    topic: 'Familia',
    title: 'Altos, bajos, gordos y flacos',
    lines: [
      { who: 'A', hanzi: '你的弟弟高吗？', pinyin: 'nǐ de dìdi gāo ma?', es: '¿Tu hermano pequeño es alto?' },
      { who: 'B', hanzi: '他不高，很矮。', pinyin: 'tā bù gāo, hěn ǎi.', es: 'No es alto, es muy bajo.' },
      { who: 'A', hanzi: '你的狗呢？', pinyin: 'nǐ de gǒu ne?', es: '¿Y tu perro?' },
      { who: 'B', hanzi: '我的狗很胖。', pinyin: 'wǒ de gǒu hěn pàng.', es: 'Mi perro está muy gordo.' },
      { who: 'A', hanzi: '哈哈！我的猫很瘦。', pinyin: 'hāhā! wǒ de māo hěn shòu.', es: '¡Jaja! Mi gato está muy flaco.' },
      { who: 'B', hanzi: '你的猫健康吗？', pinyin: 'nǐ de māo jiànkāng ma?', es: '¿Tu gato está sano?' },
    ],
  },
  {
    id: 'dlg-cuerpo-3',
    sector: 'm22',
    topic: 'Comida',
    title: 'Hambre y sed',
    lines: [
      { who: 'A', hanzi: '我饿了，你呢？', pinyin: 'wǒ è le, nǐ ne?', es: 'Tengo hambre, ¿y tú?' },
      { who: 'B', hanzi: '我不饿，我很渴。', pinyin: 'wǒ bù è, wǒ hěn kě.', es: 'No tengo hambre, tengo mucha sed.' },
      { who: 'A', hanzi: '我们去饭馆吧。', pinyin: 'wǒmen qù fànguǎn ba.', es: 'Vamos al restaurante.' },
      { who: 'B', hanzi: '好！我想吃米饭。', pinyin: 'hǎo! wǒ xiǎng chī mǐfàn.', es: '¡Bien! Quiero comer arroz.' },
      { who: 'A', hanzi: '我吃饱了。', pinyin: 'wǒ chī bǎo le.', es: 'Estoy lleno.' },
    ],
  },

  /* ── S-30 Las estaciones (HSK 3) ───────────────────────────────────── */
  {
    id: 'dlg-estaciones-1',
    sector: 'm23',
    topic: 'Tiempo',
    title: 'La estación favorita',
    lines: [
      { who: 'A', hanzi: '你最喜欢哪个季节？', pinyin: 'nǐ zuì xǐhuan nǎ ge jìjié?', es: '¿Qué estación te gusta más?' },
      { who: 'B', hanzi: '我最喜欢春天。', pinyin: 'wǒ zuì xǐhuan chūntiān.', es: 'Me gusta más la primavera.' },
      { who: 'A', hanzi: '夏天呢？', pinyin: 'xiàtiān ne?', es: '¿Y el verano?' },
      { who: 'B', hanzi: '夏天太热了。', pinyin: 'xiàtiān tài rè le.', es: 'El verano es demasiado caluroso.' },
      { who: 'A', hanzi: '冬天呢？', pinyin: 'dōngtiān ne?', es: '¿Y el invierno?' },
      { who: 'B', hanzi: '冬天很冷，但是很漂亮。', pinyin: 'dōngtiān hěn lěng, dànshì hěn piàoliang.', es: 'El invierno es frío, pero muy bonito.' },
    ],
  },
  {
    id: 'dlg-estaciones-2',
    sector: 'm23',
    topic: 'Tiempo',
    title: 'El cielo del refugio',
    lines: [
      { who: 'A', hanzi: '今天天气怎么样？', pinyin: 'jīntiān tiānqì zěnmeyàng?', es: '¿Qué tal hace hoy?' },
      { who: 'B', hanzi: '早上阴，现在很晴。', pinyin: 'zǎoshang yīn, xiànzài hěn qíng.', es: 'Por la mañana nublado, ahora muy despejado.' },
      { who: 'A', hanzi: '今天太阳很大。', pinyin: 'jīntiān tàiyang hěn dà.', es: 'Hoy el sol es muy fuerte.' },
      { who: 'B', hanzi: '晚上我们看月亮。', pinyin: 'wǎnshang wǒmen kàn yuèliang.', es: 'Por la noche miramos la luna.' },
      { who: 'A', hanzi: '云呢？', pinyin: 'yún ne?', es: '¿Y las nubes?' },
      { who: 'B', hanzi: '今天没有云。', pinyin: 'jīntiān méiyǒu yún.', es: 'Hoy no hay nubes.' },
    ],
  },
  {
    id: 'dlg-estaciones-3',
    sector: 'm23',
    topic: 'Animales',
    title: 'Los animales del refugio',
    lines: [
      { who: 'A', hanzi: '你喜欢什么动物？', pinyin: 'nǐ xǐhuan shénme dòngwù?', es: '¿Qué animales te gustan?' },
      { who: 'B', hanzi: '我最喜欢熊猫。', pinyin: 'wǒ zuì xǐhuan xióngmāo.', es: 'Me gustan más los pandas.' },
      { who: 'A', hanzi: '熊猫吃什么？', pinyin: 'xióngmāo chī shénme?', es: '¿Qué comen los pandas?' },
      { who: 'B', hanzi: '鸟在树上唱歌。', pinyin: 'niǎo zài shù shàng chàng gē.', es: 'Los pájaros cantan en el árbol.' },
      { who: 'A', hanzi: '河里有鱼！', pinyin: 'hé li yǒu yú!', es: '¡En el río hay peces!' },
    ],
  },
  {
    id: 'dlg-estaciones-4',
    sector: 'm23',
    topic: 'Fiestas',
    title: 'La gran competición',
    lines: [
      { who: 'A', hanzi: '学校明天举行比赛。', pinyin: 'xuéxiào míngtiān jǔxíng bǐsài.', es: 'La escuela organiza una competición mañana.' },
      { who: 'B', hanzi: '你参加吗？', pinyin: 'nǐ cānjiā ma?', es: '¿Participas?' },
      { who: 'A', hanzi: '参加！你呢？', pinyin: 'cānjiā! nǐ ne?', es: '¡Participo! ¿Y tú?' },
      { who: 'B', hanzi: '我不参加，我看节目。', pinyin: 'wǒ bù cānjiā, wǒ kàn jiémù.', es: 'Yo no participo, veo el programa.' },
      { who: 'A', hanzi: '这是我给你的礼物。', pinyin: 'zhè shì wǒ gěi nǐ de lǐwù.', es: 'Este es mi regalo para ti.' },
      { who: 'B', hanzi: '谢谢！祝你快乐！', pinyin: 'xièxie! zhù nǐ kuàilè!', es: '¡Gracias! ¡Que seas feliz!' },
    ],
  },

  /* ── S-31 La ciudad moderna (HSK 3) ────────────────────────────────── */
  {
    id: 'dlg-ciudad3-1',
    sector: 'm24',
    topic: 'Lugares',
    title: 'El piso nuevo',
    lines: [
      { who: 'A', hanzi: '你的家在哪里？', pinyin: 'nǐ de jiā zài nǎlǐ?', es: '¿Dónde está tu casa?' },
      { who: 'B', hanzi: '在城市里，五楼。', pinyin: 'zài chéngshì li, wǔ lóu.', es: 'En la ciudad, cuarto piso (5º chino).' },
      { who: 'A', hanzi: '有电梯吗？', pinyin: 'yǒu diàntī ma?', es: '¿Hay ascensor?' },
      { who: 'B', hanzi: '有，很方便。', pinyin: 'yǒu, hěn fāngbiàn.', es: 'Sí, muy conveniente.' },
      { who: 'A', hanzi: '学校附近有超市吗？', pinyin: 'xuéxiào fùjìn yǒu chāoshì ma?', es: '¿Hay supermercado cerca de la escuela?' },
      { who: 'B', hanzi: '有，环境很好。', pinyin: 'yǒu, huánjìng hěn hǎo.', es: 'Sí, el entorno es muy bueno.' },
    ],
  },
  {
    id: 'dlg-ciudad3-2',
    sector: 'm24',
    topic: 'Viajes',
    title: 'Preparando el viaje',
    lines: [
      { who: 'A', hanzi: '你的护照呢？', pinyin: 'nǐ de hùzhào ne?', es: '¿Y tu pasaporte?' },
      { who: 'B', hanzi: '在行李箱里。', pinyin: 'zài xínglixiāng li.', es: 'Está en la maleta.' },
      { who: 'A', hanzi: '带伞！今天下雨。', pinyin: 'dài sǎn! jīntiān xiàyǔ.', es: '¡Lleva paraguas! Hoy llueve.' },
      { who: 'B', hanzi: '好。我用地图。', pinyin: 'hǎo. wǒ yòng dìtú.', es: 'Bien. Usaré el mapa.' },
      { who: 'A', hanzi: '小心！路上很多车。', pinyin: 'xiǎoxīn! lù shang hěn duō chē.', es: '¡Cuidado! Hay muchos coches en la calle.' },
    ],
  },

  /* ── S-32 Cualidades y grados (HSK 3) ──────────────────────────────── */
  {
    id: 'dlg-cualidades-1',
    sector: 'm25',
    topic: 'Rutina',
    title: 'El informe del inspector',
    lines: [
      { who: 'A', hanzi: '你的房间干净吗？', pinyin: 'nǐ de fángjiān gānjìng ma?', es: '¿Tu habitación está limpia?' },
      { who: 'B', hanzi: '非常干净！', pinyin: 'fēicháng gānjìng!', es: '¡Limpiísima!' },
      { who: 'A', hanzi: '你的妹妹认真吗？', pinyin: 'nǐ de mèimei rènzhēn ma?', es: '¿Tu hermana pequeña es aplicada?' },
      { who: 'B', hanzi: '认真，也很聪明。', pinyin: 'rènzhēn, yě hěn cōngming.', es: 'Aplicada, y también muy lista.' },
      { who: 'A', hanzi: '中文难吗？', pinyin: 'zhōngwén nán ma?', es: '¿Es difícil el chino?' },
      { who: 'B', hanzi: '难，但是有意思。', pinyin: 'nán, dànshì yǒu yìsi.', es: 'Difícil, pero interesante.' },
    ],
  },
  {
    id: 'dlg-cualidades-2',
    sector: 'm25',
    topic: 'Rutina',
    title: 'Hablando despacio',
    lines: [
      { who: 'A', hanzi: '你说得太快了！', pinyin: 'nǐ shuō de tài kuài le!', es: '¡Hablas demasiado rápido!' },
      { who: 'B', hanzi: '对不起，我慢慢地说。', pinyin: 'duìbùqǐ, wǒ mànmàn de shuō.', es: 'Perdón, hablaré despacio.' },
      { who: 'A', hanzi: '现在很清楚，谢谢。', pinyin: 'xiànzài hěn qīngchu, xièxie.', es: 'Ahora está muy claro, gracias.' },
      { who: 'B', hanzi: '你的中文越来越好了。', pinyin: 'nǐ de zhōngwén yuèláiyuè hǎo le.', es: 'Tu chino está cada vez mejor.' },
    ],
  },

  /* ── S-33 La mente opina (HSK 3) ───────────────────────────────────── */
  {
    id: 'dlg-mente-1',
    sector: 'm26',
    topic: 'Opiniones',
    title: 'La decisión del refugio',
    lines: [
      { who: 'A', hanzi: '你同意吗？', pinyin: 'nǐ tóngyì ma?', es: '¿Estás de acuerdo?' },
      { who: 'B', hanzi: '我不同意，但我了解你。', pinyin: 'wǒ bù tóngyì, dàn wǒ liǎojiě nǐ.', es: 'No estoy de acuerdo, pero te entiendo.' },
      { who: 'A', hanzi: '为什么？', pinyin: 'wèishénme?', es: '¿Por qué?' },
      { who: 'B', hanzi: '我以为你愿意去，其实你需要休息。', pinyin: 'wǒ yǐwéi nǐ yuànyì qù, qíshí nǐ xūyào xiūxi.', es: 'Yo pensaba que querías ir; en realidad necesitas descansar.' },
      { who: 'A', hanzi: '对。别担心，我决定了。', pinyin: 'duì. bié dānxīn, wǒ juédìng le.', es: 'Cierto. No te preocupes, lo he decidido.' },
    ],
  },
  {
    id: 'dlg-mente-2',
    sector: 'm26',
    topic: 'Familia',
    title: 'El corazón del refugio',
    lines: [
      { who: 'A', hanzi: '你怎么了？', pinyin: 'nǐ zěnme le?', es: '¿Qué te pasa?' },
      { who: 'B', hanzi: '我很难过，我害怕考试。', pinyin: 'wǒ hěn nánguò, wǒ hàipà kǎoshì.', es: 'Estoy muy triste, tengo miedo del examen.' },
      { who: 'A', hanzi: '别着急！我帮助你。', pinyin: 'bié zháojí! wǒ bāngzhù nǐ.', es: '¡No te pongas nervioso! Te ayudo.' },
      { who: 'B', hanzi: '谢谢你的关心。', pinyin: 'xièxie nǐ de guānxīn.', es: 'Gracias por tu cariño.' },
      { who: 'A', hanzi: '我们都是朋友。放心！', pinyin: 'wǒmen dōu shì péngyou. fàngxīn!', es: 'Somos todos amigos. ¡Tranquilo!' },
    ],
  },

  /* ── S-34 Escuela y oficina (HSK 3) ────────────────────────────────── */
  {
    id: 'dlg-oficina-1',
    sector: 'm27',
    topic: 'Trabajo',
    title: 'La mañana del gerente',
    lines: [
      { who: 'A', hanzi: '经理，早上好！', pinyin: 'jīnglǐ, zǎoshang hǎo!', es: 'Gerente, ¡buenos días!' },
      { who: 'B', hanzi: '好。会议几点开始？', pinyin: 'hǎo. huìyì jǐ diǎn kāishǐ?', es: 'Bien. ¿A qué hora empieza la reunión?' },
      { who: 'A', hanzi: '九点，在办公室。', pinyin: 'jiǔ diǎn, zài bàngōngshì.', es: 'A las nueve, en la oficina.' },
      { who: 'B', hanzi: '我的同事到了吗？', pinyin: 'wǒ de tóngshì dào le ma?', es: '¿Ha llegado mi compañero?' },
      { who: 'A', hanzi: '到了，但是司机迟到了。', pinyin: 'dào le, dànshì sījī chídào le.', es: 'Ha llegado, pero el chófer se ha retrasado.' },
    ],
  },
  {
    id: 'dlg-oficina-2',
    sector: 'm27',
    topic: 'El idioma',
    title: 'El nivel sube',
    lines: [
      { who: 'A', hanzi: '你在复习什么？', pinyin: 'nǐ zài fùxí shénme?', es: '¿Qué estás repasando?' },
      { who: 'B', hanzi: '我在复习作业，明天有考试。', pinyin: 'wǒ zài fùxí zuòyè, míngtiān yǒu kǎoshì.', es: 'Repaso los deberes; mañana hay examen.' },
      { who: 'A', hanzi: '你的成绩怎么样？', pinyin: 'nǐ de chéngjì zěnmeyàng?', es: '¿Qué tal tus notas?' },
      { who: 'B', hanzi: '去年很差，今年提高了。', pinyin: 'qùnián hěn chà, jīnnián tígāo le.', es: 'El año pasado muy malas; este año han mejorado.' },
      { who: 'A', hanzi: '你的普通话水平很好！', pinyin: 'nǐ de pǔtōnghuà shuǐpíng hěn hǎo!', es: '¡Tu nivel de mandarín es muy bueno!' },
      { who: 'B', hanzi: '谢谢！老师教得好。', pinyin: 'xièxie! lǎoshī jiāo de hǎo.', es: '¡Gracias! El profesor enseña bien.' },
    ],
  },

  /* ── S-35 Conectores y matices (HSK 3) ─────────────────────────────── */
  {
    id: 'dlg-conectores-1',
    sector: 'm28',
    topic: 'Opiniones',
    title: 'Aunque llueva, vamos',
    lines: [
      { who: 'A', hanzi: '明天我们去爬山，好吗？', pinyin: 'míngtiān wǒmen qù pá shān, hǎo ma?', es: 'Mañana vamos a escalar la montaña, ¿vale?' },
      { who: 'B', hanzi: '如果明天下雨呢？', pinyin: 'rúguǒ míngtiān xiàyǔ ne?', es: '¿Y si mañana llueve?' },
      { who: 'A', hanzi: '虽然下雨，但是我们去。', pinyin: 'suīrán xiàyǔ, dànshì wǒmen qù.', es: 'Aunque llueva, vamos.' },
      { who: 'B', hanzi: '当然！我总是喜欢爬山。', pinyin: 'dāngrán! wǒ zǒngshì xǐhuan pá shān.', es: '¡Por supuesto! Siempre me gusta escalar.' },
    ],
  },
  {
    id: 'dlg-conectores-2',
    sector: 'm28',
    topic: 'Rutina',
    title: 'El plan del fin de semana',
    lines: [
      { who: 'A', hanzi: '你最近怎么样？', pinyin: 'nǐ zuìjìn zěnmeyàng?', es: '¿Qué tal últimamente?' },
      { who: 'B', hanzi: '我很忙，但是终于完成了。', pinyin: 'wǒ hěn máng, dànshì zhōngyú wánchéng le.', es: 'Estoy muy ocupado, pero por fin he terminado.' },
      { who: 'A', hanzi: '太好了！我们去饭馆吃饭。', pinyin: 'tài hǎo le! wǒmen qù fànguǎn chī fàn.', es: '¡Qué bien! Vamos al restaurante a comer.' },
      { who: 'B', hanzi: '好！我马上来。', pinyin: 'hǎo! wǒ mǎshàng lái.', es: '¡Bien! Voy ahora mismo.' },
      { who: 'A', hanzi: '其实，你应该经常休息。', pinyin: 'qíshí, nǐ yīnggāi jīngcháng xiūxi.', es: 'La verdad es que deberías descansar a menudo.' },
    ],
  },

  /* ── S-36 Números grandes y el vestidor (HSK 3) ────────────────────── */
  {
    id: 'dlg-vestidor-1',
    sector: 'm29',
    topic: 'Compras',
    title: 'La ropa nueva',
    lines: [
      { who: 'A', hanzi: '你想买什么？', pinyin: 'nǐ xiǎng mǎi shénme?', es: '¿Qué quieres comprar?' },
      { who: 'B', hanzi: '我想买一条蓝裙子。', pinyin: 'wǒ xiǎng mǎi yì tiáo lán qúnzi.', es: 'Quiero comprar una falda azul.' },
      { who: 'A', hanzi: '这条绿裙子也很漂亮。', pinyin: 'zhè tiáo lǜ qúnzi yě hěn piàoliang.', es: 'Esta falda verde también es muy bonita.' },
      { who: 'B', hanzi: '裙子和衬衫一共多少钱？', pinyin: 'qúnzi hé chènshān yígòng duōshao qián?', es: '¿Cuánto cuestan en total la falda y la camisa?' },
      { who: 'A', hanzi: '一共一百五十元。', pinyin: 'yígòng yìbǎi wǔshí yuán.', es: 'Ciento cincuenta yuanes en total.' },
    ],
  },
  {
    id: 'dlg-vestidor-2',
    sector: 'm29',
    topic: 'Familia',
    title: 'Cambiándose para la fiesta',
    lines: [
      { who: 'A', hanzi: '快一点儿！朋友马上到了。', pinyin: 'kuài yìdiǎnr! péngyou mǎshàng dào le.', es: '¡Date prisa! Los amigos llegan ya.' },
      { who: 'B', hanzi: '等一会儿，我换鞋。', pinyin: 'děng yíhuìr, wǒ huàn xié.', es: 'Espera un momento, me cambio los zapatos.' },
      { who: 'A', hanzi: '你的黄帽子呢？', pinyin: 'nǐ de huáng màozi ne?', es: '¿Y tu gorra amarilla?' },
      { who: 'B', hanzi: '在这里。我今天穿蓝衬衫。', pinyin: 'zài zhèlǐ. wǒ jīntiān chuān lán chènshān.', es: 'Aquí. Hoy llevo camisa azul.' },
      { who: 'A', hanzi: '一定很好看！', pinyin: 'yídìng hěn hǎokàn!', es: '¡Seguro que queda muy bien!' },
    ],
  },

  /* ── S-37 La mesa y la familia extendida (HSK 3) ───────────────────── */
  {
    id: 'dlg-mesa3-1',
    sector: 'm30',
    topic: 'Restaurante',
    title: 'La carta del refugio',
    lines: [
      { who: 'A', hanzi: '服务员，菜单呢？', pinyin: 'fúwùyuán, càidān ne?', es: 'Camarero, ¿y la carta?' },
      { who: 'B', hanzi: '在这里。你们想吃什么？', pinyin: 'zài zhèlǐ. nǐmen xiǎng chī shénme?', es: 'Aquí. ¿Qué queréis comer?' },
      { who: 'A', hanzi: '我要面条和面包。', pinyin: 'wǒ yào miàntiáo hé miànbāo.', es: 'Quiero fideos y pan.' },
      { who: 'B', hanzi: '我要米饭和葡萄。', pinyin: 'wǒ yào mǐfàn hé pútao.', es: 'Yo arroz y uvas.' },
      { who: 'A', hanzi: '请给我们盘子和筷子。', pinyin: 'qǐng gěi wǒmen pánzi hé kuàizi.', es: 'Tráiganos platos y palillos, por favor.' },
    ],
  },
  {
    id: 'dlg-mesa3-2',
    sector: 'm30',
    topic: 'Familia',
    title: 'Presentando a los abuelos',
    lines: [
      { who: 'A', hanzi: '这是我的爷爷和奶奶。', pinyin: 'zhè shì wǒ de yéye hé nǎinai.', es: 'Estos son mi abuelo y mi abuela.' },
      { who: 'B', hanzi: '爷爷好！奶奶好！', pinyin: 'yéye hǎo! nǎinai hǎo!', es: '¡Hola abuelo! ¡Hola abuela!' },
      { who: 'A', hanzi: '爷爷今年八十岁了，还很年轻。', pinyin: 'yéye jīnnián bāshí suì le, hái hěn niánqīng.', es: 'El abuelo cumple ochenta años y todavía está joven.' },
      { who: 'B', hanzi: '你们的爱好是什么？', pinyin: 'nǐmen de àihào shì shénme?', es: '¿Cuál es vuestra afición?' },
      { who: 'A', hanzi: '爷爷喜欢讲故事。', pinyin: 'yéye xǐhuan jiǎng gùshi.', es: 'Al abuelo le gusta contar historias.' },
    ],
  },

  /* ── S-38 Las ideas abstractas (HSK 3) ─────────────────────────────── */
  {
    id: 'dlg-abstractas-1',
    sector: 'm31',
    topic: 'Opiniones',
    title: 'El porqué de todo',
    lines: [
      { who: 'A', hanzi: '你为什么学习中文？', pinyin: 'nǐ wèishénme xuéxí zhōngwén?', es: '¿Por qué estudias chino?' },
      { who: 'B', hanzi: '因为我喜欢中国文化。', pinyin: 'yīnwèi wǒ xǐhuan Zhōngguó wénhuà.', es: 'Porque me gusta la cultura china.' },
      { who: 'A', hanzi: '中文难吗？', pinyin: 'zhōngwén nán ma?', es: '¿Es difícil el chino?' },
      { who: 'B', hanzi: '难，但是很重要。', pinyin: 'nán, dànshì hěn zhòngyào.', es: 'Difícil, pero muy importante.' },
      { who: 'A', hanzi: '对！这是一个好机会。', pinyin: 'duì! zhè shì yí ge hǎo jīhuì.', es: '¡Cierto! Es una buena oportunidad.' },
    ],
  },
  {
    id: 'dlg-abstractas-2',
    sector: 'm31',
    topic: 'Rutina',
    title: 'El cambio del refugio',
    lines: [
      { who: 'A', hanzi: '这个城市变化很大。', pinyin: 'zhè ge chéngshì biànhuà hěn dà.', es: 'Esta ciudad ha cambiado mucho.' },
      { who: 'B', hanzi: '对。很多年轻人离开去北京。', pinyin: 'duì. hěn duō niánqīng rén líkāi qù Běijīng.', es: 'Sí. Muchos jóvenes se van a Pekín.' },
      { who: 'A', hanzi: '他们为什么离开？', pinyin: 'tāmen wèishénme líkāi?', es: '¿Por qué se van?' },
      { who: 'B', hanzi: '为了工作，为了机会。', pinyin: 'wèile gōngzuò, wèile jīhuì.', es: 'Por el trabajo, por las oportunidades.' },
      { who: 'A', hanzi: '我喜欢这里。我不想离开。', pinyin: 'wǒ xǐhuan zhèlǐ. wǒ bù xiǎng líkāi.', es: 'A mí me gusta aquí. No me quiero ir.' },
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
