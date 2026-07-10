import { cn } from "@/lib/utils";

type MethodStepProps = {
  title: string;
  text: string;
  index: number;
  tone?: "light" | "dark";
};

export function MethodStep({ title, text, index, tone = "light" }: MethodStepProps) {
  return (
    <article className="relative pl-14">
      <div
        className={cn(
          "absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border font-display text-sm font-semibold",
          tone === "dark"
            ? "border-sand/50 bg-sand text-ink"
            : "border-sand/50 bg-ink text-ivory",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3
        className={cn(
          "font-display text-xl font-semibold leading-snug",
          tone === "dark" ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h3>
      <p className={cn("mt-3 text-sm leading-7", tone === "dark" ? "text-brume/76" : "text-stone")}>
        {text}
      </p>
    </article>
  );
}
