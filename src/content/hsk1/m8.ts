/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 8 · HSK 1 — RUTINA (módulo 8/10)

   La vida diaria del refugio: 看/听/说/写 para la acción, 学习 y 工作
   para el deber de cada día, 会 para lo que sabes y 能 para lo que puedes.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, introLite, lesson, match, noteStep, typeP } from '../builders'

export const m8: VaultModule = {
  id: 'm8',
  hsk: 1,
  code: 'S-08',
  title: 'Rutina',
  subtitle: 'Verbos de acción, saber/poder y la vida diaria del refugio',
  entries: [
    // (想, 我, 你, 他, 我们, 家, 在, 这, 个, 请… viven en otros sectores: aquí solo se referencian)
    e('w-lai2', '来', 'lái', 'venir', '🙋'),
    e('w-kan4', '看', 'kàn', 'ver, mirar', '👀'),
    e('w-xie3', '写', 'xiě', 'escribir', '✍️'),
    e('w-du2', '读', 'dú', 'leer', '📖'),
    e('w-ting1', '听', 'tīng', 'escuchar', '👂'),
    e('w-shuo1', '说', 'shuō', 'decir, hablar', '🗣️'),
    e('w-xue-xi', '学习', 'xuéxí', 'estudiar', '📚', 'xué = aprender · xí = practicar'),
    e('w-gong-zuo', '工作', 'gōngzuò', 'trabajar', '💼'),
    e('w-shui-jiao', '睡觉', 'shuìjiào', 'dormir', '😴'),
    e('w-hui4', '会', 'huì', 'saber (hacer algo)', '🎓'),
    e('w-neng2', '能', 'néng', 'poder', '💪'),
    e('w-zuo4-do', '做', 'zuò', 'hacer', '🛠️'),
    e('w-zuo4-sit', '坐', 'zuò', 'sentar(se)', '🪑', 'mismo sonido que 做'),
    e('w-ren-shi', '认识', 'rènshi', 'conocer', '🤝', 'la segunda sílaba va sin tono'),
    e('w-zi4', '字', 'zì', 'carácter (escrito)', '✒️'),
    e('w-dian-ying', '电影', 'diànyǐng', 'película', '🎬'),
    e('w-dian-shi', '电视', 'diànshì', 'televisión', '📺'),
    e('w-dian-nao', '电脑', 'diànnǎo', 'ordenador', '💻'),
    e('w-zhong-wen', '中文', 'zhōngwén', 'chino (idioma)', '🇨🇳'),
  ],
  lessons: [
    lesson(
      'm8-l1',
      'Verbos de acción',
      'vocab',
      [
        ...drill('w-lai2'),
        ...drill('w-kan4'),
        ...drill('w-xie3'),
        ...drill('w-du2'),
        ...drill('w-dian-shi'),
        ...drill('w-dian-ying'),
        noteStep('n-verbos'),
        build('我看电视。', 'wǒ kàn diànshì.', 'Veo la tele.'),
        build('他来我家。', 'tā lái wǒ jiā.', 'Él viene a mi casa.'),
      ],
      [
        grammar('n-verbos', 'Los verbos no se conjugan', [
          'Los verbos chinos NO se conjugan: no existe "voy / iba / fui / iré". La misma sílaba 去 (qù) sirve para hoy, ayer y el año que viene. El verbo no envejece, morador.',
          '¿De dónde sale el tiempo, entonces? Del contexto… o marcándolo con las palabras del Sector 7: 我今天去 = "hoy voy", 我明天去 = "mañana iré", 我昨天去 = "ayer fui". El reloj lo pone la frase, no el verbo.',
          '看 (kàn) funciona igual: 我看电视 = "veo la tele". Ayer fue "vi la tele" y mañana será "veré la tele"… con la misma forma. Memoria ahorrada para más vocabulario.',
        ], [
          ['我看电视。', 'wǒ kàn diànshì.', 'Veo la tele.'],
          ['昨天他来我家。', 'zuótiān tā lái wǒ jiā.', 'Ayer vino a mi casa.'],
          ['明天我来你家。', 'míngtiān wǒ lái nǐ jiā.', 'Mañana vengo a tu casa.'],
        ]),
      ],
    ),
    lesson(
      'm8-l2',
      'Saber y poder',
      'grammar',
      [
        ...drill('w-hui4'),
        ...drill('w-neng2'),
        ...drill('w-zuo4-do'),
        ...drill('w-shuo1'),
        ...drill('w-ting1'),
        ...drill('w-shui-jiao'),
        ...introLite('w-zhong-wen'),
        noteStep('n-hui-neng'),
        build('我会说中文。', 'wǒ huì shuō zhōngwén.', 'Sé hablar chino.'),
        build('我想睡觉。', 'wǒ xiǎng shuìjiào.', 'Quiero dormir.'),
      ],
      [
        grammar('n-hui-neng', '会 y 能: saber y poder', [
          '会 (huì) + verbo = SABER hacer algo, una habilidad APRENDIDA: 我会说中文 = "sé hablar chino". Vale para idiomas, cocinar, arreglar radios del refugio…',
          '能 (néng) = PODER: capacidad del momento o permiso: 我很累，不能工作 = "estoy muy cansado, no puedo trabajar". Hoy no puedo; mañana, a ver.',
          'Truco de bolsillo: 会 es lo que ya APRENDISTE (sabes nadar); 能 es lo que tu cuerpo —o el supervisor— te DEJA hacer ahora (puedes salir a explorar). 会 pregunta a la biblioteca; 能, al guardia.',
        ], [
          ['我会说中文。', 'wǒ huì shuō zhōngwén.', 'Sé hablar chino.'],
          ['我很累，不能工作。', 'wǒ hěn lèi, bù néng gōngzuò.', 'Estoy muy cansado, no puedo trabajar.'],
          ['你能说中文吗？', 'nǐ néng shuō zhōngwén ma?', '¿Puedes hablar chino? (ahora mismo)'],
        ]),
      ],
    ),
    lesson(
      'm8-l3',
      'La rutina del refugio',
      'vocab',
      [
        ...drill('w-xue-xi'),
        ...drill('w-gong-zuo'),
        ...drill('w-zuo4-sit'),
        ...drill('w-ren-shi'),
        ...drill('w-zi4'),
        ...drill('w-dian-nao'),
        noteStep('n-zai-verb'),
        build('我在学习。', 'wǒ zài xuéxí.', 'Estoy estudiando.'),
        build('我认识这个字。', 'wǒ rènshi zhè ge zì.', 'Reconozco este carácter.'),
        build('我们看电影。', 'wǒmen kàn diànyǐng.', 'Vemos una película.'),
      ],
      [
        grammar('n-zai-verb', '在 + verbo: acción en curso', [
          'En el Sector 5 usaste 在 + LUGAR = "estar en": 我在学校 = "estoy en la escuela". Esa 在 señala DÓNDE estás.',
          'Pero 在 delante de un VERBO marca la acción EN CURSO: 我在学习 = "estoy estudiando", ahora mismo. Es el equivalente del "estoy + -ando" español, sin tocar la forma del verbo.',
          'El contexto decide: si detrás de 在 viene un sitio, es ubicación; si viene un verbo, es acción. 我在学校 = "estoy en la escuela"; 我在学习 = "estoy estudiando". Una sílaba, dos trabajos.',
          'De propina: 认识 (rènshi) = "conocer" — a personas y a caracteres: 我认识这个字 = "reconozco este carácter". Cada 字 que entra en tu red es uno más que el refugio guarda.',
        ], [
          ['我在学习。', 'wǒ zài xuéxí.', 'Estoy estudiando.'],
          ['他在看电视。', 'tā zài kàn diànshì.', 'Está viendo la tele.'],
          ['我们在工作。', 'wǒmen zài gōngzuò.', 'Estamos trabajando.'],
        ]),
      ],
    ),
    lesson(
      'm8-l4',
      'Auditoría del Sector 8',
      'review',
      [
        match('w-kan4', 'w-ting1', 'w-shuo1', 'w-xie3'),
        match('w-dian-ying', 'w-dian-shi', 'w-dian-nao', 'w-zhong-wen'),
        { type: 'listen', entry: 'w-hui4' },
        { type: 'listen', entry: 'w-neng2' },
        dictate('w-gong-zuo'),
        dictate('w-shui-jiao'),
        typeP('w-xue-xi'),
        build('我会说中文。', 'wǒ huì shuō zhōngwén.', 'Sé hablar chino.'),
        build('请坐。', 'qǐng zuò.', 'Siéntate, por favor.'),
      ],
    ),
  ],
}
