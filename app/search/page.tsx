"use client";

import { useState } from "react";
import Link from "next/link";
import { searchVerses, parseReference, type Verse } from "@/lib/bible/data";
import { getBookById } from "@/lib/bible/books";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Search, ArrowRight, Bookmark } from "lucide-react";

function isReference(q: string) {
  return /^[A-Za-z1-3\s]+\s\d+[:\d\s-]+/i.test(q.trim());
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Verse[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setHasSearched(true);

    if (isReference(val)) {
      const ref = parseReference(val);
      if (ref) {
        const verses = searchVerses(ref.book.name);
        setResults(
          verses
            .filter((v) => v.chapter === ref.chapter)
            .slice(0, 5)
        );
        return;
      }
    }

    const verses = searchVerses(val);
    setResults(verses);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="font-cormorant text-3xl md:text-4xl font-light text-purple-100">Search</h1>
        <p className="text-purple-200/40 text-sm">Find a verse or keyword</p>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300/30" />
        <input
          type="text"
          placeholder="Search a verse or keyword..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-2xl border border-purple-700/30 bg-bg-surface/60 pl-12 pr-4 py-4 text-purple-100 placeholder:text-purple-300/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 text-lg min-h-[56px]" style={{ fontSize: '16px' }}
        />
      </div>

      {!hasSearched && (
        <div className="text-center py-16">
          <p className="font-cormorant text-xl text-purple-200/30 italic">
            The Word is waiting. Type a verse or a feeling.
          </p>
        </div>
      )}

      {hasSearched && results.length === 0 && (
        <div className="text-center py-16">
          <p className="font-cormorant text-xl text-purple-200/30 italic">
            No verses found. Try another word.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {results.map((verse, i) => {
          const book = getBookById(verse.bookId);
          if (!book) return null;
          const slug = book.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <GlassCard
              key={`${verse.bookId}-${verse.chapter}-${verse.verseNum}-${i}`}
              className="p-4 sm:p-5 hover:bg-purple-800/10 transition-all duration-300 group active:bg-purple-800/15"
            >
              <Link href={`/bible/${slug}/${verse.chapter}#verse-${verse.verseNum}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="font-cormorant-sc text-xs text-purple-300/60 uppercase tracking-wider">
                      {book.name} {verse.chapter}:{verse.verseNum}
                    </p>
                    <p className="font-cormorant text-lg text-purple-100/90 leading-relaxed">
                      {verse.text}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-300/30 group-hover:text-purple-300/70 transition-colors shrink-0 mt-1" />
                </div>
              </Link>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
