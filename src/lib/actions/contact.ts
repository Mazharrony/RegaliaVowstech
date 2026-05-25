"use server";

import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().min(1).max(80),
  budget: z.string().max(60).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  honeypot: z.string().max(0).optional(),
});

export type ContactState = {
  ok: boolean;
  error?: string;
};

export async function submitContact(
  _prev: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const data = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }
  if (parsed.data.honeypot) {
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@regaliavowstech.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Regalia Studio <studio@regaliavowstech.com>";

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY missing — skipping send", parsed.data);
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { name, email, company, service, budget, message } = parsed.data;

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New brief — ${name} (${service})`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Service: ${service}`,
        `Budget: ${budget || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    return { ok: true };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { ok: false, error: "Something went wrong sending your message." };
  }
}
