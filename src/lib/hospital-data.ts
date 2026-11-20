export const hospital = {
  name: "Care Speciality Hospital",
  location: "Chakan, Medankarwadi, Pune, Maharashtra, India",
  shortLocation: "Chakan, Pune",
  beds: 25,
  phone: "+91 9960060698",
  phoneLink: "tel:+919960060698",
  whatsapp: "https://wa.me/919960060698",
  addressNote: "Exact street address to be confirmed",
} as const;

export const directions =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Medankarwadi, Chakan, Pune, Maharashtra");

export const specialties = [
  {
    slug: "maternity-care",
    name: "Maternity care",
    short: "Thoughtful care for mothers and families.",
    detail:
      "Speak with our team about maternity care and the services currently available at Care Speciality Hospital.",
    icon: "maternity",
  },
  {
    slug: "general-healthcare",
    name: "General healthcare",
    short: "Accessible healthcare for your everyday needs.",
    detail:
      "Contact the hospital to ask about general healthcare and the right next step for your visit.",
    icon: "health",
  },
  {
    slug: "trauma-care",
    name: "Trauma care",
    short: "Hospital services are available around the clock.",
    detail:
      "For urgent concerns, call the hospital directly to speak with the team about available trauma care.",
    icon: "trauma",
  },
  {
    slug: "outpatient-care",
    name: "OPD",
    short: "Reach out to enquire about an outpatient visit.",
    detail:
      "Contact the hospital to enquire about outpatient department (OPD) visits and availability.",
    icon: "opd",
  },
] as const;

export const mainNavigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Facilities", to: "/facilities" },
  { label: "Doctors", to: "/doctors" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

export const pages = {
  about: {
    title: "About Care Speciality Hospital | Chakan, Pune",
    description:
      "Learn about Care Speciality Hospital in Chakan, Medankarwadi, Pune: a 25-bed hospital offering maternity care, general healthcare, trauma care, OPD and 24-hour services.",
  },
  specialties: {
    title: "Specialities | Care Speciality Hospital, Chakan",
    description:
      "Explore maternity care, general healthcare, trauma care and OPD at Care Speciality Hospital in Chakan, Pune. Contact the hospital for service details.",
  },
  facilities: {
    title: "Facilities | Care Speciality Hospital, Chakan",
    description:
      "Get in touch with Care Speciality Hospital in Chakan to learn about its facilities. Hospital-specific photos and facility details can be confirmed with the team.",
  },
  doctors: {
    title: "Our Doctors | Care Speciality Hospital, Chakan",
    description:
      "Contact Care Speciality Hospital in Chakan for current doctor availability. Verified doctor profiles will be added when details are confirmed.",
  },
  appointment: {
    title: "Appointment Enquiry | Care Speciality Hospital",
    description:
      "Send an appointment enquiry to Care Speciality Hospital in Chakan via WhatsApp. Your message is an enquiry, not a confirmed appointment.",
  },
  patientInfo: {
    title: "Patient Information | Care Speciality Hospital",
    description:
      "Contact Care Speciality Hospital in Chakan for visit information, OPD availability and patient support. Call for urgent concerns.",
  },
  gallery: {
    title: "Hospital Gallery | Care Speciality Hospital, Chakan",
    description:
      "View illustrative imagery and find contact details for Care Speciality Hospital in Chakan. Hospital photographs can be added when provided.",
  },
  contact: {
    title: "Contact Care Speciality Hospital | Chakan, Pune",
    description:
      "Call or message Care Speciality Hospital at +91 9960060698. Located in Chakan, Medankarwadi, Pune, Maharashtra; exact street address to be confirmed.",
  },
  privacy: {
    title: "Privacy Policy | Care Speciality Hospital",
    description:
      "Privacy information for the Care Speciality Hospital website, including what happens when you send an enquiry through WhatsApp.",
  },
} as const;
