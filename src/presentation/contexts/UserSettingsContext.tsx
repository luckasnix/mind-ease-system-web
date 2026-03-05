import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { userSettingsRepository } from '@/data/repositories/userSettingsRepository';
import type {
  ComplexityLevel,
  UserSettingsUpdate,
} from '@/domain/entities/user-settings';

export interface UserSettings {
  complexity_level: ComplexityLevel;
  focus_mode: boolean;
  summary_mode: boolean;
  focus_mode_default: boolean;
  summary_mode_default: boolean;
  guided_rhythm: boolean;
  font_size: number;
  spacing: number;
  contrast: number;
  reduce_visual_stimuli: boolean;
  disable_animations: boolean;
  interface_rhythm: number;
}

interface UserSettingsContextValue {
  settings: UserSettings;
  isLoading: boolean;
  error: string | null;
  setComplexity: (value: ComplexityLevel) => void;
  setFocusMode: (value: boolean) => void;
  setSummaryMode: (value: boolean) => void;
  setFocusModeDefault: (value: boolean) => void;
  setSummaryModeDefault: (value: boolean) => void;
  setGuidedRhythm: (value: boolean) => void;
  setFontSize: (value: number) => void;
  setSpacing: (value: number) => void;
  setContrast: (value: number) => void;
  setReduceVisualStimuli: (value: boolean) => void;
  setDisableAnimations: (value: boolean) => void;
  setInterfaceRhythm: (value: number) => void;
}

const defaultSettings: UserSettings = {
  complexity_level: 'medium',
  focus_mode: false,
  summary_mode: false,
  focus_mode_default: false,
  summary_mode_default: false,
  guided_rhythm: true,
  font_size: 100,
  spacing: 100,
  contrast: 100,
  reduce_visual_stimuli: false,
  disable_animations: false,
  interface_rhythm: 100,
};

const UserSettingsContext = createContext<UserSettingsContextValue | null>(
  null,
);

function applyVisualSettings(settings: UserSettings) {
  const root = document.documentElement;

  // Font size: scale base (16px) by percentage
  root.style.fontSize = `${(settings.font_size / 100) * 16}px`;

  // Spacing: CSS custom property consumed throughout the app
  root.style.setProperty('--user-spacing', `${settings.spacing / 100}`);

  // Contrast: CSS filter on the body
  root.style.setProperty('--user-contrast', `${settings.contrast / 100}`);

  // Interface rhythm: transition speed multiplier
  const rhythmFactor = settings.interface_rhythm / 100;
  root.style.setProperty(
    '--transition-calm',
    `${Math.round(400 * rhythmFactor)}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  );
  root.style.setProperty(
    '--transition-gentle',
    `${Math.round(300 * rhythmFactor)}ms ease-out`,
  );

  // Reduce stimuli / disable animations
  if (settings.disable_animations) {
    root.classList.add('no-animations');
  } else {
    root.classList.remove('no-animations');
  }

  if (settings.reduce_visual_stimuli) {
    root.classList.add('reduce-stimuli');
  } else {
    root.classList.remove('reduce-stimuli');
  }
}

export function UserSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  );

  // Apply visual settings whenever they change
  useEffect(() => {
    applyVisualSettings(settings);
  }, [settings]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      root.style.fontSize = '';
      root.style.removeProperty('--user-spacing');
      root.style.removeProperty('--user-contrast');
      root.classList.remove('no-animations', 'reduce-stimuli');
    };
  }, []);

  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await userSettingsRepository.getUserSettings();

        setSettings({
          complexity_level: data.complexity_level ?? 'medium',
          focus_mode: data.focus_mode ?? false,
          summary_mode: data.summary_mode ?? false,
          focus_mode_default: data.focus_mode_default ?? false,
          summary_mode_default: data.summary_mode_default ?? false,
          guided_rhythm: data.guided_rhythm ?? true,
          font_size: data.font_size ?? 100,
          spacing: data.spacing ?? 100,
          contrast: data.contrast ?? 100,
          reduce_visual_stimuli: data.reduce_visual_stimuli ?? false,
          disable_animations: data.disable_animations ?? false,
          interface_rhythm: data.interface_rhythm ?? 100,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao carregar configurações';
        setError(message);
        console.error('Erro ao carregar user_settings:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const persistUpdate = useCallback(
    (updates: UserSettingsUpdate, debounceKey?: string) => {
      const save = () => {
        userSettingsRepository.updateUserSettings(updates).catch((err) => {
          console.error('Erro ao salvar configuração:', err);
        });
      };

      if (debounceKey) {
        if (debounceTimers.current[debounceKey]) {
          clearTimeout(debounceTimers.current[debounceKey]);
        }
        debounceTimers.current[debounceKey] = setTimeout(save, 500);
      } else {
        save();
      }
    },
    [],
  );

  const makeSetter = useCallback(
    <K extends keyof UserSettings>(key: K, debounceKey?: string) => {
      return (value: UserSettings[K]) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        persistUpdate({ [key]: value } as UserSettingsUpdate, debounceKey);
      };
    },
    [persistUpdate],
  );

  const value: UserSettingsContextValue = {
    settings,
    isLoading,
    error,
    setComplexity: makeSetter('complexity_level'),
    setFocusMode: makeSetter('focus_mode'),
    setSummaryMode: makeSetter('summary_mode'),
    setFocusModeDefault: makeSetter('focus_mode_default'),
    setSummaryModeDefault: makeSetter('summary_mode_default'),
    setGuidedRhythm: makeSetter('guided_rhythm'),
    setFontSize: makeSetter('font_size', 'font_size'),
    setSpacing: makeSetter('spacing', 'spacing'),
    setContrast: makeSetter('contrast', 'contrast'),
    setReduceVisualStimuli: makeSetter('reduce_visual_stimuli'),
    setDisableAnimations: makeSetter('disable_animations'),
    setInterfaceRhythm: makeSetter('interface_rhythm', 'interface_rhythm'),
  };

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  );
}

export function useUserSettings(): UserSettingsContextValue {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error(
      'useUserSettings deve ser usado dentro de <UserSettingsProvider>',
    );
  }
  return context;
}
