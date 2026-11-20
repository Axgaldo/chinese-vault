/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 21 · HSK 2 — OPINIONES DEL OVERSEER (módulo 9/15)

   El sector del pensamiento: 因为...所以... como paréntesis de la lógica,
   还是 para menús cerrados, el laboratorio de extremos (太...了, 真, 最,
   越来越) y la sugerencia suave de 吧.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m19: VaultModule = {
  id: 'm19',
  hsk: 2,
  code: 'S-21',
  title: 'Opiniones del Overseer',
  subtitle: 'Porque, pero, o...: conectores para pensar en chino',
  entries: [
    e('w-yin-wei', '因为', 'yīnwèi', 'porque', '🤔'),
    e('w-suo-yi', '所以', 'suǒyǐ', 'por eso', '∴'),
    e('w-dan-shi', '但是', 'dànshì', 'pero', '🔀'),
    e('w-hai-shi', '还是', 'háishì', 'o (¿cuál?)', '🤷'),
    e('w-tai4', '太', 'tài', 'demasiado', '‼️'),
    e('w-zhen1', '真', 'zhēn', 'de verdad, muy', '✨'),
    e('w-zui4', '最', 'zuì', 'el más', '👑'),
    e('w-te-bie', '特别', 'tèbié', 'especialmente', '🎯'),
    e('w-yi-qi', '一起', 'yìqǐ', 'juntos', '👥'),
    e('w-ba5', '吧', 'ba', 'partícula de sugerencia', '🗣️', 'se escribe sin tono'),
    e('w-ka-fei', '咖啡', 'kāfēi', 'café', '☕'),
    e('w-yue-lai-yue', '越来越', 'yuèláiyuè', 'cada vez más', '📈'),
  ],
  lessons: [
    lesson(
      'm19-l1',
      'Causa y consecuencia',
      'vocab',
      [
        ...drill('w-yin-wei'),
        ...drill('w-suo-yi'),
        ...drill('w-dan-shi'),
        noteStep('n-yinwei-suoyi'),
        build('因为今天很忙，所以我不喝茶。', 'yīnwèi jīntiān hěn máng, suǒyǐ wǒ bù hē chá.', 'Como hoy estoy muy ocupado, no tomo té.'),
        build('我想去公园，但是我很累。', 'wǒ xiǎng qù gōngyuán, dànshì wǒ hěn lèi.', 'Quiero ir al parque, pero estoy muy cansado.'),
      ],
      [
        grammar('n-yinwei-suoyi', '因为...所以...: la lógica entre paréntesis', [
          'El español dice la causa con UNA palabra colgada al final: "no tomo té PORQUE estoy ocupado". El chino abre y cierra la lógica con DOS: 因为 (yīnwèi) marca la causa, 所以 (suǒyǐ) marca la consecuencia. 因为今天很忙，所以我不喝茶. Son los paréntesis del razonamiento: la chispa entra, el fuego sale.',
          'El error número uno: invertir el molde → ✗所以今天很忙，因为我不喝茶. La consecuencia NUNCA abre la frase: 因为 enciende, 所以 responde. Causa y efecto siguen el orden del tiempo: primero la chispa, después el fuego.',
          'En el habla casual puedes soltar cualquiera de las dos mitades: 因为今天很忙，我不喝茶 o 今天很忙，所以我不喝茶. Pero la forma completa es la estándar y la que firma el Overseer en sus informes: en chino formal, los paréntesis se cierran.',
          'El contraataque es 但是 (dànshì, "pero"): entra cuando la realidad no obedece al plan — 我想喝茶，但是没有茶 ("quería té, pero no hay"). 因为...所以 conecta causa y efecto; 但是 conecta deseo y obstáculo. Tres conectores, tres engranajes distintos.',
          'Tip del Overseer: construye primero el par completo 因为...所以... y luego decide qué mitad soltar. Los razonamientos completos se auditan mejor que los recortados.',
        ], [
          ['因为今天很忙，所以我不喝茶。', 'yīnwèi jīntiān hěn máng, suǒyǐ wǒ bù hē chá.', 'Como hoy estoy muy ocupado, no tomo té.'],
          ['我想去公园，但是我很累。', 'wǒ xiǎng qù gōngyuán, dànshì wǒ hěn lèi.', 'Quiero ir al parque, pero estoy muy cansado.'],
          ['因为他忙，所以我帮助他。', 'yīnwèi tā máng, suǒyǐ wǒ bāngzhù tā.', 'Como está ocupado, lo ayudo.'],
        ]),
      ],
    ),
    lesson(
      'm19-l2',
      '¿Te parece?',
      'vocab',
      [
        ...drill('w-hai-shi'),
        ...drill('w-tai4'),
        ...drill('w-zhen1'),
        ...drill('w-zui4'),
        ...drill('w-te-bie'),
        ...drill('w-ka-fei'),
        noteStep('n-haishi'),
        build('咖啡还是茶？', 'kāfēi háishì chá?', '¿Café o té?'),
        build('今天太热了！', 'jīntiān tài rè le!', '¡Hoy hace demasiado calor!'),
      ],
      [
        grammar('n-haishi', '还是: la "o" que solo pregunta', [
          '还是 (háishì) es la "o" de las preguntas de elección cerrada: presentas un menú y obligas a elegir — 咖啡还是茶？ = "¿café o té?". Quien responde escoge UNA casilla del menú, no las dos: 茶，谢谢.',
          'La señal para no fallar: si puedes insertar "¿cuál?" en la frase → 还是. ¿Quieres tomar té o café? → 你想喝茶还是咖啡？ Si la frase NO espera respuesta, 还是 no es tu palabra: en frases afirmativas normales el "o" va por otro camino — lo verás a su tiempo. Usar 还是 en una frase normal suena a pregunta cuando no lo es: ✗我喝茶还是咖啡 (te oirán responder).',
          'El menú puede crecer con verbos completos: 你去还是我去？ = "¿vas tú o voy yo?". Es la frase del que delega la misión, y en el refugio funciona igual que en la superficie.',
          'Tip del Overseer: 还是 convierte cualquier lista en un menú. Si tu frase no espera respuesta, no es tu "o".',
        ], [
          ['咖啡还是茶？', 'kāfēi háishì chá?', '¿Café o té?'],
          ['你想喝茶还是咖啡？', 'nǐ xiǎng hē chá háishì kāfēi?', '¿Quieres tomar té o café?'],
          ['你去还是我去？', 'nǐ qù háishì wǒ qù?', '¿Vas tú o voy yo?'],
        ]),
      ],
    ),
    lesson(
      'm19-l3',
      'Matices del ánimo',
      'vocab',
      [
        ...drill('w-yi-qi'),
        ...drill('w-ba5'),
        ...drill('w-yue-lai-yue'),
        noteStep('n-tai-le'),
        build('太好了！我们一起去吧！', 'tài hǎo le! wǒmen yìqǐ qù ba!', '¡Genial! ¡Vamos juntos!'),
        build('中文越来越有意思。', 'zhōngwén yuèláiyuè yǒu yìsi.', 'El chino es cada vez más interesante.'),
      ],
      [
        grammar('n-tai-le', '太...了, 真, 最 y 越来越: el laboratorio de extremos', [
          '太 + adjetivo + 了 es la exclamación de exceso — y es TONO-CIEGA: la misma forma sirve para celebrar o quejarse. 太好了！ = "¡qué bien!" (sorpresa positiva); 今天太热了 = "hace demasiado calor" (queja). El molde dice "demasiado"; la cara del que habla decide si es drama o fiesta.',
          '真 (zhēn) es el "de verdad" neutro-positivo: 真漂亮！ = "¡qué bonita de verdad!". Sube el volumen sin torcer la nariz. 特别 (tèbié) apunta con lupa a UN solo blanco: 特别好 = "especialmente bueno" — no enciende toda la casa, solo la bombilla que nombra.',
          '最 (zuì) es el superlativo exclusivo: 我最喜欢咖啡 = "lo que MÁS me gusta es el café". Solo hay un número uno — 最 no admite compañía en la cima del podio.',
          'Y la joya del sector: 越来越 (yuèláiyuè) es una PENDIENTE. 中文越来越有意思 = "el chino es cada vez más interesante". No compara dos cosas: trepa por el tiempo. El adjetivo no se intensifica una vez, sino continuamente — la subida está construida dentro de la gramática.',
          'Tip del Overseer: ¿exclamación puntual? 太...了. ¿Intensidad honesta? 真. ¿Ranking? 最. ¿Evolución? 越来越. Cuatro llaves para la misma puerta: el grado.',
        ], [
          ['太好了！我们一起去吧！', 'tài hǎo le! wǒmen yìqǐ qù ba!', '¡Genial! ¡Vamos juntos!'],
          ['中文越来越有意思。', 'zhōngwén yuèláiyuè yǒu yìsi.', 'El chino es cada vez más interesante.'],
          ['我最喜欢咖啡。', 'wǒ zuì xǐhuan kāfēi.', 'Lo que más me gusta es el café.'],
        ]),
      ],
    ),
    lesson(
      'm19-l4',
      'Auditoría del Sector 21',
      'review',
      [
        match('w-yin-wei', 'w-suo-yi', 'w-dan-shi', 'w-hai-shi'),
        match('w-tai4', 'w-zhen1', 'w-zui4', 'w-te-bie'),
        { type: 'listen', entry: 'w-yi-qi' },
        { type: 'listen', entry: 'w-te-bie' },
        dictate('w-yin-wei'),
        dictate('w-yue-lai-yue'),
        typeP('w-hai-shi'),
        build('因为今天很忙，所以我不喝茶。', 'yīnwèi jīntiān hěn máng, suǒyǐ wǒ bù hē chá.', 'Como hoy estoy muy ocupado, no tomo té.'),
        build('太好了！我们一起去吧！', 'tài hǎo le! wǒmen yìqǐ qù ba!', '¡Genial! ¡Vamos juntos!'),
        ...practice('w-ba5'),
        ...practice('w-ka-fei'),
      ],
    ),
  ],
}
