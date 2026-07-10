import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "sand" | "light";

export function buttonStyles(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
    variant === "primary" &&
      "bg-ink text-ivory shadow-[0_16px_34px_rgba(11,15,20,0.16)] hover:bg-graphite focus-visible:outline-sand",
    variant === "secondary" &&
      "border border-ink/15 bg-transparent text-ink hover:border-sand hover:text-graphite focus-visible:outline-sand",
    variant === "sand" &&
      "bg-sand text-ivory shadow-[0_14px_34px_rgba(30,123,255,0.28)] hover:bg-[#38BDF8] hover:text-ink focus-visible:outline-ivory",
    variant === "light" &&
      "border border-ivory/18 bg-ivory/5 text-ivory hover:border-sand hover:text-sand focus-visible:outline-sand",
    className,
  );
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
};

export function ButtonLink({ href, children, variant, className, ...props }: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonStyles(variant, className)} {...props}>
      {children}
    </Link>
  );
}
