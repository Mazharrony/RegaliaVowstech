import type { Metadata, Viewport } from "next";
import {
  Inter_Tight,
  Inter,
  JetBrains_Mono,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Toaster } from "sonner";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd, organizationLd, localBusinessLd } from "@/components/seo/JsonLd";
import "../globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://regaliavowstech.com"
  ),
  title: {
    default: "Regalia Vows Tech — Brand, Technology & Experiences",
    template: "%s — Regalia Vows Tech",
  },
  description:
    "A Dubai-based studio partnering with ambitious teams on branding, marketing, software, automation and unforgettable expo experiences.",
  openGraph: {
    type: "website",
    siteName: "Regalia Vows Tech",
    images: [{ url: "/og", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og"] },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tCommon = await getTranslations({ locale, namespace: "common" });
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} ${plexArabic.variable}`}
    >
      <body className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        <JsonLd data={organizationLd()} />
        <JsonLd data={localBusinessLd()} />
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-ink)] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-[var(--color-bg)]"
          >
            {tCommon("skipToContent")}
          </a>
          <Header />
          <main id="main" className="relative z-10 pt-16 md:pt-20">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--color-ink)",
                color: "var(--color-bg)",
                border: "1px solid var(--color-ink-soft)",
                fontFamily: "var(--font-sans)",
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
