# Care Speciality Hospital

A responsive TanStack Start website for Care Speciality Hospital in Chakan, Pune. Appointment and contact forms prepare WhatsApp messages in the visitor’s browser. The website has no enquiry database.

## Local development

Run `bun install`, then `bun run dev`. Use `bun run test` to run the route tests and `bun run build` to build for production.

## Content and production configuration

- Set `VITE_PUBLIC_SITE_URL` to the site's HTTPS origin at build time. This enables canonical URLs, absolute Open Graph URLs and the sitemap advertised in `/robots.txt`.
- Update hospital details and confirmed services in `src/lib/hospital-data.ts`. Update doctor profiles and gallery content in `src/components/inner-pages.tsx`.
- Replace the labelled placeholders with verified facility photos, doctor information, patient feedback with permission, and the exact map pin when available.
- The logo in `public/care-speciality-hospital-logo.png` is the original uploaded file.

## Social links and photography

- Set VITE_INSTAGRAM_URL and VITE_FACEBOOK_URL to the hospital's official HTTPS profile URLs. Until then, the buttons open platform-specific searches for the hospital.
- The illustrative healthcare images in `src/assets/stock` combine ImageGen scenes set in India with licensed [Pexels](https://www.pexels.com/license/) stock photos. Replace them with approved Care Speciality Hospital photography when it becomes available.
