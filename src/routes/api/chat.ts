import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { checkGuestRateLimit, consumeAiQuota, verifyRequestUser } from "@/lib/ai-limit.server";
import { describeAiFailure, sanitizeMessages } from "@/lib/luna-chat.server";
import { searchYouTube } from "@/lib/youtube-search.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, stepCountIs, streamText, tool, type UIMessage } from "ai";
import { z } from "zod";


const BASE_PROMPT = `You are Luna AI, a friendly and intelligent learning assistant for engineering students across every branch (CSE, IT, ECE, EEE, Mechanical, Civil, Chemical, AI/ML, Robotics and more), covering core subjects, programming, maths, physics and chemistry.

Talk naturally, like a normal ChatGPT conversation. Be clear, practical and interactive — not textbook-like unless the student asks for textbook-style notes.

You can also work with attachments:
- Images: handwritten notes, textbook pages, question papers, maths problems, circuit diagrams, screenshots. Read them, identify what's there, and solve or explain step by step.
- Audio and podcasts (mp3/wav): get the gist, then summarise, explain the hard parts, and make notes or questions when asked.
- Documents and pasted text: summarise, explain, simplify, extract key points.
Never claim to have analysed a photo, audio file or document that was not actually attached. If nothing is attached, say so and ask for the upload.

MATH FORMATTING (strict):
- Never use dollar signs for maths. No LaTeX at all: no $...$, no $$...$$, no \\(...\\), no \\[...\\], no \\frac, \\ge, \\times, etc.
- Write maths in plain text: "VGS = 3 V", "VOV = VGS - VTH", "ID = ½ × kn × (VGS - VTH)²".
- Use Unicode symbols where useful: × ÷ ≥ ≤ ≈ → Ω μ √ ² ³ π Δ °.

RESPONSE STYLE:
- Explanation first, then formulas or examples when they help.
- Match the answer length to the question: simple question → simple answer; "explain in detail" → detailed answer.
- Avoid excessive headings, tables, emojis and decorative formatting. Use markdown only when it genuinely improves readability.

YOUTUBE VIDEOS (strict):
- Whenever the student asks for a YouTube video, tutorial, lecture, course, song, review or "give me a link", you MUST call the search_youtube tool and answer only with the videos it returns.
- Never invent, guess or recall a YouTube video ID or URL from memory. Only URLs returned by the tool are allowed.
- Show the top 3–5 results as a markdown list: [Video title](url) — Channel name.
- Match the student's language in the search query when possible.
- If the tool returns an error or no videos, say so plainly and suggest a different search — never fabricate a link.

LINKS:
- You CAN and SHOULD share links. Never refuse to give a link. Use markdown links, e.g. [Roadmaps](/roadmaps).
- When a student asks where to learn, practise or find something on StudyLUNA, link the real internal pages:
  [Roadmaps](/roadmaps), [Skills](/skills), [Projects](/projects), [Government Jobs](/government-jobs),
  [Resources](/resources), [Hub](/hub), [My Plan](/my-plan), [Industry News](/industry-news), [Community](/community).
  Detail pages follow the pattern /roadmaps/<branch-slug>, /skills/<skill-slug>, /government-jobs/<job-slug>, /resources/<category-slug>.
- For external material, link only well-known, stable, real URLs (official docs, NPTEL, MIT OCW, official exam boards). Never invent a URL — if unsure of the exact address, name the source instead of guessing.
- Do not append promotional link sections to unrelated answers; link only when it genuinely helps the question asked.

IMAGES AND AUDIO:
- The chat has separate "Generate image" and "Generate audio" buttons that call real generation services.
- Never claim you generated, drew, produced or attached an image or audio clip yourself. If a student asks for one, point them to those buttons (or write a narration script for them).
- If a generation attempt failed, say honestly that it failed and suggest retrying — never pretend it succeeded.`;

const MODE_PROMPTS: Record<string, string> = {
  learn:
    "MODE: Learn. Explain the idea simply and conversationally, with intuition and a short worked example when it helps.",
  exam:
    "MODE: Exam. Give an exam-ready answer: the definition, the key steps or derivation, the important formulas in plain text, and a short conclusion.",
  quick: "MODE: Quick. Answer in under 120 words. Straight to the point, no filler.",
  practice:
    "MODE: Practice. Give practice questions on the topic (mix of conceptual and numerical), then the answers with brief explanations at the end.",
  revision:
    "MODE: Revision. Compact revision notes: key points, formulas in plain text, and common mistakes.",
  project:
    "MODE: Project. Practical project guidance: objective, components/tools, step-by-step build procedure, testing, and a couple of extensions.",
};


const MODEL_MAP: Record<string, string> = {
  lite: "google/gemini-3.1-flash-lite",
  v3: "google/gemini-3.6-flash",
  pro: "google/gemini-3.1-pro-preview",
  research: "google/gemini-2.5-pro",
};

type ChatRequestBody = { messages?: unknown; mode?: unknown; model?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Guests get a small free trial; signed-in students get the full daily quota.
        const isGuest = !request.headers.get("authorization");
        const verified = isGuest ? null : await verifyRequestUser(request);
        if (verified && "error" in verified) return verified.error;

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response(
            "LunaAI is not configured yet (missing AI credentials). Please contact support.",
            { status: 500 },
          );
        }

        let body: ChatRequestBody;
        try {
          body = (await request.json()) as ChatRequestBody;
        } catch {
          return new Response("LunaAI received an invalid request. Please try again.", {
            status: 400,
          });
        }

        const { mode, model } = body;
        const messages = sanitizeMessages(body.messages);
        if (messages.length === 0) {
          return new Response("Please type a message before sending.", { status: 400 });
        }

        let modelMessages;
        try {
          modelMessages = await convertToModelMessages(messages);
        } catch (error) {
          console.error("[luna] failed to convert messages", error);
          return new Response(
            "This conversation could not be read. Start a new chat and try again.",
            { status: 400 },
          );
        }

        const limited = verified
          ? await consumeAiQuota(verified.userId)
          : checkGuestRateLimit(request);
        if (limited) return limited;

        const modePrompt =
          typeof mode === "string" && MODE_PROMPTS[mode] ? MODE_PROMPTS[mode] : MODE_PROMPTS["learn"];

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway((typeof model === "string" && MODEL_MAP[model]) || MODEL_MAP["v3"]!),
          system: `${BASE_PROMPT}\n\n${modePrompt}`,
          messages: modelMessages,
          tools: {
            search_youtube: tool({
              description:
                "Search YouTube for real videos. Use this for any request for a video, tutorial, lecture, course, song or YouTube link. Returns verified video titles, channels and URLs.",
              inputSchema: z.object({
                query: z.string().describe("The YouTube search query."),
                language: z
                  .string()
                  .nullable()
                  .describe("Optional ISO language code such as en, hi, te."),
              }),
              execute: async ({ query, language }) => {
                const result = await searchYouTube(query, {
                  maxResults: 5,
                  ...(language ? { language } : {}),
                });
                if (!result.ok) return { error: result.error, videos: [] };
                return { videos: result.videos };
              },
            }),
          },
          stopWhen: stepCountIs(50),
          // Only aborts when the user presses Stop or closes the tab.
          abortSignal: request.signal,
          onError: ({ error }) => {
            console.error("[luna] stream error", error);
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          onError: (error) => describeAiFailure(error),
        });
      },

    },
  },
});
