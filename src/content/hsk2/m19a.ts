/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 22 · HSK 2 — LA FAMILIA AMPLIADA (módulo 10/15)

   El censo del refugio se amplía: los hermanos con la edad a cuestas
   (哥哥/弟弟, 姐姐/妹妹), el trío tā por escrito (他/她/它), el ritual del
   cumpleaños (生日快乐) y las cosas de todos (手表, 报纸, 事情).
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m19a: VaultModule = {
  id: 'm19a',
  hsk: 2,
  code: 'S-22',
  title: 'La familia ampliada',
  subtitle: 'Hermanos, parejas y las cosas de todos',
  entries: [
    e('w-di-di', '弟弟', 'dìdi', 'hermano menor', '👦'),
    e('w-ge-ge', '哥哥', 'gēge', 'hermano mayor', '🧑'),
    e('w-jie-jie', '姐姐', 'jiějie', 'hermana mayor', '👩'),
    e('w-mei-mei', '妹妹', 'mèimei', 'hermana menor', '👧'),
    e('w-qi-zi', '妻子', 'qīzi', 'esposa, mujer', '💍'),
    e('w-zhang-fu', '丈夫', 'zhàngfu', 'esposo, marido', '🤵'),
    e('w-ta1-it', '它', 'tā', 'ello (animales y cosas)', '🐾', 'mismo sonido que 他 y 她'),
    e('w-da-jia', '大家', 'dàjiā', 'todos, todo el mundo', '👨‍👩‍👧‍👦'),
    e('w-nan-ren', '男人', 'nánrén', 'hombre', '🚹'),
    e('w-xing4', '姓', 'xìng', 'apellidarse; apellido', '🪪', 'la cortés: 您贵姓？'),
    e('w-jie-shao', '介绍', 'jièshào', 'presentar (a alguien)', '🤝'),
    e('w-sheng-ri', '生日', 'shēngrì', 'cumpleaños', '🎂'),
    e('w-kuai-le', '快乐', 'kuàilè', 'feliz, alegre', '😄'),
    e('w-shi-qing', '事情', 'shìqing', 'asunto, cosa (hechos)', '📝', 'segunda sílaba sin tono'),
    e('w-shou-biao', '手表', 'shǒubiǎo', 'reloj (de pulsera)', '⌚'),
    e('w-bao-zhi', '报纸', 'bàozhǐ', 'periódico', '📰'),
  ],
  lessons: [
    lesson(
      'm19a-l1',
      'Los hermanos',
      'vocab',
      [
        ...drill('w-di-di'),
        ...drill('w-ge-ge'),
        ...drill('w-jie-jie'),
        ...drill('w-mei-mei'),
        ...drill('w-shi-qing'),
        noteStep('n-xiong-di'),
        build('我姐姐很高兴。', 'wǒ jiějie hěn gāoxìng.', 'Mi hermana mayor está muy contenta.'),
        build('我哥哥有事情。', 'wǒ gēge yǒu shìqing.', 'Mi hermano mayor tiene asuntos.'),
      ],
      [
        grammar('n-xiong-di', '哥哥 y 弟弟: la edad manda en la familia', [
          'El español despacha a todos los hijos de tus padres con UNA palabra: "hermano". El chino no deja lugar a la vaguedad: corta la hermandad POR EDAD. 哥哥 (gēge) = hermano MAYOR; 弟弟 (dìdi) = hermano MENOR. No existe "mi hermano" sin matiz: al presentar tu familia, declaras QUÉ hermano es. El registro del refugio quiere precisión de censo.',
          'Con las hermanas, el mismo corte: 姐姐 (jiějie) = hermana mayor; 妹妹 (mèimei) = hermana menor. Donde el español archiva dos fichas, el chino archiva cuatro: cada hermano y cada hermana viaja con su edad a cuestas. Y ojo: la edad es RELATIVA A TI — tu 哥哥 puede ser el pequeño de su promoción; para ti sigue siendo 哥哥.',
          'Bonus de posesión: con la familia cercana, el 的 del S-02 se suele OMITIR. 我哥哥 ("mi hermano mayor") suena natural y de morador; 我的哥哥 no está mal, pero suena a expediente burocrático. Con lo que NO es familia, el 的 vuelve a su puesto: 我的狗 = "mi perro". La familia es tan cercana que hasta la gramática la trata de tú.',
          'Estas fichas también trabajan como TRATAMIENTO: en la superficie, un desconocido algo mayor que tú es 哥哥 o 姐姐 por pura cortesía. No hay parentesco: hay protocolo. Así se las gasta el yermo.',
          'Tip del Overseer: antes de traducir "hermano" o "hermana", pregúntate una cosa — ¿naciste tú antes? La respuesta elige la ficha: 哥哥/弟弟 si es chico, 姐姐/妹妹 si es chica. La edad relativa viaja pegada a la palabra.',
        ], [
          ['他是我弟弟。', 'tā shì wǒ dìdi.', 'Él es mi hermano pequeño.'],
          ['我姐姐很高兴。', 'wǒ jiějie hěn gāoxìng.', 'Mi hermana mayor está muy contenta.'],
          ['我哥哥是我的朋友。', 'wǒ gēge shì wǒ de péngyou.', 'Mi hermano mayor es mi amigo.'],
        ]),
      ],
    ),
    lesson(
      'm19a-l2',
      'Parejas y todos',
      'vocab',
      [
        ...drill('w-nan-ren'),
        ...drill('w-qi-zi'),
        ...drill('w-zhang-fu'),
        ...drill('w-ta1-it'),
        ...drill('w-da-jia'),
        noteStep('n-ta-tres'),
        build('她是我妻子。', 'tā shì wǒ qīzi.', 'Ella es mi esposa.'),
        build('它不是我的狗。', 'tā bú shì wǒ de gǒu.', 'No es mi perro.'),
      ],
      [
        grammar('n-ta-tres', '他, 她 y 它: tres caracteres, un mismo tā', [
          'La tercera persona del chino se escribe de TRES maneras y se pronuncia de UNA. 他 (tā) = él; 她 (tā) = ella; 它 (tā) = ello — animales y cosas. En el papel, el carácter cuenta la historia: 她 lleva a la mujer (女) a un lado y 它 cubre el resto del mundo. Al oído, las tres son exactamente el mismo sonido: el contexto decide a quién señalas.',
          '它 es la ficha nueva del sector: todo lo que no es persona viaja en ella — el perro del refugio, el reloj, el periódico. 它不是我的狗 = "no es mi perro". Regla sin excepciones: las personas NUNCA viajan en 它. Usarlo con gente es error de expediente.',
          '大家 (dàjiā) = "todos, todo el mundo": la palabra que reúne a la sala entera. Su saludo de protocolo es 大家好！ — el "buenos días a todos" del refugio — y con el 都 del S-11 se redondea la cuenta: 大家都很高兴 = "todos están contentos".',
          'Y la pareja del sector: 妻子 (qīzi) = esposa; 丈夫 (zhàngfu) = esposo. Las dos llevan la segunda sílaba en tono neutro — ligeras, como una alianza que ya no pesa. Y no las confundas con 男人 ("hombre"): el 男人 es cualquier hombre del yermo; el 丈夫 es el hombre con anillo. El 男 ya lo conociste en el S-16: el género se etiqueta, no se declara.',
          'Tip del Overseer: al ESCRIBIR, elige el carácter con cuidado (他/她/它); al HABLAR, relájate — los tres suenan tā y el contexto apunta por ti.',
        ], [
          ['她是我妻子。', 'tā shì wǒ qīzi.', 'Ella es mi esposa.'],
          ['它不是我的狗。', 'tā bú shì wǒ de gǒu.', 'No es mi perro.'],
          ['大家好！', 'dàjiā hǎo!', '¡Hola a todos!'],
        ]),
      ],
    ),
    lesson(
      'm19a-l3',
      'Cumpleaños feliz',
      'vocab',
      [
        ...drill('w-xing4'),
        ...drill('w-jie-shao'),
        ...drill('w-sheng-ri'),
        ...drill('w-kuai-le'),
        ...drill('w-shou-biao'),
        ...drill('w-bao-zhi'),
        noteStep('n-shengri'),
        build('今天是我弟弟的生日。', 'jīntiān shì wǒ dìdi de shēngrì.', 'Hoy es el cumpleaños de mi hermano pequeño.'),
        build('弟弟，生日快乐！', 'dìdi, shēngrì kuàilè!', '¡Hermano pequeño, feliz cumpleaños!'),
        build('我送哥哥一块手表。', 'wǒ sòng gēge yí kuài shǒubiǎo.', 'Le regalo un reloj a mi hermano mayor.'),
      ],
      [
        grammar('n-shengri', '生日快乐 y el protocolo del apellido', [
          'La felicitación de cumpleaños es una pieza de ceremonial: 生日快乐！(shēngrì kuàilè!) — literalmente "¡cumpleaños feliz!". Se dispara ENTERA: recortarla a 快乐 a secas es desear felicidad en general, no cumplir el ritual. Y como toda ceremonia, admite dedicación: primero el destinatario, luego el disparo — 弟弟，生日快乐！',
          '姓 (xìng) = apellido… y también "apellidarse", porque en chino funciona como VERBO. La pregunta del censo: 你姓什么？ = "¿cómo te apellidas?". La respuesta: 我姓王 (wǒ xìng Wáng) = "me apellido Wang". Y fíjate: el apellido va PRIMERO en el nombre completo chino (Wáng Xiǎomíng) — la familia precede a la persona, siempre.',
          'La versión de cortesía del protocolo: 您贵姓？(nín guì xìng) = literalmente "¿cuál es su PRECIOSO apellido?". Es el 贵 del S-18 ("caro") trabajando de respeto: el apellido ajeno es tan valioso que no se pregunta a lo bruto. Con 您 (usted) y todo. Protocolo de Overseer.',
          'Y para presentar gente: 介绍 (jièshào). El molde social del sector es 我介绍一下 (wǒ jièshào yíxià) = "te lo presento" — el 一下 del final ("una pasadita") suaviza el gesto, como quien abre la puerta en vez de empujar al invitado.',
          'Tip del Overseer: en este refugio se pregunta el apellido con respeto (您贵姓？) y se felicita con la fórmula completa (生日快乐). Un ritual a medias ofende dos veces.',
        ], [
          ['今天是我弟弟的生日。', 'jīntiān shì wǒ dìdi de shēngrì.', 'Hoy es el cumpleaños de mi hermano pequeño.'],
          ['弟弟，生日快乐！', 'dìdi, shēngrì kuàilè!', '¡Hermano pequeño, feliz cumpleaños!'],
          ['你姓什么？', 'nǐ xìng shénme?', '¿Cómo te apellidas?'],
          ['我姓王。', 'wǒ xìng Wáng.', 'Me apellido Wang. (王 = un apellido muy común)'],
        ]),
      ],
    ),
    lesson(
      'm19a-l4',
      'Auditoría del Sector 22',
      'review',
      [
        match('w-di-di', 'w-ge-ge', 'w-jie-jie', 'w-mei-mei'),
        match('w-nan-ren', 'w-qi-zi', 'w-zhang-fu', 'w-ta1-it', 'w-da-jia'),
        { type: 'listen', entry: 'w-xing4' },
        { type: 'listen', entry: 'w-shi-qing' },
        dictate('w-sheng-ri'),
        dictate('w-shou-biao'),
        typeP('w-kuai-le'),
        build('爸爸在看报纸。', 'bàba zài kàn bàozhǐ.', 'Papá está leyendo el periódico.'),
        build('今天是我弟弟的生日。', 'jīntiān shì wǒ dìdi de shēngrì.', 'Hoy es el cumpleaños de mi hermano pequeño.'),
        ...practice('w-jie-shao'),
        ...practice('w-bao-zhi'),
      ],
    ),
  ],
}
