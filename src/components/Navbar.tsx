"use client";

import { BookHeart, ScrollText, Sparkles, BookOpen, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface NavbarProps {
  onNav: (id: string) => void;
}

const NAV_ITEMS = [
  { id: "hero", label: "引诗为名", icon: Sparkles },
  { id: "drawing", label: "求名台", icon: ScrollText },
  { id: "smart", label: "智能荐名", icon: BookOpen },
  { id: "library", label: "名典", icon: BookHeart },
];

export default function Navbar({ onNav }: NavbarProps) {
  const { count, hydrated } = useFavorites();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass-strong flex items-center gap-1 rounded-full p-1.5 pl-5 shadow-2xl sm:gap-2">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNav("hero")}
          className="mr-1 flex items-center gap-2 pr-3"
          aria-label="引诗为名 首页"
        >
          <span className="ink-seal flex h-8 w-8 items-center justify-center rounded-md text-base font-bold">
            诗
          </span>
          <span className="hidden font-cal text-lg text-gold-grad sm:inline">
            引诗为名
          </span>
        </button>

        {/* 导航项 */}
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNav(item.id)}
            className="chip glass-subtle hover:bg-white/10 hover:text-gold px-3 py-1.5 text-sm text-paper/85 sm:px-4"
          >
            <item.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}

        {/* 收藏 */}
        <button
          type="button"
          onClick={() => onNav("favorites")}
          className="chip relative bg-cinnabar/20 px-3 py-1.5 text-sm text-paper hover:bg-cinnabar/35 sm:px-4"
        >
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">珍藏</span>
          {hydrated && count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cinnabar px-1 text-xs font-bold text-paper">
              {count}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
