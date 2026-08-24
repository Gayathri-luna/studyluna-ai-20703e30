/**
 * YouTube URL helpers shared by the LunaAI chat UI and the transcript route.
 */

const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/** Extracts an 11-character video id from any common YouTube URL form. */
export function extractVideoId(value: string): string | null {
  const raw = value.trim();
  if (!raw) return null;
  if (ID_PATTERN.test(raw)) return raw;

  let url: URL;
  try {
    url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0] ?? "";
    return ID_PATTERN.test(id) ? id : null;
  }
  if (host !== "youtube.com" && host !== "music.youtube.com" && host !== "youtube-nocookie.com") {
    return null;
  }

  const param = url.searchParams.get("v");
  if (param && ID_PATTERN.test(param)) return param;

  const segments = url.pathname.split("/").filter(Boolean);
  const prefixes = ["embed", "shorts", "live", "v"];
  if (segments.length >= 2 && prefixes.includes(segments[0]!)) {
    const id = segments[1]!;
    return ID_PATTERN.test(id) ? id : null;
  }
  return null;
}

/** True when the text contains at least one recognisable YouTube link. */
export function findYouTubeLink(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s]+/g);
  if (!match) return null;
  for (const candidate of match) {
    if (extractVideoId(candidate)) return candidate;
  }
  return null;
}

export function watchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
