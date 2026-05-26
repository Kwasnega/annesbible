"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  motionProps?: React.ComponentProps<typeof motion.div>;
}

export function GlassCard({ children, className, elevated = false, motionProps, ...props }: GlassCardProps) {
  const Comp = motionProps ? motion.div : "div";
  return (
    <Comp
      className={cn(
        elevated ? "glass-card-elevated" : "glass-card",
        "transition-all duration-200 ease-out",
        "active:scale-[0.985] active:bg-purple-800/10",
        className
      )}
      {...(motionProps as any)}
      {...props}
    >
      {children}
    </Comp>
  );
}
