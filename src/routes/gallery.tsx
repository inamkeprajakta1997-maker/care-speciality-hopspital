import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/inner-pages";
import { pages } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => pageHead("/gallery", pages.gallery.title, pages.gallery.description),
  component: GalleryPage,
});
