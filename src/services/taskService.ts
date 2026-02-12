import { supabase } from '../lib/supabase'

type TaskUpdate = {
  title?: string
  description?: string
  status?: 'todo' | 'in_progress' | 'done'
}

export const taskService = {
  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')

    if (error) throw new Error(error.message)

    return data
  },

  async createTask(title: string, description?: string) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, description }])
      .select()

    if (error) throw new Error(error.message)

    return data
  },

  async updateTask(taskId: string, updates: TaskUpdate) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()

    if (error) throw new Error(error.message)

    return data
  },

  async deleteTask(taskId: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) throw new Error(error.message)
  }
}
