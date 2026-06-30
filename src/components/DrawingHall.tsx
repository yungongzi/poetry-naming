"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, Sparkles, Users, User, Baby } from "lucide-react";
import type { Gender, NameCard } from "@/lib/types";
import { drawOneCard } from "@/lib/surnames";
import NameCardView from "./NameCardView";

type GenderFilter = Gender | "all";

const GENDER_OPTS: { value: GenderFilter; label: string; icon: typeof Users }[] =
  [
    { value: "all", label: "不限", icon: Sparkles },
    { value: "male", label: "男名", icon: User },
    { value: "female", label: "女名", icon: Baby },
  ];

export default function DrawingHall() {
  const [gender, setGender] = useState<GenderFilter>("all");
  const [drawing, setDrawing] = useState(false);
  const [card, setCard] = useState<NameCard | null>(null);
  const [drawCount, setDrawCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performDraw = (g: GenderFilter) => {
    if (drawing) return;
    setDrawing(true);
    setCard(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCard(drawOneCard(g));
      setDrawing(false);
      setDrawCount((c) => c + 1);
    }, 1100);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section
      id="drawing"
      className="relative scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-jade-light/70">
            求 名 台
          </p>
          <h2 className="font-cal text-4xl text-gold-grad sm:text-5xl">
            抽签问名 · 缘落何签
          </h2>
          <p className="mt-4 text-sm text-paper/60">
            心诚则灵 · 从九十余张嘉名中，抽一支属于这孩子的缘分
          </p>
        </div>

        {/* 控制区 */}
        <div className="glass-strong mx-auto mb-12 max-w-2xl rounded-3xl p-6">
          {/* 性别选择 */}
          <div className="mb-6">
            <p className="mb-3 text-center text-xs tracking-wider text-paper/60">
              选择名类
            </p>
            <div className="flex justify-center gap-2">
              {GENDER_OPTS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setGender(opt.value)}
                  className={`chip transition-all ${
                    gender === opt.value
                      ? "bg-gradient-to-r from-jade to-jade-deep text-paper shadow-lg"
                      : "glass-subtle text-paper/70 hover:text-gold"
                  } px-5 py-2.5`}
                >
                  <opt.icon className="h-4 w-4" />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 抽签按钮 + 签筒 */}
          <div className="flex flex-col items-center">
            {/* 签筒 */}
            <div className="relative mb-6 h-32 w-24">
              <AnimatePresence mode="wait">
                {drawing ? (
                  <motion.div
                    key="shaking"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-end justify-center"
                  >
                    {/* 签筒 */}
                    <motion.div
                      animate={{ rotate: [-6, 6, -8, 5, -4, 0] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                      className="relative h-28 w-16 rounded-b-xl rounded-t-md border-2 border-gold/40 bg-gradient-to-b from-jade-deep/60 to-ink-2/80"
                      style={{
                        boxShadow:
                          "inset 0 0 20px hsl(158 50% 20% / 0.5), 0 10px 30px -10px hsl(168 60% 4% / 0.8)",
                      }}
                    >
                      {/* 签筒口 */}
                      <div className="absolute -top-1.5 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full bg-gold/30" />
                      {/* 飞出的签 */}
                      <motion.div
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: -90, rotate: 15, opacity: [1, 1, 0] }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="absolute left-1/2 top-2 h-24 w-2 -translate-x-1/2 rounded-full bg-gradient-to-t from-cinnabar to-gold"
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-end justify-center"
                  >
                    <div className="relative h-28 w-16 rounded-b-xl rounded-t-md border-2 border-gold/30 bg-gradient-to-b from-jade-deep/50 to-ink-2/70">
                      <div className="absolute -top-1.5 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full bg-gold/25" />
                      {/* 签 */}
                      <div className="absolute left-1/2 top-1 h-22 w-1.5 -translate-x-1/2 rounded-full bg-gradient-to-t from-cinnabar/80 to-gold/80" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => performDraw(gender)}
              disabled={drawing}
              className="group glass-strong lift flex items-center gap-3 rounded-full px-10 py-4 text-lg shadow-2xl transition-all disabled:opacity-70"
            >
              <ScrollText
                className={`h-5 w-5 text-gold transition-transform ${drawing ? "animate-spin" : "group-hover:rotate-12"}`}
              />
              <span className="font-xiaowei text-paper">
                {drawing ? "求签中…" : card ? "再求一签" : "诚心抽签"}
              </span>
            </button>
            {drawCount > 0 && (
              <p className="mt-3 text-xs text-paper/40">
                已抽签 {drawCount} 次 · 缘分不厌其多
              </p>
            )}
          </div>
        </div>

        {/* 名字卡展示 */}
        <div className="mx-auto min-h-[400px] max-w-md">
          <AnimatePresence mode="wait">
            {card && !drawing && (
              <NameCardView
                key={card.id}
                card={card}
                drawing={drawing}
                onRedraw={() => performDraw(gender)}
              />
            )}
          </AnimatePresence>

          {!card && !drawing && (
            <div className="glass flex min-h-[300px] flex-col items-center justify-center rounded-3xl p-8 text-center">
              <Sparkles className="mb-4 h-10 w-10 text-gold/40" />
              <p className="font-xiaowei text-lg text-paper/50">
                静心片刻
              </p>
              <p className="mt-2 text-sm text-paper/40">
                默念孩子姓氏与所愿，按下抽签
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
