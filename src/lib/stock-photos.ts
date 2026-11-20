import maternityCard from "@/assets/stock/maternity-card.jpg";
import generalCard from "@/assets/stock/general-card.jpg";
import traumaCard from "@/assets/stock/trauma-card.jpg";
import opdCard from "@/assets/stock/opd-card.jpg";
import maternityDetail from "@/assets/stock/maternity-detail.jpg";
import generalDetail from "@/assets/stock/general-detail.jpg";
import traumaDetail from "@/assets/stock/trauma-detail.jpg";
import opdDetail from "@/assets/stock/opd-detail.jpg";
import overviewMaternity from "@/assets/stock/overview-maternity.jpg";
import overviewGeneral from "@/assets/stock/overview-general.jpg";
import overviewOpd from "@/assets/stock/overview-opd.jpg";
import overviewTrauma from "@/assets/stock/overview-trauma.jpg";

export const specialityPhotos = {
  maternity: {
    card: { src: maternityCard, alt: "Pregnant patient receiving a consultation" },
    overview: { src: overviewMaternity, alt: "Clinician explaining prenatal care" },
    detail: { src: maternityDetail, alt: "Expectant parents meeting a maternity clinician" },
  },
  health: {
    card: { src: generalCard, alt: "Doctor checking a patient" },
    overview: { src: overviewGeneral, alt: "Doctor checking a patient's pulse" },
    detail: { src: generalDetail, alt: "Doctor consulting with a patient" },
  },
  trauma: {
    card: { src: traumaCard, alt: "Ambulance at an emergency department entrance" },
    overview: { src: overviewTrauma, alt: "Hospital staff assisting a patient in a wheelchair" },
    detail: { src: traumaDetail, alt: "Hospital corridor with medical equipment" },
  },
  opd: {
    card: { src: opdCard, alt: "Patient visiting a doctor's office" },
    overview: { src: overviewOpd, alt: "Nurse guiding a patient in an outpatient area" },
    detail: { src: opdDetail, alt: "Doctor taking notes during a consultation" },
  },
} as const;
