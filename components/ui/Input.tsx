"use client";

import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ className, label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-purple-200/70 font-medium">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full rounded-xl border border-purple-700/30 bg-bg-surface/60 px-4 py-2.5 text-purple-100 placeholder:text-purple-300/30",
          "focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20",
          "transition-all duration-300",
          className
        )}
        {...props}
      />
    </div>
  );
}
