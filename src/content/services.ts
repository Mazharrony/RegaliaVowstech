export type ServiceSlug =
  | "branding"
  | "marketing"
  | "social-media"
  | "content-ads"
  | "live-streaming"
  | "web-mobile"
  | "custom-cms-inventory"
  | "events-expo";

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
  deliverables: string[];
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
    deliverables: [
      "Brand strategy & positioning",
      "Naming & verbal identity",
      "Logo & visual system",
      "Typography & colour systems",
      "Brand guidelines & toolkits",
      "Launch collateral",
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
    title: "Digital & Local Marketing",
    tagline: "Performance and presence — earned and paid.",
    summary:
      "Search, social and Google Ads programmes tuned for UAE audiences — clear pricing, weekly optimisation and measurable outcomes.",
    deliverables: [
      "Channel strategy & media planning",
      "SEO & content programmes",
      "Paid social ads (Meta, Instagram, LinkedIn, TikTok, Snap)",
      "Google Ads — Search, Display, Performance Max & YouTube",
      "Google Business Profile optimisation",
      "Brand awareness & website traffic campaigns",
      "Lead generation funnels & retargeting",
      "Landing pages & creative variants",
      "Measurement & analytics dashboards",
    ],
    process: [
      { step: "01", title: "Audit", body: "Funnel, channels, creative and attribution review." },
      { step: "02", title: "Plan", body: "Audiences, channel mix, creative territories." },
      { step: "03", title: "Launch", body: "Setup, creative production, campaign go-live." },
      { step: "04", title: "Optimise", body: "Weekly readouts, iteration, scale." },
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
        tier: "Social Ads",
        name: "Social Media Marketing",
        priceFrom: "700–2k",
        cadence: "month",
        note: "+ ad spend · AED 700 one-time setup",
        summary:
          "Paid social campaigns on Meta, Instagram, LinkedIn, TikTok and Snap — strategy, creative, retargeting and weekly optimisation.",
        includes: [
          "One-time account setup",
          "Audience & creative strategy",
          "Ad creative production (incl. reels)",
          "Pixel + conversions setup",
          "Retargeting & lead-gen funnels",
          "Weekly optimisation",
          "Monthly performance report",
        ],
        highlight: true,
      },
      {
        tier: "Google Ads",
        name: "Google Ads Management",
        priceFrom: "700–2k",
        cadence: "month",
        note: "+ ad spend · AED 700 one-time setup",
        summary:
          "Search, Display, Performance Max and YouTube campaigns built around your conversion goals, with Google Business Profile tuned for local visibility.",
        includes: [
          "One-time account setup",
          "Keyword + bidding strategy",
          "Search, Display & YouTube creative",
          "Google Business Profile optimisation",
          "Conversion tracking & remarketing",
          "Weekly optimisation",
          "Monthly performance report",
        ],
      },
    ],
    faqs: [
      { q: "Is ad spend included?", a: "No — ad spend is paid directly to the platform. Our fee covers strategy, creative, setup, optimisation and reporting." },
      { q: "How long is the minimum engagement?", a: "We recommend a three-month minimum so the algorithms (and our optimisations) have time to compound." },
      { q: "Do you run brand awareness as well as lead-gen?", a: "Yes — we run reach and website-traffic campaigns to build the audience, and conversion-optimised lead-gen and retargeting funnels to close." },
      { q: "Can you handle Google Business Profile?", a: "Yes — we set up, optimise and keep your GBP current so you show up in local search and Maps for the right queries." },
    ],
  },
  {
    slug: "social-media",
    number: "03",
    title: "Social Media Management",
    tagline: "Always-on presence that compounds.",
    summary:
      "Strategy, calendars and community management across the platforms that matter for your audience.",
    deliverables: [
      "Channel strategy & audience mapping",
      "Content calendars & publishing",
      "Community management & DMs",
      "Short-form video (reels / TikTok)",
      "Monthly insight reports",
      "Creative iteration & refresh",
    ],
    process: [
      { step: "01", title: "Position", body: "Voice, pillars, audience and channel-fit." },
      { step: "02", title: "Plan", body: "Monthly calendar, formats and creative briefs." },
      { step: "03", title: "Publish", body: "Cadence, community, light amplification." },
      { step: "04", title: "Iterate", body: "Monthly readouts and creative refresh." },
    ],
    packages: [
      {
        tier: "Starter",
        name: "Always-On Starter",
        priceFrom: "700",
        cadence: "month",
        summary: "Two platforms, eight posts a month — consistent presence on a tight budget.",
        includes: [
          "2 platforms managed",
          "8 posts / month",
          "Basic community replies",
          "Monthly insight report",
        ],
      },
      {
        tier: "Standard",
        name: "Studio Cadence",
        priceFrom: "1.2k",
        cadence: "month",
        summary: "Three platforms, stories and short-form video — the sweet spot for most brands.",
        includes: [
          "3 platforms managed",
          "16 posts + 8 stories / month",
          "2 short-form videos / month",
          "Active community management",
          "Monthly trend brief",
        ],
        highlight: true,
      },
      {
        tier: "Pro",
        name: "Pro Newsroom",
        priceFrom: "2k",
        cadence: "month",
        summary: "Four platforms, full reels and daily community ops.",
        includes: [
          "4 platforms managed",
          "24 posts + 12 stories / month",
          "6 reels / TikToks / month",
          "Daily community management",
          "Influencer outreach (light)",
          "Bi-weekly creative review",
        ],
      },
    ],
    faqs: [
      { q: "Which platforms do you run?", a: "Instagram, TikTok, LinkedIn, YouTube, X, Snap and Facebook — primary mix is tuned to your audience." },
      { q: "Do you handle paid ads too?", a: "Yes — see our Digital & Local Marketing service for paid social and Google Ads management." },
    ],
  },
  {
    slug: "content-ads",
    number: "04",
    title: "Photo & Video Production",
    tagline: "Photo, video and reels — built to perform.",
    summary:
      "In-house photography, videography and graphics for products, teams, events and brand films — with social-first reels, behind-the-scenes, testimonials and promo cuts ready for every platform.",
    deliverables: [
      "Professional product & catalogue photography",
      "Exhibition booth & event photography",
      "Team & portrait photography",
      "Highlight films & brand story videos",
      "Company introduction & culture videos",
      "Product demonstration videos",
      "Customer testimonial films",
      "Social-first reels, vertical cuts & behind-the-scenes",
      "Product feature posts & promotional graphics",
      "Colour grading & sound mixing",
      "Platform-ready exports for social, web and ads",
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
          "A dedicated photographer plus videographer — the most-picked tier for brand events.",
        includes: [
          "1 photographer + 1 videographer",
          "All edited images delivered",
          "1 highlight video (horizontal, web-ready)",
          "— or 1 social media reel (vertical, IG / TikTok)",
        ],
        highlight: true,
      },
      {
        tier: "Premium",
        name: "Premium Package",
        priceFrom: "2.2k",
        cadence: "project",
        summary:
          "A larger crew and both deliverable formats — built for launches and flagship moments.",
        includes: [
          "1 photographer + 2 videographers",
          "All edited images delivered",
          "1 highlight video (horizontal, web-ready)",
          "1 social media reel (vertical, IG / TikTok)",
        ],
      },
    ],
    faqs: [
      { q: "How long does delivery take?", a: "Photo selects in 48 hours, full edits and the highlight video within 7–10 days of the shoot." },
      { q: "Can we add extra videographers or shoot days?", a: "Yes — every package can scale up with extra crew, locations or shoot days." },
    ],
  },
  {
    slug: "live-streaming",
    number: "05",
    title: "Live Streaming Production",
    tagline: "Multi-camera live, switched on the fly.",
    summary:
      "4K live production for conferences, launches and broadcasts — multi-camera shoot, switcher, and on-the-fly editing with a live feed.",
    deliverables: [
      "Multi-camera 4K live production",
      "On-site 4K switcher",
      "Real-time editing & live feed",
      "Optional broadcast distribution",
      "Recording & archive deliverables",
    ],
    process: [
      { step: "01", title: "Plan", body: "Run-of-show, camera positions, distribution plan." },
      { step: "02", title: "Setup", body: "Cameras, switcher, monitors and connectivity on site." },
      { step: "03", title: "Live", body: "Operate, switch and edit live with full crew." },
      { step: "04", title: "Wrap", body: "Hand off recordings and archive cuts." },
    ],
    packages: [
      {
        tier: "Studio Live",
        name: "Live Stream — Package 1",
        priceFrom: "4.5k",
        cadence: "project",
        note: "Dubai",
        summary:
          "Three 4K cameras with operators, a 4K switcher and on-the-fly editing with a live feed.",
        includes: [
          "3 × 4K cameras with operators",
          "4K switcher",
          "Live editing + live feed",
          "Crew of 4 (3 camera + 1 switcher)",
          "Recording delivered after the event",
        ],
      },
      {
        tier: "Broadcast Live",
        name: "Live Stream — Package 2",
        priceFrom: "5.5k",
        cadence: "project",
        note: "Dubai · includes broadcast",
        summary:
          "Everything in Package 1, plus live broadcasting to your destination of choice.",
        includes: [
          "3 × 4K cameras with operators",
          "4K switcher",
          "Live editing + live feed",
          "Crew of 4 (3 camera + 1 switcher)",
          "Live broadcast distribution",
          "Recording delivered after the event",
        ],
        highlight: true,
      },
    ],
    faqs: [
      { q: "Do prices include travel outside Dubai?", a: "Listed prices are for productions in Dubai. We quote travel, accommodation and per diem separately for shoots elsewhere." },
      { q: "Where can you broadcast to?", a: "YouTube, Facebook, LinkedIn, TikTok, Twitch, Vimeo and most RTMP destinations — including private streaming endpoints." },
    ],
  },
  {
    slug: "web-mobile",
    number: "06",
    title: "Website & Mobile Applications",
    tagline: "Fast, accessible products people love opening.",
    summary:
      "From ready-made templates to heavily-developed custom e-commerce and native mobile apps — engineered for speed, SEO and graceful evolution.",
    deliverables: [
      "Marketing & e-commerce websites",
      "Custom UI/UX design",
      "Native iOS & Android apps",
      "Payments & shipping integrations",
      "SEO + analytics setup",
      "Hosting, maintenance & support",
    ],
    process: [
      { step: "01", title: "Define", body: "Goals, audiences, technical constraints." },
      { step: "02", title: "Design", body: "Flows, IA, UI design and prototypes." },
      { step: "03", title: "Build", body: "Frontend, backend, integrations, QA." },
      { step: "04", title: "Launch", body: "Deployment, monitoring, iteration." },
    ],
    packages: [
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
        highlight: true,
      },
      {
        tier: "Bespoke",
        name: "Native Apps & Platforms",
        cadence: "project",
        summary:
          "iOS, Android and bespoke web platforms — scoped to your product and roadmap.",
        includes: [
          "Native iOS + Android apps",
          "Backend platform & APIs",
          "Real-time + offline support",
          "App Store + Play Store launch",
          "Ongoing engineering retainer",
        ],
      },
    ],
    faqs: [
      { q: "What's the difference between templates and custom?", a: "Templates ship fast on a proven layout — perfect for small businesses. Custom e-commerce is designed and built for your brand, with deeper integrations and admin tooling." },
      { q: "What does maintenance cover?", a: "Hosting, security patches, plugin updates, content tweaks (up to 2 hours/month) and uptime monitoring." },
    ],
  },
  {
    slug: "custom-cms-inventory",
    number: "07",
    title: "Custom CMS & Inventory",
    tagline: "Software that fits the way your team actually works.",
    summary:
      "Bespoke content, catalogue and inventory platforms built around real workflows — multi-warehouse, multi-channel, multi-currency.",
    deliverables: [
      "Headless CMS implementations",
      "Inventory & warehouse management",
      "POS & e-commerce integrations",
      "Role-based admin dashboards",
      "Reporting & exports",
      "API design & integrations",
    ],
    process: [
      { step: "01", title: "Discover", body: "Map current process and pain points." },
      { step: "02", title: "Model", body: "Data, roles, workflows, edge cases." },
      { step: "03", title: "Build", body: "Iterative delivery with weekly demos." },
      { step: "04", title: "Adopt", body: "Migration, training, change support." },
    ],
    packages: [
      {
        tier: "Bespoke",
        name: "Tailored Platform",
        cadence: "project",
        summary:
          "Every CMS and inventory build is sized to your catalogue, channels and team — we scope after a discovery call.",
        includes: [
          "Discovery & process mapping",
          "Data + role modelling",
          "Custom admin dashboards",
          "POS / e-com / ERP integrations",
          "Migration + training",
        ],
      },
    ],
    faqs: [
      { q: "Can you integrate with our ERP?", a: "Yes — we regularly connect to SAP, Oracle, Odoo and custom systems via APIs and middleware." },
      { q: "Do you migrate existing data?", a: "Yes, including reconciliation and validation runs before go-live." },
    ],
  },
  {
    slug: "events-expo",
    number: "08",
    title: "Event & Expo Branding",
    tagline: "Stands, talent and activations that pull a crowd — and convert it.",
    summary:
      "End-to-end exhibition programs — stand design and build, trained booth staff, live entertainment and interactive games, content capture, paid amplification, and lead follow-up that ties the show back to revenue.",
    deliverables: [
      "Concept, narrative & stand design with 3D visuals",
      "Stand fabrication, signage, AV & interactive installs",
      "Printed collateral — brochures, catalogues, leaflets, business cards",
      "Branded giveaways & promotional merchandise",
      "Trained brand promoters, booth hosts & models",
      "Bilingual MCs, hosts & event anchors",
      "Live artists — DJs, musicians, magicians, caricaturists, mascots",
      "Custom branded games, leaderboards, photo booths & AR experiences",
      "Live event photography & videography — reels, BTS, testimonials",
      "Pre-event social campaign with countdown content",
      "Paid media across Meta, LinkedIn, TikTok and Google Search & Display",
      "Google Business Profile optimisation & show-week SEO",
      "QR-driven lead capture wired into your CRM",
      "Post-event recap content & retargeting funnels",
      "Performance report — footfall, leads, social lift, web traffic",
    ],
    process: [
      { step: "01", title: "Strategy", body: "Goals, audience, KPIs and a read on the show floor." },
      { step: "02", title: "Build", body: "Stand, collateral, giveaways and sourcing talent + gaming." },
      { step: "03", title: "Tease", body: "Countdown content, paid pre-show campaigns, GBP and SEO." },
      { step: "04", title: "Activate", body: "On-site team, hosts and artists, games running, daily content and lead capture." },
      { step: "05", title: "Follow-up", body: "Recap content, retargeting, lead nurture and the performance report." },
    ],
    packages: [
      {
        tier: "Standard",
        name: "Booth Essentials",
        cadence: "project",
        summary:
          "A clean, well-built stand with the collateral and on-site setup to look the part — no marketing layer.",
        includes: [
          "Stand design + fabrication",
          "Core signage & AV",
          "Brochures, business cards, basic giveaways",
          "On-site setup & dismantle",
        ],
      },
      {
        tier: "Premium",
        name: "Activation",
        cadence: "project",
        highlight: true,
        summary:
          "Everything in Essentials plus the people, content and lead capture that make the booth actually work.",
        includes: [
          "Everything in Booth Essentials",
          "Brand promoters & booth hosts",
          "Live photo/video team + daily reels",
          "Pre and post social content calendar",
          "QR lead capture into your CRM",
        ],
      },
      {
        tier: "Experience",
        name: "Crowd Pull",
        cadence: "project",
        summary:
          "Turn the booth into a destination — hosts, artists and branded games that bring the crowd in and keep them there.",
        includes: [
          "Everything in Activation",
          "Bilingual MC / event host",
          "Live artists — DJ, musician, magician, caricaturist or mascot",
          "Models & brand ambassadors on rotation",
          "Custom branded game + leaderboard",
          "Photo booth or AR experience",
        ],
      },
      {
        tier: "Bespoke",
        name: "Full Campaign",
        cadence: "project",
        note: "+ ad spend billed at cost",
        summary:
          "The full program — stand, talent, games, content and a paid media push wrapped around the show with retargeting after.",
        includes: [
          "Everything in Crowd Pull",
          "Paid media — Meta, LinkedIn, TikTok, Google",
          "Retargeting + lead-gen funnels",
          "GBP optimisation & SEO push",
          "Post-event analytics report",
        ],
      },
    ],
    faqs: [
      { q: "Do you handle production end-to-end?", a: "Yes — design, fabrication, logistics, install, on-site management and dismantle." },
      { q: "Which expos do you build for?", a: "We brief and quote per event — GITEX, ADIPEC, Arab Health, Gulfood and brand-owned activations are all in scope. Tell us the show and we'll come back with a fit assessment." },
      { q: "Do you supply the booth staff and promoters?", a: "Yes — trained brand promoters, booth hosts and a team lead, briefed on your product and key messages before day one." },
      { q: "Can you run the paid ads and social during the show?", a: "Yes — we run Meta, LinkedIn, TikTok and Google campaigns in the weeks before, during and after the event, with daily live posts from the floor." },
      { q: "How do you capture and hand over leads?", a: "QR codes on the stand and collateral push visitors into a lead form that writes directly into your CRM or a shared sheet, with daily exports during the show." },
      { q: "What does the post-event report include?", a: "Footfall, qualified leads, social reach and engagement lift, website traffic from the show, paid media performance and a read on what to repeat next time." },
      { q: "Can you book artists, hosts and entertainers?", a: "Yes — bilingual MCs, DJs, musicians, magicians, caricaturists, mascots and brand ambassadors. We brief and rehearse them on your product so the act ties back to the message." },
      { q: "What kind of games and interactive experiences do you build?", a: "Custom branded games with live leaderboards, prize wheels, AR try-ons, photo booths and touch-screen demos — all wired to your lead-capture flow so playing earns you a contact." },
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
    deliverables: ar.deliverables,
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
