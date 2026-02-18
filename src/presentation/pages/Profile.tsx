import { Layout } from "@/presentation/components/layout/Layout";
import { User, Brain, Calendar, Settings, Sparkles } from "lucide-react";

const cognitiveProfile = {
  type: "Foco Adaptativo",
  description: "Prefere sessões curtas com pausas frequentes",
  strengths: ["Criatividade", "Resolução de problemas", "Pensamento visual"],
};

const routines = [
  { id: "1", name: "Rotina Matinal", time: "07:00", active: true },
  { id: "2", name: "Bloco de Estudos", time: "09:00", active: true },
  { id: "3", name: "Pausa Ativa", time: "12:00", active: false },
  { id: "4", name: "Revisão Noturna", time: "20:00", active: true },
];

const preferences = [
  { label: "Complexidade", value: "Médio" },
  { label: "Modo Foco", value: "Desativado" },
  { label: "Fonte", value: "100%" },
  { label: "Espaçamento", value: "100%" },
];

export default function Profile() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto stagger-children">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-display">
                Meu Perfil
              </h1>
              <p className="text-muted-foreground">
                Suas informações e preferências
              </p>
            </div>
          </div>
        </header>

        {/* Profile card */}
        <div className="card-cognitive mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary-foreground">ME</span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold text-foreground mb-1">Usuário MindEase</h2>
              <p className="text-muted-foreground mb-4">Membro desde Janeiro 2024</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-primary-soft text-primary text-sm font-medium">
                  {cognitiveProfile.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                  Premium
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Cognitive Profile */}
          <div className="control-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Brain className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Perfil Cognitivo</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {cognitiveProfile.description}
            </p>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Pontos fortes</p>
              <div className="flex flex-wrap gap-2">
                {cognitiveProfile.strengths.map((strength) => (
                  <span
                    key={strength}
                    className="px-3 py-1.5 rounded-lg bg-success text-success-foreground text-sm"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Active Preferences */}
          <div className="control-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Preferências Ativas</h3>
            </div>

            <div className="space-y-3">
              {preferences.map((pref) => (
                <div
                  key={pref.label}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <span className="text-sm text-muted-foreground">{pref.label}</span>
                  <span className="text-sm font-medium text-foreground">{pref.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Routines */}
          <div className="control-card lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">Minhas Rotinas</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {routines.map((routine) => (
                <div
                  key={routine.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                    routine.active ? "bg-primary-soft" : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles
                      className={`w-4 h-4 ${
                        routine.active ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm text-foreground">{routine.name}</p>
                      <p className="text-xs text-muted-foreground">{routine.time}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      routine.active
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {routine.active ? "Ativa" : "Pausada"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
