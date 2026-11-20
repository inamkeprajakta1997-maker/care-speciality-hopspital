import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Baby,
  BedDouble,
  Check,
  Clock3,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Phone,
  ShieldPlus,
  Stethoscope,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/stock/hero.jpg";
import homeIntro from "@/assets/stock/home-intro.jpg";
import homeInset from "@/assets/stock/home-inset.jpg";
import journeyImage from "@/assets/stock/patient-journey.jpg";
import appointmentImage from "@/assets/stock/appointment.jpg";
import { specialityPhotos } from "@/lib/stock-photos";
import roomImage from "@/assets/stock/room.jpg";
import receptionImage from "@/assets/stock/reception.jpg";
import wardImage from "@/assets/stock/ward.jpg";
import consultationImage from "@/assets/stock/consultation.jpg";
import otherRoom from "@/assets/stock/facilities-room.jpg";
import otherReception from "@/assets/stock/gallery-a.jpg";
import otherWard from "@/assets/stock/facilities-ward.jpg";
import otherConsultation from "@/assets/stock/facilities-consultation.jpg";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/enquiry-form";
import { hospital, specialties, directions } from "@/lib/hospital-data";

const iconMap = {
  maternity: Baby,
  health: HeartPulse,
  trauma: ShieldPlus,
  opd: Stethoscope,
} as const;

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
      <span aria-hidden="true" className="h-px w-7 bg-primary" />
      {children}
    </p>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="inner-hero relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full border border-primary/10 md:block"
      />
    </section>
  );
}

export function SpecialtyCard({
  specialty,
  compact,
}: {
  specialty: (typeof specialties)[number];
  compact: boolean;
}) {
  const photo = specialityPhotos[specialty.icon][compact ? "card" : "overview"];
  const Icon = iconMap[specialty.icon];
  return (
    <article className="group flex min-h-60 flex-col overflow-hidden rounded-3xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={photo.src}
          alt={photo.alt}
          className="aspect-[16/8] w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute bottom-2 left-2 rounded-full bg-white px-2 py-1 text-xs font-semibold">
          Illustrative
        </span>
      </div>
      <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon aria-hidden="true" className="size-6" />
      </div>
      <h3 className="mt-5 text-xl font-bold">{specialty.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{specialty.short}</p>
      <Link
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-hospital-blue transition-colors group-hover:text-primary"
        params={{ speciality: specialty.slug }}
        to="/specialities/$speciality"
      >
        Learn more{" "}
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}

export function SpecialtyGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${compact ? "lg:grid-cols-4" : "lg:grid-cols-2"}`}>
      {specialties.map((specialty) => (
        <SpecialtyCard key={specialty.slug} specialty={specialty} compact={compact} />
      ))}
    </div>
  );
}

export function ContactBand() {
  return (
    <section className="bg-hospital-blue text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-10 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:py-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/75">
            Here when you need us
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Hospital services available 24 hours
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Call the hospital directly for urgent concerns or to ask about services.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <a href={hospital.phoneLink}>
              <Phone aria-hidden="true" /> Call {hospital.phone}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <a href={hospital.whatsapp} rel="noreferrer" target="_blank">
              WhatsApp <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function AppointmentSection({
  compact = false,
  initialSpeciality = "",
}: {
  compact?: boolean;
  initialSpeciality?: string;
}) {
  return (
    <section className="bg-secondary/50">
      <div
        className={`mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:py-20 ${compact ? "lg:grid-cols-[0.8fr_1.2fr]" : "lg:grid-cols-[0.9fr_1.1fr]"}`}
      >
        <div className="lg:py-4">
          <Eyebrow>Appointments & enquiries</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Start with a conversation.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            Tell us what you need, and our team can help with your enquiry. A WhatsApp message is
            not a confirmed appointment.
          </p>
          <a
            className="mt-6 inline-flex items-center gap-2 font-bold text-hospital-blue"
            href={hospital.phoneLink}
          >
            <Phone aria-hidden="true" className="size-4" /> {hospital.phone}
          </a>
          {!compact && (
            <figure className="mt-7">
              <img
                src={appointmentImage}
                alt="Health worker speaking with a patient at an appointment desk"
                className="aspect-video w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <figcaption className="figure-note">Illustrative image</figcaption>
            </figure>
          )}
        </div>
        <div className="surface">
          <EnquiryForm
            compact={compact}
            initialSpeciality={initialSpeciality}
            key={initialSpeciality}
          />
        </div>
      </div>
    </section>
  );
}

export function HomePageContent({
  afterSpecialities,
  afterJourney,
  afterAppointment,
}: {
  afterSpecialities: ReactNode;
  afterJourney: ReactNode;
  afterAppointment: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <>
      <section className="relative isolate flex min-h-[540px] overflow-hidden bg-hospital-blue text-primary-foreground sm:min-h-[640px] lg:min-h-[680px]">
        <img
          alt="A doctor speaking with a mother and child"
          className="absolute inset-0 -z-20 size-full object-cover object-[72%_center] sm:object-[60%_center]"
          fetchPriority="high"
          src={heroImage}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 hero-shade" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_300px] lg:py-20">
          <motion.div
            className="max-w-3xl"
            initial={false}
            animate={!mounted || reducedMotion ? false : { opacity: [0.85, 1], y: [12, 0] }}
            transition={{ duration: 0.55 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/35 bg-primary-foreground/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] backdrop-blur-sm">
              <Clock3 aria-hidden="true" className="size-4 shrink-0 text-emerald-200" /> Chakan ·
              Hospital services available 24 hours
            </p>
            <h1 className="mt-7 max-w-3xl text-[2.3rem] font-extrabold leading-[1.06] tracking-[-0.045em] sm:text-6xl xl:text-[4.65rem]">
              Compassionate care.
              <br /> Trusted healthcare.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-primary-foreground/85 sm:text-lg sm:leading-8">
              Dedicated to caring for families in Chakan with accessible, patient-focused
              healthcare.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/appointment">
                  Make an enquiry <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/65 bg-transparent text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
              >
                <a href={hospital.phoneLink}>
                  <Phone aria-hidden="true" /> Call the hospital
                </a>
              </Button>
            </div>
          </motion.div>
          <div className="hidden self-end justify-end lg:flex">
            <div className="w-[250px] rounded-3xl border border-primary-foreground/35 bg-background/95 p-6 text-foreground shadow-lg">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                  <BedDouble aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-extrabold">25</p>
                  <p className="text-xs text-muted-foreground">beds</p>
                </div>
              </div>
              <div className="my-5 h-px bg-border" />
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="size-2 rounded-full bg-primary" /> 24-hour hospital services
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Serving Chakan, Medankarwadi and nearby communities.
              </p>
            </div>
          </div>
          <a
            className="absolute bottom-8 right-5 hidden items-center gap-2 text-xs font-semibold text-primary-foreground/85 xl:flex"
            href="#services"
          >
            Discover our services <ArrowDownRight aria-hidden="true" className="size-4" />
          </a>
        </div>
        <span className="absolute bottom-4 left-5 rounded-full bg-[#151936]/85 px-3 py-1 text-xs text-white sm:left-8">
          Illustrative image
        </span>
        <span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-1/3 bg-primary" />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-1/3 h-1 w-1/6 bg-hospital-orange"
        />
      </section>

      <section aria-label="Quick links" className="border-b border-border bg-background">
        <div className="quick-access mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
          <a
            className="flex min-h-[75px] items-center gap-2 px-2 py-4 sm:gap-3 sm:px-4 lg:px-6"
            href={hospital.phoneLink}
          >
            <Phone aria-hidden="true" className="size-5 shrink-0 text-primary" />
            <span>
              <strong className="block text-sm">Emergency call</strong>
              <span className="text-xs text-muted-foreground">{hospital.phone}</span>
            </span>
          </a>
          <Link
            className="flex min-h-[75px] items-center gap-2 px-2 py-4 sm:gap-3 sm:px-4 lg:px-6"
            to="/appointment"
          >
            <HeartHandshake aria-hidden="true" className="size-5 shrink-0 text-primary" />
            <span>
              <strong className="block text-sm">Book an appointment</strong>
              <span className="text-xs text-muted-foreground">Send an enquiry</span>
            </span>
          </Link>
          <Link
            className="flex min-h-[75px] items-center gap-2 px-2 py-4 sm:gap-3 sm:px-4 lg:px-6"
            to="/specialities"
          >
            <HeartPulse aria-hidden="true" className="size-5 shrink-0 text-primary" />
            <span>
              <strong className="block text-sm">Explore specialities</strong>
              <span className="text-xs text-muted-foreground">Find a service</span>
            </span>
          </Link>
          <a
            className="flex min-h-[75px] items-center gap-2 px-2 py-4 sm:gap-3 sm:px-4 lg:px-6"
            href={directions}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin aria-hidden="true" className="size-5 shrink-0 text-primary" />
            <span>
              <strong className="block text-sm">Get directions</strong>
              <span className="text-xs text-muted-foreground">Chakan, Pune</span>
            </span>
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:py-24">
        <div className="relative pb-7 pr-7">
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold">
            Illustrative image
          </span>
          <img
            alt="Medical practitioners having a discussion"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
            loading="lazy"
            src={homeIntro}
          />
          <div className="absolute bottom-0 right-0 max-w-[235px] rounded-2xl border border-border bg-background p-4 sm:p-5">
            <p className="text-3xl font-extrabold text-primary">25</p>
            <p className="mt-1 text-sm font-semibold">beds at Care Speciality Hospital</p>
            <p className="mt-1 text-xs text-muted-foreground">A 25-bed hospital in Chakan.</p>
          </div>
          <img
            src={homeInset}
            alt=""
            loading="lazy"
            className="absolute -bottom-1 left-4 hidden h-28 w-36 rounded-2xl border-4 border-white object-cover md:block"
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 -z-10 size-20 -translate-x-3 -translate-y-3 border-l-2 border-t-2 border-hospital-orange"
          />
        </div>
        <div>
          <Eyebrow>Care close to home</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
            Here for the health of our community.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Care Speciality Hospital is a 25-bed hospital in Chakan, Medankarwadi, Pune. Our team
            offers maternity care, general healthcare, trauma care and OPD, with hospital services
            available 24 hours.
          </p>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            For details about services, availability or your visit, speak directly with the hospital
            team.
          </p>
          <Button asChild className="mt-7" variant="outline">
            <Link to="/about">
              About the hospital <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-secondary/50" id="services">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <Eyebrow>Our services</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Care for your next step.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Explore the services currently offered. Contact us to ask about availability and
                details.
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-bold text-hospital-blue"
              to="/specialities"
            >
              All specialities <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-9">
            <SpecialtyGrid compact />
          </div>
        </div>
      </section>

      {afterSpecialities}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-24">
        <div>
          <Eyebrow>A familiar first step</Eyebrow>
          <h2 className="mt-4 max-w-lg text-3xl font-bold leading-tight sm:text-4xl">
            Connect with us, your way.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Questions about visiting? Contact the hospital to ask about services and what to expect.
            We’ll help you find the right next step.
          </p>
          <div className="mt-8 space-y-5">
            {[
              ["01", "Contact the hospital", "Call or send a WhatsApp enquiry."],
              ["02", "Ask about a visit", "Share your service and date preference."],
              ["03", "Receive care", "The hospital team can confirm next steps with you."],
            ].map(([number, title, detail]) => (
              <div className="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4" key={number}>
                <span className="flex size-11 items-center justify-center border border-primary/30 text-sm font-bold text-primary">
                  {number}
                </span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-hospital-blue"
            to="/patient-information"
          >
            Patient information <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="relative">
          <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold">
            Illustrative image
          </span>
          <img
            alt="Receptionist handing an appointment slip to a patient"
            className="aspect-[5/4] w-full rounded-3xl object-cover"
            loading="lazy"
            src={journeyImage}
          />
          <div className="absolute bottom-4 left-4 flex max-w-[calc(100%-2rem)] items-start gap-3 border border-border bg-background p-4 sm:bottom-6 sm:left-6 sm:p-5">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <Clock3 aria-hidden="true" className="size-4" />
            </span>
            <div>
              <strong className="block text-sm">24-hour hospital services</strong>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                Call for urgent concerns and service enquiries.
              </span>
            </div>
          </div>
        </div>
      </section>

      {afterJourney}
      <ContactBand />
      <AppointmentSection compact />
      {afterAppointment}
    </>
  );
}

const hospitalSpaces = [
  { title: "Hospital rooms", image: roomImage, alt: "Private room with a single hospital bed" },
  { title: "Reception area", image: receptionImage, alt: "Hospital waiting area with chairs" },
  { title: "Patient wards", image: wardImage, alt: "Shared ward with hospital beds" },
  {
    title: "Consultation areas",
    image: consultationImage,
    alt: "Clinic with a desk and examination couch",
  },
];

const facilityPhotos = [
  { image: otherRoom, alt: "Single patient bed in a hospital room" },
  { image: otherReception, alt: "Hospital corridor beside patient rooms" },
  { image: otherWard, alt: "Hospital ward with two patient beds" },
  { image: otherConsultation, alt: "Consultation room with an examination couch" },
];

export function FacilityPlaceholderList({ full = false }: { full?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {hospitalSpaces.map(({ title, image, alt }, index) => {
        const photo = (full && facilityPhotos[index]) || { image, alt };
        return (
          <article
            className="overflow-hidden rounded-3xl border border-border bg-white"
            key={title}
          >
            <img
              alt={photo.alt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
              decoding="async"
              src={photo.image}
            />
            <div className="px-5 py-4">
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Illustrative image</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function VisitFacts() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(
        [
          [BedDouble, "Hospital capacity", "25 beds"],
          [Clock3, "Hospital services", "Available 24 hours"],
          [MapPin, "Location", "Chakan, Medankarwadi, Pune"],
          [Check, "Visit information", "Ask our team directly"],
        ] as const
      ).map(([Icon, title, detail]) => (
        <div
          className="flex items-start gap-3 border border-border bg-background p-5"
          key={String(title)}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
            <Icon aria-hidden="true" className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">{String(title)}</p>
            <p className="mt-1 text-sm font-bold">{String(detail)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
