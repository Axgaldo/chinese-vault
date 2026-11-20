/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 34 · HSK 3 — ESCUELA Y OFICINA (módulo 7/10)

   Del aula a la sala de juntas: el vocabulario del trabajo (办公室, 会议,
   经理) y del estudiante (作业, 复习, 成绩). La pieza estrella es 被, la
   pasiva del que la sufre: el chino que narra lo que le hicieron. Cierra
   con 教/叫, los gemelos de sonido que separan enseñar de llamar.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m27: VaultModule = {
  id: 'm27',
  hsk: 3,
  code: 'S-34',
  title: 'Escuela y oficina',
  subtitle: 'Del aula a la reunión: el chino que trabaja',
  entries: [
    e('w-ban-gong-shi', '办公室', 'bàngōngshì', 'oficina', '💼'),
    e('w-hui-yi', '会议', 'huìyì', 'reunión', '📅'),
    e('w-jing-li', '经理', 'jīnglǐ', 'director, gerente', '🕴️'),
    e('w-tong-shi', '同事', 'tóngshì', 'compañero de trabajo', '👔'),
    e('w-si-ji', '司机', 'sījī', 'conductor, chófer', '🚗'),
    e('w-cheng-ji', '成绩', 'chéngjì', 'nota, resultado académico', '💯'),
    e('w-nian-ji', '年级', 'niánjí', 'curso, grado (escolar)', '🎓'),
    e('w-fu-xi', '复习', 'fùxí', 'repasar', '📚'),
    e('w-zuo-ye', '作业', 'zuòyè', 'deberes, tarea', '📝'),
    e('w-hei-ban', '黑板', 'hēibǎn', 'pizarra', '⬛'),
    e('w-shu-xue', '数学', 'shùxué', 'matemáticas', '➗'),
    e('w-ti-yu', '体育', 'tǐyù', 'educación física', '⚽'),
    e('w-ci-yu', '词语', 'cíyǔ', 'palabra, vocablo', '🔤'),
    e('w-ju-zi', '句子', 'jùzi', 'frase, oración', '🔤', 'zi neutra: jùzi'),
    e('w-wen-hua', '文化', 'wénhuà', 'cultura', '🏛️'),
    e('w-li-shi', '历史', 'lìshǐ', 'historia', '🏺'),
    e('w-pu-tong-hua', '普通话', 'pǔtōnghuà', 'mandarín (putonghua)', '🇨🇳'),
    e('w-ti-gao', '提高', 'tígāo', 'mejorar, elevar', '📈'),
    e('w-shui-ping', '水平', 'shuǐpíng', 'nivel', '🎚️'),
    e('w-cha4', '差', 'chà', 'malo (calidad), dejar que desear', '👎'),
    e('w-xiao-zhang', '校长', 'xiàozhǎng', 'director de escuela', '🏫'),
    e('w-chi-dao', '迟到', 'chídào', 'llegar tarde', '⏰'),
    e('w-bei4', '被', 'bèi', 'partícula pasiva', '🎯', 'S + 被 + AGENTE + V: la pasiva'),
    e('w-qian-bi', '铅笔', 'qiānbǐ', 'lápiz', '✏️'),
    e('w-zi-dian', '字典', 'zìdiǎn', 'diccionario', '📕'),
    e('w-dian-zi', '电子', 'diànzǐ', 'electrónico', '💡'),
    e('w-jiao1-teach', '教', 'jiāo', 'enseñar', '👩‍🏫', 'jiāo (1er tono) al enseñar'),
  ],
  lessons: [
    lesson(
      'm27-l1',
      'El mundo del trabajo',
      'vocab',
      [
        ...drill('w-ban-gong-shi'),
        ...drill('w-hui-yi'),
        ...drill('w-jing-li'),
        ...drill('w-tong-shi'),
        ...drill('w-si-ji'),
        noteStep('n-ban-gong'),
        build('我爸爸是经理。', 'wǒ bàba shì jīnglǐ.', 'Mi padre es gerente.'),
        build('办公室里有十个人。', 'bàngōngshì li yǒu shí ge rén.', 'En la oficina hay diez personas.'),
      ],
      [
        grammar('n-ban-gong', 'El organigrama del refugio: oficina, jefes y colegas', [
          '办公室 (bàngōngshì) se desarma sola: 办公 = "gestionar asuntos" + 室 = habitación (la de 洗手间, S-28). La habitación donde el refugio lleva sus papeles. Dentro, la jerarquía manda: 经理 es el jefe con cartera (el gerente) y 校长 — que cierra el sector — es el jefe con pizarra: el director de la 学校 (S-05). Mismo trono, reinos distintos.',
          'La pareja del "co-": 同事 (compañero de TRABAJO) y 同学 (compañero de CLASE, S-10). El prefijo 同 significa "juntos, lo mismo": comparten tiempo y trinchera. Los 同学 estudian contigo; los 同事 te cubren la espalda en las reuniones. En un refugio, ambos son familia elegida.',
          '会议 (huìyì) es la reunión OFICIAL: con orden del día, hora de 开始 (S-13) y acta. Si en la puerta cuelga un cartel, es 会议; si es un corrillo de pasillo, no. Y 司机 (sījī) es el conductor: el morador que se conoce las carreteras de la superficie — en la caravana, el cargo más valioso.',
          'El molde espacial ya lo usaste con el río (S-30): LUGAR + 里 + 有 + COSA. 办公室里有十个人 = "en la oficina hay diez personas" (十 de S-00, 个 de S-03, 人 de S-02). Primero el escenario, después lo que hay en él: el chino siempre señala con el dedo antes de mostrar la mano.',
          'Tip del Overseer: 同事 y 同学 comparten 同 — hazte con el prefijo y fichas a media plantilla. Y no confundas al 经理 con el 校长: uno te paga, el otro te examina. Con los dos, puntualidad.',
        ], [
          ['我爸爸是经理。', 'wǒ bàba shì jīnglǐ.', 'Mi padre es gerente.'],
          ['办公室里有十个人。', 'bàngōngshì li yǒu shí ge rén.', 'En la oficina hay diez personas.'],
          ['他是我同事。', 'tā shì wǒ tóngshì.', 'Es mi compañero de trabajo.'],
        ]),
      ],
    ),
    lesson(
      'm27-l2',
      'La vida del estudiante',
      'vocab',
      [
        ...drill('w-cheng-ji'),
        ...drill('w-nian-ji'),
        ...drill('w-fu-xi'),
        ...drill('w-zuo-ye'),
        ...drill('w-hei-ban'),
        ...drill('w-shu-xue'),
        ...drill('w-ti-yu'),
        noteStep('n-xue-xi2'),
        build('我做作业。', 'wǒ zuò zuòyè.', 'Hago los deberes.'),
        build('明天有数学考试。', 'míngtiān yǒu shùxué kǎoshì.', 'Mañana hay examen de matemáticas.'),
      ],
      [
        grammar('n-xue-xi2', 'El kit del estudiante', [
          '作业 (zuòyè) son los deberes — y como todo encargo del refugio, SE HACEN: 做作业, con el 做 de S-08. No se "estudian" los deberes: se ejecutan y se entregan. 我做作业 = "hago los deberes", la frase que abre todas las tardes del estudiante chino.',
          '复习 (fùxí) es REPASAR: volver sobre lo ya visto. 学习 (S-08) abre el libro por primera vez; 复习 lo reabre antes del 考试 (S-23). La secuencia oficial del refugio: 学习 → 复习 → 考试 → 成绩. La 成绩 es el veredicto numérico: la nota que baja del cielo del sistema.',
          '年级 (niánjí) es el curso escolar: 三年级 = "tercer curso" (三 de S-00 + 年级). Y las asignaturas llegan en contraste: 数学 (matemáticas) y 体育 (educación física) — la tiza y la cancha. Sobre la 黑板 (pizarra) preside la lección: negra de 黑, dura de verdad.',
          'Para anunciar exámenes, el 有 de la posesión marca el calendario: 明天有数学考试 = "mañana HAY examen de matemáticas" (明天 de S-07). El día posee su evento, igual que la oficina posee sus diez personas: día + 有 + lo que trae.',
          'Tip del Overseer: el orden de la tarde es protocolo — primero 我做作业, después 复习, y solo entonces la Radio del Refugio. Un sector sin deberes hechos es un sector a oscuras.',
        ], [
          ['我做作业。', 'wǒ zuò zuòyè.', 'Hago los deberes.'],
          ['明天有数学考试。', 'míngtiān yǒu shùxué kǎoshì.', 'Mañana hay examen de matemáticas.'],
          ['他复习中文。', 'tā fùxí zhōngwén.', 'Repasa chino.'],
        ]),
      ],
    ),
    lesson(
      'm27-l3',
      'La pasiva del que la sufre',
      'grammar',
      [
        ...drill('w-bei4'),
        ...drill('w-chi-dao'),
        ...drill('w-cha4'),
        noteStep('n-bei4'),
        build('我的蛋糕被弟弟吃了。', 'wǒ de dàngāo bèi dìdi chī le.', 'Mi tarta se la ha comido mi hermano pequeño.'),
        build('他迟到了。', 'tā chídào le.', 'Ha llegado tarde.'),
      ],
      [
        grammar('n-bei4', '被: la pasiva del que la sufre', [
          'El chino tiene pasiva, pero no la gasta como el español. El molde: SUJETO + 被 + AGENTE + VERBO. 我的蛋糕被弟弟吃了 = mi tarta (la víctima) 被 mi hermano pequeño (el autor) se la comió. El sujeto no actúa: le actúan. 被 coloca al culpable en el medio y deja el crimen para el final.',
          'La clave: 被 es la pasiva de las MALAS NOTICIAS. En la lengua de cada día se reserva para desgracias — la tarta comida (蛋糕, S-15), el plan arruinado. Para lo bueno, el chino prefiere la voz activa: ✓弟弟吃了我的蛋糕 cuenta lo mismo, pero sin parte de daños. La pasiva con final feliz suena a teletipo, no a persona.',
          'Con uno mismo de agente, 被 se vuelve confesión juguetona: 苹果被我吃了 = "la manzana ha sido comida… por mí" (苹果, S-06). Es el tono del que alza la mano en el interrogatorio del refugio.',
          'Los males del sector: 迟到 (llegar tarde) viste 了 natural — 他迟到了 = "ha llegado tarde", el momento en que la tarde se hizo oficial. Y 差 (chà) es el adjetivo de la mala calidad: 成绩很差, "notas malas" — le toca fondo en la próxima lección.',
          'Tip del Overseer: ¿nadie salió perjudicado? Entonces no necesitas 被. La pasiva china es el parte de bajas del refugio: úsala cuando a TI —o a tu tarta— le hicieron algo.',
        ], [
          ['我的蛋糕被弟弟吃了。', 'wǒ de dàngāo bèi dìdi chī le.', 'Mi tarta se la ha comido mi hermano pequeño.'],
          ['他迟到了。', 'tā chídào le.', 'Ha llegado tarde.'],
          ['苹果被我吃了。', 'píngguǒ bèi wǒ chī le.', 'La manzana me la he comido yo. (confesión juguetona)'],
        ]),
      ],
    ),
    lesson(
      'm27-l4',
      'Las palabras y el nivel',
      'vocab',
      [
        ...drill('w-ci-yu'),
        ...drill('w-ju-zi'),
        ...drill('w-wen-hua'),
        ...drill('w-li-shi'),
        ...drill('w-pu-tong-hua'),
        ...drill('w-ti-gao'),
        ...drill('w-shui-ping'),
        noteStep('n-shui-ping2'),
        build('我要提高中文水平。', 'wǒ yào tígāo zhōngwén shuǐpíng.', 'Quiero mejorar mi nivel de chino.'),
        build('他的成绩很差。', 'tā de chéngjì hěn chà.', 'Sus notas son malas.'),
        ...practice('w-cha4'),
      ],
      [
        grammar('n-shui-ping2', '水平, 提高 y 差: el termómetro del refugio', [
          '水平 (shuǐpíng) es el NIVEL de una habilidad: 中文水平 = "nivel de chino". La etimología es de albañil: "agua plana" — la superficie del agua siempre queda perfectamente horizontal, como la burbuja del nivel de obra. Tu chino también tiene una marca en el vidrio; este sector trata de subirla.',
          '提高 (tígāo) = levantar hacia arriba: 提高 + lo que mejora — 提高中文水平 (mejorar el nivel de chino), 提高成绩 (mejorar las notas). Es el verbo del progreso: la dirección siempre es arriba. Y su reverso oscuro: 差 (chà), "malo" — el veredicto de la mala calidad. 成绩很差 = "las notas son malas". Dicho sin adornos, como manda el refugio.',
          '词语 (cíyǔ) es la palabra, el vocablo; 句子 (jùzi) es la frase. Las piezas y el muro: con 词语 se levantan 句子. Ojo con la sílaba neutra: jùzi — la zi se desinfla, como en tàiyang o biérén.',
          '普通话 (pǔtōnghuà) es el mandarín estándar: literalmente "habla común" (普通 = común, 话 = habla). Es el chino de la tele, la escuela y la Radio del Refugio — el que TÚ estudias. Y el paquete humanista del sector: 文化 (cultura) e 历史 (historia), el archivo de la superficie.',
          'Tip del Overseer: el objetivo oficial del refugio cabe en una línea: 提高普通话水平. Cada lección terminada es una décima de grado en el termómetro. Sin prisa, pero sin pausa, morador.',
        ], [
          ['我要提高中文水平。', 'wǒ yào tígāo zhōngwén shuǐpíng.', 'Quiero mejorar mi nivel de chino.'],
          ['他的成绩很差。', 'tā de chéngjì hěn chà.', 'Sus notas son malas.'],
          ['他讲普通话。', 'tā jiǎng pǔtōnghuà.', 'Habla mandarín (putonghua). (讲 de S-33)'],
        ]),
      ],
    ),
    lesson(
      'm27-l5',
      'Enseñar y aprender',
      'vocab',
      [
        ...drill('w-jiao1-teach'),
        ...drill('w-qian-bi'),
        ...drill('w-zi-dian'),
        ...drill('w-dian-zi'),
        ...drill('w-xiao-zhang'),
        noteStep('n-jiao-shu'),
        build('老师教我们数学。', 'lǎoshī jiāo wǒmen shùxué.', 'El profesor nos enseña matemáticas.'),
        build('我用字典学习。', 'wǒ yòng zìdiǎn xuéxí.', 'Estudio con el diccionario.'),
      ],
      [
        grammar('n-jiao-shu', '教 y 叫: enseñar y llamar', [
          'Los gemelos de sonido: 教 jiāo (1.er tono) = ENSEÑAR · 叫 jiào (4.º tono) = LLAMAR(SE) (S-02). Un tono separa el aula del registro civil: 老师教我们数学 = "el profesor nos enseña matemáticas" · 我叫王明 = "me llamo Wang Ming". De oído se distinguen por la forma: jiāo alto y plano; jiào en caída.',
          'El molde de 教 es el de entrega de S-18 (como 送): 教 + PERSONA + MATERIA — 老师教我们数学: primero el destinatario, después la mercancía. Y para la materia suelta: 老师教中文, "el profesor enseña chino".',
          'El kit del aula: 铅笔 (qiānbǐ, el lápiz) y 字典 (zìdiǎn, el diccionario — literalmente "catálogo de 字, caracteres", el mismo 字 de 我认识这个字, S-08). 我用字典学习 = "estudio con el diccionario": el 用 de S-19 convierte la herramienta en método.',
          '电子 (diànzǐ) = "electrónico": el prefijo "e-" del chino. 电子邮件 (diànzǐ yóujiàn) es el correo electrónico — "correo de electrones". En el refugio sobran los aparatos… pero la Hermandad trae los suyos. Y 校长 (xiàozhǎng): 学校 (S-05) + 长 ("el que manda") = director de escuela, el gemelo escolar del 经理.',
          'Tip del Overseer: 教/叫 se distinguen de oído por el tono — 1 alto (enseñar) frente a 4 en caída (llamar). Confundirlos tiene consecuencias: 我叫你 ("te llamo") no es 我教你 ("te enseño"). Aunque en este refugio, tarde o temprano, acabaremos haciendo las dos cosas.',
        ], [
          ['老师教我们数学。', 'lǎoshī jiāo wǒmen shùxué.', 'El profesor nos enseña matemáticas.'],
          ['我用字典学习。', 'wǒ yòng zìdiǎn xuéxí.', 'Estudio con el diccionario.'],
          ['老师教中文。', 'lǎoshī jiāo zhōngwén.', 'El profesor enseña chino.'],
        ]),
      ],
    ),
    lesson(
      'm27-l6',
      'Auditoría del Sector 34',
      'review',
      [
        match('w-ban-gong-shi', 'w-cheng-ji', 'w-bei4', 'w-zi-dian'),
        match('w-jing-li', 'w-tong-shi', 'w-si-ji', 'w-xiao-zhang'),
        match('w-fu-xi', 'w-zuo-ye', 'w-shu-xue', 'w-ti-yu', 'w-hei-ban'),
        match('w-ci-yu', 'w-ju-zi', 'w-pu-tong-hua', 'w-shui-ping', 'w-ti-gao'),
        { type: 'listen', entry: 'w-hui-yi' },
        { type: 'listen', entry: 'w-nian-ji' },
        dictate('w-fu-xi'),
        dictate('w-jing-li'),
        typeP('w-pu-tong-hua'),
        build('我做作业。', 'wǒ zuò zuòyè.', 'Hago los deberes.'),
        build('我要提高中文水平。', 'wǒ yào tígāo zhōngwén shuǐpíng.', 'Quiero mejorar mi nivel de chino.'),
        ...practice('w-chi-dao'),
        ...practice('w-dian-zi'),
      ],
    ),
  ],
}
