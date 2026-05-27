"use client";

import Link from "next/link";
import { useJournalStore } from "@/lib/store/useJournalStore";
import { formatDate, formatShortDate } from "@/lib/utils/date";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";
import { Plus, PenLine, Trash2, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function JournalPage() {
  const { entries, deleteEntry } = useJournalStore();

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="font-cormorant text-3xl md:text-4xl font-light text-purple-100">Journal</h1>
          <p className="text-purple-200/40 text-sm mt-1">Your spiritual reflections</p>
        </header>
        <Link
          href="/journal/new"
          className="p-3 rounded-xl bg-purple-600 text-purple-100 hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/30 active:scale-90"
        >
          <Plus className="w-5 h-5" />
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-16">
          <PenLine className="w-12 h-12 text-purple-300/20 mx-auto mb-4" />
          <p className="font-cormorant text-xl text-purple-200/30 italic">
            Your spiritual story begins here.
          </p>
          <Link
            href="/journal/new"
            className="inline-block mt-6 px-6 py-2.5 rounded-xl bg-purple-600 text-purple-100 hover:bg-purple-500 transition-all text-sm active:scale-[0.98]"
          >
            Write your first entry
          </Link>
        </div>
      ) : (
        <AnimatedContainer className="relative space-y-6" stagger={0.1}>
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-purple-700/20 hidden md:block" />

          {entries.map((entry) => (
            <AnimatedItem key={entry.id}>
            <div className="relative flex gap-4 md:gap-6 group">
              <div className="hidden md:flex flex-col items-center pt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500/40 ring-4 ring-purple-900/30" />
              </div>
              <Link href={`/journal/${entry.id}`} className="flex-1 active:scale-[0.99] transition-transform duration-150">
                <GlassCard className="p-5 hover:bg-purple-800/10 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-3">
                    <PenLine className="w-3.5 h-3.5 text-purple-300/50" />
                    <span className="text-xs text-purple-200/40">{formatShortDate(entry.createdAt)}</span>
                    {entry.mood && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-800/30 text-purple-300/70 capitalize">
                        {entry.mood}
                      </span>
                    )}
                  </div>
                  <h3 className="font-cormorant text-xl text-purple-100 mb-2">
                    {entry.title || "Untitled Entry"}
                  </h3>
                  <div
                    className="text-sm text-purple-200/40 line-clamp-3 space-y-1"
                    dangerouslySetInnerHTML={{
                      __html: entry.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>")
                        .replace(/\n/g, "<br/>")
                        .substring(0, 300),
                    }}
                  />
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-purple-800/25 text-purple-300/60 border border-purple-700/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </Link>
              <button
                onClick={() => {
                  if (confirm("Delete this entry?")) deleteEntry(entry.id);
                }}
                className="md:opacity-0 md:group-hover:opacity-100 p-2.5 rounded-lg text-purple-300/30 hover:text-rose-soft hover:bg-rose-soft/10 active:text-rose-soft active:bg-rose-soft/10 transition-all self-start shrink-0 active:scale-90"
              >
                <Trash2 className="w-[18px] h-[18px]" />
              </button>
            </div>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      )}

      {/* Mobile FAB for new entry */}
      <motion.div
        className="md:hidden fixed bottom-20 right-4 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Link
          href="/journal/new"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 text-purple-100 shadow-lg shadow-purple-900/40 active:scale-90 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </Link>
      </motion.div>
    </div>
  );
}
