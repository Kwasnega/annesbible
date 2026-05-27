"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, X, Command } from "lucide-react";
import { searchVerses, parseReference, type Verse } from "@/lib/bible/data";
import { getBookById } from "@/lib/bible/books";
import Link from "next/link";

function isReference(q: string) {
  return /^[A-Za-z1-3\s]+\s\d+[:\d\s-]+/i.test(q.trim());
}

export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Verse[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  const handleSearch = useCallback((val: string) => {
    setQuery(val);
    if (val.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    setTimeout(() => {
      if (isReference(val)) {
        const ref = parseReference(val);
        if (ref) {
          const verses = searchVerses(ref.book.name);
          setResults(verses.filter((v) => v.chapter === ref.chapter).slice(0, 5));
          setSearching(false);
          return;
        }
      }
      const verses = searchVerses(val);
      setResults(verses.slice(0, 8));
      setSearching(false);
    }, 250);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-xl bg-[#141024] border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-900/40 overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-purple-700/20">
              <Search className="w-5 h-5 text-purple-300/50 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search a verse, word, or reference..."
                className="flex-1 bg-transparent text-purple-100 placeholder:text-purple-300/30 focus:outline-none text-base font-sans"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md text-purple-300/40 hover:text-purple-300 hover:bg-purple-800/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto">
              {searching && (
                <div className="space-y-2 p-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-3 space-y-2">
                      <div className="h-3 skeleton w-28" />
                      <div className="h-4 skeleton w-[95%]" />
                    </div>
                  ))}
                </div>
              )}

              {!searching && query.length >= 2 && results.length === 0 && (
                <div className="p-8 text-center">
                  <p className="font-cormorant text-purple-200/30 italic">No verses found.</p>
                </div>
              )}

              {!searching && results.map((verse, i) => {
                const book = getBookById(verse.bookId);
                if (!book) return null;
                const slug = book.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <Link
                    key={`${verse.bookId}-${verse.chapter}-${verse.verseNum}-${i}`}
                    href={`/bible/${slug}/${verse.chapter}`}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 p-3 hover:bg-purple-800/15 transition-colors active:bg-purple-800/25 border-b border-purple-700/10 last:border-0"
                  >
                    <ArrowRight className="w-4 h-4 text-purple-400/40 mt-1 shrink-0" />
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-sans text-purple-300/60">
                        {book.name} {verse.chapter}:{verse.verseNum}
                      </p>
                      <p className="font-cormorant text-sm text-purple-100/80 line-clamp-2">
                        {verse.text}
                      </p>
                    </div>
                  </Link>
                );
              })}

              {query.length < 2 && (
                <div className="p-6 text-center space-y-4">
                  <p className="text-xs text-purple-300/30 font-sans uppercase tracking-widest">Try searching for</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["peace", "love", "fear not", "hope", "John 3:16"].map((example) => (
                      <button
                        key={example}
                        onClick={() => handleSearch(example)}
                        className="px-3 py-1.5 rounded-full text-xs border border-purple-700/30 text-purple-300/50 hover:border-purple-500/50 hover:text-purple-300 transition-all"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-purple-300/20 font-sans">
                    <Command className="w-3 h-3" /> K to toggle
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
