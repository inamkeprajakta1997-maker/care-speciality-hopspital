import { createFileRoute } from "@tanstack/react-router";
import { AppointmentPage } from "@/components/inner-pages";
import { pages } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/appointment")({
  validateSearch: (search: Record<string, unknown>): { service?: string } =>
    typeof search["service"] === "string" ? { service: search["service"] } : {},
  head: () => pageHead("/appointment", pages.appointment.title, pages.appointment.description),
  component: AppointmentRoute,
});

function AppointmentRoute() {
  return <AppointmentPage service={Route.useSearch().service} />;
}
