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
        "relative rounded-3xl bg-neutral-900/40 backdrop-blur-3xl border border-neutral-800/50 shadow-2xl shadow-blue-700/20 p-8 pt-6 ",
        className
      )}
    >
      {children}
    </div>
  );
}