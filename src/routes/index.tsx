import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { pageHead, hospitalSchema } from "@/lib/seo";
import hero from "@/assets/stock/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "/",
      "Care Speciality Hospital | Chakan, Pune",
      "A 25-bed hospital in Chakan offering maternity care, general healthcare, trauma care, OPD and 24-hour hospital services.",
      hero,
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(hospitalSchema()) }],
  }),
  component: HomePage,
});
