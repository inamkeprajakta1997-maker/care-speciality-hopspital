import { createFileRoute } from "@tanstack/react-router";
import { indexablePaths, siteOrigin } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const origin = siteOrigin();
        if (!origin)
          return new Response("Production site domain is not configured.", { status: 404 });
        const entries = indexablePaths
          .map((path) => `<url><loc>${origin}${path}</loc></url>`)
          .join("");
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
          {
            headers: { "Content-Type": "application/xml; charset=utf-8" },
          },
        );
      },
    },
  },
});
