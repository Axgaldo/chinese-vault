/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 28 · HSK 3 — EL RESULTADO DE LAS ACCIONES (módulo 1/10)

   El chino que completa: la familia de complementos de resultado
   (V+完/好/到/见/懂) y la partícula 把, que adelanta el objeto porque
   le va a pasar algo. Los apuntes explican el MECANISMO, con contrastes
   bien/mal, para entender cómo piensa el chino.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m21: VaultModule = {
  id: 'm21',
  hsk: 3,
  code: 'S-28',
  title: 'El resultado de las acciones',
  subtitle: 'El complemento de resultado y la partícula 把: el chino que completa',
  entries: [
    e('w-ba3', '把', 'bǎ', 'partícula: manejar el objeto', '🥢', 'adelanta el objeto: S+把+O+V+…'),
    e('w-fang4', '放', 'fàng', 'poner, soltar', '📍'),
    e('w-ban1', '搬', 'bān', 'mudar, llevar (cosas pesadas)', '📦'),
    e('w-guan1', '关', 'guān', 'cerrar', '🚪'),
    e('w-jie1', '接', 'jiē', 'recoger (a alguien)', '🤲', '接+人: ir a buscar a alguien'),
    e('w-shua1', '刷', 'shuā', 'frotar, cepillar', '🪥'),
    e('w-da-sao', '打扫', 'dǎsǎo', 'limpiar (el suelo, la casa)', '🧹'),
    e('w-wan-cheng', '完成', 'wánchéng', 'completar, acabar', '✅'),
    e('w-jian-cha', '检查', 'jiǎnchá', 'revisar, comprobar', '🔍'),
    e('w-chu-xian', '出现', 'chūxiàn', 'aparecer', '✨'),
    e('w-fa-xian', '发现', 'fāxiàn', 'descubrir, darse cuenta', '🔎'),
    e('w-ming-bai', '明白', 'míngbai', 'entender, comprender', '💡'),
    e('w-ji-de', '记得', 'jìde', 'recordar', '🧠'),
    e('w-wang-ji', '忘记', 'wàngjì', 'olvidar', '🌀', 'la pareja de 记得'),
    e('w-xi-zao', '洗澡', 'xǐzǎo', 'ducharse, bañarse', '🚿'),
    e('w-xi-shou-jian', '洗手间', 'xǐshǒujiān', 'aseo, baño', '🚻'),
  ],
  lessons: [
    lesson(
      'm21-l1',
      'Hacer hasta el final',
      'vocab',
      [
        ...drill('w-fang4'),
        ...drill('w-guan1'),
        ...drill('w-shua1'),
        ...drill('w-da-sao'),
        noteStep('n-jieguo-bu'),
        build('我打扫了房间。', 'wǒ dǎsǎo le fángjiān.', 'He limpiado la habitación.'),
        build('他关了门。', 'tā guān le mén.', 'Él ha cerrado la puerta.'),
      ],
      [
        grammar('n-jieguo-bu', 'V+完/好/到/见/懂: el complemento de resultado', [
          'En S-18 descubriste el truco de 到: pegado a un verbo, convierte el intento en éxito (找 "buscar" → 找到 "encontrar"). Pues no estaba solo: el chino tiene toda una FAMILIA de sufijos que certifican cómo acaba una acción. El verbo nombra lo que haces; el complemento firma lo que conseguiste.',
          'Los cinco sellos del sector: 吃完 (comer + 完 "entero" = comerlo TODO), 听懂 (oír + 懂 "entender" = oírlo Y entenderlo), 看见 (mirar + 见 "ver" = mirar y LOGRAR ver), 写好 (escribir + 好 "bien" = escribirlo y rematarlo) y 做错 (hacer + 错 "equivocación" = hacerlo… mal). ¡Los fracasos también se certifican!',
          'El contraste que lo explica todo: 我吃 es "como" — la acción en marcha, sin veredicto. Si quieres decir "ya he comido", ✗我吃 se queda a medias: ✓我吃完了 — la misión está cerrada y el plato vacío. El chino no da por terminada una tarea sin su sello.',
          'Como todo lo que se cumple, el resultado suele vestirse con 了 (S-13): 我听懂了 = "lo oí y lo entendí". Y el sello también entra en negativa: 没看见 = "no lo vi" (miré, pero no apareció).',
          'Tip del Overseer: antes de dar por terminada una acción, pregúntate ¿cómo acabó? ¿Entero (完)? ¿Bien (好)? ¿Logrado (到)? ¿Visto (见)? ¿Entendido (懂)? El sello que falta es el informe que te va a pedir el Overseer.',
        ], [
          ['我吃完了。', 'wǒ chī wán le.', 'Ya he comido (del todo).'],
          ['我听懂了。', 'wǒ tīng dǒng le.', 'Lo he oído y lo he entendido.'],
          ['我没看见他。', 'wǒ méi kànjiàn tā.', 'No lo he visto. (miré, pero no apareció)'],
        ]),
      ],
    ),
    lesson(
      'm21-l2',
      'La partícula 把',
      'grammar',
      [
        ...drill('w-ba3'),
        ...drill('w-ban1'),
        noteStep('n-ba-ba'),
        build('我把窗户关了。', 'wǒ bǎ chuānghu guān le.', 'He cerrado la ventana.'),
        build('我把书放在桌子上。', 'wǒ bǎ shū fàng zài zhuōzi shàng.', 'He puesto el libro en la mesa. (放…在 = "poner EN" · 书 shū = libro)'),
        build('他们把桌子搬到房间。', 'tāmen bǎ zhuōzi bān dào fángjiān.', 'Han movido la mesa a la habitación.'),
      ],
      [
        grammar('n-ba-ba', '把: la partícula que maneja el objeto', [
          '把 (bǎ) hace algo muy chino: COGE EL OBJETO y lo adelanta, colocándolo ANTES del verbo. El molde: S + 把 + OBJETO + VERBO + remate. 我把窗户关了 es literalmente "yo, a la ventana, la cerré". El objeto pasa a primer plano porque le va a PASAR algo: se cierra, se mueve, se rompe, se arregla.',
          'La regla de oro: 把 solo entra cuando el objeto CAMBIA o SE MUEVE — cuando la acción le deja marca. 关窗户 = "cerrar ventanas" en abstracto; 我把窗户关了 = "ESA ventana ahora está cerrada". Por eso los sentimientos no lo aceptan: ✗我把喜欢 — gustar no deja marcas — · ✓我喜欢. Los estados de ánimo viajan sin 把.',
          'Y fíjate: tras el verbo, 把 SIEMPRE pide un remate (了, un complemento de resultado, un lugar…): ✗我把窗户关 se queda cojo, como un informe sin firma. La frase con 把 anuncia consecuencias: hay que certificarlas.',
          'Ojo al doble oficio del carácter: este 把 es pura GRAMÁTICA, una partícula de manejo. "Coger" con las manos es 拿 (S-18). Mismo trazado, distinto uniforme: aquí 把 no se toca, se usa.',
          'Tip del Overseer: ¿la acción le hace algo a un objeto concreto y queda certificada (了, 完, 在+lugar)? Entonces 把 te está esperando. ¿Es un sentimiento o algo vago? Ni se te ocurra, morador.',
        ], [
          ['我把窗户关了。', 'wǒ bǎ chuānghu guān le.', 'He cerrado la ventana. (le ha pasado algo: ahora está cerrada)'],
          ['我把书放在桌子上。', 'wǒ bǎ shū fàng zài zhuōzi shàng.', 'He puesto el libro en la mesa. (书 shū = libro)'],
          ['他们把桌子搬到房间。', 'tāmen bǎ zhuōzi bān dào fángjiān.', 'Han movido la mesa a la habitación. (V+到 de S-18: el movimiento se cumple)'],
        ]),
      ],
    ),
    lesson(
      'm21-l3',
      'El descubrimiento',
      'vocab',
      [
        ...drill('w-chu-xian'),
        ...drill('w-fa-xian'),
        ...drill('w-ming-bai'),
        ...drill('w-ji-de'),
        ...drill('w-wang-ji'),
        noteStep('n-faxian'),
        build('我发现了一个问题。', 'wǒ fāxiàn le yí ge wèntí.', 'He descubierto un problema.'),
        build('我忘记了他的名字。', 'wǒ wàngjì le tā de míngzi.', 'He olvidado su nombre.'),
        build('老师，我不明白。', 'lǎoshī, wǒ bù míngbai.', 'Profesor, no lo entiendo.'),
      ],
      [
        grammar('n-faxian', '发现 y 出现: dos formas de llegar a la luz', [
          'Parecen gemelos y no lo son. 出现 (chūxiàn) es APARECER: el sujeto sale a escena por sí solo — el sol aparece, un problema aparece. El sujeto no hace nada: se deja ver. 发现 (fāxiàn) es DESCUBRIR: el sujeto sale a BUSCAR y encuentra — tú descubres un error en el informe.',
          'La prueba del algodón: ¿quién actúa? 问题出现了 = "ha aparecido un problema" (él solito). 我发现了问题 = "he descubierto el problema" (yo, con mis ojos y mi curiosidad). 出现 le pasa al mundo; 发现 lo haces tú.',
          'Dos parejas de memoria del sector: 记得 (recordar) ↔ 忘记 (olvidar), los dos lados de la misma cinta. Y 明白 (entender) acepta el molde de la lección 1: 听明白 = oír-hasta-entender. El verbo dice qué oíste; 明白 certifica que entró.',
          'Tip del Overseer: cuando descubras algo por ti mismo, dilo con 发现 y remata con 了: 我发现了. Los descubrimientos sin certificar no entran en el registro del refugio.',
        ], [
          ['问题出现了。', 'wèntí chūxiàn le.', 'Ha aparecido un problema.'],
          ['我发现了一个问题。', 'wǒ fāxiàn le yí ge wèntí.', 'He descubierto un problema.'],
          ['我忘记了他的名字。', 'wǒ wàngjì le tā de míngzi.', 'He olvidado su nombre.'],
        ]),
      ],
    ),
    lesson(
      'm21-l4',
      'Recoger y completar',
      'vocab',
      [
        ...drill('w-jie1'),
        ...drill('w-wan-cheng'),
        ...drill('w-jian-cha'),
        ...drill('w-xi-zao'),
        ...drill('w-xi-shou-jian'),
        noteStep('n-jie-ren'),
        build('明天我去机场接你。', 'míngtiān wǒ qù jīchǎng jiē nǐ.', 'Mañana voy al aeropuerto a buscarte. (机场 jīchǎng = aeropuerto)'),
        build('我完成了考试。', 'wǒ wánchéng le kǎoshì.', 'He terminado el examen. (考试 kǎoshì = examen)'),
        build('我想洗澡。', 'wǒ xiǎng xǐzǎo.', 'Quiero ducharme.'),
      ],
      [
        grammar('n-jie-ren', '接+人: la misión de recoger a alguien', [
          '接 (jiē) tiene un uso estrella: RECOGER A ALGUIEN. No es recibir paquetes: es ir al punto de encuentro y traer a la persona. El molde de la cita: 去 + LUGAR + 接 + PERSONA — 明天我去机场接你 = "mañana voy al aeropuerto a buscarte". Quien recibe a otro en la puerta del refugio está firmando un pacto de caballeros.',
          '完成 (completar) y 检查 (revisar) son los verbos de oficina del sector: uno cierra la misión, el otro busca fugas antes de cerrarla. Y también visten complemento de resultado cuando toca: 检查完 = "revisado del todo".',
          'Y mira qué elegantes son los compuestos VERBO+OBJETO: 洗澡 (ducharse) es "lavar" (洗) + "el baño que uno se echa" (澡) — lavarse a uno mismo, como 吃饭 (comer-comida, S-13). Su pariente de pasillo: 洗手间, literalmente "sala de lavarse las manos"… el aseo. La palabra más útil del curso cuando exploras un refugio ajeno.',
          'Tip del Overseer: 接 sin persona detrás es una misión sin objetivo. Cuando digas que vas a recoger a alguien, nómbralo: 去 + lugar + 接 + persona. El registro no admite rescates genéricos.',
        ], [
          ['明天我去机场接你。', 'míngtiān wǒ qù jīchǎng jiē nǐ.', 'Mañana voy al aeropuerto a buscarte. (机场 jīchǎng = aeropuerto)'],
          ['我完成了考试。', 'wǒ wánchéng le kǎoshì.', 'He terminado el examen. (考试 kǎoshì = examen)'],
          ['我想洗澡。', 'wǒ xiǎng xǐzǎo.', 'Quiero ducharme.'],
        ]),
      ],
    ),
    lesson(
      'm21-l5',
      'Auditoría del Sector 28',
      'review',
      [
        match('w-fang4', 'w-guan1', 'w-shua1', 'w-da-sao'),
        match('w-ban1', 'w-jie1', 'w-wan-cheng', 'w-jian-cha'),
        match('w-chu-xian', 'w-fa-xian', 'w-ming-bai', 'w-ji-de', 'w-wang-ji'),
        { type: 'listen', entry: 'w-ba3' },
        { type: 'listen', entry: 'w-xi-shou-jian' },
        dictate('w-wan-cheng'),
        dictate('w-ming-bai'),
        typeP('w-ba3'),
        build('我把窗户关了。', 'wǒ bǎ chuānghu guān le.', 'He cerrado la ventana.'),
        build('我完成了考试。', 'wǒ wánchéng le kǎoshì.', 'He terminado el examen. (考试 kǎoshì = examen)'),
        ...practice('w-xi-zao'),
        ...practice('w-jie1'),
      ],
    ),
  ],
}
