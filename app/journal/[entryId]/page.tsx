"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useJournalStore } from "@/lib/store/useJournalStore";
import { formatDate } from "@/lib/utils/date";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowLeft, Trash2, Edit2 } from "lucide-react";
import Link from "next/link";

export default function EntryPage() {
  const params = useParams();
  const router = useRouter();
  const { entries, deleteEntry } = useJournalStore();
  const entry = entries.find((e) => e.id === params.entryId);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(entry?.title || "");
  const [editContent, setEditContent] = useState(entry?.content || "");

  if (!entry) {
    return (
      <div className="p-6 md:p-10 max-w-3xl mx-auto">
        <p className="text-purple-200/50">Entry not found.</p>
        <Link href="/journal" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
          Back to Journal
        </Link>
      </div>
    );
  }

  const { updateEntry } = useJournalStore.getState();

  const handleSave = () => {
    updateEntry(entry.id, { title: editTitle, content: editContent });
    setIsEditing(false);
  };

  const renderContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/journal" className="p-2 rounded-lg bg-purple-800/20 text-purple-300 hover:bg-purple-700/30 transition-all active:scale-90">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="text-xs text-purple-200/40">{formatDate(entry.createdAt)}</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {entry.mood && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-800/30 text-purple-300/70 capitalize">
                  {entry.mood}
                </span>
              )}
              {entry.tags && entry.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-800/25 text-purple-300/60 border border-purple-700/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2.5 rounded-lg text-purple-300/40 hover:text-purple-200 hover:bg-purple-800/20 active:bg-purple-800/30 transition-all active:scale-90"
              >
                <Edit2 className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={() => {
                  if (confirm("Delete this entry?")) {
                    deleteEntry(entry.id);
                    router.push("/journal");
                  }
                }}
                className="p-2.5 rounded-lg text-purple-300/40 hover:text-rose-soft hover:bg-rose-soft/10 active:text-rose-soft active:bg-rose-soft/10 transition-all active:scale-90"
              >
                <Trash2 className="w-[18px] h-[18px]" />
              </button>
            </>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-purple-600 text-purple-100 hover:bg-purple-500 transition-all text-sm active:scale-[0.97]"
            >
              Save
            </button>
          )}
        </div>
      </div>

      <GlassCard className="p-6 md:p-10">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-transparent text-2xl font-cormorant text-purple-100 placeholder:text-purple-300/20 focus:outline-none border-b border-purple-700/30 pb-2"
              placeholder="Title"
              style={{ fontSize: '16px' }}
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full min-h-[250px] sm:min-h-[300px] bg-transparent text-purple-100 focus:outline-none resize-y font-cormorant text-lg leading-relaxed"
              style={{ fontSize: '16px' }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {entry.title && (
              <h1 className="font-cormorant text-2xl md:text-3xl text-purple-100">{entry.title}</h1>
            )}
            <div
              className="font-cormorant text-lg text-purple-100/90 leading-relaxed space-y-3 [&_strong]:text-purple-200 [&_em]:italic [&_em]:text-purple-200/80 [&_blockquote]:border-l-2 [&_blockquote]:border-purple-500/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-purple-300/80 [&_li]:ml-4 [&_li]:list-disc"
              dangerouslySetInnerHTML={{ __html: renderContent(entry.content) }}
            />
          </div>
        )}
      </GlassCard>
    </div>
  );
}
