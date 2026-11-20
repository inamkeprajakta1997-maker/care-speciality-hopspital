import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/inner-pages";
import { pages } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("/about", pages.about.title, pages.about.description),
  component: AboutPage,
});
