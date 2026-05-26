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
      <div className="p-6 pb-4">
        <h1 className="font-cormorant text-xl font-semibold text-purple-100 leading-tight">
          Anne&apos;s Purple Bible Space
        </h1>
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
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
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
            "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
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
