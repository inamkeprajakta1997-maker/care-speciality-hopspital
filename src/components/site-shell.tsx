import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { HospitalLogo, SiteHeader } from "@/components/site-header";
import { hospital, specialties } from "@/lib/hospital-data";

export function SiteFooter() {
  return (
    <footer className="bg-[#20254e] text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.35fr_0.8fr_0.85fr_1.15fr] lg:gap-12 lg:py-16">
        <div>
          <div className="inline-block rounded-xl bg-white px-3 text-foreground">
            <HospitalLogo />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-7 text-primary-foreground/80">
            Local, patient-focused hospital care in Chakan, Medankarwadi, Pune.
          </p>
          <p className="mt-3 text-sm font-medium">25-bed hospital · Services available 24 hours</p>
        </div>
        <div>
          <h2 className="text-sm font-bold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <li>
              <Link className="hover:text-primary-foreground" to="/about">
                About the hospital
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground" to="/specialities">
                Specialities
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground" to="/facilities">
                Facilities
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground" to="/doctors">
                Doctors
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary-foreground" to="/patient-information">
                Patient information
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Our services</h2>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            {specialties.map((item) => (
              <li key={item.slug}>
                <Link params={{ speciality: item.slug }} to="/specialities/$speciality">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold">Contact</h2>
          <a
            className="mt-4 flex items-center gap-2 text-sm hover:text-primary-foreground"
            href={hospital.phoneLink}
          >
            <Phone aria-hidden="true" className="size-4" /> {hospital.phone}
          </a>
          <a
            className="mt-3 flex items-center gap-2 text-sm hover:text-primary-foreground"
            href={hospital.whatsapp}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" className="size-4" /> Message on WhatsApp
          </a>
          <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-primary-foreground/80">
            <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" /> {hospital.location}
          </p>
          <Link className="mt-3 inline-block text-sm underline underline-offset-4" to="/contact">
            Contact and location
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 text-xs text-primary-foreground/80 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Care Speciality Hospital</p>
          <Link className="hover:text-primary-foreground" to="/privacy">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] shadow-lg lg:hidden">
      <a
        className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-semibold text-foreground"
        href={hospital.phoneLink}
      >
        <Phone aria-hidden="true" className="size-4 text-primary" /> Call
      </a>
      <a
        className="flex min-h-14 flex-col items-center justify-center gap-1 border-x border-border text-xs font-semibold text-foreground"
        href={hospital.whatsapp}
        rel="noreferrer"
        target="_blank"
      >
        <MessageCircle aria-hidden="true" className="size-4 text-primary" /> WhatsApp
      </a>
      <Link
        className="flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-semibold text-foreground"
        to="/appointment"
      >
        <ArrowUpRight aria-hidden="true" className="size-4 text-primary" /> Appointment
      </Link>
    </div>
  );
}

function socialLink(platform: "instagram" | "facebook", configured: unknown) {
  const domain = `${platform}.com`;
  if (typeof configured === "string" && configured.trim()) {
    try {
      const url = new URL(configured.trim());
      if (url.protocol === "https:" && [domain, `www.${domain}`].includes(url.hostname)) {
        return { href: url.href, label: platform === "instagram" ? "Instagram" : "Facebook" };
      }
    } catch {
      // The profile search is available while a valid official URL is being configured.
    }
  }

  const query = `site:${domain} "${hospital.name}" "${hospital.shortLocation.split(",")[0]}"`;
  return {
    href: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    label:
      platform === "instagram"
        ? "Search for the hospital on Instagram"
        : "Search for the hospital on Facebook",
  };
}

const socials = [
  {
    ...socialLink("facebook", import.meta.env["VITE_FACEBOOK_URL"]),
    Icon: Facebook,
    color: "bg-[#1559b7]",
  },
  {
    ...socialLink("instagram", import.meta.env["VITE_INSTAGRAM_URL"]),
    Icon: Instagram,
    color: "bg-[#a91c69]",
  },
  {
    href: hospital.whatsapp,
    label: "Message the hospital on WhatsApp",
    Icon: MessageCircle,
    color: "bg-[#087547]",
  },
];

function FloatingSocialLinks() {
  return (
    <nav
      aria-label="Hospital social links"
      className="fixed right-3 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-30 flex flex-col gap-2 lg:right-5 lg:bottom-7"
    >
      {socials.map(({ href, label, Icon, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`grid size-11 place-items-center rounded-full border border-white/55 text-white shadow-md transition hover:-translate-y-0.5 hover:brightness-110 lg:size-12 ${color}`}
        >
          <Icon aria-hidden="true" className="size-5" />
        </a>
      ))}
    </nav>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background pb-14 text-foreground lg:pb-0">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <MobileActionBar />
      <FloatingSocialLinks />
    </div>
  );
}
