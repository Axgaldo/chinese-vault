/**
 * Verificador de reparto HSK3 — comprueba que cada palabra oficial HSK3 que
 * falta del curso HSK0-2 está asignada EXACTAMENTE una vez en los sectores
 * m24-m31 (S-31..S-38), y que ningún bucket mete palabras que no faltan.
 *
 * Uso: npx tsx scripts/check-hsk3-buckets.ts
 */

import { readFileSync } from 'node:fs'
import { allLessons, entriesById } from '../src/content'
import { DIALOGUES } from '../src/lib/dialogues'

interface HskWord {
  simplified: string
  forms: { transcriptions: { pinyin: string } }[]
}

/** Palabras ya cubiertas por m21-m23 (lanzadas) + cursadas */
const WAVE1: string[] = [
  // m21
  '把', '放', '搬', '关', '接', '刷', '打扫', '完成', '检查', '出现', '发现',
  '明白', '记得', '忘记', '洗澡', '洗手间',
  // m22
  '鼻子', '耳朵', '脸', '脚', '头发', '腿', '眼镜', '疼', '发烧', '感冒',
  '饿', '渴', '饱', '哭', '胖', '瘦', '矮', '舒服', '健康',
  // m23
  '春', '夏', '秋', '冬', '季节', '月亮', '太阳', '云', '河', '树', '草',
  '鸟', '动物', '熊猫', '爬山', '节日', '节目', '礼物', '祝', '举行',
  '参加', '比赛',
]

/** Reparto oleada 2: sector → palabras (pinyin CORREGIDO de polifónicos) */
const BUCKETS: Record<string, string[]> = {
  m24: [
    '城市', '地方', '地铁', '地图', '超市', '宾馆', '银行', '电梯', '楼', '层',
    '附近', '街道', '环境', '国家', '世界', '北方', '南', '厨房', '冰箱',
    '空调', '灯', '伞', '护照', '照相机', '行李箱', '小心', '角',
  ],
  m25: [
    '干净', '清楚', '认真', '努力', '简单', '容易', '难', '聪明', '地',
    '极', '多么', '比较', '满意', '方便', '新鲜', '奇怪', '热情', '坏',
    '低', '久', '更', '啊', '安静',
  ],
  m26: [
    '认为', '以为', '相信', '了解', '同意', '愿意', '决定', '解决', '选择',
    '需要', '要求', '注意', '表示', '讲', '敢', '关心', '照顾', '担心',
    '害怕', '生气', '着急', '难过', '帮忙', '别人', '其他', '放心',
  ],
  m27: [
    '办公室', '会议', '经理', '同事', '司机', '成绩', '年级', '复习', '作业',
    '黑板', '数学', '体育', '词语', '句子', '文化', '历史', '普通话',
    '提高', '水平', '差', '校长', '迟到', '被', '铅笔', '字典', '电子', '教',
  ],
  m28: [
    '虽然', '如果', '而且', '或者', '除了', '关于', '根据', '为了', '当然',
    '经常', '终于', '突然', '马上', '总是', '最近', '几乎', '其实', '只',
    '又', '必须', '应该', '一边', '主要',
  ],
  m29: [
    '万', '双', '位', '辆', '条', '口', '刻', '段', '种', '一共', '一定',
    '一会儿', '一样', '一般', '相同', '裙子', '裤子', '衬衫', '鞋', '帽子',
    '包', '换', '黄', '蓝', '绿',
  ],
  m30: [
    '果汁', '啤酒', '葡萄', '香蕉', '面包', '面条', '糖', '盘子', '碗',
    '筷子', '菜单', '客人', '奶奶', '爷爷', '叔叔', '年轻', '见面', '结婚',
    '习惯', '周末', '阿姨', '爱好',
  ],
  m31: [
    '办法', '机会', '关系', '作用', '影响', '兴趣', '故事', '变化', '遇到',
    '离开', '经过', '表演', '像', '跟', '使', '过去', '中间', '为什么',
    '可爱', '有名', '重要', '锻炼', '骑', '刮', '画', '自己',
  ],
}

function main() {
  const raw = JSON.parse(readFileSync('scripts/hsk-data/old-3.json', 'utf-8')) as HskWord[]
  const official = new Set(raw.map((w) => w.simplified))

  const assigned = new Map<string, string[]>()
  for (const [sector, words] of Object.entries(BUCKETS)) {
    for (const w of words) {
      const prev = assigned.get(w) ?? []
      prev.push(sector)
      assigned.set(w, prev)
    }
  }
  for (const w of WAVE1) {
    const prev = assigned.get(w) ?? []
    prev.push('wave1')
    assigned.set(w, prev)
  }

  // corpus actual (sin los módulos nuevos): recomputamos "faltantes" aquí
  // importando el contenido real
  // (se hace en dinámico para reutilizar el mismo cálculo que hsk-coverage)
  const problems: string[] = []

  const dup = [...assigned.entries()].filter(([, s]) => s.length > 1)
  for (const [w, s] of dup) problems.push(`DUPLICADO: ${w} en ${s.join('+')}`)

  for (const w of assigned.keys()) {
    if (!official.has(w)) problems.push(`NO OFICIAL HSK3: ${w}`)
  }

  console.log(`[buckets] ${Object.entries(BUCKETS).map(([s, w]) => `${s}:${w.length}`).join(' · ')}`)
  console.log(`[buckets] total oleada2 = ${Object.values(BUCKETS).flat().length}, oleada1 = ${WAVE1.length}`)
  if (problems.length) {
    console.log('\nPROBLEMAS:')
    for (const p of problems) console.log('  ' + p)
  } else {
    console.log('\n[buckets] sin duplicados y todo es HSK3 oficial ✓')
  }

  // faltantes reales = oficiales que NO están en el corpus actual
  let corpus = ''
  for (const e of entriesById.values()) corpus += e.hanzi
  for (const lesson of allLessons) {
    for (const step of lesson.steps) {
      if (step.type === 'build') corpus += step.sentence.hanzi
    }
    for (const note of lesson.notes) {
      for (const ex of note.examples) corpus += ex.hanzi
    }
  }
  for (const d of DIALOGUES) for (const l of d.lines) corpus += l.hanzi

  const missing = [...official].filter((w) => !corpus.includes(w))
  const notCovered = missing.filter((w) => !assigned.has(w))
  const wasted = [...assigned.keys()].filter((w) => corpus.includes(w))

  console.log(`\n[corpus] faltantes oficiales HSK3: ${missing.length}`)
  if (notCovered.length) {
    console.log(`SIN ASIGNAR Y FALTANTES (${notCovered.length}):`)
    for (const w of notCovered) console.log('  ' + w)
  } else {
    console.log('[corpus] todos los faltantes tienen bucket ✓')
  }
  if (wasted.length) {
    console.log(`ASIGNADOS PERO YA EN CURSO (${wasted.length}):`)
    for (const w of wasted) console.log('  ' + w)
  }
}

main()
