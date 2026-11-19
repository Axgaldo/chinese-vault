/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 15 · HSK 2 — COMPARAR Y DESCRIBIR (módulo 5/10)

   El sector de la báscula: adjetivos en parejas canónicas, colores fabricados
   con 色 y la estructura A + 比 + B + ADJETIVO (sin "más" extra: el comparativo
   vive en 比). Y 有点儿, el pelín con queja incorporada — en chino, el
   sentimiento viaja dentro de la partícula.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m15: VaultModule = {
  id: 'm15',
  hsk: 2,
  code: 'S-15',
  title: 'Comparar y Describir',
  subtitle: 'Adjetivos enfrentados, colores y la estructura 比',
  entries: [
    e('w-chang2', '长', 'cháng', 'largo', '📏'),
    e('w-duan3', '短', 'duǎn', 'corto', '✂️'),
    e('w-xin1', '新', 'xīn', 'nuevo', '🆕'),
    e('w-jiu4', '旧', 'jiù', 'viejo (cosa)', '🩹'),
    e('w-kuai4', '快', 'kuài', 'rápido', '🏃'),
    e('w-man4', '慢', 'màn', 'lento', '🐢'),
    e('w-yuan3', '远', 'yuǎn', 'lejos', '🌍'),
    e('w-jin4', '近', 'jìn', 'cerca', '📍'),
    e('w-bai-se', '白色', 'báisè', 'blanco (color)', '⚪', 'bái = blanco · sè = color'),
    e('w-hei-se', '黑色', 'hēisè', 'negro (color)', '⚫', 'hēi = negro · sè = color'),
    e('w-hong-se', '红色', 'hóngsè', 'rojo (color)', '🔴', 'hóng = rojo · sè = color'),
    e('w-qi-che', '汽车', 'qìchē', 'coche', '🚗', 'qì = vapor (a motor) · chē = vehículo'),
    e('w-zi-xing-che', '自行车', 'zìxíngchē', 'bicicleta', '🚲', 'zì = propio · xíng = rodar · chē = vehículo ("vehículo que anda solo")'),
    e('w-bi3', '比', 'bǐ', 'comparar (más que)', '⚖️'),
    e('w-you-dianr', '有点儿', 'yǒudiǎnr', 'un poco (peyorativo)', '😖', 'yǒu = tener · diǎnr = un poquito'),
  ],
  lessons: [
    lesson(
      'm15-l1',
      'Opuestos en guerra',
      'vocab',
      [
        ...drill('w-chang2'),
        ...drill('w-duan3'),
        ...drill('w-xin1'),
        ...drill('w-jiu4'),
        ...drill('w-zi-xing-che'),
        noteStep('n-duiying'),
        build('我的自行车是新的。', 'wǒ de zìxíngchē shì xīn de.', 'Mi bicicleta es nueva.'),
        build('我的新自行车很快。', 'wǒ de xīn zìxíngchē hěn kuài.', 'Mi bici nueva es muy rápida.'),
      ],
      [
        grammar('n-duiying', 'Los adjetivos vienen en parejas', [
          'El chino vende los adjetivos en PAREJAS canónicas: 长↔短 (largo↔corto), 新↔旧 (nuevo↔viejo), 快↔慢 (rápido↔lento), 远↔近 (lejos↔cerca). Y los singles del Sector 9 también tienen contrincante: 大↔小 (grande↔pequeño), 好↔坏 (bueno↔malo), y el 高 de siempre se mide contra 矮 (ǎi, "bajito" de estatura).',
          'A) POR QUÉ MEMORIZAR EN PAREJA: la memoria humana engancha por oposiciones: "corto" se recuerda POR no ser "largo". El contraste es el gancho. Al repasar, recita el duelo en voz alta: cháng... duǎn · xīn... jiù · kuài... màn · yuǎn... jìn. Dos palabras, una sola huella en el archivo del refugio.',
          'B) EL ADJETIVO SE APILA DELANTE: 新自行车 = "bicicleta nueva", 旧汽车 = "coche viejo": mismo orden que el español. Y con posesivo, el orden canónico: 我的新自行车 = "mi bici nueva" — posesivo → adjetivo → cosa. Fíjate: el 的 solo marca al posesivo (我的); el adjetivo pegado a la cosa no lo necesita (aunque 新的自行车 también es válido, un paso más lento).',
          'C) DOS MANERAS DE SER NUEVO: 我的自行车很新 DESCRIBE ("está muy nueva"); 我的自行车是新的 IDENTIFICA ("es nueva — no es segunda mano"). El 的 final convierte el adjetivo en etiqueta: literalmente "mi bici es de-las-nuevas". Es el mismo 的 posesivo que marca a qué CAJA pertenece algo; aquí la caja es la clase "nueva".',
          'Tip del Overseer: aprende cada adjetivo junto a su contrincante, como cartas de duelo. Si en el mercado del refugio solo recuerdas cháng, pregunta por su anti-: duǎn viene gratis. El chino nunca vende una propiedad sin su antídoto.',
        ], [
          ['我的自行车是新的。', 'wǒ de zìxíngchē shì xīn de.', 'Mi bicicleta es nueva. (identifica: es de las nuevas)'],
          ['我的新自行车很快。', 'wǒ de xīn zìxíngchē hěn kuài.', 'Mi bici nueva es muy rápida. (describe)'],
          ['我的猫很大，他的猫很小。', 'wǒ de māo hěn dà, tā de māo hěn xiǎo.', 'Mi gato es grande, su gato es pequeño. (duelo del Sector 9)'],
        ]),
      ],
    ),
    lesson(
      'm15-l2',
      'Colores del refugio',
      'vocab',
      [
        ...drill('w-kuai4'),
        ...drill('w-man4'),
        ...drill('w-yuan3'),
        ...drill('w-jin4'),
        ...drill('w-bai-se'),
        ...drill('w-hei-se'),
        ...drill('w-hong-se'),
        ...drill('w-qi-che'),
        noteStep('n-yanse'),
        build('我的猫是黑色的。', 'wǒ de māo shì hēisè de.', 'Mi gato es negro.'),
      ],
      [
        grammar('n-yanse', '色: el sufijo que fabrica colores', [
          'El chino fabrica colores con un molde de dos piezas: [raíz] + 色 (sè, "color"). 白色 = "blanco-color", 黑色 = "negro-color", 红色 = "rojo-color". Conocer el molde te regala el futuro: 黄色 (huángsè, amarillo), 蓝色 (lánsè, azul), 绿色 (lǜsè, verde)... todos caen solos.',
          'A) EL COLOR VA DELANTE, SIEMPRE: el color es un adjetivo más y acompaña a su cosa POR DELANTE: 白车 (bái chē, "coche blanco"), 红色的汽车 ("coche rojo"). ✗Nunca detrás: 车白 no existe como "coche blanco". Y para decir que algo ES de un color, el molde 是...的 de la lección anterior: 我的猫是黑色的 = "mi gato es negro" ("es de-color-negro").',
          'B) PEGADO O CON 的: 白车 es rápido y de calle; 白色的车 es más completo, con el 的 marcando la etiqueta. Los dos son correctos: el chino elige densidad según la prisa. Con nombres de dos sílabas, el 的 da aire: 红色的汽车 fluye mejor que 红汽车.',
          'C) LA PALABRA PARAGUAS: el "color" como concepto se dice 颜色 (yánsè) — la usarás al preguntar: 什么颜色？ (shénme yánsè?) = "¿qué color?". Y la raíz suelta (白, 黑, 红) también significa el color pelado: 白猫 = "gato blanco". El 色 añade el rango de "color oficial", como cuando el supervisor archiva: "blanco: color del refugio".',
          'Tip del Overseer: ¿una caja cerrada y quieres saber qué hay dentro? Apunta y pregunta 什么颜色？ Dos palabras que abren cualquier almacén del mundo chino.',
        ], [
          ['我的猫是黑色的。', 'wǒ de māo shì hēisè de.', 'Mi gato es negro.'],
          ['红色的汽车很快。', 'hóngsè de qìchē hěn kuài.', 'El coche rojo es muy rápido.'],
          ['什么颜色？', 'shénme yánsè?', '¿Qué color?'],
        ]),
      ],
    ),
    lesson(
      'm15-l3',
      'La báscula del chino',
      'grammar',
      [
        ...drill('w-bi3'),
        ...drill('w-you-dianr'),
        noteStep('n-bi'),
        noteStep('n-youdian'),
        build('汽车比自行车快。', 'qìchē bǐ zìxíngchē kuài.', 'El coche es más rápido que la bici.'),
        build('图书馆离我家很近。', 'túshūguǎn lí wǒ jiā hěn jìn.', 'La biblioteca está muy cerca de mi casa.'),
        build('今天有点儿热。', 'jīntiān yǒudiǎnr rè.', 'Hoy hace un poquito de calor (uf).'),
      ],
      [
        grammar('n-bi', '比: la báscula de dos platos', [
          'La comparación china es una báscula: A + 比 (bǐ) + B + ADJETIVO. 汽车比自行车快 = "el coche es más rápido que la bici". 比 es la palanca que inclina el fiel hacia A; lo que se coloca detrás de 比 (el plato B) pierde la comparación.',
          'A) EL ERROR NÚMERO UNO: pagar el "más" dos veces. El "más" YA ESTÁ dentro de 比, así que el adjetivo final va PELADO: ✗汽车比自行车更快 (el 更 de "más-más" desequilibra la frase) / ✓汽车比自行车快. Ni 很, ni 更, ni adorno: la báscula compara y el adjetivo solo declara la cualidad.',
          'B) ¿CUÁNTO MÁS? El grado se cuelga AL FINAL: 汽车比自行车快很多 (kuài hěn duō) = "mucho más rápido"; 快一点儿 (yìdiǎnr) = "un poco más rápido". La medida siempre cierra la frase, tras el adjetivo — nunca junto a 比.',
          'C) LA NEGATIVA SE MANEJA CON PINZAS: "A no es más X que B" se dice A + 不比 + B + X: 我不比你高 = "no soy más alto que tú". Atención: NO significa "soy más bajo", solo que la báscula no demuestra nada. Negar la comparación no es ganar la contraria.',
          'D) 离 PARA LAS DISTANCIAS: cuando lo que se mide es un MAPA y no una cualidad, la pieza se llama 离 (lí, "a distancia de"): A + 离 + B + 近/远. 图书馆离我家很近 = "la biblioteca está muy cerca de mi casa" — puntos y regla, sin 比. Cerca y lejos se miden con 离; rápido y lento se comparan con 比.',
          'Tip del Overseer: canta el molde al fabricar la frase: GANADOR → 比 → RIVAL → adjetivo pelado. Si te sale un "más" extra (gèng), has pagado el peaje dos veces: el Overseer no devuelve fichas.',
        ], [
          ['汽车比自行车快。', 'qìchē bǐ zìxíngchē kuài.', 'El coche es más rápido que la bici.'],
          ['图书馆离我家很近。', 'túshūguǎn lí wǒ jiā hěn jìn.', 'La biblioteca está muy cerca de mi casa.'],
          ['汽车比自行车快很多。', 'qìchē bǐ zìxíngchē kuài hěn duō.', 'El coche es mucho más rápido que la bici.'],
        ]),
        grammar('n-youdian', '有点儿: el pelín con queja incorporada', [
          '有点儿 (yǒudiǎnr) pesa poco y sufre mucho: significa "un pelín... (uf)". La queja va INCORPORADA: 今天有点儿热 no es una medida neutral — es "hace un poco de calor Y LO PASO MAL". El chino mete la emoción dentro de la palabra: lo que el español transmite con el tono de voz, aquí viaja en la partícula.',
          'A) EL ERROR CLÁSICO: usarlo con algo que te gusta. ✗这个蛋糕有点儿好吃 suena a "este pastel está un poco bueno... qué desgracia": contradicción total que hace gracia a los nativos. Para elogiar, 很好吃 y a otra cosa. 有点儿 es EXCLUSIVO de molestias: calor, sopa ácida, bici vieja, vecino ruidoso.',
          'B) EL MOLDE: SUJETO + 有点儿 + ADJETIVO, con el adjetivo pelado: ✗今天有点儿很热 (doble intensivo imposible: 有点儿 ya mide, 很 volvería a medir). Nota de fonética: la sílaba 儿 final es pura marca de Pekín; en el sur muchos dicen 有点 (yǒudiǎn) y es igual de correcto.',
          'C) CONTRASTE FINO con 一点儿: 汤有点儿酸 = "la sopa está un pelín ácida (uf)": queja. 汤比这个酸一点儿 = "la sopa es un poco más ácida que esta": medida fría, sin sentimiento. La misma cifra, distinta cara: 有点儿 levanta la ceja; 一点儿 saca la regla.',
          'Tip del Overseer: ¿algo te molesta un pelín? 有点儿 + adjetivo y suspira. ¿algo te gusta un pelín? Jamás lo digas con 有点儿: di 很 + adjetivo y sonríe. El refugio aprecia la precisión hasta en las quejas.',
        ], [
          ['今天有点儿热。', 'jīntiān yǒudiǎnr rè.', 'Hoy hace un poquito de calor (uf).'],
          ['汤有点儿酸。', 'tāng yǒudiǎnr suān.', 'La sopa está un pelín ácida (uf).'],
          ['我的自行车有点儿旧。', 'wǒ de zìxíngchē yǒudiǎnr jiù.', 'Mi bici está un pelín vieja (uf).'],
        ]),
      ],
    ),
    lesson(
      'm15-l4',
      'Auditoría del Sector 15',
      'review',
      [
        match('w-chang2', 'w-duan3', 'w-xin1', 'w-jiu4'),
        match('w-kuai4', 'w-man4', 'w-yuan3', 'w-jin4'),
        match('w-bai-se', 'w-hei-se', 'w-hong-se', 'w-qi-che'),
        { type: 'listen', entry: 'w-bi3' },
        { type: 'listen', entry: 'w-you-dianr' },
        dictate('w-zi-xing-che'),
        dictate('w-you-dianr'),
        typeP('w-bi3'),
        build('汽车比自行车快。', 'qìchē bǐ zìxíngchē kuài.', 'El coche es más rápido que la bici.'),
        build('我的猫是黑色的。', 'wǒ de māo shì hēisè de.', 'Mi gato es negro.'),
        ...practice('w-chang2'),
      ],
    ),
  ],
}
