/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 38 · HSK 3 — LAS IDEAS ABSTRACTAS (módulo 11/11 · FINAL)

   El último sector del HSK 3: las palabras que PIENSAN el mundo —
   oportunidad, método, cambio, influencia — la gran pregunta (为什么)
   y la compañía (跟). Cierra el protocolo HSK 3 del refugio con la
   auditoría final y el certificado del Overseer.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m31: VaultModule = {
  id: 'm31',
  hsk: 3,
  code: 'S-38',
  title: 'Las ideas abstractas',
  subtitle: 'Oportunidades, cambios y el porqué: el chino que piensa el mundo',
  entries: [
    e('w-ban-fa', '办法', 'bànfǎ', 'método, solución, manera', '💡'),
    e('w-ji-hui', '机会', 'jīhuì', 'oportunidad', '🚪'),
    e('w-guan-xi', '关系', 'guānxi', 'relación, relación social', '🤝', 'xi neutra: guānxi'),
    e('w-zuo-yong', '作用', 'zuòyòng', 'efecto, función', '⚙️'),
    e('w-ying-xiang', '影响', 'yǐngxiǎng', 'influencia, afectar', '🌊'),
    e('w-xing-qu', '兴趣', 'xìngqù', 'interés', '🎯'),
    e('w-gu-shi', '故事', 'gùshi', 'cuento, historia', '📖', 'shi neutra: gùshi'),
    e('w-bian-hua', '变化', 'biànhuà', 'cambio (sustantivo/verbo)', '🔄'),
    e('w-yu-dao', '遇到', 'yùdào', 'encontrarse con, toparse', '🎲'),
    e('w-li-kai', '离开', 'líkāi', 'irse, dejar (un lugar)', '🚪'),
    e('w-jing-guo', '经过', 'jīngguò', 'pasar por; proceso', '🛤️'),
    e('w-biao-yan', '表演', 'biǎoyǎn', 'actuación, actuar', '🎭'),
    e('w-xiang4-like', '像', 'xiàng', 'parecerse a, como', '🪞', 'A像B: A se parece a B'),
    e('w-gen1', '跟', 'gēn', 'con (compañía); y', '👣', '跟…见面/结婚: la persona acompañante'),
    e('w-shi3', '使', 'shǐ', 'hacer que, causar', '⚡', 'formal: 使+O+V/ADJ'),
    e('w-guo-qu', '过去', 'guòqù', 'el pasado; pasar (hacia allí)', '⏪'),
    e('w-zhong-jian', '中间', 'zhōngjiān', 'en medio, centro', '📍'),
    e('w-wei-shen-me', '为什么', 'wèishénme', '¿por qué?', '❓'),
    e('w-ke-ai', '可爱', "kě'ai", 'mono, adorable', '🥰'),
    e('w-you-ming', '有名', 'yǒumíng', 'famoso, célebre', '🌟'),
    e('w-zhong-yao', '重要', 'zhòngyào', 'importante', '❗'),
    e('w-duan-lian', '锻炼', 'duànliàn', 'ejercitar (el cuerpo), templar', '🏋️'),
    e('w-qi2', '骑', 'qí', 'montar (bici, caballo)', '🚴', 'qí (2º tono): 骑车'),
    e('w-gua1', '刮', 'guā', 'rascar; (viento) soplar', '🌬️', '刮风 = hace viento'),
    e('w-hua4', '画', 'huà', 'dibujar, pintar; dibujo', '🖌️'),
    e('w-zi-ji', '自己', 'zìjǐ', 'uno mismo, propio', '🪞'),
  ],
  lessons: [
    lesson(
      'm31-l1',
      'La gran pregunta',
      'vocab',
      [
        ...drill('w-wei-shen-me'),
        ...drill('w-zi-ji'),
        ...drill('w-zhong-jian'),
        noteStep('n-wei-shenme'),
        build('你为什么学中文？', 'nǐ wèishénme xué zhōngwén?', '¿Por qué aprendes chino?'),
        build('我自己做饭。', 'wǒ zìjǐ zuò fàn.', 'Me cocino yo mismo. (做饭 = "cocinar")'),
      ],
      [
        grammar('n-wei-shenme', '为什么: la pregunta que abre expedientes', [
          '为什么 (wèishénme) es LA pregunta del sector — la que convierte cualquier informe en una investigación. Pregunta la RAZÓN, y su respuesta natural es la que ya dominas: 因为 (S-21). 你为什么学中文？→ 因为我喜欢中文. Pregunta y respuesta: el expediente queda abierto y cerrado en dos frases.',
          'La posición manda: 为什么 se coloca DELANTE de lo que pregunta — entre el sujeto y el verbo. 你为什么学中文？ = "¿POR QUÉ aprendes chino?". Si lo echas al final, ✗你学中文为什么？ ya no pregunta la razón: suena a "¿y por qué chino y no otro idioma?", un matiz de encuesta rara. El chino pone el porqué ANTES de que pase nada.',
          '自己 (zìjǐ) es el potenciador del sujeto: "uno mismo", "por sí solo". Detrás de un sujeto o un verbo subraya que NO hay intermediarios: 我自己做饭 = "me cocino YO MISMO" (nadie cocina por mí), 自己做饭 = "cocinárselo uno mismo" (en vez de comprarlo). Y con 的 (S-04) se vuelve posesivo enfático: 我自己的房间 = "mi PROPIA habitación" — con la puerta cerrada.',
          '中间 (zhōngjiān) es "en medio": el 间 que ya viste en 洗手间 (S-28) — el espacio ENTRE las cosas. El molde: A和B中间 = "entre A y B"; 我坐在他们中间 = "me siento entre ellos" (en medio de ellos dos). El chino siempre despliega el escenario antes de marcar la posición.',
          'Tip del Overseer: en el refugio, toda pregunta empieza por el porqué — 为什么 va antes del verbo, como el buen explorador va antes que la caravana. Y si te preguntan por qué estudias chino, tienes permiso del Overseer para responder 因为很重要，也很有意思.',
        ], [
          ['你为什么学中文？', 'nǐ wèishénme xué zhōngwén?', '¿Por qué aprendes chino?'],
          ['因为我很喜欢中文。', 'yīnwèi wǒ hěn xǐhuan zhōngwén.', 'Porque me gusta mucho el chino.'],
          ['我坐在他们中间。', 'wǒ zuò zài tāmen zhōngjiān.', 'Me siento entre ellos.'],
        ]),
      ],
    ),
    lesson(
      'm31-l2',
      'Oportunidades y métodos',
      'vocab',
      [
        ...drill('w-ji-hui'),
        ...drill('w-ban-fa'),
        ...drill('w-xing-qu'),
        ...drill('w-guan-xi'),
        noteStep('n-ji-hui'),
        build('这是一个好机会。', 'zhè shì yí ge hǎo jīhuì.', 'Es una buena oportunidad.'),
        build('我没有办法。', 'wǒ méiyǒu bànfǎ.', 'No tengo manera (de hacerlo).'),
      ],
      [
        grammar('n-ji-hui', '机会, 办法, 兴趣 y 关系: el kit abstracto', [
          '机会 (jīhuì) es la puerta abierta: 机 "momento" + 会 "ocasión" — la coyuntura que hay que cruzar. Se presenta con el 有 existencial (S-05): 有机会 = "hay oportunidad", 没有机会 = "no la hay". Y cuando aparece una buena, el chino la señala con el molde de presentación: 这是一个好机会 = "esta es una buena oportunidad". Las puertas no esperan, morador.',
          '办法 (bànfǎ) es la herramienta: "método, manera, solución". Sus dos caras: 好办法 = "¡buena idea!" y 没办法 = "no hay manera" — el "no puedo hacer nada" chino, con un suspiro incorporado. Fíjate en la negación: como es un sustantivo contable en chino, se niega con 没有 (S-04), nunca con 不: ✗不办法 · ✓没办法.',
          '兴趣 (xìngqù) es el interés que TIRA de ti — lo que te arrastra a estudiar a deshoras. El molde estándar usa 对 (duì, "hacia" — el mismo carácter de 对不起, S-00) para apuntar al tema: 我对中文有兴趣 = "el chino me interesa" (literalmente: "hacia el chino tengo interés"). El interés apunta; el 有 lo tiene.',
          '关系 (guānxi, con xi NEUTRA) es la tela social: la red de conexiones que sostiene a una persona en China. 朋友关系 = "relación de amistad"; 他们关系很好 = "se llevan muy bien". Y su negativa célebre: 没关系 (S-11) = "no pasa nada" — literalmente "no tiene relación (conmigo)". Cuando algo no te toca, no hace falta disculparse: no hay 关系.',
          'Tip del Overseer: el orden del expediente es fijo — primero llega la 机会, luego buscas el 办法, y si el interés (兴趣) y la red (关系) acompañan, la misión sale sola. Si algo falla: 没办法, siguiente encargo.',
        ], [
          ['这是一个好机会。', 'zhè shì yí ge hǎo jīhuì.', 'Es una buena oportunidad.'],
          ['我没有办法。', 'wǒ méiyǒu bànfǎ.', 'No tengo manera (de hacerlo).'],
          ['他们关系很好。', 'tāmen guānxi hěn hǎo.', 'Se llevan muy bien.'],
        ]),
      ],
    ),
    lesson(
      'm31-l3',
      'El cambio y el paso del tiempo',
      'vocab',
      [
        ...drill('w-bian-hua'),
        ...drill('w-guo-qu'),
        ...drill('w-yu-dao'),
        ...drill('w-li-kai'),
        ...drill('w-jing-guo'),
        noteStep('n-bian-hua'),
        build('北京变化很大。', 'Běijīng biànhuà hěn dà.', 'Pekín ha cambiado mucho.'),
        build('我在路上遇到老师。', 'wǒ zài lù shang yùdào lǎoshī.', 'Me he encontrado al profesor por el camino.'),
      ],
      [
        grammar('n-bian-hua', '变化, 过去, 遇到, 离开 y 经过: el tiempo que pasa', [
          '变化 (biànhuà) es el cambio — y como buen abstracto chino, es sustantivo Y verbo a la vez: "el cambio" y "cambiar". El molde de la transformación: 北京变化很大 = "Pekín ha cambiado mucho" (literalmente: el cambio de Pekín es grande). Y cuando quieres certificar que el cambio YA OCURRIÓ, llega el 了 de siempre (S-13): 家乡变化很大，一切都变了 — el refugio no es el que era.',
          '过去 (guòqù) vive dos vidas con el mismo uniforme. Como TIEMPO: "el pasado" — 过去的日子 = "los días pasados" (con 的, S-04, porque hasta el pasado tiene dueño). Como MOVIMIENTO: "pasar hacia allí" — es el V+去 de S-18 con 过 de tránsito: 走过去 = "caminar hasta allí". ¿Cuál de las dos? El contexto manda, como siempre en la superficie.',
          '遇到 (yùdào) es toparse: el encuentro NO buscado. Lleva el 到 de resultado (S-18) pegado, porque certifica que el encuentro SUCEDIÓ de verdad: 我在路上遇到老师 = "me encontré al profesor por el camino" (no lo buscaba; apareció). Los problemas también se encuentran así: 遇到问题 (S-16) = "toparse con un problema". Lo inesperado, con 到.',
          'La pareja del movimiento: 离开 (líkāi) es irse DE un lugar — 离开了北京 = "dejó Pekín" (谁离开 + lugar detrás, sin preposición). 经过 (jīngguò) es pasar POR un sitio de camino, sin entrar: 经过银行 (S-31) = "pasar por delante del banco". 遇到 es el encuentro; 经过 es solo el tránsito; 离开 es la despedida.',
          'Tip del Overseer: para narrar una expedición completa solo necesitas esta línea: 离开 el refugio, 经过 la ciudad, 遇到 a alguien, y todo 变化了. El registro del sector sale solo.',
        ], [
          ['北京变化很大。', 'Běijīng biànhuà hěn dà.', 'Pekín ha cambiado mucho.'],
          ['我在路上遇到老师。', 'wǒ zài lù shang yùdào lǎoshī.', 'Me he encontrado al profesor por el camino.'],
          ['他离开了北京。', 'tā líkāi le Běijīng.', 'Se ha ido de Pekín.'],
        ]),
      ],
    ),
    lesson(
      'm31-l4',
      'La causa formal',
      'grammar',
      [
        ...drill('w-shi3'),
        ...drill('w-ying-xiang'),
        ...drill('w-zuo-yong'),
        ...drill('w-xiang4-like'),
        ...drill('w-gen1'),
        noteStep('n-shi-shi'),
        build('这个电影使我很高兴。', 'zhè ge diànyǐng shǐ wǒ hěn gāoxìng.', 'Esta película me ha puesto muy contento.'),
        build('他很像他爸爸。', 'tā hěn xiàng tā bàba.', 'Se parece mucho a su padre.'),
      ],
      [
        grammar('n-shi-shi', '使, 影响, 作用, 像 y 跟: la causa y la compañía', [
          '使 (shǐ) es el causativo de gala — el que sale en boletines, noticias e informes oficiales. Su molde: 使 + OBJETO + resultado. 这个电影使我很高兴 = "esta película me HACE muy contento": primero la causa (电影), luego 使, luego quien la recibe (我) y al final el estado resultante (很高兴). El español necesita "hacer que…"; el chino lo resuelve con un solo carácter.',
          'Sus dos compañeros de oficina: 影响 (yǐngxiǎng) es la influencia — también sustantivo y verbo: la 电影 te 影响, y su 影响 puede ser grande. 作用 (zuòyòng) es el efecto, la función de una cosa: 有作用 = "funciona, hace efecto" · 没作用 = "no sirve de nada". El trío completo lee como un parte científico: la causa 使, la influencia 影响 y el efecto medible 作用.',
          '像 (xiàng) es el espejo: A像B = "A se parece a B". 他很像他爸爸 = "se parece mucho a su padre" — el molde de siempre, S + 很 + ADJ (S-09), donde el "adjetivo" es parecerse a alguien. Ojo a la pareja del sector, que es la trampa clásica del examen: 像 es PARECIDO (el espejo); 跟 es COMPAÑÍA (caminar juntos). 他像他爸爸 = se parece a su padre · 他跟他爸爸去 = va CON su padre.',
          '跟 (gēn) es la preposición de la compañía: 跟我来！ = "¡ven conmigo!" (ven CON yo — la persona que acompaña va detrás de 跟). Y es la llave que faltaba para los verbos recíprocos del S-37: 跟…见面 ("verse con…"), 跟…结婚 ("casarse con…") — la persona acompañante presenta su credencial con 跟, siempre ANTES del verbo. Entre nombres también apunta "y": 我跟他 = "yo y él".',
          'Tip del Overseer: 像 mira caras, 跟 camina al lado. Si dices 他像我来 suena a que tu cara y la mía se parecen — para invitar a alguien a la expedición, la fórmula es 请跟我来. Con una sílaba de diferencia salvamos (o arruinamos) cualquier cita del refugio.',
        ], [
          ['这个电影使我很高兴。', 'zhè ge diànyǐng shǐ wǒ hěn gāoxìng.', 'Esta película me ha puesto muy contento.'],
          ['他很像他爸爸。', 'tā hěn xiàng tā bàba.', 'Se parece mucho a su padre.'],
          ['请跟我来。', 'qǐng gēn wǒ lái.', 'Ven conmigo, por favor.'],
        ]),
      ],
    ),
    lesson(
      'm31-l5',
      'El artista del refugio',
      'vocab',
      [
        ...drill('w-biao-yan'),
        ...drill('w-gu-shi'),
        ...drill('w-hua4'),
        ...drill('w-qi2'),
        ...drill('w-gua1'),
        ...drill('w-duan-lian'),
        ...drill('w-ke-ai'),
        ...drill('w-you-ming'),
        ...drill('w-zhong-yao'),
        noteStep('n-cai-yi'),
        build('我会骑自行车。', 'wǒ huì qí zìxíngchē.', 'Sé montar en bici.'),
        build('熊猫很可爱。', "xióngmāo hěn kě'ai.", 'Los pandas son adorables.'),
        build('他画熊猫。', 'tā huà xióngmāo.', 'Él dibuja pandas.'),
      ],
      [
        grammar('n-cai-yi', 'El pack del talento: 画, 骑, 刮, 锻炼 y el escenario', [
          '画 (huà) es dibujar — y también el dibujo mismo: verbo y nombre en un carácter. Para evaluar la obra, el complemento de grado de S-32: 他画得很好 = "dibuja muy bien" (VERBO + 得 + veredicto: el informe de calidad de la actuación). Y el tema favorito de todo principiante chino: 他画熊猫 = "dibuja pandas" — objeto detrás, como manda el protocolo.',
          '骑 (qí, segundo tono) es montar: 骑自行车 (S-17) = montar en bici, 骑马 = ir a caballo. Con la habilidad de S-08 se arma el título de propiedad del refugio: 我会骑自行车 = "sé montar en bici" (会 + verbo: no es que vaya a montar: es que SE hacerlo).',
          '刮 (guā) es el camaleo del sector: rascar… y cuando habla del viento, SOPLEAR. La frase del parte meteorológico: 刮风了 (guā fēng le) = "se ha levantado viento" — 风 fēng = viento + el 了 del cambio (S-13): antes no soplaba y ahora sí. Cuando el refugio oiga 刮风了, ya sabe que toca cerrar las compuertas.',
          '锻炼 (duànliàn) es ejercitar, templar — el gimnasio del cuerpo Y del carácter: 锻炼身体 (S-24) = "hacer ejercicio" (templar el cuerpo). 表演 (biǎoyǎn) es la actuación, el espectáculo: 他们的表演很好 = "su actuación es buenísima". Y el público responde con el adjetivo del sector: 可爱 (kě\'ai, mono, adorable) — la exclamación oficial ante pandas y bebés —, 有名 (famoso) para quien sube al escenario y 重要 (importante) para lo que de verdad cuenta.',
          'Tip del Overseer: toda 好机会 cultural del refugio se compone igual: un 故事 (gùshi, el cuento), una 表演 (la actuación) y alguien que 画 el decorado. Si encima 锻炼 el cuerpo por el camino, la caravana entera te aplaudirá.',
        ], [
          ['我会骑自行车。', 'wǒ huì qí zìxíngchē.', 'Sé montar en bici.'],
          ['熊猫很可爱。', "xióngmāo hěn kě'ai.", 'Los pandas son adorables.'],
          ['他们的表演很好。', 'tāmen de biǎoyǎn hěn hǎo.', 'Su actuación es muy buena.'],
        ]),
      ],
    ),
    lesson(
      'm31-l6',
      'Auditoría del Sector 38',
      'review',
      [
        match('w-ban-fa', 'w-gu-shi', 'w-zi-ji', 'w-qi2'),
        match('w-ji-hui', 'w-bian-hua', 'w-gen1', 'w-ke-ai'),
        { type: 'listen', entry: 'w-zuo-yong' },
        { type: 'listen', entry: 'w-li-kai' },
        dictate('w-ying-xiang'),
        dictate('w-ke-ai'),
        typeP('w-wei-shen-me'),
        build('你为什么学中文？', 'nǐ wèishénme xué zhōngwén?', '¿Por qué aprendes chino?'),
        build('我会骑自行车。', 'wǒ huì qí zìxíngchē.', 'Sé montar en bici.'),
        ...practice('w-guo-qu'),
        ...practice('w-jing-guo'),
        noteStep('n-hsk3-fin'),
      ],
      [
        grammar('n-hsk3-fin', 'CERTIFICADO DEL OVERSEER: protocolo HSK 3 sellado', [
          'Auditoría final superada, morador. Con este sector has cerrado los ONCE sectores del HSK 3 — del S-28 al S-38 — y las 298 palabras oficiales del nivel quedan registradas en el archivo del refugio, junto a todos los refuerzos de los niveles 1 y 2. Ya no hay lista oficial que se te resista del HSK 1 al HSK 3: el diccionario básico del chino está EN TU PODER.',
          'La caja de herramientas que te llevas: la partícula 把 que maneja objetos (S-28), los complementos de resultado que certifican misiones, el V+得 que evalúa actuaciones (S-32), la ciudad entera con sus plantas y sus transportes (S-31), los verbos recíprocos que bailan a dos (S-37) y desde hoy el chino que PIENSA: 为什么 pregunta la causa, 使 la formaliza, 变化 la narra y 跟 trae compañía para contarlo.',
          'Consejo de despedida del Overseer: un protocolo sellado se PULE, no se archiva. Los repasos del SRS, la Radio del Refugio y los encargos de la caravana existen exactamente para eso: cinco minutos al día mantienen las 298 compuertas abiertas. El chino no se termina, morador — se afila.',
          '¿Y ahora qué? La siguiente puerta se llama HSK 4: más palabras, más matices y las primeras discusiones de verdad. La buena noticia: la mitad de ese mundo ya lo conoces, porque el HSK 4 se construye SOBRE lo que acabas de sellar. El Overseer firma aquí tu certificado, de su puño y letra: ACCESO CONCEDIDO · PROTOCOLO HSK 3 COMPLETO.',
        ], [
          ['学习使我快乐。', 'xuéxí shǐ wǒ kuàilè.', 'Estudiar me hace feliz.'],
          ['中文很重要。', 'zhōngwén hěn zhòngyào.', 'El chino es muy importante.'],
          ['我爱中文！', 'wǒ ài zhōngwén!', '¡Amo el chino!'],
        ]),
      ],
    ),
  ],
}
