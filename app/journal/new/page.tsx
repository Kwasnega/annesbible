"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useJournalStore } from "@/lib/store/useJournalStore";
import { MOODS } from "@/lib/bible/moodVerses";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Bold, Italic, List, Quote } from "lucide-react";
import Link from "next/link";

export default function NewJournalPage() {
  const router = useRouter();
  const { addEntry } = useJournalStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string | null>(null);

  const handleSave = () => {
    if (!content.trim()) return;
    const entry = {
      id: crypto.randomUUID(),
      title: title.trim() || undefined,
      content: content.trim(),
      mood: mood || null,
      createdAt: new Date().toISOString(),
    };
    addEntry(entry);
    router.push("/journal");
  };

  const insertFormat = (before: string, after: string = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = before + selected + after;
    setContent(content.substring(0, start) + replacement + content.substring(end));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/journal" className="p-2 rounded-lg bg-purple-800/20 text-purple-300 hover:bg-purple-700/30 transition-all active:scale-90">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-cormorant text-2xl text-purple-100">New Entry</h1>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-2xl md:text-3xl font-cormorant text-purple-100 placeholder:text-purple-300/20 focus:outline-none border-b border-transparent focus:border-purple-700/30 pb-2 transition-all"
        />

        <div className="space-y-2">
          <p className="text-xs text-purple-200/40 font-cormorant-sc uppercase tracking-wider">Mood</p>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m.key}
                onClick={() => setMood(mood === m.key ? null : m.key)}
                className="px-4 py-2 rounded-full text-sm border transition-all duration-200 min-h-[40px] active:scale-90"
                style={{
                  borderColor: mood === m.key ? `${m.color}80` : `${m.color}20`,
                  background: mood === m.key ? `${m.color}15` : "transparent",
                  color: mood === m.key ? m.color : `${m.color}90`,
                }}
              >
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="flex items-center gap-1 p-2 border-b border-glass-border">
            <button onClick={() => insertFormat("**", "**")} className="p-2.5 rounded-lg hover:bg-purple-800/20 text-purple-300/60 hover:text-purple-200 active:bg-purple-800/30 transition-all active:scale-90">
              <Bold className="w-[18px] h-[18px]" />
            </button>
            <button onClick={() => insertFormat("*", "*")} className="p-2.5 rounded-lg hover:bg-purple-800/20 text-purple-300/60 hover:text-purple-200 active:bg-purple-800/30 transition-all active:scale-90">
              <Italic className="w-[18px] h-[18px]" />
            </button>
            <button onClick={() => insertFormat("> ", "")} className="p-2.5 rounded-lg hover:bg-purple-800/20 text-purple-300/60 hover:text-purple-200 active:bg-purple-800/30 transition-all active:scale-90">
              <Quote className="w-[18px] h-[18px]" />
            </button>
            <button onClick={() => insertFormat("- ", "")} className="p-2.5 rounded-lg hover:bg-purple-800/20 text-purple-300/60 hover:text-purple-200 active:bg-purple-800/30 transition-all active:scale-90">
              <List className="w-[18px] h-[18px]" />
            </button>
          </div>
          <textarea
            placeholder="Write freely. This is your space."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[250px] sm:min-h-[300px] p-4 sm:p-5 bg-transparent text-purple-100 placeholder:text-purple-300/20 focus:outline-none resize-y font-cormorant text-lg leading-relaxed"
            style={{ fontSize: '16px' }}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/journal"
            className="px-5 py-2.5 rounded-xl text-sm text-purple-300/60 hover:text-purple-200 transition-colors active:opacity-60"
          >
            Cancel
          </Link>
          <Button onClick={handleSave} disabled={!content.trim()}>
            Save Entry
          </Button>
        </div>
      </div>
    </div>
  );
}
