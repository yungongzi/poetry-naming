"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ScrollText } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { getCardById } from "@/lib/poetry-data";
import NameCardView from "./NameCardView";

export default function Favorites() {
  const { favorites, removeFavorite, clearAll, hydrated } = useFavorites();

  return (
    <section id="favorites" className="relative scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-cinnabar/70">
            珍 藏
          </p>
          <h2 className="font-cal text-4xl text-gold-grad sm:text-5xl">
            心头好 · 留待细思量
          </h2>
          <p className="mt-4 text-sm text-paper/60">
            收藏的嘉名存于此处，本机长久保存 · 不妨多挑几张慢慢比较
          </p>
        </div>

        {!hydrated ? (
          <div className="glass flex min-h-[200px] items-center justify-center rounded-3xl">
            <p className="text-paper/40">载入中…</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="glass flex min-h-[300px] flex-col items-center justify-center rounded-3xl p-8 text-center">
            <Heart className="mb-4 h-12 w-12 text-cinnabar/30" />
            <p className="font-xiaowei text-lg text-paper/50">
              尚未珍藏嘉名
            </p>
            <p className="mt-2 text-sm text-paper/40">
              去求名台抽一签，或在名典中觅得心仪之名
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-paper/70">
                已珍藏 <span className="font-bold text-cinnabar">{favorites.length}</span> 张嘉名
              </p>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("确定要清空所有珍藏吗？此操作不可撤销。")) {
                    clearAll();
                  }
                }}
                className="chip glass-subtle px-3 py-1.5 text-xs text-paper/60 hover:text-cinnabar"
              >
                <Trash2 className="h-3.5 w-3.5" />
                清空珍藏
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {favorites.map((fav) => {
                  const card = getCardById(fav.id);
                  if (!card) {
                    // 数据库中已无此卡（理论上不会发生）
                    return (
                      <motion.div
                        key={fav.id}
                        layout
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="glass rounded-3xl p-6"
                      >
                        <p className="font-cal text-3xl text-gold-grad">
                          {fav.fullName}
                        </p>
                        <p className="mt-2 text-xs text-paper/50">
                          {fav.source}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFavorite(fav.id)}
                          className="mt-4 text-xs text-cinnabar hover:underline"
                        >
                          移除
                        </button>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={fav.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <NameCardView card={card} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="mt-12 text-center">
              <div className="hairline mx-auto mb-6 w-32" />
              <p className="flex items-center justify-center gap-2 text-sm text-paper/50">
                <ScrollText className="h-4 w-4" />
                诸名皆是好名，取舍之间，便是父母之心
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
