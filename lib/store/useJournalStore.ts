"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JournalEntry {
  id: string;
  title?: string;
  content: string;
  mood: string | null;
  tags: string[];
  createdAt: string;
}

interface JournalStore {
  entries: JournalEntry[];
  draft: { title: string; content: string; mood: string | null; tags: string[] };
  addEntry: (entry: JournalEntry) => void;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  setDraft: (draft: Partial<JournalStore["draft"]>) => void;
  clearDraft: () => void;
}

export const useJournalStore = create<JournalStore>()(
  persist(
    (set) => ({
      entries: [],
      draft: { title: "", content: "", mood: null, tags: [] },
      addEntry: (entry) =>
        set((state) => ({ entries: [entry, ...state.entries] })),
      updateEntry: (id, updates) =>
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        })),
      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        })),
      setDraft: (draft) =>
        set((state) => ({ draft: { ...state.draft, ...draft } })),
      clearDraft: () =>
        set({ draft: { title: "", content: "", mood: null, tags: [] } }),
    }),
    { name: "anne-journal-store" }
  )
);
