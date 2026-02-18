import { CheckSquare, Plus } from "lucide-react";
import { useState } from "react";

import { Layout } from "@/presentation/components/layout/Layout";
import { TaskColumn } from "@/presentation/components/tasks/TaskColumn";
import { PomodoroTimer } from "@/presentation/components/tasks/PomodoroTimer";
import type { Task } from "@/domain/entities/tasks";
import { CognitiveAlert } from "@/presentation/components/dashboard/CognitiveAlert";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Revisar material de estudo",
    steps: [
      { id: "1a", text: "Ler capítulo 3", completed: true },
      { id: "1b", text: "Fazer anotações", completed: false },
      { id: "1c", text: "Revisar pontos principais", completed: false },
    ],
    status: "progress",
  },
  {
    id: "2",
    title: "Preparar apresentação",
    steps: [
      { id: "2a", text: "Definir estrutura", completed: false },
      { id: "2b", text: "Criar slides", completed: false },
    ],
    status: "todo",
  },
  {
    id: "3",
    title: "Responder emails importantes",
    steps: [
      { id: "3a", text: "Email do professor", completed: true },
      { id: "3b", text: "Email do grupo", completed: true },
    ],
    status: "done",
  },
  {
    id: "4",
    title: "Organizar anotações da semana",
    steps: [],
    status: "todo",
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showBreakAlert, setShowBreakAlert] = useState(false);

  const handleStepToggle = (taskId: string, stepId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              steps: task.steps.map((step) =>
                step.id === stepId ? { ...step, completed: !step.completed } : step
              ),
            }
          : task
      )
    );
  };

  const handleStatusChange = (taskId: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status } : task))
    );
  };

  const handleBreakSuggestion = () => {
    setShowBreakAlert(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-display">
                Organizador de Tarefas
              </h1>
              <p className="text-muted-foreground">
                Organize e execute sem sobrecarga
              </p>
            </div>
          </div>
          <button className="btn-calm-primary w-fit">
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>
        </header>

        {/* Break alert */}
        {showBreakAlert && (
          <div className="mb-6">
            <CognitiveAlert
              type="break"
              message="Ótimo trabalho! Hora de fazer uma pausa para recarregar."
              onDismiss={() => setShowBreakAlert(false)}
            />
          </div>
        )}

        {/* Main content */}
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Kanban columns */}
          <div className="lg:col-span-3 grid md:grid-cols-3 gap-4 lg:gap-6">
            <TaskColumn
              title="A Fazer"
              status="todo"
              tasks={tasks}
              onStepToggle={handleStepToggle}
              onStatusChange={handleStatusChange}
            />
            <TaskColumn
              title="Em Progresso"
              status="progress"
              tasks={tasks}
              onStepToggle={handleStepToggle}
              onStatusChange={handleStatusChange}
            />
            <TaskColumn
              title="Concluído"
              status="done"
              tasks={tasks}
              onStepToggle={handleStepToggle}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Sidebar with timer */}
          <div className="lg:col-span-1">
            <PomodoroTimer onBreakSuggestion={handleBreakSuggestion} />
          </div>
        </div>

        {/* Transition hint */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            💡 Dica: Mova as tarefas entre colunas para acompanhar seu progresso
          </p>
        </div>
      </div>
    </Layout>
  );
}
