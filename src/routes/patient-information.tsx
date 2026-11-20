import { createFileRoute } from "@tanstack/react-router";
import { PatientPage } from "@/components/inner-pages";
import { pages } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/patient-information")({
  head: () =>
    pageHead("/patient-information", pages.patientInfo.title, pages.patientInfo.description),
  component: PatientPage,
});
