import { createFileRoute, notFound } from "@tanstack/react-router";
import { SpecialityPage } from "@/components/inner-pages";
import { hospital, specialties } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/specialities/$speciality")({
  loader: ({ params }) => {
    const item = specialties.find((item) => item.slug === params.speciality);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead(
          `/specialities/${loaderData.slug}`,
          `${loaderData.name} | ${hospital.name}`,
          loaderData.detail,
        )
      : {},
  component: DetailPage,
});

function DetailPage() {
  return <SpecialityPage service={Route.useLoaderData()} />;
}
