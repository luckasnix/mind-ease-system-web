export interface TaskStep {
  id: string
  text: string
  completed: boolean
}

export interface Task {
  id: string
  title: string
  steps: TaskStep[]
  status: 'todo' | 'progress' | 'done'
}

export type TaskUpdate = {
  title?: string
  description?: string
  status?: 'todo' | 'in_progress' | 'done'
}

export type SubtaskUpdate = {
  title?: string
  completed?: boolean
}
