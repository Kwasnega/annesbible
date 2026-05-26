"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getBookBySlug } from "@/lib/bible/books";
import { getVersesForChapter, type Verse } from "@/lib/bible/data";
import { useReadingStore } from "@/lib/store/useReadingStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Modal } from "@/components/ui/Modal";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Bookmark, Highlighter, Type, X } from "lucide-react";

export default function ChapterPage() {
  const params = useParams();
  const bookSlug = params.book as string;
  const chapterNum = parseInt(params.chapter as string, 10);
  const book = getBookBySlug(bookSlug);
  const { fontSize } = useUIStore();
  const { highlightedVerses, toggleHighlight, setLastPosition } = useReadingStore();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (book) {
      const vs = getVersesForChapter(book.id, chapterNum);
      setVerses(vs);
      setLastPosition(book.id, chapterNum, 1);
    }
  }, [book, chapterNum, setLastPosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && book && chapterNum > 1) {
        window.location.href = `/bible/${bookSlug}/${chapterNum - 1}`;
      }
      if (e.key === "ArrowRight" && book && chapterNum < book.chapters) {
        window.location.href = `/bible/${bookSlug}/${chapterNum + 1}`;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [book, chapterNum, bookSlug]);

  if (!book) {
    return (
      <div className="p-6 md:p-10">
        <p className="text-purple-200/50">Book not found.</p>
      </div>
    );
  }

  const fontSizeClass = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  }[fontSize];

  const lineHeightClass = {
    sm: "leading-7",
    md: "leading-8",
    lg: "leading-9",
    xl: "leading-10",
  }[fontSize];

  const handleVerseClick = (verse: Verse, e: React.MouseEvent) => {
    setSelectedVerse(verse);
    setMenuPos({ x: e.clientX, y: e.clientY });
    setMenuOpen(true);
  };

  const handleTouchStart = (verse: Verse) => {
    longPressTimer.current = setTimeout(() => {
      setSelectedVerse(verse);
      setMenuOpen(true);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const highlightColors = [
    { key: "gold", label: "Gold", color: "#E8C97A" },
    { key: "lavender", label: "Lavender", color: "#A07FD6" },
    { key: "rose", label: "Rose", color: "#C47A8A" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/bible/${bookSlug}`} className="p-2 rounded-lg bg-purple-800/20 text-purple-300 hover:bg-purple-700/30 transition-all active:scale-90">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-cormorant text-2xl md:text-3xl font-light text-purple-100">
              {book.name} {chapterNum}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const sizes: Array<"sm" | "md" | "lg" | "xl"> = ["sm", "md", "lg", "xl"];
              const next = sizes[(sizes.indexOf(fontSize) + 1) % sizes.length];
              useUIStore.getState().setFontSize(next);
            }}
            className="p-2 rounded-lg bg-purple-800/20 text-purple-300 hover:bg-purple-700/30 transition-all active:scale-90"
            title="Change font size"
          >
            <Type className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {chapterNum > 1 ? (
          <Link
            href={`/bible/${bookSlug}/${chapterNum - 1}`}
            className="flex items-center gap-1 text-sm text-purple-300/60 hover:text-purple-300 transition-colors active:opacity-60"
          >
            <ArrowLeft className="w-4 h-4" /> Prev
          </Link>
        ) : (
          <span />
        )}
        {chapterNum < book.chapters && (
          <Link
            href={`/bible/${bookSlug}/${chapterNum + 1}`}
            className="flex items-center gap-1 text-sm text-purple-300/60 hover:text-purple-300 transition-colors active:opacity-60"
          >
            Next <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Verses */}
      <GlassCard className="p-4 sm:p-6 md:p-10 space-y-1">
        <AnimatedContainer stagger={0.015}>
        {verses.map((verse) => {
          const highlightKey = `${book.id}-${chapterNum}-${verse.verseNum}`;
          const highlightColor = highlightedVerses[highlightKey];
          return (
            <div
              key={verse.verseNum}
              className={`flex gap-3 cursor-pointer select-none group ${fontSizeClass} ${lineHeightClass} transition-all duration-200 rounded-lg px-2 py-2.5 active:bg-purple-800/15 active:scale-[0.995]`}
              onClick={(e) => handleVerseClick(verse, e)}
              onTouchStart={() => handleTouchStart(verse)}
              onTouchEnd={handleTouchEnd}
              style={
                highlightColor
                  ? {
                      borderLeft: `3px solid ${highlightColor}`,
                      background: `${highlightColor}08`,
                      paddingLeft: "0.75rem",
                    }
                  : undefined
              }
            >
              <span className="font-cormorant-sc text-purple-300/40 text-sm mt-1 shrink-0 select-none min-w-[1.5rem]">
                {verse.verseNum}
              </span>
              <span className="font-cormorant text-purple-100/90">
                {verse.text}
              </span>
            </div>
          );
        })}
        </AnimatedContainer>
      </GlassCard>

      {/* Context Menu Modal */}
      <Modal isOpen={menuOpen} onClose={() => setMenuOpen(false)} className="p-5 space-y-4 mx-4 max-w-sm">
        {selectedVerse && (
          <>
            <div className="flex items-center justify-between">
              <p className="font-cormorant-sc text-sm text-purple-300/70">
                {book.name} {chapterNum}:{selectedVerse.verseNum}
              </p>
              <button onClick={() => setMenuOpen(false)} className="text-purple-300/50 hover:text-purple-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="font-cormorant text-purple-100/80 text-sm italic">
              &ldquo;{selectedVerse.text.substring(0, 120)}...&rdquo;
            </p>
            <div className="space-y-3">
              <p className="text-xs text-purple-200/40 font-cormorant-sc uppercase tracking-wider">Highlight</p>
              <div className="flex gap-2">
                {highlightColors.map((hc) => {
                  const key = `${book.id}-${chapterNum}-${selectedVerse.verseNum}`;
                  const isActive = highlightedVerses[key] === hc.color;
                  return (
                    <button
                      key={hc.key}
                      onClick={() => {
                        toggleHighlight(key, hc.color);
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                      style={{
                        background: isActive ? `${hc.color}20` : "rgba(93,63,160,0.08)",
                        border: `1px solid ${isActive ? hc.color : "rgba(160,127,214,0.15)"}`,
                        color: hc.color,
                      }}
                    >
                      <Highlighter className="w-3.5 h-3.5" />
                      {hc.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => {
                const key = `${book.id}-${chapterNum}-${selectedVerse.verseNum}`;
                toggleHighlight(key, "#E8C97A");
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-800/20 text-purple-200 hover:bg-purple-700/30 transition-all text-sm"
            >
              <Bookmark className="w-4 h-4" />
              Save this verse
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}
