/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 37 · HSK 3 — LA MESA Y LA FAMILIA EXTENDIDA (módulo 10/11)

   El sector de los banquetes: lo que se pone en la mesa (zumos, pan,
   fideos, palillos y cuencos) y la familia que se sienta alrededor
   (abuelos, tíos, el fin de semana para verse y las bodas). Los apuntes
   explican el MECANISMO, con contrastes bien/mal: los verbos recíprocos
   (见面, 结婚) no admiten objeto directo — la compañía se presenta con 跟.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m30: VaultModule = {
  id: 'm30',
  hsk: 3,
  code: 'S-37',
  title: 'La mesa y la familia extendida',
  subtitle: 'De la fruta al pastel: comer bien y presentar a los tuyos',
  entries: [
    e('w-guo-zhi', '果汁', 'guǒzhī', 'zumo, jugo', '🧃'),
    e('w-pi-jiu', '啤酒', 'píjiǔ', 'cerveza', '🍺'),
    e('w-pu-tao', '葡萄', 'pútao', 'uvas', '🍇', 'tao neutra: pútao'),
    e('w-xiang-jiao', '香蕉', 'xiāngjiāo', 'plátano', '🍌'),
    e('w-mian-bao', '面包', 'miànbāo', 'pan', '🍞'),
    e('w-mian-tiao', '面条', 'miàntiáo', 'fideos', '🍜', 'tiao neutra: miàntiáo'),
    e('w-tang2', '糖', 'táng', 'caramelo, azúcar', '🍬'),
    e('w-pan-zi', '盘子', 'pánzi', 'plato (llano)', '🍽️'),
    e('w-wan3', '碗', 'wǎn', 'cuenco, tazón', '🥣'),
    e('w-kuai-zi', '筷子', 'kuàizi', 'palillos', '🥢'),
    e('w-cai-dan', '菜单', 'càidān', 'la carta, menú', '📜'),
    e('w-ke-ren', '客人', 'kèrén', 'invitado, cliente', '🛎️'),
    e('w-nai-nai', '奶奶', 'nǎinai', 'abuela (paterna)', '👵'),
    e('w-ye-ye', '爷爷', 'yéye', 'abuelo (paterno)', '👴'),
    e('w-shu-shu', '叔叔', 'shūshu', 'tío (hermano menor del padre)', '🧔'),
    e('w-nian-qing', '年轻', 'niánqīng', 'joven', '🌱'),
    e('w-jian-mian', '见面', 'jiànmiàn', 'verse, encontrarse', '🤝', '跟…见面: A跟B见面'),
    e('w-jie-hun', '结婚', 'jiéhūn', 'casarse', '💍'),
    e('w-xi-guan', '习惯', 'xíguàn', 'costumbre; acostumbrarse', '🔁'),
    e('w-zhou-mo', '周末', 'zhōumò', 'fin de semana', '🗓️'),
    e('w-a-yi', '阿姨', 'āyí', 'tía; señora (cortés)', '👩', 'la "tía" universal china'),
    e('w-ai-hao', '爱好', 'àihào', 'afición, hobby', '🎨'),
  ],
  lessons: [
    lesson(
      'm30-l1',
      'La mesa puesta',
      'vocab',
      [
        ...drill('w-guo-zhi'),
        ...drill('w-pi-jiu'),
        ...drill('w-pu-tao'),
        ...drill('w-xiang-jiao'),
        ...drill('w-mian-bao'),
        ...drill('w-mian-tiao'),
        ...drill('w-tang2'),
        noteStep('n-can-zhuo'),
        build('我想喝果汁。', 'wǒ xiǎng hē guǒzhī.', 'Quiero beber zumo.'),
        build('面包很好吃。', 'miànbāo hěn hǎochī.', 'El pan está muy rico. (好吃 hǎochī = "rico", del S-15)'),
      ],
      [
        grammar('n-can-zhuo', 'La mesa puesta: líquidos, trigo y el dulce', [
          'El sector abre con el paquete de BEBER: 果汁 (guǒzhī, el zumo: 果 "fruta" + 汁 "jugo") y 啤酒 (píjiǔ, la cerveza). Los líquidos chinos se beben con 喝 (S-06), nunca con 吃: ✗吃啤酒 · ✓喝啤酒. Y como todo lo que se bebe, se cuenta en VASOS: 一杯果汁, 一杯啤酒 — el 杯 del 杯子 (S-18) presta su clasificador a cada ronda del refugio.',
          'La pareja del trigo comparte raíz: 面包 (miànbāo, el pan) y 面条 (miàntiáo, los fideos) salen del mismo 面 — la harina de trigo. Ojo con la segunda sílaba de los fideos: tiao va en TONO NEUTRO, miàntiáo. La regla ya la conoces de péngyou y bàozi: la sílaba que se apoya en la anterior pierde la marca.',
          'La fruta del banquete: 葡萄 (pútao, las uvas — tao también NEUTRA) y 香蕉 (xiāngjiāo, el plátano). Y el remate dulce: 糖 (táng), el caramelo Y el azúcar — el combustible de emergencia de todo morador que explora demasiado lejos. La frase de supervivencia de la mesa: 很好吃 ("¡qué rico!", S-15) — el elogio estándar antes de repetir ración.',
          'Contraste de bolsillo: 想喝 es QUERER BEBER (el deseo, S-06); 喝了 con 了 (S-13) certifica que el vaso ya está vacío. 我想喝果汁 = "quiero beber zumo" (aún lo tengo delante); 我喝了一杯啤酒 = "me he bebido una cerveza" (misión cumplida).',
          'Tip del Overseer: en la mesa china se bebe con 喝, se come con 吃 y se elogia con 很好吃. Tres sellos y el banquete está registrado. El que pide más con el vaso lleno, no ha entendido el protocolo.',
        ], [
          ['我想喝果汁。', 'wǒ xiǎng hē guǒzhī.', 'Quiero beber zumo.'],
          ['我喝了一杯啤酒。', 'wǒ hē le yì bēi píjiǔ.', 'Me he bebido una cerveza. (杯 bēi = clasificador de vasos)'],
          ['我喜欢吃香蕉。', 'wǒ xǐhuan chī xiāngjiāo.', 'Me gusta comer plátanos.'],
        ]),
      ],
    ),
    lesson(
      'm30-l2',
      'Palillos y cuencos',
      'grammar',
      [
        ...drill('w-pan-zi'),
        ...drill('w-wan3'),
        ...drill('w-kuai-zi'),
        ...drill('w-cai-dan'),
        ...drill('w-ke-ren'),
        noteStep('n-kuai-zi'),
        build('服务员，菜单呢？', 'fúwùyuán, càidān ne?', 'Camarero, ¿y la carta?'),
        build('请给客人筷子。', 'qǐng gěi kèrén kuàizi.', 'Dale palillos al invitado, por favor.'),
      ],
      [
        grammar('n-kuai-zi', 'La vajilla: 筷子, 碗, 盘子 y la llegada del 客人', [
          'El utensilio más chino del planeta: 筷子 (kuàizi), los palillos. Van SIEMPRE en pareja, y por eso su clasificador es el de las cosas que van de dos: 一双筷子 (yì shuāng kuàizi — 双 shuāng = "par"). Nunca ✗一个筷子: un palillo solo no pincha nada, morador.',
          'El 碗 (wǎn) es el cuenco — el trono del arroz. 一碗米饭 (yì wǎn mǐfàn) = "un cuenco de arroz": el mismo carácter es cuenco Y clasificador de cuencos, igual que 杯 hacía con los vasos. Su vecino de alacena: 盘子 (pánzi), el plato LLANO donde va lo que se corta y se comparte (zi NEUTRA, como siempre en la vajilla). ¿Cuenco o plato? El arroz y la sopa viven en 碗; el pescado y las verduras, en 盘子.',
          'La 菜单 (càidān) es la carta: 菜 (S-06, el plato) + 单 (la lista). Y su frase de invocación es puro curso: 服务员，菜单呢？— "camarero, ¿y la carta?" El 呢 (S-01) devuelve la pregunta ("¿y…?"), el 服务员 (S-16) es el camarero. El chino no pide la carta: pregunta dónde estaba.',
          'Y llega el 客人 (kèrén): el invitado, el cliente — el de fuera que se sienta a TU mesa. La cortesía del refugio se activa con 欢迎 (S-26) y con la atención a los utensilios: 请给客人筷子 — "dale palillos al invitado" (给 de S-18: primero la persona, después la cosa). Al invitado se le sirve antes de que pida.',
          'Tip del Overseer: clasifica la mesa como el almacén del refugio — 一杯 (vasos), 一碗 (cuencos), 一双 (pares) y 盘子 para lo llano. El inventario bien contado es la mitad del banquete; la otra mitad es el 很好吃 del invitado.',
        ], [
          ['服务员，菜单呢？', 'fúwùyuán, càidān ne?', 'Camarero, ¿y la carta?'],
          ['请给客人筷子。', 'qǐng gěi kèrén kuàizi.', 'Dale palillos al invitado, por favor.'],
          ['我吃了一碗米饭。', 'wǒ chī le yì wǎn mǐfàn.', 'Me he comido un cuenco de arroz.'],
        ]),
      ],
    ),
    lesson(
      'm30-l3',
      'Los abuelos',
      'vocab',
      [
        ...drill('w-nai-nai'),
        ...drill('w-ye-ye'),
        ...drill('w-shu-shu'),
        ...drill('w-a-yi'),
        ...drill('w-nian-qing'),
        noteStep('n-zu-fu'),
        build('我爷爷很年轻。', 'wǒ yéye hěn niánqīng.', 'Mi abuelo es muy joven.'),
        build('奶奶在家做饭。', 'nǎinai zài jiā zuò fàn.', 'La abuela cocina en casa. (做饭 = "cocinar", literalmente "hacer la comida")'),
      ],
      [
        grammar('n-zu-fu', 'La familia extendida: abuelos, tíos y la 阿姨 universal', [
          'El clan se ensancha. 奶奶 (nǎinai) y 爷爷 (yéye) son la abuela y el abuelo PATERNOS — mamá y papá del padre. Es el default del chino: cuando un niño dice 奶奶 sin más, habla de la madre de su papá. Los abuelos maternos tienen su propia pareja (外婆 wàipó / 外公 wàigōng, con el 外 de "afuera") — el chino filia por banda. Ojo: segundas sílabas NEUTRAS en las tres palabras del sector.',
          '叔叔 (shūshu) es el tío: en concreto, el hermano MENOR del padre. La familia china nombra cada rama con precisión de genealogista — hermano mayor o menor del padre o de la madre, cada uno con su palabra. Y su espejo cortés: 阿姨 (āyí), la "tía" universal — cualquier mujer adulta amable: la vecina, la señora del mercado, la madre de tu amigo. Llamar 阿姨 es regalar una sonrisa sin comprometer parentesco.',
          'El adjetivo del sector: 年轻 (niánqīng, joven). Su contraste natural es 老 (lǎo, viejo — el 老 de 老师, S-01): 我爷爷很年轻 · 我爷爷老了 ("mi abuelo se ha hecho mayor" — con 了, S-13, porque envejecer es un CAMBIO de estado, no una etiqueta). Y el molde de siempre: S + 很 + ADJ (S-09), sin ser ni estar: ✗我爷爷是很年轻 · ✓我爷爷很年轻.',
          'La escena más tierna del refugio: 奶奶在家做饭 — "la abuela cocina en casa". 做 (S-08) + 饭 (el 饭 de 米饭 y 吃饭, S-13): "hacer la comida". En casa de los abuelos chinos nadie sale con hambre; el amor se mide en cuencos.',
          'Tip del Overseer: si dudas con una mujer adulta, 阿姨 nunca falla; si dudas con un hombre adulto, 叔叔 es el eco cortés. Y a tus abuelos paternos, ni se te ocurra llamarlos por otro nombre: ellos llevan la llave del refugio.',
        ], [
          ['我爷爷很年轻。', 'wǒ yéye hěn niánqīng.', 'Mi abuelo es muy joven.'],
          ['奶奶在家做饭。', 'nǎinai zài jiā zuò fàn.', 'La abuela cocina en casa.'],
          ['我叔叔在北京。', 'wǒ shūshu zài Běijīng.', 'Mi tío está en Pekín.'],
        ]),
      ],
    ),
    lesson(
      'm30-l4',
      'Casarse y verse',
      'vocab',
      [
        ...drill('w-jian-mian'),
        ...drill('w-jie-hun'),
        ...drill('w-xi-guan'),
        ...drill('w-zhou-mo'),
        ...drill('w-ai-hao'),
        noteStep('n-jian-mian'),
        build('我们星期六见面。', 'wǒmen xīngqīliù jiànmiàn.', 'Nos vemos el sábado.'),
        build('哥哥要结婚了。', 'gēge yào jiéhūn le.', 'Mi hermano mayor se va a casar.'),
      ],
      [
        grammar('n-jian-mian', 'Los verbos recíprocos: 见面 y 结婚', [
          '见面 (jiànmiàn) es literalmente "verse las caras": 见 ver + 面 cara. Es un verbo RECÍPROCO — dos personas participan a la vez, como en un apretón de manos. Y eso tiene una consecuencia de gramática: NO admite objeto directo. ✗我见面你 — suena a "le veo la cara a él" de muy mal humor · ✓我们见面 = "nos vemos". Para decir CON QUIÉN, el chino usa la preposición 跟 (gēn) DELANTE del verbo: A跟B见面 ("A se ve con B"). 跟 llega en el próximo sector; hoy basta con el cuándo: 我们星期六见面.',
          '结婚 (jiéhūn, casarse) funciona igual: también es recíproco (hacen falta dos), también rechaza el objeto directo y también presenta a la pareja con 跟: 跟…结婚 = "casarse con…". El anuncio de boda del sector usa el futuro inminente que ya dominas (要…了, S-26): 哥哥要结婚了 = "mi hermano mayor se va a casar" — el 要 mira hacia adelante y el 了 certifica que el cambio ya está en marcha.',
          '习惯 (xíguàn) vive dos vidas: SUSTANTIVO ("la costumbre": 这是一个好习惯, "es una buena costumbre") y VERBO ("acostumbrarse"). En su vida verbal brilla con el 了 del cambio (S-13): 我习惯了 = "ya me he acostumbrado" — al principio costaba, y ahora el refugio ya es casa.',
          'Y las dos palabras de la agenda: 周末 (zhōumò, el fin de semana — 周 "semana" + 末 "el extremo", donde la semana se acaba) y 爱好 (àihào, la afición, el hobby). El molde de presentación personal: 我的爱好是… — 我的爱好是看电影 = "mi afición es ver películas" (电影, S-08). La pregunta de sobremesa más habitual de China, tras ¿has comido?',
          'Tip del Overseer: 见面 y 结婚 son bailes a dos — nadie va detrás del verbo. Si necesitas nombrar a la pareja, espera al 跟 del S-38; por hoy, sella la cita con el día: 我们星期六见面. El sábado, a la hora exacta: los refugios no esperan.',
        ], [
          ['我们星期六见面。', 'wǒmen xīngqīliù jiànmiàn.', 'Nos vemos el sábado.'],
          ['哥哥要结婚了。', 'gēge yào jiéhūn le.', 'Mi hermano mayor se va a casar.'],
          ['这个周末你做什么？', 'zhège zhōumò nǐ zuò shénme?', '¿Qué haces este fin de semana?'],
        ]),
      ],
    ),
    lesson(
      'm30-l5',
      'Auditoría del Sector 37',
      'review',
      [
        match('w-guo-zhi', 'w-kuai-zi', 'w-nai-nai', 'w-ai-hao'),
        match('w-pu-tao', 'w-xiang-jiao', 'w-ye-ye', 'w-zhou-mo'),
        { type: 'listen', entry: 'w-pi-jiu' },
        { type: 'listen', entry: 'w-mian-bao' },
        dictate('w-mian-tiao'),
        dictate('w-jie-hun'),
        typeP('w-zhou-mo'),
        build('我想喝果汁。', 'wǒ xiǎng hē guǒzhī.', 'Quiero beber zumo.'),
        build('我们星期六见面。', 'wǒmen xīngqīliù jiànmiàn.', 'Nos vemos el sábado.'),
        ...practice('w-xi-guan'),
        ...practice('w-a-yi'),
      ],
    ),
  ],
}
