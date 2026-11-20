/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 26 · HSK 2 — MODALES Y GRAMÁTICA VIVA (módulo 14/15)

   El sector que cierra el vocabulario oficial HSK 2: el panel del poder
   (会/可以/可能/要), 告诉 con la persona en el hueco de oro, 着 la acción
   que acompaña, 就 el "pues entonces", V+完 el sello final y la fiesta
   del club con la escalera de intensidad de 非常.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m19e: VaultModule = {
  id: 'm19e',
  hsk: 2,
  code: 'S-26',
  title: 'Modales y gramática viva',
  subtitle: 'Puede que sea posible: el chino que decide, conecta y disfruta',
  entries: [
    e('w-ke-yi', '可以', 'kěyǐ', 'poder (permiso/capacidad)', '🆗'),
    e('w-ke-neng', '可能', 'kěnéng', 'posible; quizás', '🤔'),
    e('w-rang4', '让', 'ràng', 'dejar, permitir', '🙌'),
    // id disambiguated: m15 already owns w-jiu4 for 旧 (jiù "viejo"), so 就 spells w-jiu4-then.
    e('w-jiu4-then', '就', 'jiù', 'entonces; precisamente', '➡️'),
    e('w-dong3', '懂', 'dǒng', 'entender', '💡'),
    e('w-hui-da', '回答', 'huídá', 'responder, respuesta', '💬'),
    e('w-gao-su', '告诉', 'gàosu', 'contar, decir (a alguien)', '🗣️', 'gào su: decir A alguien'),
    e('w-huan-ying', '欢迎', 'huānyíng', 'dar la bienvenida', '🎈'),
    e('w-yao4-v', '要', 'yào', 'querer; ir a (futuro)', '❗'),
    e('w-zhe5', '着', 'zhe', 'partícula de acción en curso', '🎬', 'se escribe sin tono'),
    e('w-cuo4', '错', 'cuò', 'mal, equivocado', '❌'),
    e('w-fei-chang', '非常', 'fēicháng', 'extremadamente', '🔥'),
    e('w-wan2', '完', 'wán', 'terminar, acabar', '🏁'),
    e('w-xiao4', '笑', 'xiào', 'reír(se)', '😂'),
    e('w-chang-ge', '唱歌', 'chàng gē', 'cantar', '🎤'),
    e('w-tiao-wu', '跳舞', 'tiào wǔ', 'bailar', '💃'),
    e('w-ti1', '踢', 'tī', 'patear', '⚽'),
    e('w-da-lan-qiu', '打篮球', 'dǎ lánqiú', 'jugar al baloncesto', '🏀'),
  ],
  lessons: [
    lesson(
      'm19e-l1',
      'El puzzle de poder',
      'vocab',
      [
        ...drill('w-ke-yi'),
        ...drill('w-ke-neng'),
        ...drill('w-yao4-v'),
        noteStep('n-ke-neng-yao'),
        build('你可以去北京。', 'nǐ kěyǐ qù Běijīng.', 'Puedes ir a Pekín.'),
        build('明天可能下雨。', 'míngtiān kěnéng xiàyǔ.', 'Mañana quizás llueva.'),
      ],
      [
        grammar('n-ke-neng-yao', '会 · 可以 · 可能 · 要: el panel del poder', [
          'Cuatro maneras de "poder" y ninguna es intercambiable. El chino las reparte en las casillas de un panel: 会 (huì, S-08) es la HABILIDAD aprendida — ¿sabes hacerlo? · 可以 (kěyǐ) es el PERMISO — ¿te dejan? · 可能 (kěnéng) es la PROBABILIDAD — ¿sucederá? · 要 (yào) es la VOLUNTAD — ¿lo quieres?',
          'El mapa con ejemplos: 我会说中文 = "sé hablar chino" (lo aprendí: es mío). 你可以去北京 = "puedes ir a Pekín" (la puerta está abierta, nadie te lo prohíbe). 明天可能下雨 = "mañana quizás llueva" (decide el cielo: 50/50). 我要喝水 = "quiero beber agua" (la decisión sale de ti).',
          'El error número uno del sector: pedirle permiso a la suerte. ✗明天可以下雨 — la lluvia no rellena formularios. Para lo que escapa a tu control solo hay una casilla: 可能. Y al revés, 可以 es social: si la pregunta es "¿me dejas?", la respuesta es 可以 (o no).',
          '要 vive dos vidas: QUERER (deseo: 我要喝水) e IR A (futuro inmediato: 我要走了 = "me voy ya"). La frontera es fina porque el deseo de hoy es el plan del siguiente minuto. Pista para no fallar: 要 siempre mira hacia ADELANTE — jamás cuenta lo que ya pasó.',
          'Fíjate en el par sonoro: kěyǐ y kěnéng comparten el mismo kě antes de bifurcarse en permiso (yǐ) o probabilidad (néng). Tip del Overseer: antes de elegir, pregúntate ¿quién manda? Mandas tú → 要; manda la norma → 可以; manda el azar → 可能; manda tu entrenamiento → 会.',
        ], [
          ['我会说中文。', 'wǒ huì shuō zhōngwén.', 'Sé hablar chino.'],
          ['你可以去北京。', 'nǐ kěyǐ qù Běijīng.', 'Puedes ir a Pekín.'],
          ['明天可能下雨。', 'míngtiān kěnéng xiàyǔ.', 'Mañana quizás llueva.'],
          ['我要喝水。', 'wǒ yào hē shuǐ.', 'Quiero beber agua.'],
        ]),
      ],
    ),
    lesson(
      'm19e-l2',
      'Decir y entender',
      'vocab',
      [
        ...drill('w-rang4'),
        ...drill('w-dong3'),
        ...drill('w-hui-da'),
        ...drill('w-gao-su'),
        ...drill('w-cuo4'),
        noteStep('n-gao-su'),
        build('请告诉我你的名字。', 'qǐng gàosu wǒ nǐ de míngzi.', 'Dime tu nombre, por favor.'),
        build('我不懂。', 'wǒ bù dǒng.', 'No lo entiendo.'),
      ],
      [
        grammar('n-gao-su', '告诉 + persona: decir A alguien', [
          '告诉 (gàosu) es "contar A alguien": el destinatario ocupa el hueco de oro, inmediatamente después del verbo, exactamente como la persona tras 给 (S-18). 告诉 + PERSONA + lo que se cuenta: 请告诉我你的名字 = "dime (a mí) tu nombre". La segunda sílaba va floja (su, sin tono): se apoya en gào.',
          'El error número uno: dejar a la persona para el final, como haría el español. ✗请告诉你的名字给我 — ese hueco final no existe: la persona no va escoltada con "a", va INCORPORADA al verbo. ✓请告诉我你的名字. Y si el destinatario ya se sobreentiende, se suelta: 我告诉你 = "te lo digo".',
          '让 (ràng) es el permiso en acción: "dejar que". 让 + persona + verbo: 让我来！ = "¡déjame a mí!" (dejo que yo me encargue). Mientras 可以 te CONCEDE el permiso, 让 lo EJECUTA: 可以吗？…好，让我来。',
          'El resultado de entender llega como V + 懂: 听懂 (tīng dǒng) = entender lo oído, 看懂 (kàn dǒng) = entender lo leído. Es la misma familia de resultado que el V+到 del S-18: 懂 es la meta lograda — 我听懂了 = "lo he entendido (ha entrado de verdad)". Sin meta, la frase mínima: 我不懂. Y si la respuesta sale torcida, aparece 错 (cuò): 你回答错了 = "has respondido mal".',
          'Tip del Overseer: 请告诉我… (pide datos), 让我来 (ofrécete), 我不懂 (para el mundo), 我听懂了 (arranca de nuevo). Con ese kit, la radio del refugio siempre tiene respuesta.',
        ], [
          ['请告诉我你的名字。', 'qǐng gàosu wǒ nǐ de míngzi.', 'Dime tu nombre, por favor.'],
          ['我听懂了。', 'wǒ tīng dǒng le.', 'Lo he entendido.'],
          ['让我来！', 'ràng wǒ lái!', '¡Déjame a mí!'],
          ['你回答错了。', 'nǐ huídá cuò le.', 'Has respondido mal.'],
        ]),
      ],
    ),
    lesson(
      'm19e-l3',
      'En curso: 着',
      'vocab',
      [
        ...drill('w-zhe5'),
        ...drill('w-xiao4'),
        ...drill('w-jiu4-then'),
        ...drill('w-wan2'),
        noteStep('n-zhe5'),
        build('他笑着说话。', 'tā xiàozhe shuōhuà.', 'Habla riendo.'),
        build('我们吃完饭就去。', 'wǒmen chī wán fàn jiù qù.', 'En cuanto acabamos de comer, vamos.'),
      ],
      [
        grammar('n-zhe5', '着: la acción que acompaña', [
          '着 (zhe, sin tono) convierte un verbo en COMPAÑÍA: pegado detrás, dice "así, de esa manera, mientras tanto". 他笑着说话 = "habla riendo" — la risa no es la acción principal: es lo que la acompaña. El 正在 del S-13 enfocaba una acción en el ahora; 着 cuelga una acción de otra, como un adorno que viaja con ella.',
          'La pregunta que los separa: 正在 responde ¿QUÉ hace ahora? — 他正在说话 = "está hablando (ahora mismo)", la foto del reloj. 着 responde ¿CÓMO lo hace? — 他笑着说话 = "habla (con) risa", la foto del modo. El mismo hombre, dos cámaras: una cronometra, la otra retrata el estilo.',
          'El molde doble es puro cine: V+着+V+着 = "a fuerza de ir V-endo". 他说着说着笑了 = "hablando y hablando, se echó a reír": la acción se acumula, se acumula… y salta algo nuevo. Con ese doble 着, el chino narra el transcurso sin decir ni una sola vez "mientras".',
          'Dos piezas más del engranaje. 就 (jiù) es el "pues entonces": encadena hechos con tirantez inmediata — 我们吃完饭就去 = "en cuanto acabamos de comer, vamos": el primero se cumple y 就 lanza el siguiente. Y ese cumplimiento es V+完: 吃完 = terminar de comer, 做完 = terminar de hacer; la misma familia de resultado que V+到 y V+懂 — 完 sella la acción como terminada.',
          'Tip del Overseer: 正在 para el ahora, 着 para el modo, 就 para el "y entonces", 完 para el sello. Cuatro piezas diminutas que hacen sonar tu chino de morador antiguo: 他笑着说话，说完就去。',
        ], [
          ['他笑着说话。', 'tā xiàozhe shuōhuà.', 'Habla riendo.'],
          ['我们吃完饭就去。', 'wǒmen chī wán fàn jiù qù.', 'En cuanto acabamos de comer, vamos.'],
          ['他说着说着笑了。', 'tā shuōzhe shuōzhe xiào le.', 'Hablando y hablando, se echó a reír.'],
        ]),
      ],
    ),
    lesson(
      'm19e-l4',
      'El club del refugio',
      'vocab',
      [
        ...drill('w-chang-ge'),
        ...drill('w-tiao-wu'),
        ...drill('w-ti1'),
        ...drill('w-da-lan-qiu'),
        ...drill('w-huan-ying'),
        ...drill('w-fei-chang'),
        noteStep('n-ye-yu'),
        build('欢迎大家！我们唱歌跳舞。', 'huānyíng dàjiā! wǒmen chàng gē tiào wǔ.', '¡Bienvenidos todos! Cantamos y bailamos.'),
      ],
      [
        grammar('n-ye-yu', 'Los pasatiempos: máquinas V+O y la escalera de intensidad', [
          'Los hobbies chinos son máquinas V+O: verbo + objeto pegados. 唱歌 (cantar-canción), 跳舞 (bailar-danza), 打篮球 (golpear-baloncesto, "jugar al baloncesto"). El verbo lo decide el juego: 打 (dǎ) manda en los juegos de manos, y 踢 (tī) en todo lo que va con el pie — 踢足球 (tī zúqiú) = jugar al fútbol. No se "juega" al baloncesto: se golpea.',
          '欢迎 (huānyíng) es la bienvenida en acción: 欢迎 + persona. 欢迎大家！ = "¡bienvenidos todos!" — el saludo oficial cada vez que la puerta del refugio se abre. Con destinatario único: 欢迎你 = "te damos la bienvenida".',
          '非常 (fēicháng) es el "extremadamente": el turbo del curso. La escalera completa de intensidad: 很 (muy, el neutro de andar por casa) < 非常 (extremadamente) < 太…了 (¡demasiado!, la exclamación del S-21). 他非常喜欢唱歌 = "le encanta cantar": 很 se queda corto, 太…了 ya es grito; 非常 enfatiza sin perder la compostura.',
          'Y el molde de fiesta: 欢迎大家！我们唱歌跳舞。 — dos máquinas V+O en serie, sin "y" entre ellas: el chino apila acciones como latas en la despensa. Añade 我们 delante y 吧 detrás — 我们一起跳舞吧 — y el plan de noche del refugio queda cerrado.',
          'Tip del Overseer: ¿cuánto te gusta? 很 si es normal, 非常 si es mucho, 太…了 si no cabes en ti. ¿Y la propuesta? 我们一起唱歌吧。',
        ], [
          ['欢迎大家！我们唱歌跳舞。', 'huānyíng dàjiā! wǒmen chàng gē tiào wǔ.', '¡Bienvenidos todos! Cantamos y bailamos.'],
          ['他非常喜欢唱歌。', 'tā fēicháng xǐhuan chàng gē.', 'Le encanta cantar.'],
          ['我们一起跳舞吧。', 'wǒmen yìqǐ tiào wǔ ba.', 'Bailamos juntos, ¿vale?'],
        ]),
      ],
    ),
    lesson(
      'm19e-l5',
      'Auditoría del Sector 26',
      'review',
      [
        match('w-ke-yi', 'w-ke-neng', 'w-yao4-v', 'w-rang4'),
        match('w-chang-ge', 'w-tiao-wu', 'w-ti1', 'w-da-lan-qiu'),
        { type: 'listen', entry: 'w-gao-su' },
        { type: 'listen', entry: 'w-huan-ying' },
        dictate('w-fei-chang'),
        dictate('w-hui-da'),
        typeP('w-ke-neng'),
        build('明天可能下雨。', 'míngtiān kěnéng xiàyǔ.', 'Mañana quizás llueva.'),
        build('我们吃完饭就去。', 'wǒmen chī wán fàn jiù qù.', 'En cuanto acabamos de comer, vamos.'),
        ...practice('w-zhe5'),
        ...practice('w-cuo4'),
        ...practice('w-dong3'),
      ],
    ),
  ],
}
