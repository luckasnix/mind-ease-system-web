import { Slider } from "@/components/ui/slider";
import { Type, Move, Sun } from "lucide-react";

interface VisualControlsProps {
  fontSize: number;
  spacing: number;
  contrast: number;
  onFontSizeChange: (value: number) => void;
  onSpacingChange: (value: number) => void;
  onContrastChange: (value: number) => void;
}

export function VisualControls({
  fontSize,
  spacing,
  contrast,
  onFontSizeChange,
  onSpacingChange,
  onContrastChange,
}: VisualControlsProps) {
  return (
    <div className="control-card space-y-6">
      <h3 className="font-semibold text-foreground">Ajustes Visuais</h3>

      {/* Font Size */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Type className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Tamanho da Fonte</p>
            <p className="text-xs text-muted-foreground">
              Atual: {fontSize}%
            </p>
          </div>
        </div>
        <Slider
          value={[fontSize]}
          onValueChange={([value]) => onFontSizeChange(value)}
          min={80}
          max={150}
          step={5}
          className="w-full"
        />
      </div>

      {/* Spacing */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Move className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Espaçamento</p>
            <p className="text-xs text-muted-foreground">
              Atual: {spacing}%
            </p>
          </div>
        </div>
        <Slider
          value={[spacing]}
          onValueChange={([value]) => onSpacingChange(value)}
          min={80}
          max={150}
          step={5}
          className="w-full"
        />
      </div>

      {/* Contrast */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Sun className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Contraste</p>
            <p className="text-xs text-muted-foreground">
              Atual: {contrast}%
            </p>
          </div>
        </div>
        <Slider
          value={[contrast]}
          onValueChange={([value]) => onContrastChange(value)}
          min={80}
          max={120}
          step={5}
          className="w-full"
        />
      </div>
    </div>
  );
}
