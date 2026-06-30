// 引诗为名 · 姓氏声调表 + 智能荐名算法

import type { NameCard, Surname, Gender } from "./types";
import { NAME_CARDS } from "./poetry-data";

// 常见姓氏声调表（部分）
export const SURNAMES: Surname[] = [
  { surname: "李", pinyin: "lǐ", tone: 3, rarity: "common" },
  { surname: "王", pinyin: "wáng", tone: 2, rarity: "common" },
  { surname: "张", pinyin: "zhāng", tone: 1, rarity: "common" },
  { surname: "刘", pinyin: "liú", tone: 2, rarity: "common" },
  { surname: "陈", pinyin: "chén", tone: 2, rarity: "common" },
  { surname: "杨", pinyin: "yáng", tone: 2, rarity: "common" },
  { surname: "黄", pinyin: "huáng", tone: 2, rarity: "common" },
  { surname: "赵", pinyin: "zhào", tone: 4, rarity: "common" },
  { surname: "周", pinyin: "zhōu", tone: 1, rarity: "common" },
  { surname: "吴", pinyin: "wú", tone: 2, rarity: "common" },
  { surname: "徐", pinyin: "xú", tone: 2, rarity: "common" },
  { surname: "孙", pinyin: "sūn", tone: 1, rarity: "common" },
  { surname: "胡", pinyin: "hú", tone: 2, rarity: "common" },
  { surname: "朱", pinyin: "zhū", tone: 1, rarity: "common" },
  { surname: "高", pinyin: "gāo", tone: 1, rarity: "common" },
  { surname: "林", pinyin: "lín", tone: 2, rarity: "common" },
  { surname: "何", pinyin: "hé", tone: 2, rarity: "common" },
  { surname: "郭", pinyin: "guō", tone: 1, rarity: "common" },
  { surname: "马", pinyin: "mǎ", tone: 3, rarity: "common" },
  { surname: "罗", pinyin: "luó", tone: 2, rarity: "common" },
  { surname: "梁", pinyin: "liáng", tone: 2, rarity: "common" },
  { surname: "宋", pinyin: "sòng", tone: 4, rarity: "common" },
  { surname: "郑", pinyin: "zhèng", tone: 4, rarity: "common" },
  { surname: "谢", pinyin: "xiè", tone: 4, rarity: "common" },
  { surname: "韩", pinyin: "hán", tone: 2, rarity: "common" },
  { surname: "唐", pinyin: "táng", tone: 2, rarity: "common" },
  { surname: "冯", pinyin: "féng", tone: 2, rarity: "common" },
  { surname: "于", pinyin: "yú", tone: 2, rarity: "common" },
  { surname: "董", pinyin: "dǒng", tone: 3, rarity: "common" },
  { surname: "萧", pinyin: "xiāo", tone: 1, rarity: "uncommon" },
  { surname: "程", pinyin: "chéng", tone: 2, rarity: "common" },
  { surname: "曹", pinyin: "cáo", tone: 2, rarity: "common" },
  { surname: "袁", pinyin: "yuán", tone: 2, rarity: "common" },
  { surname: "邓", pinyin: "dèng", tone: 4, rarity: "common" },
  { surname: "许", pinyin: "xǔ", tone: 3, rarity: "common" },
  { surname: "傅", pinyin: "fù", tone: 4, rarity: "common" },
  { surname: "沈", pinyin: "shěn", tone: 3, rarity: "common" },
  { surname: "曾", pinyin: "zēng", tone: 1, rarity: "common" },
  { surname: "彭", pinyin: "péng", tone: 2, rarity: "common" },
  { surname: "吕", pinyin: "lǚ", tone: 3, rarity: "common" },
  { surname: "苏", pinyin: "sū", tone: 1, rarity: "common" },
  { surname: "卢", pinyin: "lú", tone: 2, rarity: "common" },
  { surname: "蒋", pinyin: "jiǎng", tone: 3, rarity: "common" },
  { surname: "蔡", pinyin: "cài", tone: 4, rarity: "common" },
  { surname: "贾", pinyin: "jiǎ", tone: 3, rarity: "common" },
  { surname: "丁", pinyin: "dīng", tone: 1, rarity: "common" },
  { surname: "魏", pinyin: "wèi", tone: 4, rarity: "common" },
  { surname: "薛", pinyin: "xuē", tone: 1, rarity: "common" },
  { surname: "叶", pinyin: "yè", tone: 4, rarity: "common" },
  { surname: "阎", pinyin: "yán", tone: 2, rarity: "uncommon" },
  { surname: "余", pinyin: "yú", tone: 2, rarity: "common" },
  { surname: "潘", pinyin: "pān", tone: 1, rarity: "common" },
  { surname: "杜", pinyin: "dù", tone: 4, rarity: "common" },
  { surname: "戴", pinyin: "dài", tone: 4, rarity: "common" },
  { surname: "夏", pinyin: "xià", tone: 4, rarity: "common" },
  { surname: "钟", pinyin: "zhōng", tone: 1, rarity: "common" },
  { surname: "汪", pinyin: "wāng", tone: 1, rarity: "common" },
  { surname: "田", pinyin: "tián", tone: 2, rarity: "common" },
  { surname: "任", pinyin: "rèn", tone: 4, rarity: "common" },
  { surname: "姜", pinyin: "jiāng", tone: 1, rarity: "common" },
  { surname: "范", pinyin: "fàn", tone: 4, rarity: "common" },
  { surname: "方", pinyin: "fāng", tone: 1, rarity: "common" },
  { surname: "石", pinyin: "shí", tone: 2, rarity: "common" },
  { surname: "姚", pinyin: "yáo", tone: 2, rarity: "common" },
  { surname: "谭", pinyin: "tán", tone: 2, rarity: "common" },
  { surname: "廖", pinyin: "liào", tone: 4, rarity: "common" },
  { surname: "邹", pinyin: "zōu", tone: 1, rarity: "common" },
  { surname: "熊", pinyin: "xióng", tone: 2, rarity: "common" },
  { surname: "金", pinyin: "jīn", tone: 1, rarity: "common" },
  { surname: "陆", pinyin: "lù", tone: 4, rarity: "common" },
  { surname: "郝", pinyin: "hǎo", tone: 3, rarity: "common" },
  { surname: "孔", pinyin: "kǒng", tone: 3, rarity: "common" },
  { surname: "白", pinyin: "bái", tone: 2, rarity: "common" },
  { surname: "崔", pinyin: "cuī", tone: 1, rarity: "common" },
  { surname: "康", pinyin: "kāng", tone: 1, rarity: "common" },
  { surname: "毛", pinyin: "máo", tone: 2, rarity: "common" },
  { surname: "邱", pinyin: "qiū", tone: 1, rarity: "common" },
  { surname: "秦", pinyin: "qín", tone: 2, rarity: "common" },
  { surname: "江", pinyin: "jiāng", tone: 1, rarity: "common" },
  { surname: "史", pinyin: "shǐ", tone: 3, rarity: "common" },
  { surname: "顾", pinyin: "gù", tone: 4, rarity: "common" },
  { surname: "侯", pinyin: "hóu", tone: 2, rarity: "common" },
  { surname: "邵", pinyin: "shào", tone: 4, rarity: "common" },
  { surname: "孟", pinyin: "mèng", tone: 4, rarity: "common" },
  { surname: "龙", pinyin: "lóng", tone: 2, rarity: "common" },
  { surname: "万", pinyin: "wàn", tone: 4, rarity: "common" },
  { surname: "段", pinyin: "duàn", tone: 4, rarity: "common" },
  { surname: "雷", pinyin: "léi", tone: 2, rarity: "common" },
  { surname: "钱", pinyin: "qián", tone: 2, rarity: "common" },
  { surname: "汤", pinyin: "tāng", tone: 1, rarity: "common" },
  { surname: "尹", pinyin: "yǐn", tone: 3, rarity: "common" },
  { surname: "黎", pinyin: "lí", tone: 2, rarity: "common" },
  { surname: "易", pinyin: "yì", tone: 4, rarity: "common" },
  { surname: "常", pinyin: "cháng", tone: 2, rarity: "common" },
  { surname: "武", pinyin: "wǔ", tone: 3, rarity: "common" },
  { surname: "乔", pinyin: "qiáo", tone: 2, rarity: "common" },
  { surname: "贺", pinyin: "hè", tone: 4, rarity: "common" },
  { surname: "赖", pinyin: "lài", tone: 4, rarity: "uncommon" },
  { surname: "龚", pinyin: "gōng", tone: 1, rarity: "common" },
  { surname: "文", pinyin: "wén", tone: 2, rarity: "common" },
  { surname: "欧阳", pinyin: "ōu yáng", tone: 1, rarity: "uncommon" },
  { surname: "上官", pinyin: "shàng guān", tone: 4, rarity: "rare" },
  { surname: "司马", pinyin: "sī mǎ", tone: 1, rarity: "rare" },
  { surname: "诸葛", pinyin: "zhū gě", tone: 1, rarity: "rare" },
  { surname: "慕容", pinyin: "mù róng", tone: 4, rarity: "rare" },
];

// 名字单字的简易声调推断（基于常见读音的近似映射）
// 注：多音字取最常见读音，仅供音律评估参考
const TONE_MAP: Record<string, 1 | 2 | 3 | 4> = {
  // 平声（1、2声）
  清: 1, 明: 2, 华: 2, 嘉: 1, 宁: 2, 安: 1, 文: 2, 思: 1, 如: 2, 然: 2,
  舒: 1, 飞: 1, 辉: 1, 妍: 2, 兰: 2, 芳: 1, 莲: 2, 霞: 2, 云: 2, 风: 1,
  山: 1, 泉: 2, 林: 2, 青: 1, 阳: 2, 春: 1, 秋: 1, 长: 2, 弘: 2, 瑜: 2,
  蓉: 2, 姝: 1, 娟: 1, 美: 3, 英: 1, 蓁: 1, 桢: 1, 邦: 1, 维: 2, 行: 2,
  鸿: 2, 鹏: 2, 扶: 2, 摇: 2, 乾: 2, 元: 2, 亨: 1, 含: 2, 章: 1, 谦: 1,
  协: 2, 和: 2, 惟: 2, 馨: 1, 渊: 1, 希: 1, 声: 1, 微: 1, 一: 1, 光: 1,
  尘: 2, 逍: 1, 遥: 2, 知: 1, 鱼: 2, 书: 1, 徽: 1, 音: 1, 柔: 2, 攸: 1,
  灼: 2, 洵: 2, 琼: 2, 烟: 1, 空: 1, 波: 1, 鸥: 1, 帆: 2, 方: 1, 晴: 2,
  钩: 1, 东: 1, 花: 1, 修: 1, 能: 2, 龙: 2, 灵: 2, 均: 1, 则: 2, 名: 2, 怀: 2,
  // 仄声（3、4声）
  玉: 4, 芷: 3, 若: 4, 瑾: 3, 彦: 4, 景: 3, 翰: 4, 凯: 3, 毓: 4, 骏: 4,
  俊: 4, 德: 2, 致: 4, 远: 3, 笃: 3, 毅: 4, 敏: 3, 慎: 4, 润: 4, 浩: 4,
  义: 4, 赤: 4, 善: 4, 抱: 4, 雅: 3, 大: 4, 静: 4, 穆: 4, 紫: 3, 碧: 4,
  锦: 3, 瑟: 4, 望: 4, 岳: 4, 露: 4, 影: 3, 浪: 4, 潋: 4, 滟: 4, 月: 4,
  信: 4, 杜: 4, 正: 4, 握: 4, 婉: 3, 独: 2, 集: 2, 诚: 2, 身: 1, 苍: 1,
  疏: 1, 香: 1, 宇: 3,
};

function guessTone(char: string): 1 | 2 | 3 | 4 | 0 {
  return TONE_MAP[char] ?? 0;
}

// 名字平仄：平=1/2声，仄=3/4声
type PingZe = "平" | "仄" | "?";

function charPingZe(char: string): PingZe {
  const t = guessTone(char);
  if (t === 1 || t === 2) return "平";
  if (t === 3 || t === 4) return "仄";
  return "?";
}

function namePingZe(name: string): PingZe[] {
  return name.split("").map(charPingZe);
}

// 姓氏平仄
function surnamePingZe(surname: Surname): PingZe {
  if (surname.tone === 1 || surname.tone === 2) return "平";
  return "仄";
}

// 音律评分：姓+名的平仄组合
// 理想组合：平仄相间，避免全平或全仄，朗朗上口
function scoreTone(surname: Surname, card: NameCard): number {
  const seq: PingZe[] = [
    surnamePingZe(surname),
    ...namePingZe(card.name),
  ];
  const valid = seq.filter((s) => s !== "?");
  if (valid.length < 2) return 60; // 未知音律，给中等分

  // 平仄相间加分
  let alternation = 0;
  for (let i = 1; i < valid.length; i++) {
    if (valid[i] !== valid[i - 1]) alternation += 1;
  }
  const maxAlt = valid.length - 1;
  const altRatio = alternation / maxAlt;

  // 全平或全仄扣分（太单调）
  const allSame = valid.every((s) => s === valid[0]);
  let score = 60 + altRatio * 35;
  if (allSame && valid.length >= 2) score -= 20;

  // 三字名最后一个字是平声，收音响亮（传统起名偏好）
  if (valid.length === 3 && valid[2] === "平") score += 8;

  return Math.max(40, Math.min(100, Math.round(score)));
}

// 寓意契合度：根据用户选择的偏好标签匹配
function scoreMeaning(card: NameCard, preferences?: string[]): number {
  if (!preferences || preferences.length === 0) return 75;
  const hits = card.tags.filter((t) => preferences.includes(t)).length;
  return Math.min(100, 70 + hits * 12);
}

// 性别匹配
function scoreGender(card: NameCard, gender: Gender | "all"): number {
  if (gender === "all") return 90;
  if (card.gender === gender) return 100;
  if (card.gender === "unisex") return 85;
  return 40; // 性别不符，低分
}

export interface ScoredName {
  card: NameCard;
  fullName: string;
  totalScore: number;
  toneScore: number;
  meaningScore: number;
  genderScore: number;
  pingze: string; // 如 "平仄平"
  reasons: string[];
}

export interface MatchInput {
  surname: string;
  gender: Gender | "all";
  preferences?: string[];
  count?: number;
}

// 综合荐名
export function recommendNames(input: MatchInput): ScoredName[] {
  const surname =
    SURNAMES.find((s) => s.surname === input.surname) ??
    ({ surname: input.surname, pinyin: "", tone: 1, rarity: "common" } as Surname);

  const count = input.count ?? 6;

  const scored: ScoredName[] = NAME_CARDS.map((card) => {
    const toneScore = scoreTone(surname, card);
    const meaningScore = scoreMeaning(card, input.preferences);
    const genderScore = scoreGender(card, input.gender);

    // 综合权重：寓意35% + 音律30% + 性别35%
    const total = Math.round(
      meaningScore * 0.35 + toneScore * 0.3 + genderScore * 0.35,
    );

    const pingzeArr = [
      surnamePingZe(surname),
      ...namePingZe(card.name),
    ];
    const pingze = pingzeArr.join("");

    const reasons: string[] = [];
    if (genderScore >= 100) reasons.push("性别契合");
    if (toneScore >= 80) reasons.push("音律和谐");
    else if (toneScore >= 70) reasons.push("声调上口");
    if (meaningScore >= 90) reasons.push("寓意高度契合");
    else if (meaningScore >= 80) reasons.push("寓意相合");
    reasons.push(`出自${card.source}`);

    return {
      card,
      fullName: `${surname.surname}${card.name}`,
      totalScore: total,
      toneScore,
      meaningScore,
      genderScore,
      pingze,
      reasons,
    };
  });

  // 排序 + 去重名字字符 + 多样性（同类别最多2个）
  scored.sort((a, b) => b.totalScore - a.totalScore);
  const result: ScoredName[] = [];
  const usedNames = new Set<string>();
  const catCount: Record<string, number> = {};

  for (const item of scored) {
    if (result.length >= count) break;
    if (usedNames.has(item.card.name)) continue;
    const cat = item.card.category;
    if ((catCount[cat] ?? 0) >= 2) continue; // 同类不超过2个，保证多样性
    usedNames.add(item.card.name);
    catCount[cat] = (catCount[cat] ?? 0) + 1;
    result.push(item);
  }

  return result;
}

// 抽签：随机一张（可按性别过滤）
export function drawOneCard(gender: Gender | "all" = "all"): NameCard {
  const pool =
    gender === "all"
      ? NAME_CARDS
      : NAME_CARDS.filter((c) => c.gender === gender || c.gender === "unisex");
  return pool[Math.floor(Math.random() * pool.length)];
}

// 抽签：随机多张不重复
export function drawCards(
  gender: Gender | "all" = "all",
  count = 1,
): NameCard[] {
  const pool =
    gender === "all"
      ? [...NAME_CARDS]
      : NAME_CARDS.filter(
          (c) => c.gender === gender || c.gender === "unisex",
        );
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}
