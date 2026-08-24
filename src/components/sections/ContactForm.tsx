"use client";

import { useActionState, useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import { getServices } from "@/content/services";
import { AedSymbol } from "@/components/icons/AedSymbol";

const budgets = [
  "< 35k",
  "35k – 110k",
  "110k – 275k",
  "275k – 750k",
  "750k +",
];

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const services = useMemo(() => getServices(locale), [locale]);
  const [state, action, pending] = useActionState<ContactState | null, FormData>(
    submitContact,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state) return;
    if (state.ok) {
      toast.success(t("success"));
      formRef.current?.reset();
    } else {
      toast.error(state.error ?? t("error"));
    }
  }, [state, t]);

  const inputClass =
    "w-full rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-surface-muted)] px-4 py-3.5 font-sans text-base text-[var(--color-ink)] placeholder:text-[var(--color-muted)] transition-shadow focus:outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_25%,transparent)]";

  return (
    <form ref={formRef} action={action} className="space-y-10">
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-10 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-2 block">{t("name")}</span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="eyebrow mb-2 block">{t("email")}</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="eyebrow mb-2 block">{t("company")}</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="eyebrow mb-2 flex items-center gap-2">
            <AedSymbol className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t("budget")}</span>
          </span>
          <select name="budget" className={inputClass} defaultValue="">
            <option value="">{t("selectBudget")}</option>
            {budgets.map((b) => (
              <option key={b} value={`AED ${b}`}>{`AED ${b}`}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="eyebrow mb-2 block">{t("service")}</span>
        <select required name="service" className={inputClass} defaultValue="">
          <option value="" disabled>{t("selectService")}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Multiple / not sure">{t("multipleNotSure")}</option>
        </select>
      </label>

      <label className="block">
        <span className="eyebrow mb-2 block">{t("message")}</span>
        <textarea
          required
          name="message"
          rows={6}
          className={`${inputClass} resize-none`}
        />
      </label>

      <div className="pt-2">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-solid btn-lg"
        >
          {pending ? t("sending") : t("send")}
        </button>
      </div>
    </form>
  );
}
