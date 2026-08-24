import { createClient } from "@supabase/supabase-js";

export const DAILY_AI_MESSAGE_LIMIT = 60;

/** Media generation (image / audio) is far pricier than text, so cap it per minute. */
export const MEDIA_PER_MINUTE_LIMIT = 4;
const mediaHits = new Map<string, number[]>();

export function checkMediaRateLimit(userId: string, kind: "image" | "audio"): Response | null {
  const now = Date.now();
  const bucket = `${kind}:${userId}`;
  const recent = (mediaHits.get(bucket) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= MEDIA_PER_MINUTE_LIMIT) {
    mediaHits.set(bucket, recent);
    return new Response(
      `You can generate up to ${MEDIA_PER_MINUTE_LIMIT} ${kind}s per minute. Please wait a moment and try again.`,
      { status: 429 },
    );
  }
  recent.push(now);
  mediaHits.set(bucket, recent);
  return null;
}

type Verified = { userId: string } | { error: Response };

/** Verifies the Supabase bearer token on an incoming API request. */
export async function verifyRequestUser(request: Request): Promise<Verified> {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token || token.split(".").length !== 3) {
    return { error: new Response("Please log in to use LunaAI.", { status: 401 }) };
  }

  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    return { error: new Response("Auth is not configured.", { status: 500 }) };
  }

  const client = createClient(url, key, {
    global: { headers: { apikey: key, Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client.auth.getClaims(token);
  const userId = data?.claims?.sub;
  if (error || !userId) {
    return { error: new Response("Session expired. Please log in again.", { status: 401 }) };
  }
  return { userId };
}

/** Increments the caller's daily LunaAI counter and enforces the cap. */
export async function consumeAiQuota(userId: string): Promise<Response | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // NOTE: `rpc` must stay bound to the client — detaching it loses `this`.
  const { data, error } = (await (
    supabaseAdmin.rpc as unknown as (
      fn: string,
      args: Record<string, unknown>,
    ) => Promise<{ data: { allowed: boolean; used: number }[] | null; error: unknown }>
  ).call(supabaseAdmin, "increment_ai_usage", {
    _user_id: userId,
    _limit: DAILY_AI_MESSAGE_LIMIT,
  })) as { data: { allowed: boolean; used: number }[] | null; error: unknown };

  if (error) {
    console.error("[luna] usage check failed", error);
    return null; // fail open so a counter outage never blocks learning
  }

  const row = data?.[0];
  if (row && !row.allowed) {
    return new Response(
      `Daily LunaAI limit reached (${DAILY_AI_MESSAGE_LIMIT} messages). It resets at 00:00 UTC.`,
      { status: 429 },
    );
  }
  return null;
}
