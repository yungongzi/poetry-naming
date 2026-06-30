"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Search, User, Baby, Sparkles } from "lucide-react";
import type { Gender } from "@/lib/types";
import { SURNAMES, recommendNames } from "@/lib/surnames";
import { getAllTags } from "@/lib/poetry-data";
import NameCardView from "./NameCardView";

type GenderFilter = Gender | "all";

const GENDER_OPTS: { value: GenderFilter; label: string; icon: typeof User }[] =
  [
    { value: "all", label: "不限", icon: Sparkles },
    { value: "male", label: "男名", icon: User },
    { value: "female", label: "女名", icon: Baby },
  ];

const POPULAR_SURNAMES = ["李", "王", "张", "刘", "陈", "杨", "赵", "黄", "周", "吴"];

export default function SmartMatch() {
  const [surname, setSurname] = useState("李");
  const [surnameInput, setSurnameInput] = useState("");
  const [gender, setGender] = useState<GenderFilter>("all");
  const [prefs, setPrefs] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const allTags = useMemo(() => getAllTags(), []);

  const results = useMemo(() => {
    if (!submitted) return [];
    return recommendNames({
      surname,
      gender,
      preferences: prefs,
      count: 6,
    });
  }, [submitted, surname, gender, prefs]);

  const togglePref = (tag: string) => {
    setPrefs((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSurnameConfirm = () => {
    const v = surnameInput.trim();
    if (v) setSurname(v.slice(0, 2)); // 支持复姓
  };

  return (
    <section id="smart" className="relative scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-jade-light/70">
            智 能 荐 名
          </p>
          <h2 className="font-cal text-4xl text-gold-grad sm:text-5xl">
            因姓求名 · 量声定字
          </h2>
          <p className="mt-4 text-sm text-paper/60">
            综合姓氏音律 · 寓意偏好 · 性别契合，从典籍中寻最佳名字组合
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* 控制面板 */}
          <div className="glass-strong h-fit rounded-3xl p-6 lg:sticky lg:top-28">
            {/* 姓氏 */}
            <div className="mb-6">
              <label className="mb-3 block text-xs tracking-wider text-paper/60">
                姓氏
              </label>
              <div className="mb-3 flex gap-2">
                <input
                  type="text"
                  value={surnameInput}
                  onChange={(e) => setSurnameInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSurnameConfirm()}
                  placeholder={`当前：${surname}`}
                  maxLength={2}
                  className="glass-subtle h-10 flex-1 rounded-full px-4 text-sm text-paper outline-none placeholder:text-paper/40 focus:ring-1 focus:ring-gold/40"
                />
                <button
                  type="button"
                  onClick={handleSurnameConfirm}
                  className="glass-subtle flex h-10 w-10 items-center justify-center rounded-full text-gold hover:bg-white/10"
                  aria-label="确认姓氏"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SURNAMES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSurname(s)}
                    className={`rounded-md px-2.5 py-1 text-xs transition-all ${
                      surname === s
                        ? "bg-gold/20 text-gold"
                        : "glass-subtle text-paper/60 hover:text-paper"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {/* 全部姓氏下拉 */}
              <select
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="glass-subtle mt-2 h-9 w-full rounded-full px-3 text-xs text-paper outline-none [&>option]:bg-ink-2"
              >
                {SURNAMES.map((s) => (
                  <option key={s.surname} value={s.surname}>
                    {s.surname}（{s.rarity === "common" ? "常见" : s.rarity === "uncommon" ? "较少" : "罕见"}）
                  </option>
                ))}
              </select>
            </div>

            {/* 性别 */}
            <div className="mb-6">
              <label className="mb-3 block text-xs tracking-wider text-paper/60">
                名类
              </label>
              <div className="flex gap-2">
                {GENDER_OPTS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setGender(opt.value)}
                    className={`chip flex-1 justify-center transition-all ${
                      gender === opt.value
                        ? "bg-gradient-to-r from-jade to-jade-deep text-paper"
                        : "glass-subtle text-paper/60"
                    } py-2`}
                  >
                    <opt.icon className="h-4 w-4" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 偏好标签 */}
            <div className="mb-6">
              <label className="mb-3 block text-xs tracking-wider text-paper/60">
                寓意偏好
                <span className="ml-2 text-paper/30">（可多选）</span>
              </label>
              <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto pr-1">
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => togglePref(t)}
                    className={`rounded-full px-2.5 py-1 text-xs transition-all ${
                      prefs.includes(t)
                        ? "bg-cinnabar/25 text-cinnabar"
                        : "glass-subtle text-paper/55 hover:text-paper"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {prefs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPrefs([])}
                  className="mt-2 text-xs text-paper/40 hover:text-cinnabar"
                >
                  清空偏好
                </button>
              )}
            </div>

            {/* 推荐 */}
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold py-3.5 text-base font-bold text-ink shadow-lg transition-all hover:shadow-gold/30"
            >
              <Wand2 className="h-5 w-5 transition-transform group-hover:rotate-12" />
              <span className="font-xiaowei">为之求名</span>
            </button>
            <p className="mt-3 text-center text-xs text-paper/40">
              算法综合寓意 35% · 音律 30% · 性别 35%
            </p>
          </div>

          {/* 结果区 */}
          <div className="min-h-[400px]">
            {!submitted ? (
              <div className="glass flex h-full min-h-[400px] flex-col items-center justify-center rounded-3xl p-8 text-center">
                <Wand2 className="mb-4 h-12 w-12 text-gold/40" />
                <p className="font-xiaowei text-lg text-paper/50">
                  设置姓氏与偏好
                </p>
                <p className="mt-2 text-sm text-paper/40">
                  点按「为之求名」，从典籍中寻最佳组合
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-paper/70">
                    为 <span className="font-cal text-lg text-gold-grad">{surname}</span> 氏求得{" "}
                    <span className="font-bold text-gold">{results.length}</span> 组嘉名
                  </p>
                  <span className="text-xs text-paper/40">
                    按契合度排序
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {results.map((item, idx) => (
                      <motion.div
                        key={item.card.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.4 }}
                      >
                        <NameCardView
                          card={item.card}
                          surname={surname}
                          meta={{
                            totalScore: item.totalScore,
                            pingze: item.pingze,
                            reasons: item.reasons,
                          }}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
