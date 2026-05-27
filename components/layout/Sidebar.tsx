"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import {
  Sparkles,
  BookOpen,
  Search,
  Bookmark,
  Heart,
  PenLine,
  Music,
  Settings,
  Command,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/bible", label: "Read", icon: BookOpen },
  { href: "/search", label: "Search", icon: Search },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/mood", label: "Mood", icon: Heart },
  { href: "/journal", label: "Journal", icon: PenLine },
  { href: "/worship", label: "Worship", icon: Music },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[240px] flex-col glass-card border-r border-glass-border z-40">
      <div className="p-6 pb-4 space-y-3">
        <h1 className="font-cormorant text-xl font-semibold text-purple-100 leading-tight">
          Annes Bible Space
        </h1>
        <button
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-purple-700/20 text-purple-300/40 text-xs hover:border-purple-500/30 hover:text-purple-300/60 transition-all active:scale-[0.98]"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left">Search verses...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-purple-800/30 text-purple-300/50 font-sans text-[10px]">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-3 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                isActive
                  ? "bg-purple-800/30 text-purple-100 border-l-2 border-purple-400"
                  : "text-purple-200/60 hover:text-purple-100 hover:bg-purple-800/10 border-l-2 border-transparent"
              )}
            >
              <Icon className={cn("w-[18px] h-[18px]", isActive && "text-purple-300")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98]",
            pathname === "/settings"
              ? "bg-purple-800/30 text-purple-100 border-l-2 border-purple-400"
              : "text-purple-200/60 hover:text-purple-100 hover:bg-purple-800/10 border-l-2 border-transparent"
          )}
        >
          <Settings className="w-[18px] h-[18px]" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
