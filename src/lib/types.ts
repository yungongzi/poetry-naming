// 引诗为名 · 数据类型定义

export type Gender = "male" | "female" | "unisex";

export type PoetryCategory =
  | "shijing" // 诗经
  | "chuci" // 楚辞
  | "tangshi" // 唐诗
  | "songci" // 宋词
  | "sishu" // 四书（论学庸孟）
  | "daojing" // 道德经 / 庄子 / 易经
  | "dianji"; // 尚书 / 礼记 / 其他典籍

export interface CharGloss {
  char: string; // 单字
  meaning: string; // 字义
}

export interface NameCard {
  id: string;
  name: string; // 名字（不含姓），2-3 字
  chars: CharGloss[]; // 逐字释义
  category: PoetryCategory;
  source: string; // 出处全称，如《诗经·小雅·鹿鸣》
  dynasty: string; // 朝代 / 来源时期
  author: string; // 作者（佚名则为"佚名"）
  citation: string; // 引文：取名所据的诗句/原文
  originalText: string; // 原文上下文段落
  interpretation: string; // 释义：引文的现代白话解释
  meaning: string; // 寓意：作为名字的寄托
  gender: Gender;
  tags: string[]; // 气质标签
}

export interface Surname {
  surname: string; // 姓氏
  pinyin: string; // 拼音
  tone: 1 | 2 | 3 | 4; // 声调
  rarity: "common" | "uncommon" | "rare"; // 常见 / 较少 / 罕见
}

export const CATEGORY_META: Record<
  PoetryCategory,
  { label: string; full: string; desc: string }
> = {
  shijing: {
    label: "诗经",
    full: "《诗经》",
    desc: "三百零五篇，风雅颂之祖，最古之嘉名渊薮",
  },
  chuci: {
    label: "楚辞",
    full: "《楚辞》",
    desc: "屈宋骚赋，香草美人，浪漫瑰丽之境",
  },
  tangshi: {
    label: "唐诗",
    full: "唐诗",
    desc: "盛唐气象，气象万千，朗朗如日月",
  },
  songci: {
    label: "宋词",
    full: "宋词",
    desc: "婉约豪放，情致绵长，词中有画",
  },
  sishu: {
    label: "四书",
    full: "《论》《学》《庸》《孟》",
    desc: "圣贤之言，修身立命，经世致用",
  },
  daojing: {
    label: "道经",
    full: "《道德经》《庄子》《易经》",
    desc: "道法自然，逍遥齐物，幽微玄妙",
  },
  dianji: {
    label: "典籍",
    full: "《尚书》《礼记》等",
    desc: "先王政典，礼乐文章，华夏之根",
  },
};

export const GENDER_META: Record<Gender, { label: string }> = {
  male: { label: "男名" },
  female: { label: "女名" },
  unisex: { label: "通名" },
};
