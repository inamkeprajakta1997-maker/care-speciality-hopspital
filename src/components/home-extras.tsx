import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { BedDouble, Clock3, HeartHandshake, MapPin, Quote, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow, FacilityPlaceholderList } from "@/components/hospital-sections";
import { GalleryGrid, LocationPanel } from "@/components/inner-pages";

export function Reveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={false}
      {...(!reduced && { whileInView: { opacity: [0.85, 1], y: [12, 0] } })}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}

export function HomeFacilitiesAndDoctors() {
  const strengths = [
    {
      Icon: HeartHandshake,
      title: "Patient-focused care",
      detail: "Ask our team about services and visit arrangements.",
    },
    { Icon: MapPin, title: "Local healthcare", detail: "In Medankarwadi, Chakan, Pune." },
    {
      Icon: BedDouble,
      title: "25-bed hospital",
      detail: "Enquire about current bed availability.",
    },
    {
      Icon: Clock3,
      title: "24-hour hospital services",
      detail: "Call the hospital directly for urgent enquiries.",
    },
  ];
  return (
    <>
      <section className="bg-[#20254e] text-white">
        <div className="page-wrap section-space grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-emerald-200">
              Why choose Care Speciality Hospital
            </p>
            <h2 className="section-title mt-4 max-w-md">A local hospital for your family’s care</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {strengths.map(({ Icon, title, detail }) => (
              <article className="rounded-2xl border border-white/20 bg-white/5 p-5" key={title}>
                <Icon aria-hidden="true" className="mb-4 size-6 text-emerald-200" />
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-wrap section-space">
        <Reveal>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Facilities</Eyebrow>
              <h2 className="section-title mt-3">Hospital spaces</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/facilities">Explore facilities</Link>
            </Button>
          </div>
          <FacilityPlaceholderList />
        </Reveal>
      </section>
      <section className="bg-secondary/55">
        <div className="page-wrap section-space grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>Our doctors</Eyebrow>
            <h2 className="section-title mt-3">Check doctor availability</h2>
            <p className="mt-4 max-w-md leading-7 text-muted-foreground">
              Contact the hospital for current consultation times and doctor availability.
            </p>
            <Button asChild className="mt-6">
              <Link to="/doctors">Explore doctor profiles</Link>
            </Button>
          </div>
          <article className="surface grid items-center gap-6 sm:grid-cols-[0.65fr_1fr]">
            <div className="grid min-h-36 place-items-center rounded-xl bg-secondary text-primary">
              <UserRound className="size-14 stroke-1" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Profile placeholder</p>
              <h3 className="mt-2 text-xl font-bold">Doctor name pending</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                Portrait, qualifications and consultation schedule pending verification.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export function HomeGalleryAndFeedback() {
  return (
    <>
      <section className="bg-secondary/55">
        <div className="page-wrap section-space grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <Eyebrow>Patient feedback</Eyebrow>
            <h2 className="section-title mt-4">Patient experiences</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Visit feedback", "Family feedback"].map((title) => (
              <article className="surface" key={title}>
                <Quote aria-hidden="true" className="mb-4 size-6 text-primary" />
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Sample placeholder for patient feedback.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-wrap section-space">
        <Reveal>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Gallery</Eyebrow>
              <h2 className="section-title mt-3">Hospital gallery</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/gallery">View gallery</Link>
            </Button>
          </div>
          <GalleryGrid preview />
        </Reveal>
      </section>
    </>
  );
}

export function HomeLocation() {
  return (
    <section className="page-wrap section-space">
      <LocationPanel />
    </section>
  );
}
