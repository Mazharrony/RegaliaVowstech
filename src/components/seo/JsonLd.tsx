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

const founderPersonId = `${siteUrl}/en/team#sheikh-mohammad-ali`;

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    email: company.email,
    telephone: company.phone,
    foundingDate: String(company.founded),
    founder: {
      "@type": "Person",
      "@id": founderPersonId,
      name: "Sheikh Mohammad Ali",
    },
    sameAs: company.socials.map((s) => s.href),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.line1,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };
}

export function founderPersonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderPersonId,
    name: "Sheikh Mohammad Ali",
    jobTitle: "Founder & Managing Director",
    description:
      "Sheikh Mohammad Ali is the founder and managing director of Regalia Vows Tech, a Dubai-based production and brand studio specialising in brand identity, video production, events and applied technology for UAE founders and operators.",
    url: `${siteUrl}/en/team`,
    worksFor: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: company.name,
      url: siteUrl,
    },
    foundedOrganization: {
      "@type": "Organization",
      name: company.name,
      url: siteUrl,
      foundingDate: String(company.founded),
    },
    knowsAbout: [
      "Brand Identity",
      "Video Production",
      "Corporate Events",
      "Technology & Software",
      "Applied AI",
      "Digital Marketing",
    ],
    sameAs: company.socials.map((s) => s.href),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };
}

export function founderFaqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is the founder of Regalia Vows Tech?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sheikh Mohammad Ali is the founder and managing director of Regalia Vows Tech, a Dubai-based production and brand studio established in 2022.",
        },
      },
      {
        "@type": "Question",
        name: "Who founded Regalia Vows Tech?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Regalia Vows Tech was founded by Sheikh Mohammad Ali in Dubai in 2022. He built the studio around the belief that brand, technology and event production should be handled under one roof.",
        },
      },
      {
        "@type": "Question",
        name: "Who is the CEO of Regalia Vows Tech?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sheikh Mohammad Ali is the founder and managing director of Regalia Vows Tech, based in Dubai, UAE.",
        },
      },
    ],
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.name,
    url: siteUrl,
    image: `${siteUrl}/media/Corporate/coreporate81.JPEG`,
    telephone: company.phone,
    email: company.email,
    priceRange: "$$$",
    currenciesAccepted: "AED",
    paymentAccepted: "Bank Transfer, Credit Card",
    knowsLanguage: ["en", "ar"],
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Production & Brand Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Production" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Events" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event & Expo Branding" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Photography & Content" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Identity" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Marketing & Web" } },
      ],
    },
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

export function faqPageLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: company.name,
      url: siteUrl,
    },
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
    serviceType: "Production & Creative Services",
  };
}

export function videoObjectLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  url,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    url,
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.svg` },
    },
  };
}
