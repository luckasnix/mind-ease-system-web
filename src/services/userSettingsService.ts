import { supabase } from '../lib/supabase'

export type ComplexityLevel = 'simple' | 'medium' | 'detailed'

export type UserSettingsUpdate = {
  // Behavior
  focus_mode_default?: boolean
  summary_mode_default?: boolean
  guided_rhythm?: boolean

  // Visual Adjustments
  font_size?: number
  spacing?: number
  contrast?: number

  // Accessibility
  reduce_visual_stimuli?: boolean
  disable_animations?: boolean
  interface_rhythm?: number

  // Complexity
  complexity_level?: ComplexityLevel

  // Viewing Modes
  focus_mode?: boolean
  summary_mode?: boolean
}

export const userSettingsService = {
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
