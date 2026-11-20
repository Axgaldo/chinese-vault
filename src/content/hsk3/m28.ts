/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 35 · HSK 3 — CONECTORES Y MATICES (módulo 8/10)

   El chino que enlaza ideas: aunque… pero… (虽然…但是…), si… entonces…
   (如果…就…), además de (除了…以外), para (为了) y la caja de matices del
   refugio (总是, 突然, 终于, 只, 又, 一边…一边…). Los apuntes explican el
   MECANISMO de cada conector, con contrastes ✗/✓ bien/mal.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m28: VaultModule = {
  id: 'm28',
  hsk: 3,
  code: 'S-35',
  title: 'Conectores y matices',
  subtitle: 'Aunque, si y por eso: el chino que enlaza ideas',
  entries: [
    e('w-sui-ran', '虽然', 'suīrán', 'aunque', '🔗', 'va con 但是: 虽然…但是…'),
    e('w-ru-guo', '如果', 'rúguǒ', 'si (condicional)', '❓', '结果也 puede responder: 如果…就…'),
    e('w-er-qie', '而且', 'érqiě', 'además, y (añade)', '➕', 'añade y ESCALA: A而且B'),
    e('w-huo-zhe', '或者', 'huòzhě', 'o (opciones)', '🔀', 'preguntas y futuro; 还是 elige presente'),
    e('w-chu-le', '除了', 'chúle', 'excepto; además de', '🚫', '除了…以外'),
    e('w-guan-yu', '关于', 'guānyú', 'sobre, acerca de', '📄'),
    e('w-gen-ju', '根据', 'gēnjù', 'según, basándose en', '📊'),
    e('w-wei-le', '为了', 'wèile', 'para, con el fin de', '🎯', 'el PORQUÉ delante; 因为 el porque detrás'),
    e('w-dang-ran', '当然', 'dāngrán', 'por supuesto, claro', '💯'),
    e('w-jing-chang', '经常', 'jīngcháng', 'a menudo, frecuentemente', '🔁'),
    e('w-zhong-yu', '终于', 'zhōngyú', 'por fin, al fin', '😅'),
    e('w-tu-ran', '突然', 'tūrán', 'de repente', '⚡'),
    e('w-ma-shang', '马上', 'mǎshàng', 'ahora mismo, enseguida', '🏃'),
    e('w-zong-shi', '总是', 'zǒngshì', 'siempre', '♾️'),
    e('w-zui-jin', '最近', 'zuìjìn', 'últimamente, recientemente', '📅'),
    e('w-ji-hu', '几乎', 'jīhū', 'casi', '≈️'),
    e('w-qi-shi', '其实', 'qíshí', 'en realidad, la verdad es que', '🤫'),
    e('w-zhi3', '只', 'zhǐ', 'solo, solamente', '1️⃣', 'zhǐ (3er tono): solo eso y nada más'),
    e('w-you4', '又', 'yòu', 'otra vez; y…y (a la vez)', '🔁', '又A又B: guapo Y listo'),
    e('w-bi-xu', '必须', 'bìxū', 'deber, tener que', '❗', 'obligación dura, no cortesía'),
    e('w-ying-gai', '应该', 'yīnggāi', 'deber (consejo), debería', '💡', 'la obligación suave/amable'),
    e('w-yi-bian', '一边', 'yìbiān', 'a la vez que', '🎶', '一边V一边V: dos acciones a la vez'),
    e('w-zhu-yao', '主要', 'zhǔyào', 'principal, principalmente', '⭐'),
  ],
  lessons: [
    lesson(
      'm28-l1',
      'Aunque… pero…',
      'vocab',
      [
        ...drill('w-sui-ran'),
        ...drill('w-ru-guo'),
        ...drill('w-huo-zhe'),
        ...drill('w-er-qie'),
        noteStep('n-suiran-danshi'),
        build('虽然很难，但是我学习中文。', 'suīrán hěn nán, dànshì wǒ xuéxí zhōngwén.', 'Aunque es difícil, aprendo chino.'),
        build('如果明天下雨，我们就不去。', 'rúguǒ míngtiān xiàyǔ, wǒmen jiù bú qù.', 'Si mañana llueve, no vamos.'),
      ],
      [
        grammar('n-suiran-danshi', '虽然…但是…: el conector que CIERRA el contraste', [
          'El español ABRE el contraste con "aunque" y lo deja caer con elegancia: "aunque está ocupado, vino". El chino no se fía de los finales abiertos: enciende la concesión con 虽然 y la CIERRA con 但是. 虽然…但是… es un paréntesis con dos firmas: donde el español deja la segunda mitad sobreentendida, el chino la sella. Por eso 虽然 viaja casi siempre acompañado: suelto suena a informe a medias.',
          'El contraste del sector: ✗虽然他很忙，他不来 — sin 但是 la frase queda colgada, como un parte de misión sin veredicto · ✓虽然他很忙，但是他来了 — concesión y remate, circuito cerrado. Regla de bolsillo: si abriste con 虽然, el 但是 te está esperando más adelante.',
          'El hermano gemelo es el condicional: 如果…就… 如果 abre la condición y 就 marca el ENTONCES, pegado al verbo del resultado: 如果明天下雨，我们就不去 = "si mañana llueve, no vamos". Ese 就 (S-26) es el interruptor que conecta la condición con su consecuencia: sin él, la frase pierde el clic.',
          'Y el repaso de turno: 还是 (S-21) es el "o" de las PREGUNTAS que exigen elección inmediata — 你喝茶还是咖啡？; 或者 es el "o" de las afirmaciones y de los planes — 我想喝茶或者咖啡. 还是 pregunta; 或者 narra. Confundirlos es pedir respuesta donde nadie preguntó.',
          'Tip del Overseer: el chino cierra lo que abre. 虽然 busca su 但是, 如果 busca su 就, 因为 busca su 所以 (S-21). Toda concesión, condición y causa viaja con su pareja de baile: no las separes, morador.',
        ], [
          ['虽然他很忙，但是他来了。', 'suīrán tā hěn máng, dànshì tā lái le.', 'Aunque estaba muy ocupado, ha venido.'],
          ['如果明天不下雨，我就去。', 'rúguǒ míngtiān bù xiàyǔ, wǒ jiù qù.', 'Si mañana no llueve, voy.'],
          ['你喝茶还是咖啡？', 'nǐ hē chá háishì kāfēi?', '¿Tomas té o café? (还是: la pregunta que elige, S-21)'],
        ]),
      ],
    ),
    lesson(
      'm28-l2',
      'Y además…',
      'grammar',
      [
        ...drill('w-er-qie'),
        ...drill('w-chu-le'),
        ...drill('w-guan-yu'),
        ...drill('w-wei-le'),
        ...drill('w-gen-ju'),
        noteStep('n-erqie-chule'),
        build('这个饭馆很好，而且很便宜。', 'zhè ge fànguǎn hěn hǎo, érqiě hěn piányi.', 'Este restaurante es bueno y además barato.'),
        build('为了妈妈，我必须努力。', 'wèile māma, wǒ bìxū nǔlì.', 'Por mi madre, tengo que esforzarme.'),
      ],
      [
        grammar('n-erqie-chule', '而且, 除了…以外, 关于 y 为了: los engranajes que suman', [
          '而且 (érqiě) no es un "y" cualquiera: AÑADE y SUBE el listón. Solo funciona cuando las dos cosas son verdad y la segunda mejora la primera: 他很聪明，而且很努力 = "es listo y ADEMÁS aplicado" — la segunda pieza pesa más que la primera. Ojo: 和 (S-04) une NOMBRES (té y café); 而且 une frases y cualidades enteras.',
          '除了…以外 (chúle…yǐwài) es "aparte de": marca lo que queda FUERA de la lista y después lo que entra. 除了中文以外，我还学习数学 = "aparte de chino, también estudio matemáticas". Fíjate en el huésped: 还 (hái, "también") llega casi siempre con 除了 — primero lo de fuera, y lo de dentro entra con su 还. Sin ese 还, la frase sabe a poco.',
          '关于 (guānyú) + TEMA abre el expediente: coloca el asunto ANTES de opinar de él — 关于这个问题 ("sobre este problema") y luego tu informe. Es el "en cuanto a" del chino: primero la carpeta, después el contenido.',
          '为了 (wèile) es el PARA del propósito — el PORQUÉ va DELANTE: 为了妈妈，我必须努力 = "POR mi madre tengo que esforzarme". No lo confundas con 因为 (S-21): 因为 da la CAUSA de lo ocurrido; 为了 declara la FINALIDAD de lo que vas a hacer. Uno mira atrás; el otro, adelante. Y 根据 (gēnjù) cita la fuente: 根据地图 ("según el mapa"), 根据老师 ("según el profesor"). Sin fuente no hay informe.',
          'Tip del Overseer: antes de elegir engranaje, pregúntate qué une la frase — ¿suma calidad (而且)? ¿deja algo fuera (除了…以外)? ¿abre un tema (关于)? ¿declara un objetivo (为了)? ¿cita una fuente (根据)? Cinco herramientas, cinco misiones distintas. El kit completo del enlace, morador.',
        ], [
          ['他很聪明，而且很努力。', 'tā hěn cōngmíng, érqiě hěn nǔlì.', 'Es listo y además aplicado. (聪明 cōngmíng = listo, S-32)'],
          ['除了中文以外，我还学习数学。', 'chúle zhōngwén yǐwài, wǒ hái xuéxí shùxué.', 'Aparte de chino, también estudio matemáticas. (还 hái = también · 以外 yǐwài = aparte de)'],
          ['为了妈妈，我必须努力。', 'wèile māma, wǒ bìxū nǔlì.', 'Por mi madre, tengo que esforzarme.'],
        ]),
      ],
    ),
    lesson(
      'm28-l3',
      'El ritmo de la vida',
      'vocab',
      [
        ...drill('w-jing-chang'),
        ...drill('w-zong-shi'),
        ...drill('w-zui-jin'),
        ...drill('w-zhong-yu'),
        ...drill('w-tu-ran'),
        ...drill('w-ma-shang'),
        ...drill('w-ji-hu'),
        ...drill('w-dang-ran'),
        ...drill('w-qi-shi'),
        noteStep('n-pin-lu'),
        build('我最近很忙。', 'wǒ zuìjìn hěn máng.', 'Últimamente estoy muy ocupado.'),
        build('他终于完成了作业。', 'tā zhōngyú wánchéng le zuòyè.', 'Por fin ha terminado los deberes.'),
      ],
      [
        grammar('n-pin-lu', 'La escalera de la frecuencia: de 总是 a nunca', [
          'El sector monta la escalera completa de la constancia: 总是 (zǒngshì, SIEMPRE, sin excepción) > 经常 (jīngcháng, A MENUDO) > 有时候 (yǒu shíhou, A VECES — literalmente "tener momento") > 从不 (cóng bù, NUNCA — 从 "desde", S-25 + 不: "desde siempre no"). Cuatro peldaños y cualquier hábito del refugio queda medido.',
          'La posición es la de todo adverbio (S-20): DELANTE del verbo, detrás del sujeto — 他总是迟到 = "siempre llega tarde". ✗他迟到总是 — colgado al final, el oído chino no lo encuentra.',
          'Los tres interruptores del sector: 突然 (tūrán) es el que CORTA — 突然下雨了 = "de repente se puso a llover", sin aviso previo; 终于 (zhōngyú) es el alivio tras la espera larga — por fin llegó lo que costó; 马上 (mǎshàng) es la urgencia amable — "ahora mismo, enseguida", la promesa de quien ya está en camino.',
          'Y los dos matizadores: 几乎 (jīhū) = "casi", lo que por poco ocurre — 几乎一样 = "casi idéntico"; 其实 (qíshí) es la palabra de la confesión: revela lo contrario de lo esperado — 其实很简单 = "en realidad (pese a lo que creías) es fácil". Cierra el turno 当然 (dāngrán): "por supuesto", el sello de quien no duda.',
          'Tip del Overseer: cuando informes de un hábito, elige peldaño antes que verbo — ¿siempre (总是)? ¿a menudo (经常)? ¿a veces (有时候)? ¿nunca (从不)? La escalera dice más de ti que el verbo, morador.',
        ], [
          ['他总是迟到。', 'tā zǒngshì chídào.', 'Siempre llega tarde. (迟到 chídào = llegar tarde, S-34)'],
          ['突然下雨了。', 'tūrán xiàyǔ le.', 'De repente ha empezado a llover.'],
          ['他终于完成了作业。', 'tā zhōngyú wánchéng le zuòyè.', 'Por fin ha terminado los deberes.'],
        ]),
      ],
    ),
    lesson(
      'm28-l4',
      'Solo, otra vez y a la vez',
      'vocab',
      [
        ...drill('w-zhi3'),
        ...drill('w-you4'),
        ...drill('w-yi-bian'),
        ...drill('w-bi-xu'),
        ...drill('w-ying-gai'),
        ...drill('w-zhu-yao'),
        noteStep('n-zhi-you'),
        build('我又看见他了。', 'wǒ yòu kànjiàn tā le.', 'He vuelto a verlo.'),
        build('他一边吃饭，一边看书。', 'tā yìbiān chī fàn, yìbiān kàn shū.', 'Come y lee a la vez. (书 shū = libro, S-28)'),
      ],
      [
        grammar('n-zhi-you', '只, 又 y 一边: limitar, repetir, acompañar', [
          '只 (zhǐ, 3.er tono) LIMITA la cuenta: "solo eso y nada más". 我只有一个问题 = "solo tengo UNA pregunta" — recorta el inventario a lo nombrado y fuera todo lo demás. Es el dedo que separa lo que hay de lo que no entra en el parte.',
          '又 (yòu) tiene dos empleos, y el contexto decide. Delante de VERBO = OTRA VEZ: 他又来了 = "ha vuelto a venir", la repetición certificada. Entre dos adjetivos = A Y B A LA VEZ: 又便宜又好 = "barato Y bueno" — dos cualidades que caen juntas. El mismo carácter cuenta repeticiones o apila virtudes.',
          '一边…一边… (yìbiān…yìbiān…) es la simultaneidad pura: 一边 + VERBO + 一边 + VERBO — 他一边吃饭，一边看书 = "come y lee a la vez". Dos misiones ejecutándose en paralelo, como los dos monitores del puesto de mando.',
          'La pareja de la obligación: 必须 (bìxū) es la ley — la obligación dura, sin escapatoria ni excusa; 应该 (yīnggāi) es el consejo — el "deberías" amable del que te mira bien. 你必须休息 suena a orden médica; 你应该休息 suena a amigo. Y 主要 (zhǔyào) señala lo principal: 主要问题 = "el problema principal", lo que importa antes que nada.',
          'Tip del Overseer: antes de hablar de obligaciones, elige el uniforme — ¿ley (必须) o consejo (应该)? Con la ley no se negocia; con el consejo, sí. En el refugio las dos sobran, pero confundirlas cuesta caro, morador.',
        ], [
          ['我只有一个问题。', 'wǒ zhǐ yǒu yí ge wèntí.', 'Solo tengo una pregunta.'],
          ['这件衣服又便宜又好。', 'zhè jiàn yīfu yòu piányi yòu hǎo.', 'Esta ropa es barata y buena a la vez. (件 jiàn = clasificador de ropa, S-23)'],
          ['你应该休息。', 'nǐ yīnggāi xiūxi.', 'Deberías descansar. (休息 xiūxi = descansar, S-24)'],
        ]),
      ],
    ),
    lesson(
      'm28-l5',
      'Auditoría del Sector 35',
      'review',
      [
        match('w-sui-ran', 'w-ru-guo', 'w-huo-zhe', 'w-dang-ran'),
        match('w-er-qie', 'w-chu-le', 'w-guan-yu', 'w-wei-le', 'w-gen-ju'),
        match('w-jing-chang', 'w-zong-shi', 'w-zui-jin', 'w-zhong-yu'),
        match('w-tu-ran', 'w-ma-shang', 'w-ji-hu', 'w-qi-shi'),
        match('w-zhi3', 'w-you4', 'w-yi-bian', 'w-bi-xu', 'w-ying-gai', 'w-zhu-yao'),
        { type: 'listen', entry: 'w-sui-ran' },
        { type: 'listen', entry: 'w-er-qie' },
        dictate('w-zhong-yu'),
        dictate('w-jing-chang'),
        typeP('w-qi-shi'),
        build('虽然很难，但是我学习中文。', 'suīrán hěn nán, dànshì wǒ xuéxí zhōngwén.', 'Aunque es difícil, aprendo chino.'),
        build('他一边吃饭，一边看书。', 'tā yìbiān chī fàn, yìbiān kàn shū.', 'Come y lee a la vez. (书 shū = libro, S-28)'),
        ...practice('w-ru-guo'),
        ...practice('w-ma-shang'),
        ...practice('w-zhi3'),
      ],
    ),
  ],
}
