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
