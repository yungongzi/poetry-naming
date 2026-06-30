"use client";

import { ChevronDown, ScrollText } from "lucide-react";
import { TOTAL_COUNT } from "@/lib/poetry-data";
import { CATEGORY_META } from "@/lib/types";

interface HeroProps {
  onDraw: () => void;
  onBrowse: () => void;
}

export default function Hero({ onDraw, onBrowse }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
    >
      {/* 朱砂印章 */}
      <div className="animate-rise mb-8 flex items-center gap-3">
        <span className="ink-seal flex h-12 w-12 items-center justify-center rounded-lg text-2xl">
          诗
        </span>
        <span className="ink-seal flex h-12 w-12 items-center justify-center rounded-lg text-2xl">
          名
        </span>
      </div>

      {/* 主标题 */}
      <h1 className="animate-rise font-cal text-6xl text-gold-grad paper-shadow sm:text-8xl md:text-9xl">
        引诗为名
      </h1>

      {/* 副标题 */}
      <div className="mt-6 animate-rise space-y-2 [animation-delay:0.15s]">
        <p className="font-xiaowei text-2xl text-paper/90 sm:text-3xl">
          取千年诗韻，賜一生嘉名
        </p>
        <p className="text-base text-paper/60 sm:text-lg">
          从《诗经》《楚辞》到唐宋诗词，为新生儿寻一个有根基的名字
        </p>
      </div>

      {/* 分割线 */}
      <div className="hairline mt-10 w-64 animate-rise [animation-delay:0.3s]" />

      {/* 数据统计 */}
      <div className="mt-8 flex animate-rise flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-paper/70 [animation-delay:0.4s]">
        <span className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gold-grad">
            {TOTAL_COUNT}
          </span>
          <span>张嘉名</span>
        </span>
        <span className="hidden h-4 w-px bg-paper/20 sm:block" />
        <span className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gold-grad">7</span>
          <span>部典籍</span>
        </span>
        <span className="hidden h-4 w-px bg-paper/20 sm:block" />
        <span className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gold-grad">∞</span>
          <span>千年文脉</span>
        </span>
      </div>

      {/* 典籍标签 */}
      <div className="mt-6 flex animate-rise flex-wrap items-center justify-center gap-2 [animation-delay:0.5s]">
        {Object.values(CATEGORY_META).map((c) => (
          <span
            key={c.label}
            className="chip glass-subtle text-xs text-paper/75"
          >
            {c.full}
          </span>
        ))}
      </div>

      {/* CTA 按钮 */}
      <div className="mt-12 flex animate-rise flex-col items-center gap-4 [animation-delay:0.6s] sm:flex-row">
        <button
          type="button"
          onClick={onDraw}
          className="group glass-strong lift flex items-center gap-3 rounded-full px-8 py-4 text-lg text-paper transition-all hover:text-gold"
        >
          <ScrollText className="h-5 w-5 transition-transform group-hover:rotate-12" />
          <span className="font-xiaowei">抽签求名</span>
        </button>
        <button
          type="button"
          onClick={onBrowse}
          className="group glass lift flex items-center gap-3 rounded-full px-8 py-4 text-lg text-paper/85 transition-all hover:text-gold"
        >
          <span className="font-xiaowei">浏览名典</span>
          <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
        </button>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-paper/40">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}
