"use client";

import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className, animate = true }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-purple-800/20",
        animate && "animate-breathe",
        className
      )}
    />
  );
}
