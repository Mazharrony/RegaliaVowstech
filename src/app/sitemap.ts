import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/content/services";
import { work } from "@/content/work";
import { insights } from "@/content/insights";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://regaliavowstech.com";

const staticPaths = [
  "",
  "/services",
  "/work",
  "/about",
  "/process",
  "/insights",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${base}/${locale}${p}`,
        changeFrequency: "monthly",
        priority: p === "" ? 1 : 0.7,
      });
    }
    for (const s of services) {
      entries.push({ url: `${base}/${locale}/services/${s.slug}`, priority: 0.8 });
    }
    for (const w of work) {
      entries.push({ url: `${base}/${locale}/work/${w.slug}`, priority: 0.8 });
    }
    for (const i of insights) {
      entries.push({ url: `${base}/${locale}/insights/${i.slug}`, priority: 0.6 });
    }
  }
  return entries;
}
