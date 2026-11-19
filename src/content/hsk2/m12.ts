/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 12 · HSK 2 — CASA Y POSICIONES (módulo 2/10)

   Las habitaciones del refugio y el molde espacial: X + 在 + referencia +
   旁边/前面/后面. La nota central explica el 的 como "posesivo del espacio"
   (el espejo exacto del "al lado DE la escuela" español) y 站 abre la ciudad:
   车站, 火车站... la misma lógica de bloques de siempre.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m12: VaultModule = {
  id: 'm12',
  hsk: 2,
  code: 'S-12',
  title: 'Casa y Posiciones',
  subtitle: 'Las habitaciones del refugio y dónde está cada cosa',
  entries: [
    e('w-fang-jian', '房间', 'fángjiān', 'habitación', '🛏️', 'fáng = habitación · jiān = espacio entre paredes'),
    e('w-zhuo-zi', '桌子', 'zhuōzi', 'mesa', '🍽️', 'la segunda sílaba va sin tono'),
    e('w-yi-zi', '椅子', 'yǐzi', 'silla', '🪑', 'la segunda sílaba va sin tono'),
    e('w-chuang-hu', '窗户', 'chuānghu', 'ventana', '🪟', 'la segunda sílaba va sin tono'),
    e('w-men2', '门', 'mén', 'puerta', '🚪'),
    e('w-gong-yuan', '公园', 'gōngyuán', 'parque', '🌳', 'gōng = público · yuán = jardín'),
    e('w-hua-yuan', '花园', 'huāyuán', 'jardín', '🌷', 'huā = flor · yuán = jardín'),
    e('w-tu-shu-guan', '图书馆', 'túshūguǎn', 'biblioteca', '📚', 'tú = imagen · shū = libro · guǎn = edificio'),
    e('w-zhan4', '站', 'zhàn', 'estación, parada', '🚏'),
    e('w-pang-bian', '旁边', 'pángbiān', 'al lado de', '↔️'),
    e('w-qian-mian', '前面', 'qiánmiàn', 'delante', '⬆️'),
    e('w-hou-mian', '后面', 'hòumiàn', 'detrás', '⬇️'),
  ],
  lessons: [
    lesson(
      'm12-l1',
      'Habitaciones del refugio',
      'vocab',
      [
        ...drill('w-fang-jian'),
        ...drill('w-zhuo-zi'),
        ...drill('w-yi-zi'),
        ...drill('w-chuang-hu'),
        ...drill('w-men2'),
        noteStep('n-weizhi'),
        build('图书馆在学校旁边。', 'túshūguǎn zài xuéxiào pángbiān.', 'La biblioteca está al lado de la escuela.'),
        build('椅子在桌子旁边。', 'yǐzi zài zhuōzi pángbiān.', 'La silla está al lado de la mesa.'),
      ],
      [
        grammar('n-weizhi', 'X + 在 + Y: el molde de las posiciones', [
          'Para decir dónde está algo, el chino no usa preposiciones sueltas: usa un molde de tres piezas: COSA + 在 + PUNTO DE REFERENCIA + (的) + PALABRA DE POSICIÓN. 椅子在桌子旁边 = "la silla está mesa-al-lado". La clave está en la última pieza: 旁边, 前面 y 后面 no son adverbios — son NOMBRES: "el costado", "el frente", "la parte de atrás".',
          'A) EL 的 POSESIVO DEL ESPACIO: igual que 朋友的家 es "la casa DEL amigo", 学校的旁边 es literalmente "el costado DE la escuela". El español mira desde la posición hacia la cosa ("al lado DE la escuela"); el chino mira al revés, desde la cosa hacia la posición ("la escuela, su costado"). Es el mismo 的 del Sector 2 — ahora posesionando lugares en vez de personas.',
          'B) EL ORDEN ES INNEGOCIABLE: primero se planta la referencia, luego llega la posición. El error típico del morador hispanohablante es calcar el orden de su idioma: ✗图书馆在旁边学校 ("biblioteca está al-lado escuela"). El chino exige el espejo: ✓图书馆在学校旁边. Y ojo: si intercambias cosa y referencia, la frase no falla — dice OTRA cosa: 学校在图书馆旁边 = "la escuela está al lado de la biblioteca". Mismo molde, mundo distinto.',
          'C) EL 的 SE CAE SIN RUIDO: en frases cortas del día a día, el 的 desaparece: 图书馆在学校旁边 suena más natural que 图书馆在学校的旁边. Cuanto más largo o formal el nombre, más tiende el 的 a quedarse. Omitirlo no es un error: es economía de refugio.',
          'Tip del Overseer: fabrica la frase en este orden mental y nunca fallarás: COSA → 在 → referencia → posición. Primero se planta el terreno, luego se apunta el dedo.',
        ], [
          ['图书馆在学校旁边。', 'túshūguǎn zài xuéxiào pángbiān.', 'La biblioteca está al lado de la escuela.'],
          ['椅子在桌子旁边。', 'yǐzi zài zhuōzi pángbiān.', 'La silla está al lado de la mesa.'],
          ['学校在图书馆旁边。', 'xuéxiào zài túshūguǎn pángbiān.', 'La escuela está al lado de la biblioteca. (mismo molde, mundo distinto)'],
        ]),
      ],
    ),
    lesson(
      'm12-l2',
      'Fuera del refugio',
      'grammar',
      [
        ...drill('w-gong-yuan'),
        ...drill('w-hua-yuan'),
        ...drill('w-tu-shu-guan'),
        ...drill('w-zhan4'),
        noteStep('n-zhan'),
        build('我家在公园后面。', 'wǒ jiā zài gōngyuán hòumiàn.', 'Mi casa está detrás del parque.'),
        build('车站在学校前面。', 'chēzhàn zài xuéxiào qiánmiàn.', 'La parada está delante de la escuela.'),
      ],
      [
        grammar('n-zhan', '站: la parada donde te plantas', [
          '站 (zhàn) significa literalmente "estar de pie": donde te PLANTAS a esperar. De ahí su segundo oficio: "parada" o "estación", el punto fijo del mapa por donde pasa el transporte del refugio.',
          'A) CADA TRANSPORTE CON SU 站: el chino apila [vehículo] + 站 y sale la parada de ese vehículo: 车站 (chēzhàn) es "parada de bus o de tren". 火车站 (huǒchēzhàn, estación de tren) une 火车 — "vehículo de fuego", las viejas locomotoras de vapor — con su 站. En una gran ciudad, 地铁站 (dìtiězhàn) será tu "parada de metro": mismo molde, mismo truco.',
          'B) UN LUGAR COMO CUALQUIER OTRO: la parada encaja en el molde de posiciones sin pedir nada especial: 车站在学校前面 = "la parada está delante de la escuela" — COSA + 在 + referencia + posición, tal cual aprendiste en la lección anterior. Y para anunciar tu destino, solo añade el verbo de movimiento: 我去车站 (wǒ qù chēzhàn, "voy a la parada").',
          'C) DOBLE VIDA: 站 también es el verbo "ponerse de pie": 站在门旁边 = "plantarse al lado de la puerta". ¿Cómo saber cuál es cuál? Por su sitio en la frase: cuando 站 va seguida de un lugar (站在...) es verbo; cuando va pegada a un vehículo o abre la frase como sitio, es parada. El contexto del refugio siempre lo aclara.',
          'Tip del Overseer: cualquier transporte que aprendas + 站 te regala su parada. Un bloque, cero preposiciones: el chino te vende el billete ya troceado.',
        ], [
          ['车站在学校前面。', 'chēzhàn zài xuéxiào qiánmiàn.', 'La parada está delante de la escuela.'],
          ['我家在公园后面。', 'wǒ jiā zài gōngyuán hòumiàn.', 'Mi casa está detrás del parque.'],
          ['火车站在公园旁边。', 'huǒchēzhàn zài gōngyuán pángbiān.', 'La estación de tren está al lado del parque. (火车 = tren)'],
        ]),
      ],
    ),
    lesson(
      'm12-l3',
      'Delante o detrás',
      'vocab',
      [
        ...drill('w-pang-bian'),
        ...drill('w-qian-mian'),
        ...drill('w-hou-mian'),
        ...practice('w-zhuo-zi'),
        ...practice('w-men2'),
        ...practice('w-gong-yuan'),
        noteStep('n-qian-hou-lin'),
        build('我的猫在门后面。', 'wǒ de māo zài mén hòumiàn.', 'Mi gato está detrás de la puerta.'),
      ],
      [
        grammar('n-qian-hou-lin', 'La tríada espacial y la pregunta 在哪儿', [
          'Con 旁边, 前面 y 后面 ya tienes el mapa completo del refugio: al lado, delante y detrás. Las tres son nombres de posición y las tres encajan en el mismo molde: COSA + 在 + referencia + posición. No hay nada nuevo que conjugar: solo tres vecinos que se apuntan al mismo sistema.',
          'A) CÓMO PREGUNTAR: el chino no gira la frase ni inventa palabras nuevas: 学校在哪儿？ (xuéxiào zài nǎr?) = "¿dónde está la escuela?". Y la respuesta usa EL MISMO esqueleto: 学校在公园旁边. Pregunta y respuesta son la misma máquina con el hueco en otro sitio: no existen dos estructuras ("¿dónde está X?" frente a "X está en Y"); existe UN molde.',
          'B) EL ANCLA POR DEFECTO: cuando 前面 o 后面 van sin referencia clara, el ancla es el QUE HABLA: 前面 = "hacia donde miro", 后面 = "a mis espaldas". 前面有车站 = "delante (de mí) hay una parada". En cambio 旁边 nunca anda sola: algo siempre está "al lado DE" otra cosa — necesita vecino como el refugio necesita paredes.',
          'C) DECLARA EL ANCLA SI IMPORTA: dos moradores cara a cara: la 前面 de uno es la 后面 del otro. Cuando el punto de vista pueda confundir, el chino lo cierra nombrando al dueño: 我前面 (delante de mí), 门前面 (delante de la puerta), 他后面 (detrás de él). Nada de ambigüedad: el ancla siempre se puede declarar.',
          'Tip del Overseer: ¿se ha perdido algo en el refugio? Pregunta X在哪儿？ y apunta con el dedo mientras escuchas la respuesta. Dos palabras que abren cualquier mapa del mundo chino.',
        ], [
          ['我的猫在门后面。', 'wǒ de māo zài mén hòumiàn.', 'Mi gato está detrás de la puerta.'],
          ['学校在哪儿？', 'xuéxiào zài nǎr?', '¿Dónde está la escuela?'],
          ['前面有车站。', 'qiánmiàn yǒu chēzhàn.', 'Delante hay una parada. (ancla: el que habla)'],
        ]),
      ],
    ),
    lesson(
      'm12-l4',
      'Auditoría del Sector 12',
      'review',
      [
        match('w-fang-jian', 'w-zhuo-zi', 'w-yi-zi', 'w-chuang-hu'),
        match('w-men2', 'w-gong-yuan', 'w-hua-yuan', 'w-tu-shu-guan'),
        { type: 'listen', entry: 'w-zhan4' },
        { type: 'listen', entry: 'w-pang-bian' },
        dictate('w-fang-jian'),
        dictate('w-tu-shu-guan'),
        typeP('w-pang-bian'),
        build('椅子在桌子旁边。', 'yǐzi zài zhuōzi pángbiān.', 'La silla está al lado de la mesa.'),
        build('车站在学校前面。', 'chēzhàn zài xuéxiào qiánmiàn.', 'La parada está delante de la escuela.'),
        ...practice('w-hou-mian'),
      ],
    ),
  ],
}
