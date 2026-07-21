"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { buttonClassName } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/data/site";
import { contactFormSchema, type ContactFormData, type ContactFormInput } from "@/lib/contact/schema";
import type { ContactApiResponse } from "@/lib/contact/types";

const fieldClassName =
  "min-h-12 w-full rounded-[4px] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--muted-foreground)] focus:border-[color:var(--foreground)] aria-[invalid=true]:border-red-500";

type SubmissionStatus = { type: "success" | "error"; message: string } | null;

export function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormData) {
    setSubmissionStatus(null);

    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await result.json()) as ContactApiResponse;

      if (!result.ok || !payload.ok) {
        if (payload.fieldErrors) {
          for (const [field, messages] of Object.entries(payload.fieldErrors)) {
            const message = messages[0];
            if (message && field in values) {
              setError(field as keyof ContactFormInput, { type: "server", message });
            }
          }
        }
        setSubmissionStatus({ type: "error", message: payload.message });
        return;
      }

      reset();
      setSubmissionStatus({ type: "success", message: payload.message });
    } catch {
      setSubmissionStatus({
        type: "error",
        message: "We could not connect to the message service. Please try again or email us directly.",
      });
    }
  }

  return (
    <form
      noValidate
      aria-busy={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-5 sm:p-6"
    >
      <div className="grid gap-5">
        <Field label="Name" error={errors.name?.message} required>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClassName}
            placeholder="Your name"
          />
        </Field>

        <Field label="Email" error={errors.email?.message} required>
          <input
            {...register("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClassName}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="Company" error={errors.company?.message}>
          <input
            {...register("company")}
            type="text"
            autoComplete="organization"
            maxLength={120}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "contact-company-error" : undefined}
            className={fieldClassName}
            placeholder="Company or team (optional)"
          />
        </Field>

        <Field label="Subject" error={errors.subject?.message} required>
          <input
            {...register("subject")}
            type="text"
            maxLength={160}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            className={fieldClassName}
            placeholder="What would you like to discuss?"
          />
        </Field>

        <Field label="Message" error={errors.message?.message} required>
          <textarea
            {...register("message")}
            rows={7}
            maxLength={5000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${fieldClassName} min-h-44 resize-y py-3`}
            placeholder="Tell us about the product, partnership, or problem you are working on."
          />
        </Field>

        <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" {...register("website")} type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <p className="text-[11px] leading-5 text-[color:var(--muted-foreground)]">
          By sending this form, you agree that we may use your details to respond to your enquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-[color:var(--foreground)]">
            privacy notice
          </Link>
          .
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClassName({ variant: "primary", className: "mt-1 w-full disabled:cursor-wait disabled:opacity-55" })}
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>

        {submissionStatus ? (
          <p
            role={submissionStatus.type === "error" ? "alert" : "status"}
            aria-live={submissionStatus.type === "error" ? "assertive" : "polite"}
            className={submissionStatus.type === "success" ? "text-sm leading-6 text-emerald-500" : "text-sm leading-6 text-red-500"}
          >
            {submissionStatus.message}{" "}
            {submissionStatus.type === "error" ? (
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline underline-offset-4">
                Email {CONTACT_EMAIL}
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  required = false,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const id = `contact-${label.toLowerCase()}-error`;

  return (
    <label className="grid gap-2 text-sm font-medium text-[color:var(--foreground)]">
      <span>
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className="text-[color:var(--muted-foreground)]"> (optional)</span>}
      </span>
      {children}
      {error ? (
        <span id={id} className="text-xs font-normal leading-5 text-red-500">
          {error}
        </span>
      ) : null}
    </label>
  );
}

