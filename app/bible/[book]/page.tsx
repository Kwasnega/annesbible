"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getBookBySlug, BOOKS } from "@/lib/bible/books";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowLeft } from "lucide-react";

export default function BookPage() {
  const params = useParams();
  const book = getBookBySlug(params.book as string);

  if (!book) {
    return (
      <div className="p-6 md:p-10 max-w-5xl mx-auto">
        <p className="text-purple-200/50">Book not found.</p>
        <Link href="/bible" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
          Back to Bible
        </Link>
      </div>
    );
  }

  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/bible"
          className="p-2 rounded-lg bg-purple-800/20 text-purple-300 hover:bg-purple-700/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="font-cormorant-sc text-xs uppercase tracking-widest text-purple-300/50">
            {book.testament === "OT" ? "Old Testament" : "New Testament"}
          </span>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light text-purple-100">
            {book.name}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
        {chapters.map((ch) => (
          <Link
            key={ch}
            href={`/bible/${book.name.toLowerCase().replace(/\s+/g, "-")}/${ch}`}
          >
            <GlassCard className="p-4 flex items-center justify-center hover:bg-purple-800/15 hover:border-purple-400/30 transition-all duration-300 group active:bg-purple-800/20">
              <span className="font-cormorant text-lg text-purple-200 group-hover:text-purple-100 group-active:text-purple-100 transition-colors">
                {ch}
              </span>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
