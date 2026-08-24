import { createFileRoute } from "@tanstack/react-router";
import { verifyRequestUser } from "@/lib/ai-limit.server";
import { extractVideoId, watchUrl } from "@/lib/youtube";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

type CaptionTrack = { baseUrl?: string; languageCode?: string; kind?: string };

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)));
}

function pickTrack(tracks: CaptionTrack[]): CaptionTrack | undefined {
  return (
    tracks.find((t) => t.languageCode === "en" && t.kind !== "asr") ??
    tracks.find((t) => t.languageCode?.startsWith("en")) ??
    tracks[0]
  );
}

export const Route = createFileRoute("/api/youtube-transcript")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const verified = await verifyRequestUser(request);
        if ("error" in verified) return verified.error;

        let url = "";
        try {
          url = String(((await request.json()) as { url?: unknown }).url ?? "").trim();
        } catch {
          return new Response("Invalid request.", { status: 400 });
        }

        const videoId = extractVideoId(url);
        if (!videoId) return new Response("That is not a valid YouTube link.", { status: 400 });

        try {
          const page = await fetch(watchUrl(videoId), {
            headers: { "User-Agent": UA, "Accept-Language": "en-US,en;q=0.9" },
          });
          if (!page.ok) {
            return Response.json(
              { videoId, transcript: null, reason: "YouTube did not return the video page." },
              { status: 200 },
            );
          }
          const html = await page.text();

          const titleMatch = html.match(/<meta name="title" content="([^"]*)"/);
          const title = titleMatch ? decodeEntities(titleMatch[1]!) : null;

          const captionsMatch = html.match(/"captionTracks":(\[.*?\])/);
          if (!captionsMatch) {
            return Response.json({
              videoId,
              title,
              transcript: null,
              reason: "This video has no captions available, so its transcript can't be read automatically.",
            });
          }

          const tracks = JSON.parse(captionsMatch[1]!.replace(/\\u0026/g, "&")) as CaptionTrack[];
          const track = pickTrack(tracks);
          if (!track?.baseUrl) {
            return Response.json({
              videoId,
              title,
              transcript: null,
              reason: "No usable caption track was found for this video.",
            });
          }

          const captionsUrl = `${track.baseUrl.replace(/\\u0026/g, "&")}&fmt=json3`;
          const captions = await fetch(captionsUrl, { headers: { "User-Agent": UA } });
          if (!captions.ok) {
            return Response.json({
              videoId,
              title,
              transcript: null,
              reason: "YouTube refused the transcript request.",
            });
          }

          const payload = (await captions.json()) as {
            events?: { segs?: { utf8?: string }[] }[];
          };
          const text = (payload.events ?? [])
            .flatMap((event) => (event.segs ?? []).map((seg) => seg.utf8 ?? ""))
            .join("")
            .replace(/\s+\n/g, "\n")
            .replace(/[ \t]{2,}/g, " ")
            .trim();

          if (!text) {
            return Response.json({
              videoId,
              title,
              transcript: null,
              reason: "The transcript came back empty.",
            });
          }

          return Response.json({ videoId, title, transcript: text.slice(0, 60000) });
        } catch (error) {
          console.error("[luna] youtube transcript error", error);
          return Response.json({
            videoId,
            transcript: null,
            reason: "Could not reach YouTube for this video.",
          });
        }
      },
    },
  },
});
