import { createFileRoute } from "@tanstack/react-router";
import { SpecialitiesPage } from "@/components/inner-pages";
import { pages } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/specialities/")({
  head: () => pageHead("/specialities", pages.specialties.title, pages.specialties.description),
  component: SpecialitiesPage,
});
