/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 20 · HSK 2 — RUTAS Y MOVIMIENTO (módulo 8/15)

   El compás del refugio: 每天 y las palabras de tiempo delante del verbo,
   la deixis V+来/V+去 (la brújula eres tú) y la ruta de oro 一直 → 拐 → 到.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m18: VaultModule = {
  id: 'm18',
  hsk: 2,
  code: 'S-20',
  title: 'Rutas y Movimiento',
  subtitle: 'Levantarse, salir, volver: direcciones para no perderse',
  entries: [
    e('w-zou3', '走', 'zǒu', 'andar, caminar', '🚶'),
    e('w-pao3', '跑', 'pǎo', 'correr', '🏃'),
    e('w-pao-bu', '跑步', 'pǎobù', 'correr (hacer footing)', '🥾', 'correr-pasos'),
    e('w-qi-chuang', '起床', 'qǐchuáng', 'levantarse (de la cama)', '⏰'),
    e('w-chu-qu', '出去', 'chūqù', 'salir (hacia fuera)', '🚪'),
    e('w-hui-lai', '回来', 'huílái', 'volver (hacia aquí)', '🔄'),
    e('w-shang4', '上', 'shàng', 'subir(se), montar(se)', '⬆️'),
    e('w-xia4', '下', 'xià', 'bajar(se)', '⬇️'),
    e('w-jin4-v', '进', 'jìn', 'entrar', '➡️'),
    e('w-zuo3-dir', '左', 'zuǒ', 'izquierda', '⬅️'),
    e('w-you4-dir', '右', 'yòu', 'derecha', '➡️'),
    e('w-yi-zhi', '一直', 'yìzhí', 'todo recto, siempre', '📏'),
    e('w-guai3', '拐', 'guǎi', 'girar', '🔄'),
    e('w-mei-tian', '每天', 'měitiān', 'cada día', '📆'),
    e('w-qi-lai', '起来', 'qǐlái', 'levantarse (ponerse de pie)', '🧍', 'funciona como sufijo de dirección'),
  ],
  lessons: [
    lesson(
      'm18-l1',
      'La ruta diaria',
      'vocab',
      [
        ...drill('w-zou3'),
        ...drill('w-pao3'),
        ...drill('w-pao-bu'),
        ...drill('w-qi-chuang'),
        ...drill('w-mei-tian'),
        noteStep('n-mei-tian'),
        build('我每天跑步。', 'wǒ měitiān pǎobù.', 'Corro todos los días.'),
        build('起床以后我喝茶。', 'qǐchuáng yǐhòu wǒ hē chá.', 'Después de levantarme, tomo té.'),
      ],
      [
        grammar('n-mei-tian', '每天 y las palabras del reloj: primero, siempre', [
          '每 (měi) = "cada": 每 + la unidad → 每天 (cada día), 每个人 (cada persona). Es el repartidor del refugio: toma algo y lo reparte entero, sin dejar migas.',
          'La regla de oro del orden: las palabras de tiempo actúan como ADVERBIOS y se colocan justo después del sujeto, ANTES del verbo. 我每天跑步 = "yo, cada día, corro". El español las arrastra al final ("corro todos los días"); el chino las sube al pódium, junto a quien actúa.',
          'El error número uno: colgar el tiempo al final por costumbre española → ✗我跑步每天. El oído chino lo busca delante: SUJETO + TIEMPO + ACCIÓN. Ya conocías el molde del S-11: 吃饭以后，我学习 — el ancla temporal abre el camino, la acción lo cierra.',
          'Tip del Overseer: antes del verbo, la hora manda; después del verbo, ya nadie la escucha. La rutina del refugio se narra así: 我每天起床，我每天学习，我每天跑步.',
        ], [
          ['我每天跑步。', 'wǒ měitiān pǎobù.', 'Corro todos los días.'],
          ['起床以后我喝茶。', 'qǐchuáng yǐhòu wǒ hē chá.', 'Después de levantarme, tomo té.'],
          ['我们每天学习中文。', 'wǒmen měitiān xuéxí zhōngwén.', 'Estudiamos chino todos los días.'],
        ]),
      ],
    ),
    lesson(
      'm18-l2',
      'Salir y volver',
      'vocab',
      [
        ...drill('w-chu-qu'),
        ...drill('w-hui-lai'),
        ...drill('w-shang4'),
        ...drill('w-xia4'),
        ...drill('w-jin4-v'),
        noteStep('n-deixis'),
        build('他出去了。', 'tā chūqù le.', 'Él ha salido.'),
        build('爸爸，我回来了！', 'bàba, wǒ huílái le!', '¡Papá, he vuelto!'),
      ],
      [
        grammar('n-deixis', '来 y 去: la brújula eres tú', [
          'En español, "ir" y "venir" solo miran UNA posición: la tuya en el momento de hablar. El chino pega una PARTÍCULA de dirección a cada verbo: V + 来 (lái) = el movimiento viene HACIA aquí; V + 去 (qù) = el movimiento se aleja DE mí. La brújula del chino eres tú, el hablante.',
          'Salir tiene dos versiones según el rumbo: 出去 (chūqù) = "salir alejándome de aquí" — yo dejo el refugio y me marcho. 出来 (chūlái) = "salir acercándose a donde estoy yo" — el camarero sale de la cocina HACIA mi mesa. Si llamas a alguien que está dentro: 出来！ = "¡sal (hacia mí)!"',
          'Lo mismo con volver: 回来 (huílái) = volver AQUÍ, a donde está el que habla — 你回来了！ es el saludo cuando alguien entra a donde tú estás. 回去 (huíqù) = regresar ALLÁ: tú estás en casa y él vuelve al refugio → 他回去了. Decide la posición del hablante, no la geografía del mapa.',
          'Y como las partículas se pegan a CUALQUIER verbo, hasta el préstamo se orienta: 借出去 = prestarlo (sale de mi mano, S-16), 借回来 = traerlo prestado (llega a mi mano). El español dice "ir/venir"; el chino pregunta "¿hacia mí o lejos de mí?".',
          'Tip del Overseer: antes de elegir 来 o 去, pregúntate ¿dónde estoy YO? Ese punto fijo decide la dirección de todo el sector.',
        ], [
          ['他出去了。', 'tā chūqù le.', 'Él ha salido. (se fue de aquí)'],
          ['爸爸，我回来了！', 'bàba, wǒ huílái le!', '¡Papá, he vuelto!'],
          ['你什么时候回来？', 'nǐ shénme shíhou huílái?', '¿Cuándo vuelves? (hacia aquí)'],
        ]),
      ],
    ),
    lesson(
      'm18-l3',
      'Indicaciones del refugio',
      'vocab',
      [
        ...drill('w-zuo3-dir'),
        ...drill('w-you4-dir'),
        ...drill('w-yi-zhi'),
        ...drill('w-guai3'),
        ...drill('w-qi-lai'),
        noteStep('n-fangxiang'),
        build('一直走，然后左拐。', 'yìzhí zǒu, ránhòu zuǒ guǎi.', 'Sigue todo recto y luego gira a la izquierda. (然后 ránhòu = luego)'),
        build('请站起来。', 'qǐng zhàn qǐlái.', 'Por favor, ponte de pie. (站 zhàn = estar de pie)'),
      ],
      [
        grammar('n-fangxiang', 'La ruta de oro: 一直 → 拐 → 到', [
          'Las direcciones chinas se recitan como una receta, sin preposiciones: 一直走 (yìzhí zǒu) = "todo recto", 左拐 (zuǒ guǎi) = "girar a la izquierda", 右拐 (yòu guǎi) = "girar a la derecha", y al final llega el momento estrella del S-16: 到. Verbos apilados: el mapa se anda, no se describe.',
          '一直 (yìzhí) es literalmente "directo-siempre": por eso también intensifica el tiempo ("siempre"). En direcciones es tu primera línea recta: 一直走，然后左拐 = "sigue recto y luego gira a la izquierda" — 然后 (ránhòu) = "después/luego", la cadencia entre pasos.',
          '起来 (qǐlái) es el sufijo que apunta HACIA ARRIBA: 站 (zhàn) = "estar de pie" → 站起来 = "ponerse de pie"; 拿起来 = "cogerlo alzándolo". Compáralo con 起床 (qǐchuáng, "levantarse de la cama"): la sílaba 起 es la flecha ascendente de todo el sector.',
          'Tip del Overseer: una dirección china es una LISTA DE ACCIONES — recto, giro, llegada. Nada de "gire a su derecha en la segunda calle": el chino dice camina, gira y ya habrás llegado.',
        ], [
          ['一直走，然后左拐。', 'yìzhí zǒu, ránhòu zuǒ guǎi.', 'Sigue todo recto y luego gira a la izquierda.'],
          ['请站起来。', 'qǐng zhàn qǐlái.', 'Por favor, ponte de pie.'],
          ['到了！', 'dào le!', '¡He llegado! (到 + 了: cambio de estado)'],
        ]),
      ],
    ),
    lesson(
      'm18-l4',
      'Auditoría del Sector 20',
      'review',
      [
        match('w-zou3', 'w-pao3', 'w-pao-bu', 'w-qi-chuang'),
        match('w-chu-qu', 'w-hui-lai', 'w-shang4', 'w-xia4', 'w-jin4-v'),
        { type: 'listen', entry: 'w-pao-bu' },
        { type: 'listen', entry: 'w-guai3' },
        dictate('w-qi-chuang'),
        dictate('w-hui-lai'),
        typeP('w-yi-zhi'),
        build('我每天跑步。', 'wǒ měitiān pǎobù.', 'Corro todos los días.'),
        build('一直走，然后左拐。', 'yìzhí zǒu, ránhòu zuǒ guǎi.', 'Sigue todo recto y luego gira a la izquierda.'),
        ...practice('w-zuo3-dir'),
        ...practice('w-you4-dir'),
      ],
    ),
  ],
}
