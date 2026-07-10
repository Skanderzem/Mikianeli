import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

export function Badge({ children, tone = "light", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]",
        tone === "dark"
          ? "border-brume/15 bg-ivory/5 text-brume"
          : "border-graphite/10 bg-white/45 text-graphite",
        className,
      )}
    >
      {children}
    </span>
  );
}
