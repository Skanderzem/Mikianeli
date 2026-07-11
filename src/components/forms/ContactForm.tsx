"use client";

import { type FormEvent, useState } from "react";
import { buttonStyles } from "@/components/ui/ButtonLink";
import { trackGenerateLead } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const objectives = [
  "Générer plus de demandes qualifiées",
  "Améliorer mon site",
  "Lancer des campagnes",
  "Mieux suivre les conversions",
  "Clarifier mon offre",
  "Structurer mon acquisition",
  "Autre",
];

const sectors = [
  "Habitat, travaux et rénovation",
  "Médecine esthétique",
  "Centre laser ou soins techniques",
  "Kiné, sport-santé ou paramédical",
  "Commerce local",
  "PME ou service spécialisé",
  "Autre",
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  sector: string;
  objective: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type ContactApiResponse = {
  error?: string;
  fieldErrors?: Errors;
};

const genericErrorMessage =
  "Une erreur est survenue pendant l’envoi. Vous pouvez aussi nous écrire directement à";

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  sector: sectors[0],
  objective: objectives[0],
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerError("");
    setSuccess(false);
  }

  function validate() {
    const nextErrors: Errors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Indiquez votre nom.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Indiquez votre email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Indiquez un email valide.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Décrivez brièvement votre situation.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);
    setServerError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => ({}))) as ContactApiResponse;

      if (!response.ok) {
        if (payload.fieldErrors) {
          setErrors(payload.fieldErrors);
        }

        setServerError(genericErrorMessage);
        return;
      }

      trackGenerateLead();
      setSuccess(true);
      setForm(initialState);
    } catch {
      setServerError(genericErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-card border border-graphite/10 bg-white/62 p-5 shadow-soft sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Nom"
          name="name"
          value={form.name}
          error={errors.name}
          required
          onChange={(value) => updateField("name", value)}
        />
        <TextField
          label="Entreprise"
          name="company"
          value={form.company}
          onChange={(value) => updateField("company", value)}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          error={errors.email}
          required
          onChange={(value) => updateField("email", value)}
        />
        <TextField
          label="Téléphone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(value) => updateField("phone", value)}
        />
        <TextField
          label="Site web actuel"
          name="website"
          type="url"
          value={form.website}
          placeholder="https://"
          onChange={(value) => updateField("website", value)}
        />
        <SelectField
          label="Secteur d’activité"
          name="sector"
          value={form.sector}
          options={sectors}
          onChange={(value) => updateField("sector", value)}
        />
      </div>

      <SelectField
        label="Objectif principal"
        name="objective"
        value={form.objective}
        options={objectives}
        className="mt-5"
        onChange={(value) => updateField("objective", value)}
      />

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-semibold text-graphite">
          Message <span className="text-sand-dark">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          required
          rows={6}
          onChange={(event) => updateField("message", event.target.value)}
          className={cn(
            "mt-2 w-full rounded-2xl border bg-ivory px-4 py-3 text-base text-ink outline-none transition focus:border-sand focus:ring-4 focus:ring-sand/20",
            errors.message ? "border-red-700" : "border-graphite/12",
          )}
        />
        {errors.message ? <p className="mt-2 text-sm text-red-800">{errors.message}</p> : null}
      </div>

      {success ? (
        <p
          role="status"
          className="mt-5 rounded-2xl border border-sand/45 bg-sand/16 px-4 py-3 text-sm font-medium leading-6 text-ink"
        >
          Merci, votre demande a bien été envoyée. Nous reviendrons vers vous pour comprendre votre
          situation et vos priorités.
        </p>
      ) : null}

      {serverError ? (
        <p
          role="alert"
          className="mt-5 rounded-2xl border border-red-900/20 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-900"
        >
          {serverError}{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      ) : null}

      <button type="submit" disabled={isSubmitting} className={buttonStyles("primary", "mt-6 w-full disabled:cursor-not-allowed disabled:opacity-65")}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>

      <p className="mt-4 text-center text-sm leading-6 text-stone">
        Vous pouvez aussi nous écrire directement à{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-semibold text-sand-dark underline underline-offset-4">
          {siteConfig.email}
        </a>
        .
      </p>
    </form>
  );
}

type TextFieldProps = {
  label: string;
  name: keyof FormState;
  value: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

function TextField({
  label,
  name,
  value,
  type = "text",
  placeholder,
  error,
  required,
  onChange,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-graphite">
        {label} {required ? <span className="text-sand-dark">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mt-2 w-full rounded-2xl border bg-ivory px-4 py-3 text-base text-ink outline-none transition focus:border-sand focus:ring-4 focus:ring-sand/20",
          error ? "border-red-700" : "border-graphite/12",
        )}
      />
      {error ? <p className="mt-2 text-sm text-red-800">{error}</p> : null}
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: keyof FormState;
  value: string;
  options: string[];
  className?: string;
  onChange: (value: string) => void;
};

function SelectField({ label, name, value, options, className, onChange }: SelectFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-semibold text-graphite">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-graphite/12 bg-ivory px-4 py-3 text-base text-ink outline-none transition focus:border-sand focus:ring-4 focus:ring-sand/20"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
