"use client";

import Link from "next/link";
import { useReadingStore } from "@/lib/store/useReadingStore";
import { useJournalStore } from "@/lib/store/useJournalStore";
import { getGreeting, formatShortDate } from "@/lib/utils/date";
import { getBookById } from "@/lib/bible/books";
import { MOODS } from "@/lib/bible/moodVerses";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";
import { Bookmark, ArrowRight, PenLine } from "lucide-react";
import { motion } from "framer-motion";

const DAILY_VERSES = [
  { ref: "Philippians 4:7", text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
  { ref: "Psalm 46:10", text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth." },
  { ref: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you." },
];

function getDailyVerse() {
  const dayOfYear = Math.floor(
    (new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

export default function HomePage() {
  const { lastBookId, lastChapter } = useReadingStore();
  const { entries } = useJournalStore();
  const dailyVerse = getDailyVerse();
  const lastBook = lastBookId ? getBookById(lastBookId) : null;
  const recentEntries = entries.slice(0, 2);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <header className="space-y-1">
        <h1 className="font-cormorant text-3xl md:text-4xl font-light text-purple-100">
          {getGreeting()}, Anne.
        </h1>
        <p className="text-purple-200/50 text-sm">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </header>

      {/* Daily Verse */}
      <GlassCard elevated className="p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 rounded-[20px] border border-purple-400/20 animate-breathe pointer-events-none" />
        <div className="relative space-y-4">
          <div className="flex items-center gap-2 text-purple-300/60 text-xs font-cormorant-sc uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-purple-300/30" />
            Verse of the Day
          </div>
          <p className="font-cormorant text-xl md:text-2xl font-light leading-relaxed text-purple-100 max-w-3xl">
            &ldquo;{dailyVerse.text}&rdquo;
          </p>
          <p className="font-cormorant-sc text-sm text-purple-300/70">{dailyVerse.ref}</p>
        </div>
      </GlassCard>

      {/* Continue Reading */}
      {lastBook && lastChapter && (
        <GlassCard className="p-6 flex items-center justify-between group active:scale-[0.99] transition-transform duration-150">
          <div className="space-y-1">
            <p className="text-xs text-purple-200/40 font-cormorant-sc uppercase tracking-wider">Continue Reading</p>
            <p className="font-cormorant text-xl text-purple-100">
              {lastBook.name} {lastChapter}
            </p>
          </div>
          <Link
            href={`/bible/${lastBook.name.toLowerCase().replace(/\s+/g, "-")}/${lastChapter}`}
            className="p-3 rounded-xl bg-purple-800/20 text-purple-300 hover:bg-purple-700/30 hover:text-purple-100 transition-all duration-200 active:scale-90"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </GlassCard>
      )}

      {/* Mood Quick Select */}
      <div className="space-y-3">
        <p className="text-xs text-purple-200/40 font-cormorant-sc uppercase tracking-wider">How are you feeling?</p>
        <AnimatedContainer className="flex flex-wrap gap-2" stagger={0.04}>
          {MOODS.map((m) => (
            <Link
              key={m.key}
              href={`/mood?mood=${m.key}`}
              className="px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border min-h-[40px] flex items-center active:scale-95"
              style={{
                borderColor: `${m.color}30`,
                color: m.color,
                background: `${m.color}10`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${m.color}25`;
                (e.currentTarget as HTMLElement).style.borderColor = `${m.color}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${m.color}10`;
                (e.currentTarget as HTMLElement).style.borderColor = `${m.color}30`;
              }}
            >
              <AnimatedItem>
                {m.emoji} {m.label}
              </AnimatedItem>
            </Link>
          ))}
        </AnimatedContainer>
      </div>

      {/* Recent Journal */}
      {recentEntries.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-purple-200/40 font-cormorant-sc uppercase tracking-wider">Recent Journal</p>
            <Link href="/journal" className="text-xs text-purple-400 hover:text-purple-300 transition-colors active:opacity-60">
              View all
            </Link>
          </div>
          <AnimatedContainer className="grid gap-3 md:grid-cols-2" stagger={0.08}>
            {recentEntries.map((entry) => (
              <Link key={entry.id} href={`/journal/${entry.id}`} className="active:scale-[0.98] transition-transform duration-150">
                <AnimatedItem>
                <GlassCard className="p-5 hover:bg-purple-800/10 transition-all duration-200 group">
                  <div className="flex items-center gap-2 mb-2">
                    <PenLine className="w-3.5 h-3.5 text-purple-300/50" />
                    <span className="text-xs text-purple-200/40">{formatShortDate(entry.createdAt)}</span>
                    {entry.mood && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-800/30 text-purple-300/70">
                        {entry.mood}
                      </span>
                    )}
                  </div>
                  <h3 className="font-cormorant text-lg text-purple-100 mb-1 group-hover:text-purple-200 transition-colors">
                    {entry.title || "Untitled Entry"}
                  </h3>
                  <p className="text-sm text-purple-200/40 line-clamp-2">{entry.content.replace(/<[^>]*>/g, " ").trim()}</p>
                </GlassCard>
                </AnimatedItem>
              </Link>
            ))}
          </AnimatedContainer>
        </div>
      )}

      {/* Twin flex — glows to tease, then fades to subtle */}
      <motion.div
        className="pt-6 pb-2 text-center"
        animate={{
          opacity: [0, 0, 1, 1, 0.25],
          filter: [
            "drop-shadow(0 0 0px rgba(196,168,236,0))",
            "drop-shadow(0 0 0px rgba(196,168,236,0))",
            "drop-shadow(0 0 12px rgba(196,168,236,0.7))",
            "drop-shadow(0 0 12px rgba(196,168,236,0.7))",
            "drop-shadow(0 0 0px rgba(196,168,236,0))",
          ],
        }}
        transition={{
          duration: 7,
          times: [0, 0.214, 0.357, 0.786, 1],
          ease: "easeInOut",
        }}
      >
        <p className="text-[10px] text-purple-300 font-cormorant-sc uppercase tracking-[0.3em]">
          Made with love by Kay — the smarter twin
        </p>
      </motion.div>
    </div>
  );
}
