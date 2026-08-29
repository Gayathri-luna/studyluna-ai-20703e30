import { searchYouTube } from "@/lib/youtube-search.server";
import { createFileRoute } from "@tanstack/react-router";

/** Secure server-side YouTube search endpoint (the API key stays on the server). */
export const Route = createFileRoute("/api/search-youtube")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { query?: unknown; maxResults?: unknown; language?: unknown };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ error: "Invalid request body." }, { status: 400 });
        }

        const query = typeof body.query === "string" ? body.query.trim() : "";
        if (!query) return Response.json({ error: "A search query is required." }, { status: 400 });

        const result = await searchYouTube(query, {
          maxResults: typeof body.maxResults === "number" ? body.maxResults : 5,
          ...(typeof body.language === "string" ? { language: body.language } : {}),
        });

        if (!result.ok) return Response.json({ error: result.error }, { status: 502 });
        return Response.json({ videos: result.videos });
      },
    },
  },
});
