import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/inner-pages";
import { pages } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("/privacy", pages.privacy.title, pages.privacy.description),
  component: PrivacyPage,
});
