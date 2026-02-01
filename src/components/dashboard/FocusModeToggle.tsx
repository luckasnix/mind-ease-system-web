import { cn } from "@/lib/utils";
import { Focus, Eye } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface FocusModeToggleProps {
  focusMode: boolean;
  onFocusModeChange: (value: boolean) => void;
  summaryMode: boolean;
  onSummaryModeChange: (value: boolean) => void;
}

export function FocusModeToggle({
  focusMode,
  onFocusModeChange,
  summaryMode,
  onSummaryModeChange,
}: FocusModeToggleProps) {
  return (
    <div className="control-card space-y-5">
      <h3 className="font-semibold text-foreground">Modos de Visualização</h3>
      
      {/* Focus Mode */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
              focusMode ? "bg-primary" : "bg-muted"
            )}
          >
            <Focus
              className={cn(
                "w-5 h-5 transition-colors",
                focusMode ? "text-primary-foreground" : "text-muted-foreground"
              )}
            />
          </div>
          <div>
            <p className="font-medium text-sm">Modo Foco</p>
            <p className="text-xs text-muted-foreground">
              Remove distrações e destaca o essencial
            </p>
          </div>
        </div>
        <Switch
          checked={focusMode}
          onCheckedChange={onFocusModeChange}
          className="data-[state=checked]:bg-primary"
        />
      </div>

      {/* Summary Mode */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
              summaryMode ? "bg-secondary" : "bg-muted"
            )}
          >
            <Eye
              className={cn(
                "w-5 h-5 transition-colors",
                summaryMode ? "text-secondary-foreground" : "text-muted-foreground"
              )}
            />
          </div>
          <div>
            <p className="font-medium text-sm">Modo Resumo</p>
            <p className="text-xs text-muted-foreground">
              Mostra apenas informações principais
            </p>
          </div>
        </div>
        <Switch
          checked={summaryMode}
          onCheckedChange={onSummaryModeChange}
          className="data-[state=checked]:bg-secondary"
        />
      </div>
    </div>
  );
}
