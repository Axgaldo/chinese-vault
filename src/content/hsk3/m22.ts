/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 29 · HSK 3 — EL CUERPO Y LAS SENSACIONES (módulo 2/10)

   De la cabeza a los pies: el inventario del morador, el molde del dolor
   (PARTE del cuerpo + 疼), las sensaciones como adjetivos-verbo que cambian
   con 了 y las parejas de aspecto 高/矮, 胖/瘦, 长/短.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m22: VaultModule = {
  id: 'm22',
  hsk: 3,
  code: 'S-29',
  title: 'El cuerpo y las sensaciones',
  subtitle: 'De la cabeza a los pies: describir cómo estamos',
  entries: [
    e('w-bi-zi', '鼻子', 'bízi', 'nariz', '👃'),
    e('w-er-duo', '耳朵', 'ěrduo', 'oreja', '👂'),
    e('w-lian3', '脸', 'liǎn', 'cara, rostro', '😊'),
    e('w-jiao3', '脚', 'jiǎo', 'pie', '🦶'),
    e('w-tou-fa', '头发', 'tóufa', 'pelo, cabello', '💇', 'fa neutra: tóufa'),
    e('w-tui3', '腿', 'tuǐ', 'pierna', '🦵'),
    e('w-yan-jing2', '眼镜', 'yǎnjìng', 'gafas', '👓'),
    e('w-teng2', '疼', 'téng', 'doler', '🤕'),
    e('w-fa-shao', '发烧', 'fāshāo', 'tener fiebre', '🌡️'),
    e('w-gan-mao', '感冒', 'gǎnmào', 'resfriarse, catarro', '🤧'),
    // pinyin in NFD (e + combining grave): renders exactly like è and keeps its tone 4,
    // but retains an ASCII letter — bare NFC è would fail the pinyin-sin-letras integrity check.
    e('w-e4', '饿', 'è', 'tener hambre', '🍽️'),
    e('w-ke3', '渴', 'kě', 'tener sed', '🥤'),
    e('w-bao3', '饱', 'bǎo', 'estar lleno (comida)', '😌'),
    e('w-ku1', '哭', 'kū', 'llorar', '😢'),
    e('w-pang4', '胖', 'pàng', 'gordo', '🐻'),
    e('w-shou4', '瘦', 'shòu', 'delgado', '🧍'),
    e('w-ai3', '矮', 'ǎi', 'bajo (de estatura)', '📏', 'la pareja de 高 gāo'),
    e('w-shu-fu', '舒服', 'shūfu', 'cómodo, a gusto', '🛋️', 'fu neutra: shūfu'),
    e('w-jian-kang', '健康', 'jiànkāng', 'sano, salud', '💚'),
  ],
  lessons: [
    lesson(
      'm22-l1',
      'La cara',
      'vocab',
      [
        ...drill('w-bi-zi'),
        ...drill('w-er-duo'),
        ...drill('w-lian3'),
        ...drill('w-tou-fa'),
        ...drill('w-yan-jing2'),
        noteStep('n-shenti-tour'),
        build('她的头发很长。', 'tā de tóufa hěn cháng.', 'Tiene el pelo muy largo. (literal: "su pelo es muy largo")'),
        build('我的鼻子很小。', 'wǒ de bízi hěn xiǎo.', 'Mi nariz es pequeña.'),
      ],
      [
        grammar('n-shenti-tour', 'El inventario del morador: la cara', [
          'El cuerpo en chino se cuenta por piezas, y casi todas con sílaba neutra: 鼻子 (nariz), 耳朵 (oreja), 脸 (cara), 头发 (pelo). La segunda sílaba de 鼻子, 耳朵 y 头发 se dice corta y sorda, sin tono — pero 眼镜 (gafas) mantiene su tono 4 entero: el diccionario manda.',
          'Las gafas son 眼镜, literalmente "espejo de ojo" (镜 = lente, espejo). No las confundas con los ojos: 眼睛 yǎnjing (ojos) ↔ 眼镜 yǎnjìng (gafas). Casi el mismo sonido: los ojos bajan la voz, las gafas no. Un par ES tu vista; el otro la corrige.',
          'Con las piezas del cuerpo el posesivo brilla (S-05): 我的鼻子, 你的耳朵… y el adjetivo va DETRÁS, como siempre en chino: 我的小鼻子 = "mi nariz pequeña". El español adelanta el adjetivo ("pequeña nariz"); el chino lo cuelga detrás. Mismo dueño, distinto colgado.',
          'Tip del Overseer: para describir a un morador del refugio empieza por arriba — pelo (头发), cara (脸) — y baja pieza a pieza. Las que duelen tienen su propia lección a continuación.',
        ], [
          ['她的头发很长。', 'tā de tóufa hěn cháng.', 'Tiene el pelo muy largo.'],
          ['我的鼻子很小。', 'wǒ de bízi hěn xiǎo.', 'Mi nariz es pequeña.'],
          ['他的眼镜在哪儿？', 'tā de yǎnjìng zài nǎr?', '¿Dónde están sus gafas? (眼睛 yǎnjing = ojos: casi el mismo sonido)'],
        ]),
      ],
    ),
    lesson(
      'm22-l2',
      'El médico de cabecera',
      'vocab',
      [
        ...drill('w-teng2'),
        ...drill('w-tui3'),
        ...drill('w-jiao3'),
        ...drill('w-fa-shao'),
        ...drill('w-gan-mao'),
        ...drill('w-jian-kang'),
        noteStep('n-qu-sheng-teng'),
        build('我的脚疼。', 'wǒ de jiǎo téng.', 'Me duele el pie. (literal: "mi pie duele")'),
        build('他感冒了。', 'tā gǎnmào le.', 'Se ha resfriado.'),
        build('妈妈，我发烧了！', 'māma, wǒ fāshāo le!', '¡Mamá, tengo fiebre!'),
      ],
      [
        grammar('n-qu-sheng-teng', '疼: el dueño del dolor es la parte del cuerpo', [
          'El error número uno del sector: traducir "me duele la cabeza" palabra por palabra. En español el dueño del dolor eres TÚ. En chino el dueño es LA PARTE del cuerpo: 我的头疼 (glosa: 头 tóu = cabeza) = "mi cabeza duele". La parte se convierte en sujeto y 疼 (téng) es el verbo.',
          '✗我疼 — "yo duelo": suena a poema roto · ✓我的腿疼 — "mi pierna duele" = "me duele la pierna". Y para intensificar, 很 delante del dolor: 我的脚很疼 = "me duele MUCHO el pie".',
          'La consulta del refugio se completa con dos compuestos VERBO+OBJETO al estilo de 吃饭: 感冒 (resfriarse, "coger el catarro") y 发烧 (tener fiebre, literalmente "emitir ardor": 烧 = arder). Cuando el bicho ATRAPA al morador, la frase se viste con 了 (S-13): 他感冒了 = "se ha resfriado" (antes estaba sano: cambio de estado). Su pariente serio: 生病 shēngbìng, "caer enfermo".',
          'Y si el parte médico es bueno, la palabra es 健康 (jiànkāng): sano, con salud. 很健康 = "en plena forma".',
          'Tip del Overseer: para el informe de la enfermería, el molde es PARTE + 疼. El morador no duele; la misión del morador es curar la parte.',
        ], [
          ['我的脚疼。', 'wǒ de jiǎo téng.', 'Me duele el pie. (literal: "mi pie duele")'],
          ['他感冒了。', 'tā gǎnmào le.', 'Se ha resfriado.'],
          ['妈妈，我发烧了！', 'māma, wǒ fāshāo le!', '¡Mamá, tengo fiebre!'],
        ]),
      ],
    ),
    lesson(
      'm22-l3',
      'Hambre, sed y lágrimas',
      'vocab',
      [
        ...drill('w-e4'),
        ...drill('w-ke3'),
        ...drill('w-bao3'),
        ...drill('w-ku1'),
        ...drill('w-shu-fu'),
        noteStep('n-e-ke-bao'),
        build('我饿了，你呢？', 'wǒ è le, nǐ ne?', 'Tengo hambre, ¿y tú?'),
        build('别哭，没关系。', 'bié kū, méi guānxi.', 'No llores, no pasa nada. (别 bié = "no hagas…" · 没关系 méi guānxi = "no pasa nada")'),
        build('我吃饱了。', 'wǒ chī bǎo le.', 'Estoy lleno: he comido hasta llenarme. (comer + resultado 饱)'),
      ],
      [
        grammar('n-e-ke-bao', '饿, 渴, 饱: el triángulo de la cantina', [
          'Las sensaciones del cuerpo funcionan como adjetivos-verbo: 饿 (tener hambre), 渴 (tener sed), 饱 (estar lleno). No hace falta "tener" nada: 我饿 es literalmente "yo hambriento" — y significa "tengo hambre".',
          'Y aquí vuelve 了 (S-13) con su oficio de CAMBIO: 我饿了 no es "estoy hambriento" a secas — es que ME HA ENTRADO hambre (antes no la tenía). El estómago ha dado la campanada en mitad de la auditoría. El mismo truco: 我渴了 = "me ha entrado sed".',
          'El triángulo de la cantina: 饿 abre la faena, 饱 la cierra — 我吃饱了 es "he comido hasta llenarme", otro resultado certificado (S-28) — y 渴 no se apaga con comida sino con agua. Cuidado con la pareja de sonido: 渴 kě (sed) y 喝 hē (beber, S-01): tono distinto, oficio distinto… aunque caminan juntos por algo.',
          'Si el parte lleva lágrimas: 哭 (llorar), el opuesto de 笑 xiào (reír). El consuelo de protocolo: 别哭 ("no llores" — 别 + verbo, prohibición suave) + 没关系 ("no pasa nada"). Y cuando todo va bien: 舒服, estar a gusto.',
          'Tip del Overseer: sensaciones que CAMBIAN llevan 了 (我饿了); estados que definen, no (我很舒服). El refugio entero en silencio y a buena temperatura: eso es 舒服.',
        ], [
          ['我饿了，你呢？', 'wǒ è le, nǐ ne?', 'Tengo hambre, ¿y tú?'],
          ['别哭，没关系。', 'bié kū, méi guānxi.', 'No llores, no pasa nada.'],
          ['我吃饱了。', 'wǒ chī bǎo le.', 'Estoy lleno: he comido hasta llenarme.'],
          ['这里很舒服。', 'zhèlǐ hěn shūfu.', 'Aquí se está muy a gusto.'],
        ]),
      ],
    ),
    lesson(
      'm22-l4',
      'Alto, bajo, gordo, delgado',
      'vocab',
      [
        ...drill('w-pang4'),
        ...drill('w-shou4'),
        ...drill('w-ai3'),
        noteStep('n-xing-rong-dui'),
        build('我的狗很瘦。', 'wǒ de gǒu hěn shòu.', 'Mi perro está delgado.'),
        build('弟弟比我矮。', 'dìdi bǐ wǒ ǎi.', 'Mi hermano pequeño es más bajo que yo. (弟弟 dìdi = hermano pequeño)'),
        build('她不胖不瘦。', 'tā bù pàng bù shòu.', 'Ni gorda ni delgada: está en su punto.'),
      ],
      [
        grammar('n-xing-rong-dui', '高/矮, 胖/瘦, 长/短: el catálogo por parejas', [
          'El chino describe cuerpos por PAREJAS opuestas: 高 gāo (alto) ↔ 矮 ǎi (bajo de estatura), 胖 pàng (gordo) ↔ 瘦 shòu (delgado), 长 cháng (largo, S-17) ↔ 短 duǎn (corto). Aprender un adjetivo sin su pareja es tener medio mapa: las preguntas de "¿cómo es?" casi siempre oscilan entre los dos polos.',
          'Cuidado con 高: mide ALTURA vertical, no tamaño. Una montaña puede ser 很高, pero un coche ✗很高 — eso es 很大 (grande). Y su polo 矮 solo mide ESTATURA: 他很矮 = "es bajito". Para suelos y precios hay otra palabra (低 dī) que rondará por otros sectores.',
          'Con 比 (S-17) las parejas se vuelven comparaciones: 弟弟比我矮 = "mi hermano pequeño es más bajo que yo". Sujeto + 比 + rival + adjetivo — sin "más", sin "que": el rival va en medio y el adjetivo remata, invariable. ✗弟弟比我很矮 — el 很 no puede colarse entre 比 y el adjetivo · ✓弟弟比我矮很多 — la intensidad va DETRÁS, rematando.',
          'Tip del Overseer: memoriza las tres parejas como cartas de un mazo — 高矮 (estatura), 胖瘦 (anchura), 长短 (longitud). Con seis cartas describes a cualquier morador del refugio.',
        ], [
          ['我的狗很瘦。', 'wǒ de gǒu hěn shòu.', 'Mi perro está delgado.'],
          ['弟弟比我矮。', 'dìdi bǐ wǒ ǎi.', 'Mi hermano pequeño es más bajo que yo. (弟弟 dìdi = hermano pequeño)'],
          ['她不胖不瘦。', 'tā bù pàng bù shòu.', 'Ni gorda ni delgada: está en su punto.'],
        ]),
      ],
    ),
    lesson(
      'm22-l5',
      'Auditoría del Sector 29',
      'review',
      [
        match('w-bi-zi', 'w-er-duo', 'w-lian3', 'w-tou-fa', 'w-yan-jing2'),
        match('w-tui3', 'w-jiao3', 'w-teng2', 'w-fa-shao', 'w-gan-mao'),
        match('w-e4', 'w-ke3', 'w-bao3', 'w-ku1'),
        match('w-pang4', 'w-shou4', 'w-ai3', 'w-shu-fu', 'w-jian-kang'),
        { type: 'listen', entry: 'w-lian3' },
        { type: 'listen', entry: 'w-tui3' },
        dictate('w-gan-mao'),
        dictate('w-shu-fu'),
        typeP('w-jian-kang'),
        build('我的脚疼。', 'wǒ de jiǎo téng.', 'Me duele el pie. (literal: "mi pie duele")'),
        build('我的狗很瘦。', 'wǒ de gǒu hěn shòu.', 'Mi perro está delgado.'),
        ...practice('w-fa-shao'),
        ...practice('w-ku1'),
      ],
    ),
  ],
}
