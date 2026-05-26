"use client";

import { cn } from "@/lib/utils/cn";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export function GlassCard({ children, className, elevated = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        elevated ? "glass-card-elevated" : "glass-card",
        "transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
