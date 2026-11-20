import { hospital, specialties } from "@/lib/hospital-data";

export const indexablePaths = [
  "/",
  "/about",
  "/specialities",
  "/facilities",
  "/doctors",
  "/appointment",
  "/patient-information",
  "/gallery",
  "/contact",
  "/privacy",
  ...specialties.map(({ slug }) => `/specialities/${slug}`),
];

export function siteOrigin() {
  const base = import.meta.env["VITE_PUBLIC_SITE_URL"]?.trim();
  try {
    const url = new URL(base);
    if (url.protocol === "https:" && (base === url.origin || base === url.origin + "/"))
      return url.origin;
  } catch {
    return undefined;
  }
  return undefined;
}

export function pageHead(path: string, title: string, description: string, image?: string) {
  const origin = siteOrigin();
  const canonical = origin ? origin + path : undefined;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: hospital.name },
      { name: "twitter:card", content: image && origin ? "summary_large_image" : "summary" },
      ...(canonical ? [{ property: "og:url", content: canonical }] : []),
      ...(image && origin ? [{ property: "og:image", content: new URL(image, origin).href }] : []),
    ],
    links: canonical ? [{ rel: "canonical", href: canonical }] : [],
  };
}

export function hospitalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: hospital.name,
    url: siteOrigin(),
    telephone: hospital.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chakan, Medankarwadi, Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };
}
