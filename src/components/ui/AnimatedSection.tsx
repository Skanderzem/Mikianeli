import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function AnimatedSection({
  as: Component = "section",
  children,
  className,
}: AnimatedSectionProps) {
  return <Component className={cn("soft-reveal", className)}>{children}</Component>;
}
