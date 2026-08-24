import { checkMediaRateLimit, verifyRequestUser } from "@/lib/ai-limit.server";
import { createFileRoute } from "@tanstack/react-router";

const MODEL = "openai/gpt-4o-mini-tts";
const MAX_SCRIPT_CHARS = 4000;

function describe(status: number): string {
  if (status === 402) return "AI credits are exhausted, so the audio could not be generated.";
  if (status === 429) return "Too many audio requests right now. Please wait a moment and retry.";
  if (status === 400) return "That script could not be narrated. Try shortening it.";
  if (status >= 500) return "The audio service is temporarily unavailable. Please retry.";
  return "Audio generation failed. Please try again.";
}

export const Route = createFileRoute("/api/generate-audio")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const verified = await verifyRequestUser(request);
        if ("error" in verified) return verified.error;

        const limited = checkMediaRateLimit(verified.userId, "audio");
        if (limited) return limited;

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Audio generation is not configured.", { status: 500 });

        let script = "";
        let voice = "alloy";
        try {
          const body = (await request.json()) as { script?: unknown; voice?: unknown };
          script = String(body.script ?? "").trim();
          if (typeof body.voice === "string" && body.voice) voice = body.voice;
        } catch {
          return new Response("Invalid audio request.", { status: 400 });
        }
        if (!script) return new Response("There is no script to narrate yet.", { status: 400 });

        try {
          const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
            method: "POST",
            headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: MODEL,
              input: script.slice(0, MAX_SCRIPT_CHARS),
              voice,
              response_format: "mp3",
            }),
          });

          if (!upstream.ok) {
            console.error("[luna] tts failed", upstream.status, await upstream.text().catch(() => ""));
            return new Response(describe(upstream.status), { status: upstream.status });
          }

          return new Response(upstream.body, {
            headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
          });
        } catch (error) {
          console.error("[luna] tts error", error);
          return new Response("Could not reach the audio service. Please retry.", { status: 502 });
        }
      },
    },
  },
});
