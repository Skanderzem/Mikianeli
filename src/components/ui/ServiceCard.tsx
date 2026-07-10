import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  text: string;
  index?: number;
  tone?: "light" | "dark";
};

export function ServiceCard({ title, text, index, tone = "light" }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group rounded-card border p-6 transition duration-200",
        tone === "dark"
          ? "border-ivory/10 bg-graphite text-ivory hover:border-sand/45"
          : "border-graphite/10 bg-white/55 text-ink shadow-soft hover:-translate-y-1 hover:border-sand/60",
      )}
    >
      {typeof index === "number" ? (
        <span
          className={cn(
            "mb-8 block font-display text-sm font-semibold",
            tone === "dark" ? "text-sand" : "text-sand-dark",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <h3 className="font-display text-xl font-semibold leading-snug">{title}</h3>
      <p
        className={cn(
          "mt-4 text-sm leading-7",
          tone === "dark" ? "text-brume/76" : "text-stone",
        )}
      >
        {text}
      </p>
    </article>
  );
}
