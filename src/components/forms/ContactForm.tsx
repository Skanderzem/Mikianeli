"use client";
import { type FormEvent, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { getAttribution, trackGenerateLead } from "@/lib/analytics";
import {
  contactLimits,
  contactNeeds,
  validateContact,
  type ContactFields,
  type FieldErrors,
} from "@/lib/contact";
import { siteConfig } from "@/lib/site";
import { Arrow } from "@/components/ui/ButtonLink";
const initial: ContactFields = {
  name: "",
  company: "",
  email: "",
  need: "",
  message: "",
};
export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);
  const startedAt = useRef(0);
  const requestId = useRef("");
  useEffect(() => {
    startedAt.current = Date.now();
    requestId.current = crypto.randomUUID();
  }, []);
  useEffect(() => {
    if (success) statusRef.current?.focus();
  }, [success]);
  function update(field: keyof ContactFields, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerError("");
    requestId.current = crypto.randomUUID();
  }
  function focusError(next: FieldErrors) {
    const key = Object.keys(next)[0];
    if (key)
      formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current || success) return;
    const validation = validateContact(form);
    setErrors(validation.fieldErrors);
    setServerError("");
    if (!validation.valid) {
      focusError(validation.fieldErrors);
      return;
    }
    sendingRef.current = true;
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          ...validation.payload,
          website: new FormData(event.currentTarget).get("website") || "",
          startedAt: startedAt.current,
          requestId: requestId.current,
          attribution: getAttribution(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (
        !response.ok ||
        result.ok !== true ||
        typeof result.receipt !== "string" ||
        !result.receipt
      ) {
        if (result.fieldErrors) {
          setErrors(result.fieldErrors);
          focusError(result.fieldErrors);
        }
        setServerError(
          response.status === 429
            ? "Trop de tentatives. Patientez une minute avant de réessayer."
            : response.status === 400 && result.error
              ? result.error
              : "L’envoi n’a pas pu être confirmé. Vos informations sont conservées : réessayez ou écrivez-moi directement.",
        );
        return;
      }
      trackGenerateLead();
      setSuccess(true);
      setForm(initial);
    } catch {
      setServerError(
        "L’envoi n’a pas pu être confirmé. Vos informations sont conservées : réessayez ou écrivez-moi directement.",
      );
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }
  if (success)
    return (
      <div
        ref={statusRef}
        className="contact-form form-success"
        tabIndex={-1}
        role="status"
      >
        <p className="eyebrow">Message transmis</p>
        <h2>Merci pour votre confiance.</h2>
        <p>
          Votre demande a bien été envoyée. Je reviendrai vers vous à l’adresse
          indiquée pour parler de votre acquisition.
        </p>
        <Link href="/resultats">Découvrir mes résultats en attendant →</Link>
      </div>
    );
  const input = (
    name: "name" | "company" | "email",
    label: string,
    autoComplete: string,
    required = false,
  ) => (
    <div className="field">
      <label htmlFor={name}>
        {label} {required ? "*" : <span>(facultatif)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={name === "email" ? "email" : "text"}
        autoComplete={autoComplete}
        required={required}
        maxLength={contactLimits[name]}
        value={form[name]}
        onChange={(e) => update(name, e.target.value)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p className="field-error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );
  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-label="Votre demande d’accompagnement"
      aria-busy={sending}
    >
      <h2 className="form-heading">Votre situation, en quelques mots.</h2>
      <p className="form-note">
        Les champs marqués * sont nécessaires pour vous répondre.
      </p>
      <div className="form-row">
        {input("name", "Nom", "name", true)}
        {input("company", "Entreprise", "organization")}
      </div>
      {input("email", "Email", "email", true)}
      <div className="field">
        <label htmlFor="need">
          Besoin <span>(facultatif)</span>
        </label>
        <select
          id="need"
          name="need"
          value={form.need}
          onChange={(e) => update("need", e.target.value)}
          aria-invalid={!!errors.need}
          aria-describedby={errors.need ? "need-error" : undefined}
        >
          <option value="">Sélectionner votre besoin</option>
          {contactNeeds.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
        {errors.need && (
          <p className="field-error" id="need-error">
            {errors.need}
          </p>
        )}
      </div>
      <div className="field">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={contactLimits.message}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Votre activité, vos objectifs, ce qui bloque aujourd’hui…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p className="field-error" id="message-error">
            {errors.message}
          </p>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      {serverError && (
        <p role="alert" className="form-error">
          {serverError}{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      )}
      <button
        className="button button-primary"
        type="submit"
        disabled={sending}
      >
        {sending ? "Envoi en cours…" : "Envoyer mon message"}
        <Arrow />
      </button>
      <p className="privacy-note">
        Iskander Zemouri utilise ces informations pour répondre à votre demande
        et préparer un éventuel accompagnement. Aucun abonnement à une liste de
        diffusion.{" "}
        <Link href="/politique-confidentialite">
          Données, conservation et droits.
        </Link>
      </p>
      <noscript>
        <p>
          JavaScript est nécessaire pour envoyer ce formulaire. Vous pouvez
          écrire à {siteConfig.email}.
        </p>
      </noscript>
    </form>
  );
}
