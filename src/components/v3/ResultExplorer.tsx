"use client";
import { useState } from "react";
import Link from "next/link";
import { results } from "@/lib/results";
import { Arrow } from "@/components/ui/ButtonLink";
export function ResultExplorer() {
  const [index, setIndex] = useState(0);
  const selected = [results[0], results[2], results[1]];
  const result = selected[index];
  return (
    <div className="result-explorer" data-reveal>
      <div className="case-tabs" aria-label="Choisir un résultat">
        {selected.map((r, i) => (
          <button
            key={r.id}
            onClick={() => setIndex(i)}
            aria-pressed={index === i}
            aria-controls="selected-case"
          >
            <span>0{i + 1}</span>
            {r.category}
            <Arrow diagonal />
          </button>
        ))}
      </div>
      <div
        className="selected-case"
        id="selected-case"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="case-metric" key={result.id}>
          <span className="micro">{result.qualifier}</span>
          <strong>{result.value}</strong>
          <span>{result.label}</span>
        </div>
        <div className="case-content" key={`copy-${result.id}`}>
          <span className="eyebrow">Mission anonymisée</span>
          <h3>{result.title}</h3>
          <p>{result.action}</p>
          <Link className="text-link" href={`/resultats#${result.id}`}>
            Lire le résultat et son contexte <Arrow diagonal />
          </Link>
        </div>
      </div>
    </div>
  );
}
