"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { readConsent, saveConsent } from "@/lib/consent";
const OPEN_SETTINGS = "mikianeli:cookie-settings";
export function CookieSettings() {
  return (
    <button
      type="button"
      className="cookie-settings"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS))}
    >
      Gérer les cookies
    </button>
  );
}
export function Consent() {
  const [banner, setBanner] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => setBanner(readConsent() === null), 0);
    const open = () => dialog.current?.showModal();
    window.addEventListener(OPEN_SETTINGS, open);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(OPEN_SETTINGS, open);
    };
  }, []);
  function choose(value: "granted" | "denied") {
    saveConsent(value);
    setBanner(false);
    dialog.current?.close();
  }
  const choices = (
    <>
      <button type="button" onClick={() => choose("granted")}>
        Accepter
      </button>
      <button type="button" onClick={() => choose("denied")}>
        Refuser
      </button>
    </>
  );
  return (
    <>
      {banner && (
        <section className="consent-banner" aria-label="Choix des cookies">
          <p>
            <strong>Un mot sur les cookies.</strong>Avec votre accord, Google
            Analytics mesure les visites et les prises de contact. Le site
            fonctionne aussi sans. Votre choix est conservé 6 mois.
          </p>
          <div className="consent-actions">
            {choices}
            <button
              className="consent-details"
              type="button"
              onClick={() => dialog.current?.showModal()}
            >
              Détails
            </button>
          </div>
        </section>
      )}
      <dialog
        ref={dialog}
        className="consent-dialog"
        aria-labelledby="consent-title"
      >
        <button
          className="dialog-close"
          type="button"
          aria-label="Fermer les préférences cookies"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <h2 id="consent-title">Votre choix vous appartient.</h2>
        <p>
          <strong>Fonctionnement du site :</strong> un cookie mémorise votre
          choix pendant 6 mois. Il est nécessaire pour respecter votre
          préférence.
        </p>
        <p>
          <strong>Mesure d’audience, facultative :</strong> Google Analytics 4
          mesure les pages consultées, les clics de contact et les demandes
          envoyées. Aucune donnée saisie dans le formulaire n’est transmise à
          Google Analytics.
        </p>
        <p>
          Vous pouvez refuser ou retirer votre accord à tout moment ici. Les
          cookies Analytics sont alors supprimés et les prochains événements
          sont bloqués.{" "}
          <Link
            href="/politique-confidentialite"
            onClick={() => dialog.current?.close()}
          >
            Lire la politique de confidentialité.
          </Link>
        </p>
        <div className="consent-actions">{choices}</div>
      </dialog>
    </>
  );
}
