import { cn } from "@/shared/lib/utils";
import { Clock, Coffee, X } from "lucide-react";

interface CognitiveAlertProps {
  type: "time" | "break";
  message: string;
  onDismiss: () => void;
}

export function CognitiveAlert({ type, message, onDismiss }: CognitiveAlertProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-xl animate-fade-in",
        type === "time" ? "bg-warning" : "bg-accent"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            type === "time" ? "bg-warning-foreground/10" : "bg-accent-foreground/10"
          )}
        >
          {type === "time" ? (
            <Clock className="w-5 h-5 text-warning-foreground" />
          ) : (
            <Coffee className="w-5 h-5 text-accent-foreground" />
          )}
        </div>
        <p
          className={cn(
            "text-sm font-medium",
            type === "time" ? "text-warning-foreground" : "text-accent-foreground"
          )}
        >
          {message}
        </p>
      </div>
      <button
        onClick={onDismiss}
        className={cn(
          "p-2 rounded-lg transition-colors",
          type === "time"
            ? "hover:bg-warning-foreground/10 text-warning-foreground"
            : "hover:bg-accent-foreground/10 text-accent-foreground"
        )}
        aria-label="Dispensar alerta"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
