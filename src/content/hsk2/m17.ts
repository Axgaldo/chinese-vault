/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 17 · HSK 2 — MUNDO Y TECNOLOGÍA (módulo 7/10)

   La vida digital del refugio: 用 como verbo de instrumento-primero, los
   bloques verbo+objeto de la era digital (发短信, 上网) y el reparto de
   canales entre 给 (mano a mano) y 发 (por el aire).
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m17: VaultModule = {
  id: 'm17',
  hsk: 2,
  code: 'S-17',
  title: 'Mundo y Tecnología',
  subtitle: 'Móviles, fotos, noticias y la vida digital del refugio',
  entries: [
    e('w-xin-wen', '新闻', 'xīnwén', 'noticia, noticias', '📰'),
    e('w-shang-wang', '上网', 'shàngwǎng', 'navegar por internet', '🌐'),
    e('w-you-xi', '游戏', 'yóuxì', 'juego', '🎮'),
    e('w-yin-yue', '音乐', 'yīnyuè', 'música', '🎵'),
    e('w-zhao-pian', '照片', 'zhàopiàn', 'foto', '📸'),
    e('w-shou-ji', '手机', 'shǒujī', 'móvil', '📱'),
    e('w-fa1', '发', 'fā', 'enviar', '✉️'),
    e('w-duan-xin', '短信', 'duǎnxìn', 'SMS, mensaje', '💬', 'mensaje corto'),
    e('w-yong4', '用', 'yòng', 'usar', '🛠️'),
  ],
  lessons: [
    lesson(
      'm17-l1',
      'La red del refugio',
      'vocab',
      [
        ...drill('w-shou-ji'),
        ...drill('w-shang-wang'),
        ...drill('w-xin-wen'),
        ...drill('w-yong4'),
        noteStep('n-yong'),
        build('我用手机发短信。', 'wǒ yòng shǒujī fā duǎnxìn.', 'Mando mensajes con el móvil.'),
        build('他在电脑上看新闻。', 'tā zài diànnǎo shàng kàn xīnwén.', 'Mira noticias en el ordenador.'),
      ],
      [
        grammar('n-yong', '用: el instrumento como héroe', [
          'El español esconde la herramienta dentro de una preposición: "mando mensajes CON el móvil". El chino la promociona a verbo propio y la pone DELANTE: 我用手机发短信 = literalmente "yo USO el móvil para mandar mensajes" (发短信 fā duǎnxìn = "mandar un mensaje"). Primero declaras tu instrumento, luego haces la faena: 用 + HERRAMIENTA + ACCIÓN.',
          'El error típico: arrastrar la herramienta al final, como en español → ✗我发短信手机. En chino el carril es SUJETO + 用 + HERRAMIENTA + VERBO: el instrumento va pegado al sujeto, nunca detrás del verbo. Pensamiento de instrumento-primero.',
          'Bonus del sector: la misma lógica explica 在...上 = "en (encima de, sobre la superficie de)". 他在电脑上看新闻 = "mira noticias EN el ordenador", literal "está en el ordenador-encima mirando noticias". Donde tu español dice "en", el chino señala la superficie exacta donde ocurre la acción.',
          'Tip del Overseer: antes de actuar, pregúntate ¿CON QUÉ? La respuesta se dice con 用 y se coloca antes del verbo. Con ese solo hábito, todas las frases de herramientas se montan solas.',
        ], [
          ['我用手机发短信。', 'wǒ yòng shǒujī fā duǎnxìn.', 'Mando mensajes con el móvil.'],
          ['他在电脑上看新闻。', 'tā zài diànnǎo shàng kàn xīnwén.', 'Mira noticias en el ordenador.'],
          ['我用电脑学习。', 'wǒ yòng diànnǎo xuéxí.', 'Estudio con el ordenador.'],
        ]),
      ],
    ),
    lesson(
      'm17-l2',
      'Ocio digital',
      'vocab',
      [
        ...drill('w-you-xi'),
        ...drill('w-yin-yue'),
        ...drill('w-zhao-pian'),
        ...drill('w-fa1'),
        ...drill('w-duan-xin'),
        noteStep('n-chaoshi'),
        build('我们听音乐吧。', 'wǒmen tīng yīnyuè ba.', 'Escuchemos música. (吧 ba = partícula de sugerencia)'),
        build('这是一个好玩的游戏。', 'zhè shì yí ge hǎowán de yóuxì.', 'Este es un juego divertido. (好玩 hǎowán = divertido)'),
      ],
      [
        grammar('n-chaoshi', 'Verbo + objeto: bloques prefabricados', [
          'La era digital construyó pares verbo+objeto que funcionan como UNA sola palabra: 发短信 (fā duǎnxìn) = "mandar-mensaje", 上网 (shàngwǎng) = "subir-a-la-red", o sea conectarse y navegar; 看照片 (kàn zhàopiàn) = "mirar fotos". Son ladrillos como 吃饭 (S-11): una vez fundidos, el refugio nunca los dice por separado.',
          'El error típico: dejar al verbo huérfano → ✗我发 (¿enviar... el qué?). Los verbos de envío viajan con su paquete: 发短信, no 发 suelto. Y cada bloque con su verbo fijo: las fotos se MIRAN (看照片) y también se ENVÍAN (发照片); la red se SUBE (上网).',
          'El sector regala dos adjetivos de bolsillo: 好玩 (hǎowán, "divertido") para juegos y planes, y el sufijo 吧 (ba) que convierte cualquier frase en sugerencia suave: 我们听音乐吧 = "escuchemos música (¿te parece?)". A 吧 lo desmontaremos con lupa en el S-19.',
          'Tip del Overseer: aprende cada bloque como si fuera UNA palabra nueva — 发短信 entera, no 发 + 短信. El oído chino los procesa fundidos, y el tuyo debería imitarlo.',
        ], [
          ['我们听音乐吧。', 'wǒmen tīng yīnyuè ba.', 'Escuchemos música.'],
          ['他每天上网。', 'tā měitiān shàngwǎng.', 'Se conecta todos los días.'],
          ['我在看照片。', 'wǒ zài kàn zhàopiàn.', 'Estoy mirando fotos.'],
        ]),
      ],
    ),
    lesson(
      'm17-l3',
      'La vida en pantalla',
      'vocab',
      [
        ...practice('w-shou-ji'),
        ...practice('w-shang-wang'),
        ...practice('w-you-xi'),
        ...practice('w-yin-yue'),
        ...practice('w-zhao-pian'),
        ...practice('w-xin-wen'),
        noteStep('n-fawei'),
        build('请发照片给我。', 'qǐng fā zhàopiàn gěi wǒ.', 'Mándame una foto, por favor.'),
      ],
      [
        grammar('n-fawei', '给 mano a mano, 发 por el aire', [
          'Dos verbos reparten cosas en el refugio y cada uno tiene su canal. 给 (gěi) es la entrega cara a cara, mano a mano: el vaso pasa de mi mano a la tuya. 发 (fā) es el envío que VUELA: por el aire o por el cable — mensajes, fotos, correos.',
          'El molde de 发 en frases largas: 发 + COSA + 给 + PERSONA. 请发照片给我 = "mándame una foto": la foto despega primero (发), atraviesa el aire y ATERRIZA en la persona (给). El 给 del S-16 trabaja aquí como pista de aterrizaje.',
          'Contraste de canal: un vaso de agua no vuela → 给我一杯水 ("dame un vaso de agua", mano a mano). Una foto sí → 发照片给我 ("mándame una foto"). Misma entrega, distinto transporte: el chino elige el verbo según cómo viaja el paquete.',
          'Tip del Overseer: ¿puedes tocar la cosa mientras la pasas? 给. ¿Viaja sola? 发...给. Los saqueadores de paquetes saben distinguirlo desde la puerta del refugio.',
        ], [
          ['请发照片给我。', 'qǐng fā zhàopiàn gěi wǒ.', 'Mándame una foto, por favor.'],
          ['我发短信给妈妈。', 'wǒ fā duǎnxìn gěi māma.', 'Le mando un mensaje a mamá.'],
          ['请给我一杯水。', 'qǐng gěi wǒ yí bēi shuǐ.', 'Por favor, dame un vaso de agua. (mano a mano)'],
        ]),
      ],
    ),
    lesson(
      'm17-l4',
      'Auditoría del Sector 17',
      'review',
      [
        match('w-shou-ji', 'w-shang-wang', 'w-xin-wen', 'w-you-xi'),
        match('w-yin-yue', 'w-zhao-pian', 'w-fa1', 'w-duan-xin'),
        { type: 'listen', entry: 'w-yong4' },
        { type: 'listen', entry: 'w-xin-wen' },
        dictate('w-yin-yue'),
        dictate('w-shou-ji'),
        typeP('w-yong4'),
        build('我用手机发短信。', 'wǒ yòng shǒujī fā duǎnxìn.', 'Mando mensajes con el móvil.'),
        build('我们听音乐吧。', 'wǒmen tīng yīnyuè ba.', 'Escuchemos música.'),
        ...practice('w-fa1'),
        ...practice('w-duan-xin'),
      ],
    ),
  ],
}
