export type ServiceSlug =
  | "branding"
  | "marketing"
  | "content-ads"
  | "web-mobile"
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
  deliverables: { name: string; description: string }[];
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
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=70",
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
    title: "Digital & Local Marketing",
    tagline: "Performance, presence and community — earned and paid.",
    summary:
      "Integrated SEO, paid media and social media management tuned for UAE audiences — clear pricing, weekly optimisation and measurable outcomes.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=70",
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
    ],
    faqs: [
      { q: "Is ad spend included?", a: "No — ad spend is paid directly to the platform. Our fee covers strategy, creative, setup, optimisation and reporting." },
      { q: "How long is the minimum engagement?", a: "We recommend a three-month minimum so the algorithms (and our optimisations) have time to compound." },
      { q: "Do you run brand awareness as well as lead-gen?", a: "Yes — we run reach and website-traffic campaigns to build the audience, and conversion-optimised lead-gen and retargeting funnels to close." },
      { q: "Can you handle Google Business Profile?", a: "Yes — we set up, optimise and keep your GBP current so you show up in local search and Maps for the right queries." },
      { q: "Which social platforms do you manage?", a: "Instagram, TikTok, LinkedIn, YouTube, X, Snap and Facebook — we set the channel mix around your audience and goals." },
    ],
  },
  {
    slug: "content-ads",
    number: "03",
    title: "Photo, Video & Live Streaming",
    tagline: "Photo, video, reels and live broadcast — built to perform.",
    summary:
      "In-house photography, videography, livestreaming and graphics for products, teams, events and brand films — with social-first reels, behind-the-scenes, testimonials and broadcast-ready outputs.",
    image:
      "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&w=1600&q=70",
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
  {
    slug: "web-mobile",
    number: "04",
    title: "Websites, E-commerce & Platforms",
    tagline: "Fast digital products engineered for growth.",
    summary:
      "From ready-made websites to custom e-commerce and operations platforms — engineered for speed, SEO and long-term maintainability.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=70",
    deliverables: [
      { name: "Marketing & e-commerce websites", description: "Fast, conversion-focused sites for brand and sales." },
      { name: "Custom UI/UX design", description: "Interfaces designed around your users and goals." },
      { name: "Payments & shipping integrations", description: "Checkout, payments and delivery wired end-to-end." },
      { name: "Headless CMS implementations", description: "Flexible content systems your team can own." },
      { name: "Inventory & warehouse workflows", description: "Stock and fulfilment flows that match how you operate." },
      { name: "POS / ERP integrations", description: "Connect the platform to the systems you already run." },
      { name: "Role-based admin dashboards", description: "Controlled access and tools for every team member." },
      { name: "SEO + analytics setup", description: "Search and tracking configured from day one." },
      { name: "Hosting, maintenance & support", description: "We keep the site fast, secure and up to date." },
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
      { q: "What's the difference between templates and custom?", a: "Templates ship fast on a proven layout — perfect for small businesses. Custom e-commerce is designed and built for your brand, with deeper integrations and admin tooling." },
      { q: "What does maintenance cover?", a: "Hosting, security patches, plugin updates, content tweaks (up to 2 hours/month) and uptime monitoring." },
      { q: "Can you integrate with our ERP and migrate legacy data?", a: "Yes — we regularly integrate SAP, Oracle, Odoo and custom systems, including reconciliation and validation before go-live." },
    ],
  },
  {
    slug: "events-expo",
    number: "05",
    title: "Event & Expo Branding",
    tagline: "Stands, talent and activations that pull a crowd — and convert it.",
    summary:
      "End-to-end exhibition programs — stand design and build, trained booth staff, live entertainment and interactive games, content capture, paid amplification, and lead follow-up that ties the show back to revenue.",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=70",
    deliverables: [
      { name: "Concept, narrative & stand design with 3D visuals", description: "A clear idea and 3D design before anything is built." },
      { name: "Stand fabrication, signage, AV & interactive installs", description: "Full build, signage and tech delivered to the floor." },
      { name: "Printed collateral — brochures, catalogues, leaflets, business cards", description: "Print materials that look the part on the stand." },
      { name: "Branded giveaways & promotional merchandise", description: "Memorable takeaways that keep your brand in hand." },
      { name: "Models & Talent Services", description: "Trained models and brand ambassadors who represent you on the floor." },
      { name: "Bilingual MCs, hosts & event anchors", description: "Hosts who work the crowd in Arabic and English." },
      { name: "Live artists — DJs, musicians, magicians, caricaturists, mascots", description: "Live acts that draw a crowd and hold it." },
      { name: "Custom branded games, leaderboards, photo booths & AR experiences", description: "Interactive moments that turn playing into leads." },
      { name: "Live event photography & videography — reels, BTS, testimonials", description: "Daily content captured straight from the floor." },
      { name: "Pre-event social campaign with countdown content", description: "Build anticipation before the doors open." },
      { name: "Paid media across Meta, LinkedIn, TikTok and Google Search & Display", description: "Targeted ads around the show to pull traffic." },
      { name: "Google Business Profile optimisation & show-week SEO", description: "Get found during the week that matters most." },
      { name: "QR-driven lead capture wired into your CRM", description: "Visitors scan, and leads land straight in your CRM." },
      { name: "Post-event recap content & retargeting funnels", description: "Keep the momentum going after the show ends." },
      { name: "Performance report — footfall, leads, social lift, web traffic", description: "A clear read on what the show actually delivered." },
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
          "Everything in Essentials plus the hosts, live entertainment, branded games and content that turn the booth into a destination — and capture every lead.",
        includes: [
          "Everything in Booth Essentials",
          "Brand promoters, booth hosts & bilingual MC",
          "Live artists — DJ, musician, magician or mascot",
          "Custom branded game + photo booth / AR",
          "Live photo/video team + daily reels",
          "Pre and post social content calendar",
          "QR lead capture into your CRM",
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
          "Everything in Activation",
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
  {
    slug: "corporate-events",
    number: "06",
    title: "Corporate Events",
    tagline: "Conferences, launches and internal moments executed end-to-end.",
    summary:
      "Corporate event programmes for summits, product launches, townhalls and gala nights — strategy, production, media capture and post-event communications under one team.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=70",
    deliverables: [
      { name: "Stage design & setup", description: "A stage built around your theme and run-of-show." },
      { name: "Event branding", description: "Cohesive branding across every touchpoint on the day." },
      { name: "LED screens & displays", description: "High-impact screens sized for the room." },
      { name: "Sound & lighting", description: "Audio and lighting that set the right atmosphere." },
      { name: "Banquet management", description: "Seamless catering and banquet coordination." },
      { name: "Guest experience", description: "A thoughtful flow from arrival to farewell." },
      { name: "Models & Talent Services", description: "Professional models and hosts who elevate the occasion." },
      { name: "Corporate gifts", description: "Curated gifts that leave a lasting impression." },
      { name: "Banners & signage", description: "Wayfinding and branding that guide every guest." },
      { name: "Photography & videography", description: "Full coverage of the moments that matter." },
      { name: "Live streaming", description: "Broadcast your event to remote audiences." },
      { name: "DJ & entertainment", description: "Live entertainment that sets the tone." },
      { name: "Influencer marketing", description: "Amplify the event through the right voices." },
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
