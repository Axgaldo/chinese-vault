/* ─────────────────────────────────────────────────────────────────────────────
   SECTOR 36 · HSK 3 — NÚMEROS GRANDES Y EL VESTIDOR (módulo 9/10)

   El salto del contador grande (万: China agrupa los ceros de cuatro en
   cuatro), los clasificadores finos (条, 双, 位, 辆, 口, 种, 段, 刻) y el
   vestidor completo (裙子, 裤子, 衬衫, 鞋…) con sus colores (黄, 蓝, 绿).
   Cierra con el erhua de 一会儿.
   ───────────────────────────────────────────────────────────────────────────── */

import type { VaultModule } from '../../types/content'
import { build, dictate, drill, e, grammar, lesson, match, noteStep, practice, typeP } from '../builders'

export const m29: VaultModule = {
  id: 'm29',
  hsk: 3,
  code: 'S-36',
  title: 'Números grandes y el vestidor',
  subtitle: 'Miles, clasificadores y colores: contar y vestirse con precisión',
  entries: [
    e('w-wan4', '万', 'wàn', 'diez mil (10.000)', '🔢', 'el número grande chino: 三万 = 30.000'),
    e('w-shuang1', '双', 'shuāng', 'par (clasificador: zapatos, ojos, manos)', '👟', 'la unidad natural de pares'),
    e('w-wei4-cl', '位', 'wèi', 'clasificador cortés para personas', '🤵', 'dos personas = 两位 (cortés) o 两个人 (neutro)'),
    e('w-liang4', '辆', 'liàng', 'clasificador: vehículos', '🚗', '三辆车'),
    e('w-tiao2', '条', 'tiáo', 'clasificador: cosas largas y estrechas', '📏', 'pantalones, ríos, peces, carreteras'),
    e('w-kou3', '口', 'kǒu', 'boca; clasificador: miembros de familia', '👄', '一家三口 = familia de tres'),
    e('w-ke4', '刻', 'kè', 'cuarto (de hora)', '🕓', '三点一刻 = las tres y cuarto'),
    e('w-duan4', '段', 'duàn', 'tramo, párrafo, período', '🧱', '一段时间'),
    e('w-zhong3', '种', 'zhǒng', 'tipo, clase (clasificador)', '🗂️', '这种 = este tipo'),
    e('w-yi-gong', '一共', 'yígòng', 'en total', '🧮'),
    e('w-yi-ding', '一定', 'yídìng', 'seguro, sin falta', '🔒', 'la certeza del que promete'),
    e('w-yi-hui-r', '一会儿', 'yíhuìr', 'un momento, un ratito', '⏱️', 'ERHUA: 儿 pegado — 3 caracteres, 3 sílabas yí-huì-r'),
    e('w-yi-yang', '一样', 'yíyàng', 'igual, el mismo', '🟰', 'A跟B一样 = A es como B'),
    e('w-yi-ban', '一般', 'yìbān', 'normal, corriente; en general', '😐'),
    e('w-xiang-tong', '相同', 'xiāngtóng', 'idéntico', '♊'),
    e('w-qun-zi', '裙子', 'qúnzi', 'falda', '👗'),
    e('w-ku-zi', '裤子', 'kùzi', 'pantalones', '👖'),
    e('w-chen-shan', '衬衫', 'chènshān', 'camisa', '👔'),
    e('w-xie2', '鞋', 'xié', 'zapato', '👟'),
    e('w-mao-zi', '帽子', 'màozi', 'sombrero, gorra', '👒'),
    e('w-bao1', '包', 'bāo', 'bolsa, bolso, mochila', '👜'),
    e('w-huan4', '换', 'huàn', 'cambiar, cambiarse', '🔄', '换衣服 = cambiarse de ropa'),
    e('w-huang2', '黄', 'huáng', 'amarillo', '🟡'),
    e('w-lan2', '蓝', 'lán', 'azul', '🔵'),
    e('w-lv4', '绿', 'lǜ', 'verde', '🟢'),
  ],
  lessons: [
    lesson(
      'm29-l1',
      'Contar grande',
      'vocab',
      [
        ...drill('w-wan4'),
        ...drill('w-yi-gong'),
        ...drill('w-yi-ding'),
        ...drill('w-yi-yang'),
        ...drill('w-yi-ban'),
        ...drill('w-xiang-tong'),
        ...drill('w-liang4'),
        noteStep('n-wan-yigong'),
        build('衣服和裤子一共三百元。', 'yīfu hé kùzi yígòng sānbǎi yuán.', 'La ropa y los pantalones son trescientos yuanes en total.'),
      ],
      [
        grammar('n-wan-yigong', '万: el contador grande (agrupar de cuatro en cuatro)', [
          'Aquí vive el salto mental del número chino: el español agrupa los ceros de TRES en tres (mil, millón); el chino los agrupa de CUATRO en cuatro. La bisagra es 万 (wàn): 一万 no es mil — son DIEZ MIL (10.000). Y la escalera sigue: 十万 = cien mil (100.000), 三万五 = treinta y cinco mil (35.000). Cuando oigas 万, multiplica por diez mil: el error clásico del morador es pagar mil lo que cuesta diez mil.',
          'La fórmula de la igualdad es A 和 B 一样: 我的鞋和你的一样 = "mis zapatos son como los tuyos". 一样 (yíyàng) compara; 相同 (xiāngtóng) es su gemela formal — "idéntico", la palabra de los informes. Y para lo corriente sin más: 一般 (yìbān) — "normal, nada del otro mundo", y también "en general". ✗一般 = 一样 no son lo mismo: una dice "igual", la otra dice "normal".',
          '一共 (yígòng) es el totalizador: cierra la cuenta y lo suma todo — 衣服和裤子一共三百元 = "la ropa y los pantalones, trescientos yuanes EN TOTAL" (三百 y 元 vienen del S-23). Llega al final, como la cuenta del almacén. Y 一定 (yídìng) es la certeza del que promete: 你一定要来 = "tienes que venir SIN FALTA". Con 一定 no hay quizás.',
          'El clasificador del sector motor: 辆 (liàng) cuenta VEHÍCULOS — 一辆车 = "un coche". El molde del S-03 sigue en pie (número + clasificador + nombre); solo cambia el garaje. ✗一个车 suena a novato · ✓一辆车 suena a morador de superficie.',
          'Tip del Overseer: para cifras grandes, reza la tabla — 个 → 十 → 百 (S-23) → 千 (S-23) → 万. Cinco peldaños y el refugio entero cabe en la contabilidad. Cuando el número pase de cuatro ceros, el 万 te está esperando.',
        ], [
          ['一辆车三万元。', 'yí liàng chē sān wàn yuán.', 'Un coche cuesta treinta mil yuanes. (车 chē = vehículo)'],
          ['我的鞋和你的一样。', 'wǒ de xié hé nǐ de yíyàng.', 'Mis zapatos son como los tuyos.'],
          ['你一定要来。', 'nǐ yídìng yào lái.', 'Tienes que venir sin falta.'],
        ]),
      ],
    ),
    lesson(
      'm29-l2',
      'El vestidor',
      'grammar',
      [
        ...drill('w-qun-zi'),
        ...drill('w-ku-zi'),
        ...drill('w-chen-shan'),
        ...drill('w-xie2'),
        ...drill('w-mao-zi'),
        ...drill('w-bao1'),
        ...drill('w-huan4'),
        ...drill('w-tiao2'),
        ...drill('w-shuang1'),
        noteStep('n-tiao-shuang'),
        build('我买了一条裙子。', 'wǒ mǎi le yì tiáo qúnzi.', 'He comprado una falda.'),
        build('这双鞋很新。', 'zhè shuāng xié hěn xīn.', 'Estos zapatos son nuevos.'),
      ],
      [
        grammar('n-tiao-shuang', '条, 双 y 件: los clasificadores del vestidor', [
          'El vestidor chino no cuenta con 个: cada prenda tiene su clasificador natural. 条 (tiáo) viste lo LARGO Y ESTRECHO: 裤子 (pantalones), 裙子 (falda) — y también ríos (河, S-30) y carreteras. 双 (shuāng) cuenta PARES: zapatos, calcetines, ojos, manos — todo lo que viaja de dos en dos. Y 件 (jiàn, S-23) sigue vistiendo la ropa y las camisas: 一件衬衫.',
          'El molde no cambia desde el S-03: NÚMERO + CLASIFICADOR + NOMBRE — 一条裙子 (una falda), 一双鞋 (un par de zapatos), 一件衬衫 (una camisa). El clasificador es el anzuelo entre la cifra y la cosa: sin él, el número no muerde.',
          '换 (huàn) es CAMBIAR una cosa por otra: 换衣服 = cambiarse de ropa, 换鞋 = cambiarse de zapatos. No es transformar: es SUSTITUIR — la prenda vieja sale, la nueva entra. Y el equipaje del sector: 包 (bāo) reúne bolsa, bolso y mochila — el contenedor blando de toda la superficie — y 帽子 (màozi) remata el uniforme por arriba.',
          'Los colores llegan en la próxima lección, pero apunta ya su POSICIÓN: como todo adjetivo (S-17), van DELANTE de su nombre — 黄的帽子, "la gorra amarilla". ✗帽子黄 como frase suelta no identifica nada; para decir de qué color es algo, el molde de siempre: 帽子是黄色的.',
          'Tip del Overseer: antes de contar una prenda, mírala — ¿larga y estrecha? 条. ¿Van en pareja? 双. ¿Es ropa de vestir? 件. Tres preguntas y el vestidor entero queda inventariado, morador.',
        ], [
          ['我买了一条裙子。', 'wǒ mǎi le yì tiáo qúnzi.', 'He comprado una falda.'],
          ['这双鞋很新。', 'zhè shuāng xié hěn xīn.', 'Estos zapatos son nuevos. (新 xīn = nuevo, S-17)'],
          ['我想换衣服。', 'wǒ xiǎng huàn yīfu.', 'Quiero cambiarme de ropa.'],
        ]),
      ],
    ),
    lesson(
      'm29-l3',
      'Los colores',
      'vocab',
      [
        ...drill('w-huang2'),
        ...drill('w-lan2'),
        ...drill('w-lv4'),
        noteStep('n-yan-se'),
        build('她穿绿色的裙子。', 'tā chuān lǜsè de qúnzi.', 'Lleva una falda verde. (色 sè = color, S-17)'),
        build('蓝衬衫是我的。', 'lán chènshān shì wǒ de.', 'La camisa azul es mía.'),
      ],
      [
        grammar('n-yan-se', '黄, 蓝 y 绿: los colores trabajan como adjetivos', [
          'El S-17 te dejó la promesa: dominado el molde [raíz] + 色 (sè, "color"), los colores nuevos caían solos. Llegan los tres del semáforo: 黄色 (huángsè, amarillo), 蓝色 (lánsè, azul), 绿色 (lǜsè, verde). La raíz suelta — 黄, 蓝, 绿 — también nombra el color pelado; el 色 le pone el rango oficial de "color".',
          'Y como adjetivos que son, van DELANTE del nombre, con 的 dando aire: 绿色的裙子 = "la falda verde". El 的 puede omitirse cuando la prisa manda (绿裙子), pero con nombres de dos sílabas el molde con 的 fluye mejor: 蓝色的衬衫, 黄色的帽子.',
          'La pregunta que abre el vestidor: 你喜欢什么颜色？ = "¿qué color te gusta?" — 颜色 (yánsè) es la palabra paraguas del color (S-17). Y para IDENTIFICAR, no solo describir, el molde 是…的 de siempre: 我的衬衫是蓝色的 = "mi camisa ES azul" — no la describe: la archiva en la caja de las azules.',
          'Contraste de bolsillo: ✗裙子绿色 — el color suelto detrás no pinta nada · ✓裙子是绿色的 — identificada. Y ojo con 绿: la ü del pinyin (lǜ) es la sílaba más cerrada del vestidor — cuarta caída con los labios redondeados.',
          'Tip del Overseer: para vestirte en chino, piensa en orden — COLOR + 的 + PRENDA, y el clasificador al contar: 一条绿色的裙子. El color nunca se coloca detrás, morador. La moda del refugio manda.',
        ], [
          ['她穿绿色的裙子。', 'tā chuān lǜsè de qúnzi.', 'Lleva una falda verde. (色 sè = color, S-17 · 穿 chuān = llevar puesto, S-24)'],
          ['我喜欢黄帽子。', 'wǒ xǐhuan huáng màozi.', 'Me gusta el sombrero amarillo. (color pelado + nombre, sin 的)'],
          ['你喜欢什么颜色？', 'nǐ xǐhuan shénme yánsè?', '¿Qué color te gusta?'],
        ]),
      ],
    ),
    lesson(
      'm29-l4',
      'Cortesía y tipos',
      'vocab',
      [
        ...drill('w-wei4-cl'),
        ...drill('w-zhong3'),
        ...drill('w-kou3'),
        ...drill('w-ke4'),
        ...drill('w-duan4'),
        ...drill('w-yi-hui-r'),
        noteStep('n-wei-kou'),
        build('两位老师，请喝茶。', 'liǎng wèi lǎoshī, qǐng hē chá.', 'Dos profesores, tomen té, por favor.'),
        build('请等一会儿。', 'qǐng děng yíhuìr.', 'Espera un momentito, por favor.'),
      ],
      [
        grammar('n-wei-kou', '位, 口 y 种: los clasificadores con trato', [
          '位 (wèi) es el clasificador CORTÉS para personas: 两位老师 = "dos profesores" dichos con respeto. La versión neutra es 两个人 (S-02); con 位, el morador se quita el casco. Camareros, profesores, invitados: toda persona que merece el saludo sube a 位.',
          '口 (kǒu) nació "boca" y acabó contando la FAMILIA: las bocas que hay que alimentar. 我家有三口人 = "en mi casa somos tres"; 一家三口 = "una familia de tres". Es el censo más antiguo del refugio: se cuenta por hambres, no por personas.',
          '种 (zhǒng) cuenta TIPOS: 这种 = "este tipo" — 这种人 ("este tipo de persona"), 这种话 ("este tipo de palabras"). Es el clasificador de las categorías: cuando clasificas el mundo, no cuentas ejemplares, cuentas clases.',
          '刻 (kè) es el cuarto de hora: 三点一刻 = "las tres y cuarto" (点, S-07) — y con el 差 (chà, S-34) de la resta: 差一刻三点 = "un cuarto para las tres". 段 (duàn) mide TRAMOS: un tramo de carretera, un párrafo, un período — 一段时间, "un tiempo". Y 一会儿 (yíhuìr) es el ratito del erhua: 儿 pegada, TRES caracteres para TRES sílabas (yí-huì-r) — 等一会儿, "espera un momentito".',
          'Tip del Overseer: 位 respeta, 口 censan, 种 clasifica, 刻 parte la hora y 段 mide tramos. Cinco clasificadores de trato fino: con ellos dejas de contar como novato y empiezas a contar como jefe de caravana.',
        ], [
          ['两位老师，请喝茶。', 'liǎng wèi lǎoshī, qǐng hē chá.', 'Dos profesores, tomen té, por favor.'],
          ['我家有三口人。', 'wǒ jiā yǒu sān kǒu rén.', 'En mi casa somos tres. (se cuenta por bocas)'],
          ['三点一刻。', 'sān diǎn yí kè.', 'Las tres y cuarto.'],
        ]),
      ],
    ),
    lesson(
      'm29-l5',
      'Auditoría del Sector 36',
      'review',
      [
        match('w-wan4', 'w-qun-zi', 'w-huan4', 'w-yi-gong'),
        match('w-ku-zi', 'w-chen-shan', 'w-xie2', 'w-mao-zi', 'w-bao1'),
        match('w-tiao2', 'w-shuang1', 'w-liang4', 'w-wei4-cl', 'w-zhong3'),
        match('w-huang2', 'w-lan2', 'w-lv4', 'w-yi-yang', 'w-xiang-tong'),
        { type: 'listen', entry: 'w-yi-yang' },
        { type: 'listen', entry: 'w-yi-hui-r' },
        dictate('w-chen-shan'),
        dictate('w-shuang1'),
        typeP('w-yi-hui-r'),
        build('我买了一条裙子。', 'wǒ mǎi le yì tiáo qúnzi.', 'He comprado una falda.'),
        build('请等一会儿。', 'qǐng děng yíhuìr.', 'Espera un momentito, por favor.'),
        ...practice('w-yi-ding'),
        ...practice('w-yi-ban'),
        ...practice('w-kou3'),
        ...practice('w-ke4'),
        ...practice('w-duan4'),
      ],
    ),
  ],
}
