"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import type { Gender, PoetryCategory } from "@/lib/types";
import { CATEGORY_META, GENDER_META } from "@/lib/types";
import { NAME_CARDS } from "@/lib/poetry-data";
import NameCardView from "./NameCardView";

type GenderFilter = Gender | "all";
type CatFilter = PoetryCategory | "all";

export default function Library() {
  const [cat, setCat] = useState<CatFilter>("all");
  const [gender, setGender] = useState<GenderFilter>("all");
  const [query, setQuery] = useState("");
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return NAME_CARDS.filter((c) => {
      if (cat !== "all" && c.category !== cat) return false;
      if (gender !== "all" && c.gender !== gender && c.gender !== "unisex")
        return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay = `${c.name} ${c.citation} ${c.source} ${c.meaning} ${c.tags.join(" ")} ${c.author}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [cat, gender, query]);

  const catCounts = useMemo(() => {
    const m: Record<string, number> = {};
    NAME_CARDS.forEach((c) => {
      m[c.category] = (m[c.category] ?? 0) + 1;
    });
    return m;
  }, []);

  return (
    <section id="library" className="relative scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-jade-light/70">
            名 典
          </p>
          <h2 className="font-cal text-4xl text-gold-grad sm:text-5xl">
            全库嘉名 · 一览千古
          </h2>
          <p className="mt-4 text-sm text-paper/60">
            {NAME_CARDS.length} 张名字卡片 · 按典籍、性别、字义细细检索
          </p>
        </div>

        {/* 筛选栏 */}
        <div className="glass-strong mb-10 rounded-3xl p-5">
          {/* 搜索 */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索名字、诗句、释义、作者……"
              className="glass-subtle h-11 w-full rounded-full pl-11 pr-10 text-sm text-paper outline-none placeholder:text-paper/40 focus:ring-1 focus:ring-gold/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-paper/40 hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* 典籍筛选 */}
          <div className="mb-3">
            <div className="mb-2 flex items-center gap-1.5 text-xs text-paper/50">
              <Filter className="h-3.5 w-3.5" />
              典籍
            </div>
            <div className="flex flex-wrap gap-1.5">
              <CatChip
                active={cat === "all"}
                onClick={() => setCat("all")}
                label="全部"
                count={NAME_CARDS.length}
              />
              {(Object.keys(CATEGORY_META) as PoetryCategory[]).map((k) => (
                <CatChip
                  key={k}
                  active={cat === k}
                  onClick={() => setCat(k)}
                  label={CATEGORY_META[k].label}
                  count={catCounts[k] ?? 0}
                />
              ))}
            </div>
          </div>

          {/* 性别筛选 */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-xs text-paper/50">
              名类
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["all", "male", "female", "unisex"] as GenderFilter[]).map(
                (g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`chip px-3 py-1 text-xs transition-all ${
                      gender === g
                        ? "bg-gradient-to-r from-jade to-jade-deep text-paper"
                        : "glass-subtle text-paper/60 hover:text-paper"
                    }`}
                  >
                    {g === "all" ? "不限" : GENDER_META[g as Gender].label}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* 结果统计 */}
        <div className="mb-6 text-sm text-paper/60">
          共 <span className="font-bold text-gold">{filtered.length}</span> 张嘉名
        </div>

        {/* 卡片网格 */}
        {filtered.length === 0 ? (
          <div className="glass flex min-h-[300px] flex-col items-center justify-center rounded-3xl p-8 text-center">
            <Search className="mb-4 h-10 w-10 text-paper/30" />
            <p className="text-paper/50">未寻得相应嘉名</p>
            <p className="mt-1 text-sm text-paper/35">不妨换个关键词或筛选项</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <NameCardView
                    card={card}
                    compact={activeCard !== card.id}
                    onRedraw={undefined}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

function CatChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip px-3 py-1 text-xs transition-all ${
        active
          ? "bg-gold/20 text-gold"
          : "glass-subtle text-paper/60 hover:text-paper"
      }`}
    >
      {label}
      <span className="ml-1 text-[10px] opacity-60">{count}</span>
    </button>
  );
}
