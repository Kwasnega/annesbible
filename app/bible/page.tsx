"use client";

import Link from "next/link";
import { OT_BOOKS, NT_BOOKS } from "@/lib/bible/books";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";

export default function BiblePage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <header>
        <h1 className="font-cormorant text-3xl md:text-4xl font-light text-purple-100">
          The Holy Bible
        </h1>
        <p className="text-purple-200/40 text-sm mt-1">King James Version</p>
      </header>

      {/* Old Testament */}
      <section className="space-y-4">
        <h2 className="font-cormorant-sc text-xs uppercase tracking-[0.2em] text-purple-300/50">
          Old Testament
        </h2>
        <AnimatedContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" stagger={0.025}>
          {OT_BOOKS.map((book) => (
            <Link key={book.id} href={`/bible/${book.name.toLowerCase().replace(/\s+/g, "-")}`} className="active:scale-[0.98] transition-transform duration-150">
              <AnimatedItem>
              <GlassCard className="p-4 sm:p-5 hover:bg-purple-800/15 hover:border-purple-400/30 transition-all duration-200 group active:bg-purple-800/20">
                <p className="font-cormorant-sc text-sm sm:text-base text-purple-100 group-hover:text-purple-200 transition-colors">
                  {book.name}
                </p>
                <p className="text-[11px] sm:text-xs text-purple-200/30 mt-1">{book.chapters} chapters</p>
              </GlassCard>
              </AnimatedItem>
            </Link>
          ))}
        </AnimatedContainer>
      </section>

      {/* New Testament */}
      <section className="space-y-4">
        <h2 className="font-cormorant-sc text-xs uppercase tracking-[0.2em] text-purple-300/50">
          New Testament
        </h2>
        <AnimatedContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" stagger={0.025}>
          {NT_BOOKS.map((book) => (
            <Link key={book.id} href={`/bible/${book.name.toLowerCase().replace(/\s+/g, "-")}`} className="active:scale-[0.98] transition-transform duration-150">
              <AnimatedItem>
              <GlassCard className="p-4 sm:p-5 hover:bg-purple-800/15 hover:border-purple-400/30 transition-all duration-200 group active:bg-purple-800/20">
                <p className="font-cormorant-sc text-sm sm:text-base text-purple-100 group-hover:text-purple-200 transition-colors">
                  {book.name}
                </p>
                <p className="text-[11px] sm:text-xs text-purple-200/30 mt-1">{book.chapters} chapters</p>
              </GlassCard>
              </AnimatedItem>
            </Link>
          ))}
        </AnimatedContainer>
      </section>
    </div>
  );
}
