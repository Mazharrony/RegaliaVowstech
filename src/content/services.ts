export type ServiceSlug =
  | "branding"
  | "marketing"
  | "content-ads"
  | "events-expo"
  | "corporate-events";

export type ServicePackage = {
  /** Short badge label, e.g. "Templates", "Standard", "Premium", "Bespoke". */
  tier: string;
  /** Package name. */
  name: string;
  /**
   * Price expression in AED, e.g. "1–2k", "500–1.5k", "4.5k".
   * Leave undefined for "on request" packages.
   */
  priceFrom?: string;
  /** Billing rhythm. */
  cadence?: "project" | "month" | "one-time";
  /** Small line under the price for add-ons, e.g. "+ AED 700 / mo maintenance". */
  note?: string;
  /** Short positioning sentence. */
  summary: string;
  /** Bullet list of inclusions. */
  includes: string[];
  /** Visually emphasise this card in the grid. */
  highlight?: boolean;
};

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  /** Hero stock image (Unsplash). Shared across locales. */
  image: string;
  deliverables: { name: string; description: string; image?: string }[];
  process: { step: string; title: string; body: string }[];
  packages: ServicePackage[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "branding",
    number: "01",
    title: "Branding & Identity",
    tagline: "Identity systems with intent.",
    summary:
      "Strategy, naming, visual systems and brand guidelines that hold up across a logo, a packaging line and a 30-second film.",
    image:
      "/media/Corporate/coreporate64.JPEG",
    deliverables: [
      { name: "Brand strategy & positioning", description: "Where you play and why you win, set before any design begins." },
      { name: "Naming & verbal identity", description: "Names, tone and messaging that sound unmistakably yours." },
      { name: "Logo & visual system", description: "A flexible mark and visual language built for every surface." },
      { name: "Typography & colour systems", description: "Type and colour rules that keep everything coherent." },
      { name: "Brand guidelines & toolkits", description: "Clear documentation so any team can apply the brand correctly." },
      { name: "Launch collateral", description: "Ready-to-use assets to take the new identity public." },
    ],
    process: [
      { step: "01", title: "Immersion", body: "Stakeholder interviews, audit, competitive review." },
      { step: "02", title: "Strategy", body: "Positioning, voice, narrative platform." },
      { step: "03", title: "Identity", body: "Logo, type, colour and motion." },
      { step: "04", title: "Rollout", body: "Guidelines, templates, on-brand launch assets." },
    ],
    packages: [
      {
        tier: "Bespoke",
        name: "Brand Programme",
        cadence: "project",
        summary:
          "Every brand engagement is scoped to the ambition — from a quick visual refresh to a full naming and identity build.",
        includes: [
          "Discovery & strategy session",
          "Logo & visual system",
          "Type, colour & layout system",
          "Brand guidelines",
          "Launch collateral set",
        ],
      },
    ],
    faqs: [
      { q: "How long does a brand engagement take?", a: "Most identity programmes run six to twelve weeks depending on scope and team availability." },
      { q: "Can you work with our internal designers?", a: "Yes — we frequently embed with in-house teams and hand off systems they can extend." },
    ],
  },
  {
    slug: "marketing",
    number: "02",
    title: "Digital Marketing & Web",
    tagline: "Performance marketing and the websites that convert it.",
    summary:
      "SEO, paid media and social media management plus the websites, e-commerce and platforms behind them — built and run by one team for measurable UAE outcomes.",
    image:
      "/media/Events/DSC08388.jpg",
    deliverables: [
      { name: "Channel strategy & media planning", description: "The right mix of channels and budget mapped to your goals." },
      { name: "SEO & content programmes", description: "Organic visibility that compounds month after month." },
      { name: "Paid social ads (Meta, Instagram, LinkedIn, TikTok, Snap)", description: "Targeted social campaigns built to reach and convert." },
      { name: "Google Ads — Search, Display, Performance Max & YouTube", description: "Intent-driven search and display campaigns across Google." },
      { name: "Social content calendars & publishing", description: "Planned, on-brand posting that keeps you consistently active." },
      { name: "Community management & DM handling", description: "Timely replies and conversations that build loyalty." },
      { name: "Short-form video roadmap (reels / TikTok)", description: "A steady plan for reels and TikToks that travel." },
      { name: "Google Business Profile optimisation", description: "Show up in local search and Maps for the right queries." },
      { name: "Brand awareness & website traffic campaigns", description: "Reach campaigns that grow your audience and visits." },
      { name: "Lead generation funnels & retargeting", description: "Conversion funnels that capture and re-engage prospects." },
      { name: "Landing pages & creative variants", description: "Purpose-built pages and creatives tuned for results." },
      { name: "Measurement & analytics dashboards", description: "Clear reporting that ties spend back to outcomes." },
      { name: "Marketing & e-commerce websites", description: "Fast, conversion-focused sites for brand and sales." },
      { name: "Custom UI/UX design", description: "Interfaces designed around your users and goals." },
      { name: "Payments & shipping integrations", description: "Checkout, payments and delivery wired end-to-end." },
      { name: "Headless CMS & admin dashboards", description: "Flexible content systems and role-based tools your team can own." },
      { name: "POS / ERP & inventory integrations", description: "Connect the platform to the systems and stock flows you already run." },
      { name: "SEO + analytics setup, hosting & maintenance", description: "Search and tracking configured from day one — then kept fast, secure and current." },
    ],
    process: [
      { step: "01", title: "Audit", body: "Funnel, channels, creative, site and attribution review." },
      { step: "02", title: "Plan", body: "Audiences, channel mix, creative territories and tech requirements." },
      { step: "03", title: "Build & Launch", body: "Creative production, site build, campaign setup and go-live." },
      { step: "04", title: "Optimise", body: "Weekly readouts, iteration, maintenance and scale." },
    ],
    packages: [
      {
        tier: "SEO",
        name: "Search Engine Optimisation",
        priceFrom: "500–1.5k",
        cadence: "month",
        summary:
          "On-page, technical and content SEO that compounds your organic traffic month after month.",
        includes: [
          "Keyword & competitor research",
          "On-page + technical fixes",
          "Monthly content & link plan",
          "Search Console + GA4 reporting",
          "Local SEO (Google Business)",
        ],
      },
      {
        tier: "Paid Media",
        name: "Paid Ads — Social & Google",
        priceFrom: "700–2k",
        cadence: "month",
        note: "+ ad spend · AED 700 one-time setup",
        summary:
          "Paid campaigns across Meta, TikTok and Snap plus Google Search, Display, Performance Max and YouTube — strategy, creative, retargeting and weekly optimisation.",
        includes: [
          "One-time account setup",
          "Audience, keyword & bidding strategy",
          "Social + Google ad creative (incl. reels)",
          "Pixel, conversions & remarketing setup",
          "Google Business Profile optimisation",
          "Retargeting & lead-gen funnels",
          "Weekly optimisation + monthly report",
        ],
        highlight: true,
      },
      {
        tier: "Social Management",
        name: "Always-On Social Management",
        priceFrom: "700–2k",
        cadence: "month",
        summary:
          "Always-on social strategy, publishing and community operations that keep your brand active between campaigns.",
        includes: [
          "2–4 managed platforms",
          "Monthly content calendar",
          "Posts, stories and short-form clips",
          "Community moderation + replies",
          "Monthly performance and trend brief",
        ],
      },
      {
        tier: "Templates",
        name: "Template Website",
        priceFrom: "1–2k",
        cadence: "one-time",
        summary:
          "A polished, mobile-ready site built on a proven template — live in days, not months.",
        includes: [
          "Ready-made template setup",
          "Up to 6 pages",
          "Mobile responsive",
          "Contact form + WhatsApp",
          "Basic SEO setup",
          "Hosting handover",
        ],
      },
      {
        tier: "Custom Ecom",
        name: "Custom E-commerce",
        priceFrom: "5–10k",
        cadence: "one-time",
        note: "+ AED 700 / month maintenance",
        summary:
          "A heavily-developed custom e-commerce site with payments, shipping and an admin you'll actually enjoy using.",
        includes: [
          "Custom UI/UX design",
          "Custom e-commerce build",
          "Payments + shipping integrations",
          "Admin dashboard",
          "SEO + analytics + pixels",
          "Bilingual (EN/AR) ready",
          "Monthly maintenance retainer",
        ],
      },
      {
        tier: "Bespoke",
        name: "Custom Operations Platform",
        cadence: "project",
        summary:
          "Custom CMS, inventory and back-office platforms scoped to your catalogue, channels and workflows.",
        includes: [
          "Custom CMS + content workflows",
          "Inventory + warehouse operations",
          "POS / e-commerce / ERP integrations",
          "Backend platform & APIs",
          "Real-time + offline support",
          "Data migration + team training",
          "Ongoing engineering retainer",
        ],
      },
    ],
    faqs: [
      { q: "Is ad spend included?", a: "No — ad spend is paid directly to the platform. Our fee covers strategy, creative, setup, optimisation and reporting." },
      { q: "How long is the minimum engagement?", a: "We recommend a three-month minimum so the algorithms (and our optimisations) have time to compound." },
      { q: "Do you run brand awareness as well as lead-gen?", a: "Yes — we run reach and website-traffic campaigns to build the audience, and conversion-optimised lead-gen and retargeting funnels to close." },
      { q: "Can you handle Google Business Profile?", a: "Yes — we set up, optimise and keep your GBP current so you show up in local search and Maps for the right queries." },
      { q: "Which social platforms do you manage?", a: "Instagram, TikTok, LinkedIn, YouTube, X, Snap and Facebook — we set the channel mix around your audience and goals." },
      { q: "What's the difference between template and custom websites?", a: "Templates ship fast on a proven layout — perfect for small businesses. Custom e-commerce is designed and built for your brand, with deeper integrations and admin tooling." },
      { q: "What does website maintenance cover?", a: "Hosting, security patches, plugin updates, content tweaks (up to 2 hours/month) and uptime monitoring." },
      { q: "Can you integrate with our ERP and migrate legacy data?", a: "Yes — we regularly integrate SAP, Oracle, Odoo and custom systems, including reconciliation and validation before go-live." },
    ],
  },
  {
    slug: "events-expo",
    number: "03",
    title: "Event & Expo Branding",
    tagline: "Booth, promotion, content and engagement — built around four pillars.",
    summary:
      "End-to-end exhibition programs across four pillars — exhibition booth design and branding, exhibition marketing and promotion, content production and media coverage, and brand activation and visitor engagement that turns floor traffic into qualified leads.",
    image:
      "/media/Events/DSC06348.jpg",
    deliverables: [
      { name: "Exhibition booth design & branding", image: "/media/Events/DSC03026.jpg", description: "Custom booth design, exhibition graphics and signage, full booth construction and setup, and promotional materials and giveaways." },
      { name: "Exhibition marketing & promotion", image: "/media/Events/DSC08388.jpg", description: "Social media campaigns, Google advertising, brand awareness activities and digital marketing support around the show." },
      { name: "Content production & media coverage", image: "/media/Events/DSC04362.jpg", description: "Event photography, promotional videos and reels, brand storytelling content, and website and advertising creatives." },
      { name: "Brand activation & visitor engagement", image: "/media/Events/DSC08205.jpg", description: "Professional brand promoters, live product demonstrations, visitor interaction and lead generation, and information and sampling distribution." },
    ],
    process: [
      { step: "01", title: "Booth design & branding", body: "Concept, 3D design, signage, fabrication and on-stand collateral." },
      { step: "02", title: "Marketing & promotion", body: "Pre-show social, Google ads, awareness activities and digital support." },
      { step: "03", title: "Content & coverage", body: "Live photo and video, reels, storytelling and ad creatives from the floor." },
      { step: "04", title: "Activation & engagement", body: "Promoters, demos, lead capture and on-stand sampling through every show day." },
    ],
    packages: [
      {
        tier: "Standard",
        name: "Booth Design & Branding",
        cadence: "project",
        summary:
          "Pillar one on its own — a well-designed, well-built stand with the signage and collateral ready for the floor.",
        includes: [
          "Custom booth design with 3D visuals",
          "Exhibition graphics & signage",
          "Booth construction, setup & dismantle",
          "Promotional materials & branded giveaways",
        ],
      },
      {
        tier: "Premium",
        name: "Booth + Activation",
        cadence: "project",
        highlight: true,
        summary:
          "Booth design and build plus on-floor brand activation — promoters, live demos, lead capture and sampling that turn visitors into qualified contacts.",
        includes: [
          "Everything in Booth Design & Branding",
          "Professional brand promoters & bilingual hosts",
          "Live product demonstrations",
          "QR-driven lead capture into your CRM",
          "Information & sampling distribution",
        ],
      },
      {
        tier: "Bespoke",
        name: "Full Exhibition Program",
        cadence: "project",
        note: "+ ad spend billed at cost",
        summary:
          "All four pillars wrapped around the show — booth, marketing and promotion, content production and on-floor activation, with reporting after.",
        includes: [
          "Everything in Booth + Activation",
          "Social media campaigns pre, during & post",
          "Google Search, Display & YouTube ads",
          "Live event photography, reels & storytelling content",
          "Website & ad creatives produced on-site",
          "Post-event performance report",
        ],
      },
    ],
    faqs: [
      { q: "How are the four pillars structured?", a: "Booth design & branding, exhibition marketing & promotion, content production & media coverage, and brand activation & visitor engagement — picked individually or run together as one program." },
      { q: "Do you handle booth production end-to-end?", a: "Yes — design, fabrication, logistics, install, on-site management and dismantle under a single team." },
      { q: "Which expos do you build for?", a: "We brief and quote per event — GITEX, ADIPEC, Arab Health, Gulfood and brand-owned activations are all in scope. Tell us the show and we'll come back with a fit assessment." },
      { q: "Do you supply the booth staff and promoters?", a: "Yes — trained professional brand promoters, bilingual hosts and a team lead, briefed on your product and key messages before day one." },
      { q: "Can you run the marketing and ads around the show?", a: "Yes — social media campaigns, Google Search, Display and YouTube ads, brand awareness activities and digital marketing support in the weeks before, during and after the event." },
      { q: "What content gets produced on-site?", a: "Daily event photography, promotional videos and reels, brand storytelling pieces and fresh website and advertising creatives — ready for same-day publishing." },
      { q: "How do you capture and hand over leads?", a: "QR codes on the stand and collateral push visitors into a lead form that writes directly into your CRM or a shared sheet, with daily exports during the show." },
      { q: "How is sampling and information distribution handled?", a: "Promoters qualify visitors first, then hand over samples, collateral and follow-up material to the right audience — never just left unattended on a table." },
    ],
  },
  {
    slug: "corporate-events",
    number: "04",
    title: "Corporate Events",
    tagline: "Conferences, launches and internal moments executed end-to-end.",
    summary:
      "Corporate event programmes for summits, product launches, townhalls and gala nights — strategy, production, media capture and post-event communications under one team.",
    image:
      "/media/Events/C95B5961.jpg",
    deliverables: [
      { name: "Stage design & setup", image: "/media/Events/DSC03961.jpg", description: "A stage built around your theme and run-of-show." },
      { name: "Event branding", image: "/media/Events/DSC06328.jpg", description: "Cohesive branding across every touchpoint on the day." },
      { name: "LED screens & displays", image: "/media/Corporate/coreporate66.JPEG", description: "High-impact screens sized for the room." },
      { name: "Sound & lighting", image: "/media/Corporate/coreporate67.JPEG", description: "Audio and lighting that set the right atmosphere." },
      { name: "Banquet management", image: "/media/Events/C95B9242.jpg", description: "Seamless catering and banquet coordination." },
      { name: "Guest experience", image: "/media/Events/C95B5907.jpg", description: "A thoughtful flow from arrival to farewell." },
      { name: "Models & Talent Services", image: "/media/Events/DSC04004.jpg", description: "Professional models and hosts who elevate the occasion." },
      { name: "Corporate gifts", image: "/media/Events/DSC03948.jpg", description: "Curated gifts that leave a lasting impression." },
      { name: "Banners & signage", image: "/media/Events/DSC03457.jpg", description: "Wayfinding and branding that guide every guest." },
      { name: "Photography & videography", image: "/media/Events/KKK_3583.jpg", description: "Full coverage of the moments that matter." },
      { name: "Live streaming", image: "/media/Events/DSC08317.jpg", description: "Broadcast your event to remote audiences." },
      { name: "DJ & entertainment", image: "/media/Events/C95B6812.jpg", description: "Live entertainment that sets the tone." },
      { name: "Influencer marketing", image: "/media/Events/REH09814.jpg", description: "Amplify the event through the right voices." },
    ],
    process: [
      { step: "01", title: "Align", body: "Objectives, audience profile, timeline and success metrics." },
      { step: "02", title: "Design", body: "Theme, agenda, venue layout, stage and technical planning." },
      { step: "03", title: "Deliver", body: "On-site production, coordination, live support and media capture." },
      { step: "04", title: "Extend", body: "Recaps, highlight assets, stakeholder reporting and follow-ups." },
    ],
    packages: [
      {
        tier: "Core",
        name: "Corporate Essentials",
        cadence: "project",
        summary:
          "Production essentials for internal and external corporate gatherings with clean on-site execution.",
        includes: [
          "Run-of-show planning",
          "Stage + AV production",
          "Host and speaker coordination",
          "On-site event manager",
        ],
      },
      {
        tier: "Premium",
        name: "Corporate Plus",
        cadence: "project",
        highlight: true,
        summary:
          "Everything in Essentials plus livestream, capture and polished post-event content.",
        includes: [
          "Everything in Corporate Essentials",
          "Live streaming / hybrid delivery",
          "Photo + video event coverage",
          "Highlight film and recap deck",
        ],
      },
      {
        tier: "Bespoke",
        name: "Enterprise Programme",
        cadence: "project",
        summary:
          "Multi-day and multi-city corporate programmes with dedicated planning and reporting layers.",
        includes: [
          "Multi-day agenda and logistics",
          "Stakeholder and sponsor management",
          "Content production pipeline",
          "Measurement and outcomes report",
        ],
      },
    ],
    faqs: [
      { q: "Do you handle venue and vendor coordination?", a: "Yes — we manage venue fit checks, vendor sourcing and technical coordination end-to-end." },
      { q: "Can you support hybrid events with remote audiences?", a: "Yes — we provide live switching, streaming and recording workflows for hybrid attendance." },
      { q: "Do you provide post-event content packages?", a: "Yes — we deliver recap films, social clips, photo sets and stakeholder-ready reports." },
    ],
  },
  {
    slug: "content-ads",
    number: "06",
    title: "Photo, Video & Live Streaming",
    tagline: "Photo, video, reels and live broadcast — built to perform.",
    summary:
      "In-house photography, videography, livestreaming and graphics for products, teams, events and brand films — with social-first reels, behind-the-scenes, testimonials and broadcast-ready outputs.",
    image:
      "/media/Events/KKK_3583.jpg",
    deliverables: [
      { name: "Professional product & catalogue photography", description: "Crisp product shots ready for store, web and print." },
      { name: "Exhibition booth & event photography", description: "Live coverage that captures the energy of your stand." },
      { name: "Team & portrait photography", description: "Polished headshots and team imagery for any channel." },
      { name: "Highlight films & brand story videos", description: "Cinematic films that tell your story in motion." },
      { name: "Company introduction & culture videos", description: "Show who you are and how you work." },
      { name: "Product demonstration videos", description: "Clear walkthroughs that make features easy to grasp." },
      { name: "Customer testimonial films", description: "Authentic client voices that build trust." },
      { name: "Social-first reels, vertical cuts & behind-the-scenes", description: "Vertical content made to perform on every feed." },
      { name: "Multi-camera live streaming production", description: "Broadcast-quality streams with multiple angles." },
      { name: "On-site 4K switching and live feed operations", description: "Live switching and feed handling, run on-site." },
      { name: "Broadcast distribution and archive recordings", description: "Stream out and keep the full recording afterwards." },
      { name: "Product feature posts & promotional graphics", description: "Branded graphics that sell the detail." },
      { name: "Colour grading & sound mixing", description: "A polished grade and clean audio for a finished look." },
      { name: "Platform-ready exports for social, web and ads", description: "Correctly sized exports for every destination." },
    ],
    process: [
      { step: "01", title: "Brief", body: "Goals, deliverables, look & feel, location." },
      { step: "02", title: "Pre-pro", body: "Shotlist, schedule, crew, equipment." },
      { step: "03", title: "Shoot", body: "On-location capture by photo + video specialists." },
      { step: "04", title: "Post", body: "Edit, grade, sound, platform exports." },
    ],
    packages: [
      {
        tier: "Basic",
        name: "Basic Package",
        priceFrom: "1k",
        cadence: "project",
        summary:
          "One media specialist handling both photo and video — perfect for small events and content drops.",
        includes: [
          "1 media specialist (photo + video)",
          "10 edited photos",
          "1 highlight video covering key moments",
          "Standard turnaround",
        ],
      },
      {
        tier: "Professional",
        name: "Professional Package",
        priceFrom: "1.5k",
        cadence: "project",
        summary:
          "A dedicated photographer plus videographer with both deliverable formats — the most-picked tier for brand events and launches.",
        includes: [
          "1 photographer + 1–2 videographers",
          "All edited images delivered",
          "1 highlight video (horizontal, web-ready)",
          "1 social media reel (vertical, IG / TikTok)",
        ],
        highlight: true,
      },
      {
        tier: "Live",
        name: "Live Streaming Package",
        priceFrom: "4.5k",
        cadence: "project",
        note: "Dubai",
        summary:
          "Multi-camera 4K livestream production with switching, live feed handling and post-event archive delivery.",
        includes: [
          "3 × 4K cameras with operators",
          "4K switcher",
          "Live editing + live feed",
          "Broadcast distribution (optional)",
          "Event recording delivery",
        ],
      },
    ],
    faqs: [
      { q: "How long does delivery take?", a: "Photo selects in 48 hours, full edits and the highlight video within 7–10 days of the shoot." },
      { q: "Can we add extra videographers or shoot days?", a: "Yes — every package can scale up with extra crew, locations or shoot days." },
      { q: "Can you livestream our event as part of production?", a: "Yes — livestream production can be included with multi-camera switching, RTMP delivery and recording handoff." },
      { q: "Do livestream prices include travel outside Dubai?", a: "Listed livestream rates are for Dubai. Travel, accommodation and per diem are quoted separately for other locations." },
    ],
  },
];

import { servicesAr } from "./services.ar";

type Locale = "en" | "ar" | (string & {});

function localize(service: Service, locale?: Locale): Service {
  if (locale !== "ar") return service;
  const ar = servicesAr[service.slug];
  if (!ar) return service;
  return {
    ...service,
    title: ar.title,
    tagline: ar.tagline,
    summary: ar.summary,
    deliverables: service.deliverables.map((d, i) => ({
      ...d,
      name: ar.deliverables[i]?.name ?? d.name,
      description: ar.deliverables[i]?.description ?? d.description,
    })),
    process: service.process.map((p, i) => ({
      step: p.step,
      title: ar.process[i]?.title ?? p.title,
      body: ar.process[i]?.body ?? p.body,
    })),
    packages: service.packages.map((pkg, i) => {
      const arPkg = ar.packages[i];
      if (!arPkg) return pkg;
      return {
        ...pkg,
        tier: arPkg.tier,
        name: arPkg.name,
        summary: arPkg.summary,
        includes: arPkg.includes,
        note: arPkg.note ?? pkg.note,
      };
    }),
    faqs: ar.faqs.length ? ar.faqs : service.faqs,
  };
}

export function getServices(locale?: Locale): Service[] {
  return services.map((s) => localize(s, locale));
}

export function getService(slug: string, locale?: Locale): Service | undefined {
  const found = services.find((s) => s.slug === slug);
  return found ? localize(found, locale) : undefined;
}
