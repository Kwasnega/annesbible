"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReadingStore {
  lastBookId: number | null;
  lastChapter: number | null;
  lastVerse: number | null;
  highlightedVerses: Record<string, string>;
  setLastPosition: (bookId: number, chapter: number, verse: number) => void;
  toggleHighlight: (key: string, color: string) => void;
  removeHighlight: (key: string) => void;
}

export const useReadingStore = create<ReadingStore>()(
  persist(
    (set) => ({
      lastBookId: null,
      lastChapter: null,
      lastVerse: null,
      highlightedVerses: {},
      setLastPosition: (bookId, chapter, verse) =>
        set({ lastBookId: bookId, lastChapter: chapter, lastVerse: verse }),
      toggleHighlight: (key, color) =>
        set((state) => {
          const next = { ...state.highlightedVerses };
          if (next[key] === color) {
            delete next[key];
          } else {
            next[key] = color;
          }
          return { highlightedVerses: next };
        }),
      removeHighlight: (key) =>
        set((state) => {
          const next = { ...state.highlightedVerses };
          delete next[key];
          return { highlightedVerses: next };
        }),
    }),
    { name: "anne-reading-store" }
  )
);
