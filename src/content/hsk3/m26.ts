/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 33 · HSK 3 — LA MENTE OPINA (módulo 6/10)

   El chino que piensa: las tres creencias (相信/认为/以为 — confiar, opinar
   y equivocarse), los verbos de decisión (决定/解决/选择) y el corazón del
   refugio (las emociones: 生气, 担心, 害怕…). El apunte estrella separa las
   TRES creencias; el resto explica por qué las emociones chinas no
   necesitan "estar" para arder.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m26: VaultModule = {
  id: 'm26',
  hsk: 3,
  code: 'S-33',
  title: 'La mente opina',
  subtitle: 'Creer, decidir y preocuparse: el chino que piensa',
  entries: [
    e('w-ren-wei', '认为', 'rènwéi', 'considerar, opinar que', '💭'),
    e('w-yi-wei', '以为', 'yǐwéi', 'creer erróneamente que', '❌', 'pensaba que... pero no'),
    e('w-xiang-xin', '相信', 'xiāngxìn', 'creer (en alguien), confiar', '🤝'),
    e('w-liao-jie', '了解', 'liǎojiě', 'entender, conocer bien', '🔎'),
    e('w-tong-yi', '同意', 'tóngyì', 'estar de acuerdo', '👍'),
    e('w-yuan-yi', '愿意', 'yuànyì', 'estar dispuesto, querer', '🙋'),
    e('w-jue-ding', '决定', 'juédìng', 'decidir, decisión', '🎯'),
    e('w-jie-jue', '解决', 'jiějué', 'resolver (un problema)', '🛠️'),
    e('w-xuan-ze', '选择', 'xuǎnzé', 'elegir, elección', '🔀'),
    e('w-xu-yao', '需要', 'xūyào', 'necesitar', '❗'),
    e('w-yao-qiu', '要求', 'yāoqiú', 'exigir, pedir', '📋'),
    e('w-zhu-yi', '注意', 'zhùyì', 'prestar atención, cuidado', '👀'),
    e('w-biao-shi', '表示', 'biǎoshì', 'expresar, indicar', '🗨️'),
    e('w-jiang3', '讲', 'jiǎng', 'hablar de, contar', '🗣️', 'hermano mayor de 说'),
    e('w-gan3', '敢', 'gǎn', 'atreverse a', '😤'),
    e('w-guan-xin', '关心', 'guānxīn', 'preocuparse por (alguien)', '❤️'),
    e('w-zhao-gu', '照顾', 'zhàogù', 'cuidar de, atender', '🧑‍🍼'),
    e('w-dan-xin', '担心', 'dānxīn', 'preocuparse (por algo)', '😟'),
    e('w-hai-pa', '害怕', 'hàipà', 'tener miedo de', '😱'),
    e('w-sheng-qi', '生气', 'shēngqì', 'enfadarse, estar enfadado', '😠'),
    e('w-zhao-ji', '着急', 'zháojí', 'poner(se) nervioso, apurarse', '😰'),
    e('w-nan-guo', '难过', 'nánguò', 'estar triste, apenado', '😢'),
    e('w-bang-mang', '帮忙', 'bāngmáng', 'ayudar (un favor)', '🫱'),
    e('w-bie-ren', '别人', 'biérén', 'los demás, otra persona', '👥', 'ren neutra: biérén'),
    e('w-qi-ta', '其他', 'qítā', 'otros, demás', '🔀'),
    e('w-fang-xin', '放心', 'fàngxīn', 'quedar tranquilo, no preocuparse', '😌', '¡Fangxin! = ¡tranquilo!'),
  ],
  lessons: [
    lesson(
      'm26-l1',
      'Yo opino',
      'vocab',
      [
        ...drill('w-ren-wei'),
        ...drill('w-yi-wei'),
        ...drill('w-xiang-xin'),
        ...drill('w-liao-jie'),
        noteStep('n-san-ge-xiang'),
        build('我认为他很好。', 'wǒ rènwéi tā hěn hǎo.', 'Creo que es muy buena persona.'),
        build('我以为你会来。', 'wǒ yǐwéi nǐ huì lái.', 'Pensaba que vendrías (pero no).'),
      ],
      [
        grammar('n-san-ge-xiang', '相信, 认为 y 以为: las tres creencias', [
          'El español despacha todas las creencias con un solo verbo: "creer". El chino reparte el trabajo entre TRES fichas, y elegir mal la delata: la fe es 相信, el veredicto es 认为 y el error confeso es 以为. Tres herramientas, tres intenciones.',
          '相信 (xiāngxìn) es CONFIAR: fe en una persona o en algo. 我相信你 = "creo EN ti" — no analizas, no argumentas: respaldas. Es el verbo de la lealtad del refugio. Y también sostiene hechos: 我相信他会来 = "estoy seguro de que vendrá" (会 de S-08).',
          '认为 (rènwéi) es OPINAR: un juicio razonado, el informe que entregas tras pensarlo. 我认为他很好 = "considero que es buena persona": das tu veredicto y estás dispuesto a defenderlo. Su hermano blando ya lo tienes: 觉得 (juéde, S-18) — más sensación que sentencia. 认为 va con argumentos; 觉得, con la piel.',
          '以为 (yǐwéi) es la creencia EQUIVOCADA: pensabas X… y la realidad dijo otra cosa. Siempre esconde una sorpresa: 我以为你会来 = "pensaba que VENDRÍAS" (y no has venido); 我以为今天是周五… y es lunes. Quien dice 以为 ya está confesando su error: es el parte de descalabro del refugio.',
          'El contraste que salva expedientes: ✗我以为你是对的 para decir "creo que tienes razón" suena a "pensaba —en vano— que la tenías": acabas de retirársela · ✓我认为你是对的 (veredicto neutro) · y para la fe en la persona: ✓我相信你.',
          'Tip del Overseer: antes de "creer" algo, pásalo por el filtro de las tres preguntas — ¿es fe? (相信) · ¿es un veredicto razonado? (认为) · ¿era un error que ya vio la luz? (以为). Las tres suenan igual de sinceras; solo una acierta, morador.',
        ], [
          ['我相信你。', 'wǒ xiāngxìn nǐ.', 'Creo en ti.'],
          ['我认为他很好。', 'wǒ rènwéi tā hěn hǎo.', 'Creo que es muy buena persona.'],
          ['我以为你会来。', 'wǒ yǐwéi nǐ huì lái.', 'Pensaba que vendrías (pero no).'],
        ]),
      ],
    ),
    lesson(
      'm26-l2',
      'Decidir y resolver',
      'vocab',
      [
        ...drill('w-jue-ding'),
        ...drill('w-jie-jue'),
        ...drill('w-xuan-ze'),
        ...drill('w-tong-yi'),
        ...drill('w-yuan-yi'),
        noteStep('n-jue-ce'),
        build('我决定学习中文。', 'wǒ juédìng xuéxí zhōngwén.', 'He decidido aprender chino.'),
        build('这个问题很难解决。', 'zhè ge wèntí hěn nán jiějué.', 'Este problema es difícil de resolver. (难 nán = difícil)'),
      ],
      [
        grammar('n-jue-ce', 'Verbos de decisión: lo que aceptan detrás', [
          'Los verbos de este sector comen de dos platos: VERBO o NOMBRE. 我决定去 = "decido IR" (la decisión cae sobre una acción) · 我选择这个 = "elijo ESTO" (cae sobre una cosa). Es el mismo truco que ya usas con 想 y 会 (S-08): detrás de un verbo mental chino cabe una acción entera o su objeto, sin "que" ni infinitivo que lo envuelva.',
          '决定 es además doble: el verbo ("decidir") y el sustantivo ("la decisión"). 我决定学习中文 = "he decidido aprender chino": la misión queda firmada y archivada. 解决 es el verbo de los PROBLEMAS: un 问题 (S-16) no se elige ni se decide — se RESUELVE. Y el molde de lo costoso: 这个问题很难解决 = "este problema es difícil de resolver" (很难 + verbo = difícil de hacer).',
          'La pareja de la voluntad: 同意 (estar de acuerdo — con una idea o con alguien: 我同意, y a correr) y 愿意 (estar dispuesto). 愿意 es el "querer" educado, el botón de "acepto la misión": suena a favor ofrecido, no a capricho. Para los deseos blandos sigue mandando 想 (S-06); 愿意 sube el compromiso un escalón.',
          'Tip del Overseer: un verbo de decisión no se queda a medias. ✗我决定 ("decido"… ¿el qué? el verbo se queda con hambre) · ✓我决定去 / ✓我决定学习中文. Toda decisión china termina en verbo o en nombre: no hay tercera vía.',
        ], [
          ['我决定学习中文。', 'wǒ juédìng xuéxí zhōngwén.', 'He decidido aprender chino.'],
          ['我同意。', 'wǒ tóngyì.', 'Estoy de acuerdo.'],
          ['这个问题很难解决。', 'zhè ge wèntí hěn nán jiějué.', 'Este problema es difícil de resolver. (难 nán = difícil)'],
        ]),
      ],
    ),
    lesson(
      'm26-l3',
      'El corazón del refugio',
      'vocab',
      [
        ...drill('w-guan-xin'),
        ...drill('w-zhao-gu'),
        ...drill('w-dan-xin'),
        ...drill('w-hai-pa'),
        ...drill('w-sheng-qi'),
        ...drill('w-zhao-ji'),
        ...drill('w-nan-guo'),
        noteStep('n-qing-xu'),
        build('妈妈很关心我。', 'māma hěn guānxīn wǒ.', 'Mamá se preocupa por mí.'),
        build('别担心。', 'bié dānxīn.', 'No te preocupes.'),
      ],
      [
        grammar('n-qing-xu', 'Los verbos del corazón: emociones sin "estar"', [
          'El español enciende las emociones con "estar": estar enfadado, estar triste, estar nervioso. El chino dispara DIRECTO: la emoción es un VERBO y ya está. 他生气了 = "se ha enfadado" — y fíjate en el 了 de cambio (S-13): marca el instante en que el ánimo viró, el momento exacto en que la paciencia se acabó.',
          '关心 y 担心 comparten el corazón (心, xīn) y nada más. 关心 es el cariño cálido: interesarse por alguien, preguntar, estar ahí — 妈妈很关心我 = "mamá se preocupa por mí" (en el buen sentido). 担心 es la preocupación ansiosa: imaginar lo peor. La cura oficial: 别担心 ("no te preocupes"), con el 别 prohibitivo que ya usaste en 别哭 (S-29).',
          '害怕 (tener miedo) admite detrás nombre o verbo: 害怕狗 (miedo AL perro, S-04) o miedo a hacer algo. 着急 es el pánico del reloj: los nervios de llegar tarde, la prisa que quema. Y 难过 es la tristeza: literalmente "difícil de pasar" (难 + 过) — el día no pasa, el rato no acaba. La etimología ya trae el pañuelo.',
          '照顾 es el cariño con las manos: cuidar, atender, acompañar (acciones). 关心 es el cariño con el corazón: sentirse concernido. A un enfermo se le 照顾; de un amigo se le 关心. El refugio necesita los dos: manos y corazón.',
          'Tip del Overseer: para intensificar, 很 delante y listo — 很着急, 很难过, 他很生气. Y la frase que cierra heridas de este sector ya la tienes: 别担心. Dicha con calma, vale por una manta.',
        ], [
          ['妈妈很关心我。', 'māma hěn guānxīn wǒ.', 'Mamá se preocupa por mí.'],
          ['他生气了。', 'tā shēngqì le.', 'Se ha enfadado.'],
          ['别担心。', 'bié dānxīn.', 'No te preocupes. (别 bié = "no hagas…", S-29)'],
        ]),
      ],
    ),
    lesson(
      'm26-l4',
      'Pedir y prometer',
      'vocab',
      [
        ...drill('w-xu-yao'),
        ...drill('w-yao-qiu'),
        ...drill('w-zhu-yi'),
        ...drill('w-biao-shi'),
        noteStep('n-jiang-shuo'),
        ...drill('w-jiang3'),
        ...drill('w-gan3'),
        ...drill('w-bang-mang'),
        ...drill('w-bie-ren'),
        ...drill('w-qi-ta'),
        ...drill('w-fang-xin'),
        build('他敢讲中文。', 'tā gǎn jiǎng zhōngwén.', 'Se atreve a hablar chino.'),
        build('我需要帮忙。', 'wǒ xūyào bāngmáng.', 'Necesito ayuda.'),
      ],
      [
        grammar('n-jiang-shuo', '说 y 讲: decir y contar', [
          '说 (shuō, S-08) es el "decir" de cada día: rápido, neutro, para todo — 说话 (hablar), dar una frase. 讲 (jiǎng) es su hermano mayor: CONTAR con desarrollo, exponer, narrar. 讲故事 (contar un cuento; 故事 gùshi = historia), 讲中文 (hablar chino, con aire de exposición). Si 说 suelta la frase, 讲 desarrolla el tema.',
          '敢 (gǎn) es el botón de la valentía — o del canguelo: 敢 + verbo = atreverse a. 敢说 = "se atreve a hablarlo"; 他敢讲中文 = "se atreve a hablar chino" delante de cualquiera. En negativa confiesa: 不敢 (no me atrevo). El miedo número uno del morador no es la superficie: es el ridículo.',
          'La familia de pedir: 需要 es la necesidad real (agua, tiempo, ayuda) · 要求 es la petición con autoridad — exigir, marcar condiciones: suena a jefe. 注意 es la alarma de atención: solo, imperativo puro (注意！ = "¡ojo!"); con verbo, apunta el foco (注意听 = "escucha bien"). Y 表示 es "dar forma" a lo de dentro: un gesto, unas palabras — lo que sientes hecho señal.',
          '帮忙 es separable, como 洗澡 o 爬山 (S-30): verbo + objeto que se abren para dejar pasar algo en medio — 帮个忙 = "hazme ESTE favor". 别人 y 其他, los "otros": 别人 son los demás PERSONAS, en bloque y sin nombre detrás · 其他 acota y sigue a lo que limita (其他人 = otras personas). Y 放心 es literalmente "soltar el corazón": 你放心 = "quédate tranquilo" — la palabra más tranquila del sector.',
          'Tip del Overseer: cuando pidas ayuda en el refugio no dispares un "¡ayúdame!" desnudo: di 我需要帮忙 — necesidad + favor. Suena menos a orden y más a parte de misión. El refugio entero funciona a favores.',
        ], [
          ['他敢讲中文。', 'tā gǎn jiǎng zhōngwén.', 'Se atreve a hablar chino.'],
          ['我需要帮忙。', 'wǒ xūyào bāngmáng.', 'Necesito ayuda.'],
          ['别人不同意。', 'biérén bù tóngyì.', 'Los demás no están de acuerdo.'],
        ]),
      ],
    ),
    lesson(
      'm26-l5',
      'Auditoría del Sector 33',
      'review',
      [
        match('w-ren-wei', 'w-xiang-xin', 'w-tong-yi', 'w-hai-pa'),
        match('w-guan-xin', 'w-dan-xin', 'w-sheng-qi', 'w-nan-guo'),
        match('w-jue-ding', 'w-jie-jue', 'w-xuan-ze', 'w-yuan-yi'),
        match('w-xu-yao', 'w-zhu-yi', 'w-bang-mang', 'w-fang-xin'),
        { type: 'listen', entry: 'w-yi-wei' },
        { type: 'listen', entry: 'w-dan-xin' },
        dictate('w-jue-ding'),
        dictate('w-zhao-gu'),
        typeP('w-yuan-yi'),
        build('我认为他很好。', 'wǒ rènwéi tā hěn hǎo.', 'Creo que es muy buena persona.'),
        build('我需要帮忙。', 'wǒ xūyào bāngmáng.', 'Necesito ayuda.'),
        ...practice('w-liao-jie'),
        ...practice('w-zhao-ji'),
        ...practice('w-jiang3'),
      ],
    ),
  ],
}
