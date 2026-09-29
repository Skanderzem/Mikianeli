import type { ReactNode } from "react";
import { Container } from "./Container";
import { PageIntro } from "@/components/ui/Editorial";
export function LegalPageLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main id="main-content">
      <PageIntro label="Informations légales" title={title}>
        {description}
      </PageIntro>
      <section className="section paper">
        <Container>
          <div className="prose-legal">{children}</div>
        </Container>
      </section>
    </main>
  );
}
