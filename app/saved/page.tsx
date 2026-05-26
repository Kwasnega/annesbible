"use client";

import { useState } from "react";
import Link from "next/link";
import { useReadingStore } from "@/lib/store/useReadingStore";
import { getBookById } from "@/lib/bible/books";
import { getVersesForChapter } from "@/lib/bible/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Bookmark, Plus, Trash2, ArrowRight } from "lucide-react";

interface SavedVerseDisplay {
  key: string;
  bookId: number;
  chapter: number;
  verseNum: number;
  color: string;
}

export default function SavedPage() {
  const { highlightedVerses } = useReadingStore();
  const [savedVerses, setSavedVerses] = useState<SavedVerseDisplay[]>(() => {
    return Object.entries(highlightedVerses).map(([key, color]) => {
      const parts = key.split("-").map(Number);
      return { key, bookId: parts[0], chapter: parts[1], verseNum: parts[2], color };
    });
  });
  const [showNew, setShowNew] = useState(false);
  const [newRef, setNewRef] = useState("");

  const removeVerse = (key: string) => {
    setSavedVerses((prev) => prev.filter((v) => v.key !== key));
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="font-cormorant text-3xl md:text-4xl font-light text-purple-100">Saved Verses</h1>
          <p className="text-purple-200/40 text-sm mt-1">Your highlighted and saved passages</p>
        </header>
        <button
          onClick={() => setShowNew(true)}
          className="p-3 rounded-xl bg-purple-600 text-purple-100 hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/30"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {savedVerses.length === 0 ? (
        <div className="text-center py-16">
          <Bookmark className="w-12 h-12 text-purple-300/20 mx-auto mb-4" />
          <p className="font-cormorant text-xl text-purple-200/30 italic">
            No saved verses yet. Highlight verses while reading to collect them here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedVerses.map((sv) => {
            const book = getBookById(sv.bookId);
            if (!book) return null;
            const verses = getVersesForChapter(sv.bookId, sv.chapter);
            const verse = verses.find((v) => v.verseNum === sv.verseNum);
            const slug = book.name.toLowerCase().replace(/\s+/g, "-");
            return (
              <GlassCard key={sv.key} className="p-4 sm:p-5 hover:bg-purple-800/10 transition-all duration-300 group active:bg-purple-800/15">
                <div className="flex items-start justify-between gap-3">
                  <Link href={`/bible/${slug}/${sv.chapter}#verse-${sv.verseNum}`} className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ background: sv.color }} />
                      <p className="font-cormorant-sc text-xs text-purple-300/60 uppercase tracking-wider truncate">
                        {book.name} {sv.chapter}:{sv.verseNum}
                      </p>
                    </div>
                    <p className="font-cormorant text-base sm:text-lg text-purple-100/90 leading-relaxed">
                      {verse ? verse.text : "Verse not found"}
                    </p>
                  </Link>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => removeVerse(sv.key)}
                      className="p-2.5 rounded-lg text-purple-300/40 hover:text-rose-soft hover:bg-rose-soft/10 active:text-rose-soft active:bg-rose-soft/10 transition-all"
                    >
                      <Trash2 className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      <Modal isOpen={showNew} onClose={() => setShowNew(false)} className="space-y-4">
        <h2 className="font-cormorant text-xl text-purple-100">Add a verse by reference</h2>
        <Input
          label="Reference (e.g., John 3:16)"
          value={newRef}
          onChange={(e) => setNewRef(e.target.value)}
          placeholder="John 3:16"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setShowNew(false)}
            className="flex-1 py-2.5 rounded-xl text-sm text-purple-300/60 hover:text-purple-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Parse and add logic would go here
              setShowNew(false);
              setNewRef("");
            }}
            className="flex-1 py-2.5 rounded-xl bg-purple-600 text-purple-100 hover:bg-purple-500 transition-all text-sm"
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
}
