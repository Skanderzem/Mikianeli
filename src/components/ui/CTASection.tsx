import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/layout/Container";

type CTASectionProps = {
  title: string;
  text: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title,
  text,
  primaryLabel = "Demander un diagnostic",
  primaryHref = "/contact",
  secondaryLabel = "Nous contacter",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="bg-ink py-20 text-ivory sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-sand">
              Diagnostic
            </p>
            <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brume/78 sm:text-lg">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ButtonLink href={primaryHref} variant="sand">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink href={secondaryHref} variant="light">
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
