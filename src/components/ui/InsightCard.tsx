import { cn } from "@/lib/utils";

type InsightCardProps = {
  label: string;
  title: string;
  text: string;
  tone?: "light" | "dark";
};

export function InsightCard({ label, title, text, tone = "light" }: InsightCardProps) {
  return (
    <article
      className={cn(
        "rounded-card border p-6",
        tone === "dark" ? "border-ivory/10 bg-ivory/5" : "border-graphite/10 bg-white/50 shadow-soft",
      )}
    >
      <p className={cn("text-xs font-semibold uppercase tracking-[0.14em]", tone === "dark" ? "text-sand" : "text-sand-dark")}>
        {label}
      </p>
      <h3 className={cn("mt-5 font-display text-xl font-semibold", tone === "dark" ? "text-ivory" : "text-ink")}>
        {title}
      </h3>
      <p className={cn("mt-3 text-sm leading-7", tone === "dark" ? "text-brume/76" : "text-stone")}>{text}</p>
    </article>
  );
}
