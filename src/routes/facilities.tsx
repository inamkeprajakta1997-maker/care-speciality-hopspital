import { createFileRoute } from "@tanstack/react-router";
import { FacilitiesPage } from "@/components/inner-pages";
import { pages } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/facilities")({
  head: () => pageHead("/facilities", pages.facilities.title, pages.facilities.description),
  component: FacilitiesPage,
});
