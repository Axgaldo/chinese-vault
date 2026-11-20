/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 11 · HSK 1 — ¿QUÉ PASA?

   Las preguntas que abren conversación: 谁 (quién, en el hueco de la
   respuesta) y el dúo 怎么/怎么样 (el modo frente a la valoración). El
   protocolo telefónico del morador (喂, 没关系) y el "todo a la vez"
   de 都 y 些.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, typeP } from '../builders'

export const m9c: VaultModule = {
  id: 'm9c',
  hsk: 1,
  code: 'S-11',
  title: '¿Qué pasa?',
  subtitle: 'Preguntas, sorpresas y el teléfono al chino',
  entries: [
    // (叫, 什么, 名字, 我们, 今天, 学校, 东西, 北京… viven en sectores anteriores: aquí solo se referencian)
    e('w-shui2-who', '谁', 'shéi', 'quién', '❓'),
    e('w-zen-me', '怎么', 'zěnme', 'cómo; por qué', '🤷'),
    e('w-zen-me-yang', '怎么样', 'zěnmeyàng', '¿qué tal?, ¿cómo es?', '🆗'),
    e('w-zhong-wu', '中午', 'zhōngwǔ', 'mediodía', '🕛'),
    e('w-xia-yu', '下雨', 'xiàyǔ', 'llover', '🌧️'),
    e('w-wei4', '喂', 'wèi', '¡oiga!, hola (por teléfono)', '📱'),
    e('w-mei-guan-xi', '没关系', 'méi guānxi', 'no pasa nada, no importa', '😌'),
    e('w-kan-jian', '看见', 'kànjiàn', 'ver (y lograr ver)', '👁️', 'kàn + jiàn: mirar hasta ver'),
    e('w-xie1', '些', 'xiē', 'algunos, unos', '🔢', 'siempre con 这/那: 这些, 那些'),
    e('w-dou1', '都', 'dōu', 'todo, todos', '💯'),
  ],
  lessons: [
    lesson(
      'm9c-l1',
      '¿Quién es?',
      'grammar',
      [
        ...drill('w-shui2-who'),
        ...drill('w-kan-jian'),
        noteStep('n-shui'),
        build('我看见他。', 'wǒ kànjiàn tā.', 'Lo veo.'),
        build('他是谁？', 'tā shì shéi?', '¿Quién es él?'),
        match('w-shui2-who', 'w-shen-me', 'w-kan-jian', 'w-tong-xue'),
      ],
      [
        grammar('n-shui', '谁 (shéi): la pregunta con cara de respuesta', [
          '谁 (shéi) = "quién". La regla de oro de las preguntas chinas: la palabra interrogativa se sienta EXACTAMENTE donde se sentaría la respuesta. 他是谁？ = "él es ¿quién?" — el 谁 ocupa el asiento del nombre.',
          'Compara con el español: nosotros damos la vuelta a la frase ("¿Quién ES él?"). El chino ni se mueve: la frase sigue en orden de declaración y 谁 brilla en el hueco. ¿La mejor parte? La pregunta ya te enseña la forma de su respuesta.',
          '看见 (kànjiàn) son dos ideas soldadas: 看 = mirar (la acción, la intención) + 见 = alcanzar a ver (el RESULTADO). No es "mirar": es "mirar hasta ver". 我看见他 = "lo veo" — lo intenté y lo logré. Si solo dirigiste los ojos sin distinguir nada, eso es 看 a secas.',
          'Tip del Overseer: entrena la pareja tal cual suena: 你看见谁？ → 我看见他。 Misma forma, hueco distinto: el interrogativo fuera, la respuesta dentro.',
        ], [
          ['他是谁？', 'tā shì shéi?', '¿Quién es él?'],
          ['你看见谁？', 'nǐ kànjiàn shéi?', '¿A quién ves?'],
          ['我看见他。', 'wǒ kànjiàn tā.', 'Lo veo.'],
        ]),
      ],
    ),
    lesson(
      'm9c-l2',
      '¿Cómo va todo?',
      'grammar',
      [
        ...drill('w-zen-me'),
        ...drill('w-zen-me-yang'),
        ...drill('w-zhong-wu'),
        ...drill('w-dou1'),
        ...drill('w-xie1'),
        noteStep('n-zen-me'),
        noteStep('n-dou1'),
        build('今天怎么样？', 'jīntiān zěnmeyàng?', '¿Qué tal hoy?'),
        build('你怎么去学校？', 'nǐ zěnme qù xuéxiào?', '¿Cómo vas a la escuela?'),
        build('这些东西很好。', 'zhèxiē dōngxi hěn hǎo.', 'Estas cosas son muy buenas.'),
        build('我们都去北京。', 'wǒmen dōu qù Běijīng.', 'Todos vamos a Pekín.'),
      ],
      [
        grammar('n-zen-me', '怎么 y 怎么样: dos formas de preguntar "cómo"', [
          '怎么 (zěnme) pregunta el MODO, el "por medio de qué": 你怎么去学校？ = "¿cómo vas a la escuela?" (¿en taxi, en avión, andando?). Espera un medio, un método, una instrucción.',
          '怎么样 (zěnmeyàng) pide una VALORACIÓN: "¿qué tal?". 今天怎么样？ = "¿qué tal hoy?". No quieres saber el método del día: quieres saber qué NOTA le pones.',
          'El truco para no confundirlas: 怎么 + VERBO detrás = modo. 怎么样 CERRANDO la frase, sin verbo a la vista = valoración. Además 怎么样 es literalmente "cómo-aspecto": pide el ASPECTO de algo.',
          'Tip del Overseer: 你怎么样？ es el salto que abre conversación en cualquier túnel: "¿tú qué tal?". Guárdalo junto a 你好吗 — mismo músculo, un pelo más curioso.',
        ], [
          ['你怎么去学校？', 'nǐ zěnme qù xuéxiào?', '¿Cómo vas a la escuela?'],
          ['今天怎么样？', 'jīntiān zěnmeyàng?', '¿Qué tal hoy?'],
          ['你怎么样？', 'nǐ zěnmeyàng?', '¿Tú qué tal?'],
        ]),
        grammar('n-dou1', '都 y 些: el todo y los algunos', [
          '都 (dōu) = "todo, todos". Su puesto en la formación es entre el sujeto y el verbo: S + 都 + V. 我们都去 = "todos vamos". Ni un paso más atrás, ni uno más adelante.',
          '都 siempre mira HACIA ATRÁS: abarca al grupo que tiene a su izquierda (我们都… = todos nosotros). Por eso antes de usarlo necesitas un grupo a la izquierda — con un solitario no hay nada que abarcar.',
          '些 (xiē) = "algunos, unos": el medidor de multitudes vagas. Nunca camina solo: va agarrado de 这/那 → 这些 (zhèxiē, "estos") y 那些 (nàxiē, "esos"). 这些东西很好 = "estas cosas son buenas" — dos caracteres, dos sílabas, una sola palabra.',
          'Tip del Overseer: el error de novato es colar 都 detrás del verbo (✗ 我们去都). El hueco correcto es ANTES: 我们都去北京. Y junto al 看见 del sector queda una frase de morador sólido: 我们都看见他.',
        ], [
          ['我们都去北京。', 'wǒmen dōu qù Běijīng.', 'Todos vamos a Pekín.'],
          ['这些东西很好。', 'zhèxiē dōngxi hěn hǎo.', 'Estas cosas son muy buenas.'],
          ['我们都看见他。', 'wǒmen dōu kànjiàn tā.', 'Todos lo vemos.'],
        ]),
      ],
    ),
    lesson(
      'm9c-l3',
      'Llueve y no pasa nada',
      'grammar',
      [
        ...drill('w-xia-yu'),
        ...drill('w-wei4'),
        ...drill('w-mei-guan-xi'),
        noteStep('n-wei4'),
        build('今天下雨。', 'jīntiān xiàyǔ.', 'Hoy llueve.'),
        build('今天中午下雨。', 'jīntiān zhōngwǔ xiàyǔ.', 'Hoy llueve al mediodía.'),
        build('喂，你叫什么名字？', 'wèi, nǐ jiào shénme míngzi?', 'Diga, ¿cómo te llamas?'),
      ],
      [
        grammar('n-wei4', '喂 (wèi): el protocolo de la llamada', [
          '喂 (wèi) es el "¿Diga?" chino: se dice AL DESCOLGAR, ni un segundo antes. Por teléfono es tu primera palabra y también la de quien llama. Cara a cara no sirve: en persona se saluda con 你好, y responder 喂 delante de alguien delata que llevas demasiados turnos de guardia con el auricular.',
          'El ritual completo de una llamada del refugio: 喂 para abrir → la conversación → y si algo se tuerce (se corta, no se oye, falla la radio), 没关系 (méi guānxi) = "no pasa nada". Se cierra con 谢谢, como toda cortesía que se precie.',
          '没关系 es literalmente "no tener relación": lo que pasó no te toca. Es también la respuesta estándar a 对不起 (duìbùqǐ): perdón → no pasa nada. La pareja de cortesía perfecta, sin rencor y sin expediente.',
          '下雨 (xiàyǔ) = "caer-lluvia". El chino no necesita sujeto para la lluvia: el cielo (天) está sobreentendido y el verbo trabaja solo — 天下雨. Con el tiempo delante queda aún más claro: 今天下雨 = "hoy llueve", 今天中午下雨 = "hoy llueve al mediodía".',
          'Tip del Overseer: guarda la secuencia tal cual suena: 喂，你叫什么名字？ — abrir y preguntar en una sola línea. Así se estrena cualquier teléfono que encuentres en el yermo.',
        ], [
          ['喂，你叫什么名字？', 'wèi, nǐ jiào shénme míngzi?', 'Diga, ¿cómo te llamas?'],
          ['今天下雨。', 'jīntiān xiàyǔ.', 'Hoy llueve.'],
          ['对不起。没关系。', 'duìbùqǐ. méi guānxi.', 'Perdón. — No pasa nada.'],
        ]),
      ],
    ),
    lesson(
      'm9c-l4',
      'Auditoría del Sector 11',
      'review',
      [
        match('w-shui2-who', 'w-zen-me', 'w-xia-yu', 'w-dou1'),
        match('w-zen-me-yang', 'w-zhong-wu', 'w-wei4', 'w-mei-guan-xi'),
        { type: 'listen', entry: 'w-zhong-wu' },
        { type: 'listen', entry: 'w-mei-guan-xi' },
        dictate('w-kan-jian'),
        typeP('w-zen-me'),
        build('我看见他。', 'wǒ kànjiàn tā.', 'Lo veo.'),
        build('我们都去北京。', 'wǒmen dōu qù Běijīng.', 'Todos vamos a Pekín.'),
      ],
    ),
  ],
}
