"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOODS, MOOD_VERSES } from "@/lib/bible/moodVerses";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark } from "lucide-react";

function MoodContent() {
  const searchParams = useSearchParams();
  const initialMood = searchParams.get("mood");
  const [selectedMood, setSelectedMood] = useState<string | null>(initialMood);
  const verses = selectedMood ? MOOD_VERSES[selectedMood] || [] : [];

  useEffect(() => {
    if (initialMood) setSelectedMood(initialMood);
  }, [initialMood]);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10">
      <header className="space-y-2">
        <h1 className="font-cormorant text-3xl md:text-4xl font-light text-purple-100">
          How are you feeling right now, Anne?
        </h1>
        <p className="text-purple-200/40 text-sm">Select a mood to find words for your heart.</p>
      </header>

      <AnimatedContainer className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4" stagger={0.05}>
        {MOODS.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelectedMood(m.key === selectedMood ? null : m.key)}
            className="glass-card p-5 sm:p-6 text-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.96] group min-h-[100px]"
            style={{
              borderColor: selectedMood === m.key ? `${m.color}60` : undefined,
              boxShadow: selectedMood === m.key ? `0 0 30px ${m.color}20` : undefined,
            }}
          >
            <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">{m.emoji}</span>
            <p
              className="font-cormorant-sc text-base sm:text-lg transition-colors"
              style={{ color: selectedMood === m.key ? m.color : undefined }}
            >
              {m.label}
            </p>
          </button>
        ))}
      </AnimatedContainer>

      <AnimatePresence>
        {selectedMood && verses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-4 overflow-hidden"
          >
            <p className="font-cormorant-sc text-xs text-purple-300/50 uppercase tracking-wider">
              Some words for you today
            </p>
            <AnimatedContainer className="space-y-3" stagger={0.08}>
              {verses.map((verse, i) => (
                <AnimatedItem key={i}>
                <GlassCard className="p-4 sm:p-6 space-y-3 active:scale-[0.99]">
                  <p className="font-cormorant text-lg sm:text-xl text-purple-100/90 leading-relaxed italic">
                    &ldquo;{verse.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-cormorant-sc text-sm text-purple-300/60">{verse.ref}</p>
                    <div className="flex items-center gap-2">
                      <button className="p-2.5 rounded-lg text-purple-300/30 hover:text-purple-300 hover:bg-purple-800/20 active:text-purple-300 active:bg-purple-800/20 transition-all active:scale-90">
                        <Bookmark className="w-[18px] h-[18px]" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MoodPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-purple-200/30 font-cormorant italic">Loading...</div>}>
      <MoodContent />
    </Suspense>
  );
}
