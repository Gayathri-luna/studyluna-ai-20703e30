import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * Single, secure server-side entry point to the Lovable AI Gateway.
 * The provider name must stay exactly "lovable" so `providerOptions.lovable`
 * fields are forwarded instead of being silently dropped.
 */
export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}
