/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 10 · HSK 1 — AUDITORÍA FINAL (módulo 10/10)

   El dictado del Overseer: dieciséis palabras al oído puro, una última
   conversación con todo lo aprendido y el certificado del Vault.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, grammar, lesson, match, noteStep, typeP } from '../builders'

export const m10: VaultModule = {
  id: 'm10',
  hsk: 1,
  code: 'S-10',
  title: 'Auditoría Final',
  subtitle: 'El dictado del Overseer: todo el HSK 1 en un último protocolo',
  // Sector de auditoría: SIN palabras nuevas. Todo lo que suena aquí viene de los sectores 1-9.
  entries: [],
  lessons: [
    lesson(
      'm10-l1',
      'Dictado del Overseer',
      'review',
      [
        dictate('w-ni-hao'),
        dictate('w-xie-xie'),
        dictate('w-zai-jian'),
        dictate('w-wo3'),
        dictate('w-shi4'),
        dictate('w-bu4'),
        dictate('w-ming-zi'),
        dictate('w-peng-you'),
        dictate('w-duo-shao'),
        dictate('w-jin-tian'),
        dictate('w-xian-zai'),
        dictate('w-xue-xi'),
        dictate('w-gong-zuo'),
        dictate('w-shui-jiao'),
        dictate('w-xi-huan'),
        dictate('w-zhong-wen'),
        noteStep('n-overseer'),
        match('w-ni-hao', 'w-xie-xie', 'w-zai-jian', 'w-dui-bu-qi'),
      ],
      [
        grammar('n-overseer', 'Dictado del Overseer: COMPLETADO', [
          'ACCESO CONCEDIDO, habitante. Dieciséis palabras al oído puro, sin pinyin que te sostenga: has superado el dictado del Overseer.',
          'Antes de cerrar el sector, registra los 5 pilares de la gramática HSK 1 en tu terminal: ① preguntas con 吗 (你是学生吗？) ② posesión con 的 (我的猫) ③ 在 para el lugar (我在学校) ④ 很 + adjetivo, sin "ser" (今天很热) ⑤ 会 y 能, saber y poder (我会说中文).',
          'Con esas cinco llaves abres casi cualquier frase del refugio. Guárdalas juntas, como el resto de tus provisiones.',
        ], [
          ['你是学生吗？', 'nǐ shì xuésheng ma?', '¿Eres estudiante?'],
          ['我的猫在学校。', 'wǒ de māo zài xuéxiào.', 'Mi gato está en la escuela.'],
          ['我会说中文。', 'wǒ huì shuō zhōngwén.', 'Sé hablar chino.'],
        ]),
      ],
    ),
    lesson(
      'm10-l2',
      'La conversación final',
      'review',
      [
        build('你叫什么名字？', 'nǐ jiào shénme míngzi?', '¿Cómo te llamas?'),
        build('我的名字是安东。', 'wǒ de míngzi shì Āndōng.', 'Me llamo Antonio.'),
        build('我会写中文字。', 'wǒ huì xiě zhōngwén zì.', 'Sé escribir caracteres chinos.'),
        build('我的朋友明天来我家。', 'wǒ de péngyou míngtiān lái wǒ jiā.', 'Mi amigo viene mañana a mi casa.'),
        match('w-gao-xing', 'w-piao-liang', 'w-lei4', 'w-mang2'),
        { type: 'listen', entry: 'w-xiang3' },
        typeP('w-zhong-wen'),
        noteStep('n-finale'),
      ],
      [
        grammar('n-finale', 'CERTIFICADO DEL VAULT', [
          'PROTOCOLO HSK 1 COMPLETADO: ~150 palabras, los 5 pilares de gramática y un refugio en pie. Esto ya no es supervivencia, habitante: es dominio.',
          'El Overseer está orgulloso de ti. La siguiente puerta lleva al HSK 2: más palabras, más frases y el mundo de fuera esperando a que lo saludes en chino.',
          'Hasta entonces, mantén la racha: el SRS nunca duerme y el refugio tampoco.',
        ], [
          ['今天我很高兴。', 'jīntiān wǒ hěn gāoxìng.', 'Hoy estoy contento.'],
          ['我们爱中文。', 'wǒmen ài zhōngwén.', 'Amamos el chino.'],
          ['再见！', 'zàijiàn!', '¡Adiós!'],
        ]),
      ],
    ),
  ],
}
