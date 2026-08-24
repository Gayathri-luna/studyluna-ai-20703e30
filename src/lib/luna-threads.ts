import type { UIMessage } from "ai";

export const LUNA_VERSION = "LunaAI 7.0 🚀";
export const LUNA_SUBTITLE = "Your Multimodal AI Learning Assistant";

export const LEARN_MODES = [
  { id: "learn", label: "Learn", hint: "Detailed concept explanation" },
  { id: "exam", label: "Exam", hint: "Exam-focused structured answers" },
  { id: "quick", label: "Quick", hint: "Short, direct answers" },
  { id: "practice", label: "Practice", hint: "Questions and quizzes" },
  { id: "revision", label: "Revision", hint: "Fast revision notes" },
  { id: "project", label: "Project", hint: "Project guidance & builds" },
] as const;

export type LunaMode = (typeof LEARN_MODES)[number]["id"];

export const PODCAST_OUTPUTS = [
  { id: "short", label: "Short Summary" },
  { id: "detailed", label: "Detailed Summary" },
  { id: "takeaways", label: "Key Takeaways" },
  { id: "terms", label: "Important Terms" },
  { id: "questions", label: "Exam Questions" },
  { id: "flashcards", label: "Flashcards" },
] as const;

export type PodcastOutput = (typeof PODCAST_OUTPUTS)[number]["id"];

export type LunaThread = {
  id: string;
  title: string;
  updatedAt: number;
  mode: LunaMode;
  messages: UIMessage[];
};

const KEY = "luna-ai-threads-v7";

function isBrowser() {
  return typeof window !== "undefined";
}

export function newThreadId() {
  return isBrowser() && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

export function loadThreads(): LunaThread[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as LunaThread[]) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((thread) => thread && typeof thread.id === "string")
      .map((thread) => ({
        ...thread,
        updatedAt: typeof thread.updatedAt === "number" ? thread.updatedAt : 0,
        // A corrupted message would otherwise crash rendering or the API call.
        messages: Array.isArray(thread.messages)
          ? thread.messages.filter(
              (message) =>
                message &&
                typeof message.role === "string" &&
                Array.isArray(message.parts) &&
                message.parts.length > 0,
            )
          : [],
      }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}


/** Newest threads kept in localStorage. */
const MAX_THREADS = 30;
/** Newest messages kept per thread. */
const MAX_MESSAGES = 40;

/**
 * Attachments arrive as base64 data URLs. Persisting them blows the
 * localStorage quota and, worse, re-sends megabytes of history on every later
 * turn. Keep a lightweight text marker instead.
 */
function stripHeavyParts(messages: UIMessage[]): UIMessage[] {
  return messages.slice(-MAX_MESSAGES).map((message) => ({
    ...message,
    parts: message.parts.map((part) =>
      part.type === "file" && typeof part.url === "string" && part.url.startsWith("data:")
        ? { type: "text" as const, text: `📎 ${part.filename ?? "Attachment"}` }
        : part,
    ),
  })) as UIMessage[];
}

export function saveThreads(threads: LunaThread[]) {
  if (!isBrowser()) return;
  const capped = threads.slice(0, MAX_THREADS);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(capped));
  } catch {
    // Quota exceeded — keep only the most recent conversations.
    try {
      window.localStorage.setItem(KEY, JSON.stringify(capped.slice(0, 5)));
    } catch {
      /* give up silently rather than break the chat */
    }
  }
}

export function createThread(mode: LunaMode = "learn"): LunaThread {
  return { id: newThreadId(), title: "New chat", updatedAt: Date.now(), mode, messages: [] };
}

export function upsertThread(thread: LunaThread): LunaThread[] {
  const rest = loadThreads().filter((t) => t.id !== thread.id);
  const next = [
    { ...thread, messages: stripHeavyParts(thread.messages), updatedAt: Date.now() },
    ...rest,
  ].sort((a, b) => b.updatedAt - a.updatedAt);
  saveThreads(next);
  return next;
}


export function deleteThread(id: string): LunaThread[] {
  const next = loadThreads().filter((t) => t.id !== id);
  saveThreads(next);
  return next;
}

export function titleFromMessages(messages: UIMessage[], fallback = "New chat") {
  const first = messages.find((m) => m.role === "user");
  if (!first) return fallback;
  const text = first.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join(" ")
    .trim();
  if (!text) return "Media upload";
  return text.length > 48 ? `${text.slice(0, 48)}…` : text;
}
