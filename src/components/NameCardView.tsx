"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RefreshCw, BookOpen, ChevronDown, Quote } from "lucide-react";
import type { NameCard } from "@/lib/types";
import { CATEGORY_META, GENDER_META } from "@/lib/types";
import { useFavorites } from "@/hooks/useFavorites";

interface NameCardViewProps {
  card: NameCard;
  /** 搭配的姓氏，用于显示全名 */
  surname?: string;
  /** 评分等元信息（来自智能荐名） */
  meta?: {
    totalScore?: number;
    pingze?: string;
    reasons?: string[];
  };
  /** "再抽一签"回调；不传则不显示该按钮 */
  onRedraw?: () => void;
  /** 是否正在抽签动画中 */
  drawing?: boolean;
  /** 紧凑模式 */
  compact?: boolean;
}

export default function NameCardView({
  card,
  surname,
  meta,
  onRedraw,
  drawing,
  compact,
}: NameCardViewProps) {
  const { isFavorited, toggleFavorite, hydrated } = useFavorites();
  const [expanded, setExpanded] = useState(false);

  const fullName = surname ? `${surname}${card.name}` : card.name;
  const fav = hydrated && isFavorited(card.id);
  const catMeta = CATEGORY_META[card.category];
  const genderMeta = GENDER_META[card.gender];

  const handleFav = () => {
    toggleFavorite({
      id: card.id,
      name: card.name,
      fullName,
      source: card.source,
    });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong relative flex flex-col overflow-hidden rounded-3xl"
    >
      <div className="glass-sheen" />

      {/* 顶部：典籍标签 + 评分 */}
      <div className="relative flex items-center justify-between px-6 pt-5">
        <span className="chip glass-subtle text-xs text-jade-light">
          {catMeta.full}
        </span>
        <div className="flex items-center gap-2">
          {meta?.totalScore != null && (
            <span className="chip bg-gold/15 text-xs font-bold text-gold">
              {meta.totalScore}分
            </span>
          )}
          <span className="chip glass-subtle text-xs text-paper/70">
            {genderMeta.label}
          </span>
        </div>
      </div>

      {/* 名字主体 */}
      <div className="relative px-6 pt-4 text-center">
        {surname && (
          <span className="font-cal text-3xl text-paper/60">
            {surname}
          </span>
        )}
        <h3 className="font-cal text-5xl text-gold-grad paper-shadow sm:text-6xl">
          {card.name}
        </h3>

        {/* 字解 */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {card.chars.map((c) => (
            <span
              key={c.char}
              className="glass-subtle rounded-lg px-2.5 py-1 text-xs text-paper/75"
            >
              <span className="font-bold text-jade-light">{c.char}</span>
              <span className="mx-1 text-paper/30">·</span>
              {c.meaning}
            </span>
          ))}
        </div>

        {/* 平仄 */}
        {meta?.pingze && (
          <div className="mt-2 text-xs text-paper/50">
            声调 ·{" "}
            <span className="font-mono tracking-widest text-gold/80">
              {meta.pingze}
            </span>
          </div>
        )}
      </div>

      {/* 引文 */}
      <div className="relative mx-6 mt-5 rounded-2xl bg-cinnabar/[0.06] p-4">
        <Quote className="absolute left-3 top-3 h-4 w-4 text-cinnabar/50" />
        <p className="pl-6 font-kai text-lg leading-relaxed text-paper/95">
          {card.citation}
        </p>
        <p className="mt-2 pl-6 text-xs text-paper/50">
          —— {card.source} · {card.dynasty}
          {card.author !== "佚名" ? ` · ${card.author}` : ""}
        </p>
      </div>

      {/* 释义 + 寓意（始终展示） */}
      {!compact && (
        <div className="relative space-y-3 px-6 pt-4">
          <div>
            <p className="mb-1 text-xs font-semibold tracking-wider text-jade-light/80">
              释义
            </p>
            <p className="text-sm leading-relaxed text-paper/75">
              {card.interpretation}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold tracking-wider text-gold/80">
              寓意
            </p>
            <p className="text-sm leading-relaxed text-paper/85">
              {card.meaning}
            </p>
          </div>
        </div>
      )}

      {/* 原文展开 */}
      {!compact && (
        <div className="relative px-6 pt-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex w-full items-center justify-center gap-1 py-1 text-xs text-paper/55 transition-colors hover:text-jade-light"
          >
            <BookOpen className="h-3.5 w-3.5" />
            {expanded ? "收起原文" : "查看原文上下文"}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-xl border border-gold/15 bg-ink-2/40 p-4">
                  <p className="font-kai text-sm leading-loose text-paper/70">
                    {card.originalText}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 标签 */}
      {!compact && (
        <div className="relative flex flex-wrap gap-1.5 px-6 pt-4">
          {card.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-jade/20 px-2.5 py-0.5 text-[11px] text-jade-light/85"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* 荐名理由 */}
      {!compact && meta?.reasons && meta.reasons.length > 0 && (
        <div className="relative flex flex-wrap gap-1.5 px-6 pt-3">
          {meta.reasons.map((r) => (
            <span
              key={r}
              className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] text-gold/85"
            >
              ✓ {r}
            </span>
          ))}
        </div>
      )}

      {/* 操作按钮 */}
      <div className="relative mt-auto flex items-center gap-2 px-6 pb-5 pt-5">
        {onRedraw && (
          <button
            type="button"
            onClick={onRedraw}
            disabled={drawing}
            className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-jade to-jade-deep py-3 text-sm font-medium text-paper shadow-lg transition-all hover:shadow-jade/40 disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 transition-transform ${drawing ? "animate-spin" : "group-hover:rotate-180"}`}
            />
            <span className="font-xiaowei">再抽一签</span>
          </button>
        )}
        <button
          type="button"
          onClick={handleFav}
          aria-label={fav ? "取消珍藏" : "加入珍藏"}
          className={`flex items-center justify-center rounded-full border transition-all ${
            fav
              ? "border-cinnabar/50 bg-cinnabar/25 text-cinnabar"
              : "border-paper/15 bg-white/5 text-paper/70 hover:border-cinnabar/40 hover:text-cinnabar"
          } ${onRedraw ? "h-12 w-12" : "flex-1 py-3"}`}
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
          {!onRedraw && (
            <span className="ml-2 text-sm font-xiaowei">
              {fav ? "已珍藏" : "珍藏"}
            </span>
          )}
        </button>
      </div>
    </motion.article>
  );
}
