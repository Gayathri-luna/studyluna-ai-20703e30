import { checkMediaRateLimit, verifyRequestUser } from "@/lib/ai-limit.server";
import { createFileRoute } from "@tanstack/react-router";

const MODEL = "google/gemini-3-pro-image";

/** Maps a gateway status to a short, honest, user-facing sentence. */
function describe(status: number): string {
  if (status === 402) return "AI credits are exhausted, so the image could not be generated.";
  if (status === 429) return "Too many image requests right now. Please wait a moment and retry.";
  if (status === 400) return "That image prompt could not be used. Try rewording it.";
  if (status >= 500) return "The image service is temporarily unavailable. Please retry.";
  return "Image generation failed. Please try again.";
}

export const Route = createFileRoute("/api/generate-image")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const verified = await verifyRequestUser(request);
        if ("error" in verified) return verified.error;

        const limited = checkMediaRateLimit(verified.userId, "image");
        if (limited) return limited;

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Image generation is not configured.", { status: 500 });

        let prompt = "";
        try {
          prompt = String(((await request.json()) as { prompt?: unknown }).prompt ?? "").trim();
        } catch {
          return new Response("Invalid image request.", { status: 400 });
        }
        if (!prompt) return new Response("Describe the image you want first.", { status: 400 });

        try {
          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
            method: "POST",
            headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: MODEL,
              messages: [{ role: "user", content: prompt.slice(0, 2000) }],
              modalities: ["image", "text"],
            }),
          });

          if (!upstream.ok) {
            console.error("[luna] image generation failed", upstream.status, await upstream.text().catch(() => ""));
            return new Response(describe(upstream.status), { status: upstream.status });
          }

          const payload = (await upstream.json()) as { data?: { b64_json?: string }[] };
          const b64 = payload.data?.[0]?.b64_json;
          if (!b64) {
            return new Response("The model returned no image. Please retry.", { status: 502 });
          }

          return Response.json({ image: `data:image/png;base64,${b64}` });
        } catch (error) {
          console.error("[luna] image generation error", error);
          return new Response("Could not reach the image service. Please retry.", { status: 502 });
        }
      },
    },
  },
});
