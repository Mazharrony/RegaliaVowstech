import { company } from "@/content/company";

type Json = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: Json }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://regaliavowstech.com";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    email: company.email,
    telephone: company.phone,
    foundingDate: String(company.founded),
    sameAs: company.socials.map((s) => s.href),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.line1,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.name,
    url: siteUrl,
    image: `${siteUrl}/og`,
    telephone: company.phone,
    email: company.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.line1,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

export function articleLd({
  title,
  description,
  datePublished,
  author,
  slug,
  locale,
}: {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  slug: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    inLanguage: locale,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.svg` },
    },
    mainEntityOfPage: `${siteUrl}/${locale}/insights/${slug}`,
    image: `${siteUrl}/og?title=${encodeURIComponent(title)}`,
  };
}

export function caseStudyLd({
  title,
  description,
  client,
  year,
  slug,
  locale,
}: {
  title: string;
  description: string;
  client: string;
  year: number;
  slug: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    dateCreated: String(year),
    inLanguage: locale,
    creator: { "@type": "Organization", name: company.name },
    about: client,
    url: `${siteUrl}/${locale}/work/${slug}`,
    image: `${siteUrl}/og?title=${encodeURIComponent(title)}`,
  };
}

export function breadcrumbLd(
  trail: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: t.url,
    })),
  };
}
