/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 32 · HSK 3 — CUALIDADES Y GRADOS (módulo 5/10)

   De "limpio" a "increíble": el chino que afina cómo son las cosas. El
   catálogo de cualidades (干净, 清楚, 认真…), la escalera del grado
   (很 < 比较 < 更 < 极了) y los dos "de" que dicen CÓMO: 地 (el adverbio)
   y 得 (el complemento de grado).
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m25: VaultModule = {
  id: 'm25',
  hsk: 3,
  code: 'S-32',
  title: 'Cualidades y grados',
  subtitle: 'De "limpio" a "increíble": afinar cómo es todo',
  entries: [
    e('w-gan-jing', '干净', 'gānjìng', 'limpio', '✨'),
    e('w-qing-chu', '清楚', 'qīngchu', 'claro, nítido', '🔍', 'la segunda sílaba va sin tono'),
    e('w-ren-zhen', '认真', 'rènzhēn', 'serio, aplicado', '📖'),
    e('w-nu-li', '努力', 'nǔlì', 'esforzarse, aplicado', '💪'),
    e('w-jian-dan', '简单', 'jiǎndān', 'simple, sencillo', '🧩'),
    e('w-rong-yi', '容易', 'róngyì', 'fácil', '😌'),
    e('w-nan2-hard', '难', 'nán', 'difícil', '🧗'),
    e('w-cong-ming', '聪明', 'cōngming', 'listo, inteligente', '🧠', 'la segunda sílaba va sin tono'),
    e('w-de-adv', '地', 'de', 'partícula adverbial (como, -mente)', '🔤', 'V + 地 + ACCIÓN: 慢慢地走'),
    e('w-ji2', '极', 'jí', 'extremadamente', '🌟', 'ADJ + 极了 = brutal'),
    e('w-duo-me', '多么', 'duōme', '¡cuánto!, qué tan', '🎊', 'exclamativo'),
    e('w-bi-jiao', '比较', 'bǐjiào', 'comparativamente, bastante', '⚖️'),
    e('w-man-yi', '满意', 'mǎnyì', 'satisfecho', '🙂'),
    e('w-fang-bian', '方便', 'fāngbiàn', 'conveniente, cómodo', '🚌'),
    e('w-xin-xian', '新鲜', 'xīnxiān', 'fresco', '🥬'),
    e('w-qi-guai', '奇怪', 'qíguài', 'extraño, raro', '🤨'),
    e('w-re-qing', '热情', 'rèqíng', 'entusiasta, acogedor', '🔥'),
    e('w-huai4', '坏', 'huài', 'malo, roto', '💔', 'la pareja de 好'),
    e('w-di1', '低', 'dī', 'bajo (volumen, precio, posición)', '🔉', 'la pareja de 高'),
    e('w-jiu3-long', '久', 'jiǔ', 'mucho tiempo, largo tiempo', '⏳'),
    e('w-geng4', '更', 'gèng', 'aún más, todavía más', '📈'),
    e('w-a5', '啊', 'a', 'partícula exclamativa', '❗', 'sin tono'),
    e('w-an-jing', '安静', 'ānjìng', 'tranquilo, en silencio', '🤫'),
  ],
  lessons: [
    lesson(
      'm25-l1',
      'El informe del inspector',
      'vocab',
      [
        ...drill('w-gan-jing'),
        ...drill('w-qing-chu'),
        ...drill('w-an-jing'),
        ...drill('w-huai4'),
        noteStep('n-pin-zhi'),
        build('这个房间很干净。', 'zhège fángjiān hěn gānjìng.', 'Esta habitación está muy limpia.'),
        build('请安静！', 'qǐng ānjìng!', '¡Silencio, por favor!'),
      ],
      [
        grammar('n-pin-zhi', 'Los adjetivos del inspector: calidad de serie', [
          'El informe del inspector no dice "está limpio" con rodeos: en chino el adjetivo ES el verbo (S-09). El molde de todo el sector: SUJETO + 很 + ADJETIVO, sin ser ni estar. 这个房间很干净 = "esta habitación está muy limpia". ✗房间是干净 — el 是 no entra en el informe de calidad · ✓房间很干净.',
          'Las cuatro fichas de la primera inspección: 干净 (gānjìng, limpio — el brillo del suelo), 清楚 (qīngchu, claro y nítido — para fotos, letras y explicaciones), 安静 (ānjìng, tranquilo, en silencio — el silencio de las bibliotecas) y 坏 (huài, malo, roto — la pareja oscura de 好, S-01).',
          '坏 tiene un superpoder con 了 (S-13): 电脑坏了 = "el ordenador SE HA ROTO" — antes funcionaba, ahora no: cambio de estado certificado. Y 安静 tiene su frase de protocolo: 请安静！ — "¡silencio, por favor!" — el cartel universal de bibliotecas y hospitales desde Pekín hasta el último refugio.',
          'Tip del Overseer: este sector entero afina una sola pregunta: ¿cómo ES la cosa y CUÁNTO lo es? El informe del inspector no admite un "normal": todo tiene cualidad y todo tiene grado. Los grados llegan en la tercera lección.',
        ], [
          ['这个房间很干净。', 'zhège fángjiān hěn gānjìng.', 'Esta habitación está muy limpia.'],
          ['请安静！', 'qǐng ānjìng!', '¡Silencio, por favor!'],
          ['我的电脑坏了。', 'wǒ de diànnǎo huài le.', 'Mi ordenador se ha roto.'],
        ]),
      ],
    ),
    lesson(
      'm25-l2',
      'Fácil, difícil, listo',
      'vocab',
      [
        ...drill('w-jian-dan'),
        ...drill('w-rong-yi'),
        ...drill('w-nan2-hard'),
        ...drill('w-cong-ming'),
        ...drill('w-ren-zhen'),
        ...drill('w-nu-li'),
        noteStep('n-nan-yi'),
        build('这次考试很难。', 'zhè cì kǎoshì hěn nán.', 'Este examen es difícil. (次 cì = vez, para ocasiones · 考试 kǎoshì = examen)'),
        build('我的同学很认真。', 'wǒ de tóngxué hěn rènzhēn.', 'Mi compañero de clase es muy serio.'),
      ],
      [
        grammar('n-nan-yi', '简单, 容易, 难: el eje de la dificultad', [
          'Tres palabras miden lo mismo desde ángulos distintos. 简单 (jiǎndān, simple) habla de la ESTRUCTURA de la cosa: una pregunta simple tiene pocas piezas. 容易 (róngyì, fácil) habla del ESFUERZO de hacerla: subir escaleras es fácil para unos y cuesta a otros. Muchas veces son intercambiables — 中文很简单 y 中文很容易 suenan igual de bien — pero el matiz persiste: la cosa ES 简单; hacerla ES 容易.',
          '难 (nán) es el muro: difícil. Y con los exámenes del sector suena la frase clásica: 这次考试很难 — 次 (cì, S-23) cuenta ocasiones ("esta vez"), 考试 (kǎoshì) es el examen. El muro también tiene su otro lado: 不难 ("no es difícil") — la negación que anima a los moradores.',
          'Y el trío del estudiante, en orden de mérito: 聪明 (cōngming, listo — el talento con el que naces), 认真 (rènzhēn, serio y aplicado — la actitud: hacer las cosas CON atención) y 努力 (nǔlì, esforzarse — el sudor, que funciona como verbo y como adjetivo). 我的同学很认真 = "mi compañero es muy aplicado". El proverbio no escrito del refugio: el 聪明 se agradece, pero el 努力 paga la luz.',
          'Tip del Overseer: en tu informe semanal hay tres preguntas distintas — ¿fue 简单 (la tarea)? ¿fue 容易 (hacerla)? ¿fue 难? El matiz del informe es el matiz del idioma.',
        ], [
          ['这次考试很难。', 'zhè cì kǎoshì hěn nán.', 'Este examen es difícil. (考试 kǎoshì = examen)'],
          ['我的同学很认真。', 'wǒ de tóngxué hěn rènzhēn.', 'Mi compañero de clase es muy serio.'],
          ['这个问题很简单。', 'zhège wèntí hěn jiǎndān.', 'Esta pregunta es muy sencilla. (问题 wèntí = pregunta, S-28)'],
        ]),
      ],
    ),
    lesson(
      'm25-l3',
      'El grado exacto',
      'grammar',
      [
        ...drill('w-bi-jiao'),
        ...drill('w-geng4'),
        ...drill('w-ji2'),
        ...drill('w-duo-me'),
        ...drill('w-a5'),
        noteStep('n-geng-duo'),
        build('今天更冷了。', 'jīntiān gèng lěng le.', 'Hoy hace aún más frío.'),
        build('这个蛋糕多么大啊！', 'zhège dàngāo duōme dà a!', '¡Qué tarta tan grande!'),
      ],
      [
        grammar('n-geng-duo', 'La escalera del grado: 很 < 比较 < 更 < 极了', [
          'El chino gradúa los adjetivos con una escalera de cuatro peldaños. El primero ya es tuyo: 很 (S-01) = "muy". Segundo peldaño: 比较 (bǐjiào, bastante) — literalmente "comparado": mejor que la media, sin exagerar. Tercero: 更 (gèng) = "aún más" — y aquí la regla de oro: 更 NECESITA un rival. O hay una comparación con 比 (S-17) — 我比你高, incluso 我比他更高 — o el contexto trae el eco: hoy frente a ayer, este frente a aquel.',
          '今天更冷了 = "hoy hace aún MÁS frío" — ¿más que qué? Que ayer, que lo previsto: el rival lo trae la situación. Y fíjate en el 了 (S-13): el frío HA SUBIDO — cambio de estado certificado. Ojo al cruce prohibido: ✗更很冷 — 很 y 更 no se apilan; cada peldaño se pisa solo.',
          'El cuarto peldaño va DESPUÉS del adjetivo: 极了 (jí le) = "extremadamente". 中文难极了 = "el chino es dificilísimo". El español intensifica delante (muy, súper); el chino remata detrás con 极了. Y para la exageración con admiraciones: 多么 (duōme) + ADJ + 啊 (a): 这个蛋糕多么大啊！ = "¡qué tarta tan grande!". 啊 es la partícula exclamativa: sin tono, suelta al final de la frase como el broche de la sorpresa.',
          'Tip del Overseer: la escalera completa, de memoria — 很 < 比较 < 更 (con rival) < 极了 (remate). Antes de hablar, decide en qué peldaño está la cosa: la precisión del grado es la diplomacia del idioma.',
        ], [
          ['今天更冷了。', 'jīntiān gèng lěng le.', 'Hoy hace aún más frío.'],
          ['中文难极了。', 'zhōngwén nán jí le.', 'El chino es dificilísimo.'],
          ['这个蛋糕多么大啊！', 'zhège dàngāo duōme dà a!', '¡Qué tarta tan grande!'],
        ]),
      ],
    ),
    lesson(
      'm25-l4',
      'El taller de matices',
      'grammar',
      [
        ...drill('w-man-yi'),
        ...drill('w-fang-bian'),
        ...drill('w-xin-xian'),
        ...drill('w-qi-guai'),
        ...drill('w-re-qing'),
        ...drill('w-di1'),
        ...drill('w-jiu3-long'),
        ...drill('w-de-adv'),
        noteStep('n-DE-complement'),
        build('他说得很清楚。', 'tā shuō de hěn qīngchu.', 'Habla muy claro. (V + 得 de + juicio: el cómo de la acción)'),
        build('他慢慢地说话。', 'tā mànmàn de shuōhuà.', 'Habla despacio. (慢慢地 = ADJ doblado + 地: el estilo de la acción)'),
      ],
      [
        grammar('n-DE-complement', '地 y 得: los dos "de" del CÓMO', [
          'Ese sonido "de" lo conoces con otro oficio: 的, el posesivo (S-02). Pues la familia tiene tres hermanos idénticos de voz: 的 (posesivo), 地 (adverbio) y 得 (complemento de grado). Los tres se dicen "de" — y solo el sitio que ocupan en la frase los distingue. Este sector presenta a los dos nuevos.',
          '得 (de) monta el COMPLEMENTO DE GRADO: describe CÓMO va la acción. El molde: VERBO + 得 + ADJETIVO. 他说得很清楚 = "habla muy claro" — el 得 cabalga ENTRE el verbo y el veredicto. ✗她很快跑 — el "cómo" no va suelto delante · ✓她跑得很快. El verbo actúa; el 得 firma la calidad de la actuación. Y admite negativa: 他说得不清楚 = "no habla claro".',
          '地 (de) es el adverbio: convierte una palabra en el CÓMO que ANTES del verbo. El molde: (ADJ o ADJ doblado) + 地 + VERBO. 慢慢地走 (慢, S-17) = "caminar despacio" — literalmente "despacio-caminar". 我认真地学习 = "estudio con seriedad". La regla de posición para no perderse: 地 va ANTES del verbo (prepara el estilo); 得 va DESPUÉS (evalúa la acción). Uno es el plan de vuelo; el otro, el informe de la misión. El 跑 de S-20 lo clava: 他跑得很快 = "corre rapidísimo".',
          'El almacén del taller, de pasada: 满意 (mǎnyì, satisfecho — el gesto del Overseer con tu informe), 方便 (fāngbiàn, conveniente — horarios, planes, transportes), 新鲜 (xīnxiān, fresco — comida y noticias), 奇怪 (qíguài, extraño), 热情 (rèqíng, entusiasta — la calidez con que la superficie recibe a los moradores), 低 (dī, bajo — para volumen, precios y posiciones; el 矮 de S-29 solo medía estaturas) y 久 (jiǔ, largo tiempo). Siete adjetivos más para el mismo molde de S-09.',
          'Tip del Overseer: cuando quieras decir "lo hizo BIEN, MAL o RÁPIDO", el 得 es obligatorio: verbo + 得 + veredicto. Sin 得, el adjetivo se queda mirando la acción desde la barrera.',
        ], [
          ['他说得很清楚。', 'tā shuō de hěn qīngchu.', 'Habla muy claro.'],
          ['他慢慢地说话。', 'tā mànmàn de shuōhuà.', 'Habla despacio.'],
          ['我认真地学习。', 'wǒ rènzhēn de xuéxí.', 'Estudio con seriedad.'],
        ]),
      ],
    ),
    lesson(
      'm25-l5',
      'Auditoría del Sector 32',
      'review',
      [
        match('w-gan-jing', 'w-qing-chu', 'w-an-jing', 'w-huai4'),
        match('w-jian-dan', 'w-rong-yi', 'w-nan2-hard', 'w-cong-ming'),
        match('w-ren-zhen', 'w-nu-li', 'w-man-yi', 'w-fang-bian'),
        match('w-xin-xian', 'w-qi-guai', 'w-re-qing', 'w-di1', 'w-jiu3-long'),
        match('w-geng4', 'w-bi-jiao', 'w-ji2', 'w-duo-me', 'w-a5', 'w-de-adv'),
        { type: 'listen', entry: 'w-di1' },
        { type: 'listen', entry: 'w-xin-xian' },
        dictate('w-gan-jing'),
        dictate('w-cong-ming'),
        typeP('w-nu-li'),
        build('这次考试很难。', 'zhè cì kǎoshì hěn nán.', 'Este examen es difícil. (考试 kǎoshì = examen)'),
        build('他说得很清楚。', 'tā shuō de hěn qīngchu.', 'Habla muy claro. (V + 得 de + juicio: el cómo de la acción)'),
        ...practice('w-geng4'),
        ...practice('w-re-qing'),
      ],
    ),
  ],
}
