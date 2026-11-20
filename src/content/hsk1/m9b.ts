/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 10 · HSK 1 — EN LA CIUDAD

   La ciudad abre sus compuertas: Pekín como destino y los transportes que
   llevan hasta él (坐 + vehículo), la compra del morador (买, 东西, 衣服)
   y los gestos urbanos de siempre — 住 en un sitio, 打电话 a los tuyos.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m9b: VaultModule = {
  id: 'm9b',
  hsk: 1,
  code: 'S-10',
  title: 'En la ciudad',
  subtitle: 'Lugares, compras y gestos urbanos',
  entries: [
    // (去, 坐, 便宜, 这/个, 和, 妈妈, 学校… viven en sectores anteriores: aquí solo se referencian)
    e('w-bei-jing', '北京', 'Běijīng', 'Pekín', '🏙️'),
    e('w-chu-zu-che', '出租车', 'chūzūchē', 'taxi', '🚕'),
    e('w-fei-ji', '飞机', 'fēijī', 'avión', '✈️'),
    e('w-fan-guan', '饭馆', 'fànguǎn', 'restaurante', '🍜'),
    e('w-mai3', '买', 'mǎi', 'comprar', '🛒'),
    e('w-yi-fu2', '衣服', 'yīfu', 'ropa', '👕'),
    e('w-dong-xi', '东西', 'dōngxi', 'cosa(s)', '🎁'),
    e('w-zhu4', '住', 'zhù', 'vivir (en un lugar)', '🏠'),
    e('w-da-dian-hua', '打电话', 'dǎ diànhuà', 'llamar por teléfono', '📞'),
    e('w-tong-xue', '同学', 'tóngxué', 'compañero de clase', '🎓'),
  ],
  lessons: [
    lesson(
      'm9b-l1',
      'Pekín te espera',
      'vocab',
      [
        ...drill('w-bei-jing'),
        ...drill('w-fei-ji'),
        ...drill('w-chu-zu-che'),
        ...practice('w-zuo4-sit'),
        noteStep('n-zuo4'),
        build('我去北京。', 'wǒ qù Běijīng.', 'Voy a Pekín.'),
        build('我坐出租车去学校。', 'wǒ zuò chūzūchē qù xuéxiào.', 'Voy a la escuela en taxi.'),
        match('w-bei-jing', 'w-fei-ji', 'w-chu-zu-che', 'w-qu4'),
      ],
      [
        grammar('n-zuo4', '坐 (zuò): sentarse… y viajar sentado', [
          '坐 la conociste como "sentarse". En la ciudad hace turno doble: también significa IR EN un transporte. 我坐出租车去学校 no es "me siento en un taxi": es "voy a la escuela en taxi".',
          'El molde es de bloques, como todo en este refugio: 坐 + TRANSPORTE + 去 + LUGAR. El transporte se incrusta DELANTE del verbo de movimiento, como una herramienta más: 我坐飞机去北京 = "voy a Pekín en avión". El español pone el "en avión" al final; el chino lo adelanta.',
          '¿Por qué 坐? Porque viajas sentado: la lógica es corporal, no gramatical. Y fíjate bien: no hay ninguna preposición "en" — 坐 ya la trae consigo.',
          'Tip del Overseer: un solo molde, todos los transportes. Cambia el vehículo y la frase sigue en pie: 坐出租车去学校, 坐飞机去北京. El refugio entero se mueve con dos palabras.',
        ], [
          ['我坐出租车去学校。', 'wǒ zuò chūzūchē qù xuéxiào.', 'Voy a la escuela en taxi.'],
          ['我坐飞机去北京。', 'wǒ zuò fēijī qù Běijīng.', 'Voy a Pekín en avión.'],
        ]),
      ],
    ),
    lesson(
      'm9b-l2',
      'De compras',
      'grammar',
      [
        ...drill('w-mai3'),
        ...drill('w-dong-xi'),
        ...drill('w-yi-fu2'),
        noteStep('n-mai-dongxi'),
        build('我买衣服。', 'wǒ mǎi yīfu.', 'Compro ropa.'),
        build('这个东西很好。', 'zhè ge dōngxi hěn hǎo.', 'Esta cosa es muy buena.'),
        match('w-mai3', 'w-yi-fu2', 'w-dong-xi', 'w-pian-yi'),
      ],
      [
        grammar('n-mai-dongxi', '买 y 东西: el verbo y su botín', [
          '买 (mǎi) = comprar. Como todos los verbos chinos, no se conjuga: el quién lo pone el pronombre (我买, 你买) y el qué lo pone el objeto, que va DETRÁS.',
          'Su compañero de botín es 东西 (dōngxi) = "cosa(s)": literalmente ESTE-OESTE. Los objetos que viajaban del este al oeste (y viceversa) acabaron dando nombre a "las cosas" en general. La segunda sílaba va sin tono: dōngxi.',
          'Cuidado, morador: 东西 es solo para OBJETOS. Llamar "cosa" a una persona en chino es insulto de saqueador — no lo hagas ni en broma.',
          'El vendedor del refugio dispara la pregunta del sector: 你买什么东西？ = "¿qué compras?". Y tú respondes con tu botín: 我买衣服 = "compro ropa". Para señalar UNA cosa de la pila: 这个东西 ("esta cosa"), con el 这个 que ya dominas.',
          'Tip del Overseer: 买 es el verbo más rentable de la ciudad: donde hay algo a la venta, ahí está él. Apréndelo con 东西 pegado y tendrás la frase de compra entera.',
        ], [
          ['我买衣服。', 'wǒ mǎi yīfu.', 'Compro ropa.'],
          ['你买什么东西？', 'nǐ mǎi shénme dōngxi?', '¿Qué compras?'],
          ['这个东西很好。', 'zhè ge dōngxi hěn hǎo.', 'Esta cosa es muy buena.'],
        ]),
      ],
    ),
    lesson(
      'm9b-l3',
      'Vivir y llamar',
      'grammar',
      [
        ...drill('w-zhu4'),
        ...drill('w-da-dian-hua'),
        ...drill('w-tong-xue'),
        ...drill('w-fan-guan'),
        noteStep('n-da-dian-hua'),
        build('我住在北京。', 'wǒ zhù zài Běijīng.', 'Vivo en Pekín.'),
        build('我给妈妈打电话。', 'wǒ gěi māma dǎ diànhuà.', 'Llamo a mi mamá.'),
        build('我和同学去饭馆。', 'wǒ hé tóngxué qù fànguǎn.', 'Voy al restaurante con mi compañero de clase.'),
      ],
      [
        grammar('n-da-dian-hua', '打电话: golpear el teléfono (y otros verbo+objeto)', [
          '打电话 (dǎ diànhuà) = llamar por teléfono, literalmente "golpear el teléfono". ¿Golpear? 打 es el verbo comodín de lo que se hace a golpes de mano — y las llamadas se marcaban exactamente así, tecleando número a número.',
          'El chino fabrica nombres de acción con VERBO + OBJETO, como un invento de una sola pieza: 睡觉 (shuìjiào, dormir = "dormir el sueño"), 打电话 (llamar = "golpear el teléfono"). El objeto no es una cosa concreta: es el complemento natural de la acción.',
          '¿Llamar A alguien? El destinatario se marca con 给 (gěi) delante: 给 + persona + 打电话. 我给妈妈打电话 = "llamo a mamá" — el 给 hace de "a" español. El orden es exacto: primero a quién, después la llamada.',
          '住 (zhù) = vivir RESIDIENDO en un sitio. Y aquí el pareado con 在: 住 lleva el lugar pegado con 在 de pegamento — 我住在北京 = "vivo en Pekín". En cambio 在 a secas (我在学校) dice dónde ESTÁS ahora, sin compromiso de mudanza.',
          'Tip del Overseer: 我住在北京 (mi casa está allí) ≠ 我在北京 (ahora mismo estoy allí). El Overseer vive en el refugio, pero ahora mismo está en la cantina: dos frases, dos verdades.',
        ], [
          ['我给妈妈打电话。', 'wǒ gěi māma dǎ diànhuà.', 'Llamo a mi mamá.'],
          ['我给同学打电话。', 'wǒ gěi tóngxué dǎ diànhuà.', 'Llamo a mi compañero de clase.'],
          ['我住在北京。', 'wǒ zhù zài Běijīng.', 'Vivo en Pekín.'],
          ['我在学校。', 'wǒ zài xuéxiào.', 'Estoy en la escuela.'],
        ]),
      ],
    ),
    lesson(
      'm9b-l4',
      'Auditoría del Sector 10',
      'review',
      [
        match('w-bei-jing', 'w-chu-zu-che', 'w-fei-ji', 'w-fan-guan'),
        match('w-mai3', 'w-yi-fu2', 'w-dong-xi', 'w-zhu4'),
        { type: 'listen', entry: 'w-da-dian-hua' },
        { type: 'listen', entry: 'w-tong-xue' },
        dictate('w-bei-jing'),
        dictate('w-dong-xi'),
        typeP('w-mai3'),
        build('我买衣服。', 'wǒ mǎi yīfu.', 'Compro ropa.'),
        build('我坐出租车去学校。', 'wǒ zuò chūzūchē qù xuéxiào.', 'Voy a la escuela en taxi.'),
      ],
    ),
  ],
}
