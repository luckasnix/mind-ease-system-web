import { cn } from "@/shared/lib/utils";
import type { Task } from "@/domain/entities/tasks";

import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onStepToggle: (taskId: string, stepId: string) => void;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
}

const columnStyles = {
  todo: "task-column-todo",
  progress: "task-column-progress",
  done: "task-column-done",
};

const emptyMessages = {
  todo: "Nenhuma tarefa pendente",
  progress: "Nenhuma tarefa em andamento",
  done: "Nenhuma tarefa concluída",
};

export function TaskColumn({
  title,
  status,
  tasks,
  onStepToggle,
  onStatusChange,
}: TaskColumnProps) {
  const filteredTasks = tasks.filter((t) => t.status === status);

  return (
    <div className={cn("task-column flex flex-col", columnStyles[status])}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full">
          {filteredTasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 stagger-children">
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8 opacity-60">
            {emptyMessages[status]}
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStepToggle={onStepToggle}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
