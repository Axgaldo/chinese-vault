/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 14 · HSK 2 — GENTE DEL REFUGIO (módulo 4/10)

   男/女 como etiquetas prefijables, oficios sin género gramatical y el kit de
   meta-lenguaje (说话, 声音, 单词, 意思, 问题) para preguntar por el chino
   EN chino: la llave del aprendizaje autónomo.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m14: VaultModule = {
  id: 'm14',
  hsk: 2,
  code: 'S-14',
  title: 'Gente del Refugio',
  subtitle: 'Personas, oficios y las palabras del idioma',
  entries: [
    e('w-nan2', '男', 'nán', 'masculino, hombre', '🚹'),
    e('w-nv3', '女', 'nǚ', 'femenino, mujer', '🚺'),
    e('w-hai-zi', '孩子', 'háizi', 'niño, hijo', '🧒', 'la segunda sílaba va sin tono'),
    e('w-yi-sheng', '医生', 'yīshēng', 'médico, médica', '👨‍⚕️'),
    e('w-jing-cha', '警察', 'jǐngchá', 'policía', '👮'),
    e('w-fu-wu-yuan', '服务员', 'fúwùyuán', 'camarero, camarera', '🧑‍🍳', 'fú = servir · wù = asunto · yuán = miembro del personal'),
    e('w-lin-ju', '邻居', 'línjū', 'vecino, vecina', '🏘️'),
    e('w-shuo-hua', '说话', 'shuōhuà', 'hablar', '💬', 'shuō = decir · huà = palabra (habla)'),
    e('w-sheng-yin', '声音', 'shēngyīn', 'sonido, voz', '📢'),
    e('w-dan-ci', '单词', 'dāncí', 'palabra (vocablo)', '🔤', 'dān = individual · cí = palabra'),
    e('w-yi-si', '意思', 'yìsi', 'significado, idea', '💡', 'la segunda sílaba va sin tono'),
    e('w-wen-ti', '问题', 'wèntí', 'pregunta, problema', '❓', 'wèn = preguntar · tí = tema'),
  ],
  lessons: [
    lesson(
      'm14-l1',
      'Moradores ilustres',
      'vocab',
      [
        ...drill('w-nan2'),
        ...drill('w-nv3'),
        ...drill('w-hai-zi'),
        ...drill('w-lin-ju'),
        noteStep('n-nannü'),
        build('那个女人是我的邻居。', 'nà ge nǚrén shì wǒ de línjū.', 'Esa mujer es mi vecina.'),
        build('他们的孩子很高。', 'tāmen de háizi hěn gāo.', 'Su niño es alto.'),
      ],
      [
        grammar('n-nannü', '男 y 女: el género se etiqueta, no se declina', [
          '男 (nán) y 女 (nǚ) funcionan como ETIQUETAS que se pegan DELANTE de otra palabra: 男人 (nánrén, hombre), 女人 (nǚrén, mujer), 男孩子 (nánháizi, niño), 女医生 (nǚyīshēng, médica). El chino no cambia la terminación como el español ("-o / -a"): pone la etiqueta primero y la palabra queda igual por dentro.',
          'A) 人 SOLO ES NEUTRO: 人 (rén) significa "persona", sin género. Si el género no importa, no se pone: 那个人是老师 vale para un profesor y para una profesora. El español te obliga a elegir en cada frase; el chino te deja en paz hasta que el género SEA la noticia.',
          'B) LOS OFICIOS NO MARCAN GÉNERO: 医生, 警察 y 服务员 valen igual para un hombre que para una mujer: ni terminaciones ni sílabas nuevas. Cuando importa, se apila la etiqueta encima: 女服务员 (camarera), 男警察 (policía varón). La mitad del trabajo gramatical del español, en chino, sencillamente no existe.',
          'C) 邻居 TAMPOCO ELIGE: mi vecina es 邻居 y mi vecino es 邻居. En 那个女人是我的邻居, el género lo cuenta 女人; 邻居 se queda cómodamente neutral. Regla del refugio: etiquetar el género SOLO cuando el oyente no puede deducirlo de otra manera.',
          'Tip del Overseer: ¿necesitas precisar género? Pega 男 o 女 delante, como quien pone una pegatina en una caja del almacén. ¿No importa? Ahórrate la pegatina: el refugio premia el ahorro de sílabas.',
        ], [
          ['那个女人是我的邻居。', 'nà ge nǚrén shì wǒ de línjū.', 'Esa mujer es mi vecina.'],
          ['他们的孩子很高。', 'tāmen de háizi hěn gāo.', 'Su niño es alto.'],
          ['男孩子在公园，女孩子在花园。', 'nánháizi zài gōngyuán, nǚháizi zài huāyuán.', 'El niño está en el parque, la niña en el jardín.'],
        ]),
      ],
    ),
    lesson(
      'm14-l2',
      'Oficios del refugio',
      'grammar',
      [
        ...drill('w-yi-sheng'),
        ...drill('w-jing-cha'),
        ...drill('w-fu-wu-yuan'),
        noteStep('n-zhiye'),
        build('我朋友是医生。', 'wǒ péngyou shì yīshēng.', 'Mi amigo es médico.'),
        build('那个服务员认识我。', 'nà ge fúwùyuán rènshi wǒ.', 'Ese camarero me conoce.'),
      ],
      [
        grammar('n-zhiye', '是 + oficio: identidad sin artículos', [
          'Decir a qué te dedicas en chino es un canje directo: SUJETO + 是 + OFICIO. 我朋友是医生 = "mi amigo es médico". Sin "un", sin "una", sin "el": el chino no tiene artículos, así que nadie es "UN médico": o eres médico o no lo eres, sin papel de envolver.',
          'A) LA MÁQUINA DE PREGUNTAR OFICIOS: 你是做什么的？ (nǐ shì zuò shénme de?) — literalmente "tú eres hacer-qué-DE" — significa "¿a qué te dedicas?". El secreto es el 的 final: convierte "hacer algo" en ETIQUETA de persona ("el/la que hace X"). Es el mismo 的 posesivo que ya usas, ahora fichando a la gente por su oficio.',
          'B) LA OTRA PREGUNTA, LA DE SÍ/NO: si solo quieres confirmar una sospecha: 你是警察吗？ — "¿eres policía?", con la partícula 吗 de siempre. La diferencia importa: 吗 espera un sí o un no; 你是做什么的？ abre la caja y deja que caiga cualquier oficio.',
          'C) EL OFICIO COMO TARJETA DE ACCESO: la frase no lleva 很 ni adornos porque el oficio no es una cualidad — es identidad: mi amigo no está "muy médico", ES médico. Y con 认识 (rènshi, del Sector 8) redondeas relaciones: 那个服务员认识我 = "ese camarero me conoce".',
          'Tip del Overseer: preséntate con dos golpes: 我是学生 ("soy estudiante"). Y si el otro no se presenta, devuélvele la pregunta como un bumerán: 你是做什么的？ Así se hacen contactos en cualquier sector.',
        ], [
          ['我朋友是医生。', 'wǒ péngyou shì yīshēng.', 'Mi amigo es médico.'],
          ['你是做什么的？', 'nǐ shì zuò shénme de?', '¿A qué te dedicas?'],
          ['那个服务员认识我。', 'nà ge fúwùyuán rènshi wǒ.', 'Ese camarero me conoce.'],
        ]),
      ],
    ),
    lesson(
      'm14-l3',
      'Las palabras del idioma',
      'vocab',
      [
        ...drill('w-shuo-hua'),
        ...drill('w-sheng-yin'),
        ...drill('w-dan-ci'),
        ...drill('w-yi-si'),
        ...drill('w-wen-ti'),
        noteStep('n-yisi'),
        build('这个单词的意思是什么？', 'zhè ge dāncí de yìsi shì shénme?', '¿Qué significa esta palabra?'),
        build('他说话的声音很大。', 'tā shuōhuà de shēngyīn hěn dà.', 'Habla con voz muy alta.'),
      ],
      [
        grammar('n-yisi', '意思, 单词 y 字: el kit del meta-lenguaje', [
          'Con 说话, 声音, 单词, 意思 y 问题 acaba de entrar en tu inventario el KIT DE META-LENGUAJE: las palabras para hablar DEL chino EN chino. A partir de este sector, cualquier palabra desconocida que cruces en el refugio puede convertirse en pregunta. Ya no dependes del diccionario: dependes de tu propia boca.',
          'A) LA MÁQUINA DE PREGUNTAR SIGNIFICADOS: X + 的 + 意思 + 是 + 什么 = "¿qué significa X?". 这个单词的意思是什么？ = "el significado de esta palabra es cuál". Son piezas que ya conoces por separado (el 的 posesivo + 是 + 什么); al juntarlas tienes un traductor humano portátil.',
          'B) LA REACCIÓN CORTA: en plena conversación, el chino no monta la frase entera: suelta 什么意思？ (shénme yìsi?) = "¿qué quieres decir?", "¿cómo?". Es el salto de sobresalto del idioma: dos palabras, ceja arriba. Y para devolver el significado: 意思是... (yìsi shì...) = "quiere decir...".',
          'C) 单词 vs 字 — LA DISTINCIÓN CRUCIAL: 字 (zì) es UN carácter: 饭. 单词 (dāncí) es la PALABRA completa: 吃饭 (chīfàn, "comer"). El chino escribe con ladrillos (字) y habla con paredes (单词). Cuando preguntes por "esta palabra", apunta a la pared entera: preguntar por un ladrillo suelto trae respuestas dobles y raras.',
          'D) 问题 ES DOS COSAS A LA VEZ: "pregunta" y "problema". Para la mentalidad china, ambas son cosas que hay que RESOLVER: 我有一个问题 = "tengo una pregunta" y también "tengo un problema". Por eso el profesor y el técnico del refugio usan la misma palabra: el idioma no distingue el fallo de la curiosidad.',
          'Tip del Overseer: memoriza UNA frase y el chino se te abre por la mitad: 这个单词的意思是什么？ Con ella, cada desconocido del camino se convierte en lección gratuita. La mejor inversión del sector.',
        ], [
          ['这个单词的意思是什么？', 'zhè ge dāncí de yìsi shì shénme?', '¿Qué significa esta palabra?'],
          ['什么意思？', 'shénme yìsi?', '¿Qué quieres decir? / ¿Cómo?'],
          ['老师，我有一个问题。', 'lǎoshī, wǒ yǒu yí ge wèntí.', 'Profesor, tengo una pregunta. (sandhi: yí ge)'],
        ]),
      ],
    ),
    lesson(
      'm14-l4',
      'Auditoría del Sector 14',
      'review',
      [
        match('w-nan2', 'w-nv3', 'w-hai-zi', 'w-lin-ju'),
        match('w-yi-sheng', 'w-jing-cha', 'w-fu-wu-yuan', 'w-shuo-hua'),
        { type: 'listen', entry: 'w-dan-ci' },
        { type: 'listen', entry: 'w-sheng-yin' },
        dictate('w-sheng-yin'),
        dictate('w-wen-ti'),
        typeP('w-yi-si'),
        build('那个女人是我的邻居。', 'nà ge nǚrén shì wǒ de línjū.', 'Esa mujer es mi vecina.'),
        build('这个单词的意思是什么？', 'zhè ge dāncí de yìsi shì shénme?', '¿Qué significa esta palabra?'),
        ...practice('w-hai-zi'),
      ],
    ),
  ],
}
