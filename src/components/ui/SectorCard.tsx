type SectorCardProps = {
  title: string;
  context: string;
  stakes: string;
  outcome: string;
};

export function SectorCard({ title, context, stakes, outcome }: SectorCardProps) {
  return (
    <article className="rounded-card border border-graphite/10 bg-ivory p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-sand/60">
      <h3 className="font-display text-xl font-semibold leading-snug text-ink">{title}</h3>
      <dl className="mt-6 space-y-5 text-sm leading-7">
        <div>
          <dt className="font-semibold text-graphite">Contexte</dt>
          <dd className="mt-1 text-stone">{context}</dd>
        </div>
        <div>
          <dt className="font-semibold text-graphite">Enjeux</dt>
          <dd className="mt-1 text-stone">{stakes}</dd>
        </div>
        <div>
          <dt className="font-semibold text-graphite">Résultat recherché</dt>
          <dd className="mt-1 text-stone">{outcome}</dd>
        </div>
      </dl>
    </article>
  );
}
