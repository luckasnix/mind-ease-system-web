import { CheckCircle, Circle, GripVertical, Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/shared/lib/utils";
import type { Task } from "@/domain/entities/tasks";
import { Input } from "@/shared/ui/input";

interface TaskCardProps {
  task: Task;
  onSubtaskToggle: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
}

export function TaskCard({ task, onSubtaskToggle, onAddSubtask, onStatusChange }: TaskCardProps) {
  const [showInput, setShowInput] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const progress = task.subtasks.length > 0 ? (completedSubtasks / task.subtasks.length) * 100 : 0;

  const handleAddSubtask = () => {
    if (!subtaskTitle.trim()) return;
    onAddSubtask(task.id, subtaskTitle.trim());
    setSubtaskTitle("");
    setShowInput(false);
  };

  return (
    <div className="card-cognitive group cursor-grab active:cursor-grabbing">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <GripVertical className="w-4 h-4 text-muted-foreground/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex-1">
          <h4 className="font-medium text-foreground leading-snug">{task.title}</h4>
          {task.subtasks.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              {completedSubtasks} de {task.subtasks.length} passos
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {task.subtasks.length > 0 && (
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Subtasks */}
      <div className="space-y-2">
        {task.subtasks.map((subtask) => (
          <button
            key={subtask.id}
            onClick={() => onSubtaskToggle(task.id, subtask.id)}
            className={cn(
              "flex items-center gap-3 w-full p-2 rounded-lg transition-all duration-200 text-left",
              subtask.completed
                ? "text-muted-foreground line-through"
                : "text-foreground hover:bg-muted/50"
            )}
          >
            {subtask.completed ? (
              <CheckCircle className="w-4 h-4 text-success-foreground flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
            <span className="text-sm">{subtask.title}</span>
          </button>
        ))}

        {/* Add subtask */}
        {showInput ? (
          <div className="flex items-center gap-2 p-1">
            <Input
              autoFocus
              placeholder="Título da subtarefa"
              value={subtaskTitle}
              onChange={(e) => setSubtaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSubtask();
                }
                if (e.key === "Escape") {
                  setSubtaskTitle("");
                  setShowInput(false);
                }
              }}
              className="h-8 text-sm"
            />
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="flex items-center gap-2 w-full p-2 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors text-sm"
          >
            <Plus className="w-4 h-4 flex-shrink-0" />
            Adicionar subtarefa
          </button>
        )}
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
        {task.status !== "in_progress" && (
          <button
            onClick={() => onStatusChange(task.id, "in_progress")}
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
