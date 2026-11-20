/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 31 · HSK 3 — LA CIUDAD MODERNA (módulo 4/10)

   Del mapa al rascacielos: el vocabulario para moverse por la gran ciudad
   (mapa, metro, plantas, bancos, hoteles) y el kit del viajero de la
   superficie. Los apuntes explican el MECANISMO, con contrastes bien/mal:
   el sistema de plantas chino (la trampa del menos uno), 附近 pegado al
   lugar que modifica y el zoom 地方 → 城市 → 国家 → 世界.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m24: VaultModule = {
  id: 'm24',
  hsk: 3,
  code: 'S-31',
  title: 'La ciudad moderna',
  subtitle: 'Del mapa al rascacielos: moverse por la gran ciudad',
  entries: [
    e('w-cheng-shi', '城市', 'chéngshì', 'ciudad', '🏙️'),
    e('w-di-fang', '地方', 'dìfang', 'lugar, sitio', '📍', 'la segunda sílaba va sin tono'),
    e('w-di-tie', '地铁', 'dìtiě', 'metro', '🚇', 'dì = tierra · tiě = hierro'),
    e('w-di-tu', '地图', 'dìtú', 'mapa', '🗺️', 'dì = tierra · tú = mapa'),
    e('w-chao-shi', '超市', 'chāoshì', 'supermercado', '🛒'),
    e('w-bin-guan', '宾馆', 'bīnguǎn', 'hotel', '🏨'),
    e('w-yin-hang', '银行', 'yínháng', 'banco', '🏦'),
    e('w-dian-ti', '电梯', 'diàntī', 'ascensor', '🛗', 'diàn = eléctrico · tī = escalera'),
    e('w-lou2', '楼', 'lóu', 'edificio; piso', '🏢', '一层 = planta baja'),
    e('w-ceng2', '层', 'céng', 'planta, piso (nivel)', '🪜'),
    e('w-fu-jin', '附近', 'fùjìn', 'cerca, por la zona', '📌'),
    e('w-jie-dao', '街道', 'jiēdào', 'calle, callejero', '🛣️'),
    e('w-huan-jing', '环境', 'huánjìng', 'entorno, ambiente', '🌏'),
    e('w-guo-jia', '国家', 'guójiā', 'país', '🏳️'),
    e('w-shi-jie', '世界', 'shìjiè', 'mundo', '🌐'),
    e('w-bei-fang', '北方', 'běifāng', 'el norte (región)', '🧭', 'el 北 de 北京 + 方 = dirección'),
    e('w-nan2-south', '南', 'nán', 'sur, el sur', '🧭'),
    e('w-chu-fang', '厨房', 'chúfáng', 'cocina (habitación)', '🍳'),
    e('w-bing-xiang', '冰箱', 'bīngxiāng', 'nevera, frigorífico', '🧊', 'bīng = hielo · xiāng = caja'),
    e('w-kong-tiao', '空调', 'kōngtiáo', 'aire acondicionado', '❄️', 'kōng = aire · tiáo = regular'),
    e('w-deng1', '灯', 'dēng', 'lámpara, luz', '💡'),
    e('w-san3', '伞', 'sǎn', 'paraguas', '☂️'),
    e('w-hu-zhao', '护照', 'hùzhào', 'pasaporte', '🛂'),
    e('w-zhao-xiang-ji', '照相机', 'zhàoxiàngjī', 'cámara de fotos', '📷', 'zhào = fotografiar · xiàng = aspecto · jī = máquina'),
    e('w-xing-li-xiang', '行李箱', 'xínglixiāng', 'maleta', '🧳', 'xíngli = equipaje · xiāng = caja'),
    e('w-xiao-xin', '小心', 'xiǎoxīn', 'cuidado, tener cuidado', '⚠️', 'literal: "corazón pequeño"'),
    e('w-jiao3-corner', '角', 'jiǎo', 'esquina; 10 céntimos', '📐'),
  ],
  lessons: [
    lesson(
      'm24-l1',
      'La gran ciudad',
      'vocab',
      [
        ...drill('w-cheng-shi'),
        ...drill('w-di-fang'),
        ...drill('w-di-tu'),
        ...drill('w-guo-jia'),
        ...drill('w-shi-jie'),
        ...drill('w-bei-fang'),
        ...drill('w-nan2-south'),
        noteStep('n-cheng-shi'),
        build('这个城市很漂亮。', 'zhège chéngshì hěn piàoliang.', 'Esta ciudad es muy bonita.'),
        build('北京是一个大城市。', 'Běijīng shì yí ge dà chéngshì.', 'Pekín es una ciudad grande.'),
      ],
      [
        grammar('n-cheng-shi', '城市 y 地方: de la urbe al sitio', [
          'Dos palabras que el español aplasta en una. 城市 (chéngshì) es la URBE entera: el sistema de calles, edificios y metros — Pekín es una 城市, tu esquina no. 地方 (dìfang) es un LUGAR cualquiera, un "sitio": puede ser un parque, un banco o el hueco bajo las escaleras. La ciudad contiene lugares; el lugar no contiene ciudades.',
          'El zoom del sector tiene cuatro pisos: 地方 (un sitio) → 城市 (la urbe) → 国家 (guójiā, el país) → 世界 (shìjiè, el mundo). Cada palabra es un nivel de mapa más alto. Y el mapa mismo es 地图 (dìtú): fíjate en el 地 que abre 地图, 地铁 y 地方 — donde el chino quiere decir SUELO o TERRENO, clava ese carácter.',
          'Las palabras-región completan el plano: 北方 (běifāng) es el norte como ZONA — el 北 de 北京 ("capital del norte") + 方 ("dirección"). Su espejo es 南 (nán), el sur: con 方 se arma 南方, la región del sur. 北京在北方 = "Pekín está en el norte". Brújula de dos caracteres, morador.',
          'Contraste de bolsillo: 这个地方很好 = "este sitio es muy bueno" — el molde de siempre, S + 很 + ADJ (S-09), sin ser ni estar. ✗这个城市是很漂亮 · ✓这个城市很漂亮: los adjetivos chinos no viajan con 是.',
          'Tip del Overseer: ¿hablas del monstruo de asfalto entero o de un punto concreto? Lo primero es 城市, lo segundo 地方. Y si dominas el zoom completo — 地方, 城市, 国家, 世界 — tienes el registro del refugio a vista de águila.',
        ], [
          ['这个地方很好。', 'zhège dìfang hěn hǎo.', 'Este sitio es muy bueno.'],
          ['北京在北方。', 'Běijīng zài běifāng.', 'Pekín está en el norte (región).'],
          ['我想看世界。', 'wǒ xiǎng kàn shìjiè.', 'Quiero ver el mundo.'],
        ]),
      ],
    ),
    lesson(
      'm24-l2',
      'Transporte urbano',
      'grammar',
      [
        ...drill('w-di-tie'),
        ...drill('w-lou2'),
        ...drill('w-ceng2'),
        ...drill('w-dian-ti'),
        ...drill('w-jiao3-corner'),
        ...drill('w-chao-shi'),
        noteStep('n-fang-xiang'),
        build('我家在五楼。', 'wǒ jiā zài wǔ lóu.', 'Mi casa está en el cuarto piso (5º piso chino).'),
        build('我坐地铁去超市。', 'wǒ zuò dìtiě qù chāoshì.', 'Voy al supermercado en metro.'),
        build('我在街角等你。', 'wǒ zài jiējiǎo děng nǐ.', 'Te espero en la esquina. (街角 jiējiǎo = esquina de la calle · 等 děng = esperar)'),
      ],
      [
        grammar('n-fang-xiang', '楼 y 层: el sistema de plantas (la trampa del menos uno)', [
          'La trampa clásica del viajero: en China la planta baja SE CUENTA. El suelo es 一层 ("planta uno"), y lo que el español llama primer piso — el que está justo encima de la baja — es el 二楼 chino. Regla de conversión para moradores: piso chino = piso español + 1. 我家在五楼 = "mi casa está en el cuarto piso"… contado a la china, la cinco. Un despiste de un número y acabas llamando a la puerta equivocada.',
          'Las dos fichas del sistema: 楼 (lóu) es el EDIFICIO entero y también cada piso con su número (五楼, 十楼); 层 (céng) es la PLANTA como nivel, la palabra técnica que ves junto a los botones del 电梯 (diàntī, el ascensor: literalmente "escalera eléctrica"). En un hotel chino te preguntan por tu piso con 几楼 — la cifra que respondas va pegada a 楼, sin clasificador.',
          'Para moverse entre plantas, el complemento direccional de S-20 se viste de ciudad: 上楼 = subir (andando o en ascensor), 下楼 = bajar. El mismo 上/下 que montaba buses ahora escala edificios. Y en la calle, las venas de la urbe: el 地铁 (dìtiě, "tren de tierra"). El molde de transporte urbano — 坐 ("sentarse en") + vehículo — te lleva a todas partes: 我坐地铁去超市 = "voy al supermercado en metro".',
          'El sector guarda una ficha camaleona: 角 (jiǎo). Es la ESQUINA — la de la calle es 街角 (jiējiǎo), "esquina del callejero" — y también moneda pequeña: 一角 = diez céntimos, la décima parte de un 块 (el yuan). ¿Esquina o céntimo? El contexto manda, como siempre en la superficie. La cita más fácil del mundo: 我在街角等你 — "te espero en la esquina" (等 děng = esperar).',
          'Tip del Overseer: cuando un chino te diga una planta, réstale uno si piensas en español. Y para quedar con alguien, ninguna coordenada es tan a prueba de bombas como la esquina: 楼 puede confundir; 街角 nunca.',
        ], [
          ['我家在五楼。', 'wǒ jiā zài wǔ lóu.', 'Mi casa está en el cuarto piso (5º piso chino).'],
          ['我坐地铁去超市。', 'wǒ zuò dìtiě qù chāoshì.', 'Voy al supermercado en metro.'],
          ['请等电梯。', 'qǐng děng diàntī.', 'Espera al ascensor, por favor. (等 děng = esperar)'],
        ]),
      ],
    ),
    lesson(
      'm24-l3',
      'Cerca y dentro de casa',
      'vocab',
      [
        ...drill('w-fu-jin'),
        ...drill('w-jie-dao'),
        ...drill('w-huan-jing'),
        ...drill('w-chu-fang'),
        ...drill('w-bing-xiang'),
        ...drill('w-kong-tiao'),
        ...drill('w-deng1'),
        noteStep('n-fu-jin'),
        build('学校附近有超市。', 'xuéxiào fùjìn yǒu chāoshì.', 'Cerca de la escuela hay un supermercado.'),
        build('厨房里有冰箱。', 'chúfáng li yǒu bīngxiāng.', 'En la cocina hay nevera.'),
      ],
      [
        grammar('n-fu-jin', '附近: la cercanía va DETRÁS', [
          'El español dice "cerca DE la escuela" — preposición delante. El chino clava la cercanía a la espalda del lugar: 学校附近 = "escuela-cerca" = cerca de la escuela. Es el mismo disfraz de poseedor que ya viste con 学校的旁边 (S-14): primero el escenario, después la posición pegada. Con 附近 ni siquiera hace falta 的. Y ojo: si inviertes el orden, 附近的学校 ya no es "cerca de la escuela" — es "la escuela que está cerca", una cosa con dueño, no un lugar donde buscar.',
          'El molde existencial de S-05 dibuja la X en el mapa: 学校附近有超市 = "cerca de la escuela hay un supermercado". Primero el escenario completo (学校附近), después 有 y lo que hay en él. El chino siempre despliega el mapa antes de marcar el tesoro.',
          'El callejero recibe nombre propio: 街道 (jiēdào, la calle, el callejero). Y la palabra grande del sector es 环境 (huánjìng): el ENTORNO — el aire, el ruido, lo que rodea y se respira. Con ella llegan los abstractos del HSK 3: ya no solo cosas que se tocan, sino conceptos que se miden. 这里的环境很好 = "el entorno de aquí es muy bueno".',
          'Y el entorno también se mira hacia dentro de casa: la 厨房 (chúfáng, la cocina-habitación), el 冰箱 (bīngxiāng, la nevera — "caja de hielo"), el 空调 (kōngtiáo, el aire acondicionado — "aire regulado") y la 灯 (dēng, la lámpara). El 在…里 de S-14 ordena el inventario: 厨房里有冰箱. Para manejar la casa: 开 kāi = encender — 请开灯 (enciende la luz), 请开空调 (enciende el aire).',
          'Tip del Overseer: cuando describas una zona, piensa en capas — la calle (街道), lo que hay cerca (附近 + 有) y cómo se respira (环境). Tres capas y cualquier barrio queda registrado.',
        ], [
          ['学校附近有超市。', 'xuéxiào fùjìn yǒu chāoshì.', 'Cerca de la escuela hay un supermercado.'],
          ['厨房里有冰箱。', 'chúfáng li yǒu bīngxiāng.', 'En la cocina hay nevera.'],
          ['请开空调。', 'qǐng kāi kōngtiáo.', 'Enciende el aire acondicionado, por favor. (开 kāi = encender)'],
        ]),
      ],
    ),
    lesson(
      'm24-l4',
      'El equipaje',
      'vocab',
      [
        ...drill('w-hu-zhao'),
        ...drill('w-xing-li-xiang'),
        ...drill('w-zhao-xiang-ji'),
        ...drill('w-bin-guan'),
        ...drill('w-yin-hang'),
        ...drill('w-san3'),
        ...drill('w-xiao-xin'),
        noteStep('n-lv-xing'),
        build('带伞！今天下雨。', 'dài sǎn! jīntiān xiàyǔ.', '¡Lleva paraguas! Hoy llueve.'),
        build('你的护照在行李箱里。', 'nǐ de hùzhào zài xínglixiāng li.', 'Tu pasaporte está en la maleta.'),
      ],
      [
        grammar('n-lv-xing', 'El kit del viajero: 护照, 行李箱 y 照相机', [
          'Todo morador que sale de expedición lleva el trío de superficie: 护照 (hùzhào, el pasaporte — "documento de protección", lo que cruza las fronteras del país), 行李箱 (xínglixiāng, la maleta: 行李 "equipaje" + 箱 "caja") y 照相机 (zhàoxiàngjī, la cámara — 照 "iluminar" + 相 "aspecto" + 机 "máquina": la máquina que caza apariencias).',
          'El trío se completa con los dos establecimientos del viajero: el 宾馆 (bīnguǎn, el hotel donde el pasaporte vuelve a salir) y el 银行 (yínháng, el banco donde se cambia el botín en chapas… o en yuanes). Cinco fichas y el mundo entero se vuelve transitable.',
          'La alarma del sector: 小心 (xiǎoxīn) — literalmente "corazón pequeño". Tu corazón se hace pequeño y mira por dónde pisas: 小心！ a secas ya es "¡cuidado!". Es el grito estándar justo antes de que algo caiga, salpique o arda.',
          'Y la despedida maternal de toda China: 带伞！ (dài sǎn!) = "¡lleva paraguas!". 带 (S-18) es llevar algo ENCIMA, sin clasificador ni florituras: 带 + cosa y a correr. Bajo la lluvia, con el paraguas ya desplegado, se dice 打伞 ("abrir el paraguas"). La lluvia en sí la conoces del S-11: 下雨.',
          'Tip del Overseer: antes de cerrar la 行李箱, el registro recomienda una comprobación: 护照, 照相机… ¿y el 伞? Ninguna misión se perdió por llevar paraguas. Varias, por no llevarlo.',
        ], [
          ['带伞！今天下雨。', 'dài sǎn! jīntiān xiàyǔ.', '¡Lleva paraguas! Hoy llueve.'],
          ['你的护照在行李箱里。', 'nǐ de hùzhào zài xínglixiāng li.', 'Tu pasaporte está en la maleta.'],
          ['我用照相机拍照。', 'wǒ yòng zhàoxiàngjī pāizhào.', 'Hago fotos con la cámara. (拍照 pāizhào = hacer fotos)'],
        ]),
      ],
    ),
    lesson(
      'm24-l5',
      'Auditoría del Sector 31',
      'review',
      [
        match('w-cheng-shi', 'w-di-tie', 'w-chao-shi', 'w-hu-zhao'),
        match('w-di-fang', 'w-di-tu', 'w-bin-guan', 'w-yin-hang', 'w-dian-ti'),
        match('w-guo-jia', 'w-shi-jie', 'w-bei-fang', 'w-nan2-south'),
        match('w-lou2', 'w-ceng2', 'w-fu-jin', 'w-jie-dao', 'w-huan-jing'),
        match('w-chu-fang', 'w-bing-xiang', 'w-kong-tiao', 'w-deng1'),
        match('w-san3', 'w-zhao-xiang-ji', 'w-xing-li-xiang', 'w-xiao-xin', 'w-jiao3-corner'),
        { type: 'listen', entry: 'w-guo-jia' },
        { type: 'listen', entry: 'w-dian-ti' },
        dictate('w-cheng-shi'),
        dictate('w-fu-jin'),
        typeP('w-di-tu'),
        build('我坐地铁去超市。', 'wǒ zuò dìtiě qù chāoshì.', 'Voy al supermercado en metro.'),
        build('学校附近有超市。', 'xuéxiào fùjìn yǒu chāoshì.', 'Cerca de la escuela hay un supermercado.'),
        ...practice('w-huan-jing'),
        ...practice('w-xiao-xin'),
      ],
    ),
  ],
}
