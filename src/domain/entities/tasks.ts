export interface Subtask {
  id: string
  task_id: string
  title: string
  completed: boolean
  created_at?: string
}

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  user_id: string
  title: string
  description?: string
  status: TaskStatus
  created_at?: string
  updated_at?: string
  subtasks: Subtask[]
}

export type TaskUpdate = {
  title?: string
  description?: string
  status?: TaskStatus
}

export type SubtaskUpdate = {
  title?: string
  completed?: boolean
}
