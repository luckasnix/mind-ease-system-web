import { supabase } from '../datasources/supabase'
import type { UserSettingsUpdate } from '@/domain/entities/user-settings'

export const userSettingsRepository = {
  async getUserSettings() {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) throw new Error(error.message)

    return data
  },

  async updateUserSettings(updates: UserSettingsUpdate) {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    const { data, error } = await supabase
      .from('user_settings')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    return data
  }
}
