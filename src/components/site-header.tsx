import { Fragment, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, ChevronDown, Clock3, MapPin, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospital, mainNavigation, specialties } from "@/lib/hospital-data";

export function HospitalLogo({ prominent = false }: { prominent?: boolean }) {
  return (
    <Link
      to="/"
      className={prominent ? "hospital-brand hospital-brand-header" : "hospital-brand"}
      aria-label="Care Speciality Hospital home"
    >
      <img
        alt=""
        width={prominent ? 72 : 56}
        height={prominent ? 72 : 56}
        src="/care-speciality-hospital-logo.png"
      />
      <span aria-hidden="true">
        <strong>Care Speciality</strong>
        <small>Hospital</small>
      </span>
    </Link>
  );
}

function AppointmentLink() {
  return (
    <Button asChild className="shrink-0">
      <Link to="/appointment">
        <CalendarDays aria-hidden="true" /> Book appointment
      </Link>
    </Button>
  );
}

function SpecialtyMenu({ id, onNavigate }: { id: string; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => {
    setOpen(false);
    onNavigate?.();
  };
  return (
    <div
      className="speciality-menu relative"
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget))
          setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        type="button"
        ref={toggle}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        aria-controls={id}
        className="nav-link flex cursor-pointer list-none items-center gap-1"
      >
        Specialities <ChevronDown aria-hidden="true" className="size-4" />
      </button>
      <div id={id} className="speciality-panel" hidden={!open}>
        <Link to="/specialities" onClick={close}>
          All specialities
        </Link>
        {specialties.map((service) => (
          <Link
            key={service.slug}
            to="/specialities/$speciality"
            params={{ speciality: service.slug }}
            onClick={close}
          >
            {service.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="hidden bg-[#20254e] text-white md:block">
        <div className="page-wrap flex items-center justify-between gap-4 py-2.5 text-sm">
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-emerald-200" aria-hidden="true" />
            {hospital.location}
          </span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock3 className="size-4 text-emerald-200" aria-hidden="true" />
              24-hour hospital services
            </span>
            <a href={hospital.phoneLink} className="flex items-center gap-2">
              <Phone className="size-4 text-emerald-200" aria-hidden="true" />
              {hospital.phone}
            </a>
          </div>
        </div>
      </div>
      <header
        className="sticky top-0 z-40 border-b bg-white"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            setOpen(false);
            toggle.current?.focus();
          }
        }}
      >
        <div className="page-wrap flex min-h-[82px] items-center justify-between gap-4">
          <HospitalLogo prominent />
          <nav aria-label="Main navigation" className="hidden items-center gap-4 lg:flex xl:gap-6">
            {mainNavigation.map(({ label, to }) => (
              <Fragment key={to}>
                {to === "/facilities" && <SpecialtyMenu id="desktop-services" />}
                <Link className="nav-link" activeOptions={{ exact: to === "/" }} to={to}>
                  {label}
                </Link>
              </Fragment>
            ))}
          </nav>
          <div className="hidden lg:block">
            <AppointmentLink />
          </div>
          <Button
            ref={toggle}
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="size-11 lg:hidden"
            size="icon"
            variant="outline"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!open}
          className="page-wrap max-h-[65dvh] overflow-y-auto border-t py-3 lg:hidden"
        >
          {mainNavigation.map(({ label, to }) => (
            <Fragment key={to}>
              {to === "/facilities" && (
                <SpecialtyMenu id="mobile-services" onNavigate={() => setOpen(false)} />
              )}
              <Link
                className="nav-link"
                activeOptions={{ exact: to === "/" }}
                to={to}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </Fragment>
          ))}
          <Link className="nav-link" to="/patient-information" onClick={() => setOpen(false)}>
            Patient information
          </Link>
        </nav>
      </header>
    </>
  );
}
