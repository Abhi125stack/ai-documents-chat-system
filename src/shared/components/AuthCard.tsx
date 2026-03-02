"use client";

import { cn } from "@/lib/utils";

export function AuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-3xl bg-[#111927]/40 backdrop-blur-3xl border border-slate-800/50 shadow-2xl p-8 pt-6 ",
        className
      )}
    >
      {children}
    </div>
  );
}