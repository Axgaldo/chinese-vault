/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 13 · HSK 2 — MESA DEL COMEDOR (módulo 3/10)

   Comida ampliada con el mecanismo estrella del sector: el chino COMPOSICIONA
   significados (牛+肉, 鸡+蛋, 蛋+糕). Las tres comidas del día actúan como
   adverbios desnudos y 甜/酸 opinan por el molde SUJETO + 很 + ADJETIVO
   que ya traes del Sector 9.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m13: VaultModule = {
  id: 'm13',
  hsk: 2,
  code: 'S-13',
  title: 'Mesa del Comedor',
  subtitle: 'Comida ampliada: del huevo a la tarta, y el sabor de todo',
  entries: [
    e('w-ji-dan', '鸡蛋', 'jīdàn', 'huevo', '🥚', 'jī = gallina · dàn = huevo'),
    e('w-dan-gao', '蛋糕', 'dàngāo', 'tarta, pastel', '🎂', 'dàn = huevo · gāo = pastel'),
    e('w-niu-rou', '牛肉', 'niúròu', 'carne de vaca', '🥩', 'niú = vaca · ròu = carne'),
    e('w-yang-rou', '羊肉', 'yángròu', 'carne de cordero', '🍢', 'yáng = cordero · ròu = carne'),
    e('w-shu-cai', '蔬菜', 'shūcài', 'verduras', '🥦'),
    e('w-tang1', '汤', 'tāng', 'sopa', '🍲'),
    e('w-zao-fan', '早饭', 'zǎofàn', 'desayuno', '🌅', 'zǎo = mañana · fàn = comida'),
    e('w-zhong-fan', '午饭', 'wǔfàn', 'almuerzo', '☀️', 'wǔ = mediodía · fàn = comida'),
    e('w-wan-fan', '晚饭', 'wǎnfàn', 'cena', '🌙', 'wǎn = tarde-noche · fàn = comida'),
    e('w-wei-dao', '味道', 'wèidao', 'sabor', '👅', 'la segunda sílaba va sin tono'),
    e('w-tian2', '甜', 'tián', 'dulce', '🍬'),
    e('w-suan1', '酸', 'suān', 'ácido', '🍋'),
  ],
  lessons: [
    lesson(
      'm13-l1',
      'Del huevo a la tarta',
      'vocab',
      [
        ...drill('w-ji-dan'),
        ...drill('w-dan-gao'),
        ...drill('w-shu-cai'),
        ...drill('w-tang1'),
        ...drill('w-niu-rou'),
        ...drill('w-yang-rou'),
        noteStep('n-rou'),
        build('我早饭吃鸡蛋。', 'wǒ zǎofàn chī jīdàn.', 'Desayuno huevos.'),
        build('今天晚饭有羊肉。', 'jīntiān wǎnfàn yǒu yángròu.', 'Hoy hay cordero para cenar.'),
      ],
      [
        grammar('n-rou', '牛 + 肉: la carne se compone por bloques', [
          'El chino no tiene una palabra distinta para cada carne: tiene LADRILLOS. 牛 (niú, vaca) + 肉 (ròu, carne) = 牛肉, "carne de vaca". 羊 (yáng, cordero) + 肉 = 羊肉. 鸡 (jī, gallina) + 肉 = 鸡肉 (jīròu, "pollo"). El animal entra, la carne sale: apilar es cocinar.',
          'A) EL MECANISMO YA TE SUENA: 电话 era "electricidad + habla" (teléfono). 图书馆 era "imágenes + libros + edificio" (biblioteca). El chino piensa por LEGO: cada carácter aporta su pieza y la palabra nueva se entiende ANTES de mirar la traducción. Los bloques no son casualidad: son el motor del idioma.',
          'B) EL CONTRASTE CON EL ESPAÑOL: en "ternera" no ves al animal por ningún lado; en 牛肉, siempre asoma. La palabra española hay que memorizarla; la china se deduce. Por eso aprender un bloque (肉) te regala todas sus combinaciones futuras: 牛肉, 羊肉, 鸡肉... un solo peaje, carretera entera.',
          'C) 蛋 ES OTRO BLOQUE ESTRELLA: 鸡蛋 es "huevo de gallina" (jī + dàn) y 蛋糕 es "pastel de huevo" (dàn + gāo: los primeros bizcochos chinos se hacían a base de huevo). Un carácter, dos palabras de tu sector: el sistema te paga por cada pieza que aprendes.',
          'Tip del Overseer: ante una palabra nueva de dos caracteres, ADIVÍNALA por bloques antes de mirar la traducción. Es el truco número uno para leer chino sin diccionario: acertar sube el ánimo y fallar te enseña la pieza que te falta.',
        ], [
          ['我不吃羊肉。', 'wǒ bù chī yángròu.', 'No como carne de cordero.'],
          ['牛肉很好吃。', 'niúròu hěn hǎochī.', 'La carne de vaca está muy buena.'],
          ['鸡肉和牛肉，我喜欢牛肉。', 'jīròu hé niúròu, wǒ xǐhuan niúròu.', 'Pollo o vaca: prefiero la carne de vaca.'],
        ]),
      ],
    ),
    lesson(
      'm13-l2',
      'Las tres comidas',
      'grammar',
      [
        ...drill('w-zao-fan'),
        ...drill('w-zhong-fan'),
        ...drill('w-wan-fan'),
        noteStep('n-zaozhongwan'),
        build('早饭我吃鸡蛋。', 'zǎofàn wǒ chī jīdàn.', 'Para desayunar, como huevos.'),
        build('午饭以后，我工作。', 'wǔfàn yǐhòu, wǒ gōngzuò.', 'Después de almorzar, trabajo.'),
      ],
      [
        grammar('n-zaozhongwan', 'Las tres comidas: el tiempo entra desnudo', [
          '早饭, 午饭 y 晚饭 son los tres turnos del comedor del refugio: 早 (zǎo, la mañana), 午 (wǔ, el mediodía) y 晚 (wǎn, la tarde-noche), cada uno rematado con 饭 (fàn, la comida). Cambia la hora, no el molde: las tres son "la comida de X".',
          'A) LA PALABRA DE TIEMPO VA DESNUDA: 早饭 puede entrar en la frase SIN preposición y convertirse en adorno: 早饭我吃鸡蛋 (zǎofàn wǒ chī jīdàn) = "para desayunar, yo como huevos". También vale pegada al sujeto: 我早饭吃鸡蛋. El inglés necesita chapa: "FOR breakfast". El chino, no: la palabra de tiempo se coloca y ya manda.',
          'B) LA POSICIÓN PREFERIDA: el chino ordena la frase de lo conocido a lo nuevo: el tiempo (más viejo que la noticia) abre o se pega al sujeto, el verbo remata. ✗吃鸡蛋我早饭 no existe: el tiempo no se cuelga al final como un abrigo suelto.',
          'C) 饭 NO ES SOLO "ARROZ": 饭 nació significando "arroz cocido" y de ahí pasó a "comida" en general. Por eso 吃饭 (chīfàn, del Sector 11) es "comer" a secas, y 早饭 es "la comida de la mañana". El arroz es tan central en el refugio que acabó nombrando el acto entero de comer.',
          'D) EL MOLDE SE REPITE CON 以后: como cualquier palabra de tiempo, las comidas enganchan con 以后 (yǐhòu): 午饭以后，我工作 = "después de almorzar, trabajo". Ancla + etiqueta temporal, sin preposición: el mecanismo del Sector 11 aplicado a tu estómago.',
          'Tip del Overseer: planifica el día como el supervisor del comedor: primero anuncia el TURNO (早饭 / 午饭 / 晚饭), luego quién hace qué. El chino siempre paga con tiempo y cobra con noticias.',
        ], [
          ['早饭我吃鸡蛋。', 'zǎofàn wǒ chī jīdàn.', 'Para desayunar, como huevos.'],
          ['我午饭吃蔬菜。', 'wǒ wǔfàn chī shūcài.', 'Como verduras en el almuerzo.'],
          ['晚饭以后，我学习。', 'wǎnfàn yǐhòu, wǒ xuéxí.', 'Después de cenar, estudio.'],
        ]),
      ],
    ),
    lesson(
      'm13-l3',
      'El sabor de las cosas',
      'vocab',
      [
        ...drill('w-wei-dao'),
        ...drill('w-tian2'),
        ...drill('w-suan1'),
        ...practice('w-ji-dan'),
        ...practice('w-tang1'),
        noteStep('n-wei'),
        build('这个蛋糕很甜。', 'zhè ge dàngāo hěn tián.', 'Esta tarta está muy dulce.'),
        build('我觉得汤有点儿酸。', 'wǒ juéde tāng yǒudiǎnr suān.', 'La sopa está un poco ácida, me parece.'),
      ],
      [
        grammar('n-wei', '甜 y 酸: el sabor opina por el molde del Sector 9', [
          'Para hablar del sabor no necesitas gramática nueva: necesitas el molde que ya traes — SUJETO + 很 + ADJETIVO, con el adjetivo haciendo de verbo ("el adjetivo ES el verbo", Sector 9). 这个蛋糕很甜 = "esta tarta está muy dulce". Sin ser, sin estar: el adjetivo plantado como una antena.',
          'A) EL ERROR NÚMERO UNO: meter 是. El español grita "ESTÁ dulce" y las manos escriben 是. Pero 是 solo une dos NOMBRES (A es B: 我是学生). Con un adjetivo, la frase queda rota: ✗这个蛋糕是甜 / ✓这个蛋糕很甜. Y el 很 no es decoración: un adjetivo pelado al final suena a comparación ("dulce... ¿respecto a qué?"), así que 很 va pegado por costumbre.',
          'B) 味道 ES EL PARAGUAS: 味道 (wèidao) es "el sabor" como concepto: 汤的味道很好 = "el sabor de la sopa es buenísimo" — literalmente "la sopa su-sabor es bueno", el mismo 的 posesivo de siempre. Pregunta por él y el cocinero del refugio responde con un adjetivo: 甜 (dulce), 酸 (ácido) o la palabra mágica 很好 ("rico").',
          'C) Y SI ES OPINIÓN, SE DECLARA: 觉得 (juéde, "me parece") marca que la frase es TU lectura del mundo: 我觉得汤有点儿酸 = "la sopa está un pelín ácida... para mí". 有点儿 (yǒudiǎnr, "un pelín") llega a fondo en el Sector 15; quédate con que la sopa ácida sale con cara de sospecha. El sabor es del plato; el juicio es tuyo.',
          'Tip del Overseer: para elogiar comida en cualquier refugio de China: 味道很好 ("qué sabor más bueno"). Dos palabras, cero gramática y amistad instantánea con el cocinero.',
        ], [
          ['这个蛋糕很甜。', 'zhè ge dàngāo hěn tián.', 'Esta tarta está muy dulce.'],
          ['我觉得汤有点儿酸。', 'wǒ juéde tāng yǒudiǎnr suān.', 'La sopa está un pelín ácida, me parece.'],
          ['汤的味道很好。', 'tāng de wèidao hěn hǎo.', 'La sopa tiene muy buen sabor.'],
        ]),
      ],
    ),
    lesson(
      'm13-l4',
      'Auditoría del Sector 13',
      'review',
      [
        match('w-ji-dan', 'w-dan-gao', 'w-niu-rou', 'w-yang-rou'),
        match('w-shu-cai', 'w-tang1', 'w-zao-fan', 'w-wan-fan'),
        { type: 'listen', entry: 'w-tian2' },
        { type: 'listen', entry: 'w-wei-dao' },
        dictate('w-dan-gao'),
        dictate('w-shu-cai'),
        typeP('w-wei-dao'),
        build('我早饭吃鸡蛋。', 'wǒ zǎofàn chī jīdàn.', 'Desayuno huevos.'),
        build('这个蛋糕很甜。', 'zhè ge dàngāo hěn tián.', 'Esta tarta está muy dulce.'),
        ...practice('w-zhong-fan'),
      ],
    ),
  ],
}
