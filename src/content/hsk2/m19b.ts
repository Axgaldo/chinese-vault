/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 23 · HSK 2 — EL TIEMPO Y LAS CIFRAS (módulo 11/15)

   El registro del Overseer: el día por franjas (早上/晚上), las dos clases
   de tiempo (时间 y 小时), las cuentas grandes (百/千/元), el kilo del
   mercado (公斤), los clasificadores (张/件) y las veces del calendario
   (第一, 次, 已经).
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m19b: VaultModule = {
  id: 'm19b',
  hsk: 2,
  code: 'S-23',
  title: 'El tiempo y las cifras',
  subtitle: 'Las horas del día, los ordinales y la medida',
  entries: [
    e('w-zao-shang', '早上', 'zǎoshang', 'por la mañana (franja)', '🌅'),
    e('w-wan-shang', '晚上', 'wǎnshang', 'por la noche', '🌙'),
    e('w-qu-nian', '去年', 'qùnián', 'el año pasado', '⏮️'),
    e('w-shi-jian', '时间', 'shíjiān', 'tiempo; hora', '⏰'),
    e('w-xiao-shi2', '小时', 'xiǎoshí', 'hora (60 minutos)', '🕐'),
    e('w-yi-jing', '已经', 'yǐjīng', 'ya', '✅'),
    e('w-di-yi', '第一', 'dì-yī', 'primero (ordinal)', '🥇', '第 + número = ordinal'),
    e('w-ci4', '次', 'cì', 'vez (veces)', '🔁'),
    e('w-bai3', '百', 'bǎi', 'cien (100)', '💯'),
    e('w-qian1', '千', 'qiān', 'mil (1000)', '🔢'),
    e('w-yuan2', '元', 'yuán', 'yuan (unidad de dinero)', '💴'),
    e('w-gong-jin', '公斤', 'gōngjīn', 'kilo', '⚖️'),
    e('w-zhang1', '张', 'zhāng', 'clasificador: mesas, papeles, billetes', '📄'),
    e('w-jian4', '件', 'jiàn', 'clasificador: ropa, asuntos, regalos', '👔'),
    e('w-kao-shi', '考试', 'kǎoshì', 'examen', '📝'),
    e('w-jiao-shi', '教室', 'jiàoshì', 'aula', '🏫'),
  ],
  lessons: [
    lesson(
      'm19b-l1',
      'El día completo',
      'vocab',
      [
        ...drill('w-zao-shang'),
        ...drill('w-wan-shang'),
        ...drill('w-shi-jian'),
        ...drill('w-xiao-shi2'),
        ...drill('w-qu-nian'),
        noteStep('n-yitian'),
        build('早上我喝牛奶。', 'zǎoshang wǒ hē niúnǎi.', 'Por la mañana tomo leche.'),
        build('晚上我看报纸。', 'wǎnshang wǒ kàn bàozhǐ.', 'Por la noche leo el periódico.'),
      ],
      [
        grammar('n-yitian', 'El día completo: franjas, calendario y las dos clases de tiempo', [
          'El turno del refugio se escribe por franjas. Ya dominabas 上午 y 下午 (S-07) y el 中午 (S-11) que las cose: ahora los extremos. 早上 (zǎoshang) = la mañana temprana, la franja que abre el día — despertarse, primer té del yermo. 晚上 (wǎnshang) = la noche, la franja que lo apaga. La segunda sílaba de ambas va en tono NEUTRO: ya nadie la subraya.',
          'Y el calendario tiene su propio "ayer": 去年 (qùnián) = el año pasado, el hermano anual de 昨天. La misma familia lógica: lo que ya pasó se marca con irse (去), como el día que se fue.',
          'La pareja trampa del sector: 时间 y 小时. 时间 (shíjiān) es el tiempo ABSTRACTO, el que se tiene o no se tiene: 你有时间吗？ = "¿tienes tiempo (libre)?". 小时 (xiǎoshí) es la hora de RELOJ, la unidad de 60 minutos que se cuenta con clasificador: 我学习了一个小时 = "he estudiado una hora". El español las llama igual; el chino las archiva en fichas distintas.',
          'Recuerda la regla de oro del S-20: las palabras de tiempo viajan DELANTE del verbo, pegadas al sujeto. 早上我喝牛奶 — primero la franja del turno, luego la faena. El horario se anuncia antes de trabajarlo.',
          'Tip del Overseer: ¿el "tiempo" de la agenda o la "hora" del reloj? Si se TIENE o se PIERDE, es 时间; si se CUENTA (una, dos, tres), es 小时.',
        ], [
          ['早上我喝牛奶。', 'zǎoshang wǒ hē niúnǎi.', 'Por la mañana tomo leche.'],
          ['晚上我看报纸。', 'wǎnshang wǒ kàn bàozhǐ.', 'Por la noche leo el periódico.'],
          ['你有时间吗？', 'nǐ yǒu shíjiān ma?', '¿Tienes tiempo (libre)?'],
          ['我学习了一个小时。', 'wǒ xuéxí le yí ge xiǎoshí.', 'He estudiado una hora.'],
        ]),
      ],
    ),
    lesson(
      'm19b-l2',
      'Cuentas grandes',
      'vocab',
      [
        ...drill('w-bai3'),
        ...drill('w-qian1'),
        ...drill('w-yuan2'),
        ...drill('w-gong-jin'),
        ...drill('w-zhang1'),
        ...drill('w-jian4'),
        noteStep('n-bai-qian'),
        build('这件衣服三百元。', 'zhè jiàn yīfu sānbǎi yuán.', 'Esta ropa cuesta trescientos yuanes.'),
        build('我想买一件衣服。', 'wǒ xiǎng mǎi yí jiàn yīfu.', 'Quiero comprar una prenda de ropa.'),
      ],
      [
        grammar('n-bai-qian', 'Cuentas grandes: apilar cientos y miles', [
          'Los números grandes del chino se apilan por MULTIPLICACIÓN, no se recitan dígito a dígito como en español. 二百五十 (èr bǎi wǔshí) = 2×100 + 5×10 = 250: primero el multiplicador, luego el paquete. 三千 (sān qiān) = 3×1000 = 3000. Es contar como el terminal de la cantina: bloques enteros de chapas, nunca chapas sueltas.',
          'Los precios cuelgan de 元 (yuán), la unidad oficial: 这件衣服三百元 = "esta ropa cuesta trescientos yuanes". En la calle manda su apodo: 块 (kuài, S-18) — 三百块 dice lo mismo, pero con acento de morador y sin papeleo.',
          'El peso se mide en 公斤 (gōngjīn) = kilo. Y aquí vuelve una regla vieja del S-03: para CONTAR, dos es 两 (liǎng), nunca 二: 两公斤 = "dos kilos". 妈妈买了两公斤米饭 — y el 了 del final (S-13) sella la compra como hecha.',
          'Los clasificadores de vestir y de planchar: 件 (jiàn) viste la ropa, los asuntos y los regalos — 一件衣服 = "una prenda". 张 (zhāng) plancha lo plano: mesas, papeles, billetes — 一张桌子 = "una mesa". El molde del S-03 (número + clasificador + nombre) sigue en pie: solo cambia de uniforme.',
          'Tip del Overseer: precio en 元 (o 块 si hablas de morador a morador), peso en 公斤 con 两, y la ropa se cuenta por 件. Con esas tres fichas compras en todo el yermo sin abrir el traductor.',
        ], [
          ['这件衣服三百元。', 'zhè jiàn yīfu sānbǎi yuán.', 'Esta ropa cuesta trescientos yuanes.'],
          ['我想买一件衣服。', 'wǒ xiǎng mǎi yí jiàn yīfu.', 'Quiero comprar una prenda de ropa.'],
          ['妈妈买了两公斤米饭。', 'mǎma mǎi le liǎng gōngjīn mǐfàn.', 'Mamá ha comprado dos kilos de arroz.'],
          ['这个手机一千元。', 'zhè ge shǒujī yì qiān yuán.', 'Este móvil cuesta mil yuanes.'],
        ]),
      ],
    ),
    lesson(
      'm19b-l3',
      'El examen',
      'vocab',
      [
        ...drill('w-di-yi'),
        ...drill('w-ci4'),
        ...drill('w-yi-jing'),
        ...drill('w-kao-shi'),
        ...drill('w-jiao-shi'),
        noteStep('n-di-xu'),
        build('明天我们有一次考试。', 'míngtiān wǒmen yǒu yí cì kǎoshì.', 'Mañana tenemos un examen.'),
        build('我已经在教室了。', 'wǒ yǐjīng zài jiàoshì le.', 'Ya estoy en el aula.'),
      ],
      [
        grammar('n-di-xu', '第 y 次: podios, repeticiones y el "ya" del sector', [
          '第 (dì) es el sello que convierte cualquier número en ORDINAL: 第一 = primero, 第二 = segundo. Pégalo delante de lo que corre la carrera: 第一天 = "el primer día", 第一次 = "la primera vez". El chino no dice "primer": dice "el UNO sellado", con diploma.',
          '次 (cì) cuenta EVENTOS: veces, ocasiones, repeticiones. 一次考试 = "un examen" — literalmente "una VEZ de examen". 明天我们有一次考试 = "mañana tenemos un examen": lo que OCURRE se mide en veces; lo que se apila, con los clasificadores de siempre.',
          'La fórmula del estreno: 这是我第一次来 = "es mi primera vez (aquí)". 第一次 entra como bloque entero — "la primera vez" — y la frase huele a inauguración. Guárdala para estrenar sitios, platos y refugios.',
          'Y el adverbio que firma el sector: 已经 (yǐjīng) = "ya". Se coloca delante del verbo y suele cerrar la frase con 了 (S-13): 我已经在教室了 = "ya estoy en el aula". El 已经 anuncia que el hecho está más que cumplido; el 了 sella el cambio. Juntos son el parte de misión: dato cumplido ANTES de lo previsto.',
          'Tip del Overseer: 第 convierte números en podios (第一, 第二…); 次 cuenta cuántas veces has pisado el podio. Y si algo ya ocurrió, 已经…了 lo firma por ti.',
        ], [
          ['明天我们有一次考试。', 'míngtiān wǒmen yǒu yí cì kǎoshì.', 'Mañana tenemos un examen.'],
          ['我已经在教室了。', 'wǒ yǐjīng zài jiàoshì le.', 'Ya estoy en el aula.'],
          ['这是我第一次来。', 'zhè shì wǒ dì-yī cì lái.', 'Es mi primera vez aquí.'],
        ]),
      ],
    ),
    lesson(
      'm19b-l4',
      'Auditoría del Sector 23',
      'review',
      [
        match('w-zao-shang', 'w-wan-shang', 'w-qu-nian', 'w-shi-jian', 'w-xiao-shi2'),
        match('w-di-yi', 'w-ci4', 'w-yi-jing', 'w-kao-shi', 'w-jiao-shi'),
        { type: 'listen', entry: 'w-zhang1' },
        { type: 'listen', entry: 'w-jian4' },
        dictate('w-shi-jian'),
        dictate('w-gong-jin'),
        typeP('w-yi-jing'),
        build('这件衣服三百元。', 'zhè jiàn yīfu sānbǎi yuán.', 'Esta ropa cuesta trescientos yuanes.'),
        build('我已经在教室了。', 'wǒ yǐjīng zài jiàoshì le.', 'Ya estoy en el aula.'),
        ...practice('w-bai3'),
        ...practice('w-qian1'),
      ],
    ),
  ],
}
