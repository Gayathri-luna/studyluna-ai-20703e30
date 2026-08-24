import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Mic,
  Radio,
  FileText,
  X,
  Copy,
  Check,
  RotateCcw,
  Square,
  Eraser,
  Youtube,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { readLunaModel } from "@/lib/luna-models";
import { extractVideoId, findYouTubeLink, watchUrl } from "@/lib/youtube";
import { supabase } from "@/integrations/supabase/client";
import {
  LEARN_MODES,
  PODCAST_OUTPUTS,
  loadThreads,
  titleFromMessages,
  upsertThread,
  type LunaMode,
  type LunaThread,
  type PodcastOutput,
} from "@/lib/luna-threads";

export const Route = createFileRoute("/luna-ai/$threadId")({
  component: LunaThreadPage,
});

const IMAGE_TYPES = "image/png,image/jpeg,image/jpg,image/webp,image/gif";
const AUDIO_TYPES = "audio/mpeg,audio/mp3,audio/wav,audio/x-wav";
const DOC_TYPES = "application/pdf,text/plain,text/markdown,text/csv";
const MAX_FILE_MB = 20;

const SUGGESTIONS = [
  "Explain a tough concept from my subject with a worked example",
  "Upload a photo of a problem or diagram and I'll explain it",
  "Turn my lecture recording into revision notes",
  "Give me a step-by-step mini project for my branch",
];

const PODCAST_PROMPTS: Record<PodcastOutput, string> = {
  short: "Give a short summary (under 150 words) of this audio.",
  detailed:
    "Give a detailed structured summary of this audio: topic, sections covered, and explanations of the difficult parts.",
  takeaways: "List the key takeaways from this audio as bullets, most important first.",
  terms: "Extract the important technical terms from this audio and define each in one line.",
  questions:
    "Generate 10 exam-style questions from this audio (mix conceptual and numerical) with brief answers.",
  flashcards: "Create flashcards from this audio as a markdown table with Question | Answer columns.",
};

type Attachment = { id: string; file: File; url: string };

type MediaItem = {
  id: string;
  kind: "image" | "audio";
  prompt: string;
  status: "loading" | "done" | "error";
  url?: string;
  error?: string;
};

/**
 * The backend already maps every failure to a friendly sentence, so prefer its
 * text and only fall back for transport-level failures it never reached.
 */
function friendlyError(error: unknown): string {
  const raw = (error instanceof Error ? error.message : String(error ?? "")).trim();
  if (!raw || /^(error|failed to fetch|load failed)$/i.test(raw)) {
    return "Could not reach LunaAI. Check your connection and try again.";
  }
  if (/<\/?[a-z]/i.test(raw) || raw.length > 220) {
    return "LunaAI could not respond. Please try again.";
  }
  return raw;
}


function MessageMarkdown({ text }: { text: string }) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-code:text-primary">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const url = String(href ?? "");
            const internal = url.startsWith("/");
            return (
              <a
                href={url}
                {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copy response"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function LunaThreadPage() {
  const { threadId } = Route.useParams();
  const { topic } = useSearch({ from: "/luna-ai" }) as { topic?: string };
  const stored = useMemo<LunaThread | undefined>(
    () => loadThreads().find((t) => t.id === threadId),
    [threadId],
  );

  return (
    <ChatWindow
      key={threadId}
      threadId={threadId}
      initialMessages={stored?.messages ?? []}
      initialMode={stored?.mode ?? "learn"}
      initialInput={topic ? `Explain ${topic} to me in simple terms, and how I should learn it.` : ""}
    />
  );
}

function ChatWindow({
  threadId,
  initialMessages,
  initialMode,
  initialInput,
}: {
  threadId: string;
  initialMessages: LunaThread["messages"];
  initialMode: LunaMode;
  initialInput: string;
}) {
  const [mode, setMode] = useState<LunaMode>(initialMode);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: async ({ messages }) => {
          const { data } = await supabase.auth.getSession();
          const token = data.session?.access_token;
          return {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: { messages, mode: modeRef.current, model: readLunaModel() },
          };
        },
      }),
    [],
  );

  const [input, setInput] = useState(initialInput);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [podcastOpen, setPodcastOpen] = useState(false);
  const [youtubeOpen, setYoutubeOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubePaste, setYoutubePaste] = useState("");
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [youtubeNeedsPaste, setYoutubeNeedsPaste] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const podcastInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errorText, setErrorText] = useState<string | null>(null);
  const sendingRef = useRef(false);
  const [media, setMedia] = useState<MediaItem[]>([]);

  const patchMedia = (id: string, patch: Partial<MediaItem>) =>
    setMedia((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const authHeaders = async (): Promise<Record<string, string>> => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  /** Calls the generation route and always resolves the card into done or error. */
  const generateMedia = async (kind: "image" | "audio", prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      toast.error(
        kind === "image"
          ? "Describe the image you want, then press Generate image."
          : "Type or generate a script first, then press Generate audio.",
      );
      return;
    }

    const id = `${kind}-${Date.now()}-${Math.random()}`;
    setMedia((prev) => [...prev, { id, kind, prompt: trimmed, status: "loading" }]);

    try {
      const response = await fetch(kind === "image" ? "/api/generate-image" : "/api/generate-audio", {
        method: "POST",
        headers: await authHeaders(),
        body: JSON.stringify(kind === "image" ? { prompt: trimmed } : { script: trimmed }),
      });

      if (!response.ok) {
        const message =
          (await response.text().catch(() => "")).trim() ||
          `${kind === "image" ? "Image" : "Audio"} generation failed. Please retry.`;
        patchMedia(id, { status: "error", error: message.slice(0, 220) });
        toast.error(message.slice(0, 220));
        return;
      }

      if (kind === "image") {
        const payload = (await response.json()) as { image?: string };
        if (!payload.image) throw new Error("No image returned.");
        patchMedia(id, { status: "done", url: payload.image });
      } else {
        const blob = await response.blob();
        patchMedia(id, { status: "done", url: URL.createObjectURL(blob) });
      }
    } catch (error) {
      const message = friendlyError(error);
      patchMedia(id, { status: "error", error: message });
      toast.error(message);
    }
  };

  const { messages, sendMessage, status, stop, setMessages } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onError: (error) => {
      sendingRef.current = false;
      const message = friendlyError(error);
      setErrorText(message);
      toast.error(message);
    },
    onFinish: () => {
      sendingRef.current = false;
      setErrorText(null);
    },
  });

  const lastAssistantText = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i]!;
      if (message.role !== "assistant") continue;
      const text = message.parts.map((p) => (p.type === "text" ? p.text : "")).join("").trim();
      if (text) return text;
    }
    return "";
  }, [messages]);

  const isLoading = status === "submitted" || status === "streaming";

  // Never leave the UI stuck on "Thinking…" if the stream ends abnormally.
  useEffect(() => {
    if (!isLoading) sendingRef.current = false;
  }, [isLoading]);


  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId]);

  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus();
  }, [isLoading]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  // Persist the thread whenever the conversation settles.
  useEffect(() => {
    if (isLoading) return;
    const existing = loadThreads().find((t) => t.id === threadId);
    if (!existing && messages.length === 0) return;
    upsertThread({
      id: threadId,
      title: titleFromMessages(messages, existing?.title ?? "New chat"),
      updatedAt: Date.now(),
      mode,
      messages,
    });
    window.dispatchEvent(new Event("luna-threads-changed"));
  }, [messages, isLoading, threadId, mode]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next: Attachment[] = [];
    for (const file of Array.from(list)) {
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        toast.error(`${file.name} is larger than ${MAX_FILE_MB}MB.`);
        continue;
      }
      if (file.type.startsWith("audio/") && !/mpeg|mp3|wav/.test(file.type)) {
        toast.error("Audio must be mp3 or wav so LunaAI can actually process it.");
        continue;
      }
      next.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
      });
    }
    if (next.length) setAttachments((prev) => [...prev, ...next]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((a) => a.id !== id);
    });
  };

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed && attachments.length === 0) return;
    // Guards rapid double clicks / Enter presses before React flushes status.
    if (isLoading || sendingRef.current) return;
    sendingRef.current = true;
    setErrorText(null);

    try {
      const textFiles = attachments.filter(
        (a) => a.file.type.startsWith("text/") || a.file.name.endsWith(".md"),
      );
      const binaryFiles = attachments.filter((a) => !textFiles.includes(a));

      let prompt =
        trimmed ||
        (binaryFiles.some((a) => a.file.type.startsWith("audio"))
          ? "Summarise this audio: key points, difficult parts explained, and revision notes."
          : "Analyse this attachment and explain it clearly, step by step.");

      for (const doc of textFiles) {
        const content = await doc.file.text();
        prompt += `\n\n--- Document: ${doc.file.name} ---\n${content.slice(0, 20000)}`;
      }

      const dataTransfer = new DataTransfer();
      binaryFiles.forEach((a) => dataTransfer.items.add(a.file));

      setInput("");
      setLastPrompt(prompt);
      void sendMessage(
        binaryFiles.length ? { text: prompt, files: dataTransfer.files } : { text: prompt },
      );
      attachments.forEach((a) => URL.revokeObjectURL(a.url));
      setAttachments([]);
      setPodcastOpen(false);
    } catch (error) {
      sendingRef.current = false;
      const message = friendlyError(error);
      setErrorText(message);
      toast.error(message);
    }
  };

  const runPodcast = (output: PodcastOutput) => {
    if (!attachments.some((a) => a.file.type.startsWith("audio/"))) {
      toast.error("Upload a podcast/audio file (mp3 or wav) first.");
      return;
    }
    void submit(
      `${PODCAST_PROMPTS[output]}\n\nAlso give the flow: transcript gist → summary → key points → important concepts → questions → revision notes.`,
    );
  };

  const clearChat = () => {
    stop();
    sendingRef.current = false;
    setMessages([]);
    setInput("");
    setErrorText(null);
    setAttachments([]);
    upsertThread({ id: threadId, title: "New chat", updatedAt: Date.now(), mode, messages: [] });
    window.dispatchEvent(new Event("luna-threads-changed"));
    textareaRef.current?.focus();
  };

  const regenerate = () => {
    if (!lastPrompt || isLoading || sendingRef.current) return;
    sendingRef.current = true;
    setErrorText(null);
    void sendMessage({ text: lastPrompt });
  };


  return (
    <section className="flex min-h-[70vh] flex-col">
      <div className="flex flex-wrap items-center gap-2">
        {LEARN_MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            title={item.hint}
            onClick={() => setMode(item.id)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-all duration-200 hover:scale-[1.04] active:scale-95 motion-reduce:hover:scale-100 ${
              mode === item.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {item.label} Mode
          </button>
        ))}
        <button
          type="button"
          onClick={() => void generateMedia("image", input)}
          className="ml-auto inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ImageIcon className="h-3 w-3" />
          Generate image
        </button>
        <button
          type="button"
          onClick={() => void generateMedia("audio", input.trim() || lastAssistantText)}
          className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Radio className="h-3 w-3" />
          Generate audio
        </button>
        <button
          type="button"
          onClick={clearChat}
          className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Eraser className="h-3 w-3" />
          Clear chat
        </button>
      </div>

      <div
        ref={scrollRef}
        className="mt-4 flex-1 space-y-5 overflow-y-auto rounded-xl border border-border bg-muted/30 p-4"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              Ask a question, or upload a photo, recording, podcast or document.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void submit(suggestion)}
                  className="rounded-full border border-border bg-background px-4 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => {
            const isUser = message.role === "user";
            const text = message.parts
              .map((part) => (part.type === "text" ? part.text : ""))
              .join("");
            const files = message.parts.filter(
              (part): part is Extract<typeof part, { type: "file" }> => part.type === "file",
            );

            if (isUser) {
              return (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] space-y-2">
                    {files.length > 0 && (
                      <div className="flex flex-wrap justify-end gap-2">
                        {files.map((file, index) =>
                          file.mediaType?.startsWith("image/") ? (
                            <img
                              key={index}
                              src={file.url}
                              alt={file.filename ?? "Uploaded image"}
                              className="h-28 w-28 rounded-lg border border-border object-cover"
                            />
                          ) : file.mediaType?.startsWith("audio/") ? (
                            <audio
                              key={index}
                              controls
                              src={file.url}
                              className="w-56 rounded-lg border border-border"
                            />
                          ) : (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground"
                            >
                              <FileText className="h-3 w-3" />
                              {file.filename ?? "Attachment"}
                            </span>
                          ),
                        )}
                      </div>
                    )}
                    {text && (
                      <div className="whitespace-pre-wrap rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground">
                        {text}
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={message.id} className="space-y-1">
                <MessageMarkdown text={text} />
                {text && !isLoading && (
                  <div className="flex items-center gap-1">
                    <CopyButton text={text} />
                    <button
                      type="button"
                      onClick={regenerate}
                      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Regenerate
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}

        {status === "submitted" && (
          <p className="animate-pulse text-sm text-muted-foreground">LunaAI is thinking…</p>
        )}

        {media.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-border bg-background p-3 text-sm"
          >
            <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              {item.kind === "image" ? (
                <ImageIcon className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Radio className="h-3.5 w-3.5 text-primary" />
              )}
              <span className="line-clamp-1">{item.prompt}</span>
            </p>

            {item.status === "loading" && (
              <p className="animate-pulse text-xs text-muted-foreground">
                {item.kind === "image" ? "Generating image…" : "Generating audio…"}
              </p>
            )}

            {item.status === "done" && item.kind === "image" && item.url && (
              <img
                src={item.url}
                alt={item.prompt}
                className="max-h-80 w-full rounded-lg border border-border object-contain"
              />
            )}

            {item.status === "done" && item.kind === "audio" && item.url && (
              <audio controls src={item.url} className="w-full" />
            )}

            {item.status === "error" && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-destructive">
                <span className="flex-1">{item.error}</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setMedia((prev) => prev.filter((m) => m.id !== item.id));
                    void generateMedia(item.kind, item.prompt);
                  }}
                >
                  <RotateCcw className="mr-1 h-3 w-3" />
                  Retry
                </Button>
              </div>
            )}
          </div>
        ))}

        {errorText && !isLoading && (
          <div
            role="alert"
            className="flex flex-wrap items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground"
          >
            <span className="flex-1">{errorText}</span>
            {lastPrompt && (
              <Button type="button" size="sm" variant="outline" onClick={regenerate}>
                <RotateCcw className="mr-1 h-3 w-3" />
                Retry
              </Button>
            )}
            <button
              type="button"
              aria-label="Dismiss error"
              onClick={() => setErrorText(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {podcastOpen && (
        <div className="mt-3 rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">🎙️ Podcast learning</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Upload an mp3/wav episode, then pick what LunaAI should produce.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => podcastInputRef.current?.click()}
          >
            <Radio className="mr-1 h-4 w-4" />
            Choose podcast file
          </Button>
          <div className="mt-3 flex flex-wrap gap-2">
            {PODCAST_OUTPUTS.map((output) => (
              <button
                key={output.id}
                type="button"
                onClick={() => runPodcast(output.id)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {output.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {attachments.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="relative flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground"
            >
              {attachment.file.type.startsWith("image/") ? (
                <img
                  src={attachment.url}
                  alt={attachment.file.name}
                  className="h-8 w-8 rounded object-cover"
                />
              ) : attachment.file.type.startsWith("audio/") ? (
                <Mic className="h-4 w-4 text-primary" />
              ) : (
                <FileText className="h-4 w-4 text-primary" />
              )}
              <span className="max-w-[10rem] truncate">{attachment.file.name}</span>
              <button
                type="button"
                aria-label={`Remove ${attachment.file.name}`}
                onClick={() => removeAttachment(attachment.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form
        className="mt-3 flex items-end gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void submit(input);
        }}
      >
        <input
          ref={imageInputRef}
          type="file"
          accept={IMAGE_TYPES}
          multiple
          hidden
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <input
          ref={audioInputRef}
          type="file"
          accept={AUDIO_TYPES}
          hidden
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <input
          ref={podcastInputRef}
          type="file"
          accept={AUDIO_TYPES}
          hidden
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept={`${IMAGE_TYPES},${AUDIO_TYPES},${DOC_TYPES}`}
          multiple
          hidden
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />

        <div className="flex flex-wrap gap-1">
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Upload photo"
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Upload audio (mp3 or wav)"
            onClick={() => audioInputRef.current?.click()}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant={podcastOpen ? "default" : "outline"}
            aria-label="Podcast learning"
            onClick={() => setPodcastOpen((open) => !open)}
          >
            <Radio className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Attach file or document"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>

        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void submit(input);
            }
          }}
          placeholder="Ask anything, or attach a photo, recording, podcast or document…"
          rows={2}
          className="resize-none"
        />

        {isLoading ? (
          <Button type="button" size="icon" variant="outline" onClick={() => stop()}>
            <Square className="h-4 w-4" />
            <span className="sr-only">Stop</span>
          </Button>
        ) : (
          <Button type="submit" size="icon" disabled={!input.trim() && attachments.length === 0}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        )}
      </form>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Images, mp3/wav audio, PDF and text files up to {MAX_FILE_MB}MB. Enter to send, Shift+Enter
        for a new line.
      </p>
    </section>
  );
}
