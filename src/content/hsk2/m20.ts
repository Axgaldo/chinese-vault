/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 20 · HSK 2 — EL IDIOMA Y LA AUDITORÍA FINAL (módulo 10/10)

   El sector del meta-aprendizaje: por fin tienes NOMBRES para las piezas del
   chino (声调, 拼音, 汉字, 语法), la partícula de la biografía 过 y la
   AUDITORÍA FINAL HSK 2 con el certificado del Overseer.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, introLite, lesson, match, noteStep, practice, typeP } from '../builders'

export const m20: VaultModule = {
  id: 'm20',
  hsk: 2,
  code: 'S-20',
  title: 'El Idioma y la Auditoría Final',
  subtitle: '声调, 拼音, 汉字: anatomía del chino + protocolo HSK 2 completo',
  entries: [
    e('w-han-yu', '汉语', 'hànyǔ', 'chino (idioma)', '🇨🇳'),
    e('w-sheng-diao', '声调', 'shēngdiào', 'tono (del chino)', '🎼'),
    e('w-pin-yin', '拼音', 'pīnyīn', 'pinyin', '🔤'),
    e('w-han-zi', '汉字', 'hànzì', 'carácter chino', '✍️'),
    e('w-ke-wen', '课文', 'kèwén', 'texto (de la lección)', '📖'),
    e('w-lian-xi', '练习', 'liànxí', 'practicar, ejercicio', '✏️', 'xí = practicar, ya conocido de 学习'),
    e('w-yu-fa', '语法', 'yǔfǎ', 'gramática', '🧠'),
    e('w-guo4', '过', 'guò', 'marcador de experiencia', '🏅', 'ir+过 = haber ido alguna vez'),
  ],
  lessons: [
    lesson(
      'm20-l1',
      'Anatomía del chino',
      'vocab',
      [
        ...drill('w-han-yu'),
        ...drill('w-sheng-diao'),
        ...drill('w-pin-yin'),
        ...drill('w-han-zi'),
        noteStep('n-jiepo'),
        build('我的声调越来越好。', 'wǒ de shēngdiào yuèláiyuè hǎo.', 'Mis tonos son cada vez mejores.'),
        build('我们每天练习声调。', 'wǒmen měitiān liànxí shēngdiào.', 'Practicamos los tonos todos los días.'),
      ],
      [
        grammar('n-jiepo', '声调, 拼音, 汉字 y 语法: el plano de la máquina', [
          'Llevas meses reparando una máquina sin saber el nombre de sus piezas. Hoy el Overseer te entrega el plano: 声调 (shēngdiào) = la MELODÍA (los cuatro tonos + el neutral); 拼音 (pīnyīn) = el NOMBRE SONORO de cada sílaba; 汉字 (hànzì) = la ESCRITURA (los caracteres); 语法 (yǔfǎ) = las REGLAS DE MONTAJE (la gramática).',
          '¿Para qué sirve nombrarlas? Para DIAGNOSTICAR. Cuando algo falla puedes señalar la pieza enferma: "mi 声调 del tono 3 suena plano", "reconozco el 汉字 pero no recuerdo su 拼音". El conocimiento implícito (lo que tu oído ya hace sin pensarlo) se convierte en explícito: eso es meta-aprendizaje, y es la diferencia entre usar una herramienta y dominarla.',
          '汉语 (hànyǔ) y 中文 (zhōngwén) significan lo mismo — "el chino" — pero suenan distinto: 汉语 tiene sabor académico, de manual y de examen; 中文 es la palabra de cada día ("hablo chino": 我说中文). En este sector hablamos de 汉语 porque estamos en modo estudio.',
          'Tip del Overseer: cuando te atasques, pregunta ¿QUÉ pieza falla? — melodía, nombre, escritura o montaje. Cada una tiene su taller de reparación: los repasos, la radio, el teclado o esta misma lección.',
        ], [
          ['我的声调越来越好。', 'wǒ de shēngdiào yuèláiyuè hǎo.', 'Mis tonos son cada vez mejores.'],
          ['我们每天练习声调。', 'wǒmen měitiān liànxí shēngdiào.', 'Practicamos los tonos todos los días.'],
          ['我在写汉字。', 'wǒ zài xiě hànzì.', 'Estoy escribiendo caracteres chinos.'],
        ]),
      ],
    ),
    lesson(
      'm20-l2',
      'En clase de chino',
      'vocab',
      [
        ...drill('w-ke-wen'),
        ...drill('w-lian-xi'),
        ...drill('w-yu-fa'),
        noteStep('n-yufa'),
        build('今天的课文很有意思。', 'jīntiān de kèwén hěn yǒu yìsi.', 'El texto de hoy es muy interesante.'),
      ],
      [
        grammar('n-yufa', '语法: las cinco piezas de LEGO del HSK 2', [
          'La gramática (语法) no es una lista de prohibiciones: es el MANUAL DE MONTAJE. Todo el HSK 2 se construye con cinco piezas, y ya las tienes en la mano. Repasémoslas una a una, sector por sector:',
          '1) 了 = CAMBIO (S-11): 我吃了 = "ya he comido" — algo se completó o cambió de estado. No es "pasado": es una frontera. 2) 比 = COMPARACIÓN (S-15): 他比我忙 = "está más ocupado que yo" — el primer término compite contra el segundo y el adjetivo sentencia.',
          '3) 正在 = EN DIRECTO (S-11): 我正在喝茶 = la acción pasa ahora mismo, cámara de vídeo. 4) V+过 = EXPERIENCIA (S-20, la siguiente lección): 我吃过羊肉 = "alguna vez en mi vida probé el cordero" — tu biografía entera en un sufijo.',
          '5) V+到 = RESULTADO (S-16): 我找到了 = "lo encontré de verdad" — el intento se cumplió. Y las piezas se enchufan entre sí: 我正在找 = "estoy justo ahora buscando" (en directo + intento en curso).',
          'Tip del Overseer: cuando una frase te suene rara, desmóntala y nombra sus piezas. En el refugio nadie repara a ciegas: primero el plano, luego la llave.',
        ], [
          ['我吃了。', 'wǒ chī le.', 'Ya he comido. (了: cambio/completado)'],
          ['他比我忙。', 'tā bǐ wǒ máng.', 'Está más ocupado que yo. (比: comparación)'],
          ['我找到了我的猫。', 'wǒ zhǎodào le wǒ de māo.', 'He encontrado a mi gato. (V+到: resultado)'],
        ]),
      ],
    ),
    lesson(
      'm20-l3',
      'La partícula de la experiencia',
      'grammar',
      [
        ...introLite('w-guo4'),
        ...practice('w-sheng-diao'),
        ...practice('w-pin-yin'),
        noteStep('n-guo'),
        build('我吃过羊肉。', 'wǒ chīguo yángròu.', 'He probado el cordero (alguna vez).'),
        build('我没学过日语。', 'wǒ méi xuéguo rìyǔ.', 'Nunca he estudiado japonés. (日语 rìyǔ = japonés)'),
      ],
      [
        grammar('n-guo', '过: la partícula de la biografía', [
          '过 (guò) pegado detrás de un verbo abre tu EXPEDIENTE: V+过 = "lo viví ALGUNA VEZ, en algún momento de mi vida". 我吃过羊肉 = "he probado el cordero" — no importa cuándo ni dónde: la experiencia YA figura en tu hoja de servicios.',
          'La negación borra la entrada entera: 没 + V + 过. 我没学过日语 = "nunca he estudiado japonés (en toda mi vida)". Y la pregunta clásica del pequeño comercio del refugio: 你吃过羊肉吗？ = "¿has probado el cordero alguna vez?".',
          'El contraste que lo aclara todo — 过 vs 了 (S-11): 我吃了 = "comí" (UNA vez concreta, recién sucedida: foto del momento). 我吃过 = "alguna vez" (entrada del expediente: biografía). 了 cierra un evento; 过 certifica una experiencia.',
          'Ojo: 过 también es verbo propio ("cruzar/pasar"), pero como sufijo va tras el verbo y se dice ligero, casi sin tono: 吃过, 学过, 去过 (qùguo, "haber ido alguna vez" — el literal de la entrada del banco).',
          'Tip del Overseer: para hablar de TU vida, 过 es tu sello de "ya estuve allí". El refugio sella expedientes, no fotos.',
        ], [
          ['我吃过羊肉。', 'wǒ chīguo yángròu.', 'He probado el cordero (alguna vez).'],
          ['我没学过日语。', 'wǒ méi xuéguo rìyǔ.', 'Nunca he estudiado japonés.'],
          ['你吃过羊肉吗？', 'nǐ chīguo yángròu ma?', '¿Has probado el cordero alguna vez?'],
        ]),
      ],
    ),
    lesson(
      'm20-l4',
      'AUDITORÍA FINAL HSK 2',
      'review',
      [
        match('w-han-yu', 'w-sheng-diao', 'w-pin-yin', 'w-han-zi', 'w-yu-fa'),
        match('w-gei3', 'w-zhao3', 'w-dao4', 'w-yin-wei', 'w-yi-zhi'),
        { type: 'listen', entry: 'w-ke-wen' },
        { type: 'listen', entry: 'w-lian-xi' },
        dictate('w-yu-fa'),
        dictate('w-han-zi'),
        typeP('w-guo4'),
        build('我的汉语越来越好了。', 'wǒ de hànyǔ yuèláiyuè hǎo le.', 'Mi chino mejora cada día.'),
        noteStep('n-finale-hsk2'),
      ],
      [
        grammar('n-finale-hsk2', 'CERTIFICADO DEL OVERSEER: protocolo HSK 2 completo', [
          'Auditoría final superada, morador. Has sellado los sectores S-11 a S-20: unas ~300 palabras en el registro del refugio y — lo que de verdad importa — la CAJA DE HERRAMIENTAS completa. La partícula 了 ya no te asusta (cambio, no pasado), comparas con 比, cuentas experiencias con 过, piensas con 因为...所以..., eliges con 还是 y exclamas con 太...了.',
          'Los últimos cinco sectores en una línea: S-16 te enseñó a dar (给, persona primero) y a lograr (V+到, misión cumplida); S-17 a navegar la era digital (上网, 发短信); S-18 a moverte sin perderte (来/去, 一直走, 左拐); S-19 a opinar como el Overseer (但是, 最, 越来越); S-20 a nombrar el propio idioma (声调, 拼音, 汉字, 语法).',
          'Consejo de despedida: la memoria es un músculo de refugio — los repasos del SRS y la Radio del Refugio mantienen las compuertas abiertas. Cinco minutos al día valen más que una hora al mes: 我每天练习, dice el cartel de tu propio sector.',
          'La siguiente puerta lleva a HSK 3: más conectores, más matices y las primeras historias largas. El Overseer firma aquí tu certificado, de su puño y letra: ACCESO CONCEDIDO.',
        ], [
          ['我的汉语越来越好了。', 'wǒ de hànyǔ yuèláiyuè hǎo le.', 'Mi chino mejora cada día.'],
          ['太好了！', 'tài hǎo le!', '¡Qué bien!'],
          ['我们一起去吧！', 'wǒmen yìqǐ qù ba!', '¡Vamos juntos!'],
        ]),
      ],
    ),
  ],
}
