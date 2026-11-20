/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 6 · HSK 1 — COMIDA Y BEBIDA (módulo 6/12)

   Pedir, querer y sobrevivir en el comedor del refugio: 吃 y 喝 para la
   acción, 想 para los antojos y la bandeja llena de 水, 茶 y 米饭.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m6: VaultModule = {
  id: 'm6',
  hsk: 1,
  code: 'S-06',
  title: 'Comida y bebida',
  subtitle: 'Pedir, querer y sobrevivir en el comedor del refugio',
  entries: [
    // (请, 朋友, 我, 你, 他, 她, 和, 很, 不, 多少… viven en otros sectores: aquí solo se referencian)
    e('w-chi1', '吃', 'chī', 'comer', '🍽'),
    e('w-he1', '喝', 'hē', 'beber', '🥤'),
    e('w-shui3', '水', 'shuǐ', 'agua', '💧'),
    e('w-cha2', '茶', 'chá', 'té', '🍵'),
    e('w-mi-fan', '米饭', 'mǐfàn', 'arroz (cocinado)', '🍚'),
    e('w-ping-guo', '苹果', 'píngguǒ', 'manzana', '🍎'),
    e('w-ji-rou', '鸡肉', 'jīrōu', 'pollo (carne)', '🍗'),
    e('w-niu-nai', '牛奶', 'niúnǎi', 'leche', '🥛'),
    e('w-shui-guo', '水果', 'shuǐguǒ', 'fruta', '🍉'),
    e('w-cai4', '菜', 'cài', 'plato, comida, verdura', '🥬'),
    e('w-xiang3', '想', 'xiǎng', 'querer, desear', '💭'),
  ],
  lessons: [
    lesson(
      'm6-l1',
      'El comedor',
      'vocab',
      [
        ...drill('w-chi1'),
        ...drill('w-he1'),
        ...drill('w-shui3'),
        ...drill('w-cha2'),
        ...drill('w-mi-fan'),
        { type: 'intro', entry: 'w-xiang3' },
        noteStep('n-svo'),
        match('w-chi1', 'w-he1', 'w-shui3', 'w-cha2', 'w-mi-fan'),
        build('我想喝水。', 'wǒ xiǎng hē shuǐ.', 'Quiero beber agua.'),
        build('他吃米饭。', 'tā chī mǐfàn.', 'Él come arroz.'),
      ],
      [
        grammar('n-svo', 'La frase básica: Sujeto + Verbo + Objeto', [
          'El chino ordena las ideas como el español: SUJETO + VERBO + OBJETO. 我想喝水 = yo + querer + beber agua. Sin trucos.',
          'Los verbos NUNCA se conjugan: 没有 tiempos como "como/comía". La misma forma de 吃 sirve para "como", "comía" y "comeré".',
          '¿Varias cosas? Únelas con 和, del Sector 4: 我想吃米饭和菜 = "quiero comer arroz y verdura".',
        ], [
          ['我想喝水。', 'wǒ xiǎng hē shuǐ.', 'Quiero beber agua.'],
          ['他吃米饭。', 'tā chī mǐfàn.', 'Él come arroz.'],
          ['我和她吃苹果。', 'wǒ hé tā chī píngguǒ.', 'Ella y yo comemos manzanas.'],
        ]),
      ],
    ),
    lesson(
      'm6-l2',
      'La despensa',
      'vocab',
      [
        ...drill('w-ping-guo'),
        ...drill('w-ji-rou'),
        ...drill('w-niu-nai'),
        ...drill('w-shui-guo'),
        ...drill('w-cai4'),
        ...practice('w-xiang3'),
        noteStep('n-xiang3'),
        build('我想喝茶。', 'wǒ xiǎng hē chá.', 'Quiero tomar té.'),
        build('我的朋友想吃水果。', 'wǒ de péngyou xiǎng chī shuǐguǒ.', 'Mi amigo quiere comer fruta.'),
        match('w-ping-guo', 'w-ji-rou', 'w-niu-nai', 'w-shui-guo', 'w-cai4'),
      ],
      [
        grammar('n-xiang3', '想 (xiǎng): querer hacer algo', [
          '想 + verbo = "querer hacer algo": 想吃 "querer comer", 想喝 "querer beber". Sin conjugación, como todo en el refugio.',
          '想 también significa "pensar" o "extrañar" a alguien, pero en HSK 1 casi siempre es "querer".',
          'Para insistir añade 很: 我很想吃 = "tengo muchísimas ganas de comer". Y para precios y cantidades rescata tu 多少 (duōshao).',
          'Otra cara de 还 (hái): "además/también". 我还想吃水果 = "quiero comer fruta ADEMÁS". Mismo carácter que 还是, otro papel.',
        ], [
          ['你想喝茶吗？', 'nǐ xiǎng hē chá ma?', '¿Quieres tomar té?'],
          ['我想吃一个苹果。', 'wǒ xiǎng chī yí gè píngguǒ.', 'Quiero comer una manzana.'],
          ['她不想喝茶。', 'tā bù xiǎng hē chá.', 'Ella no quiere tomar té.'],
        ]),
      ],
    ),
    lesson(
      'm6-l3',
      'Auditoría del Sector 6',
      'review',
      [
        match('w-mi-fan', 'w-ping-guo', 'w-ji-rou', 'w-shui-guo', 'w-cai4'),
        match('w-shui3', 'w-cha2', 'w-niu-nai', 'w-chi1', 'w-he1'),
        { type: 'listen', entry: 'w-chi1' },
        { type: 'listen', entry: 'w-he1' },
        { type: 'listen', entry: 'w-xiang3' },
        build('我想喝水。', 'wǒ xiǎng hē shuǐ.', 'Quiero beber agua.'),
        ...practice('w-qing3'),
        build('请喝茶。', 'qǐng hē chá.', 'Por favor, toma té.'),
        typeP('w-chi1'),
      ],
    ),
  ],
}
