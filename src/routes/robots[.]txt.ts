import { createFileRoute } from "@tanstack/react-router";
import { siteOrigin } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const origin = siteOrigin();
        return new Response(
          origin
            ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
            : "User-agent: *\nAllow: /\n",
          { headers: { "Content-Type": "text/plain; charset=utf-8" } },
        );
      },
    },
  },
});
