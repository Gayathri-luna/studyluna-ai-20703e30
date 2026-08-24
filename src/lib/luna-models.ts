import { useCallback, useEffect, useState } from "react";

export const LUNA_MODELS = [
  {
    id: "lite",
    name: "Luna AI Lite",
    tagline: "Fast responses for everyday questions",
  },
  {
    id: "v3",
    name: "Luna AI v3",
    tagline: "Balanced intelligence and speed",
  },
  {
    id: "pro",
    name: "Luna AI v3 Pro",
    tagline: "Best reasoning for complex tasks",
  },
  {
    id: "research",
    name: "Luna AI Research",
    tagline: "Deep analysis for academic and research work",
  },
] as const;

export type LunaModelId = (typeof LUNA_MODELS)[number]["id"];

export const DEFAULT_LUNA_MODEL: LunaModelId = "v3";

export const LUNA_CAPABILITIES = [
  "Advanced reasoning",
  "Multimodal understanding",
  "Fast responses",
  "Document analysis",
  "Image understanding",
  "Audio transcription",
  "Video summarization",
  "Context-aware conversations",
] as const;

export function getLunaModel(id: string | undefined | null) {
  return LUNA_MODELS.find((m) => m.id === id) ?? LUNA_MODELS[1];
}

const KEY = "luna-ai-model";
const EVENT = "luna-model-changed";

export function readLunaModel(): LunaModelId {
  if (typeof window === "undefined") return DEFAULT_LUNA_MODEL;
  const stored = window.localStorage.getItem(KEY);
  return (LUNA_MODELS.find((m) => m.id === stored)?.id ?? DEFAULT_LUNA_MODEL) as LunaModelId;
}

export function useLunaModel() {
  const [model, setModelState] = useState<LunaModelId>(DEFAULT_LUNA_MODEL);

  useEffect(() => {
    setModelState(readLunaModel());
    const onChange = () => setModelState(readLunaModel());
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  const setModel = useCallback((id: LunaModelId) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, id);
      window.dispatchEvent(new Event(EVENT));
    }
    setModelState(id);
  }, []);

  return { model, setModel };
}
