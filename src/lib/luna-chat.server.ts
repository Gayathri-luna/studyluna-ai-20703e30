import type { UIMessage } from "ai";

/** Newest N messages kept per request — protects against oversized histories. */
export const MAX_HISTORY_MESSAGES = 24;
/** Hard cap on characters of text in a single message. */
export const MAX_TEXT_CHARS = 60_000;

type AnyPart = { type: string; [key: string]: unknown };

function isSupportedPart(part: AnyPart): boolean {
  if (part.type === "text") return typeof part["text"] === "string" && part["text"].trim() !== "";
  if (part.type === "file") return typeof part["url"] === "string" && part["url"] !== "";
  return false;
}

/**
 * Drops parts the model cannot consume (step markers, tool noise, stripped
 * attachment placeholders re-hydrated from localStorage) and trims oversized
 * text so one bad history entry can never 400 the whole conversation.
 */
export function sanitizeMessages(input: unknown): UIMessage[] {
  if (!Array.isArray(input)) return [];

  const cleaned: UIMessage[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const message = raw as { id?: unknown; role?: unknown; parts?: unknown };
    const role = message.role;
    if (role !== "user" && role !== "assistant" && role !== "system") continue;
    if (!Array.isArray(message.parts)) continue;

    const parts = (message.parts as AnyPart[]).filter(isSupportedPart).map((part) =>
      part.type === "text"
        ? { type: "text", text: String(part["text"]).slice(0, MAX_TEXT_CHARS) }
        : part,
    );
    if (parts.length === 0) continue;

    cleaned.push({
      id: typeof message.id === "string" ? message.id : crypto.randomUUID(),
      role,
      parts,
    } as UIMessage);
  }

  const trimmed = cleaned.slice(-MAX_HISTORY_MESSAGES);
  // A conversation must start from a user turn for the model to answer it.
  while (trimmed.length > 0 && trimmed[0]!.role === "assistant") trimmed.shift();
  return trimmed;
}

/** Maps any failure into a short, user-facing, actionable message. */
export function describeAiFailure(error: unknown): string {
  const raw =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : JSON.stringify(error ?? "");
  const status = (error as { statusCode?: number; status?: number } | null)?.statusCode ??
    (error as { status?: number } | null)?.status;

  const matched = status ?? Number(raw.match(/\b(400|401|402|403|404|408|429|5\d\d)\b/)?.[1]);

  switch (matched) {
    case 400:
      return "LunaAI could not read that request. Try shortening the message or removing the attachment.";
    case 401:
    case 403:
      return "Your session expired. Please log in again to keep chatting with LunaAI.";
    case 404:
      return "That LunaAI model is unavailable right now. Switch models and try again.";
    case 402:
      return "AI credits are exhausted. Please add credits to continue using LunaAI.";
    case 408:
      return "LunaAI took too long to answer. Please try again.";
    case 429:
      return "Too many requests right now. Please wait a moment and try again.";
    default:
      if (matched && matched >= 500) {
        return "The AI service is temporarily unavailable. Please try again in a moment.";
      }
      if (/fetch failed|network|ECONN|socket/i.test(raw)) {
        return "Network problem reaching LunaAI. Check your connection and try again.";
      }
      return "LunaAI could not respond. Please try again.";
  }
}
