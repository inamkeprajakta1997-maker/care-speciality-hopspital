import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/inner-pages";
import { pages } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("/contact", pages.contact.title, pages.contact.description),
  component: ContactPage,
});
