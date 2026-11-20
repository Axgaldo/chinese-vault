/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 24 · HSK 2 — SALUD Y BIENESTAR (módulo 12/15)

   La enfermería del refugio: 生病 como bloque V+O, 身体 como cuerpo y
   salud, el mantenimiento del morador (洗, 休息, 运动, 游泳) y un cielo
   que se adjetiva (晴/阴) y anuncia sus nevadas (下雪了).
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m19c: VaultModule = {
  id: 'm19c',
  hsk: 2,
  code: 'S-24',
  title: 'Salud y bienestar',
  subtitle: 'El cuerpo, el doctor y el clima del día',
  entries: [
    e('w-shen-ti', '身体', 'shēntǐ', 'cuerpo; salud', '💪'),
    e('w-sheng-bing', '生病', 'shēngbìng', 'enfermar, estar enfermo', '🤒'),
    e('w-yao4', '药', 'yào', 'medicina, pastilla', '💊'),
    e('w-yan-jing', '眼睛', 'yǎnjing', 'ojo', '👁️'),
    e('w-xi3', '洗', 'xǐ', 'lavar', '🧼'),
    e('w-xiu-xi', '休息', 'xiūxi', 'descansar', '😌'),
    e('w-yun-dong', '运动', 'yùndòng', 'hacer ejercicio; deporte', '🏃‍♂️'),
    e('w-you-yong', '游泳', 'yóuyǒng', 'nadar', '🏊'),
    e('w-chuan1', '穿', 'chuān', 'llevar puesto (ropa)', '👕'),
    e('w-xue3', '雪', 'xuě', 'nieve', '❄️'),
    e('w-qing2', '晴', 'qíng', 'despejado, soleado', '☀️'),
    e('w-yin1', '阴', 'yīn', 'nublado', '☁️'),
    e('w-xi-gua', '西瓜', 'xīguā', 'sandía', '🍉'),
  ],
  lessons: [
    lesson(
      'm19c-l1',
      'El doctor del refugio',
      'vocab',
      [
        ...drill('w-shen-ti'),
        ...drill('w-sheng-bing'),
        ...drill('w-yao4'),
        noteStep('n-sheng-bing'),
        build('他生病了。', 'tā shēngbìng le.', 'Se ha puesto enfermo.'),
        build('我身体很好。', 'wǒ shēntǐ hěn hǎo.', 'Estoy muy sano. (lit. "mi cuerpo está muy bien")'),
      ],
      [
        grammar('n-sheng-bing', '生病 y 身体: el parte médico del refugio', [
          '生病 (shēngbìng) = enfermar — otro bloque verbo+objeto salido de la factoría del S-13 (como 吃饭): 生 = "generar" + 病 = "enfermedad". El chino no dice "está enfermo": dice que GENERÓ enfermedad. Con 了 se convierte en parte de novedad: 他生病了 = "se ha puesto enfermo" — antes estaba bien, y el 了 anuncia el cambio de estado.',
          'La sílaba 生 ya trabajó para ti en el S-22: 生日 es el día que GENERASTE (tu nacimiento). En 生病 el mismo motor produce otra cosa: la enfermedad. Mismo motor, distinto producto — así ahorra piezas el chino.',
          '身体 (shēntǐ) = cuerpo… y también SALUD. La frase del sector: 我身体很好 = "estoy sano", literalmente "mi cuerpo está muy bien". Para interesarse por alguien: 你身体好吗？ — el equivalente médico de "¿qué tal estás?".',
          '药 (yào) = medicina. Y una joya cultural: la medicina no se TOMA, se COME — 吃药 (chī yào) = "tomar la medicina", literalmente "comérsela". Píldoras, jarabes, tés medicinales: todo pasa por el mismo verbo que el arroz. En China nadie "bebe" una aspirina.',
          'Tip del Overseer: si el cuerpo pide parte (他生病了), la medicina se COME (吃药), no se bebe. Y nadie ha muerto en este refugio de un resfriado: solo se generan excusas.',
        ], [
          ['他生病了。', 'tā shēngbìng le.', 'Se ha puesto enfermo.'],
          ['我身体很好。', 'wǒ shēntǐ hěn hǎo.', 'Estoy muy sano.'],
          ['你身体好吗？', 'nǐ shēntǐ hǎo ma?', '¿Estás bien? (lit. ¿tu cuerpo está bien?)'],
        ]),
      ],
    ),
    lesson(
      'm19c-l2',
      'Cuidarse',
      'vocab',
      [
        ...drill('w-xi3'),
        ...drill('w-xiu-xi'),
        ...drill('w-yun-dong'),
        ...drill('w-you-yong'),
        noteStep('n-xiu-xi'),
        build('我每天运动。', 'wǒ měitiān yùndòng.', 'Hago ejercicio todos los días.'),
        build('你会游泳吗？', 'nǐ huì yóuyǒng ma?', '¿Sabes nadar?'),
      ],
      [
        grammar('n-xiu-xi', 'El mantenimiento del morador: 洗, 休息, 运动 y 游泳', [
          '洗 (xǐ) = lavar. Como todo verbo de la factoría, viaja con su objeto pegado: 洗手 (xǐ shǒu) = lavarse las manos; 洗衣服 (xǐ yīfu) = lavar la ropa. El bloque V+O del S-13 sigue en producción: el verbo suelto no trabaja solo, espera su paquete.',
          '休息 (xiūxi) = descansar — verbo redondo, sin complemento que armar: 休 (descansar) + 息 (aliento), literalmente "recuperar el aliento". La segunda sílaba va en tono neutro. 你想休息吗？ = "¿quieres descansar?" — la pregunta más honesta del sector.',
          '运动 (yùndòng) = hacer ejercicio ("mover el movimiento"): funciona solo, como verbo completo — 我每天运动 = "hago ejercicio todos los días", con el 每天 del S-20 en su puesto (delante del verbo). Y 游泳 (yóuyǒng) = nadar: con el 会 del S-08 pregunta por el SABER — 你会游泳吗？ = "¿sabes nadar?". En un refugio, saber nadar no es deporte: es protocolo de seguridad.',
          'Tip del Overseer: la máquina del morador se mantiene con tres verbos — 洗 (higiene), 运动 (músculo) y 休息 (batería). Ninguno se conjuga; solo hay que hacerlos.',
        ], [
          ['我每天运动。', 'wǒ měitiān yùndòng.', 'Hago ejercicio todos los días.'],
          ['你会游泳吗？', 'nǐ huì yóuyǒng ma?', '¿Sabes nadar?'],
          ['请你洗手。', 'qǐng nǐ xǐ shǒu.', 'Lávate las manos, por favor.'],
          ['你想休息吗？', 'nǐ xiǎng xiūxi ma?', '¿Quieres descansar?'],
        ]),
      ],
    ),
    lesson(
      'm19c-l3',
      'El cielo del refugio',
      'vocab',
      [
        ...drill('w-xue3'),
        ...drill('w-qing2'),
        ...drill('w-yin1'),
        ...drill('w-chuan1'),
        ...drill('w-yan-jing'),
        ...drill('w-xi-gua'),
        noteStep('n-tian-qi2'),
        build('今天下雪了。', 'jīntiān xià xuě le.', 'Hoy ha nevado.'),
        build('她穿新衣服。', 'tā chuān xīn yīfu.', 'Ella lleva ropa nueva.'),
      ],
      [
        grammar('n-tian-qi2', 'El cielo del refugio: 晴, 阴 y la nieve que se anuncia', [
          'El clima chino funciona como los adjetivos del S-09: el estado ES el verbo, sin ser ni estar. 今天很晴 (jīntiān hěn qíng) = "hoy está despejado"; 今天很阴 = "hoy está nublado" — ese cielo plomo que tan bien sale en el yermo. El cielo no "está" despejado: simplemente SE DECLARA despejado.',
          'Y lo que cae del cielo llega como NOTICIA, con 了 de cambio: 下雪了 (xià xuě le) = "¡ha nevado!" — el 下 del S-20 (bajar) + 雪 (nieve) + el 了 del S-13. Es la construcción hermana de 下雨 (S-11): la lluvia y la nieve no se describen, se ANUNCIAN. Mira por la ventana y suelta el parte: 今天下雪了.',
          'El cielo decide qué te pones: 穿 (chuān) = llevar puesto (ropa). 她穿新衣服 = "ella lleva ropa nueva" (el 新 del S-17). Es el verbo del vestidor: lo que ya está SOBRE el cuerpo se 穿 — y si 下雪了, a 穿 algo abrigado.',
          'Y los dos extras del día: 眼睛 (yǎnjing) = ojo (segunda sílaba en tono neutro), el radar del morador — hoy mirando el cielo limpio; y 西瓜 (xīguā) = sandía, la recompensa oficial de los días 晴 en el comedor del refugio. Cielo despejado, ojos contentos, sandía fría: el sector entero en tres fichas.',
          'Tip del Overseer: el cielo chino se ADJETIVA (很晴, 很阴) y la nevada se ANUNCIA (下雪了). Nada de "está nevando" a la europea: abre la ventana, declara el estado nuevo y vístete en consecuencia.',
        ], [
          ['今天下雪了。', 'jīntiān xià xuě le.', 'Hoy ha nevado.'],
          ['她穿新衣服。', 'tā chuān xīn yīfu.', 'Ella lleva ropa nueva.'],
          ['今天很晴。', 'jīntiān hěn qíng.', 'Hoy está despejado.'],
          ['今天天气怎么样？', 'jīntiān tiānqì zěnmeyàng?', '¿Qué tiempo hace hoy?'],
        ]),
      ],
    ),
    lesson(
      'm19c-l4',
      'Auditoría del Sector 24',
      'review',
      [
        match('w-shen-ti', 'w-sheng-bing', 'w-yao4', 'w-xiu-xi'),
        match('w-xi3', 'w-yun-dong', 'w-you-yong', 'w-chuan1', 'w-yan-jing'),
        { type: 'listen', entry: 'w-xue3' },
        { type: 'listen', entry: 'w-qing2' },
        dictate('w-sheng-bing'),
        dictate('w-you-yong'),
        typeP('w-shen-ti'),
        build('今天下雪了。', 'jīntiān xià xuě le.', 'Hoy ha nevado.'),
        build('他生病了。', 'tā shēngbìng le.', 'Se ha puesto enfermo.'),
        ...practice('w-yin1'),
        ...practice('w-xi-gua'),
      ],
    ),
  ],
}
