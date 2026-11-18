/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 7 · HSK 1 — TIEMPO (módulo 7/10)

   Hoy, mañana y ayer en el calendario del refugio: 年/月/日 para las
   fechas (de grande a pequeño) y 点/半/分钟 para no llegar tarde.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, introLite, lesson, match, noteStep, practice, typeP } from '../builders'

export const m7: VaultModule = {
  id: 'm7',
  hsk: 1,
  code: 'S-07',
  title: 'Tiempo',
  subtitle: 'Hoy, mañana, fechas y horas del refugio',
  entries: [
    // (去, 学校, 喝, 茶, 我, 是, 两, 三, 十, 二… viven en otros sectores: aquí solo se referencian)
    e('w-jin-tian', '今天', 'jīntiān', 'hoy', '📅'),
    e('w-ming-tian', '明天', 'míngtiān', 'mañana (el día siguiente)', '➡️'),
    e('w-zuo-tian', '昨天', 'zuótiān', 'ayer', '⬅️'),
    e('w-xian-zai', '现在', 'xiànzài', 'ahora', '⏰'),
    e('w-shi-hou', '时候', 'shíhou', 'momento, rato', '⌛', 'la segunda sílaba va sin tono'),
    e('w-xing-qi', '星期', 'xīngqī', 'semana', '📆', '星期一 lunes … 星期日 domingo'),
    e('w-nian2', '年', 'nián', 'año', '🎆'),
    e('w-yue4', '月', 'yuè', 'mes', '🌙'),
    e('w-ri4', '日', 'rì', 'día (de fecha)', '☀️'),
    e('w-shang-wu', '上午', 'shàngwǔ', 'mañana (franja horaria)', '🌅'),
    e('w-xia-wu', '下午', 'xiàwǔ', 'tarde (franja horaria)', '🌇'),
    e('w-fen-zhong', '分钟', 'fēnzhōng', 'minuto', '⏱️'),
    e('w-dian3', '点', 'diǎn', 'y en punto (hora)', '🕐'),
    e('w-ban4', '半', 'bàn', 'media, mitad', '½'),
  ],
  lessons: [
    lesson(
      'm7-l1',
      'Días que importan',
      'vocab',
      [
        ...drill('w-jin-tian'),
        ...drill('w-ming-tian'),
        ...drill('w-zuo-tian'),
        ...drill('w-xian-zai'),
        ...introLite('w-shang-wu'),
        noteStep('n-shijian'),
        build('我今天去学校。', 'wǒ jīntiān qù xuéxiào.', 'Hoy voy a la escuela.'),
        build('现在是上午。', 'xiànzài shì shàngwǔ.', 'Ahora es por la mañana.'),
      ],
      [
        grammar('n-shijian', 'Las palabras de tiempo van delante', [
          'Las palabras de tiempo (今天, 明天, 昨天, 现在…) van ANTES del verbo o al principio de la frase. El chino dice "hoy voy a la escuela" (我今天去学校); el español dice "voy hoy". Mismo mensaje, otro orden.',
          'Cambia la palabra y cambia el día: 明天我去学校 = "mañana voy", 昨天他去商店 = "ayer fue a la tienda". El verbo no cambia de forma NUNCA: el tiempo lo marca la palabra, no el verbo.',
          '现在 (xiànzài) = "ahora", y también abre la frase: 现在是上午 = "ahora es por la mañana". El reloj del refugio ya está en marcha; quedan las fechas del calendario.',
        ], [
          ['我今天去学校。', 'wǒ jīntiān qù xuéxiào.', 'Hoy voy a la escuela.'],
          ['昨天他去商店。', 'zuótiān tā qù shāngdiàn.', 'Ayer fue a la tienda.'],
          ['我现在喝茶。', 'wǒ xiànzài hē chá.', 'Ahora tomo té.'],
        ]),
      ],
    ),
    lesson(
      'm7-l2',
      'El calendario del refugio',
      'grammar',
      [
        ...drill('w-xing-qi'),
        ...drill('w-nian2'),
        ...drill('w-yue4'),
        ...drill('w-ri4'),
        noteStep('n-fecha'),
        build('今天是星期六。', 'jīntiān shì xīngqīliù.', 'Hoy es sábado.'),
        build('今天是十一月。', 'jīntiān shì shíyī yuè.', 'Estamos en noviembre.'),
      ],
      [
        grammar('n-fecha', 'Las fechas: de grande a pequeño', [
          'Las fechas chinas van al revés que las españolas: primero el AÑO, luego el MES, luego el DÍA. 二〇二六年十一月十九日 = "19 de noviembre de 2026". De lo grande a lo pequeño, como una ficha del inventario: sector, estantería, caja.',
          'Los días de la semana se numeran con 星期: 星期一 lunes, 星期二 martes, 星期三 miércoles, 星期四 jueves, 星期五 viernes, 星期六 sábado. El domingo rompe la serie: 星期日 (o 星期天) domingo.',
          'No hace falta decirla entera: 今天是十一月 = "estamos en noviembre". La fecha se recorta por donde haga falta, pero el orden grande → pequeño nunca cambia.',
        ], [
          ['二〇二六年十一月十九日', 'èr líng èr liù nián shíyī yuè shíjiǔ rì', '19 de noviembre de 2026'],
          ['今天是星期六。', 'jīntiān shì xīngqīliù.', 'Hoy es sábado.'],
          ['今天是十一月十九日。', 'jīntiān shì shíyī yuè shíjiǔ rì.', 'Hoy es 19 de noviembre.'],
        ]),
      ],
    ),
    lesson(
      'm7-l3',
      'Horario del refugio',
      'vocab',
      [
        ...drill('w-dian3'),
        ...drill('w-ban4'),
        ...drill('w-fen-zhong'),
        ...practice('w-shang-wu'),
        ...drill('w-xia-wu'),
        ...drill('w-shi-hou'),
        noteStep('n-hora'),
        build('现在两点半。', 'xiànzài liǎng diǎn bàn.', 'Son las dos y media.'),
        build('我上午喝茶。', 'wǒ shàngwǔ hē chá.', 'Por la mañana tomo té.'),
      ],
      [
        grammar('n-hora', 'La hora: 点, 半 y 分钟', [
          'La hora se dice NÚMERO + 点 (diǎn): 三点 = "las tres en punto". El número delante y la hora detrás, sin "son las" ni relleno.',
          '半 (bàn) = "media": 两点半 = "las dos y media". Ojo, explorador: para la hora el "dos" es 两 (liǎng), nunca 二 — el reloj prefiere 两, como al contar cosas.',
          'Los minutos van al final con 分钟 (fēnzhōng): 两点二十分钟 = "las dos y veinte". La hora primero, los minutos detrás, siempre.',
          'Y las franjas del día: 上午 (shàngwǔ) es la mañana y 下午 (xiàwǔ) la tarde. Van delante, como toda palabra de tiempo: 我上午喝茶 = "por la mañana tomo té".',
        ], [
          ['现在三点。', 'xiànzài sān diǎn.', 'Son las tres.'],
          ['现在两点半。', 'xiànzài liǎng diǎn bàn.', 'Son las dos y media.'],
          ['现在两点二十分钟。', 'xiànzài liǎng diǎn èrshí fēnzhōng.', 'Son las dos y veinte.'],
          ['我上午喝茶。', 'wǒ shàngwǔ hē chá.', 'Por la mañana tomo té.'],
        ]),
      ],
    ),
    lesson(
      'm7-l4',
      'Auditoría del Sector 7',
      'review',
      [
        match('w-jin-tian', 'w-ming-tian', 'w-zuo-tian', 'w-xian-zai'),
        match('w-nian2', 'w-yue4', 'w-ri4', 'w-xing-qi'),
        { type: 'listen', entry: 'w-dian3' },
        { type: 'listen', entry: 'w-ban4' },
        dictate('w-jin-tian'),
        dictate('w-xing-qi'),
        typeP('w-shi-hou'),
        build('我今天去学校。', 'wǒ jīntiān qù xuéxiào.', 'Hoy voy a la escuela.'),
        build('现在两点半。', 'xiànzài liǎng diǎn bàn.', 'Son las dos y media.'),
      ],
    ),
  ],
}
