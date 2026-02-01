import { cn } from "@/lib/utils";
import { CheckCircle, Circle, GripVertical } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  steps: { id: string; text: string; completed: boolean }[];
  status: "todo" | "progress" | "done";
}

interface TaskCardProps {
  task: Task;
  onStepToggle: (taskId: string, stepId: string) => void;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
}

export function TaskCard({ task, onStepToggle, onStatusChange }: TaskCardProps) {
  const completedSteps = task.steps.filter((s) => s.completed).length;
  const progress = task.steps.length > 0 ? (completedSteps / task.steps.length) * 100 : 0;

  return (
    <div className="card-cognitive group cursor-grab active:cursor-grabbing">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <GripVertical className="w-4 h-4 text-muted-foreground/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex-1">
          <h4 className="font-medium text-foreground leading-snug">{task.title}</h4>
          {task.steps.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {completedSteps} de {task.steps.length} passos
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {task.steps.length > 0 && (
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Steps */}
      <div className="space-y-2">
        {task.steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepToggle(task.id, step.id)}
            className={cn(
              "flex items-center gap-3 w-full p-2 rounded-lg transition-all duration-200 text-left",
              step.completed
                ? "text-muted-foreground line-through"
                : "text-foreground hover:bg-muted/50"
            )}
          >
            {step.completed ? (
              <CheckCircle className="w-4 h-4 text-success-foreground flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
            <span className="text-sm">{step.text}</span>
          </button>
        ))}
      </div>

      {/* Quick status buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
        {task.status !== "todo" && (
          <button
            onClick={() => onStatusChange(task.id, "todo")}
            className="flex-1 text-xs py-2 px-3 rounded-lg bg-muted hover:bg-task-todo transition-colors"
          >
            A Fazer
          </button>
        )}
        {task.status !== "progress" && (
          <button
            onClick={() => onStatusChange(task.id, "progress")}
            className="flex-1 text-xs py-2 px-3 rounded-lg bg-muted hover:bg-task-progress transition-colors"
          >
            Em Progresso
          </button>
        )}
        {task.status !== "done" && (
          <button
            onClick={() => onStatusChange(task.id, "done")}
            className="flex-1 text-xs py-2 px-3 rounded-lg bg-muted hover:bg-task-done transition-colors"
          >
            Concluído
          </button>
        )}
      </div>
    </div>
  );
}
