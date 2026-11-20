import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock3, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AppointmentSection,
  ContactBand,
  FacilityPlaceholderList,
  PageIntro,
  SpecialtyGrid,
  VisitFacts,
} from "@/components/hospital-sections";
import { EnquiryForm } from "@/components/enquiry-form";
import { hospital, specialties, directions } from "@/lib/hospital-data";
import aboutPhoto from "@/assets/stock/about-intro.jpg";
import patientPhoto from "@/assets/stock/patient-info.jpg";
import contactPhoto from "@/assets/stock/contact.jpg";
import previewHallway from "@/assets/stock/gallery-preview-a.jpg";
import previewConsultation from "@/assets/stock/gallery-preview-b.jpg";
import galleryExterior from "@/assets/stock/gallery-exterior.jpg";
import galleryRoom from "@/assets/stock/gallery-b.jpg";
import galleryDoctor from "@/assets/stock/gallery-c.jpg";
import galleryVisit from "@/assets/stock/gallery-d.jpg";
import { specialityPhotos } from "@/lib/stock-photos";

export function InnerPage({
  title,
  description,
  parent,
  children,
}: {
  title: string;
  description: string;
  parent?: "specialities" | "doctors";
  children: ReactNode;
}) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="page-wrap flex flex-wrap gap-3 py-4 text-sm text-muted-foreground"
      >
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        {parent && (
          <>
            <Link to={parent === "doctors" ? "/doctors" : "/specialities"}>
              {parent === "doctors" ? "Doctors" : "Specialities"}
            </Link>
            <span aria-hidden="true">/</span>
          </>
        )}
        <span aria-current="page">{title}</span>
      </nav>
      <PageIntro eyebrow={hospital.shortLocation} title={title} description={description} />
      {children}
    </>
  );
}

export function AboutPage() {
  return (
    <InnerPage
      title="About the hospital"
      description="A 25-bed multispeciality hospital caring for families in Chakan, Medankarwadi and nearby communities."
    >
      <section className="page-wrap section-space grid gap-10 lg:grid-cols-2 lg:items-center">
        <figure>
          <img
            src={aboutPhoto}
            alt="Doctor listening to an older patient"
            className="editorial-image"
          />
          <figcaption className="figure-note">Illustrative image</figcaption>
        </figure>
        <div>
          <h2 className="section-title">Healthcare close to home</h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            Care Speciality Hospital offers maternity care, general healthcare, trauma care and
            outpatient services in Chakan. Our approach starts with listening to patients and
            helping families understand the next step in their visit.
          </p>
          <div className="mt-8">
            <VisitFacts />
          </div>
        </div>
      </section>
      <section className="bg-secondary/60">
        <div className="page-wrap section-space grid gap-5 md:grid-cols-3">
          {[
            [
              "Mission",
              "Make patient-focused hospital care accessible to families in the local community.",
            ],
            [
              "Vision",
              "Be a dependable local point of contact for families seeking hospital care.",
            ],
            [
              "Values",
              "Treat patients with dignity, communicate clearly and respect each family's circumstances.",
            ],
          ].map(([title, copy]) => (
            <article className="surface" key={title}>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </InnerPage>
  );
}

export function SpecialitiesPage() {
  return (
    <InnerPage
      title="Our specialities"
      description="Explore the services available in Chakan and speak with the hospital team about your visit."
    >
      <section aria-label="Hospital services" className="page-wrap section-space">
        <SpecialtyGrid />
      </section>
      <ContactBand />
    </InnerPage>
  );
}

export function SpecialityPage({ service }: { service: (typeof specialties)[number] }) {
  const photo = specialityPhotos[service.icon].detail;
  const questions = {
    maternity: [
      "Can I ask about a maternity visit?",
      "Contact the hospital to discuss available maternity services and visit arrangements.",
    ],
    health: [
      "How do I enquire about general healthcare?",
      "Call or share a brief enquiry on WhatsApp so the team can guide you on visit availability.",
    ],
    trauma: [
      "How do I reach the hospital for an urgent concern?",
      "Call +91 9960060698 directly to discuss available trauma services.",
    ],
    opd: [
      "How can I check OPD timings?",
      "Call the hospital for current outpatient timings and consultation availability.",
    ],
  } as const;
  return (
    <InnerPage title={service.name} description={service.short} parent="specialities">
      <section className="page-wrap section-space grid gap-10 lg:grid-cols-2 lg:items-center">
        <figure>
          <img src={photo.src} alt={photo.alt} className="editorial-image" />
          <figcaption className="figure-note">Illustrative image</figcaption>
        </figure>
        <div>
          <h2 className="section-title">Planning your visit</h2>
          <p className="mt-4 leading-8 text-muted-foreground">{service.detail}</p>
          <Button asChild className="mt-6">
            <Link to="/appointment" search={{ service: service.slug }}>
              Enquire about {service.name}
            </Link>
          </Button>
        </div>
      </section>
      <section className="page-wrap pb-16">
        <Faq
          items={[
            questions[service.icon],
            [
              "Is my preferred visit date confirmed when I enquire?",
              "Please wait for the hospital team to confirm availability and visit arrangements.",
            ],
          ]}
        />
      </section>
      <ContactBand />
    </InnerPage>
  );
}

export function FacilitiesPage() {
  return (
    <InnerPage
      title="Facilities & infrastructure"
      description="Care Speciality Hospital has a 25-bed capacity in Chakan. Contact the team to ask about specific facilities before your visit."
    >
      <section className="page-wrap section-space">
        <h2 className="section-title mb-7">Hospital spaces</h2>
        <FacilityPlaceholderList full />
      </section>
      <ContactBand />
    </InnerPage>
  );
}

const doctorProfiles = specialties.map((service) => ({
  slug: service.slug,
  service: service.name,
  name: "Doctor name pending",
  qualifications: "Qualifications pending verification",
  schedule: "Contact the hospital for current availability",
}));

export function findDoctor(slug: string) {
  return doctorProfiles.find((doctor) => doctor.slug === slug);
}

export function DoctorsPage() {
  const [query, setQuery] = useState("");
  const [service, setService] = useState("");
  const results = doctorProfiles.filter(
    (doctor) =>
      (!service || service === doctor.slug) &&
      `${doctor.name} ${doctor.service} ${doctor.qualifications}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <InnerPage
      title="Our doctors"
      description="Call the hospital for current doctor availability. Profiles below are placeholders awaiting verified names, qualifications and schedules."
    >
      <section className="page-wrap section-space">
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 font-semibold">
            Search profiles
            <input
              className="field"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or service"
            />
          </label>
          <label className="grid gap-2 font-semibold">
            Filter by speciality
            <select
              className="field"
              value={service}
              onChange={(event) => setService(event.target.value)}
            >
              <option value="">All specialities</option>
              {specialties.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p role="status" className="mb-5 text-sm text-muted-foreground">
          {results.length
            ? `${results.length} placeholder ${results.length === 1 ? "profile" : "profiles"}`
            : "No matching profiles."}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((doctor) => (
            <article className="surface" key={doctor.slug}>
              <div className="mb-5 grid aspect-[4/3] place-items-center rounded-xl bg-secondary text-primary">
                <UserRound aria-hidden="true" className="size-12 stroke-1" />
              </div>
              <p className="text-sm font-semibold text-primary">{doctor.service}</p>
              <h2 className="mt-2 text-lg font-bold">{doctor.name}</h2>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">{doctor.qualifications}</p>
              <Link className="action-link" to="/doctors/$doctor" params={{ doctor: doctor.slug }}>
                View {doctor.service} placeholder
              </Link>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </InnerPage>
  );
}

export function DoctorPage({ doctor }: { doctor: NonNullable<ReturnType<typeof findDoctor>> }) {
  return (
    <InnerPage
      title={`${doctor.service} profile`}
      description="Doctor profile placeholder awaiting verified information."
      parent="doctors"
    >
      <section className="page-wrap section-space grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="grid min-h-60 place-items-center rounded-3xl bg-secondary text-primary">
          <UserRound aria-hidden="true" className="size-24 stroke-1" />
          <span className="sr-only">Portrait pending</span>
        </div>
        <div className="surface">
          <h2 className="section-title">{doctor.name}</h2>
          <p className="mt-4 text-muted-foreground">{doctor.qualifications}</p>
          <p className="mt-4 flex gap-2">
            <CalendarDays aria-hidden="true" />
            {doctor.schedule}
          </p>
          <Button asChild className="mt-6">
            <a href={hospital.phoneLink}>Call the hospital</a>
          </Button>
        </div>
      </section>
    </InnerPage>
  );
}

export function Faq({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="max-w-3xl">
      <h2 className="section-title mb-6">Frequently asked questions</h2>
      {items.map(([question, answer]) => (
        <details className="mb-3 rounded-xl border bg-white p-5" key={question}>
          <summary className="cursor-pointer font-semibold">{question}</summary>
          <p className="mt-3 leading-7 text-muted-foreground">{answer}</p>
        </details>
      ))}
    </div>
  );
}

export function PatientPage() {
  return (
    <InnerPage
      title="Patient information"
      description="Prepare for an outpatient visit or ask the hospital team about the care you need."
    >
      <div className="page-wrap section-space grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="surface self-start">
          <h2 className="section-title">Before you visit</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-muted-foreground">
            <li>Call or message the hospital with your preferred service.</li>
            <li>Confirm timings and directions with the team.</li>
            <li>Ask whether to bring previous reports, prescriptions or other documents.</li>
          </ol>
          <img
            src={patientPhoto}
            alt="A nurse helping a family prepare for a visit"
            className="mt-6 aspect-video w-full rounded-xl object-cover"
            loading="lazy"
          />
          <p className="figure-note">Illustrative image</p>
        </section>
        <Faq
          items={[
            [
              "When is the hospital open?",
              "Hospital services are available 24 hours. Contact the team for service-specific and OPD timings.",
            ],
            [
              "Can I arrange a visit through WhatsApp?",
              "Yes. Send an enquiry and wait for the hospital to confirm availability.",
            ],
            ["Where is the hospital?", hospital.location],
          ]}
        />
      </div>
      <ContactBand />
    </InnerPage>
  );
}

const galleryPreview = [
  { src: previewHallway, alt: "Hospital beds in a hallway", title: "Hospital hallway" },
  {
    src: previewConsultation,
    alt: "Doctor speaking with an expectant mother",
    title: "Maternity consultation",
  },
];

const galleryPhotos = [
  {
    src: galleryExterior,
    alt: "Exterior of an illustrative community hospital",
    title: "Hospital entrance",
  },
  { src: galleryRoom, alt: "Hospital bed near a window", title: "Patient room" },
  { src: galleryDoctor, alt: "Doctor reading paperwork", title: "Care team" },
  { src: galleryVisit, alt: "Clinician conducting a consultation", title: "Medical visit" },
];

export function GalleryGrid({ preview = false }: { preview?: boolean }) {
  const photos = preview ? galleryPreview : galleryPhotos;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {photos.map(({ src, alt, title }) => (
        <figure className="gallery-tile aspect-[4/3] sm:aspect-video" key={title}>
          <img src={src} alt={alt} loading="lazy" decoding="async" />
          <figcaption>{title} · illustrative</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function GalleryPage() {
  return (
    <InnerPage
      title="Gallery"
      description="Illustrative previews and spaces for verified Care Speciality Hospital photography."
    >
      <section className="page-wrap section-space" aria-label="Gallery images">
        <GalleryGrid />
      </section>
    </InnerPage>
  );
}

export function LocationPanel() {
  return (
    <div className="location-panel rounded-3xl border p-7 sm:p-10">
      <MapPin aria-hidden="true" className="mb-5 size-9 text-primary" />
      <h2 className="section-title">Find us in Chakan</h2>
      <p className="mt-3 leading-7 text-muted-foreground">{hospital.location}</p>
      <p className="figure-note">Exact hospital map pin pending verification.</p>
      <Button asChild className="mt-6">
        <a href={directions} target="_blank" rel="noreferrer">
          Directions to Medankarwadi
        </a>
      </Button>
    </div>
  );
}

export function ContactPage() {
  return (
    <InnerPage
      title="Contact us"
      description="Speak directly with the hospital team about appointments, services or visiting."
    >
      <div className="page-wrap section-space grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4">
          <LocationPanel />
          <figure>
            <img
              src={contactPhoto}
              alt="A visitor speaking with staff at a reception desk"
              className="aspect-video w-full rounded-3xl object-cover"
              loading="lazy"
            />
            <figcaption className="figure-note">Illustrative image</figcaption>
          </figure>
          <div className="surface space-y-4">
            <a className="action-link flex items-center gap-2" href={hospital.phoneLink}>
              <Phone size={18} aria-hidden="true" />
              {hospital.phone}
            </a>
            <a
              className="action-link flex items-center gap-2"
              href={hospital.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Message on WhatsApp
            </a>
            <p className="flex items-center gap-2">
              <Clock3 size={18} aria-hidden="true" /> Hospital services available 24 hours
            </p>
          </div>
        </div>
        <div className="surface self-start">
          <EnquiryForm heading="Contact enquiry" kind="general" />
        </div>
      </div>
    </InnerPage>
  );
}

export function AppointmentPage({ service }: { service: string | undefined }) {
  return (
    <InnerPage
      title="Appointment enquiry"
      description="Share your preferred service and visit date via WhatsApp. The hospital team can confirm availability with you."
    >
      <AppointmentSection
        initialSpeciality={specialties.find((item) => item.slug === service)?.name ?? ""}
      />
      <ContactBand />
    </InnerPage>
  );
}

export function PrivacyPage() {
  return (
    <InnerPage
      title="Privacy policy"
      description="How the Care Speciality Hospital website handles information you enter in its enquiry forms."
    >
      <section className="page-wrap section-space space-y-9">
        {[
          [
            "Website enquiries",
            "The form uses the details you enter to compose a WhatsApp message in your browser. This website does not have a form database and does not save a copy of your enquiry.",
          ],
          [
            "WhatsApp and external services",
            "WhatsApp receives the prefilled text when its link opens. When you send it in WhatsApp, the message is shared with the hospital. WhatsApp and any external directions or font services operate under their own privacy policies.",
          ],
          [
            "Information to share",
            "Include only the contact details and brief context needed for your enquiry. Call the hospital to ask how to share sensitive medical records.",
          ],
        ].map(([title, copy]) => (
          <div key={title} className="max-w-3xl">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-3 leading-8 text-muted-foreground">{copy}</p>
          </div>
        ))}
        <div>
          <h2 className="text-xl font-bold">Privacy questions</h2>
          <a className="action-link mt-3 inline-block" href={hospital.phoneLink}>
            {hospital.phone}
          </a>
        </div>
      </section>
    </InnerPage>
  );
}
