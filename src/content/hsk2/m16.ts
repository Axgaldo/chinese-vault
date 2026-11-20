/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 16 · HSK 2 — DAR Y TOMAR (módulo 6/10)

   El mercado del refugio: 给 con la persona en el hueco de oro, V+到 como
   complemento de resultado ("conseguí + verbo") y la pareja cultural 借/还.
   Los apuntes explican el MECANISMO, con contrastes bien/mal.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m16: VaultModule = {
  id: 'm16',
  hsk: 2,
  code: 'S-16',
  title: 'Dar y Tomar',
  subtitle: 'El mercado del refugio: dar, prestar, buscar y llegar',
  entries: [
    e('w-gei3', '给', 'gěi', 'dar', '🎁'),
    e('w-song4', '送', 'sòng', 'regalar', '💌'),
    e('w-jie4', '借', 'jiè', 'prestar / pedir prestado', '🤝'),
    e('w-huan2', '还', 'huán', 'devolver', '↩️'),
    e('w-gui4', '贵', 'guì', 'caro', '💸'),
    e('w-na2', '拿', 'ná', 'tomar, coger', '✋'),
    e('w-dai4', '带', 'dài', 'llevar (consigo)', '🎒'),
    e('w-bang-zhu', '帮助', 'bāngzhù', 'ayudar', '🆘'),
    e('w-zhao3', '找', 'zhǎo', 'buscar', '🔍'),
    e('w-dao4', '到', 'dào', 'llegar a', '🎯'),
    e('w-bei-zi', '杯子', 'bēizi', 'vaso, taza', '🥤'),
    e('w-qian2', '钱', 'qián', 'dinero', '💰'),
    // id disambiguated: S-15 already owns w-kuai4 for 快 (kuài "rápido"), so 块 spells the compound 块钱.
    e('w-kuai4-qian', '块', 'kuài', 'kuai (medida yuan)', '🪙', '5块 = 5 yuanes; para contar cosas: 一块蛋糕'),
    e('w-xi-wang', '希望', 'xīwàng', 'desear, esperar', '🌟'),
    e('w-jue-de', '觉得', 'juéde', 'creer, parecer', '💭', 'la segunda sílaba va sin tono'),
  ],
  lessons: [
    lesson(
      'm16-l1',
      'El mercado del refugio',
      'vocab',
      [
        ...drill('w-gei3'),
        ...drill('w-song4'),
        ...drill('w-jie4'),
        ...drill('w-huan2'),
        ...drill('w-gui4'),
        noteStep('n-gei'),
        build('请给我一杯水。', 'qǐng gěi wǒ yì bēi shuǐ.', 'Por favor, dame un vaso de agua.'),
        build('我送妈妈一个蛋糕。', 'wǒ sòng māma yí ge dàngāo.', 'Le regalo una tarta a mi mamá.'),
      ],
      [
        grammar('n-gei', '给 + persona + cosa: el destinatario manda', [
          'En español el destinatario va al final, escoltado por "a": "dale UN VASO A MARÍA". En chino es al revés: el verbo 给 se lleva PRIMERO la persona y DESPUÉS la cosa. 给 + PERSONA + COSA, sin preposición: 给我一本书 = "dame (a mí) un libro".',
          'El error número uno del sector: copiar el orden español y dejar a la persona al final → ✗给一本书我. Ese hueco final no existe para el destinatario: el oído chino lo pierde. ✓给我一本书. La persona es el hueco de oro, siempre inmediatamente después del verbo.',
          'El molde sirve para todos los verbos de entrega del sector: 我送妈妈一个蛋糕 ("le regalo una tarta a mamá": mamá va primero), 借我一本书 ("préstame un libro"), 我还你钱 ("te devuelvo el dinero"). Verbo → persona → cosa: el mismo carril para todos.',
          'Tip del Overseer: antes de construir una frase con 给, pregúntate ¿A QUIÉN? y luego ¿QUÉ? Ese orden mental es media batalla ganada.',
        ], [
          ['请给我一杯水。', 'qǐng gěi wǒ yì bēi shuǐ.', 'Por favor, dame un vaso de agua.'],
          ['我送妈妈一个蛋糕。', 'wǒ sòng māma yí ge dàngāo.', 'Le regalo una tarta a mi mamá.'],
          ['借我一本书，好吗？', 'jiè wǒ yì běn shū, hǎo ma?', '¿Me prestas un libro, por favor?'],
        ]),
      ],
    ),
    lesson(
      'm16-l2',
      'Buscar y llegar',
      'vocab',
      [
        ...drill('w-zhao3'),
        ...drill('w-dao4'),
        ...drill('w-na2'),
        ...drill('w-dai4'),
        ...drill('w-bang-zhu'),
        noteStep('n-jieguo'),
        build('我找我的猫。', 'wǒ zhǎo wǒ de māo.', 'Estoy buscando a mi gato.'),
        build('我找到了我的猫。', 'wǒ zhǎodào le wǒ de māo.', 'He encontrado a mi gato.'),
      ],
      [
        grammar('n-jieguo', 'V + 到: el complemento de resultado', [
          '到 no solo significa "llegar a un lugar": pegado detrás de otro verbo, marca que el intento SE CUMPLIÓ. Es el "conseguí + verbo" del chino: 找到 (zhǎodào) = "encontrar-de-verdad", 听到 (tīngdào) = "oír-de-verdad", 买到 (mǎidào) = "conseguir-comprado", 学到 (xuédào) = "aprender-de-verdad".',
          'El contraste que lo explica todo: 我找我的猫 = "estoy buscando a mi gato" — el verbo pelado es el INTENTO, drama en curso. 我找到了我的猫 = "he encontrado a mi gato" — con 到 la misión está cumplida y el gato está en tus brazos. El chino dice "conseguí" con un sufijo, no con un verbo auxiliar.',
          'Como todo lo que se cumple, el resultado suele vestirse con 了 (S-11): 我找到了. Y en negación funciona igual: 没找到 = "no lo encontré (y sigo sin él)".',
          'Tip del Overseer: si la misión salió bien, pega 到 al verbo. En el refugio no vale "lo intenté": 到 es la diferencia entre buscar y encontrar.',
        ], [
          ['我找我的猫。', 'wǒ zhǎo wǒ de māo.', 'Estoy buscando a mi gato.'],
          ['我找到了我的猫。', 'wǒ zhǎodào le wǒ de māo.', 'He encontrado a mi gato.'],
          ['我听到了。', 'wǒ tīngdào le.', 'Lo he oído. (antes no, ahora sí)'],
        ]),
      ],
    ),
    lesson(
      'm16-l3',
      'Dinero y deseos',
      'vocab',
      [
        ...drill('w-qian2'),
        ...drill('w-kuai4-qian'),
        ...drill('w-bei-zi'),
        ...drill('w-xi-wang'),
        ...drill('w-jue-de'),
        noteStep('n-jie-huan'),
        build('这杯咖啡两块钱。', 'zhè bēi kāfēi liǎng kuài qián.', 'Este café cuesta dos kuai. (咖啡 kāfēi = café — solo en esta frase)'),
        build('我觉得中文很有意思。', 'wǒ juéde zhōngwén hěn yǒu yìsi.', 'Me parece que el chino es muy interesante. (有意思 yǒu yìsi = "tener gracia, ser interesante")'),
      ],
      [
        grammar('n-jie-huan', '借 y 还: el contrato de caballeros', [
          '借 (jiè) cubre las dos orillas del préstamo: dar prestado y pedir prestado. ¿Quién entrega? Lo decide la dirección de la frase: 这本书借我好吗？ = "¿me prestas este libro?" (el libro viene HACIA mí). 借 + 给 marca que sale de tu mano: 我借给他 = "se lo presto (a él)".',
          '还 (huán) es la otra mitad del contrato: DEVOLVER. Lo prestado regresa: 我还你钱 = "te devuelvo el dinero". Fíjate: sigue el molde de la lección uno — 还 + PERSONA + COSA, igual que 给. En el refugio, 借 sin 还 es un incidente de seguridad.',
          'Ojo al carácter: este 还 se lee huán. Existe otro 还 hái ("todavía/aún") que rondará por otros sectores: mismo carácter, dos vidas. El contexto y el tono las separan.',
          'Y para pagar en el mercado del refugio: 块 (kuài) cuenta yuanes — 两块钱 = "dos kuai". La frase del sector: 这杯咖啡两块钱 = "este café (咖啡 kāfēi) cuesta dos kuai". ¿Y el préstamo pequeño? 借我两块钱，好吗？ = "¿me prestas dos kuai?": el dinero también viaja en kuai.',
          'Tip del Overseer: 借 también acepta el sufijo de resultado de la lección anterior — 借到了 (jiè dào le) = "conseguí que me lo prestaran". Misión cumplida otra vez.',
        ], [
          ['这本书借我好吗？', 'zhè běn shū jiè wǒ hǎo ma?', '¿Me prestas este libro?'],
          ['我明天还你钱。', 'wǒ míngtiān huán nǐ qián.', 'Mañana te devuelvo el dinero.'],
          ['借我两块钱，好吗？', 'jiè wǒ liǎng kuài qián, hǎo ma?', '¿Me prestas dos kuai, por favor?'],
        ]),
      ],
    ),
    lesson(
      'm16-l4',
      'Auditoría del Sector 16',
      'review',
      [
        match('w-gei3', 'w-song4', 'w-jie4', 'w-huan2'),
        match('w-na2', 'w-dai4', 'w-bang-zhu', 'w-zhao3', 'w-dao4'),
        { type: 'listen', entry: 'w-bei-zi' },
        { type: 'listen', entry: 'w-qian2' },
        dictate('w-bang-zhu'),
        dictate('w-jue-de'),
        typeP('w-gei3'),
        build('请给我一杯水。', 'qǐng gěi wǒ yì bēi shuǐ.', 'Por favor, dame un vaso de agua.'),
        build('我找到了我的猫。', 'wǒ zhǎodào le wǒ de māo.', 'He encontrado a mi gato.'),
        ...practice('w-kuai4-qian'),
        ...practice('w-xi-wang'),
      ],
    ),
  ],
}
