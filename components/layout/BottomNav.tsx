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

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-glass-border safe-area-pb">
      <div className="flex items-center justify-around px-1 pt-1 pb-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 min-w-[52px]",
                isActive
                  ? "text-purple-300"
                  : "text-purple-200/40 active:text-purple-200/70"
              )}
            >
              <Icon
                className={cn(
                  "w-[22px] h-[22px]",
                  isActive && "drop-shadow-[0_0_8px_rgba(196,168,236,0.5)]"
                )}
              />
              <span className="text-[11px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
