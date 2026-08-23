import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/content/services";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://regaliavowstech.com";

const staticPaths = [
  "",
  "/services",
  "/about",
  "/team",
  "/process",
  "/contact",
  "/models",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      const isLegal = p.startsWith("/legal");
      entries.push({
        url: `${base}/${locale}${p}`,
        changeFrequency: "monthly",
        priority: p === "" ? 1 : isLegal ? 0.3 : 0.7,
        alternates: {
          languages: {
            en: `${base}/en${p}`,
            ar: `${base}/ar${p}`,
          },
        },
      });
    }
    for (const s of services) {
      entries.push({
        url: `${base}/${locale}/services/${s.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            en: `${base}/en/services/${s.slug}`,
            ar: `${base}/ar/services/${s.slug}`,
          },
        },
      });
    }
  }
  return entries;
}
