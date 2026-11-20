/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 25 · HSK 2 — VIAJES Y CIUDAD (módulo 13/15)

   El sector que cierra el mapa del refugio: la flota completa de transportes
   con 坐 como motor, 从…到… como paréntesis del trayecto (lugares Y horas),
   向 como brújula y el mundo del trabajo con la pareja tonal 买/卖.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m19d: VaultModule = {
  id: 'm19d',
  hsk: 2,
  code: 'S-25',
  title: 'Viajes y ciudad',
  subtitle: 'Transportes, direcciones y el mundo del trabajo',
  entries: [
    e('w-ji-chang', '机场', 'jīchǎng', 'aeropuerto', '🛫'),
    e('w-gong-gong-qi-che', '公共汽车', 'gōnggòng qìchē', 'autobús', '🚌'),
    e('w-chuan2', '船', 'chuán', 'barco', '⛵'),
    e('w-piao4', '票', 'piào', 'billete, entrada', '🎫'),
    e('w-lu4', '路', 'lù', 'camino, calle', '🛣️'),
    e('w-lv-you', '旅游', 'lǚyóu', 'viajar (turismo)', '🧳'),
    e('w-mai4', '卖', 'mài', 'vender', '🏪', 'la pareja de 买 mǎi'),
    e('w-cong2', '从', 'cóng', 'desde', '➡️', '从…到…: de…a…'),
    e('w-xiang4', '向', 'xiàng', 'hacia (dirección)', '🧭'),
    e('w-wai4', '外', 'wài', 'fuera, afuera', '📤'),
    e('w-you-bian', '右边', 'yòubian', 'a la derecha', '➡️'),
    e('w-zuo-bian', '左边', 'zuǒbian', 'a la izquierda', '⬅️'),
    e('w-gong-si', '公司', 'gōngsī', 'empresa', '🏢'),
    e('w-shang-ban', '上班', 'shàngbān', 'ir/estar a trabajar', '💼'),
  ],
  lessons: [
    lesson(
      'm19d-l1',
      'Transportes',
      'vocab',
      [
        ...drill('w-ji-chang'),
        ...drill('w-gong-gong-qi-che'),
        ...drill('w-chuan2'),
        ...drill('w-piao4'),
        ...drill('w-lv-you'),
        noteStep('n-jiao-tong'),
        build('我坐公共汽车去机场。', 'wǒ zuò gōnggòng qìchē qù jīchǎng.', 'Voy al aeropuerto en autobús.'),
        build('两张票，谢谢。', 'liǎng zhāng piào, xièxie.', 'Dos billetes, gracias.'),
      ],
      [
        grammar('n-jiao-tong', '坐 + transporte: la flota del refugio', [
          'El chino no "toma" transportes: los sienta. 坐 (zuò), el "sentarse" del S-08 que ya usaste para coger un vehículo, es el motor de todo el sector: 坐 + vehículo = viajar en él. 我坐船去 = "voy en barco" — literalmente, "yo siento-barco y voy". La flota nueva se sube al mismo motor: 公共汽车 (autobús), 船 (barco), y el 机场 (aeropuerto) como gran destino.',
          'El orden manda: el "cómo" viaja DELANTE del "a dónde". 我坐公共汽车去机场 = "yo, en autobús, voy al aeropuerto": la frase de transporte se cuela entre el sujeto y el verbo de movimiento (去, 到, 回来). El error número uno es arrastrar el "en autobús" al final, como haría el español: ✗我去机场坐公共汽车. Para cuando llega 去, el oído chino ya salió; el vehículo viaja siempre en el carril del medio. ✓我坐公共汽车去机场.',
          '票 (piào) es el billete universal del refugio: el mismo 票 paga el autobús, el tren y la entrada del cine. Se cuenta con 张 (zhāng), el clasificador de las cosas planas: 两张票 = "dos billetes" (两, el "dos" que cuenta cosas del S-03). En la ventanilla no hace falta más: 两张票，谢谢。',
          'Y el nombre del viaje: 旅游 (lǚyóu) = viajar por placer, el turismo. Ojo a la ü: se teclea "lv", pero se pronuncia con los labios de la u francesa. 去 + lugar es el trayecto; 旅游 es el viaje entero como plan: 我想去旅游 = "quiero hacer turismo".',
          'Tip del Overseer: sujeto → 坐 + vehículo → 去 + lugar. Ese carril central es el molde de todas las rutas del sector: primero te sientas, luego te vas.',
        ], [
          ['我坐公共汽车去机场。', 'wǒ zuò gōnggòng qìchē qù jīchǎng.', 'Voy al aeropuerto en autobús.'],
          ['我坐船去。', 'wǒ zuò chuán qù.', 'Voy en barco.'],
          ['两张票，谢谢。', 'liǎng zhāng piào, xièxie.', 'Dos billetes, gracias.'],
        ]),
      ],
    ),
    lesson(
      'm19d-l2',
      'De… a…',
      'vocab',
      [
        ...drill('w-cong2'),
        ...drill('w-xiang4'),
        ...drill('w-wai4'),
        ...drill('w-zuo-bian'),
        ...drill('w-you-bian'),
        noteStep('n-cong-dao'),
        build('从公司到家，我坐船。', 'cóng gōngsī dào jiā, wǒ zuò chuán.', 'De la empresa a casa, voy en barco.'),
      ],
      [
        grammar('n-cong-dao', '从…到… y 向: el paréntesis y la brújula', [
          '从…到… es el paréntesis del trayecto: 从 (cóng) abre el viaje en el ORIGEN y 到 (dào) — sí, el mismo "llegar" del S-18 — lo cierra en el DESTINO. 从公司到家 = "de la empresa a casa". Ni preposiciones ni declinaciones: dos palabras que abrazan el tramo entero.',
          'La joya del molde: también abraza el TIEMPO. 从早上到晚上 = "de la mañana a la noche": las horas abren y cierran con las mismas puertas que los lugares. El chino no distingue "desde aquí" de "desde las ocho": ambos son 从; "hasta allá" y "hasta la noche", ambos son 到.',
          '向 (xiàng) apunta el RUMBO sin prometer llegada: 向 + dirección. Se une al 拐 del S-20 para girar: 向左拐 = "gira a la izquierda", 向右拐 = "gira a la derecha". El contraste que los separa: 到 responde "¿hasta dónde?" (la meta lograda, ya llegaste); 向 responde "¿hacia dónde?" (la brújula, todavía de camino).',
          '左边 (zuǒbian) y 右边 (yòubian) son los SITIOS de cada lado: el 左/右 que conoces + 边, el mismo borde de 旁边 (S-14), aquí con tono flojo. 向左拐 apunta el giro; 在左边 dice dónde está algo. Y 外 (wài) es el "fuera" del par dentro/fuera: el 里 lo aprendiste en el S-05; con 面, 外面 = "afuera", el exterior completo.',
          'Tip del Overseer: tramo con principio y fin → 从…到…; solo brújula → 向; sitio donde algo está → 边. Trayecto, rumbo y lugar: tres preguntas distintas, tres moldes.',
        ], [
          ['从公司到家，我坐船。', 'cóng gōngsī dào jiā, wǒ zuò chuán.', 'De la empresa a casa, voy en barco.'],
          ['从早上到晚上。', 'cóng zǎoshang dào wǎnshang.', 'De la mañana a la noche.'],
          ['向右拐。', 'xiàng yòu guǎi.', 'Gira a la derecha.'],
        ]),
      ],
    ),
    lesson(
      'm19d-l3',
      'El mundo del trabajo',
      'vocab',
      [
        ...drill('w-gong-si'),
        ...drill('w-shang-ban'),
        ...drill('w-lu4'),
        ...drill('w-mai4'),
        noteStep('n-shang-ban'),
        build('我每天上午上班。', 'wǒ měitiān shàngwǔ shàngbān.', 'Todos los días por la mañana voy a trabajar.'),
        build('这个商店卖衣服。', 'zhè ge shāngdiàn mài yīfu.', 'Esta tienda vende ropa.'),
      ],
      [
        grammar('n-shang-ban', '上班, 路 y la pareja 买/卖', [
          '上班 (shàngbān) es "subirse al turno": 上 (subir) + 班 (bān, turno de trabajo) = ir a trabajar. Su espejo es 下班 (xiàbān), "bajarse del turno": salir del trabajo. La jornada laboral se construye con la misma pareja subir/bajar del S-20: mientras 上班 estás dentro; con 下班 eres libre.',
          '公司 (gōngsī) es la empresa: el edificio donde vive el turno. Y 路 (lù) cubre las dos cosas que el español separa: el CAMINO (el recorrido — 在路上 = "en el camino", de ruta) y la CALLE (la vía urbana). Una sola palabra: el chino no distingue el trayecto del asfalto.',
          'La pareja tonal del mercado: 买 (mǎi, tono 3) compra; 卖 (mài, tono 4) vende. Un tono de diferencia decide si el dinero SALE o ENTRA de tu bolsillo. 我买，你卖 = "yo compro, tú vendes": el comercio entero en cuatro sílabas.',
          'Y el molde de tienda para estrenar 卖: 这个商店卖衣服 = "esta tienda vende ropa" (商店 del S-05; 衣服, yīfu, con segunda sílaba floja). La tienda no vende "a alguien": sujeto → 商店 → 卖 → mercancía, y la cartera del cliente ya sabe a dónde ir.',
          'Tip del Overseer: escucha el tono antes de abrir la cartera. Con mǎi la cartera se abre; con mài la cartera cobra. Confundirlos en el refugio es un incidente contable.',
        ], [
          ['我每天上午上班。', 'wǒ měitiān shàngwǔ shàngbān.', 'Todos los días por la mañana voy a trabajar.'],
          ['这个商店卖衣服。', 'zhè ge shāngdiàn mài yīfu.', 'Esta tienda vende ropa.'],
          ['我买，你卖。', 'wǒ mǎi, nǐ mài.', 'Yo compro, tú vendes.'],
        ]),
      ],
    ),
    lesson(
      'm19d-l4',
      'Auditoría del Sector 25',
      'review',
      [
        match('w-ji-chang', 'w-chuan2', 'w-lu4', 'w-mai4'),
        match('w-zuo-bian', 'w-you-bian', 'w-wai4', 'w-lv-you'),
        { type: 'listen', entry: 'w-gong-gong-qi-che' },
        { type: 'listen', entry: 'w-piao4' },
        dictate('w-lv-you'),
        dictate('w-shang-ban'),
        typeP('w-cong2'),
        build('两张票，谢谢。', 'liǎng zhāng piào, xièxie.', 'Dos billetes, gracias.'),
        build('我坐公共汽车去机场。', 'wǒ zuò gōnggòng qìchē qù jīchǎng.', 'Voy al aeropuerto en autobús.'),
        ...practice('w-xiang4'),
        ...practice('w-gong-si'),
      ],
    ),
  ],
}
