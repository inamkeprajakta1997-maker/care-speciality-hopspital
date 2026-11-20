import { createFileRoute } from "@tanstack/react-router";
import { DoctorsPage } from "@/components/inner-pages";
import { pages } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/doctors/")({
  head: () => pageHead("/doctors", pages.doctors.title, pages.doctors.description),
  component: DoctorsPage,
});
