/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 30 · HSK 3 — LAS ESTACIONES Y LA VIDA AL AIRE (módulo 3/10)

   El año del refugio: las cuatro estaciones (春夏秋冬), el cielo que las
   cubre (太阳, 月亮, 云), el zoo de la superficie (动物) y el calendario
   de fiestas y eventos (祝, 举行, 参加).
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m23: VaultModule = {
  id: 'm23',
  hsk: 3,
  code: 'S-30',
  title: 'Las estaciones y la vida al aire',
  subtitle: 'Primavera, verano, otoño, invierno: el año en el refugio',
  entries: [
    e('w-chun1', '春', 'chūn', 'primavera', '🌱'),
    // id disambiguated: S-18 already owns w-xia4 for 下 (xià "bajo"), so 夏 spells the season: w-xia4-summer.
    e('w-xia4-summer', '夏', 'xià', 'verano', '☀️'),
    e('w-qiu1', '秋', 'qiū', 'otoño', '🍂'),
    e('w-dong1', '冬', 'dōng', 'invierno', '❄️'),
    e('w-ji-jie', '季节', 'jìjié', 'estación (del año)', '🗓️'),
    e('w-yue-liang', '月亮', 'yuèliang', 'luna', '🌙'),
    e('w-tai-yang', '太阳', 'tàiyang', 'sol', '🌞', 'yang neutra: tàiyang'),
    e('w-yun2', '云', 'yún', 'nube', '☁️'),
    // id disambiguated: S-02 already owns w-he2 for 和 (hé "y"), so 河 takes the gloss: w-he2-river.
    e('w-he2-river', '河', 'hé', 'río', '🏞️'),
    e('w-shu4', '树', 'shù', 'árbol', '🌳'),
    e('w-cao3', '草', 'cǎo', 'hierba, césped', '🌿'),
    e('w-niao3', '鸟', 'niǎo', 'pájaro', '🐦'),
    e('w-dong-wu', '动物', 'dòngwù', 'animal', '🐾'),
    e('w-xiong-mao', '熊猫', 'xióngmāo', 'panda', '🐼'),
    e('w-pa-shan', '爬山', 'pá shān', 'escalar la montaña', '🧗', '山 = montaña'),
    e('w-jie-ri', '节日', 'jiérì', 'fiesta, festivo', '🎉'),
    e('w-jie-mu', '节目', 'jiémù', 'programa (TV/radio)', '📺'),
    e('w-li-wu', '礼物', 'lǐwù', 'regalo', '🎁'),
    // id disambiguated: the new S-10 (m9b) owns w-zhu4 for 住 (zhù "vivir"), so 祝 takes the gloss: w-zhu4-wish.
    e('w-zhu4-wish', '祝', 'zhù', 'desear (felicitaciones)', '🎊'),
    e('w-ju-xing', '举行', 'jǔxíng', 'celebrar (un evento)', '🏟️'),
    e('w-can-jia', '参加', 'cānjiā', 'participar, asistir', '🙋'),
    e('w-bi-sai', '比赛', 'bǐsài', 'competición, partido', '🏆'),
  ],
  lessons: [
    lesson(
      'm23-l1',
      'El carrusel del año',
      'vocab',
      [
        ...drill('w-chun1'),
        ...drill('w-xia4-summer'),
        ...drill('w-qiu1'),
        ...drill('w-dong1'),
        ...drill('w-ji-jie'),
        noteStep('n-si-ji'),
        build('我最喜欢春天。', 'wǒ zuì xǐhuan chūntiān.', 'Me gusta más la primavera.'),
        build('夏天很热。', 'xiàtiān hěn rè.', 'En verano hace calor.'),
        build('冬天很冷。', 'dōngtiān hěn lěng.', 'En invierno hace frío.'),
      ],
      [
        grammar('n-si-ji', '春夏秋冬: el carrusel del año', [
          'El año del refugio gira sobre cuatro caracteres: 春 (primavera), 夏 (verano), 秋 (otoño), 冬 (invierno). Para usarlos como estación completa se les engancha 天 (el de 天气, S-09): 春天, 夏天, 秋天, 冬天.',
          'Y para hablar del ciclo entero: 季节 (jìjié), la estación del año. La gran pregunta de la comunidad: 你最喜欢哪个季节？ = "¿cuál es tu estación favorita?" — 最 (S-21) + 哪个 (cuál). La respuesta oficial del Overseer: 我最喜欢春天.',
          'Ojo con 夏: suena EXACTAMENTE igual que 下 (xià, "bajo", S-20) — mismo sonido, mismo tono 4. 夏天 = verano; 下午 = por la tarde. Solo el contexto las separa. Bienvenido al chino de verdad, morador.',
          'Tip del Overseer: 春夏秋冬, en ese orden, es la fila del año — los chinos los citan en cadena como nosotros decimos "primavera, verano, otoño, invierno". Memoriza la fila entera, no las piezas sueltas.',
        ], [
          ['我最喜欢春天。', 'wǒ zuì xǐhuan chūntiān.', 'Me gusta más la primavera.'],
          ['夏天很热，冬天很冷。', 'xiàtiān hěn rè, dōngtiān hěn lěng.', 'En verano hace calor y en invierno, frío.'],
          ['你最喜欢哪个季节？', 'nǐ zuì xǐhuan nǎge jìjié?', '¿Cuál es tu estación favorita?'],
        ]),
      ],
    ),
    lesson(
      'm23-l2',
      'El cielo',
      'vocab',
      [
        ...drill('w-yue-liang'),
        ...drill('w-tai-yang'),
        ...drill('w-yun2'),
        noteStep('n-tian-kong'),
        build('今天太阳很大。', 'jīntiān tàiyang hěn dà.', 'Hoy hace un sol tremendo. (literal: "el sol es muy grande")'),
        build('晚上我们看月亮。', 'wǎnshang wǒmen kàn yuèliang.', 'Por la noche miramos la luna. (晚上 wǎnshang = por la noche)'),
      ],
      [
        grammar('n-tian-kong', 'El cielo del refugio: 太阳, 月亮 y 云', [
          'Tres piezas cuelgan sobre el refugio: 太阳 (el sol), 月亮 (la luna) y 云 (la nube). Fíjate en las sílabas neutras: el sol (tàiyang) y la luna (yuèliang) bajan la voz en su segunda sílaba — como susurrando para no despertar a nadie.',
          'El sol tiene frase de culto: 今天太阳很大, literalmente "hoy el sol es muy grande". ¿Traducción? "Hoy hace un sol tremendo". El chino mide el sol por TAMAÑO, no por temperatura: grande = poderoso. Acepta el idioma: el sol de la superficie es enorme, morador.',
          'Y el rito romántico del sector: 看月亮, "mirar la luna". No es astronomía: es una cita. 晚上我们看月亮 — por la noche miramos la luna — es posiblemente la frase más antigua de la poesía china, y la más fácil que vas a construir este mes.',
          'Con 了 de cambio (S-13), el cielo tiene argumento: 太阳出来了 = "¡ha salido el sol!" — antes noche, ahora día. La salida del sol ES el ejemplo escolar del cambio de estado.',
        ], [
          ['今天太阳很大。', 'jīntiān tàiyang hěn dà.', 'Hoy hace un sol tremendo.'],
          ['晚上我们看月亮。', 'wǎnshang wǒmen kàn yuèliang.', 'Por la noche miramos la luna.'],
          ['太阳出来了。', 'tàiyang chūlái le.', '¡Ha salido el sol! (V+来 de S-19: hacia el que habla)'],
        ]),
      ],
    ),
    lesson(
      'm23-l3',
      'El zoo del refugio',
      'vocab',
      [
        ...drill('w-dong-wu'),
        ...drill('w-xiong-mao'),
        ...drill('w-niao3'),
        ...drill('w-shu4'),
        ...drill('w-cao3'),
        ...drill('w-he2-river'),
        noteStep('n-dong-wu'),
        build('熊猫喜欢吃什么？', 'xióngmāo xǐhuan chī shénme?', '¿Qué les gusta comer a los pandas?'),
        build('鸟在树上。', 'niǎo zài shù shàng.', 'El pájaro está en el árbol.'),
        build('河里有鱼。', 'hé li yǒu yú.', 'En el río hay peces.'),
      ],
      [
        grammar('n-dong-wu', '动物 y 它们: el zoo del refugio', [
          '动物 (dòngwù, animal) es literalmente "cosa que se mueve" — todo lo que camina, vuela o nada. La estrella del zoo: 熊猫 (xióngmāo, el panda), "gato-oso". La expedición se completa con 鸟 (pájaro), 树 (árbol), 草 (hierba) y 河 (río): el paisaje entero de una salida a la superficie.',
          'Para hablar de la fauna, el pronombre es 它 (tā, "ello") — SUENA IGUAL que 他 (él) y 她 (ella): mismo sonido, mismo tono, distinto carácter. En plural: 它们 = "ellos" (no humanos). El chino escrito distingue; el chino hablado, el contexto.',
          'Y el repaso de posiciones (S-14): 鸟在树上 = "el pájaro está en el árbol" (cosa + 在 + lugar + 上). Para decir que algo EXISTE en un lugar, el molde es lugar + 有 + cosa: 河里有鱼 = "en el río hay peces". El "haber" chino también señala con el dedo: primero el escenario, después lo que hay en él.',
          'Tip del Overseer: en los informes de expedición, la fauna es 它们. Dirigirse a un panda con ÉL es un error de protocolo que la Hermandad no olvida.',
        ], [
          ['熊猫喜欢吃什么？', 'xióngmāo xǐhuan chī shénme?', '¿Qué les gusta comer a los pandas?'],
          ['鸟在树上。', 'niǎo zài shù shàng.', 'El pájaro está en el árbol.'],
          ['河里有鱼。', 'hé li yǒu yú.', 'En el río hay peces.'],
        ]),
      ],
    ),
    lesson(
      'm23-l4',
      'Fiestas y eventos',
      'vocab',
      [
        ...drill('w-jie-ri'),
        ...drill('w-li-wu'),
        ...drill('w-zhu4-wish'),
        ...drill('w-pa-shan'),
        noteStep('n-zhu-ni'),
        build('祝你生日快乐！', 'zhù nǐ shēngrì kuàilè!', '¡Feliz cumpleaños! (生日 shēngrì = cumpleaños · 快乐 kuàilè = feliz)'),
        build('我送给妈妈一个礼物。', 'wǒ sòng gěi māma yí ge lǐwù.', 'Le he hecho un regalo a mamá.'),
        build('秋天我们去爬山。', 'qiūtiān wǒmen qù pá shān.', 'En otoño vamos a escalar la montaña.'),
      ],
      [
        grammar('n-zhu-ni', '祝: el ritual de los buenos deseos', [
          '祝 (zhù) es el verbo de las felicitaciones: DESEAR algo bueno a alguien. El molde es de ceremonia: 祝 + PERSONA + DESEO — 祝你生日快乐 = "te deseo un cumpleaños feliz". Sin "que" ni subjuntivo: apuntas y disparas el buen deseo.',
          'La réplica rápida para cualquier festivo: 节日快乐 (jiérì kuàilè) = "¡feliz fiesta!". Cae bien en cumpleaños, año nuevo y aniversarios del refugio: el comodín ceremonial.',
          'El protocolo de regalos usa la artillería de S-18: 送 (regalar) + 给 (a) + persona + cosa — 我送给妈妈一个礼物 = "le he hecho un regalo a mamá". El regalo es 礼物 (lǐwù): el "objeto de la cortesía".',
          'Y el sector sube a la montaña: 爬山 (pá shān) = "escalar la montaña", otro compuesto VERBO+OBJETO como 洗澡 o 吃饭 — 爬 (trepar) + 山 (montaña). La salida favorita del refugio cuando el aire de la superficie está limpio.',
          'Tip del Overseer: 祝 siempre apunta a OTRO — para tus propios deseos ya tienes 想 y 希望 (S-18). La cortesía china dispara hacia fuera.',
        ], [
          ['祝你生日快乐！', 'zhù nǐ shēngrì kuàilè!', '¡Feliz cumpleaños!'],
          ['我送给妈妈一个礼物。', 'wǒ sòng gěi māma yí ge lǐwù.', 'Le he hecho un regalo a mamá.'],
          ['秋天我们去爬山。', 'qiūtiān wǒmen qù pá shān.', 'En otoño vamos a escalar la montaña.'],
        ]),
      ],
    ),
    lesson(
      'm23-l5',
      'El gran evento',
      'vocab',
      [
        ...drill('w-jie-mu'),
        ...drill('w-ju-xing'),
        ...drill('w-can-jia'),
        ...drill('w-bi-sai'),
        noteStep('n-ju-xing'),
        build('明天学校举行比赛。', 'míngtiān xuéxiào jǔxíng bǐsài.', 'Mañana la escuela organiza una competición.'),
        build('我想参加比赛。', 'wǒ xiǎng cānjiā bǐsài.', 'Quiero participar en la competición.'),
        build('这个节目很有意思。', 'zhège jiémù hěn yǒu yìsi.', 'Este programa es muy interesante. (有意思 yǒu yìsi = tener gracia, ser interesante)'),
      ],
      [
        grammar('n-ju-xing', '举行 y 参加: el que organiza y el que se apunta', [
          'Todo evento del refugio tiene dos papeles: el que organiza y el que asiste. 举行 (jǔxíng) es el verbo OFICIAL de organizar — ceremonias, partidos, exámenes — y siempre lleva un EVENTO como objeto: 学校举行比赛 = "la escuela organiza una competición". Es un verbo de cartel: si hay megafonía y horario, es 举行.',
          '参加 (cānjiā) es el otro lado: ASISTIR, participar. Si 举行 monta la misión, 参加 se apunta a ella: 我想参加比赛 = "quiero participar en la competición". El molde: 参加 + evento o actividad.',
          'Y para la sobremesa: 节目 (jiémù) es el PROGRAMA — el de la tele y el de la Radio del Refugio. No lo confundas con 节日 (el festivo): mismo arranque 节, distinto remate. El programa SE VE; el festivo SE CELEBRA.',
          'Tip del Overseer: 举行 necesita nombre de evento — ✗我举行 ("yo organizo"… ¿el qué?) · ✓学校举行比赛. Un evento sin nombre no se puede organizar, morador.',
        ], [
          ['明天学校举行比赛。', 'míngtiān xuéxiào jǔxíng bǐsài.', 'Mañana la escuela organiza una competición.'],
          ['我想参加比赛。', 'wǒ xiǎng cānjiā bǐsài.', 'Quiero participar en la competición.'],
          ['这个节目很有意思。', 'zhège jiémù hěn yǒu yìsi.', 'Este programa es muy interesante.'],
        ]),
      ],
    ),
    lesson(
      'm23-l6',
      'Auditoría del Sector 30',
      'review',
      [
        match('w-chun1', 'w-xia4-summer', 'w-qiu1', 'w-dong1', 'w-ji-jie'),
        match('w-yue-liang', 'w-tai-yang', 'w-yun2', 'w-he2-river'),
        match('w-dong-wu', 'w-xiong-mao', 'w-niao3', 'w-shu4', 'w-cao3'),
        match('w-jie-ri', 'w-jie-mu', 'w-li-wu', 'w-zhu4-wish'),
        match('w-pa-shan', 'w-ju-xing', 'w-can-jia', 'w-bi-sai'),
        { type: 'listen', entry: 'w-ji-jie' },
        { type: 'listen', entry: 'w-xiong-mao' },
        dictate('w-ji-jie'),
        dictate('w-xiong-mao'),
        typeP('w-can-jia'),
        build('我最喜欢春天。', 'wǒ zuì xǐhuan chūntiān.', 'Me gusta más la primavera.'),
        build('我想参加比赛。', 'wǒ xiǎng cānjiā bǐsài.', 'Quiero participar en la competición.'),
        ...practice('w-yun2'),
        ...practice('w-li-wu'),
      ],
    ),
  ],
}
