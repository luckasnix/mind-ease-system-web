import { CheckSquare, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Layout } from "@/presentation/components/layout/Layout";
import { TaskColumn } from "@/presentation/components/tasks/TaskColumn";
import { PomodoroTimer } from "@/presentation/components/tasks/PomodoroTimer";
import type { Task } from "@/domain/entities/tasks";
import { CognitiveAlert } from "@/presentation/components/dashboard/CognitiveAlert";
import { taskRepository } from "@/data/repositories/taskRepository";
import { subtaskRepository } from "@/data/repositories/subtaskRepository";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBreakAlert, setShowBreakAlert] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const data = await taskRepository.getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreateTask = async () => {
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      const created = await taskRepository.createTask(
        newTitle.trim(),
        newDescription.trim() || undefined
      );
      setTasks((prev) => [created, ...prev]);
      setNewTitle("");
      setNewDescription("");
      setDialogOpen(false);
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleAddSubtask = async (taskId: string, title: string) => {
    try {
      const created = await subtaskRepository.createSubtask(taskId, title);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, subtasks: [...t.subtasks, created] }
            : t
        )
      );
    } catch (err) {
      console.error("Erro ao criar subtarefa:", err);
    }
  };

  const handleSubtaskToggle = async (taskId: string, subtaskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    const subtask = task?.subtasks.find((s) => s.id === subtaskId);
    if (!subtask) return;

    const newCompleted = !subtask.completed;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) =>
                s.id === subtaskId ? { ...s, completed: newCompleted } : s
              ),
            }
          : t
      )
    );

    try {
      await subtaskRepository.updateSubtask(subtaskId, { completed: newCompleted });
    } catch (err) {
      console.error("Erro ao atualizar subtarefa:", err);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                subtasks: t.subtasks.map((s) =>
                  s.id === subtaskId ? { ...s, completed: !newCompleted } : s
                ),
              }
            : t
        )
      );
    }
  };

  const handleStatusChange = async (taskId: string, status: Task["status"]) => {
    const previousTask = tasks.find((t) => t.id === taskId);
    if (!previousTask) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );

    try {
      await taskRepository.updateTask(taskId, { status });
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, status: previousTask.status } : t
        )
      );
    }
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
          <button
            className="btn-calm-primary w-fit"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </button>
        </header>

        {/* New task dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Tarefa</DialogTitle>
              <DialogDescription>
                Crie uma nova tarefa para organizar suas atividades.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="task-title">Título</Label>
                <Input
                  id="task-title"
                  placeholder="Ex: Estudar para a prova"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleCreateTask();
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-description">Descrição (opcional)</Label>
                <Textarea
                  id="task-description"
                  placeholder="Descreva a tarefa..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <button
                className="btn-calm-primary"
                onClick={handleCreateTask}
                disabled={creating || !newTitle.trim()}
              >
                {creating ? "Criando..." : "Criar Tarefa"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">Carregando tarefas...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Kanban columns */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-4 lg:gap-6">
              <TaskColumn
                title="A Fazer"
                status="todo"
                tasks={tasks}
                onSubtaskToggle={handleSubtaskToggle}
                onAddSubtask={handleAddSubtask}
                onStatusChange={handleStatusChange}
              />
              <TaskColumn
                title="Em Progresso"
                status="in_progress"
                tasks={tasks}
                onSubtaskToggle={handleSubtaskToggle}
                onAddSubtask={handleAddSubtask}
                onStatusChange={handleStatusChange}
              />
              <TaskColumn
                title="Concluído"
                status="done"
                tasks={tasks}
                onSubtaskToggle={handleSubtaskToggle}
                onAddSubtask={handleAddSubtask}
                onStatusChange={handleStatusChange}
              />
            </div>

            {/* Sidebar with timer */}
            <div className="lg:col-span-1">
              <PomodoroTimer onBreakSuggestion={handleBreakSuggestion} />
            </div>
          </div>
        )}

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
