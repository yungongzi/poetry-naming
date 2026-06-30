"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, Sparkles, Users, User, Baby, X } from "lucide-react";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [drawCount, setDrawCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performDraw = useCallback(
    (g: GenderFilter) => {
      if (drawing) return;
      setDrawing(true);
      setModalOpen(false); // 关闭弹窗，开始新一轮
      setCard(null);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCard(drawOneCard(g));
        setDrawing(false);
        setDrawCount((c) => c + 1);
        setModalOpen(true); // 抽签完成，弹出结果
      }, 1100);
    },
    [drawing],
  );

  const closeModal = useCallback(() => setModalOpen(false), []);

  // ESC 关闭弹窗
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    // 弹窗打开时锁定 body 滚动
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen, closeModal]);

  // 卸载清理
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section id="drawing" className="relative scroll-mt-24 px-6 py-24">
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
        <div className="glass-strong mx-auto max-w-2xl rounded-3xl p-6">
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
                      transition={{
                        duration: 1.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
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
                {drawing ? "求签中…" : card ? "再求一签" : "诚心求签"}
              </span>
            </button>
            {drawCount > 0 && (
              <p className="mt-3 text-xs text-paper/40">
                已抽签 {drawCount} 次 · 缘分不厌其多
              </p>
            )}
          </div>
        </div>

        {/* 抽签引导（弹窗模式下，主区域下方留一句小诗作装饰） */}
        <div className="mx-auto mt-12 max-w-md text-center">
          <div className="hairline mx-auto mb-6 w-24" />
          <p className="font-kai text-base leading-loose text-paper/40">
            焚香默念 · 心之所向
            <br />
            签落何处 · 缘之所至
          </p>
        </div>
      </div>

      {/* ============ 抽签结果弹窗 ============ */}
      <AnimatePresence>
        {modalOpen && card && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="抽签结果"
          >
            {/* 遮罩层 */}
            <motion.div
              className="absolute inset-0 bg-ink/85 backdrop-blur-md"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* 弹窗主体（玻璃光晕装饰） */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,hsl(41_66%_60%/0.15),transparent_65%)] blur-3xl" />

            {/* 卡片容器 */}
            <motion.div
              className="relative z-10 my-8 w-full max-w-md"
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 关闭按钮 */}
              <button
                type="button"
                onClick={closeModal}
                aria-label="关闭"
                className="glass-strong lift absolute -right-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-full text-paper/70 transition-all hover:text-cinnabar hover:rotate-90"
              >
                <X className="h-4 w-4" />
              </button>

              {/* 顶部小标 · 缘落此签 */}
              <div className="mb-3 text-center">
                <span className="ink-seal inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs tracking-widest">
                  缘 落 此 签
                </span>
              </div>

              {/* 名字卡片 */}
              <NameCardView
                key={card.id}
                card={card}
                drawing={drawing}
                onRedraw={() => performDraw(gender)}
              />

              {/* 底部提示 */}
              <p className="mt-4 text-center text-xs text-paper/40">
                点按遮罩或按 ESC 可关闭 · 「再抽一签」可重新求取
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
