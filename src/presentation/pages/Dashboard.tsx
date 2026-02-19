import { useState } from "react";
import { Layout } from "@/presentation/components/layout/Layout";
import { ComplexitySelector } from "@/presentation/components/dashboard/ComplexitySelector";
import { FocusModeToggle } from "@/presentation/components/dashboard/FocusModeToggle";
import { VisualControls } from "@/presentation/components/dashboard/VisualControls";
import { CognitiveAlert } from "@/presentation/components/dashboard/CognitiveAlert";
import { Brain, Sparkles } from "lucide-react";

export default function Dashboard() {
  const [complexity, setComplexity] = useState<"simple" | "medium" | "detailed">("medium");
  const [focusMode, setFocusMode] = useState(false);
  const [summaryMode, setSummaryMode] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [spacing, setSpacing] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [alerts, setAlerts] = useState([
    { id: "1", type: "break" as const, message: "Você está focado há 45 minutos. Que tal uma pausa?" },
  ]);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto stagger-children">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-display">
                Painel Cognitivo
              </h1>
              <p className="text-muted-foreground">
                Ajuste a interface ao seu ritmo mental
              </p>
            </div>
          </div>
        </header>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-3 mb-8">
            {alerts.map((alert) => (
              <CognitiveAlert
                key={alert.id}
                type={alert.type}
                message={alert.message}
                onDismiss={() => dismissAlert(alert.id)}
              />
            ))}
          </div>
        )}

        {/* Welcome card */}
        <div className="card-cognitive mb-8 bg-gradient-to-br from-primary-soft to-secondary/30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground mb-1">Bem-vindo ao seu espaço</h2>
              <p className="text-sm text-muted-foreground text-readable">
                Este painel foi criado para você personalizar a interface conforme seu estado mental. 
                Ajuste a complexidade, ative o modo foco e configure os elementos visuais para criar 
                um ambiente de trabalho mais confortável.
              </p>
            </div>
          </div>
        </div>

        {/* Main controls grid */}
        <div className="grid gap-6 lg:gap-8">
          {/* Row 1: Complexity */}
          <ComplexitySelector value={complexity} onChange={setComplexity} />

          {/* Row 2: Mode toggles + Visual controls */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <FocusModeToggle
              focusMode={focusMode}
              onFocusModeChange={setFocusMode}
              summaryMode={summaryMode}
              onSummaryModeChange={setSummaryMode}
            />
            <VisualControls
              fontSize={fontSize}
              spacing={spacing}
              contrast={contrast}
              onFontSizeChange={setFontSize}
              onSpacingChange={setSpacing}
              onContrastChange={setContrast}
            />
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${focusMode ? "bg-primary animate-breathe" : "bg-muted-foreground"}`} />
          <span>
            {focusMode ? "Modo foco ativo" : "Modo normal"}
            {" · "}
            Complexidade {complexity === "simple" ? "simples" : complexity === "medium" ? "média" : "detalhada"}
          </span>
        </div>
      </div>
    </Layout>
  );
}
