"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "yinshi-naming-favorites";

export interface FavoriteItem {
  id: string;
  name: string;
  fullName: string;
  source: string;
  savedAt: number;
}

function readStorage(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeStorage(items: FavoriteItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // 触发自定义事件，便于同页多组件同步
    window.dispatchEvent(new CustomEvent("yinshi-favorites-change"));
  } catch {
    /* ignore quota errors */
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(readStorage());
    setHydrated(true);

    const onChange = () => setFavorites(readStorage());
    window.addEventListener("yinshi-favorites-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("yinshi-favorites-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const isFavorited = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (item: Omit<FavoriteItem, "savedAt">) => {
      setFavorites((prev) => {
        const exists = prev.some((f) => f.id === item.id);
        const next = exists
          ? prev.filter((f) => f.id !== item.id)
          : [{ ...item, savedAt: Date.now() }, ...prev];
        writeStorage(next);
        return next;
      });
    },
    [],
  );

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f.id !== id);
      writeStorage(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    writeStorage([]);
    setFavorites([]);
  }, []);

  return {
    favorites,
    count: favorites.length,
    isFavorited,
    toggleFavorite,
    removeFavorite,
    clearAll,
    hydrated,
  };
}
