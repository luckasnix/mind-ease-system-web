import { supabase } from '@/data/datasources/supabase'
import type { Task, TaskUpdate } from '@/domain/entities/tasks'

export const taskRepository = {
  async getTasks(): Promise<Task[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    const { data, error } = await supabase
      .from('tasks')
      .select('*, subtasks(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)

    return (data ?? []).map((task) => ({
      ...task,
      subtasks: task.subtasks ?? [],
    }))
  },

  async createTask(title: string, description?: string): Promise<Task> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    const id = crypto.randomUUID()

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ id, user_id: user.id, title, description, status: 'todo' }])
      .select('*, subtasks(*)')
      .single()

    if (error) throw new Error(error.message)

    return { ...data, subtasks: data.subtasks ?? [] }
  },

  async updateTask(taskId: string, updates: TaskUpdate): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', taskId)
      .select('*, subtasks(*)')
      .single()

    if (error) throw new Error(error.message)

    return { ...data, subtasks: data.subtasks ?? [] }
  },

  async deleteTask(taskId: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) throw new Error(error.message)
  }
}
