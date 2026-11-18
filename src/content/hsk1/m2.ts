/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 2 · HSK 1 — IDENTIDAD (módulo 2/10)

   Presentarte, decir tu nombre y de dónde eres: los pronombres 您/他/她,
   el verbo 叫 ("llamarse") y la partícula posesiva 的.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m2: VaultModule = {
  id: 'm2',
  hsk: 1,
  code: 'S-02',
  title: 'Identidad',
  subtitle: 'Presentarte, decir tu nombre y de dónde eres',
  entries: [
    // (你, 我, 是, 你好, 谢谢 se introdujeron en sectores previos: aquí solo se referencian)
    e('w-nin2', '您', 'nín', 'usted', '🎩'),
    e('w-ta1', '他', 'tā', 'él', '👨'),
    e('w-ta1-she', '她', 'tā', 'ella', '👩', 'mismo sonido que 他'),
    e('w-jiao4', '叫', 'jiào', 'llamarse', '📛'),
    e('w-shen-me', '什么', 'shénme', 'qué', '❓'),
    e('w-ming-zi', '名字', 'míngzi', 'nombre', '🏷'),
    e('w-ren2', '人', 'rén', 'persona', '🧑'),
    e('w-zhong-guo', '中国', 'Zhōngguó', 'China', '🇨🇳'),
    e('w-xi-ban-ya', '西班牙', 'Xībānyá', 'España', '🇪🇸'),
    e('w-xue-sheng', '学生', 'xuésheng', 'estudiante', '🎓'),
    e('w-lao-shi', '老师', 'lǎoshī', 'profesor, profesora', '👩‍🏫'),
    e('w-peng-you', '朋友', 'péngyou', 'amigo, amiga', '🤝'),
    e('w-xian-sheng', '先生', 'xiānsheng', 'señor', '🤵'),
    e('w-xiao-jie', '小姐', 'xiǎojiě', 'señorita', '👸'),
    e('w-de5', '的', 'de', 'partícula posesiva', '🔗', 'se escribe sin tono'),
  ],
  lessons: [
    lesson(
      'm2-l1',
      '¿Quién eres?',
      'vocab',
      [
        ...practice('w-ni-hao'),
        ...drill('w-nin2'),
        ...drill('w-ta1'),
        ...drill('w-ta1-she'),
        noteStep('n-ta-homofono'),
        build('他叫安东。', 'tā jiào Āndōng.', 'Él se llama Antonio.'),
        build('她叫玛丽亚。', 'tā jiào Mǎlìyà.', 'Ella se llama María.'),
      ],
      [
        grammar('n-ta-homofono', '他 y 她: mismo sonido (tā)', [
          '他 (él) y 她 (ella) suenan IGUAL: tā. El género no se oye: solo se ve en el carácter — 他 lleva 人 "persona" a un lado y 她 lleva 女 "mujer".',
          'Al escuchar, el género se deduce del contexto: tā jiào Mǎlìyà… será ella. El oído no distingue; el ojo, sí.',
        ], [
          ['他叫安东。', 'tā jiào Āndōng.', 'Él se llama Antonio.'],
          ['她叫玛丽亚。', 'tā jiào Mǎlìyà.', 'Ella se llama María.'],
        ]),
      ],
    ),
    lesson(
      'm2-l2',
      'Nombres y oficios',
      'grammar',
      [
        ...practice('w-ni3'),
        ...drill('w-jiao4'),
        ...drill('w-shen-me'),
        ...drill('w-ming-zi'),
        ...drill('w-xue-sheng'),
        ...drill('w-lao-shi'),
        noteStep('n-jiao4'),
        build('你叫什么名字？', 'nǐ jiào shénme míngzi?', '¿Cómo te llamas?'),
        build('我叫安东。', 'wǒ jiào Āndōng.', 'Me llamo Antonio.'),
      ],
      [
        grammar('n-jiao4', '叫 (jiào): llamarse… y llamar', [
          '"¿Cómo te llamas?" se dice 你叫什么名字？ — literalmente "tú llamas qué nombre". El orden no cambia: sujeto + 叫 + 什么 + 名字.',
          'Para responder, solo cambia el sujeto: 我叫… ("me llamo…"). Y con usted, igual: 您叫什么名字？',
          'Ojo: 叫 también sirve para LLAMAR a alguien: 他叫我老师 = "él me llama profesor".',
        ], [
          ['你叫什么名字？', 'nǐ jiào shénme míngzi?', '¿Cómo te llamas?'],
          ['我叫玛丽亚。', 'wǒ jiào Mǎlìyà.', 'Me llamo María.'],
          ['您叫什么名字？', 'nín jiào shénme míngzi?', '¿Cómo se llama? (formal)'],
          ['他叫我老师。', 'tā jiào wǒ lǎoshī.', 'Él me llama profesor.'],
        ]),
      ],
    ),
    lesson(
      'm2-l3',
      'De dónde eres',
      'vocab',
      [
        ...practice('w-wo3'),
        ...drill('w-ren2'),
        ...drill('w-zhong-guo'),
        ...drill('w-xi-ban-ya'),
        ...drill('w-xian-sheng'),
        ...drill('w-xiao-jie'),
        ...drill('w-peng-you'),
        ...drill('w-de5'),
        noteStep('n-de5'),
        build('我的名字是安东。', 'wǒ de míngzi shì Āndōng.', 'Mi nombre es Antonio.'),
        build('他是我的朋友。', 'tā shì wǒ de péngyou.', 'Él es mi amigo.'),
      ],
      [
        grammar('n-de5', 'La posesión con 的 (de)', [
          'El dueño va PRIMERO, 的 enlaza y la cosa va detrás: 我的名字 = "mi nombre", literalmente "el nombre de mí".',
          'Funciona con cualquier dueño: 你的狗 = "tu perro", 他的朋友 = "su amigo". El orden dueño + 的 + cosa nunca cambia.',
          'Y el tono nunca cambia: 的 siempre se escribe sin marca y suena suave y corta, como un eslabón.',
        ], [
          ['他是我的老师。', 'tā shì wǒ de lǎoshī.', 'Él es mi profesor.'],
          ['她是你的朋友吗？', 'tā shì nǐ de péngyou ma?', '¿Es ella tu amiga?'],
        ]),
      ],
    ),
    lesson(
      'm2-l4',
      'Auditoría del Sector 2',
      'review',
      [
        ...practice('w-nin2'),
        ...practice('w-xian-sheng'),
        ...practice('w-xiao-jie'),
        match('w-ta1', 'w-ta1-she', 'w-jiao4', 'w-shen-me'),
        match('w-xue-sheng', 'w-lao-shi', 'w-peng-you', 'w-ren2'),
        { type: 'listen', entry: 'w-shi4' },
        { type: 'listen', entry: 'w-xie-xie' },
        { type: 'listen', entry: 'w-zhong-guo' },
        build('你叫什么名字？', 'nǐ jiào shénme míngzi?', '¿Cómo te llamas?'),
        build('他是我的朋友。', 'tā shì wǒ de péngyou.', 'Él es mi amigo.'),
        typeP('w-ming-zi'),
      ],
    ),
  ],
}
