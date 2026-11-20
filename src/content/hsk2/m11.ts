/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 13 · HSK 2 — EL TIEMPO Y 了 (módulo 1/15)

   El corazón del HSK 2: la partícula 了 y el contraste temporal. Los apuntes
   de este sector van más allá del "cómo se dice": explican el MECANISMO,
   con contrastes bien/mal, para entender cómo piensa el chino.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, introLite, lesson, match, noteStep, practice, typeP } from '../builders'

export const m11: VaultModule = {
  id: 'm11',
  hsk: 2,
  code: 'S-13',
  title: 'El Tiempo y 了',
  subtitle: 'La gran partícula del cambio: 了, 正在, planes y el tiempo relativo',
  entries: [
    e('w-le5', '了', 'le', 'partícula de cambio/completado', '⏳', 'se escribe sin tono'),
    e('w-zheng-zai', '正在', 'zhèngzài', 'estar en plena acción', '🎬'),
    e('w-gang-cai', '刚才', 'gāngcái', 'hace un momento', '🕐'),
    e('w-yi-qian', '以前', 'yǐqián', 'antes, en el pasado', '⏮️'),
    e('w-yi-hou', '以后', 'yǐhòu', 'después, en el futuro', '⏭️'),
    e('w-zui-hou', '最后', 'zuìhòu', 'al final, por último', '🏁'),
    e('w-kai-shi', '开始', 'kāishǐ', 'empezar', '▶️'),
    e('w-jie-shu', '结束', 'jiéshù', 'terminar', '⏹️'),
    e('w-da-suan', '打算', 'dǎsuan', 'planear, tener pensado', '🗓️', 'la segunda sílaba va sin tono'),
    e('w-zhun-bei', '准备', 'zhǔnbèi', 'preparar', '🧰'),
    e('w-chi-fan', '吃饭', 'chīfàn', 'comer (una comida)', '🍽️'),
    e('w-tian-qi', '天气', 'tiānqì', 'tiempo (clima)', '🌦️'),
  ],
  lessons: [
    lesson(
      'm11-l1',
      'La máquina del tiempo',
      'vocab',
      [
        ...drill('w-yi-qian'),
        ...drill('w-yi-hou'),
        ...drill('w-gang-cai'),
        ...drill('w-zui-hou'),
        ...drill('w-chi-fan'),
        noteStep('n-shijian-relativo'),
        build('以前我不喝茶。', 'yǐqián wǒ bù hē chá.', 'Antes yo no tomaba té.'),
        build('吃饭以后，我学习。', 'chīfàn yǐhòu, wǒ xuéxí.', 'Después de comer, estudio.'),
        build('刚才我在学校。', 'gāngcái wǒ zài xuéxiào.', 'Hace un momento estaba en la escuela.'),
      ],
      [
        grammar('n-shijian-relativo', '以前 y 以后: las anclas del tiempo', [
          'El chino tiene un truco elegante para hablar del tiempo: 以前 ("antes") y 以后 ("después") funcionan como ADORNOS que se colocan justo después de lo que anclan.',
          '1) Solos, abren la frase: 以前，我不喝茶 = "antes, yo no tomaba té" (habla de un pasado vago).',
          '2) Tras una acción, la convierten en punto de referencia: 吃饭以后 = "después de comer", literalmente "comer-después". Fíjate: en español decimos "DESPUÉS DE comer" (la preposición delante); en chino el marcador va DETRÁS: 吃饭以后. Piensa en ello como una foto con etiqueta: [foto]以后.',
          '3) 刚才 es distinto: es "hace un momento", un pasado inmediato y concreto. El hermano pequeño de 以前.',
          'Contraste para entenderlo bien: 我以前学习中文 (empecé en algún momento del pasado) ≠ 我刚才学习中文 (¡hace nada, acabo de levantarme de la mesa!).',
        ], [
          ['以前我不喝茶。', 'yǐqián wǒ bù hē chá.', 'Antes yo no tomaba té.'],
          ['吃饭以后，我学习。', 'chīfàn yǐhòu, wǒ xuéxí.', 'Después de comer, estudio.'],
          ['刚才他在睡觉。', 'gāngcái tā zài shuìjiào.', 'Hace un momento estaba durmiendo.'],
        ]),
      ],
    ),
    lesson(
      'm11-l2',
      'La gran partícula 了',
      'grammar',
      [
        ...introLite('w-le5'),
        ...introLite('w-zheng-zai'),
        ...drill('w-tian-qi'),
        noteStep('n-le-mecanismo'),
        noteStep('n-zheng-zai'),
        build('我吃了。', 'wǒ chī le.', 'Ya he comido.'),
        build('今天我吃了很多。', 'jīntiān wǒ chī le hěn duō.', 'Hoy he comido mucho.'),
        build('天气冷了。', 'tiānqì lěng le.', 'Ha refrescado (antes no).'),
        build('他正在喝茶。', 'tā zhèngzài hē chá.', 'Está tomando té ahora mismo.'),
      ],
      [
        grammar('n-le-mecanismo', '了 (le): no es "pasado" — es CAMBIO', [
          'El error número uno de los estudiantes: pensar que 了 equivale a nuestro pasado. ¡No! 了 marca dos cosas: que algo SE COMPLETÓ o que algo CAMBIÓ.',
          'A) COMPLETADO: 我吃了 = "ya comí / he comido". La acción quedó hecha. Por eso en una tienda oyes 好了吗？ ("¿ya está?").',
          'B) CAMBIO DE ESTADO: 天气冷了 = "HA refrescado". Antes hacía calor, ahora no: eso que cambia lleva 了. Otro: 我是学生了 = "ahora ya soy estudiante" (antes no lo era).',
          'C) LO QUE NO ES: 了 NO aparece con hábitos ni verdades generales. 我喝茶 = "tomo té" (siempre). 我喝了茶 = "me he tomado un té" (esta vez, hecho). El hábito no se completa: la costumbre no acaba.',
          'D) Dónde va: tras el verbo (我吃了) o al final de la frase (我吃饭了). Con la posición al final, a veces suena a "¡y ya está!": 我去了 = "allá fui y listo".',
          'Tip del Overseer: cuando dudes, pregúntate ¿esto acaba/ocurrió una vez (了) o es costumbre (sin 了)?',
        ], [
          ['我吃了。', 'wǒ chī le.', 'Ya he comido.'],
          ['天气冷了。', 'tiānqì lěng le.', 'Ha refrescado.'],
          ['我今天很忙。', 'wǒ jīntiān hěn máng.', 'Hoy estoy ocupado. (hábito del día: sin 了)'],
        ]),
        grammar('n-zheng-zai', '正在: la foto en movimiento', [
          '正在 + verbo = la acción está pasando AHORA MISMO, en directo. 我正在学习 = "estoy (en pleno) estudio".',
          'Es la cámara de vídeo frente a la foto de 了. Los tres tiempos en una línea: 我吃饭 (hago, costumbre) → 我正在吃饭 (ahora mismo) → 我吃了饭 (he terminado).',
          'Ojo: 正在 NO acepta 了. Son fotos incompatibles: no puedes estar "en directo" y "terminado" a la vez.',
        ], [
          ['他正在喝茶。', 'tā zhèngzài hē chá.', 'Está tomando té ahora mismo.'],
          ['我正在学习中文。', 'wǒ zhèngzài xuéxí zhōngwén.', 'Estoy estudiando chino ahora mismo.'],
        ]),
      ],
    ),
    lesson(
      'm11-l3',
      'Planes del refugio',
      'vocab',
      [
        ...drill('w-da-suan'),
        ...drill('w-zhun-bei'),
        ...drill('w-kai-shi'),
        ...drill('w-jie-shu'),
        noteStep('n-da-suan'),
        build('我打算明天学习。', 'wǒ dǎsuan míngtiān xuéxí.', 'Pienso estudiar mañana.'),
        build('今天的工作结束了。', 'jīntiān de gōngzuò jiéshù le.', 'El trabajo de hoy ha terminado.'),
        build('八点开始上课。', 'bā diǎn kāishǐ shàngkè.', 'La clase empieza a las ocho.'),
      ],
      [
        grammar('n-da-suan', '打算, 准备 y 想: tres niveles de intención', [
          'Para decir "voy a..." el chino te da tres gasolineras de intención, de suave a firme:',
          '• 想 + verbo: "me apetece/apetecería" (un deseo, sin plan) — 我想去公园 (me gustaría ir al parque).',
          '• 打算 + verbo: "tengo pensado" (hay plan mental, sin compromiso) — 我打算明天学习 (mi idea es estudiar mañana, ya veremos).',
          '• Para planes ya firmes, 准备 + verbo ("me dispongo a"): 我准备明天开始 = "mañana empiezo (en serio)".',
          'Contraste: 我想吃米饭 (me apetece arroz) → 我打算吃米饭 (he decidido que hoy, arroz) → 我准备了米饭 (lo tengo ya preparado: 准备 también es "preparar" literal).',
          'El verbo 开始 (empezar) y 结束 (terminar) encajan en cualquier plan: 八点开始 = "empieza a las ocho"; 工作结束了 = "el trabajo HA terminado" (fíjate en el 了: cambio de estado).',
        ], [
          ['我打算明天学习。', 'wǒ dǎsuan míngtiān xuéxí.', 'Pienso estudiar mañana.'],
          ['我准备今天开始。', 'wǒ zhǔnbèi jīntiān kāishǐ.', 'Me dispongo a empezar hoy.'],
        ]),
      ],
    ),
    lesson(
      'm11-l4',
      'Auditoría del Sector 13',
      'review',
      [
        match('w-yi-qian', 'w-yi-hou', 'w-gang-cai', 'w-zui-hou'),
        match('w-kai-shi', 'w-jie-shu', 'w-da-suan', 'w-zhun-bei'),
        { type: 'listen', entry: 'w-zheng-zai' },
        { type: 'listen', entry: 'w-chi-fan' },
        dictate('w-zheng-zai'),
        dictate('w-tian-qi'),
        typeP('w-yi-hou'),
        build('我吃了。', 'wǒ chī le.', 'Ya he comido.'),
        build('他正在喝茶。', 'tā zhèngzài hē chá.', 'Está tomando té ahora mismo.'),
        ...practice('w-le5'),
      ],
    ),
  ],
}
