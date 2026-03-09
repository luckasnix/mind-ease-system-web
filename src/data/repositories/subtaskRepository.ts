import { supabase } from '@/data/datasources/supabase'
import type { Subtask, SubtaskUpdate } from '@/domain/entities/tasks'

export const subtaskRepository = {
  async getSubtasks(taskId: string): Promise<Subtask[]> {
    const { data, error } = await supabase
      .from('subtasks')
      .select('*')
      .eq('task_id', taskId)
      .order('created_at', { ascending: true })

    if (error) throw new Error(error.message)

    return data ?? []
  },

  async createSubtask(taskId: string, title: string): Promise<Subtask> {
    const id = crypto.randomUUID()

    const { data, error } = await supabase
      .from('subtasks')
      .insert([{ id, task_id: taskId, title }])
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  },

  async updateSubtask(subtaskId: string, updates: SubtaskUpdate): Promise<Subtask> {
    const { data, error } = await supabase
      .from('subtasks')
      .update(updates)
      .eq('id', subtaskId)
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  },

  async deleteSubtask(subtaskId: string) {
    const { error } = await supabase
      .from('subtasks')
      .delete()
      .eq('id', subtaskId)

    if (error) throw new Error(error.message)
  }
}
