import { cn } from "@/shared/lib/utils";
import { Layers, LayoutGrid, LayoutList } from "lucide-react";

interface ComplexitySelectorProps {
  value: "simple" | "medium" | "detailed";
  onChange: (value: "simple" | "medium" | "detailed") => void;
}

const options = [
  {
    value: "simple" as const,
    label: "Simples",
    description: "Menos informações, mais foco",
    icon: LayoutList,
  },
  {
    value: "medium" as const,
    label: "Médio",
    description: "Equilíbrio entre detalhes",
    icon: LayoutGrid,
  },
  {
    value: "detailed" as const,
    label: "Detalhado",
    description: "Todas as informações",
    icon: Layers,
  },
];

export function ComplexitySelector({ value, onChange }: ComplexitySelectorProps) {
  return (
    <div className="control-card">
      <h3 className="font-semibold text-foreground mb-4">Nível de Complexidade</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300",
              value === option.value
                ? "border-primary bg-primary-soft"
                : "border-transparent bg-muted hover:bg-muted/80"
            )}
          >
            <option.icon
              className={cn(
                "w-6 h-6 mb-2 transition-colors",
                value === option.value ? "text-primary" : "text-muted-foreground"
              )}
            />
            <span className="font-medium text-sm">{option.label}</span>
            <span className="text-xs text-muted-foreground text-center mt-1">
              {option.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
