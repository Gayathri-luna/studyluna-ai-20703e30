/**
 * Server-only YouTube Data API v3 search.
 * The API key never leaves the server: it is read from the YOUTUBE_API_KEY
 * environment secret inside the handler.
 */

export interface YouTubeVideo {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

export type YouTubeSearchResult =
  | { ok: true; videos: YouTubeVideo[] }
  | { ok: false; error: string };

interface ApiItem {
  id?: { videoId?: string };
  snippet?: {
    title?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: Record<string, { url?: string } | undefined>;
  };
}

const decode = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

export async function searchYouTube(
  query: string,
  options: { maxResults?: number; language?: string } = {},
): Promise<YouTubeSearchResult> {
  const key = process.env["YOUTUBE_API_KEY"];
  if (!key) {
    return {
      ok: false,
      error:
        "YouTube search is not configured yet (missing YOUTUBE_API_KEY). Tell the user the site owner must add it.",
    };
  }

  const q = query.trim();
  if (!q) return { ok: false, error: "Empty search query." };

  const max = Math.min(Math.max(options.maxResults ?? 5, 1), 5);
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("key", key);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("safeSearch", "moderate");
  url.searchParams.set("maxResults", String(max));
  url.searchParams.set("q", q);
  if (options.language) url.searchParams.set("relevanceLanguage", options.language);

  let response: Response;
  try {
    response = await fetch(url.toString());
  } catch (error) {
    console.error("[youtube] network failure", error);
    return { ok: false, error: "Could not reach YouTube right now. Ask the user to retry." };
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error("[youtube] api error", response.status, body.slice(0, 400));
    if (response.status === 403) {
      return {
        ok: false,
        error:
          "YouTube search is unavailable (daily quota reached or the API key is not authorised).",
      };
    }
    if (response.status === 400) {
      return { ok: false, error: "That YouTube search request was invalid." };
    }
    return { ok: false, error: "YouTube search failed. Ask the user to try again shortly." };
  }

  const data = (await response.json().catch(() => null)) as { items?: ApiItem[] } | null;
  const items = Array.isArray(data?.items) ? data!.items! : [];

  const videos: YouTubeVideo[] = [];
  for (const item of items) {
    const videoId = item.id?.videoId;
    if (!videoId) continue;
    const snippet = item.snippet ?? {};
    const thumbs = snippet.thumbnails ?? {};
    videos.push({
      videoId,
      title: decode(snippet.title ?? "Untitled video"),
      channel: decode(snippet.channelTitle ?? "Unknown channel"),
      thumbnail:
        thumbs["medium"]?.url ??
        thumbs["high"]?.url ??
        thumbs["default"]?.url ??
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      publishedAt: snippet.publishedAt ?? "",
      url: `https://www.youtube.com/watch?v=${videoId}`,
    });
  }

  if (videos.length === 0) {
    return { ok: false, error: `No YouTube videos found for "${q}".` };
  }
  return { ok: true, videos };
}
