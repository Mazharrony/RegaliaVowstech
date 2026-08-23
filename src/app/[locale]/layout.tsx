import type { Metadata, Viewport } from "next";
import {
  Inter_Tight,
  Inter,
  JetBrains_Mono,
  IBM_Plex_Sans_Arabic,
  Playfair_Display,
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://regaliavowstech.com";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-monogram",
  display: "swap",
  weight: ["500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
  colorScheme: "light",
  themeColor: "#ffffff",
};

const defaultTitle = "Regalia Vows Tech — Production House Dubai, UAE";
const defaultDescription =
  "Dubai-based production house specialising in video production, corporate events, event branding, photography and brand films across the UAE and MENA.";
const defaultKeywords = [
  "production house Dubai",
  "video production Dubai",
  "corporate video production UAE",
  "event production company Dubai",
  "brand film Dubai",
  "photography studio Dubai",
  "content creation agency UAE",
  "corporate photography Dubai",
  "advertising production UAE",
  "event branding Dubai",
  "media production UAE",
  "corporate events Dubai",
  "expo branding UAE",
  "brand identity Dubai",
  "digital marketing Dubai",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === "ar" ? "ar_AE" : "en_AE";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: "%s — Regalia Vows Tech",
    },
    description: defaultDescription,
    keywords: defaultKeywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Regalia Vows Tech",
      title: defaultTitle,
      description: defaultDescription,
      locale: ogLocale,
      url: `${siteUrl}/${locale}`,
      images: [{ url: "/og", width: 1200, height: 630, alt: "Regalia Vows Tech — Production House Dubai" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@regaliavowstech",
      title: defaultTitle,
      description: defaultDescription,
      images: ["/media/Corporate/coreporate81.JPEG"],
    },
  };
}

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
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} ${plexArabic.variable} ${playfair.variable}`}
    >
      <body className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)] antialiased">
        <JsonLd data={organizationLd()} />
        <JsonLd data={localBusinessLd()} />
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-ink)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[var(--color-bg)]"
          >
            {tCommon("skipToContent")}
          </a>
          <Header />
          <main id="main" className="relative z-10 pt-16 md:pt-[72px]">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--color-surface-elevated)",
                color: "var(--color-ink)",
                border: "1px solid var(--color-line)",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-sans)",
                backdropFilter: "saturate(180%) blur(22px)",
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
