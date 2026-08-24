import { Check, ChevronDown, Sparkle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_LUNA_MODEL, LUNA_MODELS, getLunaModel, useLunaModel } from "@/lib/luna-models";

export function LunaModelSelector() {
  const { model, setModel } = useLunaModel();
  const active = getLunaModel(model);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:border-primary/60 hover:bg-accent"
        >
          <Sparkle className="h-4 w-4 text-primary transition-transform duration-200 group-hover:scale-110" />
          {active.name}
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
          Choose a model
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LUNA_MODELS.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onSelect={() => setModel(item.id)}
            className="flex items-start gap-2 py-2"
          >
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                item.id === active.id ? "text-primary opacity-100" : "opacity-0"
              }`}
            />
            <span className="min-w-0">
              <span className="block text-sm font-medium text-foreground">
                {item.name}
                {item.id === DEFAULT_LUNA_MODEL && (
                  <span className="ml-2 rounded-full border border-border px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground">
                    Default
                  </span>
                )}
              </span>
              <span className="block text-xs text-muted-foreground">{item.tagline}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
