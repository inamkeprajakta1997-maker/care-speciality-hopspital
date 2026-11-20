import { createFileRoute, notFound } from "@tanstack/react-router";
import { DoctorPage, findDoctor } from "@/components/inner-pages";
import { hospital } from "@/lib/hospital-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/doctors/$doctor")({
  loader: ({ params }) => {
    const item = findDoctor(params.doctor);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData: doctor }) => {
    if (!doctor) return {};
    const head = pageHead(
      `/doctors/${doctor.slug}`,
      `${doctor.service} doctor profile | ${hospital.name}`,
      "Placeholder doctor profile. Call the hospital for current availability.",
    );
    return { ...head, meta: [...head.meta, { name: "robots", content: "noindex, follow" }] };
  },
  component: DetailPage,
});

function DetailPage() {
  return <DoctorPage doctor={Route.useLoaderData()} />;
}
